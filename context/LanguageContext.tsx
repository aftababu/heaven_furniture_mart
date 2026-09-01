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
  navShop: { en: "Shop", bn: "শপ" },
  navBespoke: { en: "Bespoke", bn: "কাস্টম ফার্নিচার" },
  navCollections: { en: "Collections", bn: "কালেকশন" },
  navWhyHeaven: { en: "Why Heaven", bn: "কেন হেভেন" },
  navShowroom: { en: "Showroom", bn: "শো-রুম" },
  navQuote: { en: "Get Quote", bn: "কোটেশন নিন" },
  brandSubtitle: { en: "FURNITURE MART", bn: "ফার্নিচার মার্ট" },

  // Hero Section
  heroEyebrow: { en: "Artisan Heritage · Chattogram", bn: "কারুশিল্পের ঐতিহ্য · চট্টগ্রাম" },
  heroTitleLine1: { en: "Timeless", bn: "কালজয়ী" },
  heroTitleLine2: { en: "Crafted", bn: "নকশায়" },
  heroTitleLine3: { en: "Around You.", bn: "আপনার জন্য।" },
  heroSubtext: {
    en: "Custom furniture designed around your space, your lifestyle, and your taste.",
    bn: "আপনার ঘর, আপনার জীবনধারা এবং রুচি অনুযায়ী তৈরি কাস্টম ফার্নিচার।",
  },
  heroCtaPrimary: { en: "Book A Design Consultation", bn: "ডিজাইন কনসালটেশন বুক করুন" },
  heroCtaSecondary: { en: "Explore Our Work", bn: "আমাদের কাজ দেখুন" },
  scrollDiscover: { en: "Scroll to discover", bn: "নিচে স্ক্রোল করুন" },

  // Brand Statement
  approachEyebrow: { en: "The Heaven Approach", bn: "হেভেনের নিজস্ব ধরন" },
  approachHeading1: { en: "Your space.", bn: "আপনার ঘর।" },
  approachHeading2: { en: "Your taste.", bn: "আপনার পছন্দ।" },
  approachHeading3: { en: "Your furniture.", bn: "আপনার ফার্নিচার।" },
  approachSubtext: {
    en: "Every piece begins with your vision. We design and craft furniture around your space, your lifestyle, and the way you want to live.",
    bn: "প্রতিটি কাজ শুরু হয় আপনার পছন্দ দিয়ে। আমরা আপনার ঘর, জীবনধারা ও স্বাচ্ছন্দ্য অনুযায়ী ফার্নিচার তৈরি করি।",
  },
  approachTagline: { en: "Designed. Crafted. Customized.", bn: "ডিজাইনড। ক্রাফটেড। কাস্টমাইজড।" },
  approachCta: { en: "DISCOVER OUR CRAFT", bn: "আমাদের কারুশিল্প দেখুন" },

  // Lookbook / Collections
  collectionsHeadline: { en: "Discover our Product lines", bn: "আমাদের ফার্নিচার কালেকশন" },
  catLiving: { en: "LIVING", bn: "লিভিং রুম" },
  catBedroom: { en: "BEDROOM", bn: "বেডরুম" },
  catDining: { en: "DINING", bn: "ডাইনিং" },
  catBespoke: { en: "BESPOKE", bn: "কাস্টম মেড" },

  // Why Choose Heaven Section (5 Synced Reasons)
  whyEyebrow: { en: "WHY CHOOSE HEAVEN", bn: "কেন হেভেন বেছে নেবেন" },
  btnSeeAll: { en: "SEE ALL", bn: "সব দেখুন" },
  promoDiscount: { en: "UP TO 40% OFF", bn: "৪০% পর্যন্ত ছাড়" },

  // Slide 0: DESIGN
  s0Headline: { en: "Custom made,<br/>not pre-made.", bn: "আপনার ভাবনায়,<br/>অনন্য নির্মাণ।" },
  s0Statement: {
    en: "We don't work from a shelf. We work from your space.",
    bn: "আমরা কোনো তৈরি পণ্য বিক্রি করি না। আপনার ঘরের উপযোগী আসবাব তৈরি করি।",
  },
  r0Title: { en: "DESIGN", bn: "ডিজাইন" },
  r0Desc: { en: "Your space, measured and understood.", bn: "আপনার স্থান ও প্রয়োজনীয়তার নিখুঁত পরিমাপ।" },

  // Slide 1: MATERIAL
  s1Headline: { en: "Materials chosen<br/>with intention.", bn: "উপকরণ বাছাই<br/>সতর্কতার সাথে।" },
  s1Statement: {
    en: "Premium woods, fabrics and finishes, selected to complement your vision.",
    bn: "সেরা মানের কাঠ, ফেব্রিক্স এবং ফিনিশ আপনার ঘরের সৌন্দর্যের সাথে মিলিয়ে।",
  },
  r1Title: { en: "MATERIAL", bn: "উপাদান" },
  r1Desc: { en: "Premium woods, fabrics and finishes.", bn: "প্রিমিয়াম কাঠ, ফেব্রিক্স এবং ফিনিশ।" },

  // Slide 2: CRAFT
  s2Headline: { en: "Crafted by<br/>skilled hands.", bn: "দক্ষ কারিগরের<br/>নিপুণ ছোঁয়া।" },
  s2Statement: {
    en: "Crafted with care by our skilled team in Chattogram.",
    bn: "চট্টগ্রামে আমাদের অভিজ্ঞ কারিগরদের নিখুঁত যত্নে নির্মিত।",
  },
  r2Title: { en: "CRAFT", bn: "কারিগরি" },
  r2Desc: { en: "Built by skilled hands in Chattogram.", bn: "চট্টগ্রামের নিজস্ব কারখানায় সুদক্ষ কারিগর দ্বারা তৈরি।" },

  // Slide 3: DETAIL
  s3Headline: { en: "Every proportion<br/>considered.", bn: "প্রতিটি ডিটেইলের<br/>সূক্ষ্ম নিরীক্ষণ।" },
  s3Statement: {
    en: "From dimensions to finishing, every detail has a purpose.",
    bn: "পরিমাপ থেকে শুরু করে ফিনিশিং পর্যন্ত প্রতিটি বিষয়ের রয়েছে নিজস্ব গুরুত্ব।",
  },
  r3Title: { en: "DETAIL", bn: "ডিটেইল" },
  r3Desc: { en: "Every proportion considered.", bn: "সঠিক অনুপাত ও দীর্ঘস্থায়ী স্থায়িত্ব।" },

  // Slide 4: INSTALL
  s4Headline: { en: "Finished for<br/>your space.", bn: "আপনার ঘরের জন্য<br/>নিখুঁত সমাপ্তি।" },
  s4Statement: {
    en: "Delivered and fitted carefully, ready to become part of your home.",
    bn: "যত্নের সাথে নিরাপদ ডেলিভারি ও সুবিন্যস্ত ফিটিং।",
  },
  r4Title: { en: "INSTALL", bn: "ইনস্টলেশন" },
  r4Desc: { en: "Delivered and fitted in your space.", bn: "ঘরে বসেই নিরাপদ ডেলিভারি ও পারফেক্ট ফিটিং।" },

  // Reverse Face Manifesto
  revEyebrow: { en: "COMPLETE MANIFESTO · 2026 LOOKBOOK", bn: "সম্পূর্ণ ক্যাটালগ · ২০২৬ কালেকশন" },
  revTitle: { en: "Why Heaven?", bn: "কেন হেভেন ফার্নিচার?" },
  revReturnBtn: { en: "CLOSE ✕", bn: "বন্ধ করুন ✕" },
  revTrustLabel: { en: "STANDARDS & COMMITMENTS", bn: "আমাদের প্রতিশ্রুতি ও বিশেষত্ব" },

  // 8 Trust Verification Points
  t1: { en: "FREE DESIGN CONSULTATION", bn: "ফ্রি ডিজাইন পরামর্শ" },
  t2: { en: "FULLY BESPOKE ARCHITECTURE", bn: "সম্পূর্ণ কাস্টমাইজড ফার্নিচার" },
  t3: { en: "PREMIUM HARDWOOD TIMBER", bn: "সিজনড সলিড কাঠ" },
  t4: { en: "SKILLED ARTISAN JOINERY", bn: "অভিজ্ঞ কারিগরদের নিপুণ হাতের কাজ" },
  t5: { en: "SHOWROOM IN CHATTOGRAM", bn: "চট্টগ্রামের নিজস্ব শোরুম" },
  t6: { en: "DELIVERY & INSTALLATION", bn: "হোম ডেলিভারি ও ইনস্টলেশন" },
  t7: { en: "EASY PAYMENT OPTIONS", bn: "সহজ পেমেন্ট সুবিধা" },
  t8: { en: "HUNDREDS OF HOMEOWNERS", bn: "শত শত সন্তুষ্ট পরিবার" },

  mdName: { en: "ABUL KALAM BHUIYAN", bn: "আবুল কালাম ভূঁইয়া" },
  mdRole: { en: "Managing Director · Heaven Furniture Mart", bn: "ব্যবস্থাপনা পরিচালক · হেভেন ফার্নিচার মার্ট" },

  // Bespoke Feature Section
  differenceEyebrow: { en: "THE HEAVEN DIFFERENCE", bn: "হেভেনের স্বকীয়তা" },
  customHeading: { en: "Custom made,\nnot pre-made.", bn: "কাস্টম মেড,\nরেডিমেড নয়।" },
  diff1Title: { en: "Bespoke by Design", bn: "পছন্দসই ডিজাইন" },
  diff1Desc: { en: "Made around your space, not pulled from a shelf.", bn: "আপনার ঘরের মাপ অনুযায়ী তৈরি, সাধারণ দোকানের মতো নয়।" },
  diff2Title: { en: "Premium Materials", bn: "সেরা উপাদান" },
  diff2Desc: { en: "Handpicked woods, fabrics and finishes.", bn: "বাছাই করা কাঠ, সুতি ও লেদার ফ্যাব্রিক।" },
  diff3Title: { en: "Crafted in Chattogram", bn: "চট্টগ্রামে প্রস্তুত" },
  diff3Desc: { en: "Built by skilled hands with pride and precision.", bn: "দক্ষ কারিগরদের নিখুঁত অভিজ্ঞতায় তৈরি।" },
  diff4Title: { en: "Perfect in Every Detail", bn: "নিখুঁত ডিটেইলিং" },
  diff4Desc: { en: "Every dimension, every line, intentional.", bn: "প্রতিটি ইঞ্চি মেপে ও নিখুঁত ফিনিশিং সহ।" },
  diff5Title: { en: "Delivered & Installed", bn: "ডেলিভারি ও স্থাপন" },
  diff5Desc: { en: "Carefully delivered and fitted in your space.", bn: "নিরাপদে আপনার ঘরে পৌছে সেট করে দেওয়া হয়।" },
  startProject: { en: "START YOUR BESPOKE PROJECT →", bn: "কাস্টম প্রজেক্ট শুরু করুন →" },
  standardLabel: { en: "STANDARD MASS-PRODUCED", bn: "সাধারণ রেডিমেড" },
  heavenLabel: { en: "HEAVEN BESPOKE CRAFT", bn: "হেভেন কাস্টম কারুশিল্প" },

  // Horizontal Scroll / Social Proof (Updated to demo keys)
  eyebrow: { en: "SOCIAL PROOF", bn: "সোশ্যাল প্রুফ" },
  quote_p1: {
    en: "“At Heaven Furniture Mart, we believe furniture is more than just function;",
    bn: "“হেভেন ফার্নিচার মার্টে আমরা বিশ্বাস করি আসবাব কেবল ব্যবহারের জন্য নয়;",
  },
  quote_p2: {
    en: "it is a reflection of lifestyle, taste, and comfort.”",
    bn: "এটি জীবনযাত্রা, রুচি ও আরামের প্রতিফলন।”",
  },
  quote_p3: {
    en: "Every piece we create is designed to bring lasting elegance into the homes of our clients.",
    bn: "আমাদের তৈরি প্রতিটি কাজ ক্লায়েন্টদের বাড়িতে দীর্ঘস্থায়ী আভিজাত্য এনে দেওয়ার লক্ষ্যেই নির্মিত।",
  },
  quote_author: { en: "— ABUL KALAM BHUIYAN", bn: "— আবুল কালাম ভূঁইয়া" },
  quote_role: { en: "Managing Director", bn: "ম্যানেজিং ডিরেক্টর" },
  trust_title: { en: "HUNDREDS OF HAPPY HOMEOWNERS", bn: "শত শত সন্তুষ্ট পরিবার" },
  trust_desc: { en: "Designed, crafted and installed across Chattogram and beyond.", bn: "চট্টগ্রাম ও সারাদেশে ডিজাইন, নির্মাণ ও সফল ইনস্টলেশন।" },
  cap_1: { en: "LIVING · CUSTOM SOFA", bn: "লিভিং · কাস্টম সোফা" },
  cap_2: { en: "CRAFT · SOLID HARDWOOD DETAIL", bn: "কারিগরি · সলিড কাঠের ডিটেইল" },
  cap_3: { en: "BEDROOM · RESIDENTIAL CHATTOGRAM", bn: "বেডরুম · রেসিডেন্সিয়াল চট্টগ্রাম" },
  cap_4: { en: "DINING · SOLID TIMBER SUITE", bn: "ডাইনিং · সলিড কাঠের সেট" },
  cap_5: { en: "ATELIER · HAND-PLANED JOINERY", bn: "কারখানা · নিজস্ব নিপুণ কারিগরি" },
  cap_6: { en: "EXECUTIVE · BESPOKE FINISH", bn: "এক্সিকিউটিভ · কাস্টম ফিনিশ" },
  cap_7: { en: "SHOWROOM · AGRABAD ACCESS ROAD", bn: "শোরুম · আগ্রাবাদ এক্সেস রোড" },
  end_title: { en: "Made for homes that feel like yours.", bn: "আপনার ঘরের মতো ঘরগুলোর জন্য তৈরি।" },
  end_cta: { en: "VISIT OUR SHOWROOM", bn: "শোরুম ভিজিট করুন" },
  end_sub: { en: "Agrabad Access Road, Chattogram", bn: "আগ্রাবাদ এক্সেস রোড, চট্টগ্রাম" },

  // Showroom Section
  visitEyebrow: { en: "VISIT HEAVEN", bn: "আমাদের সাথে দেখা করুন" },
  seeItTitle: { en: "See it.", bn: "স্বচক্ষে দেখুন।" },
  feelDifference: { en: "Feel the difference.", bn: "অনুভব করুন গুণমান।" },
  showroomDesc: { en: "Our showroom is where ideas become furniture.", bn: "আমাদের শো-রুমে আপনার ভাবনাই পাবে বাস্তব রূপ।" },
  showroom01Label: { en: "SHOWROOM 01", bn: "শো-রুম ০১" },
  getDirections: { en: "GET DIRECTIONS", bn: "ম্যাপে পথ দেখুন" },
  openBadge: { en: "OPEN NOW", bn: "খোলা আছে" },

  // Consultation Modal
  modalTitle: { en: "Design Consultation Request", bn: "ডিজাইন কনসালটেশন ফর্ম" },
  modalSubtitle: { en: "Tell us about your space & preferred furniture style.", bn: "আপনার ঘর এবং পছন্দের ফার্নিচার ধরণ সম্পর্কে জানান।" },
  fullName: { en: "Full Name", bn: "আপনার নাম" },
  phone: { en: "Phone Number", bn: "ফোন নম্বর" },
  furnitureType: { en: "Furniture Category", bn: "ফার্নিচারের ধরন" },
  woodPreference: { en: "Wood / Material Preference", bn: "কাঠের পছন্দ" },
  detailsMessage: { en: "Special Details / Requirements", bn: "বিস্তারিত তথ্য বা বিবরণ" },
  sendWhatsApp: { en: "Send via WhatsApp (+880 1960-481983)", bn: "হোয়াটসঅ্যাপে পাঠান (+৮৮০ ১৯৬০-৪৮১৯৮৩)" },
  sendEmail: { en: "Send Direct Inquiry", bn: "ইনকোয়ারি পাঠান" },

  // Footer
  footerTagline: { en: "Furniture, crafted around you.", bn: "আপনার রুচিসম্মত সেরা আসবাবপত্র।" },
  footerInquiries: { en: "Inquiries & WhatsApp", bn: "যোগাযোগ ও হোয়াটসঅ্যাপ" },
  requestQuoteFooter: { en: "REQUEST A QUOTE", bn: "কোটেশন অনুরোধ করুন" },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>("en");

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("hfm_lang", newLang);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("hfm_lang") as Language;
      if (savedLang === "en" || savedLang === "bn") {
        setLangState(savedLang);
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
