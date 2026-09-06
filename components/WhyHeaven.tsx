"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
interface SlideData {
  num: string;
  tagKey: string;
  titleKey: string;
  descKey: string;
  img: string;
}

const SLIDES: SlideData[] = [
  {
    num: "01",
    tagKey: "whSlide1Tag",
    titleKey: "whSlide1Title",
    descKey: "whSlide1Desc",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788443692/hackathon/design_dtfmyh.webp",
  },
  {
    num: "02",
    tagKey: "whSlide2Tag",
    titleKey: "whSlide2Title",
    descKey: "whSlide2Desc",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788445505/hackathon/craft_alk54q.webp",
  },
  {
    num: "03",
    tagKey: "whSlide3Tag",
    titleKey: "whSlide3Title",
    descKey: "whSlide3Desc",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788445505/hackathon/wood_sumsjx.webp",
  },
  {
    num: "04",
    tagKey: "whSlide4Tag",
    titleKey: "whSlide4Title",
    descKey: "whSlide4Desc",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788443691/hackathon/shop_is53xd.webp",
  },
  {
    num: "05",
    tagKey: "whSlide5Tag",
    titleKey: "whSlide5Title",
    descKey: "whSlide5Desc",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788445504/hackathon/delivery_yeymeb.webp",
  },
  {
    num: "06",
    tagKey: "whSlide6Tag",
    titleKey: "whSlide6Title",
    descKey: "whSlide6Desc",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788445504/hackathon/payment_ttc5hl.webp",
  },
  {
    num: "07",
    tagKey: "whSlide7Tag",
    titleKey: "whSlide7Title",
    descKey: "whSlide7Desc",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788445504/hackathon/card4.1_usa9dm.webp",
  },
];

const EASE_LUXURY = [0.22, 1, 0.36, 1] as const;

// Luxury Refined Editorial Motion Variants
const imageVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    scale: 1.03,
    x: dir > 0 ? 12 : -12,
    filter: "blur(4px)",
  }),
  center: {
    opacity: 1,
    scale: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: EASE_LUXURY,
    },
  },
  exit: (dir: number) => ({
    opacity: 0,
    scale: 0.98,
    x: dir > 0 ? -12 : 12,
    filter: "blur(4px)",
    transition: {
      duration: 0.5,
      ease: EASE_LUXURY,
    },
  }),
};

const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: EASE_LUXURY,
    },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: EASE_LUXURY,
    },
  },
};

interface WhyHeavenProps {
  onOpenConsultation?: () => void;
}

