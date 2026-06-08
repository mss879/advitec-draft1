import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | Advitec International | Premium Biomedical Device Distributor",
  description: "Learn about Advitec International, a leading fully-integrated distributor of high-quality bio-medical devices in Colombo, Sri Lanka. Our mission, evolution, values, and compliance.",
  openGraph: {
    title: "About Us | Advitec International",
    description: "Learn about Advitec International, Sri Lanka's leading biomedical device distributor. Explore our core values, history, and regulatory capabilities.",
    url: "https://advitecint.com/about",
    siteName: "Advitec International",
    images: ["/advitec-og.jpg"],
    locale: "en_LK",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
