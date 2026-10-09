import { useApi } from '../hooks/useApi';
import { usePageTitle } from '../hooks/usePageTitle';
import { Loading, ApiError } from '../components/Status';
import PageHead from '../components/PageHead';
import StoryCard from '../components/StoryCard';
import CTABand from '../components/CTABand';

export default function Stories() {
  usePageTitle('Wedding stories — GILPIX');
  const { data, error, loading } = useApi('/stories');
  if (loading) return <Loading />;
  if (error) return <ApiError error={error} />;
  return (
    <>
      <PageHead eyebrow="Portfolio" title="Wedding stories" sub="Every wedding has its own rhythm, its own people and its own story." />
      <section className="pad-b">
        <div className="wrap">
          <div className="masonry">
            {data.stories.map((s, i) => <StoryCard key={s.slug} story={s} desc year delay={(i % 2) * 100} />)}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
