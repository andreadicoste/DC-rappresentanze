import ServicesPage from "@/components/pages/ServicesPage";
import Contact from "@/components/Contact";
import company from "@/data/company.json";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Servizi | ${company.business?.name}`,
  description: company.seo?.defaultDescription,
  openGraph: {
    title: `Servizi | ${company.business?.name}`,
    description: company.seo?.defaultDescription,
    url: "/servizi",
  },
  twitter: {
    card: "summary_large_image",
    title: `Servizi | ${company.business?.name}`,
    description: company.seo?.defaultDescription,
  },
};

export default function ServiziPage() {
  return (
    <>
      <ServicesPage />
      <Contact viewMode="footer" />
    </>
  );
}
