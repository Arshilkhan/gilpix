import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import Photo from './Photo';
import Arrow from './Arrow';

// One wedding. Each card links to /stories/:slug — an individual story page.
export default function StoryCard({ story, ratio, delay = 0, desc = false, year = false, style }) {
  return (
    <Reveal as={Link} to={`/stories/${story.slug}`} className="story-card" delay={delay} style={style} aria-label={`View story: ${story.a} and ${story.b}`}>
      <span className="tagline">{story.type}</span>
      <Photo spec={story.cover} ratio={ratio} lightbox={false} reveal={false} />
      <div className="meta">
        <div>
          <h3>{story.a} <span className="italic text-muted">&times;</span> {story.b}</h3>
          <div className="loc">{story.loc}{year ? ` · ${story.year}` : ''}</div>
        </div>
        <span className="view">View story <Arrow /></span>
      </div>
      {desc && <p className="desc">{story.note}</p>}
    </Reveal>
  );
}
