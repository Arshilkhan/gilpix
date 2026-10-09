import Reveal from './Reveal';

export default function PageHead({ eyebrow, title, sub }) {
  return (
    <section className="page-head pad-b">
      <div className="wrap">
        <Reveal className="eyebrow mb-[22px]">{eyebrow}</Reveal>
        <Reveal as="h1" delay={80} className="display d1">{title}</Reveal>
        {sub && <Reveal as="p" delay={160} className="lede mt-[30px] font-serif italic text-[clamp(18px,2vw,25px)] leading-relaxed">{sub}</Reveal>}
      </div>
    </section>
  );
}
