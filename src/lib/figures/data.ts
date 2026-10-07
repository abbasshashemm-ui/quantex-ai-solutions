import type { FigureData, Lang, PlacedFigure } from "./types";

export const FIGURE_LABEL: Record<Lang, string> = {
  en: "Diagram",
  ar: "رسم توضيحي",
};

type ByLang = Record<Lang, PlacedFigure>;

const placed = (after: string, en: FigureData, ar: FigureData): ByLang => ({
  en: { after, data: en },
  ar: { after, data: ar },
});

const AI_IN_LEBANON = placed(
  "how-to-start",
  {
    kind: "stairs",
    title: "Where to start with AI",
    caption: "A small first project, proven before anything bigger.",
    start: "Start here",
    end: "Then expand",
    steps: [
      { label: "Find where time is lost", detail: "List the tasks and questions that repeat most." },
      { label: "Pick one workflow", detail: "The clearest payoff and the lowest risk." },
      { label: "Use your own information", detail: "Your prices and policies, not general knowledge." },
      { label: "Test the risky parts", detail: "Complaints, refunds and awkward questions first." },
      { label: "Launch, watch, improve", detail: "Read real conversations and fix the gaps." },
    ],
  },
  {
    kind: "stairs",
    title: "من أين تبدأ مع الذكاء الاصطناعي",
    caption: "مشروع أول صغير يُثبَت نجاحه قبل أي شيء أكبر.",
    start: "ابدأ من هنا",
    end: "ثم توسّع",
    steps: [
      { label: "اعرف أين يضيع الوقت", detail: "دوّن المهام والأسئلة الأكثر تكراراً." },
      { label: "اختر مساراً واحداً", detail: "الأوضح عائداً والأقل مخاطرة." },
      { label: "استخدم معلوماتك أنت", detail: "أسعارك وسياساتك، لا معرفة عامة." },
      { label: "اختبر الأجزاء الحساسة", detail: "الشكاوى والاسترجاع والأسئلة المحرجة أولاً." },
      { label: "أطلق وراقب وحسّن", detail: "اقرأ المحادثات الفعلية وسدّ الثغرات." },
    ],
  },
);

