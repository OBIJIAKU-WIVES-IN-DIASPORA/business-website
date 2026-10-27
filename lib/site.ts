// Single source of truth for the foundation's details.
// Facts below come from the CAC Status Report (IT No. 9820301).
// Items marked TODO need real values from the client before launch.

// Accepts "www.example.org" or "https://www.example.org/" and always returns "https://www.example.org".
// http:// is kept only for localhost, so a typo in the environment variable can't break the build.
function siteUrl(raw: string | undefined): string {
  const v = (raw ?? "").trim().replace(/\/+$/, "");
  if (!v) return "https://www.obijiakuwivesfoundation.org";
  if (/^https?:\/\//i.test(v)) return v;
  return `${/^(localhost|127\.0\.0\.1)/.test(v) ? "http" : "https"}://${v}`;
}

export const SITE = {
  name: "Obijiaku Wives in Diaspora Care Foundation",
  shortName: "Obijiaku Wives in Diaspora Care Foundation",
  url: siteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  tagline: "Holistic humanitarian support for widows, orphans, the elderly and the sick.",
  description:
    "A registered NGO in Owerri, Nigeria supporting widows, orphans, single parents, the elderly and the sick with education, healthcare and skills.",
  // Bump when page content changes materially; used for sitemap lastModified.
  updated: "2026-10-07",
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
  metaTitle: string; // short version for the <title> tag (keeps search results from truncating it)
  date: string; // ISO
  category: string;
  excerpt: string;
  body: string[];
};

// TODO: replace with real news as the foundation's work begins.
export const POSTS: Post[] = [
  {
    slug: "what-is-an-ngo-in-nigeria",
    metaTitle: "What Is an NGO in Nigeria?",
    title: "What is an NGO? How non-governmental organisations work in Nigeria",
    date: "2026-10-07",
    category: "Guides",
    excerpt: "A plain-English guide to NGOs in Nigeria: what the term means, how they register with the CAC, and what to look for before you give.",
    body: [
      "NGO stands for non-governmental organisation (also spelled non-governmental organization). It is an organisation that works for a social purpose, such as education, health or poverty relief. It is not part of government, and it does not exist to make profit for its owners.",
      "In everyday speech, the words NGO, charity, foundation and non-profit are often used to mean much the same thing. What matters is not the label but whether the organisation is properly registered, led by accountable people, and open about how it uses money.",
      "In Nigeria, many NGOs register with the Corporate Affairs Commission (CAC) as incorporated trustees under the Companies and Allied Matters Act 2020. Registration gives the organisation a legal identity, a registration (IT) number and a board of trustees who are responsible for how it is run.",
      "NGO work in Nigeria covers a wide range: educational support for children, healthcare assistance, skills training, support for widows and orphans, care for older people, and community development. Some NGOs are small and local; others run programmes across several states.",
      "Obijiaku Wives in Diaspora Care Foundation is registered with the CAC as an Incorporated Trustee (IT number 9820301). It supports widows, orphans, single parents, the elderly and the sick through education, healthcare, skills training and small-business support.",
    ],
  },
  {
    slug: "how-to-verify-a-registered-ngo-in-nigeria",
    metaTitle: "How to Verify an NGO in Nigeria",
    title: "How to check that an NGO in Nigeria is registered before you donate",
    date: "2026-10-07",
    category: "Guides",
    excerpt: "Five simple checks that help you give with confidence to a Nigerian NGO or foundation.",
    body: [
      "Giving should feel safe. Before you donate to any NGO or foundation in Nigeria, a few quick checks can protect you and make sure your gift reaches the people it is meant for.",
      "1. Ask for the registration number. A registered NGO should be able to tell you its Corporate Affairs Commission (CAC) incorporated trustee (IT) number. Ours is 9820301.",
      "2. Confirm it with the CAC. The CAC keeps a public register, and an organisation can share its CAC status report. Check that the name, registered address and trustees match what the NGO tells you.",
      "3. Look for named people and a real address. Trustworthy organisations say who runs them and where they are based, and they answer questions about both.",
      "4. Pay through official channels only. Be cautious if you are asked to send money to a personal account, or if you are pressured to give urgently. Use the organisation's website or a bank account in the organisation's name.",
      "5. Expect a receipt and honest reporting. A good NGO gives you a receipt, tells you how gifts are used, and publishes updates. You can read how we handle this on our Registration & Transparency page.",
    ],
  },
  {
    slug: "how-to-donate-to-nigeria-from-abroad",
    metaTitle: "Donate to Nigeria from Abroad",
    title: "How to donate to a charity in Nigeria from abroad",
    date: "2026-10-07",
    category: "Guides",
    excerpt: "A short guide for people in the UK, US, Canada and elsewhere who want to support widows, orphans and families in Nigeria safely.",
    body: [
      "Many people living abroad want to support family members, communities and causes back home in Nigeria. Giving through a registered NGO means your gift is directed to a cause, you receive a receipt, and the organisation answers to a board of trustees.",
      "Step 1: choose the cause. On our donate page you can give to education, healthcare, skills training, micro-business support, widows, single parents or elderly care, or choose \"where needed most\".",
      "Step 2: choose your currency. You can give in Nigerian naira (NGN), US dollars (USD), British pounds (GBP) or euros (EUR), so you don't need to convert anything yourself.",
      "Step 3: pay securely. Payments are processed by Flutterwave's secure checkout, where you can pay by card, bank transfer or other available methods. We never see or store your card details.",
      "Step 4: keep your receipt. As soon as your payment is confirmed we email you a receipt with a receipt number. If your email doesn't arrive, check your spam folder or contact us.",
      "A note on tax: the rules for giving to overseas charities differ from country to country. Please ask a tax adviser if you need to know how a gift to a Nigerian NGO is treated where you live.",
    ],
  },
  {
    slug: "foundation-officially-registered",
    metaTitle: "Foundation Registered with CAC",
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
    metaTitle: "How Your Donation Is Used",
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
  { name: "Jacinta Ada Obijiaku", role: "Chairman & Trustee", initials: "JO", photo: "/images/trustees/jacinta-ada-obijiaku.webp", position: "50% 35%" },
  { name: "Regina Adaobi Obijiaku", role: "Trustee & Secretary", initials: "RO", photo: "/images/trustees/regina-adaobi-obijiaku.webp", position: "50% 25%" },
];

// Set DONATIONS_PAUSED=true (in .env / Vercel) to show a "back shortly" notice on /donate and refuse new payments.
// Remove it or set it to anything else to reopen donations. Existing payments and receipts are not affected.
export const donationsPaused = () => process.env.DONATIONS_PAUSED === "true";
