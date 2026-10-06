// Single source of truth for the foundation's details.
// Facts below come from the CAC Status Report (IT No. 9820301).
// Items marked TODO need real values from the client before launch.

export const SITE = {
  name: "Obijiaku Wives in Diaspora Care Foundation",
  shortName: "Obijiaku Wives in Diaspora Care Foundation",
  // TODO: replace with the real domain once purchased (e.g. https://www.obijiakucare.org)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.obijiakucare.org",
  tagline: "Holistic humanitarian support for widows, orphans, the elderly and the sick.",
  description:
    "Obijiaku Wives in Diaspora Care Foundation is a registered Nigerian charity providing educational sponsorships, healthcare assistance, vocational skills and micro-business empowerment to widows, orphans, the elderly and the sick.",
  itNumber: "9820301",
  registered: "1 September 2026",
  email: "adaobijiaku@hotmail.co.uk",
  phone: "+234 706 605 4043",
  phoneHref: "+2347066054043",
  address: {
    street: "No. 8, Chukwuma Ekezie Street, off Mbieri Road, Akwakuma, by Luxury Place Guest House",
    city: "Owerri",
    state: "Imo State",
    country: "Nigeria",
  },
  lagosOffice: "No. 5, Avenue T Close, House 29, Festac, Lagos State, Nigeria",
  // TODO: add real social links
  social: { facebook: "#", instagram: "#", x: "#" },
  // TODO: real bank details from the client. Never invent these.
  bank: { bankName: "", accountName: "Obijiaku Wives in Diaspora Care Foundation", accountNumber: "" },
};

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/mission", label: "Mission" },
  { href: "/programs", label: "Programs" },
  { href: "/impact", label: "Impact" },
  { href: "/news", label: "News" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contact", label: "Contact" },
];

export type Program = {
  slug: string;
  title: string;
  icon: "education" | "health" | "skills" | "business" | "widows" | "family" | "elderly";
  short: string;
  body: string[];
  how: string[];
  beneficiaries: string;
};

export const PROGRAMS: Program[] = [
  {
    slug: "educational-sponsorship",
    title: "Educational Sponsorship",
    icon: "education",
    short: "School fees, uniforms and learning materials for orphans and children from vulnerable homes.",
    body: [
      "Every child deserves the chance to learn. We sponsor orphans and children from vulnerable families so that poverty is never the reason a child leaves school.",
      "Support is paid directly toward school needs and monitored so that every naira reaches the child it was meant for.",
    ],
    how: ["Tuition and exam fees", "Uniforms, books and supplies", "Regular progress follow-up with schools"],
    beneficiaries: "Orphans and children from vulnerable households",
  },
  {
    slug: "healthcare-assistance",
    title: "Critical Healthcare Assistance",
    icon: "health",
    short: "Help with treatment, medication and medical bills for the sick and elderly who cannot afford care.",
    body: [
      "Illness can push a family into crisis overnight. We help people in need reach treatment, medication and care when they cannot pay for it.",
      "We prioritise urgent cases among the sick and the elderly, working with licensed health providers.",
    ],
    how: ["Support with medical bills", "Medication and treatment assistance", "Referrals to licensed health providers"],
    beneficiaries: "The sick and the elderly",
  },
  {
    slug: "vocational-skills",
    title: "Vocational Skill Acquisition",
    icon: "skills",
    short: "Practical training so that widows and young people can earn a dignified living.",
    body: [
      "Skills turn hardship into hope. We fund practical training in trades and crafts that lead directly to income.",
      "Graduates are encouraged to move on to our micro-business programme, so training becomes lasting livelihood.",
    ],
    how: ["Sponsored apprenticeships and training", "Starter tools where needed", "Pathway into micro-business support"],
    beneficiaries: "Widows and vulnerable adults and youth",
  },
  {
    slug: "micro-business-empowerment",
    title: "Micro-Business Empowerment",
    icon: "business",
    short: "Start-up support that helps widows and families build small businesses and stand on their own.",
    body: [
      "A small business can change a family's future. We support beneficiaries with the means and guidance to start and grow small enterprises.",
      "Our aim is independence, not dependence: lasting income that keeps working long after the support ends.",
    ],
    how: ["Start-up support", "Basic business guidance", "Follow-up and mentoring"],
    beneficiaries: "Widows and families ready to start a business",
  },
  {
    slug: "widows-support",
    title: "Widows' Support",
    icon: "widows",
    short: "Practical, dignified support for widows facing hardship, isolation and loss of income.",
    body: [
      "Widowhood often brings sudden poverty and loneliness. We stand with widows through practical help, skills and community.",
      "Widows are at the heart of our work and connect to all of our other programmes.",
    ],
    how: ["Relief support in times of need", "Access to skills and business programmes", "Community and care"],
    beneficiaries: "Widows",
  },
  {
    slug: "single-parents-empowerment",
    title: "Single Parents Empowerment",
    icon: "family",
    short: "Support for single fathers and single mothers raising children on their own.",
    body: [
      "Raising children alone is hard, especially when money is tight. We stand with single fathers and single mothers so that their children can still thrive.",
      "The programme connects single parents to our skills training and micro-business support, so they can earn a steady income and provide for their families.",
    ],
    how: ["Skills training and micro-business support", "Help keeping children in school", "Community, guidance and encouragement"],
    beneficiaries: "Single fathers and single mothers",
  },
  {
    slug: "elderly-care",
    title: "Care for the Elderly",
    icon: "elderly",
    short: "Compassionate support so older people can live with comfort, health and dignity.",
    body: [
      "Many older people are left without family support or income. We provide care, company and practical help so they are not forgotten.",
    ],
    how: ["Essential supplies and relief", "Healthcare assistance", "Visits and companionship"],
    beneficiaries: "The elderly",
  },
];

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO
  category: string;
  excerpt: string;
  body: string[];
};

