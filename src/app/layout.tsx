import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Advitec International | Premier Bio-Medical Device Distributor in Sri Lanka",
  description: "Advitec International is a leading, fully-integrated distributor of high-quality bio-medical devices in Colombo, Sri Lanka. We connect global manufacturers with local healthcare needs.",
  keywords: ["medical devices Sri Lanka", "biomedical distributor", "healthcare solutions Colombo", "Advitec International"],
  authors: [{ name: "Advitec" }],
  openGraph: {
    title: "Advitec International | Premier Bio-Medical Device Distributor",
    description: "Leading distributor of high-quality bio-medical devices in Colombo, Sri Lanka.",
    url: "https://advitecint.com",
    siteName: "Advitec International",
    images: [
      {
        url: "/advitec-og.jpg",
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
    images: ["/advitec-og.jpg"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
