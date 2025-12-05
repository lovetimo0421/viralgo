import React, { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Slider } from "./ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "./ui/utils";
import { motion } from "motion/react";
import { processData, GENRE_COLORS } from "./GenreData";
import { Filter, ChevronDown, Check, TrendingUp, Zap, RotateCcw } from "lucide-react";

// --- Constants ---
const GENRES = Object.keys(GENRE_COLORS).sort();
const START_YEAR = 2010;
const END_YEAR = 2025;

const MOCK_DATA = processData();

// --- Components ---

const GenreChip = ({ genre, isSelected, onClick }: { genre: string; isSelected: boolean; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all border w-full group relative overflow-hidden",
        isSelected
          ? "bg-opacity-100 text-white border-transparent shadow-md ring-1 ring-black/5"
          : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm"
      )}
      style={{
        backgroundColor: isSelected ? GENRE_COLORS[genre] : undefined,
        borderColor: isSelected ? GENRE_COLORS[genre] : undefined,
        fontFamily: 'Pathway Extreme'
      }}
    >
      {/* Color Dot */}
      <div className={cn(
        "w-3 h-3 rounded-full border shadow-sm shrink-0 transition-colors",
        isSelected ? "bg-white/40 border-white/40" : "bg-slate-100 border-slate-300 group-hover:border-slate-400"
      )} style={!isSelected ? { backgroundColor: GENRE_COLORS[genre] } : {}} />
      
      <span className="truncate font-medium">{genre}</span>
      
      {isSelected && (
        <div className="ml-auto bg-white/20 p-0.5 rounded-full">
          <Check className="w-3 h-3" strokeWidth={3} />
        </div>
      )}
    </button>
  );
};

const StoryButton = ({ title, icon: Icon, onClick, active }: { title: string; icon: any; onClick: () => void; active?: boolean }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all border shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0",
      active 
        ? "bg-slate-800 text-white border-slate-800 ring-2 ring-slate-200" 
        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900"
    )}
    style={{ fontFamily: 'Pathway Extreme' }}
  >
    <Icon className={cn("w-4 h-4", active ? "text-yellow-400" : "text-slate-400 group-hover:text-slate-600")} />
    {title}
  </button>
);

const formatYAxis = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(0)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value.toString();
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  const yearData = payload[0].payload;
  const sortedPayload = [...payload].sort((a, b) => b.value - a.value);
  const displayItems = sortedPayload.slice(0, 10);
  const remainingCount = sortedPayload.length - 10;
  const totalMarket = yearData.total;

  return (
    <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-slate-100 text-sm min-w-[200px] z-50" style={{ fontFamily: 'Fira Code' }}>
      <p className="font-bold text-slate-900 text-lg mb-2">{label}</p>
      <p className="text-slate-500 mb-3 border-b pb-2">Total Peak: {totalMarket.toLocaleString()}</p>
      
      <div className="space-y-1">
        {displayItems.map((entry: any) => (
          <div key={entry.name} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-slate-700 truncate max-w-[120px]">{entry.name}</span>
            </div>
            <div className="text-right whitespace-nowrap">
              <span className="font-medium">{entry.value.toLocaleString()}</span>
              <span className="text-xs text-slate-400 ml-2 w-[40px] inline-block text-right">
                {totalMarket > 0 ? ((entry.value / totalMarket) * 100).toFixed(1) : 0}%
              </span>
            </div>
          </div>
        ))}
        {remainingCount > 0 && (
          <p className="text-xs text-slate-400 pt-2 italic">
            + {remainingCount} other genres...
          </p>
        )}
      </div>
    </div>
  );
};

