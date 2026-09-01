"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

interface FooterProps {
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#F2EFE9] text-[#382C24] py-20 sm:py-28 px-6 sm:px-12 border-t border-[#382C24]/10 relative">
      <div className="max-w-[1600px] mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 sm:mb-28">
          {/* Brand & Socials */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <h2 className="font-bodoni text-5xl sm:text-6xl uppercase tracking-tight mb-3 text-[#382C24]">
                HEAVEN
              </h2>
              <p className="font-hanken text-sm text-[#382C24]/75 mb-8">
                {t("footerTagline")}
              </p>
            </div>
            <div className="flex gap-6 font-hanken text-[10px] tracking-[0.25em] font-bold uppercase text-[#382C24]/80">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#A88849] transition-colors">
                INSTAGRAM
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#A88849] transition-colors">
                FACEBOOK
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#A88849] transition-colors">
                YOUTUBE
              </a>
            </div>
          </div>

          {/* Link Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-hanken text-[10px] text-[#A88849] tracking-[0.2em] mb-5 uppercase font-bold">
                {t("navCollections")}
              </h4>
              <ul className="flex flex-col gap-2.5 font-hanken text-sm text-[#382C24]/70 font-medium">
                <li><a href="#collections" className="hover:text-[#382C24] transition-colors">{t("catLiving")}</a></li>
                <li><a href="#collections" className="hover:text-[#382C24] transition-colors">{t("catBedroom")}</a></li>
                <li><a href="#collections" className="hover:text-[#382C24] transition-colors">{t("catDining")}</a></li>
                <li><a href="#bespoke" className="hover:text-[#382C24] transition-colors">{t("catBespoke")}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-hanken text-[10px] text-[#A88849] tracking-[0.2em] mb-5 uppercase font-bold">
                Company
              </h4>
              <ul className="flex flex-col gap-2.5 font-hanken text-sm text-[#382C24]/70 font-medium">
                <li><a href="#about" className="hover:text-[#382C24] transition-colors">About Us</a></li>
                <li><a href="#why-heaven" className="hover:text-[#382C24] transition-colors">Our Craft</a></li>
                <li><a href="#showroom" className="hover:text-[#382C24] transition-colors">Showroom</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-hanken text-[10px] text-[#A88849] tracking-[0.2em] mb-5 uppercase font-bold">
                Visit
              </h4>
              <div className="font-hanken text-sm text-[#382C24]/70 leading-relaxed font-medium">
                <p>Agrabad Access Road</p>
                <p>Chattogram, Bangladesh</p>
              </div>
            </div>
          </div>

          {/* Inquiries */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-end text-left lg:text-right">
            <div className="mb-6">
              <h4 className="font-hanken text-[10px] text-[#A88849] tracking-[0.2em] mb-3 uppercase font-bold">
                {t("footerInquiries")}
              </h4>
              <p className="font-hanken text-base font-bold text-[#382C24] mb-1 flex items-center gap-2 lg:justify-end">
                <Phone className="w-4 h-4 text-[#A88849]" />
                <span>+880 1960-481983</span>
              </p>
              <p className="font-hanken text-xs text-[#382C24]/70">
                heavenfurnituremart@gmail.com
              </p>
            </div>

            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2 font-hanken text-xs tracking-[0.15em] uppercase font-bold border-b border-[#382C24] pb-2 hover:text-[#A88849] hover:border-[#A88849] transition-all"
            >
              <span>{t("requestQuoteFooter")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-12 border-t border-[#382C24]/10">
          <div className="text-center mb-12">
            <h1 className="font-bodoni text-[14vw] leading-none tracking-tighter opacity-[0.85] select-none text-[#382C24]">
              HEAVEN
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[#382C24]/50">
            <span className="font-hanken text-[10px] tracking-[0.2em] font-bold uppercase">
              AGRABAD · CHATTOGRAM · BANGLADESH
            </span>
            <span className="font-hanken text-[10px] tracking-[0.2em] font-bold uppercase">
              © 2026 HEAVEN FURNITURE MART
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
