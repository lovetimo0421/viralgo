import argparse
import json
import re
import ssl
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

try:
    import certifi
except Exception:
    certifi = None


API_APPLIST = "https://api.steampowered.com/ISteamApps/GetAppList/v2"
API_STEAMSPY = "https://steamspy.com/api.php"
API_APPDETAILS = "https://store.steampowered.com/api/appdetails"
API_STORESEARCH = "https://store.steampowered.com/api/storesearch"
STORE_APP_URL = "https://store.steampowered.com/app/"
STEAMDB_APP_URL = "https://steamdb.info/app/"


GLOBAL_SSL_CONTEXT = None
_DETAILS_CACHE: dict[int, dict] = {}
_NAME_APPID_CACHE: dict[str, int] = {}
REQ_TIMEOUT_STORE = 8
REQ_TIMEOUT_DETAILS = 12
REQ_TIMEOUT_SPY = 12
REQ_RETRIES = 1
REQ_TIMEOUT_STOREPAGE = 8
REQ_TIMEOUT_DB = 10
_STEAMDB_GENRES_CACHE: dict[int, list[str]] = {}


def http_get_json(url: str, params: dict | None = None, timeout: int = 60, retries: int = 2) -> dict:
    if params:
        url = f"{url}?{urllib.parse.urlencode(params)}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
    }
    req = urllib.request.Request(url, headers=headers)
    context = GLOBAL_SSL_CONTEXT
    if context is None and certifi is not None:
        context = ssl.create_default_context(cafile=certifi.where())
    attempt = 0
    while True:
        try:
            with urllib.request.urlopen(req, timeout=timeout, context=context) as resp:
                data = resp.read()
                return json.loads(data.decode("utf-8"))
        except urllib.error.HTTPError as e:
            if e.code == 404 and "ISteamApps/GetAppList" in url and "v2" in url:
                url = url.replace("v2", "v0002")
                req = urllib.request.Request(url, headers=headers)
            attempt += 1
            if attempt > retries:
                raise
        except Exception:
            attempt += 1
            if attempt > retries:
                raise


def http_get_text(url: str, params: dict | None = None, timeout: int = 60, retries: int = 2) -> str:
    if params:
        url = f"{url}?{urllib.parse.urlencode(params)}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    }
    req = urllib.request.Request(url, headers=headers)
    context = GLOBAL_SSL_CONTEXT
    if context is None and certifi is not None:
        context = ssl.create_default_context(cafile=certifi.where())
    attempt = 0
    while True:
        try:
            with urllib.request.urlopen(req, timeout=timeout, context=context) as resp:
                data = resp.read()
                return data.decode("utf-8", errors="ignore")
        except Exception:
            attempt += 1
            if attempt > retries:
                raise


def fetch_applist() -> list[dict]:
    try:
        j = http_get_json(API_APPLIST, timeout=60)
        apps = j.get("applist", {}).get("apps", [])
        if apps:
            return apps
    except Exception:
        pass
    try:
        j2 = http_get_json(API_STEAMSPY, params={"request": "all"}, timeout=60)
        out: list[dict] = []
        for k, v in j2.items():
            try:
                appid = int(k)
            except Exception:
                continue
            out.append({"appid": appid, "name": v.get("name")})
        return out
    except Exception:
        return []


def normalize_name(s: str) -> str:
    t = s.lower()
    t = re.sub(r"[™®©]", "", t)
    t = re.sub(r"[^a-z0-9]+", " ", t)
    t = re.sub(r"\s+", " ", t).strip()
    return t


def canonicalize_tag(s: str) -> str:
    t = s.strip()
    k = t.casefold()
    if k in {"fps", "first-person", "first person", "first-person shooter", "first person shooter", "third-person shooter", "third person shooter", "shooter"}:
        return "Shooter"
    return t


def build_name_index(apps: list[dict]) -> dict:
    idx: dict[str, list[int]] = {}
    for a in apps:
        name = a.get("name") or ""
        appid = a.get("appid")
        if not name or not isinstance(appid, int):
            continue
        key = normalize_name(name)
        idx.setdefault(key, []).append(appid)
    return idx


def store_search_appid(name: str) -> int | None:
    q = name.strip()
    try:
        j = http_get_json(API_STORESEARCH, params={"term": q, "cc": "us", "l": "en"}, timeout=REQ_TIMEOUT_STORE, retries=REQ_RETRIES)
        items = j.get("items") or []
        if not items:
            return None
        key = normalize_name(q)
        for it in items:
            nm = normalize_name(it.get("name") or "")
            if nm == key:
                return it.get("id")
        return items[0].get("id")
    except Exception:
        return None


