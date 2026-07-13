import { FormEvent, useEffect, useState } from "react";
import { Check, CheckCircle, CreditCard, Key, ShieldCheck } from "lucide-react";

type PlanId = "individual" | "hub-pro";

const plans = [
  {
    id: "individual" as const,
    eyebrow: "One Time Purchase",
    name: "FlowCut",
    price: 99,
    priceLabel: "€99",
    cadence: "one-time",
    description: "Individual license for Final Cut Pro editors who want lifetime ownership.",
    highlights: ["2 Macs", "Lifetime ownership", "2 year updates", "Loved by Final Cut users"],
    cta: "Buy FlowCut",
  },
  {
    id: "hub-pro" as const,
    eyebrow: "Subscription",
    name: "FrameLabs Hub Pro",
    price: 9.99,
    priceLabel: "€9.99",
    cadence: "per month",
    description: "Monthly FrameLabs Hub Pro access for users who prefer a subscription model.",
    highlights: ["Monthly billing", "FrameLabs Hub Pro access", "Cancel when needed", "Best for ongoing workspace access"],
    cta: "Subscribe",
  },
];

export function Pricing() {
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>("individual");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [generatedKey, setGeneratedKey] = useState("");

  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId) ?? plans[0];

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
      const randomKey = `FL-${selectedPlan.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
      localStorage.setItem("flowcut_license_key", randomKey);
      setGeneratedKey(randomKey);
      setIsPaying(false);
      setPaymentDone(true);
    }, 1600);
  };

  return (
    <section id="pricing-tier" className="bg-canvas">
      <div className="mx-auto max-w-[980px] px-6 py-24 sm:px-8">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <span className="text-[14px] font-semibold tracking-[-0.224px] text-action">
            Pricing
          </span>
          <h2 className="font-sans text-[40px] font-semibold leading-[1.07] tracking-[-0.28px] text-ink sm:text-[48px]">
            Choose how you want to use FlowCut.
          </h2>
          <p className="mx-auto max-w-xl text-[19px] leading-[1.4] tracking-[-0.011em] text-ink-48">
            FlowCut is available as an individual one-time purchase. FrameLabs Hub Pro is available as a monthly subscription.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 items-stretch gap-6 md:grid-cols-2">
          {plans.map((plan) => {
            const selected = selectedPlanId === plan.id;
            return (
              <article
                key={plan.id}
                className={`store-card flex flex-col justify-between p-8 text-left transition ${
                  selected ? "border-action/60 shadow-[0_18px_48px_rgba(0,113,227,0.12)]" : ""
                }`}
              >
                <div className="space-y-5">
                  <div>
                    <span className="text-[12px] font-semibold uppercase tracking-wider text-action">
                      {plan.eyebrow}
                    </span>
                    <h3 className="mt-1 font-sans text-[28px] font-semibold tracking-[-0.374px] text-ink">
                      {plan.name}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-48">{plan.description}</p>
                  </div>

                  <div>
                    <span className="font-sans text-[48px] font-semibold tracking-[-0.28px] text-ink">{plan.priceLabel}</span>
                    <span className="ml-2 text-[14px] text-ink-48">{plan.cadence}</span>
                  </div>

                  <div className="space-y-2.5 border-t border-divider pt-5">
                    {plan.highlights.map((txt) => (
                      <div key={txt} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-action" />
                        <span className="text-[14px] text-ink-80">{txt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedPlanId(plan.id);
                    setPaymentDone(false);
                    setIsCheckoutOpen(true);
                  }}
                  className={`mt-8 w-full ${selected ? "btn-pill" : "btn-pill-ghost"}`}
                >
                  {plan.cta}
                </button>
              </article>
            );
          })}
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

      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-[18px] border border-hairline bg-canvas p-7 text-left shadow-2xl">
            <div className="mb-4 flex items-start justify-between border-b border-divider pb-3">
              <div>
                <h3 className="font-sans text-[21px] font-semibold tracking-[-0.374px] text-ink">{selectedPlan.name} Checkout</h3>
                <p className="text-[13px] text-ink-48">
                  {selectedPlan.priceLabel} {selectedPlan.cadence}
                </p>
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
                    <span>{selectedPlan.name}</span>
                    <span className="text-ink">{selectedPlan.priceLabel}</span>
                  </div>
                  <div className="my-1 h-px w-full bg-hairline"></div>
                  <div className="flex justify-between pt-0.5 text-[15px] font-semibold text-ink">
                    <span>Total Due:</span>
                    <span className="text-action">{selectedPlan.priceLabel}</span>
                  </div>
                </div>

                <button type="submit" disabled={isPaying} className="btn-pill flex w-full items-center justify-center">
                  {isPaying ? "Encrypting & Authorizing..." : "Authorize Payment"}
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
