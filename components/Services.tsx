import React from 'react';
import Link from 'next/link';
import { Bag, Activity, Shop, Cart, Page, GraphUp, Check, Xmark, ArrowRight } from './Icons';
import { COMPANY_DATA } from '@/constants';

const ICONS = [Bag, Activity, Shop, Cart, Page, GraphUp];

export default function Services() {
  return (
    <div className="bg-white relative overflow-hidden">
      
      {/* 1. COMPARISON SECTION (Before vs After) - LIGHT THEME */}
      <section className="py-24 relative container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-brand-accent font-display font-bold tracking-widest text-xs uppercase mb-3 block">Il Confronto</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-primary leading-tight">
              L'evoluzione della <br className="hidden md:block" /> Rappresentanza.
            </h2>
          </div>

          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-200 relative overflow-hidden">
            
            <div className="grid grid-cols-2 gap-8 mb-8 relative z-10 border-b border-slate-100 pb-6">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <Xmark className="text-slate-400" width={16} height={16} />
                  </div>
                  <span className="font-display font-bold text-slate-400 uppercase tracking-wider text-xs md:text-sm">Gestione Tradizionale</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 shadow-sm">
                    <Check className="text-emerald-600" width={16} height={16} />
                  </div>
                  <span className="font-display font-bold text-emerald-600 uppercase tracking-wider text-xs md:text-sm">Metodo DC</span>
               </div>
            </div>

            <div className="space-y-2 relative z-10">
              {COMPANY_DATA.business.problemSolution.map((item, idx) => (
                <div 
                  key={idx}
                  className="grid grid-cols-2 gap-4 md:gap-12 py-6 px-4 md:px-6 rounded-xl hover:bg-slate-50 transition-colors items-center group border border-transparent hover:border-slate-100"
                >
                  <div className="text-slate-500 text-sm md:text-lg font-medium leading-relaxed decoration-slate-300">
                    {item.problem}
                  </div>
                  <div className="text-brand-primary text-sm md:text-lg font-bold leading-relaxed flex items-center gap-3 bg-emerald-50/50 -my-4 py-4 px-4 -mx-4 rounded-lg border border-transparent group-hover:border-emerald-100/50 transition-all">
                     <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
                     {item.solution}
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute left-1/2 top-24 bottom-12 w-px bg-slate-100 hidden md:block"></div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm mb-4">Analisi basata sulla media dei competitor locali.</p>
            <Link 
              href="/preventivo"
              className="inline-flex items-center justify-center gap-2 font-display font-bold text-brand-primary border-b-2 border-brand-accent/20 hover:border-brand-accent pb-1 transition-all hover:scale-105 active:scale-95"
            >
              Passa al livello successivo <ArrowRight width={16} height={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SERVICES GRID */}
      <section id="services" className="py-24 bg-slate-50 relative border-y border-slate-200">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
             <span className="text-brand-accent font-display font-bold tracking-widest text-xs uppercase mb-4 block">Operatività</span>
             <h2 className="font-display text-4xl font-bold text-brand-primary mb-4">I Nostri Servizi</h2>
             <p className="text-slate-500">Dalla strategia all'ordine: gestiamo l'intero ciclo di vita commerciale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPANY_DATA.business.services.map((service, idx) => {
              const Icon = ICONS[idx % ICONS.length];
              return (
                <div 
                  key={idx}
                  className="bg-white p-8 rounded-2xl shadow-soft border border-slate-100 group hover:border-brand-accent/40 transition-all cursor-default hover:-translate-y-1 hover:shadow-lg duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 group-hover:bg-brand-accent group-hover:text-white transition-all shadow-sm group-hover:shadow-glow">
                    <Icon className="text-brand-accent group-hover:text-white transition-colors" width={24} height={24} />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3 text-brand-primary">{service.split(' ').slice(0, 4).join(' ')}...</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">{service}</p>
                </div>
              );
            })}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/contatti" className="inline-flex items-center gap-2 text-brand-primary font-bold hover:text-brand-accent transition-colors border-b-2 border-transparent hover:border-brand-accent pb-1">
              Verifica se il tuo prodotto è adatto <ArrowRight width={18} height={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. SPECIALIZATIONS */}
      <section id="specializations" className="py-24 container mx-auto px-6">
        <div className="bg-brand-primary rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/20 blur-[120px] rounded-full pointer-events-none opacity-50" />
           
           <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
             <div>
               <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                 Specialisti del Food <br/><span className="text-brand-accent">In Puglia.</span>
               </h2>
               <p className="text-slate-300 text-lg mb-8 font-light">
                 Non siamo generalisti. Conosciamo le dinamiche specifiche del settore alimentare locale.
               </p>
               <div className="grid sm:grid-cols-2 gap-4">
                 {COMPANY_DATA.business.specializations.map((spec, idx) => (
                   <div key={idx} className="flex items-center gap-3 text-slate-200">
                     <Check width={18} height={18} className="text-brand-accent shrink-0" />
                     <span className="text-sm font-medium">{spec}</span>
                   </div>
                 ))}
               </div>
             </div>
             
             <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-10 rounded-3xl text-center shadow-2xl">
                <span className="block text-slate-300 text-sm uppercase tracking-widest mb-6 font-bold">Target Ideale</span>
                <div className="flex flex-wrap justify-center gap-3">
                  {COMPANY_DATA.business.targetAudience.map((target, idx) => (
                    <span key={idx} className="px-4 py-2 bg-white rounded-lg text-brand-primary font-display text-sm font-semibold shadow-sm">
                      {target}
                    </span>
                  ))}
                </div>
                <p className="mt-8 text-sm text-slate-400">Se rientri in queste categorie, possiamo scalare insieme.</p>
             </div>
           </div>
        </div>
      </section>

      {/* 4. METHOD */}
      <section id="method" className="py-24 bg-white relative">
         <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-brand-accent font-display font-bold tracking-widest text-xs uppercase mb-4 block">Processo</span>
              <h2 className="font-display text-4xl font-bold text-brand-primary">Come Iniziamo a Lavorare</h2>
              <p className="text-slate-500 mt-4">Un metodo lineare in 4 step per portarti risultati concreti.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {COMPANY_DATA.business.method.map((step, idx) => (
                <div key={idx} className="relative pt-8 group">
                   {idx < 3 && <div className="absolute top-12 left-1/2 w-full h-px bg-slate-200 hidden md:block" />}
                   
                   <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center font-display text-xl font-bold text-brand-primary mb-6 shadow-soft group-hover:border-brand-accent group-hover:text-brand-accent transition-all group-hover:shadow-lg group-hover:-translate-y-2 duration-300">
                        {step.step}
                      </div>
                      <h3 className="text-brand-primary font-bold text-lg mb-3">{step.title}</h3>
                      <p className="text-slate-500 text-sm px-4">{step.desc}</p>
                   </div>
                </div>
              ))}
            </div>
         </div>
      </section>
    </div>
  );
}