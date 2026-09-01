"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";

interface HeroProps {
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);

  // Refs for individual floating editorial image layers
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);

  // Physics state for Image 1 (Top Landscape — Heavy, Slower floating response)
  const target1X = useRef(0);
  const target1Y = useRef(0);
  const current1X = useRef(0);
  const current1Y = useRef(0);
  const vx1 = useRef(0);
  const vy1 = useRef(0);

  // Physics state for Image 2 (Bottom Left Portrait — Medium floating response, wider amplitude)
  const target2X = useRef(0);
  const target2Y = useRef(0);
  const current2X = useRef(0);
  const current2Y = useRef(0);
  const vx2 = useRef(0);
  const vy2 = useRef(0);

  // Physics state for Image 3 (Bottom Right Detail — Faster, floating response)
  const target3X = useRef(0);
  const target3Y = useRef(0);
  const current3X = useRef(0);
  const current3Y = useRef(0);
  const vx3 = useRef(0);
  const vy3 = useRef(0);

  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced motion & touch devices
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isTouch) return;

    const heroEl = heroRef.current;
    if (!heroEl) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const relX = Math.max(-1, Math.min(1, (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)));
      const relY = Math.max(-1, Math.min(1, (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)));

      // Image 1: Organic diagonal path (Max ±12px X, ±8px Y)
      target1X.current = Math.max(-12, Math.min(12, relX * -12 + relY * 4));
      target1Y.current = Math.max(-8, Math.min(8, relY * -8 - relX * 3));

      // Image 2: Cross diagonal path (Max ±18px X, ±12px Y)
      target2X.current = Math.max(-18, Math.min(18, relX * -18 - relY * 6));
      target2Y.current = Math.max(-12, Math.min(12, relY * 12 + relX * 5));

      // Image 3: Counter diagonal path (Max ±10px X, ±14px Y)
      target3X.current = Math.max(-10, Math.min(10, relX * 10 - relY * 5));
      target3Y.current = Math.max(-14, Math.min(14, relY * -14 + relX * 4));
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
      className="pt-32 sm:pt-40 md:pt-48 pb-20 max-w-[1600px] mx-auto px-6 sm:px-12 relative overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Typography & CTAs (Maintained Completely Stable) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="lg:col-span-5 flex flex-col justify-center"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[#C9A227]" />
            <span className="font-hanken text-xs text-[#C9A227] uppercase tracking-[0.25em] font-bold">
              {t("heroEyebrow")}
            </span>
          </div>

          <h1 className="font-cormorant text-6xl sm:text-7xl md:text-8xl lg:text-[96px] text-[#4A3B31] leading-[1.05] tracking-tight italic mb-8">
            {t("heroTitleLine1")}
            <br />
            {t("heroTitleLine2")}
            <br />
            <span className="text-[#C9A227] not-italic block">{t("heroTitleLine3")}</span>
          </h1>

          <p className="font-hanken text-base sm:text-lg text-[#4A3B31]/80 mb-10 max-w-md font-medium leading-relaxed">
            {t("heroSubtext")}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenConsultation}
              className="bg-[#34494A] text-[#F4F1EA] px-8 py-4 font-hanken text-xs uppercase tracking-[0.15em] font-semibold hover:bg-[#C9A227] hover:text-[#34494A] transition-all duration-300 flex items-center gap-3 shadow-md group focus-visible:outline-2 focus-visible:outline-[#C9A227]"
            >
              <span>{t("heroCtaPrimary")}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              href="#collections"
              className="font-hanken text-xs uppercase tracking-[0.15em] font-semibold text-[#4A3B31] hover:text-[#C9A227] flex items-center gap-2 border-b border-[#4A3B31] pb-1 hover:border-[#C9A227] transition-all duration-300 group focus-visible:outline-2 focus-visible:outline-[#C9A227]"
            >
              <span>{t("heroCtaSecondary")}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </motion.a>
          </div>
        </motion.div>

        {/* Right Column: Asymmetric Image Composition (Independent Floating Layers) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="lg:col-span-7 relative h-[500px] sm:h-[650px] lg:h-[750px] w-full mt-8 lg:mt-0"
        >
          <div className="w-full h-full relative">
            {/* Top Dominant Landscape Image */}
            <div
              ref={img1Ref}
              className="absolute top-0 left-0 w-full h-[62%] editorial-img-container z-10 rounded-sm shadow-xl border border-[#C9A882]/30 will-change-transform"
            >
              <img
                src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=2000"
                alt="Luxury bespoke sofa in a minimal, sun-lit interior"
                className="object-cover w-full h-full object-center pointer-events-none"
              />
            </div>

            {/* Bottom Left Portrait Image */}
            <div
              ref={img2Ref}
              className="absolute bottom-0 left-0 w-[48%] h-[40%] editorial-img-container z-20 rounded-sm shadow-2xl border-4 border-[#F4F1EA] will-change-transform"
            >
              <img
                src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=2000"
                alt="Modern luxury dining room with custom wood table"
                className="object-cover w-full h-full object-[20%_50%] pointer-events-none"
              />
            </div>

            {/* Bottom Right Detail Image */}
            <div
              ref={img3Ref}
              className="absolute bottom-[6%] right-0 w-[48%] h-[46%] editorial-img-container z-30 border-8 border-[#F4F1EA] shadow-2xl rounded-sm will-change-transform"
            >
              <img
                src="https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=2000"
                alt="Close-up detail of handcrafted wood joinery"
                className="object-cover w-full h-full object-[80%_80%] pointer-events-none"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="flex justify-center mt-16 sm:mt-24">
        <a
          href="#about"
          className="flex items-center gap-3 text-[#4A3B31]/60 hover:text-[#C9A227] transition-colors focus-visible:outline-2 focus-visible:outline-[#C9A227]"
        >
          <ArrowDown className="w-4 h-4 animate-bounce text-[#C9A227]" />
          <span className="font-hanken text-[10px] uppercase tracking-[0.25em] font-semibold">
            {t("scrollDiscover")}
          </span>
        </a>
      </div>
    </section>
  );
};
