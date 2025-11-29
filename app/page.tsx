import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import company from "@/data/company.json";
import type { Metadata } from "next";

const defaultTitle = company.seo?.defaultTitle || `${company.business?.name} – ${company.business?.city}`;
const defaultDescription = company.seo?.defaultDescription || "";

export const metadata: Metadata = {
  title: defaultTitle,
  description: defaultDescription,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default function Home() {
  const ldJson = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.business?.name,
    address: company.business?.address,
    telephone: company.business?.phone,
  };

  return (
    <>
      <Hero />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />
      <Services />
      <Contact viewMode="full" />
    </>
  );
}
