import argparse
import csv
from pathlib import Path


def safe_open_read(path: Path):
    try:
        return path.open("r", encoding="utf-8", newline="")
    except UnicodeDecodeError:
        return path.open("r", encoding="utf-8-sig", newline="")


def parse_year(path: Path) -> int | None:
    try:
        return int(path.stem)
    except Exception:
        return None


def parse_peak(vals: list[str]) -> int:
    for x in reversed(vals):
        try:
            return int(str(x).strip())
        except Exception:
            continue
    return 0


def write_csv(rows: list[list], out_path: Path, encoding: str):
    out_path.parent.mkdir(parents=True, exist_ok=True)
    try:
        with out_path.open("w", encoding=encoding, newline="") as f:
            w = csv.writer(f)
            for r in rows:
                w.writerow(r)
    except PermissionError:
        stem = out_path.stem
        suffix = out_path.suffix or ".csv"
        i = 1
        while i <= 100:
            cand = out_path.with_name(f"{stem}_{i}{suffix}")
            try:
                with cand.open("w", encoding=encoding, newline="") as f:
                    w = csv.writer(f)
                    for r in rows:
                        w.writerow(r)
                break
            except PermissionError:
                i += 1


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--input-dir", type=str, default=str(Path("Data") / "years"))
    p.add_argument("--out", type=str, default=str(Path("Data") / "genre_year_peak.csv"))
    p.add_argument("--encoding", type=str, default="utf-8")
    p.add_argument("--pairs-out", type=str, default=str(Path("Data") / "genre_pairs.csv"))
    p.add_argument("--year-out-dir", type=str, default=str(Path("Data") / "genre_year_lists"))
    args = p.parse_args()

    in_dir = Path(args.input_dir)
    files = sorted([fp for fp in in_dir.glob("*.csv") if parse_year(fp) is not None], key=lambda p: parse_year(p))
    years = [parse_year(fp) for fp in files]
    genre_year_sum: dict[str, dict[int, int]] = {}
    pairs_totals: dict[tuple[str, str], int] = {}

    # Pass 1: Build global game->genres map
    global_game_genres: dict[str, set[str]] = {}
    for fp in files:
        f = safe_open_read(fp)
        with f:
            r = csv.reader(f)
            for row in r:
                if not row or len(row) < 2:
                    continue
                # Assume row[0] is Name, row[1] is Genres
                name = row[0].strip()
                genres_field = str(row[1])
                genres = [g.strip() for g in genres_field.split(";") if g.strip()]
                if name:
                    if name not in global_game_genres:
                        global_game_genres[name] = set()
                    global_game_genres[name].update(genres)

    # Pass 2: Aggregate data using unified genres
    for fp in files:
        yr = parse_year(fp)
        if yr is None:
            continue
        f = safe_open_read(fp)
        with f:
            r = csv.reader(f)
            for row in r:
                if not row:
                    continue
                if len(row) < 3:
                    continue
                
                name = row[0].strip()
                # Use the whole row to find peak, or specifically look at the last columns
                peak = parse_peak(row)
                
                # Use unified genres if available, otherwise fallback to row genres (shouldn't happen if name match)
                if name in global_game_genres:
                    genres = list(global_game_genres[name])
                else:
                    genres_field = str(row[1])
                    genres = [g.strip() for g in genres_field.split(";") if g.strip()]
                
                for g in genres:
                    d = genre_year_sum.setdefault(g, {})
                    d[yr] = d.get(yr, 0) + peak
                
                if len(genres) >= 2:
                    seen = set()
                    for i in range(len(genres)):
                        for j in range(i + 1, len(genres)):
                            a, b = genres[i], genres[j]
                            key = tuple(sorted((a, b)))
                            if key in seen:
                                continue
                            seen.add(key)
                            pairs_totals[key] = pairs_totals.get(key, 0) + peak
    totals = []
    for g, m in genre_year_sum.items():
        s = sum(m.get(y, 0) for y in years)
        totals.append((g, s))
    totals.sort(key=lambda x: (-x[1], x[0]))
    header = ["Rank", "Genre"] + [str(y) for y in years]
    out_rows = [header]
    rank = 1
    for g, _s in totals:
        row = [rank, g] + [genre_year_sum.get(g, {}).get(y, 0) for y in years]
        out_rows.append(row)
        rank += 1
    write_csv(out_rows, Path(args.out), args.encoding)
    ydir = Path(args.year_out_dir)
    for y in years:
        glist = []
        for g, m in genre_year_sum.items():
            v = m.get(y, 0)
            if v > 0:
                glist.append((g, v))
        glist.sort(key=lambda x: (-x[1], x[0]))
        header_y = ["Rank", "Genre", str(y)]
        rows_y = [header_y]
        rk = 1
        for g, v in glist:
            rows_y.append([rk, g, v])
            rk += 1
        write_csv(rows_y, ydir / f"{y}.csv", args.encoding)
    pairs_sorted = sorted([(f"{a} + {b}", v) for (a, b), v in pairs_totals.items()], key=lambda x: (-x[1], x[0]))
    pairs_rows = [["Rank", "Pair", "Total"]]
    pr = 1
    for name, val in pairs_sorted:
        pairs_rows.append([pr, name, val])
        pr += 1
    write_csv(pairs_rows, Path(args.pairs_out), args.encoding)


if __name__ == "__main__":
    main()
