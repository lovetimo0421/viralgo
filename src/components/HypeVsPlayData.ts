export interface HypePlayDataPoint {
  id: number;
  platform: 'PC' | 'Console' | 'Mobile' | 'VR';
  dau: number;
  revenue: number;
  streamViewership: number;
  socialMentions: number;
  topGenre: string;
  name: string; // adding a mock name for tooltip
}

const PLATFORMS = ['PC', 'Console', 'Mobile', 'VR'] as const;
const GENRES = ['Action', 'RPG', 'FPS', 'Adventure', 'Simulation', 'Strategy', 'MOBA'];

export const generateHypePlayData = (count: number = 50): HypePlayDataPoint[] => {
  return Array.from({ length: count }, (_, i) => {
    const platform = PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)];
    const genre = GENRES[Math.floor(Math.random() * GENRES.length)];
    
    // Generate somewhat correlated data (hype correlates slightly with play)
    const base = Math.random();
    const viewership = Math.floor(1000 + base * 1000000 * (Math.random() * 2)); // Log-like spread
    const mentions = Math.floor(viewership / 10 + Math.random() * 5000);
    
    // DAU correlates with viewership but with variance
    const dau = Math.floor(viewership * (0.5 + Math.random()) + Math.random() * 50000);
    
    // Revenue correlates with DAU + Platform bias
    let revMultiplier = 1;
    if (platform === 'Mobile') revMultiplier = 0.5; // Lower per user?
    if (platform === 'VR') revMultiplier = 2.0; // Higher per user?
    const revenue = Math.floor(dau * (1 + Math.random() * 5) * revMultiplier);

    return {
      id: i,
      platform,
      dau: Math.max(100, dau), // Ensure non-zero for log scale
      revenue: Math.max(100, revenue),
      streamViewership: Math.max(100, viewership),
      socialMentions: Math.max(10, mentions),
      topGenre: genre,
      name: `Game ${i + 1}`
    };
  });
};

export const HYPE_PLAY_DATA = generateHypePlayData(50);

export const PLATFORM_COLORS = {
  PC: '#2E93fA',      // Blue
  Console: '#66DA26', // Green
  Mobile: '#FF9800',  // Orange
  VR: '#9C27B0'       // Purple
};
