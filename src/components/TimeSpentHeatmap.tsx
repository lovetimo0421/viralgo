import React, { useState, useMemo } from 'react';
import { cn } from "./ui/utils";

// --- Types & Data ---

type Platform = 'PC' | 'Console' | 'Mobile' | 'VR';

interface HeatmapData {
  genre: string;
  platforms: {
    [key in Platform]: {
      duration: number; // minutes
      dau: number;
      revenue: number;
      count: number;
    }
  };
  totalDau: number; // For sorting
}

// Data from screenshot
const RAW_DATA: HeatmapData[] = [
  {
    genre: 'Action',
    platforms: {
      Console: { duration: 59.86, dau: 44411, revenue: 44904, count: 285 },
      Mobile: { duration: 25.09, dau: 93842, revenue: 102547, count: 259 },
      PC: { duration: 46.23, dau: 53637, revenue: 74518, count: 253 },
      VR: { duration: 21.4, dau: 1853, revenue: 23281, count: 275 }
    },
    totalDau: 44411 + 93842 + 53637 + 1853
  },
  {
    genre: 'Adventure',
    platforms: {
      Console: { duration: 58.87, dau: 44788, revenue: 48474, count: 246 },
      Mobile: { duration: 26.06, dau: 91210, revenue: 110459, count: 221 },
      PC: { duration: 47.62, dau: 57310, revenue: 67430, count: 261 },
      VR: { duration: 21.48, dau: 1870, revenue: 23823, count: 230 }
    },
    totalDau: 44788 + 91210 + 57310 + 1870
  },
  {
    genre: 'FPS',
    platforms: {
      Console: { duration: 56.73, dau: 44870, revenue: 48981, count: 244 },
      Mobile: { duration: 26.17, dau: 86462, revenue: 100839, count: 237 },
      PC: { duration: 47.93, dau: 55051, revenue: 70170, count: 244 },
      VR: { duration: 22.89, dau: 1890, revenue: 22328, count: 260 }
    },
    totalDau: 44870 + 86462 + 55051 + 1890
  },
  {
    genre: 'RPG',
    platforms: {
      Console: { duration: 60.68, dau: 43337, revenue: 44363, count: 237 },
      Mobile: { duration: 25.1, dau: 94118, revenue: 103652, count: 265 },
      PC: { duration: 46.69, dau: 53924, revenue: 73280, count: 248 },
      VR: { duration: 21.35, dau: 1846, revenue: 23690, count: 254 }
    },
    totalDau: 43337 + 94118 + 53924 + 1846
  },
  {
    genre: 'Simulation',
    platforms: {
      Console: { duration: 60.12, dau: 45249, revenue: 48206, count: 231 },
      Mobile: { duration: 24.94, dau: 43374, revenue: 101116, count: 244 },
      PC: { duration: 49.34, dau: 55894, revenue: 68822, count: 244 },
      VR: { duration: 22.45, dau: 1816, revenue: 23232, count: 251 }
    },
    totalDau: 45249 + 43374 + 55894 + 1816
  }
];

const ALL_PLATFORMS: Platform[] = ['PC', 'Console', 'Mobile', 'VR'];

// --- Color Scale ---
// Min ~20, Max ~60
// Light (20) -> Dark (60)
// Using a blue/purple scale
const getColor = (value: number) => {
  if (value < 25) return '#e0f2fe'; // sky-100
  if (value < 35) return '#bae6fd'; // sky-200
  if (value < 45) return '#7dd3fc'; // sky-300
  if (value < 50) return '#38bdf8'; // sky-400
  if (value < 55) return '#0ea5e9'; // sky-500
  if (value < 58) return '#0284c7'; // sky-600
  return '#0369a1'; // sky-700
};

const getTextColor = (value: number) => {
  return value > 50 ? '#ffffff' : '#0f172a';
};

