"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Compass,
  Armchair,
  Bed,
  UtensilsCrossed,
  Briefcase,
  Home,
  Check,
  ArrowUpRight,
} from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

// ================================================================
// TYPES
// ================================================================

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  lang?: "en" | "bn";
}

interface DomainOption {
  id: string;
  icon: React.ElementType;
  en: string;
  bn: string;
}

interface TimberOption {
  id: string;
  swatch: string;
  en: string;
  bn: string;
}

// ================================================================
// DATA
// ================================================================

const DOMAINS: DomainOption[] = [
  { id: "living", icon: Armchair, en: "Living & Sofa", bn: "বৈঠকখানা ও সোফা" },
  { id: "bedroom", icon: Bed, en: "Master Bed Suite", bn: "শয়নকক্ষ সংকলন" },
  {
    id: "dining",
    icon: UtensilsCrossed,
    en: "Dining Suite",
    bn: "ভোজনালয় ও টেবিল",
  },
  {
    id: "executive",
    icon: Briefcase,
    en: "Executive Atelier",
    bn: "এক্সিকিউটিভ অফিস",
  },
  { id: "residence", icon: Home, en: "Full Residence", bn: "সম্পূর্ণ আবাস" },
];

const TIMBERS: TimberOption[] = [
  {
    id: "burma_teak",
    swatch: "#8B5226",
    en: "Burma Teak (সেগুন)",
    bn: "বার্মা সেগুন কাঠ",
  },
  {
    id: "mahogany",
    swatch: "#5C2218",
    en: "Seasoned Mahogany (মেহগনি)",
    bn: "সিজনড মেহগনি",
  },
  {
    id: "white_oak",
    swatch: "#B89F7C",
    en: "White Oak & Brass",
    bn: "হোয়াইট ওক ও ব্রাস",
  },
  {
    id: "italian_leather",
    swatch: "#3B2820",
    en: "Italian Grain Leather",
    bn: "ইতালিয়ান লেদার",
  },
];

