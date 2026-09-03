"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function CenterLogoTab() {
  const { t } = useLanguage();

  return (
    <div
      id="header-logo-anchor"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-auto select-none text-center max-w-[44vw] xs:max-w-[50vw] sm:max-w-none"
    >
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link href="/" className="flex flex-col items-center justify-center group">
          {/* HEAVEN with Gold Accent A (Reduced size under 1024px lg breakpoint) */}
          <h1 className="font-sangbleu-sunrise font-normal not-italic uppercase text-base xs:text-lg sm:text-2xl lg:text-[2.2rem] tracking-[0.08em] xs:tracking-[0.12em] sm:tracking-[0.15em] text-charcoal leading-none block transition-colors group-hover:text-brass whitespace-nowrap">
            HE<span className="text-brass">A</span>VEN
          </h1>

          {/* Subtitle */}
          <span className="font-hanken text-[0.4rem] xs:text-[0.46rem] sm:text-[0.54rem] lg:text-[0.62rem] tracking-[0.18em] xs:tracking-[0.22em] sm:tracking-[0.3em] font-bold text-brass uppercase mt-0.5 sm:mt-1.5 leading-none block whitespace-nowrap">
            {t("brandSubtitle")}
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
