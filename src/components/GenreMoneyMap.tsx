import React, { useState, useMemo, useEffect } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { GenreRevenueData, getGenreColor } from './GenreRevenueData';

interface GenreMoneyMapProps {
  className?: string;
  style?: React.CSSProperties;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white p-4 rounded-lg shadow-xl border border-slate-700 z-50 relative">
        <p className="font-['Days_One'] text-lg mb-2 text-[#FF006E]">{data.genre}</p>
        <div className="space-y-1 text-sm">
          <p><span className="text-slate-400">Avg Units Sold:</span> {data.units.toLocaleString()}</p>
          <p><span className="text-slate-400">Avg Revenue:</span> ${data.revenue.toLocaleString()}</p>
          <p><span className="text-slate-400">Revenue/Unit:</span> <span className="font-bold text-[#00A676]">${data.revenuePerUnit.toFixed(2)}</span></p>
        </div>
      </div>
    );
  }
  return null;
};

const formatLogTick = (val: number) => {
  if (val === 0) return '0';
  if (val >= 1000000) return `${val / 1000000}M`;
  if (val >= 1000) return `${val / 1000}k`;
  return val.toString();
};

export const GenreMoneyMap: React.FC<GenreMoneyMapProps> = ({ className, style }) => {
  const [viewMode, setViewMode] = useState<'scatter' | 'bar'>('scatter');
  const [filterMode, setFilterMode] = useState<'units' | 'revenue' | 'all'>('all');
  const [data, setData] = useState<GenreRevenueData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://jefraydi.webdev.iyaserver.com/acad274/Viralgo/genre_money_map.php");
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const json = await res.json();
        if (!json.items || !Array.isArray(json.items)) throw new Error("Unexpected API shape");

        const mapped: GenreRevenueData[] = json.items.map((item: any) => {
          const units = Number(item.units) || 0;
          const revenue = Number(item.revenue) || 0;
          const revenuePerUnit = Number(item.revenuePerUnit) || (units > 0 ? revenue / units : 0);
          return {
            genre: String(item.genre || "Unknown"),
            units,
            revenue,
            revenuePerUnit,
            color: getGenreColor(item.genre || "Unknown"),
          };
        });

        if (!isMounted) return;
        setData(mapped);
      } catch (err: any) {
        console.error("Money map fetch failed", err);
        if (!isMounted) return;
        setError("Live revenue data unavailable.");
        setData([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, []);

  const filteredData = useMemo(() => {
    let items = [...data];
    
    if (filterMode === 'units') {
      items.sort((a, b) => b.units - a.units);
      items = items.slice(0, 20);
    } else if (filterMode === 'revenue') {
      items.sort((a, b) => b.revenue - a.revenue);
      items = items.slice(0, 20);
    }
    
    if (viewMode === 'bar') {
      items.sort((a, b) => b.revenuePerUnit - a.revenuePerUnit);
    }
    
    return items;
  }, [data, filterMode, viewMode]);

  const unitValues = data.map(d => d.units).filter(v => v > 0);
  const revenueValues = data.map(d => d.revenue).filter(v => v > 0);
  const maxUnits = unitValues.length ? Math.max(...unitValues) : 1;
  const maxRevenue = revenueValues.length ? Math.max(...revenueValues) : 1;
  
  // To avoid log(0), set a small positive lower bound near the minimum observed.
  const minUnits = unitValues.length ? Math.max(1, Math.min(...unitValues) * 0.9) : 1;
  const minRevenue = revenueValues.length ? Math.max(1, Math.min(...revenueValues) * 0.9) : 1;

  const rpuLines = [10, 20, 50, 100];

  return (
    <div 
      className={`p-8 flex flex-col ${className}`} 
      style={{ display: 'flex', flexDirection: 'column', ...style }}
    >
      <div className="flex justify-between items-start mb-6" style={{ flexShrink: 0 }}>
        <div>
          <h2 className="font-['Days_One'] text-3xl text-slate-900 mb-2">Genre Money Map</h2>
          <p className="text-slate-500 max-w-2xl text-sm">
            Logarithmic Scale: Visualizing the wide gap between niche and blockbuster genres.
            <br/>
          </p>
          {loading && <p className="text-xs text-slate-400">Loading revenue data...</p>}
          {error && <p className="text-xs text-amber-600">{error}</p>}
        </div>
        
        <div className="flex gap-4 items-center">
          <div className="bg-slate-100 p-1 rounded-lg flex text-sm font-medium">
            <button
              onClick={() => setViewMode('scatter')}
              className={`px-4 py-2 rounded-md transition-colors ${viewMode === 'scatter' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Log Scale Map
            </button>
            <button
              onClick={() => {
                setViewMode('bar');
                if (filterMode === 'all') setFilterMode('revenue');
              }}
              className={`px-4 py-2 rounded-md transition-colors ${viewMode === 'bar' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Revenue per Unit
            </button>
          </div>

          <select 
            className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-[#FF006E] focus:border-[#FF006E] block p-2.5"
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value as any)}
          >
            {viewMode === 'scatter' && <option value="all">All Genres</option>}
            <option value="units">Top 20 by Units Sold</option>
            <option value="revenue">Top 20 by Revenue</option>
          </select>
        </div>
      </div>

      <div 
        className="flex-grow bg-slate-50 rounded-xl border border-slate-200 p-4 relative min-h-0"
        style={{ flex: 1, minHeight: 0, position: 'relative' }}
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
        {/* Subtle background labels for quadrants - Positioned to avoid overlapping axis labels */}
        {viewMode === 'scatter' && (
          <>
            <div className="absolute top-8 right-32 text-xs font-black text-slate-300 pointer-events-none select-none text-right">
              BLOCKBUSTER<br/>(High Vol, High Rev)
            </div>
            <div className="absolute top-8 left-44 text-xs font-black text-slate-300 pointer-events-none select-none text-left">
              PREMIUM NICHE<br/>(Low Vol, High Rev)
            </div>
            <div className="absolute bottom-36 right-32 text-xs font-black text-slate-300 pointer-events-none select-none text-right">
              MASS MARKET<br/>(High Vol, Low Rev)
            </div>
            <div className="absolute bottom-36 left-44 text-xs font-black text-slate-300 pointer-events-none select-none text-left">
              TRUE NICHE<br/>(Low Vol, Low Rev)
            </div>
          </>
        )}

        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          {viewMode === 'scatter' ? (
            <ScatterChart margin={{ top: 20, right: 40, bottom: 60, left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                type="number" 
                dataKey="units" 
                name="Avg Units Sold" 
                unit="" 
                scale="log"
                domain={[minUnits, 'auto']}
                tickFormatter={formatLogTick}
                label={{ 
                  value: 'Average Units Sold (Log Scale)', 
                  position: 'insideBottom', 
                  offset: -40, 
                  fill: '#64748b', 
                  fontSize: 14,
                  style: { fontFamily: 'Fira Code, monospace', fontWeight: 500 }
                }}
              />
              <YAxis 
                type="number" 
                dataKey="revenue" 
                name="Avg Revenue" 
                unit="$" 
                scale="log"
                domain={[minRevenue, 'auto']}
                tickFormatter={formatLogTick}
                label={{ 
                  value: 'Average Revenue (Log Scale)', 
                  angle: -90, 
                  position: 'insideLeft', 
                  offset: -45, 
                  fill: '#64748b', 
                  fontSize: 14,
                  style: { fontFamily: 'Fira Code, monospace', fontWeight: 500, textAnchor: 'middle' }
                }}
              />
              <ZAxis 
                type="number" 
                dataKey="revenuePerUnit" 
                range={[100, 1000]} 
                name="Revenue per Unit" 
              />
              <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
              
              {/* Reference Lines for RPU */}
              {rpuLines.map(rpu => (
                 <ReferenceLine
                   key={rpu}
                   segment={[
                     { x: minUnits, y: minUnits * rpu }, 
                     { x: maxUnits, y: maxUnits * rpu }
                   ]}
                   stroke="#cbd5e1"
                   strokeDasharray="4 4"
                   ifOverflow="extendDomain"
                   label={{ value: `$${rpu}/unit`, position: 'insideTopRight', fill: '#94a3b8', fontSize: 10 }}
                 />
              ))}

              <Scatter name="Genres" data={filteredData}>
                {filteredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.75} stroke="#fff" strokeWidth={1} />
                ))}
              </Scatter>
            </ScatterChart>
          ) : (
            <BarChart data={filteredData} layout="vertical" margin={{ top: 20, right: 60, bottom: 20, left: 140 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="genre" 
                width={180} 
                tick={{ fontSize: 11 }} 
                interval={0}
              />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-3 rounded shadow-lg z-50">
                        <p className="font-bold">{data.genre}</p>
                        <p className="text-[#00A676]">${data.revenuePerUnit.toFixed(2)} per unit</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="revenuePerUnit" radius={[0, 4, 4, 0]} barSize={20}>
                {filteredData.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
