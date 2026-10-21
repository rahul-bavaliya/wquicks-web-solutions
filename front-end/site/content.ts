// ─────────────────────────────────────────────────────────────
// All public-site copy lives here. Edit this file to change text,
// services, projects, FAQs and contact details — the components
// read everything from it.
// Lines marked TODO are placeholders to replace before launch.
// ─────────────────────────────────────────────────────────────

export const company = {
  name: 'WQuicks',
  legalName: 'WQuicks Web Solutions',
  email: 'wquicksolution@gmail.com',
  phone: '(437) 449-2404',
  phoneHref: 'tel:+14374492404',
  area: 'Regina, Saskatchewan',
  hours: 'Monday to Friday, 9am to 6pm',
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/wquicks' },
    // TODO: add Instagram / Facebook once the profiles exist
  ],
}

export type Service = {
  id: 'web' | 'media' | 'marketing'
  name: string
  lead: string
  body: string
  items: string[]
}

export const services: Service[] = [
  {
    id: 'web',
    name: 'Web & apps',
    lead: 'Websites and apps that load fast, rank locally and turn visitors into calls.',
    body:
      'We design and build every site around what your customers need to do: find you, trust you and get in touch. Custom design, written for search, and easy for you to update yourself.',
    items: [
      'Custom website design',
      'React and WordPress builds',
      'Online stores',
      'Booking tools, portals and web apps',
      'iOS and Android apps',
      'Hosting, security and care plans',
    ],
  },
  {
    id: 'media',
    name: 'Media',
    lead: 'Photo, video and design that shows your real business, not stock images.',
    body:
      'We come to your shop, site or office and capture the people and work that make you different, then cut it for your website, social channels and ads.',
    items: [
      'Brand and product photography',
      'Short-form video for Reels and TikTok',
      'Promo and recruitment videos',
      'Logo and brand identity',
      'Social graphics and templates',
      'Print: signage, flyers, vehicle graphics',
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    lead: 'Get found by people in Regina who are already looking for what you sell.',
    body:
      'Local SEO, paid ads and social media that we track back to real leads. Every month you get a plain-language report: what we spent, what it brought in and what we change next.',
    items: [
      'Local SEO and Google Business Profile',
      'Google Ads and Meta ads',
      'Social media management',
      'Email campaigns',
      'Landing pages for campaigns',
      'Analytics and lead tracking',
    ],
  },
]

export const process = [
  {
    name: 'Talk',
    body: 'A free 30-minute call about your business, your customers and what is not working today.',
  },
  {
    name: 'Plan',
    body: 'A written proposal with scope, timeline and a fixed price, so there are no surprises on the invoice.',
  },
  {
    name: 'Make',
    body: 'We design, shoot and build in short rounds. You review real pages and footage, not slide decks.',
  },
  {
    name: 'Launch and grow',
    body: 'We launch, show your team how to run it, then keep improving with monthly reports and updates.',
  },
]

export const industries = [
  'Trades and contractors',
  'Agriculture and equipment',
  'Restaurants and cafés',
  'Clinics and wellness',
  'Real estate',
  'Retail and online stores',
  'Non-profits',
  'Professional services',
]

export type Project = {
  title: string
  kind: string
  summary: string
  tags: Service['id'][]
  tone: 'sky' | 'canola' | 'field' | 'dusk'
  sample: boolean
}

// TODO: replace with real client projects (with their permission).
// While `sample` is true the card shows a small "Sample" tag on the site.
export const projects: Project[] = [
  {
    title: 'Prairie contractor',
    kind: 'Website and local SEO',
    summary:
      'A five-page site built around a quote form, with service-area pages for Regina, Moose Jaw and White City.',
    tags: ['web', 'marketing'],
    tone: 'sky',
    sample: true,
  },
  {
    title: 'Downtown café',
    kind: 'Photo, video and social',
    summary:
      'A menu photo shoot and a month of short videos, scheduled across Instagram and Facebook.',
    tags: ['media', 'marketing'],
    tone: 'canola',
    sample: true,
  },
  {
    title: 'Equipment dealer',
    kind: 'Online inventory and Google Ads',
    summary:
      'A searchable inventory that updates from a spreadsheet, plus an ad campaign for each product line.',
    tags: ['web', 'marketing'],
    tone: 'field',
    sample: true,
  },
  {
    title: 'Physio clinic',
    kind: 'Brand refresh and booking site',
    summary:
      'A new logo, team photos and a site that sends patients straight into online booking.',
    tags: ['media', 'web'],
    tone: 'dusk',
    sample: true,
  },
]

export const values = [
  {
    name: 'Local and reachable',
    body: 'We are in Regina. You can meet us in person, call us, and get an answer the same day.',
  },
  {
    name: 'Fixed, written prices',
    body: 'Every project starts with a proposal that says exactly what you get and what it costs.',
  },
  {
    name: 'You own everything',
    body: 'Your domain, your site, your photos and your ad accounts stay in your name.',
  },
  {
    name: 'Reports you can read',
    body: 'Monthly results in plain language, tied to calls, form fills and sales.',
  },
]

export const faqs = [
  {
    q: 'How long does a new website take?',
    a: 'Most small business sites launch in 3 to 6 weeks. Online stores and custom apps take longer; the proposal gives you a timeline before we start.',
  },
  {
    q: 'How much does a website cost?',
    a: 'It depends on the pages and features you need. After a short call we send a fixed price in writing, so you know the full cost up front.',
  },
  {
    q: 'Can I update the site myself?',
    a: 'Yes. We set you up with an editor for text, photos and blog posts and show you how to use it. If you would rather not, a care plan covers updates for you.',
  },
  {
    q: 'Do you work with businesses outside Regina?',
    a: 'Yes. Most clients are in Regina and southern Saskatchewan, but we work with businesses across Canada over video calls.',
  },
  {
    q: 'Do I need a long contract for marketing?',
    a: 'No. Marketing and social media run month to month. Ads usually need two or three months of data to settle, and we will tell you honestly if they are not working.',
  },
  {
    q: 'Can you fix or take over an existing website?',
    a: 'Yes. We can speed up, secure and redesign an existing site, or move it to new hosting without losing your search rankings.',
  },
]
