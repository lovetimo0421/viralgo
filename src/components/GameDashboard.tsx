import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import svgPaths from "../imports/svg-t887g6hfmj";
import imgUntitledArtwork1371 from "figma:asset/1c8ffdc7a07a1954eb76224fc2092d70f2be14c5.png";
import imgUntitledArtwork1362 from "figma:asset/b7a01e0c0ae05cd86b8f9f2231c90fcb2980a569.png";
import imgRectangle73 from "figma:asset/974f295ffd8a16c3d124959eceaa2f6ec70a7250.png";
import { TimelineChart } from "./TimelineChart";
import { GenreMoneyMap } from "./GenreMoneyMap";
import { TopGamesChart } from "./TopGamesChart";

// --- Reusable Styles from Home ---
const NAV_LINK_STYLE = { fontVariationSettings: "'wdth' 100", fontFamily: 'Pathway Extreme' };
const HEADER_FONT = { fontFamily: 'Days One' };
const BODY_FONT = { fontFamily: 'Fira Code' };

// Offset adjustment: Content restored to original positions (Header reduced to 400px, creating 84px gap)

function Group1() {
  return (
    <div>
      <motion.div 
        className="absolute left-[-266px] opacity-60 size-[1051px] top-[7359px]" 
        data-name="Untitled_Artwork 137 1"
        whileHover={{ rotate: -5, scale: 1.05 }}
        transition={{ duration: 0.5 }}
      >
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledArtwork1371} />
      </motion.div>
    </div>
  );
}

function Group2() {
  return (
    <div className="leading-[24px] text-[18px] text-nowrap text-white whitespace-pre">
      <p className="absolute font-bold left-[calc(75%-17px)] top-[7662px]" style={BODY_FONT}>Sources</p>
      <div className="absolute font-normal left-[calc(75%-17px)] top-[7723px]" style={BODY_FONT}>
        <motion.p className="mb-0 cursor-pointer" whileHover={{ scale: 1.05, color: "#ff8b16" }} whileTap={{ scale: 0.95 }}>
          <a href="https://steamdb.info/charts/?sort=peak" target="_blank" rel="noopener noreferrer" className="no-underline">SteamDB</a>
        </motion.p>
        <p className="mb-0 text-[18px]">&nbsp;</p>
        <motion.p className="mb-0 cursor-pointer" whileHover={{ scale: 1.05, color: "#ff8b16" }} whileTap={{ scale: 0.95 }}>
          <a href="https://developers.google.com/youtube/v3" target="_blank" rel="noopener noreferrer" className="no-underline">YouTube API</a>
        </motion.p>
        <p className="mb-0 text-[18px]">&nbsp;</p>
        <motion.p className="mb-0 cursor-pointer" whileHover={{ scale: 1.05, color: "#ff8b16" }} whileTap={{ scale: 0.95 }}>
          <a href="https://dev.twitch.tv/docs/api/" target="_blank" rel="noopener noreferrer" className="no-underline">Twitch API</a>
        </motion.p>
        <p className="mb-0 text-[18px]">&nbsp;</p>
        <motion.p className="mb-0 cursor-pointer" whileHover={{ scale: 1.05, color: "#ff8b16" }} whileTap={{ scale: 0.95 }}>
          <a href="https://steamcommunity.com/dev" target="_blank" rel="noopener noreferrer" className="no-underline">Steam API</a>
        </motion.p>
        <p className="mb-0 text-[18px]">&nbsp;</p>
        <motion.p className="mb-0 cursor-pointer" whileHover={{ scale: 1.05, color: "#ff8b16" }} whileTap={{ scale: 0.95 }}>
          <a href="https://app.sensortower.com/vgi/" target="_blank" rel="noopener noreferrer" className="no-underline">Video Game Insights</a>
        </motion.p>
        <p className="mb-0 text-[18px]">&nbsp;</p>
        <motion.p className="mb-0 cursor-pointer" whileHover={{ scale: 1.05, color: "#ff8b16" }} whileTap={{ scale: 0.95 }}>
          <a href="https://twitchtracker.com/" target="_blank" rel="noopener noreferrer" className="no-underline">TwitchTracker</a>
        </motion.p>
      </div>
      <div className="absolute font-normal left-[calc(58.33%+1px)] top-[7723px]" style={BODY_FONT}>
        <motion.p className="mb-0 cursor-pointer" whileHover={{ scale: 1.05, color: "#ff8b16" }} whileTap={{ scale: 0.95 }}>
          <a href="https://www.twitch.tv/" target="_blank" rel="noopener noreferrer" className="no-underline">Twitch</a>
        </motion.p>
        <p className="mb-0 text-[18px]">&nbsp;</p>
        <motion.p className="mb-0 cursor-pointer" whileHover={{ scale: 1.05, color: "#ff8b16" }} whileTap={{ scale: 0.95 }}>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="no-underline">YouTube</a>
        </motion.p>
        <p className="mb-0 text-[18px]">&nbsp;</p>
        <motion.p className="mb-0 cursor-pointer" whileHover={{ scale: 1.05, color: "#ff8b16" }} whileTap={{ scale: 0.95 }}>
          <a href="https://store.steampowered.com/" target="_blank" rel="noopener noreferrer" className="no-underline">Steam</a>
        </motion.p>
      </div>
      <p className="absolute font-bold left-[calc(58.33%+1px)] top-[7662px]" style={BODY_FONT}>Data</p>
    </div>
  );
}

