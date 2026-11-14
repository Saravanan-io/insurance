import React from 'react';
import { formatCurrencyInWords, formatIndianCurrency } from '../utils/formatters';
import { User, AlertCircle } from 'lucide-react';

export default function EducationForm({ data, onChange, errors = {} }) {
  const handleFieldChange = (field, value) => {
    onChange('education', {
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-3.5">
      {/* Student Full Name */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Student Full Name <span className="text-rose-500 font-bold">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
            <User className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            placeholder="e.g. Ananya Ramanathan"
            value={data.fullName || ''}
            onChange={(e) => handleFieldChange('fullName', e.target.value)}
            className={`w-full h-10 pl-8 pr-3 bg-white border rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
              errors.fullName
                ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                : 'border-slate-200 focus:ring-slate-300 focus:border-slate-400'
            }`}
          />
        </div>
        {errors.fullName && (
          <p className="flex items-center gap-1 text-[11px] text-rose-500 mt-1">
            <AlertCircle className="w-3 h-3" /> {errors.fullName}
          </p>
        )}
      </div>

      {/* Gender Selection */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Student Gender <span className="text-rose-500 font-bold">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleFieldChange('gender', 'Male')}
            className={`h-9 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition cursor-pointer ${
              data.gender === 'Male'
                ? 'bg-[#0284c7] text-white border-[#0284c7] shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Male Student</span>
          </button>
          <button
            type="button"
            onClick={() => handleFieldChange('gender', 'Female')}
            className={`h-9 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition cursor-pointer ${
              data.gender === 'Female'
                ? 'bg-[#0284c7] text-white border-[#0284c7] shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Female Student</span>
          </button>
        </div>
        {errors.gender && (
          <p className="flex items-center gap-1 text-[11px] text-rose-500 mt-1">
            <AlertCircle className="w-3 h-3" /> {errors.gender}
          </p>
        )}
      </div>

      {/* Education Target Value */}
      <div>
        <div className="flex justify-between items-baseline mb-1">
          <label className="block text-xs font-semibold text-slate-700">
            Education Target (₹) <span className="text-rose-500 font-bold">*</span>
          </label>
          {data.educationValue > 0 && (
            <span className="text-[11px] font-semibold text-sky-700 truncate max-w-[150px]">
              {formatIndianCurrency(data.educationValue)} {formatCurrencyInWords(data.educationValue)}
            </span>
          )}
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400 font-bold text-xs">
            ₹
          </div>
          <input
            type="number"
            min="50000"
            step="50000"
            placeholder="e.g. 35,00,000 (35 Lakhs)"
            value={data.educationValue || ''}
            onChange={(e) => handleFieldChange('educationValue', e.target.value)}
            className={`w-full h-10 pl-7 pr-3 bg-white border rounded-xl text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
              errors.educationValue
                ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                : 'border-slate-200 focus:ring-slate-300 focus:border-slate-400'
            }`}
          />
        </div>
        {errors.educationValue && (
          <p className="flex items-center gap-1 text-[11px] text-rose-500 mt-1">
            <AlertCircle className="w-3 h-3" /> {errors.educationValue}
          </p>
        )}
      </div>
    </div>
  );
}
