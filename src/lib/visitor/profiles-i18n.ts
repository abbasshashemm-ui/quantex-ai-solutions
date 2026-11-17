import type { Profile, ProfileId } from "./profiles";

/**
 * Arabic and French wording for the answers on the home page. Everything that
 * is not wording (keywords, service order, the sculpture's pose) stays in
 * profiles.ts. Prices mirror src/lib/pricing and must be kept in step with it.
 */
export type ProfileText = Pick<
  Profile,
  | "pick"
  | "steps"
  | "chat"
  | "handover"
  | "outcomes"
  | "whatsapp"
  | "chatName"
  | "cta"
  | "closing"
  | "guide"
> & {
  answerLine: string;
  forYouTitle: string;
  servicesNote: string | null;
};

const arService = (slug: string) => `/ar/services/${slug}`;
const frService = (slug: string) => `/fr/services/${slug}`;
const WEBSITE = "high-converting-websites";
const ASSISTANT = "custom-intelligent-chatbots";
const SEO = "seo";
const AUTOMATION = "business-process-automation";

const AR_ASSISTANT_250 = "ابتداءً من 250 دولاراً شهرياً، إضافةً إلى الإعداد";
const AR_ASSISTANT_120 = "ابتداءً من 120 دولاراً شهرياً، إضافةً إلى الإعداد";
const FR_ASSISTANT_250 = "À partir de 250 $ par mois, plus l'installation";
const FR_ASSISTANT_120 = "À partir de 120 $ par mois, plus l'installation";

