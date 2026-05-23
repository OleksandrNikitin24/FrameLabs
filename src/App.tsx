import { useEffect, useLayoutEffect, useState } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { FeatureCards } from "./components/FeatureCards";
import { InteractiveShowcase } from "./components/InteractiveShowcase";
import { Pricing } from "./components/Pricing";
import { ContactPage } from "./components/ContactPage";
import { PortalFooter } from "./components/PortalFooter";
import { PortalPage } from "./components/PortalPage";
import CartDrawer from "./portal/components/CartDrawer";
import ProfileModal from "./portal/components/ProfileModal";
import { AppTab } from "./portal/types";
import { Sparkles, Tv, Box, Orbit, Compass } from "lucide-react";

export default function App() {
  const [route, setRoute] = useState(window.location.hash);
  const [flowcutCartOpen, setFlowcutCartOpen] = useState(false);
  const [flowcutProfileOpen, setFlowcutProfileOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
    const resetFrame = window.requestAnimationFrame(() => window.scrollTo({ top: 0 }));
    return () => window.cancelAnimationFrame(resetFrame);
  }, [route]);

  const handleScrollToOverview = () => {
    const el = document.getElementById("interactive-editor");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleContactClick = () => {
    window.location.hash = "/contact";
    window.scrollTo({ top: 0 });
  };

  const handlePortalNavigation = (page: AppTab) => {
    window.location.hash = page === "extensions" ? "" : `/${page}`;
    window.scrollTo({ top: 0 });
  };

  const handleOpenFlowCut = () => {
    window.location.hash = "/flowcut";
    window.scrollTo({ top: 0 });
  };

  if (route === "#/contact") {
    return (
      <ContactPage
        onNavigate={handlePortalNavigation}
        onOpenFlowCut={handleOpenFlowCut}
        onOpenContact={handleContactClick}
      />
    );
  }

  if (route !== "#/flowcut") {
    const portalRoutes: Record<string, AppTab> = {
      "#/privacy": "privacy",
      "#/terms": "terms",
      "#/gdpr": "gdpr",
      "#/support": "support",
      "#/extensions": "extensions",
    };

    return (
      <PortalPage
        page={portalRoutes[route] ?? "extensions"}
        onNavigate={handlePortalNavigation}
        onOpenFlowCut={handleOpenFlowCut}
        onOpenContact={handleContactClick}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-brand-bg font-body selection:bg-brand-purple/30 selection:text-white">
      {/* Dynamic light glows globally */}
      <div className="absolute top-[1800px] left-[10%] w-[500px] h-[500px] bg-brand-blue/5 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute top-[3200px] right-[5%] w-[400px] h-[400px] bg-brand-purple/5 rounded-full filter blur-[80px] pointer-events-none"></div>

      {/* 1. Glassmorphic Header Navigation */}
      <Navigation
        onCartOpen={() => setFlowcutCartOpen(true)}
        onProfileOpen={() => setFlowcutProfileOpen(true)}
      />

      {/* 2. Hero Presentation Track */}
      <Hero onLearnMoreClick={handleScrollToOverview} />

      {/* 3. Core Feature Grid Grid */}
      <FeatureCards />

      {/* 4. Large Interactive Showcase Columns */}
      <InteractiveShowcase />

      {/* 5. Logo Wall / Proof Segment */}
      <section className="border-t border-b border-white/5 bg-brand-surface-dim/30 py-12 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <p className="text-[10px] font-bold text-text-muted/60 uppercase tracking-widest font-mono">
            EMPOWERING 50,000+ FLOWCUT POWER USERS WORLDWIDE
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition duration-300">
            
            {/* Logo 1 */}
            <div className="flex items-center gap-2">
              <Box className="w-5 h-5 text-white" />
              <span className="font-sans font-extrabold text-white text-sm tracking-widest uppercase">
                AETHERIA
              </span>
            </div>

            {/* Logo 2 */}
            <div className="flex items-center gap-2">
              <Tv className="w-5 h-5 text-white" />
              <span className="font-sans font-extrabold text-white text-sm tracking-widest uppercase">
                VOX_MEDIA
              </span>
            </div>

            {/* Logo 3 */}
            <div className="flex items-center gap-2">
              <Orbit className="w-5 h-5 text-white" />
              <span className="font-sans font-extrabold text-white text-sm tracking-widest uppercase">
                NEON_LABS
              </span>
            </div>

            {/* Logo 4 */}
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-white" />
              <span className="font-sans font-extrabold text-white text-sm tracking-widest uppercase">
                VELOCITY_HQ
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Pricing License Tier */}
      <Pricing />

      {/* 7. Shared Footer Deck */}
      <PortalFooter
        onNavigate={handlePortalNavigation}
        onOpenFlowCut={handleOpenFlowCut}
        onOpenContact={handleContactClick}
      />
      <CartDrawer
        isOpen={flowcutCartOpen}
        onClose={() => setFlowcutCartOpen(false)}
        cart={[]}
        onUpdateQuantity={() => undefined}
        onRemoveItem={() => undefined}
        onClearCart={() => undefined}
      />
      <ProfileModal
        isOpen={flowcutProfileOpen}
        onClose={() => setFlowcutProfileOpen(false)}
        setActiveTab={handlePortalNavigation}
      />
    </div>
  );
}
