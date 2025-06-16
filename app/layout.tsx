import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/hero";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cámara de Comercio La Maná | Impulsando el Desarrollo Empresarial",
  description: "La Cámara de Comercio de La Maná promueve el desarrollo económico y empresarial de la región, ofreciendo servicios y apoyo a los comerciantes y empresarios locales.",
  keywords: "cámara de comercio, La Maná, Ecuador, empresas, negocios, comercio, desarrollo económico",
  openGraph: {
    title: "Cámara de Comercio La Maná",
    description: "Impulsando el desarrollo empresarial y económico de La Maná",
    url: "https://camaradecomerciolamana.com",
    siteName: "Cámara de Comercio La Maná",
    locale: "es_EC",
    type: "website",
    images: [
      {
        url: "https://camaradecomerciolamana.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cámara de Comercio La Maná",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cámara de Comercio La Maná",
    description: "Impulsando el desarrollo empresarial y económico de La Maná",
    images: ["https://camaradecomerciolamana.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://camaradecomerciolamana.com",
  },
  verification: {
    google: "verification_token",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        <HeroSection/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
