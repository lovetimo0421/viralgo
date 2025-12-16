# Interactive Insights Storyboard - Documentation

## Overview
The Insights page features an interactive walkthrough inspired by the storyboard design in Milestone 3.pdf, with content from the Final Project Build.pdf. Users navigate through 4 levels of gaming analytics insights with an engaging stick-figure journey metaphor.

**URL:** `https://viralgo.space/insights`

---

## Interactive Narratives

### 1. **Level-Based Walkthrough System**

**User Interactions:**
- **Click on Progress Dots:** Users can click on any of the numbered dots (Start, 1, 2, 3, End) in the progress tracker at the bottom of the screen to jump directly to that level
- **Hover on Dots:** When hovering over progress dots, they scale up (1.2x) to provide visual feedback
- **Navigation Buttons:**
  - Click "Next Level →" button to advance forward
  - Click "← Previous Level" button to go back
  - Buttons are disabled and grayed out when at the start/end of the journey

**What Occurs:**
- The entire content area smoothly transitions with a slide animation (fade out left, fade in from right)
- The stick figure character animates along the progress line to the selected level
- The progress bar at the top fills proportionally to show overall completion
- Level title and subtitle animate in with a scaling effect
- Content sections fade in sequentially with staggered timing (0.2s delay between each)

---

### 2. **Animated Stick Figure Journey**

**User Interactions:**
- **Passive Animation:** The stick figure continuously walks in place with animated legs
- **Level Changes:** When user navigates to a different level, the stick figure slides smoothly along the progress line
- **Hover on Figure:** The sword held by the stick figure gently rocks back and forth

**What Occurs:**
- Legs alternate in a walking motion (0.6s cycle time)
- Sword rotates ±10 degrees continuously (1s cycle)
- Position transitions smoothly over 0.5 seconds with easing when levels change
- Visual feedback that the user is "progressing" through the insights

---

### 3. **Interactive Content Sections**

