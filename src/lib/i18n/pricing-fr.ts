import type { PriceGroup } from "@/lib/pricing/data";

export const PRICING_FR_PATH = "/fr/pricing";

export const PRICE_GROUPS_FR: PriceGroup[] = [
  {
    id: "websites",
    serviceSlug: "high-converting-websites",
    title: "Sites web",
    intro:
      "Des projets au forfait. Le site, le code et le nom de domaine vous appartiennent.",
    plans: [
      {
        id: "business",
        name: "Site vitrine",
        price: "À partir de $700",
        blurb:
          "Un site clair et rapide qui explique votre activité et vous apporte des demandes.",
        features: [
          "Jusqu'à 7 pages, conçues d'abord pour le mobile",
          "Bouton WhatsApp et formulaire de contact",
          "Optimisation de la vitesse et bases du référencement",
          "Outils de mesure pour voir ce qui fonctionne",
          "2 séries de modifications",
          "En ligne en 2 semaines environ",
        ],
      },
      {
        id: "growth",
        name: "Site de croissance",
        price: "À partir de $1,400",
        blurb:
          "Pour les entreprises qui veulent des contacts qualifiés, en anglais et en arabe.",
        featured: true,
        features: [
          "Tout ce qui est inclus dans le Site vitrine",
          "Jusqu'à 15 pages, en anglais et en arabe",
          "Des pages que vous modifiez vous-même",
          "Référencement complet : structure, schema, plan du site",
          "Suivi des contacts par formulaire, appel et WhatsApp",
          "Une séance de prise en main pour gérer le site",
          "En ligne en 3 à 4 semaines",
        ],
      },
      {
        id: "store",
        name: "Boutique en ligne",
        price: "À partir de $2,200",
        blurb:
          "Vendez vos produits en ligne, avec un paiement qui fonctionne sur téléphone.",
        features: [
          "Tout ce qui est inclus dans le Site de croissance",
          "Catalogue de produits et paiement sur mobile",
          "Configuration du paiement avec votre prestataire",
          "Vos 20 premiers produits mis en ligne par nos soins",
          "E-mails de commande et bases de la gestion de stock",
          "En ligne en 4 à 6 semaines",
        ],
      },
    ],
    note: "Forfait d'entretien facultatif à partir de $40 par mois : mises à jour, sauvegardes et petites modifications.",
  },
  {
    id: "seo",
    serviceSlug: "seo",
    title: "SEO et recherche par IA",
    intro:
      "Un travail mensuel, sans contrat long. Soyez visible sur Google, et cité par ChatGPT, Gemini et Perplexity.",
    plans: [
      {
        id: "seo-foundation",
        name: "SEO",
        price: "$250",
        period: "/ mois",
        blurb: "Soyez visible sur Google au Liban et dans les marchés voisins.",
        features: [
          "Audit complet et liste claire des priorités",
          "Fiche Google Business Profile créée et optimisée",
          "Corrections techniques et vitesse",
          "Suivi de 10 mots-clés maximum",
          "1 contenu par mois",
          "Rapport mensuel en termes simples",
        ],
      },
      {
        id: "seo-ai",
        name: "SEO + recherche par IA",
        price: "$800",
        period: "/ mois",
        blurb:
          "Tout le SEO, et en plus : devenir la réponse que donnent les assistants IA.",
        featured: true,
        features: [
          "Tout ce qui est inclus dans le SEO",
          "Pages réécrites pour que les assistants IA puissent les citer",
          "Schema, FAQ et fichier llms.txt pour les robots d'IA",
          "Suivi de la façon dont ChatGPT, Gemini et Perplexity vous mentionnent",
          "4 contenus par mois, en anglais et en arabe",
          "Appel mensuel pour passer les résultats en revue",
        ],
      },
    ],
    note: "Les résultats demandent généralement de 3 à 6 mois. Engagement mois par mois, résiliable à tout moment.",
  },
  {
    id: "assistants",
    serviceSlug: "custom-intelligent-chatbots",
    title: "Assistants IA",
    intro:
      "Un abonnement : nous le concevons, l'hébergeons et nous en occupons. Mise en place une seule fois, puis paiement mensuel.",
    plans: [
      {
        id: "assistant-web",
        name: "Assistant pour site web",
        price: "À partir de $120",
        period: "/ mois",
        setup: "Mise en place à partir de $400",
        blurb: "Répond à vos clients sur votre site, à toute heure.",
        features: [
          "Formé sur vos services, vos prix et vos règles",
          "En arabe, en anglais et en arabizi",
          "Vous passe la conversation quand c'est nécessaire",
          "Hébergement, mises à jour et corrections inclus",
          "Rapport mensuel sur les questions de vos clients",
        ],
      },
      {
        id: "assistant-whatsapp",
        name: "Site web + WhatsApp",
        price: "À partir de $250",
        period: "/ mois",
        setup: "Mise en place à partir de $600",
        blurb: "Le même assistant sur votre site et sur votre numéro WhatsApp.",
        featured: true,
        features: [
          "Tout ce qui est inclus dans l'Assistant pour site web",
          "Relié à votre numéro WhatsApp Business",
          "Recueille noms, numéros et demandes pour votre équipe",
          "Réservations et demandes de devis envoyées directement à vous",
          "Corrections traitées en priorité",
        ],
      },
    ],
    note: "Les frais WhatsApp et d'utilisation de l'IA sont facturés au prix coûtant. Ils restent généralement faibles pour une petite entreprise.",
  },
];

export const CUSTOM_SCOPES_FR = [
  {
    title: "Automatisation des processus",
    slug: "business-process-automation",
    text: "Tarif établi après avoir cartographié votre processus, car chaque flux de travail est différent.",
  },
  {
    title: "Logiciels sur mesure",
    slug: "custom-software-development",
    text: "Devis ferme après un court appel de cadrage. Pas de mauvaise surprise en cours de projet.",
  },
  {
    title: "Conception de systèmes",
    slug: "custom-system-architectures",
    text: "Défini selon vos systèmes et vos objectifs, avec un devis ferme dès le départ.",
  },
] as const;

export const PRICING_FAQ_FR = [
  {
    question: "Pourquoi les prix sont-ils des prix « à partir de » ?",
    answer:
      "Chaque entreprise est un peu différente : le prix final est confirmé après un court appel. Un prix « à partir de » est le vrai point de départ, pas un prix d'appel.",
  },
  {
    question: "Dans quelle devise sont les prix ?",
    answer: "En dollars américains.",
  },
  {
    question:
      "Pourquoi l'automatisation, les logiciels sur mesure et la conception de systèmes n'ont-ils pas de prix ici ?",
    answer:
      "Ces projets dépendent entièrement de votre processus et de vos systèmes. Nous les cadrons d'abord, puis nous vous remettons un devis ferme : vous connaissez le coût avant le début du travail.",
  },
  {
    question: "Qu'est-ce qui n'est pas inclus ?",
    answer:
      "Les coûts de tiers, comme le renouvellement du nom de domaine, le budget publicitaire, les frais du prestataire de paiement et les frais WhatsApp ou d'utilisation de l'IA. Nous vous indiquons chacun d'eux dès le départ.",
  },
  {
    question: "Est-ce que je suis propriétaire de ce que vous créez ?",
    answer:
      "Oui. Le code, le nom de domaine, les comptes et le contenu vous appartiennent, pour tous les projets de sites web et de logiciels.",
  },
] as const;
