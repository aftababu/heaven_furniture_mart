"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SlideData {
  num: string;
  tagEn: string;
  tagBn: string;
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  img: string;
}

const slides: SlideData[] = [
  {
    num: "01",
    tagEn: "01 / 07 — CONSULTATION",
    tagBn: "০১ / ০৭ — পরামর্শ",
    titleEn: "Free design consultation",
    titleBn: "ফ্রি ডিজাইন পরামর্শ",
    descEn:
      "Work directly with our expert interior architects to bring your dream living space vision to life.",
    descBn:
      "আপনার স্বপ্নের ঘর সাজাতে অভিজ্ঞ ফার্নিচার ডিজাইনারের সরাসরি ফ্রি পরামর্শ পান।",
    img: "/images/card1.jpg",
  },
  {
    num: "02",
    tagEn: "02 / 07 — BESPOKE CRAFT",
    tagBn: "০২ / ০৭ — কাস্টম ফিটিং",
    titleEn: "Fully bespoke — built to your space, not mass-produced",
    titleBn:
      "সম্পূর্ণ কাস্টম — প্রতিটি ফার্নিচার ঘরের মাপে তৈরি, মাস-প্রোডিউসড নয়",
    descEn:
      "Every piece is custom-tailored to your room's exact architectural dimensions and personal aesthetic.",
    descBn:
      "ঘরের নিখুঁত মাপে এবং আপনার নিজস্ব স্টাইল ও স্বাদ অনুযায়ী তৈরি সেরা কাস্টম ফার্নিচার।",
    img: "/images/card2.jpg",
  },
  {
    num: "03",
    tagEn: "03 / 07 — PREMIUM MATERIALS",
    tagBn: "০৩ / ০৭ — কায়িক কারিগরি",
    titleEn: "Premium wood & materials, skilled in-house craftsmanship",
    titleBn: "প্রিমিয়াম কাঠ ও উপাদান, অভিজ্ঞ কারিগরদের দক্ষ হাত",
    descEn:
      "Seasoned solid teak, mahogany, and anti-warp engineered wood with hand-polished luxury finishes.",
    descBn:
      "উন্নত মেহগনি ও সেগুন কাঠ এবং ইন-হাউজ দক্ষ কারিগরদের টেকসই হাতের নিখুঁত কাজ।",
    img: "/images/card3.png",
  },
  {
    num: "04",
    tagEn: "04 / 07 — SHOWROOM EXPERIENCE",
    tagBn: "০৪ / ০৭ — শোরুম ভিজিট",
    titleEn: "Large physical showroom in Chattogram (Agrabad)",
    titleBn: "চট্টগ্রামের আগ্রাবাদে সুবিশাল নিজস্ব শোরুম",
    descEn:
      "Touch, feel, and experience our handcrafted luxury furniture collections in person at Agrabad Access Road.",
    descBn:
      "আগ্রাবাদ এক্সেস রোডে সরাসরি শোরুম ভিজিট করে ফার্নিচারের ফিনিশিং ও কোয়ালিটি স্বচক্ষে দেখুন।",
    img: "/images/card4.jpg",
  },
  {
    num: "05",
    tagEn: "05 / 07 — LOGISTICS & INSTALL",
    tagBn: "০৫ / ০৭ — হোম সার্ভিস",
    titleEn: "Delivery & installation included",
    titleBn: "ডেলিভারি ও প্রফেশনাল ফিটিং ইনক্লুডেড",
    descEn:
      "Seamless white-glove delivery and precision setup directly at your doorstep by our skilled team.",
    descBn:
      "ঝামেলাহীন হোম ডেলিভারি এবং অভিজ্ঞ ফিটিং টিম দিয়ে নিখুঁত ইনস্টলেশন নিশ্চয়তা।",
    img: "/images/card5.png",
  },
  {
    num: "06",
    tagEn: "06 / 07 — EASY PAYMENT",
    tagBn: "০৬ / ০৭ — সহজ পেমেন্ট",
    titleEn: "Easy payment options",
    titleBn: "সহজ ও সুবিধাজনক পেমেন্ট অপশন",
    descEn:
      "Flexible milestone payment plans and installment structures tailored for hassle-free home furnishing.",
    descBn:
      "বাজেট ফ্রেন্ডলি কিস্তি ও পার্ট পেমেন্ট সুবিধায় নিজের পছন্দমতো ঘর সাজান স্বাচ্ছন্দে।",
    img: "/images/sofa.jpg",
  },
  {
    num: "07",
    tagEn: "07 / 07 — TRUSTED HERITAGE",
    tagBn: "০৭ / ০৭ — বিশ্বস্ততা",
    titleEn: "Trusted by hundreds of happy homeowners",
    titleBn: "শত শত সন্তুষ্ট গৃহমালিকের বিশ্বস্ত পছন্দ",
    descEn:
      "Years of proven artisan excellence, structural warranty, and delighted homeowners across Bangladesh.",
    descBn:
      "চট্টগ্রামজুড়ে শত শত সন্তুষ্ট কাস্টমারের দীর্ঘদিনের বিশ্বস্ততা ও গুণগত মানের সেরা গ্যারান্টি।",
    img: "/images/bespoke.jpg",
  },
];

