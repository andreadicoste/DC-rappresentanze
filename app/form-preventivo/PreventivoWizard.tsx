'use client';

import React, { useMemo, useState } from "react";
import company from "@/data/company.json";

const COMPANY_ID = company.companyId;

type EstimateInput = {
  serviceType: string;
  addons: string[];
  volumeStimato: number;
  referenze: number;
  urgency: "normale" | "alta";
  note?: string;
};

type EstimateResult = {
  min: number;
  max: number;
  recommended: number;
  breakdown: { label: string; value: number }[];
};

const serviceLabels: Record<string, string> = {
  ingresso_gdo: "Ingresso in GDO",
  cash_carry: "Piano Cash & Carry / Ingrosso",
  vending: "Canale Vending",
  audit_portafoglio: "Audit portafoglio prodotti",
};

const preventivatore = (company.preventivatore as {
  basePrices?: Record<string, number>;
  addons?: { id: string; label: string; price: number }[];
  multipliers?: Record<string, number>;
}) || { basePrices: {}, addons: [], multipliers: {} };

function calculateEstimate(input: EstimateInput): EstimateResult {
  const basePrice = preventivatore.basePrices?.[input.serviceType] || 0;
  let total = basePrice;
  const breakdown: { label: string; value: number }[] = [{ label: serviceLabels[input.serviceType] || "Servizio", value: basePrice }];

  input.addons.forEach((addonId) => {
    const addon = preventivatore.addons?.find((a: any) => a.id === addonId);
    if (addon) {
      total += addon.price;
      breakdown.push({ label: addon.label, value: addon.price });
    }
  });

  // Micro adeguamenti su volume e referenze
  const volumeMultiplier = input.volumeStimato > 0 ? 1 + Math.min(input.volumeStimato / 50000, 0.2) : 1;
  const referenzeMultiplier = input.referenze > 8 ? 1.1 : input.referenze > 3 ? 1.05 : 1;
  const urgencyMultiplier = input.urgency === "alta" ? preventivatore.multipliers?.urgenza_alta || 1.15 : 1;
  const targetMultiplier = preventivatore.multipliers?.target_catena_top || 1.1;

  const multiplier = volumeMultiplier * referenzeMultiplier * urgencyMultiplier * targetMultiplier;
  const recommended = Math.round(total * multiplier);
  return {
    min: Math.round(recommended * 0.9),
    max: Math.round(recommended * 1.15),
    recommended,
    breakdown,
  };
}

