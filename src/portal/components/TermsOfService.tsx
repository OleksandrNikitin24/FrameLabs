import React from "react";
import { Scale, ShieldAlert, Award, AlertCircle } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="animate-fade-in bg-brand-bg px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl">

        {/* Header Title */}
        <div className="mb-10 text-left">
          <h1 className="font-sora text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Terms of Service
          </h1>
          <div className="mt-3 flex items-center gap-3">
            <p className="font-mono text-xs uppercase tracking-widest text-[#9c93a8]">
              Effective Date: October 24, 2024
            </p>
            <div className="h-1 w-12 rounded bg-gradient-to-r from-brand-primary to-brand-secondary" />
          </div>
        </div>

        {/* Outer Paper */}
        <div className="rounded-xl border border-brand-border bg-brand-surface/40 p-6 shadow-2xl backdrop-blur-md sm:p-10">
          <div className="space-y-10 text-sm leading-relaxed text-brand-text/90">

            <div className="flex items-start gap-4">
              <Scale className="mt-1 h-5 w-5 text-brand-secondary shrink-0" />
              <div>
                <h2 className="font-sora text-lg font-semibold text-white mb-2">1. Agreement to Terms</h2>
                <p className="text-brand-text-muted">
                  By downloading, installing, or purchasing any workspace software or creative plugins produced by FrameLabs, you agree to be bound by these Terms of Service. If you do not agree to all provisions within this contract, you are strictly prohibited from utilizing our tools, software, or extensions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Award className="mt-1 h-5 w-5 text-brand-primary shrink-0" />
              <div>
                <h2 className="font-sora text-lg font-semibold text-white mb-2">2. Single-Seat License Grant</h2>
                <p className="text-brand-text-muted">
                  Unless otherwise specified by an Enterprise License agreement, purchases of FlowCut Pro or Precision Tracker 3D grant you a non-exclusive, non-transferable, revocable single-user seat. The seat authorizes activation on up to two distinct creative workstations owned or leased specifically by the licensee, provided that the software is not run simultaneously on both machines.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <ShieldAlert className="mt-1 h-5 w-5 text-brand-tertiary shrink-0" />
              <div>
                <h2 className="font-sora text-lg font-semibold text-white mb-2">3. Prohibited Exploitation & Piracy</h2>
                <p className="text-brand-text-muted">
                  Licensees are strictly forbidden from reverse-engineering, decompiling, or extracting host shaders from our compiled plugins. Distributing cracked binaries, licensing key-generators, or bypassing our hardware UUID check servers will result in the immediate revocation of your seating subscription and potential legal enforcement under international trademark protection acts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <AlertCircle className="mt-1 h-5 w-5 text-brand-primary-light shrink-0" />
              <div>
                <h2 className="font-sora text-lg font-semibold text-white mb-2">4. Disclaimer of Liability</h2>
                <p className="text-brand-text-muted">
                  FrameLabs software applications are provided &quot;as is&quot; without warranties of any kind. Since creative workflows involve external engines (e.g., Premiere Pro, DaVinci Resolve), FrameLabs is not responsible for hardware crashes, rendering delays, lost project timelines, or physical GPU performance thermal overages resulting from continuous real-time execution of video effect shaders.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
