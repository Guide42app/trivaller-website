export type Destination = {
  id: string
  name: string
  location: string
  category: string
  blurb: string
  image: string
  rating?: string
}

export type Thread = {
  id: string
  author: string
  handle: string
  destination: string
  category: string
  title: string
  excerpt: string
  replies: number
  helpful: number
}

export type Deal = {
  id: string
  title: string
  place: string
  category: string
  offer: string
  image: string
  demo: true
}

export const navLinks = [
  { href: '#explore', label: 'Explore' },
  { href: '#jeeva', label: 'Jeeva AI' },
  { href: '#planner', label: 'Trip Planner' },
  { href: '#community', label: 'Community' },
  { href: '#deals', label: 'Deals' },
  { href: '#business', label: 'For Business' },
] as const

export const destinations: Destination[] = [
  {
    id: 'rmnp',
    name: 'Rocky Mountain Overlook',
    location: 'Estes Park, CO',
    category: 'Scenic',
    blurb: 'Alpine ridges and alpine lakes for a morning that starts above the clouds.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80',
    rating: '4.9',
  },
  {
    id: 'maro',
    name: 'Maroon Bells Trail',
    location: 'Aspen, CO',
    category: 'Hike',
    blurb: 'Twin peaks reflected in still water — a classic Colorado day hike.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    rating: '4.8',
  },
  {
    id: 'garden',
    name: 'Garden of the Gods',
    location: 'Colorado Springs',
    category: 'Landmark',
    blurb: 'Red sandstone fins rising against the Front Range — free, dramatic, and walkable.',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    rating: '4.8',
  },
  {
    id: 'falls',
    name: 'Hanging Lake',
    location: 'Glenwood Canyon',
    category: 'Waterfall',
    blurb: 'A turquoise pool carved into the canyon wall after a steep, rewarding climb.',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b022e2d3b?auto=format&fit=crop&w=1200&q=80',
    rating: '4.7',
  },
  {
    id: 'denver',
    name: 'RiNo Murals Walk',
    location: 'Denver, CO',
    category: 'Culture',
    blurb: 'Street art, coffee, and riverfront paths before you head into the mountains.',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85b34b5ca?auto=format&fit=crop&w=1200&q=80',
    rating: '4.6',
  },
]

export const threads: Thread[] = [
  {
    id: 't1',
    author: 'Maya Chen',
    handle: '@mayaontrails',
    destination: 'Rocky Mountain NP',
    category: 'Trail tips',
    title: 'Bear Lake parking fills by 7am on weekends',
    excerpt: 'Shuttle is smoother. Bring layers — the ridge wind hits hard even in July.',
    replies: 24,
    helpful: 86,
  },
  {
    id: 't2',
    author: 'Jordan Hale',
    handle: '@jordanhale',
    destination: 'Maroon Bells',
    category: 'Local tip',
    title: 'Book the bus reservation before you pack the car',
    excerpt: 'Walk-up spots are rare in peak season. Sunrise light on the bells is worth the early alarm.',
    replies: 18,
    helpful: 61,
  },
  {
    id: 't3',
    author: 'Priya Shah',
    handle: '@priyaexplores',
    destination: 'Hanging Lake',
    category: 'Precaution',
    title: 'Permit required — and the trail is steeper than it looks',
    excerpt: 'Poles help. Stay on the boardwalk around the lake to protect the fragile shore.',
    replies: 31,
    helpful: 102,
  },
  {
    id: 't4',
    author: 'Leo Martins',
    handle: '@leoroads',
    destination: 'Denver → Estes',
    category: 'Q&A',
    title: 'Best stop for coffee before Trail Ridge?',
    excerpt: 'Looking for something between Boulder and the park entrance with quick parking.',
    replies: 12,
    helpful: 27,
  },
]

export const deals: Deal[] = [
  {
    id: 'd1',
    title: 'Guided sunrise hike',
    place: 'Estes Park',
    category: 'Activity',
    offer: 'Demo · 20% sample offer',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1000&q=80',
    demo: true,
  },
  {
    id: 'd2',
    title: 'Rafting half-day',
    place: 'Clear Creek',
    category: 'Experience',
    offer: 'Demo · weekday sample rate',
    image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=1000&q=80',
    demo: true,
  },
  {
    id: 'd3',
    title: 'Local brewery tasting',
    place: 'Denver RiNo',
    category: 'Local',
    offer: 'Demo · complimentary flight',
    image: 'https://images.unsplash.com/photo-1436076863939-06870fe779c2?auto=format&fit=crop&w=1000&q=80',
    demo: true,
  },
  {
    id: 'd4',
    title: 'Scenic jeep tour',
    place: 'Aspen Highlands',
    category: 'Attraction',
    offer: 'Demo · early-bird sample',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80',
    demo: true,
  },
]

export const itineraryDays = [
  {
    day: 1,
    title: 'Denver',
    summary: 'Arrive, settle in, and ease into the city with a riverfront walk.',
    stops: ['Union Station', 'RiNo Murals', 'City Park sunset'],
    coords: { lat: 39.7392, lng: -104.9903 },
  },
  {
    day: 2,
    title: 'Rocky Mountain National Park',
    summary: 'Alpine lakes, overlooks, and a full day above the tree line.',
    stops: ['Bear Lake', 'Alberta Falls', 'Trail Ridge overlook'],
    coords: { lat: 40.3428, lng: -105.6836 },
  },
  {
    day: 3,
    title: 'Scenic Mountain Exploration',
    summary: 'Peak views, a canyon stop, and a slower pace between trails.',
    stops: ['Maroon Bells', 'Glenwood Canyon', 'Hot springs evening'],
    coords: { lat: 39.0708, lng: -106.989 },
  },
  {
    day: 4,
    title: 'Return Journey',
    summary: 'One last overlook, then a clear route home with stops that matter.',
    stops: ['Garden of the Gods', 'Coffee in Colorado Springs', 'Denver departure'],
    coords: { lat: 38.8739, lng: -104.891 },
  },
]

export const routeStops = [
  { id: 'a', name: 'Trailhead', x: 18, y: 62 },
  { id: 'b', name: 'Lake overlook', x: 42, y: 28 },
  { id: 'c', name: 'Ridge picnic', x: 68, y: 48 },
  { id: 'd', name: 'Waterfall', x: 78, y: 72 },
  { id: 'e', name: 'Village cafe', x: 36, y: 78 },
]

/** Unoptimized visit order vs nearest-neighbor style order (demo). */
export const routeOrders = {
  before: ['a', 'd', 'b', 'e', 'c'],
  after: ['a', 'e', 'd', 'c', 'b'],
}
