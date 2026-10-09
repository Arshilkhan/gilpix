import { useEffect, useRef } from 'react';
import Photo from './Photo';

// Full-viewport photographic opener with a subtle parallax drift.
export default function Hero({ photo, scrollLabel = 'Scroll', children }) {
  const media = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let busy = false;
    const tick = () => {
      if (busy) return;
      busy = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (media.current && y < window.innerHeight * 1.2) media.current.style.transform = `translate3d(0,${(y * 0.16).toFixed(1)}px,0) scale(1.02)`;
        busy = false;
      });
    };
    window.addEventListener('scroll', tick, { passive: true });
    return () => window.removeEventListener('scroll', tick);
  }, []);

  return (
    <section className="hero">
      <div className="hero-media" ref={media}>
        <Photo spec={photo} ratio="16/9" zoom={false} lightbox={false} reveal={false} eager />
      </div>
      <div className="hero-in">{children}</div>
      <div className="scroll-ind"><span>{scrollLabel}</span><i /></div>
    </section>
  );
}