function Footer() {
  return (
    <div data-name="Footer">
      <div className="absolute bg-[#101545] h-[484px] left-0 top-[7583px] w-[1440px]" />
      <div className="absolute flex h-[961px] items-center justify-center left-[-2px] top-[6979px] w-[1442px]">
        <div className="flex-none scale-y-[-100%]">
          <div className="h-[961px] relative w-[1442px]" data-name="Untitled_Artwork 136 2">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledArtwork1362} />
          </div>
        </div>
      </div>
      <Group1 />
      <Group2 />
    </div>
  );
}

function Group4() {
  return (
    <div>
      <TimelineChart />
      {/* <p className="absolute h-[133.336px] leading-[normal] left-[calc(8.33%+600.47px)] not-italic text-[80px] text-center text-white top-[1371.33px] translate-x-[-50%] w-[1126.12px]" style={HEADER_FONT}>Graph Placeholder</p> */}
    </div>
  );
}

function TimelineOfHitGames() {
  return (
    <div data-name="Timeline of Hit Games">
      <Group4 />
      <p className="absolute h-[112px] leading-[normal] left-[90px] not-italic text-[#ff5416] text-[60px] top-[1015px] w-[734px]" style={HEADER_FONT}>Timeline of Hit Genres</p>
      <p className="absolute font-normal h-[167px] leading-[24px] left-[116px] text-[#101545] text-[16px] top-[2214px] w-[1204px]" style={BODY_FONT}>This chart shows the changing shape of the market from 2010 to 2025. Each colored band is a genre, and its thickness in a given year represents that genre’s share of total peak players. By scanning across the timeline, you can see eras where certain genres swell and others fade. You can use the filter bottom to filter the genre bundles and the story buttons to see our preset trends.</p>
    </div>
  );
}

function Group5() {
  return (
    <div>
      <GenreMoneyMap className="absolute bg-white h-[846px] left-[65px] rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] top-[2560px] w-[1305px]" />
    </div>
  );
}

function Group3() {
  return (
    <div>

    </div>
  );
}

function ReleaseFloodVsSignal() {
  return (
    <div data-name="Release Flood vs. Signal">
      <Group5 />
      <p className="absolute h-[112px] leading-[normal] left-[87px] not-italic text-[#ff5416] text-[60px] top-[2436px] w-[1011px]" style={HEADER_FONT}>Where's the Money?</p>
      <Group3 />
      <p className="absolute font-normal h-[167px] leading-[24px] left-[113px] text-[#101545] text-[16px] top-[3497px] w-[1204px]" style={BODY_FONT}>Here we compare genres not just by how popular they are, but by how they perform as businesses over the same period. Each point represents a genre, positioned by its average units sold (horizontal axis) and average revenue (vertical axis), with bubble size indicating revenue per unit. Genres in the top-right corner are true blockbusters, while those higher up but closer to the left are “premium niches” that earn a lot from relatively fewer players.</p>
    </div>
  );
}

