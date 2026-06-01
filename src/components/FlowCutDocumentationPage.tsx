import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import {
  Activity,
  Apple,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Copy,
  Cpu,
  Disc,
  Download,
  FileQuestion,
  FileSpreadsheet,
  HardDriveUpload,
  Info,
  KeyRound,
  Layers,
  Menu,
  Monitor,
  Pause,
  Play,
  RefreshCw,
  RotateCcw,
  Scissors,
  Search,
  Shield,
  ShoppingCart,
  Smile,
  Sparkles,
  Terminal,
  Video,
  Volume2,
  Wrench,
  X,
} from "lucide-react";
import { AppTab } from "../portal/types";
import CartDrawer from "../portal/components/CartDrawer";

type DocPageId =
  | "introduction"
  | "quickstart"
  | "interface"
  | "integrations"
  | "compatibility"
  | "videos"
  | "faq"
  | "report-issue"
  | "analyzing-media"
  | "machine-learning"
  | "local-offline"
  | "licensing"
  | "standalone-app"
  | "final-cut-pro";

interface FlowCutDocumentationPageProps {
  onNavigate: (page: AppTab) => void;
  onOpenFlowCut: () => void;
  onOpenContact: () => void;
  onOpenAccount: () => void;
  onOpenDocumentation: () => void;
  isCartOpen: boolean;
  onCartOpen: () => void;
  onCartClose: () => void;
}

interface DocSectionContent {
  id: DocPageId;
  title: string;
  breadcrumbs: string[];
  subtitle: string;
  sections: {
    heading: string;
    anchor: string;
    body: string;
    code?: string;
    lang?: string;
  }[];
  nextPage?: {
    id: DocPageId;
    label: string;
  };
}

interface DiagnosticTicket {
  id: string;
  title: string;
  module: string;
  priority: "Low" | "Medium" | "High";
  status: "INVESTIGATING" | "PATCH_QUEUED" | "RESOLVED";
  timestamp: string;
}

interface AudioBlock {
  id: number;
  height: number;
}

interface MockClip {
  id: string;
  start: string;
  end: string;
  duration: string;
  speechProbability: number;
  status: "Keep" | "Cut" | "Restored";
}

const navSections: {
  title: string;
  items: { id: DocPageId; label: string; badge?: string; hasChevron?: boolean }[];
}[] = [
  {
    title: "GET STARTED",
    items: [
      { id: "introduction", label: "Introduction" },
      { id: "quickstart", label: "Quickstart" },
      { id: "interface", label: "Interface" },
      { id: "integrations", label: "Integrations" },
      { id: "compatibility", label: "Compatibility" },
      { id: "videos", label: "Videos" },
      { id: "faq", label: "FAQ" },
      { id: "report-issue", label: "Report an issue" },
    ],
  },
  {
    title: "CORE CONCEPTS",
    items: [
      { id: "analyzing-media", label: "Analyzing media" },
      { id: "machine-learning", label: "Machine Learning", badge: "NEW" },
      { id: "local-offline", label: "Local and Offline" },
      { id: "licensing", label: "Licensing" },
    ],
  },
  {
    title: "PLATFORMS",
    items: [
      { id: "standalone-app", label: "Standalone App" },
      { id: "final-cut-pro", label: "Final Cut Pro", hasChevron: true },
    ],
  },
];

const docPages: Record<DocPageId, DocSectionContent> = {
  introduction: {
    id: "introduction",
    title: "FlowCut Documentation",
    breadcrumbs: ["Get Started", "FlowCut Documentation"],
    subtitle:
      "FlowCut is an AI silence removal tool for video editors. Search and cut your footage instantly and offline with next-generation Neural Engine accelerators.",
    sections: [
      {
        heading: "How it works",
        anchor: "how-it-works",
        body:
          "FlowCut hooks directly into your system GPU, analyzing media locally on your machine at up to 100x playback speed. It extracts vocal frequencies, maps out silence boundaries using advanced Voice Activity Detection (VAD), and lets you search visually through human faces or objects.",
      },
      {
        heading: "Key Features",
        anchor: "key-features",
        body:
          "Designed for professional non-linear editors (NLEs), FlowCut includes cutting-edge features that completely automate pre-cutting and raw footage formatting.",
      },
      {
        heading: "Explore more",
        anchor: "explore-more",
        body:
          "Whether you use Final Cut Pro or the standalone app, FlowCut converts tedious scanning into automated cutting. Jump straight to the Quickstart guide to install the native app.",
      },
    ],
    nextPage: { id: "quickstart", label: "Quickstart" },
  },
  quickstart: {
    id: "quickstart",
    title: "Quickstart Guide",
    breadcrumbs: ["Get Started", "Quickstart"],
    subtitle: "Get up and running with FlowCut in under 3 minutes. Download, install, and run your first automated cut sequence.",
    sections: [
      {
        heading: "1. Download the Native Engine",
        anchor: "download-engine",
        body: "FlowCut requires the native helper application to run high-speed offline processing. Choose your platform below to download the latest stable release.",
      },
      {
        heading: "2. Activate Your Copy",
        anchor: "activate-copy",
        body: "Once installed, activate your workspace. Enter your key to unlock processing, frame-based parsing, and batch exports.",
      },
      {
        heading: "3. Install Final Cut Pro Connector",
        anchor: "install-plugins",
        body: "Install the connector for Final Cut Pro so FlowCut can write timeline XML output into your editorial workflow.",
      },
      {
        heading: "4. Your First Cut Sequence",
        anchor: "first-cut",
        body: 'Open FlowCut, drag in an audio or video file, tweak your dB threshold and frame padding, then hit "Import to FCP" to load your cut timeline.',
        code: "flowcut core --input ./raw-podcast.mp4 --threshold -29 --min-silence 2frames --export-to fcpxml",
        lang: "bash",
      },
    ],
    nextPage: { id: "interface", label: "Interface Overview" },
  },
  interface: {
    id: "interface",
    title: "Interface Overview",
    breadcrumbs: ["Get Started", "Interface"],
    subtitle: "An introduction to the FlowCut desktop app workspace layout, waveform visualizer, and vocal threshold controls.",
    sections: [
      {
        heading: "The Main Workspace Elements",
        anchor: "workspace-elements",
        body:
          "The FlowCut application layout is split into waveform preview, preset selection, frame controls, and import/export actions tailored to editorial accuracy.",
      },
      {
        heading: "Waveform Editing Controls",
        anchor: "waveform-controls",
        body:
          "The central display highlights speech and silence regions. You can adjust dB threshold, pre-roll, post-roll, and minimum strip duration in frames.",
      },
      {
        heading: "Interactive Preview Suite",
        anchor: "interactive-preview",
        body: "Test the live system below. Run silence detection, restore clips, and inspect the final cut index before export.",
      },
    ],
    nextPage: { id: "integrations", label: "Integrations" },
  },
  integrations: {
    id: "integrations",
    title: "NLE Editor Integrations",
    breadcrumbs: ["Get Started", "Integrations"],
    subtitle: "Connect FlowCut to Final Cut Pro using native FCPXML sequence export.",
    sections: [
      {
        heading: "Connecting to Apple Final Cut Pro",
        anchor: "final-cut-pro-int",
        body:
          "Exporting as FCPXML allows FlowCut to preserve the original media references while writing cut boundaries into a timeline format Final Cut Pro can import.",
        code:
          '<fcpxml version="1.9">\n  <library>\n    <event name="FlowCut Export">\n      <project name="Processed Cut Sequence">\n        <!-- Clip cuts with exact frame offsets -->\n      </project>\n    </event>\n  </library>\n</fcpxml>',
        lang: "xml",
      },
    ],
    nextPage: { id: "compatibility", label: "Compatibility" },
  },
  compatibility: {
    id: "compatibility",
    title: "System Compatibility",
    breadcrumbs: ["Get Started", "Compatibility"],
    subtitle: "FlowCut is built for modern macOS editing workstations and Final Cut Pro workflows.",
    sections: [
      {
        heading: "Hardware Requirements",
        anchor: "hardware-reqs",
        body: "For optimal speeds, Apple Silicon M1/M2/M3 or Intel i7/i9 10th Gen+ is recommended. 8 GB RAM is the minimum, with 16 GB recommended.",
      },
      {
        heading: "Active Browser Hardware Checker",
        anchor: "gpu-checker",
        body: "Review client-side diagnostics below to understand local processing readiness.",
      },
    ],
    nextPage: { id: "videos", label: "Video Guides" },
  },
  videos: {
    id: "videos",
    title: "Video Guides & Tutorials",
    breadcrumbs: ["Get Started", "Videos"],
    subtitle: "Learn silence removal workflows and threshold setup with interactive tutorial cards.",
    sections: [{ heading: "Featured Training Videos", anchor: "training", body: "Browse visual tutorial collections below." }],
    nextPage: { id: "faq", label: "Frequently Asked Questions" },
  },
  faq: {
    id: "faq",
    title: "Frequently Asked Questions",
    breadcrumbs: ["Get Started", "FAQ"],
    subtitle: "Got a question about processing formats, data privacy, or licenses? Start here.",
    sections: [{ heading: "General Questions", anchor: "general-faq", body: "Select any question panel to open the answer." }],
    nextPage: { id: "report-issue", label: "Report an Issue" },
  },
  "report-issue": {
    id: "report-issue",
    title: "Bug Report & Issue Tracker",
    breadcrumbs: ["Get Started", "Report an Issue"],
    subtitle: "Help us improve the local cutting engine. Submit a diagnostic ticket or review active logs.",
    sections: [
      { heading: "Active System Tickets", anchor: "tickets-db", body: "Public issue logs show active fixes and resolved compatibility notes." },
      { heading: "Submit Diagnostics Ticket", anchor: "submit-ticket", body: "Submit crash logs, FCPXML fragments, or version lists for review." },
    ],
    nextPage: { id: "analyzing-media", label: "Analyzing Media" },
  },
  "analyzing-media": {
    id: "analyzing-media",
    title: "Analyzing Media",
    breadcrumbs: ["Core Concepts", "Analyzing Media"],
    subtitle: "Understand how FlowCut analyzes audio arrays to define vocal thresholds and segment silences.",
    sections: [
      {
        heading: "Precision Threshold Audio Clipping",
        anchor: "precision-clipping",
        body:
          "Standard audio gates can ruin dialogue by cutting off soft letters. FlowCut uses conservative silence boundaries and frame padding to protect spoken beginnings.",
      },
      { heading: "Interactive Threshold Sandbox", anchor: "interactive-sandbox", body: "Simulate audio processing and watch how many silent blocks get removed." },
    ],
    nextPage: { id: "machine-learning", label: "Machine Learning Engine" },
  },
  "machine-learning": {
    id: "machine-learning",
    title: "Machine Learning Engine",
    breadcrumbs: ["Core Concepts", "Machine Learning"],
    subtitle: "Deep-dive into localized speech detection, waveform parsing, and automated edit boundary detection.",
    sections: [
      { heading: "Local Speech Detection", anchor: "speech-detection", body: "FlowCut can analyze voice activity locally to determine where speech begins and ends." },
      { heading: "Voice Activity Detection (VAD)", anchor: "vad-model", body: "The VAD pass separates human voice from background noise before timeline cuts are proposed." },
      { heading: "Interactive Neural Graph Visualizer", anchor: "neural-graph", body: "Amplitude, speech probability, and silence length combine to decide automated cut borders." },
    ],
    nextPage: { id: "local-offline", label: "Local and Offline" },
  },
  "local-offline": {
    id: "local-offline",
    title: "Local Privacy & Extreme Security",
    breadcrumbs: ["Core Concepts", "Local and Offline"],
    subtitle: "FlowCut is built with an offline-first mandate, keeping client footage and sensitive corporate audio on your system.",
    sections: [
      { heading: "Zero Cloud Leak Security Policy", anchor: "privacy-policy", body: "FlowCut does not upload video files or transcript chunks for standard local silence removal." },
      { heading: "Extreme Speed Comparisons", anchor: "speed-comparison", body: "Local processing avoids upload/download delays and keeps editorial media physically isolated." },
    ],
    nextPage: { id: "licensing", label: "Licensing tiers" },
  },
  licensing: {
    id: "licensing",
    title: "Licensing & Activation Models",
    breadcrumbs: ["Core Concepts", "Licensing"],
    subtitle: "FlowCut offers licenses for individual creators and larger editorial workspaces.",
    sections: [{ heading: "Flexible license tiers", anchor: "pricing-grid-doc", body: "Choose the license size that matches your workspace and activate through your FrameLabs account." }],
    nextPage: { id: "standalone-app", label: "Standalone App" },
  },
  "standalone-app": {
    id: "standalone-app",
    title: "Standalone Core Desktop App",
    breadcrumbs: ["Platforms", "Standalone App"],
    subtitle: "How to customize FlowCut's independent desktop workspace, export timelines, and configure audio triggers.",
    sections: [
      { heading: "Launching the Core Application", anchor: "desktop-workspace", body: "Open FlowCut, drag any interview or podcast file into the app, and begin automatic silence removal." },
      { heading: "Supported File Containers", anchor: "file-containers", body: "Inputs include common MP4, MOV, WAV, MP3, M4A, and ProRes workflows. No cloud upload is required." },
    ],
    nextPage: { id: "final-cut-pro", label: "Final Cut Pro Extension" },
  },
  "final-cut-pro": {
    id: "final-cut-pro",
    title: "Final Cut Pro Integration Details",
    breadcrumbs: ["Platforms", "Final Cut Pro"],
    subtitle: "Integrate silence removal workflows into Apple's Final Cut Pro ecosystem using sequence XML export.",
    sections: [
      {
        heading: "Final Cut Workflow",
        anchor: "fcp-workflow-extension",
        body:
          "FlowCut exports FCPXML sequences that can be imported into Final Cut Pro so you can continue editing from a cleaned-up timeline.",
      },
      {
        heading: "Manual Connector Check",
        anchor: "fcp-extension-install",
        body: "If your install requires manual verification, confirm FlowCut is present in Applications and that Final Cut Pro has permission to access the media location.",
        code: "ls /Applications/FlowCut.app\nopen -a 'Final Cut Pro'",
        lang: "bash",
      },
    ],
    nextPage: { id: "introduction", label: "Introduction" },
  },
};

