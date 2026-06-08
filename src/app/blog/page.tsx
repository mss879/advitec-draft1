import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Insights & Publications | Advitec International | Sri Lanka Healthcare Blog",
  description: "Stay updated with the latest in biomedical technology innovations, NMRA medical device regulations, cold chain logistics, and intensive care systems in Sri Lanka.",
  openGraph: {
    title: "Insights & Publications | Advitec International",
    description: "Explore the Advitec Healthcare Blog. Articles covering biomedical innovation, logistics, regulatory compliance, and critical care systems in Sri Lanka.",
    url: "https://advitecint.com/blog",
    siteName: "Advitec International",
    images: ["/advitec-og.jpg"],
    locale: "en_LK",
    type: "website",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