export const PROFILE_TEXT_AR: Record<ProfileId, ProfileText> = {
  restaurant: {
    pick: "مطعم",
    answerLine: "لمطعمك، ابدأ من هنا",
    forYouTitle: "كيف يعمل ذلك في مطعم",
    servicesNote: "بالترتيب الأهم لمطعم",
    steps: [
      {
        title: "مساعد على واتساب",
        detail: "يستقبل الحجوزات ويجيب عن أسئلة القائمة في أي وقت",
        price: AR_ASSISTANT_250,
        href: arService(ASSISTANT),
      },
      {
        title: "موقع يعرض قائمتك وساعات العمل",
        detail: "سريع على الهاتف ويظهر في بحث خرائط غوغل",
        price: "ابتداءً من 700 دولار",
        href: arService(WEBSITE),
      },
      {
        title: "دليل: الذكاء الاصطناعي للمطاعم في لبنان",
        detail: "ما الذي ينجح، وكم يكلّف، ومن أين تبدأ",
        price: "قراءة مجانية",
        href: "/ar/insights/ai-for-restaurants-lebanon",
      },
    ],
    chat: [
      { from: "in", text: "هل لديكم طاولة لستة أشخاص الليلة؟" },
      { from: "out", text: "نعم، الساعة 8:30 أو 9:15. أيهما يناسبكم؟" },
      { from: "in", text: "8:30. هل عندكم أطباق نباتية؟" },
      { from: "out", text: "أربعة أطباق رئيسية. أرسلت لكم القائمة، وتم الحجز الساعة 8:30." },
      { from: "in", text: "أحدنا لديه حساسية من المكسرات." },
    ],
    handover: "حُوّلت إلى المدير مع الحجز وكامل المحادثة",
    outcomes: [
      "حجوزات تُسجَّل والمطبخ مشغول",
      "القائمة والساعات والموقع تُجاب من دون اتصال هاتفي",
      "رسائل الحساسية والشكاوى تصل إلى شخص مباشرة",
    ],
    whatsapp: "مرحباً، لدي مطعم وأود التحدث عن موقع ومساعد.",
    chatName: "مطعمك",
    cta: "ابدأ مشروع مطعمك",
    closing: "حدّثنا عن مطعمك",
    guide: "/ar/insights/ai-for-restaurants-lebanon",
  },
  clinic: {
    pick: "عيادة",
    answerLine: "لعيادتك، ابدأ من هنا",
    forYouTitle: "كيف يعمل ذلك في عيادة",
    servicesNote: "بالترتيب الأهم لعيادة",
    steps: [
      {
        title: "مساعد يحجز المواعيد",
        detail: "يجيب على موقعك وعلى واتساب، ولا يقدّم نصائح طبية أبداً",
        price: AR_ASSISTANT_250,
        href: arService(ASSISTANT),
      },
      {
        title: "موقع يجده المرضى",
        detail: "الخدمات والأطباء وساعات العمل، مهيأ للظهور في البحث المحلي",
        price: "ابتداءً من 700 دولار",
        href: arService(WEBSITE),
      },
      {
        title: "دليل: الذكاء الاصطناعي للعيادات في لبنان",
        detail: "المواعيد وأسئلة المرضى والتذكيرات، بطريقة آمنة",
        price: "قراءة مجانية",
        href: "/ar/insights/ai-for-clinics-lebanon",
      },
    ],
    chat: [
      { from: "in", text: "هل يمكنني زيارة طبيب الأسنان هذا الأسبوع؟" },
      { from: "out", text: "الخميس الساعة 4:00 أو السبت الساعة 10:30. أيهما تفضّل؟" },
      { from: "in", text: "الخميس. كم كلفة الفحص؟" },
      { from: "out", text: "30 دولاراً، وتشمل الأشعة عند الحاجة. تم حجز موعدك الخميس الساعة 4:00." },
      { from: "in", text: "ما زال سنّي يؤلمني بعد الحشوة. هل هذا طبيعي؟" },
    ],
    handover: "لم يُجب المساعد. طُلب من العيادة الاتصال اليوم",
    outcomes: [
      "مواعيد تُحجز خارج ساعات الدوام",
      "الأسعار والساعات والعنوان تُجاب فوراً",
      "كل ما هو طبي يُحوَّل إلى فريقك، في كل مرة",
    ],
    whatsapp: "مرحباً، لدي عيادة وأود التحدث عن موقع ومساعد.",
    chatName: "عيادتك",
    cta: "ابدأ مشروع عيادتك",
    closing: "حدّثنا عن عيادتك",
    guide: "/ar/insights/ai-for-clinics-lebanon",
  },
  "real-estate": {
    pick: "عقارات",
    answerLine: "لمكتبك العقاري، ابدأ من هنا",
    forYouTitle: "كيف يعمل ذلك في مكتب عقاري",
    servicesNote: "بالترتيب الأهم لمكتب عقاري",
    steps: [
      {
        title: "مساعد يفرز العملاء المحتملين",
        detail: "يجيب عن أسئلة العقارات ويحجز المعاينات على واتساب",
        price: AR_ASSISTANT_250,
        href: arService(ASSISTANT),
      },
      {
        title: "موقع يجلب الاستفسارات",
        detail: "عقارات تعدّلها بنفسك، بالعربية والإنجليزية",
        price: "ابتداءً من 1,400 دولار",
        href: arService(WEBSITE),
      },
      {
        title: "دليل: الذكاء الاصطناعي للعقارات في لبنان",
        detail: "ردود أسرع، وعملاء أفضل، ومتابعة لا تُنسى",
        price: "قراءة مجانية",
        href: "/ar/insights/ai-for-real-estate-lebanon",
      },
    ],
    chat: [
      { from: "in", text: "هل شقة الغرفتين في الأشرفية ما زالت متاحة؟" },
      { from: "out", text: "نعم. الطابق الثالث، 1,400 دولار شهرياً. هل الإيجار لك شخصياً؟" },
      { from: "in", text: "نعم، ابتداءً من الشهر المقبل." },
      { from: "out", text: "يمكنني عرضها الخميس الساعة 5:00 أو السبت الساعة 11:00." },
      { from: "in", text: "السبت. هل السعر قابل للتفاوض؟" },
    ],
    handover: "حُوّلت إلى الوسيط مع موعد المعاينة والميزانية",
    outcomes: [
      "كل استفسار يُجاب خلال ثوانٍ، حتى ليلاً",
      "معاينات تُحجز بعد السؤال عن الميزانية وموعد الانتقال",
      "التفاوض والعروض تصل إلى الوسيط مباشرة",
    ],
    whatsapp: "مرحباً، لدي مكتب عقاري وأود التحدث عن موقع ومساعد.",
    chatName: "مكتبك",
    cta: "ابدأ مشروع مكتبك",
    closing: "حدّثنا عن مكتبك",
    guide: "/ar/insights/ai-for-real-estate-lebanon",
  },
  shop: {
    pick: "متجر",
    answerLine: "لمتجرك، ابدأ من هنا",
    forYouTitle: "كيف يعمل ذلك في متجر",
    servicesNote: "بالترتيب الأهم لمتجر",
    steps: [
      {
        title: "متجر إلكتروني",
        detail: "كتالوج ودفع يعملان جيداً على الهاتف",
        price: "ابتداءً من 2,200 دولار",
        href: arService(WEBSITE),
      },
      {
        title: "مساعد للطلبات",
        detail: "يجيب عن أسئلة المخزون والتوصيل والإرجاع على واتساب",
        price: AR_ASSISTANT_250,
        href: arService(ASSISTANT),
      },
      {
        title: "طلبات تُسجَّل تلقائياً",
        detail: "الفاتورة وجدول المخزون ورسالة التوصيل من طلب واحد",
        price: "يُسعَّر حسب المشروع",
        href: arService(AUTOMATION),
      },
    ],
    chat: [
      { from: "in", text: "هل توصلون إلى جونيه؟" },
      { from: "out", text: "نعم، خلال 24 ساعة. التوصيل 3 دولارات، ومجاني للطلبات فوق 50 دولاراً." },
      { from: "in", text: "هل اللون الأسود متوفر بمقاس M؟" },
      { from: "out", text: "بقيت قطعتان. هل أسجّل طلبك؟" },
      { from: "in", text: "أريد إرجاع قطعة اشتريتها الأسبوع الماضي." },
    ],
    handover: "حُوّلت إلى فريقك مع الطلب وكامل المحادثة",
    outcomes: [
      "أسئلة المخزون والسعر والتوصيل تُجاب فوراً",
      "طلبات تُسجَّل على واتساب من دون إدخال يدوي",
      "الإرجاع والشكاوى تصل إلى شخص مباشرة",
    ],
    whatsapp: "مرحباً، لدي متجر وأود التحدث عن متجر إلكتروني ومساعد.",
    chatName: "متجرك",
    cta: "ابدأ مشروع متجرك",
    closing: "حدّثنا عن متجرك",
    guide: null,
  },
  services: {
    pick: "خدمات",
    answerLine: "لشركة خدمات، ابدأ من هنا",
    forYouTitle: "كيف يعمل ذلك في شركة خدمات",
    servicesNote: "بالترتيب الأهم لشركة خدمات",
    steps: [
      {
        title: "موقع يجلب العملاء",
        detail: "يشرح ما تقدّمه في ثوانٍ، مع خطوة تالية واضحة",
        price: "ابتداءً من 1,400 دولار",
        href: arService(WEBSITE),
      },
      {
        title: "مساعد على موقعك",
        detail: "يجيب عن الأسئلة الأولى ويحجز المكالمة",
        price: AR_ASSISTANT_120,
        href: arService(ASSISTANT),
      },
      {
        title: "الظهور في غوغل وبحث الذكاء الاصطناعي",
        detail: "عمل شهري ليجدك العملاء المناسبون",
        price: "ابتداءً من 250 دولاراً شهرياً",
        href: arService(SEO),
      },
    ],
    chat: [
      { from: "in", text: "هل تتعاملون مع الشركات الصغيرة؟" },
      { from: "out", text: "نعم، معظم عملائنا لديهم أقل من 20 موظفاً. بماذا نساعدك؟" },
      { from: "in", text: "تنظيم المحاسبة الشهرية." },
      { from: "out", text: "نقوم بذلك. المكالمة الأولى مجانية. غداً الساعة 11:00 أو 3:00؟" },
      { from: "in", text: "11:00. هل يمكن إرسال عرض سعر أولاً؟" },
    ],
    handover: "حُوّلت إليك مع الطلب وموعد المكالمة",
    outcomes: [
      "الأسئلة الأولى تُجاب قبل أن ترفع الهاتف",
      "مكالمات تُحجز في تقويمك مع سبب الاتصال",
      "عروض الأسعار وكل ما هو غير اعتيادي يصل إليك مباشرة",
    ],
    whatsapp: "مرحباً، لدي شركة خدمات وأود التحدث عن موقع ومساعد.",
    chatName: "شركتك",
    cta: null,
    closing: "حدّثنا عن شركتك",
    guide: null,
  },
  general: {
    pick: "شيء آخر",
    answerLine: "لعملك، ابدأ من هنا",
    forYouTitle: "كيف يعمل ذلك في عملك",
    servicesNote: null,
    steps: [
      {
        title: "موقع يجلب الاستفسارات",
        detail: "سريع وواضح ومبني حول هدف واحد",
        price: "ابتداءً من 700 دولار",
        href: arService(WEBSITE),
      },
      {
        title: "مساعد يجيب عملاءك",
        detail: "على موقعك وعلى واتساب، مدرَّب على معلوماتك",
        price: AR_ASSISTANT_120,
        href: arService(ASSISTANT),
      },
      {
        title: "دليل: الذكاء الاصطناعي في لبنان للشركات",
        detail: "من أين تبدأ، وكم يكلّف، والأخطاء التي تتجنّبها",
        price: "قراءة مجانية",
        href: "/ar/insights/ai-in-lebanon",
      },
    ],
    chat: [
      { from: "in", text: "هل تفتحون يوم الأحد؟" },
      { from: "out", text: "نعم، من 10 إلى 6. هل أساعدك في شيء آخر؟" },
      { from: "in", text: "كم كلفة التوصيل؟" },
      { from: "out", text: "3 دولارات، ومجاني للطلبات فوق 50 دولاراً. هل أسجّل طلبك؟" },
      { from: "in", text: "أفضّل التحدث مع شخص." },
    ],
    handover: "حُوّلت إلى فريقك مع المحادثة حتى الآن",
    outcomes: [
      "الأسئلة المتكررة تُجاب فوراً، ليلاً ونهاراً",
      "الطلبات تُجمع مع التفاصيل التي تحتاجها",
      "شخص يتولى المحادثة كلما طُلب ذلك",
    ],
    whatsapp: "مرحباً، أود التحدث عن موقع ومساعد لعملي.",
    chatName: "شركتك",
    cta: null,
    closing: "أخبرنا بما تحتاجه",
    guide: null,
  },
};

