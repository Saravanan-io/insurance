import React from 'react';
import { formatCurrencyInWords, formatIndianCurrency } from '../utils/formatters';
import { User, AlertCircle } from 'lucide-react';

export default function AccidentalRiskForm({ data, onChange, errors = {} }) {
  const handleFieldChange = (field, value) => {
    onChange('accidentalRisk', {
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-4 pt-2">
      {/* Name Prefix & Full Name */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-1.5">
          Insured Person's Name <span className="text-rose-500">*</span>
        </label>
        <div className="flex gap-2">
          <div className="w-28 relative">
            <select
              value={data.prefix || 'Mr.'}
              onChange={(e) => handleFieldChange('prefix', e.target.value)}
              className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-secondary/40 focus:border-brand-secondary transition"
            >
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
            </select>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="e.g. Saravanan Ramanathan"
              value={data.fullName || ''}
              onChange={(e) => handleFieldChange('fullName', e.target.value)}
              className={`w-full h-11 pl-9 pr-3 bg-slate-50 border rounded-lg text-sm text-brand-text placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
                errors.fullName
                  ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30'
                  : 'border-slate-200 focus:ring-brand-secondary/40 focus:border-brand-secondary'
              }`}
            />
          </div>
        </div>
        {errors.fullName && (
          <p className="flex items-center gap-1 text-xs text-rose-500 mt-1">
            <AlertCircle className="w-3 h-3" /> {errors.fullName}
          </p>
        )}
      </div>

      {/* Accidental Risk Coverage Value */}
      <div>
        <div className="flex justify-between items-baseline mb-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted">
            Accidental Coverage Sum (₹) <span className="text-rose-500">*</span>
          </label>
          {data.coverageValue > 0 && (
            <span className="text-xs font-semibold text-amber-700">
              {formatIndianCurrency(data.coverageValue)} {formatCurrencyInWords(data.coverageValue)}
            </span>
          )}
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-bold">
            ₹
          </div>
          <input
            type="number"
            min="100000"
            step="100000"
            placeholder="e.g. 5000000 (50 Lakhs)"
            value={data.coverageValue || ''}
            onChange={(e) => handleFieldChange('coverageValue', e.target.value)}
            className={`w-full h-11 pl-8 pr-3 bg-slate-50 border rounded-lg text-sm font-medium text-brand-text placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
              errors.coverageValue
                ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30'
                : 'border-slate-200 focus:ring-brand-secondary/40 focus:border-brand-secondary'
            }`}
          />
        </div>
        {errors.coverageValue && (
          <p className="flex items-center gap-1 text-xs text-rose-500 mt-1">
            <AlertCircle className="w-3 h-3" /> {errors.coverageValue}
          </p>
        )}
      </div>
    </div>
  );
}
