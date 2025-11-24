import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const API_URL = 'https://asankhal.webdev.iyaserver.com/api/games.php';

interface Game {
  title: string;
  rating: string;
  release_date: string;
  genres: string;
  plays?: string;
}

interface GenreData {
  genres: string;
  game_count: string;
}

interface YearData {
  year_short: string;
  game_count: string;
}

interface Stats {
  total_games: string;
  avg_rating: string;
  max_rating: string;
}

export default function GamesDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [topRated, setTopRated] = useState<Game[]>([]);
  const [mostPlayed, setMostPlayed] = useState<Game[]>([]);
  const [genreData, setGenreData] = useState<GenreData[]>([]);
  const [yearData, setYearData] = useState<YearData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, ratedRes, playedRes, genreRes, yearRes] = await Promise.all([
          fetch(`${API_URL}?stat=stats`),
          fetch(`${API_URL}?stat=top_rated`),
          fetch(`${API_URL}?stat=most_played`),
          fetch(`${API_URL}?stat=by_genre`),
          fetch(`${API_URL}?stat=by_year`)
        ]);

        const statsData = await statsRes.json();
        const ratedData = await ratedRes.json();
        const playedData = await playedRes.json();
        const genreDataRes = await genreRes.json();
        const yearDataRes = await yearRes.json();

        setStats(statsData.data[0]);
        setTopRated(ratedData.data);
        setMostPlayed(playedData.data);
        setGenreData(genreDataRes.data);
        setYearData(yearDataRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const playsToNumber = (plays: string) => {
    if (plays.includes('M')) return parseFloat(plays) * 1000000;
    if (plays.includes('K')) return parseFloat(plays) * 1000;
    return parseFloat(plays);
  };

  const cleanGenre = (genre: string) => {
    return genre.replace(/[\[\]']/g, '').substring(0, 20);
  };

  const fullYear = (short: string) => {
    const num = parseInt(short);
    return num > 50 ? '19' + short : '20' + short;
  };

  // Chart colors
  const colors = [
    '#00d4ff', '#7b2cbf', '#ff6b6b', '#4ecdc4', '#45b7d1',
    '#96ceb4', '#ffeaa7', '#dfe6e9', '#fd79a8', '#a29bfe'
  ];

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: '#00d4ff'
      }}>
        <h2>Loading Games Data...</h2>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      color: '#fff',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <h1 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          marginBottom: '10px',
          background: 'linear-gradient(90deg, #00d4ff, #7b2cbf)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🎮 Popular Games 1980-2023
        </h1>
        <p style={{ textAlign: 'center', color: '#888', marginBottom: '30px' }}>
          Interactive Data Visualization Dashboard
        </p>

        {/* Stats Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          marginBottom: '30px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '15px 30px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '2rem', color: '#00d4ff' }}>{stats?.total_games}</h3>
            <p style={{ color: '#aaa' }}>Total Games</p>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '15px 30px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '2rem', color: '#00d4ff' }}>
              {parseFloat(stats?.avg_rating || '0').toFixed(2)}
            </h3>
            <p style={{ color: '#aaa' }}>Average Rating</p>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '15px 30px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '2rem', color: '#00d4ff' }}>{stats?.max_rating}</h3>
            <p style={{ color: '#aaa' }}>Highest Rating</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
          gap: '20px'
        }}>
          {/* Top Rated Chart */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '15px',
            padding: '20px'
          }}>
            <h2 style={{ color: '#00d4ff', marginBottom: '15px' }}>⭐ Top 10 Highest Rated</h2>
            <div style={{ height: '300px' }}>
              <Bar
                data={{
                  labels: topRated.map(g => g.title.substring(0, 15) + '...'),
                  datasets: [{
                    label: 'Rating',
                    data: topRated.map(g => parseFloat(g.rating)),
                    backgroundColor: 'rgba(255, 215, 0, 0.8)',
                    borderRadius: 5
                  }]
                }}
                options={{
                  indexAxis: 'y',
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { max: 5, ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                    y: { ticks: { color: '#fff', font: { size: 10 } }, grid: { display: false } }
                  }
                }}
              />
            </div>
          </div>

          {/* Most Played Chart */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '15px',
            padding: '20px'
          }}>
            <h2 style={{ color: '#00d4ff', marginBottom: '15px' }}>🔥 Most Played Games</h2>
            <div style={{ height: '300px' }}>
              <Bar
                data={{
                  labels: mostPlayed.map(g => g.title.substring(0, 15) + '...'),
                  datasets: [{
                    label: 'Plays',
                    data: mostPlayed.map(g => playsToNumber(g.plays || '0')),
                    backgroundColor: 'rgba(0, 212, 255, 0.8)',
                    borderRadius: 5
                  }]
                }}
                options={{
                  indexAxis: 'y',
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { 
                      ticks: { 
                        color: '#fff',
                        callback: (value) => {
                          const num = value as number;
                          if (num >= 1000000) return (num/1000000) + 'M';
                          if (num >= 1000) return (num/1000) + 'K';
                          return num;
                        }
                      }, 
                      grid: { color: 'rgba(255,255,255,0.1)' } 
                    },
                    y: { ticks: { color: '#fff', font: { size: 10 } }, grid: { display: false } }
                  }
                }}
              />
            </div>
          </div>

          {/* Genre Chart */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '15px',
            padding: '20px'
          }}>
            <h2 style={{ color: '#00d4ff', marginBottom: '15px' }}>🎯 Games by Genre</h2>
            <div style={{ height: '300px' }}>
              <Doughnut
                data={{
                  labels: genreData.map(g => cleanGenre(g.genres)),
                  datasets: [{
                    data: genreData.map(g => parseInt(g.game_count)),
                    backgroundColor: colors,
                    borderColor: '#1a1a2e',
                    borderWidth: 2
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: { color: '#fff', padding: 8, font: { size: 9 } }
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Year Chart */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '15px',
            padding: '20px'
          }}>
            <h2 style={{ color: '#00d4ff', marginBottom: '15px' }}>📈 Games by Year</h2>
            <div style={{ height: '300px' }}>
              <Line
                data={{
                  labels: yearData.map(y => fullYear(y.year_short)),
                  datasets: [{
                    label: 'Games Released',
                    data: yearData.map(y => parseInt(y.game_count)),
                    borderColor: '#00d4ff',
                    backgroundColor: 'rgba(0, 212, 255, 0.2)',
                    fill: true,
                    tension: 0.4
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                    y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } }
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '15px',
          padding: '20px',
          marginTop: '20px'
        }}>
          <h2 style={{ color: '#00d4ff', marginBottom: '15px' }}>📊 Top Rated Games Data</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(0,212,255,0.3)' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Title</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Rating</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Release Date</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Genres</th>
              </tr>
            </thead>
            <tbody>
              {topRated.map((game, index) => (
                <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <td style={{ padding: '12px' }}>{game.title}</td>
                  <td style={{ padding: '12px' }}>⭐ {game.rating}</td>
                  <td style={{ padding: '12px' }}>{game.release_date}</td>
                  <td style={{ padding: '12px' }}>{game.genres.replace(/[\[\]']/g, '')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}