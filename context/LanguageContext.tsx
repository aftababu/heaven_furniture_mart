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
  ariaOpenMenu: { en: "Open Mobile Menu", bn: "মোবাইল মেনু খুলুন" },
  ariaCloseMenu: { en: "Close Mobile Menu", bn: "মোবাইল মেনু বন্ধ করুন" },
  navAddressShort: {
    en: "Agrabad Access Road, Chattogram",
    bn: "আগ্রাবাদ এক্সেস রোড, চট্টগ্রাম",
  },

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
  heroCtaSecondary: {
    en: "START YOUR PROJECT",
    bn: "প্রকল্প শুরু করুন",
  },
  scrollDiscover: {
    en: "Scroll to discover",
    bn: "আরও দেখতে নিচে স্ক্রোল করুন",
  },
  heroImgAlt1: {
    en: "Luxury bespoke sofa in a minimal, sun-lit interior",
    bn: "আধুনিক আলোঝলমলে ড্রয়িংরুমে বিলাসবহুল কাস্টম সোফা",
  },
  heroImgAlt2: {
    en: "Modern luxury dining room with custom wood table",
    bn: "কাস্টম কাঠের ডাইনিং টেবিলসহ আধুনিক ডাইনিং রুম",
  },
  heroImgAlt3: {
    en: "Close-up detail of handcrafted wood joinery",
    bn: "নিপুণ কাঠের খোদাই ও জয়েন্টের সূক্ষ্ম কাজ",
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
  waCollectionInterest: {
    en: "Hello Heaven Furniture Mart, I am interested in your collection.",
    bn: "হ্যালো হেভেন ফার্নিচার মার্ট, আমি আপনাদের কালেকশন দেখতে আগ্রহী।",
  },

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
  btnDirectInquiry: { en: "DIRECT INQUIRY", bn: "ইনকোয়ারি পাঠান" },
  revFooterLocation: {
    en: "AGRABAD ACCESS ROAD · CHATTOGRAM",
    bn: "আগ্রাবাদ এক্সেস রোড · চট্টগ্রাম",
  },
  revFooterArchive: {
    en: "HEAVEN EDITORIAL ARCHIVE",
    bn: "হেভেন কালেকশন আর্কাইভ",
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
    en: "DESIGN YOUR PIECE ",
    bn: "আপনার কাস্টম প্রজেক্ট শুরু করুন ",
  },
  standardLabel: { en: "STANDARD MASS-PRODUCED", bn: "সাধারণ রেডিমেড আসবাব" },
  heavenLabel: { en: "HEAVEN BESPOKE CRAFT", bn: "হেভেনের কাস্টম কারিগরি" },
  bespokeAltBefore: {
    en: "Standard Mass Produced Furniture (BEFORE)",
    bn: "সাধারণ রেডিমেড আসবাব (পূর্বে)",
  },
  bespokeAltAfter: {
    en: "Heaven Bespoke Furniture (BESPOKE)",
    bn: "হেভেন কাস্টমাইজড আসবাব (কাস্টম)",
  },
  labelBefore: { en: "BEFORE", bn: "পূর্বে" },
  labelBespoke: { en: "BESPOKE", bn: "কাস্টম" },
  subLabelBefore: { en: "Mass-produced standard", bn: "সাধারণ রেডিমেড" },
  subLabelBespoke: { en: "Bespoke Craftsmanship", bn: "কাস্টম কারিগরি" },

  // Horizontal Scroll / Social Proof
  eyebrow: { en: "SOCIAL PROOF", bn: "আস্থা ও অভিজ্ঞতা" },
  chronologyEyebrow: { en: "CHRONOLOGY", bn: "ইতিহাস ও মাইলফলক" },
  milestonesTitle: { en: "Milestones of Craft", bn: "আমাদের অর্জনের মাইলফলক" },
  milestone2020Title: {
    en: "Founded by Abul Kalam Bhuiyan",
    bn: "আবুল কালাম ভূঁইয়া দ্বারা হেভেন ফার্নিচার মার্ট প্রতিষ্ঠিত",
  },
  milestone2020Tag: {
    en: "INCEPTION · CHATTOGRAM",
    bn: "সূচনা · চট্টগ্রাম",
  },
  milestone2021Title: {
    en: "Opened the Flagship Agrabad Showroom",
    bn: "আগ্রাবাদ এক্সেস রোডে বিশাল নিজস্ব শোরুম উদ্বোধন",
  },
  milestone2021Tag: {
    en: "RETAIL EXPANSION",
    bn: "শোরুম সম্প্রসারণ",
  },
  milestone2024Title: {
    en: "Exhibited at the International Furniture Fair",
    bn: "আন্তর্জাতিক ফার্নিচার মেলায় প্যাভিলিয়ন প্রদর্শন",
  },
  milestone2024Tag: {
    en: "EXHIBITION · PAVILION",
    bn: "আন্তর্জাতিক প্রদর্শনী",
  },
  milestone2025Title: {
    en: "Inducted into the Chamber of Commerce",
    bn: "চেম্বার অফ কমার্স অ্যান্ড ইন্ডাস্ট্রির সদস্যপদ",
  },
  milestone2025Tag: {
    en: "TRADE ALLIANCE",
    bn: "বাণিজ্য জোট",
  },
  milestone2026Title: {
    en: "Received Nationwide BFIOA Recognition",
    bn: "জাতীয় বিএফআইওএ বর্ষসেরা সম্মাননা লাভ",
  },
  milestone2026Tag: {
    en: "NATIONAL HONOR",
    bn: "জাতীয় সম্মাননা",
  },
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
  labelExplore: { en: "Explore", bn: "আবিষ্কার করুন" },

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
  showroomAltImg: {
    en: "Heaven Furniture Mart Showroom Interior",
    bn: "হেভেন ফার্নিচার মার্টের নিজস্ব শোরুম",
  },

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
  modalThankYou: { en: "Thank You!", bn: "ধন্যবাদ!" },
  modalOpeningWhatsApp: {
    en: "Opening WhatsApp to connect directly with our design artisan...",
    bn: "আমাদের ফার্নিচার ডিজাইনারের সাথে সরাসরি যোগাযোগ করতে হোয়াটসঅ্যাপ চালু হচ্ছে...",
  },
  placeholderName: { en: "Abul Kalam", bn: "আবুল কালাম" },
  placeholderCategory: { en: "Select Category", bn: "ক্যাটাগরি নির্বাচন করুন" },
  placeholderMaterial: { en: "Select Material", bn: "উপাদান নির্বাচন করুন" },
  placeholderNotes: {
    en: "Tell us about room dimensions or custom design preferences...",
    bn: "ঘরের মাপ বা আপনার বিশেষ পছন্দের বিস্তারিত বিবরণ লিখুন...",
  },

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
  footerCompany: { en: "Company", bn: "প্রতিষ্ঠান" },
  footerAboutUs: { en: "About Us", bn: "আমাদের সম্পর্কে" },
  footerOurCraft: { en: "Our Craft", bn: "আমাদের কারিগরি" },
  footerShowroom: { en: "Showroom", bn: "শোরুম" },
  footerVisit: { en: "Visit", bn: "ভিজিট করুন" },
  footerAddressLine1: {
    en: "Agrabad Access Road",
    bn: "আগ্রাবাদ এক্সেস রোড",
  },
  footerAddressLine2: {
    en: "Chattogram, Bangladesh",
    bn: "চট্টগ্রাম, বাংলাদেশ",
  },
  footerBottomLocation: {
    en: "AGRABAD · CHATTOGRAM · BANGLADESH",
    bn: "আগ্রাবাদ · চট্টগ্রাম · বাংলাদেশ",
  },
  footerCopyright: {
    en: "© 2026 HEAVEN FURNITURE MART",
    bn: "© ২০২৬ হেভেন ফার্নিচার মার্ট",
  },

  milestonesTitleLine1: { en: "Milestones", bn: "আমাদের" },
  milestonesTitleLine2: { en: "of Craft", bn: "মাইলফলক" },

  // Collections Hotspots
  hotspotLivingSofaName: {
    en: "Interior Wodden Wall",
    bn: "ইন্টেরিয়র কাঠের দেয়াল",
  },
  hotspotLivingSofaSpec: {
    en: "Teak & High-Density Foam",
    bn: "সেগুন কাঠ ও হাই-ডেনসিটি ফোম",
  },
  hotspotLivingTableName: {
    en: "Premium Long Sofa",
    bn: "প্রিমিয়াম লং সোফা",
  },
  hotspotLivingTableSpec: {
    en: "Hand-Polished Solid Teak",
    bn: "পলিশ করা সিজনড সেগুন কাঠ",
  },

  hotspotBedroomBedName: {
    en: "Royal King Canopy Bed",
    bn: "রয়্যাল কিং সাইজ বেড",
  },
  hotspotBedroomBedSpec: {
    en: "Mahogany & Cushioned Headboard",
    bn: "মেহগনি কাঠ ও কুশন হেডবোর্ড",
  },
  hotspotBedroomConsoleName: {
    en: "Minimalist Bedside Console",
    bn: "মিনিমালিস্ট সাইড টেবিল",
  },
  hotspotBedroomConsoleSpec: {
    en: "Brass Accents & Teak Finish",
    bn: "পিতলের নকশা ও সেগুন ফিনিশ",
  },

  hotspotDiningTableName: {
    en: "Heritage 5-Seater Table",
    bn: "৫-সিটার ডাইনিং টেবিল",
  },
  hotspotDiningTableSpec: {
    en: "Solid Seasoned Burmese Teak",
    bn: "সিজনড বার্মিজ সেগুন কাঠ",
  },
  hotspotDiningChairName: {
    en: "Sculpted Dining Chair",
    bn: "স্কাল্পটেড ডাইনিং চেয়ার",
  },
  hotspotDiningChairSpec: {
    en: "Ergonomic Teak & Leatherette",
    bn: "সেগুন কাঠ ও লেদার সিট",
  },

  hotspotBespokeUnitName: {
    en: "Custom Wall Console Unit",
    bn: "কাস্টম ওয়াল কনসোল",
  },
  hotspotBespokeUnitSpec: {
    en: "Integrated Architectural Lighting",
    bn: "ইনবিল্ট লাইটিং ও কাস্টম উডওয়ার্ক",
  },

  // Why Heaven Slides
  whSlide1Tag: { en: "INITIAL CONSULTATION", bn: "পরামর্শ ও পরিকল্পনা" },
  whSlide1Title: { en: "Free design consultation", bn: "ফ্রি ডিজাইন পরামর্শ" },
  whSlide1Desc: {
    en: "Work directly with our expert interior architects to bring your dream living space vision to life.",
    bn: "আপনার স্বপ্নের ঘর সাজাতে অভিজ্ঞ ফার্নিচার ডিজাইনারের সরাসরি ফ্রি পরামর্শ পান।",
  },

  whSlide2Tag: { en: "BESPOKE ARCHITECTURE", bn: "কাস্টম ফিটিং" },
  whSlide2Title: {
    en: "Fully bespoke — built to your space, not mass-produced",
    bn: "সম্পূর্ণ কাস্টম — প্রতিটি ফার্নিচার ঘরের মাপে তৈরি, মাস-প্রোডিউসড নয়",
  },
  whSlide2Desc: {
    en: "Every piece is custom-tailored to your room's exact architectural dimensions and personal aesthetic.",
    bn: "ঘরের নিখুঁত মাপে এবং আপনার নিজস্ব স্টাইল ও স্বাদ অনুযায়ী তৈরি সেরা কাস্টম ফার্নিচার।",
  },

  whSlide3Tag: { en: "MATERIALITY & TIMBER", bn: "কায়িক কারিগরি" },
  whSlide3Title: {
    en: "Premium wood & materials, skilled in-house craftsmanship",
    bn: "প্রিমিয়াম কাঠ ও উপাদান, অভিজ্ঞ কারিগরদের দক্ষ হাত",
  },
  whSlide3Desc: {
    en: "Seasoned solid teak, mahogany, and anti-warp engineered wood with hand-polished luxury finishes.",
    bn: "উন্নত মেহগনি ও সেগুন কাঠ এবং ইন-হাউজ দক্ষ কারিগরদের টেকসই হাতের নিখুঁত কাজ।",
  },

  whSlide4Tag: { en: "THE PHYSICAL SHOWROOM", bn: "শোরুম ভিজিট" },
  whSlide4Title: {
    en: "Large physical showroom in Chattogram (Agrabad)",
    bn: "চট্টগ্রামের আগ্রাবাদে সুবিশাল নিজস্ব শোরুম",
  },
  whSlide4Desc: {
    en: "Touch, feel, and experience our handcrafted luxury furniture collections in person at Agrabad Access Road.",
    bn: "আগ্রাবাদ এক্সেস রোডে সরাসরি শোরুম ভিজিট করে ফার্নিচারের ফিনিশিং ও কোয়ালিটি স্বচক্ষে দেখুন।",
  },

  whSlide5Tag: { en: "WHITE-GLOVE SERVICE", bn: "হোম সার্ভিস" },
  whSlide5Title: {
    en: "Delivery & installation included",
    bn: "ডেলিভারি ও প্রফেশনাল ফিটিং ইনক্লুডেড",
  },
  whSlide5Desc: {
    en: "Seamless white-glove delivery and precision setup directly at your doorstep by our skilled team.",
    bn: "ঝামেলাহীন হোম ডেলিভারি এবং অভিজ্ঞ ফিটিং টিম দিয়ে নিখুঁত ইনস্টলেশন নিশ্চয়তা।",
  },

  whSlide6Tag: { en: "FINANCIAL COMFORT", bn: "সহজ পেমেন্ট" },
  whSlide6Title: {
    en: "Easy payment options",
    bn: "সহজ ও সুবিধাজনক পেমেন্ট অপশন",
  },
  whSlide6Desc: {
    en: "Flexible milestone payment plans and installment structures tailored for hassle-free home furnishing.",
    bn: "বাজেট ফ্রেন্ডলি কিস্তি ও পার্ট পেমেন্ট সুবিধায় নিজের পছন্দমতো ঘর সাজান স্বাচ্ছন্দে।",
  },

  whSlide7Tag: { en: "ACCREDITED HERITAGE", bn: "বিশ্বস্ততা" },
  whSlide7Title: {
    en: "Trusted by hundreds of happy homeowners",
    bn: "শত শত সন্তুষ্ট গৃহমালিকের বিশ্বস্ত পছন্দ",
  },
  whSlide7Desc: {
    en: "Years of proven artisan excellence, structural warranty, and delighted homeowners across Bangladesh.",
    bn: "চট্টগ্রামজুড়ে শত শত সন্তুষ্ট কাস্টমারের দীর্ঘদিনের বিশ্বস্ততা ও গুণগত মানের সেরা গ্যারান্টি।",
  },

  // Consultation Modal
  modalNotProvided: { en: "Not Provided", bn: "অনুল্লেখিত" },
  modalNoNotes: { en: "No notes specified", bn: "কোনো বিশেষ মাপ নেই" },
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
