"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

export const ShowroomMap: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="showroom" className="max-w-[1600px] mx-auto px-6 sm:px-12 py-24 sm:py-32 bg-[#F2EFE9]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center min-h-[550px]">
        {/* Left Column: Typography & Address */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="mb-4">
            <span className="font-hanken text-xs text-[#A88849] uppercase tracking-[0.25em] font-bold">
              {t("visitEyebrow")}
            </span>
          </div>

          <h2 className="font-cormorant text-5xl sm:text-7xl lg:text-[80px] text-[#382C24] leading-[1.05] mb-8">
            <span className="block">{t("seeItTitle")}</span>
            <span className="block text-[#C9A227] italic">{t("feelDifference")}</span>
          </h2>

          <div className="h-px w-12 bg-[#382C24]/20 mb-8" />

          <p className="font-hanken text-base sm:text-lg text-[#382C24]/80 mb-10 max-w-sm">
            {t("showroomDesc")}
          </p>

          <div className="flex flex-col gap-4 mb-10 border-l-2 border-[#C9A227] pl-6 py-2">
            <div>
              <h4 className="font-hanken text-xs text-[#382C24]/50 mb-1 uppercase tracking-widest font-bold">
                {t("showroom01Label")}
              </h4>
              <p className="font-hanken font-bold text-[#382C24] text-base">Agrabad Access Road</p>
              <p className="font-hanken text-[#382C24]/70 text-sm">Chattogram · Bangladesh</p>
              <span className="inline-block font-hanken text-[10px] text-[#C9A227] mt-2 uppercase tracking-widest font-bold px-2 py-0.5 bg-[#C9A227]/10 rounded border border-[#C9A227]/20">
                {t("openBadge")}
              </span>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Agrabad+Access+Road,+Chattogram"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-hanken text-xs uppercase tracking-[0.2em] font-bold text-[#382C24] hover:text-[#C9A227] border-b border-[#382C24] pb-2 hover:border-[#C9A227] transition-all self-start"
          >
            <span>{t("getDirections")}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Right Column: Visual Architectural Map Area with Clear Layering Hierarchy */}
        <div className="lg:col-span-7 h-full w-full">
          <div className="relative w-full h-[480px] sm:h-[580px] rounded-3xl overflow-hidden shadow-xl border border-[#382C24]/10 bg-[#EFECE5]">
            {/* Layer 1: Map Grid Pattern & Road Lines (z-0 / z-10) */}
            <div className="absolute inset-0 map-bg-pattern opacity-60 z-0" />
            <div className="absolute top-1/2 left-0 w-[120%] h-5 bg-white shadow-sm transform -rotate-12 -translate-y-1/2 -translate-x-10 z-10" />
            <div className="absolute top-0 right-1/4 w-4 h-[150%] bg-white shadow-sm transform rotate-45 -translate-y-10 z-10" />
            <div className="absolute bottom-1/4 left-1/4 w-full h-2 bg-white/70 transform rotate-12 z-10" />

            {/* Road Labels (z-15) */}
            <span className="absolute top-[48%] left-[18%] text-[9px] font-hanken font-bold tracking-[0.25em] text-[#382C24]/40 uppercase transform -rotate-12 z-15">
              Agrabad Access Road
            </span>
            <span className="absolute top-[32%] right-[22%] text-[9px] font-hanken font-bold tracking-[0.25em] text-[#382C24]/40 uppercase transform rotate-45 z-15">
              Jubilee Road
            </span>

            {/* Layer 2: Floating Showroom Photo Card (z-20, Positioned Top-Left so it NEVER obscures the marker pin) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute top-[6%] left-[6%] sm:left-[8%] w-[220px] sm:w-[260px] bg-[#F2EFE9] p-3 sm:p-4 rounded-2xl shadow-xl border border-[#382C24]/10 z-20"
            >
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-3">
                <img
                  src="https://images.pexels.com/photos/157811/pexels-photo-157811.jpeg?auto=compress&cs=tinysrgb&w=2000"
                  alt="Heaven Furniture Mart Showroom Interior"
                  className="w-full h-full object-cover object-left"
                />
                <div className="absolute top-2 right-2 bg-[#382C24]/85 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-hanken font-bold tracking-widest text-white uppercase">
                  {t("openBadge")}
                </div>
              </div>
              <div className="px-1 text-center">
                <h5 className="font-hanken text-[11px] text-[#382C24] font-bold uppercase tracking-wider mb-0.5">
                  Heaven Furniture Mart
                </h5>
                <p className="font-hanken text-[10px] text-[#382C24]/60">
                  Agrabad Access Road, Chattogram
                </p>
              </div>
            </motion.div>

            {/* Layer 3: Interactive Location Marker Pin (z-40 & z-50, Always prominently visible on top) */}
            <div className="absolute top-[50%] left-[58%] sm:left-[55%] transform -translate-x-1/2 -translate-y-1/2 z-40 group cursor-pointer">
              {/* Outer Pulse */}
              <div className="absolute -inset-4 rounded-full bg-[#C9A227]/30 animate-ping z-40" />

              {/* Pin Icon & Beacon */}
              <div className="w-10 h-10 bg-[#382C24] text-[#C9A227] rounded-full border-2 border-white shadow-2xl relative z-45 flex items-center justify-center transition-transform group-hover:scale-115">
                <MapPin className="w-6 h-6 fill-[#C9A227]" />
              </div>

              {/* Layer 4: Pin Label Tooltip (z-50) */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-[#382C24] text-white text-[9px] font-hanken font-bold tracking-widest px-3 py-1 rounded-md shadow-2xl whitespace-nowrap z-50 uppercase border border-white/20">
                HEAVEN LOCATION PIN
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
