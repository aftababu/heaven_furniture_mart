"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Quote } from "lucide-react";

interface GalleryCardItem {
  id: string;
  img: string;
  alt: string;
  capKey: string;
  aspect: string;
  widthClass: string;
  ySpeed: number;
  yOffset: number;
}

const cards: GalleryCardItem[] = [
  {
    id: "card-1",
    img: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=2000",
    alt: "Custom Living Room Sofa",
    capKey: "cap_1",
    aspect: "aspect-[16/11]",
    widthClass: "w-[68vw] sm:w-[42vw] lg:w-[30vw]",
    ySpeed: -40,
    yOffset: -20,
  },
  {
    id: "card-2",
    img: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=2000",
    alt: "Craft Solid Hardwood Detail",
    capKey: "cap_2",
    aspect: "aspect-[4/5]",
    widthClass: "w-[55vw] sm:w-[32vw] lg:w-[22vw]",
    ySpeed: 55,
    yOffset: 35,
  },
  {
    id: "card-3",
    img: "https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg?auto=compress&cs=tinysrgb&w=2000",
    alt: "Bespoke Bedroom Suite",
    capKey: "cap_3",
    aspect: "aspect-[4/3]",
    widthClass: "w-[65vw] sm:w-[38vw] lg:w-[26vw]",
    ySpeed: -25,
    yOffset: 0,
  },
  {
    id: "card-4",
    img: "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=2000",
    alt: "Bespoke Timber Dining",
    capKey: "cap_4",
    aspect: "aspect-[16/10]",
    widthClass: "w-[70vw] sm:w-[44vw] lg:w-[32vw]",
    ySpeed: -60,
    yOffset: -30,
  },
  {
    id: "card-5",
    img: "https://images.pexels.com/photos/116910/pexels-photo-116910.jpeg?auto=compress&cs=tinysrgb&w=2000",
    alt: "Atelier Hand-Planed Joinery",
    capKey: "cap_5",
    aspect: "aspect-[3/4]",
    widthClass: "w-[50vw] sm:w-[30vw] lg:w-[20vw]",
    ySpeed: 70,
    yOffset: 40,
  },
  {
    id: "card-6",
    img: "https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting-room.jpg?auto=compress&cs=tinysrgb&w=2000",
    alt: "Executive Bespoke Interior",
    capKey: "cap_6",
    aspect: "aspect-[16/11]",
    widthClass: "w-[68vw] sm:w-[40vw] lg:w-[28vw]",
    ySpeed: -35,
    yOffset: -15,
  },
  {
    id: "card-7",
    img: "https://images.pexels.com/photos/157811/pexels-photo-157811.jpeg?auto=compress&cs=tinysrgb&w=2000",
    alt: "Agrabad Access Road Showroom",
    capKey: "cap_7",
    aspect: "aspect-[1/1]",
    widthClass: "w-[55vw] sm:w-[32vw] lg:w-[22vw]",
    ySpeed: 45,
    yOffset: 25,
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

      // 5. Parallax Cards: Vertical Float & Clip-Path Reveal
      const viewportWidth = window.innerWidth;
      const enterEdge = viewportWidth * 0.98;
      const fullRevealEdge = viewportWidth * 0.65;

      cards.forEach((item, idx) => {
        const itemEl = cardRefs.current[idx];
        if (!itemEl) return;

        // Vertical floating offset
        const currentY = item.yOffset + progress * item.ySpeed;
        itemEl.style.transform = `translate3d(0, ${currentY.toFixed(2)}px, 0)`;

        // Cinematic Image Reveal Animation
        const card = itemEl.querySelector(".image-card") as HTMLElement;
        const img = itemEl.querySelector(".card-image-inner") as HTMLElement;
        const caption = itemEl.querySelector(".image-caption") as HTMLElement;

        if (card && img) {
          const cardRect = card.getBoundingClientRect();
          let revealRatio = 0;
          if (cardRect.left <= fullRevealEdge) {
            revealRatio = 1;
          } else if (cardRect.left < enterEdge) {
            revealRatio = (enterEdge - cardRect.left) / (enterEdge - fullRevealEdge);
          }
          revealRatio = Math.max(0, Math.min(1, revealRatio));

          // 1. Curtain clip-path wipe
          const clipInset = (1 - revealRatio) * 12;
          card.style.clipPath = `inset(${clipInset.toFixed(2)}% 0% ${clipInset.toFixed(2)}% 0% round 1rem)`;

          // 2. Opacity unveil
          card.style.opacity = (0.2 + revealRatio * 0.8).toFixed(3);

          // 3. Focal Lens Scale
          const innerScale = 1.12 - revealRatio * 0.12;
          img.style.transform = `scale(${innerScale.toFixed(3)})`;
          img.style.filter = `brightness(${(0.9 + revealRatio * 0.1).toFixed(2)})`;

          // 4. Staggered Caption Reveal
          if (caption) {
            const captionRatio = Math.max(0, (revealRatio - 0.35) / 0.65);
            caption.style.opacity = captionRatio.toFixed(3);
            caption.style.transform = `translate3d(0, ${((1 - captionRatio) * 10).toFixed(2)}px, 0)`;
          }
        }
      });

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
    <section ref={sectionRef} id="social-proof" className="relative h-[420vh] w-full bg-[#F4F1EA]">
      {/* STICKY VIEWPORT (locked full-screen) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        {/* HORIZONTAL MOVING TRACK */}
        <div
          ref={trackRef}
          className="flex flex-nowrap items-center h-full will-change-transform pl-6 sm:pl-12 lg:pl-20 pr-24 lg:pr-40"
        >
          {/* STAGE 1: MANAGING DIRECTOR'S QUOTE & TRUST (0–30%) */}
          <div
            ref={quoteRef}
            className="quote-block shrink-0 w-[88vw] sm:w-[70vw] lg:w-[46vw] max-w-3xl pr-8 sm:pr-16 flex flex-col justify-center select-none"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-[#C9A227] font-hanken">
                {t("eyebrow")}
              </span>
              <span className="flex-1 h-px bg-[#C9A227]/20" />
            </div>

            {/* Main Serif Quote (SangBleu Sunrise 300 Light) */}
            <blockquote className="text-2xl sm:text-3xl lg:text-[2.6rem] font-sangbleu-sunrise font-light text-[#4A3B31] leading-[1.2] tracking-tight">
              <span>{t("quote_p1")}</span>
              <span className="block mt-2 text-[#4A3B31]/80">{t("quote_p2")}</span>
              <span className="block mt-3 text-[#4A3B31]/70 font-light text-[0.8em]">
                {t("quote_p3")}
              </span>
            </blockquote>

            <div className="w-[60px] h-[2px] bg-[#C9A227] opacity-40 my-[1.2rem] my-b-[1.8rem]" />

            {/* Author Signature */}
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.2em] font-bold text-[#4A3B31] font-hanken">
                {t("quote_author")}
              </p>
              <p className="text-[0.6rem] uppercase tracking-[0.18em] text-[#4A3B31]/60 mt-0.5 font-hanken">
                {t("quote_role")}
              </p>
            </div>

            {/* Trust Badge */}
            <div className="mt-8 pt-6 border-t border-[#4A3B31]/10">
              <span className="text-[0.6rem] uppercase tracking-[0.2em] font-bold text-[#4A3B31] block font-hanken">
                {t("trust_title")}
              </span>
              <p className="text-[0.65rem] text-[#4A3B31]/70 font-light mt-1 font-hanken">
                {t("trust_desc")}
              </p>
            </div>
          </div>

          {/* STAGE 2: ASYMMETRIC FLOATING GALLERY WITH REVEAL ANIMATIONS */}
          {cards.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="shrink-0 ml-6 sm:ml-12 lg:ml-16 parallax-item"
            >
              <div
                className={`image-card ${item.widthClass} ${item.aspect} relative rounded-2xl overflow-hidden bg-[#EBE5DA] shadow-sm`}
              >
                <img
                  src={item.img}
                  alt={item.alt}
                  className="card-image-inner w-full h-full object-cover block pointer-events-none transition-transform duration-800"
                  loading="lazy"
                />
              </div>
              <p className="image-caption text-[0.6rem] tracking-[0.2em] uppercase text-[#4A3B31]/70 font-semibold pt-[0.85rem] border-t border-[#C9A227]/15 block transition-all font-hanken">
                {t(item.capKey)}
              </p>
            </div>
          ))}

          {/* STAGE 3: CLOSING INVITATION (85–100%) */}
          <div
            ref={finalCtaRef}
            className="final-cta-block shrink-0 w-[80vw] sm:w-[50vw] lg:w-[34vw] ml-12 sm:ml-20 pr-8 flex flex-col justify-center"
          >
            <span className="text-[#C9A227]/60 text-3xl font-light font-sangbleu-sunrise mb-6 block">
              ✦
            </span>

            <h3 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-sangbleu-sunrise font-light text-[#4A3B31] leading-[1.15] mb-6">
              Made for homes that <span className="text-[#C9A227]/70">feel like yours.</span>
            </h3>

            <div className="w-12 h-px bg-[#C9A227]/40 mb-6" />

            <a
              href="#showroom"
              className="group inline-flex items-center gap-3 text-[0.7rem] font-bold tracking-[0.2em] uppercase text-[#4A3B31] hover:text-[#C9A227] transition-colors duration-300 pb-1.5 border-b-2 border-[#4A3B31]/10 hover:border-[#C9A227] w-fit font-hanken"
            >
              <span>{t("end_cta")}</span>
              <ArrowRight className="w-4 h-4 text-[#C9A227] transform group-hover:translate-x-2 transition-transform duration-300" />
            </a>

            <p className="text-[0.6rem] text-[#4A3B31]/60 font-light mt-4 font-hanken">
              {t("end_sub")}
            </p>
          </div>
        </div>

        {/* SCROLL PROGRESS INDICATOR (Bottom Right) */}
        <div className="absolute bottom-10 right-12 hidden sm:flex items-center gap-3 text-[0.55rem] font-bold tracking-[0.22em] uppercase text-[#4A3B31]/70 pointer-events-none z-30 font-hanken">
          <span>Explore</span>
          <div className="w-20 h-[1.5px] bg-[#E3DCCF] rounded overflow-hidden">
            <div ref={progressFillRef} className="h-full w-0 bg-[#C9A227] rounded" />
          </div>
        </div>
      </div>
    </section>
  );
};
