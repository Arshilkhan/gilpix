import { Link, useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { usePageTitle } from '../hooks/usePageTitle';
import { Loading, ApiError } from '../components/Status';
import Hero from '../components/Hero';
import Photo from '../components/Photo';
import Reveal from '../components/Reveal';
import Arrow from '../components/Arrow';

function Chapter({ chapter: c, index }) {
  const [p0, p1, p2, p3] = c.photos;
  const head = (
    <Reveal className="ch-head">
      <span className="idx">{String(index + 1).padStart(2, '0')}</span>
      <div><h3>{c.title}</h3>{c.intro && <p>{c.intro}</p>}</div>
    </Reveal>
  );

  // Each layout is a deliberate editorial arrangement — nothing falls into a plain grid.
  let body = null;
  if (c.layout === 'bleed') {
    return (
      <section className="chapter">
        <div className="wrap">{head}</div>
        <div className="bleed"><Photo spec={p0} zoom={false} /></div>
      </section>
    );
  }
  if (c.layout === 'duo') body = <div className="duo"><Photo spec={p0} /><Photo spec={p1} delay={100} /></div>;
  if (c.layout === 'wide-two') body = <div className="gapx"><Photo spec={p0} /><div className="duo"><Photo spec={p1} /><Photo spec={p2} delay={100} /></div></div>;
  if (c.layout === 'offset') body = <div className="offset"><Photo spec={p0} /><div><Photo spec={p1} delay={100} /></div></div>;
  if (c.layout === 'trio') body = <div className="trio"><Photo spec={p0} /><Photo spec={p1} delay={80} /><Photo spec={p2} delay={160} /></div>;
  if (c.layout === 'quad') {
    body = (
      <div className="duo items-start">
        <div className="gapx"><Photo spec={p0} /><Photo spec={p1} /></div>
        <div className="gapx mt-[clamp(20px,6vw,90px)]"><Photo spec={p2} /><Photo spec={p3} /></div>
      </div>
    );
  }
  return <section className="chapter"><div className="wrap">{head}{body}</div></section>;
}

export default function Story() {
  const { slug } = useParams();
  const { data: s, error, loading } = useApi(`/stories/${slug}`);
  usePageTitle(s ? `${s.a} × ${s.b} — GILPIX` : 'Story — GILPIX');
  if (loading) return <Loading dark />;
  if (error) return <ApiError error={error} dark />;
  const n = s.next;

  return (
    <>
      <Hero photo={{ ...s.cover, r: '16/9' }} scrollLabel="The story">
        <div className="sub !mt-0 mb-5">{s.type}</div>
        <h1 className="!text-[clamp(38px,7.6vw,96px)] !tracking-[.06em] !indent-[.06em]">{s.a} <span className="italic">&times;</span> {s.b}</h1>
        <p className="tag !max-w-[30ch]">{s.loc}</p>
      </Hero>

      <section className="pad">
        <div className="wrap">
          <Reveal className="meta-bar">
            <div><span className="k">Couple</span><span className="v">{s.a} &amp; {s.b}</span></div>
            <div><span className="k">Location</span><span className="v">{s.loc.split(' · ')[0]}</span></div>
            <div><span className="k">Year</span><span className="v">{s.year}</span></div>
            <div><span className="k">Coverage</span><span className="v">{s.events}</span></div>
          </Reveal>
          <Reveal as="p" delay={100} className="lede mx-auto mt-[clamp(34px,5vw,60px)] font-serif text-[clamp(20px,2.4vw,30px)] leading-relaxed text-center max-w-[30ch]">{s.note}</Reveal>
        </div>
      </section>

      {s.chapters.map((c, i) => <Chapter key={c.title} chapter={c} index={i} />)}

      <section className="pad bg-ivory-2">
        <div className="narrow">
          <Reveal as="p" className="pull">&ldquo;{s.quote.text}&rdquo;</Reveal>
          <Reveal className="small text-center mt-[26px]">— {s.a} &amp; {s.b}{s.quote.placeholder ? ' · placeholder testimonial' : ''}</Reveal>
        </div>
      </section>

      <Link className="next" to={`/stories/${n.slug}`}>
        <Photo spec={n.cover} ratio="24/9" zoom={false} lightbox={false} reveal={false} />
        <span className="in">
          <span className="block">
            <span className="eyebrow !text-[rgba(255,255,255,.7)]">Next story</span>
            <span className="display d2 block mt-3.5">{n.a} <span className="italic">&times;</span> {n.b} <Arrow /></span>
            <span className="small block mt-3.5 !text-[rgba(255,255,255,.75)]">{n.loc}</span>
          </span>
        </span>
      </Link>
    </>
  );
}
