import { useState, useEffect, FormEvent } from "react";
import { Check, ShieldCheck, CreditCard, Sparkles, Key, CheckCircle } from "lucide-react";

export function Pricing() {
  const [seats, setSeats] = useState<number>(1);
  const [billingCycle, setBillingCycle] = useState<"one-time" | "annual">("one-time");
  
  // Checkout modal trigger states
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [generatedKey, setGeneratedKey] = useState("");

  // Base price configs
  const basePricePerSeat = 9.99; // $9.99 one-time
  
  // Volumetric scale discounts trigger logic
  let discount = 0;
  if (seats >= 15) discount = 0.30; // 30% off
  else if (seats >= 8) discount = 0.20; // 20% off
  else if (seats >= 3) discount = 0.10; // 10% off

  const priceBeforeDiscount = Number((seats * basePricePerSeat).toFixed(2));
  const totalPrice = Number((priceBeforeDiscount * (1 - discount)).toFixed(2));

  // Load existing license if present.
  useEffect(() => {
    const activeKey = localStorage.getItem("flowcut_license_key");
    if (activeKey) {
      setGeneratedKey(activeKey);
    }
  }, []);

  const handlePurchase = (e: FormEvent) => {
    e.preventDefault();
    if (!checkoutEmail) return;

    setIsPaying(true);
    
    setTimeout(() => {
      // Create a simulated secure product key
      const randomKey = `FC30-REMOV-${Math.floor(1000 + Math.random() * 9000)}-SILNC-${Math.floor(1000 + Math.random() * 9000)}`;
      localStorage.setItem("flowcut_license_key", randomKey);
      setGeneratedKey(randomKey);
      setIsPaying(false);
      setPaymentDone(true);
    }, 1800);
  };

  return (
    <section id="pricing-tier" className="max-w-7xl mx-auto px-6 sm:px-8 py-24 relative overflow-hidden">
      
      {/* Absolute blurred backdrop aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-purple/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      {/* Main Container visual card */}
      <div className="relative glass-card rounded-2xl p-8 sm:p-12 border border-white/10 shadow-2xl bg-black/50 text-center max-w-4xl mx-auto">
        <div className="max-w-xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7C3AED] font-mono">
            GET LIFETIME ACCESS
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-black text-white tracking-tight">
            Start cutting silence today.
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed font-body font-light">
            Join thousands of professional editors who have reclaimed their time with FlowCut. One-time purchase, lifetime updates.
          </p>
        </div>

        {/* Dynamic Pricing Estimator Tool */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white/5 p-6 sm:p-8 rounded-xl border border-white/5 text-left mb-6">
          <div className="space-y-5">
            <div>
              <span className="text-[10px] font-bold text-brand-purple-light uppercase tracking-widest font-mono">
                Flexible Volume Licensing
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Configure your seats
              </h3>
            </div>

            {/* Slider seats */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-text-muted font-medium">Number of Editors</span>
                <span className="font-mono text-white font-semibold">{seats} {seats === 1 ? "User Seat" : "User Seats"}</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                className="w-full accent-brand-purple cursor-pointer bg-neutral-800 rounded appearance-none h-1.5"
              />
              <div className="flex justify-between text-[10px] text-text-muted/60 font-mono">
                <span>1 Editor</span>
                <span>30 Editors</span>
              </div>
            </div>

            {/* Dynamic volume notifications */}
            <div className="min-h-[40px]">
              {discount > 0 ? (
                <div className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 py-1.5 px-3 rounded flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Volumetric discount applied: <strong>{Math.round(discount * 100)}% Off</strong></span>
                </div>
              ) : (
                <p className="text-[11px] text-text-muted font-light leading-relaxed">
                  Add 3 or more seats for automatic volume discounts starting at 10% off. Perfect for agencies and studios.
                </p>
              )}
            </div>

            {/* Check value cards */}
            <div className="space-y-2.5 pt-1.5">
              {[
                "Unlimited video/audio exports",
                "FCP sequence XML connector",
                "Vocal isolation background integration",
                "Lifetime free patches & version upgrades"
              ].map((txt, id) => (
                <div key={id} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-brand-purple-light" />
                  <span className="text-xs text-text-muted">{txt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Quote Summary Side Card */}
          <div className="glass-card rounded-lg p-6 border border-white/10 text-center flex flex-col justify-between h-full relative overflow-hidden bg-black/40">
            {/* Standard label box */}
            <div className="space-y-2">
              <span className="inline-block px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-widest text-brand-purple-light rounded bg-brand-purple/15 border border-brand-purple/20">
                STANDARD LICENSE
              </span>
              <div className="pt-2">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl sm:text-5xl font-sans font-black text-white">${totalPrice.toFixed(2)}</span>
                  <span className="text-xs text-text-muted font-light uppercase tracking-wider">/forever</span>
                </div>
                {discount > 0 && (
                  <p className="text-[11px] text-text-muted line-through mt-0.5">
                    Was ${priceBeforeDiscount.toFixed(2)}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3 mt-6">
              <button
                onClick={() => {
                  setPaymentDone(false);
                  setIsCheckoutOpen(true);
                }}
                className="cursor-pointer w-full py-3 rounded-md text-xs font-bold bg-brand-purple text-white hover:bg-brand-purple-hover transition-all duration-200 transform hover:scale-[1.015] shadow-lg shadow-brand-purple/20"
              >
                Buy FlowCut Now
              </button>
              <span className="block text-[10px] text-text-muted font-mono uppercase tracking-wider">
                14-day money-back guarantee
              </span>
            </div>
          </div>
        </div>

        {/* Existing Activation Key box */}
        {generatedKey && (
          <div className="bg-brand-purple/10 border border-brand-purple/20 rounded-lg p-4 max-w-lg mx-auto flex items-center justify-between text-left mt-4 animate-in fade-in zoom-in duration-300">
            <div>
              <span className="text-[10px] font-bold text-brand-purple-light font-mono block uppercase">Active License Registered</span>
              <span className="font-mono text-sm text-white font-semibold select-all">{generatedKey}</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-sans text-xs font-semibold bg-emerald-500/10 px-2 py-1 rounded">
              <ShieldCheck className="w-4 h-4" /> Ready
            </div>
          </div>
        )}

      </div>

      {/* Checkout Simulator Dialog Portal Overlay */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative glass-card rounded-xl p-6.5 max-w-md w-full border border-white/10 bg-brand-surface text-left shadow-2xl">
            
            <div className="flex justify-between items-start border-b border-white/10 pb-3 mb-4">
              <div>
                <h3 className="text-lg font-bold text-white font-sans">FlowCut Secure Checkout</h3>
                <p className="text-xs text-text-muted">Simulate the activation of your professional pro-grade editor sequence.</p>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="cursor-pointer text-text-muted hover:text-white text-lg font-bold p-1 leading-none bg-white/5 rounded"
              >
                ×
              </button>
            </div>

            {!paymentDone ? (
              <form onSubmit={handlePurchase} className="space-y-4">
                
                {/* Email address */}
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-text-muted">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@storyteller.com"
                    value={checkoutEmail}
                    onChange={(e) => setCheckoutEmail(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 text-white p-3 rounded text-sm focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition"
                  />
                </div>

                {/* Simulated credit card entry */}
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-text-muted">Card Details</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="4111 •••• •••• ••••"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 text-white p-3 pl-10 rounded text-sm focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition font-mono"
                    />
                    <CreditCard className="w-4 h-4 text-text-muted absolute left-3 top-3.5" />
                  </div>
                </div>

                {/* Simulated metrics invoice */}
                <div className="bg-black/40 border border-white/5 p-3 rounded space-y-1.5 text-xs font-mono text-text-muted">
                  <div className="flex justify-between">
                    <span>Standard License (Qty {seats}):</span>
                    <span className="text-white">${priceBeforeDiscount.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Volume Discount ({Math.round(discount * 100)}%):</span>
                      <span>-${(priceBeforeDiscount * discount).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="w-full h-[1px] bg-white/10 my-1"></div>
                  <div className="flex justify-between text-white font-bold text-sm pt-0.5">
                    <span>Total Due:</span>
                    <span className="text-brand-purple-light">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  type="submit"
                  disabled={isPaying}
                  className="cursor-pointer w-full py-3.5 rounded-lg text-xs font-bold bg-brand-purple hover:bg-brand-purple-hover text-white transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  {isPaying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Encrypting & Authorizing...
                    </>
                  ) : (
                    <>Authorize Payment & Install</>
                  )}
                </button>

                <p className="text-[9px] text-text-muted text-center pt-1 font-mono">
                  This checkout is a simulation. No real funds are transferred.
                </p>

              </form>
            ) : (
              <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">License Generated Successfully!</h4>
                  <p className="text-xs text-text-muted">Your activation code is registered under <span className="text-white font-mono">{checkoutEmail}</span>.</p>
                </div>

                <div className="bg-black/60 border border-white/10 rounded-lg p-3.5 font-mono text-sm text-brand-purple-light font-bold flex items-center justify-center gap-2 select-all">
                  <Key className="w-4 h-4 text-brand-purple-light" />
                  <span>{generatedKey}</span>
                </div>

                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="cursor-pointer bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg text-xs font-bold px-5 py-2 transition"
                >
                  Return to Dashboard
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
