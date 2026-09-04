"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsSticky(currentScrollY > 80);

      if (currentScrollY <= 80) {
        // At the very top of the page (Hero)
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 8) {
        // Scrolling DOWN -> Hide header smoothly everywhere
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 8) {
        // Scrolling UP -> Reveal header smoothly everywhere
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`w-full z-50 h-16 sm:h-18 flex items-center overflow-visible transition-all duration-500 ease-out ${
          !isVisible
            ? "fixed top-0 left-0 -translate-y-full opacity-0 pointer-events-none"
            : isSticky
            ? "fixed top-0 left-0 bg-primary-bg/90 backdrop-blur-md border-b border-border/40 shadow-sm translate-y-0 opacity-100"
            : "absolute top-0 left-0 bg-transparent border-b border-transparent shadow-none translate-y-0 opacity-100"
        }`}
      >
        <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-8 lg:px-12 flex justify-between items-center relative h-full overflow-visible">
          {/* Desktop Left Nav Links */}
          <nav className="hidden md:flex gap-4 md:gap-5 lg:gap-8 items-center">
            <a
              href="#collections"
              className="font-hanken text-[0.68rem] md:text-[0.7rem] lg:text-[0.72rem] tracking-[0.16em] md:tracking-[0.18em] lg:tracking-[0.2em] text-text-muted hover:text-accent transition-colors uppercase font-semibold focus-visible:outline-2 focus-visible:outline-accent"
            >
              {t("navShop")}
            </a>
            <a
              href="#bespoke"
              className="font-hanken text-[0.68rem] md:text-[0.7rem] lg:text-[0.72rem] tracking-[0.16em] md:tracking-[0.18em] lg:tracking-[0.2em] text-text-muted hover:text-accent transition-colors uppercase font-semibold focus-visible:outline-2 focus-visible:outline-accent"
            >
              {t("navBespoke")}
            </a>
            <a
              href="#why-heaven"
              className="font-hanken text-[0.68rem] md:text-[0.7rem] lg:text-[0.72rem] tracking-[0.16em] md:tracking-[0.18em] lg:tracking-[0.2em] text-text-muted hover:text-accent transition-colors uppercase font-semibold focus-visible:outline-2 focus-visible:outline-accent"
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
              aria-label={t("ariaOpenMenu")}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>

          {/* BESPOKE HANGING ATELIER TAB LOGO */}
          <CenterLogoTab />

          {/* Right Controls Utility Cluster */}
          <div className="flex gap-3 sm:gap-4 lg:gap-6 items-center">
            {/* Language Switcher */}
            <div className="flex items-center text-[0.65rem] md:text-[0.68rem] tracking-[0.18em] md:tracking-[0.22em] font-hanken uppercase select-none">
              <button
                onClick={() => setLang("en")}
                className={`transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent ${
                  lang === "en"
                    ? "text-text font-semibold"
                    : "text-text-muted font-normal hover:text-text"
                }`}
              >
                EN
              </button>
              <span className="text-border mx-[1px] md:mx-1 select-none font-normal">
                /
              </span>
              <button
                onClick={() => setLang("bn")}
                className={`transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent ${
                  lang === "bn"
                    ? "text-text font-semibold"
                    : "text-text-muted font-normal hover:text-text"
                }`}
              >
                বাংলা
              </button>
            </div>

            {/* Quick Quote CTA */}
            <div className="hidden sm:block">
              <Button
                variant="textGradient"
                size="sm"
                onClick={onOpenConsultation}
                className="gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-accent" />
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
            className="fixed inset-0 z-[100] bg-primary-bg flex flex-col justify-between p-8"
          >
            <div className="flex justify-between items-center border-b border-border/40 pb-6">
              <div className="flex flex-col items-start">
                <span className="font-sangbleu-sunrise font-light text-2xl text-text tracking-[0.2em]">
                  HE<span className="text-accent">A</span>VEN
                </span>
                <span className="font-hanken text-[0.55rem] text-accent tracking-[0.32em] uppercase font-bold mt-0.5">
                  {t("brandSubtitle")}
                </span>
              </div>
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                aria-label={t("ariaCloseMenu")}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <nav className="flex flex-col gap-6 py-12">
              <a
                href="#collections"
                onClick={() => setMobileMenuOpen(false)}
                className="font-sangbleu-sunrise font-light text-4xl text-text hover:text-accent transition-colors"
              >
                {t("navShop")}
              </a>
              <a
                href="#bespoke"
                onClick={() => setMobileMenuOpen(false)}
                className="font-sangbleu-sunrise font-light text-4xl text-text hover:text-accent transition-colors"
              >
                {t("navBespoke")}
              </a>
              <a
                href="#why-heaven"
                onClick={() => setMobileMenuOpen(false)}
                className="font-sangbleu-sunrise font-light text-4xl text-text hover:text-accent transition-colors"
              >
                {t("navWhyHeaven")}
              </a>
            </nav>

            <div className="space-y-4 pt-6 border-t border-border/40">
              <Button
                variant="gradient"
                size="lg"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full"
              >
                {t("heroCtaPrimary")}
              </Button>

              <div className="flex justify-between items-center text-xs font-medium text-text-muted">
                <span>{t("navAddressShort")}</span>
                <span>+880 1960-481983</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
