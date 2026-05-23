import { useState } from "react";
import {
  Check,
  ShoppingCart,
  Star,
  Cpu,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import { EXTENSIONS_DATA } from "../data";
import { Extension } from "../types";

interface ExtensionsShowcaseProps {
  onOpenFlowCut: () => void;
}

export default function ExtensionsShowcase({ onOpenFlowCut }: ExtensionsShowcaseProps) {
  const [selectedProduct, setSelectedProduct] = useState<Extension | null>(null);

  return (
    <div className="animate-fade-in bg-brand-bg px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">

        {/* Marketplace Hero Header */}
        <div className="mb-12 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary-light">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span>High-End Creative Host Extensions</span>
          </div>
          <h1 className="mt-4 font-sora text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Workspace Extension Marketplace
          </h1>
          <p className="mt-3 max-w-2xl text-base text-brand-text-muted">
            Engineered exclusively for video production professionals, editors, and motion designers. Integrate ultra-performant utilities directly into your workspace.
          </p>
        </div>

        {/* Extensions List Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {EXTENSIONS_DATA.map((ext) => {
            const isFlowCut = ext.id === "flowcut-pro";
            const unavailable = !isFlowCut;

            return (
              <div
                key={ext.id}
                id={`extension-card-${ext.id}`}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border border-brand-border bg-brand-surface/40 p-1 transition-all duration-300 hover:border-brand-primary/40 hover:bg-brand-surface-card/45 hover:shadow-2xl hover:shadow-brand-primary/5 ${
                  isFlowCut ? "cursor-pointer" : ""
                }`}
              >
                {isFlowCut && (
                  <button
                    type="button"
                    onClick={onOpenFlowCut}
                    aria-label="Open FlowCut Pro page"
                    className="absolute inset-0 z-10 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                  />
                )}

                {unavailable && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/65 px-6 text-center backdrop-blur-[2px]">
                    <span className="rounded border border-brand-primary/40 bg-brand-bg/95 px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-brand-primary-light">
                      Currently not available for purchase
                    </span>
                  </div>
                )}

                {/* Top-down shimmer edge highlight */}
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                {/* Thumbnail Layer */}
                <div className="relative h-48 w-full overflow-hidden rounded-lg bg-black/45">
                  <img
                    src={ext.thumbnailUrl}
                    alt={ext.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-95"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 flex justify-between items-end">
                    <span className="rounded bg-brand-bg/90 border border-brand-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-brand-secondary">
                      {ext.category}
                    </span>
                    <span className="font-mono text-xs font-bold text-white uppercase tracking-wider bg-brand-primary px-2.5 py-1 rounded">
                      v{ext.version}
                    </span>
                  </div>
                </div>

                {/* Body Content Description */}
                <div className="flex-1 p-5">

                  {/* Rating or Metadata header */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center text-brand-tertiary">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span className="ml-1 font-mono text-xs font-semibold text-brand-text">
                        {ext.rating}
                      </span>
                    </div>
                    <span className="text-xs text-brand-text-muted">•</span>
                    <span className="font-mono text-[11px] text-brand-text-muted">
                      ({ext.reviewsCount} editors verified)
                    </span>
                  </div>

                  <h3 className="font-sora text-xl font-bold tracking-tight text-white group-hover:text-brand-primary-light">
                    {ext.name}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-brand-text-muted min-h-[40px]">
                    {ext.tagline}
                  </p>

                  {/* Systems Compatibility logos */}
                  <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-brand-border pt-4">
                    <span className="text-[10px] font-mono text-[#9c93a8] uppercase tracking-wider mr-1">
                      Compatible Hosts:
                    </span>
                    {ext.hosts.map((host, idx) => (
                      <span
                        key={idx}
                        className="rounded bg-brand-surface-bright/20 border border-brand-border px-2 py-0.5 font-sans text-[10px] text-white font-medium"
                      >
                        {host}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Interactive Footer Row */}
                <div className="relative z-20 border-t border-brand-border bg-black/15 p-5 flex items-center justify-between rounded-b-xl">
                  <div>
                    <span className="font-mono text-[10px] text-[#9c93a8] uppercase tracking-wider block">
                      Single-Seat Seat Licenses
                    </span>
                    <span className="font-sora text-2xl font-black text-white">
                      ${ext.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => isFlowCut && setSelectedProduct(ext)}
                      disabled={unavailable}
                      className="rounded border border-brand-border bg-brand-surface/40 p-2 text-brand-text transition-all duration-200 hover:border-brand-primary hover:bg-brand-surface hover:text-white"
                      title="Inspect Specifications"
                    >
                      <Terminal className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => isFlowCut && onOpenFlowCut()}
                      disabled={unavailable}
                      className="inline-flex items-center gap-2 rounded bg-brand-primary px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-brand-primary/10 transition-all duration-200 hover:bg-brand-primary/90 hover:shadow-brand-primary/20"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" /> Get License
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Modal Overlay / Specs inspector */}
        {selectedProduct && (
          <div id="product-spec-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-brand-border bg-brand-surface-card p-6 shadow-2xl">

              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-sora text-xl font-bold text-white">
                    {selectedProduct.name} Specs & Requirements
                  </h3>
                  <p className="text-xs text-brand-secondary">
                    Standard Verification Handshake: Complies with GDPR Art. 5 Data Integrity
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="rounded-lg border border-brand-border bg-brand-surface p-1.5 text-brand-text-muted hover:text-white"
                >
                  Close
                </button>
              </div>

              {/* Hardware specifications list */}
              <div className="space-y-4 text-sm mt-2">
                <div className="rounded-lg bg-brand-bg/60 border border-brand-border p-4">
                  <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand-primary-light mb-3">
                    <Cpu className="h-4 w-4" /> Required Workspace Hardware Profile
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between border-b border-brand-border pb-1.5">
                      <span className="text-brand-text-muted">Processor Family:</span>
                      <span className="text-white font-medium">{selectedProduct.specs.processor}</span>
                    </div>
                    <div className="flex justify-between border-b border-brand-border pb-1.5">
                      <span className="text-brand-text-muted">RAM Boundary:</span>
                      <span className="text-white font-medium">{selectedProduct.specs.ram}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-text-muted">Accelerator / GPU VRAM:</span>
                      <span className="text-white font-medium">{selectedProduct.specs.gpu}</span>
                    </div>
                  </div>
                </div>

                {/* Telemetry disclosure warning */}
                <div className="rounded-lg bg-[#221e28]/25 border border-brand-border/80 p-4">
                  <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand-secondary mb-3">
                    <ShieldCheck className="h-4 w-4" /> Compliance & Privacy Guarantee
                  </h4>
                  <ul className="space-y-2 text-xs text-brand-text-muted">
                    {selectedProduct.features.map((feat, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <Check className="h-3.5 w-3.5 text-brand-secondary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="rounded border border-brand-border px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-brand-text hover:bg-brand-surface"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    onOpenFlowCut();
                  }}
                  className="rounded bg-brand-primary px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/95"
                >
                  Get License
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
