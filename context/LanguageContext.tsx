"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "bn";

type Translations = {
  [key: string]: {
    en: string;
    bn: string;
  };
};

export const translations: Translations = {
  // Navigation
  navShop: { en: "Shop", bn: "কালেকশন" },
  navBespoke: { en: "Bespoke", bn: "কাস্টম ফার্নিচার" },
  navCollections: { en: "Collections", bn: "সম্ভার" },
  navWhyHeaven: { en: "Why Heaven", bn: "কেন হেভেন" },
  navShowroom: { en: "Showroom", bn: "শোরুম" },
  navQuote: { en: "Get Quote", bn: "কোটেশন নিন" },
  brandSubtitle: { en: "FURNITURE MART", bn: "ফার্নিচার মার্ট" },

  // Hero Section
  heroEyebrow: {
    en: "Artisan Heritage · Chattogram",
    bn: "ঐতিহ্যবাহী কারুশিল্প · চট্টগ্রাম",
  },
  heroTitle: {
    en: "Furniture, Crafted Around You.",
    bn: "আপনার মনের মতো করে গড়া আসবাব।",
  },
  heroTitleLine1: { en: "Furniture,", bn: "আসবাব," },
  heroTitleLine2: { en: "Crafted", bn: "কারিগরিতে" },
  heroTitleLine3: { en: "Around", bn: "আপনার ভাবনায়।" },
  heroTitleLine4: { en: " You.", bn: "আপনার ভাবনায়।" },
  heroSubtext: {
    en: "Custom furniture designed around your space, your lifestyle, and your taste.",
    bn: "আপনার ঘরের মাপ, জীবনধারা আর রুচির সাথে মিলিয়ে তৈরি কাস্টম আসবাব।",
  },
  heroCtaPrimary: {
    en: "Book A Design Consultation",
    bn: "ডিজাইন কনসালটেশন বুক করুন",
  },
  heroCtaSecondary: { en: "Explore Our Work", bn: "আমাদের কাজ দেখুন" },
  scrollDiscover: {
    en: "Scroll to discover",
    bn: "আরও দেখতে নিচে স্ক্রোল করুন",
  },

  // Brand Statement
  approachEyebrow: { en: "The Heaven Approach", bn: "হেভেনের স্বকীয়তা" },
  approachHeading1: {
    en: "Made for Your Space",
    bn: "আপনার ঘর।",
  },
  approachHeading2: { en: "Your taste.", bn: "আপনার রুচি।" },
  approachHeading3: { en: "Your furniture.", bn: "আপনার আসবাব।" },
  approachSubtext: {
    en: "Every piece begins with your vision. We design and craft furniture around your space, your lifestyle, and the way you want to live.",
    bn: "প্রতিটি কাজের সূচনা আপনার নিজস্ব ভাবনায়। আপনার ঘর, পারিবারিক জীবন আর স্বাচ্ছন্দ্যের কথা মাথায় রেখেই তৈরি হয় আমাদের প্রতিটি আসবাব।",
  },
  approachTagline: {
    en: "Designed. Crafted. Customized.",
    bn: "পরিকল্পিত। নিপুণ। সম্পূর্ণ কাস্টমাইজড।",
  },
  approachCta: { en: "DISCOVER OUR CRAFT", bn: "আমাদের কারিগরি দেখুন" },

  // Lookbook / Collections
  collectionsHeadline: {
    en: "Discover our Product lines",
    bn: "আমাদের এক্সক্লুসিভ আসবাব কালেকশন",
  },
  catLiving: { en: "LIVING", bn: "ড্রয়িং রুম" },
  catBedroom: { en: "BEDROOM", bn: "বেডরুম" },
  catDining: { en: "DINING", bn: "ডাইনিং" },
  catBespoke: { en: "BESPOKE", bn: "কাস্টমাইজড" },

  // Why Choose Heaven Section (5 Synced Reasons)
  whyEyebrow: { en: "WHY CHOOSE HEAVEN", bn: "কেন হেভেন বেছে নেবেন" },
  btnSeeAll: { en: "SEE ALL", bn: "সব দেখুন" },
  promoDiscount: { en: "UP TO 40% OFF", bn: "৪০% পর্যন্ত ছাড়" },

  // Slide 0: DESIGN
  s0Headline: {
    en: "Custom made,<br/>not pre-made.",
    bn: "রেডিমেড নয়,<br/>আপনার মতো করে গড়া।",
  },
  s0Statement: {
    en: "We don't work from a shelf. We work from your space.",
    bn: "দোকানের তাকে রাখা সাধারণ পণ্য নয়, আপনার ঘরের মাপ ও প্রয়োজন বুঝেই আমাদের কাজ।",
  },
  r0Title: { en: "DESIGN", bn: "ডিজাইন" },
  r0Desc: {
    en: "Your space, measured and understood.",
    bn: "ঘরের প্রতিটি কোণের নিখুঁত মাপ ও পরিকল্পনা।",
  },

  // Slide 1: MATERIAL
  s1Headline: {
    en: "Materials chosen<br/>with intention.",
    bn: "উপাদান বাছাইয়ে<br/>আপসহীন শ্রেষ্ঠত্ব।",
  },
  s1Statement: {
    en: "Premium woods, fabrics and finishes, selected to complement your vision.",
    bn: "সেরা মানের কাঠ, প্রিমিয়াম ফ্যাব্রিক আর নিখুঁত ফিনিশ—আপনার পছন্দের সাথে সামঞ্জস্য রেখে।",
  },
  r1Title: { en: "MATERIAL", bn: "উপাদান" },
  r1Desc: {
    en: "Premium woods, fabrics and finishes.",
    bn: "বাছাই করা প্রিমিয়াম কাঠ, কাপড় ও ফিনিশিং।",
  },

  // Slide 2: CRAFT
  s2Headline: {
    en: "Crafted by<br/>skilled hands.",
    bn: "দক্ষ কারিগরের<br/>নিপুণ হাতের ছোঁয়া।",
  },
  s2Statement: {
    en: "Crafted with care by our skilled team in Chattogram.",
    bn: "চট্টগ্রামে আমাদের নিজস্ব কারখানায় দীর্ঘ অভিজ্ঞ কারিগরদের আন্তরিক যত্নে তৈরি।",
  },
  r2Title: { en: "CRAFT", bn: "কারিগরি" },
  r2Desc: {
    en: "Built by skilled hands in Chattogram.",
    bn: "চট্টগ্রামের নিজস্ব ওয়ার্কশপে অভিজ্ঞ হাতে নির্মিত।",
  },

  // Slide 3: DETAIL
  s3Headline: {
    en: "Every proportion<br/>considered.",
    bn: "প্রতিটি ইঞ্চিতে<br/>নিখুঁত যত্ন।",
  },
  s3Statement: {
    en: "From dimensions to finishing, every detail has a purpose.",
    bn: "সঠিক অনুপাত থেকে শুরু করে লাস্টিং ফিনিশিং—প্রতিটি সূক্ষ্ম বিষয়ে থাকে আমাদের গভীর মনোযোগ।",
  },
  r3Title: { en: "DETAIL", bn: "ডিটেইলিং" },
  r3Desc: {
    en: "Every proportion considered.",
    bn: "সঠিক অনুপাত ও টেকসই ফিনিশিং।",
  },

  // Slide 4: INSTALL
  s4Headline: {
    en: "Finished for<br/>your space.",
    bn: "আপনার ঘরের জন্য<br/>পরিপূর্ণ সমাপ্তি।",
  },
  s4Statement: {
    en: "Delivered and fitted carefully, ready to become part of your home.",
    bn: "যত্নসহকারে ডেলিভারি ও প্রফেশনাল ফিটিং—যাতে নিমিষেই আপনার ঘরটি সাজানো হয়ে ওঠে।",
  },
  r4Title: { en: "INSTALL", bn: "ফিটিং ও সেটআপ" },
  r4Desc: {
    en: "Delivered and fitted in your space.",
    bn: "নিরাপদ হোম ডেলিভারি ও নিখুঁত ফিটিং।",
  },

  // Reverse Face Manifesto
  revEyebrow: {
    en: "COMPLETE MANIFESTO · 2026 LOOKBOOK",
    bn: "আমাদের অঙ্গীকার · ২০২৬ লুকবুক",
  },
  revTitle: { en: "Why Heaven?", bn: "কেন হেভেন ফার্নিচার?" },
  revReturnBtn: { en: "CLOSE ✕", bn: "বন্ধ করুন ✕" },
  revTrustLabel: {
    en: "STANDARDS & COMMITMENTS",
    bn: "আমাদের মান ও প্রতিশ্রুতি",
  },

  // 8 Trust Verification Points
  t1: { en: "FREE DESIGN CONSULTATION", bn: "ফ্রি ডিজাইন পরামর্শ" },
  t2: {
    en: "FULLY BESPOKE ARCHITECTURE",
    bn: "১০০% কাস্টমাইজড আসবাব",
  },
  t3: { en: "PREMIUM HARDWOOD TIMBER", bn: "সিজনড সলিড কাঠ" },
  t4: {
    en: "SKILLED ARTISAN JOINERY",
    bn: "অভিজ্ঞ কারিগরের নিপুণ কাঠখোদাই ও জয়েন্ট",
  },
  t5: { en: "SHOWROOM IN CHATTOGRAM", bn: "চট্টগ্রামের নিজস্ব শোরুম" },
  t6: {
    en: "DELIVERY & INSTALLATION",
    bn: "নিরাপদ ডেলিভারি ও প্রফেশনাল ফিটিং",
  },
  t7: { en: "EASY PAYMENT OPTIONS", bn: "সহজ পেমেন্ট সুবিধা" },
  t8: { en: "HUNDREDS OF HOMEOWNERS", bn: "শত শত পরিবারের নির্ভরযোগ্য আস্থা" },

  mdName: { en: "ABUL KALAM BHUIYAN", bn: "আবুল কালাম ভূঁইয়া" },
  mdRole: {
    en: "Managing Director · Heaven Furniture Mart",
    bn: "ব্যবস্থাপনা পরিচালক · হেভেন ফার্নিচার মার্ট",
  },

  // Bespoke Feature Section
  differenceEyebrow: {
    en: "THE HEAVEN DIFFERENCE",
    bn: "হেভেনের স্বাতন্ত্র্য",
  },
  customHeading: {
    en: "Custom made,\nnot pre-made.",
    bn: "রেডিমেড নয়,\nআপনার ভাবনায় তৈরি।",
  },
  diff1Title: { en: "Bespoke by Design", bn: "পছন্দসই নিজস্ব ডিজাইন" },
  diff1Desc: {
    en: "Made around your space, not pulled from a shelf.",
    bn: "দোকানের বাঁধা পণ্যের বাইরে গিয়ে আপনার ঘরের সাইজ ও পছন্দ অনুযায়ী নির্মিত।",
  },
  diff2Title: { en: "Premium Materials", bn: "উৎকৃষ্ট উপাদান" },
  diff2Desc: {
    en: "Handpicked woods, fabrics and finishes.",
    bn: "বাছাই করা প্রিমিয়াম কাঠ, ফেব্রিক ও দীর্ঘস্থায়ী ফিনিশিং।",
  },
  diff3Title: { en: "Crafted in Chattogram", bn: "চট্টগ্রামে প্রস্তুত" },
  diff3Desc: {
    en: "Built by skilled hands with pride and precision.",
    bn: "দক্ষ কারিগরদের ভালোবাসা আর নিখুঁত দক্ষতায় তৈরি।",
  },
  diff4Title: { en: "Perfect in Every Detail", bn: "প্রতিটি ভাঁজে নিখুঁত" },
  diff4Desc: {
    en: "Every dimension, every line, intentional.",
    bn: "প্রতিটি ইঞ্চি মেপে আধুনিক ও সময়োপযোগী করে তৈরি।",
  },
  diff5Title: { en: "Delivered & Installed", bn: "ডেলিভারি ও স্থাপন" },
  diff5Desc: {
    en: "Carefully delivered and fitted in your space.",
    bn: "সতর্কতার সাথে আপনার ঘরে পৌঁছে নিখুঁতভাবে সেট করে দেওয়া হয়।",
  },
  startProject: {
    en: "START YOUR BESPOKE PROJECT ",
    bn: "আপনার কাস্টম প্রজেক্ট শুরু করুন ",
  },
  standardLabel: { en: "STANDARD MASS-PRODUCED", bn: "সাধারণ রেডিমেড আসবাব" },
  heavenLabel: { en: "HEAVEN BESPOKE CRAFT", bn: "হেভেনের কাস্টম কারিগরি" },

  // Horizontal Scroll / Social Proof
  eyebrow: { en: "SOCIAL PROOF", bn: "আস্থা ও অভিজ্ঞতা" },
  quote_p1: {
    en: "“At Heaven Furniture Mart, we believe furniture is more than just function;",
    bn: "“হেভেন ফার্নিচার মার্টে আমরা বিশ্বাস করি আসবাব কেবল ব্যবহারের পণ্য নয়;",
  },
  quote_p2: {
    en: "it is a reflection of lifestyle, taste, and comfort.”",
    bn: "এটি জীবনযাত্রা, পারিবারিক রুচি ও প্রশান্তির বহিঃপ্রকাশ।”",
  },
  quote_p3: {
    en: "Every piece we create is designed to bring lasting elegance into the homes of our clients.",
    bn: "আমাদের তৈরি প্রতিটি কাজ ক্লায়েন্টদের ঘরে দীর্ঘস্থায়ী আভিজাত্য ছড়িয়ে দেওয়ার লক্ষ্যেই নির্মিত।",
  },
  quote_author: { en: "— ABUL KALAM BHUIYAN", bn: "— আবুল কালাম ভূঁইয়া" },
  quote_role: { en: "Managing Director", bn: "ব্যবস্থাপনা পরিচালক" },
  trust_title: {
    en: "HUNDREDS OF HAPPY HOMEOWNERS",
    bn: "শত শত গৃহকর্তার অবিচল আস্থা",
  },
  trust_desc: {
    en: "Designed, crafted and installed across Chattogram and beyond.",
    bn: "চট্টগ্রাম সহ দেশজুড়ে সফল ডিজাইন, নির্মাণ ও সফল ইনস্টলেশন।",
  },
  cap_1: {
    en: "13th Chittagong Furniture Fair 2024",
    bn: "১৩তম চট্টগ্রাম ফার্নিচার মেলা ২০২৪",
  },
  cap_2: {
    en: "Furniture Fair Participant",
    bn: "ফার্নিচার মেলায় আমাদের প্যাভিলিয়ন",
  },
  cap_3: {
    en: "Artisan Joinery Detail",
    bn: "নিপুণ কারিগরি ও ফিনিশিং",
  },
  cap_4: {
    en: "Our Shop At Fair",
    bn: "মেলা প্রাঙ্গণে হেভেন কালেকশন",
  },
  cap_5: {
    en: "Customer Feedback",
    bn: "গ্রাহকদের সন্তুষ্টি ও ভালোবাসা",
  },
  cap_6: {
    en: "Our Main Shop At Agrabad",
    bn: "আগ্রাবাদে আমাদের মূল শোরুম",
  },
  cap_7: {
    en: "SHOWROOM · AGRABAD ACCESS ROAD",
    bn: "শোরুম · আগ্রাবাদ এক্সেস রোড",
  },
  end_title: {
    en: "Made for homes that feel like yours.",
    bn: "আপনার মনের মতো করে সাজানো ঘরের জন্য।",
  },
  end_cta: { en: "VISIT OUR SHOWROOM", bn: "শোরুম ঘুরে আসুন" },
  end_sub: {
    en: "Agrabad Access Road, Chattogram",
    bn: "আগ্রাবাদ এক্সেস রোড, চট্টগ্রাম",
  },

  // Showroom Section
  visitEyebrow: { en: "VISIT HEAVEN", bn: "হেভেন দর্শন" },
  seeItTitle: { en: "See it.", bn: "স্বচক্ষে দেখুন।" },
  feelDifference: {
    en: "Feel the difference.",
    bn: "স্পর্শে অনুভব করুন গুণগত মান।",
  },
  showroomDesc: {
    en: "Our showroom is where ideas become furniture.",
    bn: "আমাদের শোরুমেই আপনার পরিকল্পনা বাস্তব আসবাবের রূপ নেয়।",
  },
  showroom01Label: { en: "SHOWROOM 01", bn: "শোরুম ০১" },
  getDirections: { en: "GET DIRECTIONS", bn: "ম্যাপে পথ দেখুন" },
  openBadge: { en: "OPEN NOW", bn: "খোলা আছে" },

  // Consultation Modal
  modalTitle: {
    en: "Design Consultation Request",
    bn: "ডিজাইন কনসালটেশন আবেদন",
  },
  modalSubtitle: {
    en: "Tell us about your space & preferred furniture style.",
    bn: "আপনার ঘর এবং পছন্দের আসবাবের ধরন সম্পর্কে আমাদের জানান।",
  },
  fullName: { en: "Full Name", bn: "আপনার পুরো নাম" },
  phone: { en: "Phone Number", bn: "মোবাইল নম্বর" },
  furnitureType: { en: "Furniture Category", bn: "আসবাবের ধরন" },
  woodPreference: {
    en: "Wood / Material Preference",
    bn: "কাঠ বা উপাদানের পছন্দ",
  },
  detailsMessage: {
    en: "Special Details / Requirements",
    bn: "বিশেষ কোনো চাহিদা বা মাপজোখের বিবরণ",
  },
  sendWhatsApp: {
    en: "Send via WhatsApp (+880 1960-481983)",
    bn: "হোয়াটসঅ্যাপে পাঠান (+৮৮০ ১৯৬০-৪৮১৯৮৩)",
  },
  sendEmail: { en: "Send Direct Inquiry", bn: "ইনকোয়ারি পাঠান" },

  // Footer
  footerTagline: {
    en: "Furniture, crafted around you.",
    bn: "আপনার মনের মতো করে গড়া আসবাব।",
  },
  footerInquiries: {
    en: "Inquiries & WhatsApp",
    bn: "যোগাযোগ ও হোয়াটসঅ্যাপ",
  },
  requestQuoteFooter: { en: "REQUEST A QUOTE", bn: "কোটেশন অনুরোধ করুন" },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<Language>("en");

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("hfm_lang", newLang);
      document.documentElement.lang = newLang;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("hfm_lang") as Language;
      if (savedLang === "en" || savedLang === "bn") {
        setLangState(savedLang);
        document.documentElement.lang = savedLang;
      } else {
        document.documentElement.lang = "en";
      }
    }
  }, []);

  const t = (key: string): string => {
    if (!translations[key]) return key;
    return translations[key][lang] || translations[key]["en"];
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
