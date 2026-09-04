"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SlideData {
  num: string;
  tagEn: string;
  tagBn: string;
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  img: string;
  frameClass: string;
}

const SLIDES: SlideData[] = [
  {
    num: "01",
    tagEn: "INITIAL CONSULTATION",
    tagBn: "পরামর্শ ও পরিকল্পনা",
    titleEn: "Free design consultation",
    titleBn: "ফ্রি ডিজাইন পরামর্শ",
    descEn:
      "Work directly with our expert interior architects to bring your dream living space vision to life.",
    descBn:
      "আপনার স্বপ্নের ঘর সাজাতে অভিজ্ঞ ফার্নিচার ডিজাইনারের সরাসরি ফ্রি পরামর্শ পান।",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788443692/hackathon/design_dtfmyh.webp",
    frameClass: "max-w-4xl h-[48vh] sm:h-[54vh] ml-auto mr-0 sm:mr-6",
  },
  {
    num: "02",
    tagEn: "BESPOKE ARCHITECTURE",
    tagBn: "কাস্টম ফিটিং",
    titleEn: "Fully bespoke — built to your space, not mass-produced",
    titleBn:
      "সম্পূর্ণ কাস্টম — প্রতিটি ফার্নিচার ঘরের মাপে তৈরি, মাস-প্রোডিউসড নয়",
    descEn:
      "Every piece is custom-tailored to your room's exact architectural dimensions and personal aesthetic.",
    descBn:
      "ঘরের নিখুঁত মাপে এবং আপনার নিজস্ব স্টাইল ও স্বাদ অনুযায়ী তৈরি সেরা কাস্টম ফার্নিচার।",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788445505/hackathon/craft_alk54q.webp",
    frameClass: "max-w-3xl h-[52vh] sm:h-[58vh] mr-auto ml-0 sm:ml-4",
  },
  {
    num: "03",
    tagEn: "MATERIALITY & TIMBER",
    tagBn: "কায়িক কারিগরি",
    titleEn: "Premium wood & materials, skilled in-house craftsmanship",
    titleBn: "প্রিমিয়াম কাঠ ও উপাদান, অভিজ্ঞ কারিগরদের দক্ষ হাত",
    descEn:
      "Seasoned solid teak, mahogany, and anti-warp engineered wood with hand-polished luxury finishes.",
    descBn:
      "উন্নত মেহগনি ও সেগুন কাঠ এবং ইন-হাউজ দক্ষ কারিগরদের টেকসই হাতের নিখুঁত কাজ।",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788445505/hackathon/wood_sumsjx.webp",
    frameClass: "max-w-3xl h-[54vh] sm:h-[60vh] mx-auto",
  },
  {
    num: "04",
    tagEn: "THE PHYSICAL SHOWROOM",
    tagBn: "শোরুম ভিজিট",
    titleEn: "Large physical showroom in Chattogram (Agrabad)",
    titleBn: "চট্টগ্রামের আগ্রাবাদে সুবিশাল নিজস্ব শোরুম",
    descEn:
      "Touch, feel, and experience our handcrafted luxury furniture collections in person at Agrabad Access Road.",
    descBn:
      "আগ্রাবাদ এক্সেস রোডে সরাসরি শোরুম ভিজিট করে ফার্নিচারের ফিনিশিং ও কোয়ালিটি স্বচক্ষে দেখুন।",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788443691/hackathon/shop_is53xd.webp",
    frameClass: "max-w-5xl h-[46vh] sm:h-[52vh] mx-auto",
  },
  {
    num: "05",
    tagEn: "WHITE-GLOVE SERVICE",
    tagBn: "হোম সার্ভিস",
    titleEn: "Delivery & installation included",
    titleBn: "ডেলিভারি ও প্রফেশনাল ফিটিং ইনক্লুডেড",
    descEn:
      "Seamless white-glove delivery and precision setup directly at your doorstep by our skilled team.",
    descBn:
      "ঝামেলাহীন হোম ডেলিভারি এবং অভিজ্ঞ ফিটিং টিম দিয়ে নিখুঁত ইনস্টলেশন নিশ্চয়তা।",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788445504/hackathon/delivery_yeymeb.webp",
    frameClass: "max-w-4xl h-[49vh] sm:h-[55vh] ml-auto mr-0 sm:mr-8",
  },
  {
    num: "06",
    tagEn: "FINANCIAL COMFORT",
    tagBn: "সহজ পেমেন্ট",
    titleEn: "Easy payment options",
    titleBn: "সহজ ও সুবিধাজনক পেমেন্ট অপশন",
    descEn:
      "Flexible milestone payment plans and installment structures tailored for hassle-free home furnishing.",
    descBn:
      "বাজেট ফ্রেন্ডলি কিস্তি ও পার্ট পেমেন্ট সুবিধায় নিজের পছন্দমতো ঘর সাজান স্বাচ্ছন্দে।",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788445504/hackathon/payment_ttc5hl.webp",
    frameClass: "max-w-3xl h-[48vh] sm:h-[54vh] mr-auto ml-0 sm:ml-8",
  },
  {
    num: "07",
    tagEn: "ACCREDITED HERITAGE",
    tagBn: "বিশ্বস্ততা",
    titleEn: "Trusted by hundreds of happy homeowners",
    titleBn: "শত শত সন্তুষ্ট গৃহমালিকের বিশ্বস্ত পছন্দ",
    descEn:
      "Years of proven artisan excellence, structural warranty, and delighted homeowners across Bangladesh.",
    descBn:
      "চট্টগ্রামজুড়ে শত শত সন্তুষ্ট কাস্টমারের দীর্ঘদিনের বিশ্বস্ততা ও গুণগত মানের সেরা গ্যারান্টি।",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788445504/hackathon/card4.1_usa9dm.webp",
    frameClass: "max-w-4xl h-[52vh] sm:h-[58vh] mx-auto",
  },
];

