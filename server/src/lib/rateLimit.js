// Tiny in-memory limiter. Fine for a prototype; swap for a shared store when the API goes live.
export function rateLimit({ windowMs = 10 * 60 * 1000, max = 8 } = {}) {
  const hits = new Map();
  return (req, res, next) => {
    const now = Date.now();
    const key = req.ip;
    const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
    if (recent.length >= max) {
      res.set('Retry-After', String(Math.ceil(windowMs / 1000)));
      return res.status(429).json({ error: 'Too many enquiries from this connection. Please try again later.' });
    }
    recent.push(now);
    hits.set(key, recent);
    next();
  };
}
