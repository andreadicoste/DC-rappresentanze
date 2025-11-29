'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Xmark } from './Icons';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass-panel rounded-2xl px-6 py-4 flex items-center justify-between border-white/50 bg-white/80 backdrop-blur-xl shadow-lg">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img 
              src="https://res.cloudinary.com/dz3v8yda9/image/upload/v1764439063/dc-royal_vrzzmd.svg" 
              alt="DC Rappresentanze" 
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {[
              { label: 'Chi Siamo', path: '/chi-siamo' },
              { label: 'Servizi', path: '/servizi' },
              { label: 'Blog', path: '/blog' },
            ].map((item) => (
              <Link 
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors relative group ${isActive(item.path) ? 'text-brand-accent' : 'text-slate-600 hover:text-brand-accent'}`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-accent transition-all duration-300 ${isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            ))}
            <Link 
              href="/contatti"
              className="px-5 py-2 rounded-lg bg-brand-primary text-white text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 hover:bg-gradient-to-r hover:from-brand-accent hover:to-blue-400 active:scale-95"
            >
              Contatti
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-brand-primary p-1" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <Xmark width={24} height={24} /> : <Menu width={24} height={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-24 left-6 right-6 glass-panel rounded-2xl p-6 flex flex-col gap-4 md:hidden border-white/60 bg-white/95 shadow-xl origin-top"
            >
              <Link href="/" onClick={() => setIsOpen(false)} className="text-left text-lg font-medium text-brand-primary py-3 border-b border-slate-100">Home</Link>
              <Link href="/chi-siamo" onClick={() => setIsOpen(false)} className="text-left text-lg font-medium text-brand-primary py-3 border-b border-slate-100">Chi Siamo</Link>
              <Link href="/servizi" onClick={() => setIsOpen(false)} className="text-left text-lg font-medium text-brand-primary py-3 border-b border-slate-100">Servizi</Link>
              <Link href="/blog" onClick={() => setIsOpen(false)} className="text-left text-lg font-medium text-brand-primary py-3 border-b border-slate-100">Blog</Link>
              <Link href="/preventivo" onClick={() => setIsOpen(false)} className="text-left text-lg font-medium text-brand-primary py-3 border-b border-slate-100">Preventivo</Link>
              <Link href="/contatti" onClick={() => setIsOpen(false)} className="bg-brand-accent text-white py-4 rounded-xl font-bold text-center mt-4 shadow-md active:scale-95 transition-transform">
                Richiedi Contatto
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
