import React, { useState } from 'react';
import { 
  Check,
  CheckCircle2, 
  Download, 
  Loader2, 
  GraduationCap, 
  Armchair, 
  Shield, 
  HeartPulse, 
  HelpCircle 
} from 'lucide-react';
import { getFeatureImage } from '../assets/base64Images';
import { generateIndividualPlanPDF } from '../utils/pdfGenerator';
import { planValidators } from '../utils/validation';
import MarriageForm from './MarriageForm';
import EducationForm from './EducationForm';
import RetirementForm from './RetirementForm';
import AccidentalRiskForm from './AccidentalRiskForm';
import LifeRiskForm from './LifeRiskForm';
import confetti from 'canvas-confetti';

const MarriageRingsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 text-white"
  >
    <circle cx="8.5" cy="12" r="5" />
    <circle cx="15.5" cy="12" r="5" />
  </svg>
);

const ICON_MAP = {
  marriage: MarriageRingsIcon,
  education: GraduationCap,
  retirement: Armchair,
  accidentalRisk: Shield,
  lifeRisk: HeartPulse,
};

const CARD_THEMES = {
  marriage: {
    bgGradient: 'from-[#ffedf1] via-[#fff5f7] to-[#ffffff]',
    imageFade: 'from-[#ffedf1]',
    iconBg: 'bg-[#9f1239]',
    titleLine1: 'Marriage',
    titleLine2: 'Insurance Planning',
    tagline: 'Plan today for your marriage and build a secure tomorrow.',
    btnBg: 'bg-[#9f1239] hover:bg-[#881337] active:bg-[#701a35]',
    btnText: 'Download Marriage PDF',
    accentBorder: 'border-rose-300',
    ringColor: 'ring-rose-400/30',
    checkColor: 'bg-[#9f1239]',
  },
  education: {
    bgGradient: 'from-[#e0f2fe] via-[#f0f9ff] to-[#ffffff]',
    imageFade: 'from-[#e0f2fe]',
    iconBg: 'bg-[#0284c7]',
    titleLine1: 'Education',
    titleLine2: 'Insurance Planning',
    tagline: "Build a strong financial foundation for your child's education.",
    btnBg: 'bg-[#0284c7] hover:bg-[#0369a1] active:bg-[#075985]',
    btnText: 'Download Education PDF',
    accentBorder: 'border-sky-300',
    ringColor: 'ring-sky-400/30',
    checkColor: 'bg-[#0284c7]',
  },
  retirement: {
    bgGradient: 'from-[#d1fae5] via-[#ecfdf5] to-[#ffffff]',
    imageFade: 'from-[#d1fae5]',
    iconBg: 'bg-[#047857]',
    titleLine1: 'Retirement',
    titleLine2: 'Insurance Planning',
    tagline: 'Prepare for a financially independent and comfortable retirement.',
    btnBg: 'bg-[#047857] hover:bg-[#065f46] active:bg-[#064e3b]',
    btnText: 'Download Retirement PDF',
    accentBorder: 'border-emerald-300',
    ringColor: 'ring-emerald-400/30',
    checkColor: 'bg-[#047857]',
  },
  accidentalRisk: {
    bgGradient: 'from-[#ede9fe] via-[#f5f3ff] to-[#ffffff]',
    imageFade: 'from-[#ede9fe]',
    iconBg: 'bg-[#6d28d9]',
    titleLine1: 'Accidental',
    titleLine2: 'Risk Protection',
    tagline: "Get financial security for you and your family against life's uncertainties.",
    btnBg: 'bg-[#6d28d9] hover:bg-[#5b21b6] active:bg-[#4c1d95]',
    btnText: 'Download Accidental PDF',
    accentBorder: 'border-purple-300',
    ringColor: 'ring-purple-400/30',
    checkColor: 'bg-[#6d28d9]',
  },
  lifeRisk: {
    bgGradient: 'from-[#ffedd5] via-[#fff7ed] to-[#ffffff]',
    imageFade: 'from-[#ffedd5]',
    iconBg: 'bg-[#c2410c]',
    titleLine1: 'Life Risk',
    titleLine2: 'Protection',
    tagline: 'Ensure financial stability for your loved ones.',
    btnBg: 'bg-[#c2410c] hover:bg-[#9a3412] active:bg-[#7c2d12]',
    btnText: 'Download Life PDF',
    accentBorder: 'border-amber-300',
    ringColor: 'ring-amber-400/30',
    checkColor: 'bg-[#c2410c]',
  }
};

