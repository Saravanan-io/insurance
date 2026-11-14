import React from 'react';
import { CheckCircle2, FileDown, X, Sparkles, ShieldCheck, Printer } from 'lucide-react';

export default function PdfSuccessModal({ downloadInfo, onClose }) {
  if (!downloadInfo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-brand-accent/30 relative overflow-hidden">
        {/* Top Gold Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-accent via-amber-300 to-brand-accent" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Title */}
        <div className="text-center pt-2">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
            Generated Successfully
          </span>
          <h3 className="text-xl font-extrabold text-brand-navy tracking-tight mt-1">
            {downloadInfo.title}
          </h3>
          <p className="text-xs text-brand-muted mt-1">
            Your customized PDF document has been compiled and downloaded directly to your device.
          </p>
        </div>

        {/* File Name Pill */}
        <div className="my-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-brand-primary text-white flex items-center justify-center shrink-0">
            <FileDown className="w-5 h-5 text-brand-accent" />
          </div>
          <div className="min-w-0 flex-1 text-left">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Downloaded File
            </div>
            <div className="text-xs font-bold text-brand-primary truncate">
              {downloadInfo.fileName}
            </div>
            {downloadInfo.pageCount && (
              <div className="text-[10px] text-brand-secondary font-medium">
                {downloadInfo.pageCount} {downloadInfo.pageCount === 1 ? 'Page' : 'Pages'} • High Resolution A4 Portrait
              </div>
            )}
          </div>
        </div>

        {/* Features Checklist */}
        <div className="space-y-2 text-xs text-slate-600 mb-6 text-left">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Includes personalized milestone calculations &amp; images</span>
          </div>
          <div className="flex items-center gap-2">
            <Printer className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Formatted for standard A4 color / monochrome printing</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Verified client-side generation without server storage</span>
          </div>
        </div>

        {/* Done Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full h-12 rounded-xl text-xs font-bold uppercase tracking-wider bg-brand-primary hover:bg-brand-navy text-white transition active:scale-95 shadow-md"
        >
          Close &amp; Continue Planning
        </button>
      </div>
    </div>
  );
}
