import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Advitec International | Medical Equipment Colombo",
  description: "Get in touch with Advitec International for inquiries regarding bio-medical device distribution, international manufacturer partnerships, or after-sales support in Sri Lanka.",
  alternates: {
    canonical: "https://advitecint.com/contact",
  },
  openGraph: {
    title: "Contact Us | Advitec International",
    description: "Get in touch with Advitec International for inquiries regarding bio-medical device distribution, international manufacturer partnerships, or after-sales support in Sri Lanka.",
    url: "https://advitecint.com/contact",
    siteName: "Advitec International",
    images: ["/advitec-og.webp"],
    locale: "en_LK",
    type: "website",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://advitecint.com/contact/#webpage",
        "url": "https://advitecint.com/contact",
        "name": "Contact Us - Advitec International",
        "description": "Get in touch with Advitec International for inquiries regarding bio-medical device distribution, international manufacturer partnerships, or after-sales support in Sri Lanka.",
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
      <ContactClient />
    </>
  );
}
