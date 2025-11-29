
import React, { useState } from 'react';
import { ArrowRight, Check, Shop, Bag, GraphUp } from '../Icons';

export default function QuoteCalculator() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));

  return (
    <div className="pt-24 min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-4xl relative z-10">
        
        {/* Progress Header */}
        <div className="mb-8 text-center">
           <h1 className="font-display text-3xl font-bold text-brand-primary mb-4">Configura la tua Soluzione</h1>
           <div className="flex items-center justify-center gap-2">
             {[1, 2, 3].map(s => (
               <div key={s} className={`h-1.5 rounded-full transition-all duration-500 ${s <= step ? 'w-12 bg-brand-accent' : 'w-4 bg-slate-200'}`} />
             ))}
           </div>
        </div>

        {/* Main Glass Panel */}
        <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] bg-white/80 shadow-2xl min-h-[500px] flex flex-col">
           
           {/* Step 1: Sector */}
           {step === 1 && (
             <div className="animate-fade-in flex-grow flex flex-col">
                <h2 className="text-2xl font-bold text-brand-primary mb-8 text-center">In quale settore operi?</h2>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                   {[
                     { icon: Shop, label: "Produzione Alimentare", desc: "Prodotti finiti per GDO" },
                     { icon: Bag, label: "Beverage", desc: "Vino, Birra, Soft Drinks" },
                     { icon: GraphUp, label: "Vending & Snack", desc: "Monoporzioni e H24" }
                   ].map((opt, i) => (
                     <button key={i} onClick={nextStep} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-brand-accent hover:shadow-lg transition-all text-left group">
                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-brand-primary mb-4 group-hover:bg-brand-accent group-hover:text-white transition-colors">
                          <opt.icon width={24} height={24} />
                        </div>
                        <h3 className="font-bold text-brand-primary mb-1">{opt.label}</h3>
                        <p className="text-xs text-slate-500">{opt.desc}</p>
                     </button>
                   ))}
                </div>
             </div>
           )}

           {/* Step 2: Goal */}
           {step === 2 && (
             <div className="animate-fade-in flex-grow flex flex-col">
                <h2 className="text-2xl font-bold text-brand-primary mb-8 text-center">Qual è il tuo obiettivo principale?</h2>
                <div className="space-y-4 max-w-xl mx-auto w-full mb-8">
                   {['Entrare in GDO Locale', 'Sviluppare Rete Vendita Vending', 'Rilanciare Brand Esistente', 'Consulenza Strategica'].map((opt, i) => (
                     <button key={i} onClick={nextStep} className="w-full p-5 rounded-xl bg-white border border-slate-100 flex items-center justify-between hover:border-brand-accent hover:shadow-md transition-all group text-left">
                        <span className="font-medium text-slate-700 group-hover:text-brand-primary">{opt}</span>
                        <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-brand-accent flex items-center justify-center">
                           <div className="w-3 h-3 rounded-full bg-brand-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                     </button>
                   ))}
                </div>
             </div>
           )}

           {/* Step 3: Success */}
           {step === 3 && (
             <div className="animate-fade-in flex-grow flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6 shadow-glow">
                  <Check width={40} height={40} />
                </div>
                <h2 className="text-3xl font-display font-bold text-brand-primary mb-4">Profilo Completato</h2>
                <p className="text-slate-500 max-w-md mb-8">
                  Abbiamo abbastanza dati per formulare una proposta preliminare. Lascia la tua email per ricevere il report.
                </p>
                
                <div className="flex w-full max-w-md gap-3">
                  <input type="email" placeholder="tua@email.com" className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 focus:outline-none focus:border-brand-accent" />
                  <button className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:bg-gradient-to-r hover:from-brand-accent hover:to-blue-400">
                    Ricevi
                  </button>
                </div>
             </div>
           )}

           {/* Navigation Footer */}
           {step < 3 && (
             <div className="flex justify-between items-center mt-auto pt-8 border-t border-slate-100">
                <button 
                  onClick={() => setStep(Math.max(1, step - 1))} 
                  className={`text-slate-400 font-medium text-sm hover:text-brand-primary ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                >
                  Indietro
                </button>
                <button onClick={nextStep} className="flex items-center gap-2 bg-brand-accent text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-600 transition-all">
                  Continua <ArrowRight width={18} height={18} />
                </button>
             </div>
           )}

        </div>
      </div>
    </div>
  );
}
