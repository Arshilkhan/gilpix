import { Link } from 'react-router-dom';
import Photo from './Photo';
import Reveal from './Reveal';
import Arrow from './Arrow';

// Editorial service layout. variant="home" = short; variant="full" = description, inclusions, CTA.
export default function ServiceRow({ service: s, flip, variant = 'full' }) {
  const full = variant === 'full';
  const ratio = full ? '4/5' : flip ? '5/4' : '4/5';
  return (
    <div className={`svc ${flip ? 'flip' : ''}`} id={full ? s.slug : undefined}>
      <Reveal className="svc-media"><Photo spec={s.photo} ratio={ratio} reveal={false} /></Reveal>
      <Reveal delay={110}>
        <div className="svc-num">{s.n}</div>
        <h3>{s.title}</h3>
        <p className="lede">{full ? s.long : s.short}</p>
        {full ? (
          <>
            <ul className="incl">{s.included.map((x) => <li key={x}>{x}</li>)}</ul>
            <div className="flex flex-wrap items-center gap-[26px] mt-[34px]">
              <Link className="btn" to="/contact">Check your date</Link>
              <span className="small">{s.from} &middot; indicative</span>
            </div>
          </>
        ) : (
          <div className="mt-7"><Link className="link" to="/services">{s.title} <Arrow /></Link></div>
        )}
      </Reveal>
    </div>
  );
}
