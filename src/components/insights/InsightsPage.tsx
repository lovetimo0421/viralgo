import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// Level data structure based on the Final Project Build PDF
interface LevelData {
  id: number;
  title: string;
  subtitle: string;
  content: {
    sections: Array<{
      heading: string;
      text: string;
      sources?: string[];
    }>;
    keyConclusions: string[];
  };
}

const levels: LevelData[] = [
  {
    id: 1,
    title: "Level 1",
    subtitle: "Genre Analysis",
    content: {
      sections: [
        {
          heading: "Overall Trends",
          text: "There was a notable peak in Steam usage across genres between 2017 and 2018, followed by a dip between 2018 and 2019. The technology publication Ars Technica attributed this decline to a player exodus from Playerunknown's Battlegrounds (PUBG), a Battle Royale game that was one of Steam's most popular games at the time. Steam saw an all-time peak in daily active users (DAU) of 16.8 million in January of 2018, but this number fell almost 12 percent to 14.9 million DAU in July. Under this hypothesis, PUBG's rise to prominence was driving overall usage of Steam across genres (i.e. users were drawn in by PUBG, but then also played Adventure and Indie games), which tapered off once users tired of the game.\n\nFurthermore, the dip in users between 2024 to 2025 for almost all genres likely reflects incomplete data from the remainder in 2025, rather than an actual decline in users. According to the consulting company DemandSage, Steam's monthly active users (MAU) are actually up 10% from 2024.",
          sources: [
            "https://www.demandsage.com/steam-statistics/",
            "https://arstechnica.com/gaming/2018/08/is-fortnite-to-blame-for-steams-falling-user-numbers-this-year/"
          ]
        },
        {
          heading: "The Battle Royale Bubble",
          text: "Action has been the most popular genre since 2010, with Adventure, Indie, and Strategy trading places for 2nd, 3rd, and 4th from 2012 to 2016. This trend was interrupted by the rise of Battle Royale in 2017, which claimed 4th place that year, and Strategy was knocked down to 5th. In 2018, Strategy regained its spot in the top 4, followed by Simulation in 5th, and Battle Royale in 6th. While Battle Royale was able to maintain its relevance and earn 5th place in 2019, it experienced a steep drop off in 2020, falling to 9th place and marking the end of the Battle Royale bubble. The genre has faced a steady decline ever since."
        },
        {
          heading: "Analysis of MOBA Trend",
          text: "The MOBA (Multiplier Online Battle Arena) genre experienced a consistent increase in popularity from 2011 to its peak in 2016. Unlike Battle Royale, it did not face a steep dropoff, but rather a moderate decline back to roughly its 2014 usage. Despite slight peaks in 2019 and 2022, the genre never recovered to its 2016 level. These trends within the MOBA genre were partially driven by Dota 2, a popular game that experienced usage increases in 2016, 2019, and 2022."
        }
      ],
      keyConclusions: [
        "Steam Usage is influenced by the popularity of certain genres and their respective titles",
        "Action, Adventure, and Indie are the most popular genres of the past decade",
        "Fleeting fads, such as the Battle Royale bubble and MOBA trend, can temporarily disrupt genre rankings, although the status quo remains relatively constant"
      ]
    }
  },
  {
    id: 2,
    title: "Level 2",
    subtitle: "Revenue",
    content: {
      sections: [
        {
          heading: "Average Revenue vs. Average Units Sold Analysis",
          text: "This chart illustrates the complex relationship between Average Revenue (AR) and Average Units Sold (AUS) by video game genre. While there is a clear positive correlation between AR and AUS, there are also exceptions to this trend. For example, the MOBA and Battle Royale genres have the 3rd and 4th highest AUS, but have below average AR.\n\nFurthermore, while the revenue per unit sold (represented by the size of the dots) generally increases as AUS increases, there are also several exceptions to this rule. Tactical shooter games sold the most units on average, but had a middling revenue per unit sold ($10.25). Similarly, the Poker genre falls solidly at the center of the AUS distribution, but has one of the lowest AUS out of all genres ($0.32)\n\nThis chart also reveals that the MMORPG (Massively multiplayer online role-playing game) genre generates a surprisingly high amount of revenue (8.1M) despite having comparatively low popularity. In fact, it has the highest revenue per unit sold ($44.75) out of all genres, as reflected in its largest bubble size on the chart."
        },
        {
          heading: "Genre Money Map",
          text: "These graphs highlight the relative 'profitability' of different genres through two different views, one with the top 20 games by AR, and one with the top 20 games by AUS. Both graphs are sorted from highest revenue per unit to lowest revenue per unit. These graphs reinforce that MMORPG is the clear winner in terms of revenue per unit, followed by 4x Strategy, and Action RPG. While RPG and Strategy have been in the top 5 in the genre popularity rankings for multiple years, MMORPG has been consistently low in the rankings. This indicates that the relationship between revenue per unit and genre popularity is not straightforward, and may be impacted by other factors, such as the pricing strategies common in different genres (e.g. one time purchase paid games vs. free games with in-game purchases)."
        }
      ],
      keyConclusions: [
        "Average revenue generally increases with average units sold, despite some exceptions",
        "Revenue per unit generally increases with the number of units sold, despite some exceptions",
        "Genre popularity does not always correlate to average revenue or average units sold"
      ]
    }
  },
  {
    id: 3,
    title: "Level 3",
    subtitle: "Success of specific titles over time",
    content: {
      sections: [
        {
          heading: "More attention = longer lasting success",
          text: "Analysis of specific game titles reveals that sustained social media attention correlates with longer-term player engagement. Games that maintain consistent presence across YouTube, Twitch, and other platforms demonstrate more stable player bases over time."
        }
      ],
      keyConclusions: []
    }
  },
  {
    id: 4,
    title: "Level 4",
    subtitle: "Gaming Trends Today",
    content: {
      sections: [
        {
          heading: "Platform Play Cloud & Session Duration",
          text: "This section is not only limited to Steam games but also heavily focused on data today (2024). Looking at these charts in combination reveals that mobile games despite having one of the lowest session durations earns the most revenue."
        },
        {
          heading: "Viral peaks are usually before player peaks",
          text: "Analysis shows that social media buzz and viral moments typically precede actual player count peaks. This indicates that social media serves as a leading indicator for game popularity, with YouTube videos, Twitch streams, and social mentions creating awareness that translates to player growth days or weeks later."
        }
      ],
      keyConclusions: []
    }
  }
];