export default function InsuranceCard({
  meta,
  formData,
  onFormChange,
  onToggleSelect,
  onPdfSuccess
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [localErrors, setLocalErrors] = useState({});

  const theme = CARD_THEMES[meta.id] || CARD_THEMES.marriage;
  const IconComponent = ICON_MAP[meta.id] || Shield;
  const isSelected = !!formData.selected;

  // Resolve dynamic image (Education dynamically responds to Male / Female)
  const imageSource = getFeatureImage(meta.id, formData.gender);

  // Handle individual PDF Generation
  const handleGeneratePdf = async () => {
    const validator = planValidators[meta.id];
    if (validator) {
      const validationResult = validator(formData);
      if (!validationResult.isValid) {
        setLocalErrors(validationResult.errors);
        onFormChange(meta.id, {
          ...formData,
          errors: validationResult.errors
        });
        return;
      }
    }

    setLocalErrors({});
    setIsGenerating(true);

    try {
      const result = await generateIndividualPlanPDF(meta.id, formData);
      
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      } catch (e) {
        // Confetti optional
      }

      if (onPdfSuccess) {
        onPdfSuccess({
          title: meta.title,
          fileName: result.fileName
        });
      }
    } catch (error) {
      console.error('PDF Generation failed:', error);
      alert('PDF generation encountered an issue. Please check your inputs and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Render correct nested form
  const renderForm = () => {
    const errors = { ...localErrors, ...(formData.errors || {}) };
    switch (meta.id) {
      case 'marriage':
        return <MarriageForm data={formData} onChange={onFormChange} errors={errors} />;
      case 'education':
        return <EducationForm data={formData} onChange={onFormChange} errors={errors} />;
      case 'retirement':
        return <RetirementForm data={formData} onChange={onFormChange} errors={errors} />;
      case 'accidentalRisk':
        return <AccidentalRiskForm data={formData} onChange={onFormChange} errors={errors} />;
      case 'lifeRisk':
        return <LifeRiskForm data={formData} onChange={onFormChange} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`relative bg-white rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between border shadow-lg hover:shadow-xl ${
        isSelected
          ? `${theme.accentBorder} ring-2 ${theme.ringColor}`
          : 'border-slate-200/80 hover:border-slate-300'
      }`}
    >
      {/* Top Banner & Image with Wave Curve */}
      <div className={`relative h-36 w-full overflow-hidden bg-gradient-to-r ${theme.bgGradient} p-4 pb-6 flex items-start justify-between`}>
        {/* Left Side: Icon, Title & Tagline */}
        <div className="relative z-10 max-w-[210px] sm:max-w-[230px]">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl ${theme.iconBg} flex items-center justify-center shadow-sm shrink-0`}>
              <IconComponent className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight leading-tight">
                <span className="block">{theme.titleLine1}</span>
                <span className="block">{theme.titleLine2}</span>
              </h3>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 font-normal leading-snug mt-2">
            {theme.tagline}
          </p>
        </div>

        {/* Right Side: Photo Cutout with Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-36 sm:w-44 overflow-hidden pointer-events-none">
          <img
            src={imageSource}
            alt={meta.title}
            className="w-full h-full object-cover object-top"
          />
          {/* Subtle horizontal gradient to merge smoothly with background */}
          <div className={`absolute inset-y-0 left-0 w-16 bg-gradient-to-r ${theme.imageFade} to-transparent`} />
        </div>

        {/* Top-Right Selection Indicator Button */}
        <button
          type="button"
          onClick={() => onToggleSelect(meta.id)}
          title={isSelected ? 'Selected for Portfolio (Click to deselect)' : 'Click to select for Portfolio'}
          aria-label={isSelected ? 'Selected' : 'Select Plan'}
          className={`absolute top-2.5 right-2.5 z-20 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer ${
            isSelected
              ? `${theme.checkColor} text-white ring-2 ring-white scale-105`
              : 'bg-white/80 hover:bg-white border border-slate-300 text-transparent hover:border-slate-400'
          }`}
        >
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </button>

        {/* Wave Separator at bottom of header */}
        <div className="absolute bottom-0 left-0 right-0 h-5 overflow-hidden z-10 pointer-events-none">
          <svg
            viewBox="0 0 500 35"
            preserveAspectRatio="none"
            className="w-full h-full text-white fill-current"
          >
            <path d="M0,18 C140,36 300,2 500,22 L500,35 L0,35 Z" />
          </svg>
        </div>
      </div>

      {/* Main Card Body */}
      <div className="p-4 sm:p-5 pt-3 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Plan Form Fields */}
          {renderForm()}
        </div>

        {/* Card Footer Actions */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col gap-2.5">
          {/* Individual PDF Button */}
          <button
            type="button"
            onClick={handleGeneratePdf}
            disabled={isGenerating}
            className={`w-full h-10 sm:h-11 px-4 rounded-xl font-bold text-xs sm:text-sm text-white transition-all duration-200 flex items-center justify-center gap-2 ${theme.btnBg} active:scale-[0.99] shadow-sm disabled:opacity-50 cursor-pointer`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-white" />
                <span>{theme.btnText}</span>
              </>
            )}
          </button>

          {/* Footer: Selection Status & PDF Format Note */}
          <div className="flex items-center justify-between text-xs px-0.5">
            <button
              type="button"
              onClick={() => onToggleSelect(meta.id)}
              className="flex items-center gap-1.5 cursor-pointer group"
              title="Click to toggle plan in portfolio"
            >
              {isSelected ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-slate-700 group-hover:text-emerald-700">
                    Includes Portfolio
                  </span>
                </>
              ) : (
                <>
                  <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-normal text-slate-500 group-hover:text-slate-700">
                    Single download only
                  </span>
                </>
              )}
            </button>
            <span className="text-slate-400 font-medium">A4 PDF</span>
          </div>
        </div>
      </div>
    </div>
  );
}