const BY_SLUG: Record<string, ByLang> = {
  "ai-in-lebanon": AI_IN_LEBANON,

  "seo-aeo-geo-explained": placed(
    "differences",
    {
      kind: "foundation",
      title: "Three goals, one foundation",
      caption: "SEO, AEO and GEO are three goals built on the same foundation, so one good site serves all three.",
      winsLabel: "You win",
      appearsLabel: "Shows up in",
      columns: [
        { name: "SEO", goal: "Be ranked", wins: "A position in the list of results", appears: "Google and Bing results" },
        { name: "AEO", goal: "Be the answer", wins: "Your text lifted as the direct answer", appears: "Featured answers, voice assistants, AI summaries" },
        { name: "GEO", goal: "Be cited", wins: "Your business named in an AI-written answer", appears: "ChatGPT, Gemini, Perplexity, Claude" },
      ],
      foundation: {
        label: "One shared foundation",
        items: ["A fast, clear site", "Helpful, quotable content", "Trusted mentions elsewhere"],
      },
    },
    {
      kind: "foundation",
      title: "ثلاثة أهداف، وأساس واحد",
      caption: "SEO وAEO وGEO ثلاثة أهداف تقوم على الأساس نفسه، فموقع جيد واحد يخدمها كلها.",
      winsLabel: "ما تكسبه",
      appearsLabel: "يظهر في",
      columns: [
        { name: "SEO", goal: "أن تُرتَّب", wins: "مرتبة في قائمة النتائج", appears: "نتائج غوغل، Bing" },
        { name: "AEO", goal: "أن تكون الجواب", wins: "يُقتبس نصك جواباً مباشراً", appears: "الأجوبة المميزة والمساعدات الصوتية وملخصات الذكاء الاصطناعي" },
        { name: "GEO", goal: "أن يُستشهد بك", wins: "يُذكر نشاطك في جواب كتبه الذكاء الاصطناعي", appears: "ChatGPT، Gemini، Perplexity، Claude" },
      ],
      foundation: {
        label: "أساس مشترك واحد",
        items: ["موقع سريع وواضح", "محتوى مفيد وقابل للاقتباس", "إشارات موثوقة من الآخرين"],
      },
    },
  ),

  "get-recommended-by-chatgpt-and-ai-search": placed(
    "how-ai-finds",
    {
      kind: "path",
      title: "Five steps to being easy to recommend",
      caption: "Five steps that make your business easier for AI tools to find, understand and trust. No one can guarantee a result.",
      result: "Easy to recommend",
      steps: [
        { label: "Reachable", detail: "AI tools can read your site." },
        { label: "Clear identity", detail: "One consistent description of your business." },
        { label: "Ready answers", detail: "Short, quotable answers to real questions." },
        { label: "Vouched for", detail: "Reviews, directories and press mention you." },
        { label: "Original", detail: "Case studies and data nobody else has." },
      ],
    },
    {
      kind: "path",
      title: "خمس خطوات لتسهّل التوصية بك",
      caption: "خمس خطوات تجعل نشاطك أسهل على أدوات الذكاء الاصطناعي في العثور عليه وفهمه والوثوق به. لا أحد يضمن النتيجة.",
      result: "تسهل التوصية بك",
      steps: [
        { label: "قابل للوصول", detail: "تستطيع أدوات الذكاء الاصطناعي قراءة موقعك." },
        { label: "هوية واضحة", detail: "وصف واحد متسق لنشاطك." },
        { label: "أجوبة جاهزة", detail: "أجوبة قصيرة قابلة للاقتباس عن أسئلة حقيقية." },
        { label: "يزكّيك آخرون", detail: "مراجعات وأدلة وإعلام يذكرونك." },
        { label: "مادة أصلية", detail: "دراسات حالة وبيانات لا يملكها غيرك." },
      ],
    },
  ),

  "search-visibility-checklist": placed(
    "top",
    {
      kind: "stack",
      title: "The five layers of search visibility",
      caption: "Each layer supports the next. Most businesses can fix the lower ones in a few weeks.",
      hint: "Build from the bottom up",
      layers: [
        { label: "Technical basics", detail: "Fast, mobile friendly, crawlable and indexed" },
        { label: "Local presence", detail: "Google Business Profile, reviews and directories" },
        { label: "Content", detail: "A page per service, real answers, Arabic and English" },
        { label: "Trust", detail: "Real people, case studies and mentions" },
        { label: "AI search", detail: "Clear identity, quotable answers, structured data, testing" },
      ],
    },
    {
      kind: "stack",
      title: "طبقات الظهور في البحث الخمس",
      caption: "كل طبقة تدعم التي فوقها. تستطيع معظم الشركات إصلاح الطبقات السفلى في بضعة أسابيع.",
      hint: "ابنِ من الأسفل إلى الأعلى",
      layers: [
        { label: "الأساسيات التقنية", detail: "سريع وملائم للهاتف وقابل للزحف ومفهرس" },
        { label: "الحضور المحلي", detail: "Google Business Profile والمراجعات والأدلة" },
        { label: "المحتوى", detail: "صفحة لكل خدمة وأجوبة حقيقية بالعربية والإنكليزية" },
        { label: "الثقة", detail: "أشخاص حقيقيون ودراسات حالة وإشارات من الآخرين" },
        { label: "البحث بالذكاء الاصطناعي", detail: "هوية واضحة وأجوبة قابلة للاقتباس وبيانات منظّمة واختبار" },
      ],
    },
  ),

  "ai-for-restaurants-lebanon": placed(
    "where-ai-helps",
    {
      kind: "flow",
      title: "How an assistant handles a customer message",
      caption: "The assistant answers what it knows and passes everything else to a person.",
      customer: { label: "Customer on WhatsApp", message: "Do you have a table for 4 tonight?" },
      assistant: { label: "AI assistant", detail: "Answers from your menu, hours and booking rules" },
      answered: { label: "Answered in seconds", detail: "In the customer's own language, at any hour" },
      handover: { label: "Handed to your team", detail: "Complaints, allergies and large events, with the conversation attached" },
      loop: "You read the conversations and keep improving the answers",
    },
    {
      kind: "flow",
      title: "كيف يتعامل المساعد مع رسالة زبون",
      caption: "يجيب المساعد عمّا يعرفه ويحوّل كل ما عداه إلى شخص.",
      customer: { label: "زبون على واتساب", message: "هل لديكم طاولة لأربعة أشخاص الليلة؟" },
      assistant: { label: "المساعد الذكي", detail: "يجيب من قائمتك وساعاتك وقواعد الحجز" },
      answered: { label: "جواب خلال ثوانٍ", detail: "بلغة الزبون نفسها وفي أي ساعة" },
      handover: { label: "يُحوَّل إلى فريقك", detail: "الشكاوى والحساسية والمناسبات الكبيرة، مع المحادثة مرفقة" },
      loop: "تقرأ المحادثات وتواصل تحسين الأجوبة",
    },
  ),

  "ai-for-real-estate-lebanon": placed(
    "where-ai-helps",
    {
      kind: "flow",
      title: "How an assistant handles a property enquiry",
      caption: "The assistant handles the first reply. Viewings, pricing and negotiation stay with your agents.",
      customer: { label: "Enquiry on WhatsApp", message: "Is the 3-bedroom apartment still available?" },
      assistant: { label: "AI assistant", detail: "Answers from your approved listing details and asks a few qualifying questions" },
      answered: { label: "First reply in seconds", detail: "With a clear next step" },
      handover: { label: "Qualified lead to the agent", detail: "Summary, contact details and viewing request, then the agent takes over" },
      loop: "You review the conversations and tighten the qualifying questions",
    },
    {
      kind: "flow",
      title: "كيف يتعامل المساعد مع استفسار عقاري",
      caption: "يتولى المساعد الرد الأول، وتبقى المعاينات والأسعار والتفاوض مع وكلائك.",
      customer: { label: "استفسار على واتساب", message: "هل الشقة ذات الغرف الثلاث ما زالت متاحة؟" },
      assistant: { label: "المساعد الذكي", detail: "يجيب من تفاصيل الإعلان التي اعتمدتها ويطرح بضعة أسئلة تأهيلية" },
      answered: { label: "ردّ أول خلال ثوانٍ", detail: "مع خطوة تالية واضحة" },
      handover: { label: "عميل مؤهل إلى الوكيل", detail: "ملخص وبيانات تواصل وطلب معاينة، ثم يتولى الوكيل الأمر" },
      loop: "تراجع المحادثات وتحكم أسئلة التأهيل",
    },
  ),

  "ai-for-clinics-lebanon": placed(
    "keep-human",
    {
      kind: "split",
      title: "Where the line sits in a clinic",
      caption: "A clinic assistant handles logistics only. Everything clinical stays with people.",
      line: "The line",
      left: {
        label: "The assistant handles",
        items: ["Opening hours and directions", "Appointment requests", "Reminders and preparation instructions", "Replies in Arabic, French and English"],
      },
      right: {
        label: "Your doctors and staff handle",
        items: ["Medical advice and diagnosis", "Symptoms and test results", "Anything clinical or urgent", "Complaints and sensitive cases"],
      },
    },
    {
      kind: "split",
      title: "أين يقع الخط الفاصل في العيادة",
      caption: "يتولى مساعد العيادة الأمور اللوجستية فقط، وكل ما هو سريري يبقى مع الأشخاص.",
      line: "الخط الفاصل",
      left: {
        label: "يتولاه المساعد",
        items: ["ساعات العمل والاتجاهات", "طلبات المواعيد", "التذكيرات وتعليمات التحضير", "الرد بالعربية والفرنسية والإنكليزية"],
      },
      right: {
        label: "يتولاه أطباؤك وفريقك",
        items: ["النصيحة الطبية والتشخيص", "الأعراض ونتائج الفحوص", "كل ما هو سريري أو عاجل", "الشكاوى والحالات الحساسة"],
      },
    },
  ),
};

export function getArticleFigure(lang: Lang, slug: string): PlacedFigure | undefined {
  return BY_SLUG[slug]?.[lang];
}