**User Interactions:**
- **Hover over Source Links:** When hovering over blue source URLs, they change color to orange (#ff8b16) and shift 5px to the right
- **Click on Sources:** Opens the referenced website in a new tab
- **Reading Experience:** Each section fades in as the user enters a new level

**What Occurs:**
- Section headings appear in orange gradient (#ff5416)
- Text renders with proper spacing and formatting
- Sources are clickable hyperlinks with hover animations
- Key Conclusions box highlights at the end with orange border and background tint
- Numbered list items in conclusions fade in one by one (0.1s stagger)

---

### 4. **Contextual Background Animations**

**User Interactions:**
- **Passive Visual Effects:** Background icons float automatically based on current level
- **No Direct Interaction:** These are atmospheric elements

**What Occurs:**
- **Level 1 (Genre Analysis):** Wave animation effect appears
- **Level 2 (Revenue):** Money emoji (💰) floats at top-left, diamond emoji (💎) at bottom-right
- **Level 3 (Success):** Play button (▶️) and chat bubble (💬) icons float
- **Level 4 (Gaming Trends):** Like thumb (👍) and chart (📊) emojis animate
- All icons float vertically with rotation (3-4s cycles, ±15-20px movement)

---

## Interactive Visualizations

### 1. **Progress Tracker Visualization**

**Description:** A horizontal timeline showing 4 levels (Start → 1 → 2 → 3 → End) with a traveling stick figure character.

**User Interactions:**
- **Hover on any level dot:** Dot scales up to 1.2x size
- **Click on any dot:** Jump to that level instantly
- **Active level indicator:** Current level has orange border (#ff5416), others are white or semi-transparent

**What Occurs:**
- Progress line fills from left to right proportionally to current level
- Stick figure slides horizontally to match current level position
- Active dot pulses with orange accent
- Animation: 0.5s smooth transition with easeInOut timing

**Technical Details:**
- Component: SVG-based stick figure with animated limbs
- Position: Fixed at bottom of viewport, 80% width, centered
- State: Synced with `currentLevel` state variable

---

### 2. **Top Progress Bar**

**Description:** A slim horizontal bar at the top of the page showing overall completion percentage.

**User Interactions:**
- **Passive Display:** No direct interaction
- **Updates Automatically:** Fills as user progresses through levels

**What Occurs:**
- Bar starts at 0% width
- Fills to 25%, 50%, 75%, 100% as user moves through levels
- Orange gradient fill (#ff5416 → #ff2d10)
- Smooth 0.5s animation when updating

---

### 3. **Content Transition Animations**

**Description:** The main content area with level information that animates on navigation.

**User Interactions:**
- **Triggered by navigation:** Occurs when user clicks Next/Previous or jumps to a level
- **Sequential reveal:** Content sections appear one after another

**What Occurs:**
- **Exit Animation:** Current content fades out and slides 100px to the left
- **Entry Animation:** New content fades in and slides from 100px right to center
- **Duration:** 0.5s for full transition
- **Title Animation:** Level title scales from 0.8x to 1.0x
- **Section Stagger:** Each content section fades in with 0.2s delays
- **Conclusions Stagger:** List items in key conclusions animate with 0.1s delays

---

### 4. **Navigation Button Hover States**

**Description:** Interactive buttons for moving between levels with visual feedback.

**User Interactions:**
- **Hover over enabled button:** Scales to 1.05x and shows orange glow shadow
- **Click/Tap button:** Scales down to 0.95x (tactile press effect)
- **Hover over disabled button:** No effect (grayed out, cursor shows not-allowed)

**What Occurs:**
- Enabled buttons: Orange gradient background, white text
- Disabled buttons: Semi-transparent gray background, reduced opacity (0.3)
- Glow effect: `0 0 20px rgba(255, 84, 22, 0.5)` shadow on hover
- Transition: 0.3s smooth scaling

---

### 5. **Navigation Bar Links**

**Description:** Top navigation with links to Home, Dashboard, and Insights.

**User Interactions:**
- **Hover over nav links:** Text color changes from dark blue (#101545) to orange (#ff5416)
- **Click on link:** Navigates to that page with React Router
- **Scale effect:** Links scale to 1.05x on hover, 0.95x on click

**What Occurs:**
- Smooth color transition (0.2s)
- Underlined text maintains underline while changing color
- Viralgo logo displays gradient text effect
- Navigation is fixed at top of viewport

---

## Summary of Interactive Features

### **When user hovers over elements:**
- Progress dots → Scale up 1.2x
- Source links → Change color to orange, shift right 5px
- Navigation buttons → Scale up 1.05x, show orange glow
- Nav bar links → Change color to orange, scale up 1.05x

### **When user clicks elements:**
- Progress dots → Navigate to that level, animate stick figure, transition content
- Next/Previous buttons → Move one level forward/back, animate all components
- Source links → Open URL in new tab
- Nav bar links → Navigate to different page

### **Passive animations (always running):**
- Stick figure legs walking in place
- Stick figure sword rocking
- Background emoji icons floating
- Progress bar filling proportionally

---

## Technical Implementation

**Framework:** React with TypeScript
**Animation Library:** Framer Motion
**Routing:** React Router
**Styling:** Inline styles with CSS-in-JS
**Fonts:**
- Days One (headings)
- Fira Code (body text, monospace)
- Pathway Extreme (navigation)

**File Location:** `/src/components/insights/InsightsPage.tsx`

**State Management:**
- `currentLevel`: Tracks which level (0-3) user is viewing
- `isAnimating`: Prevents rapid clicking during transitions
- `progress`: Percentage for top progress bar (0-100)

**Route:** `/insights` configured in App.tsx

---

## Content Structure

Each of the 4 levels contains:
1. **Title** (e.g., "Level 1")
2. **Subtitle** (e.g., "Genre Analysis")
3. **Content Sections** with:
   - Heading
   - Explanatory text
   - Optional source citations
4. **Key Conclusions** (numbered list of takeaways)

This structure follows the Final Project Build.pdf specifications for presenting Steam gaming analytics insights.
