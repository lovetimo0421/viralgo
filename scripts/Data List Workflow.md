CSV 1(Steam Peak Loads by year): Game Name, Game Genre Tags, This Year’s Peak Load(Each year has it own excel from 2010-2025)

CSV 2 (Recent Gaming Trend-no game name for this csv): Release Date, Platform, DAU, New Registrations, Session Duration, In Game Purchases($), Social Media Mentions, Stream Viewership, Revenue, Top Genre

CSV 3 (Popular Video Games 1980-2023): Game Name, Release Date, Ratings, Game Genre Tags, Plays

CSV 4 (Game Genre Avg Revenue Ranking): Genre, Average Revenue

CSV 5 (Game Genre Units Sold Ranking): Genre, Average Units Sold

CSV 6 (Numbers of Games Released each month from 2017 Jan to 25 Oct): Month, All release

History of Popularity (1980–2025) – what became big, when

Genre Economics – which genres actually make money / sell units

Steam & PC Era – peak loads, saturation, over-supply

Hype vs Staying Power – DAU, mentions, viewership, purchases

Shared Controls:

Time range slider (1980–2025)

Genre filter (dropdown, multi-select chips)

Platform filter (PC / console / mobile / all)

Metric toggle (DAU / revenue / mentions / viewers / etc.)

Top N slider (top 10 / 50 / 100 games)

1. **History of Popularity (CSV 3 \+ CSV 6\)**

**1.1 “Timeline of Hit Games”**  
Data: CSV 3 (Game Name, Release Date, Plays, Ratings)

Chart:  
X-axis: Release year  
Y-axis: Plays (or log(Plays))  
Dot \= one game, size \= rating, color \= genre

Interaction:  
Hover to see game name \+ quick stats  
Genre filter chips  
Slider to show only top X% of games by plays (“show only hits”)

Story: How the density and intensity of hits changed from 1980 to 2023\.

**1.2 “Release Flood vs Signal” Timeline**

Data: CSV 6 (Month, All release) \+ CSV 3 (Plays)

Chart 1: Line or area chart  
X-axis: month (2017–2025)  
Y-axis: \# games released (CSV 6\)

Chart 2: Overlaid line of sum of Plays for games released that month (from CSV 3, subset 2017+)

Interaction:  
Brushing a time window on Chart 1 filters the “Hit Games” scatterplot (1.1).  
Toggle: “Show moving average” vs raw data to smooth noise.

Story: Does a flood of releases dilute attention, or do hits still emerge?

2. **Genre Economics Dashboard (CSV 4 \+ CSV 5 \+ CSV 3\)**

**2.1 “Genre Revenue vs Units Sold”**

Data: CSV 4 & CSV 5

Chart: Scatter plot  
X-axis: Average Units Sold (CSV 5\)  
Y-axis: Average Revenue (CSV 4\)  
Each point \= genre

(Maybe?) Size or opacity from CSV 3: \# of games in that genre.

Interaction:  
Hover shows: “Genre: X – Avg Revenue: $Y – Avg Units: Z – \#Games: N”  
Toggle “Show top genres only” to declutter.  
Story:  
Genres that sell a lot but are low-revenue (maybe low price point / casual).  
Genres with high revenue but fewer units (premium or live-service style).

**2.2 “Genre Ranking Bump Chart Over Time”**

Data: CSV 3 \+ CSV 4/5 ( aggregate by year & genre)

Chart: Bump chart (rank vs year)  
X-axis: year  
Y-axis: rank (1 \= top genre by revenue or by plays)  
Each line \= genre

Interaction:  
Toggle between Ranking by Plays vs Ranking by Revenue.  
Hover to highlight a single genre’s trajectory from 1980–2023.

Story:  
Games like MMO has less units sold but has a very high avg rev

**3\. Steam & PC Era – Peak Loads / Over-Saturation (CSV 1 \+ CSV 6 \+ CSV 3\)**

**3.1 “Steam Peak Load Race”**

Data: CSV 1 (per-year files merged into one long table)

Chart:  
Dropdown to select a game → line chart of its peak load from 2010–2025  
Dropdown to select a genre  →  line chart of its peak load from 2010–2025

Or show top N games as multiple lines.

Interaction:

Dropdown: “Game Name”

Toggle: “Show only this game” vs “Compare with top 5 in same genre”. (should we?)

Story: How a game’s peak player base grows, peaks, and declines.

**3.2 “Yearly Top 10 Steam Games – Rank Flow”**

Data: CSV 1

For each year: find top 10 games by peak load.

Chart: Alluvial / Sankey / parallel bands

Left side: Year 2015 top 10

Next column: 2016 top 10

Bands represent games moving between ranks or dropping out.

Interaction:

Hover on a game to highlight its path through years.

Toggle to color bands by genre (from CSV 1 or joined from CSV 3).

Story:

Which games stay in the top for years versus one-hit wonders.

**4\. Hype vs Staying Power – Social Media & In-Game Behavior (CSV 2\)**

Popularity correlation on social media.

CSV 2 has: Release Date, Platform, DAU, New Registrations, Session Duration, In Game Purchases, Social Media Mentions, Stream Viewership, Revenue, Top Genre.

**4.1 “Social Media vs DAU”**

Data: CSV 2

Chart: Scatter plot

X-axis: Social Media Mentions

Y-axis: DAU

Point color: Platform

Point shape or border: Top Genre

Interaction:

Toggle X-axis between Social Media Mentions and Stream Viewership.

Brushing a rectangle selects a cluster and filters other charts (like revenue).

Story:

Are high DAU games always noisy on social media?

Are there “quiet giants” (high DAU, low mentions)?

**4.2 “Revenue Funnel vs Hype”**

Data: CSV 2

DAU → Purchases → Revenue vs Mentions/Viewership.

Chart 1 (line or bar by date):

X-axis: Release Date or time bucket

Y-axis: DAU, overlaid with Stream Viewership

Toggle metrics using buttons (DAU / New Registrations / Mentions / Viewership).

Chart 2 (scatter):

X-axis: Social Media Mentions

Y-axis: In-Game Purchases or Revenue

Size: DAU or Session Duration.

Story:

Some games convert hype into money efficiently.

Identify genres/platforms that monetize better per unit of attention.

**4.3 Correlation Heatmap: “What Really Moves Together?”**

Data: CSV 2

Variables: DAU, New Registrations, Session Duration, In Game Purchases, Social Media Mentions, Stream Viewership, Revenue.

Chart: Correlation matrix heatmap

Rows/columns \= metrics

Cell color \= correlation coefficient (e.g. \-1 to 1).

Interaction:

Filter by Genre / Platform: recompute correlation on the fly.  
(e.g. “show correlations only for mobile gacha games”)

Story:

Maybe Stream Viewership correlates more strongly with New Registrations than with Revenue.

Maybe Session Duration predicts Revenue better in some genres.

**5\. Combined “Game Profile” View (CSV 1 \+ 2 \+ 3\)**

**5.1 Game / Genre Drill-Down Panel**

When a user clicks on:

A game dot (from scatter/time charts), or

A genre card

Show a side panel with:

From CSV 3:

Release Date

Rating

Total Plays

From CSV 1 (if game is on Steam):

Graph of Peak Load by Year

From CSV 2 (if aggregated by genre/platform/time):

Average DAU

Social Mentions & Viewership trend

Revenue trend

Story:

A mini biography of how a game/genre rose, peaked, and monetized.