export function TimelineChart() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>(GENRES);
  const [yearRange, setYearRange] = useState<number[]>([START_YEAR, END_YEAR]);

  // Sort genres by total volume (Biggest at Bottom) to ensure consistent and visually pleasing stacking
  const sortedGenres = useMemo(() => {
    const volumes: Record<string, number> = {};
    GENRES.forEach(g => volumes[g] = 0);
    MOCK_DATA.forEach(d => {
      GENRES.forEach(g => {
        if (d[g]) volumes[g] += d[g];
      });
    });
    // Descending sort: High volume -> Low volume
    // In Recharts Stack, the first rendered Area is at the BOTTOM.
    // We want Biggest at Bottom to provide a stable base.
    return [...GENRES].sort((a, b) => volumes[b] - volumes[a]);
  }, []);

  const filteredData = useMemo(() => {
    return MOCK_DATA.filter(d => d.year >= yearRange[0] && d.year <= yearRange[1]);
  }, [yearRange]);

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const applyStory = (genres: string[], start: number, end: number) => {
    const validGenres = genres.filter(g => GENRES.includes(g));
    setSelectedGenres(validGenres);
    setYearRange([start, end]);
  };

  const selectAll = () => setSelectedGenres(GENRES);
  const deselectAll = () => setSelectedGenres([]);

  return (
    <div className="absolute bg-white h-[960px] left-[68px] rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] top-[1140px] w-[1305px] flex flex-col overflow-hidden">
      
      {/* Header & Controls */}
      <div className="p-6 pb-4 border-b border-slate-100 bg-slate-50/50">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-lg text-slate-500 mb-1" style={{ fontFamily: 'Days One' }}>Market Evolution</h3>
            <p className="text-slate-400 text-sm" style={{ fontFamily: 'Pathway Extreme' }}>
              Analyze trends across 30 genres. Showing {selectedGenres.length} of {GENRES.length} genres.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Quick Stories */}
            <div className="flex gap-3 mr-6">
               <StoryButton 
                 title="Battle Royale Rise" 
                 icon={TrendingUp} 
                 onClick={() => applyStory(["Battle Royale", "Shooter", "Survival"], 2015, 2025)} 
               />
               <StoryButton 
                 title="MOBA Trend" 
                 icon={Zap} 
                 onClick={() => applyStory(["MOBA", "Open World"], 2010, 2022)} 
               />
               <StoryButton 
                 title="Reset View" 
                 icon={RotateCcw} 
                 onClick={() => { setSelectedGenres(GENRES); setYearRange([START_YEAR, END_YEAR]); }} 
               />
            </div>

            {/* Genre Filter Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                  <Filter className="w-4 h-4" />
                  Filter Genres
                  <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] min-w-[20px]">
                    {selectedGenres.length}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[800px] p-0" align="end" sideOffset={8}>
                <div className="p-4 border-b border-slate-100 bg-slate-50/80 backdrop-blur supports-[backdrop-filter]:bg-slate-50/50 flex justify-between items-center sticky top-0 z-10">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-sm text-slate-700" style={{ fontFamily: 'Days One' }}>Select Genres</span>
                    <span className="bg-slate-200 text-slate-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold">{GENRES.length}</span>
                  </div>
                  <div className="flex gap-1 bg-white p-1 rounded-lg border border-slate-200">
                    <button 
                      onClick={selectAll} 
                      className="px-3 py-1 text-xs font-medium rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                    >
                      All
                    </button>
                    <div className="w-px bg-slate-200 my-1" />
                    <button 
                      onClick={deselectAll} 
                      className="px-3 py-1 text-xs font-medium rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                    >
                      None
                    </button>
                  </div>
                </div>
                <div className="max-h-[480px] overflow-y-auto p-6 bg-white">
                  <div className="grid grid-cols-3 gap-3">
                    {GENRES.map(genre => (
                      <GenreChip
                        key={genre}
                        genre={genre}
                        isSelected={selectedGenres.includes(genre)}
                        onClick={() => toggleGenre(genre)}
                      />
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex-1 w-full p-6 min-h-0 relative">
         {/* Background hint if no genres selected */}
         {selectedGenres.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center z-0">
                <p className="text-slate-300 text-xl font-medium">Select genres to view data</p>
            </div>
         )}

        <div style={{ width: '100%', height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <AreaChart
            data={filteredData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              {GENRES.map(genre => (
                <linearGradient key={genre} id={`color${genre.replace(/[^a-zA-Z0-9]/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={GENRE_COLORS[genre]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={GENRE_COLORS[genre]} stopOpacity={0.1}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="year" 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              tickFormatter={formatYAxis}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {sortedGenres.map(genre => (
              selectedGenres.includes(genre) && (
                <Area
                  key={genre}
                  type="monotone"
                  dataKey={genre}
                  stroke={GENRE_COLORS[genre]}
                  fill={`url(#color${genre.replace(/[^a-zA-Z0-9]/g, '')})`}
                  animationDuration={800}
                  fillOpacity={1}
                />
              )
            ))}
          </AreaChart>
        </ResponsiveContainer>
        </div>
      </div>

      {/* Slider Section */}
      <div className="h-20 px-12 bg-white border-t border-slate-100 flex items-center flex-col justify-center shrink-0">
        <div className="w-full mb-2 flex justify-between text-sm font-bold text-slate-600" style={{ fontFamily: 'Days One' }}>
          <span>{yearRange[0]}</span>
          <span>{yearRange[1]}</span>
        </div>
        <Slider
          defaultValue={[START_YEAR, END_YEAR]}
          value={yearRange}
          min={START_YEAR}
          max={END_YEAR}
          step={1}
          onValueChange={(val) => setYearRange(val)}
          className="w-full"
        />
      </div>
    </div>
  );
}