function TopGamesSection() {
  return (
    <div data-name="Top Games Section">
       <p className="absolute h-[112px] leading-[normal] left-[87px] not-italic text-[#ff5416] text-[60px] top-[3714px] w-[1011px]" style={HEADER_FONT}>Top Games by Year</p>
       
       {/* Chart Container */}
       <div className="absolute left-[65px] top-[3850px] w-[1305px] h-[600px] bg-white rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] p-4">
          <TopGamesChart className="w-full h-full" />
       </div>

       <p className="absolute font-normal h-[167px] leading-[24px] left-[113px] text-[#101545] text-[16px] top-[4525px] w-[1204px]" style={BODY_FONT}>
         For each year, this chart lists the top games by their peak Steam player counts. The colors show their primary genres, and the bar length shows how large each game loomed in that year’s landscape. It ties the abstract genre trends above back to the specific releases that defined each era.
       </p>
    </div>
  );
}

function HistoryOfPopularity() {
  return (
    <div data-name="History of Popularity">
      <p className="absolute h-[112px] leading-[normal] left-[calc(8.33%+599.5px)] not-italic text-[#101545] text-[80px] text-center top-[544px] translate-x-[-50%] w-[1049px]" style={HEADER_FONT}>History of Popularity</p>
      <p className="absolute font-normal h-[167px] leading-[24px] left-[118px] text-[#101545] text-[16px] top-[720px] w-[1204px]" style={BODY_FONT}>In History of Popularity, we’re trying to answer a deceptively simple question: what actually became big, and when? Over the past fifteen years, different genres have taken turns owning the charts—strategy and RPGs in the early 2010s, the MOBA wave, the rise of survival sandboxes, and the current era of tactical and hero shooters. But popularity on its own isn’t the whole story. Which of these genres turned their peaks into real money? Are there categories that sell fewer copies but earn far more per player? And when we zoom in from genres to individual titles, which specific games were carrying those trends? The first three graphs in this section walk through that arc: from the big-picture genre timeline, to the economics of each genre, down to the yearly hit lists that made those curves possible.</p>
      <div className="absolute h-0 left-[calc(25%+111px)] top-[658px] w-[498px]">
        <div className="absolute bottom-0 left-0 right-0 top-[-3px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 498 3">
            <line id="Line 1" stroke="var(--stroke-0, #FF5416)" strokeWidth="3" x2="498" y1="1.5" y2="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function HistoryOfPopularity1() {
  return (
    <div data-name="History of Popularity">
      <p className="absolute h-[112px] leading-[normal] left-[calc(8.33%+597.5px)] not-italic text-[#101545] text-[80px] text-center top-[4804px] translate-x-[-50%] w-[1049px]" style={HEADER_FONT}>Hype Today</p>
      <p className="absolute font-normal h-[167px] leading-[24px] left-[116px] text-[#101545] text-[16px] top-[4991px] w-[1204px]" style={BODY_FONT}>If the first section is about who won the last fifteen years according to Steam Data, this section is about how players actually spend their time and attention right now. Using thousands of recent data points across platforms, we look at: how many people show up every day, how long they stay, how much they spend, and how loudly they talk about it online. Is the obvious rule“Most games that do well on social media do well itself”right? Or are there Genre outliers where players quietly log long sessions and strong revenue without ever dominating timelines or streams? </p>
      <div className="absolute h-0 left-[calc(25%+109px)] top-[4934px] w-[498px]">
        <div className="absolute bottom-0 left-0 right-0 top-[-3px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 498 3">
            <line id="Line 1" stroke="var(--stroke-0, #FF5416)" strokeWidth="3" x2="498" y1="1.5" y2="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div data-name="header">
      <div className="absolute flex h-[400px] items-center justify-center left-0 top-0 w-[1441px] bg-[#101545] overflow-hidden">
        {/* Scaled/Cropped Background Image to match screenshot */}
        <div className="flex-none scale-y-[-100%] w-full h-full relative opacity-60">
          <div className="absolute inset-0 w-full h-[758px] top-[-200px]">
             <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgUntitledArtwork1362} />
          </div>
        </div>
      </div>
      <div className="absolute h-auto leading-[1.1] left-[99px] not-italic text-white top-[125px] w-[1200px]" style={HEADER_FONT}>
        <p className="mb-0 text-[100px]">Game Trends:</p>
        <p className="text-[#ff5416] text-[100px]">Data</p>
      </div>
    </div>
  );
}

