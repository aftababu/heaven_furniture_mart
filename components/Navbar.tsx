"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CenterLogoTab from "@/components/navbar/CenterLogoTab";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const { lang, setLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 h-20 sm:h-22 flex items-center overflow-visible ${
          isScrolled
            ? "bg-ivory/90 backdrop-blur-md border-b border-wood-border/40 shadow-sm"
            : "bg-transparent border-b border-transparent shadow-none"
        }`}
      >
        <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-8 lg:px-12 flex justify-between items-center relative h-full overflow-visible">
          {/* Desktop Left Nav Links (Reduced gap under 1024px lg breakpoint) */}
          <nav className="hidden md:flex gap-4 md:gap-5 lg:gap-8 items-center">
            <a
              href="#collections"
              className="font-hanken text-[0.68rem] md:text-[0.7rem] lg:text-[0.72rem] tracking-[0.16em] md:tracking-[0.18em] lg:tracking-[0.2em] text-slate-warm hover:text-brass-gold transition-colors uppercase font-semibold focus-visible:outline-2 focus-visible:outline-brass-gold"
            >
              {t("navShop")}
            </a>
            <a
              href="#bespoke"
              className="font-hanken text-[0.68rem] md:text-[0.7rem] lg:text-[0.72rem] tracking-[0.16em] md:tracking-[0.18em] lg:tracking-[0.2em] text-slate-warm hover:text-brass-gold transition-colors uppercase font-semibold focus-visible:outline-2 focus-visible:outline-brass-gold"
            >
              {t("navBespoke")}
            </a>
            <a
              href="#why-heaven"
              className="font-hanken text-[0.68rem] md:text-[0.7rem] lg:text-[0.72rem] tracking-[0.16em] md:tracking-[0.18em] lg:tracking-[0.2em] text-slate-warm hover:text-brass-gold transition-colors uppercase font-semibold focus-visible:outline-2 focus-visible:outline-brass-gold"
            >
              {t("navWhyHeaven")}
            </a>
          </nav>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>

          {/* BESPOKE HANGING ATELIER TAB LOGO */}
          <CenterLogoTab />

          {/* Right Controls Utility Cluster */}
          <div className="flex gap-3 sm:gap-4 lg:gap-6 items-center">
            {/* Luxury Editorial Inline Masthead Language Switcher */}
            <div className="flex items-center text-[0.65rem] md:text-[0.68rem] tracking-[0.18em] md:tracking-[0.22em] font-hanken uppercase select-none">
              <button
                onClick={() => setLang("en")}
                className={`transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-brass-gold ${
                  lang === "en"
                    ? "text-charcoal font-semibold"
                    : "text-graphite-muted font-normal hover:text-charcoal"
                }`}
              >
                EN
              </button>
              <span className="text-wood-border mx-2 md:mx-2.5 select-none font-normal">
                /
              </span>
              <button
                onClick={() => setLang("bn")}
                className={`transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-brass-gold ${
                  lang === "bn"
                    ? "text-charcoal font-semibold"
                    : "text-graphite-muted font-normal hover:text-charcoal"
                }`}
              >
                বাংলা
              </button>
            </div>

            {/* Quick Quote CTA with shadcn UI Button */}
            <div className="hidden sm:block">
              <Button
                variant="brass"
                size="sm"
                onClick={onOpenConsultation}
                className="gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t("navQuote")}</span>
              </Button>
            </div>
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
            className="fixed inset-0 z-[100] bg-ivory flex flex-col justify-between p-8"
          >
            <div className="flex justify-between items-center border-b border-wood-border/40 pb-6">
              <div className="flex flex-col items-start">
                <span className="font-sangbleu-sunrise font-light text-2xl text-charcoal tracking-[0.2em]">
                  HE<span className="text-brass">A</span>VEN
                </span>
                <span className="font-hanken text-[0.55rem] text-brass-gold tracking-[0.32em] uppercase font-bold mt-0.5">
                  FURNITURE MART
                </span>
              </div>
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Mobile Menu"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <nav className="flex flex-col gap-6 py-12">
              <a
                href="#collections"
                onClick={() => setMobileMenuOpen(false)}
                className="font-sangbleu-sunrise font-light text-4xl text-charcoal hover:text-brass-gold transition-colors"
              >
                {t("navShop")}
              </a>
              <a
                href="#bespoke"
                onClick={() => setMobileMenuOpen(false)}
                className="font-sangbleu-sunrise font-light text-4xl text-charcoal hover:text-brass-gold transition-colors"
              >
                {t("navBespoke")}
              </a>
              <a
                href="#why-heaven"
                onClick={() => setMobileMenuOpen(false)}
                className="font-sangbleu-sunrise font-light text-4xl text-charcoal hover:text-brass-gold transition-colors"
              >
                {t("navWhyHeaven")}
              </a>
            </nav>

            <div className="space-y-4 pt-6 border-t border-wood-border/40">
              <Button
                variant="default"
                size="lg"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full"
              >
                {t("heroCtaPrimary")}
              </Button>

              <div className="flex justify-between items-center text-xs font-medium text-slate-gray">
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
