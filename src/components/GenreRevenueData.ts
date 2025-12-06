import { GENRE_COLORS } from "./genreColors";

export interface GenreRevenueData {
  genre: string;
  revenue: number;
  units: number;
  revenuePerUnit: number;
  color: string;
}

// Fallback color families to keep related genres visually consistent.
const FAMILY_COLORS: Record<string, string> = {
  "Shooter": "#A23B72",
  "Strategy": "#8338EC",
  "RPG": "#FF006E",
  "Simulation": "#3A86FF",
  "Sports": "#247BA0",
  "Action": "#FF5416",
  "Adventure": "#2E86AB",
  "Casual": "#00A676",
  "Indie": "#F18F01",
  "Arcade": "#5E6472",
  "Racing": "#588157",
  "Horror": "#FF1654",
  "Survival": "#482C3D",
  "City": "#69306D",
  "Sandbox": "#404E4D",
  "Card": "#F2C14E",
  "Puzzle": "#F2C14E",
  "Platform": "#5E6472",
  "Rhythm": "#00A676",
  "MMO": "#56CFE1",
  "Default": "#999999",
};

// Deterministic hash to spread colors when no family match.
const hashColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // convert to 32-bit int
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 60%, 55%)`;
};

export const getGenreColor = (genre: string) => {
  if (!genre) return FAMILY_COLORS.Default;

  // Exact match first.
  if (GENRE_COLORS[genre]) return GENRE_COLORS[genre];

  const lower = genre.toLowerCase();
  // Family keyword match (case-insensitive, substring).
  for (const [key, color] of Object.entries(FAMILY_COLORS)) {
    if (key === "Default") continue;
    if (lower.includes(key.toLowerCase())) return color;
  }

  // Deterministic hash fallback for anything unknown.
  return hashColor(genre);
};

// No bundled dataset; data comes from the backend.
export const GENRE_REVENUE_DATA: GenreRevenueData[] = [];
