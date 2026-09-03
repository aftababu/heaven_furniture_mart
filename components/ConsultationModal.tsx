"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Phone, MessageCircleCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl p-6 sm:p-10">
        {submitted ? (
          <div className="text-center py-12 flex flex-col items-center">
            <MessageCircleCheck className="w-16 h-16 text-brass mb-4 animate-bounce" />
            <h3 className="font-sangbleu-sunrise font-light text-4xl text-charcoal mb-2">
              Thank You!
            </h3>
            <p className="font-hanken text-sm text-slate-gray">
              Opening WhatsApp to connect directly with our design artisan...
            </p>
          </div>
        ) : (
          <div>
            <DialogHeader className="mb-6">
              <span className="font-hanken text-[0.7rem] text-brass uppercase tracking-[0.25em] font-bold block mb-1">
                HEAVEN FURNITURE MART
              </span>
              <DialogTitle>{t("modalTitle")}</DialogTitle>
              <DialogDescription>{t("modalSubtitle")}</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleWhatsAppSend} className="space-y-4">
              <div>
                <label className="block font-hanken text-[0.7rem] font-bold tracking-[0.2em] text-charcoal-body uppercase mb-1">
                  {t("fullName")} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Abul Kalam"
                  className="w-full px-4 py-3 bg-white/80 border border-wood-border rounded-sm font-hanken text-sm text-charcoal-body placeholder:text-slate-muted focus:outline-none focus:border-brass"
                />
              </div>

              <div>
                <label className="block font-hanken text-[0.7rem] font-bold tracking-[0.2em] text-charcoal-body uppercase mb-1">
                  {t("phone")} *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880 1700-000000"
                  className="w-full px-4 py-3 bg-white/80 border border-wood-border rounded-sm font-hanken text-sm text-charcoal-body placeholder:text-slate-muted focus:outline-none focus:border-brass"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-hanken text-[0.7rem] font-bold tracking-[0.2em] text-charcoal-body uppercase mb-1">
                    {t("furnitureType")}
                  </label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Living / Sofa">Living / Sofa</SelectItem>
                      <SelectItem value="Bedroom / Bed Set">Bedroom / Bed Set</SelectItem>
                      <SelectItem value="Dining Room Set">Dining Room Set</SelectItem>
                      <SelectItem value="Bespoke Executive Desk">Bespoke Executive Desk</SelectItem>
                      <SelectItem value="Entire Home Interior">Entire Home Interior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block font-hanken text-[0.7rem] font-bold tracking-[0.2em] text-charcoal-body uppercase mb-1">
                    {t("woodPreference")}
                  </label>
                  <Select value={material} onValueChange={setMaterial}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Material" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Solid Teak Wood (সেগুন)">Solid Teak Wood (সেগুন)</SelectItem>
                      <SelectItem value="Premium Mahogany (মেহগনি)">Premium Mahogany (মেহগনি)</SelectItem>
                      <SelectItem value="Oak Veneer & Brass Accent">Oak Veneer & Brass Accent</SelectItem>
                      <SelectItem value="Luxury Fabric Upholstery">Luxury Fabric Upholstery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block font-hanken text-[0.7rem] font-bold tracking-[0.2em] text-charcoal-body uppercase mb-1">
                  {t("detailsMessage")}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about room dimensions or custom design preferences..."
                  className="w-full px-4 py-3 bg-white/80 border border-wood-border rounded-sm font-hanken text-sm text-charcoal-body placeholder:text-slate-muted focus:outline-none focus:border-brass"
                />
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <Button
                  variant="default"
                  size="lg"
                  type="submit"
                  className="w-full gap-2 py-4"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>{t("sendWhatsApp")}</span>
                </Button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