function Group6() {
  return (
    <div>
      {/* Header Container - Fixed height to 400px so it ends before HistoryOfPopularity (544px), leaving 84px gap */}
      <div className="absolute left-0 top-[0px] w-full h-[400px] overflow-hidden shadow-lg z-0">
          <Header />
      </div>
    </div>
  );
}

function TryItButton() {
  return (
    <Link to="/games">
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div 
          className="absolute bg-[#008cff] h-[35px] left-[1283px] rounded-[10px] top-[12px] w-[103px] cursor-pointer"
          whileHover={{ boxShadow: "0 0 20px rgba(16, 21, 69, 0.5)", backgroundColor: "#101545" }}
          transition={{ duration: 0.3 }}
        />
        <p className="absolute h-[21.596px] leading-[normal] left-[1308px] not-italic text-[16px] text-white top-[18px] w-[85.22px] pointer-events-none" style={HEADER_FONT}>Try It!</p>
      </motion.div>
    </Link>
  );
}

function NavBar() {
  return (
    <div data-name="NavBar">
      <div className="absolute bg-white h-[60px] left-0 top-0 w-[1440px]" />
      
      <TryItButton />
      
      <Link to="/insights">
        <motion.p 
          className="[text-underline-position:from-font] absolute decoration-solid font-normal h-[40px] leading-[normal] left-[1152px] text-[#101545] text-[14px] top-[22px] underline w-[105px] cursor-pointer"
          style={NAV_LINK_STYLE}
          whileHover={{ scale: 1.05, color: "#ff5416" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          Insights
        </motion.p>
      </Link>
      
      <Link to="/sources">
        <motion.p 
          className="[text-underline-position:from-font] absolute decoration-solid font-normal h-[40px] leading-[normal] left-[1047px] text-[#101545] text-[14px] top-[22px] underline w-[67px] cursor-pointer"
          style={NAV_LINK_STYLE}
          whileHover={{ scale: 1.05, color: "#ff5416" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          Sources
        </motion.p>
      </Link>
      
      <Link to="/">
        <motion.p 
          className="[text-underline-position:from-font] absolute decoration-solid font-normal h-[40px] leading-[normal] left-[931px] text-[#101545] text-[14px] top-[22px] underline w-[90px] cursor-pointer"
          style={NAV_LINK_STYLE}
          whileHover={{ scale: 1.05, color: "#ff5416" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          Simulation
        </motion.p>
      </Link>
      
      <Link to="/">
        <motion.div 
          className="absolute h-[33px] left-[23px] top-[17px] w-[31px]" 
          data-name="Vector"
          whileHover={{ scale: 1.1, rotate: -5 }}
          transition={{ duration: 0.3 }}
        >
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 33">
            <g id="Vector">
              <path d={svgPaths.p1ba871f2} fill="url(#paint0_linear_1_230)" />
              <path d={svgPaths.peed3600} fill="url(#paint1_linear_1_230)" />
              <path d={svgPaths.p14e54500} fill="url(#paint2_linear_1_230)" />
            </g>
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_230" x1="31" x2="0" y1="16.5" y2="16.5">
                <stop stopColor="#FF5416" />
                <stop offset="1" stopColor="#FF2D10" />
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_230" x1="31" x2="0" y1="16.5" y2="16.5">
                <stop stopColor="#FF5416" />
                <stop offset="1" stopColor="#FF2D10" />
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_1_230" x1="31" x2="0" y1="16.5" y2="16.5">
                <stop stopColor="#FF5416" />
                <stop offset="1" stopColor="#FF2D10" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </Link>
    </div>
  );
}

export function GameDashboard() {
  return (
    <div className="bg-gray-50 min-h-screen w-full flex justify-center overflow-x-hidden p-8" data-name="Data">
      <div 
        className="bg-white relative w-full max-w-[1440px] h-[8067px] overflow-hidden shadow-xl"
        style={{ border: '1px solid #101545' }}
      >
          <Footer />
          <Group6 />
          <TimelineOfHitGames />
          <ReleaseFloodVsSignal />
          <TopGamesSection />
          <HistoryOfPopularity />
          <HistoryOfPopularity1 />
          <NavBar />
      </div>
    </div>
  );
}

export default GameDashboard;