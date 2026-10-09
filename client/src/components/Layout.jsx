import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './Nav';
import MenuSheet from './MenuSheet';
import Footer from './Footer';

export default function Layout() {
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);
  // Pages that open on a full-bleed photograph get the transparent, white nav.
  const hasHero = pathname === '/' || pathname.startsWith('/stories/');

  useEffect(() => { window.scrollTo(0, 0); setMenu(false); }, [pathname]);
  useEffect(() => { document.body.classList.toggle('menu-open', menu); return () => document.body.classList.remove('menu-open'); }, [menu]);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenu(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <Nav hasHero={hasHero} menuOpen={menu} onToggle={() => setMenu((m) => !m)} />
      <MenuSheet onNavigate={() => setMenu(false)} />
      <main key={pathname} className="page"><Outlet /></main>
      <Footer />
    </>
  );
}
