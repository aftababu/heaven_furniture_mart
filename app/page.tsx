"use client";

import React, { useState } from "react";
import { Loader } from "@/components/Loader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BrandStatement } from "@/components/BrandStatement";
import { Collections } from "@/components/Collections";
import { WhyHeaven } from "@/components/WhyHeavenFlipCard";
import { BespokeFeature } from "@/components/BespokeFeature";
import { HorizontalGallery } from "@/components/HorizontalGallery";
import { ShowroomMap } from "@/components/ShowroomMap";
import { Footer } from "@/components/Footer";
import { ConsultationModal } from "@/components/ConsultationModal";

export default function Home() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [consultationCategory, setConsultationCategory] =
    useState("Living / Sofa");

  const handleOpenConsultation = (category = "Living / Sofa") => {
    setConsultationCategory(category);
    setConsultationOpen(true);
  };

  return (
    <main className="min-h-screen bg-primary-bg text-text relative">
      <SmoothScroll />
      <Loader />
      <Navbar onOpenConsultation={() => handleOpenConsultation()} />
      <Hero onOpenConsultation={() => handleOpenConsultation()} />
      <BrandStatement />
      <Collections
        onOpenConsultationWithCategory={(cat) => handleOpenConsultation(cat)}
      />
      <WhyHeaven onOpenConsultation={() => handleOpenConsultation()} />
      <BespokeFeature onOpenConsultation={() => handleOpenConsultation()} />
      <HorizontalGallery />
      <ShowroomMap />
      <Footer onOpenConsultation={() => handleOpenConsultation()} />

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        initialCategory={consultationCategory}
      />
    </main>
  );
}
