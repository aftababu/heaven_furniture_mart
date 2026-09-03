import type { Metadata } from "next";
import localFont from "next/font/local";
import { Noto_Serif_Bengali, Noto_Sans_Bengali } from "next/font/google";
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
      path: "../public/fonts/SangBleuSunriseTrial-LightItalic.woff2",
      weight: "300",
      style: "italic",
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
      path: "../public/fonts/SangBleuSunriseTrial-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/SangBleuSunriseTrial-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/SangBleuSunriseTrial-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-sangbleu-sunrise",
  display: "swap",
});

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-serif-bengali",
  display: "swap",
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sans-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://heaven-furniture-mart-aftababu.vercel.app/"),
  title:
    "HEAVEN FURNITURE MART | Bespoke Furniture & Artisan Heritage Chattogram",
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
    description:
      "Custom furniture designed around your space, lifestyle, and taste.",
    url: "https://heaven-furniture-mart-aftababu.vercel.app/",
    siteName: "Heaven Furniture Mart",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dmglab5ej/image/upload/c_thumb,w_200,g_face/v1788446445/hackathon/hero_vkxkix.webp",
        width: 1200,
        height: 630,
        alt: "Heaven Furniture Mart Bespoke Living",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HEAVEN FURNITURE MART | Bespoke Luxury Furniture",
    description:
      "Custom furniture designed around your space, lifestyle, and taste.",
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
  image:
    "https://res.cloudinary.com/dmglab5ej/image/upload/c_thumb,w_200,g_face/v1788446445/hackathon/hero_vkxkix.webp",
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
  url: "https://heaven-furniture-mart-aftababu.vercel.app/",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
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
      lang="en-US"
      className={`${moirest.variable} ${sangBleuSunrise.variable} ${notoSerifBengali.variable} ${notoSansBengali.variable} scroll-smooth h-full antialiased`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="VGbvF1AhtWU-atZCC7AlYj-YYkRvXaUsuGJSHMFAato"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col text-text/70 selection:bg-accent selection:text-primary-bg font-moirest font-normal">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
