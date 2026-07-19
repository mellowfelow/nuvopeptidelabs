import React, { useState } from "react";
import { ArrowLeft, Check, ShieldCheck, Beaker, Truck, HelpCircle, FileText, CornerDownRight } from "lucide-react";
import { Product } from "../types";
import { siteConfig } from "../site.config";

interface ProductDetailViewProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetailView({ product, onAddToCart }: ProductDetailViewProps) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const minOrder = siteConfig.orderRules.minOrder;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      {/* Back button */}
      <div>
        <a
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Peptide Catalog
        </a>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Left: Product Image (contain-fit, white bg, 4:3 aspect ratio) */}
        <div className="lg:col-span-5 bg-white flex items-center justify-center p-6 border-b lg:border-b-0 lg:border-r border-slate-200" style={{ aspectRatio: "4/3" }}>
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain mix-blend-multiply"
            />
            <span className="absolute top-0 left-0 bg-teal-600 text-white text-[10px] font-bold font-mono py-1 px-2.5 rounded uppercase tracking-wider">
              {product.badge}
            </span>
          </div>
        </div>

        {/* Right: Product details */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <a
                href={`/shop?category=${encodeURIComponent(product.category)}`}
                className="text-[10px] font-mono text-teal-600 hover:underline uppercase tracking-widest font-bold"
              >
                {product.category}
              </a>
              <h1 className="font-sans text-xl sm:text-2xl font-extrabold text-slate-950">
                {product.name}
              </h1>
            </div>

            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 border-b border-slate-100 pb-3">
              £{product.price.toFixed(2)}
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              <p>{product.longDescription}</p>
              <p className="text-slate-500 text-xs">
                {product.description}
              </p>
            </div>

            {/* Chemical Properties Panel */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-150 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5 border-b border-slate-200/60 pb-1.5">
                <Beaker className="h-4 w-4 text-teal-600" />
                Chemical Analysis Details
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="block text-[10px] text-slate-400 font-mono uppercase">CAS Registry Number</span>
                  <span className="font-mono text-slate-800 font-medium">{product.casNumber}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-mono uppercase">HPLC Purity Level</span>
                  <span className="font-mono text-emerald-600 font-bold">{product.purity}</span>
                </div>
              </div>
              <div className="pt-1.5">
                <span className="block text-[10px] text-slate-400 font-mono uppercase">Amino Acid Sequence</span>
                <span className="block font-mono text-[10px] bg-white border border-slate-200 p-2 rounded text-slate-600 break-all select-all">
                  {product.sequence}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            {/* CTA and Add to Queue */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 sm:flex-none sm:px-8 py-3.5 rounded-lg text-xs font-bold font-sans transition cursor-pointer flex items-center justify-center gap-2 ${
                  added
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-950 hover:bg-teal-600 text-white shadow-md hover:shadow-lg"
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" />
                    Added to Shopping Cart
                  </>
                ) : (
                  <>
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
              
              <div className="text-[10px] text-slate-400 text-center sm:text-left font-sans">
                Minimum UK order: £{minOrder}. Bank Transfer payments.
              </div>
            </div>

            {/* Quick trust highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[10px] text-slate-500 font-sans pt-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-teal-600 flex-shrink-0" />
                <span>Purity Verified &gt;99.0%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-teal-600 flex-shrink-0" />
                <span>Discreet 24h tracked courier</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-teal-600 flex-shrink-0" />
                <span>Certificate on Request</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
