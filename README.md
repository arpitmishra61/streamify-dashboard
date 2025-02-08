# Streamify Dashboard

A modern analytics dashboard for a fictional music streaming service, built with React, TypeScript, and Chakra UI.

## Features

- **Key Metrics Display**: View important statistics including total users, active users, total streams, revenue, and top artist
- **Interactive Charts**:
  - User Growth Trends (Line Chart)
  - Revenue Distribution (Pie Chart)
  - Top Streamed Songs (Bar Chart)
- **Detailed Streams Table**:
  - Sortable columns
  - Search functionality
  - Responsive design
- **Dark/Light Mode Support**
- **Responsive Layout**

## Tech Stack

- React 18
- TypeScript
- Vite
- Chakra UI
- Recharts
- date-fns

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/streamify-dashboard.git
cd streamify-dashboard
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
streamify-dashboard/
├── src/
│   ├── components/
│   │   ├── charts/
│   │   │   ├── UserGrowthChart.tsx
│   │   │   ├── RevenueDistribution.tsx
│   │   │   └── TopSongs.tsx
│   │   ├── KeyMetrics.tsx
│   │   └── StreamsTable.tsx
│   ├── services/
│   │   └── mockData.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
└── package.json
```

## Features in Detail

### Key Metrics

- Total Users: Shows the total number of registered users
- Active Users: Users who have streamed at least one song in the last 30 days
- Total Streams: Aggregate number of song plays
- Revenue: Total revenue from subscriptions and advertisements
- Top Artist: Most streamed artist in the past 30 days

### Charts

- User Growth Chart: Visualizes the growth of total and active users over time
- Revenue Distribution: Breaks down revenue sources in a pie chart
- Top Songs: Shows the most streamed songs in a horizontal bar chart

### Data Table

- Sortable by any column
- Search functionality across song name, artist, and user ID
- Responsive design with horizontal scrolling on mobile devices

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
