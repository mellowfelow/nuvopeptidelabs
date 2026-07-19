import React from "react";
import { FileText } from "lucide-react";
import { siteConfig } from "../site.config";
import { ActivePage } from "../types";

interface LegalViewProps {
  pageType: ActivePage;
}

export default function LegalView({ pageType }: LegalViewProps) {
  const getPolicyContent = () => {
    switch (pageType) {
      case "shipping":
        return {
          title: "Discreet Shipping & Courier Delivery Policy",
          tag: "UK DISPATCH POLICY",
          intro: "At Nuvo Peptide Labs, we take the utmost care in packaging and shipping your orders quickly and securely.",
          sections: [
            {
              heading: "1. UK Shipping Boundaries & Rates",
              text: "We ship exclusively to addresses within the United Kingdom. Because product integrity relies on rapid courier speeds, all orders are dispatched using tracked, signed-for express logistics. Orders under £500 are charged a flat delivery fee of £25.00. Orders of £500 or more receive free express tracked shipping."
            },
            {
              heading: "2. Minimum Order Value Restriction",
              text: "We maintain a minimum order requirement of £250.00. Orders below this threshold cannot be processed because shipping lower quantities does not justify the costs of specialized double-walled insulated packaging and protective temperature inserts."
            },
            {
              heading: "3. Packaging Confidentiality and Discretion",
              text: "All compounds are enclosed inside opaque, vacuum-sealed, tamper-evident vials. These vials are packed inside generic, unmarked outer corrugated mailers with no indication of chemical contents or 'Nuvo Peptide Labs' branding on the exterior labels. The package is labelled simply with delivery details and safety compliance barcodes."
            },
            {
              heading: "4. Cold Chain Safeguards & Transit Speeds",
              text: "Peptides are highly stable and packaged inside protective, secure envelopes or boxes. All items are dispatched within 24 hours of payment clearance. Tracked tracking codes are sent via email as soon as the courier scans the shipment."
            }
          ]
        };

      case "refund":
        return {
          title: "Refund & Satisfaction Guarantee Policy",
          tag: "SATISFACTION GUARANTEED",
          intro: "We support our products with a comprehensive quality guarantee. If you are not completely satisfied with your order, we will work quickly to make it right.",
          sections: [
            {
              heading: "1. The 30-Day Support Window",
              text: "We provide a 30-day return or exchange period from the date of delivery. If you have any concerns about your order, you can contact our support team to request a refund or replacement."
            },
            {
              heading: "2. Quality Assurance Standards",
              text: "Because we guarantee a baseline purity of over 99.0%, we stand by the quality of our peptides. If there are any discrepancies in your batch quality, please send us the details and we will issue a complete replacement or a full refund immediately."
            },
            {
              heading: "3. Seal Integrity",
              text: "Peptides that have been reconstituted, mixed with other liquids, or have had their rubber vial seals removed are excluded from general returns. We can only process refunds for items whose seal is intact."
            },
            {
              heading: "4. BACS Bank Refund Processing",
              text: "Approved refunds are processed directly back to the original bank account used during checkout. Direct Faster Payments bank transfers typically clear within 3 to 5 business days post-approval."
            }
          ]
        };

      case "privacy":
        return {
          title: "Secure Data Privacy & Encryption Policy",
          tag: "CUSTOMER DATA PRIVACY",
          intro: "Nuvo Peptide Labs respects your privacy. We are committed to protecting your personal information and maintaining full confidentiality.",
          sections: [
            {
              heading: "1. Confidentiality of Orders",
              text: "We do not share your order details, billing parameters, or contact information with any third party. Your personal information remains completely secure and confidential."
            },
            {
              heading: "2. Bank Transfer Payment Privacy",
              text: "Because we operate exclusively via direct Faster Payments (BACS) transfers, we do not require, collect, or store sensitive credit card numbers or payment credentials on our servers. This completely eliminates risks associated with online processor database leaks."
            },
            {
              heading: "3. SSL Data Encryption & Web3Forms",
              text: "All order inquiries transmitted through our laboratory transfer form are encrypted using industry-standard Secure Socket Layer (SSL/TLS) frameworks. Submissions are securely routed via Web3Forms with strict CORS configurations to protect against unauthorized interceptions."
            },
            {
              heading: "4. Information Retention Limits",
              text: "Contact details, physical delivery postcodes, and pro-forma invoice data are retained solely for tax compliance, regulatory UK delivery verification, and financial bookkeeping. We never share, sell, or license customer records with third-party advertising brokers."
            }
          ]
        };

      case "terms":
      default:
        return {
          title: "Terms of Use & Ordering Agreement",
          tag: "ORDERING AGREEMENT",
          intro: "These Terms of Use govern all purchases, requests, and interactions with Nuvo Peptide Labs. By browsing our catalog or placing an order, you agree to these terms.",
          sections: [
            {
              heading: "1. General Purchase Policy",
              text: "Our peptides are synthesized to the highest industry specifications and are provided for educational, analytical, and professional laboratory evaluation. We require all purchasers to handle these compounds in accordance with appropriate safety practices."
            },
            {
              heading: "2. Purchaser Representations & Indemnification",
              text: "The buyer agrees to assume full liability for the storage, use, and handling of our products. Nuvo Peptide Labs is not responsible for any misuse, improper storage, or unauthorized handling of our compounds once they are delivered."
            },
            {
              heading: "3. Refusal of Supply",
              text: "We reserve the right to decline or cancel any orders that do not comply with our ordering guidelines or fail to meet our minimum order requirement of £250. Pending orders that are unpaid will be cancelled within 48 hours."
            },
            {
              heading: "4. Age Requirements",
              text: "You must be at least 18 years of age to submit order requests. By submitting our checkout or contact forms, you confirm that you meet the age requirements."
            }
          ]
        };
    }
  };

  const policy = getPolicyContent();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden lab-grid">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 to-slate-900/60 z-0"></div>
        <div className="absolute inset-0 lab-grid opacity-10 z-0"></div>
        
        <div className="relative z-10 space-y-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-teal-400 bg-slate-800 px-2.5 py-1 rounded border border-slate-700 uppercase tracking-widest font-semibold">
            {policy.tag}
          </span>
          <h1 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
            {policy.title}
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed font-sans max-w-2xl">
            {policy.intro}
          </p>
        </div>
      </div>

      {/* Accordion / Block layout */}
      <div className="space-y-6">
        {policy.sections.map((sec, index) => (
          <section 
            key={index}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-2"
          >
            <h3 className="text-xs sm:text-sm font-bold text-slate-950 font-sans border-b border-slate-50 pb-1.5">
              {sec.heading}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {sec.text}
            </p>
          </section>
        ))}
      </div>

      {/* Quality Satisfaction Guarantee Block */}
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
        <div className="h-10 w-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
          <FileText className="h-5 w-5" />
        </div>
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider font-mono">
            Quality Assurance Policy
          </h4>
          <p className="text-[11px] text-slate-500 leading-normal">
            Nuvo Peptide Labs operates in strict accordance with premium quality guidelines. If you have any questions regarding our terms, shipping protocols, or policies, please contact <strong className="text-slate-700 font-mono text-[10px]">support&#64;nuvopeptidelabs.com</strong>.
          </p>
        </div>
      </div>

    </div>
  );
}
