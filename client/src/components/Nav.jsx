import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSite } from './SiteContext';

export default function Nav({ hasHero, menuOpen, onToggle }) {
  const { nav } = useSite();
  const [st, setSt] = useState({ past: false, compact: false });

  useEffect(() => {
    let busy = false;
    const read = () => {
      if (busy) return;
      busy = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const past = y > window.innerHeight - 90;
        const compact = y > 40;
        setSt((p) => (p.past === past && p.compact === compact ? p : { past, compact }));
        busy = false;
      });
    };
    read();
    window.addEventListener('scroll', read, { passive: true });
    return () => window.removeEventListener('scroll', read);
  }, [hasHero]);

  const over = hasHero && !st.past && !menuOpen;
  const solid = (!hasHero || st.past) && !menuOpen;

  return (
    <nav className={`nav ${over ? 'over' : ''} ${solid ? 'solid' : ''} ${st.compact ? 'compact' : ''}`} style={{ zIndex: menuOpen ? 60 : 80 }}>
      <div className="nav-in">
        <Link className="brand" to="/" aria-label="GILPIX home">GILPIX</Link>
        <div className="nav-links">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>{n.label}</NavLink>
          ))}
        </div>
        <Link className="nav-cta desk" to="/contact">Check your date</Link>
        <button className="burger" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={onToggle}><i /></button>
      </div>
    </nav>
  );
}
