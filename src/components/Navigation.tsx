import { useState } from "react";
import { Menu, ShoppingCart, User, X } from "lucide-react";

interface NavigationProps {
  onCartOpen: () => void;
  onProfileOpen: () => void;
}

export function Navigation({ onCartOpen, onProfileOpen }: NavigationProps) {
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

        {/* Workspace actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onCartOpen}
            className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl border border-brand-border bg-brand-surface/40 text-brand-text transition-all duration-200 hover:border-brand-border-high hover:bg-brand-surface"
            aria-label="Workspace Licensing Cart"
            title="Workspace Licensing Cart"
          >
            <ShoppingCart className="h-5 w-5 text-brand-text group-hover:text-brand-primary-light" />
          </button>
          <button
            onClick={onProfileOpen}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl border border-brand-border bg-brand-surface/40 text-brand-text transition-all duration-200 hover:border-brand-border-high hover:bg-brand-surface"
            aria-label="Editor Workspace Profile"
            title="Editor Workspace Profile"
          >
            <User className="h-5 w-5 text-brand-text-muted hover:text-white" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer md:hidden text-white p-1 hover:bg-white/5 rounded"
            aria-label="Open navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
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
        </div>
      )}
    </nav>
  );
}
