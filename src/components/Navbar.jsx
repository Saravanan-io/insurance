import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, ArrowRight, FileCheck, PhoneCall } from 'lucide-react';
import { companyDetails } from '../data/insuranceData';

export default function Navbar({ selectedCount = 0, onGenerateClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Insurance Plans', href: '#plans' },
    { name: 'Selected Plans', href: '#summary' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
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

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs font-semibold uppercase tracking-wider text-slate-200 hover:text-brand-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="tel:18004258899"
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition hidden xl:flex"
            >
              <PhoneCall className="w-3.5 h-3.5 text-brand-accent" />
              <span>{companyDetails.tollFree}</span>
            </a>

            <button
              type="button"
              onClick={onGenerateClick}
              className="h-10 px-5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-brand-accent to-amber-400 text-brand-dark hover:shadow-gold-glow transition-all flex items-center gap-2 active:scale-95 shadow-md"
            >
              <FileCheck className="w-3.5 h-3.5 text-brand-dark" />
              <span>Generate Your Plan</span>
              {selectedCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-brand-primary text-white text-[10px] flex items-center justify-center font-bold">
                  {selectedCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-navy border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:text-brand-accent hover:bg-white/5 transition"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onGenerateClick();
              }}
              className="w-full h-11 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-brand-accent to-amber-400 text-brand-dark transition-all flex items-center justify-center gap-2"
            >
              <FileCheck className="w-4 h-4 text-brand-dark" />
              <span>Generate Your Plan ({selectedCount} Selected)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
