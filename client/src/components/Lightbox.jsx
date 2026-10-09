import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const Ctx = createContext(() => {});
export const useLightbox = () => useContext(Ctx);

export function LightboxProvider({ children }) {
  const [src, setSrc] = useState(null);
  const open = useCallback((s) => setSrc(s), []);
  const close = useCallback(() => setSrc(null), []);

  useEffect(() => {
    if (!src) return;
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [src, close]);

  return (
    <Ctx.Provider value={open}>
      {children}
      <div className={`lb ${src ? 'on' : ''}`} role="dialog" aria-modal="true" aria-label="Photograph" aria-hidden={!src} onClick={close}>
        <button className="x" onClick={close}>Close</button>
        {src && <img src={src} alt="" onClick={(e) => e.stopPropagation()} />}
      </div>
    </Ctx.Provider>
  );
}
