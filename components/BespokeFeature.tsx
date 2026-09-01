"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Armchair, Box, Leaf, Compass, Truck, Sliders } from "lucide-react";

interface BespokeFeatureProps {
  onOpenConsultation: () => void;
}

export const BespokeFeature: React.FC<BespokeFeatureProps> = ({ onOpenConsultation }) => {
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
    <section id="bespoke" className="bg-[#EBE5DA] py-24 sm:py-32 border-t border-b border-[#C9A882]/30 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Feature Highlights */}
          <div className="lg:col-span-6 flex flex-col">
            <span className="font-hanken text-xs text-[#C9A227] uppercase tracking-[0.25em] font-bold mb-4">
              {t("differenceEyebrow")}
            </span>

            {/* Custom Made Headline (SangBleu Sunrise 300 Light) */}
            <h2 className="font-sangbleu-sunrise font-light text-5xl sm:text-7xl lg:text-[80px] text-[#4A3B31] leading-[1.05] mb-10">
              {t("customHeading").split("\n").map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>

            <div className="flex flex-col gap-6 mb-12">
              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl bg-[#34494A] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <Armchair className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-hanken text-lg font-bold text-[#4A3B31]">
                    {t("diff1Title")}
                  </h4>
                  <p className="font-hanken text-sm text-[#4A3B31]/80">
                    {t("diff1Desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl border border-[#C9A882]/40 flex items-center justify-center flex-shrink-0">
                  <Box className="w-6 h-6 text-[#34494A]" />
                </div>
                <div>
                  <h4 className="font-hanken text-lg font-bold text-[#4A3B31]">
                    {t("diff2Title")}
                  </h4>
                  <p className="font-hanken text-sm text-[#4A3B31]/80">
                    {t("diff2Desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl border border-[#C9A882]/40 flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-6 h-6 text-[#34494A]" />
                </div>
                <div>
                  <h4 className="font-hanken text-lg font-bold text-[#4A3B31]">
                    {t("diff3Title")}
                  </h4>
                  <p className="font-hanken text-sm text-[#4A3B31]/80">
                    {t("diff3Desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl border border-[#C9A882]/40 flex items-center justify-center flex-shrink-0">
                  <Compass className="w-6 h-6 text-[#34494A]" />
                </div>
                <div>
                  <h4 className="font-hanken text-lg font-bold text-[#4A3B31]">
                    {t("diff4Title")}
                  </h4>
                  <p className="font-hanken text-sm text-[#4A3B31]/80">
                    {t("diff4Desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl border border-[#C9A882]/40 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-6 h-6 text-[#34494A]" />
                </div>
                <div>
                  <h4 className="font-hanken text-lg font-bold text-[#4A3B31]">
                    {t("diff5Title")}
                  </h4>
                  <p className="font-hanken text-sm text-[#4A3B31]/80">
                    {t("diff5Desc")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-[#C9A882]/30">
              <button
                onClick={onOpenConsultation}
                className="bg-[#34494A] text-[#F4F1EA] hover:bg-[#C9A227] hover:text-[#34494A] px-8 py-4 text-xs font-hanken tracking-[0.2em] font-bold uppercase transition-all shadow-md flex items-center gap-3"
              >
                <span>{t("startProject")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="font-hanken text-xs text-[#C9A227] font-bold tracking-widest uppercase">
                {t("promoDiscount")}
              </span>
            </div>
          </div>

          {/* Right Column: Fixed-Size Before/Bespoke Comparison Slider (Pure Clip-Path Masking) */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#F4F1EA] p-3 sm:p-4 border border-[#C9A882]/30">
              <div
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-2xl cursor-ew-resize select-none"
              >
                {/* 1. BEFORE Image (Underneath) */}
                <img
                  src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=2000"
                  alt="Standard Mass Produced Furniture (BEFORE)"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />

                {/* 2. BESPOKE Image (Top Layer) */}
                <img
                  src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=2000"
                  alt="Heaven Bespoke Furniture (BESPOKE)"
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
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#34494A] border-2 border-white flex items-center justify-center shadow-2xl">
                    <Sliders className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* 4. Labels */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full z-30 shadow-sm border border-[#4A3B31]/10 pointer-events-none">
                  <span className="font-hanken text-[9px] text-[#4A3B31] tracking-widest font-bold uppercase">
                    BEFORE
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-[#34494A]/90 backdrop-blur-md px-3 py-1 rounded-full z-30 shadow-sm border border-white/20 pointer-events-none">
                  <span className="font-hanken text-[9px] text-white tracking-widest font-bold uppercase">
                    BESPOKE
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-4 px-2 text-xs font-hanken text-[#4A3B31]/70">
              <span className="italic">Mass-produced standard</span>
              <span className="font-bold text-[#4A3B31]">Bespoke Craftsmanship</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
