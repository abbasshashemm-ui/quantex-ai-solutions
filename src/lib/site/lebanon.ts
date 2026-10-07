import type { FaqItem } from "@/lib/seo/faq";

export const LEBANON_PATH = { en: "/ai-solutions-lebanon", ar: "/ar/ai-solutions-lebanon" } as const;

export type LebanonContent = {
  seoTitle: string;
  description: string;
  keywords: string[];
  schemaName: string;
  eyebrow: string;
  title: string;
  lead: string;
  answer: { question: string; answer: string };
  services: { eyebrow: string; title: string; items: { title: string; body: string; href: string }[]; more: string };
  cities: { eyebrow: string; title: string; body: string; list: string[]; note: string };
  fit: { eyebrow: string; title: string; items: { title: string; body: string }[] };
  industries: { eyebrow: string; title: string; items: { label: string; href: string }[] };
  steps: { eyebrow: string; title: string; items: { label: string; detail: string }[] };
  cost: { eyebrow: string; title: string; body: string; guideLabel: string };
  faq: FaqItem[];
  faqHeading: string;
  cta: { title: string; lead: string; start: string; whatsapp: string };
  ui: { home: string; other: string; learn: string; guide: string; faqEyebrow: string };
};

export const LEBANON_EN: LebanonContent = {
  seoTitle: "AI Solutions in Lebanon: Chatbots, Automation and Custom AI",
  description:
    "AI solutions in Lebanon from Quantex, a Beirut studio: AI chatbots on WhatsApp and your website in Arabic, French and English, business automation and custom AI software for companies across Lebanon.",
  keywords: [
    "AI solutions Lebanon",
    "AI company Lebanon",
    "AI development company Lebanon",
    "AI chatbot Lebanon",
    "AI automation Lebanon",
    "AI customer service Lebanon",
    "AI agents Lebanon",
    "AI solutions Beirut",
  ],
  schemaName: "AI solutions in Lebanon",
  eyebrow: "AI solutions in Lebanon",
  title: "AI solutions in Lebanon, built by a Beirut studio.",
  lead: "Quantex builds AI assistants, automation and custom software for businesses across Lebanon: from Beirut and Tripoli to Jounieh, Sidon and Zahle. Everything works in Arabic, French and English, on WhatsApp and your website, and is trained on your own information.",
  answer: {
    question: "Who builds AI solutions in Lebanon?",
    answer:
      "Lebanon has local software houses, agencies and independent studios that build AI solutions: chatbots, AI agents, automation and custom software. Quantex is a Beirut studio founded in 2024 that builds AI assistants for WhatsApp and websites in Arabic, French and English, automates repetitive business work, and builds custom AI software. We work with businesses across Lebanon and abroad, and you speak directly with the founder.",
  },
  services: {
    eyebrow: "What we build",
    title: "What AI solutions can Quantex build for you in Lebanon?",
    items: [
      { title: "AI chatbots and assistants", body: "Customer support and sales assistants on WhatsApp and your website that answer from your own prices, policies and details, in Arabic, French and English.", href: "/services/custom-intelligent-chatbots" },
      { title: "AI agents and business automation", body: "Systems that read incoming messages and documents, decide what they are, and move them to the right place: quotes, orders, invoices, reports and follow-ups.", href: "/services/business-process-automation" },
      { title: "Custom AI software", body: "Internal tools and customer-facing products with AI built in, such as search across your documents or tools that draft replies for your team.", href: "/services/custom-software-development" },
      { title: "AI customer service automation", body: "Instant first replies, qualified leads handed to your team with a clear summary, and a quick route to a person whenever it matters.", href: "/services/custom-intelligent-chatbots" },
      { title: "Websites and AI search visibility", body: "Fast websites structured to be found on Google and in AI search such as ChatGPT, Gemini and Perplexity.", href: "/services/seo" },
      { title: "System design", body: "A plan for where AI saves you the most time and how the pieces connect, before anything is built.", href: "/services/custom-system-architectures" },
    ],
    more: "Learn more",
  },
  cities: {
    eyebrow: "Across Lebanon",
    title: "AI solutions for businesses in every region of Lebanon.",
    body: "Quantex is based in Beirut and delivers its work remotely, so distance is never a barrier. We work with businesses in:",
    list: ["Beirut", "Tripoli", "Jounieh", "Sidon", "Zahle", "Tyre", "Byblos (Jbeil)", "Batroun", "Aley", "Baalbek"],
    note: "Not in the list? We work with businesses in every part of Lebanon and in the Gulf, Europe and beyond.",
  },
  fit: {
    eyebrow: "Built for Lebanon",
    title: "Why does a local partner matter for AI?",
    items: [
      { title: "Arabic, French, English and Arabizi", body: "Customers switch languages mid-conversation and often write Arabic in Latin letters. We test assistants on real messages like these before they go live." },
      { title: "WhatsApp first", body: "Business in Lebanon runs on WhatsApp. We put AI where your customers already are, and connect it to your website, email and spreadsheets." },
      { title: "Lean teams and careful budgets", body: "We start with the one workflow that pays back fastest, launch it, and expand only when it earns its place." },
      { title: "Direct contact, your ownership", body: "You talk to the founder in Beirut, get a reply within 24 hours, and own your code, accounts and content." },
    ],
  },
  industries: {
    eyebrow: "Industries",
    title: "Guides for specific industries",
    items: [
      { label: "AI for restaurants in Lebanon", href: "/insights/ai-for-restaurants-lebanon" },
      { label: "AI for clinics in Lebanon", href: "/insights/ai-for-clinics-lebanon" },
      { label: "AI for real estate in Lebanon", href: "/insights/ai-for-real-estate-lebanon" },
      { label: "AI in Lebanon: a practical guide for businesses", href: "/insights/ai-in-lebanon" },
    ],
  },
  steps: {
    eyebrow: "How it works",
    title: "How does an AI project with Quantex work?",
    items: [
      { label: "Talk", detail: "A short call or WhatsApp chat about your business and where time is being lost." },
      { label: "Pick one workflow", detail: "We choose the use case with the clearest payoff and agree what success looks like." },
      { label: "Build and test", detail: "We build it on your own information and test the risky parts before customers see it." },
      { label: "Launch and improve", detail: "You go live, we watch real conversations and tune the system." },
    ],
  },
  cost: {
    eyebrow: "Cost",
    title: "How much do AI solutions cost in Lebanon?",
    body: "It depends on the scope. A focused assistant or a single automated workflow costs far less than a full custom platform, and most businesses should start with the former. Tell us what you need and we reply within 24 hours with options and a realistic first step. If you are comparing providers, our guide lists the questions worth asking.",
    guideLabel: "How to choose an AI solutions provider in Lebanon",
  },
  faqHeading: "AI solutions in Lebanon: common questions",
  faq: [
    { question: "Which companies provide AI solutions in Lebanon?", answer: "Lebanon has local software houses, agencies and independent studios that build AI solutions. Quantex is a Beirut studio that builds AI chatbots for WhatsApp and websites, business automation and custom AI software for businesses in Lebanon and worldwide." },
    { question: "Do your AI chatbots work in Arabic, French and English?", answer: "Yes. They understand and reply in all three, including customers who mix languages or write Arabic in Latin letters." },
    { question: "Can you connect AI to WhatsApp?", answer: "Yes. We build assistants for WhatsApp and your website, and connect them to your email, spreadsheets and other tools." },
    { question: "Do you work with businesses outside Beirut?", answer: "Yes. We are based in Beirut and work remotely with businesses across Lebanon, including Tripoli, Jounieh, Sidon and Zahle, and with companies abroad." },
    { question: "How much does an AI solution cost in Lebanon?", answer: "It depends on scope. A focused assistant or automation costs far less than a full custom platform. Contact us and we reply within 24 hours with options and a realistic first step." },
    { question: "How long does it take to launch?", answer: "A focused first version, such as a WhatsApp assistant or one automated workflow, can usually be live within weeks rather than months, depending on scope and how quickly we receive your information." },
    { question: "Will the AI make things up?", answer: "Our assistants answer only from the information you give them, say so when they do not know, and hand over to a person for sensitive matters. We test the risky answers before launch." },
    { question: "Do I own what you build?", answer: "Yes. Your code, domain, accounts and content are handed over to you." },
  ],
  cta: { title: "Ready to put AI to work in your Lebanese business?", lead: "Tell us what slows you down. We reply within 24 hours with where AI can help and a realistic first step.", start: "Start a project", whatsapp: "Message us on WhatsApp" },
  ui: { home: "← Home", other: "العربية", learn: "Learn more", guide: "Read our buyer's guide", faqEyebrow: "Questions" },
};

