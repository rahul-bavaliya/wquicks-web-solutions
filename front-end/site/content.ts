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
      'AI search visibility (ChatGPT, Google AI, Perplexity)',
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
  badge: string // small label on the cover, e.g. "Our own build"
  href?: string
}

// Things WQuicks has built. Add client projects here as they launch
// (with the client's permission), newest first.
export const projects: Project[] = [
  {
    title: 'wquicks.com',
    kind: 'Website, lead system and admin tools',
    summary:
      'This site: a custom React build with pages pre-rendered so Google and AI search can read them, a contact system that stores every lead, and an admin dashboard that generates client contracts.',
    tags: ['web', 'marketing'],
    tone: 'sky',
    badge: 'Our own build',
    href: '/',
  },
  {
    title: 'Work order management system',
    kind: 'Web and mobile app for service businesses',
    summary:
      'Tracks jobs from request to invoice for service teams in any industry, with a web dashboard, a mobile app for technicians, company sign-in and AI help built in.',
    tags: ['web'],
    tone: 'field',
    badge: 'Product we built',
  },
  {
    title: 'Auto shop CRM',
    kind: 'Customer and job management for repair shops',
    summary:
      'Scans a vehicle VIN to start a job card, follows each job through the shop, sends invoices with online payment and suggests likely causes for common problems.',
    tags: ['web'],
    tone: 'dusk',
    badge: 'Product we built',
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
    a: 'Small business websites start at $1,200 and most land between $1,200 and $2,800. After a free call we send a fixed price in writing, so you know the full cost before we start. See the pricing page for details.',
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

// ── Pricing ─────────────────────────────────────────────────
// Prices in Canadian dollars, before tax. Adjust freely.
export type Plan = {
  name: string
  price: string
  unit?: string
  for: string
  items: string[]
  featured?: boolean
}

export const websitePlans: Plan[] = [
  {
    name: 'Starter site',
    price: '$1,200',
    for: 'New businesses and trades who need a professional site, fast.',
    items: [
      'Up to 5 pages, written with you',
      'Works on phones, tablets and computers',
      'Contact or quote form sent to your inbox',
      'Google Business Profile set up or cleaned up',
      'Search and AI-ready setup',
      'Live in about 3 weeks',
    ],
  },
  {
    name: 'Business site',
    price: '$2,800',
    for: 'Established businesses that want to be found for every service they offer.',
    items: [
      'Up to 12 pages with custom design',
      'A page for each service and area you cover',
      'Guides or blog you can update yourself',
      'Structured data so Google and AI tools understand you',
      'Visitor and lead tracking',
      'Live in about 4 to 6 weeks',
    ],
    featured: true,
  },
  {
    name: 'Store or custom app',
    price: '$5,500',
    for: 'Selling online, taking bookings, or running part of your business on the web.',
    items: [
      'Online store, booking system or customer portal',
      'Payments, inventory or scheduling built in',
      'Connects to the tools you already use',
      'Admin screens your team can run',
      'Written scope and timeline before we start',
    ],
  },
]

export const carePlans: Plan[] = [
  {
    name: 'Essentials',
    price: '$49',
    unit: '/month',
    for: 'Keep the site fast, safe and online.',
    items: ['Hosting and security certificate', 'Daily backups', 'Updates and security fixes', 'Uptime monitoring'],
  },
  {
    name: 'Growth',
    price: '$149',
    unit: '/month',
    for: 'Keep the site fresh without lifting a finger.',
    items: [
      'Everything in Essentials',
      'Up to 2 hours of changes each month',
      'Google Business Profile posts',
      'Monthly report in plain language',
    ],
    featured: true,
  },
  {
    name: 'Visibility',
    price: '$349',
    unit: '/month',
    for: 'Climb in local search and get named by AI tools.',
    items: [
      'Everything in Growth',
      'Local SEO and listing clean-up',
      'Monthly check of ChatGPT, Google AI and Perplexity answers',
      'One new guide or FAQ page each month',
    ],
  },
]

export const extras = [
  { name: 'AI visibility report', price: '$299', note: 'one time' },
  { name: 'Logo and brand identity', price: 'from $750', note: '' },
  { name: 'Photo shoot, half day', price: 'from $450', note: '' },
  { name: 'Short-form video package', price: 'from $650', note: '' },
  { name: 'Google or Meta ads management', price: 'from $400', note: 'per month, plus ad spend' },
  { name: 'Social media management', price: 'from $600', note: 'per month' },
]

export const foundingOffer = {
  title: 'Founding client offer: 30% off your website',
  body:
    'We are taking on our first five client websites at 30% off. In return, you let us share the project as a case study and leave an honest Google review once it is live.',
  spotsNote: 'Limited to five businesses.',
}

export const guarantees = [
  { name: 'Fixed, written price', body: 'The price in your proposal is the price you pay.' },
  { name: 'Pay half to start', body: '50% to begin, 50% when you are happy and the site is live.' },
  { name: 'First design redo free', body: 'Not right for you? We redesign it at no charge.' },
  { name: 'No long contracts', body: 'Care plans and marketing are month to month. Cancel anytime.' },
]

export const websiteCheckIncludes = [
  'How your site looks and works on a phone',
  'Speed, security and broken links',
  'Whether Google can find and read every page',
  'Whether ChatGPT, Google AI and Perplexity mention you',
  'Your Google Business Profile and listings',
  'The top 5 fixes, in plain language',
]

// ── Page titles and descriptions for search engines and link previews ──
export const seo: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'WQuicks | Web, media and marketing in Regina, SK',
    description:
      'Regina studio for websites, photo and video, local SEO and AI search visibility. Websites from $1,200. Book a free call or get a free website check.',
  },
  '/services': {
    title: 'Services | Web design, media and marketing in Regina | WQuicks',
    description:
      'Websites and apps, photo and video, local SEO, ads and AI search visibility for Saskatchewan businesses.',
  },
  '/pricing': {
    title: 'Pricing | Websites from $1,200 in Regina | WQuicks',
    description:
      'Clear prices for websites, care plans and marketing in Regina, SK. Fixed written quotes, 50% to start, no long contracts.',
  },
  '/work': {
    title: "What we've built | WQuicks, Regina SK",
    description: 'Websites, web apps and business software built by WQuicks in Regina, Saskatchewan.',
  },
  '/about': {
    title: 'About WQuicks | Regina web and marketing studio',
    description:
      'WQuicks is a Regina studio run by a software engineer with 6+ years of experience, building websites and marketing for local businesses.',
  },
  '/book': {
    title: 'Book a free 30-minute call | WQuicks, Regina SK',
    description: 'Pick a time that suits you for a free call about your website or marketing. No obligation.',
  },
  '/website-check': {
    title: 'Free website check | WQuicks, Regina SK',
    description:
      'Get a free check of your website: phone experience, speed, Google and AI search visibility, with the top 5 fixes in plain language.',
  },
  '/contact': {
    title: 'Contact WQuicks | Regina, SK',
    description: 'Call, email or send a message to WQuicks in Regina. We reply within one business day.',
  },
  '/privacy': {
    title: 'Privacy policy | WQuicks',
    description: 'How WQuicks collects, uses and protects the information you send us.',
  },
}
