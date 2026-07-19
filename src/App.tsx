import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageSquare, Phone, ShieldCheck, Mail, ArrowUp } from "lucide-react";

// Central site config & types
import { siteConfig } from "./site.config";
import { ActivePage, CartItem, Product } from "./types";

// Extracted Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";

// Custom Views
import HomeView from "./components/HomeView";
import ShopView from "./components/ShopView";
import BlogView from "./components/BlogView";
import AboutView from "./components/AboutView";
import ContactView from "./components/ContactView";
import FAQView from "./components/FAQView";
import WholesaleView from "./components/WholesaleView";
import LegalView from "./components/LegalView";

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Load cart from LocalStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("nuvo_cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
  }, []);

  // Persist cart changes to LocalStorage
  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    try {
      localStorage.setItem("nuvo_cart", JSON.stringify(updatedCart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  };

  // Scroll to top tracking
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = (product: Product) => {
    const existingIndex = cart.findIndex(item => item.product.id === product.id);
    let updated: CartItem[];
    if (existingIndex > -1) {
      updated = [...cart];
      updated[existingIndex].quantity += 1;
    } else {
      updated = [...cart, { product, quantity: 1 }];
    }
    saveCartToStorage(updated);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    const updated = cart.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity };
      }
      return item;
    });
    saveCartToStorage(updated);
  };

  const handleRemoveItem = (productId: string) => {
    const updated = cart.filter(item => item.product.id !== productId);
    saveCartToStorage(updated);
  };

  const handleClearCart = () => {
    saveCartToStorage([]);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Dynamic router
  const renderActiveView = () => {
    switch (activePage) {
      case "shop":
        return (
          <ShopView
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onAddToCart={handleAddToCart}
          />
        );
      case "blog":
        return <BlogView />;
      case "about":
        return <AboutView />;
      case "contact":
        return <ContactView />;
      case "faq":
        return <FAQView />;
      case "wholesale":
        return <WholesaleView />;
      case "shipping":
      case "refund":
      case "privacy":
      case "terms":
        return <LegalView pageType={activePage} />;
      case "home":
      default:
        return (
          <HomeView
            setActivePage={setActivePage}
            setSelectedCategory={setSelectedCategory}
            onAddToCart={handleAddToCart}
          />
        );
    }
  };

  return (
    <div id="applet-container" className="flex flex-col min-h-screen bg-[#f8fafc] text-[#0f172a] select-none selection:bg-teal-100 selection:text-teal-900">
      
      {/* 1. Header Navigation */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
      />

      {/* 2. Main Content Stage with high-end fade transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Footer Section */}
      <Footer setActivePage={setActivePage} />

      {/* 4. Cart Sidebar Overlay */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 5. FLOATING WIDGETS */}
      {/* Scroll-to-top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg hover:bg-slate-800 transition duration-200"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4.5 w-4.5" />
        </button>
      )}

      {/* WhatsApp Help Floating Balloon */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <a
          href="https://wa.me/447838207659"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 bg-emerald-600 text-white rounded-full p-3 shadow-lg hover:bg-emerald-700 transition duration-200"
          aria-label="Secure WhatsApp Assistance"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-sans text-xs font-bold whitespace-nowrap pr-1">
            Secure Live Help
          </span>
        </a>
      </div>

    </div>
  );
}
