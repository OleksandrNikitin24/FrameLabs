import { ShoppingCart, User } from "lucide-react";
import { AppTab, CartItem } from "../types";

interface HeaderProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  cart: CartItem[];
  setCartOpen: (open: boolean) => void;
  onOpenAccount: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  cart,
  setCartOpen,
  onOpenAccount
}: HeaderProps) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-brand-border bg-brand-bg/80 backdrop-filter backdrop-blur-md">
      <div id="header-container" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Brand Logo */}
        <button
          type="button"
          id="logo-brand"
          onClick={() => setActiveTab("extensions")}
          aria-label="Go to FrameLabs landing page"
          className="flex cursor-pointer items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded bg-brand-primary p-1.5 shadow-lg shadow-brand-primary/25">
            <span className="font-sora text-sm font-extrabold text-white">FL</span>
          </div>
          <span className="font-sora text-xl font-bold tracking-tight text-white hover:opacity-90">
            FrameLabs
          </span>
        </button>

        {/* Navigation is intentionally limited while the marketplace launches. */}
        <nav className="hidden h-full md:flex items-center">
          <button
            id="nav-extensions"
            onClick={() => setActiveTab("extensions")}
            className={`relative px-4 py-2 font-sans text-xs font-semibold tracking-wide uppercase transition-all duration-200 outline-none ${
              activeTab === "extensions" ? "text-white" : "text-brand-text-muted hover:text-white"
            }`}
          >
            Extensions
            {activeTab === "extensions" && (
              <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded bg-brand-primary" />
            )}
          </button>
        </nav>

        {/* Call to Actions & Cart */}
        <div id="header-actions" className="flex items-center gap-4">

          {/* Cart Icon */}
          <button
            id="cart-trigger-btn"
            onClick={() => setCartOpen(true)}
            className="group relative rounded-lg border border-brand-border bg-brand-surface/40 p-2 text-brand-text transition-all duration-200 hover:border-brand-border-high hover:bg-brand-surface"
            aria-label="Workspace Licensing Cart"
            title="Workspace Licensing Cart"
          >
            <ShoppingCart className="h-4 w-4 text-brand-text group-hover:text-brand-primary-light" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-primary font-mono text-[9px] font-bold text-white shadow-md animate-bounce">
                {totalItems}
              </span>
            )}
          </button>

          {/* User Profile avatar */}
          <button
            id="profile-trigger-btn"
            onClick={onOpenAccount}
            className="rounded-lg border border-brand-border bg-brand-surface/40 p-2 text-brand-text transition-all duration-200 hover:border-brand-border-high hover:bg-brand-surface"
            aria-label="Sign in or register"
            title="Sign in or register"
          >
            <User className="h-4 w-4 text-brand-text-muted hover:text-white" />
          </button>

        </div>

      </div>
    </header>
  );
}
