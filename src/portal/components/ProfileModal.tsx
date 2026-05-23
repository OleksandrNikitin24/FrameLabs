import React, { useState } from "react";
import { X, Fingerprint, LogOut, Check, Activity, ShieldCheck, Mail, Key, UserCheck } from "lucide-react";
import { AppTab } from "../types";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: AppTab) => void;
}

export default function ProfileModal({ isOpen, onClose, setActiveTab }: ProfileModalProps) {
  const [userEmail, setUserEmail] = useState("creative.director@studio.is");
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 1500);
  };

  return (
    <div id="profile-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg overflow-hidden rounded-xl border border-brand-border bg-brand-surface-card p-6 shadow-2xl">

        {/* Header Title */}
        <div className="flex items-start justify-between border-b border-brand-border pb-4 mb-4">
          <div>
            <h3 className="font-sora text-lg font-bold text-white flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-brand-secondary" />
              Editor Workspace Profile
            </h3>
            <p className="text-[10px] font-mono text-brand-text-muted mt-1 uppercase tracking-wider">
              Single-User License Key Manager
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded hover:bg-brand-surface p-1 text-brand-text-muted hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content layout */}
        <div className="space-y-5">

          {/* Email modification form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label htmlFor="pref-email" className="font-mono text-[10px] uppercase tracking-wider text-brand-text-muted block mb-1.5">
                Registered Contact Address:
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-brand-text-muted" />
                  <input
                    id="pref-email"
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full rounded border border-brand-border bg-[#0a0a0f] pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-brand-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded bg-brand-surface border border-brand-border hover:border-brand-primary px-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-200"
                >
                  {saved ? <Check className="h-4 w-4 text-green-400" /> : "Update"}
                </button>
              </div>
            </div>
          </form>

          {/* Hashed hardware fingerprint display box */}
          <div className="rounded-lg bg-black/40 border border-brand-border p-4 space-y-3">
            <h4 className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-brand-primary-light border-b border-brand-border/40 pb-2">
              <Fingerprint className="h-4 w-4" /> Active Host Machine Telemetry Tag
            </h4>

            <div className="grid grid-cols-2 gap-4 text-[10px] font-mono leading-relaxed">
              <div>
                <span className="block text-brand-text-muted">Licenced ID:</span>
                <span className="text-white hover:text-brand-secondary">FL-UID-093-XQZ</span>
              </div>
              <div>
                <span className="block text-brand-text-muted">System Hash (Salted Sha-256):</span>
                <span className="text-white select-all">sha256:4a02beff8d12c</span>
              </div>
              <div>
                <span className="block text-brand-text-muted">Seating Capacity:</span>
                <span className="text-white">1 of 2 active allocations</span>
              </div>
              <div>
                <span className="block text-brand-text-muted">Licence Connection:</span>
                <span className="text-green-400">Offline Seat Validated</span>
              </div>
            </div>
          </div>

          {/* Quick links to GDPR right portals */}
          <div className="space-y-2 pt-2">
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#9c93a8]">
              Compliance & Data Rights Actions:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setActiveTab("gdpr");
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-1 rounded bg-brand-surface border border-brand-border hover:border-brand-secondary py-2 text-center font-sans text-[11px] font-bold uppercase text-brand-secondary transition-all"
              >
                Launch Access Export
              </button>
              <button
                onClick={() => {
                  setActiveTab("gdpr");
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-1 rounded bg-brand-surface border border-brand-border hover:border-red-500 py-2 text-center font-sans text-[11px] font-bold uppercase text-red-400 transition-all"
              >
                Request Absolute Purge
              </button>
            </div>
          </div>

        </div>

        {/* Footer statements */}
        <div className="mt-6 border-t border-brand-border pt-4 text-center">
          <p className="text-[10px] font-mono text-brand-text-muted flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-primary-light" />
            Complies with EU General Data Protection Regulations Article 13.
          </p>
        </div>

      </div>
    </div>
  );
}
