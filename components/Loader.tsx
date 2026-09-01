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
        // Fallback default calculation based on screen height
        setTargetDeltaY(-(window.innerHeight / 2 - (isMobile ? 32 : 44)));
      }
    };

    calculateDelta();
    window.addEventListener("resize", calculateDelta);

    // Timeline: 0.3s hold centered -> 1.5s smooth transition to header position -> 0.4s fade overlay out
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
          className="fixed inset-0 z-[9999] bg-[#FAF7F2] flex items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          {/* THE SINGLE ANIMATING HEAVEN LOGO ELEMENT */}
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
            <h1 className="font-bodoni text-3xl sm:text-4xl lg:text-5xl tracking-normal text-[#382C24] block uppercase leading-none">
              HEAVEN
            </h1>
            <span className="font-hanken text-[9px] sm:text-[10px] tracking-[0.25em] text-[#A88849] uppercase mt-1 font-bold">
              {t("brandSubtitle")}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
