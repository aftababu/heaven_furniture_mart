"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterProps {
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-ivory text-charcoal-body py-16 xs:py-20 sm:py-28 px-4 xs:px-6 sm:px-12 border-t border-wood-border relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 mb-16 sm:mb-28">
          {/* Brand & Socials */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="mb-6 lg:mb-0">
              <h2 className="font-sangbleu-sunrise text-4xl xs:text-5xl sm:text-6xl uppercase tracking-tight mb-3 text-charcoal-body">
                HEAVEN
              </h2>
              <p className="font-hanken text-xs sm:text-sm font-normal text-slate-warm mt-2 block">
                {t("footerTagline")}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6 font-hanken text-[0.65rem] sm:text-[0.68rem] font-semibold tracking-[0.2em] text-slate-gray">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-charcoal transition-colors uppercase"
              >
                INSTAGRAM
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-charcoal transition-colors uppercase"
              >
                FACEBOOK
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-charcoal transition-colors uppercase"
              >
                YOUTUBE
              </a>
            </div>
          </div>

          {/* Link Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 xs:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <span className="font-hanken text-[0.7rem] font-bold tracking-[0.22em] text-brass uppercase mb-3 sm:mb-4 block">
                {t("navCollections")}
              </span>
              <ul className="flex flex-col gap-2 sm:gap-2.5 font-hanken text-xs font-medium text-slate-gray">
                <li>
                  <a
                    href="#collections"
                    className="hover:text-charcoal hover:translate-x-4 transition-colors leading-relaxed"
                  >
                    {t("catLiving")}
                  </a>
                </li>
                <li>
                  <a
                    href="#collections"
                    className="hover:text-charcoal transition-colors leading-relaxed"
                  >
                    {t("catBedroom")}
                  </a>
                </li>
                <li>
                  <a
                    href="#collections"
                    className="hover:text-charcoal transition-colors leading-relaxed"
                  >
                    {t("catDining")}
                  </a>
                </li>
                <li>
                  <a
                    href="#bespoke"
                    className="hover:text-charcoal transition-colors leading-relaxed"
                  >
                    {t("catBespoke")}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <span className="font-hanken text-[0.7rem] font-bold tracking-[0.22em] text-brass uppercase mb-3 sm:mb-4 block">
                Company
              </span>
              <ul className="flex flex-col gap-2 sm:gap-2.5 font-hanken text-xs font-medium text-slate-gray">
                <li>
                  <a
                    href="#about"
                    className="hover:text-charcoal transition-colors leading-relaxed"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#why-heaven"
                    className="hover:text-charcoal transition-colors leading-relaxed"
                  >
                    Our Craft
                  </a>
                </li>
                <li>
                  <a
                    href="#showroom"
                    className="hover:text-charcoal transition-colors leading-relaxed"
                  >
                    Showroom
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 xs:col-span-1">
              <span className="font-hanken text-[0.7rem] font-bold tracking-[0.22em] text-brass uppercase mb-3 sm:mb-4 block">
                Visit
              </span>
              <div className="font-hanken text-xs font-medium text-slate-gray leading-relaxed">
                <p>Agrabad Access Road</p>
                <p>Chattogram, Bangladesh</p>
              </div>
            </div>
          </div>

          {/* Inquiries */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-end text-left lg:text-right">
            <div className="mb-6">
              <span className="font-hanken text-[0.7rem] font-bold tracking-[0.22em] text-brass uppercase mb-3 sm:mb-4 block">
                {t("footerInquiries")}
              </span>
              <p className="font-hanken text-sm sm:text-base font-bold text-charcoal-body mb-1 flex items-center gap-2 lg:justify-end">
                <Phone className="w-4 h-4 text-brass" />
                <span>+880 1960-481983</span>
              </p>
              <a
                href="mailto:heavenfurnituremart@gmail.com"
                className="font-hanken text-xs font-medium text-slate-warm hover:text-brass transition-colors block mt-1"
              >
                heavenfurnituremart@gmail.com
              </a>
            </div>

            <Button
              variant="link"
              size="sm"
              onClick={onOpenConsultation}
              className="gap-2"
            >
              <span>{t("requestQuoteFooter")}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 sm:pt-12 border-t border-wood-border">
          <div className="text-center mb-8 sm:mb-12 overflow-hidden">
            <h1 className="font-sangbleu-sunrise text-[12vw] xs:text-[13vw] sm:text-[14vw] leading-none tracking-tighter opacity-[0.85] select-none text-charcoal-body whitespace-nowrap">
              HEAVEN
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <span className="font-hanken text-[0.62rem] sm:text-[0.68rem] font-medium tracking-[0.2em] sm:tracking-[0.22em] text-slate-muted uppercase">
              AGRABAD · CHATTOGRAM · BANGLADESH
            </span>
            <span className="font-hanken text-[0.62rem] sm:text-[0.68rem] font-medium tracking-[0.2em] sm:tracking-[0.22em] text-slate-muted uppercase">
              © 2026 HEAVEN FURNITURE MART
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
