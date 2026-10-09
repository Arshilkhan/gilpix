import { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { usePageTitle } from '../hooks/usePageTitle';
import { api } from '../lib/api';
import { Loading, ApiError } from '../components/Status';
import { useSite } from '../components/SiteContext';
import PageHead from '../components/PageHead';
import Photo from '../components/Photo';
import Reveal from '../components/Reveal';

const EMPTY = {
  firstName: '', partnerName: '', email: '', phone: '', weddingDate: '', location: '',
  venue: '', events: '', guests: '', budget: '', message: '', services: [], website: ''
};
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Mirrors the server rules so people get instant feedback; the server remains the authority.
function check(v) {
  const e = {};
  if (!v.firstName.trim()) e.firstName = 'Add a first name';
  if (!v.partnerName.trim()) e.partnerName = "Add your partner's name";
  if (!v.email.trim()) e.email = 'Add an email we can reply to';
  else if (!EMAIL.test(v.email.trim())) e.email = 'Check the email address';
  if (!v.phone.trim()) e.phone = 'Add a number we can reach you on';
  if (!v.weddingDate) e.weddingDate = 'Pick your wedding date';
  if (!v.location.trim()) e.location = 'Which city is the wedding in?';
  if (!v.services.length) e.services = 'Pick at least one service';
  return e;
}

function Field({ id, label, error, required, children }) {
  return (
    <div className={`field ${error ? 'err' : ''}`}>
      <label htmlFor={id}>{label}{required ? ' *' : ''}</label>
      {children}
      {error && <span className="err-msg" id={`${id}-err`} role="alert">{error}</span>}
    </div>
  );
}

export default function Contact() {
  usePageTitle('Check your date — GILPIX');
  const { data: opts, error: optsError, loading } = useApi('/enquiries/options');
  const { instagram, contact } = useSite();
  const [v, setV] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState('');
  const [done, setDone] = useState(null);

  if (loading) return <Loading />;
  if (optsError) return <ApiError error={optsError} />;

  const set = (k) => (e) => { setV((p) => ({ ...p, [k]: e.target.value })); if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined })); };
  const toggle = (s) => {
    setV((p) => ({ ...p, services: p.services.includes(s) ? p.services.filter((x) => x !== s) : [...p.services, s] }));
    setErrors((p) => ({ ...p, services: undefined }));
  };
  const props = (k) => ({ id: k, name: k, value: v[k], onChange: set(k), 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-err` : undefined });
  const today = new Date().toISOString().slice(0, 10);

  const submit = async (e) => {
    e.preventDefault();
    setFormError('');
    const local = check(v);
    if (Object.keys(local).length) {
      setErrors(local);
      const first = Object.keys(local)[0];
      document.getElementById(first)?.focus() || document.querySelector('.chip')?.focus();
      return;
    }
    setBusy(true);
    try {
      const res = await api.post('/enquiries', v);
      setDone({ name: v.firstName.trim(), date: v.weddingDate, services: v.services, reference: res.reference });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      if (err.fields) setErrors(err.fields);
      setFormError(err.network ? "We couldn't reach the server. Check your connection and try again." : err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHead eyebrow="Enquiries" title="Let's talk about your wedding." sub="Tell us the dates and the cities. We will tell you honestly whether we are the right studio for it." />
      <section className="pad-b">
        <div className="wrap two tight !gap-[clamp(40px,6vw,110px)]">
          {done ? (
            <div className="sent" role="status">
              <div className="eyebrow mb-5">Enquiry received</div>
              <h3 className="display d3">Thank you, {done.name}.</h3>
              <p className="lede mt-5 mx-auto text-center">
                We have your date — {new Date(done.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} — and your interest in {done.services.join(', ').toLowerCase()}. We reply to every enquiry within two days.
              </p>
              <p className="small mt-[26px] !normal-case !tracking-[.02em]">Reference {done.reference} &middot; prototype only, nothing was stored or emailed.</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="form">
                <Field id="firstName" label="First name" required error={errors.firstName}><input {...props('firstName')} type="text" autoComplete="given-name" /></Field>
                <Field id="partnerName" label="Partner's name" required error={errors.partnerName}><input {...props('partnerName')} type="text" /></Field>
                <Field id="email" label="Email" required error={errors.email}><input {...props('email')} type="email" autoComplete="email" placeholder="you@example.com" /></Field>
                <Field id="phone" label="Phone / WhatsApp" required error={errors.phone}><input {...props('phone')} type="tel" autoComplete="tel" placeholder="+91" /></Field>
                <Field id="weddingDate" label="Wedding date" required error={errors.weddingDate}><input {...props('weddingDate')} type="date" min={today} /></Field>
                <Field id="location" label="Wedding location" required error={errors.location}><input {...props('location')} type="text" placeholder="City" /></Field>
                <Field id="venue" label="Venue" error={errors.venue}><input {...props('venue')} type="text" placeholder="If decided" /></Field>
                <Field id="events" label="Number of events" error={errors.events}><input {...props('events')} type="number" min="1" inputMode="numeric" placeholder="e.g. 4" /></Field>
                <Field id="guests" label="Approximate guest count" error={errors.guests}><input {...props('guests')} type="number" min="1" inputMode="numeric" placeholder="e.g. 350" /></Field>
                <Field id="budget" label="Budget range" error={errors.budget}>
                  <select {...props('budget')}>
                    <option value="">Select a range</option>
                    {opts.budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </Field>

                <div className={`field full ${errors.services ? 'err' : ''}`}>
                  <label id="svc-label">Services interested in *</label>
                  <div className="chips" role="group" aria-labelledby="svc-label">
                    {opts.services.map((s) => (
                      <button key={s} type="button" className="chip" aria-pressed={v.services.includes(s)} onClick={() => toggle(s)}>{s}</button>
                    ))}
                  </div>
                  {errors.services && <span className="err-msg" role="alert">{errors.services}</span>}
                </div>

                <div className="field full">
                  <label htmlFor="message">Tell us about your wedding</label>
                  <textarea {...props('message')} placeholder="How you met, how many events, what you want your photographs to feel like." />
                </div>

                {/* Honeypot — hidden from people, irresistible to bots. */}
                <div className="hp" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={set('website')} />
                </div>

                <div className="field full mt-3.5">
                  {formError && <p className="err-msg mb-3.5" role="alert">{formError}</p>}
                  <button className="btn solid !w-auto self-start px-11" type="submit" disabled={busy}>{busy ? 'Sending…' : 'Send enquiry'}</button>
                  <span className="small mt-3.5 !normal-case !tracking-[.02em] !text-xs">Prototype only — enquiries are validated but not stored or emailed.</span>
                </div>
              </div>
            </form>
          )}

          <aside className="stack">
            <Photo spec={opts.photo} ratio="4/5" />
            <Reveal className="grid gap-[26px] mt-[38px]">
              <div><div className="small mb-2">Instagram</div><a href={instagram.url} target="_blank" rel="noopener noreferrer" className="font-serif text-[21px]">{instagram.handle}</a></div>
              <div><div className="small mb-2">WhatsApp</div><a href="tel:+91" className="font-serif text-[21px]">{contact.whatsapp}</a></div>
              <div><div className="small mb-2">Email</div><a href={`mailto:${contact.email}`} className="font-serif text-[21px]">{contact.email}</a></div>
              <div><div className="small mb-2">Based in</div><div className="font-serif text-[21px]">{contact.base}</div></div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