interface WhyHeavenProps {
  onOpenConsultation?: () => void;
}

export const WhyHeavenFlipCard: React.FC<WhyHeavenProps> = ({
  onOpenConsultation,
}) => {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const [activeStage, setActiveStage] = useState(0);

  // Gesture stream and lock synchronization refs
  const activeStageRef = useRef(0);
  const isGestureActiveRef = useRef(false);
  const quietTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchSwipedRef = useRef(false);

  useEffect(() => {
    activeStageRef.current = activeStage;
  }, [activeStage]);

  // 1. IN-MEMORY IMAGE PRELOAD (Clean background caching)
  useEffect(() => {
    if (typeof window === "undefined") return;
    SLIDES.forEach((slide) => {
      const img = new window.Image();
      img.src = slide.img;
    });
  }, []);

  // 2. HEADER SUPPRESSION (Hides only while inside section, restores cleanly)
  useEffect(() => {
    const getHeaders = () =>
      document.querySelectorAll<HTMLElement>("header, nav, [data-navbar]");

    const hideHeader = () => {
      getHeaders().forEach((h) => {
        h.style.setProperty("transform", "translateY(-120%)", "important");
        h.style.setProperty("opacity", "0", "important");
        h.style.setProperty("pointer-events", "none", "important");
        h.style.setProperty(
          "transition",
          "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease",
          "important",
        );
      });
    };

    const restoreHeader = () => {
      getHeaders().forEach((h) => {
        h.style.setProperty("transform", "translateY(0)", "important");
        h.style.setProperty("opacity", "1", "important");
        h.style.setProperty("pointer-events", "auto", "important");
      });
    };

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          hideHeader();
        } else {
          restoreHeader();
        }
      },
      { threshold: [0.1, 0.3, 0.6] },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      restoreHeader();
    };
  }, []);

  // 3. DIRECT CLICK STAGE JUMP
  const goToStage = useCallback((index: number) => {
    if (index === activeStageRef.current) return;
    if (quietTimerRef.current) clearTimeout(quietTimerRef.current);
    isGestureActiveRef.current = true;
    activeStageRef.current = index;
    setActiveStage(index);

    quietTimerRef.current = setTimeout(() => {
      isGestureActiveRef.current = false;
    }, 300);
  }, []);

  // 4. STREAM-LOCKED PHYSICAL GESTURE CONTROLLER
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // The section is engaged when occupying the viewport
      const isVisibleInViewport = rect.top < vh && rect.bottom > 0;
      if (!isVisibleInViewport) return;

      const deltaY = e.deltaY;
      if (Math.abs(deltaY) < 10) return; // Filter trackpad micro-jitter

      const isDown = deltaY > 0;
      const isUp = deltaY < 0;
      const currentIdx = activeStageRef.current;
      const lastIndex = SLIDES.length - 1;

      // Check if user is at boundary and scrolling away to an adjacent section
      const isLeavingDownward = isDown && currentIdx === lastIndex;
      const isLeavingUpward = isUp && currentIdx === 0;

      // While engaged inside stages 01 through 07, section is locked to viewport
      const isInsideSectionFlow =
        (rect.top <= 80 && rect.bottom >= vh * 0.4) ||
        (currentIdx > 0 && currentIdx < lastIndex);

      if (!isInsideSectionFlow) return;

      // BOUNDARY EXIT: Release native browser scroll cleanly
      if (isLeavingDownward && !isGestureActiveRef.current) {
        return; // Natural downward scroll to next section
      }
      if (isLeavingUpward && !isGestureActiveRef.current) {
        return; // Natural upward scroll to previous section
      }

      // SECTION IS LOCKED: Intercept all wheel events to eliminate native window movement
      e.preventDefault();

      // If a physical gesture is in flight, consume every trailing event of the momentum burst
      if (isGestureActiveRef.current) {
        if (quietTimerRef.current) clearTimeout(quietTimerRef.current);
        // Trackpad silence detection: lock clears only after hand stops and events pause
        quietTimerRef.current = setTimeout(() => {
          isGestureActiveRef.current = false;
        }, 180);
        return;
      }

      // First qualifying event of an intentional physical gesture: advance/retreat exactly ONE stage
      if (isDown && currentIdx < lastIndex) {
        isGestureActiveRef.current = true;
        const next = currentIdx + 1;
        activeStageRef.current = next;
        setActiveStage(next);
      } else if (isUp && currentIdx > 0) {
        isGestureActiveRef.current = true;
        const prev = currentIdx - 1;
        activeStageRef.current = prev;
        setActiveStage(prev);
      }

      if (quietTimerRef.current) clearTimeout(quietTimerRef.current);
      quietTimerRef.current = setTimeout(() => {
        isGestureActiveRef.current = false;
      }, 180);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (quietTimerRef.current) clearTimeout(quietTimerRef.current);
    };
  }, []);

  // 5. TOUCH GESTURE CONTROLLER (One Swipe = Exactly One Stage, Re-arms on Finger Lift)
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
      touchSwipedRef.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartYRef.current === null) return;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const isVisible = rect.top < vh && rect.bottom > 0;
      if (!isVisible) return;

      const currentIdx = activeStageRef.current;
      const lastIndex = SLIDES.length - 1;
      const currentY = e.touches[0].clientY;
      const diffY = touchStartYRef.current - currentY; // Positive = Swipe Up (scroll down)

      const isDown = diffY > 0;
      const isUp = diffY < 0;

      const isInsideFlow =
        (rect.top <= 80 && rect.bottom >= vh * 0.4) ||
        (currentIdx > 0 && currentIdx < lastIndex);

      if (!isInsideFlow) return;

      // Allow natural boundary exit
      if (isDown && currentIdx === lastIndex && !touchSwipedRef.current) return;
      if (isUp && currentIdx === 0 && !touchSwipedRef.current) return;

      // Intercept touch within section stages
      if (e.cancelable) e.preventDefault();

      // If this swipe stroke already triggered a stage, consume the rest of the drag
      if (touchSwipedRef.current) return;

      if (Math.abs(diffY) > 28) {
        if (isDown && currentIdx < lastIndex) {
          touchSwipedRef.current = true;
          const next = currentIdx + 1;
          activeStageRef.current = next;
          setActiveStage(next);
        } else if (isUp && currentIdx > 0) {
          touchSwipedRef.current = true;
          const prev = currentIdx - 1;
          activeStageRef.current = prev;
          setActiveStage(prev);
        }
      }
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = null;
      touchSwipedRef.current = false; // Strictly re-arms only on finger lift
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  const current = SLIDES[activeStage] || SLIDES[0];
  const totalCount = String(SLIDES.length).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      id="why-heaven"
      className="relative h-screen w-full bg-[var(--color-primary-bg,#f6f4ee)] text-[var(--color-text,#4a3b31)] overflow-hidden select-none z-40"
    >
      {/* 100vh EDITORIAL COMPOSITION FRAME */}
      <div className="h-full w-full max-w-[1580px] mx-auto px-6 sm:px-12 lg:px-16 py-6 sm:py-9 flex flex-col justify-between">
        {/* ==============================================================
             TOP BAR: Quiet Luxury Editorial Heading
        ============================================================== */}
        <div className="flex items-baseline justify-between border-b border-[var(--color-border,#d6cfc3)]/70 pb-3">
          <div className="flex items-center gap-3">
            <span className="text-[0.68rem] sm:text-xs font-sans font-semibold uppercase tracking-[0.26em] text-[var(--color-accent,#c9a227)]">
              {lang === "bn" ? current.tagBn : current.tagEn}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-serif text-sm sm:text-base text-[var(--color-text,#4a3b31)] tracking-widest font-normal">
              {current.num}
            </span>
            <span className="text-[var(--color-border,#d6cfc3)] text-xs">
              /
            </span>
            <span className="font-serif text-sm sm:text-base text-[var(--color-text,#4a3b31)]/50 tracking-widest font-light">
              {totalCount}
            </span>
          </div>
        </div>

        {/* ==============================================================
             CENTER: Persistent Multi-Layer Canvas (Zero Delay, No Jump)
        ============================================================== */}
        <div className="relative w-full my-auto flex items-center justify-center">
          <motion.div
            layout
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full overflow-hidden rounded-xl bg-[var(--color-secondary-bg,#f4ede6)] border border-[var(--color-border,#d6cfc3)] shadow-[0_20px_50px_-20px_rgba(74,59,49,0.12)] transition-all ${current.frameClass}`}
          >
            {/* All slides mounted simultaneously in GPU memory to eliminate image loading lag */}
            <div className="relative w-full h-full">
              {SLIDES.map((slide, idx) => {
                const isActive = idx === activeStage;
                return (
                  <motion.div
                    key={slide.num}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 1.035,
                      x: isActive ? 0 : idx < activeStage ? -12 : 12,
                      zIndex: isActive ? 2 : 1,
                    }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ willChange: "opacity, transform" }}
                  >
                    <Image
                      src={slide.img}
                      alt={lang === "bn" ? slide.titleBn : slide.titleEn}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 1024px) 90vw, 1200px"
                      className="object-cover object-center w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-text,#4a3b31)]/15 via-transparent to-transparent pointer-events-none" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ==============================================================
             BOTTOM: Editorial Information & Subtle Hairline Index
        ============================================================== */}
        <div className="border-t border-[var(--color-border,#d6cfc3)]/70 pt-5 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          {/* Narrative Typography Deck */}
          <div className="max-w-xl sm:max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.num}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-1.5"
              >
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-[2.2rem] text-[var(--color-text,#4a3b31)] font-normal leading-snug tracking-tight">
                  {lang === "bn" ? current.titleBn : current.titleEn}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[var(--color-text,#4a3b31)]/75 font-normal leading-relaxed max-w-lg">
                  {lang === "bn" ? current.descBn : current.descEn}
                </p>

                {onOpenConsultation && (
                  <div className="pt-2">
                    <button
                      onClick={onOpenConsultation}
                      className="group inline-flex items-center gap-2 text-[0.68rem] font-sans font-semibold uppercase tracking-[0.2em] text-[var(--color-text,#4a3b31)] hover:text-[var(--color-accent,#c9a227)] transition-colors border-b border-[var(--color-border,#d6cfc3)] hover:border-[var(--color-accent,#c9a227)] pb-0.5 cursor-pointer"
                    >
                      <span>
                        {lang === "bn"
                          ? "পরামর্শের জন্য আবেদন"
                          : "Inquire Bespoke"}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[var(--color-accent,#c9a227)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Discreet Horizontal Chapter Index */}
          <div className="flex items-center gap-3 sm:gap-4 self-start sm:self-end pb-1 overflow-x-auto max-w-full">
            {SLIDES.map((s, idx) => {
              const isActive = idx === activeStage;
              return (
                <button
                  key={s.num}
                  onClick={() => goToStage(idx)}
                  className="group flex flex-col items-start gap-1 focus:outline-none cursor-pointer py-1"
                  aria-label={`Go to chapter ${s.num}`}
                >
                  <span
                    className={`font-sans text-[0.62rem] tracking-wider transition-colors duration-300 ${
                      isActive
                        ? "text-[var(--color-text,#4a3b31)] font-bold"
                        : "text-[var(--color-text,#4a3b31)]/35 group-hover:text-[var(--color-text,#4a3b31)]/70"
                    }`}
                  >
                    {s.num}
                  </span>
                  <span
                    className={`h-[1.5px] transition-all duration-400 ${
                      isActive
                        ? "w-7 sm:w-9 bg-[var(--color-accent,#c9a227)]"
                        : "w-3 sm:w-4 bg-[var(--color-border,#d6cfc3)] group-hover:bg-[var(--color-text,#4a3b31)]/40"
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

export default WhyHeavenFlipCard;
