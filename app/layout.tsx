import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const moirest = localFont({
  src: [
    {
      path: "../public/fonts/MoirestLight-YqMJj.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Moirest-rv4mO.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/MoirestBold-R9JyM.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-moirest",
  display: "swap",
});

const sangBleuSunrise = localFont({
  src: [
    {
      path: "../public/fonts/SangBleuSunriseTrial-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/SangBleuSunriseTrial-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/SangBleuSunriseTrial-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/SangBleuSunriseTrial-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/SangBleuSunriseTrial-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sangbleu-sunrise",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://heavenfurnituremart.com"),
  title: "HEAVEN FURNITURE MART | Bespoke Furniture & Artisan Heritage Chattogram",
  description:
    "Custom furniture designed around your space, lifestyle, and taste. Handcrafted luxury living, bedroom, dining, and bespoke furniture in Chattogram, Bangladesh.",
  keywords: [
    "Heaven Furniture Mart",
    "Bespoke Furniture Chattogram",
    "Custom Furniture Bangladesh",
    "Luxury Furniture Agrabad",
    "Handcrafted Wood Furniture",
    "Chattogram Furniture Store",
  ],
  authors: [{ name: "Heaven Furniture Mart" }],
  openGraph: {
    title: "HEAVEN FURNITURE MART | Bespoke Luxury Furniture",
    description: "Custom furniture designed around your space, lifestyle, and taste.",
    url: "https://heavenfurnituremart.com",
    siteName: "Heaven Furniture Mart",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=2000",
        width: 1200,
        height: 630,
        alt: "Heaven Furniture Mart Bespoke Living",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HEAVEN FURNITURE MART | Bespoke Luxury Furniture",
    description: "Custom furniture designed around your space, lifestyle, and taste.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  name: "Heaven Furniture Mart",
  image: "https://heavenfurnituremart.com/og-image.jpg",
  telephone: "+8801960481983",
  email: "heavenfurnituremart@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Agrabad Access Road",
    addressLocality: "Chattogram",
    addressCountry: "BD",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 22.3275,
    longitude: 91.8123,
  },
  url: "https://heavenfurnituremart.com",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "10:00",
      closes: "21:00",
    },
  ],
  priceRange: "$$$",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${moirest.variable} ${sangBleuSunrise.variable} scroll-smooth h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0"
        />
      </head>
      <body className="min-h-full flex flex-col selection:bg-[#C9A227] selection:text-white font-moirest font-light">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
