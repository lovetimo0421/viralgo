import argparse
from pathlib import Path


def normalize_header(name: str) -> str:
    return (name or "").strip().lower().replace("_", " ")


def parse_int(s: str | int | None) -> int:
    if s is None:
        return 0
    if isinstance(s, int):
        return s
    t = str(s).strip().replace(",", "")
    if not t:
        return 0
    try:
        return int(float(t))
    except Exception:
        return 0


def aggregate_dau_by_genre(input_path: Path, output_path: Path | None, genres_col: str | None, players2025_col: str | None) -> list[tuple[str, int]]:
    import csv

    with input_path.open("r", encoding="utf-8") as f:
        r = csv.DictReader(f)
        headers = [normalize_header(h) for h in r.fieldnames or []]
        columns_map = {normalize_header(h): h for h in r.fieldnames or []}
        gcol = genres_col or None
        pcol = players2025_col or None
        if gcol is None:
            for cand in ["genres", "genre"]:
                if cand in headers:
                    gcol = columns_map[cand]
                    break
        if pcol is None:
            for h in headers:
                if "2025" in h and ("most" in h or "active" in h or "players" in h):
                    pcol = columns_map[h]
                    break
        if gcol is None or pcol is None:
            raise RuntimeError("missing required columns: genres or most active players in 2025")
        from collections import defaultdict
        acc: dict[str, int] = defaultdict(int)
        for row in r:
            raw_genres = row.get(gcol) or ""
            val = parse_int(row.get(pcol))
            if not raw_genres:
                continue
            parts = [p.strip() for p in raw_genres.replace("/", ";").replace(",", ";").split(";")]
            for g in parts:
                if not g:
                    continue
                acc[g] += val
        items = sorted(acc.items(), key=lambda x: (-x[1], x[0]))
        if output_path:
            output_path.parent.mkdir(parents=True, exist_ok=True)
            with output_path.open("w", newline="", encoding="utf-8") as fo:
                w = csv.writer(fo)
                w.writerow(["genre", "total_most_active_players_2025"])
                for g, v in items:
                    w.writerow([g, v])
        return items


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--input", type=str, required=True)
    p.add_argument("--out", type=str)
    p.add_argument("--genres-column", type=str)
    p.add_argument("--players2025-column", type=str)
    args = p.parse_args()

    input_path = Path(args.input)
    output_path = Path(args.out) if args.out else None
    res = aggregate_dau_by_genre(input_path, output_path, args.genres_column, args.players2025_column)
    for g, v in res:
        print(f"{g},{v}")


if __name__ == "__main__":
    main()