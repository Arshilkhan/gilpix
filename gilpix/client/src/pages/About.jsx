import { useApi } from '../hooks/useApi';
import { usePageTitle } from '../hooks/usePageTitle';
import { Loading, ApiError } from '../components/Status';
import PageHead from '../components/PageHead';
import Photo from '../components/Photo';
import Reveal from '../components/Reveal';
import CTABand from '../components/CTABand';

export default function About() {
  usePageTitle('About — GILPIX');
  const { data: a, error, loading } = useApi('/about');
  if (loading) return <Loading />;
  if (error) return <ApiError error={error} />;
  return (
    <>
      <PageHead eyebrow="Behind the studio" title="Behind Gilpix" sub="A small studio that photographs weddings the way they actually feel." />
      <section className="bleed mb-[clamp(40px,6vw,90px)]"><Photo spec={a.hero} ratio="21/9" zoom={false} /></section>

      <section className="pad-b">
        <div className="wrap two tight">
          <div className="stack">
            <Reveal as="h2" className="display d3">The story</Reveal>
            {a.story.map((p, i) => <Reveal key={i} as="p" delay={80 + i * 60} className="lede">{p}</Reveal>)}
          </div>
          <Photo spec={a.founder} ratio="4/5" delay={100} />
        </div>
      </section>

      <section className="pad bg-ivory-2">
        <div className="narrow">
          <Reveal as="h2" className="display d3 mb-[34px]">Philosophy</Reveal>
          <div className="two">
            {a.philosophy.map((p, i) => <Reveal key={i} as="p" delay={i * 100} className="lede">{p}</Reveal>)}
          </div>
        </div>
      </section>

      <section className="pad">
        <div className="wrap">
          <div className="sec-head">
            <Reveal as="h2" className="display d3">The team</Reveal>
            <Reveal as="span" className="small">Placeholder profiles</Reveal>
          </div>
          <div className="trio">
            {a.team.map((m, i) => (
              <Reveal key={m.role} delay={i * 100}>
                <Photo spec={m.photo} ratio="3/4" reveal={false} />
                <div className="mt-4">
                  <div className="font-serif text-[22px]">{m.role}</div>
                  <div className="small mt-1.5">{m.focus}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pad-b">
        <div className="wrap">
          <div className="sec-head"><Reveal as="h2" className="display d3">What to expect</Reveal></div>
          <div className="steps">
            {a.expect.map((x, i) => (
              <Reveal key={x.title} className="step" delay={i * 90}>
                <div className="n">0{i + 1}</div><h4>{x.title}</h4><p>{x.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
