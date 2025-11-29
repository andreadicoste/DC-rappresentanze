import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from './Icons';
import { COMPANY_DATA } from '@/constants';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-gradient-corporate">
      
      {/* 3D Composition Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.25),rgba(37,99,235,0)_70%)] opacity-30 blur-[60px]" />
        <div className="absolute bottom-[-80%] left-1/2 -translate-x-1/2 w-[1560px] h-[1560px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.2)_50%,rgba(37,99,235,0)_75%)] opacity-60 blur-[40px]" />
        <div className="absolute bottom-[-70%] left-1/2 -translate-x-1/2 w-[1534px] h-[1534px] rounded-full border-[40px] border-blue-200/80 opacity-85 blur-[2px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-8 hover:border-brand-accent transition-colors cursor-default animate-fade-in-up">
            <CheckCircle width={16} height={16} className="text-brand-accent" />
            <span className="text-xs font-bold text-slate-600 tracking-wide uppercase font-display">
              {COMPANY_DATA.business.valueProposition.microProof}
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 tracking-tight text-brand-primary text-balance animate-fade-in-up delay-100">
            Espandi il tuo Business Alimentare in Puglia <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-blue-400">
              Senza Rete Vendita Interna.
            </span>
          </h1>
          
          <p className="font-sans text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed text-balance animate-fade-in-up delay-200">
            {COMPANY_DATA.business.valueProposition.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-300">
            <Link 
              href="/contatti"
              className="w-full sm:w-auto px-8 py-4 bg-brand-primary text-white font-display font-bold rounded-xl overflow-hidden shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-gradient-to-r hover:from-brand-accent hover:to-blue-400"
            >
              Richiedi Consulenza Gratuita
              <ArrowRight width={18} height={18} />
            </Link>
            
            <Link 
              href="/chi-siamo"
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 rounded-xl font-display font-medium border border-slate-200 shadow-sm flex items-center justify-center hover:scale-105 hover:bg-slate-50 active:scale-95 transition-all duration-300"
            >
              Scopri come lavoriamo
            </Link>
          </div>

          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12 text-slate-400 text-sm font-medium animate-fade-in-up delay-500">
             <span className="uppercase tracking-widest text-xs font-bold text-slate-400">Specializzati in:</span>
             <span className="text-slate-600 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>GDO & Retail</span>
             <span className="text-slate-600 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>Vending</span>
             <span className="text-slate-600 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>Cash & Carry</span>
          </div>

        </div>
      </div>
      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-multiply"></div>
    </section>
  );
}
