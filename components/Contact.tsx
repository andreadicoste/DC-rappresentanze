import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Quote, Star, NavArrowDown, ArrowRight } from './Icons';
import { COMPANY_DATA } from '@/constants';

interface ContactProps {
  viewMode?: 'full' | 'footer';
}

export default function Contact({ viewMode = 'footer' }: ContactProps) {
  
  return (
    <>
      {/* 1. SOCIAL PROOF - Only show in full mode */}
      {viewMode === 'full' && (
        <section id="reviews" className="py-24 bg-slate-50 relative border-t border-slate-200">
          <div className="container mx-auto px-6">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-primary text-center mb-16">
              Fiducia Costruita sui Risultati
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {COMPANY_DATA.reviews.map((review, idx) => (
                <div 
                  key={idx}
                  className="bg-white p-8 rounded-3xl shadow-soft relative border border-slate-100 hover:border-brand-accent/30 transition-colors hover:shadow-lg duration-300 overflow-hidden"
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} width={16} height={16} className="text-brand-accent fill-brand-accent" />
                    ))}
                  </div>
                  <p className="text-lg text-slate-700 mb-6 italic">"{review.text}"</p>
                  <div>
                    <p className="font-display font-bold text-brand-primary text-lg">{review.author}</p>
                    <p className="text-sm text-brand-accent font-medium">{review.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2. FAQ - Only show in full mode */}
      {viewMode === 'full' && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
             <h2 className="font-display text-3xl font-bold text-brand-primary mb-12 text-center">
                Domande Frequenti
              </h2>
             <div className="space-y-4">
               {COMPANY_DATA.faq.map((item, idx) => (
                 <details 
                   key={idx}
                   className="group bg-slate-50 rounded-xl open:bg-white open:shadow-md transition-all border border-transparent open:border-slate-100"
                 >
                   <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-brand-primary list-none hover:text-brand-accent transition-colors">
                     {item.q}
                     <NavArrowDown className="group-open:rotate-180 transition-transform text-slate-400" />
                   </summary>
                   <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100 pt-4 animate-fade-in">
                     {item.a}
                   </div>
                 </details>
               ))}
             </div>
          </div>
        </section>
      )}

      {/* 3. MEGA CORPORATE FOOTER - Always visible */}
      <footer id="contact" className="bg-brand-primary pt-24 pb-8 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none mix-blend-overlay"></div>

        <div className="container mx-auto px-6 relative z-10">
          
          {viewMode === 'full' && (
            <>
              <div className="max-w-4xl mx-auto text-center mb-20">
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                  Pronto a scalare la tua distribuzione?
                </h2>
                <p className="text-xl text-slate-400 mb-10 font-light">
                  Ottieni una struttura commerciale professionale, senza costi fissi. Analisi di fattibilità inclusa.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a 
                    href={`mailto:${COMPANY_DATA.business.email}`}
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-brand-accent hover:bg-blue-600 rounded-xl text-white font-bold transition-all shadow-glow hover:scale-105 active:scale-95"
                  >
                    <Mail width={20} height={20} />
                    Contatta Ora
                  </a>
                  <a 
                    href={`tel:${COMPANY_DATA.business.phone.replace(/\s/g, '')}`}
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all hover:scale-105 active:scale-95"
                  >
                    <Phone width={20} height={20} />
                    {COMPANY_DATA.business.phone}
                  </a>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-sm">
            <div className="space-y-6">
              <Link href="/">
                <img 
                  src="https://res.cloudinary.com/dz3v8yda9/image/upload/v1764439063/dc-royal_vrzzmd.svg" 
                  alt="DC Logo" 
                  className="h-8 w-auto brightness-0 invert opacity-90 cursor-pointer" 
                />
              </Link>
              <p className="text-slate-400 leading-relaxed">
                Partner strategico per lo sviluppo commerciale nel settore Food & Beverage in Puglia. GDO, Vending e Horeca.
              </p>
            </div>

            <div>
              <h4 className="font-display font-bold text-white text-lg mb-6">Esplora</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Home', path: '/' },
                  { label: 'Chi Siamo', path: '/chi-siamo' },
                  { label: 'Servizi', path: '/servizi' },
                  { label: 'Blog', path: '/blog' },
                  { label: 'Contatti', path: '/contatti' },
                  { label: 'Preventivo', path: '/preventivo' }
                ].map((item) => (
                  <li key={item.label}>
                    <Link 
                      href={item.path} 
                      className="text-slate-400 transition-colors hover:text-brand-accent hover:translate-x-1 duration-200 inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-white text-lg mb-6">Settori</h4>
              <ul className="space-y-4">
                {COMPANY_DATA.business.specializations.slice(0, 5).map((spec, i) => (
                  <li key={i} className="text-slate-400 transition-colors hover:text-brand-accent">
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-white text-lg mb-6">Sede Operativa</h4>
              <ul className="space-y-4 text-slate-400">
                <li className="flex items-start gap-3">
                  <MapPin className="text-brand-accent shrink-0 mt-0.5" width={18} height={18} />
                  <span>{COMPANY_DATA.business.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="text-brand-accent shrink-0" width={18} height={18} />
                  <a href={`mailto:${COMPANY_DATA.business.email}`} className="hover:text-white transition-colors">{COMPANY_DATA.business.email}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-brand-accent shrink-0" width={18} height={18} />
                  <a href={`tel:${COMPANY_DATA.business.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">{COMPANY_DATA.business.phone}</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <div>
              © {new Date().getFullYear()} {COMPANY_DATA.business.name} • P.IVA 03306640733
            </div>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-slate-300 transition-colors">Cookie Policy</Link>
              <Link href="#" className="hover:text-slate-300 transition-colors">Termini di Servizio</Link>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
