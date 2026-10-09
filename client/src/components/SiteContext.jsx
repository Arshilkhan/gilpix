import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../lib/api';
import { DEFAULT_SITE } from '../lib/config';

const Ctx = createContext(DEFAULT_SITE);
export const useSite = () => useContext(Ctx);

export function SiteProvider({ children }) {
  const [site, setSite] = useState(DEFAULT_SITE);
  useEffect(() => {
    api.get('/site').then((s) => setSite({ ...DEFAULT_SITE, ...s })).catch(() => { /* defaults are fine */ });
  }, []);
  return <Ctx.Provider value={site}>{children}</Ctx.Provider>;
}
