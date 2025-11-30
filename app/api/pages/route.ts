import { NextResponse } from "next/server";

type PageEntry = {
  path: string;
  label: string;
  is_main: boolean;
};

const PAGES: PageEntry[] = [
  { path: "/", label: "Home", is_main: true },
  { path: "/chi-siamo", label: "Chi siamo", is_main: true },
  { path: "/servizi", label: "Servizi", is_main: true },
  { path: "/blog", label: "Blog", is_main: true },
  { path: "/contatti", label: "Contatti", is_main: true },
  { path: "/form-preventivo", label: "Preventivatore", is_main: true },
];

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(PAGES);
}
