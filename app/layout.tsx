import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import React from "react";
import company from "@/data/company.json";
import { createServerClient } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "DC Rappresentanze | Agenzia Alimentare B2B",
  description: "DC Rappresentanze - Agenzia di rappresentanza alimentare B2B in Puglia. Gestione vendite e sviluppo portafoglio clienti.",
  icons: {
    icon: 'https://res.cloudinary.com/dz3v8yda9/image/upload/v1764439063/dc-royal_vrzzmd.svg',
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createServerClient();
  const { data: ga } = await supabase
    .from("companies")
    .select("ga_measurement_id")
    .eq("id", company.companyId)
    .single();

  const gaId = ga?.ga_measurement_id;

  return (
    <html lang="it" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap" rel="stylesheet" />
        {gaId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        ) : null}
      </head>
      <body className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-brand-accent selection:text-white">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
