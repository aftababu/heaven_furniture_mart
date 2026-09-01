"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface SlideData {
  num: string;
  tagEn: string;
  tagBn: string;
  headlineKey: string;
  statementKey: string;
  titleKey: string;
  descKey: string;
  img: string;
}

const slides: SlideData[] = [
  {
    num: "01",
    tagEn: "01 — DESIGN",
    tagBn: "০১ — ডিজাইন",
    headlineKey: "s0Headline",
    statementKey: "s0Statement",
    titleKey: "r0Title",
    descKey: "r0Desc",
    img: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=2000",
  },
  {
    num: "02",
    tagEn: "02 — MATERIAL",
    tagBn: "০২ — উপাদান",
    headlineKey: "s1Headline",
    statementKey: "s1Statement",
    titleKey: "r1Title",
    descKey: "r1Desc",
    img: "https://images.pexels.com/photos/116910/pexels-photo-116910.jpeg?auto=compress&cs=tinysrgb&w=2000",
  },
  {
    num: "03",
    tagEn: "03 — CRAFT",
    tagBn: "০৩ — কারিগরি",
    headlineKey: "s2Headline",
    statementKey: "s2Statement",
    titleKey: "r2Title",
    descKey: "r2Desc",
    img: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=2000",
  },
  {
    num: "04",
    tagEn: "04 — DETAIL",
    tagBn: "০৪ — ডিটেইল",
    headlineKey: "s3Headline",
    statementKey: "s3Statement",
    titleKey: "r3Title",
    descKey: "r3Desc",
    img: "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=2000",
  },
  {
    num: "05",
    tagEn: "05 — INSTALL",
    tagBn: "০৫ — ইনস্টলেশন",
    headlineKey: "s4Headline",
    statementKey: "s4Statement",
    titleKey: "r4Title",
    descKey: "r4Desc",
    img: "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=2000",
  },
];

const trustPointsKeys = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8"];

interface WhyHeavenFlipCardProps {
  onOpenConsultation: () => void;
}

