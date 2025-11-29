
import React from 'react';
import { CheckCircle, MapPin, Activity, GraphUp } from '../Icons';
import { COMPANY_DATA } from '../../constants';

export default function About() {
  return (
    <div className="pt-24 min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <span className="text-brand-accent font-display font-bold tracking-widest text-xs uppercase mb-4 block">Chi Siamo</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-brand-primary mb-6">
            Il ponte tra i Brand <br /> e la Distribuzione Pugliese.
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Non siamo semplici agenti. Siamo un hub commerciale che connette produttori alimentari con i canali GDO, Vending e Ingrosso della Puglia.
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="container mx-auto px-6 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Anni di Esperienza", value: "15+" },
            { label: "Clienti serviti", value: "450+" },
            { label: "Province coperte", value: "6" },
            { label: "Crescita media", value: "22%" }
          ].map((stat, idx) => (
            <div key={idx} className="glass-card p-8 rounded-2xl text-center">
              <div className="text-4xl font-display font-bold text-brand-accent mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Narrative Section */}
      <section className="container mx-auto px-6 mb-24">
        <div className="glass-panel p-10 md:p-16 rounded-[2.5rem] relative overflow-hidden bg-white shadow-xl">
          <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <h2 className="font-display text-3xl font-bold text-brand-primary mb-6">La Nostra Missione</h2>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  Operiamo a <strong>{COMPANY_DATA.business.city}</strong> e in tutta la regione con un obiettivo chiaro: eliminare la complessità della vendita per i produttori.
                </p>
                <p>
                  Conosciamo il territorio. Sappiamo che la Puglia non è un mercato omogeneo, ma un tessuto complesso di relazioni locali, preferenze di consumo e dinamiche logistiche.
                </p>
                <p>
                  Il nostro approccio si basa sui dati, non sulle sensazioni. Monitoriamo ogni referenza, ogni punto vendita e ogni ordine per garantire che il tuo prodotto non sia solo "presente", ma "venduto".
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-3">
                {['Trasparenza', 'Territorialità', 'Analisi Dati', 'Relazione'].map((val, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-brand-primary font-medium text-sm flex items-center gap-2">
                    <CheckCircle width={16} height={16} className="text-brand-accent"/> {val}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200">
               {/* Abstract representation of territory/network */}
               <div className="absolute inset-0 bg-gradient-corporate opacity-50"></div>
               <div className="relative text-center p-8">
                  <MapPin width={64} height={64} className="text-brand-accent mx-auto mb-4 opacity-80" />
                  <h3 className="font-display text-2xl font-bold text-brand-primary">Copertura Capillare</h3>
                  <p className="text-slate-500 mt-2">Dalla Daunia al Salento.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder / Team Snippet */}
      <section className="container mx-auto px-6 pb-24 text-center">
         <h2 className="font-display text-3xl font-bold text-brand-primary mb-12">Leadership</h2>
         <div className="inline-block glass-card p-8 rounded-2xl max-w-md mx-auto hover:shadow-2xl transition-all duration-500 group">
            <div className="w-24 h-24 bg-brand-primary rounded-full mx-auto mb-6 flex items-center justify-center text-white font-display text-2xl font-bold border-4 border-white shadow-lg group-hover:scale-110 transition-transform">
              DC
            </div>
            <h3 className="text-xl font-bold text-brand-primary">Patrizio Di Coste</h3>
            <p className="text-brand-accent font-medium mb-4">Fondatore & Responsabile Commerciale</p>
            <p className="text-slate-500 text-sm italic">
              "La vendita è l'arte di mantenere le promesse. Noi promettiamo presenza e risultati."
            </p>
         </div>
      </section>
    </div>
  );
}
