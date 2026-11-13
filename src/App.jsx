import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InsuranceCard from './components/InsuranceCard';
import SelectedPlans from './components/SelectedPlans';
import HowItWorks from './components/HowItWorks';
import FeaturesSection from './components/FeaturesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import PdfSuccessModal from './components/PdfSuccessModal';
import { initialPlansState, demoProfiles, insuranceFeaturesMeta } from './data/insuranceData';
import { Sparkles, Shield, Layers, HelpCircle, CheckCircle } from 'lucide-react';

export default function App() {
  const [plansState, setPlansState] = useState(initialPlansState);
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  // Toggle single plan selection
  const handleToggleSelect = (planKey) => {
    setPlansState((prev) => ({
      ...prev,
      [planKey]: {
        ...prev[planKey],
        selected: !prev[planKey].selected
      }
    }));
  };

  // Select all plans
  const handleSelectAll = () => {
    setPlansState((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((k) => {
        updated[k] = { ...updated[k], selected: true };
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

  const scrollToPlans = () => {
    const el = document.getElementById('plans');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSummary = () => {
    const el = document.getElementById('summary');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg font-sans text-brand-text">
      {/* Sticky Header */}
      <Navbar
        selectedCount={selectedCount}
        onGenerateClick={scrollToSummary}
      />

      {/* Hero Section */}
      <Hero
        onExploreClick={scrollToPlans}
        onGenerateClick={scrollToSummary}
        onLoadDemo={handleLoadDemo}
      />

      {/* Main Insurance Plans Section */}
      <main id="plans" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-lightBlue border border-brand-secondary/20 text-brand-secondary text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>5 Core Insurance Planning Modules</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Personalized Insurance Features
          </h2>
          <p className="text-sm sm:text-base text-brand-muted mt-3 leading-relaxed">
            Configure each life milestone independently. Enter your personal details, choose custom targets, and either download single plan reports or combine selected modules into one comprehensive portfolio.
          </p>
        </div>

        {/* 5 Insurance Feature Cards Grid (Desktop: 3 cols, Tablet: 2 cols, Mobile: 1 col) */}
        <div id="plans-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {insuranceFeaturesMeta.map((meta) => (
            <InsuranceCard
              key={meta.id}
              meta={meta}
              formData={plansState[meta.id]}
              onFormChange={handleFormChange}
              onToggleSelect={handleToggleSelect}
              onPdfSuccess={(info) => setDownloadSuccess(info)}
            />
          ))}
        </div>
      </main>

      {/* Selected Plans & Complete Portfolio Generator */}
      <SelectedPlans
        plansState={plansState}
        onToggleSelect={handleToggleSelect}
        onSelectAll={handleSelectAll}
        onClearAll={handleClearAll}
        onLoadDemo={handleLoadDemo}
        onSetFormErrors={handleSetFormErrors}
        onPdfSuccess={(info) => setDownloadSuccess(info)}
      />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Features & Institutional Quality Section */}
      <FeaturesSection />

      {/* Contact & Consultation Section */}
      <ContactSection />

      {/* Corporate Footer */}
      <Footer />

      {/* Success Modal upon PDF Generation */}
      <PdfSuccessModal
        downloadInfo={downloadSuccess}
        onClose={() => setDownloadSuccess(null)}
      />
    </div>
  );
}
