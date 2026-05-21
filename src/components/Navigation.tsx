import { useState } from "react";
import { Menu, X, Shield, ExternalLink, ChevronRight } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/45 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-brand-purple to-brand-blue flex items-center justify-center shadow-lg shadow-brand-purple/20">
            <span className="font-sans font-bold text-white text-base tracking-tighter">FL</span>
          </div>
          <span className="font-sans font-extrabold text-white text-lg tracking-tight">
            FrameLabs
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Features", id: "features-hub" },
            { label: "Pricing", id: "pricing-tier" },
            { label: "Support", id: "footer-support" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.id)}
              className="cursor-pointer text-sm font-medium text-text-muted hover:text-white transition-all duration-150"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-5">
          <button 
            onClick={() => alert("Simulated: Log in or account access setup details can be accessed in production environment.")}
            className="cursor-pointer text-sm font-bold text-text-muted hover:text-white transition"
          >
            Log In
          </button>
          <button
            onClick={() => scrollToSection("pricing-tier")}
            className="cursor-pointer px-4.5 py-2 text-xs font-semibold rounded bg-brand-purple text-white hover:bg-brand-purple-hover transition-all duration-200 shadow-md shadow-brand-purple/20 flex items-center gap-1"
          >
            Get FlowCut <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer md:hidden text-white p-1 hover:bg-white/5 rounded"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-brand-bg/95 border-b border-white/10 px-6 py-6 flex flex-col gap-5 animate-in slide-in-from-top duration-350">
          <button
            onClick={() => scrollToSection("features-hub")}
            className="cursor-pointer text-left text-base font-medium text-text-muted hover:text-white py-1"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("pricing-tier")}
            className="cursor-pointer text-left text-base font-medium text-text-muted hover:text-white py-1"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection("footer-support")}
            className="cursor-pointer text-left text-base font-medium text-text-muted hover:text-white py-1"
          >
            Support
          </button>
          <div className="h-[1px] bg-white/5 my-1"></div>
          <button
            onClick={() => alert("Simulated: Log in flow")}
            className="cursor-pointer text-left text-base font-medium text-white py-1"
          >
            Log In
          </button>
          <button
            onClick={() => scrollToSection("pricing-tier")}
            className="cursor-pointer w-full text-center py-3 text-sm font-semibold rounded-md bg-brand-purple text-white hover:bg-brand-purple-hover transition"
          >
            Get FlowCut Now
          </button>
        </div>
      )}
    </nav>
  );
}
