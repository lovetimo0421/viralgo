import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import svgPaths from "../imports/svg-uonieekiay";
import imgUntitledArtwork1381 from "figma:asset/bbcfda5eed562e08ef4b4fba39e78c9a802e16d5.png";
import imgUntitledArtwork1361 from "figma:asset/b7a01e0c0ae05cd86b8f9f2231c90fcb2980a569.png";
import imgRectangle73 from "figma:asset/974f295ffd8a16c3d124959eceaa2f6ec70a7250.png";
import imgUntitledArtwork1371 from "figma:asset/1c8ffdc7a07a1954eb76224fc2092d70f2be14c5.png";
import imgUntitledArtwork1421 from "figma:asset/b4b23d2761c68ff17d25c6bc50217bbe3a8b4047.png";
import imgUntitledArtwork1431 from "figma:asset/82d2ab40a607c2c02f5fa730a6ff61c9ea91c647.png";
import imgUntitledArtwork1441 from "figma:asset/6778a2caf9b90db6106285cf1b16b1e46ea6d133.png";
import imgUntitledArtwork1471 from "figma:asset/b54bfa24a39aaf2e379aa5159e61d6292bcb7a16.png";
import imgUntitledArtwork1481 from "figma:asset/69cade9dd2386582c8defc686ecba3c332224f89.png";
import imgUntitledArtwork1491 from "figma:asset/e17c5441e9092fccef55ff3a5ff298311912f666.png";
import imgUntitledArtwork1401 from "figma:asset/1c9d0cfc21a9857de2a906a5385c7ac4bb59d297.png";

function Group1({ className }: { className?: string }) {
  return (
    <div className={className}>
      <motion.div
        className="absolute aspect-[3000/3000] left-0 right-0 top-0"
        data-name="Untitled_Artwork 138 1"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        whileHover={{ scale: 1.05 }}
      >
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledArtwork1381} />
      </motion.div>
    </div>
  );
}

function TopBg() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Top BG">
      <div className="absolute bg-[#101545] h-[484px] left-0 top-0 w-[1440px]" />
      <div className="absolute h-[961px] left-0 top-[378px] w-[1441px]" data-name="Untitled_Artwork 136 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledArtwork1361} />
      </div>
    </div>
  );
}

