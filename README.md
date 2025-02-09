# Streamify Dashboard

A modern analytics dashboard for streaming data visualization built with React, TypeScript, and Chakra UI.

## Live Demo

- Frontend: [Streamify Dashboard](https://github.com/arpitmishra61/streamify-dashboard)
- Backend API: [Streamify Backend](https://github.com/arpitmishra61/streamify-backend)
- API Endpoint: [https://streamify-backend-2nzg.onrender.com](https://streamify-backend-2nzg.onrender.com)

## Features

- 📊 Real-time streaming analytics
- 📈 Interactive data visualization with Recharts
- 🎨 Modern UI with Chakra UI
- 📱 Fully responsive design
- 🔄 Dynamic data loading
- 📄 PDF export functionality
- ⚡ Performance optimized with:
  - Code splitting using React.lazy()
  - Intersection Observer for lazy loading components
  - Skeleton loading states

## Performance Optimizations

### Lazy Loading with Intersection Observer

The dashboard implements smart lazy loading using Intersection Observer API for better performance:

```tsx
// LazyLoadWrapper component usage
<LazyLoadWrapper height="600px">
  <Suspense fallback={<LoadingFallback />}>
    <StreamsTable />
  </Suspense>
</LazyLoadWrapper>
```

Key features:

- Components load only when they're about to enter the viewport (1% visibility)
- Preloads content 100px before it becomes visible
- Shows skeleton loading states during component loading
- Automatically cleans up observers when components unmount

### Code Splitting

Components are split into smaller chunks and loaded on demand:

```tsx
// Lazy loaded components
const StreamsTable = lazy(() => import("./components/StreamsTable"));
const TopSongs = lazy(() => import("./components/charts/TopSongs"));
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/arpitmishra61/streamify-dashboard.git
```

2. Install dependencies:

```bash
cd streamify-dashboard
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Start the mock API server (for local development):

```bash
npm run server
```

Note: The production version uses the deployed backend at https://streamify-backend-2nzg.onrender.com

## Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate test coverage report:

```bash
npm run test:coverage
```

## Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Technologies Used

- React 18
- TypeScript
- Chakra UI
- Recharts
- Jest & Testing Library
- Vite
- JSON Server (for mock API)

## Project Structure

```
src/
├── components/         # React components
├── services/          # API and data services
├── tests/             # Test files
├── utils/             # Utility functions
└── App.tsx            # Root component
```

## API Integration

The dashboard connects to a REST API backend:

- Development: Local JSON Server (`http://localhost:3001`)
- Production: Deployed backend at `https://streamify-backend-2nzg.onrender.com`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
