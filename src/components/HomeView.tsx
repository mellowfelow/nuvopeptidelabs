import React from "react";
import { Beaker, ShieldAlert, Award, Send, Milestone, ChevronRight, ArrowRight, Activity, FlaskConical } from "lucide-react";
import { siteConfig } from "../site.config";
import { ActivePage, Product } from "../types";

interface HomeViewProps {
  setActivePage: (page: ActivePage) => void;
  setSelectedCategory: (category: string) => void;
  onAddToCart: (product: Product) => void;
}

export default function HomeView({ setActivePage, setSelectedCategory, onAddToCart }: HomeViewProps) {
  // Features standard featured products
  const featuredProducts = siteConfig.products.slice(0, 3);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setActivePage("shop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProductClick = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-16 pb-16 animate-fade-in">
      {/* 1. HERO SECTION with display typography, brand-entity sentence, and clear CTA */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-20 sm:py-24 lab-grid">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 to-slate-900/60 z-0"></div>
        
        {/* Subtle grid accent */}
        <div className="absolute inset-0 lab-grid opacity-10 z-0"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            {/* Primary Keyword in H1 with display styling */}
            <h1 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Premium Tested <br />
              <span className="text-teal-400 font-mono">Retatrutide UK</span> & Peptides
            </h1>
            
            {/* Exactly the mandatory brand-entity sentence */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-sans">
              {siteConfig.business.brandEntitySentence}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 border-t border-b border-slate-800 py-4 max-w-lg">
              <div>
                <span className="block text-lg sm:text-xl font-bold font-mono text-teal-400">99.4%+</span>
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-sans">Tested Purity</span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-bold font-mono text-teal-400">ISO 9001</span>
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-sans">Tested & Verified</span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-bold font-mono text-teal-400">100%</span>
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-sans">UK Discreet Delivery</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="/shop"
                className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold py-3.5 px-8 rounded-lg transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Shop Our Peptides</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/wholesale"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold py-3.5 px-8 rounded-lg border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Wholesale Peptides</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:block relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-500 opacity-20 blur-xl"></div>
            <div className="relative bg-slate-950/80 border border-slate-800 p-6 rounded-2xl shadow-2xl backdrop-blur-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
                  <FlaskConical className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">In-Stock Items</h3>
                  <p className="text-[10px] text-slate-400">Stock status: available</p>
                </div>
              </div>
              
              <div className="space-y-2 text-xs text-slate-400 leading-normal">
                <div className="flex justify-between items-center bg-slate-900/50 p-2 rounded border border-slate-800">
                  <span className="font-mono">Retatrutide</span>
                  <span className="text-teal-400 font-mono font-bold">99.4% Purity</span>
                </div>
                <div className="flex justify-between items-center bg-slate-900/50 p-2 rounded border border-slate-800">
                  <span className="font-mono">Tirzepatide</span>
                  <span className="text-teal-400 font-mono font-bold">99.2% Purity</span>
                </div>
                <div className="flex justify-between items-center bg-slate-900/50 p-2 rounded border border-slate-800">
                  <span className="font-mono">BPC-157</span>
                  <span className="text-teal-400 font-mono font-bold">99.6% Purity</span>
                </div>
              </div>

               <div className="p-3 bg-slate-900 border border-slate-850 rounded-lg text-[10px] text-slate-400 flex gap-2">
                <Beaker className="h-5 w-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-teal-400 block font-mono uppercase tracking-wide">Premium Quality Guarantee</strong>
                  Every peptide batch is carefully analyzed and tested to guarantee the best quality, clean synthesis, and reliable results.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST / CAPABILITIES BAR */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 bg-teal-50 rounded-lg text-teal-600 flex items-center justify-center flex-shrink-0">
              <Beaker className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono mb-1">Quality Tested & Approved</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Every batch is thoroughly tested by independent labs to guarantee over 99.0% purity and perfect quality.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 bg-teal-50 rounded-lg text-teal-600 flex items-center justify-center flex-shrink-0">
              <Milestone className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono mb-1">Protected Temperature Packaging</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your peptides are vacuum-sealed and shipped inside protective, temperature-regulated packaging to keep them perfectly fresh.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 bg-teal-50 rounded-lg text-teal-600 flex items-center justify-center flex-shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono mb-1">Discreet Tracked Shipping</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Shipped in unbranded, discreet padded envelopes or boxes to ensure complete privacy and fast tracked delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENTO GRID OF POPULAR PEPTIDE CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-sans text-2xl font-bold tracking-tight text-slate-900">
            Peptides by Category
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Easily browse and find premium peptides based on your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a 
            href={`/shop?category=${encodeURIComponent("Weight Loss Peptides")}`}
            className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute right-0 bottom-0 h-16 w-16 bg-slate-50 rounded-tl-full flex items-end justify-end p-2 group-hover:bg-teal-50 transition-colors">
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-teal-600" />
            </div>
            <span className="block font-mono text-[10px] text-teal-600 uppercase tracking-widest font-bold mb-2">Metabolic Support</span>
            <h3 className="text-sm font-bold text-slate-950 font-sans mb-1 group-hover:text-teal-600 transition-colors">Weight Loss Peptides</h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
              Including Retatrutide, Tirzepatide, and other premium options.
            </p>
          </a>

          <a 
            href={`/shop?category=${encodeURIComponent("Recovery Peptides")}`}
            className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute right-0 bottom-0 h-16 w-16 bg-slate-50 rounded-tl-full flex items-end justify-end p-2 group-hover:bg-teal-50 transition-colors">
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-teal-600" />
            </div>
            <span className="block font-mono text-[10px] text-teal-600 uppercase tracking-widest font-bold mb-2">Recovery & Repair</span>
            <h3 className="text-sm font-bold text-slate-950 font-sans mb-1 group-hover:text-teal-600 transition-colors">Recovery Peptides</h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
              Compounds focused on recovery and tissue repair like BPC-157.
            </p>
          </a>

          <a 
            href={`/shop?category=${encodeURIComponent("Injectable Blends & Combinations")}`}
            className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute right-0 bottom-0 h-16 w-16 bg-slate-50 rounded-tl-full flex items-end justify-end p-2 group-hover:bg-teal-50 transition-colors">
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-teal-600" />
            </div>
            <span className="block font-mono text-[10px] text-teal-600 uppercase tracking-widest font-bold mb-2">Custom Combinations</span>
            <h3 className="text-sm font-bold text-slate-950 font-sans mb-1 group-hover:text-teal-600 transition-colors">Injectable Blends</h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
              Synergistic peptide complexes designed for combined pathways.
            </p>
          </a>
        </div>

        <div className="text-center pt-2">
          <a
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline cursor-pointer"
          >
            <span>View all peptide categories</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS SECTION - emphasizing White background containers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <h2 className="font-sans text-xl font-extrabold text-slate-950">
              Featured Peptides
            </h2>
            <p className="text-xs text-slate-500">
              Our most popular premium tested peptides.
            </p>
          </div>
          <a
            href="/shop"
            className="text-xs font-bold text-teal-600 hover:text-teal-700 inline-flex items-center gap-1 cursor-pointer"
          >
            Browse Full Catalog <ChevronRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300"
            >
              {/* Product Photo Container conforming to design standard: white background, aspect-ratio:4/3, contain */}
              <a href={`/product/${product.id}`} className="block group">
                <div className="bg-[#fff] relative flex items-center justify-center p-4 border-b border-slate-100" style={{ aspectRatio: "4/3" }}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-102 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-teal-600 text-white text-[9px] font-bold font-mono py-1 px-2 rounded uppercase tracking-wider">
                    {product.badge}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-sm text-slate-300 text-[9px] font-mono py-0.5 px-2 rounded">
                    {product.purity}
                  </span>
                </div>
              </a>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <a
                    href={`/shop?category=${encodeURIComponent(product.category)}`}
                    className="block text-[10px] font-mono text-teal-600 hover:underline uppercase tracking-widest font-semibold"
                  >
                    {product.category}
                  </a>
                  <a href={`/product/${product.id}`} className="block hover:text-teal-600 transition-colors">
                    <h3 className="text-sm font-bold text-slate-950 font-sans line-clamp-1">
                      {product.name}
                    </h3>
                  </a>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                  <div className="text-[11px] text-slate-500 flex flex-col pt-2 border-t border-slate-100 gap-0.5">
                    <span>Quality Purity: <strong className="text-emerald-600 font-bold">{product.purity}</strong></span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-base font-bold font-mono text-slate-900">
                    £{product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="bg-slate-950 hover:bg-teal-600 text-white text-[11px] font-sans font-bold py-2.5 px-4 rounded transition cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BRAND ANCHOR ENTITY & STORY SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1 text-[11px] font-mono text-teal-600 bg-teal-50 border border-teal-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
              <Activity className="h-3.5 w-3.5" />
              Established Manchester 2022
            </div>
            <h2 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-slate-950">
              Uncompromising Peptide Standards
            </h2>
            
            {/* The brand entity statement as required */}
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              <strong>Nuvo Peptide Labs</strong> is a Manchester-based supplier of high-quality tested peptides, established in 2022, offering pure and clean products with a focus on discreet and fast delivery across the UK.
            </p>
            
            <p className="text-xs text-slate-500 leading-relaxed">
              We believe in providing clean and reliable peptides. By working closely with trusted laboratories, we make sure that every batch meets the highest standards of quality. Whether you are looking for specific custom blends or standard items, Nuvo Peptide Labs is dedicated to delivering the finest purity and fastest shipping.
            </p>

            <div className="pt-2">
              <a
                href="/about"
                className="text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>About Our Team</span> <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Graphical/Bullet bento list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-lg border border-slate-200/60">
              <span className="block text-xl font-bold text-teal-600 font-mono mb-1">99.0%+</span>
              <span className="block text-xs font-bold text-slate-950 font-sans mb-1">Quality Control</span>
              <span className="block text-xs text-slate-500 leading-relaxed">
                If any batch falls below our 99.0% purity standard, it is completely rejected and not sold.
              </span>
            </div>
            <div className="bg-white p-5 rounded-lg border border-slate-200/60">
              <span className="block text-xl font-bold text-teal-600 font-mono mb-1">BACS</span>
              <span className="block text-xs font-bold text-slate-950 font-sans mb-1">Direct Bank Transfer</span>
              <span className="block text-xs text-slate-500 leading-relaxed">
                Direct bank transfer keeps your checkout completely secure and transaction costs low.
              </span>
            </div>
            <div className="bg-white p-5 rounded-lg border border-slate-200/60">
              <span className="block text-xl font-bold text-teal-600 font-mono mb-1">£250</span>
              <span className="block text-xs font-bold text-slate-950 font-sans mb-1">Minimum Order</span>
              <span className="block text-xs text-slate-500 leading-relaxed">
                Our minimum order of £250 ensures we can package and ship your items with protective care.
              </span>
            </div>
            <div className="bg-white p-5 rounded-lg border border-slate-200/60">
              <span className="block text-xl font-bold text-teal-600 font-mono mb-1">24h</span>
              <span className="block text-xs font-bold text-slate-950 font-sans mb-1">Discreet Shipping</span>
              <span className="block text-xs text-slate-500 leading-relaxed">
                Packed inside plain, non-branded boxes or bags with neutral labels to protect your privacy.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