const trustPointsKeys = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8"];

interface WhyHeavenFlipCardProps {
  onOpenConsultation: () => void;
}

export const WhyHeavenFlipCard: React.FC<WhyHeavenFlipCardProps> = ({
  onOpenConsultation,
}) => {
  const { lang, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(1);
  const [secondsLeft, setSecondsLeft] = useState(25.0);

  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isFlipped) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isFlipped]);

  useEffect(() => {
    if (!isFlipped) {
      setSecondsLeft(25.0);
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 0.1) {
          returnFromFlip();
          return 25.0;
        }
        return Number((prev - 0.1).toFixed(1));
      });
    }, 100);
    return () => clearInterval(timer);
  }, [isFlipped]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const triggerLookbookFlip = () => {
    if (isFlipped) return;

    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    if (countdownIntervalRef.current)
      clearInterval(countdownIntervalRef.current);

    setIsFlipped(true);

    holdTimerRef.current = setTimeout(() => {
      setSecondsLeft(25.0);
      countdownIntervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 0.1) {
            returnFromFlip();
            return 25.0;
          }
          return Number((prev - 0.1).toFixed(1));
        });
      }, 100);
    }, 950);
  };

  const returnFromFlip = () => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    if (countdownIntervalRef.current)
      clearInterval(countdownIntervalRef.current);

    setIsFlipped(false);
  };

  const activeSlide = slides[currentSlide];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 40 : -40,
      opacity: 0,
    }),
  };

  return (
    <section
      id="why-heaven"
      className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 flex justify-center items-center"
    >
      <div className="lookbook-stage max-w-[1520px] w-full">
        <div
          className={`lookbook-page border border-wood-border rounded-xl bg-ivory relative ${
            isFlipped ? "flipped" : ""
          }`}
        >
          {/* FRONT FACE: SYNCHRONIZED SLIDE CAROUSEL SPREAD */}
          <div className="page-front p-6 sm:p-10 lg:p-14 rounded-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-stretch min-h-[480px] sm:min-h-[520px]">
              {/* LEFT COLUMN: CAROUSEL SLIDE STAGE */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full py-1">
                {/* Header Eyebrow */}
                <div>
                  <span className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-brass block mb-2 font-hanken">
                    {t("whyEyebrow")}
                  </span>
                </div>

                {/* Animated Carousel Card Content */}
                <div className="relative h-[220px] sm:h-[240px] lg:h-[260px] flex flex-col justify-center my-2 overflow-hidden">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={activeSlide.num}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="w-full"
                    >
                      <span className="text-4xl sm:text-5xl font-sangbleu-sunrise font-light text-brass block mb-2 leading-none">
                        {activeSlide.num}
                      </span>

                      <h2 className="text-2xl sm:text-3xl lg:text-[2.4rem] font-sangbleu-sunrise font-light text-charcoal leading-[1.12] tracking-tight mb-3 line-clamp-2">
                        {lang === "bn"
                          ? activeSlide.titleBn
                          : activeSlide.titleEn}
                      </h2>

                      <p className="font-hanken text-slate-warm text-xs sm:text-sm font-normal leading-relaxed max-w-md line-clamp-3">
                        {lang === "bn"
                          ? activeSlide.descBn
                          : activeSlide.descEn}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Carousel Controls & SEE ALL Button at Bottom */}
                <div className="space-y-5 pt-4 border-t border-wood-border">
                  {/* Navigation Row: Arrows & Dots */}
                  <div className="flex items-center justify-between">
                    {/* Pagination Indicators */}
                    <div className="flex items-center gap-2">
                      {slides.map((s, idx) => (
                        <button
                          key={s.num}
                          onClick={() => goToSlide(idx)}
                          aria-label={`Go to slide ${idx + 1}`}
                          className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                            idx === currentSlide
                              ? "w-8 bg-brass"
                              : "w-2 bg-wood-border hover:bg-slate-gray"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Bottom SEE ALL Button to Flip Card with shadcn UI Button */}
                  <div>
                    <Button
                      variant="gradient"
                      size="lg"
                      onClick={triggerLookbookFlip}
                      className="w-full sm:w-auto gap-3"
                    >
                      <span>{t("btnSeeAll")}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: CAROUSEL PHOTOGRAPH STAGE */}
              <div className="lg:col-span-7 flex flex-col justify-center h-full min-h-[340px] sm:min-h-[400px] lg:min-h-[460px]">
                <div className="relative w-full h-full min-h-[340px] sm:min-h-[400px] lg:min-h-[460px] rounded-xl overflow-hidden shadow-md bg-stone-200">
                  <div className="absolute top-5 left-5 z-20 bg-charcoal/90 backdrop-blur-md px-3.5 py-1.5 rounded-sm text-[0.7rem] uppercase tracking-[0.22em] font-semibold text-ivory border border-white/20 pointer-events-none font-hanken">
                    <span>
                      {lang === "bn" ? activeSlide.tagBn : activeSlide.tagEn}
                    </span>
                  </div>

                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={activeSlide.num}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <Image
                        src={activeSlide.img}
                        alt={
                          lang === "bn"
                            ? activeSlide.titleBn
                            : activeSlide.titleEn
                        }
                        fill
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* REVERSE FACE: COMPLETE LOOKBOOK MANIFESTO & TRUST ARCHITECTURE */}
          <div className="page-back p-6 sm:p-10 lg:p-16 flex flex-col justify-between bg-ivory rounded-xl">
            {/* Reverse Header with 25s Return Progress Indicator */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-wood-border pb-6 mb-10 gap-4">
              <div>
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-brass block mb-1 font-hanken">
                  {t("revEyebrow")}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sangbleu-sunrise font-light text-charcoal tracking-tight">
                  {t("revTitle")}
                </h2>
              </div>

              {/* 25s Hold Visual Countdown Badge */}
              <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-sm border border-wood-border self-start sm:self-auto shadow-sm">
                <div className="w-2 h-2 rounded-full bg-brass animate-pulse" />
                <span className="text-[0.7rem] font-mono text-slate-muted font-medium uppercase tracking-wider">
                  {secondsLeft.toFixed(1)}S
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={returnFromFlip}
                  className="pl-2 border-l border-wood-border text-[0.7rem]"
                >
                  {t("revReturnBtn")}
                </Button>
              </div>
            </div>

            {/* Reverse Grid: 7 Core Pillars (Left) + 8 Trust Pillars (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-start">
              {/* Left: 7 Pillars with Large Faded Numbers & Full Descriptions */}
              <div className="lg:col-span-6 space-y-5">
                {slides.map((s) => (
                  <div
                    key={s.num}
                    className="flex items-start gap-4 pb-3.5 border-b border-wood-border"
                  >
                    <span className="text-2xl sm:text-3xl font-sangbleu-sunrise font-light text-brass w-8 shrink-0 leading-none">
                      {s.num}
                    </span>
                    <div>
                      <h4 className="text-xs uppercase tracking-[0.18em] font-bold text-charcoal mb-0.5 font-hanken">
                        {lang === "bn" ? s.titleBn : s.titleEn}
                      </h4>
                      <p className="text-xs text-slate-gray font-normal leading-relaxed font-hanken">
                        {lang === "bn" ? s.descBn : s.descEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: 8 Editorial Trust Verification Points */}
              <div className="lg:col-span-6 bg-white rounded-xl p-6 sm:p-8 border border-wood-border shadow-sm">
                <span className="text-[0.7rem] uppercase tracking-[0.25em] font-bold text-charcoal block mb-6 font-hanken">
                  {t("revTrustLabel")}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6 text-xs text-slate-gray font-normal">
                  {trustPointsKeys.map((key) => (
                    <div key={key} className="flex items-start gap-2.5">
                      <span className="text-brass font-bold leading-none">
                        ✦
                      </span>
                      <span className="font-semibold text-charcoal-body font-hanken">
                        {t(key)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Managing Director Sign-off */}
                <div className="mt-8 pt-6 border-t border-wood-border flex items-center justify-between">
                  <div>
                    <p className="text-[0.7rem] uppercase tracking-widest font-semibold text-charcoal font-hanken">
                      {t("mdName")}
                    </p>
                    <p className="text-[0.7rem] uppercase tracking-wider text-slate-muted font-medium font-hanken">
                      {t("mdRole")}
                    </p>
                  </div>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={onOpenConsultation}
                    className="gap-1 text-[0.7rem]"
                  >
                    <span>DIRECT INQUIRY</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Reverse Page Footer Rule */}
            <div className="pt-8 mt-6 border-t border-wood-border flex justify-between items-center text-[0.7rem] uppercase tracking-[0.2em] text-slate-muted font-medium font-hanken">
              <span>AGRABAD ACCESS ROAD · CHATTOGRAM</span>
              <span>HEAVEN EDITORIAL ARCHIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
