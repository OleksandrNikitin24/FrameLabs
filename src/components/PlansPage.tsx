import { useState, type ReactNode } from "react";
import {
  Check,
  Lock,
  Crosshair,
  Sparkles,
  ShoppingCart,
  User,
} from "lucide-react";

// Brand icons (vector recreations of the FrameLabs app icons)
function HubIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="48" height="48" rx="11" fill="#0d0d0d" />
      <g fill="none" stroke="#f4f1ea" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 18 V11 H18" />
        <path d="M30 11 H37 V18" />
        <path d="M11 30 V37 H18" />
        <path d="M30 37 H37 V30" />
      </g>
      <rect x="20.5" y="16.5" width="3" height="15" rx="1" fill="#f4f1ea" />
      <rect x="20.5" y="16.5" width="9.5" height="3" rx="1" fill="#f4f1ea" />
      <rect x="20.5" y="22.7" width="7.5" height="3" rx="1" fill="#e8502a" />
    </svg>
  );
}

function FlowCutIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="fc-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14141f" />
          <stop offset="1" stopColor="#09090f" />
        </linearGradient>
        <linearGradient id="fc-neon" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#39c6ff" />
          <stop offset="1" stopColor="#c86bff" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="11" fill="url(#fc-bg)" />
      <rect x="0.7" y="0.7" width="46.6" height="46.6" rx="10.3" fill="none" stroke="url(#fc-neon)" strokeOpacity="0.55" strokeWidth="1.2" />
      <circle cx="24" cy="21" r="8.4" fill="none" stroke="url(#fc-neon)" strokeWidth="2" />
      <path d="M20 17.4 L24 21 L20 24.6 Z" fill="#7fd8ff" />
      <path d="M24 17.4 L28 21 L24 24.6 Z" fill="#c9a3ff" />
      <path d="M8 37 L11 33 L13 40 L15 34 L17 37" fill="none" stroke="#39c6ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 37 L31 37" stroke="#5a5a6e" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M31 37 L33 34 L35 40 L37 33 L40 37" fill="none" stroke="#c86bff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
import { AppTab } from "../portal/types";
import { PortalFooter } from "./PortalFooter";

interface PlansPageProps {
  onNavigate: (page: AppTab) => void;
  onOpenFlowCut: () => void;
  onOpenContact: () => void;
  onOpenAccount: () => void;
  onOpenDocumentation: () => void;
  onCartOpen?: () => void;
}

type PlanTab = "individuals" | "business" | "students" | "schools";
type Category = "All" | "Timeline" | "Tracking" | "VFX" | "Bundles";

const TABS: { id: PlanTab; label: string }[] = [
  { id: "individuals", label: "Individuals" },
  { id: "business", label: "Business" },
  { id: "students", label: "Students & Teachers" },
  { id: "schools", label: "Schools & Universities" },
];

const CATEGORIES: Category[] = ["All", "Timeline", "Tracking", "VFX", "Bundles"];

interface AppPlan {
  id: string;
  name: string;
  category: Category;
  tagline: string;
  price: number;
  iconEl: ReactNode;
}

const APPS: AppPlan[] = [
  {
    id: "flowcut",
    name: "FlowCut",
    category: "Timeline",
    tagline: "Automatically detect and cut dead air, so you can focus on the story. Built for Final Cut Pro.",
    price: 99,
    iconEl: <img src="/assets/flowcut-icon.png" alt="FlowCut" className="h-12 w-12 rounded-[11px]" />,
  },
  {
    id: "precision-tracker",
    name: "Precision Tracker 3D",
    category: "Tracking",
    tagline: "Sub-pixel geometric solver with camera lens nodal-point matching for After Effects and DaVinci Resolve.",
    price: 89,
    iconEl: (
      <div className="flex h-12 w-12 items-center justify-center rounded-[11px] bg-[#1d1d1f]">
        <Crosshair className="h-6 w-6 text-white" />
      </div>
    ),
  },
  {
    id: "chrono-glitch",
    name: "ChronoGlitch VFX",
    category: "VFX",
    tagline: "Ultra-precise analog tape-noise synthesizer and signal-decay simulator across every major NLE.",
    price: 49,
    iconEl: (
      <div className="flex h-12 w-12 items-center justify-center rounded-[11px] bg-[#6e6e73]">
        <Sparkles className="h-6 w-6 text-white" />
      </div>
    ),
  },
];

const HUB_PRO_MONTHLY = 9.99;
const BUSINESS_HUB_PLANS = [
  { seats: "5 Seats", monthly: 49.99, yearly: 480 },
  { seats: "10 Seats", monthly: 45.99, yearly: 550 },
];

