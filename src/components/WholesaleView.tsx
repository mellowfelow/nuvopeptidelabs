import React, { useState } from "react";
import { Mail, CheckCircle2, FlaskConical, CornerDownRight, ShieldCheck, Beaker } from "lucide-react";
import { siteConfig } from "../site.config";

export default function WholesaleView() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessState, setIsSuccessState] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    estimatedMonthlyBudget: "£1,000 - £5,000",
    specification: "",
    botcheck: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const isPlaceholderKey = siteConfig.orderRules.web3FormsKey === "pending";

    if (isPlaceholderKey) {
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccessState(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          businessName: "",
          estimatedMonthlyBudget: "£1,000 - £5,000",
          specification: "",
          botcheck: false
        });
      }, 800);
      return;
    }

    const nativeFormData = new FormData();
    nativeFormData.append("access_key", siteConfig.orderRules.web3FormsKey);
    nativeFormData.append("subject", `New BULK/WHOLESALE Inquiry - ${formData.businessName}`);
    nativeFormData.append("from_name", "Nuvo Wholesale Portal");
    nativeFormData.append("name", formData.name);
    nativeFormData.append("email", formData.email);
    nativeFormData.append("phone", formData.phone);
    nativeFormData.append("message", `
--- BULK / WHOLESALE INQUIRY ---
Contact Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Business/Org Name: ${formData.businessName}
Estimated Budget Tier: ${formData.estimatedMonthlyBudget}

--- BULK PRODUCT REQUIREMENTS ---
${formData.specification}
    `);
    if (formData.botcheck) {
      nativeFormData.append("botcheck", "true");
    }

    // Rule 5 Compliant Web3Forms fetch
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: nativeFormData
    })
      .then(r => r.json().then(d => ({ status: r.status, data: d })))
      .then(res => {
        setIsSubmitting(false);
        if (res.status === 200 && res.data.success) {
          setIsSuccessState(true);
          setFormData({
            name: "",
            email: "",
            phone: "",
            businessName: "",
            estimatedMonthlyBudget: "£1,000 - £5,000",
            specification: "",
            botcheck: false
          });
        } else {
          throw new Error(res.data && res.data.message || "Wholesale submission failed");
        }
      })
      .catch((err) => {
        setIsSubmitting(false);
        setErrorMessage(
          "CORS submission failed. Please mail wholesale@nuvopeptidelabs.com or contact us on WhatsApp directly."
        );
      });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12 animate-fade-in">
      
      {/* Wholesale Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 relative overflow-hidden lab-grid">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 to-slate-900/60 z-0"></div>
        <div className="absolute inset-0 lab-grid opacity-10 z-0"></div>
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-teal-400 bg-slate-800 px-2.5 py-1 rounded border border-slate-700 uppercase tracking-widest font-semibold">
            BULK DISCOUNTS
          </span>
          <h1 className="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Wholesale Peptides & Bulk Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Custom vial dosing, special bulk discounts, and dedicated supply-line support for businesses and high-volume buyers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        
        {/* Left column: Wholesale details */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-md font-bold text-slate-950 border-b border-slate-100 pb-2">
              Why Partner with Nuvo Peptide Labs?
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              We provide tailored supply programs designed to deliver pristine-quality peptides. Whether you need custom blends or high-volume standard vials, we scale our delivery to meet your timeline smoothly.
            </p>

            <ul className="space-y-3 text-xs text-slate-700 font-sans">
              <li className="flex items-start gap-2">
                <CornerDownRight className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                <span><strong>Custom Vial Dosages:</strong> Request 2mg, 5mg, 10mg, or custom peptide combinations based on your requirements.</span>
              </li>
              <li className="flex items-start gap-2">
                <CornerDownRight className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                <span><strong>Bulk Discounts:</strong> Up to 40% margin discounts on lots exceeding 100 vials.</span>
              </li>
              <li className="flex items-start gap-2">
                <CornerDownRight className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                <span><strong>Priority Testing:</strong> Dedicated production processes with independent purity reports for every wholesale batch.</span>
              </li>
            </ul>
          </div>

          <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 space-y-3 text-teal-950">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-900 font-mono flex items-center gap-1.5">
              <FlaskConical className="h-4.5 w-4.5" />
              Wholesale Email Support
            </h3>
            <p className="text-xs leading-relaxed">
              For large bulk orders or general wholesale inquiries, you can email our wholesale team directly:
            </p>
            {/* Entity-Encoded email address */}
            <div className="font-mono text-xs bg-white p-2.5 rounded border border-teal-100 text-teal-800">
              wholesale&#64;nuvopeptidelabs.com
            </div>
          </div>
        </div>

        {/* Right column: Form */}
        <div className="md:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          {isSuccessState ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-950">Wholesale Request Received</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                Thank you for submitting your requirements. Our wholesale lead will review your request and get back to you with a quote shortly.
              </p>

              {siteConfig.orderRules.web3FormsKey === "pending" && (
                <div className="p-3 bg-amber-50 border border-amber-200 text-left text-[10px] text-amber-800 rounded">
                  <span className="font-bold">Developer Note:</span> Web3Forms bypass active during pending state.
                </div>
              )}

              <button
                onClick={() => setIsSuccessState(false)}
                className="bg-slate-950 text-white text-xs font-bold py-2 px-5 rounded-lg hover:bg-slate-800 transition cursor-pointer"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-md font-bold text-slate-950 border-b border-slate-100 pb-2">
                Wholesale & Bulk Inquiry
              </h2>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                  {errorMessage}
                </div>
              )}

              {/* HoneyPot spam protection */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                checked={formData.botcheck}
                onChange={handleInputChange}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">
                    Contact Name *
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:bg-white focus:ring-1 focus:ring-teal-500 focus:outline-none"
                    placeholder="Sarah Jenkins"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">
                    Business Email *
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:bg-white focus:ring-1 focus:ring-teal-500 focus:outline-none"
                    placeholder="sarah@domain.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">
                    Business / Organization Name *
                  </label>
                  <input
                    required
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:bg-white focus:ring-1 focus:ring-teal-500 focus:outline-none"
                    placeholder="Nuvo Wellness Ltd"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">
                    Primary Phone *
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:bg-white focus:ring-1 focus:ring-teal-500 focus:outline-none"
                    placeholder="+44 7838..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  Estimated Order Budget *
                </label>
                <select
                  name="estimatedMonthlyBudget"
                  value={formData.estimatedMonthlyBudget}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:bg-white focus:ring-1 focus:ring-teal-500 focus:outline-none"
                >
                  <option value="£1,000 - £5,000">£1,000 - £5,000</option>
                  <option value="£5,000 - £10,000">£5,000 - £10,000</option>
                  <option value="£10,000 - £25,000">£10,000 - £25,000</option>
                  <option value="£25,000+ (Bulk Contract)">£25,000+ (Bulk Contract)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  Peptide Types, Quantities & Special Requirements *
                </label>
                <textarea
                  required
                  name="specification"
                  value={formData.specification}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs h-32 focus:bg-white focus:ring-1 focus:ring-teal-500 focus:outline-none"
                  placeholder="Describe your needs (e.g., Retatrutide 10mg vials, quantity 50, special custom blend or custom packaging needs)..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-950 hover:bg-teal-600 text-white font-sans text-xs font-bold py-3.5 px-4 rounded-lg transition disabled:bg-slate-400 cursor-pointer"
              >
                {isSubmitting ? "Sending wholesale request..." : "Submit Wholesale Inquiry"}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
