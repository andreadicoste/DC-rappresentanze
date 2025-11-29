import React from 'react';
import Link from 'next/link';
import { Bag, Shop, Cart, GraphUp, Check } from '../Icons';
import { COMPANY_DATA } from '../../constants';

const iconsMap = [Bag, Shop, Cart, GraphUp, Bag, Shop];

export default function ServicesPage() {
  return (
    <div className="pt-24 min-h-screen bg-[#F8FAFC]">
      
      {/* Header */}
      <section className="bg-gradient-corporate text-brand-primary py-20 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
           <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Soluzioni Commerciali B2B</h1>
           <p className="text-slate-600 text-lg max-w-2xl mx-auto">
             Un portafoglio di servizi integrato per coprire ogni fase del ciclo di vendita, dall'introduzione del prodotto al riordino.
           </p>
        </div>
      </section>

      {/* Detailed Services Grid */}
      <section className="container mx-auto px-6 py-24 -mt-10 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COMPANY_DATA.business.services.map((service, idx) => {
            const Icon = iconsMap[idx % iconsMap.length];
            return (
              <div key={idx} className="glass-card p-10 rounded-2xl flex flex-col items-start hover:border-brand-accent/50 transition-all duration-300 group">
                <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-accent group-hover:text-white transition-colors shadow-sm">
                  <Icon width={28} height={28} />
                </div>
                
                <h3 className="font-display text-2xl font-bold text-brand-primary mb-4">
                  {service}
                </h3>
                
                <p className="text-slate-500 mb-8 leading-relaxed">
                  Offriamo un approccio strutturato per garantire che questo aspetto critico del tuo business sia gestito con la massima efficienza.
                </p>

                <div className="mt-auto w-full bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Cosa Include:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <Check width={14} height={14} className="text-emerald-500 mt-1 shrink-0" />
                      <span>Analisi preliminare e fattibilità</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <Check width={14} height={14} className="text-emerald-500 mt-1 shrink-0" />
                      <span>Reportistica mensile dedicata</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <Check width={14} height={14} className="text-emerald-500 mt-1 shrink-0" />
                      <span>Supporto dedicato 24/48h</span>
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white border-y border-slate-100 py-20 px-6 text-center">
         <div className="container mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-bold text-brand-primary mb-6">Hai un prodotto da lanciare?</h2>
            <p className="text-slate-500 mb-8">
              Analizziamo gratuitamente il potenziale del tuo catalogo nel mercato pugliese.
            </p>
            <Link
              href="/form-preventivo"
              className="bg-brand-accent text-white px-8 py-4 rounded-xl font-bold shadow-glow hover:scale-105 transition-transform inline-block"
            >
              Richiedi Analisi Gratuita
            </Link>
         </div>
      </section>
    </div>
  );
}
