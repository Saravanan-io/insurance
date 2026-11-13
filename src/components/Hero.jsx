import React from 'react';
import { 
  FileDown, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  Lock, 
  CheckCircle, 
  Sparkles,
  Award,
  Zap
} from 'lucide-react';
import { base64Images } from '../assets/base64Images';

export default function Hero({ onExploreClick, onGenerateClick, onLoadDemo }) {
  const trustIndicators = [
    {
      icon: FileText,
      title: 'Personalized Reports',
      desc: 'Tailored milestone projections with your custom financial values'
    },
    {
      icon: Zap,
      title: 'Instant PDF Download',
      desc: 'Clean, printable A4 documents delivered in seconds to your device'
    },
    {
      icon: Lock,
      title: 'Secure Client-Side Processing',
      desc: '100% in-browser generation with zero external server storage'
    }
  ];

  return (
    <section id="home" className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-brand-bg">
      {/* Background glow and subtle patterns */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-brand-lightBlue/60 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-lightBlue border border-brand-secondary/20 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                Smart Insurance &amp; Wealth Advisory Platform
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-navy tracking-tight leading-[1.12]">
              Secure Your Future.{' '}
              <span className="block text-brand-secondary">
                Protect Every Milestone.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-brand-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Create personalized insurance planning documents for your life's most important moments. Choose your plans, enter your details, and download your customized PDF instantly.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={onExploreClick}
                className="w-full sm:w-auto h-13 px-8 rounded-xl font-bold text-sm uppercase tracking-wider bg-brand-primary hover:bg-brand-navy text-white transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 active:scale-95 border border-brand-primary"
              >
                <span>Explore Insurance Plans</span>
                <ArrowRight className="w-4 h-4 text-brand-accent" />
              </button>

              <button
                type="button"
                onClick={onGenerateClick}
                className="w-full sm:w-auto h-13 px-8 rounded-xl font-bold text-sm uppercase tracking-wider bg-white hover:bg-slate-50 text-brand-secondary border-2 border-brand-secondary transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
              >
                <FileDown className="w-4 h-4 text-brand-secondary" />
                <span>Generate PDF</span>
              </button>

              {/* Instant 1-Click Demo */}
              <button
                type="button"
                onClick={onLoadDemo}
                className="w-full sm:w-auto h-13 px-4 rounded-xl font-semibold text-xs text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-all flex items-center justify-center gap-1.5"
                title="Prefill sample values to test generation immediately"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Quick Demo Data</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {trustIndicators.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 text-left">
                    <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center text-brand-secondary shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-brand-primary">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-brand-muted leading-snug mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Hero Visual with Overlays */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <img
                  src={base64Images.hero}
                  alt="Modern Indian Family Financial Security"
                  className="w-full h-[420px] sm:h-[480px] object-cover group-hover:scale-102 transition-transform duration-700"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/20 to-transparent" />

                {/* Bottom Card Overlay */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-brand-primary/80 backdrop-blur-md border border-brand-accent/30 text-white">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-accent flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      Family Milestone Blueprint
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Verified
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Eswara Moorthy Insurance Advisory
                  </h3>
                  <p className="text-xs text-slate-200 mt-0.5">
                    Marriage • Education • Retirement • Risk Protection
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: Top Right */}
              <div className="absolute -top-4 -right-4 sm:top-6 sm:-right-6 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3 backdrop-blur-md animate-bounce-subtle">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    Settlement Ratio
                  </div>
                  <div className="text-sm font-extrabold text-brand-primary">
                    99.4% Claim Record
                  </div>
                </div>
              </div>

              {/* Floating Badge 2: Bottom Left */}
              <div className="hidden sm:flex absolute -bottom-5 -left-6 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-100 items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-lightBlue border border-brand-secondary/30 flex items-center justify-center text-brand-secondary">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    PDF Generator
                  </div>
                  <div className="text-sm font-extrabold text-brand-secondary">
                    Individual &amp; Portfolio
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
