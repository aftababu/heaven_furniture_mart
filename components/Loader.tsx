"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export const Loader: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [targetDeltaY, setTargetDeltaY] = useState<number>(-350);
  const [initialScale, setInitialScale] = useState<number>(2.4);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const calculateDelta = () => {
      if (typeof window === "undefined") return;
      const isMobile = window.innerWidth < 640;
      setInitialScale(isMobile ? 1.7 : 2.4);

      const targetEl = document.getElementById("header-logo-anchor");
      if (targetEl) {
        const targetRect = targetEl.getBoundingClientRect();
        const targetCenterY = targetRect.top + targetRect.height / 2;
        const screenCenterY = window.innerHeight / 2;
        setTargetDeltaY(targetCenterY - screenCenterY);
      } else {
        setTargetDeltaY(-(window.innerHeight / 2 - (isMobile ? 40 : 48)));
      }
    };

    calculateDelta();
    window.addEventListener("resize", calculateDelta);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2200);

    return () => {
      window.removeEventListener("resize", calculateDelta);
      clearTimeout(timer);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeOut" } }}
          className="fixed inset-0 z-[9999] bg-ivory flex items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          {/* PURE LOGO ANIMATION (ZERO BOX, ZERO CONTAINER BACKGROUND) */}
          <motion.div
            initial={{ y: 0, scale: initialScale, opacity: 0 }}
            animate={{
              y: [0, 0, targetDeltaY],
              scale: [initialScale, initialScale, 1.0],
              opacity: [0, 1, 1],
            }}
            transition={{
              duration: 1.8,
              times: [0, 0.2, 1],
              ease: [0.65, 0, 0.35, 1],
            }}
            className="text-center flex flex-col items-center justify-center transform-gpu origin-center"
          >
            <h1 className="font-sangbleu-sunrise font-normal not-italic uppercase text-2xl sm:text-3xl lg:text-[2.2rem] tracking-[0.16em] text-charcoal leading-none block">
              HE<span className="text-brass">A</span>VEN
            </h1>
            <span className="font-hanken text-[0.56rem] sm:text-[0.62rem] tracking-[0.34em] font-bold text-brass uppercase mt-1.5 leading-none block">
              {t("brandSubtitle")}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
