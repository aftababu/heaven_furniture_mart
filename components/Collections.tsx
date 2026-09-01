"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
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
    img: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=2000",
    objectPos: "object-left",
  },
  {
    id: "bedroom",
    key: "catBedroom",
    img: "https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg?auto=compress&cs=tinysrgb&w=2000",
    objectPos: "object-bottom",
  },
  {
    id: "dining",
    key: "catDining",
    img: "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=2000",
    objectPos: "object-[30%_50%]",
  },
  {
    id: "bespoke",
    key: "catBespoke",
    img: "https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting-room.jpg?auto=compress&cs=tinysrgb&w=2000",
    objectPos: "object-[80%_80%]",
  },
];

interface CollectionsProps {
  onOpenConsultationWithCategory?: (cat: string) => void;
}

export const Collections: React.FC<CollectionsProps> = ({ onOpenConsultationWithCategory }) => {
  const { t } = useLanguage();

  return (
    <section id="collections" className="py-24 sm:py-32 bg-[#EFECE5] relative">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
        {/* Section Thin Editorial Display Headline (SangBleu Sunrise 300 Light) */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-sangbleu-sunrise font-light text-4xl sm:text-6xl md:text-7xl lg:text-[80px] text-center text-[#382C24] mb-16 sm:mb-24 tracking-tight leading-tight"
        >
          {t("collectionsHeadline")}
        </motion.h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <div className="w-full aspect-[3/4] sm:aspect-[9/16] lg:aspect-[3/5] overflow-hidden mb-6 bg-[#382C24]/5 rounded-sm border border-[#382C24]/10 shadow-sm relative">
                <img
                  src={cat.img}
                  alt={t(cat.key)}
                  className={`w-full h-full object-cover ${cat.objectPos} transition-transform duration-1000 ease-out group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              <div className="flex items-center gap-2 text-[#382C24] group-hover:text-[#C9A227] transition-colors duration-300">
                <span className="font-hanken text-sm font-bold tracking-[0.2em] uppercase">
                  {t(cat.key)}
                </span>
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#C9A227]" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
