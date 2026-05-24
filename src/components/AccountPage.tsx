import { FormEvent, useCallback, useEffect, useState } from "react";
import type { Factor, User } from "@supabase/supabase-js";
import {
  Archive,
  ArrowLeft,
  Check,
  FileText,
  KeyRound,
  LogOut,
  Package,
  ShieldCheck,
  UserRound,
  Video,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { AppTab } from "../portal/types";
import { PortalFooter } from "./PortalFooter";

type AccountSection = "account" | "products" | "subscriptions" | "invoices";

interface AccountPageProps {
  onNavigate: (page: AppTab) => void;
  onOpenFlowCut: () => void;
  onOpenContact: () => void;
  onRequireSignIn: () => void;
}

interface ProfileForm {
  firstName: string;
  lastName: string;
  address: string;
  postcode: string;
  city: string;
  country: string;
  phoneNumber: string;
}

interface Enrollment {
  factorId: string;
  qrCode: string;
  secret: string;
}

const emptyProfile: ProfileForm = {
  firstName: "",
  lastName: "",
  address: "",
  postcode: "",
  city: "",
  country: "",
  phoneNumber: "",
};

const tabs: Array<{ id: AccountSection; label: string; icon: typeof UserRound }> = [
  { id: "account", label: "My account", icon: UserRound },
  { id: "products", label: "My products", icon: Archive },
  { id: "subscriptions", label: "My subscriptions", icon: Video },
  { id: "invoices", label: "Invoices", icon: FileText },
];

const profileFromUser = (user: User): ProfileForm => ({
  firstName: String(user.user_metadata.first_name ?? ""),
  lastName: String(user.user_metadata.last_name ?? ""),
  address: String(user.user_metadata.address ?? ""),
  postcode: String(user.user_metadata.postcode ?? ""),
  city: String(user.user_metadata.city ?? ""),
  country: String(user.user_metadata.country ?? ""),
  phoneNumber: String(user.user_metadata.phone_number ?? ""),
});

export function AccountPage({
  onNavigate,
  onOpenFlowCut,
  onOpenContact,
  onRequireSignIn,
}: AccountPageProps) {
  const [section, setSection] = useState<AccountSection>("account");
  const [user, setUser] = useState<User | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [profile, setProfile] = useState<ProfileForm>(emptyProfile);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({ next: "", confirm: "" });
  const [verifiedFactors, setVerifiedFactors] = useState<Factor[]>([]);
  const [requiresMfa, setRequiresMfa] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const loadSecurity = useCallback(async () => {
    if (!supabase) return;
    const [{ data: factorData }, { data: assuranceData }] = await Promise.all([
      supabase.auth.mfa.listFactors(),
      supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
    ]);
    const activeFactors = factorData?.totp ?? [];
    setVerifiedFactors(activeFactors);
    setRequiresMfa(
      activeFactors.length > 0 &&
      assuranceData?.currentLevel !== "aal2" &&
      assuranceData?.nextLevel === "aal2",
    );
  }, []);

  useEffect(() => {
    if (!supabase) {
      onRequireSignIn();
      return;
    }

    let mounted = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return;
      if (!data.session) {
        onRequireSignIn();
        return;
      }
      setUser(data.session.user);
      setProfile(profileFromUser(data.session.user));
      setEmail(data.session.user.email ?? "");
      await loadSecurity();
      if (mounted) setCheckingSession(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        onRequireSignIn();
      } else {
        setUser(session.user);
      }
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, [loadSecurity, onRequireSignIn]);

  const savePersonalData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase || !user) return;
    setBusy(true);
    setMessage("");
    const { data, error } = await supabase.auth.updateUser({
      data: {
        first_name: profile.firstName.trim(),
        last_name: profile.lastName.trim(),
        address: profile.address.trim(),
        postcode: profile.postcode.trim(),
        city: profile.city.trim(),
        country: profile.country.trim(),
        phone_number: profile.phoneNumber.trim(),
      },
    });
    if (data.user) setUser(data.user);
    setMessage(error ? error.message : "Account information updated.");
    setBusy(false);
  };

  const saveEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase || !email.trim()) return;
    setBusy(true);
    setMessage("");
    const { error } = await supabase.auth.updateUser({ email: email.trim() });
    setMessage(error ? error.message : "Check your email to confirm your new address.");
    setBusy(false);
  };

  const savePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    if (password.next.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }
    if (password.next !== password.confirm) {
      setMessage("Passwords do not match.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: password.next });
    setPassword({ next: "", confirm: "" });
    setMessage(error ? error.message : "Password updated.");
    setBusy(false);
  };

  const enrollMfa = async () => {
    if (!supabase) return;
    setBusy(true);
    setMessage("");
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: "totp",
      friendlyName: "FrameLabs authenticator",
      issuer: "FrameLabs",
    });
    if (error) {
      setMessage(error.message);
    } else {
      setEnrollment({
        factorId: data.id,
        qrCode: data.totp.qr_code,
        secret: data.totp.secret,
      });
    }
    setBusy(false);
  };

  const verifyMfa = async (factorId: string, code: string) => {
    if (!supabase || !code.trim()) return;
    setBusy(true);
    setMessage("");
    const { error } = await supabase.auth.mfa.challengeAndVerify({
      factorId,
      code: code.trim(),
    });
    if (error) {
      setMessage(error.message);
    } else {
      setEnrollment(null);
      setMfaCode("");
      setRequiresMfa(false);
      setMessage("Two-step authentication is enabled.");
      await loadSecurity();
    }
    setBusy(false);
  };

  const disableMfa = async (factorId: string) => {
    if (!supabase) return;
    setBusy(true);
    setMessage("");
    const { error } = await supabase.auth.mfa.unenroll({ factorId });
    setMessage(error ? error.message : "Two-step authentication disabled.");
    if (!error) await loadSecurity();
    setBusy(false);
  };

  const signOut = async () => {
    if (!supabase) return;
    setBusy(true);
    await supabase.auth.signOut({ scope: "local" });
    onRequireSignIn();
  };

  if (checkingSession) {
    return <div className="min-h-screen bg-brand-bg" />;
  }

  if (requiresMfa && verifiedFactors[0]) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-bg px-6 font-body text-white">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void verifyMfa(verifiedFactors[0].id, mfaCode);
          }}
          className="w-full max-w-sm rounded-lg border border-brand-border bg-brand-surface-card p-7"
        >
          <ShieldCheck className="mb-5 h-8 w-8 text-brand-primary-light" />
          <h1 className="font-sora text-2xl font-bold">Verify your sign in</h1>
          <p className="mt-2 text-sm leading-relaxed text-brand-text-muted">
            Enter the six-digit code from your authenticator app to open your account.
          </p>
          {message && <p className="mt-5 text-sm text-brand-primary-light">{message}</p>}
          <input
            value={mfaCode}
            onChange={(event) => setMfaCode(event.target.value)}
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            placeholder="000000"
            className="auth-input mt-6 block w-full rounded-md px-4 py-3 font-mono text-white"
          />
          <button
            type="submit"
            disabled={busy}
            className="mt-4 w-full rounded-md bg-brand-primary px-4 py-3 text-sm font-bold transition hover:bg-brand-purple-hover disabled:opacity-50"
          >
            Verify
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-brand-bg font-body text-brand-text selection:bg-brand-purple/30 selection:text-white">
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
            <span className="font-sora text-xl font-bold tracking-tight text-white">FrameLabs</span>
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

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-9 sm:px-8 lg:flex-row lg:items-start">
        <aside className="w-full shrink-0 rounded-lg border border-brand-border bg-brand-surface-card p-3 lg:sticky lg:top-8 lg:w-72">
          <nav className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1" aria-label="Account sections">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setSection(id)}
                className={`flex min-h-15 items-center gap-4 rounded-lg px-4 text-left text-base transition ${
                  section === id
                    ? "bg-brand-primary font-semibold text-white"
                    : "text-brand-text hover:bg-white/5"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {label}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={signOut}
            disabled={busy}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-md border border-brand-border px-4 py-3 text-sm text-brand-text-muted transition hover:text-white disabled:opacity-50"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </aside>

        <section className="min-w-0 flex-1">
          {section === "account" && (
            <AccountDetails
              profile={profile}
              setProfile={setProfile}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              enrollment={enrollment}
              verifiedFactors={verifiedFactors}
              mfaCode={mfaCode}
              setMfaCode={setMfaCode}
              busy={busy}
              message={message}
              onSavePersonalData={savePersonalData}
              onSaveEmail={saveEmail}
              onSavePassword={savePassword}
              onEnrollMfa={enrollMfa}
              onVerifyMfa={verifyMfa}
              onDisableMfa={disableMfa}
            />
          )}
          {section === "products" && <EmptySection title="My products" text="Products you download or purchase will appear here." icon={Package} />}
          {section === "subscriptions" && <EmptySection title="My subscriptions" text="Active subscriptions will appear here." icon={Video} />}
          {section === "invoices" && <EmptySection title="Invoices" text="Invoices for completed purchases will appear here." icon={FileText} />}
        </section>
      </main>

      <PortalFooter onNavigate={onNavigate} onOpenFlowCut={onOpenFlowCut} onOpenContact={onOpenContact} />
    </div>
  );
}

interface AccountDetailsProps {
  profile: ProfileForm;
  setProfile: (profile: ProfileForm) => void;
  email: string;
  setEmail: (email: string) => void;
  password: { next: string; confirm: string };
  setPassword: (password: { next: string; confirm: string }) => void;
  enrollment: Enrollment | null;
  verifiedFactors: Factor[];
  mfaCode: string;
  setMfaCode: (code: string) => void;
  busy: boolean;
  message: string;
  onSavePersonalData: (event: FormEvent<HTMLFormElement>) => void;
  onSaveEmail: (event: FormEvent<HTMLFormElement>) => void;
  onSavePassword: (event: FormEvent<HTMLFormElement>) => void;
  onEnrollMfa: () => void;
  onVerifyMfa: (factorId: string, code: string) => void;
  onDisableMfa: (factorId: string) => void;
}

function AccountDetails(props: AccountDetailsProps) {
  const setField = (field: keyof ProfileForm, value: string) => props.setProfile({ ...props.profile, [field]: value });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-sora text-3xl font-bold text-white">My account</h1>
        <p className="mt-2 text-sm text-brand-text-muted">Manage your details and sign-in security.</p>
      </div>
      {props.message && (
        <p role="status" className="rounded-md border border-brand-border-high bg-brand-primary/10 p-4 text-sm text-brand-text">
          {props.message}
        </p>
      )}
      <form onSubmit={props.onSavePersonalData} className="rounded-lg border border-brand-border bg-brand-surface-card p-6">
        <h2 className="font-sora text-lg font-semibold text-white">Personal information</h2>
        <p className="mt-1 text-sm text-brand-text-muted">All personal information fields are optional.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            ["firstName", "First name", "given-name"],
            ["lastName", "Last name", "family-name"],
            ["address", "Address", "street-address"],
            ["postcode", "Postcode", "postal-code"],
            ["city", "City", "address-level2"],
            ["country", "Country", "country-name"],
            ["phoneNumber", "Phone number", "tel"],
          ].map(([field, label, autoComplete]) => (
            <label key={field} className="text-xs font-semibold uppercase text-brand-text-muted">
              {label}
              <input
                value={props.profile[field as keyof ProfileForm]}
                onChange={(event) => setField(field as keyof ProfileForm, event.target.value)}
                autoComplete={autoComplete}
                className="auth-input mt-2 block w-full rounded-md px-4 py-3 font-body text-sm font-normal normal-case text-white"
              />
            </label>
          ))}
        </div>
        <button disabled={props.busy} className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-purple-hover disabled:opacity-50">
          <Check className="h-4 w-4" />
          Save details
        </button>
      </form>

      <div className="grid gap-6 xl:grid-cols-2">
        <form onSubmit={props.onSaveEmail} className="rounded-lg border border-brand-border bg-brand-surface-card p-6">
          <h2 className="font-sora text-lg font-semibold text-white">Email address</h2>
          <p className="mt-1 text-sm text-brand-text-muted">Required for account access and confirmations.</p>
          <input
            type="email"
            required
            autoComplete="email"
            value={props.email}
            onChange={(event) => props.setEmail(event.target.value)}
            className="auth-input mt-6 block w-full rounded-md px-4 py-3 text-sm text-white"
          />
          <button disabled={props.busy} className="mt-4 rounded-md border border-brand-border-high px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/5 disabled:opacity-50">
            Update email
          </button>
        </form>
        <form onSubmit={props.onSavePassword} className="rounded-lg border border-brand-border bg-brand-surface-card p-6">
          <h2 className="font-sora text-lg font-semibold text-white">Password</h2>
          <p className="mt-1 text-sm text-brand-text-muted">Required for email sign in. Enter a new password to change it.</p>
          <div className="mt-6 space-y-3">
            <input type="password" autoComplete="new-password" placeholder="New password" value={props.password.next} onChange={(event) => props.setPassword({ ...props.password, next: event.target.value })} className="auth-input block w-full rounded-md px-4 py-3 text-sm text-white" />
            <input type="password" autoComplete="new-password" placeholder="Confirm new password" value={props.password.confirm} onChange={(event) => props.setPassword({ ...props.password, confirm: event.target.value })} className="auth-input block w-full rounded-md px-4 py-3 text-sm text-white" />
          </div>
          <button disabled={props.busy} className="mt-4 inline-flex items-center gap-2 rounded-md border border-brand-border-high px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/5 disabled:opacity-50">
            <KeyRound className="h-4 w-4" />
            Update password
          </button>
        </form>
      </div>

      <div className="rounded-lg border border-brand-border bg-brand-surface-card p-6">
        <h2 className="font-sora text-lg font-semibold text-white">Two-step authentication</h2>
        <p className="mt-1 text-sm text-brand-text-muted">Optional protection using an authenticator application.</p>
        {props.verifiedFactors.length > 0 ? (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-md border border-brand-border-high bg-brand-primary/10 p-4">
            <span className="inline-flex items-center gap-2 text-sm text-white"><ShieldCheck className="h-4 w-4 text-brand-primary-light" /> Enabled</span>
            <button type="button" onClick={() => props.onDisableMfa(props.verifiedFactors[0].id)} disabled={props.busy} className="text-sm text-brand-text-muted transition hover:text-white disabled:opacity-50">Disable</button>
          </div>
        ) : props.enrollment ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-[156px_1fr]">
            <img src={props.enrollment.qrCode} alt="Authenticator setup QR code" className="h-39 w-39 rounded-md bg-white p-2" />
            <div>
              <p className="text-sm text-brand-text-muted">Scan this code, then enter the generated six-digit code.</p>
              <p className="mt-2 break-all rounded bg-brand-bg p-2 font-mono text-xs text-brand-text">{props.enrollment.secret}</p>
              <div className="mt-4 flex gap-3">
                <input value={props.mfaCode} onChange={(event) => props.setMfaCode(event.target.value)} inputMode="numeric" autoComplete="one-time-code" placeholder="000000" className="auth-input min-w-0 flex-1 rounded-md px-4 py-2.5 font-mono text-sm text-white" />
                <button type="button" onClick={() => props.onVerifyMfa(props.enrollment!.factorId, props.mfaCode)} disabled={props.busy} className="rounded-md bg-brand-primary px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50">Verify</button>
              </div>
            </div>
          </div>
        ) : (
          <button type="button" onClick={props.onEnrollMfa} disabled={props.busy} className="mt-6 inline-flex items-center gap-2 rounded-md border border-brand-border-high px-4 py-3 text-sm font-medium text-white transition hover:bg-white/5 disabled:opacity-50">
            <ShieldCheck className="h-4 w-4" />
            Set up authenticator app
          </button>
        )}
      </div>
    </div>
  );
}

function EmptySection({ title, text, icon: Icon }: { title: string; text: string; icon: typeof Package }) {
  return (
    <div>
      <h1 className="font-sora text-3xl font-bold text-white">{title}</h1>
      <div className="mt-7 flex min-h-72 flex-col items-center justify-center rounded-lg border border-brand-border bg-brand-surface-card px-6 text-center">
        <Icon className="h-9 w-9 text-brand-text-muted" />
        <p className="mt-5 text-sm text-brand-text-muted">{text}</p>
      </div>
    </div>
  );
}
