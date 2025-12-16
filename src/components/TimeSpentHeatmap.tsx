import React, { useState, useMemo, useEffect } from 'react';
import { cn } from "./ui/utils";

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

const ALL_PLATFORMS: Platform[] = ['PC', 'Console', 'Mobile', 'VR'];

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
  const [data, setData] = useState<HeatmapData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://jefraydi.webdev.iyaserver.com/acad274/Viralgo/time_spent_heatmap.php");
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const json = await res.json();
        const items: HeatmapData[] = Array.isArray(json.items) ? json.items : [];
        if (!isMounted) return;
        setData(items);
      } catch (err: any) {
        console.error("Time spent heatmap fetch failed", err);
        if (!isMounted) return;
        setError("Live time-spent data unavailable.");
        setData([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, []);

  const togglePlatform = (p: Platform) => {
    if (activePlatforms.includes(p)) {
      setActivePlatforms(activePlatforms.filter(ap => ap !== p));
    } else {
      setActivePlatforms([...activePlatforms, p]);
    }
  };

  const sortedData = useMemo(() => {
    let items = [...data];
    if (sortMode === 'TopDAU') {
      items.sort((a, b) => b.totalDau - a.totalDau);
    }
    return items;
  }, [data, sortMode]);

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
           {loading && <p className="text-xs text-slate-400">Loading time-spent data...</p>}
           {error && <p className="text-xs text-amber-600">{error}</p>}
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
            {loading && (
              <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
                Loading data...
              </div>
            )}
            {!loading && sortedData.length === 0 && (
              <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
                No data available.
              </div>
            )}
            {sortedData.length > 0 && (
            <>
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
            </>
            )}

        </div>
      </div>
    </div>
  );
}

