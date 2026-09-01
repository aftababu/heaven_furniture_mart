"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";

export const BrandStatement: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="relative w-full min-h-[85vh] lg:min-h-screen flex items-center overflow-hidden group py-20"
    >
      {/* Background Image with Slow Motion Zoom */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=2000"
          alt="High-end bespoke furniture interior"
          className="object-cover w-full h-full transform transition-transform duration-[15s] ease-out scale-100 group-hover:scale-105 object-[60%_40%]"
        />
        {/* Tonal Color Overlays */}
        <div className="absolute inset-0 bg-[#261C16]/65 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[#1A2F2F]/40 mix-blend-overlay" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-12 flex">
        <div className="w-full md:w-[60%] lg:w-[50%] flex flex-col items-start justify-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="h-px w-10 bg-[#C9A227]" />
            <span className="font-hanken text-xs text-[#F2EFE9] uppercase tracking-[0.25em] font-bold">
              {t("approachEyebrow")}
            </span>
          </motion.div>

          {/* Headline Stagger */}
          <div className="font-cormorant text-5xl sm:text-7xl lg:text-[88px] text-[#F2EFE9] leading-[1.1] mb-8 font-light">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="block"
            >
              {t("approachHeading1")}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="block text-[#C9A227] italic"
            >
              {t("approachHeading2")}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="block"
            >
              {t("approachHeading3")}
            </motion.span>
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="font-hanken text-base sm:text-lg text-[#F2EFE9]/90 max-w-lg mb-6 leading-relaxed"
          >
            {t("approachSubtext")}
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
            className="font-hanken text-xs text-[#C9A227] tracking-[0.2em] uppercase mb-10 font-bold"
          >
            {t("approachTagline")}
          </motion.p>

          {/* Action Link */}
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
            href="#collections"
            className="font-hanken text-xs uppercase tracking-[0.2em] font-semibold text-[#F2EFE9] hover:text-[#C9A227] flex items-center gap-3 border-b border-[#F2EFE9] pb-2 hover:border-[#C9A227] transition-all"
          >
            <span>{t("approachCta")}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-[#F2EFE9]/70">
        <span className="font-hanken text-[9px] uppercase tracking-[0.25em] font-semibold">
          {t("scrollDiscover")}
        </span>
        <ArrowDown className="w-4 h-4 animate-bounce text-[#C9A227]" />
      </div>
    </section>
  );
};
