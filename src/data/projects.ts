export const projects = [
  {
    id: '1',
    title: 'Modern Minimalist Villa',
    description: 'Contemporary design meets functional living in this stunning minimalist villa.',
    price: 250000,
    type: 'residential',
    area: 280,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2075',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2075',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&q=80&w=2075'
    ],
    details: {
      rooms: 4,
      bathrooms: 3,
      style: 'Modern Minimalist',
      stories: 2
    }
  },
  {
    id: '2',
    title: 'Urban Office Complex',
    description: 'State-of-the-art commercial space designed for modern businesses.',
    price: 750000,
    type: 'commercial',
    area: 500,
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=2069',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069'
    ],
    details: {
      rooms: 12,
      bathrooms: 6,
      style: 'Contemporary Commercial',
      stories: 3
    }
  },
  {
    id: '3',
    title: 'Eco-Friendly Family Home',
    description: 'Sustainable living meets modern comfort in this family-oriented design.',
    price: 320000,
    type: 'residential',
    area: 220,
    images: [
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=2080',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2070'
    ],
    details: {
      rooms: 3,
      bathrooms: 2,
      style: 'Eco-Modern',
      stories: 1
    }
  }
] as const;