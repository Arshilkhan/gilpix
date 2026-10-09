import { Router } from 'express';
import { randomBytes } from 'node:crypto';
import { validateEnquiry } from '../lib/validateEnquiry.js';
import { rateLimit } from '../lib/rateLimit.js';

const router = Router();

/**
 * POST /api/enquiries
 * STATIC DRAFT: validates the payload and returns a reference number, but nothing is
 * stored, emailed or forwarded. Hook your mailer / CRM / database in at the marked line.
 */
router.post('/', rateLimit(), (req, res) => {
  // Honeypot: real visitors never see this field. Bots fill it. Pretend success, do nothing.
  if (req.body && req.body.website) {
    return res.status(201).json({ ok: true, reference: 'GP-000000', message: 'Enquiry received.' });
  }

  const { errors, values } = validateEnquiry(req.body);
  if (Object.keys(errors).length) {
    return res.status(422).json({ ok: false, error: 'Please check the highlighted fields.', errors });
  }

  const reference = 'GP-' + randomBytes(3).toString('hex').toUpperCase();

  // ── FUTURE: persist / notify here ─────────────────────────────────────────
  // await db.enquiries.create({ reference, ...values });
  // await mailer.send({ to: 'hello@gilpix.photography', subject: `New enquiry ${reference}`, ... });
  // ──────────────────────────────────────────────────────────────────────────
  if (process.env.NODE_ENV !== 'test') {
    console.log(`[enquiry] ${reference} · ${values.firstName} & ${values.partnerName} · ${values.weddingDate} · ${values.location}`);
  }

  res.status(201).json({
    ok: true,
    reference,
    message: `Thank you, ${values.firstName}. We reply to every enquiry within two days.`,
    stored: false
  });
});

export default router;