export const WhyHeavenFlipCard: React.FC<WhyHeavenFlipCardProps> = ({ onOpenConsultation }) => {
  const { lang, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [textFade, setTextFade] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(5.0);

  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Reliable, continuous autoplay loop every 4.5 seconds while page is open & front face is visible
  useEffect(() => {
    if (isFlipped) return;

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        const nextSlide = (prevSlide + 1) % slides.length;
        setTextFade(false);
        setTimeout(() => {
          setTextFade(true);
        }, 250);
        return nextSlide;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isFlipped]);

  // 5s Countdown timer on back page
  useEffect(() => {
    if (!isFlipped) {
      setSecondsLeft(5.0);
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 0.1) {
          returnFromFlip();
          return 5.0;
        }
        return Number((prev - 0.1).toFixed(1));
      });
    }, 100);
    return () => clearInterval(timer);
  }, [isFlipped]);

  const handleSlideChange = (newIdx: number) => {
    if (newIdx === currentSlide) return;
    setTextFade(false);
    setTimeout(() => {
      setCurrentSlide(newIdx);
      setTextFade(true);
    }, 250);
  };

  // Immediate flip start when user clicks SEE ALL
  const triggerLookbookFlip = () => {
    if (isFlipped) return;

    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    setIsFlipped(true);

    holdTimerRef.current = setTimeout(() => {
      setSecondsLeft(5.0);
      countdownIntervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 0.1) {
            returnFromFlip();
            return 5.0;
          }
          return Number((prev - 0.1).toFixed(1));
        });
      }, 100);
    }, 950);
  };

  // Immediate reverse flip start when user clicks CLOSE x
  const returnFromFlip = () => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    setIsFlipped(false);
  };

  const activeSlide = slides[currentSlide];

  return (
    <section id="why-heaven" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 flex justify-center items-center">
      <div className="lookbook-stage max-w-[1520px] w-full">
        <div
          className={`lookbook-page border border-[#C9A882]/30 rounded-[2rem] bg-[#F4F1EA] relative ${
            isFlipped ? "flipped" : ""
          }`}
        >
          {/* FRONT FACE: SYNCHRONIZED EDITORIAL CAROUSEL LOOKBOOK SPREAD */}
          <div className="page-front p-6 sm:p-10 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-stretch">
              {/* LEFT COLUMN: CAROUSEL NARRATIVE & 5 PAIRED REASONS (~40% Width) */}
              <div className="lg:col-span-5 flex flex-col justify-between py-1">
                {/* Top Text: Eyebrow + Dynamic Headline + Statement */}
                <div>
                  <span className="text-[0.68rem] sm:text-xs font-bold uppercase tracking-[0.28em] text-[#C9A227] block mb-6 font-hanken">
                    {t("whyEyebrow")}
                  </span>

                  <div
                    className={`min-h-[140px] sm:min-h-[160px] transition-all duration-300 ${
                      textFade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                    }`}
                  >
                    <h2
                      dangerouslySetInnerHTML={{ __html: t(activeSlide.headlineKey) }}
                      className="text-4xl sm:text-5xl lg:text-[3.65rem] font-sangbleu-sunrise font-light text-[#4A3B31] leading-[1.04] tracking-tight mb-4"
                    />
                    <p className="font-hanken text-[#4A3B31]/80 text-sm sm:text-base font-light leading-relaxed max-w-sm">
                      {t(activeSlide.statementKey)}
                    </p>
                  </div>
                </div>

                {/* 5 Synced Reason Steps (Clickable, Highlights active) */}
                <div className="border-t border-[#4A3B31]/10 divide-y divide-[#4A3B31]/10 my-8">
                  {slides.map((s, idx) => {
                    const isActive = idx === currentSlide;
                    return (
                      <div
                        key={s.num}
                        onClick={() => handleSlideChange(idx)}
                        className="py-3 flex items-start gap-4 cursor-pointer group transition-all"
                      >
                        <span
                          className={`reason-num text-lg font-cormorant font-light w-6 shrink-0 transition-colors ${
                            isActive ? "text-[#C9A227]" : "text-[#4A3B31]/25"
                          }`}
                        >
                          {s.num}
                        </span>
                        <div>
                          <h3
                            className={`reason-title text-xs font-bold uppercase tracking-wider transition-colors font-hanken ${
                              isActive
                                ? "text-[#4A3B31]"
                                : "text-[#4A3B31]/50 group-hover:text-[#C9A227]"
                            }`}
                          >
                            {t(s.titleKey)}
                          </h3>
                          <p
                            className={`reason-desc text-[0.72rem] font-light leading-snug transition-colors font-hanken ${
                              isActive ? "text-[#4A3B31]" : "text-[#4A3B31]/60"
                            }`}
                          >
                            {t(s.descKey)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Action Row with Immediate 3D Page Flip Trigger */}
                <div className="flex items-center gap-6 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={triggerLookbookFlip}
                    className="group inline-flex items-center gap-3 border border-[#C9A882] hover:border-[#34494A] bg-transparent hover:bg-[#34494A] hover:text-[#F4F1EA] px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase transition duration-300 text-[#4A3B31] cursor-pointer shadow-sm font-hanken focus-visible:outline-2 focus-visible:outline-[#C9A227]"
                  >
                    <span>{t("btnSeeAll")}</span>
                    <motion.span
                      className="inline-block"
                      initial={false}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </motion.span>
                  </motion.button>

                  <div className="h-6 w-[1px] bg-black/10" />

                  <span className="text-[#C9A227] text-xs font-bold tracking-[0.2em] uppercase font-hanken">
                    {t("promoDiscount")}
                  </span>
                </div>
              </div>

              {/* RIGHT COLUMN: ONE LARGE DOMINANT PHOTOGRAPH WITH MOTION CROSSFADE */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/10] rounded-2xl overflow-hidden shadow-md bg-stone-200">
                  {/* Floating Slide Index Label (Top-Left) */}
                  <div className="absolute top-5 left-5 z-20 bg-[#34494A]/85 backdrop-blur-md px-3.5 py-1.5 rounded text-[0.62rem] uppercase tracking-[0.25em] font-semibold text-[#F4F1EA] border border-white/10 pointer-events-none font-hanken">
                    <span>{lang === "bn" ? activeSlide.tagBn : activeSlide.tagEn}</span>
                  </div>

                  {/* Motion Pure Crossfade Image Stage */}
                  <AnimatePresence mode="sync">
                    <motion.img
                      key={activeSlide.num}
                      src={activeSlide.img}
                      alt={t(activeSlide.titleKey)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* REVERSE FACE: COMPLETE LOOKBOOK MANIFESTO & TRUST ARCHITECTURE */}
          <div className="page-back p-6 sm:p-10 lg:p-16 flex flex-col justify-between bg-[#F4F1EA] rounded-[2rem]">
            {/* Reverse Header with 5s Return Progress Indicator */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#4A3B31]/10 pb-6 mb-10 gap-4">
              <div>
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.3em] text-[#C9A227] block mb-1 font-hanken">
                  {t("revEyebrow")}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cormorant font-light text-[#4A3B31] tracking-tight">
                  {t("revTitle")}
                </h2>
              </div>

              {/* 5s Hold Visual Countdown Badge */}
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-black/5 self-start sm:self-auto">
                <div className="w-2 h-2 rounded-full bg-[#C9A227] animate-pulse" />
                <span className="text-[0.68rem] font-mono text-[#4A3B31]/70 uppercase tracking-wider">
                  HOLDING {secondsLeft.toFixed(1)}S
                </span>
                <button
                  onClick={returnFromFlip}
                  className="text-[0.68rem] font-bold text-[#4A3B31] hover:text-[#C9A227] uppercase tracking-widest pl-2 border-l border-black/10 cursor-pointer font-hanken focus-visible:outline-2 focus-visible:outline-[#C9A227]"
                >
                  {t("revReturnBtn")}
                </button>
              </div>
            </div>

            {/* Reverse Grid: 5 Detailed Core Pillars (Left) + 8 Trust Pillars (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-start">
              {/* Left: 5 Pillars with Large Faded Serif Numbers */}
              <div className="lg:col-span-6 space-y-6">
                {slides.map((s) => (
                  <div key={s.num} className="flex items-start gap-5 pb-4 border-b border-[#4A3B31]/10">
                    <span className="text-3xl sm:text-4xl font-cormorant font-light text-[#C9A227]/70 w-10 shrink-0 leading-none">
                      {s.num}
                    </span>
                    <div>
                      <h4 className="text-xs uppercase tracking-[0.22em] font-bold text-[#4A3B31] mb-1 font-hanken">
                        {t(s.titleKey)}
                      </h4>
                      <p className="text-xs text-[#4A3B31]/80 font-light leading-relaxed font-hanken">
                        {t(s.descKey)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: 8 Editorial Trust Verification Points */}
              <div className="lg:col-span-6 bg-white/60 rounded-2xl p-6 sm:p-8 border border-[#C9A882]/30">
                <span className="text-[0.65rem] uppercase tracking-[0.25em] font-bold text-[#4A3B31] block mb-6 font-hanken">
                  {t("revTrustLabel")}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6 text-xs text-[#4A3B31]/80 font-light">
                  {trustPointsKeys.map((key) => (
                    <div key={key} className="flex items-start gap-2.5">
                      <span className="text-[#C9A227] font-bold leading-none">✦</span>
                      <span className="font-medium text-[#4A3B31] font-hanken">
                        {t(key)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Managing Director Sign-off */}
                <div className="mt-8 pt-6 border-t border-[#4A3B31]/10 flex items-center justify-between">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-widest font-semibold text-[#4A3B31] font-hanken">
                      {t("mdName")}
                    </p>
                    <p className="text-[0.6rem] uppercase tracking-wider text-[#4A3B31]/60 font-hanken">
                      {t("mdRole")}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onOpenConsultation}
                    className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#C9A227] hover:text-[#34494A] transition-colors font-hanken flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-[#C9A227]"
                  >
                    <span>DIRECT INQUIRY</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Reverse Page Footer Rule */}
            <div className="pt-8 mt-6 border-t border-[#4A3B31]/10 flex justify-between items-center text-[0.65rem] uppercase tracking-[0.2em] text-[#4A3B31]/60 font-hanken">
              <span>AGRABAD ACCESS ROAD · CHATTOGRAM</span>
              <span>HEAVEN EDITORIAL ARCHIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
