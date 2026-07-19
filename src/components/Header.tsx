import React, { useState } from "react";
import { Menu, X, ShoppingCart, Beaker, ShieldCheck, AlertCircle } from "lucide-react";
import { siteConfig } from "../site.config";
import { ActivePage, CartItem } from "../types";

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  cart: CartItem[];
  setIsCartOpen: (isOpen: boolean) => void;
}

export default function Header({ activePage, setActivePage, cart, setIsCartOpen }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const minOrder = siteConfig.orderRules.minOrder;
  const isMinOrderMet = cartTotal >= minOrder;

  const navigationItems: { label: string; page: ActivePage }[] = [
    { label: "Home", page: "home" },
    { label: "Shop", page: "shop" },
    { label: "Blog", page: "blog" },
    { label: "About", page: "about" },
    { label: "Wholesale", page: "wholesale" }
  ];

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      {/* Top Banner - Compliance & Trust */}
      <div className="bg-slate-900 px-4 py-2 text-center text-xs text-slate-300 font-mono tracking-wide flex flex-col sm:flex-row items-center justify-center gap-2">
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-3 w-3 text-teal-400" />
          UK Certified Purity &gt;99% HPLC/MS Tested
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand Logo & Name */}
          <a 
            href="/"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600 text-white shadow-sm transition-transform group-hover:scale-105">
              <Beaker className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-teal-300 animate-ping opacity-75"></span>
            </div>
            <div>
              <span className="block font-sans text-lg font-bold tracking-tight text-slate-900">
                Nuvo Peptide Labs
              </span>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-slate-500">
                Manchester, UK
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navigationItems.map((item) => (
              <a
                key={item.page}
                href={item.page === "home" ? "/" : `/${item.page}`}
                className={`font-sans text-sm font-medium transition-colors ${
                  activePage === item.page
                    ? "text-teal-600 border-b-2 border-teal-600 py-1"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Header Action Elements */}
          <div className="flex items-center gap-4">
            {/* Minimum Order Indicator */}
            {cartCount > 0 && (
              <div className="hidden md:flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 text-xs font-medium">
                {isMinOrderMet ? (
                  <span className="text-emerald-600 flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4" /> Min Order Met
                  </span>
                ) : (
                  <span className="text-amber-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    Need £{(minOrder - cartTotal).toFixed(0)} more
                  </span>
                )}
              </div>
            )}

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:border-teal-500 hover:text-teal-600 transition-all duration-200"
              aria-label="Open Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-[10px] font-bold text-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 lg:hidden"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-150 bg-white px-4 py-4 space-y-2 shadow-inner">
          {navigationItems.map((item) => (
            <a
              key={item.page}
              href={item.page === "home" ? "/" : `/${item.page}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activePage === item.page
                  ? "bg-teal-50 text-teal-600 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className="border-t border-slate-100 pt-3 mt-3 space-y-2">
            <a
              href="/faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800"
            >
              FAQ & Support
            </a>
            <a
              href="/shipping"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800"
            >
              Shipping & Delivery
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
