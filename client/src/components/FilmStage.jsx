import { useState } from 'react';
import Photo from './Photo';
import Reveal from './Reveal';

// Cinematic video placeholder. Swap the "player goes here" state for a Vimeo/YouTube embed later.
export default function FilmStage({ photo }) {
  const [clicked, setClicked] = useState(false);
  const go = () => setClicked(true);
  return (
    <Reveal className="film-stage" role="button" tabIndex={0} aria-label="Play the featured film" onClick={go}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), go())}>
      <Photo spec={photo} ratio="16/9" zoom={false} lightbox={false} reveal={false} />
      <span className="play">
        {clicked ? (
          <span className="text-white text-center text-[11px] tracking-[.24em] uppercase leading-[2.2] px-6">
            Film player goes here<br /><span className="opacity-60">Embed the Vimeo or YouTube cut before launch</span>
          </span>
        ) : (
          <b><span className="pulse" /></b>
        )}
      </span>
    </Reveal>
  );
}
