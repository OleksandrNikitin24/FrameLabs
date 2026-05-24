import { useState } from "react";
import CartDrawer from "../portal/components/CartDrawer";
import ExtensionsShowcase from "../portal/components/ExtensionsShowcase";
import GDPRPortal from "../portal/components/GDPRPortal";
import Header from "../portal/components/Header";
import PrivacyPolicy from "../portal/components/PrivacyPolicy";
import SupportCenter from "../portal/components/SupportCenter";
import TermsOfService from "../portal/components/TermsOfService";
import { AppTab, CartItem, Extension } from "../portal/types";
import { PortalFooter } from "./PortalFooter";

interface PortalPageProps {
  page: AppTab;
  onNavigate: (page: AppTab) => void;
  onOpenFlowCut: () => void;
  onOpenContact: () => void;
  onOpenAccount: () => void;
}

export function PortalPage({ page, onNavigate, onOpenFlowCut, onOpenContact, onOpenAccount }: PortalPageProps) {
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

  const content = () => {
    switch (page) {
      case "privacy":
        return <PrivacyPolicy onSetActiveTab={onNavigate} />;
      case "terms":
        return <TermsOfService />;
      case "gdpr":
        return <GDPRPortal />;
      case "support":
        return <SupportCenter />;
      default:
        return <ExtensionsShowcase onOpenFlowCut={onOpenFlowCut} onAddToCart={addToCart} />;
    }
  };

  return (
    <div
      className="flex min-h-screen flex-col bg-brand-bg font-body selection:bg-brand-purple/30 selection:text-white"
      style={{ overflowAnchor: "none" }}
    >
      <Header
        activeTab={page}
        setActiveTab={onNavigate}
        cart={cart}
        setCartOpen={setCartOpen}
        onOpenAccount={onOpenAccount}
      />
      <main className="flex-1">{content()}</main>
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
