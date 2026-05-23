import React, { useState } from "react";
import {
  Info,
  Database,
  Settings,
  ShieldCheck,
  Fingerprint,
  Cookie,
  Mail,
  Building,
  ArrowUpRight,
  Check,
  Copy,
  HelpCircle,
  Hash
} from "lucide-react";
import { AppTab } from "../types";

interface PrivacyPolicyProps {
  onSetActiveTab: (tab: AppTab) => void;
}

export default function PrivacyPolicy({ onSetActiveTab }: PrivacyPolicyProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [focusedStat, setFocusedStat] = useState<string | null>(null);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("privacy@framelabs.io");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="animate-fade-in bg-brand-bg px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl">

        {/* Page Title Header */}
        <div id="policy-header" className="mb-10 text-left">
          <h1 className="font-sora text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Privacy Policy
          </h1>
          <div className="mt-3 flex items-center gap-3">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-primary-light">
              Last Updated: October 24, 2024
            </p>
            <div className="h-1 w-12 rounded bg-gradient-to-r from-brand-primary to-brand-secondary" />
          </div>
        </div>

        {/* Master Document Panel */}
        <div
          id="policy-doc-container"
          className="relative rounded-xl border border-brand-border bg-brand-surface/40 p-6 shadow-2xl backdrop-blur-md sm:p-10"
        >

          <div className="space-y-12">

            {/* Section 1: Introduction */}
            <div id="sec-1" className="group/sec">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border bg-brand-surface/65 text-brand-primary transition-colors group-hover/sec:border-brand-primary/40">
                  <Info className="h-5 w-5" />
                </div>
                <h2 className="font-sora text-xl font-semibold tracking-tight text-white">
                  1. Introduction
                </h2>
              </div>
              <p className="pl-13 text-sm leading-relaxed text-brand-text/90">
                Welcome to FrameLabs. We are dedicated to providing motion professionals with precision tools while respecting your privacy. This Privacy Policy describes how FrameLabs (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and shares your personal information when you use our website, extensions, or software services. By accessing our platform, you agree to the terms outlined in this document.
              </p>
            </div>

            {/* Section 2: Information Collection */}
            <div id="sec-2" className="group/sec">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border bg-brand-surface/65 text-brand-primary transition-colors group-hover/sec:border-brand-primary/40">
                  <Database className="h-5 w-5" />
                </div>
                <h2 className="font-sora text-xl font-semibold tracking-tight text-white">
                  2. Information Collection
                </h2>
              </div>

              <div className="pl-13">
                <div className="grid gap-6 sm:grid-cols-2">

                  {/* Direct Data Subcard */}
                  <div
                    onClick={() => setFocusedStat(focusedStat === "direct" ? null : "direct")}
                    className="cursor-pointer rounded-lg border border-brand-border bg-[#100d16] p-5 transition-all duration-200 hover:border-brand-primary/30 hover:bg-[#15111d]"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <p className="font-mono text-xs uppercase tracking-wider text-brand-primary-light">
                        Direct Data
                      </p>
                      <span className="rounded bg-brand-primary/10 px-1.5 py-0.5 font-mono text-[9px] text-brand-primary-light">
                        Client Inputs
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-brand-text-muted">
                      We collect email addresses, billing information, and account preferences when you register or purchase licenses.
                    </p>
                    {focusedStat === "direct" && (
                      <div className="mt-3 border-t border-brand-border pt-3 font-mono text-[10px] text-brand-text/75 animate-fade-in">
                        🔑 Stripe Integration (PCI-DSS secure). Account info is stored under AES-256 local database servers.
                      </div>
                    )}
                  </div>

                  {/* Technical Logs Subcard */}
                  <div
                    onClick={() => setFocusedStat(focusedStat === "tech" ? null : "tech")}
                    className="cursor-pointer rounded-lg border border-[#221e28] bg-[#14121a] p-5 transition-all duration-200 hover:border-brand-secondary/30 hover:bg-[#1a1822]"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <p className="font-mono text-xs uppercase tracking-wider text-brand-secondary">
                        Technical Logs
                      </p>
                      <span className="rounded bg-brand-secondary/10 px-1.5 py-0.5 font-mono text-[9px] text-brand-secondary">
                        Hardware Fingerprint
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-brand-text-muted">
                      Hardware ID, OS version, and application performance metrics are collected to ensure license integrity and software stability.
                    </p>
                    {focusedStat === "tech" && (
                      <div className="mt-3 border-t border-brand-border pt-3 font-mono text-[10px] text-brand-text/75 animate-fade-in">
                        ⚙️ Salt hashed sha-256 system fingerprint metadata, GPU shader execution timelines, Host version metadata model logs.
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>

            {/* Section 3: Use of Information */}
            <div id="sec-3" className="group/sec">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border bg-brand-surface/65 text-brand-primary transition-colors group-hover/sec:border-brand-primary/40">
                  <Settings className="h-5 w-5" />
                </div>
                <h2 className="font-sora text-xl font-semibold tracking-tight text-white">
                  3. Use of Information
                </h2>
              </div>

              <div className="pl-13">
                <p className="mb-4 text-sm leading-relaxed text-brand-text/90">
                  We utilize the gathered data to enhance your creative workflow. Specifically:
                </p>
                <div className="space-y-3">
                  {[
                    "Validating and managing your product licenses and subscriptions.",
                    "Optimizing plugin performance based on hardware telemetry.",
                    "Providing technical support and troubleshooting critical errors.",
                    "Sending updates regarding new features or security patches."
                  ].map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-primary/20 text-brand-primary-light">
                        <Check className="h-2.5 w-2.5" />
                      </div>
                      <span className="text-xs leading-relaxed text-brand-text-muted">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 4: Data Protection */}
            <div id="sec-4" className="group/sec">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border bg-brand-surface/65 text-brand-primary transition-colors group-hover/sec:border-brand-primary/40">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h2 className="font-sora text-xl font-semibold tracking-tight text-white">
                  4. Data Protection
                </h2>
              </div>

              <div className="pl-13">
                <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-brand-primary/10 to-transparent p-5 pl-6 border border-brand-border-high">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary shadow-[0_0_15px_#7C3AED]" />
                  <p className="text-xs leading-relaxed text-brand-text italic font-medium">
                    FrameLabs employs industry-standard AES-256 encryption for data at rest and TLS 1.3 for all data in transit. We conduct regular security audits to protect against unauthorized access, alteration, or destruction of your personal workspace data.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 5: User Rights */}
            <div id="sec-5" className="group/sec">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border bg-brand-surface/65 text-brand-primary transition-colors group-hover/sec:border-brand-primary/40">
                  <Fingerprint className="h-5 w-5" />
                </div>
                <h2 className="font-sora text-xl font-semibold tracking-tight text-white">
                  5. User Rights
                </h2>
              </div>

              <div className="pl-13">
                <p className="text-sm leading-relaxed text-brand-text/90">
                  Under GDPR and CCPA regulations, you have the right to access, rectify, or delete your personal information. You may request a data export of your account activity or withdraw consent for marketing communications at any time through your Profile settings.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => onSetActiveTab("gdpr")}
                    className="inline-flex items-center gap-1.5 rounded border border-brand-border bg-brand-surface/60 px-3 py-1.5 font-sans text-[11px] font-bold uppercase tracking-wider text-brand-secondary transition-all hover:bg-brand-surface hover:border-brand-secondary"
                  >
                    GDPR Right to Access Portal <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Section 6: Cookies */}
            <div id="sec-6" className="group/sec">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border bg-brand-surface/65 text-brand-primary transition-colors group-hover/sec:border-brand-primary/40">
                  <Cookie className="h-5 w-5" />
                </div>
                <h2 className="font-sora text-xl font-semibold tracking-tight text-white">
                  6. Cookies
                </h2>
              </div>
              <p className="pl-13 text-sm leading-relaxed text-brand-text/90">
                Our website uses essential and performance cookies to maintain your session and analyze traffic. You can manage your cookie preferences through your browser settings, though some marketplace features may be limited if essential cookies are disabled.
              </p>
            </div>

            {/* Section 7: Contact Information */}
            <div id="sec-7" className="group/sec">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border bg-brand-surface/65 text-brand-primary transition-colors group-hover/sec:border-brand-primary/40">
                  <Mail className="h-5 w-5" />
                </div>
                <h2 className="font-sora text-xl font-semibold tracking-tight text-white">
                  7. Contact Information
                </h2>
              </div>

              <div className="pl-13">
                <p className="mb-5 text-sm leading-relaxed text-brand-text-muted">
                  For any questions regarding this Privacy Policy or our data practices, please contact our Data Protection Officer:
                </p>

                <div className="grid gap-4 sm:grid-cols-2">

                  {/* Email Support Card */}
                  <div className="group/card relative overflow-hidden rounded-lg border border-brand-border bg-[#14121a] p-4 transition-all hover:border-brand-border-high">
                    <div className="mb-1.5 flex items-center justify-between">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-[#9c93a8]">
                        Email Support
                      </p>
                      <button
                        onClick={copyEmailToClipboard}
                        className="rounded p-1 hover:bg-brand-surface/80"
                        title="Copy email lookup"
                      >
                        {copiedEmail ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5 text-brand-primary-light" />}
                      </button>
                    </div>
                    <p className="font-mono text-xs font-semibold text-white">
                      privacy@framelabs.io
                    </p>
                  </div>

                  {/* Physical Address Card */}
                  <div className="group/card relative overflow-hidden rounded-lg border border-brand-border bg-[#14121a] p-4">
                    <div className="mb-1.5 flex items-center justify-between">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-[#9c93a8]">
                        Physical Office
                      </p>
                      <Building className="h-3.5 w-3.5 text-brand-secondary" />
                    </div>
                    <p className="font-sans text-xs font-semibold text-white">
                      110 High Contrast Way, Tech District, SF
                    </p>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Dynamic FAQ redirect Card banner */}
        <div id="faq-referral" className="mt-8 rounded-lg border border-brand-border/85 bg-brand-surface-card/30 p-8 text-center backdrop-blur-sm">
          <p className="text-sm font-medium text-brand-text-muted">
            Have more questions about how we handle your data?
          </p>
          <button
            onClick={() => onSetActiveTab("support")}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded bg-brand-surface-bright/20 border border-brand-border px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all duration-200 hover:bg-brand-surface hover:border-brand-primary"
          >
            View FAQ & Chat Assistant <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
