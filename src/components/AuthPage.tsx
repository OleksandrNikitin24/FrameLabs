import { FormEvent, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Cpu, Eye, EyeOff, UserPlus } from "lucide-react";
import { getAuthRedirectUrl, supabase } from "../lib/supabase";
import { AppTab } from "../portal/types";
import { PortalFooter } from "./PortalFooter";

type AuthMode = "signin" | "register";

interface AuthPageProps {
  onNavigate: (page: AppTab) => void;
  onOpenFlowCut: () => void;
  onOpenContact: () => void;
  onAuthenticated: () => void;
}

export function AuthPage({ onNavigate, onOpenFlowCut, onOpenContact, onAuthenticated }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [licenseKey, setLicenseKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setMessage("Authentication is not configured for this deployment.");
      return;
    }

    let isMounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (isMounted && data.session) {
        setHasSession(true);
        onAuthenticated();
      }
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setHasSession(true);
        onAuthenticated();
      } else {
        setHasSession(false);
      }
    });

    return () => {
      isMounted = false;
      data.subscription.unsubscribe();
    };
  }, [onAuthenticated]);

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setMessage("");
    setPassword("");
    setConfirmPassword("");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    if (mode === "register" && !fullName.trim()) {
      setMessage("Enter your full name to create an account.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }
    if (mode === "register" && password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!supabase) {
      setMessage("Authentication is not configured for this deployment.");
      return;
    }

    setIsSubmitting(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setMessage(error ? error.message : "Opening your account...");
      setIsSubmitting(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName.trim() },
        emailRedirectTo: getAuthRedirectUrl(),
      },
    });
    if (error) {
      setMessage(error.message);
    } else if (data.session) {
      setMessage("Your account has been created and you are signed in.");
    } else {
      setMessage("Check your email to confirm your FrameLabs account.");
    }
    setIsSubmitting(false);
  };

  const resetPassword = async () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage("Enter your email address first, then request a password reset.");
      return;
    }
    if (!supabase) {
      setMessage("Authentication is not configured for this deployment.");
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: getAuthRedirectUrl(),
    });
    setMessage(error ? error.message : "Check your email for the password reset link.");
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-brand-bg font-body text-white selection:bg-brand-purple/30 selection:text-white">
      <header className="border-b border-brand-border bg-brand-bg/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
          <button
            type="button"
            onClick={() => onNavigate("extensions")}
            aria-label="Go to FrameLabs landing page"
            className="flex items-center gap-2"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded bg-brand-primary font-sora text-sm font-extrabold shadow-lg shadow-brand-primary/25">
              FL
            </span>
            <span className="font-sora text-xl font-bold tracking-tight">FrameLabs</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate("extensions")}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-text-muted transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Extensions
          </button>
        </div>
      </header>

      <main className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl lg:grid-cols-[1.06fr_0.94fr]">
        <section className="relative hidden overflow-hidden border-r border-brand-border lg:flex lg:flex-col lg:justify-end">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwTXwVkh4Z4n1JfsO7lrMS0QvePkRxmyFIv4j1fVMr3Tsx-KFKAZDysIy0GAZSLbFoK34Hs_9DaVfwN4h6ZNjWwvECL9cneuGKW4fwBxXgf3Lqp9amWfpX92r_WiFhnqkvhnIlqILZnAfjUFwKvOpRXSmChZNWTELuC5FuBJ7j9QEgn0rEa7SQGtO8OyFOi9slarjBIZamPE2IgE0JyxeH-VZb-7ZQrAgLDmE3L19Vjr2Ute42cGbHkf0QYuYzDAsA6t-OdqqZRSLA"
            alt="FlowCut editing workspace"
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/55 to-brand-bg/25" />
          <div className="relative z-10 max-w-lg space-y-5 p-12 pb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-border-high bg-brand-surface/80 px-3 py-1.5 font-mono text-[10px] uppercase text-brand-primary-light">
              <Cpu className="h-3.5 w-3.5 text-brand-secondary" />
              Apple Silicon Optimized
            </span>
            <h1 className="font-sora text-4xl font-bold leading-tight">
              {mode === "signin" ? "Welcome back to FlowCut" : "Create your FrameLabs account"}
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-brand-text-muted">
              Manage Final Cut Pro extensions, workspace licensing, and product access through one FrameLabs account.
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-12 sm:px-10">
          <div className="w-full max-w-md rounded-lg border border-brand-border bg-brand-surface-card/70 p-6 shadow-2xl sm:p-9">
            <div className="mb-7">
              <p className="mb-2 font-mono text-[10px] uppercase text-brand-primary-light">FlowCut Account</p>
              <h2 className="font-sora text-2xl font-bold">
                {mode === "signin" ? "Sign In" : "Register"}
              </h2>
              <p className="mt-2 text-sm text-brand-text-muted">
                {mode === "signin"
                  ? "Access your licenses and extension workspace."
                  : "Create an account for licensing and product access."}
              </p>
            </div>

            {!hasSession && <div className="mb-7 grid grid-cols-2 rounded-lg border border-brand-border bg-brand-bg p-1">
              <button
                type="button"
                onClick={() => switchMode("signin")}
                className={`rounded-md px-3 py-2.5 text-sm font-medium transition ${
                  mode === "signin" ? "bg-brand-primary text-white" : "text-brand-text-muted hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => switchMode("register")}
                className={`rounded-md px-3 py-2.5 text-sm font-medium transition ${
                  mode === "register" ? "bg-brand-primary text-white" : "text-brand-text-muted hover:text-white"
                }`}
              >
                Register
              </button>
            </div>}

            {message && (
              <p
                role="status"
                className="mb-5 rounded-md border border-brand-border-high bg-brand-primary/10 p-3 text-xs leading-relaxed text-brand-text"
              >
                {message}
              </p>
            )}

            {!hasSession && <form className="space-y-4" onSubmit={submit}>
              {mode === "register" && (
                <label className="block space-y-2 text-xs font-semibold uppercase text-brand-text-muted">
                  Full Name
                  <input
                    type="text"
                    autoComplete="name"
                    required
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Alex Rivera"
                    className="auth-input block w-full rounded-md px-4 py-3 font-body text-sm font-normal normal-case text-white"
                  />
                </label>
              )}

              <label className="block space-y-2 text-xs font-semibold uppercase text-brand-text-muted">
                Email Address
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="editor@framelabs.com"
                  className="auth-input block w-full rounded-md px-4 py-3 font-body text-sm font-normal normal-case text-white"
                />
              </label>

              <label className="block space-y-2 text-xs font-semibold uppercase text-brand-text-muted">
                Password
                <span className="relative block">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete={mode === "signin" ? "current-password" : "new-password"}
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"
                    className="auth-input block w-full rounded-md px-4 py-3 pr-12 font-body text-sm font-normal normal-case text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((shown) => !shown)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-brand-text-muted transition hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </span>
              </label>

              {mode === "register" && (
                <>
                  <label className="block space-y-2 text-xs font-semibold uppercase text-brand-text-muted">
                    Confirm Password
                    <input
                      type="password"
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      placeholder="Confirm password"
                      className="auth-input block w-full rounded-md px-4 py-3 font-body text-sm font-normal normal-case text-white"
                    />
                  </label>
                  <label className="block space-y-2 text-xs font-semibold uppercase text-brand-text-muted">
                    License Key <span className="font-normal normal-case text-brand-text-muted/70">(optional)</span>
                    <input
                      type="text"
                      autoComplete="off"
                      value={licenseKey}
                      onChange={(event) => setLicenseKey(event.target.value)}
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      className="auth-input block w-full rounded-md px-4 py-3 font-mono text-sm font-normal text-white"
                    />
                  </label>
                </>
              )}

              {mode === "signin" && (
                <div className="flex justify-end py-1">
                  <button
                    type="button"
                    onClick={resetPassword}
                    disabled={isSubmitting}
                    className="text-xs text-brand-primary-light transition hover:text-white"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-brand-primary px-4 py-3.5 text-sm font-bold text-white transition hover:bg-brand-purple-hover"
              >
                {isSubmitting ? "Working..." : mode === "signin" ? (
                  <>
                    Sign In to FlowCut <ArrowRight className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Create Account <UserPlus className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>}

            {!hasSession && <p className="mt-7 text-center text-xs text-brand-text-muted">
              By continuing, you agree to the{" "}
              <button type="button" onClick={() => onNavigate("terms")} className="text-brand-primary-light hover:text-white">
                Terms of Service
              </button>{" "}
              and{" "}
              <button type="button" onClick={() => onNavigate("privacy")} className="text-brand-primary-light hover:text-white">
                Privacy Policy
              </button>
              .
            </p>}
          </div>
        </section>
      </main>

      <PortalFooter onNavigate={onNavigate} onOpenFlowCut={onOpenFlowCut} onOpenContact={onOpenContact} />
    </div>
  );
}
