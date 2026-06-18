import { useState, useEffect, FormEvent } from "react";
import { Check, ShieldCheck, CreditCard, Sparkles, Key, CheckCircle } from "lucide-react";

export function Pricing() {
  const [seats, setSeats] = useState<number>(1);
  const [billingCycle, setBillingCycle] = useState<"one-time" | "annual">("one-time");

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [generatedKey, setGeneratedKey] = useState("");

  const basePricePerSeat = 14.99;

  let discount = 0;
  if (seats >= 15) discount = 0.30;
  else if (seats >= 8) discount = 0.20;
  else if (seats >= 3) discount = 0.10;

  const priceBeforeDiscount = Number((seats * basePricePerSeat).toFixed(2));
  const totalPrice = Number((priceBeforeDiscount * (1 - discount)).toFixed(2));

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
      const randomKey = `FC30-REMOV-${Math.floor(1000 + Math.random() * 9000)}-SILNC-${Math.floor(1000 + Math.random() * 9000)}`;
      localStorage.setItem("flowcut_license_key", randomKey);
      setGeneratedKey(randomKey);
      setIsPaying(false);
      setPaymentDone(true);
    }, 1800);
  };

  return (
    <section id="pricing-tier" className="bg-canvas">
      <div className="mx-auto max-w-[980px] px-6 py-24 sm:px-8">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <span className="text-[14px] font-semibold tracking-[-0.224px] text-action">
            Get lifetime access
          </span>
          <h2 className="font-sans text-[40px] font-semibold leading-[1.07] tracking-[-0.28px] text-ink sm:text-[48px]">
            Start cutting silence today.
          </h2>
          <p className="mx-auto max-w-xl text-[19px] leading-[1.4] tracking-[-0.011em] text-ink-48">
            Join thousands of professional editors who have reclaimed their time with FlowCut. One-time purchase, lifetime updates.
          </p>
        </div>

        {/* Pricing estimator */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 items-stretch gap-6 md:grid-cols-2">
          <div className="store-card space-y-5 p-8 text-left">
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-wider text-action">
                Flexible Volume Licensing
              </span>
              <h3 className="mt-1 font-sans text-[21px] font-semibold tracking-[-0.374px] text-ink">
                Configure your seats
              </h3>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[14px]">
                <span className="text-ink-48">Number of Editors</span>
                <span className="font-semibold text-ink">{seats} {seats === 1 ? "User Seat" : "User Seats"}</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded bg-hairline accent-action"
              />
              <div className="flex justify-between text-[12px] text-ink-48">
                <span>1 Editor</span>
                <span>30 Editors</span>
              </div>
            </div>

            <div className="min-h-[40px]">
              {discount > 0 ? (
                <div className="flex items-center gap-1.5 rounded-lg bg-action/5 px-3 py-1.5 text-[14px] text-action">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Volumetric discount applied: <strong>{Math.round(discount * 100)}% Off</strong></span>
                </div>
              ) : (
                <p className="text-[13px] leading-relaxed text-ink-48">
                  Add 3 or more seats for automatic volume discounts starting at 10% off. Perfect for agencies and studios.
                </p>
              )}
            </div>

            <div className="space-y-2.5 pt-1.5">
              {[
                "Unlimited video/audio exports",
                "FCP sequence XML connector",
                "Vocal isolation background integration",
                "Lifetime free patches & version upgrades"
              ].map((txt, id) => (
                <div key={id} className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-action" />
                  <span className="text-[14px] text-ink-80">{txt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quote summary */}
          <div className="store-card flex h-full flex-col justify-between p-8 text-center">
            <div className="space-y-2">
              <span className="inline-block rounded-full bg-action/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-action">
                Standard License
              </span>
              <span className="block text-[12px] font-semibold uppercase tracking-wider text-ink-48">
                On sale for a limited time
              </span>
              <div className="pt-2">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-sans text-[48px] font-semibold tracking-[-0.28px] text-ink">${totalPrice.toFixed(2)}</span>
                  <span className="text-[14px] text-ink-48">/forever</span>
                </div>
                {discount > 0 && (
                  <p className="mt-0.5 text-[13px] text-ink-48 line-through">
                    Was ${priceBeforeDiscount.toFixed(2)}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={() => {
                  setPaymentDone(false);
                  setIsCheckoutOpen(true);
                }}
                className="btn-pill w-full"
              >
                Buy FlowCut Now
              </button>
              <span className="block text-[12px] text-ink-48">
                14-day money-back guarantee
              </span>
            </div>
          </div>
        </div>

        {generatedKey && (
          <div className="mx-auto mt-6 flex max-w-lg items-center justify-between rounded-[18px] border border-hairline bg-parchment p-4 text-left">
            <div>
              <span className="block text-[12px] font-semibold uppercase text-action">Active License Registered</span>
              <span className="select-all font-mono text-[15px] font-semibold text-ink">{generatedKey}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[13px] font-semibold text-emerald-600">
              <ShieldCheck className="h-4 w-4" /> Ready
            </div>
          </div>
        )}
      </div>

      {/* Checkout dialog */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-[18px] border border-hairline bg-canvas p-7 text-left shadow-2xl">
            <div className="mb-4 flex items-start justify-between border-b border-divider pb-3">
              <div>
                <h3 className="font-sans text-[21px] font-semibold tracking-[-0.374px] text-ink">FlowCut Secure Checkout</h3>
                <p className="text-[13px] text-ink-48">Simulate the activation of your professional pro-grade editor sequence.</p>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="cursor-pointer rounded-full p-1 text-[20px] leading-none text-ink-48 transition hover:text-ink"
              >
                ×
              </button>
            </div>

            {!paymentDone ? (
              <form onSubmit={handlePurchase} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold uppercase tracking-wider text-ink-48">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@storyteller.com"
                    value={checkoutEmail}
                    onChange={(e) => setCheckoutEmail(e.target.value)}
                    className="w-full rounded-xl border border-hairline bg-white p-3 text-[15px] text-ink transition focus:border-action-focus focus:outline-none focus:ring-2 focus:ring-action/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold uppercase tracking-wider text-ink-48">Card Details</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="4111 •••• •••• ••••"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full rounded-xl border border-hairline bg-white p-3 pl-10 font-mono text-[15px] text-ink transition focus:border-action-focus focus:outline-none focus:ring-2 focus:ring-action/20"
                    />
                    <CreditCard className="absolute left-3 top-3.5 h-4 w-4 text-ink-48" />
                  </div>
                </div>

                <div className="space-y-1.5 rounded-xl border border-divider bg-parchment p-3 text-[14px] text-ink-48">
                  <div className="flex justify-between">
                    <span>Standard License (Qty {seats}):</span>
                    <span className="text-ink">${priceBeforeDiscount.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Volume Discount ({Math.round(discount * 100)}%):</span>
                      <span>-${(priceBeforeDiscount * discount).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="my-1 h-px w-full bg-hairline"></div>
                  <div className="flex justify-between pt-0.5 text-[15px] font-semibold text-ink">
                    <span>Total Due:</span>
                    <span className="text-action">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isPaying}
                  className="btn-pill flex w-full items-center justify-center"
                >
                  {isPaying ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                      Encrypting & Authorizing...
                    </>
                  ) : (
                    <>Authorize Payment & Install</>
                  )}
                </button>

                <p className="pt-1 text-center text-[11px] text-ink-48">
                  This checkout is a simulation. No real funds are transferred.
                </p>
              </form>
            ) : (
              <div className="space-y-4 py-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-sans text-[19px] font-semibold text-ink">License Generated Successfully!</h4>
                  <p className="text-[14px] text-ink-48">Your activation code is registered under <span className="font-mono text-ink">{checkoutEmail}</span>.</p>
                </div>

                <div className="flex select-all items-center justify-center gap-2 rounded-xl border border-hairline bg-parchment p-3.5 font-mono text-[15px] font-semibold text-action">
                  <Key className="h-4 w-4 text-action" />
                  <span>{generatedKey}</span>
                </div>

                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="cursor-pointer rounded-full border border-hairline bg-white px-5 py-2 text-[14px] font-medium text-ink transition hover:bg-parchment"
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
