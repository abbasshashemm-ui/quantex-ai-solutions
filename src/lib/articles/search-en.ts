import type { Article } from "./types";

const DATE = { datePublished: "2026-10-07", dateModified: "2026-10-07", displayDate: "October 7, 2026" } as const;

export const SEARCH_ARTICLES_EN: Article[] = [
  {
    slug: "seo-aeo-geo-explained",
    title: "SEO, AEO and GEO Explained: How Search Works Now",
    seoTitle: "SEO vs AEO vs GEO Explained: How to Be Found in AI Search (2026)",
    description:
      "SEO, AEO and GEO explained in plain language: what each one means, how they differ, and what Lebanese and international businesses should do to be found in Google and in AI search engines.",
    summary:
      "SEO gets you ranked in search results. AEO (answer engine optimization) gets your content used as the direct answer. GEO (generative engine optimization) gets your business mentioned and cited when people ask ChatGPT, Gemini, Perplexity, Claude or Google's AI features. They overlap heavily, and the foundation is the same: clear, accurate, well-structured content on a fast site that other trusted sources refer to. This guide explains each one and what to do about it.",
    readingTime: "7 min read",
    keywords: ["SEO AEO GEO", "generative engine optimization", "answer engine optimization", "AI search optimization", "SEO Lebanon", "AI search visibility"],
    ...DATE,
    sections: [
      {
        id: "what-changed",
        heading: "What has changed about how people search?",
        paragraphs: [
          "People still use Google, but more and more they also ask an AI tool a full question and read a written answer. Google shows AI-written summaries above the results for many searches, and tools like ChatGPT, Gemini, Perplexity and Claude can search the web and answer in conversation, often naming the businesses and websites they drew from.",
          "That means there are now two places to be found: in the list of results, and inside the answer itself. A business that only works on the first is invisible in the second.",
        ],
      },
      {
        id: "seo",
        heading: "What is SEO?",
        paragraphs: [
          "Search engine optimization is the work of making your website rank in traditional search results. It rests on three things: content that answers what people actually search for, a technically sound site that loads fast and can be crawled, and links and mentions from other trusted sites that show you are credible.",
          "For a local business it also includes your Google Business Profile, your reviews, and consistent name, address and phone details across the web.",
        ],
      },
      {
        id: "aeo",
        heading: "What is AEO?",
        paragraphs: [
          "Answer engine optimization means shaping your content so that a search feature, voice assistant or AI summary can lift a direct answer from it. Instead of hoping someone clicks a long page, you make the answer easy to find and quote.",
        ],
        list: [
          { title: "Write the question as a heading", body: "Use headings that match how people ask, such as \"How much does a website cost in Lebanon?\"" },
          { title: "Answer in the first lines", body: "Put a short, direct answer of one to three sentences right under the heading, then expand." },
          { title: "Use FAQ sections", body: "Real questions with clear answers, and matching structured data so machines understand the page." },
          { title: "Be specific", body: "Name the place, the service and the audience. Vague pages are rarely chosen as the answer." },
        ],
      },
      {
        id: "geo",
        heading: "What is GEO?",
        paragraphs: [
          "Generative engine optimization is about being included and named in answers written by generative AI tools. These systems gather information from many sources and then write a response, so being a clear, trustworthy and widely referenced source improves your chances of being used.",
          "Nobody outside the AI companies knows the exact rules, and they change. Anyone who promises a guaranteed spot in ChatGPT is guessing. What is known is that these tools favor content that is clear, factual, current, and supported by other sources.",
        ],
        list: [
          { title: "Make content easy to quote", body: "Short, self-contained, factual statements that still make sense when lifted out of the page." },
          { title: "Be consistent about who you are", body: "Describe your business the same way on your site, your profiles and directories: what you do, where, and for whom." },
          { title: "Earn mentions elsewhere", body: "Reviews, directories, press, partners and client sites that mention you give AI systems more evidence that you exist and are credible." },
          { title: "Let crawlers in", body: "Check that your site does not block search and AI crawlers, and that pages load without needing a login or heavy scripts." },
          { title: "Show who wrote it and when", body: "Named authors, real contact details and visible dates build trust and keep content fresh." },
          { title: "Publish original material", body: "Case studies, your own numbers and real experience give AI tools something they cannot get from anywhere else." },
        ],
      },
      {
        id: "differences",
        heading: "How do SEO, AEO and GEO differ?",
        paragraphs: [
          "SEO aims for a position in a list of links. AEO aims to be the answer a search feature shows. GEO aims to be the source an AI tool names when it writes its own answer. The work overlaps: a fast, clear, well-structured site with genuine expertise and outside mentions helps all three.",
          "Because of that overlap, there is no need to choose. Treat SEO as the foundation, and shape the content so it also works as a direct, quotable answer.",
        ],
      },
      {
        id: "lebanon",
        heading: "What should businesses in Lebanon do first?",
        paragraphs: [],
        list: [
          { title: "Fix the basics", body: "A fast, mobile-friendly site, clear titles and descriptions, and every important page reachable by a link." },
          { title: "Create your Google Business Profile", body: "Fill it in completely, add photos, and ask customers for reviews." },
          { title: "Publish in Arabic as well as English", body: "Arabic searches are far less crowded, and AI tools answer in the language of the question." },
          { title: "Answer real questions", body: "Write pages and FAQs from the questions customers actually ask you." },
          { title: "Get mentioned", body: "Directories, local media, partners and client websites." },
          { title: "Check what AI says about you", body: "Ask ChatGPT, Gemini and Perplexity about your service and your area. Note what they say, who they cite, and where you are missing." },
        ],
      },
      {
        id: "next-step",
        heading: "What is the next step?",
        paragraphs: [
          "Quantex builds fast websites and handles search visibility, including SEO and AI search, for businesses in Lebanon and worldwide. If you want to know where you stand today, message us and you will get a reply from the founder within 24 hours.",
        ],
      },
    ],
    faq: [
      { question: "What is the difference between SEO and GEO?", answer: "SEO aims to rank your pages in search results. GEO aims to get your business mentioned and cited in answers written by AI tools such as ChatGPT, Gemini and Perplexity. They overlap, and good SEO is the foundation for GEO." },
      { question: "Can anyone guarantee that ChatGPT will recommend my business?", answer: "No. The systems are not public and they change. What you can do is make your business clear, credible and widely referenced, which improves your chances." },
      { question: "Do I need to do all three?", answer: "You do not need separate projects. A strong site with clear, quotable answers and outside mentions serves all three." },
    ],
  },
  {
    slug: "get-recommended-by-chatgpt-and-ai-search",
    title: "How to Get Your Business Recommended by ChatGPT, Gemini and AI Search",
    seoTitle: "How to Get Recommended by ChatGPT, Gemini and Google AI Overviews (2026)",
    description:
      "A practical guide to appearing in AI search: how ChatGPT, Gemini, Perplexity, Claude and Google AI Overviews find businesses, and what to change on your website and across the web.",
    summary:
      "AI search tools recommend businesses they can find, understand and trust. To be one of them, make your site crawlable, describe your business clearly and consistently, answer real customer questions in short quotable form, and earn mentions on other trusted sites. Then test regularly by asking the AI tools what they say about you. No one can guarantee a result, but these steps make you far easier to recommend.",
    readingTime: "8 min read",
    keywords: ["get recommended by ChatGPT", "AI search visibility", "Google AI Overviews", "Perplexity", "Gemini", "ChatGPT SEO", "AI search Lebanon"],
    ...DATE,
    sections: [
      {
        id: "how-ai-finds",
        heading: "How do AI search tools decide which businesses to mention?",
        paragraphs: [
          "AI tools combine what they learned in training with live web search. When you ask for a recommendation, they search, read several pages, and write an answer that often links or names the sources. The businesses that appear are the ones whose information was easy to find, easy to understand, and backed up by other sources.",
          "The exact weighting is not published and differs between tools, so treat anything more specific than this with caution. The steps below follow what is consistently useful.",
        ],
      },
      {
        id: "crawlable",
        heading: "Step 1: Can AI tools actually reach your site?",
        paragraphs: [],
        list: [
          { title: "Do not block crawlers", body: "Check your robots.txt. If it blocks search and AI crawlers, they cannot read you. Allow the major search crawlers unless you have a reason not to." },
          { title: "Keep key content in plain HTML", body: "Pages that depend on heavy scripts, logins or pop-ups are harder for crawlers to read." },
          { title: "Submit a sitemap", body: "Submit it in Google Search Console and Bing Webmaster Tools. Several AI tools rely on Bing or Google's index." },
          { title: "Be fast and mobile friendly", body: "Slow or broken pages are skipped." },
        ],
      },
      {
        id: "clear-identity",
        heading: "Step 2: Do you describe your business clearly and consistently?",
        paragraphs: [
          "An AI tool should be able to finish this sentence about you from your own pages: \"[Business] is a [type of business] in [place] that helps [audience] with [services].\" Put that statement on your homepage, your about page and your profiles, in the same words.",
          "Add an about page with real names, a real address and contact details, and structured data that states your business type, location and services, so machines do not have to guess.",
        ],
      },
      {
        id: "answers",
        heading: "Step 3: Do you answer the questions people actually ask?",
        paragraphs: [
          "People ask AI tools in full sentences: \"Who builds WhatsApp chatbots in Beirut?\", \"How much does a website cost in Lebanon?\", \"Is AI useful for a small clinic?\" Write pages and FAQs for those exact questions, with a short direct answer first and detail after.",
          "Be specific and honest. Include prices or ranges where you can, say who the service is for, and say when it is not a fit. Pages that read as genuinely helpful are more likely to be used than pages that read as advertising.",
        ],
      },
      {
        id: "mentions",
        heading: "Step 4: Does anyone else vouch for you?",
        paragraphs: [
          "AI tools are cautious about claims that only come from the business itself. Mentions elsewhere count for a lot:",
        ],
        list: [
          { title: "Google reviews and directory listings", body: "Keep your details identical everywhere and ask happy customers to review you." },
          { title: "Industry directories and review sites", body: "Platforms for agencies and software providers often appear in AI answers." },
          { title: "Local media and partners", body: "Interviews, guest articles and partner pages that link to you." },
          { title: "Client websites", body: "A short credit or link from sites you built." },
        ],
      },
      {
        id: "original",
        heading: "Step 5: Do you offer something no one else does?",
        paragraphs: [
          "Original material is the strongest signal because it cannot be copied from elsewhere: case studies with real results, your own data, photos of real work, and the experience of the people behind the business. Name the author and date your content, and update it when things change.",
        ],
      },
      {
        id: "arabic",
        heading: "Why does Arabic matter for AI search in Lebanon?",
        paragraphs: [
          "People ask AI tools in Arabic, and the tools reply in Arabic using Arabic sources. Far fewer Lebanese businesses publish good Arabic content, so a clear Arabic page can stand out. Give the Arabic and English versions proper language tags and link them to each other.",
        ],
      },
      {
        id: "measure",
        heading: "How do you measure whether it is working?",
        paragraphs: [],
        list: [
          { title: "Ask the tools", body: "Once a month, ask ChatGPT, Gemini, Perplexity and Google about your service and your area, in English and Arabic. Record whether you are named and who is cited instead." },
          { title: "Watch referral traffic", body: "In your analytics, look for visits that come from AI tools and search engines." },
          { title: "Use Search Console", body: "See which questions and pages bring impressions and clicks." },
          { title: "Be patient", body: "Changes take weeks or months to show, and results vary between tools." },
        ],
      },
      {
        id: "next-step",
        heading: "What is the next step?",
        paragraphs: [
          "Quantex builds websites that are fast, clear and structured for both search engines and AI tools, and helps with SEO and AI search visibility. Message us for an honest look at where your business stands today.",
        ],
      },
    ],
    faq: [
      { question: "How do I get ChatGPT to recommend my business?", answer: "Make your site crawlable, describe your business clearly and consistently, answer customer questions in short quotable form, and earn mentions on other trusted sites. No one can guarantee a recommendation." },
      { question: "Does Google AI Overviews use my website?", answer: "It can. Google's AI features draw on pages in Google's search index, so a well-indexed, clear and trustworthy page is more likely to be used." },
      { question: "How long does it take?", answer: "Usually weeks to months. Technical fixes show up first, and trust built through reviews and mentions takes longer." },
    ],
  },
  {
    slug: "search-visibility-checklist",
    title: "Search Visibility Checklist: SEO and AI Search for Lebanese Businesses",
    seoTitle: "Search Visibility Checklist: SEO and AI Search for Businesses in Lebanon (2026)",
    description:
      "A practical checklist for search visibility in Lebanon: technical SEO, local SEO, Arabic content, structured data, and optimization for AI search engines like ChatGPT and Google AI Overviews.",
    summary:
      "Search visibility means being found wherever customers look: Google results, maps, and increasingly AI answers. This checklist covers the foundations in five groups: technical basics, local presence, content, trust, and AI search. Work through it in order. Most businesses in Lebanon can fix the first groups in a few weeks.",
    readingTime: "6 min read",
    keywords: ["search visibility checklist", "SEO checklist Lebanon", "local SEO Lebanon", "AI search optimization checklist", "Google Business Profile Lebanon"],
    ...DATE,
    sections: [
      {
        id: "technical",
        heading: "1. Technical basics",
        paragraphs: [],
        list: [
          { title: "Fast and mobile friendly", body: "Most visitors in Lebanon are on phones, often on slow connections. Test your key pages on a phone." },
          { title: "HTTPS and one clean domain", body: "Make sure the old domain or the non-www version redirects permanently to the main one." },
          { title: "Sitemap and Search Console", body: "Submit your sitemap to Google Search Console and Bing Webmaster Tools, and fix any errors they report." },
          { title: "Crawlers allowed", body: "Check robots.txt does not block search or AI crawlers by mistake." },
          { title: "One clear title and description per page", body: "Each page needs a unique title and a short description that says what it offers." },
        ],
      },
      {
        id: "local",
        heading: "2. Local presence",
        paragraphs: [],
        list: [
          { title: "Google Business Profile", body: "Complete every field, choose the right category, add photos and your hours." },
          { title: "Reviews", body: "Ask satisfied customers for reviews and reply to every one." },
          { title: "Consistent details", body: "Your name, address and phone number should be identical on your site, your profile and every directory." },
          { title: "Local directories", body: "List your business on the main Lebanese and regional directories that fit your industry." },
        ],
      },
      {
        id: "content",
        heading: "3. Content",
        paragraphs: [],
        list: [
          { title: "A page for each service", body: "Each service you sell should have its own page, with who it is for and what is included." },
          { title: "Answer customer questions", body: "Turn the questions you hear every week into FAQs and short guides, with the answer first." },
          { title: "Publish in Arabic and English", body: "Give each language its own page and link the versions to each other." },
          { title: "Keep content current", body: "Update prices, dates and details. Show the last updated date." },
        ],
      },
      {
        id: "trust",
        heading: "4. Trust",
        paragraphs: [],
        list: [
          { title: "Real people and details", body: "Name the founder or team, show a real address and contact details." },
          { title: "Case studies and proof", body: "Describe real projects and real results, with permission." },
          { title: "Mentions and links", body: "Earn links from clients, partners, directories and local media." },
        ],
      },
      {
        id: "ai-search",
        heading: "5. AI search",
        paragraphs: [],
        list: [
          { title: "A clear one-line description of your business", body: "Use the same wording on your homepage, about page and profiles." },
          { title: "Quotable answers", body: "Short, factual answers at the top of key pages and in your FAQs." },
          { title: "Structured data", body: "Mark up your organization, services, FAQs and articles so machines understand them." },
          { title: "Test the AI tools", body: "Once a month, ask ChatGPT, Gemini, Perplexity and Google about your service and area. Note what they say and who they cite." },
          { title: "Watch AI referrals", body: "Track visits from AI tools in your analytics." },
        ],
      },
      {
        id: "next-step",
        heading: "What is the next step?",
        paragraphs: [
          "If you would like help working through this list, Quantex handles SEO, website performance and AI search visibility for businesses in Lebanon and worldwide. Message us and you will get a reply from the founder within 24 hours.",
        ],
      },
    ],
    faq: [
      { question: "What is search visibility?", answer: "It is how easily customers find your business wherever they search: Google results, maps and increasingly answers written by AI tools." },
      { question: "Where should a small business in Lebanon start?", answer: "With the basics: a fast mobile site, a complete Google Business Profile with reviews, and pages that answer real customer questions." },
      { question: "Is SEO still worth it with AI search?", answer: "Yes. The foundations of SEO, a fast clear site, helpful content and trusted mentions, also make you easier for AI tools to find and recommend." },
    ],
  },
];
