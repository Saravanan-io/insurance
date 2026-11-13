import React, { useState } from 'react';
import { 
  FileCheck, 
  Download, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  Loader2,
  BookOpenCheck,
  ShieldCheck,
  Info
} from 'lucide-react';
import { formatIndianCurrency, formatCurrencyInWords } from '../utils/formatters';
import { insuranceFeaturesMeta } from '../data/insuranceData';
import { generateCombinedPortfolioPDF } from '../utils/pdfGenerator';
import { planValidators } from '../utils/validation';
import confetti from 'canvas-confetti';

export default function SelectedPlans({
  plansState,
  onToggleSelect,
  onSelectAll,
  onClearAll,
  onLoadDemo,
  onSetFormErrors,
  onPdfSuccess
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [validationAlert, setValidationAlert] = useState(null);

  // Filter selected keys
  const selectedKeys = Object.keys(plansState).filter(
    (key) => plansState[key].selected
  );

  // Calculate informational sum of entered values
  let totalInformationalSum = 0;
  selectedKeys.forEach((key) => {
    const data = plansState[key];
    if (key === 'marriage') totalInformationalSum += Number(data.marriageValue) || 0;
    else if (key === 'education') totalInformationalSum += Number(data.educationValue) || 0;
    else if (key === 'retirement') totalInformationalSum += Number(data.retirementValue) || 0;
    else if (key === 'accidentalRisk') totalInformationalSum += Number(data.coverageValue) || 0;
    else if (key === 'lifeRisk') totalInformationalSum += Number(data.coverageValue) || 0;
  });

  // Handle Combined PDF Portfolio generation
  const handleGeneratePortfolio = async () => {
    if (selectedKeys.length === 0) {
      setValidationAlert('Please select at least one insurance plan to generate a portfolio.');
      return;
    }

    // Validate ALL selected plans
    let hasErrors = false;
    const errorsPerPlan = {};

    selectedKeys.forEach((key) => {
      const validator = planValidators[key];
      if (validator) {
        const result = validator(plansState[key]);
        if (!result.isValid) {
          hasErrors = true;
          errorsPerPlan[key] = result.errors;
        }
      }
    });

    if (hasErrors) {
      onSetFormErrors(errorsPerPlan);
      setValidationAlert(
        'Some selected insurance plans have missing or invalid fields. Please review highlighted inputs above.'
      );
      // Scroll to first error
      const firstErrorCard = document.getElementById('plans-grid');
      if (firstErrorCard) {
        firstErrorCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    setValidationAlert(null);
    setIsGenerating(true);

    try {
      const result = await generateCombinedPortfolioPDF(selectedKeys, plansState);
      
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Confetti optional
      }

      if (onPdfSuccess) {
        onPdfSuccess({
          title: 'Complete Insurance Portfolio',
          fileName: result.fileName,
          pageCount: result.pageCount
        });
      }
    } catch (error) {
      console.error('Portfolio generation error:', error);
      alert('Failed to generate complete portfolio. Please review details and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="summary" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-brand-primary via-brand-navy to-brand-dark rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-brand-accent/30 relative overflow-hidden">
        {/* Background Decorative Rings */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full border border-brand-accent/10 pointer-events-none" />
        <div className="absolute right-10 -top-10 w-60 h-60 rounded-full bg-brand-secondary/10 blur-3xl pointer-events-none" />

        {/* Top Control Bar: Title & Utility Buttons */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-accent/20 text-brand-accent border border-brand-accent/40 flex items-center gap-1.5">
                <BookOpenCheck className="w-3.5 h-3.5" />
                Portfolio Summary
              </span>
              <span className="text-xs text-slate-300 font-medium">
                {selectedKeys.length} of 5 Plans Selected
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Your Selected Insurance Plans
            </h2>
          </div>

          {/* Quick utility controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onLoadDemo}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-brand-accent border border-brand-accent/30 transition flex items-center gap-1.5 active:scale-95"
              title="Prefill sample family data to test the generator instantly"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
              <span>Load Demo Data</span>
            </button>
            <button
              type="button"
              onClick={onSelectAll}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition flex items-center gap-1.5 active:scale-95"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Select All (5)</span>
            </button>
            <button
              type="button"
              onClick={onClearAll}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-300 border border-white/15 transition flex items-center gap-1.5 active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Selected Plan Category Badges */}
        <div className="relative z-10 py-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Active Milestone Modules in Portfolio:
          </p>
          {selectedKeys.length === 0 ? (
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-sm text-slate-300">
                No plans currently selected. Check one or more plans above to build your custom portfolio.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {insuranceFeaturesMeta.map((meta) => {
                const isChecked = selectedKeys.includes(meta.id);
                const data = plansState[meta.id];
                let displayVal = 0;
                if (meta.id === 'marriage') displayVal = Number(data.marriageValue) || 0;
                else if (meta.id === 'education') displayVal = Number(data.educationValue) || 0;
                else if (meta.id === 'retirement') displayVal = Number(data.retirementValue) || 0;
                else if (meta.id === 'accidentalRisk') displayVal = Number(data.coverageValue) || 0;
                else if (meta.id === 'lifeRisk') displayVal = Number(data.coverageValue) || 0;

                return (
                  <div
                    key={meta.id}
                    onClick={() => onToggleSelect(meta.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isChecked
                        ? 'bg-white/10 border-brand-accent/50 shadow-inner'
                        : 'bg-white/5 border-white/5 opacity-50 hover:opacity-80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                          isChecked
                            ? 'bg-brand-accent text-brand-dark'
                            : 'bg-white/10 text-slate-400'
                        }`}
                      >
                        {isChecked ? '✓' : '+'}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {meta.title}
                        </div>
                        <div className="text-xs text-brand-accent font-medium">
                          {displayVal > 0 ? formatIndianCurrency(displayVal) : 'Pending input'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {isChecked ? 'Included' : 'Click to add'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Validation Error Alert if any */}
        {validationAlert && (
          <div className="relative z-10 mb-6 p-4 rounded-xl bg-rose-500/20 border border-rose-500/50 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="text-sm text-rose-100">
              <strong className="font-semibold">Action Required:</strong> {validationAlert}
            </div>
          </div>
        )}

        {/* Informational Sum & Main Generate Button */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span>Total Entered Financial Value</span>
              <span className="text-brand-accent">*</span>
            </div>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-brand-accent">
                {formatIndianCurrency(totalInformationalSum)}
              </span>
              <span className="text-sm text-slate-300 font-medium">
                {formatCurrencyInWords(totalInformationalSum)}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 max-w-xl flex items-center gap-1">
              <Info className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>
                Informational sum of your planned milestones and coverage targets, not a single premium or recommended bundled cost.
              </span>
            </p>
          </div>

          {/* Action CTA */}
          <div className="w-full lg:w-auto">
            <button
              type="button"
              onClick={handleGeneratePortfolio}
              disabled={isGenerating || selectedKeys.length === 0}
              className="w-full lg:w-auto min-w-[280px] h-14 px-8 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-3 bg-gradient-to-r from-brand-accent via-amber-400 to-brand-accent text-brand-dark hover:shadow-gold-glow active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed shadow-xl"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-brand-dark" />
                  <span>Compiling Portfolio PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 text-brand-dark" />
                  <span>Generate Complete Portfolio ({selectedKeys.length} Plans)</span>
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-slate-400 mt-2">
              Generates multi-page bound PDF with Cover Page &amp; Table of Contents
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
