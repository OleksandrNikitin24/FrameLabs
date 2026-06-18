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
    <footer className="bg-parchment px-6 pb-12 pt-16 text-ink-80 sm:px-8" id="footer-support">
      <div className="mx-auto max-w-[980px]">
        <div className="mb-10 grid grid-cols-1 gap-10 border-b border-hairline pb-10 text-left md:grid-cols-12">
          <div className="space-y-4 md:col-span-5">
            <button onClick={() => onNavigate("extensions")} aria-label="Go to FrameLabs landing page" className="flex cursor-pointer items-center gap-2 text-left">
              <span className="font-sans text-[17px] font-semibold tracking-tight text-ink">FrameLabs</span>
            </button>
            <p className="max-w-sm text-[14px] leading-relaxed text-ink-48">
              Creators of FlowCut: professional workflow extensions for the modern video editor and storyteller. Focused on zero-latency native desktop utilities.
            </p>
          </div>

          <div className="grid gap-8 text-[14px] sm:grid-cols-3 md:col-span-7">
            <div className="space-y-2">
              <h4 className="text-[14px] font-semibold tracking-[-0.224px] text-ink">FlowCut</h4>
              <div className="flex flex-col font-[400] text-ink-48">
                <button onClick={onOpenFlowCut} className="py-0.5 text-left transition hover:text-action">Features</button>
                <button onClick={onOpenFlowCut} className="py-0.5 text-left transition hover:text-action">Pricing</button>
                <button onClick={onOpenFlowCut} className="py-0.5 text-left transition hover:text-action">Release Notes</button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-[14px] font-semibold tracking-[-0.224px] text-ink">Legal</h4>
              <div className="flex flex-col font-[400] text-ink-48">
                <a href="/privacy/" className="py-0.5 text-left transition hover:text-action">Privacy Policy</a>
                <a href="/terms/" className="py-0.5 text-left transition hover:text-action">Terms of Service</a>
                <a href="/gdpr/" className="py-0.5 text-left transition hover:text-action">GDPR Portal</a>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-[14px] font-semibold tracking-[-0.224px] text-ink">Support</h4>
              <div className="flex flex-col font-[400] text-ink-48">
                <button onClick={openDocumentation} className="py-0.5 text-left transition hover:text-action">Documentation</button>
                <a href="/contact/" className="py-0.5 text-left transition hover:text-action">Contact Us</a>
                <a href="/support/" className="py-0.5 text-left transition hover:text-action">Support &amp; FAQ</a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-5 text-[12px] text-ink-48 sm:flex-row">
          <span>© 2026 FrameLabs. FlowCut is a registered trademark of FrameLabs Inc.</span>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" /> English (US)</span>
            <span className="flex items-center gap-1"><Accessibility className="h-3.5 w-3.5" /> Accessibility</span>
            <button onClick={scrollToTop} className="flex cursor-pointer items-center gap-1 text-action transition hover:text-action-focus">
              Back to Top <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
