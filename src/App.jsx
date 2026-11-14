import React, { useState } from 'react';
import Navbar from './components/Navbar';
import InsuranceCard from './components/InsuranceCard';
import SelectedPlans from './components/SelectedPlans';
import PdfSuccessModal from './components/PdfSuccessModal';
import { initialPlansState, demoProfiles, insuranceFeaturesMeta } from './data/insuranceData';
import { User, UserCheck, X } from 'lucide-react';

export default function App() {
  const [plansState, setPlansState] = useState(initialPlansState);
  const [downloadSuccess, setDownloadSuccess] = useState(null);
  const [commonName, setCommonName] = useState('');
  const [commonPrefix, setCommonPrefix] = useState('Mr.');

  // Handle common name typing: auto-fill name in all currently selected cards
  const handleCommonNameChange = (newName) => {
    setCommonName(newName);
    setPlansState((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        if (updated[key].selected) {
          const errors = { ...updated[key].errors };
          if (newName.trim()) {
            delete errors.fullName;
          }
          updated[key] = {
            ...updated[key],
            fullName: newName,
            errors
          };
        }
      });
      return updated;
    });
  };

  // Handle common prefix change: update prefix on selected cards that have prefix
  const handleCommonPrefixChange = (newPrefix) => {
    setCommonPrefix(newPrefix);
    setPlansState((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        if (updated[key].selected && 'prefix' in updated[key]) {
          updated[key] = {
            ...updated[key],
            prefix: newPrefix
          };
        }
      });
      return updated;
    });
  };

  // Toggle single plan selection
  const handleToggleSelect = (planKey) => {
    setPlansState((prev) => {
      const willBeSelected = !prev[planKey].selected;
      const currentPlan = prev[planKey];
      return {
        ...prev,
        [planKey]: {
          ...currentPlan,
          selected: willBeSelected,
          ...(willBeSelected && commonName.trim()
            ? {
                fullName: commonName,
                ...('prefix' in currentPlan ? { prefix: commonPrefix } : {})
              }
            : {})
        }
      };
    });
  };

  // Select all plans
  const handleSelectAll = () => {
    setPlansState((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((k) => {
        updated[k] = {
          ...updated[k],
          selected: true,
          ...(commonName.trim()
            ? {
                fullName: commonName,
                ...('prefix' in updated[k] ? { prefix: commonPrefix } : {})
              }
            : {})
        };
      });
      return updated;
    });
  };

  // Clear plan selections
  const handleClearAll = () => {
    setPlansState((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((k) => {
        updated[k] = { ...updated[k], selected: false };
      });
      return updated;
    });
  };

  // Load sample demo data
  const handleLoadDemo = () => {
    setCommonName('Saravanan Ramanathan');
    setCommonPrefix('Mr.');
    setPlansState(demoProfiles.saravanan);
    // Smooth scroll down to plans
    const el = document.getElementById('plans');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update fields of a specific plan
  const handleFormChange = (planKey, updatedData) => {
    setPlansState((prev) => ({
      ...prev,
      [planKey]: updatedData
    }));
  };

  // Set multiple validation errors (e.g. from Portfolio generation)
  const handleSetFormErrors = (errorsPerPlan) => {
    setPlansState((prev) => {
      const next = { ...prev };
      Object.keys(errorsPerPlan).forEach((key) => {
        if (next[key]) {
          next[key] = {
            ...next[key],
            errors: errorsPerPlan[key]
          };
        }
      });
      return next;
    });
  };

  // Count selected plans
  const selectedCount = Object.keys(plansState).filter(
    (k) => plansState[k].selected
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg font-sans text-brand-text">
      {/* Sticky Header */}
      <Navbar />

      {/* Main Insurance Plans Section */}
      <main id="plans" className="pt-6 pb-16 sm:pt-8 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Client Name Auto-Fill for Selected Cards */}
        <div className="mb-6 max-w-2xl mx-auto bg-white rounded-xl border border-slate-200/90 shadow-xs p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
            <label
              htmlFor="client-name-input"
              className="text-xs font-bold uppercase tracking-wider text-brand-navy flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4 text-brand-secondary" />
              <span>Client Name Auto-Fill</span>
            </label>
            <span className="text-[11px] font-medium text-slate-500">
              {selectedCount === 0 ? (
                'Select plans below to auto-fill'
              ) : (
                <>
                  Auto-fills across <strong className="text-brand-secondary font-bold">{selectedCount}</strong> selected plan{selectedCount === 1 ? '' : 's'}
                </>
              )}
            </span>
          </div>

          <div className="flex gap-2">
            <div className="w-20 sm:w-24 relative shrink-0">
              <select
                value={commonPrefix}
                onChange={(e) => handleCommonPrefixChange(e.target.value)}
                className="w-full h-10 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-secondary/20 focus:border-brand-secondary transition"
                aria-label="Prefix"
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
                id="client-name-input"
                type="text"
                placeholder="Type client full name (e.g. Saravanan Ramanathan)..."
                value={commonName}
                onChange={(e) => handleCommonNameChange(e.target.value)}
                className="w-full h-10 pl-9 pr-8 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary/20 focus:border-brand-secondary focus:bg-white transition"
              />
              {commonName && (
                <button
                  type="button"
                  onClick={() => handleCommonNameChange('')}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  title="Clear name"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 5 Insurance Feature Cards Grid (Desktop: 3 in row 1, 2 centered in row 2) */}
        <div id="plans-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 items-stretch">
          {insuranceFeaturesMeta.map((meta, index) => {
            const isRow2First = index === 3;
            const gridClasses = isRow2First
              ? 'md:col-span-1 lg:col-start-2 lg:col-span-2'
              : index === 4
              ? 'md:col-span-2 md:max-w-md md:mx-auto lg:max-w-none lg:mx-0 lg:col-span-2 w-full'
              : 'md:col-span-1 lg:col-span-2';

            return (
              <div key={meta.id} className={gridClasses}>
                <InsuranceCard
                  meta={meta}
                  formData={plansState[meta.id]}
                  onFormChange={handleFormChange}
                  onToggleSelect={handleToggleSelect}
                  onPdfSuccess={(info) => setDownloadSuccess(info)}
                />
              </div>
            );
          })}
        </div>

        {/* Big Size Download PDF Button Section Directly Below the Cards */}
        <SelectedPlans
          plansState={plansState}
          onToggleSelect={handleToggleSelect}
          onSelectAll={handleSelectAll}
          onClearAll={handleClearAll}
          onLoadDemo={handleLoadDemo}
          onSetFormErrors={handleSetFormErrors}
          onPdfSuccess={(info) => setDownloadSuccess(info)}
        />
      </main>

      {/* Success Modal upon PDF Generation */}
      <PdfSuccessModal
        downloadInfo={downloadSuccess}
        onClose={() => setDownloadSuccess(null)}
      />
    </div>
  );
}
