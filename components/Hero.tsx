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

  // Refs for each image element to apply independent 3D parallax
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);

  // Targets and current interpolated offsets for Image 1 (Top Landscape)
  const target1X = useRef(0);
  const target1Y = useRef(0);
  const current1X = useRef(0);
  const current1Y = useRef(0);

  // Targets and current interpolated offsets for Image 2 (Bottom Left Portrait)
  const target2X = useRef(0);
  const target2Y = useRef(0);
  const current2X = useRef(0);
  const current2Y = useRef(0);

  // Targets and current interpolated offsets for Image 3 (Bottom Right Detail)
  const target3X = useRef(0);
  const target3Y = useRef(0);
  const current3X = useRef(0);
  const current3Y = useRef(0);

  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Disable effect on touch/mobile devices
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const heroEl = heroRef.current;
    if (!heroEl) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const relativeX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const relativeY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      // Image 1 (Top Landscape): X -10px..+10px, Y -5px..+5px
      target1X.current = Math.max(-10, Math.min(10, relativeX * -10));
      target1Y.current = Math.max(-5, Math.min(5, relativeY * -5));

      // Image 2 (Bottom Left Portrait): X -18px..+18px, Y +8px..-8px (Inverse direction, higher magnitude)
      target2X.current = Math.max(-18, Math.min(18, relativeX * -18));
      target2Y.current = Math.max(-8, Math.min(8, relativeY * 8));

      // Image 3 (Bottom Right Detail): X +12px..-12px, Y -10px..+10px (Opposite horizontal direction)
      target3X.current = Math.max(-12, Math.min(12, relativeX * 12));
      target3Y.current = Math.max(-10, Math.min(10, relativeY * -10));
    };

    const handleMouseLeave = () => {
      target1X.current = 0;
      target1Y.current = 0;
      target2X.current = 0;
      target2Y.current = 0;
      target3X.current = 0;
      target3Y.current = 0;
    };

    const animate = () => {
      // Smooth interpolation/easing for Image 1
      current1X.current += (target1X.current - current1X.current) * 0.07;
      current1Y.current += (target1Y.current - current1Y.current) * 0.07;
      if (img1Ref.current) {
        img1Ref.current.style.transform = `translate3d(${current1X.current.toFixed(
          2
        )}px, ${current1Y.current.toFixed(2)}px, 0)`;
      }

      // Smooth interpolation/easing for Image 2
      current2X.current += (target2X.current - current2X.current) * 0.07;
      current2Y.current += (target2Y.current - current2Y.current) * 0.07;
      if (img2Ref.current) {
        img2Ref.current.style.transform = `translate3d(${current2X.current.toFixed(
          2
        )}px, ${current2Y.current.toFixed(2)}px, 0)`;
      }

      // Smooth interpolation/easing for Image 3
      current3X.current += (target3X.current - current3X.current) * 0.07;
      current3Y.current += (target3Y.current - current3Y.current) * 0.07;
      if (img3Ref.current) {
        img3Ref.current.style.transform = `translate3d(${current3X.current.toFixed(
          2
        )}px, ${current3Y.current.toFixed(2)}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    heroEl.addEventListener("mousemove", handleMouseMove);
    heroEl.addEventListener("mouseleave", handleMouseLeave);
    rafId.current = requestAnimationFrame(animate);

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
            <span className="h-px w-8 bg-[#A88849]" />
            <span className="font-hanken text-xs text-[#A88849] uppercase tracking-[0.25em] font-bold">
              {t("heroEyebrow")}
            </span>
          </div>

          <h1 className="font-cormorant text-6xl sm:text-7xl md:text-8xl lg:text-[96px] text-[#382C24] leading-[1.05] tracking-tight italic mb-8">
            {t("heroTitleLine1")}
            <br />
            {t("heroTitleLine2")}
            <br />
            <span className="text-[#A88849] not-italic block">{t("heroTitleLine3")}</span>
          </h1>

          <p className="font-hanken text-base sm:text-lg text-[#382C24]/80 mb-10 max-w-md font-medium leading-relaxed">
            {t("heroSubtext")}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <button
              onClick={onOpenConsultation}
              className="bg-[#382C24] text-[#F2EFE9] px-8 py-4 font-hanken text-xs uppercase tracking-[0.15em] font-semibold hover:bg-[#C5A059] hover:text-[#382C24] transition-all flex items-center gap-3 shadow-md group"
            >
              <span>{t("heroCtaPrimary")}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="#collections"
              className="font-hanken text-xs uppercase tracking-[0.15em] font-semibold text-[#382C24] hover:text-[#A88849] flex items-center gap-2 border-b border-[#382C24] pb-1 hover:border-[#A88849] transition-all"
            >
              <span>{t("heroCtaSecondary")}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Right Column: Asymmetric Image Composition (Independent Parallax Layers) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="lg:col-span-7 relative h-[500px] sm:h-[650px] lg:h-[750px] w-full mt-8 lg:mt-0"
        >
          <div className="w-full h-full relative">
            {/* Top Dominant Landscape Image (Image 1: Independent Parallax) */}
            <div
              ref={img1Ref}
              className="absolute top-0 left-0 w-full h-[62%] editorial-img-container z-10 rounded-sm shadow-xl border border-[#382C24]/10 will-change-transform"
            >
              <img
                src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=2000"
                alt="Luxury bespoke sofa in a minimal, sun-lit interior"
                className="object-cover w-full h-full object-center"
              />
            </div>

            {/* Bottom Left Portrait Image (Image 2: Independent Parallax) */}
            <div
              ref={img2Ref}
              className="absolute bottom-0 left-0 w-[48%] h-[40%] editorial-img-container z-20 rounded-sm shadow-2xl border-4 border-[#F2EFE9] will-change-transform"
            >
              <img
                src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=2000"
                alt="Modern luxury dining room with custom wood table"
                className="object-cover w-full h-full object-[20%_50%]"
              />
            </div>

            {/* Bottom Right Detail Image (Image 3: Independent Parallax) */}
            <div
              ref={img3Ref}
              className="absolute bottom-[6%] right-0 w-[48%] h-[46%] editorial-img-container z-30 border-8 border-[#F2EFE9] shadow-2xl rounded-sm will-change-transform"
            >
              <img
                src="https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=2000"
                alt="Close-up detail of handcrafted wood joinery"
                className="object-cover w-full h-full object-[80%_80%]"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="flex justify-center mt-16 sm:mt-24">
        <a
          href="#about"
          className="flex items-center gap-3 text-[#382C24]/60 hover:text-[#A88849] transition-colors"
        >
          <ArrowDown className="w-4 h-4 animate-bounce text-[#A88849]" />
          <span className="font-hanken text-[10px] uppercase tracking-[0.25em] font-semibold">
            {t("scrollDiscover")}
          </span>
        </a>
      </div>
    </section>
  );
};
