"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, ExternalLink } from "lucide-react";

export const ShowroomMap: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="showroom"
      className="max-w-[1600px] mx-auto px-4 xs:px-6 sm:px-12 py-16 xs:py-24 sm:py-32 bg-sand overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-center min-h-[550px]">
        {/* Left Column: Typography & Address */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="mb-3 sm:mb-4">
            <span className="font-hanken text-[0.7rem] text-brass uppercase tracking-[0.25em] font-bold">
              {t("visitEyebrow")}
            </span>
          </div>

          <h2 className="font-sangbleu-sunrise font-light not-italic text-3xl xs:text-4xl sm:text-7xl lg:text-[80px] text-charcoal leading-[1.05] mb-6 sm:mb-8">
            <span className="block">{t("seeItTitle")}</span>
            <span className="block text-brass font-semibold not-italic">
              {t("feelDifference")}
            </span>
          </h2>

          <div className="h-px w-12 bg-slate-gray/20 mb-6 sm:mb-8" />

          <p className="font-hanken text-charcoal-body text-xs xs:text-sm sm:text-base font-normal leading-relaxed mb-8 sm:mb-10 max-w-sm">
            {t("showroomDesc")}
          </p>

          <div className="flex flex-col gap-4 mb-8 sm:mb-10 border-l-2 border-brass pl-4 sm:pl-6 py-2">
            <div>
              <h4 className="font-hanken text-[0.7rem] sm:text-xs text-slate-muted mb-1 uppercase tracking-widest font-bold">
                {t("showroom01Label")}
              </h4>
              <p className="font-hanken font-bold text-charcoal text-sm sm:text-base">
                Agrabad Access Road
              </p>
              <p className="font-hanken text-xs font-medium text-slate-gray mt-0.5">
                Chattogram · Bangladesh
              </p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-charcoal/70 text-ivory text-[0.65rem] font-bold tracking-widest uppercase mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brass animate-pulse"></span>
                <span>{t("openBadge")}</span>
              </div>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Agrabad+Access+Road,+Chattogram"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-hanken text-xs uppercase tracking-[0.2em] font-bold text-charcoal hover:text-brass border-b border-charcoal pb-2 hover:border-brass transition-all self-start"
          >
            <span>{t("getDirections")}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Right Column: Visual Architectural Map Area */}
        <div className="lg:col-span-7 h-full w-full">
          <div className="relative w-full h-[440px] xs:h-[480px] sm:h-[580px] lg:h-[620px] rounded-xl overflow-hidden shadow-xl border border-wood-border bg-ivory">
            {/* Layer 1: Map Grid Pattern & Road Lines */}
            <div className="absolute inset-0 map-bg-pattern opacity-60 z-0" />
            <div className="absolute top-1/2 left-0 w-[120%] h-5 bg-paper shadow-sm transform -rotate-12 -translate-y-1/2 -translate-x-10 z-10" />
            <div className="absolute top-0 right-1/4 w-4 h-[150%] bg-paper shadow-sm transform rotate-45 -translate-y-10 z-10" />
            <div className="absolute bottom-1/4 left-1/4 w-full h-2 bg-paper/70 transform rotate-12 z-10" />

            {/* Road Labels */}
            <span className="absolute top-[48%] left-[10%] xs:left-[12%] sm:left-[16%] text-[0.65rem] sm:text-[0.7rem] font-hanken font-bold tracking-[0.25em] text-slate-muted uppercase transform -rotate-12 z-15">
              Agrabad Access Road
            </span>
            <span className="absolute top-[32%] right-[12%] sm:right-[18%] text-[0.65rem] sm:text-[0.7rem] font-hanken font-bold tracking-[0.25em] text-slate-muted uppercase transform rotate-45 z-15">
              Jubilee Road
            </span>

            {/* UNIFIED ANCHORED LOCATION PIN & CENTERED PREVIEW POPOVER CARD */}
            <div className="absolute top-[62%] left-[50%] -translate-x-1/2 -translate-y-full z-40 flex flex-col items-center group select-none">
              {/* 1. Anchored Preview Popover Card (Centered Above Pin with Pointer Stem) */}
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-[210px] xs:w-[240px] sm:w-[270px] bg-ivory p-2.5 xs:p-3 sm:p-4 rounded-xl shadow-2xl border border-wood-border mb-3.5 flex flex-col items-center"
              >
                {/* Showroom Image */}
                <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden mb-2 sm:mb-2.5 bg-sand">
                  <Image
                    src="/images/card6.jpg"
                    alt={t("showroomAltImg")}
                    fill
                    sizes="(max-width: 640px) 210px, 270px"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute top-2 right-2 bg-charcoal/90 backdrop-blur-md px-2 py-0.5 rounded-sm text-[0.6rem] sm:text-[0.62rem] font-hanken font-bold tracking-widest text-ivory uppercase border border-ivory/10">
                    {t("openBadge")}
                  </div>
                </div>

                {/* Details */}
                <div className="text-center px-1">
                  <h5 className="font-hanken text-[0.7rem] sm:text-xs font-bold tracking-wider text-charcoal uppercase mb-0.5">
                    Heaven Furniture Mart
                  </h5>
                  <p className="font-hanken text-[0.65rem] sm:text-[0.7rem] text-slate-gray font-medium">
                    Agrabad Access Road, Chattogram
                  </p>
                </div>

                {/* Pointer Arrow Stem */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 sm:w-4 h-3.5 sm:h-4 bg-ivory border-b border-r border-wood-border rotate-45 z-10" />
              </motion.div>

              {/* 2. Interactive Location Marker Pin */}
              <div className="relative flex items-center justify-center cursor-pointer">
                <div className="absolute -inset-4 rounded-full bg-brass/30 animate-ping" />

                <div className="w-10 sm:w-11 h-10 sm:h-11 bg-charcoal text-brass rounded-full border-2 border-ivory shadow-2xl relative z-20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <MapPin className="w-5 sm:w-6 h-5 sm:h-6 fill-brass" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