// ================================================================
// COMPONENT
// ================================================================

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialCategory = "living",
  lang = "en",
}) => {
  const [domain, setDomain] = useState(initialCategory);
  const [timber, setTimber] = useState("burma_teak");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const t = (key: string): string => {
    const translations: Record<string, Record<"en" | "bn", string>> = {
      modalTitle: {
        en: "Bespoke Design Commission",
        bn: "কাস্টম ডিজাইন কমিশন",
      },
      modalSubtitle: {
        en: "We do not supply from a warehouse shelf. Each piece is dimensioned, joined, and finished for your room.",
        bn: "আমরা কোনো তৈরি পণ্য বিক্রি করি না। প্রতিটি টুকরো আপনার ঘরের জন্য পরিমাপ, জোড়া এবং সমাপ্ত করা হয়।",
      },
      chooseDomain: {
        en: "Select Spatial Domain",
        bn: "স্থানীয় ডোমেইন নির্বাচন",
      },
      chooseTimber: { en: "Materiality & Finish", bn: "উপাদান ও ফিনিশ" },
      clientCoordinates: { en: "Client Coordinates", bn: "ক্লায়েন্ট তথ্য" },
      placeholderName: { en: "Your Full Name", bn: "আপনার পুরো নাম" },
      placeholderPhone: {
        en: "WhatsApp Number (+880...)",
        bn: "হোয়াটসঅ্যাপ নম্বর (+৮৮০...)",
      },
      placeholderNotes: {
        en: "Room dimensions or bespoke details (e.g. 16ft × 12ft living room in Agrabad)...",
        bn: "ঘরের মাপ বা বিশেষ প্রয়োজন (যেমন: আগ্রাবাদে ১৬ফুট × ১২ফুট লিভিং রুম)...",
      },
      dispatchNotice: {
        en: "Complimentary design brief · No obligation",
        bn: "বিনামূল্যে ডিজাইন পরামর্শ · কোনো বাধ্যবাধকতা নেই",
      },
      dispatchBrief: { en: "Dispatch Brief", bn: "বিবরণ পাঠান" },
      spatialPrecision: { en: "Spatial Precision", bn: "স্থানীয় নির্ভুলতা" },
      spatialDesc: {
        en: "Tailored to the exact millimeter of your blueprint.",
        bn: "আপনার ব্লুপ্রিন্টের প্রতিটি মিলিমিটার অনুযায়ী তৈরি।",
      },
      seasonedHardwood: {
        en: "100% Seasoned Hardwood",
        bn: "১০০% সিজনড হার্ডউড",
      },
      timberDesc: {
        en: "Certified Burma Teak & Kiln-dried hardwoods.",
        bn: "সার্টিফাইড বার্মা সেগুন ও কিলন-ড্রাইড হার্ডউড।",
      },
      directConcierge: {
        en: "Direct Atelier Concierge",
        bn: "সরাসরি অ্যাটেলিয়ার কনসিয়ার্জ",
      },
      commissionLogged: {
        en: "Commission Logged",
        bn: "কমিশন রেকর্ড করা হয়েছে",
      },
      briefAtWorkshop: {
        en: "Your brief is at the workshop.",
        bn: "আপনার বিবরণ কর্মশালায় পৌঁছেছে।",
      },
      redirecting: {
        en: "Directing your specifications to our master craftsman on WhatsApp.",
        bn: "আপনার স্পেসিফিকেশন হোয়াটসঅ্যাপে আমাদের মাস্টার কারিগরের কাছে পাঠানো হচ্ছে।",
      },
    };
    return translations[key]?.[lang] || key;
  };

  const getDomainLabel = (id: string): string => {
    const found = DOMAINS.find((d) => d.id === id);
    return found ? found[lang] : id;
  };

  const getTimberLabel = (id: string): string => {
    const found = TIMBERS.find((t) => t.id === id);
    return found ? found[lang] : id;
  };

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = [
      "*HEAVEN FURNITURE MART — ATELIER COMMISSION*",
      "──────────────────────────────",
      `*Client:* ${name.trim() || (lang === "bn" ? "অনুল্লেখিত" : "Not Provided")}`,
      `*Contact:* ${phone.trim() || (lang === "bn" ? "অনুল্লেখিত" : "Not Provided")}`,
      `*Domain:* ${getDomainLabel(domain)}`,
      `*Materiality:* ${getTimberLabel(timber)}`,
      `*Spatial Brief:* ${notes.trim() || (lang === "bn" ? "কোনো বিশেষ মাপ নেই" : "No notes specified")}`,
      "──────────────────────────────",
      "*Dispatch:* Agrabad Access Road Showroom",
    ].join("\n");

    window.open(
      `https://wa.me/8801960481983?text=${encodeURIComponent(payload)}`,
      "_blank",
    );

    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      setName("");
      setPhone("");
      setNotes("");
      onClose();
    }, 2500);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
  };

  if (!isMounted) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-4xl w-[calc(100%-2rem)] p-0 overflow-hidden border border-[var(--color-border,#d6cfc3)] rounded-none shadow-[0_32px_80px_-20px_rgba(74,59,49,0.22)] bg-[var(--color-primary-bg,#f6f4ee)] max-h-[90vh] overflow-y-auto [&>button.absolute]:hidden">
        <div className="relative">
          {/* Custom Atelier Close Button */}
          <button
            type="button"
            className="absolute top-5 right-5 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-[var(--color-text,#4a3b31)]/5 border  text-[var(--color-text,#4a3b31)] transition-all duration-200 hover:rotate-90 border-none bg-none cursor-pointer"
            onClick={handleClose}
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <DialogTitle className="sr-only">{t("modalTitle")}</DialogTitle>

          {/* AnimatePresence for Form vs Success */}
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 sm:py-20 px-6 sm:px-10 flex flex-col items-center justify-center text-center min-h-[440px] bg-[var(--color-primary-bg,#f6f4ee)]"
              >
                <div className="w-16 h-16 rounded-none border border-[var(--color-accent,#c9a227)] flex items-center justify-center mb-6 text-[var(--color-accent,#c9a227)]">
                  <Check className="w-8 h-8 stroke-[1.5]" />
                </div>

                <span className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-[var(--color-accent,#c9a227)] block mb-2 font-sans">
                  {t("commissionLogged")}
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl text-[var(--color-text,#4a3b31)] font-normal mb-3">
                  {t("briefAtWorkshop")}
                </h3>

                <p className="text-xs text-[var(--color-text,#4a3b31)]/75 max-w-sm leading-relaxed font-sans">
                  {t("redirecting")}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]"
              >
                {/* LEFT: Atelier Ledger */}
                <div className="lg:col-span-5 bg-[var(--color-secondary-bg,#f4ede6)] border-b lg:border-b-0 lg:border-r border-[var(--color-border,#d6cfc3)] p-8 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--color-accent,#c9a227)]" />
                        <span className="text-[0.6rem] font-bold tracking-widest uppercase text-[var(--color-text,#4a3b31)]/70">
                          agrabad access road
                        </span>
                      </div>
                      <span className="text-[0.6rem] font-mono uppercase tracking-widest text-[var(--color-text,#4a3b31)]/50">
                        CTG · BD
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-[2.2rem] text-[var(--color-text,#4a3b31)] font-normal leading-[1.15] mb-4">
                      {t("modalTitle")}
                    </h2>

                    <p className="text-xs text-[var(--color-text,#4a3b31)]/80 leading-relaxed font-sans mb-8">
                      {t("modalSubtitle")}
                    </p>
                  </div>

                  <div className="pt-8 mt-8 border-t border-[var(--color-border,#d6cfc3)]/60">
                    <span className="text-[0.55rem] uppercase tracking-[0.2em] text-[var(--color-text,#4a3b31)]/50 block mb-1">
                      {t("directConcierge")}
                    </span>
                    <a
                      href="tel:+8801960481983"
                      className="text-xs font-semibold tracking-wider text-[var(--color-text,#4a3b31)] hover:text-[var(--color-accent,#c9a227)] transition-colors"
                    >
                      +880 1960-481983
                    </a>
                  </div>
                </div>

                {/* RIGHT: Commission Spec Sheet */}
                <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between bg-[var(--color-primary-bg,#f6f4ee)]">
                  <form onSubmit={handleDispatch} className="space-y-6">
                    {/* Step 1: Spatial Domain */}
                    <div>
                      <label className="block text-[0.6rem] font-bold tracking-[0.24em] uppercase text-[var(--color-text,#4a3b31)] mb-3 font-sans">
                        01 · {t("chooseDomain")}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {DOMAINS.map((item) => {
                          const Icon = item.icon;
                          const isSelected = domain === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setDomain(item.id)}
                              className={`cursor-pointer flex items-center gap-2 p-2.5 rounded-none border text-left transition-all duration-200 ${
                                isSelected
                                  ? "bg-accent font-bold text-primary-bg border-border shadow-sm"
                                  : "bg-[var(--color-secondary-bg,#f4ede6)]/60 hover:bg-[var(--color-secondary-bg,#f4ede6)] border-[var(--color-border,#d6cfc3)] text-[var(--color-text,#4a3b31)]"
                              }`}
                            >
                              <Icon
                                className={`w-3.5 h-3.5 ${
                                  isSelected
                                    ? "text-[var(--color-text-highlight,#d8b978)]"
                                    : "text-[var(--color-accent,#c9a227)]"
                                }`}
                              />
                              <span className="text-[0.68rem] font-medium tracking-wide truncate">
                                {item[lang]}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 2: Timber & Materiality */}
                    <div>
                      <label className="block text-[0.6rem] font-bold tracking-[0.24em] uppercase text-[var(--color-text,#4a3b31)] mb-3 font-sans">
                        02 · {t("chooseTimber")}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {TIMBERS.map((wood) => {
                          const isSelected = timber === wood.id;
                          return (
                            <button
                              key={wood.id}
                              type="button"
                              onClick={() => setTimber(wood.id)}
                              className={`flex cursor-pointer items-center gap-3 p-2.5 rounded-none border transition-all duration-200 text-left ${
                                isSelected
                                  ? "border-[var(--color-accent,#c9a227)] bg-[var(--color-secondary-bg,#f4ede6)] shadow-sm ring-1 ring-[var(--color-accent,#c9a227)]"
                                  : "border-[var(--color-border,#d6cfc3)] bg-transparent hover:bg-[var(--color-secondary-bg,#f4ede6)]/50"
                              }`}
                            >
                              <span
                                className="w-4 h-4 rounded-full border border-black/10 shrink-0 shadow-inner"
                                style={{ backgroundColor: wood.swatch }}
                              />
                              <span className="text-[0.7rem] font-medium text-[var(--color-text,#4a3b31)] truncate">
                                {wood[lang]}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 3: Coordinates & Details */}
                    <div className="space-y-4 pt-1">
                      <label className="block text-[0.6rem] font-bold tracking-[0.24em] uppercase text-[var(--color-text,#4a3b31)] font-sans">
                        03 · {t("clientCoordinates")}
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={t("placeholderName")}
                          className="w-full bg-transparent border-b border-[var(--color-border,#d6cfc3)] py-2 text-xs sm:text-sm text-[var(--color-text,#4a3b31)] placeholder:text-[var(--color-text,#4a3b31)]/40 focus:outline-none focus:border-[var(--color-accent,#c9a227)] transition-colors"
                        />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder={t("placeholderPhone")}
                          className="w-full bg-transparent border-b border-[var(--color-border,#d6cfc3)] py-2 text-xs sm:text-sm text-[var(--color-text,#4a3b31)] placeholder:text-[var(--color-text,#4a3b31)]/40 focus:outline-none focus:border-[var(--color-accent,#c9a227)] transition-colors"
                        />
                      </div>

                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={t("placeholderNotes")}
                        className="w-full bg-transparent border-b border-[var(--color-border,#d6cfc3)] py-2 text-xs text-[var(--color-text,#4a3b31)] placeholder:text-[var(--color-text,#4a3b31)]/40 focus:outline-none focus:border-[var(--color-accent,#c9a227)] transition-colors"
                      />
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="submit"
                        className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-none bg-accent hover:bg-accent/90 cursor-pointer  text-[var(--color-primary-bg,#f6f4ee)] text-[0.68rem] font-bold tracking-[0.22em] uppercase transition-all duration-300 shadow-sm hover:shadow"
                      >
                        <span>{t("dispatchBrief")}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[var(--color-text-highlight,#d8b978)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationModal;
