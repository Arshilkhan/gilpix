import { ENQUIRY_OPTIONS } from '../data/pages.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const str = (v) => (typeof v === 'string' ? v.trim() : '');

/**
 * Validates an enquiry payload. Returns { errors, values }.
 * `errors` is an object keyed by field name; empty means valid.
 */
export function validateEnquiry(body = {}) {
  const errors = {};
  const v = {
    firstName: str(body.firstName),
    partnerName: str(body.partnerName),
    email: str(body.email),
    phone: str(body.phone),
    weddingDate: str(body.weddingDate),
    location: str(body.location),
    venue: str(body.venue),
    events: str(body.events),
    guests: str(body.guests),
    budget: str(body.budget),
    message: str(body.message),
    services: Array.isArray(body.services) ? body.services.map(str).filter(Boolean) : []
  };

  if (!v.firstName) errors.firstName = 'Add a first name';
  if (!v.partnerName) errors.partnerName = "Add your partner's name";

  if (!v.email) errors.email = 'Add an email we can reply to';
  else if (!EMAIL.test(v.email)) errors.email = 'Check the email address';

  if (!v.phone) errors.phone = 'Add a number we can reach you on';
  else if (v.phone.replace(/[^\d]/g, '').length < 8) errors.phone = 'Check the phone number';

  if (!v.weddingDate) errors.weddingDate = 'Pick your wedding date';
  else {
    const d = new Date(v.weddingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(d.getTime())) errors.weddingDate = 'Check the wedding date';
    else if (d < today) errors.weddingDate = 'Pick a date in the future';
  }

  if (!v.location) errors.location = 'Which city is the wedding in?';

  for (const f of ['events', 'guests']) {
    if (v[f] && !/^\d{1,5}$/.test(v[f])) errors[f] = 'Enter a whole number';
  }

  if (!v.services.length) errors.services = 'Pick at least one service';
  else if (v.services.some((s) => !ENQUIRY_OPTIONS.services.includes(s))) errors.services = 'Unknown service selected';

  if (v.budget && !ENQUIRY_OPTIONS.budgets.includes(v.budget)) errors.budget = 'Pick one of the listed ranges';
  if (v.message.length > 2000) errors.message = 'Keep this under 2,000 characters';

  return { errors, values: v };
}
