import { SITE } from "./site";

// Written for real questions donors and beneficiaries ask. Every answer states only facts from the CAC record or the site itself.
export const FAQ: { q: string; a: string }[] = [
  { q: "What is Obijiaku Wives in Diaspora Care Foundation?", a: `${SITE.name} is a registered non-governmental organization (NGO) based in Owerri, Imo State, Nigeria. It provides holistic humanitarian support to widows, orphans, single parents, the elderly and the sick through educational sponsorships, healthcare assistance, vocational skills training and micro-business empowerment.` },
  { q: "Is the foundation a registered NGO in Nigeria?", a: `Yes. It is registered with the Corporate Affairs Commission (CAC) of Nigeria as an Incorporated Trustee, IT number ${SITE.itNumber}, registered on ${SITE.registered}.` },
  { q: "Who does the foundation help?", a: "Widows, orphans, single fathers and single mothers, older people, and people who are sick and cannot afford care." },
  { q: "What programs does the foundation run?", a: "Educational sponsorship, critical healthcare assistance, vocational skill acquisition, micro-business empowerment, widows' support, single parents empowerment and care for the elderly." },
  { q: "Where is the foundation based?", a: `The registered office is at ${SITE.address.street}, ${SITE.address.city}, ${SITE.address.state}, ${SITE.address.country}. There is also a contact address in Lagos: ${SITE.lagosOffice}.` },
  { q: "How can I donate to the foundation from outside Nigeria?", a: "Use the donate page and choose Nigerian naira, US dollars, British pounds or euros. Payment is processed by Flutterwave's secure checkout, and you can pay by card, bank transfer or other available methods." },
  { q: "Will I receive a receipt for my donation?", a: "Yes. As soon as your payment is confirmed, a receipt with a unique receipt number is emailed to the address you gave. You can also print a receipt from the confirmation page." },
  { q: "Can I choose where my donation goes?", a: "Yes. You can direct your gift to education, healthcare, skills training, micro-business support, widows, single parents or elderly care, or choose 'where needed most'." },
  { q: "How can I volunteer with the foundation?", a: "Fill in the form on the volunteer page with the area where you would like to help. Volunteers in the diaspora are welcome." },
  { q: "How do I contact the foundation?", a: `Email ${SITE.email}, call ${SITE.phone}, or use the contact form on the website.` },
];
