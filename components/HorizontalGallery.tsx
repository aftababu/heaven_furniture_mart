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

const cards: GalleryCardItem[] = [
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
    id: "card-3",
    img: "/images/card3.png",
    alt: "Bespoke Bedroom Suite",
    capKey: "cap_3",
    aspect: "aspect-[4/3]",
    widthClass: "w-[65vw] sm:w-[38vw] lg:w-[26vw]",
    alignClass: "self-center",
    marginClass: "ml-12 sm:ml-20 lg:ml-24",
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

export const HorizontalGallery: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const finalCtaRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 1. Viewport IntersectionObserver for Entrance Reveals with 0.5s Delay
  useEffect(() => {
    const observerOptions = {
      root: null, // Viewport
      rootMargin: "0px -5% 0px 0px", // Triggers as right edge enters viewport
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

      // Normalized progress 0.0 to 1.0
      let progress = -rect.top / sectionHeight;
      progress = Math.max(0, Math.min(1, progress));

      // 1. Horizontal track translation
      const currentX = progress * maxScrollX;
      track.style.transform = `translate3d(-${currentX.toFixed(2)}px, 0, 0)`;

      // 2. Progress fill bar
      if (progressFill) {
        progressFill.style.width = `${(progress * 100).toFixed(1)}%`;
      }

      // 3. Calibrated Quote Fade (Solid 0-15%, exit fade 15-30%)
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
        finalCta.style.transform = `translate3d(0, ${((1 - finalOpacity) * 25).toFixed(2)}px, 0)`;
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

  return (
    <section
      ref={sectionRef}
      id="social-proof"
      className="relative h-[420vh] w-full bg-ivory"
    >
      {/* STICKY VIEWPORT (locked full-screen) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        {/* HORIZONTAL MOVING TRACK WITH ASYMMETRIC VERTICAL SCATTER */}
        <div
          ref={trackRef}
          className="flex flex-nowrap items-stretch h-full will-change-transform pl-6 sm:pl-12 lg:pl-20 pr-24 lg:pr-40 py-16 sm:py-24 bg-sand"
        >
          {/* STAGE 1: MANAGING DIRECTOR'S QUOTE & TRUST (0–30%) */}
          <div
            ref={quoteRef}
            className="quote-block shrink-0 w-[88vw] sm:w-[70vw] lg:w-[46vw] max-w-3xl pr-8 sm:pr-16 flex flex-col justify-center self-center select-none"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-brass font-hanken">
                {t("eyebrow")}
              </span>
              <span className="flex-1 h-px bg-wood-border" />
            </div>

            {/* Main Serif Quote (SangBleu 300 Light) */}
            <blockquote className="text-2xl sm:text-3xl lg:text-[2.6rem] font-sangbleu-sunrise font-light not-italic text-charcoal/70 leading-[1.12] tracking-tight">
              <span>{t("quote_p1")}</span>
              <span className="block mt-2 text-charcoal/70">
                {t("quote_p2")}
              </span>
            </blockquote>

            <div className="w-[60px] h-[2px] bg-brass my-[1.2rem]" />

            {/* Author Signature */}
            <div>
              <p className="text-[0.75rem] uppercase tracking-[0.2em] font-bold text-charcoal font-hanken">
                {t("quote_author")}
              </p>
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-gray font-medium mt-1 font-hanken">
                {t("quote_role")}
              </p>
            </div>

            {/* Trust Badge */}
            <div className="mt-8 pt-6 border-t border-wood-border">
              <span className="text-[0.7rem] uppercase tracking-[0.2em] font-bold text-charcoal block font-hanken">
                {t("trust_title")}
              </span>
              <p className="text-[0.75rem] text-charcoal-body font-normal leading-relaxed mt-1 font-hanken">
                {t("trust_desc")}
              </p>
            </div>
          </div>

          {/* STAGE 2: ASYMMETRIC VERTICAL FLOATING SCATTER GALLERY WITH UNWARPED CLIP-PATH REVEAL FROM RIGHT SIDE (0.5s DELAY) */}
          {cards.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className={`scatter-card shrink-0 ${item.marginClass} ${item.alignClass} flex flex-col group`}
            >
              {/* Outer Image Mask Container (Unrolls from Right Side after 0.5s delay) */}
              <div
                className={`image-card ${item.widthClass} ${item.aspect} relative rounded-xl overflow-hidden bg-sand shadow-sm border border-wood-border transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[500ms] [clip-path:inset(0_0_0_100%_round_0.85rem)] opacity-0 group-[.is-revealed]:[clip-path:inset(0_0_0_0%_round_0.85rem)] group-[.is-revealed]:opacity-100`}
              >
                <Image
                  src={item.img}
                  alt={item.alt}
                  fill
                  className="card-image-inner w-full h-full object-cover block pointer-events-none transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              </div>

              {/* Caption Reveal */}
              <p className="image-caption text-[0.68rem] font-semibold tracking-[0.22em] text-slate-gray font-hanken uppercase pt-2.5 border-t border-wood-border block transition-opacity duration-1000 delay-[800ms] mt-2 select-none opacity-0 group-[.is-revealed]:opacity-100">
                {t(item.capKey)}
              </p>
            </div>
          ))}

          {/* STAGE 3: CLOSING INVITATION (85–100%) */}
          <div
            ref={finalCtaRef}
            className="final-cta-block shrink-0 w-[80vw] sm:w-[50vw] lg:w-[34vw] ml-16 sm:ml-24 pr-8 flex flex-col justify-center self-center"
          >
            <span className="text-brass text-3xl font-light font-sangbleu-sunrise mb-6 block">
              ✦
            </span>

            <h3 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-sangbleu-sunrise font-light not-italic text-charcoal/70 leading-[1.12] mb-6">
              Made for homes that{" "}
              <span className="text-brass">feel like yours.</span>
            </h3>

            <div className="w-12 h-px bg-brass mb-6" />

            <a
              href="#showroom"
              className="group inline-flex items-center gap-3 text-[0.75rem] font-bold tracking-[0.2em] uppercase text-charcoal hover:text-brass transition-colors duration-300 pb-1.5 border-b-2 border-charcoal hover:border-brass w-fit font-hanken"
            >
              <span>{t("end_cta")}</span>
              <ArrowRight className="w-4 h-4 text-brass transform group-hover:translate-x-2 transition-transform duration-300" />
            </a>

            <p className="text-[0.7rem] text-slate-muted font-medium mt-4 font-hanken">
              {t("end_sub")}
            </p>
          </div>
        </div>

        {/* SCROLL PROGRESS INDICATOR (Bottom Right) */}
        <div className="absolute bottom-10 right-12 hidden sm:flex items-center gap-3 text-[0.7rem] font-bold tracking-[0.22em] uppercase text-slate-muted pointer-events-none z-30 font-hanken">
          <span>Explore</span>
          <div className="w-20 h-[1.5px] bg-wood-border rounded overflow-hidden">
            <div
              ref={progressFillRef}
              className="h-full w-0 bg-brass rounded"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
