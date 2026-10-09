import Photo from './Photo';
import Reveal from './Reveal';
import Arrow from './Arrow';

export default function InstagramSection({ instagram }) {
  return (
    <section className="pad">
      <div className="wrap">
        <div className="sec-head">
          <Reveal>
            <div className="eyebrow mb-4">Instagram</div>
            <h2 className="display d2">Follow the stories</h2>
            <a href={instagram.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 font-serif italic text-[22px]">{instagram.handle}</a>
          </Reveal>
          <Reveal as="a" className="link" href={instagram.url} target="_blank" rel="noopener noreferrer">Follow on Instagram <Arrow /></Reveal>
        </div>
        <div className="ig">
          {instagram.grid.map((g, i) => (
            <a key={g.seed} href={instagram.url} target="_blank" rel="noopener noreferrer" aria-label={`Instagram: ${g.label}`}>
              <Photo spec={g} lightbox={false} delay={i * 60} />
              <span className="gl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" /></svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
