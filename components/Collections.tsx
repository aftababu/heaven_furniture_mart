"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";

interface HotspotProduct {
  id: string;
  top: string;
  left: string;
  nameEn: string;
  nameBn: string;
  specEn: string;
  specBn: string;
  price: string;
  img: string;
}

interface CategoryItem {
  id: string;
  key: string;
  img: string;
  objectPos: string;
  hotspots: HotspotProduct[];
}

const categories: CategoryItem[] = [
  {
    id: "living",
    key: "catLiving",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788443692/hackathon/living_bccxod.webp",
    objectPos: "object-[20%_80%]",
    hotspots: [
      {
        id: "living-sofa",
        top: "52%",
        left: "38%",
        nameEn: "Velvet Modular Sofa",
        nameBn: "ভেলভেট মডুলার সোফা",
        specEn: "Teak & High-Density Foam",
        specBn: "সেগুন কাঠ ও হাই-ডেনসিটি ফোম",
        price: "৳ 1,45,000",
        img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788443691/hackathon/sofa_c2txdn.webp",
      },
      {
        id: "living-table",
        top: "76%",
        left: "68%",
        nameEn: "Artisan Teak Coffee Table",
        nameBn: "আর্টিসান সেগুন টি-টেবিল",
        specEn: "Hand-Polished Solid Teak",
        specBn: "পলিশ করা সিজনড সেগুন কাঠ",
        price: "৳ 38,000",
        img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788443691/hackathon/tabil_iabih2.webp",
      },
    ],
  },
  {
    id: "bedroom",
    key: "catBedroom",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788443694/hackathon/bedroom_ztinrh.webp",
    objectPos: "object-bottom",
    hotspots: [
      {
        id: "bedroom-bed",
        top: "46%",
        left: "48%",
        nameEn: "Royal King Canopy Bed",
        nameBn: "রয়্যাল কিং সাইজ বেড",
        specEn: "Mahogany & Cushioned Headboard",
        specBn: "মেহগনি কাঠ ও কুশন হেডবোর্ড",
        price: "৳ 1,25,000",
        img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788443694/hackathon/bedroom_ztinrh.webp",
      },
      {
        id: "bedroom-console",
        top: "65%",
        left: "82%",
        nameEn: "Minimalist Bedside Console",
        nameBn: "মিনিমালিস্ট সাইড টেবিল",
        specEn: "Brass Accents & Teak Finish",
        specBn: "পিতলের নকশা ও সেগুন ফিনিশ",
        price: "৳ 22,500",
        img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788443692/hackathon/design_dtfmyh.webp",
      },
    ],
  },
  {
    id: "dining",
    key: "catDining",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788443692/hackathon/din_quuemd.webp",
    objectPos: "object-[30%_50%]",
    hotspots: [
      {
        id: "dining-table",
        top: "52%",
        left: "48%",
        nameEn: "Heritage 8-Seater Table",
        nameBn: "৮-সিটার ডাইনিং টেবিল",
        specEn: "Solid Seasoned Burmese Teak",
        specBn: "সিজনড বার্মিজ সেগুন কাঠ",
        price: "৳ 1,85,000",
        img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788443692/hackathon/din_quuemd.webp",
      },
      {
        id: "dining-chair",
        top: "68%",
        left: "25%",
        nameEn: "Sculpted Dining Chair",
        nameBn: "স্কাল্পটেড ডাইনিং চেয়ার",
        specEn: "Ergonomic Teak & Leatherette",
        specBn: "সেগুন কাঠ ও লেদার সিট",
        price: "৳ 18,500",
        img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788445505/hackathon/wood_sumsjx.webp",
      },
    ],
  },
  {
    id: "bespoke",
    key: "catBespoke",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788443693/hackathon/bespoke_bhel21.webp",
    objectPos: "object-[60%_50%]",
    hotspots: [
      {
        id: "bespoke-unit",
        top: "42%",
        left: "58%",
        nameEn: "Custom Wall Console Unit",
        nameBn: "কাস্টম ওয়াল কনসোল",
        specEn: "Integrated Architectural Lighting",
        specBn: "ইনবিল্ট লাইটিং ও কাস্টম উডওয়ার্ক",
        price: "৳ 2,10,000",
        img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788443693/hackathon/card1_xhse8b.webp",
      },
    ],
  },
];

interface CollectionsProps {
  onOpenConsultationWithCategory?: (cat: string) => void;
}