export function TimeSpentHeatmap({ className, style }: { className?: string, style?: React.CSSProperties }) {
  const [sortMode, setSortMode] = useState<'All' | 'TopDAU'>('All');
  const [activePlatforms, setActivePlatforms] = useState<Platform[]>(['PC', 'Console', 'Mobile', 'VR']);
  const [hoveredCell, setHoveredCell] = useState<{ genre: string, platform: Platform } | null>(null);

  const togglePlatform = (p: Platform) => {
    if (activePlatforms.includes(p)) {
      setActivePlatforms(activePlatforms.filter(ap => ap !== p));
    } else {
      setActivePlatforms([...activePlatforms, p]);
    }
  };

  const sortedData = useMemo(() => {
    let data = [...RAW_DATA];
    if (sortMode === 'TopDAU') {
      data.sort((a, b) => b.totalDau - a.totalDau);
    }
    // "All" is default, which is just the raw list (already somewhat alphabetical/grouped)
    return data;
  }, [sortMode]);

  return (
    <div 
      className={cn("bg-white rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden", className)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        ...style
      }}
    >
      {/* Header & Controls */}
      <div 
        className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center"
        style={{ padding: '24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}
      >
        <div>
           <h3 className="text-xl text-[#101545] mb-1" style={{ fontFamily: 'Days One' }}>Session Duration Heatmap</h3>
           <p className="text-slate-400 text-sm" style={{ fontFamily: 'Pathway Extreme' }}>
             Avg. Minutes per Session by Genre & Platform
           </p>
        </div>

        <div className="flex gap-6 items-center" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            {/* Genre Sort */}
            <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-slate-400 px-2 font-['Days_One']">SORT:</span>
                <button
                    onClick={() => setSortMode('All')}
                    className={cn(
                        "px-3 py-1.5 text-xs font-bold rounded-md transition-all",
                        sortMode === 'All' ? "bg-[#101545] text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"
                    )}
                    style={{ fontFamily: 'Fira Code' }}
                >
                    ALL
                </button>
                <button
                    onClick={() => setSortMode('TopDAU')}
                    className={cn(
                        "px-3 py-1.5 text-xs font-bold rounded-md transition-all",
                        sortMode === 'TopDAU' ? "bg-[#101545] text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"
                    )}
                    style={{ fontFamily: 'Fira Code' }}
                >
                    TOP DAU
                </button>
            </div>

            {/* Platform Filter */}
            <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-slate-400 px-2 font-['Days_One']">PLATFORMS:</span>
                {ALL_PLATFORMS.map(p => (
                    <button
                        key={p}
                        onClick={() => togglePlatform(p)}
                        className={cn(
                            "px-3 py-1.5 text-xs font-bold rounded-md transition-all",
                            activePlatforms.includes(p) ? "bg-slate-100 text-slate-900 ring-1 ring-slate-200" : "text-slate-300 hover:text-slate-400"
                        )}
                        style={{ fontFamily: 'Fira Code', opacity: activePlatforms.includes(p) ? 1 : 0.5 }}
                    >
                        {p}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 p-8 overflow-auto" style={{ padding: '32px' }}>
        <div className="w-full h-full flex flex-col">
            
            {/* Header Row */}
            <div className="flex mb-2">
                <div className="w-48 flex-shrink-0"></div> {/* Spacer for Genre Labels */}
                {ALL_PLATFORMS.map(p => (
                    <div 
                        key={p} 
                        className="flex-1 text-center pb-2"
                        style={{ opacity: activePlatforms.includes(p) ? 1 : 0.2 }}
                    >
                        <span className="text-sm font-bold text-slate-500" style={{ fontFamily: 'Fira Code' }}>{p}</span>
                    </div>
                ))}
            </div>

            {/* Data Rows */}
            <div className="flex-1 flex flex-col gap-2">
                {sortedData.map((row) => (
                    <div key={row.genre} className="flex h-16 items-center">
                        {/* Genre Label */}
                        <div className="w-48 flex-shrink-0 pr-4 flex items-center justify-end">
                            <span className="font-bold text-[#101545]" style={{ fontFamily: 'Days One' }}>{row.genre}</span>
                        </div>

                        {/* Cells */}
                        {ALL_PLATFORMS.map(p => {
                            const isActive = activePlatforms.includes(p);
                            const cellData = row.platforms[p];
                            const bgColor = isActive ? getColor(cellData.duration) : '#f8fafc';
                            const txtColor = isActive ? getTextColor(cellData.duration) : '#cbd5e1';

                            return (
                                <div 
                                    key={p}
                                    className="flex-1 h-full mx-1 rounded-lg relative group cursor-default transition-all duration-300"
                                    style={{ backgroundColor: bgColor }}
                                    onMouseEnter={() => setHoveredCell({ genre: row.genre, platform: p })}
                                    onMouseLeave={() => setHoveredCell(null)}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span 
                                            className="text-sm font-bold" 
                                            style={{ fontFamily: 'Fira Code', color: txtColor }}
                                        >
                                            {isActive ? `${cellData.duration.toFixed(0)} min` : '-'}
                                        </span>
                                    </div>

                                    {/* Tooltip */}
                                    {isActive && (
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-[#101545] text-white p-3 rounded-lg shadow-xl pointer-events-none z-10 border border-slate-700">
                                            <div className="text-xs space-y-1" style={{ fontFamily: 'Fira Code' }}>
                                                <div className="font-bold text-[#ff5416] mb-1 border-b border-slate-700 pb-1">{row.genre}  - {p}</div>
                                                <div className="flex justify-between"><span>Avg Session:</span> <span className="text-white">{cellData.duration} min</span></div>
                                                <div className="flex justify-between text-slate-400"><span>Avg DAU:</span> <span>{cellData.dau.toLocaleString()}</span></div>
                                                <div className="flex justify-between text-slate-400"><span>Avg Revenue:</span> <span>${cellData.revenue.toLocaleString()}</span></div>
                                                <div className="flex justify-between text-slate-500 mt-2 pt-1 border-t border-slate-700/50"><span>Sample Size:</span> <span>{cellData.count}</span></div>
                                            </div>
                                            {/* Arrow */}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#101545]" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="mt-8 flex justify-center items-center gap-4">
                <span className="text-xs font-bold text-slate-400" style={{ fontFamily: 'Fira Code' }}>DURATION:</span>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[#e0f2fe]" />
                    <span className="text-xs text-slate-500" style={{ fontFamily: 'Fira Code' }}>&lt;25m</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[#38bdf8]" />
                    <span className="text-xs text-slate-500" style={{ fontFamily: 'Fira Code' }}>30-50m</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[#0369a1]" />
                    <span className="text-xs text-slate-500" style={{ fontFamily: 'Fira Code' }}>&gt;60m</span>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}

