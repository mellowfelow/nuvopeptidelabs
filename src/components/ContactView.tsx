import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldCheck, CheckCircle2 } from "lucide-react";
import { siteConfig } from "../site.config";
import { InquiryFormData } from "../types";

export default function ContactView() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessState, setIsSuccessState] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<InquiryFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
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

  // Rule 5 Compliant Web3Forms submit block (CORS-friendly, no Content-Type)
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
          subject: "General Inquiry",
          message: "",
          botcheck: false
        });
      }, 800);
      return;
    }

    const nativeFormData = new FormData();
    nativeFormData.append("access_key", siteConfig.orderRules.web3FormsKey);
    nativeFormData.append("subject", `New Web Inquiry [${formData.subject}] - ${formData.name}`);
    nativeFormData.append("from_name", "Nuvo Peptide Labs Website");
    nativeFormData.append("name", formData.name);
    nativeFormData.append("email", formData.email);
    nativeFormData.append("phone", formData.phone);
    nativeFormData.append("message", `
Inquiry Subject: ${formData.subject}
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message body:
${formData.message}
    `);
    if (formData.botcheck) {
      nativeFormData.append("botcheck", "true");
    }

    // Strict Web3Forms fetch specification (Rule 5)
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
            subject: "General Inquiry",
            message: "",
            botcheck: false
          });
        } else {
          throw new Error(res.data && res.data.message || "Inquiry submission failed");
        }
      })
      .catch((err) => {
        setIsSubmitting(false);
        setErrorMessage(
          "CORS contact submission failed. Please mail support@nuvopeptidelabs.com or contact us on WhatsApp directly."
        );
      });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12 animate-fade-in">
      
      {/* Contact Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden lab-grid">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 to-slate-900/60 z-0"></div>
        <div className="absolute inset-0 lab-grid opacity-10 z-0"></div>
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-teal-400 bg-slate-800 px-2.5 py-1 rounded border border-slate-700 uppercase tracking-widest">
            UK CUSTOMER CHANNELS
          </span>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Contact & Customer Support
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Have questions regarding peptide ordering, payments, or shipping? Reach out directly via secure messaging or our fast form submission.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        
        {/* Left Side: Contact Coordinates & Channels */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-md font-bold text-slate-950 border-b border-slate-100 pb-2">
              Contact Information
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-950 mb-0.5">Main Location</strong>
                  <span className="text-slate-600 leading-relaxed">
                    Manchester, United Kingdom
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-950 mb-0.5">Electronic Mail</strong>
                  {/* Entity-Encoded email address */}
                  <span className="text-slate-600 leading-relaxed">
                    support&#64;nuvopeptidelabs.com
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-950 mb-0.5">WhatsApp Support</strong>
                  <span className="text-slate-600 leading-relaxed">
                    +44 7838 207659 (Faster Payments & Orders Team)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Messaging Trigger */}
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-900 font-mono flex items-center gap-1.5">
              <MessageSquare className="h-4.5 w-4.5 text-teal-600" />
              Live WhatsApp Chat
            </h3>
            <p className="text-xs text-teal-950 leading-relaxed">
              Prefer instant messaging? Connect with our Manchester support desk directly via WhatsApp. We typically respond within 15 minutes regarding payments, ordering help, and custom courier options.
            </p>
            <a
              href="https://wa.me/447838207659"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold py-3 px-6 rounded-lg transition shadow-sm cursor-pointer"
            >
              <span>Initiate WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* Right Side: Form-based Submission (CORS Web3Forms) */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          {isSuccessState ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-950">Message Sent Successfully</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
                Your query has been received. Our customer support team will respond to you shortly.
              </p>
              
              {siteConfig.orderRules.web3FormsKey === "pending" && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded text-left text-[10px] text-amber-800">
                  <span className="font-bold">Developer Note:</span> Web3Forms bypass is active during pending access key state.
                </div>
              )}

              <button
                onClick={() => setIsSuccessState(false)}
                className="bg-slate-950 text-white text-xs font-bold py-2 px-5 rounded-lg hover:bg-slate-800 transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-md font-bold text-slate-950 border-b border-slate-100 pb-2">
                Send Us A Message
              </h2>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                  {errorMessage}
                </div>
              )}

              {/* Web3Forms HoneyPot */}
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
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:bg-white focus:ring-1 focus:ring-teal-500 focus:outline-none"
                    placeholder="e.g. John Smith"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">
                    Your Email *
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:bg-white focus:ring-1 focus:ring-teal-500 focus:outline-none"
                    placeholder="e.g. john@domain.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  Contact Phone (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:bg-white focus:ring-1 focus:ring-teal-500 focus:outline-none"
                  placeholder="+44 7838..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  Topic *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:bg-white focus:ring-1 focus:ring-teal-500 focus:outline-none"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Invoicing / BACS Payments">Payments & Invoicing</option>
                  <option value="Quality Testing Questions">Quality Testing Questions</option>
                  <option value="Custom Order Request">Custom Orders & Blends</option>
                  <option value="Wholesale Bulk Pricing support">Wholesale & Bulk Support</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  Message Details *
                </label>
                <textarea
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs h-28 focus:bg-white focus:ring-1 focus:ring-teal-500 focus:outline-none"
                  placeholder="Type your message, questions, bulk pricing needs, or payment support here..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-950 hover:bg-teal-600 text-white font-sans text-xs font-bold py-3 px-4 rounded-lg transition disabled:bg-slate-400 cursor-pointer"
              >
                {isSubmitting ? "Sending message..." : "Send Message"}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
