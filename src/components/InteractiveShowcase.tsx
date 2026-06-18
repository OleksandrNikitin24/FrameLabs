import { useState, useEffect } from "react";
import { Check, Activity, RefreshCw, Layers } from "lucide-react";

// Image references generated previously
const neonCubeSrc = "/src/assets/images/neon_cube_1779313612978.png";
const pineForestSrc = "/src/assets/images/pine_forest_1779313646259.png";
const wireframeMeshSrc = "/src/assets/images/wireframe_mesh_1779313665182.png";

export function InteractiveShowcase() {
  // Section 1 State: Instant Jump-Cuts representation slider
  const [cutsMode, setCutsMode] = useState<"before" | "after">("after");

  // Section 2 State: Noise gate meter
  const [gateOpen, setGateOpen] = useState(true);
  const [inputLevel, setInputLevel] = useState(-45); // dB
  const [gateThreshold, setGateThreshold] = useState(-30); // dB

  // Section 3 State: Batch progress bars
  const [batchQueue, setBatchQueue] = useState([
    { name: "interview_danielle_v2.mp4", size: "1.2 GB", progress: 100, status: "Completed", saved: "18m 42s" },
    { name: "podcast_panel_ep04.wav", size: "480 MB", progress: 100, status: "Completed", saved: "9m 11s" },
    { name: "vlog_outdoor_broll.mov", size: "3.4 GB", progress: 0, status: "Idle", saved: "--" },
    { name: "interview_customer_01.mp4", size: "850 MB", progress: 0, status: "Idle", saved: "--" }
  ]);
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);

  // Noise Gate simulated signal generator
  useEffect(() => {
    const timer = setInterval(() => {
      setInputLevel(prev => {
        const delta = (Math.random() - 0.45) * 20;
        let next = prev + delta;
        if (next > -10) next = -20;
        if (next < -60) next = -50;
        return Math.round(next);
      });
    }, 400);

    return () => clearInterval(timer);
  }, []);

  // Update gate state
  useEffect(() => {
    setGateOpen(inputLevel > gateThreshold);
  }, [inputLevel, gateThreshold]);

  // Batch Processor execution simulation
  const startBatchProcess = () => {
    if (isProcessingBatch) return;
    setIsProcessingBatch(true);

    setBatchQueue(prev => prev.map((item, idx) => idx >= 2 ? { ...item, status: "Processing", progress: 5 } : item));

    let tick = 0;
    const interval = setInterval(() => {
      tick += 10;
      setBatchQueue(prev => {
        return prev.map((item, idx) => {
          if (idx === 2) {
            const newProgress = Math.min(item.progress + 25, 100);
            return {
              ...item,
              progress: newProgress,
              status: newProgress === 100 ? "Completed" : "Processing",
              saved: newProgress === 100 ? "46m 12s" : "--"
            };
          }
          if (idx === 3) {
            if (tick < 40) return item;
            const newProgress = Math.min(item.progress + 15, 100);
            return {
              ...item,
              progress: newProgress,
              status: newProgress === 100 ? "Completed" : "Processing",
              saved: newProgress === 100 ? "12m 04s" : "--"
            };
          }
          return item;
        });
      });

      if (tick >= 120) {
        clearInterval(interval);
        setIsProcessingBatch(false);
      }
    }, 400);
  };

  const resetBatch = () => {
    setBatchQueue([
      { name: "interview_danielle_v2.mp4", size: "1.2 GB", progress: 100, status: "Completed", saved: "18m 42s" },
      { name: "podcast_panel_ep04.wav", size: "480 MB", progress: 100, status: "Completed", saved: "9m 11s" },
      { name: "vlog_outdoor_broll.mov", size: "3.4 GB", progress: 0, status: "Idle", saved: "--" },
      { name: "interview_customer_01.mp4", size: "850 MB", progress: 0, status: "Idle", saved: "--" }
    ]);
    setIsProcessingBatch(false);
  };

  return (
    <section id="features-hub" className="mx-auto max-w-[1080px] px-6 py-24 space-y-32 sm:px-8">

      {/* 1. AUTOMATED PRECISION: Instant Jump-Cuts */}
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-18">
        <div className="space-y-6 text-left">
          <span className="text-[14px] font-semibold tracking-[-0.224px] text-action">
            Automated precision
          </span>
          <h2 className="font-sans text-[34px] font-semibold tracking-[-0.374px] text-ink sm:text-[40px]">
            Instant Jump-Cuts
          </h2>
          <p className="text-[17px] leading-[1.47] tracking-[-0.374px] text-ink-48">
            FlowCut scans your audio and removes every silence with frame-accurate precision, creating a perfect rough cut instantly. No more tedious manual scanning for dead air.
          </p>

          <div className="space-y-4 pt-2">
            {[
              "Precision silence detection",
              "Automatic timeline ripple editing",
              "Saves hours on every interview edit"
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-action/10">
                  <Check className="h-3.5 w-3.5 text-action" />
                </div>
                <span className="text-[17px] text-ink">{text}</span>
              </div>
            ))}
          </div>

          {/* Inline control */}
          <div className="mt-8 flex items-center justify-between rounded-[11px] border border-hairline bg-parchment p-4">
            <div className="space-y-1">
              <span className="block text-[14px] font-semibold text-ink">Visualizer Timeline Mode</span>
              <p className="text-[12px] text-ink-48">Compare speech segment ripple edits instantly.</p>
            </div>
            <div className="flex gap-1.5 rounded-full bg-white p-1 ring-1 ring-hairline">
              <button
                onClick={() => setCutsMode("before")}
                className={`cursor-pointer rounded-full px-3 py-1.5 text-[12px] font-medium transition ${
                  cutsMode === "before" ? "bg-ink text-white" : "text-ink-48 hover:text-ink"
                }`}
              >
                Before
              </button>
              <button
                onClick={() => setCutsMode("after")}
                className={`cursor-pointer rounded-full px-3 py-1.5 text-[12px] font-medium transition ${
                  cutsMode === "after" ? "bg-action text-white" : "text-ink-48 hover:text-ink"
                }`}
              >
                After
              </button>
            </div>
          </div>
        </div>

        {/* Product panel (dark imagery resting on the light surface) */}
        <div className="relative">
          <div className="product-shadow relative overflow-hidden rounded-[18px] bg-black p-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl">
              <img
                src={neonCubeSrc}
                alt="Instant Jump-Cuts"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />

              <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/10 bg-black/85 p-3 backdrop-blur-sm">
                <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-wider text-white/60">
                  <span>Target Speech Segment</span>
                  <span className={cutsMode === "after" ? "text-sky" : "text-zinc-500"}>
                    {cutsMode === "after" ? "Dead Air Rippled Out" : "Dead Air Intact"}
                  </span>
                </div>

                <div className="flex h-10 w-full items-center gap-[2px] overflow-hidden rounded border border-white/5 bg-black/50 px-2">
                  {Array.from({ length: 45 }).map((_, i) => {
                    const isLeftWord = i >= 3 && i <= 15;
                    const isSilence = i > 15 && i < 30;
                    const isRightWord = i >= 30 && i <= 42;

                    let height = "10%";
                    if (isLeftWord) height = `${25 + Math.sin(i * 0.9) * 55}%`;
                    if (isRightWord) height = `${30 + Math.abs(Math.cos(i * 0.7)) * 50}%`;
                    if (isSilence) {
                      if (cutsMode === "after") {
                        return null;
                      }
                      height = "8%";
                    }

                    return (
                      <div
                        key={i}
                        style={{ height }}
                        className={`min-w-[3px] flex-1 rounded-t-sm ${
                          isSilence ? "bg-red-500/20" : "bg-sky"
                        }`}
                      ></div>
                    );
                  })}
                </div>

                <div className="mt-1.5 flex justify-between text-[9px] text-white/50">
                  <span>Intro speaking</span>
                  {cutsMode === "before" && <span className="text-red-400">Silence (4.8s)</span>}
                  <span>Outro tips</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. NATURAL FLOW: Intelligent Noise Gate */}
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-18">
        <div className="relative order-2 lg:order-1">
          <div className="product-shadow relative overflow-hidden rounded-[18px] bg-black p-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl">
              <img
                src={pineForestSrc}
                alt="Intelligent Noise Gate forest representation"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />

              <div className="absolute left-4 right-4 top-4 rounded-lg border border-white/10 bg-[#161617]/95 p-4 backdrop-blur-sm">
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    <Activity className="h-3.5 w-3.5 text-sky" /> Live Gate Analyzer
                  </span>
                  <span className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                    gateOpen ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                  }`}>
                    {gateOpen ? "Sound Passing (Open)" : "Muted (Closed)"}
                  </span>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="mb-1 flex justify-between text-[9px] text-white/60">
                      <span>Gateway Threshold: {gateThreshold} dB</span>
                      <span>Signal: {inputLevel} dB</span>
                    </div>

                    <div className="relative flex h-2.5 w-full overflow-hidden rounded border border-white/5 bg-black/40">
                      <div
                        style={{ width: `${Math.max(0, (inputLevel + 70) * 1.4)}%` }}
                        className={`transition-all duration-300 ${
                          gateOpen ? "bg-sky" : "bg-zinc-600"
                        }`}
                      ></div>

                      <div
                        style={{ left: `${Math.max(0, (gateThreshold + 70) * 1.4)}%` }}
                        className="absolute bottom-0 top-0 w-[1.5px] cursor-pointer bg-white shadow-md"
                      >
                        <div className="absolute -left-[3px] -top-0.5 h-2 w-2 rounded-full bg-white"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1 text-[9px] uppercase text-white/60">
                    <span className="text-[10px] text-white">Manual override:</span>
                    <input
                      type="range"
                      min="-50"
                      max="-15"
                      value={gateThreshold}
                      onChange={(e) => setGateThreshold(Number(e.target.value))}
                      className="h-1 flex-1 cursor-pointer rounded accent-sky"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 space-y-6 text-left lg:order-2">
          <span className="text-[14px] font-semibold tracking-[-0.224px] text-action">
            Natural flow
          </span>
          <h2 className="font-sans text-[34px] font-semibold tracking-[-0.374px] text-ink sm:text-[40px]">
            Intelligent Noise Gate
          </h2>
          <p className="text-[17px] leading-[1.47] tracking-[-0.374px] text-ink-48">
            Adjustable sensitivity ensures you keep the natural breath of a conversation while stripping away the unwanted gaps. Maintain the human element of your storytelling.
          </p>

          <div className="space-y-4 pt-2">
            {[
              "Customizable decibel thresholds",
              "Breath-retention AI processing",
              "Smooth fade-out/in transitions"
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-action/10">
                  <Check className="h-3.5 w-3.5 text-action" />
                </div>
                <span className="text-[17px] text-ink">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. HIGH VELOCITY: Batch Clip Processing */}
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-18">
        <div className="space-y-6 text-left">
          <span className="text-[14px] font-semibold tracking-[-0.224px] text-action">
            High velocity
          </span>
          <h2 className="font-sans text-[34px] font-semibold tracking-[-0.374px] text-ink sm:text-[40px]">
            Batch Clip Processing
          </h2>
          <p className="text-[17px] leading-[1.47] tracking-[-0.374px] text-ink-48">
            Process hours of footage in one click. Drop your clips on the timeline and let FlowCut handle the heavy lifting while you grab a coffee.
          </p>

          <div className="space-y-4 pt-2">
            {[
              "Multi-clip timeline processing",
              "Background rendering integration",
              "Standardized cutting presets"
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-action/10">
                  <Check className="h-3.5 w-3.5 text-action" />
                </div>
                <span className="text-[17px] text-ink">{text}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={startBatchProcess}
              disabled={isProcessingBatch}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-medium transition ${
                isProcessingBatch
                  ? "cursor-not-allowed bg-parchment text-ink-48"
                  : "btn-pill !text-[14px]"
              }`}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isProcessingBatch ? "animate-spin" : ""}`} />
              {isProcessingBatch ? "Processing Queue..." : "Start Batch Demo"}
            </button>
            <button
              onClick={resetBatch}
              className="cursor-pointer rounded-full border border-hairline bg-white px-5 py-2.5 text-[14px] font-medium text-ink transition hover:bg-parchment"
            >
              Reset Queue
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="product-shadow relative overflow-hidden rounded-[18px] bg-black p-4">
            <div className="relative flex aspect-square w-full flex-col justify-between overflow-hidden rounded-xl">
              <img
                src={wireframeMeshSrc}
                alt="Wireframe squares mesh"
                referrerPolicy="no-referrer"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-screen"
              />

              <div className="relative z-10 m-2 flex h-[calc(100%-16px)] flex-col justify-between rounded-xl border border-white/10 bg-[#161617]/95 p-4">
                <div>
                  <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                      <Layers className="h-3.5 w-3.5 text-sky" /> Batch Rendering Panel
                    </span>
                    <span className="text-[9px] text-white/50">4 Files Detected</span>
                  </div>

                  <div className="space-y-3">
                    {batchQueue.map((item, id) => (
                      <div key={id} className="space-y-1.5 rounded border border-white/5 bg-white/5 p-2 text-left">
                        <div className="flex items-center justify-between">
                          <span className="block max-w-[160px] truncate text-xs font-medium text-white sm:max-w-xs">
                            {item.name}
                          </span>
                          <span className={`text-[9px] font-semibold ${
                            item.status === "Completed" ? "text-emerald-400" : item.status === "Processing" ? "animate-pulse text-sky" : "text-white/50"
                          }`}>
                            {item.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="h-1.5 flex-1 overflow-hidden rounded bg-black/40">
                            <div
                              style={{ width: `${item.progress}%` }}
                              className={`h-full transition-all duration-300 ${
                                item.status === "Completed" ? "bg-emerald-500" : "bg-sky"
                              }`}
                            ></div>
                          </div>
                          <span className="w-6 text-right text-[9px] leading-none text-white">
                            {item.progress}%
                          </span>
                        </div>

                        {item.status === "Completed" && (
                          <div className="flex items-center justify-between rounded bg-emerald-500/5 px-1.5 py-0.5 text-[9px] text-emerald-400/80">
                            <span>Saves:</span>
                            <span className="font-bold">-{item.saved}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-2.5 text-center text-[10px] text-white/50">
                  Saves automatically exported to <span className="text-white">FCP_Ripple_Seq.xml</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
