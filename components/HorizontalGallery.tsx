"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface GalleryCardItem {
  id: string;
  img: string;
  alt: string;
  capKey: string;
  aspect: string;
  widthClass: string;
  alignClass: string;
  marginClass: string;
}

interface MilestoneItem {
  year: string;
  titleKey: string;
  tagKey: string;
  defaultTitle: string;
  defaultTag: string;
  isHighlighted?: boolean;
}

const GALLERY_CARDS: GalleryCardItem[] = [
  {
    id: "card-1",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788443693/hackathon/card1_xhse8b.webp",
    alt: "Custom Living Room Sofa",
    capKey: "cap_1",
    aspect: "aspect-[16/11]",
    widthClass: "w-[68vw] sm:w-[42vw] lg:w-[30vw]",
    alignClass: "self-start mt-6 sm:mt-10",
    marginClass: "ml-12 sm:ml-16 lg:ml-20",
  },
  {
    id: "card-2",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788443693/hackathon/card2_ash5hh.webp",
    alt: "Craft Solid Hardwood Detail",
    capKey: "cap_2",
    aspect: "aspect-[4/5]",
    widthClass: "w-[55vw] sm:w-[32vw] lg:w-[22vw]",
    alignClass: "self-end mb-8 sm:mb-14",
    marginClass: "ml-16 sm:ml-24 lg:ml-28",
  },

  {
    id: "card-4",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788443693/hackathon/card4_kjoiln.webp",
    alt: "Bespoke Timber Dining",
    capKey: "cap_4",
    aspect: "aspect-[16/10]",
    widthClass: "w-[70vw] sm:w-[44vw] lg:w-[32vw]",
    alignClass: "self-start mt-4 sm:mt-8",
    marginClass: "ml-14 sm:ml-24 lg:ml-32",
  },
  {
    id: "card-5",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788443693/hackathon/card5_gykt4m.webp",
    alt: "Atelier Hand-Planed Joinery",
    capKey: "cap_5",
    aspect: "aspect-[3/4]",
    widthClass: "w-[50vw] sm:w-[30vw] lg:w-[20vw]",
    alignClass: "self-end mb-6 sm:mb-12",
    marginClass: "ml-12 sm:ml-16 lg:ml-20",
  },
  {
    id: "card-6",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788443691/hackathon/shop_is53xd.webp",
    alt: "Executive Bespoke Interior",
    capKey: "cap_6",
    aspect: "aspect-[16/11]",
    widthClass: "w-[68vw] sm:w-[40vw] lg:w-[28vw]",
    alignClass: "self-start mt-20 sm:mt-32",
    marginClass: "ml-16 sm:ml-28 lg:ml-32",
  },
  {
    id: "card-7",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788443692/hackathon/inside_mkpujz.webp",
    alt: "Agrabad Access Road Showroom",
    capKey: "cap_7",
    aspect: "aspect-[16/9]",
    widthClass: "w-[55vw] sm:w-[32vw] ",
    alignClass: "self-end mb-12 sm:mb-16",
    marginClass: "ml-12 sm:ml-20 lg:ml-24",
  },
];

const MILESTONES: MilestoneItem[] = [
  {
    year: "2020",
    titleKey: "milestone2020Title",
    tagKey: "milestone2020Tag",
    defaultTitle: "Founded by Abul Kalam Bhuiyan",
    defaultTag: "Inception · Chattogram",
  },
  {
    year: "2021",
    titleKey: "milestone2021Title",
    tagKey: "milestone2021Tag",
    defaultTitle: "Opened the Flagship Agrabad Showroom",
    defaultTag: "Retail Expansion",
  },
  {
    year: "2024–25",
    titleKey: "milestone2024Title",
    tagKey: "milestone2024Tag",
    defaultTitle: "Exhibited at the International Furniture Fair",
    defaultTag: "Exhibition · Pavilion",
  },
  {
    year: "2025",
    titleKey: "milestone2025Title",
    tagKey: "milestone2025Tag",
    defaultTitle: "Inducted into the Chamber of Commerce",
    defaultTag: "Trade Alliance",
  },
  {
    year: "2026",
    titleKey: "milestone2026Title",
    tagKey: "milestone2026Tag",
    defaultTitle: "Received Nationwide BFIOA Recognition",
    defaultTag: "National Honor",
    isHighlighted: true,
  },
];

