import { useApi } from '../hooks/useApi';
import { usePageTitle } from '../hooks/usePageTitle';
import { Loading, ApiError } from '../components/Status';
import PageHead from '../components/PageHead';
import Photo from '../components/Photo';
import Reveal from '../components/Reveal';
import ServiceRow from '../components/ServiceRow';
import CTABand from '../components/CTABand';

export default function Services() {
  usePageTitle('Services — GILPIX');
  const { data, error, loading } = useApi('/services');
  if (loading) return <Loading />;
  if (error) return <ApiError error={error} />;
  return (
    <>
      <PageHead eyebrow="What we do" title="Services" sub="Photographs, films and albums — built around how your wedding actually runs." />
      <section className="bleed mb-[clamp(40px,6vw,90px)]"><Photo spec={data.hero} ratio="21/9" zoom={false} /></section>
      <section className="pad-b">
        <div className="wrap">
          {data.services.map((s, i) => <ServiceRow key={s.slug} service={s} flip={i % 2 === 1} />)}
          <Reveal as="p" className="mt-10 max-w-[60ch] text-[13px] text-muted">
            Every wedding is priced after we understand your dates, cities and number of events. The figures above are placeholders for this draft.
          </Reveal>
        </div>
      </section>
      <CTABand />
    </>
  );
}