// Per-tab pricing + button behaviour
function tabConfig(tab: PlanTab) {
  switch (tab) {
    case "business":
      return {
        subtitle: "Business subscriptions are available through FrameLabs Hub Pro for 5-seat and 10-seat workspaces.",
        priceLabel: () => "Hub Pro",
        priceNote: "Business subscription pricing shown above",
        transform: (p: number) => p,
        primary: "Subscribe",
        secondary: "Contact sales",
        bundleSave: 0,
      };
    case "students":
      return {
        subtitle: "Student licenses receive 50% off every available FrameLabs price.",
        priceLabel: (p: number) => `€${(p * 0.5).toFixed(2)}`,
        priceNote: "Student license: 50% off",
        transform: (p: number) => p * 0.5,
        primary: "Buy now",
        secondary: "Verify eligibility",
        bundleSave: 0,
      };
    case "schools":
      return {
        subtitle: "Volume plans for classrooms, labs, and institutions.",
        priceLabel: () => "Custom",
        priceNote: "Volume pricing by quote",
        transform: (p: number) => p,
        primary: "Request a quote",
        secondary: "",
        bundleSave: 0,
      };
    case "individuals":
    default:
      return {
        subtitle: "Individual FlowCut license: one-time purchase, 2 Macs, lifetime ownership, and 2 year updates.",
        priceLabel: (p: number) => `€${p.toFixed(2)}`,
        priceNote: "Individual license: 2 Macs, lifetime ownership, 2 year updates",
        transform: (p: number) => p,
        primary: "Buy now",
        secondary: "Try now",
        bundleSave: 0,
      };
  }
}

