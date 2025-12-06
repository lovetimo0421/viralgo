import React, { useEffect, useMemo, useState } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts';
import { cn } from "./ui/utils";

const PLATFORMS = ['PC', 'Console', 'Mobile', 'VR'];
const PLATFORM_COLORS: Record<string, string> = {
  PC: '#2E93fA',      // Blue
  Console: '#66DA26', // Green
  Mobile: '#FF9800',  // Orange
  VR: '#9C27B0'       // Purple
};

type HypeItem = {
  id: number;
  platform: string;
  dau: number;
  streamViewership: number;
  revenue: number;
  date?: string;
  genre?: string;
};

// --- Components ---

const formatLogTick = (val: number) => {
  if (val === 0) return '0';
  if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `${(val / 1000).toFixed(0)}k`;
  return val.toString();
};

const CustomDot = (props: any) => {
  const { cx, cy, fill, fillOpacity } = props;
  return (
    <circle 
      cx={cx} 
      cy={cy} 
      r={2.5} 
      fill={fill} 
      fillOpacity={fillOpacity} 
    />
  );
};

export function HypeCloudChart({ className, style }: { className?: string, style?: React.CSSProperties }) {
  const [yAxisMode, setYAxisMode] = useState<'DAU' | 'Revenue'>('DAU');
  const [platformFilter, setPlatformFilter] = useState<string>('All');
  const [data, setData] = useState<HypeItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://jefraydi.webdev.iyaserver.com/acad274/Viralgo/hype_cloud.php");
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const json = await res.json();
        const items: HypeItem[] = Array.isArray(json.items) ? json.items : [];
        const cleaned = items.map((item, idx) => ({
          id: Number(item.id ?? idx),
          platform: item.platform || "Unknown",
          dau: Number(item.dau) || 0,
          streamViewership: Number(item.streamViewership) || 0,
          revenue: Number(item.revenue) || 0,
          date: item.date,
          genre: item.genre,
        }));
        if (!isMounted) return;
        setData(cleaned);
      } catch (err: any) {
        console.error("Hype cloud fetch failed", err);
        if (!isMounted) return;
        setError("Live hype data unavailable.");
        setData([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, []);

  const filteredData = useMemo(() => {
    if (platformFilter === 'All') return data;
    return data.filter(d => d.platform === platformFilter);
  }, [data, platformFilter]);

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
           <h3 className="text-xl text-[#101545] mb-1" style={{ fontFamily: 'Days One' }}>Platform Play Cloud</h3>
           <p className="text-slate-400 text-sm" style={{ fontFamily: 'Pathway Extreme' }}>
             {data.length ? `${data.length} data points` : "Logarithmic Scale"}
           </p>
           {loading && <p className="text-xs text-slate-400">Loading hype data...</p>}
           {error && <p className="text-xs text-amber-600">{error}</p>}
        </div>

        <div className="flex gap-6 items-center" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            {/* Y-Axis Toggle */}
            <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-slate-400 px-2 font-['Days_One']">Y-AXIS:</span>
                <button
                    onClick={() => setYAxisMode('DAU')}
                    className={cn(
                        "px-3 py-1.5 text-xs font-bold rounded-md transition-all",
                        yAxisMode === 'DAU' ? "bg-[#101545] text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"
                    )}
                    style={{ fontFamily: 'Fira Code' }}
                >
                    DAU
                </button>
                <button
                    onClick={() => setYAxisMode('Revenue')}
                    className={cn(
                        "px-3 py-1.5 text-xs font-bold rounded-md transition-all",
                        yAxisMode === 'Revenue' ? "bg-[#101545] text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"
                    )}
                    style={{ fontFamily: 'Fira Code' }}
                >
                    REVENUE
                </button>
            </div>

            {/* Platform Filter */}
            <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-slate-400 px-2 font-['Days_One']">FILTER:</span>
                <select 
                    value={platformFilter} 
                    onChange={(e) => setPlatformFilter(e.target.value)}
                    className="bg-transparent text-sm font-bold text-slate-700 focus:outline-none cursor-pointer"
                    style={{ fontFamily: 'Fira Code' }}
                >
                    <option value="All">All Platforms</option>
                    {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
            </div>
        </div>
      </div>

      {/* Chart Area */}
        <div 
          className="relative w-full min-h-0 flex-1 p-4"
          style={{ flex: 1, minHeight: 0, width: '100%', padding: '16px', position: 'relative' }}
        >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm pointer-events-none">
            Loading data...
          </div>
        )}
        {!loading && filteredData.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm pointer-events-none">
            No data available.
          </div>
        )}
          <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              type="number" 
              dataKey="streamViewership" 
              name="Stream Viewership" 
              scale="log" 
              domain={['auto', 'auto']}
              tickFormatter={formatLogTick}
              label={{ value: 'Stream Viewership (Log Scale)', position: 'insideBottom', offset: -10, fill: '#94a3b8', fontSize: 12, style: { fontFamily: 'Fira Code' } }}
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'Fira Code' }}
            />
            <YAxis 
              type="number" 
              dataKey={yAxisMode === 'DAU' ? 'dau' : 'revenue'} 
              name={yAxisMode} 
              scale="log" 
              domain={['auto', 'auto']}
              tickFormatter={formatLogTick}
              label={{ 
                  value: `${yAxisMode === 'DAU' ? 'Daily Active Users' : 'Revenue ($)'} (Log Scale)`, 
                  angle: -90, 
                  position: 'insideLeft',
                  offset: 0, 
                  dy: 5,
                  fill: '#94a3b8', 
                  fontSize: 12,
                  style: { fontFamily: 'Fira Code', textAnchor: 'middle' } 
              }}
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'Fira Code' }}
              width={60}
            />
            
            <Scatter name="Games" data={filteredData} shape={<CustomDot />}>
              {filteredData.map((entry, index) => (
                <Cell 
                    key={`cell-${index}`} 
                    fill={PLATFORM_COLORS[entry.platform] || '#000'} 
                    fillOpacity={0.4} // Low opacity as requested
                    stroke="none"
                />
              ))}
            </Scatter>
            
            {/* Custom Legend */}
            <Legend 
                verticalAlign="top" 
                height={36}
                content={() => (
                    <div className="flex justify-center gap-6 mb-2">
                        {PLATFORMS.map(p => (
                            <div key={p} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PLATFORM_COLORS[p] }} />
                                <span className="text-xs font-bold text-slate-600" style={{ fontFamily: 'Fira Code' }}>{p}</span>
                            </div>
                        ))}
                    </div>
                )}
            />
          </ScatterChart>
        </ResponsiveContainer>
        
        {/* Overlay note about data limitation */}
        <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded text-[10px] text-slate-400 pointer-events-none">
        </div>
      </div>
    </div>
  );
}
