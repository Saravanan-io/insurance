import React from 'react';
import { formatCurrencyInWords, formatIndianCurrency } from '../utils/formatters';
import { User, AlertCircle } from 'lucide-react';

export default function MarriageForm({ data, onChange, errors = {} }) {
  const handleFieldChange = (field, value) => {
    onChange('marriage', {
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-3.5">
      {/* Name Prefix & Full Name */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Beneficiary Name <span className="text-rose-500 font-bold">*</span>
        </label>
        <div className="flex gap-2">
          <div className="w-20 relative">
            <select
              value={data.prefix || 'Mr.'}
              onChange={(e) => handleFieldChange('prefix', e.target.value)}
              className="w-full h-10 px-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition"
            >
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
            </select>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder="e.g. Saravanan Ramanathan"
              value={data.fullName || ''}
              onChange={(e) => handleFieldChange('fullName', e.target.value)}
              className={`w-full h-10 pl-8 pr-3 bg-white border rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
                errors.fullName
                  ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                  : 'border-slate-200 focus:ring-slate-300 focus:border-slate-400'
              }`}
            />
          </div>
        </div>
        {errors.fullName && (
          <p className="flex items-center gap-1 text-[11px] text-rose-500 mt-1">
            <AlertCircle className="w-3 h-3" /> {errors.fullName}
          </p>
        )}
      </div>

      {/* Planned Marriage Value */}
      <div>
        <div className="flex justify-between items-baseline mb-1">
          <label className="block text-xs font-semibold text-slate-700">
            Planned Budget (₹) <span className="text-rose-500 font-bold">*</span>
          </label>
          {data.marriageValue > 0 && (
            <span className="text-[11px] font-semibold text-rose-700 truncate max-w-[150px]">
              {formatIndianCurrency(data.marriageValue)} {formatCurrencyInWords(data.marriageValue)}
            </span>
          )}
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400 font-bold text-xs">
            ₹
          </div>
          <input
            type="number"
            min="10000"
            step="50000"
            placeholder="e.g. 25,00,000 (25 Lakhs)"
            value={data.marriageValue || ''}
            onChange={(e) => handleFieldChange('marriageValue', e.target.value)}
            className={`w-full h-10 pl-7 pr-3 bg-white border rounded-xl text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
              errors.marriageValue
                ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                : 'border-slate-200 focus:ring-slate-300 focus:border-slate-400'
            }`}
          />
        </div>
        {errors.marriageValue && (
          <p className="flex items-center gap-1 text-[11px] text-rose-500 mt-1">
            <AlertCircle className="w-3 h-3" /> {errors.marriageValue}
          </p>
        )}
      </div>
    </div>
  );
}
