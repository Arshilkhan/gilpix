// Global site data: brand, contact details, navigation, shared imagery.
// Every photograph is a "photo spec". Give it a `src` and the real image replaces
// the generated placeholder, e.g. { ...spec, src: '/photos/hero.jpg' }.

export const SITE = {
  brand: { name: 'GILPIX', line: 'Wedding Photography & Films' },
  instagram: { handle: '@gilpix.photography', url: 'https://www.instagram.com/gilpix.photography/' },
  contact: {
    email: 'hello@gilpix.photography',
    phone: '+91 XXXXX XXXXX',
    whatsapp: '+91 XXXXX XXXXX',
    base: 'India · Available for destination weddings'
  },
  nav: [
    { label: 'Home', to: '/' },
    { label: 'Stories', to: '/stories' },
    { label: 'Services', to: '/services' },
    { label: 'About', to: '/about' }
  ],
  footerNav: [
    { label: 'Home', to: '/' },
    { label: 'Stories', to: '/stories' },
    { label: 'Services', to: '/services' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' }
  ],
  ctaPhoto: { seed: 301, pal: 'dusk', kind: 'couple', r: '16/9', label: 'Final call to action' }
};
