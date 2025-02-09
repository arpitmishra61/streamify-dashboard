export const config = {
  apiBaseUrl: process.env.NODE_ENV === 'production'
    ? 'https://streamify-backend-2nzg.onrender.com' // This will be your deployed JSON server URL
    : 'http://localhost:3001'
}; 