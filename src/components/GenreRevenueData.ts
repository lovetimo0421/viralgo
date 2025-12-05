import { GENRE_COLORS } from './GenreData';

export interface GenreRevenueData {
  genre: string;
  revenue: number;
  units: number;
  revenuePerUnit: number;
  color: string;
}

const rawData = [
  { genre: "Tactical Shooter", revenue: 16400000, units: 1600000 },
  { genre: "MMORPG", revenue: 8100000, units: 181000 },
  { genre: "4X Strategy", revenue: 6400000, units: 201000 },
  { genre: "Action RPG", revenue: 5200000, units: 178000 },
  { genre: "Arena Shooter", revenue: 3200000, units: 187000 },
  { genre: "Grand Strategy", revenue: 3100000, units: 114000 },
  { genre: "Hero Shooter", revenue: 3100000, units: 1100000 },
  { genre: "Survival Craft", revenue: 2700000, units: 170000 },
  { genre: "Simulation Racing", revenue: 2500000, units: 183000 },
  { genre: "Action-Adventure", revenue: 2400000, units: 109000 },
  { genre: "Tabletop (General)", revenue: 2100000, units: 143000 },
  { genre: "Hack & Slash", revenue: 2100000, units: 80388 },
  { genre: "Fighting", revenue: 2000000, units: 111000 },
  { genre: "Shooter (General)", revenue: 1800000, units: 124000 },
  { genre: "Real-Time Strategy", revenue: 1800000, units: 110000 },
  { genre: "City Builder", revenue: 1800000, units: 87522 },
  { genre: "Driving & Flight Simulator", revenue: 1500000, units: 71174 },
  { genre: "Sandbox", revenue: 1200000, units: 102000 },
  { genre: "Simulation Sports", revenue: 1200000, units: 94590 },
  { genre: "Colony Sim", revenue: 1100000, units: 82019 },
  { genre: "Turn-Based RPG", revenue: 1100000, units: 48344 },
  { genre: "Arcade Racing", revenue: 917000, units: 50859 },
  { genre: "Metroidvania", revenue: 819000, units: 54596 },
  { genre: "Strategy (General)", revenue: 758000, units: 50597 },
  { genre: "Job Simulator", revenue: 744000, units: 53024 },
  { genre: "Tactics", revenue: 626000, units: 35509 },
  { genre: "Survival Horror", revenue: 601000, units: 41418 },
  { genre: "Tycoon & Management", revenue: 599000, units: 33412 },
  { genre: "Action (General)", revenue: 519000, units: 47779 },
  { genre: "Hunting & Fishing Simulator", revenue: 515000, units: 74125 },
  { genre: "Life Simulator", revenue: 496000, units: 39069 },
  { genre: "Simulation (General)", revenue: 493000, units: 70059 },
  { genre: "RPG (General)", revenue: 491000, units: 26407 },
  { genre: "Social Party", revenue: 421000, units: 52995 },
  { genre: "Vehicular Shooter", revenue: 379000, units: 85128 },
  { genre: "Shoot 'em Up", revenue: 364000, units: 21404 },
  { genre: "Beat 'em Up", revenue: 332000, units: 38470 },
  { genre: "Adventure (General)", revenue: 301000, units: 27113 },
  { genre: "Music & Rhythm", revenue: 294000, units: 23093 },
  { genre: "Deckbuilder", revenue: 218000, units: 23713 },
  { genre: "Dating", revenue: 198000, units: 25986 },
  { genre: "Tower Defense", revenue: 195000, units: 29563 },
  { genre: "MOBA", revenue: 189000, units: 786000 },
  { genre: "Sports Manager", revenue: 176000, units: 31880 },
  { genre: "Arcade Sports", revenue: 172000, units: 45871 },
  { genre: "Platformer", revenue: 164000, units: 16999 },
  { genre: "Point & Click Adventure", revenue: 151000, units: 20026 },
  { genre: "Card Battler", revenue: 141000, units: 82561 },
  { genre: "Kart Racing", revenue: 130000, units: 24981 },
  { genre: "Racing (General)", revenue: 117000, units: 11077 },
  { genre: "Visual Novel", revenue: 116000, units: 13663 },
  { genre: "Board", revenue: 107000, units: 30171 },
  { genre: "Puzzle (General)", revenue: 98135, units: 15147 },
  { genre: "Sports (General)", revenue: 92454, units: 9853 },
  { genre: "Battle Royale", revenue: 89411, units: 380000 },
  { genre: "Lifestyle (General)", revenue: 84774, units: 21230 },
  { genre: "Card", revenue: 78733, units: 13358 },
  { genre: "Idler & Clicker", revenue: 47014, units: 30893 },
  { genre: "Arcade (General)", revenue: 33677, units: 12144 },
  { genre: "Poker", revenue: 16235, units: 50523 },
  { genre: "Casino (General)", revenue: 5085, units: 3943 },
];

// Fallback colors for genres not in the main list
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
  "Default": "#999999"
};

const getGenreColor = (genre: string) => {
  // Check direct match
  if (GENRE_COLORS[genre]) return GENRE_COLORS[genre];
  
  // Check partial match / family
  if (genre.includes("Shooter") || genre.includes("FPS")) return FAMILY_COLORS["Shooter"];
  if (genre.includes("Strategy") || genre.includes("RTS") || genre.includes("4X") || genre.includes("Tower") || genre.includes("Card") || genre.includes("Deckbuilder") || genre.includes("Battler") || genre.includes("Board") || genre.includes("Management") || genre.includes("Tycoon") || genre.includes("Tactics")) return FAMILY_COLORS["Strategy"];
  if (genre.includes("RPG") || genre.includes("Role-Playing")) return FAMILY_COLORS["RPG"];
  if (genre.includes("Simulation") || genre.includes("Simulator") || genre.includes("Sim") || genre.includes("Life") || genre.includes("Job")) return FAMILY_COLORS["Simulation"];
  if (genre.includes("Sports") || genre.includes("Racing") || genre.includes("Driving") || genre.includes("Vehicular") || genre.includes("Kart")) return FAMILY_COLORS["Sports"];
  if (genre.includes("Action") || genre.includes("Hack") || genre.includes("Beat") || genre.includes("Fighting") || genre.includes("Metroidvania") || genre.includes("Platformer") || genre.includes("Survival")) return FAMILY_COLORS["Action"];
  if (genre.includes("Adventure") || genre.includes("Point & Click") || genre.includes("Visual Novel")) return FAMILY_COLORS["Adventure"];
  if (genre.includes("Casual") || genre.includes("Puzzle") || genre.includes("Party") || genre.includes("Trivia") || genre.includes("Word") || genre.includes("Idler") || genre.includes("Lifestyle") || genre.includes("Dating")) return FAMILY_COLORS["Casual"];
  if (genre.includes("Arcade") || genre.includes("Music") || genre.includes("Rhythm") || genre.includes("Pinball") || genre.includes("Poker") || genre.includes("Casino")) return FAMILY_COLORS["Arcade"];
  
  return FAMILY_COLORS["Default"];
};

export const GENRE_REVENUE_DATA: GenreRevenueData[] = rawData.map(d => ({
  ...d,
  revenuePerUnit: d.revenue / d.units,
  color: getGenreColor(d.genre)
}));
