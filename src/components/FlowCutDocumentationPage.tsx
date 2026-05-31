import {
  ArrowRight,
  Check,
  Cpu,
  Download,
  FileInput,
  FileOutput,
  HardDrive,
  Layers,
  Lock,
  Play,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { Navigation } from "./Navigation";
import { PortalFooter } from "./PortalFooter";
import CartDrawer from "../portal/components/CartDrawer";
import { AppTab } from "../portal/types";

interface FlowCutDocumentationPageProps {
  onNavigate: (page: AppTab) => void;
  onOpenFlowCut: () => void;
  onOpenContact: () => void;
  onOpenAccount: () => void;
  onOpenDocumentation: () => void;
  isCartOpen: boolean;
  onCartOpen: () => void;
  onCartClose: () => void;
}

const quickstartSteps = [
  {
    title: "Install FlowCut",
    body: "Download FlowCut, move it to Applications, then open it once so macOS can finish app verification.",
    icon: Download,
  },
  {
    title: "Add your media",
    body: "Drag an audio or video file into the workspace. FlowCut reads the waveform locally on your device.",
    icon: FileInput,
  },
  {
    title: "Choose a preset",
    body: "Start with Natural Podcast, Super Tight, Sigh Killer, or Conservative, then adjust threshold and frame padding if needed.",
    icon: SlidersHorizontal,
  },
  {
    title: "Export to Final Cut Pro",
    body: "Review the highlighted cuts, remove silence, then export the sequence XML for Final Cut Pro.",
    icon: FileOutput,
  },
];

const sections = [
  {
    id: "overview",
    eyebrow: "Overview",
    title: "What FlowCut does",
    body: "FlowCut identifies and cuts out dead air automatically, so interviews, podcasts, and vlogs become tighter before the manual edit starts. The app focuses on local silence detection and Final Cut Pro sequence export.",
    bullets: ["Local media analysis", "Frame-based timing controls", "FCPXML sequence export", "Preset-based silence cleanup"],
    icon: Sparkles,
  },
  {
    id: "interface",
    eyebrow: "Workspace",
    title: "Main interface areas",
    body: "The FlowCut workspace is organized around the waveform preview, preset grid, threshold controls, frame padding controls, and the import/export action area.",
    bullets: ["Waveform regions show kept audio and removed silence", "Threshold controls define how quiet a section must be before it is treated as silence", "Pre-roll and post-roll preserve breathing room around speech"],
    icon: Layers,
  },
  {
    id: "presets",
    eyebrow: "Presets",
    title: "Recommended starting points",
    body: "Use presets as editing profiles, then fine tune them for your source audio. Natural Podcast is the safest first pass for spoken content.",
    bullets: ["Natural Podcast: -29 dB, 2 frames", "Super Tight: -42 dB, 10 frames", "Sigh Killer: -25 dB, 4 frames", "Conservative: -50 dB, 14 frames"],
    icon: Settings2,
  },
  {
    id: "export",
    eyebrow: "Final Cut Pro",
    title: "Export workflow",
    body: "After reviewing the cuts, FlowCut exports a sequence XML that can be imported into Final Cut Pro. Keep your original project and media backed up before replacing any active timeline.",
    bullets: ["Import media into FlowCut", "Run silence detection", "Preview detected cuts", "Export XML and import it into Final Cut Pro"],
    icon: FileOutput,
  },
  {
    id: "privacy",
    eyebrow: "Privacy",
    title: "Local-first processing",
    body: "FlowCut is designed around local processing. Media files are not uploaded to FrameLabs servers for the standard silence-removal workflow.",
    bullets: ["Media stays on the user's device", "Account and license services are separate from media analysis", "Future cloud features will be disclosed separately if introduced"],
    icon: ShieldCheck,
  },
  {
    id: "requirements",
    eyebrow: "Requirements",
    title: "System requirements",
    body: "FlowCut is built for modern macOS editing workstations and Final Cut Pro workflows.",
    bullets: ["Apple Silicon M1/M2/M3 or Intel i7/i9 10th Gen+", "8 GB RAM minimum, 16 GB recommended", "Metal-compatible GPU", "Final Cut Pro for sequence XML workflow"],
    icon: Cpu,
  },
];

const faq = [
  {
    question: "Does FlowCut upload my video or audio files?",
    answer: "No. The standard FlowCut silence-removal workflow processes media locally on your Mac.",
  },
  {
    question: "Can I adjust timing in frames?",
    answer: "Yes. FlowCut uses frame-based controls for minimum duration and padding so the website matches the app workflow.",
  },
  {
    question: "What editor is currently supported?",
    answer: "The current product page and documentation focus on Final Cut Pro.",
  },
  {
    question: "Should I review the generated edit?",
    answer: "Yes. Always review automated cuts before publishing or delivering client work.",
  },
];

export function FlowCutDocumentationPage({
  onNavigate,
  onOpenFlowCut,
  onOpenContact,
  onOpenAccount,
  onOpenDocumentation,
  isCartOpen,
  onCartOpen,
  onCartClose,
}: FlowCutDocumentationPageProps) {
  return (
    <div className="relative min-h-screen bg-brand-bg font-body text-brand-text selection:bg-brand-purple/30 selection:text-white">
      <div className="pointer-events-none absolute left-[5%] top-28 h-[420px] w-[420px] rounded-full bg-brand-purple/10 blur-[110px]" />
      <div className="pointer-events-none absolute right-[8%] top-[640px] h-[360px] w-[360px] rounded-full bg-brand-blue/10 blur-[100px]" />

      <Navigation
        onHome={() => onNavigate("extensions")}
        onCartOpen={onCartOpen}
        onOpenAccount={onOpenAccount}
        onOpenDocumentation={onOpenDocumentation}
      />

      <main className="relative mx-auto max-w-7xl px-6 pb-24 pt-32 sm:px-8">
        <section className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <div className="space-y-6">
            <button
              type="button"
              onClick={onOpenFlowCut}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-brand-purple-light transition hover:border-brand-purple/40 hover:text-white"
            >
              <ArrowRight className="h-3.5 w-3.5 rotate-180" />
              Back to FlowCut
            </button>

            <div className="space-y-4">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.35em] text-brand-blue">FlowCut Documentation</p>
              <h1 className="max-w-3xl font-sans text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">
                Silence removal workflow guide for Final Cut Pro.
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
                Learn how to install FlowCut, analyze media, tune frame-based presets, and export clean sequence XML back into Final Cut Pro.
              </p>
            </div>
          </div>

          <div className="marketplace-panel rounded-2xl p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Current focus", "Final Cut Pro"],
                ["Timing model", "Frames"],
                ["Processing", "Local-first"],
                ["Workflow", "FCPXML export"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">{label}</p>
                  <p className="mt-2 text-lg font-bold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-5 lg:grid-cols-4" aria-label="Quickstart steps">
          {quickstartSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="marketplace-panel rounded-xl p-5">
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-purple/30 bg-brand-purple/15 text-brand-purple-light">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs font-bold text-text-muted/70">0{index + 1}</span>
                </div>
                <h2 className="text-base font-bold text-white">{step.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{step.body}</p>
              </article>
            );
          })}
        </section>

        <div className="mt-16 grid gap-8 lg:grid-cols-[240px_1fr] lg:items-start">
          <aside className="sticky top-28 hidden rounded-xl border border-white/10 bg-white/[0.03] p-4 lg:block">
            <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest text-white">On this page</p>
            <nav className="space-y-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block rounded-lg px-3 py-2 text-sm text-text-muted transition hover:bg-white/5 hover:text-white"
                >
                  {section.title}
                </a>
              ))}
              <a href="#faq" className="block rounded-lg px-3 py-2 text-sm text-text-muted transition hover:bg-white/5 hover:text-white">
                FAQ
              </a>
            </nav>
          </aside>

          <div className="space-y-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <section key={section.id} id={section.id} className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-border-high bg-brand-surface text-brand-blue">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-brand-purple-light">{section.eyebrow}</p>
                      <h2 className="mt-2 text-2xl font-black tracking-tight text-white">{section.title}</h2>
                      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-muted sm:text-base">{section.body}</p>
                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {section.bullets.map((item) => (
                          <div key={item} className="flex gap-3 rounded-lg border border-white/10 bg-black/25 p-3 text-sm text-brand-text">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}

            <section id="faq" className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-border-high bg-brand-surface text-brand-purple-light">
                  <HardDrive className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-brand-blue">Support</p>
                  <h2 className="mt-1 text-2xl font-black tracking-tight text-white">Common questions</h2>
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                {faq.map((item) => (
                  <article key={item.question} className="rounded-xl border border-white/10 bg-black/25 p-5">
                    <h3 className="text-base font-bold text-white">{item.question}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.answer}</p>
                  </article>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 rounded-xl border border-brand-purple/25 bg-brand-purple/10 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Need help with a real project?</h3>
                  <p className="mt-1 text-sm text-text-muted">Use the contact page for support, licensing, and workflow questions.</p>
                </div>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-purple px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-purple-hover"
                >
                  Contact Support
                  <Play className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-text-muted">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                <p>
                  FrameLabs and FlowCut are independent products and are not affiliated with, endorsed by, sponsored by, or officially connected to Apple Inc. or Final Cut Pro.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <PortalFooter
        onNavigate={onNavigate}
        onOpenFlowCut={onOpenFlowCut}
        onOpenContact={onOpenContact}
        onOpenDocumentation={onOpenDocumentation}
      />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={onCartClose}
        cart={[]}
        onUpdateQuantity={() => undefined}
        onRemoveItem={() => undefined}
        onClearCart={() => undefined}
      />
    </div>
  );
}
