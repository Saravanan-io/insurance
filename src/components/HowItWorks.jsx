import React from 'react';
import { CheckSquare, Edit3, FileDown, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Select Your Life Goals',
      desc: 'Pick any combination of Marriage, Higher Education, Retirement, Accidental, or Life Risk protection plans.',
      icon: CheckSquare
    },
    {
      step: '02',
      title: 'Enter Milestone Values',
      desc: 'Provide your personal details, target years, and planned corpus amounts. Real-time Indian currency format guides you.',
      icon: Edit3
    },
    {
      step: '03',
      title: 'Download Certified PDF',
      desc: 'Generate either individual single-goal reports or compile an executive multi-page bound portfolio PDF directly to your device.',
      icon: FileDown
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
            Streamlined Client Experience
          </span>
          <h2 className="text-3xl font-extrabold text-brand-navy tracking-tight mt-1">
            How The Smart PDF Generator Works
          </h2>
          <p className="text-sm text-brand-muted mt-2">
            Generate institutional-grade insurance proposals in three intuitive steps without registration or backend delays.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-brand-bg rounded-2xl p-6 sm:p-8 border border-slate-200 hover:border-brand-secondary/30 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-brand-secondary shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-300 font-mono">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-brand-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