export const PROFILE_TEXT_FR: Record<ProfileId, ProfileText> = {
  restaurant: {
    pick: "Restaurant",
    answerLine: "Pour un restaurant, commencez ici",
    forYouTitle: "Comment cela marcherait pour un restaurant",
    servicesNote: "Dans l'ordre qui compte pour un restaurant",
    steps: [
      {
        title: "Un assistant sur WhatsApp",
        detail: "Prend les réservations et répond sur le menu à toute heure",
        price: FR_ASSISTANT_250,
        href: frService(ASSISTANT),
      },
      {
        title: "Un site avec votre menu et vos horaires",
        detail: "Rapide sur mobile et visible dans les recherches Google Maps",
        price: "À partir de 700 $",
        href: frService(WEBSITE),
      },
      {
        title: "Être trouvé sur Google",
        detail: "Un travail mensuel pour que les bons clients vous trouvent",
        price: "À partir de 250 $ par mois",
        href: frService(SEO),
      },
    ],
    chat: [
      { from: "in", text: "Avez-vous une table pour six ce soir ?" },
      { from: "out", text: "Oui, à 20 h 30 ou 21 h 15. Laquelle préférez-vous ?" },
      { from: "in", text: "20 h 30. Avez-vous des plats végétariens ?" },
      { from: "out", text: "Quatre plats. Je vous ai envoyé la carte. C'est réservé pour 20 h 30." },
      { from: "in", text: "L'un de nous est allergique aux fruits à coque." },
    ],
    handover: "Transmis au responsable, avec la réservation et la conversation",
    outcomes: [
      "Des réservations prises pendant le coup de feu",
      "Menu, horaires et adresse donnés sans appel téléphonique",
      "Allergies et réclamations transmises directement à une personne",
    ],
    whatsapp: "Bonjour, j'ai un restaurant et je souhaite parler d'un site et d'un assistant.",
    chatName: "Votre restaurant",
    cta: "Lancer votre projet",
    closing: "Parlez-nous de votre restaurant",
    guide: null,
  },
  clinic: {
    pick: "Clinique",
    answerLine: "Pour une clinique, commencez ici",
    forYouTitle: "Comment cela marcherait pour une clinique",
    servicesNote: "Dans l'ordre qui compte pour une clinique",
    steps: [
      {
        title: "Un assistant qui prend les rendez-vous",
        detail: "Répond sur votre site et WhatsApp, sans jamais donner d'avis médical",
        price: FR_ASSISTANT_250,
        href: frService(ASSISTANT),
      },
      {
        title: "Un site que les patients trouvent",
        detail: "Soins, praticiens et horaires, préparé pour les recherches locales",
        price: "À partir de 700 $",
        href: frService(WEBSITE),
      },
      {
        title: "Être trouvé sur Google",
        detail: "Un travail mensuel pour que les bons patients vous trouvent",
        price: "À partir de 250 $ par mois",
        href: frService(SEO),
      },
    ],
    chat: [
      { from: "in", text: "Puis-je voir le dentiste cette semaine ?" },
      { from: "out", text: "Jeudi à 16 h ou samedi à 10 h 30. Lequel préférez-vous ?" },
      { from: "in", text: "Jeudi. Combien coûte un contrôle ?" },
      { from: "out", text: "30 $, radios comprises si besoin. C'est noté pour jeudi à 16 h." },
      { from: "in", text: "Ma dent me fait encore mal après le plombage. Est-ce normal ?" },
    ],
    handover: "Sans réponse de l'assistant. La clinique vous rappelle aujourd'hui",
    outcomes: [
      "Des rendez-vous pris en dehors des heures d'ouverture",
      "Tarifs, horaires et adresse donnés tout de suite",
      "Toute question médicale transmise à votre équipe, à chaque fois",
    ],
    whatsapp: "Bonjour, j'ai une clinique et je souhaite parler d'un site et d'un assistant.",
    chatName: "Votre clinique",
    cta: "Lancer votre projet",
    closing: "Parlez-nous de votre clinique",
    guide: null,
  },
  "real-estate": {
    pick: "Immobilier",
    answerLine: "Pour une agence immobilière, commencez ici",
    forYouTitle: "Comment cela marcherait pour une agence immobilière",
    servicesNote: "Dans l'ordre qui compte pour une agence immobilière",
    steps: [
      {
        title: "Un assistant qui qualifie les prospects",
        detail: "Répond sur les biens et réserve les visites sur WhatsApp",
        price: FR_ASSISTANT_250,
        href: frService(ASSISTANT),
      },
      {
        title: "Un site qui amène des demandes",
        detail: "Des annonces que vous modifiez vous-même, en français et en arabe",
        price: "À partir de 1 400 $",
        href: frService(WEBSITE),
      },
      {
        title: "Être trouvé sur Google",
        detail: "Un travail mensuel pour que les bons acheteurs vous trouvent",
        price: "À partir de 250 $ par mois",
        href: frService(SEO),
      },
    ],
    chat: [
      { from: "in", text: "Le deux-pièces à Achrafieh est-il toujours disponible ?" },
      { from: "out", text: "Oui. Troisième étage, 1 400 $ par mois. Est-ce pour vous ?" },
      { from: "in", text: "Oui, à partir du mois prochain." },
      { from: "out", text: "Je peux vous le montrer jeudi à 17 h ou samedi à 11 h." },
      { from: "in", text: "Samedi. Le prix est-il négociable ?" },
    ],
    handover: "Transmis à l'agent, avec la visite et le budget",
    outcomes: [
      "Chaque demande reçoit une réponse en quelques secondes, même la nuit",
      "Des visites réservées, budget et date d'entrée déjà demandés",
      "Négociations et offres transmises directement à un agent",
    ],
    whatsapp: "Bonjour, j'ai une agence immobilière et je souhaite parler d'un site et d'un assistant.",
    chatName: "Votre agence",
    cta: "Lancer votre projet",
    closing: "Parlez-nous de votre agence",
    guide: null,
  },
  shop: {
    pick: "Boutique",
    answerLine: "Pour une boutique, commencez ici",
    forYouTitle: "Comment cela marcherait pour une boutique",
    servicesNote: "Dans l'ordre qui compte pour une boutique",
    steps: [
      {
        title: "Une boutique en ligne",
        detail: "Un catalogue et un paiement qui fonctionnent sur mobile",
        price: "À partir de 2 200 $",
        href: frService(WEBSITE),
      },
      {
        title: "Un assistant pour les commandes",
        detail: "Répond sur le stock, la livraison et les retours sur WhatsApp",
        price: FR_ASSISTANT_250,
        href: frService(ASSISTANT),
      },
      {
        title: "Des commandes qui se classent seules",
        detail: "Facture, stock et message de livraison à partir d'une commande",
        price: "Sur devis",
        href: frService(AUTOMATION),
      },
    ],
    chat: [
      { from: "in", text: "Livrez-vous à Jounieh ?" },
      { from: "out", text: "Oui, sous 24 heures. Livraison à 3 $, gratuite dès 50 $." },
      { from: "in", text: "Le noir est-il disponible en taille M ?" },
      { from: "out", text: "Il en reste deux. Je prends votre commande ?" },
      { from: "in", text: "Je dois retourner un article acheté la semaine dernière." },
    ],
    handover: "Transmis à votre équipe, avec la commande et la conversation",
    outcomes: [
      "Stock, prix et livraison donnés tout de suite",
      "Des commandes prises sur WhatsApp sans ressaisie",
      "Retours et réclamations transmis directement à une personne",
    ],
    whatsapp: "Bonjour, j'ai une boutique et je souhaite parler d'une boutique en ligne et d'un assistant.",
    chatName: "Votre boutique",
    cta: "Lancer votre projet",
    closing: "Parlez-nous de votre boutique",
    guide: null,
  },
  services: {
    pick: "Services",
    answerLine: "Pour une société de services, commencez ici",
    forYouTitle: "Comment cela marcherait pour une société de services",
    servicesNote: "Dans l'ordre qui compte pour une société de services",
    steps: [
      {
        title: "Un site qui amène des prospects",
        detail: "Dit ce que vous faites en quelques secondes, avec une étape claire",
        price: "À partir de 1 400 $",
        href: frService(WEBSITE),
      },
      {
        title: "Un assistant sur votre site",
        detail: "Répond aux premières questions et réserve l'appel",
        price: FR_ASSISTANT_120,
        href: frService(ASSISTANT),
      },
      {
        title: "Être trouvé sur Google et dans la recherche IA",
        detail: "Un travail mensuel pour que les bonnes personnes vous trouvent",
        price: "À partir de 250 $ par mois",
        href: frService(SEO),
      },
    ],
    chat: [
      { from: "in", text: "Travaillez-vous avec les petites entreprises ?" },
      { from: "out", text: "Oui, la plupart de nos clients ont moins de 20 salariés. Que vous faut-il ?" },
      { from: "in", text: "Mettre en place une comptabilité mensuelle." },
      { from: "out", text: "Nous le faisons. Le premier appel est offert. Demain à 11 h ou 15 h ?" },
      { from: "in", text: "11 h. Pouvez-vous d'abord envoyer un devis ?" },
    ],
    handover: "Transmis à vous, avec la demande et l'appel réservé",
    outcomes: [
      "Les premières questions traitées avant que vous décrochiez",
      "Des appels réservés dans votre agenda, avec leur motif",
      "Devis et demandes inhabituelles transmis directement à vous",
    ],
    whatsapp: "Bonjour, j'ai une société de services et je souhaite parler d'un site et d'un assistant.",
    chatName: "Votre société",
    cta: null,
    closing: "Parlez-nous de votre société",
    guide: null,
  },
  general: {
    pick: "Autre chose",
    answerLine: "Pour votre entreprise, commencez ici",
    forYouTitle: "Comment cela marcherait pour votre entreprise",
    servicesNote: null,
    steps: [
      {
        title: "Un site qui amène des demandes",
        detail: "Rapide, clair et conçu autour d'un seul objectif",
        price: "À partir de 700 $",
        href: frService(WEBSITE),
      },
      {
        title: "Un assistant qui répond aux clients",
        detail: "Sur votre site et WhatsApp, formé sur vos propres informations",
        price: FR_ASSISTANT_120,
        href: frService(ASSISTANT),
      },
      {
        title: "Être trouvé sur Google",
        detail: "Un travail mensuel pour que les bons clients vous trouvent",
        price: "À partir de 250 $ par mois",
        href: frService(SEO),
      },
    ],
    chat: [
      { from: "in", text: "Êtes-vous ouverts dimanche ?" },
      { from: "out", text: "Oui, de 10 h à 18 h. Puis-je vous aider pour autre chose ?" },
      { from: "in", text: "Combien coûte la livraison ?" },
      { from: "out", text: "3 $, et gratuite dès 50 $. Je prends votre commande ?" },
      { from: "in", text: "Je préfère parler à quelqu'un." },
    ],
    handover: "Transmis à votre équipe, avec la conversation",
    outcomes: [
      "Les questions courantes traitées tout de suite, jour et nuit",
      "Des demandes recueillies avec les détails qu'il vous faut",
      "Une personne prend le relais dès qu'on le demande",
    ],
    whatsapp: "Bonjour, je souhaite parler d'un site et d'un assistant pour mon entreprise.",
    chatName: "Votre entreprise",
    cta: null,
    closing: "Dites-nous ce dont vous avez besoin",
    guide: null,
  },
};
