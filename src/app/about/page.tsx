import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | Advitec International | Premium Biomedical Device Distributor",
  description: "Learn about Advitec International, a leading fully-integrated distributor of high-quality bio-medical devices in Colombo, Sri Lanka. Our mission, evolution, values, and compliance.",
  alternates: {
    canonical: "https://advitecint.com/about",
  },
  openGraph: {
    title: "About Us | Advitec International",
    description: "Learn about Advitec International, Sri Lanka's leading biomedical device distributor. Explore our core values, history, and regulatory capabilities.",
    url: "https://advitecint.com/about",
    siteName: "Advitec International",
    images: ["/advitec-og.webp"],
    locale: "en_LK",
    type: "website",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://advitecint.com/about/#webpage",
        "url": "https://advitecint.com/about",
        "name": "About Us - Advitec International",
        "description": "Learn about Advitec International, Sri Lanka's leading biomedical device distributor. Explore our core values, history, and regulatory capabilities.",
        "isPartOf": {
          "@id": "https://advitecint.com/#website"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://advitecint.com/#organization",
        "name": "Advitec International",
        "url": "https://advitecint.com",
        "logo": "https://advitecint.com/logo-01-332x129.webp"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient />
    </>
  );
}