function pageIcon(id: DocPageId) {
  switch (id) {
    case "introduction":
      return <BookOpen className="h-4 w-4" />;
    case "quickstart":
      return <Terminal className="h-4 w-4" />;
    case "interface":
      return <Cpu className="h-4 w-4" />;
    case "integrations":
      return <Layers className="h-4 w-4" />;
    case "compatibility":
      return <Activity className="h-4 w-4" />;
    case "videos":
      return <Video className="h-4 w-4" />;
    case "faq":
      return <FileQuestion className="h-4 w-4" />;
    case "report-issue":
    case "analyzing-media":
      return <Wrench className="h-4 w-4" />;
    case "machine-learning":
      return <Smile className="h-4 w-4" />;
    case "local-offline":
      return <Shield className="h-4 w-4" />;
    case "licensing":
      return <FileSpreadsheet className="h-4 w-4" />;
    case "standalone-app":
      return <Monitor className="h-4 w-4" />;
    case "final-cut-pro":
      return <Apple className="h-4 w-4" />;
    default:
      return <BookOpen className="h-4 w-4" />;
  }
}

function InteractiveWaveform() {
  const initialBars: AudioBlock[] = [
    { id: 1, height: 10 },
    { id: 2, height: 12 },
    { id: 3, height: 55 },
    { id: 4, height: 80 },
    { id: 5, height: 75 },
    { id: 6, height: 42 },
    { id: 7, height: 8 },
    { id: 8, height: 5 },
    { id: 9, height: 11 },
    { id: 10, height: 60 },
    { id: 11, height: 95 },
    { id: 12, height: 82 },
    { id: 13, height: 50 },
    { id: 14, height: 15 },
    { id: 15, height: 8 },
    { id: 16, height: 6 },
    { id: 17, height: 70 },
    { id: 18, height: 85 },
    { id: 19, height: 40 },
    { id: 20, height: 12 },
    { id: 21, height: 5 },
    { id: 22, height: 68 },
    { id: 23, height: 90 },
    { id: 24, height: 75 },
    { id: 25, height: 8 },
    { id: 26, height: 10 },
  ];

  const [dbThreshold, setDbThreshold] = useState(-32);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playHeadIndex, setPlayHeadIndex] = useState(0);
  const [sampleVideo, setSampleVideo] = useState<"podcast" | "vlog" | "lecture">("podcast");
  const [waveBars, setWaveBars] = useState<AudioBlock[]>(initialBars);
  const playIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const thresholdPercentage = Math.round(((dbThreshold + 45) / 35) * 58 + 12);

  useEffect(() => {
    let multiplier = 1;
    let seedOffset = 0;
    if (sampleVideo === "vlog") {
      multiplier = 0.85;
      seedOffset = 4;
    } else if (sampleVideo === "lecture") {
      multiplier = 1.1;
      seedOffset = 7;
    }
    setWaveBars(
      initialBars.map((bar, i) => {
        const idx = (i + seedOffset) % initialBars.length;
        return { ...bar, height: Math.max(5, Math.min(100, Math.round(initialBars[idx].height * multiplier))) };
      }),
    );
    setPlayHeadIndex(0);
    setIsPlaying(false);
  }, [sampleVideo]);

  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        setPlayHeadIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % waveBars.length;
          const nextBar = waveBars[nextIndex];
          if (nextBar.height < thresholdPercentage) {
            for (let scan = 1; scan < 6; scan += 1) {
              const checkIdx = (nextIndex + scan) % waveBars.length;
              if (waveBars[checkIdx].height >= thresholdPercentage) return checkIdx;
            }
          }
          return nextIndex;
        });
      }, 250);
    } else if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current);
    }
    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isPlaying, thresholdPercentage, waveBars]);

  const totalSilencesCount = waveBars.filter((bar) => bar.height < thresholdPercentage).length;
  const multiplier = sampleVideo === "podcast" ? 1.5 : sampleVideo === "vlog" ? 2.1 : 0.9;
  const timeSavedSeconds = Math.round(totalSilencesCount * multiplier * 2.5);
  const fileReductionMb = Math.round(totalSilencesCount * 4.8);

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/5 bg-[#15121b] p-5 shadow-2xl">
      <div className="mb-5 flex flex-col justify-between gap-4 border-b border-white/5 pb-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2.5">
          <div className="rounded border border-brand-primary/20 bg-brand-primary/10 p-2 text-brand-primary-dim">
            <Scissors className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-white">FlowCut NLE Timeline Simulator</h4>
            <span className="text-xs text-brand-text-muted">Drag the vertical decibel slider to set smart silence thresholds.</span>
          </div>
        </div>
        <div className="flex gap-1.5 rounded-lg border border-white/5 bg-[#100d16] p-1">
          {(["podcast", "vlog", "lecture"] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => setSampleVideo(opt)}
              className={`cursor-pointer rounded px-3 py-1 text-[11px] font-semibold capitalize transition ${
                sampleVideo === opt ? "bg-brand-primary text-white" : "text-brand-text-muted hover:text-white"
              }`}
            >
              {opt === "lecture" ? "Univ Lecture" : `${opt} file`}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex h-64 items-end gap-1.5 overflow-hidden rounded-lg border border-white/10 bg-[#0d0a14] p-6 py-10">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute left-0 right-0 z-10 flex items-center justify-end border-t border-dashed border-red-500/40 pr-4 text-[10px] font-mono text-red-400 transition-all duration-150" style={{ bottom: `${thresholdPercentage}%` }}>
          <span className="rounded-sm border border-red-500/10 bg-[#0d0a14] px-1.5 py-0.5">Gate Limit: {dbThreshold} dB</span>
        </div>
        <div className="z-0 flex h-full flex-1 items-end gap-1 md:gap-1.5">
          {waveBars.map((bar, index) => {
            const isCut = bar.height < thresholdPercentage;
            const isCursor = index === playHeadIndex && isPlaying;
            return (
              <div key={bar.id} className="relative flex h-full flex-1 flex-col justify-end">
                <div
                  className={`w-full rounded-t-sm transition-all duration-150 ${
                    isCursor
                      ? "bg-blue-400 shadow-[0_0_12px_rgba(56,189,248,0.7)]"
                      : isCut
                        ? "border-t-2 border-red-500/40 bg-red-500/20"
                        : "bg-gradient-to-t from-brand-primary to-brand-primary-dim shadow-[0_0_8px_rgba(124,58,237,0.15)]"
                  }`}
                  style={{ height: `${bar.height}%` }}
                />
                {isCut && <div className="absolute left-0 right-0 top-[105%] text-center font-mono text-[8px] font-bold leading-none text-red-500/60">CUT</div>}
                {isCursor && <div className="absolute -inset-x-0.5 bottom-0 top-0 border-x border-blue-400/50 bg-blue-400/5" />}
              </div>
            );
          })}
        </div>
        {isPlaying && waveBars[playHeadIndex]?.height < thresholdPercentage && (
          <div className="absolute bottom-4 left-4 flex animate-bounce items-center gap-1.5 rounded-md border border-red-500/20 bg-red-950/80 px-2.5 py-1.5 font-mono text-[10px] text-red-300 shadow-lg">
            <Volume2 className="h-3.5 w-3.5" />
            <span>AI SKIP: SILENT ZONE REMOVED ({dbThreshold} dB GAP)</span>
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 items-center gap-5 md:grid-cols-12">
        <div className="space-y-2 md:col-span-6">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono font-semibold text-brand-text">Gate Amplitude Decibels</span>
            <span className="font-mono font-bold text-brand-primary-dim">{dbThreshold} dB</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-brand-text-muted">-45dB</span>
            <input type="range" min="-45" max="-10" value={dbThreshold} onChange={(e) => setDbThreshold(Number(e.target.value))} className="h-1.5 flex-1 cursor-pointer rounded-lg bg-brand-surface-high accent-brand-primary" />
            <span className="font-mono text-[10px] text-brand-text-muted">-10dB</span>
          </div>
        </div>
        <div className="flex gap-2.5 md:col-span-6">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-4 py-2.5 text-xs font-semibold transition ${
              isPlaying ? "border-white/10 bg-[#100d16] text-white hover:bg-white/5" : "border-brand-primary bg-brand-primary text-white shadow-lg shadow-purple-950/20 hover:opacity-95"
            }`}
          >
            {isPlaying ? <><Pause className="h-4 w-4" /> Pause Simulation</> : <><Play className="h-4 w-4 fill-white" /> Play Workspace</>}
          </button>
          <button onClick={() => { setIsPlaying(false); setPlayHeadIndex(0); }} className="aspect-square cursor-pointer rounded-lg border border-white/10 bg-brand-surface-high p-2.5 text-brand-text transition hover:border-white/20 hover:text-white" title="Reset timeline cursor">
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2.5 divide-x divide-white/5 rounded-lg border border-white/5 bg-[#100d16]/70 p-4 text-center">
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-wider text-brand-text-muted">Silence Gaps Detected</span>
          <span className="mt-1 block font-display text-lg font-bold text-red-400 md:text-xl">{totalSilencesCount} silent blocks</span>
        </div>
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-wider text-brand-text-muted">Est. Time Avoided</span>
          <span className="mt-1 flex items-center justify-center gap-1 font-display text-lg font-bold text-green-400 md:text-xl">{timeSavedSeconds}s Saved</span>
        </div>
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-wider text-brand-text-muted">Export Footprint saving</span>
          <span className="mt-1 block font-display text-lg font-bold text-brand-secondary md:text-xl">-{fileReductionMb} MB</span>
        </div>
      </div>
    </div>
  );
}

function IntroSideCards() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="relative overflow-hidden rounded-xl border border-white/5 bg-[#15121b] p-5 transition-colors hover:border-white/10">
        <div className="absolute left-0 top-0 h-full w-1 bg-brand-primary" />
        <h4 className="font-display text-sm font-semibold text-white">Integrated with Editing Software</h4>
        <p className="mt-2 text-xs leading-relaxed text-brand-text-muted">Works with Final Cut Pro sequence export and keeps timelines easy to continue editing.</p>
      </div>
      <div className="relative overflow-hidden rounded-xl border border-white/5 bg-[#15121b] p-5 transition-colors hover:border-white/10">
        <div className="absolute left-0 top-0 h-full w-1 bg-brand-secondary" />
        <h4 className="font-display text-sm font-semibold text-white">Local and Offline</h4>
        <p className="mt-2 text-xs leading-relaxed text-brand-text-muted">Everything runs locally on your device. No cloud uploads, no external telemetry, and no internet connection required for media processing.</p>
      </div>
    </div>
  );
}

function HowItWorksSteps() {
  return (
    <div className="space-y-4">
      <h3 className="mt-10 font-display text-lg font-bold text-white" id="how-it-works">How it works</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[
          ["1", "Analyze media", "Select and analyze videos or audio files locally to isolate confidential client media."],
          ["2", "Remove dead air", "FlowCut maps silence boundaries and turns repetitive cleanup into a fast review pass."],
        ].map(([num, title, body], index) => (
          <div key={title} className="flex min-h-[140px] flex-col justify-between overflow-hidden rounded-xl border border-white/5 bg-[#15121b] p-5">
            <div className={`flex h-7 w-7 items-center justify-center rounded-full border font-mono text-xs font-bold ${index === 0 ? "border-brand-primary/20 bg-brand-primary/10 text-brand-primary-dim" : "border-brand-secondary/20 bg-brand-secondary/10 text-brand-secondary"}`}>{num}</div>
            <div className="mt-4">
              <h4 className="font-display text-sm font-semibold text-white">{title}</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-brand-text-muted">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KeyFeaturesGrid() {
  const feats = [
    ["Visual waveform review", "Review detected speech and silence regions before committing to edits.", <Search className="h-4 w-4 text-brand-secondary" />, "bg-brand-secondary/10 border-brand-secondary/20"],
    ["Frame-based controls", "Adjust minimum strip duration, pre-roll, and post-roll in frames.", <Scissors className="h-4 w-4 text-brand-primary-dim" />, "bg-brand-primary/10 border-brand-primary/20"],
    ["Final Cut Pro export", "Export clean FCPXML sequences that keep your original media references.", <Apple className="h-4 w-4 text-emerald-400" />, "bg-emerald-500/10 border-emerald-500/20"],
    ["Local processing", "Keep sensitive client footage on your Mac during standard silence removal.", <Shield className="h-4 w-4 text-yellow-300" />, "bg-yellow-500/10 border-yellow-500/20"],
  ];
  return (
    <div className="space-y-4">
      <h3 className="mt-10 font-display text-lg font-bold text-white" id="key-features">Key Features</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {feats.map(([title, desc, icon, bg]) => (
          <div key={String(title)} className="flex gap-4 rounded-xl border border-white/5 bg-[#15121b] p-5 transition-colors hover:border-white/10">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border p-2.5 ${bg}`}>{icon}</div>
            <div className="space-y-1">
              <h4 className="font-display text-sm font-semibold text-white">{title}</h4>
              <p className="text-xs leading-relaxed text-brand-text-muted">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickstartFlow({ purchasedKey }: { purchasedKey: string }) {
  const [activeTab, setActiveTab] = useState<"mac" | "windows">("mac");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [licenseKey, setLicenseKey] = useState("");
  const [isActivating, setIsActivating] = useState(false);
  const [activeLicensePlan, setActiveLicensePlan] = useState<string | null>(null);
  const [activateError, setActivateError] = useState("");
  const [terminalCopied, setTerminalCopied] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    setDownloadComplete(false);
    const intv = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intv);
          setIsDownloading(false);
          setDownloadComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleActivate = (e: FormEvent) => {
    e.preventDefault();
    if (!licenseKey.trim()) return;
    setIsActivating(true);
    setActivateError("");
    setTimeout(() => {
      const formattedKey = licenseKey.trim().toUpperCase();
      if (formattedKey.startsWith("FCUT-") || formattedKey === "AISTUDIO" || formattedKey === "AISTUDIO-VIP" || (purchasedKey && formattedKey === purchasedKey.toUpperCase())) {
        setIsActivating(false);
        setActiveLicensePlan("Enterprise Lifetime Pro");
      } else {
        setIsActivating(false);
        setActivateError('Key format unrecognized. Type "AISTUDIO" for instant sandbox access.');
      }
    }, 900);
  };

  return (
    <div className="mt-6 space-y-8">
      <div className="rounded-xl border border-white/5 bg-[#15121b] p-5 shadow-lg">
        <span className="mb-3 block font-mono text-[10px] font-semibold uppercase tracking-wider text-brand-primary-dim">ACTION PHASE 01</span>
        <h4 className="font-display text-base font-semibold text-white">Retrieve Native Helper Core Binary</h4>
        <div className="mt-4 grid grid-cols-1 items-center gap-5 md:grid-cols-12">
          <div className="flex flex-col gap-2 md:col-span-4">
            {(["mac", "windows"] as const).map((os) => (
              <button
                key={os}
                onClick={() => { setActiveTab(os); setDownloadComplete(false); }}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-xs font-semibold transition ${
                  activeTab === os ? "border-brand-primary bg-brand-primary/10 text-white" : "border-white/5 hover:bg-white/5 text-brand-text-muted hover:text-white"
                }`}
              >
                {os === "mac" ? <Apple className="h-4.5 w-4.5 text-rose-300" /> : <span className="text-base leading-none text-sky-300">⊞</span>}
                <div className="text-left">
                  <span className="block">{os === "mac" ? "Apple macOS" : "Microsoft Windows"}</span>
                  <span className="text-[9px] font-normal text-brand-text-muted">{os === "mac" ? "dmg file (Apple Silicon / Intel)" : "msi file (64-bit AMD64/x64)"}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="flex min-h-[140px] flex-col justify-center rounded-lg border border-white/5 bg-[#100d16] p-5 md:col-span-8">
            {isDownloading ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-xs"><span className="text-brand-secondary">Downloading FlowCut_Universal_Setup ({activeTab})...</span><span>{downloadProgress}%</span></div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-[#15121b]"><div className="h-1 bg-brand-secondary" style={{ width: `${downloadProgress}%` }} /></div>
                <span className="block font-mono text-[10px] text-brand-text-muted">Transfer speed: 45 MB/s - Local SSD Cache Active</span>
              </div>
            ) : downloadComplete ? (
              <div className="flex flex-col items-center space-y-2 py-2 text-center">
                <CheckCircle2 className="h-8 w-8 text-green-400" />
                <span className="block text-xs font-semibold text-white">Download Sequence Fully Executed!</span>
                <span className="font-mono text-[10px] text-brand-text-muted">SHA-256 CHECK: <span className="text-green-300">A83F..91D0</span> - Saved locally in Downloads folder</span>
              </div>
            ) : (
              <div className="py-4 text-center">
                <p className="mb-4 text-xs leading-relaxed text-brand-text-muted">Requires 112 MB storage. Includes optimized standard binaries for local GPU-accelerated computing.</p>
                <button onClick={handleDownload} className="mx-auto flex cursor-pointer items-center justify-center gap-2 rounded-md bg-brand-primary px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-purple-950/30 transition hover:bg-opacity-90">
                  <Download className="h-4 w-4" /> Download Node Helper Installer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/5 bg-[#15121b] p-5 shadow-lg">
        <span className="mb-3 block font-mono text-[10px] font-semibold uppercase tracking-wider text-brand-primary-dim">ACTION PHASE 02</span>
        <h4 className="font-display text-base font-semibold text-white">Key Authentication Node</h4>
        {activeLicensePlan ? (
          <div className="mt-4 flex flex-col items-center space-y-3 rounded-lg border border-green-500/20 bg-green-500/5 p-5 text-center">
            <Sparkles className="h-10 w-10 rounded-full bg-green-500/10 p-2 text-green-400" />
            <span className="block font-display text-sm font-semibold text-green-300">Workspace Fully Activated!</span>
            <span className="block text-xs text-white/80">Authorized Profile: <strong>{activeLicensePlan}</strong></span>
            <button onClick={() => { setActiveLicensePlan(null); setLicenseKey(""); }} className="cursor-pointer rounded border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-brand-text transition hover:bg-white/10">Reset Activation License</button>
          </div>
        ) : (
          <form onSubmit={handleActivate} className="mt-4 grid grid-cols-1 items-start gap-5 md:grid-cols-12">
            <div className="space-y-4 md:col-span-8">
              <p className="text-xs leading-relaxed text-brand-text-muted">Paste your perpetual seat license key below or create a virtual VIP developer key immediately.</p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <KeyRound className="absolute left-3 top-2.5 h-4.5 w-4.5 text-brand-text-muted" />
                  <input value={licenseKey} onChange={(e) => setLicenseKey(e.target.value)} placeholder="FCUT-XXXX-XXXX-XXXX or type AISTUDIO" className="w-full rounded border border-white/10 bg-[#100d16] px-3 py-2 pl-10 font-mono text-sm uppercase text-white placeholder:font-sans placeholder:text-brand-text-muted focus:border-brand-primary focus:outline-none" />
                </div>
                <button disabled={isActivating} className="flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded bg-brand-primary px-5 text-xs font-semibold text-white transition hover:bg-opacity-95">
                  {isActivating ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : "Unlock Core"}
                </button>
              </div>
              {activateError && <span className="block font-mono text-xs text-red-400">{activateError}</span>}
            </div>
            <div className="flex h-full min-h-[110px] flex-col justify-center space-y-3 rounded-lg border border-white/5 bg-[#100d16] p-4 text-center md:col-span-4">
              <span className="font-mono text-[10px] uppercase text-brand-text-muted">Sandbox VIP Bypass</span>
              <span className="block text-[11px] leading-normal text-brand-text-muted">Instantly assign a lifetime digital mock license:</span>
              <button type="button" onClick={() => setLicenseKey("AISTUDIO-VIP")} className="w-full cursor-pointer rounded border border-white/10 bg-brand-surface-high py-1.5 text-xs font-semibold text-brand-primary-dim transition hover:border-white/20 hover:text-white">Insert Free VIP Key Token</button>
            </div>
          </form>
        )}
      </div>

      <div className="rounded-xl border border-white/5 bg-[#15121b] p-5 shadow-lg">
        <span className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-wider text-brand-primary-dim">ACTION PHASE 03</span>
        <h4 className="font-display text-base font-semibold text-white">Terminal Automation Plugin Link</h4>
        <p className="mt-1 text-xs leading-relaxed text-brand-text-muted">Open your system terminal and run this automatic connector setup command.</p>
        <div className="mt-4 flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#100d16] p-3.5">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Terminal className="h-4 w-4 shrink-0 text-brand-secondary" />
            <code className="truncate select-all font-mono text-xs text-purple-200">npm install -g @flowcut/cli-connector && flowcut install-nle-extensions</code>
          </div>
          <button onClick={() => { navigator.clipboard.writeText("npm install -g @flowcut/cli-connector && flowcut install-nle-extensions"); setTerminalCopied(true); setTimeout(() => setTerminalCopied(false), 2000); }} className="shrink-0 cursor-pointer rounded border border-white/5 bg-brand-surface p-2 text-brand-text-muted transition hover:border-white/10 hover:text-white" title="Copy command to clipboard">
            {terminalCopied ? <span className="font-mono text-[11px] font-bold text-green-400">Copied!</span> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

function InteractiveDemo() {
  const [selectedFile, setSelectedFile] = useState<"podcast" | "screencast" | "vlog">("podcast");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState("");
  const [percent, setPercent] = useState(0);
  const [clips, setClips] = useState<MockClip[]>([]);

  const handleStartProcessing = () => {
    setIsProcessing(true);
    setPercent(0);
    setClips([]);
    setProcessStep("1. Separating Vocal Amplitudes (Local CUDA)...");
    let currentPercent = 0;
    const interval = setInterval(() => {
      currentPercent += 5;
      setPercent(currentPercent);
      if (currentPercent === 35) setProcessStep("2. Local Whisper Parsing: Phoneme indexing...");
      else if (currentPercent === 65) setProcessStep("3. Silero VAD Grid: Mapping silent boundaries...");
      else if (currentPercent === 85) setProcessStep("4. Framing XML Markers: Organizing timelines...");
      if (currentPercent >= 100) {
        clearInterval(interval);
        const lists: Record<typeof selectedFile, MockClip[]> = {
          podcast: [
            { id: "C001", start: "00:00.00", end: "00:04.25", duration: "4.25s", speechProbability: 96, status: "Keep" },
            { id: "C002", start: "00:04.25", end: "00:07.10", duration: "2.85s", speechProbability: 12, status: "Cut" },
            { id: "C003", start: "00:07.10", end: "00:15.65", duration: "8.55s", speechProbability: 92, status: "Keep" },
            { id: "C004", start: "00:15.65", end: "00:22.40", duration: "6.75s", speechProbability: 4, status: "Cut" },
            { id: "C005", start: "00:22.40", end: "00:30.00", duration: "7.60s", speechProbability: 88, status: "Keep" },
          ],
          screencast: [
            { id: "S001", start: "00:00.00", end: "00:02.10", duration: "2.10s", speechProbability: 4, status: "Cut" },
            { id: "S002", start: "00:02.10", end: "00:08.50", duration: "6.40s", speechProbability: 94, status: "Keep" },
            { id: "S003", start: "00:08.50", end: "00:11.45", duration: "2.95s", speechProbability: 8, status: "Cut" },
            { id: "S004", start: "00:11.45", end: "00:19.40", duration: "7.95s", speechProbability: 91, status: "Keep" },
          ],
          vlog: [
            { id: "V001", start: "00:00.00", end: "00:12.35", duration: "12.35s", speechProbability: 95, status: "Keep" },
            { id: "V002", start: "00:12.35", end: "00:18.90", duration: "6.55s", speechProbability: 3, status: "Cut" },
            { id: "V003", start: "00:18.90", end: "00:22.00", duration: "3.10s", speechProbability: 7, status: "Cut" },
            { id: "V004", start: "00:22.00", end: "00:30.00", duration: "8.00s", speechProbability: 90, status: "Keep" },
          ],
        };
        setClips(lists[selectedFile]);
        setIsProcessing(false);
      }
    }, 120);
  };

  const toggleClipStatus = (id: string) => {
    setClips((prev) => prev.map((clip) => (clip.id === id ? { ...clip, status: clip.status === "Cut" ? "Restored" : clip.status === "Restored" ? "Cut" : "Cut" } : clip)));
  };

  const keepsCount = clips.filter((c) => c.status === "Keep" || c.status === "Restored").length;
  const cutsCount = clips.filter((c) => c.status === "Cut").length;
  const totalCutsSeconds = clips.filter((c) => c.status === "Cut").reduce((acc, c) => acc + parseFloat(c.duration), 0).toFixed(2);

  return (
    <div className="relative mt-6 overflow-hidden rounded-xl border border-white/5 bg-[#15121b] p-5 shadow-2xl">
      <div className="mb-4 flex flex-col justify-between gap-4 border-b border-white/5 pb-4 sm:flex-row sm:items-center">
        <div>
          <h4 className="font-display text-base font-semibold text-white">FlowCut Local Processing Box</h4>
          <p className="mt-0.5 text-xs text-brand-text-muted">Select a feed file type below to trigger a local automated clip-trimming sequence.</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={selectedFile} onChange={(e) => { setSelectedFile(e.target.value as typeof selectedFile); setClips([]); }} disabled={isProcessing} className="cursor-pointer rounded border border-white/10 bg-[#100d16] px-2.5 py-1.5 text-xs text-white focus:border-brand-primary focus:outline-none">
            <option value="podcast">Double mic Podcast (Audio Only)</option>
            <option value="screencast">K-12 Video Tutorial (1080p WebGL)</option>
            <option value="vlog">4K RAW Hiking Vlog (ProRes 422)</option>
          </select>
          <button onClick={handleStartProcessing} disabled={isProcessing} className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded bg-brand-primary px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-purple-900/10 transition hover:bg-opacity-95">
            {isProcessing ? <><RefreshCw className="h-3.5 w-3.5 animate-spin" /><span>Trimming...</span></> : <><Scissors className="h-3.5 w-3.5" /><span>Execute Silence Cut</span></>}
          </button>
        </div>
      </div>

      {isProcessing && (
        <div className="space-y-4 rounded-lg border border-white/5 bg-[#100d16] p-6 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-brand-primary border-t-transparent" />
          <span className="block font-mono text-xs uppercase tracking-wider text-brand-primary-dim">{processStep}</span>
          <span className="block font-display text-sm font-bold text-white">Analyzing Track: {percent}%</span>
          <div className="mx-auto h-1.5 w-48 overflow-hidden rounded-full bg-[#15121b]"><div className="h-1.5 bg-brand-primary transition-all duration-100" style={{ width: `${percent}%` }} /></div>
        </div>
      )}

      {clips.length > 0 && !isProcessing && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            <div className="overflow-hidden rounded-lg border border-white/5 bg-[#100d16] md:col-span-8">
              <div className="flex items-center justify-between border-b border-white/5 px-4 py-2 font-mono text-[10px] text-brand-text-muted">
                <span>SUBFRAME CLIP INDEX</span><span>STATUS ACTIONS</span>
              </div>
              <div className="divide-y divide-white/5">
                {clips.map((clip) => {
                  const cut = clip.status === "Cut";
                  const restored = clip.status === "Restored";
                  return (
                    <div key={clip.id} className={`flex items-center justify-between px-4 py-2.5 text-xs transition ${cut ? "bg-red-950/10 opacity-60" : restored ? "bg-green-950/10" : "hover:bg-white/[0.01]"}`}>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-brand-text-muted">{clip.id}</span>
                        <div>
                          <span className="block font-mono tracking-wide text-white">{clip.start} - {clip.end} ({clip.duration})</span>
                          <span className={`mt-0.5 block font-mono text-[9px] ${cut ? "text-red-400" : "text-green-400"}`}>Speech Probability: {clip.speechProbability}%</span>
                        </div>
                      </div>
                      <button onClick={() => toggleClipStatus(clip.id)} className={`flex cursor-pointer items-center gap-1 rounded border px-3 py-1 font-mono text-[10px] font-bold transition ${cut ? "border-red-500/30 text-red-300 hover:bg-red-500/10" : restored ? "border-green-500/30 text-green-300 hover:bg-green-500/10" : "border-white/10 text-brand-text-muted hover:border-red-500/20 hover:bg-red-500/5 hover:text-red-300"}`}>
                        {cut ? "RESTORE CLIP" : restored ? "CUT CLIP" : "FORCE CUT"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-lg border border-brand-primary/10 bg-brand-primary/5 p-4 md:col-span-4">
              <div className="space-y-4">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-brand-primary-dim">TIMELINE METRICS SUMMARY</span>
                <div className="grid grid-cols-2 gap-3 divide-x divide-white/5">
                  <div><span className="font-mono text-[10px] uppercase text-brand-text-muted">To Export</span><span className="mt-1 block font-display text-lg font-semibold text-white">{keepsCount} clips</span></div>
                  <div className="pl-3"><span className="font-mono text-[10px] uppercase text-brand-text-muted">Discarded</span><span className="mt-1 block font-display text-lg font-semibold text-red-400">{cutsCount} clips</span></div>
                </div>
                <div className="border-t border-white/5 pt-3"><span className="block font-mono text-[10px] uppercase text-brand-text-muted">Total Cut Duration Removed</span><span className="mt-1 block font-display text-2xl font-bold text-green-400">{totalCutsSeconds}s Cut</span></div>
              </div>
              <div className="mt-4 rounded border border-white/10 bg-[#100d16] p-3 text-[10px] leading-relaxed text-brand-text-muted">
                <span className="mb-1 flex items-center gap-1 font-semibold text-slate-200"><Sparkles className="h-3 w-3 text-brand-primary-dim" /> Native Export Complete!</span>
                Click RESTORE CLIP to modify silence boundaries. Exporting will write final FCPXML files directly.
              </div>
            </div>
          </div>
        </div>
      )}

      {clips.length === 0 && !isProcessing && (
        <div className="flex flex-col items-center justify-center py-12 text-center text-brand-text-muted">
          <HardDriveUpload className="mb-3 h-8 w-8 opacity-20" />
          <p className="font-display text-sm font-medium text-white/55">Waiting for Clip Analysis Trigger</p>
          <p className="mt-0.5 max-w-xs text-xs text-brand-text-muted">Select your template audio or video and click the Execute Silence Cut solver button above.</p>
        </div>
      )}
    </div>
  );
}

function CompatibilityTab() {
  const [report, setReport] = useState<{ os: string; browser: string; webGlSupported: boolean; cores: number; memoryGb?: number; status: "Ready" | "Optimizable"; details: string } | null>(null);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const generateReport = () => {
    const ua = navigator.userAgent;
    let osLabel = "Linux / Unknown";
    if (ua.includes("Macintosh")) osLabel = "macOS (Darwin)";
    else if (ua.includes("Windows")) osLabel = "Windows OS";
    let browserLabel = "Web Browser";
    if (ua.includes("Chrome")) browserLabel = "Google Chrome";
    else if (ua.includes("Safari")) browserLabel = "Apple Safari";
    let webGlSupported = false;
    try {
      const canvas = document.createElement("canvas");
      webGlSupported = !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
    } catch {
      webGlSupported = false;
    }
    const cores = navigator.hardwareConcurrency || 4;
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 8;
    const hasProSpeed = cores >= 8 && webGlSupported;
    setReport({
      os: osLabel,
      browser: browserLabel,
      webGlSupported,
      cores,
      memoryGb: deviceMemory,
      status: hasProSpeed ? "Ready" : "Optimizable",
      details: hasProSpeed ? "Your hardware exceeds baseline benchmarks. FlowCut Local Engine can use high-performance local processing." : "Your GPU or processor is suitable, but proxy sequences are recommended for larger 4K video streams.",
    });
    setRunning(false);
  };

  const runDiagnostics = () => {
    setRunning(true);
    setProgress(0);
    setReport(null);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          generateReport();
          return 100;
        }
        return prev + 8;
      });
    }, 70);
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  return (
    <div className="mt-6 space-y-6 rounded-xl border border-white/5 bg-[#15121b] p-6">
      <div className="flex flex-col justify-between gap-4 border-b border-white/5 pb-4 sm:flex-row sm:items-center">
        <div>
          <h4 className="font-display text-base font-semibold text-white">Local GPU Diagnostics Suite</h4>
          <p className="mt-0.5 text-xs text-brand-text-muted">Determine if your device supports localized processing without server delay.</p>
        </div>
        <button onClick={runDiagnostics} disabled={running} className="flex shrink-0 cursor-pointer items-center gap-1.5 self-start rounded bg-brand-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-opacity-90 sm:self-center">
          <RefreshCw className={`h-3.5 w-3.5 ${running ? "animate-spin" : ""}`} /> Run diagnostics
        </button>
      </div>
      {running && (
        <div className="space-y-4 py-6">
          <div className="flex items-center justify-between font-mono text-xs"><span className="animate-pulse text-brand-primary-dim">Initializing Web Assembly GPU drivers...</span><span>{progress}%</span></div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#100d16]"><div className="h-1.5 rounded-full bg-brand-primary transition-all duration-75" style={{ width: `${progress}%` }} /></div>
        </div>
      )}
      {report && (
        <div className="space-y-6">
          <div className={`flex items-start gap-3.5 rounded-lg border p-4 ${report.status === "Ready" ? "border-green-500/20 bg-green-500/5 text-green-300" : "border-amber-500/20 bg-amber-500/5 text-amber-300"}`}>
            <span className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-sm font-bold uppercase tracking-widest">{report.status}</span>
            <div className="flex-1"><span className="text-xs font-semibold text-white">System Diagnostics Check Complete</span><p className="mt-1 text-xs leading-relaxed text-brand-text-muted">{report.details}</p></div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              ["CPUs available", `${report.cores} logical cores`, "Compatible with multi-threading", <Cpu className="h-4 w-4 text-brand-secondary" />],
              ["WebGL status", report.webGlSupported ? "Active acceleration" : "CPU Only fallback", "Hardware WebGL layers read", <Layers className="h-4 w-4 text-brand-primary-dim" />],
              ["Detected host", report.os.split(" ")[0], report.os, <Disc className="h-4 w-4 text-brand-text-muted" />],
              ["Security Sandboxing", "Guaranteed Local", "100% cloud isolating lock", <Shield className="h-4 w-4 text-green-400" />],
            ].map(([label, value, sub, icon]) => (
              <div key={String(label)} className="flex flex-col justify-between rounded-lg border border-white/5 bg-[#100d16] p-4">
                <div className="mb-2 flex items-center justify-between text-brand-text-muted"><span className="font-mono text-[10px] uppercase tracking-wider">{label}</span>{icon}</div>
                <span className="block truncate font-display text-lg font-semibold text-white">{value}</span>
                <span className="mt-0.5 block truncate text-[9px] text-brand-text-muted">{sub}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 rounded-lg border border-white/5 bg-[#100d16] p-4">
            <span className="inline-block font-mono text-[10px] uppercase tracking-wider text-brand-text-muted">RAW SYS METRIC REPORT LOG</span>
            <pre className="max-w-full overflow-x-auto rounded border border-white/5 bg-[#0d0a14] p-2 font-mono text-[11px] leading-5 text-green-400">{`{
  "client_environment": {
    "user_agent_host": "${report.browser}",
    "rendering_pipeline": "WebGL context",
    "wasm_threads": ${report.cores >= 4 ? "true" : "false"},
    "concurrency_limit": ${report.cores}
  },
  "local_benchmark_score": {
    "audio_decode_ms_per_min": ${Math.round(4500 / report.cores)},
    "speech_activation_threshold": -35.2
  }
}`}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export function FlowCutDocumentationPage({
  onNavigate,
  onOpenFlowCut,
  onOpenContact,
  onOpenAccount: _onOpenAccount,
  onOpenDocumentation: _onOpenDocumentation,
  isCartOpen,
  onCartOpen,
  onCartClose,
}: FlowCutDocumentationPageProps) {
  const [activePage, setActivePage] = useState<DocPageId>("introduction");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [purchasedKey, setPurchasedKey] = useState("");
  const [copiedSectionIndex, setCopiedSectionIndex] = useState<number | null>(null);
  const [activeVideoPlayer, setActiveVideoPlayer] = useState<{ title: string; duration: string; playing: boolean; playtime: number } | null>(null);
  const [tickets, setTickets] = useState<DiagnosticTicket[]>([
    { id: "FC-902", title: "M4 Max core audio buffer offset drift on ProRes output streams", module: "Apple Silicon Core", priority: "High", status: "INVESTIGATING", timestamp: "Today at 09:12 AM" },
    { id: "FC-894", title: "FCPXML path mapping warning on macOS Sonoma layout", module: "XML Export", priority: "Medium", status: "PATCH_QUEUED", timestamp: "Yesterday" },
    { id: "FC-881", title: "Symbolic link creation fallback triggers error on tight sandboxes", module: "Standalone CLI", priority: "Low", status: "RESOLVED", timestamp: "3 days ago" },
  ]);
  const [newTicket, setNewTicket] = useState({ title: "", module: "Core Engine", priority: "Medium" as const, desc: "" });
  const [ticketSubmitMessage, setTicketSubmitMessage] = useState("");
  const currentPageData = docPages[activePage];

  useEffect(() => {
    const handleGlobalShortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleGlobalShortcut);
    return () => window.removeEventListener("keydown", handleGlobalShortcut);
  }, []);

  useEffect(() => {
    let tck: ReturnType<typeof setInterval> | null = null;
    if (activeVideoPlayer?.playing) {
      tck = setInterval(() => {
        setActiveVideoPlayer((prev) => {
          if (!prev) return null;
          const [mins, secs] = prev.duration.split(":").map(Number);
          const maxSecs = mins * 60 + secs;
          if (prev.playtime >= maxSecs) return { ...prev, playing: false, playtime: 0 };
          return { ...prev, playtime: prev.playtime + 1 };
        });
      }, 1000);
    }
    return () => {
      if (tck) clearInterval(tck);
    };
  }, [activeVideoPlayer]);

  const handleSelectPage = (id: DocPageId, anchor?: string) => {
    setActivePage(id);
    if (anchor) {
      setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" }), 160);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedSectionIndex(idx);
    setTimeout(() => setCopiedSectionIndex(null), 2000);
  };

  const handleCreateTicket = (e: FormEvent) => {
    e.preventDefault();
    if (!newTicket.title.trim()) return;
    const fresh: DiagnosticTicket = {
      id: `FC-${Math.floor(Math.random() * 800) + 100}`,
      title: newTicket.title,
      module: newTicket.module,
      priority: newTicket.priority,
      status: "INVESTIGATING",
      timestamp: "Just now",
    };
    setTickets((prev) => [fresh, ...prev]);
    setNewTicket({ title: "", module: "Core Engine", priority: "Medium", desc: "" });
    setTicketSubmitMessage(`Success! Ticket ${fresh.id} posted. Our core engineers are tracking.`);
    setTimeout(() => setTicketSubmitMessage(""), 5000);
  };

  const renderPageSpecificContent = () => {
    if (activePage === "introduction") {
      return (
        <div className="space-y-6">
          <div className="not-prose my-6">
            <div className="mb-2.5 flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-brand-primary-dim">
              <span className="h-2 w-2 animate-ping rounded-full bg-brand-primary" />
              Interactive Feature Waveform Demo
            </div>
            <InteractiveWaveform />
          </div>
          <IntroSideCards />
          <HowItWorksSteps />
          <KeyFeaturesGrid />
        </div>
      );
    }

    if (activePage === "quickstart") return <QuickstartFlow purchasedKey={purchasedKey} />;
    if (activePage === "interface") return <><span className="mb-2 mt-6 block font-mono text-xs font-bold uppercase tracking-wider text-brand-primary-dim">INTERFACE PLAYGROUND</span><InteractiveDemo /></>;
    if (activePage === "compatibility") return <CompatibilityTab />;
    if (activePage === "analyzing-media") return <div className="space-y-6"><InteractiveWaveform /></div>;

    if (activePage === "videos") {
      return (
        <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            ["Automated Vocal Trimming Workflows", "1:45", "12k views", "Beginner"],
            ["Advanced Multicam Speech Indexing", "3:20", "8.4k views", "Advanced"],
            ["Setting Decibel Gate Threshold Envelopes", "2:15", "19k views", "Pro"],
          ].map(([title, duration, views, level]) => (
            <button key={title} onClick={() => setActiveVideoPlayer({ title, duration, playing: true, playtime: 0 })} className="group cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-[#15121b] text-left transition-all duration-300 hover:border-brand-primary/30">
              <div className="relative flex h-40 items-center justify-center overflow-hidden bg-[#0d0a14]">
                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-[linear-gradient(to_top,#7c3aed30,transparent)]" />
                <div className="flex gap-1 opacity-20"><span className="h-12 w-1.5 rounded-full bg-white/70" /><span className="h-16 w-1.5 rounded-full bg-white/70" /><span className="h-20 w-1.5 rounded-full bg-white/70" /><span className="h-12 w-1.5 rounded-full bg-white/70" /></div>
                <div className="absolute flex h-10 w-10 items-center justify-center rounded-full border border-brand-primary/20 bg-brand-primary/10 text-brand-primary-dim transition duration-300 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white"><Play className="ml-0.5 h-4 w-4 fill-current" /></div>
                <span className="absolute bottom-2.5 right-2.5 rounded bg-black/80 px-1.5 py-0.5 font-mono text-[10px] text-white">{duration}</span>
                <span className="absolute left-2.5 top-2.5 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-brand-secondary">{level}</span>
              </div>
              <div className="space-y-1 p-4"><span className="font-mono text-[10px] text-brand-text-muted">{views} - Cloud Tutorial</span><h5 className="font-display text-xs font-semibold leading-snug text-white transition duration-200 group-hover:text-brand-primary-dim">{title}</h5></div>
            </button>
          ))}
        </div>
      );
    }

    if (activePage === "faq") {
      return (
        <div className="space-y-4 py-3">
          {[
            ["Where does FlowCut process my files?", "FlowCut processes audio and video locally. No media chunks, speech files, or transcripts are transmitted for standard silence removal."],
            ["Can I try FlowCut before purchasing?", 'Yes. Use the "Buy FlowCut" drawer button or the Quickstart pane to test the sandbox activation flow.'],
            ["Does it support ProRes files?", "Yes, FlowCut is designed around professional macOS editing formats and Final Cut Pro workflows."],
            ["How does it integrate back into Final Cut Pro?", "FlowCut generates sequence XML that can be imported into Final Cut Pro."],
          ].map(([q, a]) => (
            <details key={q} className="group overflow-hidden rounded-lg border border-white/5 bg-[#15121b] transition-all duration-300">
              <summary className="flex cursor-pointer list-none select-none items-center justify-between px-5 py-4 font-display text-sm font-medium text-white transition hover:text-brand-primary-dim">
                <span>{q}</span><ChevronRight className="h-4 w-4 text-brand-text-muted transition group-open:rotate-90" />
              </summary>
              <div className="border-t border-white/[0.02] bg-[#100d16]/30 px-5 pb-5 pt-1 text-xs leading-relaxed text-brand-text-muted">{a}</div>
            </details>
          ))}
        </div>
      );
    }

    if (activePage === "report-issue") {
      return (
        <div className="space-y-6">
          <div className="rounded-xl border border-white/5 bg-[#15121b] p-5 shadow-lg">
            <h4 className="font-display text-base font-semibold text-white">File a Diagnostic Ticket</h4>
            <p className="mt-0.5 text-xs text-brand-text-muted">Submit terminal crash reports or XML mismatch drift samples directly to the local thread.</p>
            <form onSubmit={handleCreateTicket} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-1.5 md:col-span-2"><label className="block font-mono text-[10px] uppercase tracking-wider text-brand-text-muted">Short Issue Summary</label><input required value={newTicket.title} onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })} placeholder="e.g. XML mismatch when processing WAV waveforms" className="w-full rounded border border-white/10 bg-[#100d16] px-3 py-2 text-xs text-white focus:border-brand-primary focus:outline-none" /></div>
                <div className="space-y-1.5"><label className="block font-mono text-[10px] uppercase tracking-wider text-brand-text-muted">Severity Level</label><select value={newTicket.priority} onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value as typeof newTicket.priority })} className="w-full cursor-pointer rounded border border-white/10 bg-[#100d16] px-2.5 py-2 text-xs text-white focus:border-brand-primary focus:outline-none"><option value="Low">Low - Cosmetic Warnings</option><option value="Medium">Medium - Workflow Bottleneck</option><option value="High">High - Crash / XML Drift</option></select></div>
              </div>
              <div className="space-y-1.5"><label className="block font-mono text-[10px] uppercase tracking-wider text-brand-text-muted">Diagnostics Dump / Description</label><textarea value={newTicket.desc} onChange={(e) => setNewTicket({ ...newTicket, desc: e.target.value })} placeholder="Paste terminal log traces, FCPXML fragments, or NLE version numbers..." className="h-24 w-full rounded border border-white/10 bg-[#100d16] px-3 py-2 font-mono text-xs text-white placeholder:font-sans focus:border-brand-primary focus:outline-none" /></div>
              <div className="flex items-center justify-between gap-4">{ticketSubmitMessage ? <span className="font-mono text-xs font-medium text-green-400">{ticketSubmitMessage}</span> : <span className="font-mono text-[10px] uppercase text-brand-text-muted">Ticket will sync to table dynamically</span>}<button type="submit" className="cursor-pointer rounded bg-brand-primary px-5 py-2 text-xs font-semibold text-white transition hover:bg-opacity-95">Submit Ticket</button></div>
            </form>
          </div>
          <div className="overflow-hidden rounded-xl border border-white/5 bg-[#15121b] shadow-lg">
            <div className="flex items-center justify-between border-b border-white/5 bg-[#1a1622] px-5 py-3"><h5 className="font-display text-xs font-semibold text-white">Active System Tickets logs</h5><span className="font-mono text-[10px] text-brand-text-muted">{tickets.length} tickets tracked</span></div>
            <div className="divide-y divide-white/5">
              {tickets.map((t) => (
                <div key={t.id} className="flex flex-col justify-between gap-3 p-4 text-xs sm:flex-row sm:items-center">
                  <div className="space-y-1"><div className="flex items-center gap-2"><span className="rounded bg-brand-primary/10 px-1 py-0.5 font-mono text-[10px] font-bold text-brand-primary-dim">{t.id}</span><span className="font-semibold text-white">{t.title}</span></div><p className="flex items-center gap-2 text-[10px] text-brand-text-muted"><span>Module: {t.module}</span><span>-</span><span>Logged: {t.timestamp}</span></p></div>
                  <div className="flex shrink-0 items-center gap-3"><span className={`rounded px-2 py-0.5 font-mono text-[9px] font-bold ${t.priority === "High" ? "border border-red-500/20 bg-red-500/10 text-red-400" : t.priority === "Medium" ? "bg-amber-500/10 text-amber-400" : "bg-white/5 text-brand-text-muted"}`}>{t.priority}</span><span className={`rounded px-2 py-0.5 font-mono text-[9px] font-bold ${t.status === "INVESTIGATING" ? "bg-blue-500/10 text-blue-400" : t.status === "PATCH_QUEUED" ? "bg-purple-500/10 text-purple-400" : "bg-green-500/10 text-green-400"}`}>{t.status.replace("_", " ")}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activePage === "local-offline") {
      return (
        <div className="space-y-6">
          <div className="rounded-xl border border-white/5 bg-[#15121b] p-6">
            <h4 className="font-display text-sm font-semibold text-white">Offline Transcription Processing Benchmarks</h4>
            <p className="mt-0.5 text-xs text-brand-text-muted">Time to analyze 1 hour of raw dialogue material.</p>
            <div className="mt-6 space-y-5">
              {[
                ["FlowCut C++ Engine (Local M3/RTX)", "4.5 seconds", "w-[8%]", "from-brand-primary to-brand-secondary"],
                ["Standard Cloud API", "78.0 seconds", "w-[60%]", "from-white/20 to-white/10"],
                ["Manual Hand Trimming", "1,200 seconds", "w-full", "from-white/10 to-white/5"],
              ].map(([label, value, width, gradient]) => (
                <div key={label} className="space-y-1.5"><div className="flex items-center justify-between text-xs"><span className="font-semibold text-white">{label}</span><span className="font-mono font-bold text-green-300">{value}</span></div><div className="h-4 w-full overflow-hidden rounded bg-[#100d16] p-0.5"><div className={`h-full rounded bg-gradient-to-r ${gradient} ${width}`} /></div></div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activePage === "licensing") {
      return (
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            ["Creator Indie License", "$14.99", "Ideal for independent videographers, YouTubers, and podcast editors.", ["Full standalone companion desktop app", "ProRes workflow support", "Uncapped exports", "Final Cut Pro XML export", "Perpetual offline license support"]],
            ["Studio Production License", "$149.90", "Tailored for production teams and multi-user editorial workspaces.", ["Everything included inside Creator", "Multi-seat workspace licensing", "Priority diagnostics support", "Team account management", "Future studio feature access"]],
          ].map(([plan, price, desc, checks]) => (
            <div key={String(plan)} className="flex flex-col justify-between space-y-6 rounded-xl border border-white/5 bg-[#15121b] p-6 transition duration-300 hover:border-brand-primary/35">
              <div className="space-y-4"><h4 className="font-display text-lg font-semibold text-white">{plan}</h4><div className="flex items-baseline gap-1 rounded-lg border border-white/[0.03] bg-[#100d16] p-4"><span className="font-display text-3xl font-extrabold text-white">{price}</span><span className="font-mono text-xs text-brand-text-muted">PERPETUAL ONE-TIME PAYMENT</span></div><p className="text-xs leading-relaxed text-brand-text-muted">{desc}</p><div className="space-y-2.5 border-t border-white/5 pt-4">{(checks as string[]).map((chk) => <div key={chk} className="flex items-start gap-2.5 text-xs text-brand-text"><span className="shrink-0 font-bold text-green-400">✓</span><span>{chk}</span></div>)}</div></div>
              <button onClick={onCartOpen} className="w-full cursor-pointer rounded-lg border border-brand-primary bg-brand-primary/10 py-2.5 text-center text-xs font-semibold text-brand-primary-dim shadow shadow-purple-950/20 transition hover:bg-brand-primary hover:text-white">Initiate Secure Purchase</button>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="relative flex min-h-screen bg-[#0d0a14] font-sans text-brand-text">
      {mobileSidebarOpen && <div onClick={() => setMobileSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" />}

      <aside className={`fixed top-0 z-40 flex h-screen w-[260px] shrink-0 flex-col justify-between overflow-y-auto border-r border-white/5 bg-[#0d0a14] pb-6 transition-transform duration-200 lg:sticky ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div>
          <div className="flex items-center justify-between border-b border-white/5 bg-[#100d16] p-5">
            <button onClick={() => { handleSelectPage("introduction"); setMobileSidebarOpen(false); }} className="flex cursor-pointer items-center gap-2.5 p-0 text-left">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-brand-primary text-white shadow-lg shadow-purple-900/30"><span className="font-display text-sm font-extrabold leading-none tracking-tighter">F</span></div>
              <span className="flex items-center gap-1.5 font-display text-base font-bold tracking-tight text-white">FlowCut <span className="origin-left scale-95 rounded border border-white/10 bg-white/5 px-1 font-mono text-[10px] text-brand-secondary">PRO</span></span>
            </button>
            <button onClick={() => setMobileSidebarOpen(false)} className="rounded bg-white/5 p-1 text-brand-text transition hover:bg-white/10 lg:hidden"><X className="h-4.5 w-4.5" /></button>
          </div>
          <div className="space-y-6 p-4 pt-6">
            {navSections.map((sec) => (
              <div key={sec.title} className="space-y-1.5">
                <h5 className="px-3 font-mono text-[10px] font-bold uppercase tracking-widest text-brand-text-muted">{sec.title}</h5>
                <div className="space-y-0.5">
                  {sec.items.map((item) => {
                    const isActive = activePage === item.id;
                    return (
                      <button key={item.id} onClick={() => { handleSelectPage(item.id); setMobileSidebarOpen(false); }} className={`flex w-full cursor-pointer select-none items-center justify-between rounded-md px-3 py-1.5 text-left font-sans text-xs font-medium transition ${isActive ? "bg-brand-primary/15 text-white shadow-sm shadow-purple-950/10" : "text-brand-text-muted hover:bg-white/5 hover:text-white"}`}>
                        <div className="flex items-center gap-2.5"><span className={isActive ? "text-brand-primary-dim" : "text-brand-text-muted opacity-80"}>{pageIcon(item.id)}</span><span>{item.label}</span></div>
                        {item.badge && <span className="rounded bg-brand-primary px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide text-purple-100">{item.badge}</span>}
                        {item.hasChevron && <ChevronRight className={`h-3.5 w-3.5 opacity-50 transition ${isActive ? "translate-x-0.5" : ""}`} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-3 px-4">
          <div className="my-3 border-t border-white/5" />
          <button onClick={onCartOpen} className="group relative w-full cursor-pointer overflow-hidden rounded-lg border border-purple-500/20 bg-gradient-to-r from-brand-primary to-[#5b21b6] p-3 text-left text-white shadow-md shadow-purple-950/20 transition duration-300 active:scale-[0.99]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="flex items-center justify-between"><span className="font-display text-xs font-semibold tracking-wide">{purchasedKey ? "Workspace Activated" : "Buy FlowCut"}</span><ShoppingCart className="h-3.5 w-3.5 text-brand-primary-dim transition group-hover:translate-x-0.5" /></div>
            <p className="mt-1 text-[10px] leading-normal text-purple-200">{purchasedKey ? "Keys synced. Open quickstart to review license tags." : "Perpetual multi-editor licenses. Instant core activation key."}</p>
          </button>
          <button onClick={() => handleSelectPage("report-issue")} className="flex w-full cursor-pointer items-center justify-between rounded-md border border-white/5 bg-[#100d16] px-3 py-2 text-xs text-brand-text transition hover:bg-[#1a1723] hover:text-white">
            <div className="flex items-center gap-2"><Info className="h-4 w-4 text-brand-text-muted" /><span>Discord Community</span></div><span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
          </button>
        </div>
      </aside>

      <div className="flex max-h-screen min-w-0 flex-1 flex-col overflow-y-auto">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/5 bg-[#0d0a14]/85 px-4 backdrop-blur-md md:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileSidebarOpen(true)} className="rounded border border-white/5 bg-[#15121b] p-1.5 text-brand-text transition hover:text-white lg:hidden" title="Open Navigation"><Menu className="h-5 w-5" /></button>
            <button onClick={() => handleSelectPage("introduction")} className="flex cursor-pointer items-center gap-2 p-0 text-left lg:hidden"><div className="flex h-6.5 w-6.5 items-center justify-center rounded bg-brand-primary text-xs font-extrabold text-white">F</div><span className="font-display text-sm font-bold text-white">FlowCut</span></button>
            <button onClick={() => handleSelectPage("introduction")} className="hidden cursor-pointer items-center gap-1 text-xs text-brand-text-muted transition hover:text-purple-300 lg:flex"><BookOpen className="h-3.5 w-3.5" /><span>Documentation Hub</span></button>
          </div>
          <div className="mx-4 max-w-sm flex-1">
            <button onClick={() => setSearchOpen(true)} className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-white/10 bg-[#100d16] px-3 py-1.5 text-xs text-brand-text-muted transition hover:border-white/20 hover:text-brand-text">
              <div className="flex items-center gap-2"><Search className="h-4 w-4 text-brand-text-muted" /><span>Search documentation...</span></div><kbd className="hidden select-none rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] sm:inline-block">⌘K</kbd>
            </button>
          </div>
          <div className="flex items-center gap-3">
            {purchasedKey && <div className="hidden items-center gap-1.5 rounded border border-green-500/20 bg-green-500/10 px-2.5 py-1 font-mono text-[10px] font-semibold text-green-300 sm:flex"><CheckCircle2 className="h-3.5 w-3.5 text-green-400" /><span>VIP ACTIVE</span></div>}
            <button onClick={() => handleSelectPage("quickstart")} className="cursor-pointer rounded-md bg-brand-primary px-4 py-2 text-xs font-semibold text-white shadow shadow-purple-950/20 transition active:scale-[0.98]">Get Started</button>
          </div>
        </header>

        <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-start gap-8 px-4 py-8 md:px-8 lg:grid-cols-12 lg:py-12">
          <main className="space-y-6 lg:col-span-9">
            <div className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-brand-text-muted">
              {currentPageData.breadcrumbs.map((crumb, idx) => (
                <Fragment key={crumb}>{idx > 0 && <ChevronRight className="h-3.5 w-3.5" />}<span>{crumb}</span></Fragment>
              ))}
            </div>
            <div className="space-y-4">
              <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">{currentPageData.title}</h1>
              <p className="max-w-4xl text-sm leading-relaxed text-brand-text-muted md:text-base">{currentPageData.subtitle}</p>
            </div>

            {renderPageSpecificContent()}

            <div className="space-y-8 py-4">
              {currentPageData.sections.map((sec, idx) => (
                <div key={sec.anchor} id={sec.anchor} className="scroll-mt-20 space-y-3.5">
                  <h3 className="group flex items-center gap-2 font-display text-lg font-bold text-white md:text-xl"><span>{sec.heading}</span><a href={`#${sec.anchor}`} className="font-mono text-sm font-normal text-brand-primary-dim opacity-0 transition group-hover:opacity-100">#</a></h3>
                  <p className="text-xs leading-relaxed text-brand-text-muted md:text-sm">{sec.body}</p>
                  {sec.code && (
                    <div className="group relative mt-4 overflow-hidden rounded-lg border border-white/10 bg-[#100d16] font-mono text-xs shadow-inner">
                      <div className="flex items-center justify-between border-b border-white/5 px-4 py-2 text-[10px] uppercase text-brand-text-muted"><span>{sec.lang || "code block"} format</span><button onClick={() => handleCopyCode(sec.code!, idx)} className="cursor-pointer font-sans font-bold uppercase transition hover:text-white">{copiedSectionIndex === idx ? <span className="text-green-400">copied!</span> : "Copy clip"}</button></div>
                      <pre className="overflow-x-auto whitespace-pre p-4 text-left font-mono leading-relaxed text-purple-200"><code>{sec.code}</code></pre>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-white/5 bg-[#15121b] p-5">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div><h4 className="font-display text-sm font-semibold text-white">Was this page helpful?</h4><p className="mt-1 text-xs text-brand-text-muted">Your feedback helps improve the FlowCut docs.</p></div>
                <div className="flex gap-2"><button className="cursor-pointer rounded border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white transition hover:bg-white/10">Yes</button><button className="cursor-pointer rounded border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white transition hover:bg-white/10">No</button></div>
              </div>
              {currentPageData.nextPage && <button onClick={() => handleSelectPage(currentPageData.nextPage!.id)} className="mt-5 flex w-full cursor-pointer items-center justify-between rounded-lg border border-white/10 bg-[#100d16] px-4 py-3 text-left transition hover:border-brand-primary/40"><span className="text-xs text-brand-text-muted">Next: <strong className="text-white">{currentPageData.nextPage.label}</strong></span><ChevronRight className="h-4 w-4 text-brand-primary-dim" /></button>}
            </div>
          </main>

          <aside className="sticky top-24 hidden select-none space-y-8 self-start border-l border-white/5 pl-4 lg:col-span-3 lg:block">
            <div className="space-y-4">
              <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-slate-200">ON THIS PAGE</span>
              <ul className="block space-y-3">
                {activePage === "introduction" && (
                  <>
                    <li><button onClick={() => handleSelectPage("introduction", "how-it-works")} className="cursor-pointer text-left text-xs text-brand-text-muted transition hover:text-white">How it works</button></li>
                    <li><button onClick={() => handleSelectPage("introduction", "key-features")} className="cursor-pointer text-left text-xs text-brand-text-muted transition hover:text-white">Key Features</button></li>
                  </>
                )}
                {currentPageData.sections.map((sec) => <li key={sec.anchor}><button onClick={() => handleSelectPage(activePage, sec.anchor)} className="cursor-pointer text-left text-xs capitalize leading-tight text-brand-text-muted transition hover:text-white">{sec.heading.replace(/[0-9]\.\s/, "").toLowerCase()}</button></li>)}
              </ul>
            </div>
            <div className="space-y-3 rounded-xl border border-white/5 bg-[#15121b] p-4 shadow-lg">
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase text-brand-secondary"><Info className="h-3.5 w-3.5" /> OFFLINE ENGINE STATUS</div>
              <p className="text-[11px] leading-relaxed text-brand-text-muted">FlowCut runs localized binaries in high performance blocks. Need a key to test?</p>
              <button onClick={onCartOpen} className="w-full cursor-pointer rounded border border-white/10 bg-[#100d16] py-1.5 text-[11px] font-semibold text-brand-primary-dim transition hover:border-white/20 hover:text-purple-300">Acquire Free Sandbox VIP Key</button>
            </div>
          </aside>
        </div>

        <footer className="mt-auto flex flex-col items-center justify-between gap-4 border-t border-white/5 bg-[#100d16]/40 px-6 py-8 text-xs sm:flex-row">
          <div className="text-brand-text-muted"><span className="font-display font-semibold text-white">FlowCut Pro Documentation</span><span className="mt-0.5 block text-[10px]">&copy; 2026 FlowCut Pro SRL. All rights protected.</span></div>
          <div className="flex gap-4 font-mono text-[10px] text-brand-text-muted"><button onClick={() => onNavigate("extensions")} className="cursor-pointer hover:text-white">PRIVACY</button><button onClick={onOpenFlowCut} className="cursor-pointer hover:text-white">TERMS</button><button onClick={onOpenContact} className="cursor-pointer hover:text-white">SUPPORT</button></div>
        </footer>
      </div>

      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 p-4 pt-24 backdrop-blur-sm" onClick={() => setSearchOpen(false)}>
          <div className="w-full max-w-xl rounded-xl border border-white/10 bg-[#15121b] shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 border-b border-white/5 p-4"><Search className="h-4 w-4 text-brand-text-muted" /><input autoFocus placeholder="Search documentation..." className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-brand-text-muted" /></div>
            <div className="max-h-[420px] overflow-y-auto p-2">
              {Object.values(docPages).map((page) => <button key={page.id} onClick={() => { handleSelectPage(page.id); setSearchOpen(false); }} className="block w-full cursor-pointer rounded-lg p-3 text-left transition hover:bg-white/5"><span className="block text-sm font-semibold text-white">{page.title}</span><span className="mt-1 block text-xs text-brand-text-muted">{page.subtitle}</span></button>)}
            </div>
          </div>
        </div>
      )}

      {activeVideoPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setActiveVideoPlayer(null)} className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
          <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-[#15121b] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 bg-[#1a1622] p-4 text-xs"><span className="max-w-xs truncate font-semibold text-white">{activeVideoPlayer.title}</span><button onClick={() => setActiveVideoPlayer(null)} className="rounded p-1 text-brand-text transition hover:bg-white/10"><X className="h-4 w-4" /></button></div>
            <div className="relative flex aspect-video items-center justify-center bg-[#0d0a14]">
              <div className="z-0 flex scale-125 items-center gap-1"><span className={`w-1 rounded-full bg-brand-primary-dim transition-all duration-300 ${activeVideoPlayer.playing ? "h-16 animate-bounce" : "h-8"}`} /><span className={`w-1 rounded-full bg-brand-primary transition-all duration-300 ${activeVideoPlayer.playing ? "h-24 animate-bounce" : "h-10"}`} /><span className={`w-1 rounded-full bg-brand-secondary transition-all duration-300 ${activeVideoPlayer.playing ? "h-32 animate-bounce" : "h-12"}`} /></div>
              {!activeVideoPlayer.playing && <div className="absolute inset-0 flex items-center justify-center bg-black/30"><button onClick={() => setActiveVideoPlayer({ ...activeVideoPlayer, playing: true })} className="cursor-pointer rounded-full bg-brand-primary p-4 text-white shadow-lg shadow-purple-950/50 transition hover:scale-110"><Play className="ml-0.5 h-6 w-6 fill-current" /></button></div>}
            </div>
            <div className="space-y-3.5 bg-[#100d16] p-4">
              <div className="flex items-center justify-between font-mono text-[10px] text-brand-text-muted"><span>{Math.floor(activeVideoPlayer.playtime / 60)}:{(activeVideoPlayer.playtime % 60).toString().padStart(2, "0")}</span><span>{activeVideoPlayer.duration}</span></div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-[#15121b]"><div className="h-1 rounded-full bg-brand-primary transition-all duration-1000" style={{ width: `${(activeVideoPlayer.playtime / (Number(activeVideoPlayer.duration.split(":")[0]) * 60 + Number(activeVideoPlayer.duration.split(":")[1]))) * 100}%` }} /></div>
              <div className="flex items-center justify-between"><button onClick={() => setActiveVideoPlayer({ ...activeVideoPlayer, playing: !activeVideoPlayer.playing })} className="flex cursor-pointer items-center gap-1.5 rounded border border-white/5 bg-white/5 px-3 p-1.5 text-xs font-semibold text-white transition hover:border-white/10 hover:bg-white/10">{activeVideoPlayer.playing ? <><Pause className="h-4.5 w-4.5 fill-current" /> Pause Sequence</> : <><Play className="h-4.5 w-4.5 fill-current" /> Play Tutorial</>}</button><span className="flex items-center gap-1 font-mono text-[10px] text-brand-text-muted"><Volume2 className="h-3.5 w-3.5" /> MUTE OVERLAY ENABLED</span></div>
            </div>
          </div>
        </div>
      )}

      <CartDrawer isOpen={isCartOpen} onClose={onCartClose} cart={[]} onUpdateQuantity={() => undefined} onRemoveItem={() => undefined} onClearCart={() => undefined} />
    </div>
  );
}
