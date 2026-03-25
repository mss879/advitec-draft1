import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Advitec International | Medical Equipment Colombo",
  description: "Get in touch with Advitec International for inquiries regarding bio-medical device distribution, international manufacturer partnerships, or after-sales support in Sri Lanka.",
  openGraph: {
    title: "Contact Us | Advitec International",
    description: "Get in touch with Advitec International for inquiries regarding bio-medical device distribution, international manufacturer partnerships, or after-sales support in Sri Lanka.",
    url: "https://advitecint.com/contact",
    siteName: "Advitec International",
    images: ["/advitec-og.jpg"],
    locale: "en_LK",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
