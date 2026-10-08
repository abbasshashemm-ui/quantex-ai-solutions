import type { LocaleContent } from "@/lib/i18n/types";
import { CONTACT } from "@/lib/site/contact";

export const FR: LocaleContent = {
  locale: "fr",
  htmlLang: "fr",
  dir: "ltr",
  ogLocale: "fr_FR",
  switcher: { en: "English", ar: "العربية", fr: "Français" },

  home: {
    metaTitle: "Quantex | Sites web et assistants IA à Beyrouth, Liban",
    metaDescription:
      "Quantex est un studio de Beyrouth, au Liban. Sites web qui convainquent, assistants IA sur WhatsApp, logiciels sur mesure, automatisation et SEO.",
    hero: {
      eyebrow: "Beyrouth · Studio IA",
      headline: ["Automatisez.", "Développez.", "Dominez."],
      lede: "Des sites web qui attirent les clients et des assistants IA qui leur répondent. Conçus par un studio de Beyrouth que vous pouvez contacter directement.",
      primary: "Lancer un projet",
      secondary: "Voir ce que nous créons",
      chips: ["Plus de 10 clients payants", "Réponse sous 24 heures"],
    },
    beats: [
      {
        index: "01 / Sites web",
        title: "Des sites qui convertissent.",
        lede: "Rapides, clairs et conçus autour d'un seul objectif : transformer les visiteurs en demandes.",
        link: "Voir les sites web",
        slug: "high-converting-websites",
      },
      {
        index: "02 / Assistants",
        title: "Des assistants qui répondent.",
        lede: "Un chatbot qui connaît votre activité, répond sur votre site et sur WhatsApp, et vous passe la main quand une personne est nécessaire.",
        link: "Voir les assistants",
        slug: "custom-intelligent-chatbots",
      },
    ],
    siteCheck: {
      label: "Outil gratuit · 20 secondes",
      title: "Vos clients et l'IA trouvent-ils votre site ?",
      text: "Obtenez une note pour Google, la recherche par IA et la vitesse sur mobile, avec une liste de corrections en termes simples.",
      button: "Analyser mon site gratuitement",
    },
    aeo: {
      eyebrow: "Le studio",
      title: "Que fait Quantex ?",
      paragraphs: [
        "Quantex est un studio basé à Beyrouth. Nous créons des sites web qui transforment les visiteurs en clients, et des assistants IA qui répondent aux questions de vos clients sur votre site et sur WhatsApp, ainsi que les logiciels sur mesure, l'automatisation et le travail de référencement qui soutiennent votre activité.",
        "Les assistants sont formés sur vos propres informations, comme vos produits, vos prix et vos règles, et ils passent la conversation à une vraie personne dès que c'est nécessaire. Les sites sont rapides, clairs et faciles à trouver sur Google.",
        "Nous choisissons les bons outils pour chaque projet, vous êtes propriétaire de tout ce que nous créons, et vous travaillez directement avec la personne qui dirige le travail.",
      ],
      pillars: [
        { label: "Sites web", slug: "high-converting-websites", path: null },
        { label: "Assistants IA", slug: "custom-intelligent-chatbots", path: null },
        { label: "SEO", slug: "seo", path: null },
        { label: "À propos de Quantex", slug: null, path: "/about" },
      ],
    },
    services: {
      eyebrow: "Ce que nous créons",
      title: "Un studio. Six façons de grandir.",
      lede: "Commencez par un site et un assistant, ou choisissez exactement ce dont vous avez besoin. Tout est conçu pour fonctionner ensemble.",
      learnMore: "En savoir plus",
    },
    stats: [
      { value: "10+", label: "Clients payants" },
      { value: "6", label: "Services" },
      { value: "24h", label: "Délai de réponse" },
    ],
    process: {
      eyebrow: "Méthode",
      heading: "Comment se déroule un projet ?",
      support:
        "Vous savez toujours ce qui se passe, ce qui vient ensuite et ce dont nous avons besoin de votre part.",
      stages: [
        {
          n: "01",
          code: "PLAN",
          title: "Valider le plan",
          body: "Nous discutons de vos objectifs et repartons avec un plan écrit et clair.",
        },
        {
          n: "02",
          code: "CRÉER",
          title: "Nous construisons",
          body: "Le travail avance par courtes étapes, et vous validez chacune d'elles.",
        },
        {
          n: "03",
          code: "LANCER",
          title: "Tester et lancer",
          body: "Nous vérifions tout sur de vrais appareils, puis nous mettons en ligne ensemble.",
        },
        {
          n: "04",
          code: "SUIVI",
          title: "Assurer la suite",
          body: "Restez sur un forfait d'entretien si vous le souhaitez. Sinon, tout vous appartient.",
        },
      ],
    },
    guides: {
      eyebrow: "Guides",
      title: "Guides sur l'IA et la recherche",
      lede: "Des guides en langage simple pour utiliser l'IA dans votre activité et être trouvé sur Google et dans la recherche par IA, comme ChatGPT, Gemini et Perplexity.",
      readGuide: "Lire le guide",
      viewAll: "Voir tous les guides (en anglais)",
    },
    faq: {
      eyebrow: "Questions fréquentes",
      title: "Vos questions sur Quantex",
      lede: "Les réponses aux questions les plus fréquentes sur le studio et sa façon de travailler.",
      aboutLink: "En savoir plus sur le studio",
      items: [
        {
          question: "Que fait Quantex ?",
          answer:
            "Quantex est un studio basé à Beyrouth. Nous créons des sites web qui transforment les visiteurs en clients, des assistants IA qui répondent aux questions de vos clients sur votre site et sur WhatsApp, ainsi que les logiciels sur mesure, l'automatisation et le travail de référencement qui soutiennent votre activité. Nous travaillons avec des entreprises au Liban et à l'étranger.",
        },
        {
          question: "Qui est derrière Quantex ?",
          answer:
            "Quantex est dirigé par son fondateur, Abbas Hachem, développeur full-stack. Lorsque vous nous contactez, vous échangez directement avec lui tout au long du projet.",
        },
        {
          question: "Quels services propose Quantex ?",
          answer:
            "Six services : sites web, assistants IA et chatbots, automatisation des processus, logiciels sur mesure, visibilité dans les moteurs de recherche (SEO) et conception de systèmes. Vous pouvez en choisir un ou en combiner plusieurs.",
        },
        {
          question: "Avec combien de clients Quantex a-t-il travaillé ?",
          answer:
            "Avec plus de dix clients payants, sur des projets allant des assistants IA et des sites d'entreprise aux logiciels sur mesure.",
        },
        {
          question: "Comment contacter Quantex ?",
          answer: `Utilisez la page de contact quantexai.solutions/contact, écrivez à ${CONTACT.email}, ou envoyez-nous un message sur WhatsApp. Nous répondons sous 24 heures.`,
        },
        {
          question: "Où est basé Quantex ?",
          answer:
            "Quantex est basé à Beyrouth, au Liban, et travaille avec des clients sur place et à distance, au Moyen-Orient et dans le monde entier.",
        },
        {
          question: "Quantex peut-il créer un chatbot pour WhatsApp ?",
          answer:
            "Oui. Nous créons des assistants formés sur vos propres informations, comme vos produits, vos prix et vos règles. Ils répondent sur WhatsApp, sur votre site, ou les deux, et passent la conversation à une vraie personne quand c'est nécessaire.",
        },
        {
          question: "Serai-je propriétaire de ce que vous créez ?",
          answer:
            "Oui. Votre code, votre nom de domaine, vos comptes et votre contenu vous sont remis. Nous sommes des partenaires de la réalisation, pas les gardiens du résultat.",
        },
        {
          question: "Quels outils et quelles technologies utilisez-vous ?",
          answer:
            "Nous choisissons les bons outils pour chaque projet, au lieu d'imposer la même installation à tous les clients. Vous savez toujours ce qui est utilisé, et vous restez propriétaire de tout ce que nous créons.",
        },
      ],
    },
    closing: {
      promises: [
        {
          title: "Tout vous appartient",
          body: "Le code, le nom de domaine et les comptes vous sont remis.",
        },
        {
          title: "Réponse sous 24 heures",
          body: "Écrivez-nous et vous recevez une vraie réponse, pas une lettre type.",
        },
        {
          title: "Une ligne directe",
          body: "Vous parlez à la personne qui construit votre projet, sur WhatsApp ou par e-mail.",
        },
      ],
      title: "Dites-nous ce dont vous avez besoin.",
      primary: "Lancer un projet",
      whatsapp: "Écrivez-nous sur WhatsApp",
    },
  },

  serviceUi: {
    allServices: "Tous les services",
    eyebrow: "Services",
    inShort: "En bref",
    inPlainWords: "En termes simples",
    whatYouGet: "Ce que vous obtenez",
    howItWorks: "Comment ça se passe",
    whatElse: "Que proposons-nous d'autre ?",
    scopedTitle: "Tarif défini par projet",
    getQuote: "Demander un devis",
    readyTitle: "Prêt à commencer ?",
    readyLead:
      "Dites-nous ce dont vous avez besoin. Nous répondons sous 24 heures avec un plan concret et une première étape réaliste.",
    startProject: "Lancer un projet",
    whatsapp: "Écrivez-nous sur WhatsApp",
    bookCall: "Réserver un appel de 15 minutes",
    pricingTitle: "Tarifs",
    seePricing: "Voir tous les tarifs",
    facts: [
      { label: "Propriété", value: "Vous" },
      { label: "Réponse", value: "Sous 24 h" },
      { label: "Contact", value: "Direct" },
    ],
    aboutLink: { label: "À propos du studio", tagline: "Qui réalise vos projets" },
    contactLink: { label: "Lancer un projet", tagline: "Dites-nous ce qu'il vous faut" },
    seoTitleSuffix: "| Quantex",
  },

  services: {
    "high-converting-websites": {
      label: "Sites web",
      tagline: "Des sites rapides qui attirent des clients",
      description:
        "Des sites rapides et clairs, conçus pour transformer les visiteurs en demandes.",
      overview:
        "Votre site est la première conversation qu'un client a avec votre entreprise. Nous créons des sites qui se chargent vite sur tous les téléphones, disent clairement ce que vous faites, et rendent la prochaine étape (appeler, écrire ou demander un devis) impossible à manquer.",
      highlights: [
        "Rapide sur tous les téléphones",
        "Une seule action claire",
        "Visible sur Google",
      ],
      deliverables: [
        "Un site rapide, pensé d'abord pour le mobile, construit autour d'un objectif clair",
        "Des textes et une mise en page qui expliquent votre activité en quelques secondes",
        "Un suivi en place, pour voir quelles pages apportent des demandes",
        "Les bases du référencement intégrées dès le premier jour",
        "Un site que vous pouvez mettre à jour vous-même, ou que nous mettons à jour pour vous",
        "Testé sur de vrais téléphones, tablettes et navigateurs avant le lancement",
      ],
      steps: [
        {
          label: "Cadrer",
          detail:
            "Nous définissons à qui s'adresse le site, ce que vous proposez et ce que les visiteurs doivent faire.",
        },
        {
          label: "Esquisser",
          detail:
            "Les pages clés sont dessinées avant le début du travail de conception.",
        },
        {
          label: "Construire",
          detail:
            "Les textes et le design se rejoignent en courtes étapes de validation.",
        },
        {
          label: "Apprendre",
          detail:
            "Après le lancement, nous observons ce que font les visiteurs et proposons des améliorations.",
        },
      ],
    },
    "custom-intelligent-chatbots": {
      label: "Assistants IA",
      tagline: "Répond aux clients sur le web et WhatsApp",
      description:
        "Des assistants qui connaissent votre activité, répondent aux clients sur votre site et sur WhatsApp, et vous passent la main quand une personne est nécessaire.",
      overview:
        "Un widget de discussion générique frustre les clients quand ses réponses sont fausses ou ne vous ressemblent pas. Nous créons des assistants formés sur vos propres informations (vos produits, vos prix, vos règles et votre ton), pour que les réponses restent exactes, vous ressemblent et passent la conversation à une vraie personne dès que c'est important.",
      highlights: [
        "Parle comme vous",
        "Passe la main à une personne",
        "Web et WhatsApp",
      ],
      deliverables: [
        "Un assistant formé sur vos produits, vos services et vos règles",
        "Des réponses sur votre site, sur WhatsApp, ou les deux",
        "Des limites claires sur ce qu'il répond ou non, avec un transfert vers vous",
        "Un historique des conversations, pour voir ce que demandent vos clients",
        "Un moyen simple de mettre à jour ce qu'il sait à mesure que votre activité évolue",
        "Des liens avec vos outils de réservation, de CRM ou de support si nécessaire",
      ],
      steps: [
        {
          label: "Recueillir",
          detail:
            "Nous listons les questions les plus fréquentes de vos clients et ce à quoi l'assistant ne doit jamais répondre.",
        },
        {
          label: "Rédiger",
          detail:
            "Vous lisez des exemples de conversations et nous dites ce qu'il faut changer.",
        },
        {
          label: "Tester",
          detail:
            "Nous l'éprouvons avec des questions délicates et inhabituelles avant sa mise en ligne.",
        },
        {
          label: "Améliorer",
          detail: "Nous examinons de vraies conversations et ajustons les réponses.",
        },
      ],
    },
    "business-process-automation": {
      label: "Automatisation",
      tagline: "Moins de tâches manuelles, moins d'erreurs",
      description:
        "Les tâches répétitives se font automatiquement, pour que le temps de votre équipe aille à vos clients.",
      overview:
        "Recopier des données d'un tableur à l'autre, relancer des validations, transférer des e-mails : ces petites tâches représentent des heures chaque semaine. Nous cartographions la façon dont le travail circule réellement dans votre entreprise et nous automatisons les étapes répétitives, en reliant les outils que vous utilisez déjà pour que l'information soit saisie une seule fois et reste juste.",
      highlights: [
        "Moins d'étapes manuelles",
        "Une vision claire",
        "Des traces claires",
      ],
      deliverables: [
        "Une cartographie écrite de la façon dont vos processus fonctionnent aujourd'hui",
        "Des automatisations qui font circuler l'information entre vos outils",
        "Des validations et des alertes qui parviennent à la bonne personne au bon moment",
        "Un tableau de bord simple qui montre ce qui ralentit le travail",
        "Des flux testés, avec des consignes simples pour votre équipe",
        "Un historique de ce qui a été exécuté et quand, pour votre tranquillité",
      ],
      steps: [
        {
          label: "Cartographier",
          detail:
            "Nous suivons le travail et mesurons le temps que prend chaque étape.",
        },
        {
          label: "Classer",
          detail:
            "Nous choisissons les automatisations qui font gagner le plus de temps avec le moins de risque.",
        },
        {
          label: "Tester",
          detail: "Une équipe l'essaie d'abord, avant qu'il n'arrive chez tout le monde.",
        },
        {
          label: "Étendre",
          detail:
            "Nous ajustons selon les retours jusqu'à ce que les chiffres s'améliorent.",
        },
      ],
    },
    "custom-software-development": {
      label: "Logiciels sur mesure",
      tagline: "Des applications et portails faits pour vous",
      description:
        "Des logiciels construits autour de la façon dont votre entreprise fonctionne, et non l'inverse.",
      overview:
        "Quand les outils du commerce ne conviennent pas, nous en créons qui conviennent : outils internes, portails clients ou produits complets. Chaque projet est cadré en langage simple, livré par étapes que vous pouvez essayer, puis remis à votre équipe, qui en est propriétaire.",
      highlights: [
        "Adapté à votre façon de travailler",
        "Livré par étapes",
        "À vous pour toujours",
      ],
      deliverables: [
        "Une application fonctionnelle, conçue autour de la façon dont travaille votre équipe",
        "Des accès différents pour le personnel, les clients et les administrateurs",
        "Des connexions avec les autres outils que vous utilisez",
        "Des tests sur de vrais appareils à chaque étape",
        "Un accompagnement au lancement et une documentation claire",
        "Une aide continue facultative pour de nouvelles fonctionnalités",
      ],
      steps: [
        {
          label: "Explorer",
          detail:
            "Nous identifions qui l'utilisera, ce qui pourrait mal tourner et comment le succès sera mesuré.",
        },
        {
          label: "Prototyper",
          detail:
            "Les écrans les plus importants sont testés avant la réalisation complète.",
        },
        {
          label: "Construire",
          detail:
            "De courts cycles, avec quelque chose à essayer à la fin de chacun.",
        },
        {
          label: "Lancer",
          detail:
            "Nous mettons en ligne ensemble et convenons du suivi après le lancement.",
        },
      ],
    },
    seo: {
      label: "SEO",
      tagline: "Soyez visible sur Google",
      description:
        "Nous corrigeons ce qui freine votre site sur Google, pour que les bons clients puissent vous trouver.",
      overview:
        "Le classement ne dépend pas seulement des mots-clés. Il dépend de la capacité de Google à lire votre site, de la rapidité de vos pages et de la façon dont votre contenu répond à ce que les gens recherchent vraiment. Nous vérifions ce que voient réellement les moteurs de recherche et les visiteurs, corrigeons les problèmes techniques et les lacunes, et évitons les raccourcis risqués ou le contenu de remplissage.",
      highlights: [
        "Bilan de santé du site",
        "Pages plus rapides",
        "Rapports clairs",
      ],
      deliverables: [
        "Un bilan complet de votre site, avec une liste de corrections classées par priorité",
        "De meilleurs titres, descriptions et intertitres sur chaque page importante",
        "Des corrections pour que Google trouve et comprenne vos pages",
        "Des gains de vitesse, surtout sur téléphone",
        "Un suivi de recherche en place, avec un point de départ et des rapports mensuels",
      ],
      steps: [
        {
          label: "Vérifier",
          detail:
            "Nous examinons la façon dont votre site est lu, sa vitesse de chargement et son classement actuel.",
        },
        {
          label: "Corriger d'abord",
          detail: "Les problèmes qui bloquent Google passent en premier.",
        },
        {
          label: "Améliorer",
          detail:
            "Puis la structure des pages, la vitesse et les liens entre les pages.",
        },
        {
          label: "Suivre",
          detail:
            "Chaque mois, un point sur le nombre de personnes qui voient et cliquent sur votre site.",
        },
      ],
    },
    "custom-system-architectures": {
      label: "Conception de systèmes",
      tagline: "Un plan qui évolue avec vous",
      description:
        "Un plan clair pour la technologie qui soutient votre activité, conçu pour évoluer avec vous.",
      overview:
        "Quand une entreprise grandit, la technologie qui la soutient peut commencer à craquer : outils lents, montages fragiles, failles de sécurité. Nous concevons un plan adapté à votre situation d'aujourd'hui et à votre direction, expliqué en langage simple pour que les décideurs et les ingénieurs puissent tous deux le suivre.",
      highlights: [
        "Un plan en langage simple",
        "Conçu pour évoluer",
        "Des étapes progressives",
      ],
      deliverables: [
        "Un plan écrit que votre direction peut réellement lire",
        "Des schémas montrant comment tout s'articule",
        "Un moyen sûr de tester les changements avant leur mise en service",
        "Des bases de sécurité adaptées aux exigences de votre secteur",
        "Des recommandations sur l'hébergement, les sauvegardes et la surveillance, lorsqu'elles entrent dans le cadre",
      ],
      steps: [
        {
          label: "Examiner",
          detail:
            "Nous étudions vos systèmes actuels, qui en est responsable et ce qui les limite.",
        },
        {
          label: "Tester",
          detail: "Les hypothèses risquées sont vérifiées par de petites expériences.",
        },
        {
          label: "Planifier",
          detail:
            "Un parcours par phases : d'abord stabiliser, puis améliorer, puis passer à l'échelle.",
        },
        {
          label: "Valider",
          detail:
            "Nous l'affinons avec votre équipe jusqu'à ce que les prochaines étapes soient claires.",
        },
      ],
    },
  },

  about: {
    metaTitle: "À propos de Quantex | Studio web et IA à Beyrouth",
    metaDescription:
      "Quantex est un studio de Beyrouth dirigé par Abbas Hachem. Sites web, assistants IA, logiciels sur mesure et automatisation, avec une ligne directe.",
    back: "Accueil",
    hero: {
      eyebrow: "À propos de Quantex",
      title: "Un studio de Beyrouth qui tient ses promesses.",
      lead: "Quantex est un studio basé à Beyrouth. Nous créons des sites web qui attirent des clients, des assistants IA qui leur répondent, ainsi que les logiciels et l'automatisation qui soutiennent votre activité, et nous expliquons tout en langage simple, dès le premier appel.",
    },
    story: {
      eyebrow: "Parcours",
      title: "Qui est derrière Quantex ?",
      paragraphs: [
        "Abbas Hachem a fondé Quantex après des années passées à créer des logiciels pour des start-ups et des entreprises. Le constat était toujours le même : beaucoup de discours sur la croissance, mais des sites lents, des chatbots qui donnaient de mauvaises réponses et des systèmes difficiles à faire évoluer une fois les concepteurs partis.",
        "Quantex est conçu pour rompre avec ce schéma. Nous expliquons les choses en langage simple, nous testons tôt les points risqués, et nous remettons un travail que votre équipe peut réellement faire fonctionner. Nous choisissons les bons outils pour chaque projet au lieu d'imposer le même modèle à tous les clients.",
        {
          before: "Nous avons travaillé avec ",
          highlight: "plus de 10 clients payants",
          after:
            " au Liban et dans la région, sur des sites web, des assistants IA, des logiciels sur mesure et de l'automatisation. Lorsque vous nous contactez, vous parlez directement à Abbas, la personne qui dirige le travail.",
        },
      ],
    },
    stats: [
      { value: "10+", label: "Clients payants" },
      { value: "6", label: "Services" },
      { value: "24h", label: "Délai de réponse" },
    ],
    values: [
      {
        index: "01",
        title: "Tout vous appartient",
        body: "Votre code, votre nom de domaine, vos comptes et votre contenu vous sont remis. Nous sommes des partenaires de la réalisation, pas les gardiens du résultat.",
      },
      {
        index: "02",
        title: "Une ligne directe",
        body: "Vous parlez à la personne qui fait le travail, sur WhatsApp ou par e-mail. Pas de chargés de compte, et pas d'attente que les messages soient transmis.",
      },
      {
        index: "03",
        title: "Une réponse sous 24 heures",
        body: "Écrivez-nous et vous recevez, sous 24 heures, la réponse d'une vraie personne, pas un message automatique.",
      },
      {
        index: "04",
        title: "Une IA honnête",
        body: "Nos assistants ne répondent qu'à partir de vos informations, le disent quand ils ne savent pas, et passent la main à une personne quand c'est important.",
      },
    ],
    capabilities: {
      eyebrow: "Services",
      title: "Que peut créer Quantex ?",
      lead: "Choisissez un service ou combinez-en plusieurs. Tout est conçu pour fonctionner ensemble, de votre site à votre assistant, jusqu'aux systèmes qui les soutiennent.",
    },
    cta: {
      eyebrow: "Prochaine étape",
      title: "Prêt à lancer un projet ?",
      lead: "Dites-nous ce dont vous avez besoin. Nous répondons sous 24 heures avec des options et une première étape réaliste.",
      primary: "Lancer un projet",
      secondary: "Voir ce que nous créons",
    },
    founderRole: "Développeur full-stack",
  },

  contact: {
    metaTitle: "Contact | Quantex, studio web et IA à Beyrouth",
    metaDescription:
      "Écrivez à Quantex pour un site web, un assistant IA, un logiciel sur mesure ou de l'automatisation. Une vraie personne vous répond sous 24 heures.",
    back: "Accueil",
    eyebrow: "Contact",
    title: "Dites-nous ce dont vous avez besoin.",
    lead: "Nous répondons sous 24 heures.",
    intro:
      "Un site web, un assistant IA, un logiciel sur mesure ou de l'automatisation : envoyez un bref message et nous vous indiquerons la prochaine étape.",
    browsing: "Vous préférez d'abord explorer ?",
    seeBuild: "Voir ce que nous créons",
    aboutStudio: "À propos du studio",
    channels: {
      email: "E-mail",
      phone: "Téléphone / WhatsApp",
      location: "Lieu",
      instagram: "Instagram",
    },
    bookTitle: "Une personne vous répond sous 24 heures",
    bookText:
      "Vous préférez échanger tout de suite ? Réservez un appel de 15 minutes sur WhatsApp.",
    bookButton: "Réserver un appel sur WhatsApp",
    form: {
      title: "Envoyez-nous un brief",
      intro: "Votre nom, votre e-mail et ce dont vous avez besoin. Le téléphone est facultatif.",
      name: "Nom *",
      namePlaceholder: "Votre nom complet",
      email: "E-mail *",
      emailPlaceholder: "vous@entreprise.com",
      phone: "Téléphone (facultatif)",
      phonePlaceholder: "+961 XX XXX XXX",
      message: "Message *",
      messagePlaceholder: "De quoi avez-vous besoin, et pour quand ?",
      consent:
        "En envoyant ce formulaire, vous acceptez que nous utilisions votre nom, votre e-mail, votre numéro de téléphone et votre message pour répondre à votre demande. L'envoi ouvre WhatsApp, dont les conditions de confidentialité s'appliquent aussi. Consultez notre",
      privacy: "Politique de confidentialité",
      submit: "Envoyer le brief",
      tooLong: "Le message est trop long. Veuillez le raccourcir et réessayer.",
      waGreeting: "Bonjour QUANTEX,",
      waName: "Nom",
      waEmail: "E-mail",
      waPhone: "Téléphone",
    },
  },
};