export default function InsightsPage() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleNextLevel = () => {
    if (currentLevel < levels.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setCurrentLevel(currentLevel + 1);
      setProgress(((currentLevel + 1) / levels.length) * 100);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handlePrevLevel = () => {
    if (currentLevel > 0 && !isAnimating) {
      setIsAnimating(true);
      setCurrentLevel(currentLevel - 1);
      setProgress(((currentLevel - 1) / levels.length) * 100);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const currentLevelData = levels[currentLevel];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Navigation Bar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #ff5416 0%, #ff2d10 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: 'Days One'
          }}>
            Viralgo
          </div>
        </Link>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <Link to="/" style={{
            color: '#101545',
            textDecoration: 'underline',
            fontFamily: 'Pathway Extreme',
            fontSize: '14px'
          }}>
            Home
          </Link>
          <Link to="/games" style={{
            color: '#101545',
            textDecoration: 'underline',
            fontFamily: 'Pathway Extreme',
            fontSize: '14px'
          }}>
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Progress Bar */}
      <div style={{
        position: 'fixed',
        top: '60px',
        left: 0,
        right: 0,
        height: '4px',
        background: 'rgba(255,255,255,0.1)',
        zIndex: 999
      }}>
        <motion.div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #ff5416 0%, #ff2d10 100%)',
            width: `${progress}%`
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Progress Tracker - Stick Figure Journey */}
      <div style={{
        position: 'fixed',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        maxWidth: '800px',
        zIndex: 1000
      }}>
        <div style={{
          position: 'relative',
          height: '80px',
          display: 'flex',
          alignItems: 'center'
        }}>
          {/* Progress Line */}
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '3px',
            background: 'rgba(255,255,255,0.2)',
            top: '50%',
            transform: 'translateY(-50%)'
          }}>
            <motion.div
              style={{
                height: '100%',
                background: '#fff',
                width: `${(currentLevel / (levels.length - 1)) * 100}%`
              }}
              animate={{ width: `${(currentLevel / (levels.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Level Markers */}
          {levels.map((level, index) => (
            <div
              key={level.id}
              style={{
                position: 'absolute',
                left: `${(index / (levels.length - 1)) * 100}%`,
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              onClick={() => {
                if (!isAnimating) {
                  setCurrentLevel(index);
                  setProgress((index / levels.length) * 100);
                }
              }}
            >
              <motion.div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: index <= currentLevel ? '#fff' : 'rgba(255,255,255,0.3)',
                  border: index === currentLevel ? '3px solid #ff5416' : 'none',
                  marginBottom: '10px'
                }}
                whileHover={{ scale: 1.2 }}
              />
              <span style={{
                fontSize: '12px',
                color: index === currentLevel ? '#ff5416' : '#888',
                fontFamily: 'Days One',
                whiteSpace: 'nowrap'
              }}>
                {index === 0 ? 'Start' : index === levels.length - 1 ? 'End' : index}
              </span>
            </div>
          ))}

          {/* Animated Stick Figure */}
          <motion.div
            style={{
              position: 'absolute',
              left: `${(currentLevel / (levels.length - 1)) * 100}%`,
              top: '-30px',
              transform: 'translateX(-50%)'
            }}
            animate={{
              left: `${(currentLevel / (levels.length - 1)) * 100}%`
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {/* Stick Figure SVG */}
            <svg width="40" height="60" viewBox="0 0 40 60" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
              {/* Head */}
              <circle cx="20" cy="12" r="8" fill="#fff" stroke="#ff5416" strokeWidth="2" />
              {/* Eyes */}
              <circle cx="17" cy="11" r="2" fill="#ff5416" />
              <circle cx="23" cy="11" r="2" fill="#ff5416" />
              {/* Body */}
              <line x1="20" y1="20" x2="20" y2="38" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
              {/* Sword */}
              <motion.g
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '25px 30px' }}
              >
                <rect x="25" y="15" width="3" height="20" fill="#ff5416" rx="1" />
                <polygon points="26.5,12 22,15 31,15" fill="#ff8b16" />
              </motion.g>
              {/* Arms */}
              <line x1="20" y1="25" x2="12" y2="32" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
              <line x1="20" y1="25" x2="25" y2="30" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
              {/* Legs */}
              <motion.line
                x1="20" y1="38" x2="15" y2="52"
                stroke="#fff" strokeWidth="3" strokeLinecap="round"
                animate={{ x2: [15, 17, 15], y2: [52, 50, 52] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.line
                x1="20" y1="38" x2="25" y2="52"
                stroke="#fff" strokeWidth="3" strokeLinecap="round"
                animate={{ x2: [25, 23, 25], y2: [52, 50, 52] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{
        paddingTop: '100px',
        paddingBottom: '200px',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '100px 40px 200px'
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLevel}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            {/* Level Title */}
            <motion.h1
              style={{
                fontSize: '80px',
                fontFamily: 'Days One',
                marginBottom: '20px',
                background: 'linear-gradient(90deg, #ff5416 0%, #ff2d10 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center'
              }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {currentLevelData.title}
            </motion.h1>

            <h2 style={{
              fontSize: '40px',
              fontFamily: 'Days One',
              marginBottom: '60px',
              color: '#fff',
              textAlign: 'center'
            }}>
              {currentLevelData.subtitle}
            </h2>

            {/* Content Sections */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '20px',
              padding: '40px',
              marginBottom: '40px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              {currentLevelData.content.sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  style={{ marginBottom: '40px' }}
                >
                  <h3 style={{
                    fontSize: '28px',
                    color: '#ff5416',
                    marginBottom: '20px',
                    fontFamily: 'Days One'
                  }}>
                    {section.heading}
                  </h3>
                  <p style={{
                    fontSize: '18px',
                    lineHeight: '1.8',
                    color: '#ddd',
                    fontFamily: 'Fira Code',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {section.text}
                  </p>
                  {section.sources && section.sources.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                      <p style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#ff5416',
                        fontFamily: 'Fira Code',
                        marginBottom: '10px'
                      }}>
                        Sources:
                      </p>
                      {section.sources.map((source, idx) => (
                        <motion.a
                          key={idx}
                          href={source}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'block',
                            color: '#00d4ff',
                            fontSize: '14px',
                            fontFamily: 'Fira Code',
                            marginBottom: '5px',
                            textDecoration: 'underline'
                          }}
                          whileHover={{ color: '#ff8b16', x: 5 }}
                        >
                          {source}
                        </motion.a>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Key Conclusions */}
              {currentLevelData.content.keyConclusions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  style={{
                    marginTop: '50px',
                    padding: '30px',
                    background: 'rgba(255, 84, 22, 0.1)',
                    borderRadius: '15px',
                    border: '2px solid #ff5416'
                  }}
                >
                  <h3 style={{
                    fontSize: '24px',
                    color: '#ff5416',
                    marginBottom: '20px',
                    fontFamily: 'Days One'
                  }}>
                    Key Conclusions:
                  </h3>
                  <ol style={{
                    fontSize: '18px',
                    lineHeight: '2',
                    color: '#fff',
                    fontFamily: 'Fira Code',
                    paddingLeft: '25px'
                  }}>
                    {currentLevelData.content.keyConclusions.map((conclusion, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + idx * 0.1 }}
                        style={{ marginBottom: '15px' }}
                      >
                        {conclusion}
                      </motion.li>
                    ))}
                  </ol>
                </motion.div>
              )}
            </div>

            {/* Navigation Arrows */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '40px'
            }}>
              <motion.button
                onClick={handlePrevLevel}
                disabled={currentLevel === 0}
                style={{
                  background: currentLevel === 0 ? 'rgba(255,255,255,0.1)' : 'linear-gradient(90deg, #ff5416 0%, #ff2d10 100%)',
                  color: '#fff',
                  border: 'none',
                  padding: '15px 40px',
                  borderRadius: '10px',
                  fontSize: '18px',
                  fontFamily: 'Days One',
                  cursor: currentLevel === 0 ? 'not-allowed' : 'pointer',
                  opacity: currentLevel === 0 ? 0.3 : 1
                }}
                whileHover={currentLevel !== 0 ? { scale: 1.05, boxShadow: '0 0 20px rgba(255, 84, 22, 0.5)' } : {}}
                whileTap={currentLevel !== 0 ? { scale: 0.95 } : {}}
              >
                ← Previous Level
              </motion.button>

              <motion.button
                onClick={handleNextLevel}
                disabled={currentLevel === levels.length - 1}
                style={{
                  background: currentLevel === levels.length - 1 ? 'rgba(255,255,255,0.1)' : 'linear-gradient(90deg, #ff5416 0%, #ff2d10 100%)',
                  color: '#fff',
                  border: 'none',
                  padding: '15px 40px',
                  borderRadius: '10px',
                  fontSize: '18px',
                  fontFamily: 'Days One',
                  cursor: currentLevel === levels.length - 1 ? 'not-allowed' : 'pointer',
                  opacity: currentLevel === levels.length - 1 ? 0.3 : 1
                }}
                whileHover={currentLevel !== levels.length - 1 ? { scale: 1.05, boxShadow: '0 0 20px rgba(255, 84, 22, 0.5)' } : {}}
                whileTap={currentLevel !== levels.length - 1 ? { scale: 0.95 } : {}}
              >
                Next Level →
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Animated Background Elements */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: -1,
        overflow: 'hidden'
      }}>
        {/* Floating Icons based on current level */}
        {currentLevel === 1 && (
          <>
            <motion.div
              style={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                fontSize: '60px'
              }}
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              💰
            </motion.div>
            <motion.div
              style={{
                position: 'absolute',
                top: '60%',
                right: '15%',
                fontSize: '50px'
              }}
              animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              💎
            </motion.div>
          </>
        )}

        {currentLevel === 2 && (
          <>
            <motion.div
              style={{
                position: 'absolute',
                top: '15%',
                right: '10%',
                fontSize: '55px'
              }}
              animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              👍
            </motion.div>
            <motion.div
              style={{
                position: 'absolute',
                bottom: '20%',
                left: '12%',
                fontSize: '50px'
              }}
              animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              📊
            </motion.div>
          </>
        )}

        {currentLevel === 3 && (
          <>
            <motion.div
              style={{
                position: 'absolute',
                top: '25%',
                left: '8%',
                fontSize: '60px'
              }}
              animate={{ y: [0, -18, 0], rotate: [0, 6, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              ▶️
            </motion.div>
            <motion.div
              style={{
                position: 'absolute',
                top: '50%',
                right: '12%',
                fontSize: '55px'
              }}
              animate={{ y: [0, 18, 0], rotate: [0, -6, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              💬
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
