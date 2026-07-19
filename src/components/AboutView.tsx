import React from "react";
import { Beaker, Shield, Milestone, Users, Award, ExternalLink } from "lucide-react";
import { siteConfig } from "../site.config";

export default function AboutView() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12 animate-fade-in">
      
      {/* Narrative Hero Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 relative overflow-hidden lab-grid">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 to-slate-900/60 z-0"></div>
        <div className="absolute inset-0 lab-grid opacity-10 z-0"></div>
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-teal-400 bg-slate-800 px-2.5 py-1 rounded border border-slate-700 uppercase tracking-widest font-semibold">
            ESTABLISHED IN MANCHESTER - 2022
          </span>
          <h1 className="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Our Quality Standards & Mission
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Providing high-quality peptides with verified standards and discreet UK shipping.
          </p>
        </div>
      </div>

      {/* Grid: Narrative + Compliance Stats */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        
        {/* Narrative bio */}
        <div className="md:col-span-8 space-y-6">
          <section className="space-y-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-md font-bold text-slate-950 border-b border-slate-100 pb-2">
              Who We Are
            </h2>
            
            {/* The brand entity statement as required */}
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              <strong>Nuvo Peptide Labs</strong> is a Manchester-based supplier of high-quality tested peptides, established in 2022, offering pure and clean products with a focus on discreet and fast delivery across the UK.
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our company was founded in Manchester, UK, to address the need for pure, high-quality, and reliable peptides. Over the years, the peptide supply chain has been flooded with unverified products, causing inconsistent experiences. Nuvo Peptide Labs was established to create a secure, stable, and transparent bridge to premium certified peptide syntheses.
            </p>
          </section>

          <section className="space-y-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-md font-bold text-slate-950 border-b border-slate-100 pb-2">
              Our Differentiator & Quality Controls
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              What truly sets us apart is our focus on delivering clean, verified, and reliable peptides right to your door.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To ensure our quality, every batch of peptides undergoes thorough analysis. Vials are tested to ensure they are over 99.0% pure. Our threshold is absolute: if any batch sample falls below this purity level, the complete lot is removed from our inventory. This ensures that you get only the finest and most consistent products.
            </p>
          </section>

          <section className="space-y-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-md font-bold text-slate-950 border-b border-slate-100 pb-2">
              Our Collaborations & Quality Milestones
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We are proud of our deep-seated collaborations and partnerships across the industry.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Through these close partnerships, we have contributed to key metabolic pathway studies and cell support models. We continuously adapt our catalog as new compounds are formulated, ensuring that our customers always have access to the latest breakthroughs.
            </p>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950 font-mono border-b border-slate-200 pb-2">
              Core Credentials
            </h3>
            
            <ul className="space-y-4 text-xs">
              <li className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-950 font-semibold mb-0.5">HPLC Identity Check</strong>
                  <span>99.0%+ baseline purity is guaranteed. Complete spectra reports are archived per batch.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Milestone className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-950 font-semibold mb-0.5">Discreet Cold Shipping</strong>
                  <span>Vacuum storage at -20°C prior to express dispatch inside insulated parcel frames.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Users className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-950 font-semibold mb-0.5">Premium Support</strong>
                  <span>Custom formulations and high-volume options for advanced study designs.</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-teal-50 border border-teal-100 rounded-xl p-5 text-[11px] leading-relaxed text-teal-800 space-y-2 shadow-sm">
            <span className="font-bold block uppercase font-mono tracking-wide text-teal-900">
              Customer Support Promise
            </span>
            <p>
              We are committed to providing the highest grade products, discrete courier delivery, and swift support. If you ever have a question about our testing protocols, feel free to reach out.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
