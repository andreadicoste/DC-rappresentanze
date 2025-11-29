import React from 'react';
import { ArrowRight, Page } from '../Icons';

const BLOG_POSTS = [
  {
    title: "Tendenze GDO 2024 in Puglia: Cosa cambia?",
    excerpt: "Analisi dei consumi e delle nuove richieste della Grande Distribuzione Organizzata nel sud Italia.",
    category: "Analisi Mercato",
    date: "12 Ott 2023",
    readTime: "5 min"
  },
  {
    title: "Come posizionare un nuovo snack nel Vending",
    excerpt: "Strategie pratiche per entrare nel canale della distribuzione automatica con un nuovo prodotto dolciario.",
    category: "Strategia",
    date: "28 Set 2023",
    readTime: "7 min"
  },
  {
    title: "L'importanza del Packaging nel Cash & Carry",
    excerpt: "Perché l'imballaggio secondario è fondamentale quando si vende all'ingrosso.",
    category: "Logistica",
    date: "15 Set 2023",
    readTime: "4 min"
  },
  {
    title: "Case Study: +40% vendite per Brand Dolciario",
    excerpt: "Come abbiamo rilanciato un marchio storico attraverso una rete vendita capillare.",
    category: "Casi Studio",
    date: "02 Set 2023",
    readTime: "6 min"
  }
];

interface BlogListProps {
  onNavigate: (page: string) => void;
}

export default function BlogList({ onNavigate }: BlogListProps) {
  return (
    <div className="pt-24 min-h-screen bg-[#F8FAFC]">
      <section className="container mx-auto px-6 py-12">
        <div className="text-center mb-16 max-w-2xl mx-auto">
           <span className="text-brand-accent font-display font-bold text-xs uppercase tracking-widest mb-3 block">News & Insights</span>
           <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-primary mb-6">L'Osservatorio DC</h1>
           <p className="text-slate-500 text-lg">
             Approfondimenti, dati e strategie sul mondo della distribuzione alimentare.
           </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {['Tutti', 'Analisi Mercato', 'Strategia', 'Casi Studio', 'Vending'].map((cat, i) => (
             <button key={i} className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${i === 0 ? 'bg-brand-primary text-white border-brand-primary hover:bg-gradient-to-r hover:from-brand-accent hover:to-blue-400' : 'bg-white text-slate-600 border-slate-200 hover:border-brand-accent'}`}>
               {cat}
             </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <article 
              key={idx} 
              className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col h-full"
              onClick={() => onNavigate('blog-post')}
            >
              <div className="h-48 bg-slate-200 relative overflow-hidden">
                 <div className="absolute inset-0 bg-brand-primary/10 group-hover:scale-105 transition-transform duration-500"></div>
                 {/* Placeholder for image */}
                 <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    <Page width={32} height={32} />
                 </div>
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-brand-primary shadow-sm">
                   {post.category}
                 </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                 <div className="flex items-center gap-3 text-xs text-slate-400 mb-3 font-medium">
                   <span>{post.date}</span>
                   <span>•</span>
                   <span>{post.readTime}</span>
                 </div>
                 <h2 className="font-display text-xl font-bold text-brand-primary mb-3 group-hover:text-brand-accent transition-colors">
                   {post.title}
                 </h2>
                 <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                   {post.excerpt}
                 </p>
                 <div className="mt-auto flex items-center gap-2 text-brand-primary font-bold text-sm group-hover:gap-3 transition-all">
                   Leggi articolo <ArrowRight width={16} height={16} />
                 </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
