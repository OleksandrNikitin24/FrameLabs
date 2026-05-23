import { Globe, Accessibility, ArrowUp } from "lucide-react";

interface FooterProps {
  onContactClick: () => void;
}

export function Footer({ onContactClick }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const navigate = (page: string) => {
    window.location.hash = `/${page}`;
    scrollToTop();
  };

  return (
    <footer id="footer-support" className="bg-brand-bg border-t border-white/5 pt-18 pb-10 px-6 sm:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/5 pb-10 mb-10 text-left">
        
        {/* Brand Information Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToTop}>
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-brand-purple to-brand-blue flex items-center justify-center">
              <span className="font-sans font-bold text-white text-[10px] tracking-tight">FL</span>
            </div>
            <span className="font-sans font-extrabold text-white text-base tracking-tight">
              FrameLabs
            </span>
          </div>
          <p className="text-xs text-text-muted leading-relaxed max-w-sm font-body font-light">
            Creators of FlowCut: Professional Workflow Extensions for the modern video editor and storyteller. Focused on zero-latency native desktop utilities.
          </p>
        </div>

        {/* Link Columns */}
        <div className="md:col-span-2.5.5 grid grid-cols-2 md:grid-cols-3 md:col-span-7 gap-8 text-xs">
          
          {/* Column FlowCut */}
          <div className="space-y-3.5">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">FlowCut</h4>
            <div className="flex flex-col gap-2.5 font-light text-text-muted">
              <button onClick={() => document.getElementById("features-hub")?.scrollIntoView({ behavior: "smooth" })} className="cursor-pointer text-left hover:text-white transition">Features</button>
              <button onClick={() => document.getElementById("pricing-tier")?.scrollIntoView({ behavior: "smooth" })} className="cursor-pointer text-left hover:text-white transition">Pricing</button>
              <button onClick={() => alert("Simulated: Version v3.0.4 Changelog released May 2026.")} className="cursor-pointer text-left hover:text-white transition">Release Notes</button>
            </div>
          </div>

          {/* Column Legal */}
          <div className="space-y-3.5">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">Legal</h4>
            <div className="flex flex-col gap-2.5 font-light text-text-muted">
              <button onClick={() => navigate("privacy")} className="cursor-pointer text-left hover:text-white transition">Privacy Policy</button>
              <button onClick={() => navigate("terms")} className="cursor-pointer text-left hover:text-white transition">Terms of Service</button>
              <button onClick={() => navigate("gdpr")} className="cursor-pointer text-left hover:text-white transition">GDPR Portal</button>
            </div>
          </div>

          {/* Column Support */}
          <div className="space-y-3.5">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">Support</h4>
            <div className="flex flex-col gap-2.5 font-light text-text-muted">
              <button onClick={() => navigate("support")} className="cursor-pointer text-left hover:text-white transition">Documentation</button>
              <button onClick={onContactClick} className="cursor-pointer text-left hover:text-white transition">Contact Us</button>
              <button onClick={() => navigate("support")} className="cursor-pointer text-left hover:text-white transition">Support &amp; FAQ</button>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Legal & Accents line */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5 text-[10px] font-mono text-text-muted/60">
        
        <div>
          <span>© 2026 FrameLabs. FlowCut is a registered trademark of FrameLabs Inc.</span>
        </div>

        {/* Utility indicators */}
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-1 hover:text-white transition cursor-pointer">
            <Globe className="w-3.5 h-3.5" /> <span>English (US)</span>
          </button>
          
          <button className="flex items-center gap-1 hover:text-white transition cursor-pointer" title="Accessibility Toggle">
            <Accessibility className="w-3.5 h-3.5" /> <span>Accessibility</span>
          </button>

          <button
            onClick={scrollToTop}
            className="cursor-pointer flex items-center gap-1 bg-white/5 hover:bg-white/10 text-white rounded px-2.5 py-1 transition"
          >
            <span>Back to Top</span> <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>
    </footer>
  );
}
