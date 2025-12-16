import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList
} from "recharts";
import { motion } from "motion/react";

type TopGame = {
  rank: number;
  name: string;
  genres: string;
  peak: number;
  allTimePeak: number;
};

interface TopGamesResponse {
  year: number;
  items: TopGame[];
}

const START_YEAR = 2010;
const END_YEAR = 2025;

const COLORS = [
  "#FF5416", // Brand Orange
  "#2E93fA",
  "#66DA26",
  "#546E7A",
  "#E91E63",
  "#FF9800",
  "#9C27B0",
  "#00BCD4",
  "#FDD835",
  "#795548"
];

const BODY_FONT = { fontFamily: 'Fira Code' };

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#101545] p-4 border border-gray-200 rounded shadow-lg text-white z-50" style={BODY_FONT}>
        <p className="text-lg font-bold mb-2">{data.name}</p>
        <p className="text-sm text-gray-300 mb-1">Genres: {data.genres}</p>
        <p className="text-sm text-[#ff5416] mb-1">Peak this year: {data.peak.toLocaleString()}</p>
        <p className="text-sm text-gray-400">All-time peak: {data.allTimePeak.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

// Custom tick to show game name on Y axis
const CustomYAxisTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={-10} y={0} dy={5} textAnchor="end" fill="#101545" fontSize={12} fontWeight="bold" style={BODY_FONT}>
        {payload.value}
      </text>
    </g>
  );
};

const CustomBarLabel = (props: any) => {
  const { x, y, width, height, value } = props;
  return (
    <text 
      x={x + width + 5} 
      y={y + height / 2 + 5} 
      fill="#101545" 
      fontSize={12} 
      style={BODY_FONT}
      textAnchor="start"
    >
      {value.toLocaleString()} players
    </text>
  );
};

export function TopGamesChart({ className }: { className?: string }) {
  const [year, setYear] = useState(END_YEAR);
  const [data, setData] = useState<TopGame[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`https://jefraydi.webdev.iyaserver.com/acad274/Viralgo/top_games_by_year.php?year=${year}`);
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const json: TopGamesResponse = await res.json();
        const items = Array.isArray(json.items) ? json.items : [];
        if (!isMounted) return;
        const cleaned = items.map((item) => ({
          rank: Number(item.rank) || 0,
          name: item.name || "Unknown",
          genres: item.genres || "",
          peak: Number(item.peak) || 0,
          allTimePeak: Number(item.allTimePeak) || 0,
        })).sort((a, b) => b.peak - a.peak);
        setData(cleaned);
      } catch (err: any) {
        console.error("Top games fetch failed", err);
        if (!isMounted) return;
        setError("Live top games data unavailable.");
        setData([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, [year]);

  return (
    <div className={className}>
      <div 
        className="flex flex-col items-center w-full h-full"
        style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center' }}
      >
        
        {/* Year Slider */}
        <div className="w-[80%] mb-6 flex items-center gap-4" style={{ flexShrink: 0 }}>
          <span className="font-bold text-[#101545]" style={BODY_FONT}>{START_YEAR}</span>
          <input 
            type="range" 
            min={START_YEAR} 
            max={END_YEAR} 
            value={year} 
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#ff5416]"
          />
          <span className="font-bold text-[#101545]" style={BODY_FONT}>{END_YEAR}</span>
        </div>

        <div className="text-center mb-4" style={{ flexShrink: 0 }}>
            <span className="text-2xl font-bold text-[#ff5416]" style={BODY_FONT}>Year: {year}</span>
            {loading && <p className="text-xs text-slate-400 mt-1">Loading top games...</p>}
            {error && <p className="text-xs text-amber-600 mt-1">{error}</p>}
        </div>

        {/* Chart */}
        <div 
          className="w-full pr-12" 
          style={{ flex: 1, minHeight: 0, width: '100%', paddingRight: '48px' }}
        > {/* Right padding for labels */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 100, left: 100, bottom: 5 }}
              barSize={30}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={<CustomYAxisTick />} 
                width={150}
                interval={0}
              />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
              <Bar dataKey="peak" radius={[0, 4, 4, 0]} label={<CustomBarLabel />}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
