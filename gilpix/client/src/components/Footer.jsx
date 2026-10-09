import { Link } from 'react-router-dom';
import { useSite } from './SiteContext';

export default function Footer() {
  const { brand, footerNav, instagram, contact } = useSite();
  return (
    <footer>
      <div className="wrap">
        <div className="f-top">
          <div>
            <div className="brand font-serif">{brand.name}</div>
            <p className="mt-[18px] text-[13px] max-w-[30ch] text-[rgba(239,231,218,.7)]">{brand.line}</p>
          </div>
          <div className="f-col">
            <h5>Pages</h5>
            {footerNav.map((n) => <Link key={n.to} to={n.to}>{n.label}</Link>)}
          </div>
          <div className="f-col">
            <h5>Follow</h5>
            <a href={instagram.url} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={instagram.url} target="_blank" rel="noopener noreferrer">{instagram.handle}</a>
          </div>
          <div className="f-col">
            <h5>Enquiries</h5>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href="tel:+91">{contact.phone}</a>
            <p className="!text-[rgba(239,231,218,.6)]">{contact.base}</p>
          </div>
        </div>
        <div className="f-bot">
          <span>&copy; 2026 GILPIX. All rights reserved.</span>
          <span>Design prototype &middot; placeholder imagery</span>
        </div>
      </div>
    </footer>
  );
}
