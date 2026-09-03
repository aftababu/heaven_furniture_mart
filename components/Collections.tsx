"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface CategoryItem {
  id: string;
  key: string;
  img: string;
  objectPos: string;
}

const categories: CategoryItem[] = [
  {
    id: "living",
    key: "catLiving",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788443692/hackathon/living_bccxod.webp",
    objectPos: "object-[20%_80%]",
  },
  {
    id: "bedroom",
    key: "catBedroom",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788443694/hackathon/bedroom_ztinrh.webp",
    objectPos: "object-bottom",
  },
  {
    id: "dining",
    key: "catDining",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788443692/hackathon/din_quuemd.webp",
    objectPos: "object-[30%_50%]",
  },
  {
    id: "bespoke",
    key: "catBespoke",
    img: "https://res.cloudinary.com/dmglab5ej/image/upload/v1788443693/hackathon/bespoke_bhel21.webp",
    objectPos: "object-[60%_50%]",
  },
];

interface CollectionsProps {
  onOpenConsultationWithCategory?: (cat: string) => void;
}

export const Collections: React.FC<CollectionsProps> = ({
  onOpenConsultationWithCategory,
}) => {
  const { lang, t } = useLanguage();

  return (
    <section
      id="collections"
      className="py-16 xs:py-20 sm:py-32 bg-primary-bg relative overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-4 xs:px-6 sm:px-12">
        {/* Section Title in SangBleu 300 Light */}
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
            <motion.a
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              href={`https://wa.me/8801960481983?text=${encodeURIComponent(
                lang === "bn"
                  ? `হ্যালো হেভেন ফার্নিচার মার্ট, আমি আপনাদের ${t(cat.key)} কালেকশন দেখতে আগ্রহী।`
                  : `Hello Heaven Furniture Mart, I am interested in your ${t(cat.key)} collection.`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center cursor-pointer"
            >
              <div className="w-full aspect-[4/3] xs:aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/5] overflow-hidden mb-4 sm:mb-6 bg-primary-bg rounded-xl border border-border shadow-sm relative">
                <Image
                  src={cat.img}
                  alt={t(cat.key)}
                  fill
                  loading="lazy"
                  sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className={`w-full h-full object-cover ${cat.objectPos} transition-transform duration-1000 ease-out group-hover:scale-105 select-none`}
                />
                <div className="absolute inset-0 bg-text/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              <div className="flex items-center gap-2 text-text group-hover:text-accent transition-colors duration-300">
                <span className="font-hanken text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
                  {t(cat.key)}
                </span>
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
