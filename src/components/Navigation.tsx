import { useState } from "react";
import { Menu, ShoppingCart, User, X } from "lucide-react";

interface NavigationProps {
  onHome: () => void;
  onCartOpen: () => void;
  onOpenAccount: () => void;
  onOpenDocumentation: () => void;
}

export function Navigation({ onHome, onCartOpen, onOpenAccount, onOpenDocumentation }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      return;
    }

    window.location.hash = "/flowcut";
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  };

  const navItems = [
    { label: "Features", id: "features-overview" },
    { label: "Pricing", id: "pricing-tier" },
    { label: "Support", id: "footer-support" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Global nav — slim black bar */}
      <nav className="bg-void text-white">
        <div className="mx-auto flex h-11 max-w-[980px] items-center justify-between px-6">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2"
            onClick={onHome}
            aria-label="Go to FrameLabs landing page"
          >
            <span className="font-sans text-[15px] font-semibold tracking-tight text-white"></span>
            <span className="font-sans text-[15px] font-semibold tracking-tight text-white">FrameLabs</span>
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                className="cursor-pointer text-[12px] tracking-[-0.12px] text-white/80 transition hover:text-white"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenDocumentation();
              }}
              className="cursor-pointer text-[12px] tracking-[-0.12px] text-white/80 transition hover:text-white"
            >
              Documentation
            </button>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={onCartOpen}
              className="cursor-pointer text-white/80 transition hover:text-white"
              aria-label="Workspace Licensing Cart"
              title="Workspace Licensing Cart"
            >
              <ShoppingCart className="h-[18px] w-[18px]" />
            </button>
            <button
              onClick={onOpenAccount}
              className="cursor-pointer text-white/80 transition hover:text-white"
              aria-label="My account"
              title="My account"
            >
              <User className="h-[18px] w-[18px]" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer text-white md:hidden"
              aria-label="Open navigation menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Sub-nav — frosted parchment strip */}
      <div className="frost border-b border-black/5">
        <div className="mx-auto flex h-[52px] max-w-[980px] items-center justify-between px-6">
          <span className="font-sans text-[21px] font-semibold tracking-[0.231px] text-ink">FlowCut</span>
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                className="cursor-pointer text-[14px] tracking-[-0.224px] text-ink/80 transition hover:text-ink"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("pricing-tier")}
              className="btn-pill !px-[16px] !py-[7px] !text-[14px]"
            >
              Buy
            </button>
          </div>
          <button
            onClick={() => scrollToSection("pricing-tier")}
            className="btn-pill !px-[16px] !py-[7px] !text-[14px] md:hidden"
          >
            Buy
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="flex flex-col gap-4 border-b border-black/10 bg-white px-6 py-6 md:hidden">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.id)}
              className="cursor-pointer text-left text-[17px] text-ink transition"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              onOpenDocumentation();
            }}
            className="cursor-pointer text-left text-[17px] text-ink transition"
          >
            Documentation
          </button>
        </div>
      )}
    </header>
  );
}
