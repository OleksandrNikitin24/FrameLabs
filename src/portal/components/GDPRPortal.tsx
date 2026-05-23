import React, { useState } from "react";
import {
  ShieldCheck,
  ArrowRight,
  Download,
  Trash2,
  RefreshCw,
  Clock,
  FileText,
  Layers,
  Sparkles,
  Fingerprint,
  Activity,
  UserCheck
} from "lucide-react";
import { GDPRRequestResult } from "../types";

export default function GDPRPortal() {
  const [email, setEmail] = useState("");
  const [requestType, setRequestType] = useState<"export" | "forget">("export");
  const [consentChecked, setConsentChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeRequest, setActiveRequest] = useState<GDPRRequestResult | null>(null);
  const [requestHistory, setRequestHistory] = useState<GDPRRequestResult[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consentChecked) return;

    setLoading(true);
    window.setTimeout(() => {
      const referenceID = `FL-GDPR-${Date.now().toString().slice(-8)}`;
      const result: GDPRRequestResult = requestType === "export" ? {
        success: true,
        referenceID,
        email,
        dataType: "Full Workspace Profile Bundle",
        estimatedDelivery: "Available now",
        packageInfo: {
          user_identity: { email, role: "Workspace License Holder" },
          direct_data: {
            account_registered: "2026-05-23",
            active_subscriptions: ["FlowCut Pro"],
            billing_provider: "Stripe",
            card_stored_on_framelabs_servers: "No"
          },
          technical_logs: {
            last_hardware_fingerprint_hash: "sha256:4a02beff8d12c",
            recorded_os_families: ["macOS"],
            license_verification_handshakes: 1,
            unauthorized_execution_alerts: 0
          }
        }
      } : {
        success: true,
        referenceID,
        email,
        action: "Right to deletion request queued",
        status: "Verification pending"
      };
      setActiveRequest(result);
      setRequestHistory(prev => [result, ...prev]);
      setLoading(false);
    }, 900);
  };

  const downloadSimulatedJSON = () => {
    if (!activeRequest) return;
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(activeRequest, null, 2)
    )}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", `framelabs_gdpr_export_${activeRequest.referenceID}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="animate-fade-in bg-brand-bg px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">

        {/* Header Title Grid */}
        <div id="gdpr-header" className="mb-12 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-secondary/30 bg-brand-secondary/10 px-3 py-1 text-xs font-semibold text-brand-secondary">
            <UserCheck className="h-3.5 w-3.5" />
            <span>GDPR Art. 15 / CCPA Privacy Compliance Center</span>
          </div>
          <h1 className="mt-4 font-sora text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Customer Rights & Data Portability
          </h1>
          <p className="mt-3 max-w-2xl text-base text-brand-text-muted">
            Fulfill your regulatory rights instantly. Request a portable cryptographic export of all compiled licensing logs or initiate the Right to Be Forgotten.
          </p>
        </div>

        {/* Form and Simulator Split Section */}
        <div className="grid gap-8 lg:grid-cols-12">

          {/* Submission Form Section */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-brand-border bg-brand-surface/40 p-6 shadow-xl backdrop-blur-md">
              <h3 className="font-sora text-lg font-bold text-white mb-6">
                Submit Regulatory Request
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Request Selection tabs */}
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-brand-text-muted block mb-3">
                    Request Action Type:
                  </label>
                  <div className="grid grid-cols-2 gap-3">

                    <button
                      type="button"
                      onClick={() => setRequestType("export")}
                      className={`flex flex-col items-center justify-center rounded-lg border p-4 text-center transition-all duration-200
                        ${requestType === "export"
                          ? "border-brand-primary bg-brand-primary/10 text-white"
                          : "border-brand-border bg-black/25 text-brand-text-muted hover:border-brand-border-high hover:text-white"
                        }`}
                    >
                      <Download className="h-5 w-5 mb-2 text-brand-secondary" />
                      <span className="font-sora text-xs font-bold">Data Export</span>
                      <span className="font-mono text-[9px] mt-1 text-brand-text-muted opacity-85">Art. 15 Right to Access</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRequestType("forget")}
                      className={`flex flex-col items-center justify-center rounded-lg border p-4 text-center transition-all duration-200
                        ${requestType === "forget"
                          ? "border-brand-primary bg-brand-primary/10 text-white"
                          : "border-brand-border bg-black/25 text-brand-text-muted hover:border-brand-border-high hover:text-white"
                        }`}
                    >
                      <Trash2 className="h-5 w-5 mb-2 text-brand-tertiary" />
                      <span className="font-sora text-xs font-bold">Wipe Credentials</span>
                      <span className="font-mono text-[9px] mt-1 text-brand-text-muted opacity-85">Art. 17 Forgotten Purge</span>
                    </button>

                  </div>
                </div>

                {/* Secure email entry */}
                <div>
                  <label htmlFor="gdpr-email" className="font-mono text-[10px] uppercase tracking-wider text-brand-text-muted block mb-2">
                    Billing / Registration Email address:
                  </label>
                  <input
                    id="gdpr-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. creative@editor.io"
                    className="w-full rounded border border-brand-border bg-black/45 px-4 py-3 text-sm text-white placeholder-brand-text-muted outline-none transition-all duration-200 focus:border-brand-primary focus:shadow-[0_0_12px_rgba(124,58,237,0.15)]"
                  />
                </div>

                {/* Consent checkbox statement */}
                <div className="rounded-lg bg-black/20 p-4 border border-brand-border/60">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={consentChecked}
                      onChange={(e) => setConsentChecked(e.target.checked)}
                      className="mt-1 accent-brand-primary"
                    />
                    <span className="text-xs leading-relaxed text-brand-text-muted">
                      I certify that I am the legitimate holder/licensee of the email address provided above, and understand that compliance actions are logged and cryptographically signed to prevent security spoofing.
                    </span>
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading || !consentChecked}
                  className="w-full flex items-center justify-center gap-2 rounded bg-brand-primary py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-brand-primary/15 transition-all duration-200 hover:bg-brand-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" /> Verifying Records...
                    </>
                  ) : (
                    <>
                      Fulfill Verification <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

          {/* Verification Results Panel (Simulator Output) */}
          <div className="lg:col-span-7">
            <div className="flex h-full flex-col justify-between rounded-xl border border-brand-border bg-brand-surface/40 p-6 shadow-xl backdrop-blur-md">

              <div>
                <div className="mb-4 flex items-center justify-between border-b border-brand-border pb-4">
                  <h3 className="font-sora text-lg font-bold text-white flex items-center gap-2">
                    <Fingerprint className="h-5 w-5 text-brand-primary-light" />
                    Response Package Analyzer
                  </h3>
                  <span className="flex items-center gap-1.5 rounded-full bg-brand-secondary/15 px-2.5 py-1 font-mono text-[9px] font-bold uppercase text-brand-secondary">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-secondary animate-pulse" />
                    Connected
                  </span>
                </div>

                {activeRequest ? (
                  <div className="space-y-4 animate-fade-in">

                    {/* Signed Cryptographic Receipt header */}
                    <div className="rounded bg-[#0e0c14]/90 border border-brand-border p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-mono text-[10px] text-brand-primary-light uppercase tracking-wider">
                            Signed GDPR Compliance Receipt
                          </p>
                          <h4 className="mt-1 font-sora text-sm font-bold text-white">
                            ID: {activeRequest.referenceID}
                          </h4>
                        </div>
                        <button
                          onClick={downloadSimulatedJSON}
                          className="flex items-center gap-1.5 rounded bg-brand-surface px-2.5 py-1.5 font-sans text-[10px] uppercase font-bold text-brand-secondary border border-brand-border hover:bg-brand-surface-card transition-all"
                        >
                          <Download className="h-3 w-3" /> Download JSON
                        </button>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-brand-border/60 pt-4 font-mono text-[10px] text-brand-text-muted">
                        <div>
                          <span className="block text-[#9c93a8]">Target Identity:</span>
                          <span className="text-white font-medium">{activeRequest.email}</span>
                        </div>
                        <div>
                          <span className="block text-[#9c93a8]">Release Authority:</span>
                          <span className="text-white font-medium">FrameLabs Security Officer</span>
                        </div>
                      </div>
                    </div>

                    {/* Dumped Data Tree */}
                    {activeRequest.packageInfo ? (
                      <div className="rounded-lg bg-black/60 border border-brand-border p-4 font-mono text-xs">
                        <div className="mb-2 flex items-center justify-between text-[10px] text-[#9c93a8] border-b border-brand-border/40 pb-2">
                          <span>Verified Database Fields (GDPR Art. 15 Bundle)</span>
                          <span className="text-brand-secondary/90">Decrypted</span>
                        </div>
                        <pre className="max-h-60 overflow-y-auto text-brand-text/90 leading-relaxed text-[10px] space-y-1">
                          {JSON.stringify(activeRequest.packageInfo, null, 2)}
                        </pre>
                      </div>
                    ) : (
                      <div className="rounded-lg bg-black/60 border border-brand-border p-5 text-center font-mono">
                        <Trash2 className="h-8 w-8 text-brand-tertiary mx-auto mb-2" />
                        <h4 className="text-xs text-brand-tertiary uppercase font-bold">Wipe Ticket Initialized ({activeRequest.referenceID})</h4>
                        <p className="text-[10px] text-brand-text-muted mt-2 leading-relaxed">
                          The target mailbox registration logs have been quarantined. All salted motherboard serialization tags and performance logs associated with email <strong className="text-white">{activeRequest.email}</strong> will be purged under safe compliance bounds.
                        </p>
                      </div>
                    )}

                  </div>
                ) : (
                  <div className="flex h-80 flex-col items-center justify-center text-center p-8 bg-black/10 border border-dashed border-brand-border rounded-lg">
                    <Clock className="h-10 w-10 text-brand-text-muted/65 mb-3" />
                    <p className="text-sm font-semibold text-brand-text">
                      Awaiting Action Submission
                    </p>
                    <p className="max-w-xs text-xs text-brand-text-muted mt-2">
                      Submit an access or deletion request on the left. The compiler will instantly process transaction metrics on our secure Cloud Run nodes and print structural data outputs here.
                    </p>
                  </div>
                )}
              </div>

              {/* Secure statement footnote */}
              <div className="mt-6 border-t border-brand-border pt-4 text-center">
                <p className="text-[10px] font-mono text-brand-text-muted flex items-center justify-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-brand-primary-light" />
                  Local workspace telemetry checks strictly comply with CCPA §1798.115 rules.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