export default function PreventivoWizard() {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<EstimateInput>({
    serviceType: "ingresso_gdo",
    addons: [],
    volumeStimato: 20000,
    referenze: 3,
    urgency: "normale",
    note: "",
  });
  const [lead, setLead] = useState({ name: "", email: "", phone: "", address: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const estimate = useMemo(() => calculateEstimate(input), [input]);

  const toggleAddon = (id: string) => {
    setInput((prev) => ({
      ...prev,
      addons: prev.addons.includes(id) ? prev.addons.filter((a) => a !== id) : [...prev.addons, id],
    }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lead,
          estimate: estimate.recommended,
          source: company.contactMapping?.source,
          stage: company.contactMapping?.defaultStage,
          extraData: {
            companyId: COMPANY_ID,
            serviceType: input.serviceType,
            addons: input.addons,
            volumeStimato: input.volumeStimato,
            referenze: input.referenze,
            urgency: input.urgency,
            note: input.note,
          },
        }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error || "Errore nell'invio");
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Errore inatteso");
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-[#F8FAFC]">
      <div className="container mx-auto px-6 py-12 max-w-3xl">
        <div className="text-center mb-10">
          <span className="text-brand-accent font-display font-bold text-xs uppercase tracking-widest mb-3 block">
            Preventivatore
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-primary mb-3">Stima rapida</h1>
          <p className="text-slate-500">4 step semplici. Nessuna colonna doppia, tutto chiaro.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-soft border border-slate-100 p-8 space-y-8">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-brand-primary">Scegli il servizio</h2>
              <div className="space-y-3">
                {Object.entries(preventivatore.basePrices || {}).map(([key, price]) => (
                  <label
                    key={key}
                    className={`flex items-center justify-between border rounded-2xl px-4 py-3 cursor-pointer transition-colors ${
                      input.serviceType === key ? "border-brand-accent bg-blue-50" : "border-slate-200"
                    }`}
                  >
                    <div>
                      <div className="font-bold text-brand-primary">{serviceLabels[key] || key}</div>
                      <div className="text-slate-500 text-sm">Base: €{price}</div>
                    </div>
                    <input
                      type="radio"
                      name="service"
                      checked={input.serviceType === key}
                      onChange={() => setInput((prev) => ({ ...prev, serviceType: key }))}
                    />
                  </label>
                ))}
              </div>
              <div className="flex justify-between">
                <div />
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-brand-primary text-white rounded-xl font-bold transition-all duration-300 hover:bg-gradient-to-r hover:from-brand-accent hover:to-blue-400"
                >
                  Avanti
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-brand-primary">Dati tecnici</h2>
              <div className="space-y-3">
                <label className="block text-sm font-bold text-brand-primary">Volume stimato annuo (€)</label>
                <input
                  type="number"
                  value={input.volumeStimato}
                  onChange={(e) => setInput((prev) => ({ ...prev, volumeStimato: Number(e.target.value) || 0 }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                />
                <label className="block text-sm font-bold text-brand-primary mt-4">Numero referenze</label>
                <input
                  type="number"
                  value={input.referenze}
                  onChange={(e) => setInput((prev) => ({ ...prev, referenze: Number(e.target.value) || 0 }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                />
                <label className="block text-sm font-bold text-brand-primary mt-4">Urgenza</label>
                <select
                  value={input.urgency}
                  onChange={(e) => setInput((prev) => ({ ...prev, urgency: e.target.value as EstimateInput["urgency"] }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                >
                  <option value="normale">Normale</option>
                  <option value="alta">Alta (priorità)</option>
                </select>
                <div className="mt-4 space-y-2">
                  <div className="font-bold text-brand-primary text-sm">Extra</div>
                  {preventivatore.addons?.map((addon: any) => (
                    <label key={addon.id} className="flex items-center gap-3 text-slate-700">
                      <input
                        type="checkbox"
                        checked={input.addons.includes(addon.id)}
                        onChange={() => toggleAddon(addon.id)}
                      />
                      <span>
                        {addon.label} (+€{addon.price})
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-brand-primary hover:border-brand-accent transition"
                >
                  Indietro
                </button>
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-brand-primary text-white rounded-xl font-bold transition-all duration-300 hover:bg-gradient-to-r hover:from-brand-accent hover:to-blue-400"
                >
                  Avanti
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-brand-primary">I tuoi dati</h2>
              <label className="block text-sm font-bold text-brand-primary">Nome e cognome</label>
              <input
                type="text"
                value={lead.name}
                onChange={(e) => setLead((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                required
              />
              <label className="block text-sm font-bold text-brand-primary">Email</label>
              <input
                type="email"
                value={lead.email}
                onChange={(e) => setLead((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                required
              />
              <label className="block text-sm font-bold text-brand-primary">Telefono</label>
              <input
                type="tel"
                value={lead.phone}
                onChange={(e) => setLead((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
              />
              <label className="block text-sm font-bold text-brand-primary">Indirizzo / Azienda</label>
              <input
                type="text"
                value={lead.address}
                onChange={(e) => setLead((prev) => ({ ...prev, address: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
              />
              <label className="block text-sm font-bold text-brand-primary">Note tecniche (facoltative)</label>
              <textarea
                value={input.note}
                onChange={(e) => setInput((prev) => ({ ...prev, note: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all h-24"
                placeholder="Specifiche prodotti, tempistiche, canale..."
              />
              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-brand-primary hover:border-brand-accent transition"
                >
                  Indietro
                </button>
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-brand-primary text-white rounded-xl font-bold transition-all duration-300 hover:bg-gradient-to-r hover:from-brand-accent hover:to-blue-400"
                >
                  Avanti
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-brand-primary">Riepilogo e stima</h2>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
                <div className="text-sm text-slate-500">Servizio</div>
                <div className="text-brand-primary font-bold">{serviceLabels[input.serviceType] || input.serviceType}</div>
                <div className="text-sm text-slate-500">Stima</div>
                <div className="text-3xl font-display font-bold text-brand-primary">
                  €{estimate.min} - €{estimate.max}
                </div>
                <div className="text-sm text-slate-500">Raccomandato: €{estimate.recommended}</div>
              </div>
              <div className="space-y-2">
                {estimate.breakdown.map((item) => (
                  <div key={item.label} className="flex justify-between text-sm text-slate-700 border-b border-slate-100 pb-1">
                    <span>{item.label}</span>
                    <span>€{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-brand-primary hover:border-brand-accent transition"
                >
                  Indietro
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={status === "loading" || status === "success"}
                  className="px-6 py-3 bg-brand-primary text-white rounded-xl font-bold transition-all duration-300 hover:bg-gradient-to-r hover:from-brand-accent hover:to-blue-400 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "success" ? "Inviato" : status === "loading" ? "Invio..." : "Conferma e invia"}
                </button>
              </div>
              {status === "success" && (
                <p className="text-sm text-emerald-600">
                  Richiesta inviata correttamente. {company.leadCapture?.formSuccessMessage || "Ti ricontatteremo a breve."}
                </p>
              )}
              {status === "error" && error ? <p className="text-sm text-red-600">{error}</p> : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
