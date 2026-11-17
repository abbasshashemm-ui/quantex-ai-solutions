/**
 * What the home page shows once a visitor says what their business does.
 * Matching is a keyword lookup that runs in the browser: no request is sent
 * and nothing is stored beyond the visitor's own tab. Prices mirror
 * src/lib/pricing/data.ts and must be kept in step with it.
 */

export type ProfileId =
  | "restaurant"
  | "clinic"
  | "real-estate"
  | "shop"
  | "services"
  | "general";

export type ProfileStep = {
  title: string;
  detail: string;
  price: string;
  href: string;
};

export type Profile = {
  id: ProfileId;
  /** Shown on the quick-pick button. */
  pick: string;
  /** Fits "For {noun}, start here" and "How it would work for {noun}". */
  noun: string;
  /** Any of these in the visitor's answer selects this profile. */
  keywords: string[];
  steps: [ProfileStep, ProfileStep, ProfileStep];
  /** A sample exchange between a customer ("in") and the assistant ("out"). */
  chat: { from: "in" | "out"; text: string }[];
  /** Where the assistant stops and a person takes over. */
  handover: string;
  outcomes: [string, string, string];
  /** Opening line for the WhatsApp message. */
  whatsapp: string;
  /** The name at the top of the sample conversation. */
  chatName: string;
  /** Header button text once this is the visitor's answer; null keeps the default. */
  cta: string | null;
  /** The closing line of the home page. */
  closing: string;
  /** Service slugs in the order they matter to this kind of business. */
  services: string[];
  /** The guide to show first, when there is one for this kind of business. */
  guide: string | null;
  /** The shape the hero sculpture settles into for this answer. */
  pose: { open: number; twist: number; turn: number };
};

const WEBSITE = "/services/high-converting-websites";
const ASSISTANT = "/services/custom-intelligent-chatbots";
const SEO = "/services/seo";
const AUTOMATION = "/services/business-process-automation";

