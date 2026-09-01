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
            ? "bg-[#F4F1EA]/95 backdrop-blur-md shadow-md border-b border-[#C9A882]/25 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 flex justify-between items-center relative">
          {/* Desktop Left Nav Links */}
          <nav className="hidden md:flex gap-8 items-center">
            <a
              href="#collections"
              className="font-hanken text-xs tracking-[0.2em] text-[#4A3B31] hover:text-[#C9A227] transition-colors uppercase font-semibold focus-visible:outline-2 focus-visible:outline-[#C9A227]"
            >
              {t("navShop")}
            </a>
            <a
              href="#bespoke"
              className="font-hanken text-xs tracking-[0.2em] text-[#4A3B31] hover:text-[#C9A227] transition-colors uppercase font-semibold focus-visible:outline-2 focus-visible:outline-[#C9A227]"
            >
              {t("navBespoke")}
            </a>
            <a
              href="#why-heaven"
              className="font-hanken text-xs tracking-[0.2em] text-[#4A3B31] hover:text-[#C9A227] transition-colors uppercase font-semibold focus-visible:outline-2 focus-visible:outline-[#C9A227]"
            >
              {t("navWhyHeaven")}
            </a>
            <a
              href="#showroom"
              className="font-hanken text-xs tracking-[0.2em] text-[#4A3B31] hover:text-[#C9A227] transition-colors uppercase font-semibold focus-visible:outline-2 focus-visible:outline-[#C9A227]"
            >
              {t("navShowroom")}
            </a>
          </nav>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[#4A3B31] focus:outline-none focus-visible:outline-2 focus-visible:outline-[#C9A227]"
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
              className="font-bodoni text-3xl sm:text-4xl lg:text-5xl tracking-normal text-[#4A3B31] block uppercase leading-none focus-visible:outline-2 focus-visible:outline-[#C9A227]"
            >
              HEAVEN
            </a>
            <span className="font-hanken text-[9px] sm:text-[10px] tracking-[0.25em] text-[#C9A227] uppercase mt-1 font-bold">
              {t("brandSubtitle")}
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex gap-4 sm:gap-6 items-center">
            {/* Language Switcher */}
            <div className="flex items-center border border-[#C9A882]/40 rounded px-1.5 py-0.5 bg-white/60 backdrop-blur-sm relative overflow-hidden">
              <Globe className="w-3.5 h-3.5 text-[#4A3B31] mr-1 shrink-0" />
              <button
                onClick={() => setLang(lang === "en" ? "bn" : "en")}
                className="font-hanken text-xs font-bold px-1.5 py-0.5 transition-colors focus-visible:outline-2 focus-visible:outline-[#C9A227] flex items-center gap-1"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={lang}
                    initial={{ opacity: 0, y: -4, filter: "blur(2px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 4, filter: "blur(2px)" }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block text-[#4A3B31]"
                  >
                    {lang.toUpperCase()}
                  </motion.span>
                </AnimatePresence>
                <span className="text-[#4A3B31]/40 text-[9px]">▾</span>
              </button>
            </div>

            {/* Quick Quote CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenConsultation}
              className="hidden sm:inline-flex items-center gap-2 bg-[#34494A] text-[#F4F1EA] px-4 py-2 text-xs font-hanken uppercase tracking-[0.15em] font-semibold hover:bg-[#C9A227] hover:text-[#34494A] transition-all duration-300 shadow-sm focus-visible:outline-2 focus-visible:outline-[#C9A227]"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t("navQuote")}</span>
            </motion.button>
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
            className="fixed inset-0 z-[100] bg-[#F4F1EA] flex flex-col justify-between p-8"
          >
            <div className="flex justify-between items-center border-b border-[#C9A882]/30 pb-6">
              <div>
                <span className="font-bodoni text-3xl text-[#4A3B31] block">HEAVEN</span>
                <span className="font-hanken text-[10px] text-[#C9A227] tracking-widest uppercase font-bold">
                  {t("brandSubtitle")}
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#4A3B31] border border-[#C9A882]/40 rounded-full focus-visible:outline-2 focus-visible:outline-[#C9A227]"
                aria-label="Close Mobile Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 py-12">
              <a
                href="#collections"
                onClick={() => setMobileMenuOpen(false)}
                className="font-cormorant text-4xl text-[#4A3B31] hover:text-[#C9A227] transition-colors"
              >
                {t("navShop")}
              </a>
              <a
                href="#bespoke"
                onClick={() => setMobileMenuOpen(false)}
                className="font-cormorant text-4xl text-[#4A3B31] hover:text-[#C9A227] transition-colors"
              >
                {t("navBespoke")}
              </a>
              <a
                href="#why-heaven"
                onClick={() => setMobileMenuOpen(false)}
                className="font-cormorant text-4xl text-[#4A3B31] hover:text-[#C9A227] transition-colors"
              >
                {t("navWhyHeaven")}
              </a>
              <a
                href="#showroom"
                onClick={() => setMobileMenuOpen(false)}
                className="font-cormorant text-4xl text-[#4A3B31] hover:text-[#C9A227] transition-colors"
              >
                {t("navShowroom")}
              </a>
            </nav>

            <div className="space-y-4 pt-6 border-t border-[#C9A882]/30">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full text-center bg-[#34494A] text-[#F4F1EA] py-4 font-hanken text-xs uppercase tracking-widest font-bold focus-visible:outline-2 focus-visible:outline-[#C9A227]"
              >
                {t("heroCtaPrimary")}
              </button>

              <div className="flex justify-between items-center text-xs text-[#4A3B31]/70">
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
