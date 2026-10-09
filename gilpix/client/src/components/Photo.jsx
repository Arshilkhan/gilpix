import { useMemo } from 'react';
import { makePhoto } from '../lib/photo';
import { useInView } from '../hooks/useInView';
import { useLightbox } from './Lightbox';

/**
 * <Photo spec={{ seed, pal, kind, r, label, src? }} />
 * - `spec.src` (a real image URL) always wins over the generated placeholder.
 * - `ratio` overrides the spec's aspect ratio (the placeholder is regenerated to match).
 * - Aspect ratio is reserved in CSS, so there is no layout shift while images load.
 */
export default function Photo({ spec, ratio, zoom = true, lightbox = true, reveal = true, eager = false, delay = 0, className = '', alt }) {
  const open = useLightbox();
  const [ref, seen] = useInView(!reveal);
  const r = ratio || spec.r || '3/2';
  const src = useMemo(() => spec.src || makePhoto({ ...spec, r }), [spec, r]);

  const cls = ['ph', zoom && 'zoom', reveal && 'rvi', reveal && seen && 'in', lightbox && 'tapme', className].filter(Boolean).join(' ');
  const interactive = lightbox ? { role: 'button', tabIndex: 0, onClick: () => open(src), onKeyDown: (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), open(src)) } : {};

  return (
    <figure ref={ref} className={cls} style={{ '--r': r, '--d': `${delay}ms` }} {...interactive}>
      <img src={src} alt={alt || spec.label || 'GILPIX wedding photograph'} loading={eager ? 'eager' : 'lazy'} decoding="async" />
    </figure>
  );
}
