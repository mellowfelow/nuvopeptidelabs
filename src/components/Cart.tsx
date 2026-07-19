import React, { useState } from "react";
import { X, Trash2, Plus, Minus, AlertTriangle, ShieldCheck, Mail, ArrowRight, CornerDownRight, CheckCircle2 } from "lucide-react";
import { siteConfig } from "../site.config";
import { CartItem, OrderFormData } from "../types";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function Cart({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartProps) {
  const [isCheckoutStep, setIsCheckoutStep] = useState(false);
  const [isSuccessState, setIsSuccessState] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form Fields State
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: "",
    email: "",
    phone: "",
    deliveryAddress: "",
    city: "",
    postalCode: "",
    specialInstructions: "",
    botcheck: false
  });

  if (!isOpen) return null;

  // Totals calculations
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const minOrder = siteConfig.orderRules.minOrder;
  const freeShippingThreshold = siteConfig.orderRules.freeShippingOver;
  const flatShippingFee = siteConfig.orderRules.flatShippingFee;

  const isMinOrderMet = subtotal >= minOrder;
  const shippingFee = subtotal >= freeShippingThreshold ? 0 : flatShippingFee;
  const grandTotal = subtotal + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Form Submission conforming strictly to Web3Forms Rule 5 (CORS, no headers, botcheck, access_key, etc.)
  const handleCheckoutSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    // Prepare message string for email body
    const orderDetails = cart
      .map(item => `- ${item.product.name} (Qty: ${item.quantity}) - £${(item.product.price * item.quantity).toFixed(2)}`)
      .join("\n");

    const fullMessage = `
--- NEW LAB ORDER DETAILS ---
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.deliveryAddress}, ${formData.city}, ${formData.postalCode}
Special Instructions: ${formData.specialInstructions || "None"}

--- ORDER ITEMS ---
${orderDetails}

Subtotal: £${subtotal.toFixed(2)}
Shipping Fee: £${shippingFee.toFixed(2)}
Grand Total: £${grandTotal.toFixed(2)}

Payment Method Required: Bank Transfer (BACS)
*Action Required: Send invoice details and bank transfer instructions to the researcher.*
    `;

    const formElement = e.currentTarget;

    // Check if the Access Key is a placeholder
    const isPlaceholderKey = siteConfig.orderRules.web3FormsKey === "pending";

    if (isPlaceholderKey) {
      // Direct pass-through for preview when key is pending (as specified in rule 5)
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccessState(true);
        onClearCart();
      }, 800);
      return;
    }

    // Creating native FormData object for Web3Forms (MUST not modify Content-Type or add headers manually)
    const nativeFormData = new FormData();
    nativeFormData.append("access_key", siteConfig.orderRules.web3FormsKey);
    nativeFormData.append("subject", `New Lab Order Inquiry - ${formData.fullName}`);
    nativeFormData.append("from_name", "Nuvo Peptide Labs Order System");
    nativeFormData.append("name", formData.fullName);
    nativeFormData.append("email", formData.email);
    nativeFormData.append("phone", formData.phone);
    nativeFormData.append("message", fullMessage);
    if (formData.botcheck) {
      nativeFormData.append("botcheck", "true");
    }

    // EXACT FETCH SHAPE FROM GUIDELINE 5 (no Content-Type header specified)
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
          onClearCart();
        } else {
          throw new Error(res.data && res.data.message || "Submission failed");
        }
      })
      .catch((err) => {
        setIsSubmitting(false);
        setErrorMessage(
          `CORS submission failed. Please complete your transfer by emailing orders@nuvopeptidelabs.com or contact our lab directly on WhatsApp at +447838207659.`
        );
      });
  };

  const handleBackToCart = () => {
    setIsCheckoutStep(false);
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-modal="true" role="dialog">
      {/* Backdrop overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform bg-white shadow-2xl flex flex-col h-full border-l border-slate-200">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <h2 className="text-md font-bold text-slate-900 flex items-center gap-2 font-sans">
              <span>Your Shopping Cart</span>
              {cart.length > 0 && (
                <span className="text-xs bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-mono">
                  {cart.length} item{cart.length > 1 ? "s" : ""}
                </span>
              )}
            </h2>
            <button 
              onClick={onClose}
              className="rounded-md text-slate-400 hover:text-slate-500 focus:outline-none"
              aria-label="Close panel"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Success Screen */}
          {isSuccessState ? (
            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col items-center justify-center text-center">
              <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-sans mb-2">
                Order Completed
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mb-6">
                Your order has been placed. We have sent the bank transfer details and invoice to your email so we can pack and ship your order quickly.
              </p>

              {/* Warning about pending key */}
              {siteConfig.orderRules.web3FormsKey === "pending" && (
                <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded text-left text-[11px] text-amber-800">
                  <span className="font-bold block mb-1">Developer Notice:</span>
                  Web3Forms is currently in "pending" mode. Submissions are bypassed inside the UI preview. Please insert your access key in <code className="font-mono bg-amber-100 px-1 rounded">site.config.ts</code> to enable actual email delivery.
                </div>
              )}

              {/* BACS Instructions - EXTREMELY CLEAR AND PROFESSIONAL */}
              <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-left space-y-3">
                <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider font-mono flex items-center gap-1 border-b border-slate-200 pb-1.5">
                  <CornerDownRight className="h-3.5 w-3.5 text-teal-600" />
                  Bank Transfer (BACS) Instructions
                </h4>
                <p className="text-[11px] text-slate-600">
                  Please check your registered email address shortly. We have dispatched your secure pro-forma invoice containing bank sort codes and reference identifiers.
                </p>
                <div className="text-[11px] font-mono bg-white p-2.5 rounded border border-slate-100 text-slate-700 space-y-1">
                  <div><strong className="text-slate-950">Payee Name:</strong> Nuvo Peptide Labs Ltd</div>
                  <div><strong className="text-slate-950">Bank:</strong> Faster Payments UK System</div>
                  <div><strong className="text-slate-950">Sort Code:</strong> 20-45-45 (Simulated)</div>
                  <div><strong className="text-slate-950">Account No:</strong> 83820765 (Simulated)</div>
                  <div><strong className="text-slate-950">Payment Ref:</strong> NUVO-{Math.floor(1000 + Math.random() * 9000)}</div>
                </div>
                <div className="text-[10px] text-slate-500 italic">
                  *Vials remain frozen at -20°C until bank clearance completes. Unpaid reservation queues are purged after 48 hours.*
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCheckoutStep(false);
                  setIsSuccessState(false);
                  onClose();
                }}
                className="mt-8 w-full bg-slate-900 text-white text-xs font-bold py-3 px-4 rounded-lg hover:bg-slate-800 transition"
              >
                Close Queue Panel
              </button>
            </div>
          ) : isCheckoutStep ? (
            /* Checkout Step Form */
            <form onSubmit={handleCheckoutSubmit} className="flex-1 flex flex-col justify-between overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                <div className="flex items-center gap-2 text-xs font-medium text-teal-600 bg-teal-50 border border-teal-100 p-2.5 rounded-lg">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Secure Checkout Form</span>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                    {errorMessage}
                  </div>
                )}

                {/* Honeypot field for Web3Forms spam protection */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  checked={formData.botcheck}
                  onChange={handleInputChange}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-1 font-mono">
                    Billing & Customer Details
                  </h3>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-xs focus:bg-white focus:ring-1 focus:ring-teal-500"
                      placeholder="e.g. John Miller"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-xs focus:bg-white focus:ring-1 focus:ring-teal-500"
                        placeholder="john.miller@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-xs focus:bg-white focus:ring-1 focus:ring-teal-500"
                        placeholder="+44 7..."
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-1 font-mono">
                    UK Delivery Address
                  </h3>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">
                      Delivery Address *
                    </label>
                    <input
                      required
                      type="text"
                      name="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-xs focus:bg-white focus:ring-1 focus:ring-teal-500"
                      placeholder="Street address, building name, flat number"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">
                        City *
                      </label>
                      <input
                        required
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-xs focus:bg-white focus:ring-1 focus:ring-teal-500"
                        placeholder="Manchester"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">
                        Postcode *
                      </label>
                      <input
                        required
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-xs focus:bg-white focus:ring-1 focus:ring-teal-500"
                        placeholder="M1 1AA"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      name="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-xs h-16 focus:bg-white focus:ring-1 focus:ring-teal-500"
                      placeholder="e.g. Special delivery instructions, gated access code..."
                    />
                  </div>
                </div>

                {/* Sub-order review box */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-[11px] space-y-1.5">
                  <span className="font-bold text-slate-900 block font-mono">Order Summary:</span>
                  {cart.map(item => (
                    <div key={item.product.id} className="flex justify-between text-slate-600">
                      <span>{item.product.name} × {item.quantity}</span>
                      <span>£{(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-slate-200 pt-1.5 mt-1 flex justify-between font-bold text-slate-900">
                    <span>Total (including UK shipping):</span>
                    <span>£{grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Submit Button */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-teal-600 text-white font-sans text-xs font-bold py-3.5 rounded-lg hover:bg-teal-700 transition flex items-center justify-center gap-2 cursor-pointer disabled:bg-teal-400"
                >
                  {isSubmitting ? (
                    "Placing Order..."
                  ) : (
                    <>
                      <span>Place Order (Bank Transfer)</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleBackToCart}
                  className="w-full text-center text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
                >
                  Return to Cart
                </button>
              </div>
            </form>
          ) : (
            /* Main Cart Items View */
            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              {cart.length === 0 ? (
                /* Empty Cart */
                <div className="flex-1 px-6 py-8 flex flex-col items-center justify-center text-center">
                  <div className="h-12 w-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">Your cart is currently empty</h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xs mb-6">
                    Browse our premium selection of tested peptides and add items to your cart.
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-teal-600 text-white text-xs font-bold py-2 px-6 rounded-lg hover:bg-teal-700 transition cursor-pointer"
                  >
                    Shop Peptides
                  </button>
                </div>
              ) : (
                /* Cart Items List */
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {cart.map((item) => (
                    <div 
                      key={item.product.id}
                      className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 relative group"
                    >
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="h-14 w-14 object-cover rounded bg-white border border-slate-200"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-bold text-slate-950 font-sans leading-tight">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="block text-[10px] text-teal-600 font-medium mt-0.5">
                          {item.product.category}
                        </span>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-slate-200 rounded bg-white">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="p-1 text-slate-500 hover:text-slate-800"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 text-xs font-mono font-bold text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 text-slate-500 hover:text-slate-800"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="text-xs font-bold text-slate-900 font-mono">
                            £{(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Bottom Billing Summary */}
              {cart.length > 0 && (
                <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-4">
                  {/* Warning if Minimum Order not met */}
                  {!isMinOrderMet && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2 text-amber-800 text-xs">
                      <AlertTriangle className="h-4.5 w-4.5 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">Minimum Order Not Met</span>
                        Our minimum order value is £250.00. You need to add £{(minOrder - subtotal).toFixed(2)} more to place your order.
                      </div>
                    </div>
                  )}

                  {/* Pricing break downs */}
                  <div className="space-y-2 text-xs font-medium">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span className="font-mono">£{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Express Shipping (Tracked)</span>
                      <span className="font-mono">
                        {shippingFee === 0 ? "FREE" : `£${shippingFee.toFixed(2)}`}
                      </span>
                    </div>
                    {subtotal < freeShippingThreshold && (
                      <div className="text-[10px] text-teal-600 text-right italic">
                        *Add £{(freeShippingThreshold - subtotal).toFixed(2)} more for free express shipping*
                      </div>
                    )}
                    <div className="border-t border-slate-200 pt-3 flex justify-between text-sm font-bold text-slate-950">
                      <span>Grand Total</span>
                      <span className="font-mono">£{grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={() => setIsCheckoutStep(true)}
                    disabled={!isMinOrderMet}
                    className="w-full bg-teal-600 text-white font-sans text-xs font-bold py-3 px-4 rounded-lg hover:bg-teal-700 transition flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <div className="text-[10px] text-center text-slate-500 leading-normal">
                    *We hold your items for 48 hours. Orders are shipped as soon as bank transfer payment is cleared.*
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
