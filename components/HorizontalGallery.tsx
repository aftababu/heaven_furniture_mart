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
    img: "/images/card1.jpg",
    alt: "Custom Living Room Sofa",
    capKey: "cap_1",
    aspect: "aspect-[16/11]",
    widthClass: "w-[68vw] sm:w-[42vw] lg:w-[30vw]",
    alignClass: "self-start mt-6 sm:mt-10",
    marginClass: "ml-12 sm:ml-16 lg:ml-20",
  },
  {
    id: "card-2",
    img: "/images/card2.jpg",
    alt: "Craft Solid Hardwood Detail",
    capKey: "cap_2",
    aspect: "aspect-[4/5]",
    widthClass: "w-[55vw] sm:w-[32vw] lg:w-[22vw]",
    alignClass: "self-end mb-8 sm:mb-14",
    marginClass: "ml-16 sm:ml-24 lg:ml-28",
  },

  {
    id: "card-4",
    img: "/images/card4.jpg",
    alt: "Bespoke Timber Dining",
    capKey: "cap_4",
    aspect: "aspect-[16/10]",
    widthClass: "w-[70vw] sm:w-[44vw] lg:w-[32vw]",
    alignClass: "self-start mt-4 sm:mt-8",
    marginClass: "ml-14 sm:ml-24 lg:ml-32",
  },
  {
    id: "card-5",
    img: "/images/card5.png",
    alt: "Atelier Hand-Planed Joinery",
    capKey: "cap_5",
    aspect: "aspect-[3/4]",
    widthClass: "w-[50vw] sm:w-[30vw] lg:w-[20vw]",
    alignClass: "self-end mb-6 sm:mb-12",
    marginClass: "ml-12 sm:ml-16 lg:ml-20",
  },
  {
    id: "card-6",
    img: "/images/card6.jpg",
    alt: "Executive Bespoke Interior",
    capKey: "cap_6",
    aspect: "aspect-[16/11]",
    widthClass: "w-[68vw] sm:w-[40vw] lg:w-[28vw]",
    alignClass: "self-start mt-20 sm:mt-32",
    marginClass: "ml-16 sm:ml-28 lg:ml-32",
  },
  {
    id: "card-7",
    img: "/images/sofa.jpg",
    alt: "Agrabad Access Road Showroom",
    capKey: "cap_7",
    aspect: "aspect-[1/1]",
    widthClass: "w-[55vw] sm:w-[32vw] lg:w-[22vw]",
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
  const { t } = useLanguage();
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
      maxScrollX = Math.max(trackWidth - viewportWidth, 0);
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
      className="relative h-[480vh] w-full bg-primary-bg"
    >
      {/* STICKY VIEWPORT */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        {/* HORIZONTAL MOVING TRACK */}
        <div
          ref={trackRef}
          className="flex flex-nowrap items-stretch h-full will-change-transform pl-6 sm:pl-12 lg:pl-20 pr-24 lg:pr-40 py-16 sm:py-24 bg-secondary-bg"
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
                className={`image-card ${item.widthClass} ${item.aspect} relative rounded-xl overflow-hidden bg-primary-bg shadow-sm border border-border transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[300ms] [clip-path:inset(0_0_0_100%_round_0.85rem)] opacity-0 group-[.is-revealed]:[clip-path:inset(0_0_0_0%_round_0.85rem)] group-[.is-revealed]:opacity-100`}
              >
                <Image
                  src={item.img}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 55vw, (max-width: 1024px) 44vw, 32vw"
                  className="card-image-inner w-full h-full object-cover block pointer-events-none transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              </div>

              {/* Caption Reveal */}
              <p className="image-caption text-[0.68rem] font-semibold tracking-[0.22em] text-text-muted font-hanken uppercase pt-2.5 border-t border-border block transition-opacity duration-1000 delay-[600ms] mt-2 select-none opacity-0 group-[.is-revealed]:opacity-100">
                {t(item.capKey)}
              </p>
            </div>
          ))}

          {/* STAGE 3: CHRONOLOGY MILESTONES (Integrated Horizontal Ledger) */}
          <div className="shrink-0 w-[90vw] sm:w-[76vw] lg:w-[48vw] max-w-2xl self-center ml-16 sm:ml-28 lg:ml-36 flex flex-col justify-center select-none py-6">
            <div className="mb-8">
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-accent font-hanken block mb-2">
                {resolveText("chronologyEyebrow", "CHRONOLOGY")}
              </span>
              <h3 className="font-sangbleu-sunrise text-3xl sm:text-4xl text-text font-normal tracking-tight">
                {resolveText("chronologyTitle", "Milestones of Craft")}
              </h3>
              <div className="w-12 h-[2px] bg-accent/40 mt-3" />
            </div>

            {/* Ledger List */}
            <div className="divide-y divide-border border-t border-b border-border">
              {MILESTONES.map((item) => (
                <div
                  key={item.year}
                  className="group py-4 sm:py-5 px-3 -mx-3 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline transition-colors hover:bg-primary-bg/50 rounded-lg"
                >
                  <span
                    className={`sm:col-span-3 font-sangbleu-sunrise text-2xl sm:text-3xl tracking-tight transition-colors ${
                      item.isHighlighted
                        ? "text-accent font-normal"
                        : "text-text font-light group-hover:text-accent"
                    }`}
                  >
                    {item.year}
                  </span>
                  <div className="sm:col-span-9 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <p className="text-sm sm:text-base text-text font-medium font-hanken">
                      {resolveText(item.titleKey, item.defaultTitle)}
                    </p>
                    <span
                      className={`text-[0.65rem] uppercase tracking-[0.2em] shrink-0 font-hanken ${
                        item.isHighlighted
                          ? "text-accent font-bold"
                          : "text-text-muted"
                      }`}
                    >
                      {resolveText(item.tagKey, item.defaultTag)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[0.62rem] uppercase tracking-[0.22em] text-text-muted font-hanken mt-6 text-center">
              {resolveText(
                "chronologyFooter",
                "— A Legacy of Custom Joinery —",
              )}
            </p>
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
