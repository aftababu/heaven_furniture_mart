"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Loader } from "@/components/Loader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

// Dynamically import below-the-fold components to reduce initial JS payload
const BrandStatement = dynamic(() => import("@/components/BrandStatement").then(mod => mod.BrandStatement), { ssr: false });
const Collections = dynamic(() => import("@/components/Collections").then(mod => mod.Collections), { ssr: false });
const WhyHeaven = dynamic(() => import("@/components/WhyHeaven").then(mod => mod.WhyHeaven), { ssr: false });
const BespokeFeature = dynamic(() => import("@/components/BespokeFeature").then(mod => mod.BespokeFeature), { ssr: false });
const HorizontalGallery = dynamic(() => import("@/components/HorizontalGallery").then(mod => mod.HorizontalGallery), { ssr: false });
const ShowroomMap = dynamic(() => import("@/components/ShowroomMap").then(mod => mod.ShowroomMap), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer").then(mod => mod.Footer), { ssr: false });
const ConsultationModal = dynamic(() => import("@/components/ConsultationModal").then(mod => mod.ConsultationModal), { ssr: false });

export default function Home() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [consultationCategory, setConsultationCategory] =
    useState("Living / Sofa");

  const handleOpenConsultation = useCallback((category = "Living / Sofa") => {
    setConsultationCategory(category);
    setConsultationOpen(true);
  }, []);

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
