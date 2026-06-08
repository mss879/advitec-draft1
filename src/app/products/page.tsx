import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Our Product Portfolio | Advitec International | Medical Equipment Sri Lanka",
  description: "Explore Advitec International's certified biomedical product range. Homecare Apparatus, Handheld Diagnostic Tools, Highly Automated Clinical Equipment, and Surgical Supplies.",
  openGraph: {
    title: "Our Product Portfolio | Advitec International",
    description: "Explore Advitec International's certified biomedical product range. Homecare Apparatus, Handheld Diagnostic Tools, and Highly Automated Clinical Equipment.",
    url: "https://advitecint.com/products",
    siteName: "Advitec International",
    images: ["/advitec-og.jpg"],
    locale: "en_LK",
    type: "website",
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
