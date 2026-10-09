const cover = (seed, pal, kind, r, label) => ({ seed, pal, kind, r, label });

export const STORIES = [
  { slug: 'aarav-riya', a: 'Aarav', b: 'Riya', loc: 'Pune · Maharashtra', type: 'Traditional Maharashtrian Wedding', year: '2025', events: 'Four events · 3 days',
    note: 'A monsoon-grey morning, a courtyard full of turmeric, and pheras by candlelight in a hundred-year-old wada.',
    cover: cover(11, 'vermilion', 'couple', '4/3', 'Cover · couple portrait') },
  { slug: 'aditya-sneha', a: 'Aditya', b: 'Sneha', loc: 'Mumbai · Maharashtra', type: 'Sea-facing City Wedding', year: '2025', events: 'Three events · 2 days',
    note: 'A sangeet that ran till the tide came in, and a bride who danced barefoot down the aisle.',
    cover: cover(22, 'dusk', 'portrait', '3/4', 'Cover · bridal portrait') },
  { slug: 'rahul-ananya', a: 'Rahul', b: 'Ananya', loc: 'Goa · Destination Wedding', type: 'Beach Destination Wedding', year: '2024', events: 'Five events · 4 days',
    note: 'Sixty people, one long table under the palms, and vows said while the light went gold.',
    cover: cover(33, 'dusk', 'couple', '3/2', 'Cover · beach ceremony') },
  { slug: 'karan-isha', a: 'Karan', b: 'Isha', loc: 'Nashik · Maharashtra', type: 'Vineyard Wedding', year: '2024', events: 'Three events · 2 days',
    note: 'Rows of vines, a mehendi that turned into a family cricket match, and a reception in the dark.',
    cover: cover(44, 'sage', 'wide', '3/2', 'Cover · vineyard ceremony') },
  { slug: 'dev-meera', a: 'Dev', b: 'Meera', loc: 'Udaipur · Rajasthan', type: 'Palace Wedding', year: '2024', events: 'Four events · 3 days',
    note: 'A baraat that arrived by boat and a grandmother who cried through every single ritual.',
    cover: cover(55, 'vermilion', 'wide', '4/3', 'Cover · baraat') },
  { slug: 'arjun-tara', a: 'Arjun', b: 'Tara', loc: 'Jaipur · Rajasthan', type: 'Heritage Haveli Wedding', year: '2024', events: 'Four events · 3 days',
    note: 'Yellow everywhere. On the walls, on the food, on everyone by the end of the haldi.',
    cover: cover(66, 'haldi', 'portrait', '3/4', 'Cover · haldi portrait') },
  { slug: 'vikram-nandini', a: 'Vikram', b: 'Nandini', loc: 'Alibaug · Maharashtra', type: 'Intimate Farmhouse Wedding', year: '2023', events: 'Two events · 2 days',
    note: 'Thirty guests, one mango tree, and the quietest, most unhurried wedding we have photographed.',
    cover: cover(77, 'mehendi', 'couple', '3/2', 'Cover · couple under the tree') },
  { slug: 'sameer-pooja', a: 'Sameer', b: 'Pooja', loc: 'Nagpur · Maharashtra', type: 'Family Home Wedding', year: '2023', events: 'Three events · 2 days',
    note: 'The whole thing happened in the house Pooja grew up in, which made the goodbyes much harder.',
    cover: cover(88, 'linen', 'portrait', '3/4', 'Cover · vidaai') }
];

// Home page "Featured stories", in display order.
export const FEATURED_SLUGS = ['aarav-riya', 'aditya-sneha', 'karan-isha', 'rahul-ananya'];

// Chapter blueprint. `layout` tells the client which editorial arrangement to use;
// `ratios` has one entry per photograph. Replace placeholder photos with real `src` values later.
const CHAPTER_DEFS = [
  { title: 'Getting Ready', intro: 'The hour nobody remembers afterwards — mothers fixing pleats, cousins hunting for a missing earring, a bride who suddenly goes very quiet.', pal: 'ivory', layout: 'duo', kinds: ['portrait', 'detail'], ratios: ['3/4', '3/4'] },
  { title: 'Haldi', intro: 'Turmeric, marigolds and no dignity left by the end of it.', pal: 'haldi', layout: 'wide-two', kinds: ['wide', 'portrait', 'detail'], ratios: ['16/9', '4/5', '4/5'] },
  { title: 'Mehendi', intro: 'Six hours of sitting still, which is the only time all weekend the family actually talks to each other.', pal: 'mehendi', layout: 'offset', kinds: ['detail', 'portrait'], ratios: ['4/5', '1/1'] },
  { title: 'Ceremony', intro: '', pal: 'vermilion', layout: 'bleed', kinds: ['wide'], ratios: ['21/9'] },
  { title: 'Couple Portraits', intro: 'Twenty unhurried minutes, usually stolen somewhere between two events.', pal: 'dusk', layout: 'offset', kinds: ['couple', 'portrait'], ratios: ['4/5', '1/1'] },
  { title: 'Family', intro: 'The photographs your parents will actually print.', pal: 'linen', layout: 'trio', kinds: ['wide', 'portrait', 'detail'], ratios: ['4/5', '4/5', '4/5'] },
  { title: 'Reception', intro: '', pal: 'night', layout: 'wide-two', kinds: ['dance', 'night', 'detail'], ratios: ['16/9', '4/5', '4/5'] },
  { title: 'Candid Moments', intro: 'Everything that happened while nobody was looking at us.', pal: 'ivory', layout: 'quad', kinds: ['detail', 'portrait', 'wide', 'couple'], ratios: ['4/5', '3/2', '3/2', '4/5'] }
];

export function buildChapters(slug) {
  const base = slug.length * 7;
  return CHAPTER_DEFS.map((c, ci) => ({
    title: c.title,
    intro: c.intro,
    layout: c.layout,
    photos: c.ratios.map((r, i) => ({
      seed: base + ci * 17 + i * 3 + 400,
      pal: c.pal,
      kind: c.kinds[i % c.kinds.length],
      r,
      label: c.title
    }))
  }));
}

export const findStory = (slug) => STORIES.find((s) => s.slug === slug);
export const nextStory = (slug) => STORIES[(STORIES.findIndex((s) => s.slug === slug) + 1) % STORIES.length];
