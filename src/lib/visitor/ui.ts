import type { ProfileLocale } from "./profiles";

/** Fixed wording for the question hero and the sections around it. */
export type AskUi = {
  question: [string, string];
  inputLabel: string;
  placeholder: string;
  submit: string;
  thinking: string;
  picksLabel: string;
  youSaid: string;
  seeHow: string;
  change: string;
  forYouEyebrow: string;
  sample: string;
  online: string;
  whatsapp: string;
  prices: string;
  checkInput: string;
  checkSample: [string, string, string, string];
  arrow: string;
};

export const ASK_UI: Record<ProfileLocale, AskUi> = {
  en: {
    question: ["What does your", "business do?"],
    inputLabel: "Describe your business in a few words",
    placeholder: "A dental clinic",
    submit: "Show me",
    thinking: "Thinking",
    picksLabel: "Or pick one",
    youSaid: "You said:",
    seeHow: "See how it would work",
    change: "Change my answer",
    forYouEyebrow: "Built around your answer",
    sample: "Sample conversation",
    online: "Assistant online",
    whatsapp: "Talk it through on WhatsApp",
    prices: "See all prices",
    checkInput: "Your website address",
    checkSample: ["Google", "AI search", "Mobile speed", "Sample report"],
    arrow: "→",
  },
  ar: {
    question: ["ما مجال", "عملك؟"],
    inputLabel: "صف عملك في بضع كلمات",
    placeholder: "عيادة أسنان",
    submit: "أرِني",
    thinking: "لحظة",
    picksLabel: "أو اختر",
    youSaid: "قلتَ:",
    seeHow: "شاهد كيف يعمل",
    change: "غيّر إجابتي",
    forYouEyebrow: "مبني على إجابتك",
    sample: "محادثة نموذجية",
    online: "المساعد متصل",
    whatsapp: "ناقش الأمر على واتساب",
    prices: "كل الأسعار",
    checkInput: "عنوان موقعك",
    checkSample: ["غوغل", "بحث الذكاء الاصطناعي", "سرعة الهاتف", "تقرير نموذجي"],
    arrow: "←",
  },
  fr: {
    question: ["Que fait votre", "entreprise ?"],
    inputLabel: "Décrivez votre activité en quelques mots",
    placeholder: "Un cabinet dentaire",
    submit: "Voir",
    thinking: "Un instant",
    picksLabel: "Ou choisissez",
    youSaid: "Vous avez dit :",
    seeHow: "Voir comment ça marche",
    change: "Modifier ma réponse",
    forYouEyebrow: "Construit autour de votre réponse",
    sample: "Conversation d'exemple",
    online: "Assistant en ligne",
    whatsapp: "En parler sur WhatsApp",
    prices: "Voir tous les tarifs",
    checkInput: "L'adresse de votre site",
    checkSample: ["Google", "Recherche IA", "Vitesse mobile", "Rapport d'exemple"],
    arrow: "→",
  },
};
