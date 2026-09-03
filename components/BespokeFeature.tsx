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

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
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
      className="bg-sand py-16 xs:py-24 sm:py-32 border-t border-b border-wood-border relative overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-4 xs:px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-13 gap-6 sm:gap-10 items-center">
          {/* Left Column: Feature Highlights */}
          <div className="lg:col-span-6 flex flex-col">
            <span className="font-hanken text-xs text-brass uppercase tracking-[0.25em] font-bold mb-3 sm:mb-4">
              {t("differenceEyebrow")}
            </span>

            {/* Custom Made Headline (SangBleu 300 Light) */}
            <h2 className="font-sangbleu-sunrise font-light not-italic text-3xl xs:text-4xl sm:text-6xl md:text-7xl xl:text-[80px] text-charcoal/70 leading-[1.05] mb-8 sm:mb-10">
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
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-brass text-ivory flex items-center justify-center flex-shrink-0 shadow-md">
                  <Armchair className="w-5 sm:w-6 h-5 sm:h-6" />
                </div>
                <div>
                  <h4 className="font-hanken text-base sm:text-lg font-bold text-charcoal/80">
                    {t("diff1Title")}
                  </h4>
                  <p className="font-hanken text-xs sm:text-sm font-normal text-slate-gray mt-0.5">
                    {t("diff1Desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-5 items-start">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg border border-wood-border flex items-center justify-center flex-shrink-0 bg-white/60">
                  <Box className="w-5 sm:w-6 h-5 sm:h-6 text-charcoal" />
                </div>
                <div>
                  <h4 className="font-hanken text-base sm:text-lg font-bold text-charcoal/80">
                    {t("diff2Title")}
                  </h4>
                  <p className="font-hanken text-xs sm:text-sm font-normal text-slate-gray mt-0.5">
                    {t("diff2Desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-5 items-start">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg border border-wood-border flex items-center justify-center flex-shrink-0 bg-white/60">
                  <Leaf className="w-5 sm:w-6 h-5 sm:h-6 text-charcoal" />
                </div>
                <div>
                  <h4 className="font-hanken text-base sm:text-lg font-bold text-charcoal/80">
                    {t("diff3Title")}
                  </h4>
                  <p className="font-hanken text-xs sm:text-sm font-normal text-slate-gray mt-0.5">
                    {t("diff3Desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-5 items-start">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg border border-wood-border flex items-center justify-center flex-shrink-0 bg-white/60">
                  <Compass className="w-5 sm:w-6 h-5 sm:h-6 text-charcoal" />
                </div>
                <div>
                  <h4 className="font-hanken text-base sm:text-lg font-bold text-charcoal/80">
                    {t("diff4Title")}
                  </h4>
                  <p className="font-hanken text-xs sm:text-sm font-normal text-slate-gray mt-0.5">
                    {t("diff4Desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-5 items-start">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg border border-wood-border flex items-center justify-center flex-shrink-0 bg-white/60">
                  <Truck className="w-5 sm:w-6 h-5 sm:h-6 text-charcoal" />
                </div>
                <div>
                  <h4 className="font-hanken text-base sm:text-lg font-bold text-charcoal/80">
                    {t("diff5Title")}
                  </h4>
                  <p className="font-hanken text-xs sm:text-sm font-normal text-slate-gray mt-0.5">
                    {t("diff5Desc")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center pt-6 sm:pt-8 border-t border-wood-border">
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
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-ivory p-2 xs:p-3 sm:p-4 border border-wood-border">
              <div
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                className="relative w-full aspect-[4/3] xs:aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-xl cursor-ew-resize select-none"
              >
                {/* 1. BEFORE Image (Underneath) */}
                <Image
                  src="/images/before.jpeg"
                  alt={t("bespokeAltBefore")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 54vw"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />

                {/* 2. BESPOKE Image (Top Layer) */}
                <Image
                  src="/images/bespoke.jpg"
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
                  className="absolute inset-y-0 w-0.5 bg-white shadow-2xl z-20 pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 xs:w-10 sm:w-12 h-9 xs:h-10 sm:h-12 rounded-full bg-charcoal border-2 border-white flex items-center justify-center shadow-2xl">
                    <Sliders className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                  </div>
                </div>

                {/* 4. Labels */}
                <div className="absolute top-3 xs:top-4 left-3 xs:left-4 bg-white/90 backdrop-blur-md px-2.5 xs:px-3 py-1 rounded-sm z-30 shadow-sm border border-wood-border pointer-events-none">
                  <span className="font-hanken text-[0.65rem] xs:text-[0.7rem] text-charcoal-body tracking-widest font-bold uppercase">
                    {t("labelBefore")}
                  </span>
                </div>
                <div className="absolute top-3 xs:top-4 right-3 xs:right-4 bg-charcoal/90 backdrop-blur-md px-2.5 xs:px-3 py-1 rounded-sm z-30 shadow-sm border border-white/20 pointer-events-none">
                  <span className="font-hanken text-[0.65rem] xs:text-[0.7rem] text-ivory tracking-widest font-bold uppercase">
                    {t("labelBespoke")}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-3 xs:mt-4 px-2 text-[0.7rem] xs:text-xs font-hanken text-slate-gray">
              <span className="italic font-normal">{t("subLabelBefore")}</span>
              <span className="font-bold text-charcoal">
                {t("subLabelBespoke")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
