// Page-level content that isn't a collection (home sections, about page, enquiry options).

export const EXPERIENCE = [
  { n: '01', title: 'Observe', text: 'We look for the moments happening between the moments.' },
  { n: '02', title: 'Feel', text: 'We focus on emotion rather than staged perfection.' },
  { n: '03', title: 'Create', text: 'We combine documentary photography with intentional portraiture.' },
  { n: '04', title: 'Preserve', text: 'Every image is carefully edited and curated into a story.' }
];

export const INSTAGRAM_GRID = [
  { seed: 201, pal: 'haldi', kind: 'portrait', r: '1/1', label: 'Haldi' },
  { seed: 202, pal: 'vermilion', kind: 'detail', r: '1/1', label: 'Mandap detail' },
  { seed: 203, pal: 'dusk', kind: 'couple', r: '1/1', label: 'Golden hour' },
  { seed: 204, pal: 'night', kind: 'dance', r: '1/1', label: 'Sangeet' },
  { seed: 205, pal: 'mehendi', kind: 'detail', r: '1/1', label: 'Mehendi' },
  { seed: 206, pal: 'linen', kind: 'wide', r: '1/1', label: 'Family' },
  { seed: 207, pal: 'ivory', kind: 'portrait', r: '1/1', label: 'Bridal portrait' },
  { seed: 208, pal: 'sage', kind: 'couple', r: '1/1', label: 'Vidaai' }
];

export const HOME_PHOTOS = {
  hero: { seed: 1, pal: 'vermilion', kind: 'couple', r: '16/9', label: 'Hero' },
  intro: { seed: 2, pal: 'ivory', kind: 'portrait', r: '4/5', label: 'Bride, getting ready' },
  imageBreak: { seed: 5, pal: 'night', kind: 'dance', r: '21/9', label: 'Sangeet · full-width image break' },
  film: { seed: 6, pal: 'dusk', kind: 'couple', r: '16/9', label: 'Featured film · placeholder frame' },
  aboutA: { seed: 7, pal: 'linen', kind: 'portrait', r: '3/4', label: 'Gilpix · at work' },
  aboutB: { seed: 8, pal: 'sage', kind: 'detail', r: '3/4', label: 'Gilpix · the team' }
};

export const SERVICES_PAGE = {
  hero: { seed: 500, pal: 'vermilion', kind: 'wide', r: '21/9', label: 'Ceremony' }
};

export const ABOUT = {
  hero: { seed: 600, pal: 'linen', kind: 'wide', r: '21/9', label: 'The team at work' },
  founder: { seed: 601, pal: 'ivory', kind: 'portrait', r: '4/5', label: 'Founder portrait' },
  story: [
    "Gilpix began the way most things do in an Indian family — someone handed us a camera at a cousin's wedding and told us to make ourselves useful. We came back with photographs nobody had asked for: an uncle asleep in a plastic chair, a bride laughing at something off-frame, two grandmothers holding hands.",
    'Those are the ones the family printed. We have been photographing weddings that way ever since.'
  ],
  philosophy: [
    'We shoot documentary-first. That means we do not stop the vidaai to fix the light, and we do not ask you to walk past us three more times. If a moment is worth having, it is worth having as it happened.',
    'The portraits we do stage are unhurried and few. Twenty honest minutes gives us more than two rehearsed hours, and gives you back most of your own wedding.'
  ],
  team: [
    { role: 'Lead photographer', focus: 'Documentary coverage', photo: { seed: 610, pal: 'linen', kind: 'portrait', r: '3/4', label: 'Lead photographer' } },
    { role: 'Second photographer', focus: 'Portraits & family', photo: { seed: 611, pal: 'ivory', kind: 'portrait', r: '3/4', label: 'Second photographer' } },
    { role: 'Films', focus: 'Cinematography & sound', photo: { seed: 612, pal: 'sage', kind: 'portrait', r: '3/4', label: 'Films' } }
  ],
  expect: [
    { title: 'Before', text: 'A call, a look at your schedule, and a plan for where we need to be.' },
    { title: 'On the day', text: 'Two to four of us, moving quietly, dressed to blend in with your guests.' },
    { title: 'After', text: 'A private gallery in four to six weeks. The film follows.' },
    { title: 'Always', text: 'Your files backed up in three places, and an album whenever you are ready.' }
  ]
};

export const ENQUIRY_OPTIONS = {
  services: ['Wedding Photography', 'Wedding Films', 'Pre-Wedding', 'Traditional Photography', 'Drone Coverage', 'Albums'],
  budgets: ['₹50K – ₹1L', '₹1L – ₹2L', '₹2L – ₹3L', '₹3L – ₹5L', '₹5L+'],
  photo: { seed: 700, pal: 'dusk', kind: 'couple', r: '4/5', label: 'Couple portrait' }
};
