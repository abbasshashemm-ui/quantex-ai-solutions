/**
 * Copy for the illustrated interfaces on service pages. These are drawings with
 * sample data, not client work, and each one is labelled as such on the page.
 */

type Locale = "en" | "ar" | "fr";

export type MockCopy = {
  /** Small label above the frame, e.g. "Illustration · sample data". */
  label: string;
  heading: string;
  assistant: {
    frame: string;
    name: string;
    status: string;
    messages: { from: "in" | "out"; text: string }[];
    handover: string;
    knowsTitle: string;
    knows: string[];
    handoverTitle: string;
    handoverText: string;
  };
  automation: {
    frame: string;
    triggerLabel: string;
    trigger: string;
    steps: string[];
    done: string;
    logTitle: string;
    log: { time: string; text: string }[];
    saved: string;
  };
  seo: {
    frame: string;
    scoreLabel: string;
    score: string;
    trendLabel: string;
    tableTitle: string;
    rows: { keyword: string; position: string; change: string }[];
    aiTitle: string;
    ai: { name: string; mentioned: boolean }[];
    mentioned: string;
    notYet: string;
  };
  system: {
    frame: string;
    channelsLabel: string;
    channels: string[];
    core: string;
    coreNote: string;
    servicesLabel: string;
    services: string[];
    phasesTitle: string;
    phases: string[];
  };
};

const EN: MockCopy = {
  label: "Illustration · sample data",
  heading: "What it looks like",
  assistant: {
    frame: "Assistant · WhatsApp",
    name: "Your business",
    status: "Assistant online",
    messages: [
      { from: "in", text: "Do you deliver to Jounieh?" },
      { from: "out", text: "Yes, within 24 hours. Delivery is $3, free over $50." },
      { from: "in", text: "Can I pay on delivery?" },
      { from: "out", text: "Yes, cash or card. Shall I take your order?" },
      { from: "in", text: "I need to change an order I already placed." },
    ],
    handover: "Handed to Maya, with the full conversation",
    knowsTitle: "Answers from your information",
    knows: ["Delivery areas and fees", "Prices and stock", "Opening hours", "Return policy"],
    handoverTitle: "Hands over when needed",
    handoverText: "Order changes, complaints and anything it is unsure about go to a person.",
  },
  automation: {
    frame: "Workflow · New order",
    triggerLabel: "When",
    trigger: "A new order arrives on WhatsApp",
    steps: ["Create the invoice", "Update the stock sheet", "Message the delivery team", "Send the customer a confirmation"],
    done: "Done",
    logTitle: "Today",
    log: [
      { time: "09:12", text: "Order 1042 · 4 steps · 6 seconds" },
      { time: "09:40", text: "Order 1043 · 4 steps · 5 seconds" },
      { time: "10:05", text: "Order 1044 · 4 steps · 7 seconds" },
      { time: "10:31", text: "Order 1045 · 4 steps · 6 seconds" },
    ],
    saved: "About 12 minutes saved per order",
  },
  seo: {
    frame: "Search visibility · Monthly report",
    scoreLabel: "Visibility score",
    score: "86",
    trendLabel: "Search visits, last 8 weeks",
    tableTitle: "Tracked searches",
    rows: [
      { keyword: "dentist in Achrafieh", position: "2", change: "+5" },
      { keyword: "teeth whitening Beirut", position: "4", change: "+3" },
      { keyword: "emergency dentist near me", position: "6", change: "+8" },
    ],
    aiTitle: "AI search",
    ai: [
      { name: "ChatGPT", mentioned: true },
      { name: "Gemini", mentioned: true },
      { name: "Perplexity", mentioned: false },
    ],
    mentioned: "Mentions you",
    notYet: "Not yet",
  },
  system: {
    frame: "System plan · Overview",
    channelsLabel: "Where customers reach you",
    channels: ["Website", "WhatsApp", "Assistant"],
    core: "Your core system",
    coreNote: "One place for orders, customers and stock",
    servicesLabel: "What it connects to",
    services: ["Database", "Payments", "Reports"],
    phasesTitle: "Built in stages",
    phases: ["Map what exists", "Build the core", "Connect the tools", "Grow"],
  },
};

