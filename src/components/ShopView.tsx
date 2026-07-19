import React, { useState, useEffect } from "react";
import { Search, Info, Beaker, HelpCircle, Check, AlertTriangle, ShieldCheck } from "lucide-react";
import { siteConfig } from "../site.config";
import { Product } from "../types";

interface ShopViewProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onAddToCart: (product: Product) => void;
}

export default function ShopView({
  selectedCategory,
  setSelectedCategory,
  onAddToCart
}: ShopViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(siteConfig.products);
  const [addedNotification, setAddedNotification] = useState<string | null>(null);

  // Sync products list based on category and search query
  useEffect(() => {
    let result = siteConfig.products;

    if (selectedCategory && selectedCategory !== "All Categories") {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.casNumber.toLowerCase().includes(query) ||
          p.sequence.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchQuery]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleAddToCartWithFeedback = (product: Product) => {
    onAddToCart(product);
    setAddedNotification(product.id);
    setTimeout(() => {
      setAddedNotification(null);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      
      {/* Header Info Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden lab-grid">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 to-slate-900/60 z-0"></div>
        <div className="absolute inset-0 lab-grid opacity-10 z-0"></div>
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-teal-400 bg-slate-800 px-2.5 py-1 rounded border border-slate-700 uppercase tracking-widest">
            Premium Tested Quality
          </span>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Our Peptides & Blends
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Browse our selection of premium peptides. Every batch is thoroughly tested in the UK to ensure the highest standards of quality, clean synthesis, and over 99.0% purity.
          </p>
        </div>
      </div>

      {/* Main Grid: Category Sidebar + Products Container */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        
        {/* Left Side: Filter Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono border-b border-slate-100 pb-2">
              Search Products
            </h3>
            <div className="relative">
              <Search className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, category..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs focus:bg-white focus:ring-1 focus:ring-teal-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-baseline border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                Categories
              </h3>
              {selectedCategory && selectedCategory !== "All Categories" && (
                <button
                  onClick={() => handleCategorySelect("All Categories")}
                  className="text-[10px] text-teal-600 hover:underline font-semibold font-sans"
                >
                  Clear filter
                </button>
              )}
            </div>
            
            <div className="flex flex-col gap-1 max-h-[360px] overflow-y-auto pr-2 space-y-0.5">
              <button
                onClick={() => handleCategorySelect("All Categories")}
                className={`text-left px-2.5 py-1.5 rounded text-xs transition-colors ${
                  !selectedCategory || selectedCategory === "All Categories"
                    ? "bg-teal-50 text-teal-700 font-semibold border-l-2 border-teal-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                All Categories ({siteConfig.products.length})
              </button>
              
              {siteConfig.categories.map((cat) => {
                const count = siteConfig.products.filter(p => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`text-left px-2.5 py-1.5 rounded text-xs transition-colors flex justify-between items-center ${
                      selectedCategory === cat
                        ? "bg-teal-50 text-teal-700 font-semibold border-l-2 border-teal-600"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Removed strict lab notice */}
        </div>

        {/* Right Side: Products Grid */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}</span>
            {selectedCategory && selectedCategory !== "All Categories" && (
              <span>Active Filter: <strong className="text-teal-600 font-semibold">{selectedCategory}</strong></span>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
              <HelpCircle className="h-10 w-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-900 mb-1">No matching products found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                We couldn't locate any peptides matching your query. Please adjust your keywords or choose another active category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Categories");
                }}
                className="mt-4 bg-teal-600 text-white text-xs font-bold py-2 px-5 rounded-lg hover:bg-teal-700 transition cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300"
                >
                    {/* Product Image Container: Contain, White BG, 4:3 */}
                    <div className="bg-[#fff] relative flex items-center justify-center p-4 border-b border-slate-100" style={{ aspectRatio: "4/3" }}>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                      <span className="absolute top-3 left-3 bg-teal-600 text-white text-[9px] font-bold font-mono py-1 px-2 rounded uppercase tracking-wider">
                        {product.badge}
                      </span>
                    </div>

                  {/* Product Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <span className="block text-[10px] font-mono text-teal-600 uppercase tracking-widest font-semibold">
                        {product.category}
                      </span>
                      <h3 className="text-sm font-bold text-slate-950 font-sans">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {product.longDescription}
                      </p>

                      <div className="text-[11px] text-slate-500 flex flex-col pt-3 border-t border-slate-100 gap-1">
                        <div className="flex justify-between">
                          <span>Quality Purity:</span>
                          <span className="text-emerald-600 font-bold">{product.purity}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3">
                      <span className="text-base font-bold font-mono text-slate-900">
                        £{product.price.toFixed(2)}
                      </span>
                      
                      <button
                        onClick={() => handleAddToCartWithFeedback(product)}
                        className={`text-xs font-sans font-bold py-2.5 px-5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                          addedNotification === product.id
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-950 hover:bg-teal-600 text-white"
                        }`}
                      >
                        {addedNotification === product.id ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            Added to Cart
                          </>
                        ) : (
                          "Add to Cart"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
