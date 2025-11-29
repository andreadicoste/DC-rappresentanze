
'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight } from '../Icons';
import { COMPANY_DATA } from '../../constants';
import company from '@/data/company.json';

const CONTACT_SUCCESS = company.leadCapture?.formSuccessMessage || "Grazie! Ti ricontatteremo entro 24 ore.";

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  address: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof typeof INITIAL_FORM) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Errore nell'invio del form");
      }

      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Errore inatteso");
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-[#F8FAFC] flex flex-col">
      <div className="container mx-auto px-6 py-12 flex-grow">
        
        <div className="grid lg:grid-cols-2 gap-6 h-full min-h-[600px]">
          
          {/* Left Column: Info & Map */}
          <div className="flex flex-col gap-6">
            <div className="bg-brand-primary text-white p-10 rounded-[2rem] relative overflow-hidden shadow-2xl">
               <div className="relative z-10">
                 <h1 className="font-display text-4xl font-bold mb-8">Parliamo di Business.</h1>
                 <p className="text-slate-300 mb-12 text-lg">
                   Siamo pronti ad ascoltare il tuo progetto. Contattaci per una consulenza senza impegno.
                 </p>
                 
                 <div className="space-y-6">
                   <div className="flex items-center gap-4 group cursor-pointer">
                     <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-accent transition-colors">
                       <Mail width={20} height={20} />
                     </div>
                     <div>
                       <div className="text-xs text-slate-400 uppercase tracking-wide">Email</div>
                       <div className="font-medium text-lg">{COMPANY_DATA.business.email}</div>
                     </div>
                   </div>
                   
                   <div className="flex items-center gap-4 group cursor-pointer">
                     <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-accent transition-colors">
                       <Phone width={20} height={20} />
                     </div>
                     <div>
                       <div className="text-xs text-slate-400 uppercase tracking-wide">Telefono</div>
                       <div className="font-medium text-lg">{COMPANY_DATA.business.phone}</div>
                     </div>
                   </div>

                   <div className="flex items-center gap-4 group">
                     <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-accent transition-colors">
                       <MapPin width={20} height={20} />
                     </div>
                     <div>
                       <div className="text-xs text-slate-400 uppercase tracking-wide">Sede</div>
                       <div className="font-medium text-lg">{COMPANY_DATA.business.address}</div>
                     </div>
                   </div>
                 </div>
               </div>
               
               {/* Decor */}
               <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-accent/20 rounded-full blur-[80px]" />
            </div>

            {/* Map Placeholder */}
            <div className="bg-slate-200 rounded-[2rem] flex-grow min-h-[300px] relative overflow-hidden grayscale opacity-80 hover:grayscale-0 transition-all duration-500">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.0!2d17.4!3d40.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI0JzAwLjAiTiAxN8KwMjQnMDAuMCJF!5e0!3m2!1sit!2sit!4v1620000000000!5m2!1sit!2sit" 
                 width="100%" 
                 height="100%" 
                 style={{border:0}} 
                 allowFullScreen 
                 loading="lazy"
                 className="absolute inset-0"
               ></iframe>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="glass-card p-10 md:p-14 rounded-[2rem] flex flex-col justify-center">
             <h2 className="font-display text-2xl font-bold text-brand-primary mb-8">Inviaci un messaggio</h2>
             <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-brand-primary">Nome</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={handleChange("name")}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                        placeholder="Il tuo nome"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-brand-primary">Azienda</label>
                      <input
                        type="text"
                        value={form.address}
                        onChange={handleChange("address")}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                        placeholder="Nome azienda"
                      />
                   </div>
                </div>
                
                <div className="space-y-2">
                   <label className="text-sm font-bold text-brand-primary">Email</label>
                   <input
                     type="email"
                     value={form.email}
                     onChange={handleChange("email")}
                     required
                     className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                     placeholder="name@company.com"
                   />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-primary">Telefono</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                    placeholder="+39 ..."
                  />
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-bold text-brand-primary">Messaggio</label>
                   <textarea
                     value={form.message}
                     onChange={handleChange("message")}
                     className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all h-32"
                     placeholder="Descrivi le tue esigenze..."
                   ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-gradient-to-r hover:from-brand-accent hover:to-blue-400 hover:shadow-glow hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Invio in corso..." : "Invia Richiesta"} <ArrowRight width={18} height={18} />
                </button>
                <p className="text-xs text-slate-400 text-center">
                  {status === "success" ? CONTACT_SUCCESS : "Ti risponderemo entro 24 ore lavorative."}
                </p>
                {status === "error" && error ? (
                  <p className="text-sm text-red-600 text-center">{error}</p>
                ) : null}
             </form>
          </div>

        </div>
      </div>
    </div>
  );
}
