"use client";

import React, { useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { ArrowRight, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

interface HeroProps {
  onOpenConsultation?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const { lang, t } = useLanguage();

  const heroRef = useRef<HTMLElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);

  // Physics Animation Frame Refs for High-Performance Smooth Interpolation
  const current1X = useRef(0);
  const current1Y = useRef(0);
  const target1X = useRef(0);
  const target1Y = useRef(0);
  const vx1 = useRef(0);
  const vy1 = useRef(0);

  const current2X = useRef(0);
  const current2Y = useRef(0);
  const target2X = useRef(0);
  const target2Y = useRef(0);
  const vx2 = useRef(0);
  const vy2 = useRef(0);

  const current3X = useRef(0);
  const current3Y = useRef(0);
  const target3X = useRef(0);
  const target3Y = useRef(0);
  const vx3 = useRef(0);
  const vy3 = useRef(0);

  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Mouse distance from hero center normalized (-1 to 1)
      const normX = (e.clientX - centerX) / (rect.width / 2);
      const normY = (e.clientY - centerY) / (rect.height / 2);

      // Calibrated target offsets for layered multi-depth parallax
      target1X.current = normX * 18;
      target1Y.current = normY * 18;

      target2X.current = normX * -32;
      target2Y.current = normY * -32;

      target3X.current = normX * 42;
      target3Y.current = normY * 42;
    };

    const handleMouseLeave = () => {
      target1X.current = 0;
      target1Y.current = 0;
      target2X.current = 0;
      target2Y.current = 0;
      target3X.current = 0;
      target3Y.current = 0;
    };

    const animatePhysics = () => {
      // Image 1 Spring Physics (Slower lerp 0.035, heavy damping 0.88)
      const ax1 = (target1X.current - current1X.current) * 0.035;
      const ay1 = (target1Y.current - current1Y.current) * 0.035;
      vx1.current = (vx1.current + ax1) * 0.88;
      vy1.current = (vy1.current + ay1) * 0.88;
      current1X.current += vx1.current;
      current1Y.current += vy1.current;

      if (img1Ref.current) {
        img1Ref.current.style.transform = `translate3d(${current1X.current.toFixed(
          2
        )}px, ${current1Y.current.toFixed(2)}px, 0)`;
      }

      // Image 2 Spring Physics (Medium lerp 0.05, damping 0.85)
      const ax2 = (target2X.current - current2X.current) * 0.05;
      const ay2 = (target2Y.current - current2Y.current) * 0.05;
      vx2.current = (vx2.current + ax2) * 0.85;
      vy2.current = (vy2.current + ay2) * 0.85;
      current2X.current += vx2.current;
      current2Y.current += vy2.current;

      if (img2Ref.current) {
        img2Ref.current.style.transform = `translate3d(${current2X.current.toFixed(
          2
        )}px, ${current2Y.current.toFixed(2)}px, 0)`;
      }

      // Image 3 Spring Physics (Faster lerp 0.07, damping 0.82)
      const ax3 = (target3X.current - current3X.current) * 0.07;
      const ay3 = (target3Y.current - current3Y.current) * 0.07;
      vx3.current = (vx3.current + ax3) * 0.82;
      vy3.current = (vy3.current + ay3) * 0.82;
      current3X.current += vx3.current;
      current3Y.current += vy3.current;

      if (img3Ref.current) {
        img3Ref.current.style.transform = `translate3d(${current3X.current.toFixed(
          2
        )}px, ${current3Y.current.toFixed(2)}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animatePhysics);
    };

    heroEl.addEventListener("mousemove", handleMouseMove);
    heroEl.addEventListener("mouseleave", handleMouseLeave);
    rafId.current = requestAnimationFrame(animatePhysics);

    return () => {
      heroEl.removeEventListener("mousemove", handleMouseMove);
      heroEl.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="pt-28 xs:pt-32 sm:pt-40 md:pt-48 pb-16 sm:pb-24 max-w-[1600px] mx-auto px-4 xs:px-6 sm:px-12 relative overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-8 xl:gap-12 items-center">
        {/* Left Column: Architectural Luxury Editorial Typography */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="lg:col-span-5 flex flex-col justify-center"
        >
          {/* Fine 1px Hairline Brass Accent Eyebrow */}
          <div className="mb-4 sm:mb-6 flex items-center gap-3">
            <span className="h-px w-6 sm:w-8 bg-brass" />
            <span className="font-hanken text-[0.68rem] sm:text-xs text-brass uppercase tracking-[0.22em] sm:tracking-[0.25em] font-bold">
              {t("heroEyebrow")}
            </span>
          </div>

          {/* Upright Confident Architectural Display Headline (SangBleu 300 Light) */}
          <h1 className="font-sangbleu-sunrise font-light not-italic text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[5rem] xl:text-[5.5rem] text-charcoal/80 leading-[0.98] tracking-tight mb-6 sm:mb-8">
            {lang === "bn" ? (
              <span className="block">{t("heroTitle")}</span>
            ) : (
              <>
                <span className="block">{t("heroTitleLine1")}</span>
                <span className="block">{t("heroTitleLine2")}</span>
                <div>
                  <span className="block bg-linear-to-b from-brass to-brass/70 bg-clip-text text-transparent font-medium not-italic">
                    {t("heroTitleLine3")}
                  </span>
                  <span className="block bg-linear-to-b from-brass to-brass/70 bg-clip-text text-transparent font-medium not-italic">
                    {t("heroTitleLine4")}
                  </span>
                </div>
              </>
            )}
          </h1>

          {/* Crisp, Solid High-Contrast Supporting Subtext */}
          <p className="font-hanken text-sm xs:text-base sm:text-lg text-slate-warm font-normal leading-relaxed mb-8 sm:mb-10 max-w-md">
            {t("heroSubtext")}
          </p>

          {/* Architectural Action Row */}
          <div className="flex items-center">
            <motion.a
              whileHover={{ translateX: 10 }}
              whileTap={{ scale: 0.98 }}
              href="#collections"
              transition={{
                duration: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-hanken text-xs sm:text-sm uppercase tracking-[0.22em] font-bold text-charcoal hover:text-brass flex items-center gap-3 border-b-2 border-charcoal pb-1.5 hover:border-brass transition-all duration-300 group focus-visible:outline-2 focus-visible:outline-brass"
            >
              <span>{t("heroCtaSecondary")}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 text-brass" />
            </motion.a>
          </div>
        </motion.div>

        {/* Right Column: Asymmetric Image Composition (Independent Floating Layers) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="lg:col-span-7 relative h-[380px] xs:h-[460px] sm:h-[600px] md:h-[650px] lg:h-[720px] xl:h-[780px] w-full mt-4 lg:mt-0"
        >
          <div className="w-full h-full relative">
            {/* Top Dominant Landscape Image */}
            <div
              ref={img1Ref}
              className="absolute top-0 left-0 w-full h-[62%] editorial-img-container z-10 rounded-sm shadow-xl border border-wood-border will-change-transform"
            >
              <Image
                src="/images/sofa.jpg"
                alt={t("heroImgAlt1")}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover w-full h-full object-center pointer-events-none"
              />
            </div>

            {/* Bottom Left Portrait Image */}
            <div
              ref={img2Ref}
              className="absolute bottom-0 left-0 w-[48%] h-[40%] editorial-img-container z-20 rounded-sm shadow-2xl border-2 sm:border-4 border-ivory will-change-transform"
            >
              <Image
                src="/images/tabil.jpg"
                alt={t("heroImgAlt2")}
                fill
                sizes="(max-width: 1024px) 48vw, 34vw"
                className="object-cover w-full h-full object-[20%_50%] pointer-events-none"
              />
            </div>

            {/* Bottom Right Detail Image */}
            <div
              ref={img3Ref}
              className="absolute bottom-[6%] right-0 w-[48%] h-[46%] editorial-img-container z-30 border-4 sm:border-8 border-ivory shadow-2xl rounded-sm will-change-transform"
            >
              <Image
                src="/images/chair.jpg"
                alt={t("heroImgAlt3")}
                fill
                sizes="(max-width: 1024px) 48vw, 34vw"
                className="object-cover w-full h-full object-[80%_80%] pointer-events-none"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="flex justify-center mt-12 sm:mt-20 lg:mt-24">
        <a
          href="#about"
          className="flex items-center gap-3 text-slate-muted hover:text-brass transition-colors focus-visible:outline-2 focus-visible:outline-brass"
        >
          <ArrowDown className="w-4 h-4 animate-bounce text-brass" />
          <span className="font-hanken text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.25em] font-medium">
            {t("scrollDiscover")}
          </span>
        </a>
      </div>
    </section>
  );
};
