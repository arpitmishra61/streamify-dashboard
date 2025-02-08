export const config = {
  apiBaseUrl: process.env.NODE_ENV === 'production'
    ? 'https://your-api-url.onrender.com' // This will be your deployed JSON server URL
    : 'http://localhost:3001'
}; 