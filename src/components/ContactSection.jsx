import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { companyDetails } from '../data/insuranceData';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    planInterest: 'Marriage & Education Planning',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Advisory Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
                Get In Touch
              </span>
              <h2 className="text-3xl font-extrabold text-brand-navy tracking-tight mt-1">
                Direct Insurance Advisory
              </h2>
              <p className="text-sm text-brand-muted mt-2">
                Have questions regarding custom sum assured amounts or policy terms? Reach out directly to our wealth planning desk.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-brand-primary text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase">Toll-Free Helpline</div>
                  <a href={`tel:${companyDetails.tollFree.replace(/\s+/g, '')}`} className="text-base font-bold text-brand-primary hover:text-brand-secondary transition">
                    {companyDetails.tollFree}
                  </a>
                  <div className="text-xs text-slate-500">Direct Advisory: {companyDetails.phone}</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-brand-primary text-white flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase">Official Advisory Email</div>
                  <a href={`mailto:${companyDetails.email}`} className="text-sm font-bold text-brand-primary hover:text-brand-secondary transition">
                    {companyDetails.email}
                  </a>
                  <div className="text-xs text-slate-500">Prompt responses within 2 business hours</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-brand-primary text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase">Corporate Head Office</div>
                  <div className="text-xs font-bold text-brand-primary leading-relaxed">
                    {companyDetails.address}
                  </div>
                  <div className="text-xs text-brand-accent font-medium mt-1">
                    {companyDetails.registration}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-card">
              <h3 className="text-xl font-bold text-brand-primary mb-1">
                Schedule a Detailed Portfolio Review
              </h3>
              <p className="text-xs text-brand-muted mb-6">
                Receive complimentary consultation from an IRDAI-registered financial planner.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">
                    Consultation Request Registered
                  </h4>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto">
                    Thank you! An authorized advisor from Eswara Moorthy Insurance will connect with you via phone/WhatsApp within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-3 px-4 py-2 text-xs font-bold text-emerald-800 bg-white border border-emerald-300 rounded-lg hover:bg-emerald-50 transition"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-brand-muted mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Saravanan R."
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary/40 focus:border-brand-secondary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-brand-muted mb-1">
                        Contact Number / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary/40 focus:border-brand-secondary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-brand-muted mb-1">
                        City / Location *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Chennai / Coimbatore"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary/40 focus:border-brand-secondary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-brand-muted mb-1">
                        Primary Goal of Interest
                      </label>
                      <select
                        value={formData.planInterest}
                        onChange={(e) => setFormData({ ...formData, planInterest: e.target.value })}
                        className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary/40 focus:border-brand-secondary"
                      >
                        <option>Marriage &amp; Education Planning</option>
                        <option>Retirement Pension Wealth</option>
                        <option>Accidental &amp; Disability Shield</option>
                        <option>High Cover Term Life Risk</option>
                        <option>Complete Family Portfolio (All 5)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-muted mb-1">
                      Notes or Special Requirements
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Optional notes or preferred consultation time..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary/40 focus:border-brand-secondary"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 rounded-xl text-xs font-bold uppercase tracking-wider bg-brand-primary hover:bg-brand-navy text-white transition flex items-center justify-center gap-2 active:scale-95 shadow-md"
                  >
                    <Send className="w-4 h-4 text-brand-accent" />
                    <span>Submit Advisory Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
