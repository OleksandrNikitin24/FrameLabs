import { ChevronDown, ShoppingCart, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AppTab, CartItem } from "../types";

interface HeaderProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  cart: CartItem[];
  setCartOpen: (open: boolean) => void;
  onOpenAccount: () => void;
  onOpenPlans?: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  cart,
  setCartOpen,
  onOpenAccount,
  onOpenPlans
}: HeaderProps) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [appsOpen, setAppsOpen] = useState(false);
  const appsMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!appsMenuRef.current?.contains(event.target as Node)) {
        setAppsOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setAppsOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Global nav */}
      <div className="bg-void text-white">
        <div className="mx-auto flex h-11 max-w-[980px] items-center justify-between px-6">
          <button
            type="button"
            id="logo-brand"
            onClick={() => setActiveTab("extensions")}
            aria-label="Go to FrameLabs landing page"
            className="flex cursor-pointer items-center gap-2"
          >
            <span className="font-sans text-[15px] font-semibold tracking-tight text-white">FrameLabs</span>
          </button>

          <div className="flex items-center gap-5">
            <button
              id="cart-trigger-btn"
              onClick={() => setCartOpen(true)}
              className="relative cursor-pointer text-white/80 transition hover:text-white"
              aria-label="Workspace Licensing Cart"
              title="Workspace Licensing Cart"
            >
              <ShoppingCart className="h-[18px] w-[18px]" />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-action text-[9px] font-semibold text-white">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              id="profile-trigger-btn"
              onClick={onOpenAccount}
              className="cursor-pointer text-white/80 transition hover:text-white"
              aria-label="My account"
              title="My account"
            >
              <User className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Frosted sub-nav */}
      <div className="frost border-b border-black/5">
        <div className="mx-auto flex h-[52px] max-w-[980px] items-center justify-between px-6">
          <span className="font-sans text-[21px] font-semibold tracking-[0.231px] text-ink">Store</span>
          <nav className="flex items-center gap-6">
            <div className="relative" ref={appsMenuRef}>
              <button
                type="button"
                onClick={() => setAppsOpen((isOpen) => !isOpen)}
                className="flex items-center gap-1 text-[14px] tracking-[-0.224px] text-ink/70 transition hover:text-ink"
                aria-expanded={appsOpen}
                aria-haspopup="menu"
              >
                Apps
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${appsOpen ? "rotate-180" : ""}`} />
              </button>
              {appsOpen && (
                <div
                  role="menu"
                  className="absolute left-0 top-[calc(100%+14px)] min-w-36 rounded-lg border border-black/10 bg-white p-1.5 shadow-lg"
                >
                  <a
                    href="/apps/cue/"
                    role="menuitem"
                    onClick={() => setAppsOpen(false)}
                    className="block rounded-md px-3 py-2 text-[14px] text-ink transition hover:bg-black/5"
                  >
                    Cue
                  </a>
                </div>
              )}
            </div>
            <button
              id="nav-extensions"
              onClick={() => setActiveTab("extensions")}
              className={`text-[14px] tracking-[-0.224px] transition ${
                activeTab === "extensions" ? "font-semibold text-ink" : "text-ink/70 hover:text-ink"
              }`}
            >
              Extensions
            </button>
            {onOpenPlans && (
              <button
                onClick={onOpenPlans}
                className="text-[14px] tracking-[-0.224px] text-ink/70 transition hover:text-ink"
              >
                Plans
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
