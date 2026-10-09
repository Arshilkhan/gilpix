import { useEffect, useRef, useState } from 'react';

// One-shot reveal. Pass skip=true to start visible (e.g. hero imagery).
export function useInView(skip = false) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(skip);
  useEffect(() => {
    if (seen) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return [ref, seen];
}
