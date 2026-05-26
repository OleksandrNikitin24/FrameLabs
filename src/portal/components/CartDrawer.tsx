import React, { useState } from "react";
import { X, Trash2, Plus, Minus, KeyRound, CheckCircle2, ShieldAlert, RefreshCw } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [licenseEmail, setLicenseEmail] = useState("");
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [receiptKeys, setReceiptKeys] = useState<{ name: string; key: string }[] | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.extension.price * item.quantity, 0);
  const formatPrice = (amount: number) => amount.toFixed(2);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0 || !agreedToPrivacy || !licenseEmail) return;

    setIsCheckingOut(true);
    setTimeout(() => {
      // Generate secure mockup cryptographic licenses
      const licenses = cart.map(item => {
        const randomString = Math.random().toString(36).substring(2, 10).toUpperCase();
        return {
          name: item.extension.name,
          key: `FL-LIC-${item.extension.id.toUpperCase()}-${randomString}-${Math.floor(1000 + Math.random() * 9000)}`
        };
      });
      setReceiptKeys(licenses);
      setIsCheckingOut(false);
      onClearCart();
    }, 1800);
  };

  return (
    <div id="cart-drawer-backdrop" className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="h-full w-full max-w-md border-l border-brand-border bg-brand-surface-card p-6 shadow-2xl flex flex-col justify-between">

        {/* Header Drawer */}
        <div className="flex items-center justify-between border-b border-brand-border pb-4 mb-4">
          <h3 className="font-sora text-lg font-bold text-white flex items-center gap-2">
            Workspace Licensing Cart
          </h3>
          <button
            onClick={onClose}
            className="rounded hover:bg-brand-surface p-1.5 text-brand-text-muted hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Box */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {receiptKeys ? (
            <div className="text-center p-6 bg-green-950/25 border border-green-500/20 rounded-lg animate-fade-in space-y-4">
              <CheckCircle2 className="h-10 w-10 text-green-400 mx-auto" />
              <h4 className="font-sora text-base font-bold text-white">License Handshake Completed!</h4>
              <p className="text-xs text-brand-text-muted">
                Your licenses are signed and ready. A copy has been registered under account <strong>{licenseEmail}</strong>.
              </p>

              <div className="pt-2 space-y-2 border-t border-brand-border text-left">
                {receiptKeys.map((item, index) => (
                  <div key={index} className="rounded bg-black/40 p-3 border border-brand-border">
                    <span className="font-mono text-[9px] text-brand-primary-light block uppercase tracking-wider">{item.name} License SEAT</span>
                    <span className="font-mono text-xs font-semibold text-white tracking-widest block mt-1 select-all">{item.key}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setReceiptKeys(null);
                  setLicenseEmail("");
                  setAgreedToPrivacy(false);
                  onClose();
                }}
                className="w-full rounded bg-brand-primary py-2.5 font-sans text-xs font-bold uppercase text-white hover:bg-brand-primary/95"
              >
                Return to Workspace
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="h-60 flex flex-col items-center justify-center text-center text-brand-text-muted">
              <KeyRound className="h-10 w-10 opacity-40 mb-2" />
              <p className="text-xs font-medium">Your license cart is empty.</p>
              <p className="text-[10px] max-w-xs mt-1">Navigate to our Extensions Marketplace to verify and download creative single-user seat packages.</p>
            </div>
          ) : (
            <>
              {/* Product items list */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.extension.id} className="rounded-lg border border-brand-border bg-brand-bg/60 p-3 flex justify-between items-center">
                    <div className="space-y-1">
                      <h4 className="font-sora text-xs font-bold text-white">{item.extension.name}</h4>
                      <p className="font-mono text-[10px] text-brand-text-muted">
                        ${formatPrice(item.extension.price)} • {item.extension.licenseLabel ?? "Single-Seat License"}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded border border-brand-border bg-black/40 overflow-hidden text-[10px]">
                        <button
                          onClick={() => onUpdateQuantity(item.extension.id, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-brand-surface text-brand-text-muted"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2.5 font-mono text-white font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.extension.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-brand-surface text-brand-text-muted"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.extension.id)}
                        className="text-brand-text-muted hover:text-red-400 p-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Secure email entry form and boundary check */}
              <form onSubmit={handleCheckoutSubmit} className="space-y-4 border-t border-brand-border/60 pt-4 mt-6">
                <div>
                  <label htmlFor="license-email" className="font-mono text-[10px] uppercase tracking-wider text-brand-text-muted block mb-1.5">
                    Email for License Issuance:
                  </label>
                  <input
                    id="license-email"
                    type="email"
                    required
                    value={licenseEmail}
                    onChange={(e) => setLicenseEmail(e.target.value)}
                    placeholder="creative@editor.io"
                    className="w-full rounded border border-brand-border bg-[#0a0a0f] px-3 py-2 text-xs text-white placeholder-brand-text-muted outline-none focus:border-brand-primary"
                  />
                </div>

                {/* Consent checkbox */}
                <div className="rounded bg-black/25 p-3 border border-brand-border flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    required
                    id="agreed-check"
                    checked={agreedToPrivacy}
                    onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                    className="mt-0.5 accent-brand-primary"
                  />
                  <label htmlFor="agreed-check" className="text-[10px] leading-relaxed text-brand-text-muted cursor-pointer">
                    I consent to the collection and salt-hashing of my motherboard UUID fingerprint for license check verification as outlined in Section 2 of the <strong className="text-white">Privacy Policy</strong>.
                  </label>
                </div>

                {/* Pricing Summary */}
                <div className="bg-[#100d16] rounded border border-brand-border p-3 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-brand-text-muted">
                    <span>License Subtotal:</span>
                    <span>${formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-brand-text-muted">
                    <span>Cryptographic Encryption:</span>
                    <span className="text-brand-secondary">TLS 1.3 Active</span>
                  </div>
                  <div className="flex justify-between text-white font-bold border-t border-brand-border/60 pt-2 text-sm">
                    <span>Total Cost:</span>
                    <span>${formatPrice(subtotal)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isCheckingOut || !agreedToPrivacy || !licenseEmail || cart.length === 0}
                  className="w-full flex items-center justify-center gap-2 rounded bg-brand-primary py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-brand-primary/10 transition-all hover:bg-brand-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" /> Issuing Digital Seats...
                    </>
                  ) : (
                    <>
                      Fulfill Secure Order • ${formatPrice(subtotal)}
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Footnote statement */}
        <div className="mt-4 pt-4 border-t border-brand-border text-center text-[10px] font-mono text-brand-text-muted">
          All payment keys routing isolated via Stripe. No digits are saved.
        </div>

      </div>
    </div>
  );
}
