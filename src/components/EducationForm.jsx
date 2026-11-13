import React from 'react';
import { formatCurrencyInWords, formatIndianCurrency } from '../utils/formatters';
import { User, AlertCircle, Sparkles } from 'lucide-react';

export default function EducationForm({ data, onChange, errors = {} }) {
  const handleFieldChange = (field, value) => {
    onChange('education', {
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-4 pt-2">
      {/* Student Full Name */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-1.5">
          Student Full Name <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <User className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="e.g. Ananya Ramanathan"
            value={data.fullName || ''}
            onChange={(e) => handleFieldChange('fullName', e.target.value)}
            className={`w-full h-11 pl-9 pr-3 bg-slate-50 border rounded-lg text-sm text-brand-text placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
              errors.fullName
                ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30'
                : 'border-slate-200 focus:ring-brand-secondary/40 focus:border-brand-secondary'
            }`}
          />
        </div>
        {errors.fullName && (
          <p className="flex items-center gap-1 text-xs text-rose-500 mt-1">
            <AlertCircle className="w-3 h-3" /> {errors.fullName}
          </p>
        )}
      </div>

      {/* Gender Selection (Triggers Dynamic Image update) */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted">
            Student Gender <span className="text-rose-500">*</span>
          </label>
          <span className="text-[11px] font-medium text-amber-600 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Image updates dynamically
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleFieldChange('gender', 'Male')}
            className={`h-11 px-4 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 border transition ${
              data.gender === 'Male'
                ? 'bg-brand-secondary text-white border-brand-secondary shadow-sm'
                : 'bg-slate-50 text-brand-muted border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>👨‍🎓</span> Male Student
          </button>
          <button
            type="button"
            onClick={() => handleFieldChange('gender', 'Female')}
            className={`h-11 px-4 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 border transition ${
              data.gender === 'Female'
                ? 'bg-brand-secondary text-white border-brand-secondary shadow-sm'
                : 'bg-slate-50 text-brand-muted border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>👩‍🎓</span> Female Student
          </button>
        </div>
        {errors.gender && (
          <p className="flex items-center gap-1 text-xs text-rose-500 mt-1">
            <AlertCircle className="w-3 h-3" /> {errors.gender}
          </p>
        )}
      </div>

      {/* Education Target Value */}
      <div>
        <div className="flex justify-between items-baseline mb-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted">
            Education Fund Target (₹) <span className="text-rose-500">*</span>
          </label>
          {data.educationValue > 0 && (
            <span className="text-xs font-semibold text-brand-secondary">
              {formatIndianCurrency(data.educationValue)} {formatCurrencyInWords(data.educationValue)}
            </span>
          )}
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-bold">
            ₹
          </div>
          <input
            type="number"
            min="50000"
            step="50000"
            placeholder="e.g. 3500000 (35 Lakhs)"
            value={data.educationValue || ''}
            onChange={(e) => handleFieldChange('educationValue', e.target.value)}
            className={`w-full h-11 pl-8 pr-3 bg-slate-50 border rounded-lg text-sm font-medium text-brand-text placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
              errors.educationValue
                ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30'
                : 'border-slate-200 focus:ring-brand-secondary/40 focus:border-brand-secondary'
            }`}
          />
        </div>
        {errors.educationValue && (
          <p className="flex items-center gap-1 text-xs text-rose-500 mt-1">
            <AlertCircle className="w-3 h-3" /> {errors.educationValue}
          </p>
        )}
      </div>
    </div>
  );
}
