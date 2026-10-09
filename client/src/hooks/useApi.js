import { useEffect, useState } from 'react';
import { api } from '../lib/api';

const cache = new Map(); // keeps back/forward navigation instant

export function useApi(path) {
  const [state, setState] = useState(() =>
    cache.has(path) ? { data: cache.get(path), error: null, loading: false } : { data: null, error: null, loading: true }
  );

  useEffect(() => {
    let off = false;
    if (cache.has(path)) { setState({ data: cache.get(path), error: null, loading: false }); return; }
    setState({ data: null, error: null, loading: true });
    api.get(path)
      .then((data) => { cache.set(path, data); if (!off) setState({ data, error: null, loading: false }); })
      .catch((error) => { if (!off) setState({ data: null, error, loading: false }); });
    return () => { off = true; };
  }, [path]);

  return state;
}
