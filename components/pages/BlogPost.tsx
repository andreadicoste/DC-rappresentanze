import React from 'react';
import { ArrowRight, Check } from '../Icons';

interface BlogPostProps {
  onNavigate: (page: string) => void;
}

export default function BlogPost({ onNavigate }: BlogPostProps) {
  return (
    <div className="pt-24 min-h-screen bg-[#F8FAFC]">
      
      {/* Back Button */}
      <div className="container mx-auto px-6 pt-8">
        <button 
          onClick={() => onNavigate('blog')}
          className="flex items-center gap-2 text-slate-500 hover:text-brand-primary transition-colors text-sm font-medium"
        >
          <ArrowRight className="rotate-180" width={16} height={16} /> Torna al blog
        </button>
      </div>

      {/* Article Header */}
      <header className="container mx-auto px-6 py-12 max-w-4xl text-center">
         <div className="inline-block px-3 py-1 bg-blue-50 text-brand-accent text-xs font-bold rounded-lg mb-6 uppercase tracking-wide">
           Analisi Mercato
         </div>
         <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-primary mb-6 leading-tight">
           Tendenze GDO 2024 in Puglia: Cosa cambia per i fornitori?
         </h1>
         <div className="flex items-center justify-center gap-4 text-slate-500 text-sm font-medium">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-slate-200"></div>
             <span>Patrizio Di Coste</span>
           </div>
           <span>•</span>
           <span>12 Ottobre 2023</span>
         </div>
      </header>

      {/* Featured Image */}
      <div className="container mx-auto px-6 max-w-5xl mb-16">
        <div className="aspect-video bg-slate-200 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-corporate opacity-30"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-[1fr_300px] gap-12 max-w-5xl">
         
         {/* Main Content */}
         <article className="prose prose-slate prose-lg max-w-none text-slate-600">
           <p className="lead text-xl text-brand-primary font-medium mb-8">
             Il mercato pugliese sta vivendo una fase di consolidamento. Le piccole catene locali si aggregano, mentre i discount aumentano la quota di prodotti premium. Ecco come adattarsi.
           </p>
           
           <h2 className="font-display text-2xl font-bold text-brand-primary mt-8 mb-4">1. La richiesta di prodotti locali tracciati</h2>
           <p className="mb-6">
             Non basta più scrivere "Prodotto in Puglia". I buyer della GDO richiedono storytelling, certificazioni di filiera e packaging che comunichi valore. Abbiamo notato un aumento del 15% nelle referenze "local" negli ultimi 6 mesi.
           </p>

           <h2 className="font-display text-2xl font-bold text-brand-primary mt-8 mb-4">2. Il Cash & Carry si evolve</h2>
           <p className="mb-6">
             Il canale ingrosso non è più solo prezzo. Diventa un hub di servizi per l'Horeca. I formati richiesti stanno cambiando: pack più piccoli, alta resa, prodotti semilavorati di qualità.
           </p>

           <div className="bg-blue-50 border-l-4 border-brand-accent p-6 my-8 rounded-r-xl">
             <h4 className="font-bold text-brand-primary mb-2">Insight Chiave</h4>
             <p className="text-sm">
               Chi non adatta il packaging alle nuove esigenze logistiche rischia il delisting entro 12 mesi.
             </p>
           </div>

           <h2 className="font-display text-2xl font-bold text-brand-primary mt-8 mb-4">Conclusione</h2>
           <p>
             L'opportunità c'è, ma serve struttura. Affidarsi a un partner che conosce i category manager e le logiche di scaffale è l'unico modo per non sprecare budget.
           </p>
         </article>

         {/* Sidebar */}
         <aside className="space-y-8 h-fit sticky top-32">
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-bold text-brand-primary mb-4">In breve</h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-slate-600">
                  <Check width={16} height={16} className="text-brand-accent shrink-0 mt-0.5" />
                  Consolidamento catene locali
                </li>
                <li className="flex gap-3 text-sm text-slate-600">
                  <Check width={16} height={16} className="text-brand-accent shrink-0 mt-0.5" />
                  Focus su prodotti tracciati
                </li>
                <li className="flex gap-3 text-sm text-slate-600">
                  <Check width={16} height={16} className="text-brand-accent shrink-0 mt-0.5" />
                  Evoluzione formati Horeca
                </li>
              </ul>
            </div>

            <div className="bg-brand-primary text-white p-6 rounded-2xl text-center shadow-2xl relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="font-bold text-xl mb-2">Vuoi entrare in GDO?</h3>
                 <p className="text-sm text-slate-300 mb-6">Valutiamo il tuo prodotto gratuitamente.</p>
                 <button 
                  onClick={() => onNavigate('contact')}
                  className="w-full bg-brand-primary text-white py-3 rounded-lg font-bold text-sm transition-all duration-300 hover:bg-gradient-to-r hover:from-brand-accent hover:to-blue-400 hover:scale-105"
                 >
                   Contattaci
                 </button>
               </div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-[50px] opacity-20"></div>
            </div>
         </aside>

      </div>
    </div>
  );
}
