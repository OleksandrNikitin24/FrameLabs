import { KeyboardEvent, useState } from "react";
import {
  Check,
  ChevronRight,
  Cpu,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { EXTENSIONS_DATA } from "../data";
import { Extension } from "../types";

interface ExtensionsShowcaseProps {
  onOpenFlowCut: () => void;
  onAddToCart: (extension: Extension) => void;
}

const comingSoonExtensions = [
  {
    id: "precision-track",
    name: "Precision Track",
    category: "Tracking",
    version: "V3.0.2",
    description: "Sub-pixel geometric solver and camera lens nodal point matching overlay.",
    hosts: ["After Effects", "DaVinci Resolve"],
    image: "./assets/precision-track-ui-optimized.jpg",
  },
  {
    id: "clean-vfx",
    name: "CleanVFX",
    category: "VFX",
    version: "V1.0.0",
    description: "Ultra-precise analog tape noise synthesizer and signal decay simulator.",
    hosts: ["Premiere Pro", "Final Cut Pro"],
    image: "./assets/clean-vfx-ui-optimized.jpg",
  },
  {
    id: "auto-caption-pro",
    name: "Auto Caption Pro",
    category: "Captions",
    version: "V1.0.0",
    description: "AI-powered transcription and subtitle generator for any workflow.",
    hosts: ["Final Cut Pro"],
    image: "./assets/auto-caption-ui-optimized.jpg",
  },
];

export default function ExtensionsShowcase({ onOpenFlowCut, onAddToCart }: ExtensionsShowcaseProps) {
  const flowCut = EXTENSIONS_DATA[0];
  const [selectedProduct, setSelectedProduct] = useState<Extension | null>(null);

  const openFlowCutFromCard = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpenFlowCut();
    }
  };

  return (
    <div className="animate-fade-in bg-brand-bg text-white">
      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-14 pt-14 lg:grid-cols-12 lg:items-center lg:pb-20 lg:pt-18">
        <div className="space-y-7 lg:col-span-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/25 bg-brand-primary/10 px-3 py-1 font-mono text-[10px] font-bold uppercase text-brand-primary-light">
            <Sparkles className="h-3.5 w-3.5" />
            High-End Creative Host Extensions
          </span>
          <h1 className="max-w-xl font-sora text-4xl font-semibold leading-[1.08] text-white sm:text-5xl">
            Professional Workflow <span className="text-brand-primary-light">Tools</span> for Video Editors
          </h1>
          <p className="max-w-lg text-sm leading-relaxed text-brand-text-muted sm:text-base">
            High-performance extensions designed to save you time, automate repetitive tasks, and keep your creative flow fast and uninterrupted.
          </p>
          <div className="grid max-w-lg gap-5 pt-2 sm:grid-cols-3">
            {[
              { icon: Zap, title: "Built for Speed", copy: "Zero-latency native performance.", color: "text-brand-primary-light" },
              { icon: Cpu, title: "Local Processing", copy: "Your media stays on device.", color: "text-emerald-400" },
              { icon: Shield, title: "Secure & Private", copy: "No media cloud uploads.", color: "text-brand-secondary" },
            ].map(({ icon: Icon, title, copy, color }) => (
              <div key={title} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${color}`} />
                  <h2 className="text-xs font-semibold">{title}</h2>
                </div>
                <p className="text-[11px] leading-snug text-brand-text-muted">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="marketplace-panel overflow-hidden rounded-xl p-3">
            <div className="flex items-center gap-1.5 border-b border-brand-border px-2 pb-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              <span className="ml-2 font-mono text-[10px] text-brand-text-muted">FlowCut</span>
            </div>
            <img
              src="./assets/flowcut-ui-showcase.jpg"
              alt="FlowCut silence-removal timeline interface"
              className="mt-3 aspect-[1.62/1] w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      <section id="featured-extension-section" className="mx-auto max-w-7xl px-6 pb-16">
        <p className="mb-6 font-mono text-[10px] font-bold uppercase tracking-widest text-brand-primary-light">
          Featured Extension
        </p>
        <article
          role="link"
          tabIndex={0}
          onClick={onOpenFlowCut}
          onKeyDown={openFlowCutFromCard}
          aria-label="Open FlowCut product page"
          className="marketplace-panel-interactive grid cursor-pointer gap-8 rounded-xl p-5 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary lg:grid-cols-12 lg:p-8"
        >
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-xl border border-brand-border bg-black">
              <img
                src={flowCut.thumbnailUrl}
                alt="FlowCut application interface showing silence cuts"
                className="aspect-[1.62/1] w-full object-cover"
              />
              <span className="absolute bottom-4 left-4 rounded bg-brand-primary px-3 py-1.5 font-mono text-xs font-bold uppercase text-white">
                V{flowCut.version}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 lg:col-span-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 fill-brand-tertiary text-brand-tertiary" />
                <span className="font-semibold">{flowCut.rating}</span>
                <span className="text-brand-text-muted">({flowCut.reviewsCount} editors verified)</span>
              </div>
              <h2 className="font-sora text-4xl font-semibold tracking-tight sm:text-5xl">{flowCut.name}</h2>
              <p className="max-w-xl text-sm leading-relaxed text-brand-text-muted sm:text-base">
                {flowCut.tagline}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="font-mono text-[10px] font-bold uppercase text-brand-text-muted">Compatible Hosts:</span>
                <span className="rounded-md border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 font-mono text-xs font-bold text-emerald-400">
                  Final Cut Pro
                </span>
              </div>
            </div>

            <div className="relative z-10 border-t border-brand-border pt-6" onClick={(event) => event.stopPropagation()}>
              <div className="mb-6 grid grid-cols-3 gap-2">
                {[
                  { name: "1 Seat", price: "$14.99", active: true },
                  { name: "5 Seats", price: "$52.46", active: false },
                  { name: "Studio", price: "$149.90", active: false },
                ].map(({ name, price, active }) => (
                  <div
                    key={name}
                    className={`rounded-lg border px-2 py-3 text-center ${
                      active
                        ? "border-brand-primary bg-brand-primary/10 text-white"
                        : "border-brand-border text-brand-text-muted"
                    }`}
                  >
                    <span className="block font-mono text-[10px] font-bold uppercase">{name}</span>
                    <span className="mt-1 block text-sm font-semibold">{price}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-brand-text-muted">
                    Single-Seat License
                  </span>
                  <span className="mt-1 block font-sora text-4xl font-bold">${flowCut.price.toFixed(2)}</span>
                  <span className="mt-2 inline-block rounded border border-brand-tertiary/25 bg-brand-tertiary/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-brand-tertiary">
                    On sale for limited time
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(flowCut)}
                    aria-label="Open FlowCut specifications"
                    className="flex h-14 w-14 items-center justify-center rounded-xl border border-brand-border text-white transition hover:border-brand-primary-light hover:bg-brand-primary/10"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onAddToCart(flowCut)}
                    className="inline-flex h-14 items-center gap-2 rounded-xl bg-brand-primary px-6 font-sora text-sm font-bold uppercase text-white transition hover:bg-brand-purple-hover"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Get License
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 flex items-center gap-3">
          <h2 className="font-sora text-2xl font-semibold text-white sm:text-3xl">More Extensions</h2>
          <span className="rounded bg-brand-primary/10 px-2 py-1 font-mono text-[10px] font-bold uppercase text-brand-primary-light">
            Coming Soon
          </span>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {comingSoonExtensions.map((extension) => (
            <article key={extension.id} className="marketplace-panel flex overflow-hidden rounded-xl flex-col">
              <div className="relative aspect-[4/3] overflow-hidden border-b border-brand-border bg-black">
                <img src={extension.image} alt={extension.name} className="h-full w-full object-cover opacity-85" />
                <span className="absolute right-3 top-3 rounded bg-brand-primary px-2.5 py-1 font-mono text-[10px] font-bold text-white">
                  {extension.version}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="font-mono text-[10px] font-bold uppercase text-brand-secondary">{extension.category}</span>
                <h3 className="font-sora text-lg font-semibold">{extension.name}</h3>
                <p className="flex-1 text-xs leading-relaxed text-brand-text-muted">{extension.description}</p>
                <div className="flex flex-wrap gap-1.5 border-t border-brand-border pt-4">
                  {extension.hosts.map((host) => (
                    <span key={host} className="rounded border border-brand-border bg-white/[0.03] px-2 py-1 text-[10px] text-brand-text-muted">
                      {host}
                    </span>
                  ))}
                </div>
                <span className="mt-2 rounded border border-brand-border px-3 py-2 text-center font-mono text-[10px] font-bold uppercase text-brand-text-muted">
                  Currently not available for purchase
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="w-full max-w-xl rounded-xl border border-brand-border bg-brand-surface-card p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-sora text-xl font-bold">FlowCut Pro Specs &amp; Requirements</h2>
                <p className="mt-1 text-xs text-brand-secondary">
                  Standard Verification Handshake: Complies with GDPR Art. 5 Data Integrity
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="rounded-lg border border-brand-border bg-brand-surface px-3 py-2 text-brand-text-muted transition hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <div className="rounded-lg border border-brand-border bg-brand-bg/60 p-4">
                <h3 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase text-brand-primary-light">
                  <Cpu className="h-4 w-4" /> Required Workspace Hardware Profile
                </h3>
                {[
                  ["Processor Family:", selectedProduct.specs.processor],
                  ["RAM Boundary:", selectedProduct.specs.ram],
                  ["Accelerator / GPU VRAM:", selectedProduct.specs.gpu],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-col justify-between gap-2 border-b border-brand-border py-2 last:border-0 sm:flex-row">
                    <span className="text-brand-text-muted">{label}</span>
                    <span className="font-medium text-white">{value}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-brand-border bg-brand-bg/30 p-4">
                <h3 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase text-brand-secondary">
                  <ShieldCheck className="h-4 w-4" /> Compliance &amp; Privacy Guarantee
                </h3>
                <ul className="space-y-2 text-xs text-brand-text-muted">
                  {selectedProduct.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-secondary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="rounded border border-brand-border px-4 py-2 text-xs font-bold uppercase text-brand-text transition hover:bg-brand-surface"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedProduct(null);
                  onAddToCart(selectedProduct);
                }}
                className="rounded bg-brand-primary px-4 py-2 text-xs font-bold uppercase text-white transition hover:bg-brand-purple-hover"
              >
                Get License
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
