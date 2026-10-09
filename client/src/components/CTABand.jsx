import { Link } from 'react-router-dom';
import Photo from './Photo';
import Reveal from './Reveal';
import { useSite } from './SiteContext';

export default function CTABand() {
  const { ctaPhoto, contact } = useSite();
  return (
    <section className="band">
      <div className="bg"><Photo spec={ctaPhoto} ratio="16/9" zoom={false} lightbox={false} reveal={false} /></div>
      <div className="in">
        <Reveal as="h2" className="display d1">Let's tell<br />your story.</Reveal>
        <Reveal as="p" delay={120} className="font-serif italic text-[clamp(17px,2vw,24px)] leading-relaxed mt-[26px] mb-9 mx-auto max-w-[26ch] opacity-95">
          Your wedding deserves more than photographs. It deserves to be remembered.
        </Reveal>
        <Reveal delay={220} className="flex flex-wrap justify-center gap-3.5">
          <Link className="btn onphoto solid" to="/contact">Check your date</Link>
          <a className="btn onphoto" href={`mailto:${contact.email}`}>Start a conversation</a>
        </Reveal>
      </div>
    </section>
  );
}
