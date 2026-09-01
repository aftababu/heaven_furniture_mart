"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { X, Phone, MessageCircleCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialCategory = "Living / Sofa",
}) => {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [material, setMaterial] = useState("Solid Teak Wood (সেগুন)");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello Heaven Furniture Mart,%0A%0A*Design Consultation Request*%0A*Name:* ${encodeURIComponent(
      name || "Not provided"
    )}%0A*Phone:* ${encodeURIComponent(phone || "Not provided")}%0A*Category:* ${encodeURIComponent(
      category
    )}%0A*Material Preference:* ${encodeURIComponent(
      material
    )}%0A*Requirements:* ${encodeURIComponent(notes || "None")}`;

    window.open(`https://wa.me/8801960481983?text=${message}`, "_blank");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-[#34494A]/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-xl bg-[#F4F1EA] border border-[#C9A882]/30 rounded-2xl shadow-2xl p-6 sm:p-10 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full text-[#4A3B31] hover:bg-[#4A3B31]/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#C9A227]"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="text-center py-12 flex flex-col items-center">
              <MessageCircleCheck className="w-16 h-16 text-[#C9A227] mb-4 animate-bounce" />
              <h3 className="font-cormorant text-4xl text-[#4A3B31] mb-2 font-bold">
                Thank You!
              </h3>
              <p className="font-hanken text-sm text-[#4A3B31]/80">
                Opening WhatsApp to connect directly with our design artisan...
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-8">
                <span className="font-hanken text-[10px] text-[#C9A227] uppercase tracking-[0.25em] font-bold block mb-1">
                  HEAVEN FURNITURE MART
                </span>
                <h3 className="font-cormorant text-3xl sm:text-4xl text-[#4A3B31] font-light">
                  {t("modalTitle")}
                </h3>
                <p className="font-hanken text-xs sm:text-sm text-[#4A3B31]/70 mt-1">
                  {t("modalSubtitle")}
                </p>
              </div>

              <form onSubmit={handleWhatsAppSend} className="space-y-4">
                <div>
                  <label className="block font-hanken text-xs text-[#4A3B31] uppercase tracking-wider font-bold mb-1">
                    {t("fullName")} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Abul Kalam"
                    className="w-full px-4 py-3 bg-white/70 border border-[#C9A882]/40 rounded-md font-hanken text-sm text-[#4A3B31] focus:outline-none focus:border-[#C9A227]"
                  />
                </div>

                <div>
                  <label className="block font-hanken text-xs text-[#4A3B31] uppercase tracking-wider font-bold mb-1">
                    {t("phone")} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 1700-000000"
                    className="w-full px-4 py-3 bg-white/70 border border-[#C9A882]/40 rounded-md font-hanken text-sm text-[#4A3B31] focus:outline-none focus:border-[#C9A227]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-hanken text-xs text-[#4A3B31] uppercase tracking-wider font-bold mb-1">
                      {t("furnitureType")}
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-white/70 border border-[#C9A882]/40 rounded-md font-hanken text-sm text-[#4A3B31] focus:outline-none focus:border-[#C9A227]"
                    >
                      <option value="Living / Sofa">Living / Sofa</option>
                      <option value="Bedroom / Bed Set">Bedroom / Bed Set</option>
                      <option value="Dining Room Set">Dining Room Set</option>
                      <option value="Bespoke Executive Desk">Bespoke Executive Desk</option>
                      <option value="Entire Home Interior">Entire Home Interior</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-hanken text-xs text-[#4A3B31] uppercase tracking-wider font-bold mb-1">
                      {t("woodPreference")}
                    </label>
                    <select
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full px-4 py-3 bg-white/70 border border-[#C9A882]/40 rounded-md font-hanken text-sm text-[#4A3B31] focus:outline-none focus:border-[#C9A227]"
                    >
                      <option value="Solid Teak Wood (সেগুন)">Solid Teak Wood (সেগুন)</option>
                      <option value="Premium Mahogany (মেহগনি)">Premium Mahogany (মেহগনি)</option>
                      <option value="Oak Veneer & Brass Accent">Oak Veneer & Brass Accent</option>
                      <option value="Luxury Fabric Upholstery">Luxury Fabric Upholstery</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-hanken text-xs text-[#4A3B31] uppercase tracking-wider font-bold mb-1">
                    {t("detailsMessage")}
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tell us about room dimensions or custom design preferences..."
                    className="w-full px-4 py-3 bg-white/70 border border-[#C9A882]/40 rounded-md font-hanken text-sm text-[#4A3B31] focus:outline-none focus:border-[#C9A227]"
                  />
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-[#34494A] text-[#F4F1EA] hover:bg-[#C9A227] hover:text-[#34494A] py-4 px-6 rounded-md font-hanken text-xs uppercase tracking-[0.15em] font-bold transition-all flex items-center justify-center gap-2 shadow-lg focus-visible:outline-2 focus-visible:outline-[#C9A227]"
                  >
                    <Phone className="w-4 h-4 fill-current" />
                    <span>{t("sendWhatsApp")}</span>
                  </motion.button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
