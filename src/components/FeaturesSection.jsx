import React from 'react';
import { ShieldCheck, Lock, Award, FileSpreadsheet, Sparkles, CheckCircle2 } from 'lucide-react';
import { companyDetails } from '../data/insuranceData';

export default function FeaturesSection() {
  const features = [
    {
      icon: Lock,
      title: 'Zero-Trace Client-Side Privacy',
      desc: 'All calculations, form data, and PDF assembly occur strictly inside your web browser. No personal data is transmitted or saved on servers.'
    },
    {
      icon: Award,
      title: 'Actuarial Milestone Insights',
      desc: 'Each plan page incorporates inflation resilience factors, goal horizons, and statutory tax exemption references (Sec 80C & 10(10D)).'
    },
    {
      icon: FileSpreadsheet,
      title: 'Dual PDF Export Architecture',
      desc: 'Generate granular single-plan documents for specific requirements, or generate an all-inclusive multi-page portfolio with cover page and table of contents.'
    },
    {
      icon: ShieldCheck,
      title: 'IRDAI Framework Aligned',
      desc: 'Designed according to recognized Indian insurance advisory standards with clear nominee allocations and risk classification.'
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-24 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Summary */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
              Why Eswara Moorthy Insurance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight">
              Institutional Quality Planning at Your Fingertips
            </h2>
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              We bridge traditional insurance expertise with modern browser technology. Build customized life milestone plans with photorealistic visuals, official seals, and tailored advice in moments.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 border-t border-slate-200">
              {companyDetails.trustMetrics.map((metric, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                  <div className="text-xl font-extrabold text-brand-secondary">
                    {metric.value}
                  </div>
                  <div className="text-[11px] font-semibold text-brand-muted mt-0.5">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card hover:shadow-card-hover transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-lightBlue border border-brand-secondary/30 flex items-center justify-center text-brand-secondary mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-brand-primary mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
