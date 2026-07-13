import { KeyboardEvent, useState } from "react";
import {
  Check,
  ChevronRight,
  Cpu,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Star,
  Zap,
} from "lucide-react";
import { EXTENSIONS_DATA } from "../data";
import { Extension } from "../types";

interface ExtensionsShowcaseProps {
  onOpenFlowCut: () => void;
  onAddToCart: (extension: Extension) => void;
  onOpenPlans?: () => void;
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

const licenseTiers = [
  { id: "single", name: "1 Seat", label: "Single-Seat License", price: 14.99 },
  { id: "team", name: "5 Seats", label: "5-Seat License", price: 44.97 },
  { id: "studio", name: "Studio", label: "Studio License", price: 149.90 },
] as const;

type LicenseTierId = typeof licenseTiers[number]["id"];

export default function ExtensionsShowcase({ onOpenFlowCut, onAddToCart, onOpenPlans }: ExtensionsShowcaseProps) {
  const flowCut = EXTENSIONS_DATA[0];
  const [selectedTierId, setSelectedTierId] = useState<LicenseTierId>("single");
  const [selectedProduct, setSelectedProduct] = useState<Extension | null>(null);
  const selectedTier = licenseTiers.find((tier) => tier.id === selectedTierId) ?? licenseTiers[0];
  const selectedOffer: Extension = {
    ...flowCut,
    id: `${flowCut.id}-${selectedTier.id}`,
    licenseLabel: selectedTier.label,
    price: selectedTier.price,
  };

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
    <div className="animate-fade-in bg-canvas text-ink">
      {/* Hero */}
      <section className="mx-auto grid max-w-[980px] gap-12 px-6 pb-14 pt-16 lg:grid-cols-12 lg:items-center lg:pb-20 lg:pt-20">
        <div className="space-y-6 lg:col-span-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-parchment px-3 py-1 text-[12px] font-semibold tracking-[-0.12px] text-ink-80">
            High-End Creative Host Extensions
          </span>
          <h1 className="max-w-xl font-sans text-[40px] font-semibold leading-[1.07] tracking-[-0.28px] text-ink sm:text-[48px]">
            Professional workflow tools for video editors.
          </h1>
          <p className="max-w-lg text-[19px] leading-[1.4] tracking-[-0.011em] text-ink-48">
            High-performance extensions designed to save you time, automate repetitive tasks, and keep your creative flow fast and uninterrupted.
          </p>
          {onOpenPlans && (
            <div className="flex flex-wrap gap-3 pt-1">
              <button onClick={onOpenPlans} className="btn-pill">View Plans</button>
              <button onClick={onOpenFlowCut} className="btn-pill-ghost">Explore FlowCut</button>
            </div>
          )}
          <div className="grid max-w-lg gap-5 pt-2 sm:grid-cols-3">
            {[
              { icon: Zap, title: "Built for Speed", copy: "Zero-latency native performance." },
              { icon: Cpu, title: "Local Processing", copy: "Your media stays on device." },
              { icon: Shield, title: "Secure & Private", copy: "No media cloud uploads." },
            ].map(({ icon: Icon, title, copy }) => (
              <div key={title} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-action" />
                  <h2 className="text-[14px] font-semibold text-ink">{title}</h2>
                </div>
                <p className="text-[13px] leading-snug text-ink-48">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="product-shadow overflow-hidden rounded-[18px] bg-black p-3">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-2 pb-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              <span className="ml-2 text-[10px] text-white/50">FlowCut</span>
            </div>
            <img
              src="./assets/flowcut-ui-showcase.jpg"
              alt="FlowCut silence-removal timeline interface"
              className="mt-3 aspect-[1.62/1] w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section id="featured-extension-section" className="bg-parchment">
        <div className="mx-auto max-w-[980px] px-6 py-16">
          <p className="mb-6 text-[14px] font-semibold tracking-[-0.224px] text-action">
            Featured Extension
          </p>
          <article
            role="link"
            tabIndex={0}
            onClick={onOpenFlowCut}
            onKeyDown={openFlowCutFromCard}
            aria-label="Open FlowCut product page"
            className="store-card grid cursor-pointer gap-8 p-5 outline-none focus-visible:ring-2 focus-visible:ring-action lg:grid-cols-12 lg:p-8"
          >
            <div className="lg:col-span-6">
              <div className="product-shadow relative overflow-hidden rounded-[18px] bg-black">
                <img
                  src={flowCut.thumbnailUrl}
                  alt="FlowCut application interface showing silence cuts"
                  className="aspect-[1.62/1] w-full object-cover"
                />
                <span className="absolute bottom-4 left-4 rounded-full bg-action px-3 py-1.5 text-[12px] font-semibold text-white">
                  V{flowCut.version}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-6 lg:col-span-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[14px]">
                  <Star className="h-4 w-4 fill-action text-action" />
                  <span className="font-semibold text-ink">{flowCut.rating}</span>
                  <span className="text-ink-48">({flowCut.reviewsCount} editors verified)</span>
                </div>
                <h2 className="font-sans text-[40px] font-semibold tracking-[-0.28px] text-ink">{flowCut.name}</h2>
                <p className="max-w-xl text-[17px] leading-[1.47] tracking-[-0.374px] text-ink-48">
                  {flowCut.tagline}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <span className="text-[12px] font-semibold uppercase text-ink-48">Compatible Hosts:</span>
                  <span className="rounded-full bg-action/10 px-3 py-1 text-[12px] font-semibold text-action">
                    Final Cut Pro
                  </span>
                </div>
              </div>

              <div className="relative z-10 border-t border-hairline pt-6" onClick={(event) => event.stopPropagation()}>
                <div className="mb-6 grid grid-cols-3 gap-2">
                  {licenseTiers.map((tier) => {
                    const isSelected = tier.id === selectedTierId;
                    return (
                    <button
                      type="button"
                      key={tier.id}
                      onClick={() => setSelectedTierId(tier.id)}
                      aria-pressed={isSelected}
                      aria-label={`Select ${tier.label} for $${tier.price.toFixed(2)}`}
                      className={`rounded-[11px] border px-2 py-3 text-center transition ${
                        isSelected
                          ? "border-action bg-action/5 text-ink"
                          : "border-hairline text-ink-48 hover:border-ink/30 hover:text-ink"
                      }`}
                    >
                      <span className="block text-[11px] font-semibold uppercase">{tier.name}</span>
                      <span className="mt-1 block text-[15px] font-semibold text-ink">${tier.price.toFixed(2)}</span>
                    </button>
                    );
                  })}
                </div>
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                  <div>
                    <span className="block text-[12px] font-semibold uppercase tracking-widest text-ink-48">
                      {selectedTier.label}
                    </span>
                    <span className="mt-1 block font-sans text-[34px] font-semibold tracking-[-0.374px] text-ink">${selectedTier.price.toFixed(2)}</span>
                    <span className="mt-2 inline-block rounded-full bg-action/10 px-2.5 py-1 text-[11px] font-semibold uppercase text-action">
                      On sale for a limited time
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(selectedOffer)}
                      aria-label="Open FlowCut specifications"
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-hairline text-ink transition hover:bg-parchment"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onAddToCart(selectedOffer)}
                      className="btn-pill"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Get License
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* More extensions */}
      <section className="mx-auto max-w-[980px] px-6 py-20">
        <div className="mb-8 flex items-center gap-3">
          <h2 className="font-sans text-[34px] font-semibold tracking-[-0.374px] text-ink">More Extensions</h2>
          <span className="rounded-full bg-action/10 px-2.5 py-1 text-[11px] font-semibold uppercase text-action">
            Coming Soon
          </span>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {comingSoonExtensions.map((extension) => (
            <article key={extension.id} className="store-card flex flex-col overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <img src={extension.image} alt={extension.name} className="h-full w-full object-cover" />
                <span className="absolute right-3 top-3 rounded-full bg-action px-2.5 py-1 text-[10px] font-semibold text-white">
                  {extension.version}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-[12px] font-semibold uppercase text-action">{extension.category}</span>
                <h3 className="font-sans text-[19px] font-semibold tracking-[-0.374px] text-ink">{extension.name}</h3>
                <p className="flex-1 text-[14px] leading-relaxed text-ink-48">{extension.description}</p>
                <div className="flex flex-wrap gap-1.5 border-t border-divider pt-4">
                  {extension.hosts.map((host) => (
                    <span key={host} className="rounded-full bg-parchment px-2.5 py-1 text-[11px] text-ink-48">
                      {host}
                    </span>
                  ))}
                </div>
                <span className="mt-2 rounded-full border border-hairline px-3 py-2 text-center text-[11px] font-semibold uppercase text-ink-48">
                  Currently not available for purchase
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Specs modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="w-full max-w-xl rounded-[18px] border border-hairline bg-canvas p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-sans text-[21px] font-semibold tracking-[-0.374px] text-ink">FlowCut Pro Specs &amp; Requirements</h2>
                <p className="mt-1 text-[13px] text-ink-48">
                  Standard Verification Handshake: Complies with GDPR Art. 5 Data Integrity
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="rounded-full border border-hairline bg-white px-3 py-2 text-[14px] text-ink-48 transition hover:text-ink"
              >
                Close
              </button>
            </div>

            <div className="mt-6 space-y-4 text-[14px]">
              <div className="rounded-[11px] border border-hairline bg-parchment p-4">
                <h3 className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase text-action">
                  <Cpu className="h-4 w-4" /> Required Workspace Hardware Profile
                </h3>
                {[
                  ["Processor Family:", selectedProduct.specs.processor],
                  ["RAM Boundary:", selectedProduct.specs.ram],
                  ["Accelerator / GPU VRAM:", selectedProduct.specs.gpu],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-col justify-between gap-2 border-b border-hairline py-2 last:border-0 sm:flex-row">
                    <span className="text-ink-48">{label}</span>
                    <span className="font-medium text-ink">{value}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-[11px] border border-hairline bg-parchment p-4">
                <h3 className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase text-action">
                  <ShieldCheck className="h-4 w-4" /> Compliance &amp; Privacy Guarantee
                </h3>
                <ul className="space-y-2 text-[13px] text-ink-48">
                  {selectedProduct.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-action" />
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
                className="rounded-full border border-hairline px-4 py-2 text-[14px] font-medium text-ink transition hover:bg-parchment"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedProduct(null);
                  onAddToCart(selectedProduct);
                }}
                className="btn-pill !text-[14px]"
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
