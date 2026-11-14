import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-primary/95 backdrop-blur-md shadow-lg py-3 border-b border-brand-accent/20'
          : 'bg-brand-primary py-4 border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a
            href="#"
            onClick={handleNavClick}
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-secondary to-brand-primary border border-brand-accent/40 flex items-center justify-center text-brand-accent shadow-md group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 fill-brand-accent/20" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white block leading-none">
                ESWARA MOORTHY
              </span>
              <span className="text-[10px] tracking-widest uppercase font-bold text-brand-accent block mt-0.5">
                INSURANCE ADVISORY
              </span>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
}
