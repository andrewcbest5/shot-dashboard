# NBA Shot Profile Dashboard

## Andrew Best

## Overview


I created a view that is a shot chart, showing makes and misses filterable by player, shot type, contest level, and whether it was a catch and shoot. There are also some summary statistics: FG%, 3PT%, and eFG%. 

For example, if a coach felt like player A was taking too many stepback jump shots, they could add those filters and find that player A is shooting only 30.6% on stepbacks (most of them highly contested). From the shot chart, they could see that player A has had some success on step backs from the corners, but not so much from the wings and the top of the key.  

# Running locally

### Prerequisites

- Node.js 20 or later
- npm

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/andrewcbest5/shot-dashboard.git
cd shot-dashboard
npm install
```

### Start the Development Server

Run the application:

```bash
npm start
```

Navigate to:

```
http://localhost:4200
```



# Tech Stack

- **Angular 18+** with standalone components (no NgModules)
- **Signals** for state management.
- **D3** for the shot chart (court + scatter) 
- **Build-time CSV → JSON conversion** in place of runtime CSV parsing — the dataset is static, so parsing happens once at build time, trading a small amount of build complexity for zero client-side parsing cost and stronger typing
- Plain TypeScript interfaces for the data model; no backend — the pre-parsed JSON functions as the "API"

# State Management
 
- `ShotDataService` loads the parsed shot dataset once at app init and exposes it as a signal.
- `FilterStateService` holds a single `FilterCriteria` object (player, shot type, contest level, catch-and-shoot only) as one signal, rather than a separate signal per filter
- A single `computed()` applies all active filters in one pass over the shot array; the chart and summary stats (FG%, 3PT%, eFG%) both derive from that same filtered signal, so they never fall out of sync with each other.
- The chart component stays presentational — it reads the filtered signal and renders; it never mutates state directly except through the filter service's setters.

# Error Handling
 
- The data load step is wrapped in a try/catch, gating the UI behind a `loadError` signal with a fallback state if the JSON fails to load.
- A lightweight shape check runs when the data loads, so a malformed or missing field surfaces as a visible error rather than silently propagating into the FG%/eFG% calculations as `NaN`.

# Assumptions

- All the data is clean and accurate
- All 12 players are on the same team
- The dataset is static


# Tradeoffs 

- I handled state management with Signals instead of NgRx. With the datasize and app complexity, NgRx is overkill. 
- I am aggregating the data on the client-side. At this scale, this does not cause any performance issues. 
- I chose to use x's and o's for makes and misses instead of a hex heat map because I felt that would be more valuable with the size of the data. With more data, the scatter shot would be busy, and a general heat map would be more insightful. 
- Scoped down to a single, fleshed-out view due to time constraints


# Future Improvements

- A rigorous table view that shows different stats and metrics by player in a leaderboard style. 
- A view where you can compare two different players, or a player and the team average. 
- The ability to export charts
- Add a hex-bin player efficency view
- Create a ML model that calculates shot quality (expected points on a shot). See who is taking good/bad shots and where bad shots are happening. 
- The ability to switch between dark mode and light mode

# Scaling Considerations

If the dataset became much larger:

- Move aggregations to a backend service.
- Cache expensive computations.
- Load data incrementally.
- Use a database instead of static CSV files.
- Add API endpoints for filtered queries.
- Use NgRx for state management



