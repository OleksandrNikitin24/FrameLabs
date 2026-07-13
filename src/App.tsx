import { lazy, Suspense, useEffect, useLayoutEffect, useState } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { FeatureCards } from "./components/FeatureCards";
import { InteractiveShowcase } from "./components/InteractiveShowcase";
import { Pricing } from "./components/Pricing";
import { PortalFooter } from "./components/PortalFooter";
import { PortalPage } from "./components/PortalPage";
import { FlowCutDocumentationPage } from "./components/FlowCutDocumentationPage";
import { PlansPage } from "./components/PlansPage";
import CartDrawer from "./portal/components/CartDrawer";
import { AppTab } from "./portal/types";
import { Sparkles, Tv, Box, Orbit, Compass } from "lucide-react";

const AuthPage = lazy(() => import("./components/AuthPage").then(({ AuthPage: page }) => ({ default: page })));
const AccountPage = lazy(() => import("./components/AccountPage").then(({ AccountPage: page }) => ({ default: page })));

export default function App() {
  const [route, setRoute] = useState(window.location.hash);
  const [flowcutCartOpen, setFlowcutCartOpen] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", handleLocationChange);
    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("hashchange", handleLocationChange);
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  useEffect(() => {
    const isAuthCallback = new URLSearchParams(window.location.search).has("code");
    if (isAuthCallback && route !== "#/login") {
      window.location.hash = "/login";
    }
  }, [route]);

  useEffect(() => {
    const legacyStaticRoutes: Record<string, string> = {
      "#/contact": "/contact/",
      "#/gdpr": "/gdpr/",
      "#/privacy": "/privacy/",
      "#/support": "/support/",
      "#/terms": "/terms/",
    };
    const staticRoute = legacyStaticRoutes[route];
    if (staticRoute) {
      window.location.replace(staticRoute);
    }
  }, [route]);

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
    window.location.assign("/contact/");
  };

  const handlePortalNavigation = (page: AppTab) => {
    if (page === "extensions") {
      if (window.location.hash) {
        window.history.pushState(null, "", `${window.location.pathname}${window.location.search}`);
        setRoute("");
      }
    } else {
      window.location.assign(`/${page}/`);
    }
    window.scrollTo({ top: 0 });
  };

  const handleOpenFlowCut = () => {
    window.location.hash = "/flowcut";
    window.scrollTo({ top: 0 });
  };

  const handleOpenAccount = () => {
    window.location.hash = "/account";
    window.scrollTo({ top: 0 });
  };

  const handleOpenDocumentation = () => {
    window.location.hash = "/flowcut/documentation";
    window.scrollTo({ top: 0 });
  };

  const handleRequireSignIn = () => {
    window.location.hash = "/login";
    window.scrollTo({ top: 0 });
  };

  const handleOpenPlans = () => {
    window.location.hash = "/plans";
    window.scrollTo({ top: 0 });
  };

  if (route === "#/login") {
    return (
      <Suspense fallback={<div className="min-h-screen bg-brand-bg" />}>
        <AuthPage
          onNavigate={handlePortalNavigation}
          onOpenFlowCut={handleOpenFlowCut}
          onOpenContact={handleContactClick}
          onAuthenticated={handleOpenAccount}
        />
      </Suspense>
    );
  }

  if (route === "#/account") {
    return (
      <Suspense fallback={<div className="min-h-screen bg-brand-bg" />}>
        <AccountPage
          onNavigate={handlePortalNavigation}
          onOpenFlowCut={handleOpenFlowCut}
          onOpenContact={handleContactClick}
          onRequireSignIn={handleRequireSignIn}
        />
      </Suspense>
    );
  }

  if (route === "#/flowcut/documentation") {
    return (
      <FlowCutDocumentationPage
        onNavigate={handlePortalNavigation}
        onOpenFlowCut={handleOpenFlowCut}
        onOpenContact={handleContactClick}
        onOpenAccount={handleOpenAccount}
        onOpenDocumentation={handleOpenDocumentation}
        isCartOpen={flowcutCartOpen}
        onCartOpen={() => setFlowcutCartOpen(true)}
        onCartClose={() => setFlowcutCartOpen(false)}
      />
    );
  }

  if (route === "#/plans") {
    return (
      <PlansPage
        onNavigate={handlePortalNavigation}
        onOpenFlowCut={handleOpenFlowCut}
        onOpenContact={handleContactClick}
        onOpenAccount={handleOpenAccount}
        onOpenDocumentation={handleOpenDocumentation}
      />
    );
  }

  if (route !== "#/flowcut") {
    return (
      <PortalPage
        page="extensions"
        onNavigate={handlePortalNavigation}
        onOpenFlowCut={handleOpenFlowCut}
        onOpenContact={handleContactClick}
        onOpenAccount={handleOpenAccount}
        onOpenPlans={handleOpenPlans}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-canvas font-body text-ink selection:bg-action/20">
      {/* 1. Global + sub nav */}
      <Navigation
        onHome={() => handlePortalNavigation("extensions")}
        onCartOpen={() => setFlowcutCartOpen(true)}
        onOpenAccount={handleOpenAccount}
        onOpenDocumentation={handleOpenDocumentation}
        onOpenPlans={handleOpenPlans}
      />

      {/* 2. Hero Presentation Track */}
      <Hero onLearnMoreClick={handleScrollToOverview} />

      {/* 3. Core Feature Grid Grid */}
      <FeatureCards />

      {/* 4. Large Interactive Showcase Columns */}
      <InteractiveShowcase />

      {/* 5. Logo Wall / Proof Segment */}
      <section className="bg-parchment px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-[980px] space-y-8 text-center">
          <p className="text-[12px] font-semibold uppercase tracking-widest text-ink-48">
            Empowering 50,000+ FlowCut power users worldwide
          </p>

          <div className="flex flex-wrap items-center justify-center gap-12 text-ink-80 sm:gap-16">
            {/* Logo 1 */}
            <div className="flex items-center gap-2">
              <Box className="h-5 w-5" />
              <span className="font-sans text-[15px] font-semibold tracking-tight">Aetheria</span>
            </div>

            {/* Logo 2 */}
            <div className="flex items-center gap-2">
              <Tv className="h-5 w-5" />
              <span className="font-sans text-[15px] font-semibold tracking-tight">Vox Media</span>
            </div>

            {/* Logo 3 */}
            <div className="flex items-center gap-2">
              <Orbit className="h-5 w-5" />
              <span className="font-sans text-[15px] font-semibold tracking-tight">Neon Labs</span>
            </div>

            {/* Logo 4 */}
            <div className="flex items-center gap-2">
              <Compass className="h-5 w-5" />
              <span className="font-sans text-[15px] font-semibold tracking-tight">Velocity HQ</span>
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
        onOpenDocumentation={handleOpenDocumentation}
      />
      <CartDrawer
        isOpen={flowcutCartOpen}
        onClose={() => setFlowcutCartOpen(false)}
        cart={[]}
        onUpdateQuantity={() => undefined}
        onRemoveItem={() => undefined}
        onClearCart={() => undefined}
      />
    </div>
  );
}