export const Collections: React.FC<CollectionsProps> = ({
  onOpenConsultationWithCategory,
}) => {
  const { lang, t } = useLanguage();
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  const toggleHotspot = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveHotspotId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="collections"
      className="py-16 xs:py-20 sm:py-32 bg-primary-bg relative overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-4 xs:px-6 sm:px-12">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-sangbleu-sunrise font-light not-italic text-3xl xs:text-4xl md:text-6xl text-center text-text/70 mb-10 xs:mb-14 sm:mb-18 tracking-tight leading-[1.05]"
        >
          {t("collectionsHeadline")}
        </motion.h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 lg:gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="group flex flex-col items-center relative"
            >
              {/* Image Container with Interactive Hotspots */}
              <div
                className="w-full aspect-[4/3] xs:aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/5] overflow-hidden mb-4 sm:mb-6 bg-primary-bg rounded-none border border-border shadow-sm relative group/img cursor-pointer"
                onClick={() => setActiveHotspotId(null)}
                onMouseLeave={() => setActiveHotspotId(null)}
              >
                <Image
                  src={cat.img}
                  alt={t(cat.key)}
                  fill
                  loading="lazy"
                  sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className={`w-full h-full object-cover ${cat.objectPos} transition-transform duration-1000 ease-out group-hover:scale-105 select-none`}
                />
                <div className="absolute inset-0 bg-text/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />

                {/* Hotspot Pins Overlay (Pops in on Image Hover) */}
                {cat.hotspots.map((hs, pinIdx) => {
                  const isOpen = activeHotspotId === hs.id;
                  return (
                    <div
                      key={hs.id}
                      className="absolute z-30 -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0 group-hover/img:scale-100 group-hover/img:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                      style={{
                        top: hs.top,
                        left: hs.left,
                        transitionDelay: `${pinIdx * 80}ms`,
                      }}
                    >
                      {/* Clean Black Circular Pin with White Center Dot */}
                      <button
                        onClick={(e) => toggleHotspot(e, hs.id)}
                        aria-label={`View product details for ${hs.nameEn}`}
                        className="relative group/pin focus:outline-none cursor-pointer p-1.5 flex items-center justify-center"
                      >
                        {/* Black Outer Circular Layer (0.1 Opacity) */}
                        <span className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-black/10 border border-black/10 flex items-center justify-center transition-transform duration-200 group-hover/pin:scale-110">
                          {/* White Center Dot */}
                          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white transition-transform duration-200 group-hover/pin:scale-110" />
                        </span>
                      </button>

                      {/* Floating Product Card Connected via Pointer Stem (Revealed on Click) */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.94 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 4, scale: 0.94 }}
                            transition={{
                              duration: 0.22,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 flex flex-col items-center z-40 pointer-events-auto"
                          >
                            {/* Card Box */}
                            <div
                              onClick={() => {
                                if (onOpenConsultationWithCategory) {
                                  onOpenConsultationWithCategory(cat.id);
                                }
                              }}
                              className="w-52 sm:w-60 bg-white border border-black/5 rounded-none p-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.18)] cursor-pointer group/card hover:border-accent/40 transition-colors"
                            >
                              <div className="flex items-center gap-2.5">
                                {/* Thumbnail */}
                                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-none overflow-hidden bg-secondary-bg shrink-0 border border-border/50">
                                  <Image
                                    src={hs.img}
                                    alt={lang === "bn" ? hs.nameBn : hs.nameEn}
                                    fill
                                    sizes="60px"
                                    className="object-cover w-full h-full"
                                  />
                                </div>

                                {/* Text Details */}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-hanken text-[0.75rem] sm:text-xs font-bold text-[#2c221e] leading-snug truncate group-hover/card:text-accent transition-colors">
                                    {lang === "bn" ? hs.nameBn : hs.nameEn}
                                  </h4>
                                  <p className="font-hanken text-[0.62rem] text-[#73655c] truncate mt-0.5">
                                    {lang === "bn" ? hs.specBn : hs.specEn}
                                  </p>
                                  <span className="font-sangbleu-sunrise text-[0.75rem] sm:text-xs font-semibold text-accent block mt-0.5">
                                    {hs.price}
                                  </span>
                                </div>

                                {/* Right Arrow */}
                                <ChevronRight className="w-4 h-4 text-[#a09488] group-hover/card:text-accent group-hover/card:translate-x-0.5 transition-all shrink-0 ml-1" />
                              </div>
                            </div>

                            {/* Pointer Stem Connection Notch */}
                            <div className="w-2.5 h-2.5 bg-white transform rotate-45 border-r border-b border-black/10 -mt-1.5 shadow-xs shrink-0" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Category Link */}
              <a
                href={`https://wa.me/8801960481983?text=${encodeURIComponent(
                  lang === "bn"
                    ? `হ্যালো হেভেন ফার্নিচার মার্ট, আমি আপনাদের ${t(cat.key)} কালেকশন দেখতে আগ্রহী।`
                    : `Hello Heaven Furniture Mart, I am interested in your ${t(cat.key)} collection.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text group-hover:text-accent transition-colors duration-300"
              >
                <span className="font-hanken text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
                  {t(cat.key)}
                </span>
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
