# AFCON 2025 Dashboard

## ⚽ Project Description
The AFCON 2025 Dashboard is an interactive analytics platform built using React. It provides comprehensive insights into the Africa Cup of Nations 2025 tournament, covering team performance, player statistics, venue analysis, and overall tournament progress. The dashboard is designed to be visually appealing, highly responsive, and user-friendly, offering fans and analysts a dynamic way to explore tournament data.

## 🚀 Live Demo
[AFCON 2025 Dashboard Live Demo](https://your-live-demo-link.com) (Please replace with actual link when deployed)

## 📸 Screenshots
<!-- Add screenshots here to showcase the dashboard's design and features -->
![Dashboard Screenshot 1](public/screenshots/screenshot1.png)
![Dashboard Screenshot 2](public/screenshots/screenshot2.png)
*(Placeholders - replace with actual screenshots)*

## ✨ Features
*   **Tournament Overview:** High-level key performance indicators (KPIs) including total matches, completed matches, total goals, average goals per match, and overall tournament progress.
*   **Group Standings:** Real-time group standings tables with team logos and performance metrics.
*   **Goals Trend Chart:** Visual representation of cumulative goals scored throughout the tournament.
*   **Team Performance Analysis:** Detailed pages for each team showcasing their match history, goals for/against, and win/loss/draw distribution.
*   **Venue Analysis:** Insights into match distribution, attendance, and goal-scoring trends across different tournament venues.
*   **Player Statistics (Planned):** Future integration for top scorers, assists, and other individual player metrics.
*   **Interactive Filters:** Filter data by tournament stage, date range, teams, and venues for granular analysis.
*   **Responsive Design:** Optimized for seamless viewing and interaction across various devices (mobile, tablet, desktop).
*   **Branded UI:** Adherence to a custom design system with official AFCON 2025 brand colors and typography.
*   **Animations & Micro-interactions:** Subtle animations and hover effects using Framer Motion for an enhanced user experience.

## 🛠️ Tech Stack
*   **Framework:** React 18+ with Hooks
*   **State Management:** React Context API (TournamentContext, FilterContext, StatisticsContext)
*   **Routing:** React Router v6
*   **Data Visualization:** Recharts
*   **Styling:** Tailwind CSS
*   **Build Tool:** Vite
*   **Animations:** Framer Motion

## ⚙️ Installation
To get a local copy up and running, follow these simple steps.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/afcon-2025-dashboard.git
    cd afcon-2025-dashboard
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Ensure font files are available:**
    Place `DunbarLow.woff2` and `DunbarText.woff2` (and any other custom fonts) into the `public/fonts/` directory.

## 🏃 How to Run Locally

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

2.  **Build for production (optional):**
    ```bash
    npm run build
    ```
    This will create an optimized production build in the `dist/` directory.

3.  **Serve the production build locally (optional):**
    First, install `serve` globally if you haven't already:
    ```bash
    npm install -g serve
    ```
    Then, serve the build:
    ```bash
    serve -s dist
    ```
    The production build will be accessible at `http://localhost:3000` (or another available port).

## 📊 Data Sources
All tournament data is provided as static JSON files located in the `/public/data/` directory.
*   `Teams.json`: Information about participating teams.
*   `Fixtures.json`: Match schedules and results.
*   `Players.json`: Player rosters.
*   `Venues.json`: Details about tournament venues.
*   `Tournament_Stages.json`: Definition of tournament stages (Group Stage, Knockouts, etc.).
*   `Tournament_Summary.json`: Overall tournament metadata.

## 📁 Project Structure
```
afcon-dashboard/
├── public/
│   ├── data/                 # JSON data files
│   └── logos/                # Team logos and other visual assets
│   └── fonts/                # Custom font files (Dunbar Low, Dunbar Text)
├── src/
│   ├── contexts/             # React Contexts for state management
│   │   ├── TournamentContext.jsx
│   │   ├── FilterContext.jsx
│   │   └── StatisticsContext.jsx
│   ├── components/           # Reusable UI components
│   │   ├── common/           # Generic components (buttons, cards, logos)
│   │   ├── charts/           # Recharts components
│   │   ├── filters/          # Filter UI components
│   │   └── layout/           # Layout components (Header, Sidebar, HeroSection)
│   ├── pages/                # Main application pages
│   │   ├── TournamentOverview.jsx
│   │   ├── TeamPerformance.jsx
│   │   ├── VenueAnalysis.jsx
│   │   └── PlayerStats.jsx
│   ├── hooks/                # Custom React hooks (e.g., useBreakpoint)
│   ├── utils/                # Utility functions (e.g., patternHelpers)
│   └── App.jsx               # Main application component and routing
│   └── main.jsx              # Entry point for React application
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.js            # Vite build configuration
└── package.json              # Project dependencies and scripts
```

## 🔮 Future Enhancements
*   **Player Statistics Module:** Implement detailed player statistics including top scorers, assists, cards, etc.
*   **Real-time Data Updates:** Integrate with a live API for real-time score and statistic updates.
*   **Advanced Filtering:** More sophisticated filtering options (e.g., filter by group, specific player search).
*   **Accessibility Improvements:** Enhance keyboard navigation and screen reader support.
*   **Unit and Integration Tests:** Add comprehensive tests to ensure code quality and prevent regressions.
*   **Deployment Automation:** Set up CI/CD pipelines for automated deployment.
*   **Theming Options:** Allow users to switch between light and dark modes (already set up in `tailwind.config.js`).

## 📄 License
This project is licensed under the MIT License. See the `LICENSE` file for more details. (Please create a `LICENSE` file if not already present).

## 📧 Contact
*   **Your Name/Alias:** [Your Name or GitHub Alias]
*   **LinkedIn:** [Your LinkedIn Profile URL]
*   **GitHub:** [Your GitHub Profile URL]

---
_This README was generated automatically based on project context and branding guidelines._