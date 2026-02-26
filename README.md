# Game Analytics Dashboard

A mini dashboard for game analytics that displays real-time data and allows basic CRUD operations. Built with NestJS + React + TypeScript.

![Dashboard Overview](screenshots/dashboard.png)

## Prerequisites

- **Node.js** >= 18
- **npm** >= 9
- **Docker** (optional, for containerized deployment)

## Quick Start

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Server runs at `http://localhost:3001`

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

App runs at `http://localhost:5173`

### Docker (Backend)

```bash
cd backend
make docker-up        # Build and start backend container
make docker-down      # Stop container
make docker-logs      # Follow logs
```

### Makefile (Backend)

```bash
cd backend
make help             # Show all available commands
make dev              # Start dev server
make build            # Compile TypeScript
make typecheck        # Type-check
make docker-up        # Docker Compose up
make clean            # Remove dist/ and node_modules/
```

## Features

- **Dashboard** — Summary cards, revenue chart, data table
- **Filtering** — Filter by game name, platform, genre, date range
- **Add Entry** — Form with full validation
- **Dark/Light Mode** — Toggle with localStorage persistence
- **Real-time Polling** — Auto-refreshes every 5s when new data is added
- **Export** — Download analytics data as CSV or JSON
- **Responsive** — Works on desktop and mobile

## API Endpoints

### `GET /analytics`

Fetch analytics data with optional filters.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|--------|-------------------------------|
| gameName | string | Filter by game name (partial match) |
| platform | string | Filter by platform: `PC`, `Mobile`, `Console` |
| genre | string | Filter by genre (partial match) |
| startDate | string | Filter entries from date (YYYY-MM-DD) |
| endDate | string | Filter entries until date (YYYY-MM-DD) |

**Example:** `GET /analytics?platform=PC&genre=RPG`

### `POST /analytics`

Create a new analytics entry.

**Request Body:**
```json
{
  "gameName": "Cyber Legends",
  "platform": "PC",
  "genre": "RPG",
  "dailyActivePlayers": 45200,
  "revenue": 128500,
  "date": "2025-01-15"
}
```

**Validation (class-validator):**
- `gameName`: required, non-empty string
- `platform`: must be `PC`, `Mobile`, or `Console`
- `genre`: required, non-empty string
- `dailyActivePlayers`: required, non-negative number
- `revenue`: required, non-negative number
- `date`: required, YYYY-MM-DD format

### `GET /analytics/summary`

Returns aggregated statistics.

**Response:**
```json
{
  "totalEntries": 10,
  "totalRevenue": 1215800,
  "totalPlayers": 738600,
  "averageRevenue": 121580,
  "averagePlayers": 73860,
  "topGame": "Galaxy Wars",
  "platformBreakdown": { "PC": 4, "Mobile": 4, "Console": 2 }
}
```

### `GET /analytics/poll?since=<timestamp>`

Returns entries created after the given Unix timestamp (ms).

**Response:**
```json
{
  "entries": [],
  "timestamp": 1706745600000
}
```

### `GET /analytics/export?format=csv|json`

Downloads all analytics data as a file.

- `format=csv` — returns CSV with Content-Disposition header
- `format=json` — returns JSON with Content-Disposition header

### `GET /health`

Health check endpoint. Returns `{ "status": "ok" }`.

## Tech Stack

- **Backend:** NestJS + TypeScript (class-validator DTOs)
- **Frontend:** React + Vite + TypeScript
- **Charts:** Recharts
- **Storage:** In-memory (no database needed)

## Project Structure

```
game-analytics-dashboard/
├── backend/
│   ├── src/
│   │   ├── main.ts                         # NestJS bootstrap
│   │   ├── app.module.ts                   # Root module
│   │   ├── health/
│   │   │   └── health.controller.ts        # Health check
│   │   └── analytics/
│   │       ├── analytics.module.ts
│   │       ├── controller/
│   │       │   └── analytics.controller.ts # Route handlers
│   │       ├── service/
│   │       │   └── analytics.service.ts    # Business logic + store
│   │       ├── dto/                        # Validation DTOs
│   │       │   ├── index.ts               # Barrel re-exports
│   │       │   ├── create-analytics.dto.ts
│   │       │   ├── filter-analytics.dto.ts
│   │       │   ├── poll-analytics.dto.ts
│   │       │   └── export-analytics.dto.ts
│   │       └── entities/
│   │           └── analytics.entity.ts     # Types & interfaces
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── App.tsx                         # Main dashboard layout
│   │   ├── types.ts                        # Shared types
│   │   ├── hooks/
│   │   │   ├── useAnalytics.ts             # API hook + polling
│   │   │   └── useTheme.ts                 # Dark/light mode
│   │   └── components/
│   │       ├── SummaryCards.tsx
│   │       ├── AnalyticsTable.tsx
│   │       ├── FilterBar.tsx
│   │       ├── AddEntryForm.tsx
│   │       ├── RevenueChart.tsx
│   │       ├── ThemeToggle.tsx
│   │       └── ExportButtons.tsx
│   ├── Dockerfile
│   ├── package.json
│   └── index.html
├── docker-compose.yml
├── CLAUDE.md
├── PROCESS.md
└── README.md
```