export const PROFILES: Profile[] = [
  {
    id: "restaurant",
    pick: "Restaurant",
    noun: "a restaurant",
    keywords: [
      "restaurant", "resto", "cafe", "café", "coffee", "bakery", "bar", "pub",
      "diner", "kitchen", "catering", "food", "pizza", "burger", "sushi",
      "shawarma", "snack", "patisserie", "pâtisserie", "boulangerie",
      "مطعم", "مقهى", "كافيه", "مخبز", "حلويات", "فرن",
    ],
    steps: [
      {
        title: "An assistant on WhatsApp",
        detail: "Takes reservations and answers menu questions at any hour",
        price: "From $250 a month, plus setup",
        href: ASSISTANT,
      },
      {
        title: "A site with your menu and hours",
        detail: "Loads fast on a phone and shows up on Google Maps searches",
        price: "From $700",
        href: WEBSITE,
      },
      {
        title: "Guide: AI for restaurants in Lebanon",
        detail: "What works, what it costs and where to start",
        price: "Free read",
        href: "/insights/ai-for-restaurants-lebanon",
      },
    ],
    chat: [
      { from: "in", text: "Do you have a table for six tonight?" },
      { from: "out", text: "Yes, at 8:30 or 9:15. Which suits you?" },
      { from: "in", text: "8:30. Is there anything vegetarian?" },
      { from: "out", text: "Four mains. I've sent the menu. You're booked for 8:30." },
      { from: "in", text: "One of us has a nut allergy." },
    ],
    handover: "Passed to the manager, with the booking and the conversation",
    outcomes: [
      "Reservations taken while the kitchen is busy",
      "Menu, hours and location answered without a phone call",
      "Allergy and complaint messages go straight to a person",
    ],
    whatsapp: "Hi, I run a restaurant and want to talk about a website and an assistant.",
    chatName: "Your restaurant",
    cta: "Start your restaurant project",
    closing: "Tell us about your restaurant",
    services: [
      "custom-intelligent-chatbots",
      "high-converting-websites",
      "seo",
      "business-process-automation",
      "custom-software-development",
      "custom-system-architectures",
    ],
    guide: "/insights/ai-for-restaurants-lebanon",
    pose: { open: 0.22, twist: 0.18, turn: 0.5 },
  },
  {
    id: "clinic",
    pick: "Clinic",
    noun: "a clinic",
    keywords: [
      "clinic", "clinique", "dentist", "dental", "dentiste", "doctor",
      "docteur", "médecin", "medecin", "medical", "physio", "dermatolog",
      "pharmacy", "pharmacie", "hospital", "therapist", "optician", "vet",
      "عيادة", "طبيب", "دكتور", "أسنان", "صيدلية", "مستشفى",
    ],
    steps: [
      {
        title: "An assistant that books appointments",
        detail: "Answers on your site and WhatsApp, and never gives medical advice",
        price: "From $250 a month, plus setup",
        href: ASSISTANT,
      },
      {
        title: "A site patients can find",
        detail: "Services, doctors and hours, set up to rank for local searches",
        price: "From $700",
        href: WEBSITE,
      },
      {
        title: "Guide: AI for clinics in Lebanon",
        detail: "Appointments, patient questions and reminders, done safely",
        price: "Free read",
        href: "/insights/ai-for-clinics-lebanon",
      },
    ],
    chat: [
      { from: "in", text: "Can I see the dentist this week?" },
      { from: "out", text: "Thursday at 4:00 or Saturday at 10:30. Which one?" },
      { from: "in", text: "Thursday. How much is a check-up?" },
      { from: "out", text: "$30, including X-rays if needed. You're booked for Thursday at 4:00." },
      { from: "in", text: "My tooth still hurts after the filling. Is that normal?" },
    ],
    handover: "Not answered by the assistant. The clinic is asked to call today",
    outcomes: [
      "Appointments booked outside opening hours",
      "Prices, hours and directions answered at once",
      "Anything medical is handed to your staff, every time",
    ],
    whatsapp: "Hi, I run a clinic and want to talk about a website and an assistant.",
    chatName: "Your clinic",
    cta: "Start your clinic project",
    closing: "Tell us about your clinic",
    services: [
      "custom-intelligent-chatbots",
      "high-converting-websites",
      "seo",
      "business-process-automation",
      "custom-software-development",
      "custom-system-architectures",
    ],
    guide: "/insights/ai-for-clinics-lebanon",
    pose: { open: 0.12, twist: 0.05, turn: -0.35 },
  },
  {
    id: "real-estate",
    pick: "Real estate",
    noun: "a real estate agency",
    keywords: [
      "real estate", "realestate", "property", "properties", "broker",
      "realtor", "apartment", "rental", "rent", "immobilier", "agence immobili",
      "developer", "housing", "عقار", "عقارات", "شقق", "وسيط", "إيجار",
    ],
    steps: [
      {
        title: "An assistant that qualifies leads",
        detail: "Answers listing questions and books viewings on WhatsApp",
        price: "From $250 a month, plus setup",
        href: ASSISTANT,
      },
      {
        title: "A site that brings enquiries",
        detail: "Listings you can edit yourself, in English and Arabic",
        price: "From $1,400",
        href: WEBSITE,
      },
      {
        title: "Guide: AI for real estate in Lebanon",
        detail: "Faster replies, better leads and follow-up that happens",
        price: "Free read",
        href: "/insights/ai-for-real-estate-lebanon",
      },
    ],
    chat: [
      { from: "in", text: "Is the two-bedroom in Achrafieh still available?" },
      { from: "out", text: "Yes. Third floor, $1,400 a month. Are you renting for yourself?" },
      { from: "in", text: "Yes, from next month." },
      { from: "out", text: "I can show it Thursday at 5:00 or Saturday at 11:00." },
      { from: "in", text: "Saturday. Can the price be negotiated?" },
    ],
    handover: "Passed to the agent, with the viewing and the budget",
    outcomes: [
      "Every enquiry answered in seconds, including at night",
      "Viewings booked with budget and move-in date already asked",
      "Negotiation and offers go straight to an agent",
    ],
    whatsapp: "Hi, I run a real estate agency and want to talk about a website and an assistant.",
    chatName: "Your agency",
    cta: "Start your agency project",
    closing: "Tell us about your agency",
    services: [
      "custom-intelligent-chatbots",
      "high-converting-websites",
      "seo",
      "business-process-automation",
      "custom-software-development",
      "custom-system-architectures",
    ],
    guide: "/insights/ai-for-real-estate-lebanon",
    pose: { open: 0.3, twist: 0.1, turn: 0.9 },
  },
  {
    id: "shop",
    pick: "Shop",
    noun: "a shop",
    keywords: [
      "shop", "store", "boutique", "retail", "ecommerce", "e-commerce",
      "online store", "sell", "selling", "products", "clothes", "clothing",
      "fashion", "jewel", "cosmetic", "furniture", "electronics", "magasin",
      "vente", "متجر", "محل", "بيع", "ملابس", "مجوهرات",
    ],
    steps: [
      {
        title: "An online store",
        detail: "Catalogue and checkout that work on a phone",
        price: "From $2,200",
        href: WEBSITE,
      },
      {
        title: "An assistant for orders",
        detail: "Answers stock, delivery and return questions on WhatsApp",
        price: "From $250 a month, plus setup",
        href: ASSISTANT,
      },
      {
        title: "Orders that file themselves",
        detail: "Invoice, stock sheet and delivery message from one order",
        price: "Quoted per project",
        href: AUTOMATION,
      },
    ],
    chat: [
      { from: "in", text: "Do you deliver to Jounieh?" },
      { from: "out", text: "Yes, within 24 hours. Delivery is $3, free over $50." },
      { from: "in", text: "Is the black one in size M in stock?" },
      { from: "out", text: "Two left. Shall I take your order?" },
      { from: "in", text: "I need to return something I bought last week." },
    ],
    handover: "Passed to your team, with the order and the conversation",
    outcomes: [
      "Stock, price and delivery questions answered at once",
      "Orders taken on WhatsApp without anyone typing them up",
      "Returns and complaints go straight to a person",
    ],
    whatsapp: "Hi, I run a shop and want to talk about an online store and an assistant.",
    chatName: "Your shop",
    cta: "Start your shop project",
    closing: "Tell us about your shop",
    services: [
      "high-converting-websites",
      "custom-intelligent-chatbots",
      "business-process-automation",
      "seo",
      "custom-software-development",
      "custom-system-architectures",
    ],
    guide: null,
    pose: { open: 0.26, twist: 0.3, turn: -0.7 },
  },
  {
    id: "services",
    pick: "Services",
    noun: "a service business",
    keywords: [
      "lawyer", "law firm", "avocat", "accountant", "comptable", "consult",
      "agency", "agence", "studio", "salon", "barber", "gym", "fitness",
      "coach", "school", "academy", "tutor", "training", "garage", "repair",
      "cleaning", "architect", "engineer", "contractor", "insurance", "travel",
      "hotel", "photograph", "freelance", "service",
      "محامي", "محاماة", "محاسب", "صالون", "نادي", "مدرسة", "معهد", "تأمين", "فندق",
    ],
    steps: [
      {
        title: "A site that brings leads",
        detail: "Says what you do in seconds, with one clear next step",
        price: "From $1,400",
        href: WEBSITE,
      },
      {
        title: "An assistant on your site",
        detail: "Answers first questions and books the call",
        price: "From $120 a month, plus setup",
        href: ASSISTANT,
      },
      {
        title: "Found on Google and in AI search",
        detail: "Monthly work so the right people find you",
        price: "From $250 a month",
        href: SEO,
      },
    ],
    chat: [
      { from: "in", text: "Do you take on small companies?" },
      { from: "out", text: "Yes, most of our clients have under 20 staff. What do you need help with?" },
      { from: "in", text: "Setting up monthly bookkeeping." },
      { from: "out", text: "We do that. A first call is free. Tomorrow at 11:00 or 3:00?" },
      { from: "in", text: "11:00. Can you send a quote first?" },
    ],
    handover: "Passed to you, with the request and the booked call",
    outcomes: [
      "First questions answered before you pick up the phone",
      "Calls booked into your calendar with the reason attached",
      "Quotes and anything unusual go straight to you",
    ],
    whatsapp: "Hi, I run a service business and want to talk about a website and an assistant.",
    chatName: "Your business",
    cta: null,
    closing: "Tell us about your business",
    services: [
      "high-converting-websites",
      "custom-intelligent-chatbots",
      "seo",
      "business-process-automation",
      "custom-software-development",
      "custom-system-architectures",
    ],
    guide: null,
    pose: { open: 0.16, twist: 0.22, turn: 0.25 },
  },
  {
    id: "general",
    pick: "Something else",
    noun: "your business",
    keywords: [],
    steps: [
      {
        title: "A site that brings enquiries",
        detail: "Fast, clear and built around one goal",
        price: "From $700",
        href: WEBSITE,
      },
      {
        title: "An assistant that answers customers",
        detail: "On your site and WhatsApp, trained on your own information",
        price: "From $120 a month, plus setup",
        href: ASSISTANT,
      },
      {
        title: "Guide: AI in Lebanon for businesses",
        detail: "Where to start, what it costs and the mistakes to avoid",
        price: "Free read",
        href: "/insights/ai-in-lebanon",
      },
    ],
    chat: [
      { from: "in", text: "Are you open on Sunday?" },
      { from: "out", text: "Yes, 10 to 6. Can I help with anything else?" },
      { from: "in", text: "How much is delivery?" },
      { from: "out", text: "$3, and free over $50. Shall I take your order?" },
      { from: "in", text: "I'd rather talk to someone." },
    ],
    handover: "Passed to your team, with the conversation so far",
    outcomes: [
      "Routine questions answered at once, day and night",
      "Requests collected with the details you need",
      "A person takes over whenever one is asked for",
    ],
    whatsapp: "Hi, I want to talk about a website and an assistant for my business.",
    chatName: "Your business",
    cta: null,
    closing: "Tell us what you need",
    services: [
      "high-converting-websites",
      "custom-intelligent-chatbots",
      "business-process-automation",
      "custom-software-development",
      "seo",
      "custom-system-architectures",
    ],
    guide: null,
    pose: { open: 0.1, twist: 0.12, turn: 0.15 },
  },
];

export const QUICK_PICKS = PROFILES.map(({ id, pick }) => ({ id, pick }));

export function getProfile(id: ProfileId): Profile {
  return PROFILES.find((profile) => profile.id === id) ?? PROFILES[PROFILES.length - 1];
}

/** Picks the profile whose keywords best match a free-text answer. */
export function matchProfile(answer: string): ProfileId {
  const text = answer.toLowerCase();
  let best: ProfileId = "general";
  let bestScore = 0;
  for (const profile of PROFILES) {
    let score = 0;
    for (const keyword of profile.keywords) {
      // Longer keywords are more specific, so they count for more.
      if (text.includes(keyword)) score += keyword.length;
    }
    if (score > bestScore) {
      bestScore = score;
      best = profile.id;
    }
  }
  return best;
}
