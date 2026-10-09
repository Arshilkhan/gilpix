import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';

process.env.NODE_ENV = 'test';
let server, base;

before(async () => {
  server = createApp().listen(0);
  await new Promise((r) => server.once('listening', r));
  base = `http://127.0.0.1:${server.address().port}/api`;
});
after(() => server.close());

const get = (p) => fetch(base + p).then(async (r) => ({ status: r.status, body: await r.json() }));
const post = (p, body) =>
  fetch(base + p, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    .then(async (r) => ({ status: r.status, body: await r.json() }));

const valid = {
  firstName: 'Riya', partnerName: 'Aarav', email: 'riya@example.com', phone: '+91 98765 43210',
  weddingDate: '2099-02-14', location: 'Pune', services: ['Wedding Photography', 'Albums']
};

test('health', async () => {
  const { status, body } = await get('/health');
  assert.equal(status, 200); assert.equal(body.ok, true);
});

test('site has nav and instagram', async () => {
  const { body } = await get('/site');
  assert.equal(body.instagram.handle, '@gilpix.photography');
  assert.equal(body.nav.length, 4);
});

test('home returns four featured stories and four services', async () => {
  const { body } = await get('/home');
  assert.equal(body.featured.length, 4);
  assert.equal(body.services.length, 4);
  assert.equal(body.instagram.grid.length, 8);
});

test('stories list and detail', async () => {
  const list = await get('/stories');
  assert.ok(list.body.stories.length >= 6);
  const one = await get('/stories/aarav-riya');
  assert.equal(one.status, 200);
  assert.equal(one.body.chapters.length, 8);
  assert.equal(one.body.next.slug, 'aditya-sneha');
  const titles = one.body.chapters.map((c) => c.title);
  assert.deepEqual(titles, ['Getting Ready', 'Haldi', 'Mehendi', 'Ceremony', 'Couple Portraits', 'Family', 'Reception', 'Candid Moments']);
});

test('unknown story is a 404', async () => {
  const { status } = await get('/stories/nope');
  assert.equal(status, 404);
});

test('unknown api route is a JSON 404', async () => {
  const { status, body } = await get('/nothing');
  assert.equal(status, 404); assert.ok(body.error);
});

test('enquiry: empty payload is rejected with field errors', async () => {
  const { status, body } = await post('/enquiries', {});
  assert.equal(status, 422);
  for (const f of ['firstName', 'partnerName', 'email', 'phone', 'weddingDate', 'location', 'services']) assert.ok(body.errors[f], f);
});

test('enquiry: bad email, past date and unknown service are rejected', async () => {
  const { status, body } = await post('/enquiries', { ...valid, email: 'nope', weddingDate: '2001-01-01', services: ['Fireworks'] });
  assert.equal(status, 422);
  assert.ok(body.errors.email && body.errors.weddingDate && body.errors.services);
});

test('enquiry: valid payload returns a reference and is not stored', async () => {
  const { status, body } = await post('/enquiries', valid);
  assert.equal(status, 201);
  assert.match(body.reference, /^GP-[0-9A-F]{6}$/);
  assert.equal(body.stored, false);
});

test('enquiry: honeypot is silently swallowed', async () => {
  const { status, body } = await post('/enquiries', { website: 'spam.com' });
  assert.equal(status, 201); assert.equal(body.reference, 'GP-000000');
});