function LearnMoreButton() {
  return (
    <Link to="/games">
      <motion.div
        className="absolute contents left-[716px] top-[660px]"
        data-name="Learn More Button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="absolute bg-gradient-to-l from-[#ff5416] from-[50.481%] h-[62px] left-[716px] rounded-[20px] to-[#ff1b00] top-[660px] w-[180px] cursor-pointer"
          whileHover={{ 
            boxShadow: "0 0 25px rgba(255, 84, 22, 0.6)", 
            backgroundImage: "linear-gradient(to left, #ffffff, #ffffff)" 
          }}
          transition={{ duration: 0.3 }}
        />
        <p className="absolute h-[32px] leading-[normal] left-[760px] not-italic text-[25px] text-white top-[675px] w-[115px] pointer-events-none" style={{ fontFamily: 'Days One' }}>Try It!</p>
      </motion.div>
    </Link>
  );
}

function Title() {
  return (
    <div className="absolute contents left-[720px] top-[210px]" data-name="Title">
      <p className="absolute h-[159px] leading-[normal] left-[831px] not-italic text-[#101545] text-[0px] text-[130px] top-[210px] w-[757px]" style={{ fontFamily: 'Days One' }}>
        <span className="text-[#ff5416]">Vir</span>
        <span className="text-white">algo</span>
      </p>
      <motion.div
        className="absolute h-[91.455px] left-[720px] top-[248px] w-[86.328px]"
        data-name="Vector"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 87 92">
          <g id="Vector">
            <path d={svgPaths.p39df3700} fill="url(#paint0_linear_1_95)" />
            <path d={svgPaths.p1a90a300} fill="url(#paint1_linear_1_95)" />
            <path d={svgPaths.p3a9ba800} fill="url(#paint2_linear_1_95)" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_95" x1="86.3284" x2="0" y1="45.7273" y2="45.7273">
              <stop stopColor="#FF5416" />
              <stop offset="1" stopColor="#FF2D10" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_95" x1="86.3284" x2="0" y1="45.7273" y2="45.7273">
              <stop stopColor="#FF5416" />
              <stop offset="1" stopColor="#FF2D10" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_1_95" x1="86.3284" x2="0" y1="45.7273" y2="45.7273">
              <stop stopColor="#FF5416" />
              <stop offset="1" stopColor="#FF2D10" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}

function Group() {
  return (
    <Link to="/games">
      <motion.div
        className="absolute contents left-[1283px] top-[12px]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="absolute bg-[#008cff] h-[35px] left-[1283px] rounded-[10px] top-[12px] w-[103px] cursor-pointer"
          whileHover={{ boxShadow: "0 0 20px rgba(16, 21, 69, 0.5)", backgroundColor: "#101545" }}
          transition={{ duration: 0.3 }}
        />
        <p className="absolute h-[21.596px] leading-[normal] left-[1308px] not-italic text-[16px] text-white top-[18px] w-[85.22px] pointer-events-none" style={{ fontFamily: 'Days One' }}>Try It!</p>
      </motion.div>
    </Link>
  );
}

function NavBar() {
  return (
    <div className="absolute contents left-0 top-0" data-name="NavBar">
      <div className="absolute bg-white h-[60px] left-0 top-0 w-[1440px]" />
      <Group />
      <Link to="/insights">
        <motion.p
          className="[text-underline-position:from-font] absolute decoration-solid font-normal h-[40px] leading-[normal] left-[1152px] text-[#101545] text-[14px] top-[22px] underline w-[105px] cursor-pointer"
          style={{ fontVariationSettings: "'wdth' 100", fontFamily: 'Pathway Extreme' }}
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
            style={{ fontVariationSettings: "'wdth' 100", fontFamily: 'Pathway Extreme' }}
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
            style={{ fontVariationSettings: "'wdth' 100", fontFamily: 'Pathway Extreme' }}
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
              <path d={svgPaths.p1ba871f2} fill="url(#paint0_linear_1_93)" />
              <path d={svgPaths.peed3600} fill="url(#paint1_linear_1_93)" />
              <path d={svgPaths.p14e54500} fill="url(#paint2_linear_1_93)" />
            </g>
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_93" x1="31" x2="0" y1="16.5" y2="16.5">
                <stop stopColor="#FF5416" />
                <stop offset="1" stopColor="#FF2D10" />
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_93" x1="31" x2="0" y1="16.5" y2="16.5">
                <stop stopColor="#FF5416" />
                <stop offset="1" stopColor="#FF2D10" />
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_1_93" x1="31" x2="0" y1="16.5" y2="16.5">
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

function OurPurpose() {
  return (
    <div className="absolute contents left-[107px] top-[1386px]" data-name="our purpose">
      <div className="absolute h-[612px] left-[107px] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[1386px] w-[1226px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle73} />
      </div>
      <p className="absolute h-[102.989px] leading-[normal] left-[719.99px] not-italic text-[80px] text-center text-white top-[1475px] translate-x-[-50%] w-[1057.99px]" style={{ fontFamily: 'Days One' }}>Our Purpose</p>
      <p className="absolute font-normal h-[458px] leading-[normal] left-[208px] text-[18px] text-white top-[1652px] w-[1058px] whitespace-pre-wrap" style={{ fontFamily: 'Fira Code' }}>{`This project builds an interactive dashboard that tracks how video game popularity has evolved from 1980 to today and how that popularity connects to social media hype. By combining Steam peak loads, long-term play data, release volume, genre revenue/units, and recent metrics like DAU, in-game purchases, mentions, and stream viewership, it lets you see both the "hit history" and the real-time attention economy in one place. The uniqueness comes from linking game performance, genre economics, and social buzz across decades, with controls that let users actively toggle time ranges, platforms, and genres to explore questions like "Which genres turn hype into money?" or "Are there quiet giants with huge players but low social noise?"`}</p>
      <div className="absolute h-0 left-[534px] top-[1596px] w-[372.624px]">
        <div className="absolute bottom-0 left-0 right-0 top-[-2px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 373 2">
            <line id="Line 3" stroke="var(--stroke-0, #FF5416)" strokeWidth="2" x2="372.624" y1="1" y2="1" />
          </svg>
        </div>
      </div>
      <motion.div
        className="absolute h-[107px] left-[1148px] top-[1891px] w-[101px]"
        data-name="Vector"
        whileHover={{ scale: 1.1, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 101 107">
          <g id="Vector">
            <path d={svgPaths.p2f535000} fill="url(#paint0_linear_1_87)" />
            <path d={svgPaths.p23602480} fill="url(#paint1_linear_1_87)" />
            <path d={svgPaths.p47b4700} fill="url(#paint2_linear_1_87)" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_87" x1="101" x2="0" y1="53.5" y2="53.5">
              <stop stopColor="#FF5416" />
              <stop offset="1" stopColor="#FF2D10" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_87" x1="101" x2="0" y1="53.5" y2="53.5">
              <stop stopColor="#FF5416" />
              <stop offset="1" stopColor="#FF2D10" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_1_87" x1="101" x2="0" y1="53.5" y2="53.5">
              <stop stopColor="#FF5416" />
              <stop offset="1" stopColor="#FF2D10" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      <div className="absolute flex h-[107px] items-center justify-center left-[191px] top-[1386px] w-[101px]">
        <motion.div
          className="flex-none rotate-[180deg]"
          whileHover={{ scale: 1.1, y: 5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-[107px] relative w-[101px]" data-name="Vector">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 101 107">
              <g id="Vector">
                <path d={svgPaths.p2f535000} fill="url(#paint0_linear_1_85)" />
                <path d={svgPaths.p23602480} fill="url(#paint1_linear_1_85)" />
                <path d={svgPaths.p47b4700} fill="url(#paint2_linear_1_85)" />
              </g>
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_85" x1="101" x2="0" y1="53.5" y2="53.5">
                  <stop stopColor="#FF5416" />
                  <stop offset="1" stopColor="#FF2D10" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_85" x1="101" x2="0" y1="53.5" y2="53.5">
                  <stop stopColor="#FF5416" />
                  <stop offset="1" stopColor="#FF2D10" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_1_85" x1="101" x2="0" y1="53.5" y2="53.5">
                  <stop stopColor="#FF5416" />
                  <stop offset="1" stopColor="#FF2D10" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[39px] top-[106px]">
      <div className="absolute h-[351.608px] left-[158.74px] top-[218.13px] w-[377.266px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 378 352">
          <path d={svgPaths.p1fe92600} id="Ellipse 177" stroke="var(--stroke-0, white)" strokeWidth="6" />
        </svg>
      </div>
      <motion.div
        className="absolute left-[39px] size-[650px] top-[106px]"
        data-name="Untitled_Artwork 137 1"
        whileHover={{ rotate: 5, scale: 1.05 }}
        transition={{ duration: 0.5 }}
      >
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledArtwork1371} />
      </motion.div>
    </div>
  );
}

function BottomBg() {
  return (
    <div className="absolute contents left-[-2px] top-[4256px]" data-name="Bottom BG">
      <div className="absolute bg-[#101545] h-[463px] left-[-2px] top-[4878px] w-[1442px]" />
      <div className="absolute flex h-[961px] items-center justify-center left-[-2px] top-[4256px] w-[1442px]">
        <div className="flex-none scale-y-[-100%]">
          <div className="h-[961px] relative w-[1442px]" data-name="Untitled_Artwork 136 2">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledArtwork1361} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents leading-[normal] left-[839px] text-[#ff5416] text-nowrap top-[4929px] whitespace-pre">
      <p className="absolute font-bold left-[1126px] text-[20px] top-[4929px]" style={{ fontFamily: 'Fira Code' }}>Sources</p>
      <div className="absolute font-normal left-[1126px] text-[18px] top-[4990px]" style={{ fontFamily: 'Fira Code' }}>
        <motion.p
          className="mb-0 cursor-pointer"
          whileHover={{ scale: 1.05, color: "#ff8b16" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <a href="https://steamdb.info/charts/?sort=peak" target="_blank" rel="noopener noreferrer" className="no-underline">
            SteamDB
          </a>
        </motion.p>
        <p className="mb-0">&nbsp;</p>
        <motion.p
          className="mb-0 cursor-pointer"
          whileHover={{ scale: 1.05, color: "#ff8b16" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <a href="https://developers.google.com/youtube/v3" target="_blank" rel="noopener noreferrer" className="no-underline">
            YouTube API
          </a>
        </motion.p>
        <p className="mb-0">&nbsp;</p>
        <motion.p
          className="mb-0 cursor-pointer"
          whileHover={{ scale: 1.05, color: "#ff8b16" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <a href="https://dev.twitch.tv/docs/api/" target="_blank" rel="noopener noreferrer" className="no-underline">
            Twitch API
          </a>
        </motion.p>
        <p className="mb-0">&nbsp;</p>
        <motion.p
          className="mb-0 cursor-pointer"
          whileHover={{ scale: 1.05, color: "#ff8b16" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <a href="https://steamcommunity.com/dev" target="_blank" rel="noopener noreferrer" className="no-underline">
            Steam API
          </a>
        </motion.p>
        <p className="mb-0">&nbsp;</p>
        <motion.p
          className="mb-0 cursor-pointer"
          whileHover={{ scale: 1.05, color: "#ff8b16" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <a href="https://app.sensortower.com/vgi/" target="_blank" rel="noopener noreferrer" className="no-underline">
            Video Game Insights
          </a>
        </motion.p>
        <p className="mb-0">&nbsp;</p>
        <motion.p
          className="cursor-pointer"
          whileHover={{ scale: 1.05, color: "#ff8b16" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <a href="https://twitchtracker.com/" target="_blank" rel="noopener noreferrer" className="no-underline">
            TwitchTracker
          </a>
        </motion.p>
      </div>
      <div className="absolute font-normal left-[839px] text-[18px] top-[4990px]" style={{ fontFamily: 'Fira Code' }}>
        <motion.p
          className="mb-0 cursor-pointer"
          whileHover={{ scale: 1.05, color: "#ff8b16" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <a href="https://www.twitch.tv/" target="_blank" rel="noopener noreferrer" className="no-underline">
            Twitch
          </a>
        </motion.p>
        <p className="mb-0">&nbsp;</p>
        <motion.p
          className="mb-0 cursor-pointer"
          whileHover={{ scale: 1.05, color: "#ff8b16" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="no-underline">
            YouTube
          </a>
        </motion.p>
        <p className="mb-0">&nbsp;</p>
        <motion.p
          className="cursor-pointer"
          whileHover={{ scale: 1.05, color: "#ff8b16" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <a href="https://store.steampowered.com/" target="_blank" rel="noopener noreferrer" className="no-underline">
            Steam
          </a>
        </motion.p>
      </div>
      <p className="absolute font-bold left-[839px] text-[20px] top-[4929px]" style={{ fontFamily: 'Fira Code' }}>Data</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[-266px] top-[4636px]">
      <motion.div
        className="absolute left-[-266px] opacity-60 size-[1051px] top-[4636px]"
        data-name="Untitled_Artwork 137 1"
        whileHover={{ rotate: -5, scale: 1.05 }}
        transition={{ duration: 0.5 }}
      >
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledArtwork1371} />
      </motion.div>
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute contents left-[-266px] top-[4256px]" data-name="Footer">
      <BottomBg />
      <Group4 />
      <Group3 />
    </div>
  );
}

function YouTubeIcon() {
  return (
    <div className="absolute contents left-[636px] top-[3083px]" data-name="YouTube Icon">
      <div className="absolute h-[257px] left-[830px] top-[3277px] w-[363px]" data-name="Untitled_Artwork 142 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[231.48%] left-[-30.83%] max-w-none top-[-72.99%] w-[164.29%]" src={imgUntitledArtwork1421} />
        </div>
      </div>
      <motion.div
        className="absolute left-[636px] size-[393px] top-[3083px]"
        data-name="Untitled_Artwork 143 1"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledArtwork1431} />
      </motion.div>
      <div className="absolute flex items-center justify-center left-[1001px] size-[393px] top-[3336px]">
        <motion.div
          className="flex-none rotate-[180deg]"
          whileHover={{ scale: 1.05, rotate: 190 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative size-[393px]" data-name="Untitled_Artwork 144 1">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledArtwork1441} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Frame() {
  return <div className="absolute left-[308px] size-[100px] top-[860px]" />;
}

function TwitchIcon() {
  return (
    <div className="absolute contents left-[-128px] top-[3552px]" data-name="Twitch Icon">
      <motion.div
        className="absolute left-[101px] size-[572px] top-[3707px]"
        data-name="Untitled_Artwork 147 1"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledArtwork1471} />
      </motion.div>
      <motion.div
        className="absolute left-[-128px] size-[656px] top-[3552px]"
        data-name="Untitled_Artwork 148 1"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledArtwork1481} />
      </motion.div>
      <motion.div
        className="absolute left-[387px] size-[444px] top-[3916px]"
        data-name="Untitled_Artwork 149 1"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledArtwork1491} />
      </motion.div>
    </div>
  );
}

export function Home() {
  return (
    <div className="bg-gray-50 min-h-screen w-full flex justify-center overflow-x-hidden p-8" data-name="Home">
      <div 
        className="bg-white relative w-full max-w-[1440px] h-[5341px] overflow-hidden shadow-xl"
        style={{ border: '1px solid #101545' }}
      >
        <TopBg />
        <p className="absolute h-[120px] leading-[normal] left-[701px] not-italic text-[#101545] text-[80px] text-right top-[2186px] translate-x-[-100%] w-[734px]" style={{ fontFamily: 'Days One' }}>Assumptions</p>
        <p className="absolute font-normal h-[167px] leading-[normal] left-[720px] text-[20px] text-white top-[431px] w-[616px]" style={{ fontFamily: 'Fira Code' }}>{`This project quantifies how social-media attention tracks and predicts video-game popularity. We combine YouTube/Twitch/Reddit viewing signals (hours watched, average concurrent viewers) with Steam engagement signals (concurrent players, review velocity) to build a cross-platform, time-aligned panel. `}</p>
        <LearnMoreButton />
        <p className="absolute font-bold leading-[normal] left-[850px] text-[25px] text-black text-nowrap top-[3904px] whitespace-pre" style={{ fontFamily: 'Fira Code' }}>Twitch Game Trends</p>
        <Title />
        <NavBar />
        <div className="absolute h-0 left-[720px] top-[378px] w-[224px]">
          <div className="absolute bottom-0 left-0 right-0 top-[-3px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 224 3">
              <line id="Line 1" stroke="var(--stroke-0, #FF5416)" strokeWidth="3" x2="224" y1="1.5" y2="1.5" />
            </svg>
          </div>
        </div>
        <div className="absolute h-0 left-[140px] top-[2306px] w-[224px]">
          <div className="absolute bottom-0 left-0 right-0 top-[-2px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 224 2">
              <line id="Line 2" stroke="var(--stroke-0, #101545)" strokeWidth="2" x2="224" y1="1" y2="1" />
            </svg>
          </div>
        </div>
        <OurPurpose />
        <Group2 />
        <Footer />
        <Group1 className="absolute left-[-70px] size-[932px] top-[2381px]" />
        <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0)] h-[630px] left-[-16px] to-[#ffffff] to-[19.712%] top-[2683px] w-[864px]" />
        <div className="absolute left-[131px] size-[530px] top-[2571px]" data-name="Untitled_Artwork 140 1">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledArtwork1401} />
        </div>
        <p className="absolute font-bold leading-[normal] left-[850px] text-[#101545] text-[25px] text-nowrap top-[2642px] whitespace-pre" style={{ fontFamily: 'Fira Code' }}>Steam Game Genres Data</p>
        <YouTubeIcon />
        <Frame />
        <TwitchIcon />
        <p className="absolute font-normal h-[167px] leading-[normal] left-[850px] text-[#101545] text-[18px] top-[2709px] w-[442px]" style={{ fontFamily: 'Fira Code' }}>We collect Steam data from the Steam Open API, SteamDB, and VGI to build a detailed picture of how each game performs on PC. For every title, we track monthly peak concurrent users, daily active users, new registrations, average session duration, in-game purchase volume, genre tags, and estimated revenue. Together, these metrics let us analyze not just how many people play a game, but how often they come back, how long they stay, how much they spend, and how that differs across genres and over time.</p>
        <p className="absolute font-bold leading-[normal] left-[140px] text-[#101545] text-[25px] text-nowrap top-[3277px] whitespace-pre" style={{ fontFamily: 'Fira Code' }}>YouTube Game Trends</p>
        <p className="absolute font-normal h-[167px] leading-[normal] left-[131px] text-[#101545] text-[18px] top-[3340px] w-[442px]" style={{ fontFamily: 'Fira Code' }}>From YouTube, we collect hours watched, peak viewers, average viewers, and airtime hours for individual games, and use these metrics to compare YouTube viewing trends with how the same games perform on Steam.</p>
        <p className="absolute font-normal h-[167px] leading-[normal] left-[848px] text-[#101545] text-[18px] top-[3967px] w-[442px]" style={{ fontFamily: 'Fira Code' }}>Using Twitch Tracker and VGI we collect the social media mentions, stream viewership, current viewers for each game, and influencer endorsements.</p>
      </div>
    </div>
  );
}