const AR: MockCopy = {
  label: "رسم توضيحي · بيانات تجريبية",
  heading: "كيف يبدو ذلك",
  assistant: {
    frame: "المساعد · واتساب",
    name: "شركتك",
    status: "المساعد متصل",
    messages: [
      { from: "in", text: "هل توصلون إلى جونيه؟" },
      { from: "out", text: "نعم، خلال 24 ساعة. التوصيل 3 دولارات، ومجاني للطلبات فوق 50 دولاراً." },
      { from: "in", text: "هل أستطيع الدفع عند الاستلام؟" },
      { from: "out", text: "نعم، نقداً أو بالبطاقة. هل أسجل طلبك؟" },
      { from: "in", text: "أريد تعديل طلب سبق أن أرسلته." },
    ],
    handover: "تم التحويل إلى مايا مع كامل المحادثة",
    knowsTitle: "يجيب من معلوماتك",
    knows: ["مناطق التوصيل ورسومه", "الأسعار والمخزون", "ساعات العمل", "سياسة الإرجاع"],
    handoverTitle: "يحوّل إلى شخص عند الحاجة",
    handoverText: "تعديل الطلبات والشكاوى وكل ما لا يتأكد منه يذهب إلى موظف.",
  },
  automation: {
    frame: "سير العمل · طلب جديد",
    triggerLabel: "عندما",
    trigger: "يصل طلب جديد على واتساب",
    steps: ["إنشاء الفاتورة", "تحديث جدول المخزون", "إبلاغ فريق التوصيل", "إرسال تأكيد للعميل"],
    done: "تم",
    logTitle: "اليوم",
    log: [
      { time: "09:12", text: "طلب 1042 · 4 خطوات · 6 ثوانٍ" },
      { time: "09:40", text: "طلب 1043 · 4 خطوات · 5 ثوانٍ" },
      { time: "10:05", text: "طلب 1044 · 4 خطوات · 7 ثوانٍ" },
      { time: "10:31", text: "طلب 1045 · 4 خطوات · 6 ثوانٍ" },
    ],
    saved: "توفير نحو 12 دقيقة لكل طلب",
  },
  seo: {
    frame: "الظهور في البحث · تقرير شهري",
    scoreLabel: "درجة الظهور",
    score: "86",
    trendLabel: "زيارات البحث، آخر 8 أسابيع",
    tableTitle: "عمليات البحث المتابَعة",
    rows: [
      { keyword: "طبيب أسنان في الأشرفية", position: "2", change: "+5" },
      { keyword: "تبييض الأسنان بيروت", position: "4", change: "+3" },
      { keyword: "طبيب أسنان طوارئ قريب", position: "6", change: "+8" },
    ],
    aiTitle: "بحث الذكاء الاصطناعي",
    ai: [
      { name: "ChatGPT", mentioned: true },
      { name: "Gemini", mentioned: true },
      { name: "Perplexity", mentioned: false },
    ],
    mentioned: "يذكرك",
    notYet: "ليس بعد",
  },
  system: {
    frame: "خطة النظام · نظرة عامة",
    channelsLabel: "أين يصل إليك العملاء",
    channels: ["الموقع", "واتساب", "المساعد"],
    core: "نظامك الأساسي",
    coreNote: "مكان واحد للطلبات والعملاء والمخزون",
    servicesLabel: "ما يرتبط به",
    services: ["قاعدة البيانات", "المدفوعات", "التقارير"],
    phasesTitle: "يُبنى على مراحل",
    phases: ["حصر الموجود", "بناء الأساس", "ربط الأدوات", "التوسع"],
  },
};

const FR: MockCopy = {
  label: "Illustration · données d'exemple",
  heading: "À quoi cela ressemble",
  assistant: {
    frame: "Assistant · WhatsApp",
    name: "Votre entreprise",
    status: "Assistant en ligne",
    messages: [
      { from: "in", text: "Livrez-vous à Jounieh ?" },
      { from: "out", text: "Oui, sous 24 heures. Livraison à 3 $, gratuite dès 50 $." },
      { from: "in", text: "Puis-je payer à la livraison ?" },
      { from: "out", text: "Oui, en espèces ou par carte. Je prends votre commande ?" },
      { from: "in", text: "Je dois modifier une commande déjà passée." },
    ],
    handover: "Transmis à Maya, avec toute la conversation",
    knowsTitle: "Répond à partir de vos informations",
    knows: ["Zones et frais de livraison", "Prix et stock", "Horaires d'ouverture", "Politique de retour"],
    handoverTitle: "Passe la main si nécessaire",
    handoverText: "Modifications de commande, réclamations et tout doute vont à une personne.",
  },
  automation: {
    frame: "Processus · Nouvelle commande",
    triggerLabel: "Quand",
    trigger: "Une commande arrive sur WhatsApp",
    steps: ["Créer la facture", "Mettre à jour le stock", "Prévenir l'équipe de livraison", "Envoyer une confirmation au client"],
    done: "Fait",
    logTitle: "Aujourd'hui",
    log: [
      { time: "09:12", text: "Commande 1042 · 4 étapes · 6 secondes" },
      { time: "09:40", text: "Commande 1043 · 4 étapes · 5 secondes" },
      { time: "10:05", text: "Commande 1044 · 4 étapes · 7 secondes" },
      { time: "10:31", text: "Commande 1045 · 4 étapes · 6 secondes" },
    ],
    saved: "Environ 12 minutes gagnées par commande",
  },
  seo: {
    frame: "Visibilité · Rapport mensuel",
    scoreLabel: "Score de visibilité",
    score: "86",
    trendLabel: "Visites depuis la recherche, 8 dernières semaines",
    tableTitle: "Recherches suivies",
    rows: [
      { keyword: "dentiste à Achrafieh", position: "2", change: "+5" },
      { keyword: "blanchiment dentaire Beyrouth", position: "4", change: "+3" },
      { keyword: "dentiste d'urgence près de moi", position: "6", change: "+8" },
    ],
    aiTitle: "Recherche IA",
    ai: [
      { name: "ChatGPT", mentioned: true },
      { name: "Gemini", mentioned: true },
      { name: "Perplexity", mentioned: false },
    ],
    mentioned: "Vous cite",
    notYet: "Pas encore",
  },
  system: {
    frame: "Plan du système · Vue d'ensemble",
    channelsLabel: "Où vos clients vous joignent",
    channels: ["Site web", "WhatsApp", "Assistant"],
    core: "Votre système central",
    coreNote: "Un seul endroit pour commandes, clients et stock",
    servicesLabel: "Ce à quoi il est relié",
    services: ["Base de données", "Paiements", "Rapports"],
    phasesTitle: "Construit par étapes",
    phases: ["Cartographier l'existant", "Construire le socle", "Relier les outils", "Grandir"],
  },
};

export const MOCK_COPY: Record<Locale, MockCopy> = { en: EN, ar: AR, fr: FR };

export type MockKind = "assistant" | "automation" | "seo" | "system";

/** Which illustration each service page shows, by service slug. */
export const SERVICE_MOCKS: Record<string, MockKind> = {
  "custom-intelligent-chatbots": "assistant",
  "business-process-automation": "automation",
  seo: "seo",
  "custom-system-architectures": "system",
};
