import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { usePageTitle } from '../hooks/usePageTitle';
import { Loading, ApiError } from '../components/Status';
import Hero from '../components/Hero';
import Photo from '../components/Photo';
import Reveal from '../components/Reveal';
import Arrow from '../components/Arrow';
import StoryCard from '../components/StoryCard';
import InstagramSection from '../components/InstagramSection';
import CTABand from '../components/CTABand';
import ServiceRow from '../components/ServiceRow';
import FilmStage from '../components/FilmStage';

// How the four featured stories sit on the 12-column editorial grid.
const FEATURED_LAYOUT = [
  { col: '1 / 8', r: '4/3' },
  { col: '8 / 13', r: '3/4', mt: '14%' },
  { col: '1 / 6', r: '3/4', mt: '2%' },
  { col: '6 / 13', r: '4/3', mt: '16%' }
];

export default function Home() {
  usePageTitle('GILPIX — Wedding Photography & Films');
  const { data, error, loading } = useApi('/home');
  if (loading) return <Loading dark />;
  if (error) return <ApiError error={error} dark />;
  const { photos, featured, services, experience, testimonials, instagram } = data;

  return (
    <>
      <Hero photo={photos.hero}>
        <h1>GILPIX</h1>
        <div className="sub">Wedding Photography &amp; Films</div>
        <p className="tag">Your love. Your story. Beautifully preserved.</p>
        <div className="acts">
          <Link className="btn onphoto solid" to="/stories">View stories</Link>
          <Link className="btn onphoto" to="/contact">Check your date</Link>
        </div>
      </Hero>

      <section className="pad" id="approach">
        <div className="wrap two">
          <div className="stack">
            <Reveal as="h2" className="display d2">We photograph the moments you'll want to remember.</Reveal>
            <Reveal as="p" delay={100} className="lede">From quiet glances and nervous smiles to loud celebrations and unforgettable chaos, we document the people, emotions and moments that make your wedding uniquely yours.</Reveal>
            <Reveal delay={180}><Link className="link" to="/about">Our approach <Arrow /></Link></Reveal>
          </div>
          <Photo spec={photos.intro} ratio="4/5" delay={120} />
        </div>
      </section>

      <section className="pad-b">
        <div className="wrap">
          <div className="sec-head">
            <Reveal>
              <div className="eyebrow mb-4">Selected work</div>
              <h2 className="display d2">Featured stories</h2>
              <p className="font-serif italic text-[22px] text-muted mt-2.5">Real celebrations. Real people. Real moments.</p>
            </Reveal>
            <Reveal as={Link} to="/stories" className="link">All stories <Arrow /></Reveal>
          </div>
          <div className="grid12">
            {featured.map((s, i) => {
              const L = FEATURED_LAYOUT[i];
              return (
                <div key={s.slug} style={{ gridColumn: L.col, marginTop: L.mt }}>
                  <StoryCard story={s} ratio={L.r} delay={i % 2 ? 120 : 0} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bleed"><Photo spec={photos.imageBreak} ratio="21/9" zoom={false} /></section>

      <section className="pad">
        <div className="wrap">
          <div className="sec-head">
            <Reveal as="h2" className="display d2 max-w-[18ch]">More than photographs. We create memories you can return to.</Reveal>
            <Reveal as={Link} to="/services" className="link">All services <Arrow /></Reveal>
          </div>
          {services.map((s, i) => <ServiceRow key={s.slug} service={s} flip={i % 2 === 1} variant="home" />)}
        </div>
      </section>

      <section className="film pad">
        <div className="wrap">
          <div className="text-center max-w-[620px] mx-auto mb-[clamp(34px,5vw,60px)]">
            <Reveal className="eyebrow mb-[18px] !text-[rgba(239,231,218,.5)]">Wedding films</Reveal>
            <Reveal as="h2" delay={80} className="display d2">Your wedding, in motion.</Reveal>
          </div>
          <FilmStage photo={photos.film} />
          <Reveal as="p" className="text-center font-serif italic text-[clamp(17px,2vw,23px)] mt-[30px] mx-auto max-w-[34ch] text-[rgba(239,231,218,.85)]">
            Because some moments deserve to be heard, felt and relived.
          </Reveal>
        </div>
      </section>

      <section className="pad">
        <div className="wrap two tight">
          <div className="stack">
            <Reveal className="eyebrow">Behind Gilpix</Reveal>
            <Reveal delay={80} className="font-serif text-[clamp(20px,2.3vw,30px)] leading-[1.62]">
              <p className="mb-5">We believe the best wedding photographs aren't always the ones where everyone is looking at the camera.</p>
              <p className="italic text-[#2b2420]">They're the stolen glances. The uncontrollable laughter. The hands held under the table. The tears parents try to hide. The chaos between ceremonies.</p>
              <p className="mt-5">We photograph all of it.</p>
            </Reveal>
            <Reveal delay={160}><Link className="link" to="/about">More about Gilpix <Arrow /></Link></Reveal>
          </div>
          <div className="duo">
            <Photo spec={photos.aboutA} ratio="3/4" delay={80} />
            <Photo spec={photos.aboutB} ratio="3/4" delay={180} />
          </div>
        </div>
      </section>

      <section className="pad-b">
        <div className="wrap">
          <div className="sec-head"><Reveal as="h2" className="display d2">The Gilpix experience</Reveal></div>
          <div className="steps">
            {experience.map((e, i) => (
              <Reveal key={e.n} className="step" delay={i * 90}>
                <div className="n">{e.n}</div><h4>{e.title}</h4><p>{e.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pad bg-ivory-2">
        <div className="wrap">
          <div className="sec-head">
            <Reveal as="h2" className="display d2">Words from our couples</Reveal>
            <Reveal as="span" className="small">Placeholder testimonials &middot; to be replaced with real client words</Reveal>
          </div>
          <div className="quotes">
            {testimonials.map((t, i) => (
              <Reveal key={t.by} className="quote" delay={i * 110}>
                <span className="mk">&ldquo;</span><p>{t.quote}</p>
                <div className="who">— {t.by} &middot; {t.place}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <InstagramSection instagram={instagram} />
      <CTABand />
    </>
  );
}
