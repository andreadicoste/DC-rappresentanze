import { NextResponse } from "next/server";
import company from "@/data/company.json";
import { getSupabaseServerClient } from "@/lib/supabase-server";

const COMPANY_ID = company.companyId;

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseServerClient({ allowMissing: false });
    const body = await request.json();
    const { name, email, phone, address, message, source, stage, estimate, extraData } = body || {};

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Nome ed email sono obbligatori" },
        { status: 400 }
      );
    }

    const notes = extraData
      ? `${company.contactMapping?.notesPrefix || "Dettagli preventivo"}:\n${JSON.stringify(
          extraData,
          null,
          2
        )}`
      : message || null;

    const payload = {
      company_id: COMPANY_ID,
      name,
      email,
      phone: phone || null,
      address: address || null,
      notes,
      source: source || (extraData ? company.contactMapping?.source || "preventivatore" : "contatto sito"),
      stage: stage || (extraData ? company.contactMapping?.defaultStage || "da contattare" : "da contattare"),
      estimate: estimate ?? null,
    };

    const { error } = await supabase.from("contacts").insert(payload);

    if (error) {
      console.error("[contact] insert error", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] unexpected error", err);
    return NextResponse.json({ success: false, error: "Errore inatteso" }, { status: 500 });
  }
}