export function PlansPage({
  onNavigate,
  onOpenFlowCut,
  onOpenContact,
  onOpenAccount,
  onOpenDocumentation,
  onCartOpen,
}: PlansPageProps) {
  const [tab, setTab] = useState<PlanTab>("individuals");
  const [category, setCategory] = useState<Category>("All");
  const cfg = tabConfig(tab);

  const goHome = () => onNavigate("extensions");
  const visibleApps = APPS.filter((a) => category === "All" || a.category === category);
  const showBundle = category === "All" || category === "Bundles";

  return (
    <div className="flex min-h-screen flex-col bg-canvas font-body text-ink selection:bg-action/20">
      {/* Global nav */}
      <header className="sticky top-0 z-40">
        <div className="bg-void text-white">
          <div className="mx-auto flex h-11 max-w-[1120px] items-center justify-between px-6">
            <button onClick={goHome} className="cursor-pointer font-sans text-[15px] font-semibold tracking-tight text-white" aria-label="Go to FrameLabs home">
              FrameLabs
            </button>
            <div className="flex items-center gap-5">
              <button onClick={goHome} className="cursor-pointer text-[12px] tracking-[-0.12px] text-white/80 transition hover:text-white">Extensions</button>
              {onCartOpen && (
                <button onClick={onCartOpen} className="cursor-pointer text-white/80 transition hover:text-white" aria-label="Cart"><ShoppingCart className="h-[18px] w-[18px]" /></button>
              )}
              <button onClick={onOpenAccount} className="cursor-pointer text-white/80 transition hover:text-white" aria-label="My account"><User className="h-[18px] w-[18px]" /></button>
            </div>
          </div>
        </div>
        <div className="frost border-b border-black/5">
          <div className="mx-auto flex h-[52px] max-w-[1120px] items-center justify-between px-6">
            <span className="font-sans text-[21px] font-semibold tracking-[0.231px] text-ink">Plans</span>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-[1120px] px-6 pt-14 text-center">
          <h1 className="mx-auto max-w-3xl font-sans text-[40px] font-semibold leading-[1.07] tracking-[-0.28px] text-ink sm:text-[48px]">
            Plans and pricing for FrameLabs extensions and more.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[19px] leading-[1.4] tracking-[-0.011em] text-ink-48">
            {cfg.subtitle}
          </p>

          {/* Tabs (segmented) */}
          <div className="mt-8 flex justify-center">
            <div className="flex w-full max-w-3xl flex-wrap justify-center gap-1 rounded-full border border-hairline bg-white p-1">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex-1 whitespace-nowrap rounded-full px-4 py-2.5 text-[14px] font-medium tracking-[-0.224px] transition ${
                    tab === t.id ? "bg-ink text-white" : "text-ink-48 hover:text-ink"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Hub Pro banner */}
        {showBundle && (
          <section className="mx-auto mt-10 max-w-[1120px] px-6">
            <div className="store-card overflow-hidden">
              <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <div className="mb-4 flex items-center gap-3">
                    <img src="/assets/framelabs-hub-icon.png" alt="The Frame Labs Hub Pro" className="h-12 w-12 rounded-[11px]" />
                    <span className="rounded-full bg-action/10 px-3 py-1 text-[12px] font-semibold text-action">
                      Subscription
                    </span>
                  </div>
                  <h2 className="font-sans text-[28px] font-semibold tracking-[-0.374px] text-ink sm:text-[34px]">
                    FrameLabs Hub Pro
                  </h2>
                  <p className="mt-2 max-w-2xl text-[17px] leading-[1.47] tracking-[-0.374px] text-ink-48">
                    {tab === "business"
                      ? "Business subscriptions for shared FrameLabs Hub Pro workspaces."
                      : tab === "students"
                        ? "Student licenses receive 50% off FrameLabs Hub Pro and all available individual pricing."
                        : "Subscription access through FrameLabs Hub Pro for users who prefer monthly access instead of a one-time FlowCut purchase."}
                  </p>
                  {tab === "business" ? (
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {BUSINESS_HUB_PLANS.map((plan) => (
                        <div key={plan.seats} className="rounded-[14px] border border-hairline bg-parchment p-4">
                          <span className="block text-[12px] font-semibold uppercase tracking-wider text-ink-48">{plan.seats}</span>
                          <span className="mt-1 block font-sans text-[28px] font-semibold tracking-[-0.28px] text-ink">
                            €{plan.monthly.toFixed(2)}/month
                          </span>
                          <span className="mt-1 block text-[13px] text-ink-48">or €{plan.yearly.toFixed(2)}/year</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-5 flex flex-wrap items-baseline gap-2">
                      <span className="font-sans text-[34px] font-semibold tracking-[-0.28px] text-ink">
                        €{(tab === "students" ? HUB_PRO_MONTHLY * 0.5 : HUB_PRO_MONTHLY).toFixed(2)}
                      </span>
                      <span className="text-[14px] text-ink-48">per month</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
                  <button onClick={onCartOpen ?? onOpenFlowCut} className="btn-pill w-full justify-center lg:w-auto lg:px-10">
                    Subscribe
                  </button>
                  <button onClick={onOpenDocumentation} className="btn-pill-ghost w-full justify-center lg:w-auto lg:px-10">
                    Learn more
                  </button>
                  <span className="flex items-center gap-1.5 text-[12px] text-ink-48">
                    <Lock className="h-3.5 w-3.5" /> Secure transaction
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Catalog: sidebar + grid */}
        <section className="mx-auto mt-10 grid max-w-[1120px] gap-8 px-6 pb-20 lg:grid-cols-12">
          {/* Categories */}
          <aside className="lg:col-span-3">
            <span className="mb-3 block text-[12px] font-semibold uppercase tracking-wider text-ink-48">Categories</span>
            <div className="flex flex-wrap gap-2 lg:flex-col">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-[11px] px-3 py-2 text-left text-[15px] transition ${
                    category === c ? "bg-parchment font-semibold text-ink" : "text-ink-48 hover:bg-parchment hover:text-ink"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </aside>

          {/* Grid */}
          <div className="lg:col-span-9">
            <p className="mb-5 text-[14px] text-ink-48">
              {visibleApps.length + (showBundle ? 1 : 0)} results in <span className="font-semibold text-ink">{category}</span>
            </p>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {visibleApps.map((app) => {
                const displayPrice = cfg.priceLabel(app.price);
                return (
                  <article key={app.id} className="store-card flex flex-col p-6">
                    <div className="mb-4">{app.iconEl}</div>
                    <h3 className="font-sans text-[19px] font-semibold tracking-[-0.374px] text-ink">{app.name}</h3>
                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="font-sans text-[24px] font-semibold tracking-[-0.28px] text-ink">{displayPrice}</span>
                    </div>
                    <p className="mt-0.5 text-[13px] text-ink-48">{cfg.priceNote}</p>
                    <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ink-48">{app.tagline}</p>

                    <div className="mt-5 flex items-center gap-2 border-t border-divider pt-4">
                      <span className="flex flex-1 items-center gap-1.5 text-[12px] text-ink-48">
                        <Lock className="h-3.5 w-3.5" /> Secure transaction
                      </span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      {cfg.secondary && (
                        <button
                          onClick={app.id === "flowcut" ? onOpenFlowCut : (onCartOpen ?? onOpenFlowCut)}
                          className="btn-pill-ghost flex-1 justify-center !py-2.5 !text-[15px]"
                        >
                          {cfg.secondary}
                        </button>
                      )}
                      <button
                        onClick={onCartOpen ?? onOpenFlowCut}
                        className="btn-pill flex-1 justify-center !py-2.5 !text-[15px]"
                      >
                        {cfg.primary}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {visibleApps.length === 0 && !showBundle && (
              <div className="rounded-[18px] border border-hairline bg-parchment p-10 text-center text-[15px] text-ink-48">
                No extensions in this category yet.
              </div>
            )}

            {/* Reassurance row */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["14-day refund", "Cancel within 14 days for a full refund."],
                ["Local & private", "Processing runs on your device — no cloud uploads."],
                ["Individual ownership", "FlowCut includes lifetime ownership with 2 year updates."],
              ].map(([t, d]) => (
                <div key={t} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-action" />
                  <div>
                    <span className="block text-[14px] font-semibold text-ink">{t}</span>
                    <span className="text-[13px] text-ink-48">{d}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <PortalFooter
        onNavigate={onNavigate}
        onOpenFlowCut={onOpenFlowCut}
        onOpenContact={onOpenContact}
        onOpenDocumentation={onOpenDocumentation}
      />
    </div>
  );
}
