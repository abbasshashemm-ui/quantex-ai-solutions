import type { Lang } from "@/lib/i18n/routes";

/** Header and footer text. English is the source; Arabic and French mirror it. */
export type ChromeStrings = {
  nav: {
    primary: string;
    home: string;
    solutions: string;
    aiSolutions: string;
    guides: string;
    about: string;
    contact: string;
    pricing: string;
    siteCheck: string;
    aiLebanon: string;
    startProject: string;
    chatWhatsapp: string;
    menu: string;
    openMenu: string;
    closeMenu: string;
    allSolutions: string;
    overviewHome: string;
    language: string;
  };
  services: Record<string, { label: string; tagline: string }>;
  footer: {
    tagline: string;
    place: string;
    contact: string;
    navigate: string;
    chatOnWhatsapp: string;
    startOnWhatsapp: string;
    privacy: string;
    terms: string;
    strap: string;
  };
};

const EN_SERVICES: ChromeStrings["services"] = {};

export const CHROME: Record<Lang, ChromeStrings> = {
  en: {
    nav: {
      primary: "Primary",
      home: "Home",
      solutions: "Solutions",
      aiSolutions: "AI Solutions",
      guides: "Guides",
      about: "About",
      contact: "Contact",
      pricing: "Pricing",
      siteCheck: "Free Site Check",
      aiLebanon: "AI Solutions in Lebanon",
      startProject: "Start a project",
      chatWhatsapp: "Chat on WhatsApp",
      menu: "Menu",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      allSolutions: "All solutions",
      overviewHome: "Overview on the home page",
      language: "Language",
    },
    services: EN_SERVICES,
    footer: {
      tagline: "A Beirut studio for websites, AI assistants and business software.",
      place: "Beirut, Lebanon",
      contact: "Contact",
      navigate: "Navigate",
      chatOnWhatsapp: "Chat on WhatsApp",
      startOnWhatsapp: "Start a project on WhatsApp",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      strap: "Websites. Assistants. Software.",
    },
  },
  ar: {
    nav: {
      primary: "التنقل الرئيسي",
      home: "الرئيسية",
      solutions: "الخدمات",
      aiSolutions: "حلول الذكاء الاصطناعي",
      guides: "الأدلة",
      about: "من نحن",
      contact: "تواصل معنا",
      pricing: "الأسعار",
      siteCheck: "فحص الموقع المجاني",
      aiLebanon: "حلول الذكاء الاصطناعي في لبنان",
      startProject: "ابدأ مشروعاً",
      chatWhatsapp: "راسلنا على واتساب",
      menu: "القائمة",
      openMenu: "فتح القائمة",
      closeMenu: "إغلاق القائمة",
      allSolutions: "كل الخدمات",
      overviewHome: "نظرة عامة في الصفحة الرئيسية",
      language: "اللغة",
    },
    services: {
    "high-converting-websites": { label: "المواقع", tagline: "مواقع سريعة تكسب العملاء" },
    "custom-intelligent-chatbots": { label: "مساعدو الذكاء الاصطناعي", tagline: "يجيب العملاء على الموقع وواتساب" },
    "business-process-automation": { label: "الأتمتة", tagline: "عمل يدوي أقل وأخطاء أقل" },
    "custom-software-development": { label: "البرمجيات المخصصة", tagline: "تطبيقات وبوابات مبنية لك" },
    "seo": { label: "السيو", tagline: "اظهر على غوغل" },
    "custom-system-architectures": { label: "تصميم الأنظمة", tagline: "خطة تنمو معك" },
  },
    footer: {
      tagline: "استوديو في بيروت للمواقع ومساعدي الذكاء الاصطناعي وبرمجيات الأعمال.",
      place: "بيروت، لبنان",
      contact: "تواصل",
      navigate: "تصفّح",
      chatOnWhatsapp: "راسلنا على واتساب",
      startOnWhatsapp: "ابدأ مشروعك على واتساب",
      privacy: "سياسة الخصوصية",
      terms: "شروط الاستخدام",
      strap: "مواقع. مساعدون. برمجيات.",
    },
  },
  fr: {
    nav: {
      primary: "Navigation principale",
      home: "Accueil",
      solutions: "Solutions",
      aiSolutions: "Solutions IA",
      guides: "Guides",
      about: "À propos",
      contact: "Contact",
      pricing: "Tarifs",
      siteCheck: "Analyse de site gratuite",
      aiLebanon: "Solutions IA au Liban",
      startProject: "Lancer un projet",
      chatWhatsapp: "Écrire sur WhatsApp",
      menu: "Menu",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      allSolutions: "Toutes les solutions",
      overviewHome: "Vue d'ensemble sur l'accueil",
      language: "Langue",
    },
    services: {
    "high-converting-websites": { label: "Sites web", tagline: "Des sites rapides qui attirent des clients" },
    "custom-intelligent-chatbots": { label: "Assistants IA", tagline: "Répond aux clients sur le web et WhatsApp" },
    "business-process-automation": { label: "Automatisation", tagline: "Moins de tâches manuelles, moins d'erreurs" },
    "custom-software-development": { label: "Logiciels sur mesure", tagline: "Des applications et portails faits pour vous" },
    "seo": { label: "SEO", tagline: "Soyez visible sur Google" },
    "custom-system-architectures": { label: "Conception de systèmes", tagline: "Un plan qui évolue avec vous" },
  },
    footer: {
      tagline: "Un studio de Beyrouth pour les sites web, les assistants IA et les logiciels d'entreprise.",
      place: "Beyrouth, Liban",
      contact: "Contact",
      navigate: "Navigation",
      chatOnWhatsapp: "Écrire sur WhatsApp",
      startOnWhatsapp: "Lancer un projet sur WhatsApp",
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
      strap: "Sites web. Assistants. Logiciels.",
    },
  },
};
