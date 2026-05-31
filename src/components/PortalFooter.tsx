import { Accessibility, ArrowUp, Globe } from "lucide-react";
import { AppTab } from "../portal/types";

interface PortalFooterProps {
  onNavigate: (page: AppTab) => void;
  onOpenFlowCut: () => void;
  onOpenContact: () => void;
  onOpenDocumentation?: () => void;
}

export function PortalFooter({ onNavigate, onOpenFlowCut, onOpenContact, onOpenDocumentation }: PortalFooterProps) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const openDocumentation = onOpenDocumentation ?? (() => {
    window.location.hash = "/flowcut/documentation";
    window.scrollTo({ top: 0 });
  });

  return (
    <footer className="border-t border-white/5 bg-brand-bg px-6 pb-10 pt-18 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid grid-cols-1 gap-10 border-b border-white/5 pb-10 text-left md:grid-cols-12">
          <div className="space-y-4 md:col-span-5">
            <button onClick={() => onNavigate("extensions")} aria-label="Go to FrameLabs landing page" className="flex cursor-pointer items-center gap-2 text-left">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-tr from-brand-purple to-brand-blue">
                <span className="font-sans text-[10px] font-bold tracking-tight text-white">FL</span>
              </span>
              <span className="font-sans text-base font-extrabold tracking-tight text-white">FrameLabs</span>
            </button>
            <p className="max-w-sm font-body text-xs font-light leading-relaxed text-text-muted">
              Creators of FlowCut: Professional Workflow Extensions for the modern video editor and storyteller. Focused on zero-latency native desktop utilities.
            </p>
          </div>

          <div className="grid gap-8 text-xs sm:grid-cols-3 md:col-span-7">
            <div className="space-y-3.5">
              <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-white">FlowCut</h4>
              <div className="flex flex-col gap-2.5 font-light text-text-muted">
                <button onClick={onOpenFlowCut} className="text-left transition hover:text-white">Features</button>
                <button onClick={onOpenFlowCut} className="text-left transition hover:text-white">Pricing</button>
                <button onClick={onOpenFlowCut} className="text-left transition hover:text-white">Release Notes</button>
              </div>
            </div>

            <div className="space-y-3.5">
              <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-white">Legal</h4>
              <div className="flex flex-col gap-2.5 font-light text-text-muted">
                <a href="/privacy/" className="text-left transition hover:text-white">Privacy Policy</a>
                <a href="/terms/" className="text-left transition hover:text-white">Terms of Service</a>
                <a href="/gdpr/" className="text-left transition hover:text-white">GDPR Portal</a>
              </div>
            </div>

            <div className="space-y-3.5" id="footer-support">
              <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-white">Support</h4>
              <div className="flex flex-col gap-2.5 font-light text-text-muted">
                <button onClick={openDocumentation} className="text-left transition hover:text-white">Documentation</button>
                <a href="/contact/" className="text-left transition hover:text-white">Contact Us</a>
                <a href="/support/" className="text-left transition hover:text-white">Support &amp; FAQ</a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-5 font-mono text-[10px] text-text-muted/60 sm:flex-row">
          <span>© 2026 FrameLabs. FlowCut is a registered trademark of FrameLabs Inc.</span>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" /> English (US)</span>
            <span className="flex items-center gap-1"><Accessibility className="h-3.5 w-3.5" /> Accessibility</span>
            <button onClick={scrollToTop} className="flex cursor-pointer items-center gap-1 rounded bg-white/5 px-2.5 py-1 text-white transition hover:bg-white/10">
              Back to Top <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
