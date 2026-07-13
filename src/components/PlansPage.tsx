import { useState, type ReactNode } from "react";
import {
  Boxes,
  Check,
  Lock,
  ScissorsLineDashed,
  Crosshair,
  Sparkles,
  ShoppingCart,
  User,
} from "lucide-react";
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
  icon: ReactNode;
  iconBg: string;
}

const APPS: AppPlan[] = [
  {
    id: "flowcut",
    name: "FlowCut",
    category: "Timeline",
    tagline: "Automatically detect and cut dead air, so you can focus on the story. Built for Final Cut Pro.",
    price: 14.99,
    icon: <ScissorsLineDashed className="h-6 w-6 text-white" />,
    iconBg: "bg-action",
  },
  {
    id: "precision-tracker",
    name: "Precision Tracker 3D",
    category: "Tracking",
    tagline: "Sub-pixel geometric solver with camera lens nodal-point matching for After Effects and DaVinci Resolve.",
    price: 89,
    icon: <Crosshair className="h-6 w-6 text-white" />,
    iconBg: "bg-[#1d1d1f]",
  },
  {
    id: "chrono-glitch",
    name: "ChronoGlitch VFX",
    category: "VFX",
    tagline: "Ultra-precise analog tape-noise synthesizer and signal-decay simulator across every major NLE.",
    price: 49,
    icon: <Sparkles className="h-6 w-6 text-white" />,
    iconBg: "bg-[#6e6e73]",
  },
];

const BUNDLE_FULL = 14.99 + 89 + 49; // 152.98

// Per-tab pricing + button behaviour
function tabConfig(tab: PlanTab) {
  switch (tab) {
    case "business":
      return {
        subtitle: "Licenses for teams and organizations, with centralized seat management.",
        priceLabel: (p: number) => `US$${p.toFixed(2)}/seat`,
        priceNote: "Per seat, billed once",
        transform: (p: number) => p,
        primary: "Buy now",
        secondary: "Contact sales",
        bundleSave: 0.5,
      };
    case "students":
      return {
        subtitle: "Save up to 60% with verified student or teacher status.",
        priceLabel: (p: number) => `US$${(p * 0.4).toFixed(2)}`,
        priceNote: "Education price, verification required",
        transform: (p: number) => p * 0.4,
        primary: "Buy now",
        secondary: "Verify eligibility",
        bundleSave: 0.6,
      };
    case "schools":
      return {
        subtitle: "Volume plans for classrooms, labs, and institutions.",
        priceLabel: () => "Custom",
        priceNote: "Volume pricing by quote",
        transform: (p: number) => p,
        primary: "Request a quote",
        secondary: "",
        bundleSave: 0.5,
      };
    case "individuals":
    default:
      return {
        subtitle: "Start with confidence — you can cancel within 14 days for a full refund.",
        priceLabel: (p: number) => `US$${p.toFixed(2)}`,
        priceNote: "One-time purchase, lifetime updates",
        transform: (p: number) => p,
        primary: "Buy now",
        secondary: "Try now",
        bundleSave: 0.5,
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

  const bundleWas = BUNDLE_FULL;
  const bundleNow = BUNDLE_FULL * (1 - cfg.bundleSave);

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
                    <div className="flex h-12 w-12 items-center justify-center rounded-[11px] bg-action">
                      <Boxes className="h-6 w-6 text-white" />
                    </div>
                    <span className="rounded-full bg-action/10 px-3 py-1 text-[12px] font-semibold text-action">
                      Save {Math.round(cfg.bundleSave * 100)}%
                    </span>
                  </div>
                  <h2 className="font-sans text-[28px] font-semibold tracking-[-0.374px] text-ink sm:text-[34px]">
                    The Frame Labs Hub Pro
                  </h2>
                  <p className="mt-2 max-w-2xl text-[17px] leading-[1.47] tracking-[-0.374px] text-ink-48">
                    Every FrameLabs extension in one workspace — FlowCut, Precision Tracker 3D, and ChronoGlitch VFX — plus
                    priority diagnostics, early feature access, and lifetime updates.
                  </p>
                  <div className="mt-5 flex flex-wrap items-baseline gap-2">
                    {tab === "schools" ? (
                      <span className="font-sans text-[34px] font-semibold tracking-[-0.28px] text-ink">Custom</span>
                    ) : (
                      <>
                        <span className="text-[17px] text-ink-48 line-through">US${bundleWas.toFixed(2)}</span>
                        <span className="font-sans text-[34px] font-semibold tracking-[-0.28px] text-ink">US${bundleNow.toFixed(2)}</span>
                        <span className="text-[14px] text-ink-48">{cfg.priceNote}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
                  <button onClick={onCartOpen ?? onOpenFlowCut} className="btn-pill w-full justify-center lg:w-auto lg:px-10">
                    {tab === "schools" ? "Request a quote" : "Buy now"}
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
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-[11px] ${app.iconBg}`}>
                      {app.icon}
                    </div>
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
                ["Lifetime updates", "Every purchase includes free version upgrades."],
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
