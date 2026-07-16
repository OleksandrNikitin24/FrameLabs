import {
  Scissors,
  Clapperboard,
  FileText,
  MicVocal,
  Sparkles,
  Video,
  SlidersHorizontal,
  ShieldCheck,
} from "lucide-react";

const FEATURES = [
  {
    icon: Scissors,
    title: "Automatic silence removal",
    body: "Detects quiet sections frame by frame with adjustable threshold, pre-roll, post-roll, and minimum strip length. Keep speech edges clean with optional crossfades and voice-boundary snapping — remove silence, leave gaps, blade at silence, or just tag it.",
  },
  {
    icon: Clapperboard,
    title: "Final Cut Pro workflow",
    body: "Import your current Final Cut project or FCPXML and export clean, editable FCPXML. Preserves useful timeline metadata like roles, source timecode, keywords, markers, and frame rate.",
  },
  {
    icon: FileText,
    title: "Script-based cutting",
    body: "Attach a script as TXT, RTF, or PDF. FlowCut transcribes the timeline and compares it to your script, flagging off-script phrases, repeated takes, improvised lines, and missing sections — you review before cutting.",
  },
  {
    icon: MicVocal,
    title: "Local transcription",
    body: "Bundled Whisper tooling runs locally, producing word-level timestamps that power transcript review and script matching. Your media doesn't need to be uploaded for the local workflow.",
  },
  {
    icon: Sparkles,
    title: "Bad-take & filler review",
    body: "Detects filler words, long pauses, repeated words, stutters, and false starts. Local AI-assisted review offers suggestions you approve — not automatic magic — so you stay in control.",
  },
  {
    icon: Video,
    title: "Multicam-aware controls",
    body: "Analyze camera angles and preserve multicam sync. Apply cuts to the active, selected, or all angles, and score angle quality to help plan switches.",
  },
  {
    icon: SlidersHorizontal,
    title: "Professional control panel",
    body: "Presets plus CPU, memory, cache, and processing controls. Debug and reporting tools, with export naming, destination, and metadata settings.",
  },
];

const TRUST = [
  "Runs on your Mac",
  "Editable FCPXML output",
  "Designed for Final Cut Pro editors",
  "Review before destructive edits",
  "License activation & trial support",
];

export function FlowCutFeatures() {
  return (
    <section className="bg-canvas">
      <div className="mx-auto max-w-[980px] px-6 py-24 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[14px] font-semibold tracking-[-0.224px] text-action">Core features</span>
          <h2 className="mt-3 font-sans text-[34px] font-semibold leading-[1.1] tracking-[-0.374px] text-ink sm:text-[40px]">
            Everything FlowCut does.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[19px] leading-[1.4] tracking-[-0.011em] text-ink-48">
            A focused toolset for cleaning up dialogue timelines in Final Cut Pro — local, editable, and always reviewable before a cut is made.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="store-card flex flex-col p-6 text-left">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-action/10">
                  <Icon className="h-5 w-5 text-action" />
                </div>
                <h3 className="mb-2 font-sans text-[19px] font-semibold tracking-[-0.374px] text-ink">{f.title}</h3>
                <p className="text-[15px] leading-[1.5] text-ink-48">{f.body}</p>
              </div>
            );
          })}
        </div>

        {/* Trust row */}
        <div className="mt-10 rounded-[18px] border border-hairline bg-parchment p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TRUST.map((t) => (
              <div key={t} className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 shrink-0 text-action" />
                <span className="text-[15px] text-ink-80">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