export const HorizontalGallery: React.FC = () => {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const finalCtaRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 1. Viewport IntersectionObserver for Entrance Reveals
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px -5% 0px 0px",
      threshold: 0.15,
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
        }
      });
    }, observerOptions);

    const scatterCards = document.querySelectorAll(".scatter-card");
    scatterCards.forEach((card) => revealObserver.observe(card));

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  // 2. Hardware-Accelerated Smooth Horizontal Track Scroll Physics
  useEffect(() => {
    let maxScrollX = 0;
    let isTicking = false;

    const calcDimensions = () => {
      if (!trackRef.current) return;
      const viewportWidth = window.innerWidth;
      const trackWidth = trackRef.current.scrollWidth;
      maxScrollX = Math.max(trackWidth - viewportWidth + 24, 0);
    };

    const updateGallery = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const quote = quoteRef.current;
      const finalCta = finalCtaRef.current;
      const progressFill = progressFillRef.current;

      if (!section || !track) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      if (sectionHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / sectionHeight));

      // 1. Horizontal track translation
      const currentX = progress * maxScrollX;
      track.style.transform = `translate3d(-${currentX.toFixed(2)}px, 0, 0)`;

      // 2. Progress fill bar
      if (progressFill) {
        progressFill.style.width = `${(progress * 100).toFixed(1)}%`;
      }

      // 3. Calibrated Quote Fade
      if (quote) {
        let quoteOpacity = 1;
        if (progress > 0.15) {
          quoteOpacity = Math.max(0, 1 - (progress - 0.15) / 0.15);
        }
        const quoteShift = Math.min(progress / 0.3, 1) * 60;
        quote.style.opacity = quoteOpacity.toFixed(3);
        quote.style.transform = `translate3d(-${quoteShift.toFixed(2)}px, 0, 0)`;
      }

      // 4. Closing CTA Entrance (80-100%)
      if (finalCta) {
        let ctaOpacity = 0.2;
        if (progress > 0.8) {
          ctaOpacity = 0.2 + ((progress - 0.8) / 0.2) * 0.8;
        }
        const finalOpacity = Math.min(1, ctaOpacity);
        finalCta.style.opacity = finalOpacity.toFixed(3);
        finalCta.style.transform = `translate3d(0, ${((1 - finalOpacity) * 20).toFixed(2)}px, 0)`;
      }

      isTicking = false;
    };

    const onScroll = () => {
      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(updateGallery);
      }
    };

    const onResize = () => {
      calcDimensions();
      updateGallery();
    };

    calcDimensions();
    updateGallery();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const resolveText = (key: string, fallback: string): string => {
    const val = t(key);
    return val && val !== key ? val : fallback;
  };

  return (
    <section
      ref={sectionRef}
      id="social-proof"
      className="relative h-[480vh] w-full bg-secondary-bg"
    >
      {/* STICKY VIEWPORT */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-secondary-bg">
        {/* HORIZONTAL MOVING TRACK */}
        <div
          ref={trackRef}
          className="flex flex-nowrap items-stretch h-full will-change-transform pl-6 sm:pl-12 lg:pl-20 pr-16 sm:pr-32 lg:pr-40 py-16 sm:py-24 bg-secondary-bg"
        >
          {/* STAGE 1: MANAGING DIRECTOR'S QUOTE & TRUST */}
          <div
            ref={quoteRef}
            className="quote-block shrink-0 w-[88vw] sm:w-[70vw] lg:w-[46vw] max-w-3xl pr-8 sm:pr-16 flex flex-col justify-center self-center select-none"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-accent font-hanken">
                {t("eyebrow")}
              </span>
              <span className="flex-1 h-px bg-border" />
            </div>

            {/* Main Serif Quote */}
            <blockquote className="text-2xl sm:text-3xl lg:text-[2.6rem] font-sangbleu-sunrise font-light not-italic text-text leading-[1.14] tracking-tight">
              <span>{t("quote_p1")}</span>
              <span className="block mt-2 text-text/90">{t("quote_p2")}</span>
            </blockquote>

            <div className="w-[60px] h-[2px] bg-accent my-6" />

            {/* Author Signature */}
            <div>
              <p className="text-[0.75rem] uppercase tracking-[0.2em] font-bold text-text font-hanken">
                {t("quote_author")}
              </p>
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-text-muted font-medium mt-1 font-hanken">
                {t("quote_role")}
              </p>
            </div>
          </div>

          {/* STAGE 2: ASYMMETRIC SCATTER GALLERY */}
          {GALLERY_CARDS.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className={`scatter-card shrink-0 ${item.marginClass} ${item.alignClass} flex flex-col group`}
            >
              {/* Outer Image Mask Container */}
              <div
                className={`image-card ${item.widthClass} ${item.aspect} relative rounded-none overflow-hidden bg-primary-bg shadow-sm border border-border transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[300ms] [clip-path:inset(0_0_0_100%_round_0px)] opacity-0 group-[.is-revealed]:[clip-path:inset(0_0_0_0%_round_0px)] group-[.is-revealed]:opacity-100`}
              >
                <Image
                  src={item.img}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 55vw, (max-width: 1024px) 44vw, 32vw"
                  className="card-image-inner w-full h-full object-cover block select-none pointer-events-none transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              </div>

              {/* Caption Reveal */}
              <p className="image-caption text-[0.68rem] font-semibold tracking-[0.22em] text-text-muted font-hanken uppercase pt-2.5 border-t border-border block transition-opacity duration-1000 delay-[600ms] mt-2 select-none opacity-0 group-[.is-revealed]:opacity-100">
                {t(item.capKey)}
              </p>
            </div>
          ))}

          {/* STAGE 3: CHRONOLOGY MILESTONES */}

          {/* Mobile Layout Card (Exact Match to Reference Design) */}
          <div className="md:hidden shrink-0 w-[90vw] xs:w-[85vw] max-w-[380px] self-center ml-6 xs:ml-8 flex flex-col justify-center select-none py-6">
            {/* Top Pill Header */}
            <div className="flex flex-col items-center mb-7">
              <div className="w-full max-w-[300px] py-4 px-6 rounded-[2.2rem] border border-accent/40 bg-secondary-bg/90 shadow-xs text-center">
                <span className="text-[0.58rem] font-hanken font-bold uppercase tracking-[0.25em] text-accent block mb-1">
                  {resolveText("chronologyEyebrow", "CHRONOLOGY")}
                </span>
                <h3 className="font-sangbleu-sunrise text-2xl text-text font-normal leading-snug">
                  {t("milestonesTitle")}
                </h3>
              </div>
              {/* Accent Line Below Pill */}
              <div className="w-12 h-[2px] bg-accent/60 mt-3" />
            </div>

            {/* Vertical Dashed Timeline */}
            <div className="relative pl-7 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:border-l before:border-dashed before:border-accent/40">
              {MILESTONES.map((m) => {
                const isHighlight = m.isHighlighted;
                return (
                  <div key={m.year} className="relative">
                    {/* Node Dot */}
                    <span
                      className={`absolute -left-[23px] rounded-full border transition-all ${
                        isHighlight
                          ? "top-3.5 w-4 h-4 border-2 border-accent bg-secondary-bg shadow-xs"
                          : "top-1.5 w-3.5 h-3.5 border-accent/40 bg-secondary-bg"
                      }`}
                    />

                    {isHighlight ? (
                      /* Highlighted Box Card for 2026 */
                      <div className="border border-accent/50 bg-accent/5 p-4 rounded-xl shadow-xs">
                        <span className="text-[0.56rem] font-hanken font-bold uppercase tracking-[0.2em] text-accent block mb-0.5">
                          {resolveText(m.tagKey, m.defaultTag)}
                        </span>
                        <h4 className="font-sangbleu-sunrise text-3xl text-accent font-normal leading-tight my-0.5">
                          {m.year}
                        </h4>
                        <p className="font-hanken text-[0.75rem] text-text font-bold leading-snug mt-1">
                          {resolveText(m.titleKey, m.defaultTitle)}
                        </p>
                      </div>
                    ) : (
                      /* Standard Milestone Node */
                      <div className="flex flex-col pr-2">
                        <span className="text-[0.56rem] font-hanken font-bold uppercase tracking-[0.2em] text-text-muted/80 block mb-0.5">
                          {resolveText(m.tagKey, m.defaultTag)}
                        </span>
                        <h4 className="font-sangbleu-sunrise text-2xl text-text font-normal leading-tight my-0.5">
                          {m.year}
                        </h4>
                        <p className="font-hanken text-[0.72rem] text-text-muted font-normal leading-snug">
                          {resolveText(m.titleKey, m.defaultTitle)}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop / Tablet Layout (Circular Orbital Diagram - Hidden on Mobile) */}
          <div className="hidden md:flex shrink-0 w-[85vw] lg:w-[65vw] max-w-4xl self-center ml-24 lg:ml-36 flex-col items-center justify-center select-none py-6">
            <div className="relative w-full aspect-square max-w-[620px] max-h-[620px] flex items-center justify-center">
              {/* SVG Background Orbit Rings & Connector Lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
                viewBox="0 0 600 600"
              >
                {/* Outer Orbit */}
                <circle
                  cx="300"
                  cy="300"
                  r="275"
                  fill="none"
                  stroke="currentColor"
                  className="text-accent/20"
                  strokeDasharray="3 3"
                />
                {/* Middle Orbit */}
                <circle
                  cx="300"
                  cy="300"
                  r="205"
                  fill="none"
                  stroke="currentColor"
                  className="text-accent/25"
                />
                {/* Inner Orbit */}
                <circle
                  cx="300"
                  cy="300"
                  r="145"
                  fill="none"
                  stroke="currentColor"
                  className="text-accent/30"
                  strokeDasharray="2 3"
                />

                {/* Radial Spokes */}
                <line
                  x1="300"
                  y1="300"
                  x2="300"
                  y2="25"
                  stroke="currentColor"
                  className="text-accent/35"
                  strokeDasharray="2 2"
                />
                <line
                  x1="300"
                  y1="300"
                  x2="520"
                  y2="170"
                  stroke="currentColor"
                  className="text-accent/25"
                  strokeDasharray="2 2"
                />
                <line
                  x1="300"
                  y1="300"
                  x2="480"
                  y2="460"
                  stroke="currentColor"
                  className="text-accent/25"
                  strokeDasharray="2 2"
                />
                <line
                  x1="300"
                  y1="300"
                  x2="120"
                  y2="460"
                  stroke="currentColor"
                  className="text-accent/25"
                  strokeDasharray="2 2"
                />
                <line
                  x1="300"
                  y1="300"
                  x2="80"
                  y2="170"
                  stroke="currentColor"
                  className="text-accent/25"
                  strokeDasharray="2 2"
                />
              </svg>

              {/* Center Hub */}
              <div className="relative z-10 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full border border-accent/40 bg-secondary-bg shadow-xl flex flex-col items-center justify-center p-4 text-center">
                <div className="absolute inset-1.5 sm:inset-2.5 rounded-full border border-dashed border-accent/30 pointer-events-none" />
                <span className="text-[0.6rem] sm:text-[0.66rem] font-hanken font-bold uppercase tracking-[0.3em] text-accent block mb-1">
                  {resolveText("chronologyEyebrow", "CHRONOLOGY")}
                </span>
                <h3 className="font-sangbleu-sunrise text-2xl sm:text-4xl text-text font-normal leading-snug">
                  {t("milestonesTitleLine1")} <br />
                  <span className="italic font-light">{t("milestonesTitleLine2")}</span>
                </h3>
                <div className="flex items-center justify-center gap-2 text-accent text-xs mt-2 opacity-80">
                  <span className="h-[1px] w-5 bg-accent/50" />
                  <span>◇</span>
                  <span className="h-[1px] w-5 bg-accent/50" />
                </div>
              </div>

              {/* 1. TOP NODE (2026) - National Honor */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center text-center z-20">
                <div className="w-5 h-5 rounded-full border border-accent/60 bg-secondary-bg flex items-center justify-center mb-1.5 shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full border border-accent/40 bg-secondary-bg text-[0.56rem] sm:text-[0.6rem] font-hanken font-bold uppercase tracking-[0.2em] text-accent shadow-xs mb-0.5">
                  {resolveText("milestone2026Tag", "NATIONAL HONOR")}
                </span>
                <h4 className="font-sangbleu-sunrise text-2xl sm:text-3xl lg:text-4xl text-accent font-normal leading-none my-0.5">
                  2026
                </h4>
                <p className="font-hanken text-[0.68rem] sm:text-xs text-text-muted font-medium max-w-[170px] sm:max-w-[210px] leading-tight">
                  {resolveText(
                    "milestone2026Title",
                    "Received Nationwide BFIOA Recognition",
                  )}
                </p>
              </div>

              {/* 2. TOP RIGHT NODE (2024–25) - Exhibition */}
              <div className="absolute top-[20%] right-0 sm:right-[2%] flex flex-col items-start text-left z-20">
                <span className="text-[0.56rem] sm:text-[0.6rem] font-hanken font-bold uppercase tracking-[0.2em] text-text-muted mb-0.5">
                  {resolveText("milestone2024Tag", "EXHIBITION • PAVILION")}
                </span>
                <h4 className="font-sangbleu-sunrise text-2xl sm:text-3xl lg:text-4xl text-text font-normal leading-none my-0.5">
                  2024–25
                </h4>
                <p className="font-hanken text-[0.68rem] sm:text-xs text-text-muted font-medium max-w-[160px] sm:max-w-[200px] leading-tight">
                  {resolveText(
                    "milestone2024Title",
                    "Exhibited at the International Furniture Fair",
                  )}
                </p>
              </div>

              {/* 3. BOTTOM RIGHT NODE (2025) - Trade Alliance */}
              <div className="absolute bottom-[16%] right-2 sm:right-[5%] flex flex-col items-start text-left z-20">
                <span className="text-[0.56rem] sm:text-[0.6rem] font-hanken font-bold uppercase tracking-[0.2em] text-text-muted mb-0.5">
                  {resolveText("milestone2025Tag", "TRADE ALLIANCE")}
                </span>
                <h4 className="font-sangbleu-sunrise text-2xl sm:text-3xl lg:text-4xl text-text font-normal leading-none my-0.5">
                  2025
                </h4>
                <p className="font-hanken text-[0.68rem] sm:text-xs text-text-muted font-medium max-w-[160px] sm:max-w-[200px] leading-tight">
                  {resolveText(
                    "milestone2025Title",
                    "Inducted into the Chamber of Commerce",
                  )}
                </p>
              </div>

              {/* 4. BOTTOM LEFT NODE (2020) - Inception */}
              <div className="absolute bottom-[16%] left-2 sm:left-[5%] flex flex-col items-end text-right z-20">
                <span className="text-[0.56rem] sm:text-[0.6rem] font-hanken font-bold uppercase tracking-[0.2em] text-text-muted mb-0.5">
                  {resolveText("milestone2020Tag", "INCEPTION • CHATTOGRAM")}
                </span>
                <h4 className="font-sangbleu-sunrise text-2xl sm:text-3xl lg:text-4xl text-text font-normal leading-none my-0.5">
                  2020
                </h4>
                <p className="font-hanken text-[0.68rem] sm:text-xs text-text-muted font-medium max-w-[160px] sm:max-w-[200px] leading-tight">
                  {resolveText(
                    "milestone2020Title",
                    "Founded by Abul Kalam Bhuiyan",
                  )}
                </p>
              </div>

              {/* 5. TOP LEFT NODE (2021) - Retail Expansion */}
              <div className="absolute top-[20%] left-0 sm:left-[2%] flex flex-col items-end text-right z-20">
                <span className="text-[0.56rem] sm:text-[0.6rem] font-hanken font-bold uppercase tracking-[0.2em] text-text-muted mb-0.5">
                  {resolveText("milestone2021Tag", "RETAIL EXPANSION")}
                </span>
                <h4 className="font-sangbleu-sunrise text-2xl sm:text-3xl lg:text-4xl text-text font-normal leading-none my-0.5">
                  2021
                </h4>
                <p className="font-hanken text-[0.68rem] sm:text-xs text-text-muted font-medium max-w-[160px] sm:max-w-[200px] leading-tight">
                  {resolveText(
                    "milestone2021Title",
                    "Opened the Flagship Agrabad Showroom",
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* STAGE 4: CLOSING INVITATION CTA (Refined Final Slide) */}
          <div
            ref={finalCtaRef}
            className="final-cta shrink-0 w-[84vw] sm:w-[55vw] lg:w-[34vw] max-w-lg self-center ml-16 sm:ml-28 lg:ml-36 pr-8 flex flex-col justify-center select-none opacity-20"
          >
            <span className="text-accent text-2xl font-light font-sangbleu-sunrise mb-4 block">
              ✧
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-sangbleu-sunrise font-normal text-text leading-[1.15] mb-6">
              {t("end_title")}
            </h3>

            <div className="w-12 h-[1px] bg-border mb-6" />

            <a
              href="#showroom"
              className="group inline-flex items-center gap-3 text-xs font-bold tracking-[0.22em] uppercase text-text hover:text-accent transition-colors duration-300 pb-1.5 border-b border-border hover:border-accent w-fit font-hanken"
            >
              <span>{t("end_cta")}</span>
              <ArrowRight className="w-4 h-4 text-accent transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>

            <p className="text-[0.68rem] text-text-muted font-medium mt-4 tracking-wider uppercase font-hanken">
              {t("end_sub")}
            </p>
          </div>
        </div>

        {/* SCROLL PROGRESS INDICATOR */}
        <div className="absolute bottom-10 right-12 hidden sm:flex items-center gap-3 text-[0.7rem] font-bold tracking-[0.22em] uppercase text-text-muted pointer-events-none z-30 font-hanken">
          <span>{resolveText("labelExplore", "EXPLORE")}</span>
          <div className="w-20 h-[1.5px] bg-border rounded overflow-hidden">
            <div
              ref={progressFillRef}
              className="h-full w-0 bg-accent rounded transition-[width] duration-75 ease-out"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalGallery;
