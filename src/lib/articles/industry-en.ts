import type { Article } from "./types";

const DATE = { datePublished: "2026-10-07", dateModified: "2026-10-07", displayDate: "October 7, 2026" } as const;

export const INDUSTRY_ARTICLES_EN: Article[] = [
  {
    slug: "ai-for-restaurants-lebanon",
    title: "AI for Restaurants in Lebanon: What Actually Works",
    seoTitle: "AI for Restaurants in Lebanon: What Actually Works (2026)",
    description:
      "How restaurants and cafés in Lebanon can use AI: answering reservation and menu questions on WhatsApp in Arabic, French and English, taking orders, and saving staff time.",
    summary:
      "A restaurant gets the same questions all day: are you open, do you have a table tonight, what is on the menu, do you deliver. An AI assistant on WhatsApp and your website can answer these at any hour, in the customer's language, and pass the rest to your team. This guide explains where AI helps a restaurant in Lebanon, what to keep human, and how to start small.",
    readingTime: "6 min read",
    keywords: ["AI for restaurants Lebanon", "restaurant chatbot Lebanon", "WhatsApp ordering Lebanon", "AI Beirut restaurants"],
    ...DATE,
    sections: [
      {
        id: "the-problem",
        heading: "Why do restaurants lose time and orders to messages?",
        paragraphs: [
          "In Lebanon, customers ask restaurants everything on WhatsApp and Instagram: opening hours, the menu, prices, delivery areas, whether you can fit a table of eight on Friday. Someone has to answer, often in the middle of service, and a message left for an hour is often a customer lost to the place that replied first.",
          "Most of these questions have the same answers every day. That is exactly the kind of work an AI assistant handles well.",
        ],
      },
      {
        id: "where-ai-helps",
        heading: "Where can AI help a restaurant?",
        paragraphs: [],
        list: [
          { title: "Menu, hours and location questions", body: "The assistant answers from your real menu, prices, hours, address and delivery areas, so staff stop retyping the same replies." },
          { title: "Reservation requests", body: "It collects the date, time, party size and name, checks them against the rules you set, and passes a clean request to your team to confirm." },
          { title: "Taking orders", body: "For takeaway and delivery, it can guide the customer through choosing items, collect the address and phone number, and hand a complete order to the kitchen or your system." },
          { title: "Replying in the customer's language", body: "Customers write in Arabic, French, English, or Arabic in Latin letters. The assistant follows whichever they use." },
          { title: "After-hours coverage", body: "Messages sent at night get an immediate answer, so the customer is not waiting until you open." },
          { title: "Reminders and follow-ups", body: "Booking reminders reduce no-shows, and a short thank-you or feedback request after a visit costs you no staff time." },
        ],
      },
      {
        id: "keep-human",
        heading: "What should stay human?",
        paragraphs: [
          "Complaints, allergy and dietary questions, large events, and anything unusual should reach a person quickly. The assistant should say plainly when it is not sure, rather than guessing. For allergens in particular, it should only repeat what you have confirmed in writing and point the customer to staff.",
        ],
      },
      {
        id: "how-to-start",
        heading: "How should a restaurant start?",
        paragraphs: ["Start with one thing, not a full system:"],
        list: [
          { title: "1. Collect your top questions", body: "Scroll your last month of messages. The ten most common questions are your starting material." },
          { title: "2. Write the answers down", body: "Menu, prices, hours, delivery areas, reservation rules, cancellation policy. The assistant is only as accurate as what you give it." },
          { title: "3. Launch on one channel", body: "WhatsApp is the usual first choice. Add your website and Instagram later." },
          { title: "4. Read the conversations", body: "For the first weeks, read what customers actually asked and fix any gaps or wrong answers." },
        ],
      },
      {
        id: "mistakes",
        heading: "What mistakes should restaurants avoid?",
        paragraphs: [],
        list: [
          { title: "Out-of-date menus and prices", body: "If prices change, the assistant must be updated the same day. Decide who owns this before launch." },
          { title: "Promising what the kitchen cannot do", body: "Agree clear rules for reservations and order cut-off times, so the assistant never over-promises." },
          { title: "No way to reach a person", body: "Always give customers an easy route to a human for problems." },
        ],
      },
      {
        id: "next-step",
        heading: "What is the next step?",
        paragraphs: [
          "Quantex builds WhatsApp and website assistants for businesses in Lebanon and worldwide, trained on your own information. If you run a restaurant or café and want to see what this would look like for you, message us and you will get a reply from the founder within 24 hours.",
        ],
      },
    ],
    faq: [
      { question: "Can an AI chatbot take restaurant orders on WhatsApp?", answer: "Yes. It can guide the customer through the menu, collect the order, address and phone number, and pass a complete order to your team. Many restaurants start with menu and reservation questions and add ordering later." },
      { question: "Will it understand Arabic written in Latin letters?", answer: "A well-built assistant is tested on real customer messages, including mixed languages and Arabic in Latin letters, before it goes live." },
      { question: "Does a small café need this?", answer: "Small teams often benefit most, because the owner or one staff member is usually the person answering messages." },
    ],
  },
  {
    slug: "ai-for-clinics-lebanon",
    title: "AI for Clinics in Lebanon: Appointments, Questions and Reminders",
    seoTitle: "AI for Clinics in Lebanon: Appointments and Patient Questions (2026)",
    description:
      "How clinics and medical practices in Lebanon can use AI for appointment requests, patient questions and reminders on WhatsApp, safely and without replacing clinical judgment.",
    summary:
      "Clinic receptionists spend much of their day on repeat questions and appointment logistics. AI can handle the routine parts: opening hours, directions, preparation instructions, appointment requests and reminders. It should never diagnose or give medical advice. This guide explains what is safe to automate in a clinic in Lebanon, what must stay with your staff, and how to protect patient privacy.",
    readingTime: "6 min read",
    keywords: ["AI for clinics Lebanon", "clinic appointment chatbot Lebanon", "healthcare AI Lebanon", "WhatsApp appointment booking Lebanon"],
    ...DATE,
    sections: [
      {
        id: "the-problem",
        heading: "Where does a clinic's reception time go?",
        paragraphs: [
          "Phone calls and WhatsApp messages about appointments, prices, insurance questions, opening hours and how to prepare for a visit fill a receptionist's day. When the phone is busy, patients give up or call a competitor.",
          "Much of this is routine, and routine is where AI can help, as long as the boundaries are clear.",
        ],
      },
      {
        id: "where-ai-helps",
        heading: "What can AI safely do in a clinic?",
        paragraphs: [],
        list: [
          { title: "Answer practical questions", body: "Opening hours, location and parking, which doctors work on which days, accepted payment methods, and how to prepare for common visits, all from information you approve." },
          { title: "Collect appointment requests", body: "The assistant gathers the patient's name, preferred times and the reason for the visit in general terms, then passes a clean request to your receptionist to confirm." },
          { title: "Send reminders", body: "Appointment reminders and preparation instructions reduce no-shows and the calls that come with them." },
          { title: "Handle languages", body: "Patients write in Arabic, French and English. The assistant replies in the language they used." },
          { title: "Route urgent cases", body: "Messages that suggest an emergency should immediately direct the patient to call you or emergency services, not wait in a queue." },
        ],
      },
      {
        id: "keep-human",
        heading: "What must stay with your staff and doctors?",
        paragraphs: [
          "An assistant must not diagnose, interpret symptoms or test results, recommend treatment, or change medication advice. It should say clearly that it cannot give medical advice and offer to connect the patient with the clinic. Exceptions, sensitive cases and anything clinical belong to your team.",
        ],
      },
      {
        id: "privacy",
        heading: "How do you protect patient privacy?",
        paragraphs: [
          "Health information is sensitive. Decide up front what the assistant is allowed to collect, keep it to the minimum needed for scheduling, and avoid asking for detailed medical history in chat. Know where the data is stored and who can access it, and make sure you can delete it. Check the requirements that apply to your practice before launch.",
        ],
      },
      {
        id: "how-to-start",
        heading: "How should a clinic start?",
        paragraphs: [],
        list: [
          { title: "1. Pick the routine questions", body: "List what reception answers every day and approve the wording." },
          { title: "2. Start with information only", body: "Launch with answers and appointment requests. Add reminders once that works." },
          { title: "3. Set the red lines", body: "Write down what the assistant must never answer and where it must hand over." },
          { title: "4. Review conversations", body: "Read real chats in the first weeks and tighten anything unclear." },
        ],
      },
      {
        id: "next-step",
        heading: "What is the next step?",
        paragraphs: [
          "Quantex builds assistants for businesses in Lebanon and worldwide, trained only on information you provide and designed to hand over to a person. If you run a clinic and want to explore a safe first version, message us and you will get a reply from the founder within 24 hours.",
        ],
      },
    ],
    faq: [
      { question: "Can an AI chatbot give medical advice?", answer: "It should not. A clinic assistant should handle practical questions and appointment logistics, say clearly that it cannot give medical advice, and hand clinical questions to your staff." },
      { question: "Can it book appointments directly?", answer: "It can collect the request and, if connected to your calendar, propose available slots. Many clinics start by having reception confirm each request." },
      { question: "Is patient data safe?", answer: "It depends on how the system is built. Collect only what scheduling needs, know where data is stored and who can access it, and be able to delete it." },
    ],
  },
  {
    slug: "ai-for-real-estate-lebanon",
    title: "AI for Real Estate Agencies in Lebanon: Faster Replies, Better Leads",
    seoTitle: "AI for Real Estate Agencies in Lebanon: Leads and Replies (2026)",
    description:
      "How real estate agencies in Lebanon can use AI to answer property enquiries on WhatsApp, qualify leads, book viewings and follow up, in Arabic, French and English.",
    summary:
      "Property enquiries arrive at all hours and the first agent to reply often wins the viewing. AI can answer first questions instantly, ask the right qualifying questions, and pass a clear lead summary to the agent. This guide explains how real estate agencies in Lebanon can use AI to respond faster, waste less time on unqualified enquiries, and keep the human relationship where it matters.",
    readingTime: "6 min read",
    keywords: ["AI for real estate Lebanon", "real estate chatbot Lebanon", "property leads WhatsApp Lebanon", "real estate automation Beirut"],
    ...DATE,
    sections: [
      {
        id: "the-problem",
        heading: "Why does speed matter so much in real estate?",
        paragraphs: [
          "Buyers and renters message several agencies about the same listing. The one that replies first, with useful information, usually gets the conversation. Agents cannot answer instantly at night, during viewings or on weekends, and enquiries that sit unanswered cool quickly.",
          "Agents also spend a lot of time on questions already answered in the listing, and on enquiries from people who are not ready or not a fit.",
        ],
      },
      {
        id: "where-ai-helps",
        heading: "Where can AI help an agency?",
        paragraphs: [],
        list: [
          { title: "Instant first replies", body: "The assistant answers common questions about a listing from the details you provide: price, size, location, availability, what is included." },
          { title: "Lead qualification", body: "It asks a few useful questions: buy or rent, budget range, preferred area, timeline, and collects contact details." },
          { title: "Clean hand-over to the agent", body: "The agent receives a short summary of who the person is and what they want, instead of a long chat to read." },
          { title: "Viewing requests", body: "It collects preferred times and passes them to the right agent to confirm." },
          { title: "Follow-up", body: "Leads who went quiet can receive a polite follow-up, so fewer enquiries are forgotten." },
          { title: "Multiple languages", body: "Clients write in Arabic, French and English, including buyers abroad. The assistant answers in their language." },
        ],
      },
      {
        id: "keep-human",
        heading: "What should stay with your agents?",
        paragraphs: [
          "Negotiation, pricing advice, viewings, legal and contract questions, and the relationship itself belong to your team. The assistant should not promise a price, a discount or availability that you have not confirmed, and should say when it does not know.",
        ],
      },
      {
        id: "listing-data",
        heading: "Why does the listing information matter so much?",
        paragraphs: [
          "The assistant is only as good as the information behind it. Keep listings accurate and up to date: sold or rented properties should be marked immediately, and prices and details should match your site. Decide who updates this and how, before launch.",
        ],
      },
      {
        id: "how-to-start",
        heading: "How should an agency start?",
        paragraphs: [],
        list: [
          { title: "1. Start with one channel", body: "WhatsApp or your website chat, whichever receives most enquiries." },
          { title: "2. Define the qualifying questions", body: "Agree with your agents which three or four questions matter most." },
          { title: "3. Connect the hand-over", body: "Decide how leads reach the agent: a WhatsApp message, email or your CRM." },
          { title: "4. Review and refine", body: "Read the first weeks of conversations and adjust the questions and answers." },
        ],
      },
      {
        id: "next-step",
        heading: "What is the next step?",
        paragraphs: [
          "Quantex builds assistants and lead tools for businesses in Lebanon and worldwide. If you run a real estate agency and want to reply faster without hiring more people, message us and you will get a reply from the founder within 24 hours.",
        ],
      },
    ],
    faq: [
      { question: "Can AI answer property enquiries on WhatsApp?", answer: "Yes. It can answer common questions about a listing from your approved details, ask qualifying questions, and pass a summary to the agent." },
      { question: "Will it replace my agents?", answer: "No. It handles the first reply and basic questions so agents spend their time on viewings, negotiation and relationships." },
      { question: "Can it handle clients abroad?", answer: "Yes. It works around the clock and replies in Arabic, French or English, which suits buyers in different time zones." },
    ],
  },
];