export const LEBANON_AR: LebanonContent = {
  seoTitle: "حلول الذكاء الاصطناعي في لبنان: روبوتات دردشة وأتمتة وأنظمة مخصصة",
  description:
    "حلول الذكاء الاصطناعي في لبنان من كوانتكس، استوديو في بيروت: روبوتات دردشة على واتساب وموقعك بالعربية والفرنسية والإنكليزية، وأتمتة الأعمال، وبرمجيات ذكاء اصطناعي مخصصة للشركات في أنحاء لبنان.",
  keywords: [
    "حلول الذكاء الاصطناعي لبنان",
    "شركة ذكاء اصطناعي في لبنان",
    "شركة تطوير ذكاء اصطناعي لبنان",
    "روبوت دردشة لبنان",
    "أتمتة الأعمال لبنان",
    "خدمة العملاء بالذكاء الاصطناعي لبنان",
    "وكلاء الذكاء الاصطناعي لبنان",
    "الذكاء الاصطناعي بيروت",
  ],
  schemaName: "حلول الذكاء الاصطناعي في لبنان",
  eyebrow: "حلول الذكاء الاصطناعي في لبنان",
  title: "حلول الذكاء الاصطناعي في لبنان، من استوديو في بيروت.",
  lead: "تبني كوانتكس مساعدين أذكياء وأتمتة وبرمجيات مخصصة للشركات في أنحاء لبنان: من بيروت وطرابلس إلى جونية وصيدا وزحلة. كل شيء يعمل بالعربية والفرنسية والإنكليزية، على واتساب وموقعك، ومدرَّب على معلوماتك الخاصة.",
  answer: {
    question: "من يبني حلول الذكاء الاصطناعي في لبنان؟",
    answer:
      "في لبنان شركات برمجيات ووكالات واستوديوهات مستقلة تبني حلول الذكاء الاصطناعي: روبوتات الدردشة ووكلاء الذكاء الاصطناعي والأتمتة والبرمجيات المخصصة. كوانتكس استوديو في بيروت تأسس عام 2024، يبني مساعدين أذكياء لواتساب والمواقع بالعربية والفرنسية والإنكليزية، ويؤتمت العمل التجاري المتكرر، ويبني برمجيات ذكاء اصطناعي مخصصة. نعمل مع شركات في لبنان وخارجه، وتتحدث مباشرة مع المؤسس.",
  },
  services: {
    eyebrow: "ما نبنيه",
    title: "ما حلول الذكاء الاصطناعي التي تستطيع كوانتكس بناءها لك في لبنان؟",
    items: [
      { title: "روبوتات الدردشة والمساعدون الأذكياء", body: "مساعدون لخدمة العملاء والمبيعات على واتساب وموقعك يجيبون من أسعارك وسياساتك وتفاصيلك الخاصة، بالعربية والفرنسية والإنكليزية.", href: "/services/custom-intelligent-chatbots" },
      { title: "وكلاء الذكاء الاصطناعي وأتمتة الأعمال", body: "أنظمة تقرأ الرسائل والمستندات الواردة، وتحدد ماهيتها، وتوجّهها إلى المكان الصحيح: عروض الأسعار والطلبات والفواتير والتقارير والمتابعات.", href: "/services/business-process-automation" },
      { title: "برمجيات ذكاء اصطناعي مخصصة", body: "أدوات داخلية ومنتجات للعملاء مزوّدة بالذكاء الاصطناعي، مثل البحث في مستنداتك أو أدوات تصوغ ردوداً لفريقك.", href: "/services/custom-software-development" },
      { title: "أتمتة خدمة العملاء بالذكاء الاصطناعي", body: "ردود أولى فورية، وعملاء محتملون مؤهلون يُسلَّمون لفريقك بملخص واضح، وطريق سريع إلى شخص حقيقي عند الحاجة.", href: "/services/custom-intelligent-chatbots" },
      { title: "المواقع والظهور في البحث بالذكاء الاصطناعي", body: "مواقع سريعة مبنية ليجدها الناس في غوغل وفي البحث بالذكاء الاصطناعي مثل ChatGPT وGemini وPerplexity.", href: "/services/seo" },
      { title: "تصميم الأنظمة", body: "خطة لمواضع توفير الذكاء الاصطناعي أكبر قدر من الوقت وكيفية ترابط الأجزاء، قبل بناء أي شيء.", href: "/services/custom-system-architectures" },
    ],
    more: "اعرف المزيد",
  },
  cities: {
    eyebrow: "في أنحاء لبنان",
    title: "حلول ذكاء اصطناعي للشركات في كل مناطق لبنان.",
    body: "مقر كوانتكس في بيروت، ونسلّم عملنا عن بُعد، فالمسافة ليست عائقاً. نعمل مع شركات في:",
    list: ["بيروت", "طرابلس", "جونية", "صيدا", "زحلة", "صور", "جبيل", "البترون", "عاليه", "بعلبك"],
    note: "مدينتك ليست في القائمة؟ نعمل مع شركات في كل أنحاء لبنان وفي الخليج وأوروبا وغيرها.",
  },
  fit: {
    eyebrow: "مبني للبنان",
    title: "لماذا يهمّ شريك محلي في الذكاء الاصطناعي؟",
    items: [
      { title: "العربية والفرنسية والإنكليزية والعربيزي", body: "يبدّل العملاء لغتهم في منتصف المحادثة وكثيراً ما يكتبون العربية بحروف لاتينية. نختبر المساعدين على رسائل حقيقية كهذه قبل الإطلاق." },
      { title: "واتساب أولاً", body: "الأعمال في لبنان تجري على واتساب. نضع الذكاء الاصطناعي حيث يوجد عملاؤك أصلاً، ونربطه بموقعك وبريدك وجداولك." },
      { title: "فرق صغيرة وميزانيات حذرة", body: "نبدأ بمسار العمل الذي يعيد كلفته أسرع، ونطلقه، ثم نتوسع فقط عندما يستحق ذلك." },
      { title: "تواصل مباشر وملكية لك", body: "تتحدث مع المؤسس في بيروت، وتتلقى رداً خلال 24 ساعة، وتملك الشيفرة والحسابات والمحتوى." },
    ],
  },
  industries: {
    eyebrow: "القطاعات",
    title: "أدلة لقطاعات محددة",
    items: [
      { label: "الذكاء الاصطناعي للمطاعم في لبنان", href: "/ar/insights/ai-for-restaurants-lebanon" },
      { label: "الذكاء الاصطناعي للعيادات في لبنان", href: "/ar/insights/ai-for-clinics-lebanon" },
      { label: "الذكاء الاصطناعي للوكالات العقارية في لبنان", href: "/ar/insights/ai-for-real-estate-lebanon" },
      { label: "الذكاء الاصطناعي في لبنان: دليل عملي للشركات", href: "/ar/insights/ai-in-lebanon" },
    ],
  },
  steps: {
    eyebrow: "كيف نعمل",
    title: "كيف يسير مشروع ذكاء اصطناعي مع كوانتكس؟",
    items: [
      { label: "نتحدث", detail: "مكالمة قصيرة أو محادثة على واتساب عن عملك وأين يضيع الوقت." },
      { label: "نختار مساراً واحداً", detail: "نختار حالة الاستخدام الأوضح عائداً ونتفق على معنى النجاح." },
      { label: "نبني ونختبر", detail: "نبنيه على معلوماتك الخاصة ونختبر الأجزاء الحساسة قبل أن يراه العملاء." },
      { label: "نطلق ونحسّن", detail: "تنطلق أنت، ونراقب المحادثات الفعلية ونضبط النظام." },
    ],
  },
  cost: {
    eyebrow: "الكلفة",
    title: "كم تكلّف حلول الذكاء الاصطناعي في لبنان؟",
    body: "تعتمد على النطاق. المساعد المحدد أو مسار العمل المؤتمت الواحد أقل كلفة بكثير من منصة مخصصة كاملة، ومعظم الشركات يجب أن تبدأ بالأول. أخبرنا بما تحتاجه ونردّ خلال 24 ساعة بخيارات وخطوة أولى واقعية. وإن كنت تقارن بين المزوّدين، فدليلنا يضم الأسئلة التي تستحق أن تُطرح.",
    guideLabel: "كيف تختار مزوّد حلول الذكاء الاصطناعي في لبنان",
  },
  faqHeading: "حلول الذكاء الاصطناعي في لبنان: أسئلة شائعة",
  faq: [
    { question: "ما الشركات التي تقدم حلول الذكاء الاصطناعي في لبنان؟", answer: "في لبنان شركات برمجيات ووكالات واستوديوهات مستقلة تبني حلول الذكاء الاصطناعي. كوانتكس استوديو في بيروت يبني روبوتات دردشة لواتساب والمواقع، وأتمتة للأعمال، وبرمجيات ذكاء اصطناعي مخصصة للشركات في لبنان وحول العالم." },
    { question: "هل تعمل روبوتات الدردشة لديكم بالعربية والفرنسية والإنكليزية؟", answer: "نعم. تفهم وتردّ بالثلاث، بما في ذلك العملاء الذين يخلطون اللغات أو يكتبون العربية بحروف لاتينية." },
    { question: "هل تستطيعون ربط الذكاء الاصطناعي بواتساب؟", answer: "نعم. نبني مساعدين لواتساب وموقعك، ونربطهم ببريدك وجداولك وأدواتك الأخرى." },
    { question: "هل تعملون مع شركات خارج بيروت؟", answer: "نعم. مقرنا في بيروت ونعمل عن بُعد مع شركات في أنحاء لبنان، بما فيها طرابلس وجونية وصيدا وزحلة، ومع شركات في الخارج." },
    { question: "كم يكلّف حل الذكاء الاصطناعي في لبنان؟", answer: "يعتمد على النطاق. المساعد المحدد أو الأتمتة أقل كلفة بكثير من منصة مخصصة كاملة. تواصل معنا ونردّ خلال 24 ساعة بخيارات وخطوة أولى واقعية." },
    { question: "كم تستغرق مدة الإطلاق؟", answer: "يمكن عادةً إطلاق نسخة أولى محددة، مثل مساعد واتساب أو مسار عمل مؤتمت واحد، خلال أسابيع لا أشهر، بحسب النطاق وسرعة تزويدنا بمعلوماتك." },
    { question: "هل سيخترع الذكاء الاصطناعي إجابات من عنده؟", answer: "مساعدونا يجيبون فقط من المعلومات التي تزوّدهم بها، ويقولون بصراحة إنهم لا يعرفون حين لا يعرفون، ويحوّلون إلى شخص في الأمور الحساسة. نختبر الإجابات الحساسة قبل الإطلاق." },
    { question: "هل أملك ما تبنونه؟", answer: "نعم. تُسلَّم إليك الشيفرة والنطاق والحسابات والمحتوى." },
  ],
  cta: { title: "هل أنت مستعد لتشغيل الذكاء الاصطناعي في عملك في لبنان؟", lead: "أخبرنا ما الذي يُبطئك. نردّ خلال 24 ساعة بالمواضع التي يمكن للذكاء الاصطناعي أن يساعد فيها وخطوة أولى واقعية.", start: "ابدأ مشروعك", whatsapp: "راسلنا على واتساب" },
  ui: { home: "→ الرئيسية", other: "English", learn: "اعرف المزيد", guide: "اقرأ دليل الاختيار", faqEyebrow: "أسئلة" },
};

export function getLebanonContent(lang: "en" | "ar"): LebanonContent {
  return lang === "ar" ? LEBANON_AR : LEBANON_EN;
}
