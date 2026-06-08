import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Preloader from "./Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Advitec International | Premier Bio-Medical Device Distributor in Sri Lanka",
  description: "Advitec International is a leading, fully-integrated distributor of high-quality bio-medical devices in Colombo, Sri Lanka. We connect global manufacturers with local healthcare needs.",
  keywords: ["medical devices Sri Lanka", "biomedical distributor", "healthcare solutions Colombo", "Advitec International"],
  authors: [{ name: "Advitec" }],
  alternates: {
    canonical: "https://advitecint.com",
  },
  openGraph: {
    title: "Advitec International | Premier Bio-Medical Device Distributor",
    description: "Leading distributor of high-quality bio-medical devices in Colombo, Sri Lanka.",
    url: "https://advitecint.com",
    siteName: "Advitec International",
    images: [
      {
        url: "/advitec-og.webp",
        width: 1200,
        height: 1200,
        alt: "Advitec International - Premier Medical Devices",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Advitec International",
    description: "Premier Bio-Medical Device Distributor in Sri Lanka.",
    images: ["/advitec-og.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Preloader>
          {children}
        </Preloader>
      </body>
    </html>
  );
}