export const WhyHeaven: React.FC<WhyHeavenProps> = ({ onOpenConsultation }) => {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const prevStageRef = useRef(0);
  const activeStageRef = useRef(activeStage);
  const [direction, setDirection] = useState<1 | -1>(1);
  const isLockedRef = useRef(false);
  const prevScrollRef = useRef(0);

  // Gesture refs
  const wheelAccumulator = useRef(0);
  const lastWheelTime = useRef(0);
  const prevDeltaY = useRef(0);
  const gestureLocked = useRef(false);
  const touchStartY = useRef(0);
  const touchLocked = useRef(false);
  const unlockTimeRef = useRef(0);
  const exitAccumulator = useRef(0);

  useEffect(() => {
    activeStageRef.current = activeStage;
  }, [activeStage]);

  // Direction tracker for directional 8px movement
  useEffect(() => {
    if (activeStage !== prevStageRef.current) {
      setDirection(activeStage > prevStageRef.current ? 1 : -1);
      prevStageRef.current = activeStage;
    }
  }, [activeStage]);

  // Image preload
  useEffect(() => {
    if (typeof window === "undefined") return;
    SLIDES.forEach((slide) => {
      const img = new window.Image();
      img.src = slide.img;
    });
  }, []);

  const lockSection = useCallback((targetY: number, stage: number) => {
    const lenis = (window as any).lenis;
    if (!lenis || isLockedRef.current) return;

    isLockedRef.current = true;
    setActiveStage(stage);

    // Kill momentum and snap perfectly
    lenis.scrollTo(targetY, { immediate: true, force: true });
    lenis.stop();
  }, []);

  const unlockSection = useCallback(() => {
    const lenis = (window as any).lenis;
    if (!lenis || !isLockedRef.current) return;

    isLockedRef.current = false;
    unlockTimeRef.current = Date.now();
    lenis.start();
  }, []);

  // Ensure Lenis isn't frozen if the component unmounts
  useEffect(() => {
    return () => {
      if (isLockedRef.current) {
        const lenis = (window as any).lenis;
        if (lenis) lenis.start();
      }
    };
  }, []);

  // 1. Lenis Boundary Trapping
  useEffect(() => {
    const lenis = (window as any).lenis;
    if (!lenis) return;

    prevScrollRef.current = window.scrollY;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const prevScroll = prevScrollRef.current;
      prevScrollRef.current = scrollY;

      if (isLockedRef.current || Date.now() - unlockTimeRef.current < 800)
        return;

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const absoluteTop = scrollY + rect.top;
      const sectionTop = Math.round(absoluteTop);
      const currentScroll = Math.round(scrollY);
      const prev = Math.round(prevScroll);

      // Entry from Top (scrolling down into it)
      if (prev < sectionTop && currentScroll >= sectionTop) {
        lockSection(sectionTop, 0);
      }
      // Entry from Bottom (scrolling up into it)
      else if (prev > sectionTop && currentScroll <= sectionTop) {
        lockSection(sectionTop, SLIDES.length - 1);
      }
    };

    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [lockSection]);

  // 2. Strict Gesture Pager Handlers
  useEffect(() => {
    const processGesture = (dir: 1 | -1) => {
      const current = activeStageRef.current;
      if (dir === 1 && current < SLIDES.length - 1) {
        setActiveStage((prev) => prev + 1);
      } else if (dir === -1 && current > 0) {
        setActiveStage((prev) => prev - 1);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isLockedRef.current) return;

      const currentStage = activeStageRef.current;
      const now = Date.now();
      const timeDelta = now - lastWheelTime.current;
      const absCurrent = Math.abs(e.deltaY);
      const absPrev = Math.abs(prevDeltaY.current);

      let isNewGesture = false;

      // Detect new physical gesture via silence OR sudden acceleration spike
      if (timeDelta > 250) {
        isNewGesture = true;
      } else if (absCurrent > absPrev * 2 && absCurrent > 15) {
        isNewGesture = true;
      }

      if (isNewGesture) {
        gestureLocked.current = false;
        wheelAccumulator.current = 0;
      }

      lastWheelTime.current = now;
      prevDeltaY.current = e.deltaY;

      // Check Exit Boundaries BEFORE preventing default
      if (!gestureLocked.current) {
        if (currentStage === 0 && e.deltaY < 0) {
          unlockSection();
          return; // Allow native scroll up
        }
        if (currentStage === SLIDES.length - 1 && e.deltaY > 0) {
          unlockSection();
          return; // Allow native scroll down
        }
      }

      // We are trapped. Own the gesture.
      e.preventDefault();

      // --- ESCAPE HATCH FOR FRUSTRATED MOUSE WHEEL USERS ---
      if (currentStage === SLIDES.length - 1 && e.deltaY > 0) {
        exitAccumulator.current += e.deltaY;
        if (exitAccumulator.current > 500) {
          unlockSection();
          exitAccumulator.current = 0;
          return;
        }
      } else if (currentStage === 0 && e.deltaY < 0) {
        exitAccumulator.current += e.deltaY;
        if (exitAccumulator.current < -500) {
          unlockSection();
          exitAccumulator.current = 0;
          return;
        }
      } else {
        exitAccumulator.current = 0;
      }

      if (gestureLocked.current) return;

      wheelAccumulator.current += e.deltaY;

      // 40px accumulator threshold to ignore tiny accidental trackpad nudges
      if (wheelAccumulator.current < -40) {
        if (currentStage > 0) {
          processGesture(-1);
          gestureLocked.current = true;
        } else {
          unlockSection();
        }
        wheelAccumulator.current = 0;
      } else if (wheelAccumulator.current > 40) {
        if (currentStage < SLIDES.length - 1) {
          processGesture(1);
          gestureLocked.current = true;
        } else {
          unlockSection();
        }
        wheelAccumulator.current = 0;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!isLockedRef.current) return;
      touchStartY.current = e.touches[0].clientY;
      // Re-arm immediately on new physical touch
      touchLocked.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isLockedRef.current) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchY; // positive = swipe up on screen (scroll down page)

      if (!touchLocked.current) {
        if (activeStageRef.current === 0 && deltaY < 0) {
          unlockSection();
          return; // Allow native touch scroll up
        }
        if (activeStageRef.current === SLIDES.length - 1 && deltaY > 0) {
          unlockSection();
          return; // Allow native touch scroll down
        }
      }

      // Trap the touch
      e.preventDefault();

      if (touchLocked.current) return;

      if (Math.abs(deltaY) > 40) {
        processGesture(deltaY > 0 ? 1 : -1);
        touchLocked.current = true; // Lock until next touchstart
      }
    };

    // Use passive: false to allow e.preventDefault()
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [unlockSection]);

  const goToStage = useCallback((index: number) => {
    const clampedIndex = Math.max(0, Math.min(SLIDES.length - 1, index));
    setActiveStage(clampedIndex);
  }, []);

  const current = SLIDES[activeStage] || SLIDES[0];
  const totalCount = String(SLIDES.length).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      id="why-heaven"
      className="relative h-[100dvh] w-full bg-primary-bg text-text z-30 overflow-hidden select-none py-5 sm:py-7 lg:py-8 flex flex-col justify-between pointer-events-auto"
    >
      <div className="h-full w-full max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-between">
        {/* ================= TOP BAR ================= */}
        <div className="flex items-center justify-between border-b border-border/70 pb-2.5 sm:pb-3">
          <span className="text-[0.68rem] sm:text-xs font-hanken font-semibold uppercase tracking-[0.25em] text-accent">
            {t(current.tagKey)}
          </span>

          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-hanken font-medium text-text-muted">
            <span className="text-text font-semibold tracking-wider">
              {current.num}
            </span>
            <span className="text-border">/</span>
            <span className="text-text-muted/60 font-normal tracking-wider">
              {totalCount}
            </span>
          </div>
        </div>

        {/* ================= CENTER LARGER STATIC IMAGE CONTAINER ================= */}
        <div className="relative w-full my-auto flex items-center justify-center py-2 sm:py-3">
          {/* Enlarged Static Image Frame Container */}
          <div className="relative w-full max-w-6xl h-[46vh] sm:h-[54vh] lg:h-[58vh] overflow-hidden bg-secondary-bg">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={current.num}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={current.img}
                  alt={t(current.titleKey)}
                  fill
                  sizes="(max-width: 1024px) 96vw, 1400px"
                  className="object-cover object-center w-full h-full"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ================= BOTTOM NARRATIVE & STAGGERED TEXT ================= */}
        <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
          {/* Left Staggered Narrative Deck */}
          <div className="max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.num}
                variants={textContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-1.5"
              >
                <motion.h3
                  variants={textItemVariants}
                  className="font-sangbleu-sunrise text-2xl sm:text-3xl lg:text-[2.6rem] text-text font-normal leading-tight tracking-tight"
                >
                  {t(current.titleKey)}
                </motion.h3>

                <motion.p
                  variants={textItemVariants}
                  className="font-hanken text-xs sm:text-sm text-text-muted font-normal leading-relaxed max-w-lg"
                >
                  {t(current.descKey)}
                </motion.p>

                {onOpenConsultation && (
                  <motion.div variants={textItemVariants} className="pt-1.5">
                    <motion.button
                      whileHover={{ translateX: 10 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        duration: 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onClick={onOpenConsultation}
                      className="group inline-flex items-center gap-1.5 text-[0.68rem] sm:text-[0.72rem] font-hanken font-bold uppercase tracking-[0.22em] text-text hover:text-accent transition-colors border-b border-text/40 hover:border-accent pb-0.5 cursor-pointer"
                    >
                      <span>
                        {lang === "bn"
                          ? "পরামর্শের জন্য আবেদন"
                          : "INQUIRE BESPOKE"}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-text group-hover:text-accent transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Horizontal Chapter Bar Selector */}
          <div className="flex items-center gap-3 sm:gap-5 self-start sm:self-end pb-1 overflow-x-auto max-w-full">
            {SLIDES.map((s, idx) => {
              const isActive = idx === activeStage;
              return (
                <button
                  key={s.num}
                  onClick={() => goToStage(idx)}
                  className="group flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer py-1"
                  aria-label={`Go to chapter ${s.num}`}
                >
                  <span
                    className={`font-hanken text-[0.7rem] sm:text-[0.75rem] transition-colors duration-200 ${
                      isActive
                        ? "text-text font-bold"
                        : "text-text-muted/60 group-hover:text-text/80"
                    }`}
                  >
                    {s.num}
                  </span>
                  <span
                    className={`h-[2px] transition-all duration-300 ${
                      isActive
                        ? "w-8 sm:w-10 bg-accent"
                        : "w-8 sm:w-10 bg-border group-hover:bg-text-muted/40"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export const WhyHeavenFlipCard = WhyHeaven;
export default WhyHeaven;
