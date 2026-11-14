import React from 'react';
import { base64Images } from '../assets/base64Images';

export default function Hero() {
  return (
    <section id="home" className="relative pt-12 pb-14 lg:pt-16 lg:pb-18 overflow-hidden bg-brand-bg">
      {/* Background glow and subtle patterns */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-brand-lightBlue/60 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
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
          </div>

          {/* Right Column: Mr. Eswara Moorthy Transparent Cutout */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-4 lg:pt-0">
            {/* Soft Ambient Luxury Glow behind portrait */}
            <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-brand-secondary/20 via-brand-accent/25 to-blue-300/20 blur-3xl -z-10 pointer-events-none" />
            <div className="absolute w-64 h-64 rounded-full border border-brand-accent/20 -z-10 pointer-events-none" />

            <div className="relative mx-auto max-w-sm sm:max-w-md w-full flex justify-center">
              <img
                src={base64Images.hero}
                alt="Eswara Moorthy – Senior Insurance Advisor"
                className="w-auto h-[440px] sm:h-[500px] object-contain drop-shadow-[0_20px_35px_rgba(20,43,82,0.18)] transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
