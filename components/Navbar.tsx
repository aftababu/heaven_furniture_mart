"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X, Globe, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const { lang, setLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#F2EFE9]/95 backdrop-blur-md shadow-md border-b border-[#382C24]/10 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 flex justify-between items-center relative">
          {/* Desktop Left Nav Links */}
          <nav className="hidden md:flex gap-8 items-center">
            <a
              href="#collections"
              className="font-hanken text-xs tracking-[0.2em] text-[#382C24] hover:text-[#C5A059] transition-colors uppercase font-semibold"
            >
              {t("navShop")}
            </a>
            <a
              href="#bespoke"
              className="font-hanken text-xs tracking-[0.2em] text-[#382C24] hover:text-[#C5A059] transition-colors uppercase font-semibold"
            >
              {t("navBespoke")}
            </a>
            <a
              href="#why-heaven"
              className="font-hanken text-xs tracking-[0.2em] text-[#382C24] hover:text-[#C5A059] transition-colors uppercase font-semibold"
            >
              {t("navWhyHeaven")}
            </a>
            <a
              href="#showroom"
              className="font-hanken text-xs tracking-[0.2em] text-[#382C24] hover:text-[#C5A059] transition-colors uppercase font-semibold"
            >
              {t("navShowroom")}
            </a>
          </nav>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[#382C24] focus:outline-none"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Brand Anchor (Centered) */}
          <div
            id="header-logo-anchor"
            className="absolute left-1/2 transform -translate-x-1/2 text-center flex flex-col items-center"
          >
            <a
              href="#"
              className="font-bodoni text-3xl sm:text-4xl lg:text-5xl tracking-normal text-[#382C24] block uppercase leading-none"
            >
              HEAVEN
            </a>
            <span className="font-hanken text-[9px] sm:text-[10px] tracking-[0.25em] text-[#A88849] uppercase mt-1 font-bold">
              {t("brandSubtitle")}
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex gap-4 sm:gap-6 items-center">
            {/* Language Switcher */}
            <div className="flex items-center border border-[#382C24]/30 rounded px-1.5 py-0.5 bg-white/40 backdrop-blur-sm">
              <Globe className="w-3.5 h-3.5 text-[#382C24] mr-1" />
              <button
                onClick={() => setLang("en")}
                className={`font-hanken text-xs font-bold px-1.5 py-0.5 transition-colors ${
                  lang === "en"
                    ? "text-[#382C24] bg-[#382C24]/10 rounded"
                    : "text-[#382C24]/50 hover:text-[#382C24]"
                }`}
              >
                EN
              </button>
              <span className="text-[#382C24]/30 text-xs">|</span>
              <button
                onClick={() => setLang("bn")}
                className={`font-hanken text-xs font-bold px-1.5 py-0.5 transition-colors ${
                  lang === "bn"
                    ? "text-[#382C24] bg-[#382C24]/10 rounded"
                    : "text-[#382C24]/50 hover:text-[#382C24]"
                }`}
              >
                BN
              </button>
            </div>

            {/* Quick Quote CTA */}
            <button
              onClick={onOpenConsultation}
              className="hidden sm:inline-flex items-center gap-2 bg-[#382C24] text-[#F2EFE9] px-4 py-2 text-xs font-hanken uppercase tracking-[0.15em] font-semibold hover:bg-[#C5A059] hover:text-[#382C24] transition-all shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t("navQuote")}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-[#F2EFE9] flex flex-col justify-between p-8"
          >
            <div className="flex justify-between items-center border-b border-[#382C24]/10 pb-6">
              <div>
                <span className="font-bodoni text-3xl text-[#382C24] block">HEAVEN</span>
                <span className="font-hanken text-[10px] text-[#A88849] tracking-widest uppercase font-bold">
                  {t("brandSubtitle")}
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#382C24] border border-[#382C24]/20 rounded-full"
                aria-label="Close Mobile Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 py-12">
              <a
                href="#collections"
                onClick={() => setMobileMenuOpen(false)}
                className="font-cormorant text-4xl text-[#382C24] hover:text-[#C5A059] transition-colors"
              >
                {t("navShop")}
              </a>
              <a
                href="#bespoke"
                onClick={() => setMobileMenuOpen(false)}
                className="font-cormorant text-4xl text-[#382C24] hover:text-[#C5A059] transition-colors"
              >
                {t("navBespoke")}
              </a>
              <a
                href="#why-heaven"
                onClick={() => setMobileMenuOpen(false)}
                className="font-cormorant text-4xl text-[#382C24] hover:text-[#C5A059] transition-colors"
              >
                {t("navWhyHeaven")}
              </a>
              <a
                href="#showroom"
                onClick={() => setMobileMenuOpen(false)}
                className="font-cormorant text-4xl text-[#382C24] hover:text-[#C5A059] transition-colors"
              >
                {t("navShowroom")}
              </a>
            </nav>

            <div className="space-y-4 pt-6 border-t border-[#382C24]/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full text-center bg-[#382C24] text-white py-4 font-hanken text-xs uppercase tracking-widest font-bold"
              >
                {t("heroCtaPrimary")}
              </button>

              <div className="flex justify-between items-center text-xs text-[#382C24]/60">
                <span>Agrabad Access Road, Chattogram</span>
                <span>+880 1960-481983</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