// TODO: replace with real news as the foundation's work begins.
export const POSTS: Post[] = [
  {
    slug: "foundation-officially-registered",
    title: "Obijiaku Wives in Diaspora Care Foundation is officially registered",
    date: "2026-09-01",
    category: "Foundation News",
    excerpt: "The foundation is now an Incorporated Trustee registered with the Corporate Affairs Commission of Nigeria.",
    body: [
      "We are pleased to announce that Obijiaku Wives in Diaspora Care Foundation has been registered with the Corporate Affairs Commission (CAC) of Nigeria as an Incorporated Trustee, IT Number 9820301.",
      "Registration gives our work a firm legal foundation and a duty of transparency to everyone who supports us. It marks the start of our work to support widows, orphans, the elderly and the sick.",
    ],
  },
  {
    slug: "how-your-donation-is-used",
    title: "How your donation is used",
    date: "2026-09-15",
    category: "Transparency",
    excerpt: "Our commitment to openness: where donations go and how we report back to supporters.",
    body: [
      "Donors deserve to know exactly what their gift achieves. Every donation is directed to the programme it was given for, and we will publish regular reports on what has been done.",
      "If you have a question about any gift, write to us any time through the contact page.",
    ],
  },
];

export const CAUSES = [
  { id: "education", label: "Education", programme: "educational-sponsorship" },
  { id: "health", label: "Healthcare", programme: "healthcare-assistance" },
  { id: "skills", label: "Skills training", programme: "vocational-skills" },
  { id: "business", label: "Micro-business", programme: "micro-business-empowerment" },
  { id: "widows", label: "Widows", programme: "widows-support" },
  { id: "single-parents", label: "Single parents", programme: "single-parents-empowerment" },
  { id: "elderly", label: "Elderly care", programme: "elderly-care" },
] as const;

export const TRUSTEES = [
  { name: "Jacinta Ada Obijiaku", role: "Chairman & Trustee", initials: "JO" },
  { name: "Regina Adaobi Obijiaku", role: "Trustee & Secretary", initials: "RO" },
];
