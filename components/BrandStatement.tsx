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
      className="relative w-full aspect-[21/9] min-h-[420px] sm:min-h-[520px] lg:min-h-[680px] flex items-center overflow-hidden group bg-charcoal"
    >
      {/* 21:9 Full-Screen Edge-to-Edge Cloudinary Showcase Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=2000"
          className="object-cover w-full h-full transform transition-transform duration-[15s] ease-out scale-100 group-hover:scale-105"
        >
          <source
            src="https://res.cloudinary.com/dmglab5ej/video/upload/v1788277092/hackathon/heaven_furniture_mart_snni0t.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark Multi-Stop Gradient Scrim Protection Layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 z-1" />
      </div>
      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-12 flex h-full items-center">
        <div className="w-full flex flex-col items-center justify-center py-8">
          <div className="text-center font-sangbleu-sunrise text-4xl sm:text-[90px]  text-sand leading-[1.3] mb-6 font-light not-italic drop-shadow-md">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="sm:text-[90px] "
            >
              {t("approachHeading1")}
            </motion.p>
          </div>

          {/* Action Link */}
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
            href="#collections"
            className=" font-hanken text-xs font-semibold tracking-[0.22em] text-ivory hover:text-brass border-b border-white/40 pb-1 hover:border-brass transition-all group focus-visible:outline-2 focus-visible:outline-brass flex items-center gap-3"
          >
            <span>{t("approachCta")}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </motion.a>
        </div>
      </div>
      {/* Bottom Scroll Cue */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 border border-wood-border rounded-full px-2 py-2 animate-bounce z-10">
        <ArrowDown className="w-4 h-4  text-ivory" />
      </div>
    </section>
  );
};
