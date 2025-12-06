import React, { useState, useMemo } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts';
import { HYPE_PLAY_DATA, PLATFORM_COLORS, HypePlayDataPoint } from './HypeVsPlayData';

// Fonts
const HEADER_FONT = { fontFamily: 'Days One' };
const BODY_FONT = { fontFamily: 'Fira Code' };

interface HypeVsPlayChartProps {
  className?: string;
  style?: React.CSSProperties;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data: HypePlayDataPoint = payload[0].payload;
    return (
      <div className="bg-[#101545] text-white p-3 rounded shadow-lg z-50 border border-slate-700" style={BODY_FONT}>
        <p className="font-bold mb-1 text-[#ff5416]">{data.name}</p>
        <p className="text-xs text-slate-300 mb-1">Platform: {data.platform}</p>
        <p className="text-xs text-slate-300">Stream Viewers: {data.streamViewership.toLocaleString()}</p>
        <p className="text-xs text-slate-300">DAU: {data.dau.toLocaleString()}</p>
        <p className="text-xs text-slate-300">Revenue: ${data.revenue.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

// Log formatter
const formatLogTick = (val: number) => {
  if (val === 0) return '0';
  if (val >= 1000000) return `${val / 1000000}M`;
  if (val >= 1000) return `${val / 1000}k`;
  return val.toString();
};

export const HypeVsPlayChart: React.FC<HypeVsPlayChartProps> = ({ className, style }) => {
  const [yMetric, setYMetric] = useState<'dau' | 'revenue'>('dau');
  const [platformFilter, setPlatformFilter] = useState<'All' | 'PC' | 'Console' | 'Mobile' | 'VR'>('All');

  const filteredData = useMemo(() => {
    if (platformFilter === 'All') return HYPE_PLAY_DATA;
    return HYPE_PLAY_DATA.filter(d => d.platform === platformFilter);
  }, [platformFilter]);

  return (
    <div 
      className={`bg-white rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] p-6 flex flex-col ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        ...style
      }}
    >
      {/* Controls Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexShrink: 0 }}>
        <div>
          <h2 className="text-2xl text-[#101545] mb-1" style={HEADER_FONT}>Hype vs Play Cloud</h2>
          <p className="text-sm text-slate-500" style={BODY_FONT}>
             Correlating social buzz with player engagement
          </p>
        </div>

        <div className="flex items-center gap-6" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            
            {/* Y-Axis Toggle */}
            <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="text-sm font-bold text-slate-700" style={BODY_FONT}>Vertical Axis:</span>
                <div className="bg-slate-100 p-1 rounded-lg flex">
                    <button 
                        onClick={() => setYMetric('dau')}
                        className={`px-3 py-1.5 text-xs rounded-md transition-colors font-medium ${yMetric === 'dau' ? 'bg-white shadow text-[#101545]' : 'text-slate-500 hover:text-slate-700'}`}
                        style={BODY_FONT}
                    >
                        DAU
                    </button>
                    <button 
                        onClick={() => setYMetric('revenue')}
                        className={`px-3 py-1.5 text-xs rounded-md transition-colors font-medium ${yMetric === 'revenue' ? 'bg-white shadow text-[#101545]' : 'text-slate-500 hover:text-slate-700'}`}
                        style={BODY_FONT}
                    >
                        Revenue
                    </button>
                </div>
            </div>

            {/* Platform Filter */}
            <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="text-sm font-bold text-slate-700" style={BODY_FONT}>Platform:</span>
                <select 
                    value={platformFilter}
                    onChange={(e) => setPlatformFilter(e.target.value as any)}
                    className="bg-white border border-slate-200 text-slate-700 text-xs rounded-lg focus:ring-[#ff5416] focus:border-[#ff5416] block p-2"
                    style={{ ...BODY_FONT, height: '32px' }}
                >
                    <option value="All">All Platforms</option>
                    <option value="PC">PC</option>
                    <option value="Console">Console</option>
                    <option value="Mobile">Mobile</option>
                    <option value="VR">VR</option>
                </select>
            </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative w-full min-h-0 flex-1" style={{ position: 'relative', width: '100%', flex: 1, minHeight: 0 }}>
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
                    label={{ 
                        value: 'Stream Viewership (Log Scale)', 
                        position: 'insideBottom', 
                        offset: -10,
                        fill: '#64748b',
                        fontSize: 12,
                        style: { ...BODY_FONT } 
                    }}
                    tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'Fira Code' }}
                />
                <YAxis 
                    type="number" 
                    dataKey={yMetric} 
                    name={yMetric === 'dau' ? 'Daily Active Users' : 'Revenue'} 
                    scale="log" 
                    domain={['auto', 'auto']}
                    tickFormatter={formatLogTick}
                    label={{ 
                        value: yMetric === 'dau' ? 'Daily Active Users (Log Scale)' : 'Revenue $ (Log Scale)', 
                        angle: -90, 
                        position: 'insideLeft',
                        fill: '#64748b',
                        fontSize: 12,
                        style: { ...BODY_FONT } 
                    }}
                    tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'Fira Code' }}
                    width={60}
                />
                <ZAxis range={[20, 20]} /> {/* Fixed small dot size */}
                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                
                <Scatter name="Games" data={filteredData}>
                    {filteredData.map((entry, index) => (
                        <Cell 
                            key={`cell-${index}`} 
                            fill={PLATFORM_COLORS[entry.platform]} 
                            fillOpacity={0.4} // Low opacity for "cloud" effect
                            stroke="none"
                        />
                    ))}
                </Scatter>
                
                {/* Custom Legend */}
                <Legend 
                    content={() => (
                        <div className="flex justify-center gap-4 mt-2" style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '8px' }}>
                            {Object.entries(PLATFORM_COLORS).map(([platform, color]) => (
                                <div key={platform} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                                    <span className="text-xs text-slate-600" style={BODY_FONT}>{platform}</span>
                                </div>
                            ))}
                        </div>
                    )}
                />
            </ScatterChart>
         </ResponsiveContainer>
      </div>
    </div>
  );
};
