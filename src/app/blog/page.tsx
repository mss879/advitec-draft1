import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Insights & Publications | Advitec International | Sri Lanka Healthcare Blog",
  description: "Stay updated with the latest in biomedical technology innovations, NMRA medical device regulations, cold chain logistics, and intensive care systems in Sri Lanka.",
  alternates: {
    canonical: "https://advitecint.com/blog",
  },
  openGraph: {
    title: "Insights & Publications | Advitec International",
    description: "Explore the Advitec Healthcare Blog. Articles covering biomedical innovation, logistics, regulatory compliance, and critical care systems in Sri Lanka.",
    url: "https://advitecint.com/blog",
    siteName: "Advitec International",
    images: ["/advitec-og.webp"],
    locale: "en_LK",
    type: "website",
  },
};

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": "https://advitecint.com/blog/#webpage",
        "url": "https://advitecint.com/blog",
        "name": "Insights & Publications - Advitec International",
        "description": "Stay updated with the latest in biomedical technology innovations, NMRA medical device regulations, cold chain logistics, and intensive care systems in Sri Lanka.",
        "publisher": {
          "@id": "https://advitecint.com/#organization"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogClient />
    </>
  );
}
