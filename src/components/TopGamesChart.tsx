import React, { useState } from "react";
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

// Mock data for a single year (used for all years for now)
const MOCK_DATA_TEMPLATE = [
  { rank: 1, name: "Counter-Strike 2", genres: "Action;FPS;Multiplayer", peak: 1862531, allTimePeak: 1862531 },
  { rank: 2, name: "Monster Hunter Wilds", genres: "Action;Adventure;RPG", peak: 1384608, allTimePeak: 1384608 },
  { rank: 3, name: "PUBG: BATTLEGROUNDS", genres: "Action;Massively Multiplayer", peak: 1347327, allTimePeak: 3257248 },
  { rank: 4, name: "Dota 2", genres: "Action;Strategy;MOBA", peak: 961289, allTimePeak: 1295114 },
  { rank: 5, name: "Marvel Rivals", genres: "Action;Multiplayer;Hero Shooter", peak: 644269, allTimePeak: 644269 },
  { rank: 6, name: "Hollow Knight: Silksong", genres: "Action;Adventure;Indie", peak: 587150, allTimePeak: 587150 },
  { rank: 7, name: "ARC Raiders", genres: "Action", peak: 462488, allTimePeak: 462488 },
  { rank: 8, name: "Schedule I", genres: "Action;Indie;Simulation", peak: 459075, allTimePeak: 459075 },
  { rank: 9, name: "Apex Legends", genres: "Action;FPS;Battle Royale", peak: 412000, allTimePeak: 624473 },
  { rank: 10, name: "Grand Theft Auto V", genres: "Action;Open World", peak: 350000, allTimePeak: 364548 }
];

// Generate data for 2010-2025
const YEARS = Array.from({ length: 16 }, (_, i) => 2010 + i);
const ALL_DATA: Record<number, typeof MOCK_DATA_TEMPLATE> = {};

YEARS.forEach(year => {
  // Slightly randomize or just copy data
  ALL_DATA[year] = MOCK_DATA_TEMPLATE.map(item => ({
    ...item,
    peak: Math.round(item.peak * (1 + (Math.random() * 0.2 - 0.1))), // +/- 10% variation
  })).sort((a, b) => b.peak - a.peak);
});

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

// Custom bar label
const CustomBarLabel = (props: any) => {
  const { x, y, width, height, value, name, genres } = props;
  // If bar is wide enough, put text inside, otherwise outside? 
  // For now, let's put name inside left, and value inside right.
  // Actually user asked: Inside or at the end: Game Name, Peak Load, Genre.
  
  // Let's put text at the end of the bar (outside) if it's short, or just inside.
  // Simplest is to put it slightly inside the bar if possible, or to the right.
  // Given the design request, let's put the Peak Load # to the right of the bar.
  
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
  const [year, setYear] = useState(2025);
  const data = ALL_DATA[year];

  return (
    <div className={className}>
      <div 
        className="flex flex-col items-center w-full h-full"
        style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center' }}
      >
        
        {/* Year Slider */}
        <div className="w-[80%] mb-6 flex items-center gap-4" style={{ flexShrink: 0 }}>
          <span className="font-bold text-[#101545]" style={BODY_FONT}>2010</span>
          <input 
            type="range" 
            min="2010" 
            max="2025" 
            value={year} 
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#ff5416]"
          />
          <span className="font-bold text-[#101545]" style={BODY_FONT}>2025</span>
        </div>

        <div className="text-center mb-4" style={{ flexShrink: 0 }}>
            <span className="text-2xl font-bold text-[#ff5416]" style={BODY_FONT}>Year: {year}</span>
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
