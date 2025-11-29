import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';
import About from './components/pages/About';
import ServicesPage from './components/pages/ServicesPage';
import ContactPage from './components/pages/ContactPage';
import BlogList from './components/pages/BlogList';
import BlogPost from './components/pages/BlogPost';
import QuoteCalculator from './components/pages/QuoteCalculator';

type Page = 'home' | 'about' | 'services' | 'contact' | 'blog' | 'blog-post' | 'quote';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-brand-accent selection:text-white bg-[#F8FAFC]">
      <Navbar />
      
      <main>
        {currentPage === 'home' && (
          <>
            <Hero />
            <Services />
            <Contact viewMode="full" />
          </>
        )}

        {currentPage === 'about' && <About />}
        
        {currentPage === 'services' && <ServicesPage onNavigate={navigate} />}
        
        {currentPage === 'contact' && <ContactPage />}
        
        {currentPage === 'blog' && <BlogList onNavigate={navigate} />}
        
        {currentPage === 'blog-post' && <BlogPost onNavigate={navigate} />}
        
        {currentPage === 'quote' && <QuoteCalculator />}
      </main>

      {/* Show footer on all pages except home (where it is part of the Contact component) */}
      {currentPage !== 'home' && (
        <Contact viewMode="footer" />
      )}
    </div>
  );
}