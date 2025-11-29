import About from "@/components/pages/About";
import Contact from "@/components/Contact";
import { Metadata } from "next";
import company from "@/data/company.json";

export const metadata: Metadata = {
  title: `Chi Siamo | ${company.business?.name}`,
  description: company.seo?.defaultDescription,
  openGraph: {
    title: `Chi Siamo | ${company.business?.name}`,
    description: company.seo?.defaultDescription,
    url: "/chi-siamo",
  },
  twitter: {
    card: "summary_large_image",
    title: `Chi Siamo | ${company.business?.name}`,
    description: company.seo?.defaultDescription,
  },
};

export default function ChiSiamoPage() {
  return (
    <>
      <About />
      <Contact viewMode="footer" />
    </>
  );
}
