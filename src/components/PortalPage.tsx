import { useState } from "react";
import CartDrawer from "../portal/components/CartDrawer";
import ExtensionsShowcase from "../portal/components/ExtensionsShowcase";
import Header from "../portal/components/Header";
import { AppTab, CartItem, Extension } from "../portal/types";
import { PortalFooter } from "./PortalFooter";

interface PortalPageProps {
  page: AppTab;
  onNavigate: (page: AppTab) => void;
  onOpenFlowCut: () => void;
  onOpenContact: () => void;
  onOpenAccount: () => void;
  onOpenPlans?: () => void;
}

export function PortalPage({ page, onNavigate, onOpenFlowCut, onOpenContact, onOpenAccount, onOpenPlans }: PortalPageProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      setCart((items) => items.filter((item) => item.extension.id !== id));
      return;
    }
    setCart((items) => items.map((item) => item.extension.id === id ? { ...item, quantity } : item));
  };

  const addToCart = (extension: Extension) => {
    setCart((items) => {
      const existingItem = items.find((item) => item.extension.id === extension.id);
      if (existingItem) {
        return items.map((item) => (
          item.extension.id === extension.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      }

      return [...items, { extension, quantity: 1 }];
    });
  };

  return (
    <div
      className="flex min-h-screen flex-col bg-canvas font-body text-ink selection:bg-action/20"
      style={{ overflowAnchor: "none" }}
    >
      <Header
        activeTab={page}
        setActiveTab={onNavigate}
        cart={cart}
        setCartOpen={setCartOpen}
        onOpenAccount={onOpenAccount}
        onOpenPlans={onOpenPlans}
      />
      <main className="flex-1">
        <ExtensionsShowcase onOpenFlowCut={onOpenFlowCut} onAddToCart={addToCart} onOpenPlans={onOpenPlans} />
      </main>
      <PortalFooter onNavigate={onNavigate} onOpenFlowCut={onOpenFlowCut} onOpenContact={onOpenContact} />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={(id) => setCart((items) => items.filter((item) => item.extension.id !== id))}
        onClearCart={() => setCart([])}
      />
    </div>
  );
}