def store_search_match(name: str) -> dict | None:
    q = name.strip()
    try:
        j = http_get_json(API_STORESEARCH, params={"term": q, "cc": "us", "l": "en"}, timeout=REQ_TIMEOUT_STORE, retries=REQ_RETRIES)
        items = j.get("items") or []
        if not items:
            return None
        key = normalize_name(q)
        for it in items:
            nm = normalize_name(it.get("name") or "")
            if nm == key:
                return it
        return items[0]
    except Exception:
        return None


def find_appid_by_name(name: str, name_index: dict, apps: list[dict]) -> int | None:
    key = normalize_name(name)
    if key in _NAME_APPID_CACHE:
        return _NAME_APPID_CACHE[key]
    appid = store_search_appid(name)
    if isinstance(appid, int):
        _NAME_APPID_CACHE[key] = appid
        return appid
    if key in name_index:
        aid = name_index[key][0]
        _NAME_APPID_CACHE[key] = aid
        return aid
    words = [w for w in key.split(" ") if w]
    best_score = 0.0
    best_appid = None
    for k, ids in name_index.items():
        c_words = [w for w in k.split(" ") if w]
        inter = len([w for w in words if w in c_words])
        score = inter / max(1, len(words))
        if k.startswith(key) or key.startswith(k):
            score += 0.2
        if score > best_score:
            best_score = score
            best_appid = ids[0]
    if best_score >= 0.6 and best_appid is not None:
        _NAME_APPID_CACHE[key] = best_appid
        return best_appid
    return None


def fetch_appdetails(appid: int) -> dict | None:
    if appid in _DETAILS_CACHE:
        return _DETAILS_CACHE[appid]
    j = http_get_json(API_APPDETAILS, params={"appids": str(appid), "cc": "us", "l": "en"}, timeout=REQ_TIMEOUT_DETAILS, retries=REQ_RETRIES)
    data = j.get(str(appid))
    if not data or not data.get("success"):
        return None
    det = data.get("data")
    if isinstance(det, dict):
        _DETAILS_CACHE[appid] = det
    return det


def extract_genres(details: dict) -> list[str]:
    gs = details.get("genres") or []
    return [g.get("description") for g in gs if g.get("description")]


def fetch_steamspy_appdetails(appid: int) -> dict | None:
    try:
        j = http_get_json(API_STEAMSPY, params={"request": "appdetails", "appid": str(appid)}, timeout=REQ_TIMEOUT_SPY, retries=REQ_RETRIES)
        if not isinstance(j, dict):
            return None
        return j
    except Exception:
        return None

_STORE_TAGS_CACHE: dict[int, list[str]] = {}

def fetch_store_tags(appid: int) -> list[str] | None:
    if appid in _STORE_TAGS_CACHE:
        return _STORE_TAGS_CACHE[appid]
    try:
        html = http_get_text(f"{STORE_APP_URL}{appid}/", params={"l": "en", "cc": "us"}, timeout=REQ_TIMEOUT_STOREPAGE, retries=REQ_RETRIES)
        tags = re.findall(r"<a[^>]*class=\"app_tag\"[^>]*>([^<]+)</a>", html, flags=re.I)
        out: list[str] = []
        seen = set()
        for t in tags:
            tt = t.strip()
            if not tt:
                continue
            low = tt.casefold()
            if low in seen:
                continue
            seen.add(low)
            out.append(tt)
            if len(out) >= 5:
                break
        if out:
            _STORE_TAGS_CACHE[appid] = out
            return out
        return None
    except Exception:
        return None


def fetch_steamdb_genres(appid: int) -> list[str] | None:
    if appid in _STEAMDB_GENRES_CACHE:
        return _STEAMDB_GENRES_CACHE[appid]
    try:
        html = http_get_text(f"{STEAMDB_APP_URL}{appid}/", timeout=REQ_TIMEOUT_DB, retries=REQ_RETRIES)
        m = re.search(r"<td[^>]*>\s*Genres\s*</td>\s*<td[^>]*>(.*?)</td>", html, flags=re.I | re.S)
        block = None
        if not m:
            m2 = re.search(r"<td[^>]*>\s*Popular\s+tags\s*</td>\s*<td[^>]*>(.*?)</td>", html, flags=re.I | re.S)
            if m2:
                block = m2.group(1)
        else:
            block = m.group(1)
        if not block:
            return None
        texts = re.findall(r"<a[^>]*>([^<]+)</a>", block, flags=re.I)
        out = []
        seen = set()
        for t in texts:
            tt = t.strip()
            if not tt:
                continue
            if tt.lower() in seen:
                continue
            seen.add(tt.lower())
            out.append(tt)
            if len(out) >= 5:
                break
        if out:
            _STEAMDB_GENRES_CACHE[appid] = out
            return out
        return None
    except Exception:
        return None


