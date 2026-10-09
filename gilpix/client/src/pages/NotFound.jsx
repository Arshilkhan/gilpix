import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';

export default function NotFound() {
  usePageTitle('Page not found — GILPIX');
  return (
    <div className="state">
      <div>
        <h1 className="display d2">This page isn't part of the story.</h1>
        <p className="lede mx-auto mt-5">The address may have changed, or it never existed.</p>
        <Link className="btn solid mt-8" to="/">Back to GILPIX</Link>
      </div>
    </div>
  );
}
