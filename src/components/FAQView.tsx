import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Beaker, ShieldCheck } from "lucide-react";
import { siteConfig } from "../site.config";

export default function FAQView() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      
      {/* FAQ Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden lab-grid">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 to-slate-900/60 z-0"></div>
        <div className="absolute inset-0 lab-grid opacity-10 z-0"></div>
        
        <div className="relative z-10 space-y-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-teal-400 bg-slate-800 px-2.5 py-1 rounded border border-slate-700 uppercase tracking-widest font-semibold">
            SUPPORT & HELP
          </span>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Clear answers to your questions about our peptide testing, bank transfer payments, £250 minimum orders, and fast shipping.
          </p>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {siteConfig.faqs.map((faq, index) => {
          const isOpen = activeIndex === index;
          return (
            <div 
              key={index}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-sans focus:outline-none"
              >
                <span className="text-xs sm:text-sm font-bold text-slate-950 leading-snug">
                  {faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-teal-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-xs text-slate-600 leading-relaxed space-y-2">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Secondary Info Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs text-slate-700 space-y-2">
        <h3 className="font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 text-slate-900">
          <HelpCircle className="h-4.5 w-4.5 text-teal-600" />
          Need Additional Support?
        </h3>
        <p className="leading-relaxed">
          If you have special requests, bulk custom blends, or any other questions, please reach out to our team directly at <strong className="text-slate-950">support&#64;nuvopeptidelabs.com</strong>.
        </p>
      </div>

    </div>
  );
}
