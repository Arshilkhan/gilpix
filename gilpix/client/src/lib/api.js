// Thin fetch wrapper. In dev Vite proxies /api to Express; in production Express serves both.
const BASE = import.meta.env.VITE_API_URL || '/api';

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(BASE + path, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options
    });
  } catch {
    const err = new Error('Could not reach the server.');
    err.network = true;
    throw err;
  }
  let body = null;
  try { body = await res.json(); } catch { /* not JSON */ }
  if (!res.ok) {
    const err = new Error((body && body.error) || `Request failed (${res.status})`);
    err.status = res.status;
    err.api = !!(body && body.error); // true only when OUR API answered
    err.fields = body && body.errors;
    throw err;
  }
  if (body === null) {
    // 200 but not JSON: the host is answering /api with a web page, i.e. no API is deployed there.
    const err = new Error('The API returned a web page instead of data.');
    err.network = true;
    throw err;
  }
  return body;
}

export const api = {
  get: (path) => request(path),
  post: (path, data) => request(path, { method: 'POST', body: JSON.stringify(data) })
};
