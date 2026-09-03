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
    img: "/images/living.jpg",
    objectPos: "object-left",
  },
  {
    id: "bedroom",
    key: "catBedroom",
    img: "/images/bedroom.jpg",
    objectPos: "object-bottom",
  },
  {
    id: "dining",
    key: "catDining",
    img: "/images/din.jpg",
    objectPos: "object-[30%_50%]",
  },
  {
    id: "bespoke",
    key: "catBespoke",
    img: "/images/bespoke.jpg",
    objectPos: "object-[80%_80%]",
  },
];

interface CollectionsProps {
  onOpenConsultationWithCategory?: (cat: string) => void;
}

export const Collections: React.FC<CollectionsProps> = ({
  onOpenConsultationWithCategory,
}) => {
  const { t } = useLanguage();

  return (
    <section
      id="collections"
      className="py-16 xs:py-20 sm:py-32 bg-sand relative overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-4 xs:px-6 sm:px-12">
        {/* Section Title in SangBleu 300 Light */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-sangbleu-sunrise  font-light not-italic text-3xl xs:text-4xl  md:text-6xl  text-center text-charcoal/70 mb-10 xs:mb-14 sm:mb-18 tracking-tight leading-[1.05]"
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
              href={`https://wa.me/8801960481983?text=Hello%20Heaven%20Furniture%20Mart,%20I%20am%20interested%20in%20your%20${cat.id}%20collection.`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center cursor-pointer"
            >
              <div className="w-full aspect-[4/3] xs:aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/5] overflow-hidden mb-4 sm:mb-6 bg-ivory rounded-xl border border-wood-border shadow-sm relative">
                <Image
                  src={cat.img}
                  alt={t(cat.key)}
                  fill
                  className={`w-full h-full object-cover ${cat.objectPos} transition-transform duration-1000 ease-out group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              <div className="flex items-center gap-2 text-charcoal group-hover:text-brass transition-colors duration-300">
                <span className="font-hanken text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
                  {t(cat.key)}
                </span>
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brass" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
