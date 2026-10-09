import { Router } from 'express';
import { SITE } from '../data/site.js';
import { STORIES, FEATURED_SLUGS, buildChapters, findStory, nextStory } from '../data/stories.js';
import { SERVICES } from '../data/services.js';
import { TESTIMONIALS } from '../data/testimonials.js';
import { EXPERIENCE, INSTAGRAM_GRID, HOME_PHOTOS, SERVICES_PAGE, ABOUT, ENQUIRY_OPTIONS } from '../data/pages.js';

const router = Router();

// Static content never changes at runtime, so let browsers hold it briefly.
router.use((req, res, next) => {
  if (req.method === 'GET') res.set('Cache-Control', 'public, max-age=60');
  next();
});

router.get('/health', (req, res) => res.json({ ok: true, service: 'gilpix-api', time: new Date().toISOString() }));

router.get('/site', (req, res) => res.json(SITE));

router.get('/home', (req, res) => {
  res.json({
    photos: HOME_PHOTOS,
    featured: FEATURED_SLUGS.map((slug) => findStory(slug)),
    services: SERVICES,
    experience: EXPERIENCE,
    testimonials: TESTIMONIALS,
    instagram: { ...SITE.instagram, grid: INSTAGRAM_GRID }
  });
});

router.get('/stories', (req, res) => res.json({ stories: STORIES }));

router.get('/stories/:slug', (req, res) => {
  const story = findStory(req.params.slug);
  if (!story) return res.status(404).json({ error: `No story found for "${req.params.slug}"` });
  res.json({
    ...story,
    chapters: buildChapters(story.slug),
    quote: { text: "We didn't notice a single camera all day. Then the photographs arrived.", placeholder: true },
    next: nextStory(story.slug)
  });
});

router.get('/services', (req, res) => res.json({ hero: SERVICES_PAGE.hero, services: SERVICES }));

router.get('/testimonials', (req, res) => res.json({ testimonials: TESTIMONIALS }));

router.get('/about', (req, res) => res.json(ABOUT));

router.get('/enquiries/options', (req, res) => res.json(ENQUIRY_OPTIONS));

export default router;
