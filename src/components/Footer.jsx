import React from 'react';
import { Shield, Heart, ArrowUp, Lock } from 'lucide-react';
import { companyDetails } from '../data/insuranceData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-dark text-slate-300 pt-16 pb-12 border-t border-brand-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-secondary to-brand-primary border border-brand-accent/40 flex items-center justify-center text-brand-accent shadow-md">
                <Shield className="w-5 h-5 fill-brand-accent/20" />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white block leading-none">
                  ESWARA MOORTHY
                </span>
                <span className="text-[10px] tracking-widest uppercase font-bold text-brand-accent block mt-0.5">
                  INSURANCE ADVISORY
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Providing premier life milestone insurance planning and personalized risk architecture across Tamil Nadu and South India since 1998.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-brand-accent font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>100% In-Browser Client-Side Processing • Zero Data Logging</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Insurance Plans
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#plans" className="hover:text-brand-accent transition">Marriage Planning</a></li>
              <li><a href="#plans" className="hover:text-brand-accent transition">Education Fund</a></li>
              <li><a href="#plans" className="hover:text-brand-accent transition">Retirement Pension</a></li>
              <li><a href="#plans" className="hover:text-brand-accent transition">Accidental Risk Protection</a></li>
              <li><a href="#plans" className="hover:text-brand-accent transition">Life Risk Cover</a></li>
            </ul>
          </div>

          {/* Regulatory & Safety */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Governance &amp; Trust
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><span>{companyDetails.registration}</span></li>
              <li><span>Settlement Ratio: 99.4%</span></li>
              <li><span>ISO 27001 Certified Security</span></li>
              <li><span>IRDAI Code of Conduct</span></li>
              <li><span>Anti-Fraud Compliance</span></li>
            </ul>
          </div>

          {/* Head Office */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Advisory Desk
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="leading-snug">{companyDetails.address}</p>
              <p className="text-white font-semibold pt-1">Toll-Free: {companyDetails.tollFree}</p>
              <p className="text-brand-accent">{companyDetails.email}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} {companyDetails.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-slate-400">Privacy Policy</span>
            <span className="text-slate-400">Terms of Advisory</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition flex items-center gap-1.5"
            >
              <ArrowUp className="w-3.5 h-3.5 text-brand-accent" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Regulatory Statutory Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-400 leading-relaxed">
          <strong className="text-slate-300">Statutory Notice:</strong> Insurance is the subject matter of solicitation. The financial planning figures, milestone estimates, and downloadable PDF reports generated by this application are for illustrative and advisory planning purposes only. Policies are issued subject to underwriting guidelines, medical examinations, and applicable statutory taxes.
        </div>
      </div>
    </footer>
  );
}
