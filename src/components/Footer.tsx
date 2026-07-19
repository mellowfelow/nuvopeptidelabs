import React from "react";
import { Beaker, Shield, Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { siteConfig } from "../site.config";
import { ActivePage } from "../types";

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo, Description & Essential Entity Sentence */}
          <div className="space-y-4 md:col-span-1">
            <a 
              href="#/"
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white shadow-sm">
                <Beaker className="h-5 w-5" />
              </div>
              <span className="font-sans text-md font-bold tracking-tight text-white">
                Nuvo Peptide Labs
              </span>
            </a>
            
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {siteConfig.business.brandEntitySentence}
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono text-teal-400 bg-slate-800/80 p-2 rounded border border-slate-700/50">
              <Shield className="h-3.5 w-3.5 flex-shrink-0" />
              <span>Strict Quality Checks & Purity Verification</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase font-sans mb-4">
              Resources
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#/shop" className="hover:text-teal-400 transition-colors">
                  Product Catalog
                </a>
              </li>
              <li>
                <a href="#/blog" className="hover:text-teal-400 transition-colors">
                  Peptide Quality & Support Blog
                </a>
              </li>
              <li>
                <a href="#/about" className="hover:text-teal-400 transition-colors">
                  About Our Team
                </a>
              </li>
              <li>
                <a href="#/wholesale" className="hover:text-teal-400 transition-colors">
                  Wholesale Peptides
                </a>
              </li>
              <li>
                <a href="#/faq" className="hover:text-teal-400 transition-colors">
                  General Support FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Compliance & Legal Pages */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase font-sans mb-4">
              Regulatory & Policy
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#/shipping" className="hover:text-teal-400 transition-colors">
                  Discreet Shipping Policy
                </a>
              </li>
              <li>
                <a href="#/refund" className="hover:text-teal-400 transition-colors">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="#/privacy" className="hover:text-teal-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#/terms" className="hover:text-teal-400 transition-colors">
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase font-sans mb-4">
              UK Contact Info
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-teal-500 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">
                  Manchester, United Kingdom
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-teal-500 flex-shrink-0" />
                <span>+44 7838 207659 (WhatsApp Support)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-teal-500 flex-shrink-0" />
                {/* HTML Entity-Encoded email address for security against scrapers */}
                <span>
                  support&#64;nuvopeptidelabs.com
                </span>
              </li>
            </ul>
          </div>
        </div>


        {/* Footer Base Credits */}
        <div className="mt-8 border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {currentYear} Nuvo Peptide Labs Ltd. Manchester, UK. All rights reserved.
          </div>
          <div className="flex gap-4">
            <span>BACS Bank Transfer Payments Enabled</span>
            <span>|</span>
            <span>Discreet Tracked Courier Dispatch</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
