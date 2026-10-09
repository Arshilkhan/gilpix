import { Link } from 'react-router-dom';
import { useSite } from './SiteContext';

export default function MenuSheet({ onNavigate }) {
  const { footerNav, instagram } = useSite();
  return (
    <div className="sheet" id="sheet" aria-label="Menu">
      <div>
        {footerNav.map((n) => (
          <Link key={n.to} className="m" to={n.to} onClick={onNavigate}>{n.label}</Link>
        ))}
      </div>
      <div className="foot">
        <div>
          <div className="small mb-2">Instagram</div>
          <a href={instagram.url} target="_blank" rel="noopener noreferrer" className="text-sm">{instagram.handle}</a>
        </div>
        <Link className="btn solid" to="/contact" onClick={onNavigate}>Check your date</Link>
      </div>
    </div>
  );
}
