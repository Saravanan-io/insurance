import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Download, 
  FileText, 
  Loader2, 
  Sparkles, 
  ShieldCheck, 
  HeartHandshake, 
  GraduationCap, 
  Palmtree, 
  ShieldAlert 
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

const ICONS = {
  HeartHandshake,
  GraduationCap,
  Palmtree,
  ShieldAlert,
  ShieldCheck
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

  const IconComponent = ICONS[meta.icon] || ShieldCheck;
  const isSelected = !!formData.selected;

  // Resolve dynamic image (Education dynamically responds to Male / Female)
  const imageSource = getFeatureImage(meta.id, formData.gender);

  // Handle individual PDF Generation
  const handleGeneratePdf = async () => {
    // 1. Validate only this card
    const validator = planValidators[meta.id];
    if (validator) {
      const validationResult = validator(formData);
      if (!validationResult.isValid) {
        setLocalErrors(validationResult.errors);
        // Also update parent state errors
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
      
      // Trigger subtle celebration
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
      className={`relative bg-white rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between border ${
        isSelected
          ? 'border-brand-secondary ring-2 ring-brand-secondary/20 shadow-card-selected'
          : 'border-slate-200/80 hover:border-slate-300 shadow-card hover:shadow-card-hover'
      }`}
    >
      {/* Top Banner & Image */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-900 group">
        <img
          src={imageSource}
          alt={meta.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Navy gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/40 to-transparent" />

        {/* Top Badges: Selection state & Category Tag */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-brand-primary/85 text-brand-accent backdrop-blur-md border border-brand-accent/30 shadow-sm flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            {meta.tagline}
          </span>

          {/* Interactive Checkbox Button */}
          <button
            type="button"
            onClick={() => onToggleSelect(meta.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all backdrop-blur-md ${
              isSelected
                ? 'bg-brand-secondary text-white shadow-md ring-2 ring-white/30'
                : 'bg-white/80 text-brand-navy hover:bg-white border border-slate-200'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-brand-accent' : 'text-slate-400'}`} />
            <span>{isSelected ? 'Selected' : 'Select Plan'}</span>
          </button>
        </div>

        {/* Category Title & Icon on Image bottom */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-brand-primary/90 backdrop-blur-md border border-brand-accent/40 flex items-center justify-center text-brand-accent shadow-md shrink-0">
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight leading-tight">
              {meta.title}
            </h3>
            <p className="text-xs text-slate-200/90 line-clamp-1">
              {meta.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Plan Form Fields */}
          {renderForm()}
        </div>

        {/* Card Footer Actions */}
        <div className="pt-5 mt-4 border-t border-slate-100 flex flex-col gap-2.5">
          {/* Individual PDF Button */}
          <button
            type="button"
            onClick={handleGeneratePdf}
            disabled={isGenerating}
            className="w-full h-11 px-4 rounded-xl font-semibold text-xs tracking-wide uppercase transition-all flex items-center justify-center gap-2 bg-slate-100 hover:bg-brand-lightBlue text-brand-primary border border-slate-200 hover:border-brand-secondary/40 active:scale-[0.98] shadow-sm disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-brand-secondary" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-brand-secondary" />
                <span>Download {meta.title.split(' ')[0]} PDF</span>
              </>
            )}
          </button>

          {/* Plan Status Note */}
          <div className="flex items-center justify-between text-[11px] text-brand-muted px-1">
            <span className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-500' : 'bg-slate-300'}`} />
              {isSelected ? 'Included in Portfolio' : 'Single download only'}
            </span>
            <span className="text-slate-400">A4 Portrait PDF</span>
          </div>
        </div>
      </div>
    </div>
  );
}
