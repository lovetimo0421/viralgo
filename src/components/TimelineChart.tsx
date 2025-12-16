import React, { useState, useMemo, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Slider } from "./ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "./ui/utils";
import { motion } from "motion/react";
import { GENRE_COLORS } from "./genreColors";
import { Filter, ChevronDown, Check, TrendingUp, Zap, RotateCcw } from "lucide-react";

// --- Constants ---
const FALLBACK_GENRES = Object.keys(GENRE_COLORS).sort();
const FALLBACK_START_YEAR = 2010;
const FALLBACK_END_YEAR = 2025;
const FALLBACK_DATA: TimelinePoint[] = [];

type TimelinePoint = {
  year: number;
  [genre: string]: number | string;
};

interface GenreTimelineResponse {
  genres: string[];
  years: number[];
  chartData: TimelinePoint[];
}

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
        fontFamily: 'Pathway Extreme',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 12px',
        width: '100%'
      }}
    >
      {/* Color Dot */}
      <div className={cn(
        "w-3 h-3 rounded-full border shadow-sm shrink-0 transition-colors",
        isSelected ? "bg-white/40 border-white/40" : "bg-slate-100 border-slate-300 group-hover:border-slate-400"
      )} style={{
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        flexShrink: 0,
        ...(!isSelected ? { backgroundColor: GENRE_COLORS[genre] } : {})
      }} />
      
      <span className="truncate font-medium" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{genre}</span>
      
      {isSelected && (
        <div className="ml-auto bg-white/20 p-0.5 rounded-full" style={{ marginLeft: 'auto' }}>
          <Check className="w-3 h-3" strokeWidth={3} style={{ width: '12px', height: '12px' }} />
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
    style={{ 
      fontFamily: 'Pathway Extreme',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 20px'
    }}
  >
    <Icon className={cn("w-4 h-4", active ? "text-yellow-400" : "text-slate-400 group-hover:text-slate-600")} style={{ width: '16px', height: '16px' }} />
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

export function TimelineChart({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const [genres, setGenres] = useState<string[]>(FALLBACK_GENRES);
  const [data, setData] = useState<TimelinePoint[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(FALLBACK_GENRES);
  const [yearRange, setYearRange] = useState<number[]>([FALLBACK_START_YEAR, FALLBACK_END_YEAR]);
  const [startYear, setStartYear] = useState<number>(FALLBACK_START_YEAR);
  const [endYear, setEndYear] = useState<number>(FALLBACK_END_YEAR);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch live data from backend
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://jefraydi.webdev.iyaserver.com/acad274/Viralgo/genre_timeline.php");
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const json: GenreTimelineResponse = await res.json();

        if (!json.chartData || !json.genres || !json.years) throw new Error("Unexpected API shape");

        const prepared = json.chartData.map((row) => {
          const total = json.genres.reduce((acc, g) => acc + (Number(row[g]) || 0), 0);
          return { ...row, total };
        });

        if (!isMounted) return;
        setGenres(json.genres);
        setData(prepared);
        setSelectedGenres(json.genres);
        const minYear = Math.min(...json.years);
        const maxYear = Math.max(...json.years);
        setStartYear(minYear);
        setEndYear(maxYear);
        setYearRange([minYear, maxYear]);
      } catch (err: any) {
        console.error("Timeline fetch failed, falling back to local data", err);
        if (!isMounted) return;
        setError("Live data unavailable, no fallback dataset configured.");
        setData([]);
        setGenres(FALLBACK_GENRES);
        setSelectedGenres([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Sort genres by total volume (Biggest at Bottom) to ensure consistent and visually pleasing stacking
  const sortedGenres = useMemo(() => {
    const volumes: Record<string, number> = {};
    genres.forEach(g => volumes[g] = 0);
    data.forEach(d => {
      genres.forEach(g => {
        if (d[g]) volumes[g] += d[g];
      });
    });
    // Descending sort: High volume -> Low volume
    // In Recharts Stack, the first rendered Area is at the BOTTOM.
    // We want Biggest at Bottom to provide a stable base.
    return [...genres].sort((a, b) => volumes[b] - volumes[a]);
  }, [data, genres]);

  const filteredData = useMemo(() => {
    return data.filter(d => d.year >= yearRange[0] && d.year <= yearRange[1]);
  }, [data, yearRange]);

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const applyStory = (storyGenres: string[], start: number, end: number) => {
    const validGenres = storyGenres.filter(g => genres.includes(g));
    setSelectedGenres(validGenres);
    setYearRange([start, end]);
  };

  const selectAll = () => setSelectedGenres(genres);
  const deselectAll = () => setSelectedGenres([]);

  return (
    <div 
      className={cn("bg-white rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] overflow-hidden", className)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        ...style
      }}
    >
      
      {/* Header & Controls */}
      <div 
        className="p-6 pb-4 border-b border-slate-100 bg-slate-50/50"
        style={{
            padding: '24px 24px 16px 24px',
            borderBottom: '1px solid #f1f5f9'
        }}
      >
        <div className="flex justify-between items-end" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h3 className="text-lg text-slate-500 mb-1" style={{ fontFamily: 'Days One', fontSize: '18px', marginBottom: '4px' }}>Market Evolution</h3>
            <p className="text-slate-400 text-sm" style={{ fontFamily: 'Pathway Extreme', fontSize: '14px' }}>
              Analyze trends across {genres.length} genres. Showing {selectedGenres.length} of {genres.length} genres.
            </p>
            {loading && <p className="text-xs text-slate-400">Loading latest data...</p>}
            {error && <p className="text-xs text-amber-600">{error}</p>}
          </div>
          
          <div className="flex items-center gap-3" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Quick Stories */}
            <div className="flex gap-3 mr-6" style={{ display: 'flex', gap: '12px', marginRight: '24px' }}>
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
                 onClick={() => { setSelectedGenres(genres); setYearRange([startYear, endYear]); }} 
               />
            </div>

            {/* Genre Filter Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <button 
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}
                >
                  <Filter className="w-4 h-4" style={{ width: '16px', height: '16px' }} />
                  Filter Genres
                  <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] min-w-[20px]">
                    {selectedGenres.length}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" style={{ width: '12px', height: '12px' }} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[800px] p-0" align="end" sideOffset={8}>
                <div className="p-4 border-b border-slate-100 bg-slate-50/80 backdrop-blur supports-[backdrop-filter]:bg-slate-50/50 flex justify-between items-center sticky top-0 z-10">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-sm text-slate-700" style={{ fontFamily: 'Days One' }}>Select Genres</span>
                    <span className="bg-slate-200 text-slate-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold">{genres.length}</span>
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
                    {genres.map(genre => (
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
      <div 
        className="relative"
        style={{
            flex: 1,
            width: '100%',
            padding: '24px',
            minHeight: 0,
            position: 'relative'
        }}
      >
         {/* Background hint if no genres selected */}
         {selectedGenres.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center z-0" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
              {genres.map(genre => (
                <linearGradient key={genre} id={`color${genre.replace(/[^a-zA-Z0-9]/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={GENRE_COLORS[genre] || "#8884d8"} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={GENRE_COLORS[genre] || "#8884d8"} stopOpacity={0.1}/>
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
                  stroke={GENRE_COLORS[genre] || "#8884d8"}
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
      <div 
        className="h-20 px-12 bg-white border-t border-slate-100 flex items-center flex-col justify-center shrink-0"
        style={{
            height: '80px',
            padding: '0 48px',
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0
        }}
      >
        <div className="w-full mb-2 flex justify-between text-sm font-bold text-slate-600" style={{ fontFamily: 'Days One', width: '100%', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
          <span>{yearRange[0]}</span>
          <span>{yearRange[1]}</span>
        </div>
        <Slider
          defaultValue={[startYear, endYear]}
          value={yearRange}
          min={startYear}
          max={endYear}
          step={1}
          onValueChange={(val) => setYearRange(val)}
          className="w-full"
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
}
