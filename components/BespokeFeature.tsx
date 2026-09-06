"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import {
  ArrowRight,
  Armchair,
  Box,
  Leaf,
  Compass,
  Truck,
  Sliders,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface BespokeFeatureProps {
  onOpenConsultation: () => void;
}

export const BespokeFeature: React.FC<BespokeFeatureProps> = ({
  onOpenConsultation,
}) => {
  const { t } = useLanguage();
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  };

  const handleTouchStart = () => {
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging.current) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  return (
    <section
      id="bespoke"
      className="bg-secondary-bg py-16 xs:py-24 sm:py-32 border-t border-b border-border relative overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-4 xs:px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-13 gap-6 sm:gap-10 items-center">
          {/* Left Column: Feature Highlights */}
          <div className="lg:col-span-6 flex flex-col">
            <span className="font-hanken text-xs text-accent uppercase tracking-[0.25em] font-bold mb-3 sm:mb-4">
              {t("differenceEyebrow")}
            </span>

            {/* Custom Made Headline */}
            <h2 className="font-sangbleu-sunrise font-light not-italic text-3xl xs:text-4xl sm:text-6xl md:text-7xl xl:text-[80px] text-text/70 leading-[1.05] mb-8 sm:mb-10">
              {t("customHeading")
                .split("\n")
                .map((line, i) => (
                  <span key={i} className="block whitespace-nowrap">
                    {line}
                  </span>
                ))}
            </h2>

            <div className="flex flex-col gap-5 sm:gap-6 mb-8 sm:mb-12">
              <div className="flex gap-4 sm:gap-5 items-start">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-none bg-accent text-primary-bg flex items-center justify-center flex-shrink-0 shadow-md">
                  <Armchair className="w-5 sm:w-6 h-5 sm:h-6" />
                </div>
                <div>
                  <h4 className="font-hanken text-base sm:text-lg font-bold text-text/80">
                    {t("diff1Title")}
                  </h4>
                  <p className="font-hanken text-xs sm:text-sm font-normal text-text-muted mt-0.5">
                    {t("diff1Desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-5 items-start">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-none border border-border flex items-center justify-center flex-shrink-0 bg-primary-bg/60">
                  <Box className="w-5 sm:w-6 h-5 sm:h-6 text-text" />
                </div>
                <div>
                  <h4 className="font-hanken text-base sm:text-lg font-bold text-text/80">
                    {t("diff2Title")}
                  </h4>
                  <p className="font-hanken text-xs sm:text-sm font-normal text-text-muted mt-0.5">
                    {t("diff2Desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-5 items-start">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-none border border-border flex items-center justify-center flex-shrink-0 bg-primary-bg/60">
                  <Leaf className="w-5 sm:w-6 h-5 sm:h-6 text-text" />
                </div>
                <div>
                  <h4 className="font-hanken text-base sm:text-lg font-bold text-text/80">
                    {t("diff3Title")}
                  </h4>
                  <p className="font-hanken text-xs sm:text-sm font-normal text-text-muted mt-0.5">
                    {t("diff3Desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-5 items-start">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-none border border-border flex items-center justify-center flex-shrink-0 bg-primary-bg/60">
                  <Compass className="w-5 sm:w-6 h-5 sm:h-6 text-text" />
                </div>
                <div>
                  <h4 className="font-hanken text-base sm:text-lg font-bold text-text/80">
                    {t("diff4Title")}
                  </h4>
                  <p className="font-hanken text-xs sm:text-sm font-normal text-text-muted mt-0.5">
                    {t("diff4Desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-5 items-start">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-none border border-border flex items-center justify-center flex-shrink-0 bg-primary-bg/60">
                  <Truck className="w-5 sm:w-6 h-5 sm:h-6 text-text" />
                </div>
                <div>
                  <h4 className="font-hanken text-base sm:text-lg font-bold text-text/80">
                    {t("diff5Title")}
                  </h4>
                  <p className="font-hanken text-xs sm:text-sm font-normal text-text-muted mt-0.5">
                    {t("diff5Desc")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center pt-6 sm:pt-8 border-t border-border">
              <Button
                variant="gradient"
                size="lg"
                onClick={onOpenConsultation}
                className="w-full sm:w-auto gap-3"
              >
                <span>{t("startProject")}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Right Column: Fixed-Size Before/Bespoke Comparison Slider */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative rounded-none overflow-hidden shadow-xl bg-primary-bg p-1 border border-border">
              <div
                ref={containerRef}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
                className="relative w-full aspect-[4/3] xs:aspect-[16/10] sm:aspect-[16/12] overflow-hidden rounded-none select-none"
              >
                {/* 1. BEFORE Image (Underneath) */}
                <Image
                  src="https://res.cloudinary.com/dmglab5ej/image/upload/v1788443693/hackathon/before_movvjo.webp"
                  alt={t("bespokeAltBefore")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 54vw"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />

                {/* 2. BESPOKE Image (Top Layer) */}
                <Image
                  src="https://res.cloudinary.com/dmglab5ej/image/upload/v1788443693/hackathon/bespoke_bhel21.webp"
                  alt={t("bespokeAltAfter")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 54vw"
                  style={{
                    clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)`,
                    WebkitClipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)`,
                  }}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />

                {/* 3. Draggable Vertical Divider & Handle */}
                <div
                  className="absolute inset-y-0 w-0.5 bg-primary-bg shadow-2xl z-20 cursor-ew-resize group"
                  style={{ left: `${sliderPos}%` }}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                >
                  {/* Invisible Hitbox to make grabbing easier */}
                  <div className="absolute inset-y-0 -left-4 w-8 bg-transparent" />
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 xs:w-10 sm:w-12 h-9 xs:h-10 sm:h-12 rounded-none bg-text border-2 border-primary-bg flex items-center justify-center shadow-2xl pointer-events-none group-hover:scale-105 transition-transform duration-200">
                    <Sliders className="w-4 sm:w-5 h-4 sm:h-5 text-primary-bg" />
                  </div>
                </div>

                {/* 4. Labels */}
                <div className="absolute top-3 xs:top-4 left-3 xs:left-4 bg-primary-bg/90 backdrop-blur-md px-2.5 xs:px-3 py-1 rounded-none z-30 shadow-sm border border-border pointer-events-none">
                  <span className="font-hanken text-[0.65rem] xs:text-[0.7rem] text-text tracking-widest font-bold uppercase">
                    {t("labelBefore")}
                  </span>
                </div>
                <div className="absolute top-3 xs:top-4 right-3 xs:right-4 bg-text/90 backdrop-blur-md px-2.5 xs:px-3 py-1 rounded-none z-30 shadow-sm border border-primary-bg/20 pointer-events-none">
                  <span className="font-hanken text-[0.65rem] xs:text-[0.7rem] text-primary-bg tracking-widest font-bold uppercase">
                    {t("labelBespoke")}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-3 xs:mt-4 px-2 text-[0.7rem] xs:text-xs font-hanken text-text-muted">
              <span className="italic font-normal">{t("subLabelBefore")}</span>
              <span className="font-bold text-text">
                {t("subLabelBespoke")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
