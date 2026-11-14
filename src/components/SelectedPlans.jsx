import React, { useState } from 'react';
import { 
  Download, 
  AlertTriangle, 
  Loader2,
  ShieldCheck
} from 'lucide-react';
import { generateCombinedPortfolioPDF } from '../utils/pdfGenerator';
import { planValidators } from '../utils/validation';
import confetti from 'canvas-confetti';

export default function SelectedPlans({
  plansState,
  onSetFormErrors,
  onPdfSuccess
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [validationAlert, setValidationAlert] = useState(null);

  // Filter selected keys
  const selectedKeys = Object.keys(plansState).filter(
    (key) => plansState[key].selected
  );

  // Handle Combined PDF Portfolio generation
  const handleGeneratePortfolio = async () => {
    if (selectedKeys.length <= 1) {
      setValidationAlert('Please select more than 1 insurance plan card above to download a combined PDF.');
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
        'Some selected plans have missing or incomplete fields. Please check the highlighted inputs on the cards above.'
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
          title: selectedKeys.length === 5 
            ? 'Complete 5-Plan Insurance Portfolio' 
            : `${selectedKeys.length} Selected Plans Portfolio`,
          fileName: result.fileName,
          pageCount: result.pageCount
        });
      }
    } catch (error) {
      console.error('Portfolio generation error:', error);
      alert('Failed to generate PDF. Please review your details and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div id="summary" className="mt-8 sm:mt-10 w-full flex flex-col items-center">
      {/* Validation Warning Alert */}
      {validationAlert && (
        <div className="w-full max-w-2xl mb-4 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-800 flex items-start gap-3 text-xs leading-relaxed shadow-sm animate-fade-in">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold">Attention: </span>
            {validationAlert}
          </div>
        </div>
      )}

      {/* BIG SIZE DOWNLOAD PDF BUTTON (Enabled when > 1 feature selected) */}
      <button
        type="button"
        onClick={handleGeneratePortfolio}
        disabled={isGenerating || selectedKeys.length <= 1}
        className="w-full max-w-2xl h-18 sm:h-22 px-6 sm:px-10 rounded-2xl font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-4 bg-gradient-to-r from-brand-accent via-amber-400 to-brand-accent text-brand-dark hover:from-amber-400 hover:to-brand-accent shadow-[0_15px_35px_rgba(214,168,79,0.35)] hover:shadow-[0_20px_45px_rgba(214,168,79,0.5)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:grayscale-[30%] disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none border-2 border-white/40 cursor-pointer"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-7 h-7 sm:w-8 sm:h-8 animate-spin text-brand-dark" />
            <span className="text-base sm:text-xl">Generating PDF ({selectedKeys.length} Plans)...</span>
          </>
        ) : (
          <>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-dark/15 flex items-center justify-center shrink-0 shadow-inner">
              <Download className="w-6 h-6 sm:w-8 sm:h-8 text-brand-dark" />
            </div>
            <div className="text-left">
              <div className="text-base sm:text-2xl font-black text-brand-dark leading-tight tracking-tight">
                {selectedKeys.length === 0
                  ? 'SELECT 2 OR MORE PLANS TO DOWNLOAD'
                  : selectedKeys.length === 1
                  ? 'SELECT MORE THAN 1 PLAN TO DOWNLOAD'
                  : selectedKeys.length === 5
                  ? 'DOWNLOAD COMPLETE PDF (ALL 5 PLANS)'
                  : `DOWNLOAD COMPLETE PDF (${selectedKeys.length} PLANS SELECTED)`}
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-brand-dark/80 tracking-normal normal-case mt-0.5">
                {selectedKeys.length <= 1
                  ? 'Select more than 1 feature card above to enable combined portfolio download'
                  : 'Single-Page High Resolution A4 Document • Instant In-Browser Download'}
              </div>
            </div>
          </>
        )}
      </button>

      {selectedKeys.length > 1 ? (
        <p className="text-center text-xs text-brand-muted mt-3 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>
            Downloads a clean single-page PDF containing your {selectedKeys.length} selected plans
          </span>
        </p>
      ) : selectedKeys.length === 1 ? (
        <p className="text-center text-xs text-brand-muted mt-3 flex items-center justify-center gap-1.5">
          <span>
            Tip: Each card above has its own "Download PDF" button for single plans. Select 2 or more plans to download combined portfolio.
          </span>
        </p>
      ) : null}
    </div>
  );
}