def run(input_path: Path, output_path: Path | None, name_col: str | None, minimal: bool, live: bool, workers: int, live_order: bool, no_spy: bool = False, cache_dir: Path | None = None, no_store_tags: bool = False, no_steamdb: bool = False, limit: int | None = None):
    import csv
    from concurrent.futures import ThreadPoolExecutor, as_completed

    apps = fetch_applist()
    name_index = build_name_index(apps)

    if cache_dir:
        try:
            p1 = cache_dir / "name_appid.json"
            p2 = cache_dir / "details.json"
            p3 = cache_dir / "steamdb_genres.json"
            p4 = cache_dir / "store_tags.json"
            if p1.exists():
                with p1.open("r", encoding="utf-8") as f1:
                    d = json.load(f1)
                    for k, v in d.items():
                        if isinstance(v, int):
                            _NAME_APPID_CACHE[k] = v
            if p2.exists():
                with p2.open("r", encoding="utf-8") as f2:
                    d2 = json.load(f2)
                    for k, v in d2.items():
                        try:
                            ik = int(k)
                        except Exception:
                            continue
                        if isinstance(v, dict):
                            _DETAILS_CACHE[ik] = v
            if p3.exists():
                with p3.open("r", encoding="utf-8") as f3:
                    d3 = json.load(f3)
                    for k, v in d3.items():
                        try:
                            ik = int(k)
                        except Exception:
                            continue
                        if isinstance(v, list):
                            _STEAMDB_GENRES_CACHE[ik] = v
            if p4.exists():
                with p4.open("r", encoding="utf-8") as f4:
                    d4 = json.load(f4)
                    for k, v in d4.items():
                        try:
                            ik = int(k)
                        except Exception:
                            continue
                        if isinstance(v, list):
                            _STORE_TAGS_CACHE[ik] = v
        except Exception:
            pass

    out_rows = []
    names: list[tuple[int, str]] = []
    with input_path.open("r", encoding="utf-8") as f:
        sample = f.read(4096)
        f.seek(0)
        use_dict = False
        try:
            import csv as _csv
            _csv.Sniffer().sniff(sample, delimiters=[",", ";", "\t"])
            use_dict = True
        except Exception:
            use_dict = ("," in sample or ";" in sample or "\t" in sample)
        if use_dict:
            r = csv.DictReader(f)
            headers = [h for h in (r.fieldnames or [])]
            ncol = name_col
            if not ncol and headers:
                lower = [h.lower() for h in headers]
                for cand in ["name", "title", "game", "game name"]:
                    if cand in lower:
                        ncol = headers[lower.index(cand)]
                        break
            if not ncol and headers:
                ncol = headers[0]
            if not ncol:
                raise RuntimeError("missing required name column")
            seq = 1
            for row in r:
                nm = row.get(ncol) or ""
                if not nm:
                    continue
                names.append((seq, nm))
                seq += 1
                if limit and seq > limit:
                    break
        else:
            f.seek(0)
            r = csv.reader(f)
            seq = 1
            for row in r:
                if not row:
                    continue
                nm = str(row[0]).strip()
                if not nm:
                    continue
                names.append((seq, nm))
                seq += 1
                if limit and seq > limit:
                    break

    exclude = {
        "Free To Play",
        "Early Access",
        "Demo",
        "Utilities",
        "Animation & Modeling",
        "Design & Illustration",
        "Photo Editing",
        "Audio Production",
        "Video Production",
        "Education",
        "Game Development",
    }
    ex_lower = {e.casefold() for e in exclude}

    results_cache: dict[str, dict] = {}

    def process_name(seq: int, nm: str):
        norm = normalize_name(nm)
        if norm in results_cache:
            base = results_cache[norm]
            if minimal:
                return {"seq": seq, "name": nm, "genres": base.get("genres", "")}
            else:
                return {
                    "seq": seq,
                    "name": nm,
                    "appid": base.get("appid"),
                    "official_name": base.get("official_name"),
                    "genres": base.get("genres", ""),
                }
        appid = find_appid_by_name(nm, name_index, apps)
        details = None
        if appid is not None:
            try:
                details = fetch_appdetails(appid)
            except Exception:
                details = None
        genres = extract_genres(details) if details else []
        s = None
        tags_store = None
        if appid is not None and not no_store_tags and (not genres):
            try:
                tags_store = fetch_store_tags(appid)
            except Exception:
                tags_store = None
        if appid is not None and (not no_spy or not genres):
            try:
                s = fetch_steamspy_appdetails(appid)
            except Exception:
                s = None
        labels = []
        for g in genres:
            if g.casefold() in ex_lower:
                continue
            if g not in labels:
                labels.append(g)
            if len(labels) >= 3:
                break
        if len(labels) < 3 and tags_store:
            for k in tags_store:
                ck = canonicalize_tag(k)
                if ck.casefold() in ex_lower:
                    continue
                if ck not in labels:
                    if ck == "Shooter":
                        labels.insert(0, ck)
                    else:
                        labels.append(ck)
                if len(labels) >= 3:
                    break
        if len(labels) < 3 and s and isinstance(s.get("tags"), dict):
            items = sorted(s.get("tags").items(), key=lambda x: (-int(x[1]), x[0]))
            for k, _v in items:
                ck = canonicalize_tag(k)
                if ck.casefold() in ex_lower:
                    continue
                if ck not in labels:
                    if ck == "Shooter":
                        labels.insert(0, ck)
                    else:
                        labels.append(ck)
                if len(labels) >= 3:
                    break
        if appid is not None and not no_steamdb and (not labels):
            g2 = fetch_steamdb_genres(appid)
            if g2:
                for g in g2:
                    cg = canonicalize_tag(g)
                    if cg.casefold() in ex_lower:
                        continue
                    if cg not in labels:
                        if cg == "Shooter":
                            labels.insert(0, cg)
                        else:
                            labels.append(cg)
                    if len(labels) >= 3:
                        break
        if minimal:
            row = {"seq": seq, "name": nm, "genres": ";".join(labels) if labels else ""}
            results_cache[norm] = {"genres": row["genres"]}
        else:
            row = {
                "seq": seq,
                "name": nm,
                "appid": appid,
                "official_name": details.get("name") if details else (store_search_match(nm) or {}).get("name"),
                "genres": ";".join(labels) if labels else "",
            }
            results_cache[norm] = {"genres": row["genres"], "appid": appid, "official_name": row.get("official_name")}
        return row

    if workers and workers > 1:
        with ThreadPoolExecutor(max_workers=workers) as ex:
            futures = {ex.submit(process_name, seq, nm): seq for (seq, nm) in names}
            if live_order:
                next_seq = 1
                buffer: dict[int, dict] = {}
                for fut in as_completed(futures):
                    row = fut.result()
                    buffer[row["seq"]] = row
                    while next_seq in buffer:
                        r = buffer.pop(next_seq)
                        out_rows.append(r)
                        if live:
                            if minimal:
                                print(f"{r['seq']},{r['name']},{r['genres']}")
                            else:
                                print(f"{r['seq']},{r['name']},{r.get('appid')},{r.get('official_name')},{r['genres']}")
                        next_seq += 1
                # drain any remaining in order
                for seq in sorted(buffer.keys()):
                    r = buffer[seq]
                    out_rows.append(r)
                    if live:
                        if minimal:
                            print(f"{r['seq']},{r['name']},{r['genres']}")
                        else:
                            print(f"{r['seq']},{r['name']},{r.get('appid')},{r.get('official_name')},{r['genres']}")
            else:
                for fut in as_completed(futures):
                    row = fut.result()
                    out_rows.append(row)
    else:
        for seq, nm in names:
            row = process_name(seq, nm)
            out_rows.append(row)
            if live:
                if minimal:
                    print(f"{row['seq']},{row['name']},{row['genres']}")
                else:
                    print(f"{row['seq']},{row['name']},{row.get('appid')},{row.get('official_name')},{row['genres']}")

    if output_path:
        output_path.parent.mkdir(parents=True, exist_ok=True)
        import csv
        fo = None
        try:
            fo = output_path.open("w", newline="", encoding="utf-8")
        except PermissionError:
            stem = output_path.stem
            suffix = output_path.suffix
            idx = 1
            while True:
                cand = output_path.with_name(f"{stem}_{idx}{suffix}")
                try:
                    fo = cand.open("w", newline="", encoding="utf-8")
                    output_path = cand
                    break
                except PermissionError:
                    idx += 1
                    if idx > 100:
                        raise
        with fo:
            fields = ["seq", "name", "genres"] if minimal else ["seq", "name", "appid", "official_name", "genres"]
            out_rows.sort(key=lambda r: int(r.get("seq", 0)))
            w = csv.DictWriter(fo, fieldnames=fields, extrasaction="ignore")
            w.writeheader()
            for r in out_rows:
                w.writerow(r)
        if cache_dir:
            try:
                cache_dir.mkdir(parents=True, exist_ok=True)
                p1 = cache_dir / "name_appid.json"
                p2 = cache_dir / "details.json"
                p3 = cache_dir / "steamdb_genres.json"
                p4 = cache_dir / "store_tags.json"
                with p1.open("w", encoding="utf-8") as f1:
                    json.dump(_NAME_APPID_CACHE, f1, ensure_ascii=False)
                to_dump = {str(k): v for k, v in _DETAILS_CACHE.items()}
                with p2.open("w", encoding="utf-8") as f2:
                    json.dump(to_dump, f2, ensure_ascii=False)
                to_dump2 = {str(k): v for k, v in _STEAMDB_GENRES_CACHE.items()}
                with p3.open("w", encoding="utf-8") as f3:
                    json.dump(to_dump2, f3, ensure_ascii=False)
                to_dump3 = {str(k): v for k, v in _STORE_TAGS_CACHE.items()}
                with p4.open("w", encoding="utf-8") as f4:
                    json.dump(to_dump3, f4, ensure_ascii=False)
            except Exception:
                pass
    else:
        out_rows.sort(key=lambda r: int(r.get("seq", 0)))
        for r in out_rows:
            if minimal:
                print(f"{r['seq']},{r['name']},{r['genres']}")
            else:
                print(f"{r['seq']},{r['name']},{r['appid']},{r['official_name']},{r['genres']}")


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--input", type=str, required=True)
    p.add_argument("--out", type=str)
    p.add_argument("--name-column", type=str)
    p.add_argument("--insecure", action="store_true")
    p.add_argument("--minimal", action="store_true")
    p.add_argument("--live", action="store_true")
    p.add_argument("--workers", type=int, default=8)
    p.add_argument("--live-order", action="store_true")
    p.add_argument("--timeout-store", type=int, default=5)
    p.add_argument("--timeout-details", type=int, default=8)
    p.add_argument("--timeout-spy", type=int, default=8)
    p.add_argument("--timeout-store-page", type=int, default=8)
    p.add_argument("--timeout-steamdb", type=int, default=8)
    p.add_argument("--retries", type=int, default=1)
    p.add_argument("--no-spy", action="store_true")
    p.add_argument("--no-store-tags", action="store_true")
    p.add_argument("--no-steamdb", action="store_true")
    p.add_argument("--cache-dir", type=str)
    p.add_argument("--limit", type=int)
    args = p.parse_args()

    global GLOBAL_SSL_CONTEXT
    if args.insecure:
        GLOBAL_SSL_CONTEXT = ssl._create_unverified_context()
    else:
        GLOBAL_SSL_CONTEXT = None

    global REQ_TIMEOUT_STORE, REQ_TIMEOUT_DETAILS, REQ_TIMEOUT_SPY, REQ_RETRIES, REQ_TIMEOUT_DB, REQ_TIMEOUT_STOREPAGE
    REQ_TIMEOUT_STORE = args.timeout_store
    REQ_TIMEOUT_DETAILS = args.timeout_details
    REQ_TIMEOUT_SPY = args.timeout_spy
    REQ_RETRIES = args.retries
    REQ_TIMEOUT_DB = args.timeout_steamdb
    REQ_TIMEOUT_STOREPAGE = args.timeout_store_page

    run(
        Path(args.input),
        Path(args.out) if args.out else None,
        args.name_column,
        args.minimal,
        args.live,
        args.workers,
        args.live_order,
        args.no_spy,
        Path(args.cache_dir) if args.cache_dir else Path.cwd() / ".cache",
        args.no_store_tags,
        args.no_steamdb,
        args.limit,
    )


if __name__ == "__main__":
    main()