// Vercel serverless entry: the whole Express API runs as one function.
// vercel.json rewrites /api/* here; Express then routes using the original URL.
import { createApp } from '../server/src/app.js';

export default createApp();
