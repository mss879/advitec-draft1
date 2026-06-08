import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Advitec International | Premium Bio-Medical Device Distributor Sri Lanka",
  description: "Advitec International is Sri Lanka's leading distributor of high-quality bio-medical equipment. Sourcing homecare apparatus, diagnostics, and advanced ICU devices.",
  alternates: {
    canonical: "https://advitecint.com",
  },
  openGraph: {
    title: "Advitec International | Premium Bio-Medical Device Distributor",
    description: "Advitec International is Sri Lanka's leading distributor of high-quality bio-medical equipment. Sourcing homecare apparatus, diagnostics, and advanced ICU devices.",
    url: "https://advitecint.com",
    siteName: "Advitec International",
    images: ["/advitec-og.webp"],
    locale: "en_LK",
    type: "website",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": "https://advitecint.com/#organization",
        "name": "Advitec International",
        "url": "https://advitecint.com",
        "logo": "https://advitecint.com/logo-01-332x129.webp",
        "image": "https://advitecint.com/advitec-og.webp",
        "description": "Advitec International is Sri Lanka's leading distributor of high-quality bio-medical equipment. Sourcing homecare apparatus, diagnostics, and advanced ICU devices.",
        "telephone": "+94112345678",
        "email": "info@advitecint.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Colombo, Sri Lanka",
          "addressLocality": "Colombo",
          "addressCountry": "LK"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://advitecint.com/#website",
        "url": "https://advitecint.com",
        "name": "Advitec International",
        "description": "Premium Bio-Medical Device Distributor in Sri Lanka",
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
      <HomeClient />
    </>
  );
}
