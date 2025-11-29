import ContactPage from "@/components/pages/ContactPage";
import Contact from "@/components/Contact";
import { Metadata } from "next";
import company from "@/data/company.json";

export const metadata: Metadata = {
  title: `Contatti | ${company.business?.name}`,
  description: company.seo?.defaultDescription,
  openGraph: {
    title: `Contatti | ${company.business?.name}`,
    description: company.seo?.defaultDescription,
    url: "/contatti",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contatti | ${company.business?.name}`,
    description: company.seo?.defaultDescription,
  },
};

export default function ContattiPage() {
  return (
    <>
      <ContactPage />
      <Contact viewMode="footer" />
    </>
  );
}
