/**
 * Sponsoren-Daten
 * Pfade zu Logos: /sponsoren/dateiname.png (Dateien in app/public/sponsoren/)
 */
export type Sponsor = {
  id: string;
  name: string;
  logo: string;
  url: string;
};

export const SPONSORS: Sponsor[] = [
  { id: '1', name: 'AUVA', logo: '/sponsoren/auva.png', url: 'https://auva.at' },
  { id: '2', name: 'Canon Medical', logo: '/sponsoren/canon-medical.png', url: 'https://at.medical.canon' },
  { id: '3', name: 'Astro Pharma', logo: '/sponsoren/astro-pharma.png', url: 'https://www.astropharma.at' },
  { id: '4', name: 'Bene Pharma', logo: '/sponsoren/bene-pharma.png', url: 'https://www.benepharma.at' },
  { id: '5', name: 'Cortrium', logo: '/sponsoren/cortrium.png', url: 'https://cortrium.com/' },
  { id: '6', name: 'Schiller', logo: '/sponsoren/schiller.png', url: 'https://www.medical-onlineshop.at' },
  { id: '7', name: 'Hypo Tirol', logo: '/sponsoren/hypo-tirol.png', url: 'https://www.hypotirol.com' },
  { id: '8', name: 'Push braces', logo: '/sponsoren/push-braces.png', url: 'https://www.push.eu/de' },
  { id: '9', name: 'ofa austria', logo: '/sponsoren/ofa.png', url: 'https://www.ofaaustria.at/de-at/' },
  { id: '10', name: 'MOCAFE', logo: '/sponsoren/mocafe.png', url: 'https://mocafe.at/' },
  { id: '11', name: 'ZANIER', logo: '/sponsoren/zanier.png', url: 'https://zanier.com/' },
];
