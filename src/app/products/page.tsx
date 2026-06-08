import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Our Product Portfolio | Advitec International | Medical Equipment Sri Lanka",
  description: "Explore Advitec International's certified biomedical product range. Homecare Apparatus, Handheld Diagnostic Tools, Highly Automated Clinical Equipment, and Surgical Supplies.",
  alternates: {
    canonical: "https://advitecint.com/products",
  },
  openGraph: {
    title: "Our Product Portfolio | Advitec International",
    description: "Explore Advitec International's certified biomedical product range. Homecare Apparatus, Handheld Diagnostic Tools, and Highly Automated Clinical Equipment.",
    url: "https://advitecint.com/products",
    siteName: "Advitec International",
    images: ["/advitec-og.webp"],
    locale: "en_LK",
    type: "website",
  },
};

export default function ProductsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://advitecint.com/products/#webpage",
        "url": "https://advitecint.com/products",
        "name": "Our Product Portfolio - Advitec International",
        "description": "Explore Advitec International's certified biomedical product range including Homecare Apparatus, Handheld Diagnostic Tools, Highly Automated Clinical Equipment, and Surgical Supplies.",
        "isPartOf": {
          "@id": "https://advitecint.com/#website"
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
      <ProductsClient />
    </>
  );
}
