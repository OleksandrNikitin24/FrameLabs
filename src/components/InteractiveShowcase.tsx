import { useState, useEffect } from "react";
import { Check, Zap, Eye, EyeOff, Activity, RefreshCw, Layers } from "lucide-react";

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
      // Simulate speech signal swinging from -60dB (silence) to -10dB (loud speaking)
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
    // Gate is open (meaning sound passes through) when input is louder (higher decibels) than threshold
    setGateOpen(inputLevel > gateThreshold);
  }, [inputLevel, gateThreshold]);

  // Batch Processor execution simulation
  const startBatchProcess = () => {
    if (isProcessingBatch) return;
    setIsProcessingBatch(true);
    
    // Set active item status
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
            if (tick < 40) return item; // delayed start for item 4
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
    <section id="features-hub" className="max-w-7xl mx-auto px-6 sm:px-8 py-20 space-y-36">
      
      {/* 1. AUTOMATED PRECISION: Instant Jump-Cuts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-18 items-center">
        {/* Left text column */}
        <div className="space-y-6 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7C3AED] font-mono">
            AUTOMATED PRECISION
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-white tracking-tight">
            Instant Jump-Cuts
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed font-body font-light">
            FlowCut scans your audio and removes every silence with millisecond precision, creating a perfect rough cut instantly. No more tedious manual scanning for dead air.
          </p>

          <div className="space-y-4 pt-2">
            {[
              "Precision silence detection",
              "Automatic timeline ripple editing",
              "Saves hours on every interview edit"
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-purple/10 border border-brand-purple/30 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-brand-purple-light" />
                </div>
                <span className="text-sm font-body text-[#E8DFEE]">{text}</span>
              </div>
            ))}
          </div>

          {/* Interactive controls inside block */}
          <div className="bg-white/5 border border-white/5 rounded-lg p-4 mt-8 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-white block">Visualizer Timeline Mode</span>
              <p className="text-[11px] text-text-muted">Compare speech segment ripple edits instantly.</p>
            </div>
            <div className="flex gap-1.5 bg-black/40 p-1.5 rounded-lg border border-white/5">
              <button
                onClick={() => setCutsMode("before")}
                className={`cursor-pointer px-3 py-1.5 text-[10px] font-mono font-bold rounded transition-all ${
                  cutsMode === "before" ? "bg-white/10 text-white" : "text-text-muted hover:text-white"
                }`}
              >
                Before
              </button>
              <button
                onClick={() => setCutsMode("after")}
                className={`cursor-pointer px-3 py-1.5 text-[10px] font-mono font-bold rounded transition-all ${
                  cutsMode === "after" ? "bg-brand-purple text-white" : "text-text-muted hover:text-white"
                }`}
              >
                After
              </button>
            </div>
          </div>
        </div>

        {/* Right side graphical/interactive illustration container */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/15 to-transparent rounded-2xl filter blur-xl opacity-60 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative glass-card rounded-2xl p-4 overflow-hidden border border-white/10 shadow-2xl bg-black/40">
            
            {/* Show the primary illustrated image */}
            <div className="aspect-square w-full rounded-xl overflow-hidden relative">
              <img
                src={neonCubeSrc}
                alt="Instant Jump-Cuts"
                referrerPolicy="no-referrer"
                className="object-cover w-full h-full transform transition duration-500 group-hover:scale-[1.02]"
              />

              {/* Seamlessly overlaid Interactive Timeline Previewer */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/85 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="flex justify-between items-center text-[10px] text-text-muted uppercase tracking-wider font-mono mb-2">
                  <span>Target Speech Segment</span>
                  <span className={cutsMode === "after" ? "text-brand-purple-light" : "text-zinc-500"}>
                    {cutsMode === "after" ? "Dead Air Rippled Out" : "Dead Air Intact"}
                  </span>
                </div>

                {/* Simulated waveforms */}
                <div className="flex items-center gap-[2px] h-10 w-full bg-black/50 border border-white/5 rounded px-2 overflow-hidden">
                  {Array.from({ length: 45 }).map((_, i) => {
                    const isLeftWord = i >= 3 && i <= 15;
                    const isSilence = i > 15 && i < 30;
                    const isRightWord = i >= 30 && i <= 42;

                    let height = "10%";
                    if (isLeftWord) height = `${25 + Math.sin(i * 0.9) * 55}%`;
                    if (isRightWord) height = `${30 + Math.abs(Math.cos(i * 0.7)) * 50}%`;
                    if (isSilence) {
                      if (cutsMode === "after") {
                        // Invisible because it is cut!
                        return null;
                      }
                      height = "8%";
                    }

                    return (
                      <div
                        key={i}
                        style={{ height }}
                        className={`flex-1 min-w-[3px] rounded-t-sm ${
                          isSilence ? "bg-red-500/20" : "bg-brand-purple-light"
                        }`}
                      ></div>
                    );
                  })}
                </div>
                
                <div className="flex justify-between text-[9px] font-mono text-text-muted mt-1.5">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-18 items-center">
        
        {/* Left Image Column (Takes left spot on desktop) */}
        <div className="relative order-2 lg:order-1 group">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/15 to-transparent rounded-2xl filter blur-xl opacity-60 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative glass-card rounded-2xl p-4 overflow-hidden border border-white/10 shadow-2xl bg-black/40">
            <div className="aspect-square w-full rounded-xl overflow-hidden relative">
              <img
                src={pineForestSrc}
                alt="Intelligent Noise Gate forest representation"
                referrerPolicy="no-referrer"
                className="object-cover w-full h-full transform transition duration-500 group-hover:scale-[1.02]"
              />

              {/* Dynamic Signal Gate Meter Simulator Overlay */}
              <div className="absolute top-4 left-4 right-4 bg-brand-surface-dim/95 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white font-mono flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-brand-blue" /> Live Gate Analyzer
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider font-mono ${
                    gateOpen ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                  }`}>
                    {gateOpen ? "Sound Passing (Open)" : "Muted (Closed)"}
                  </span>
                </div>

                {/* Gate sliders / meters */}
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[9px] font-mono text-text-muted mb-1">
                      <span>Gateway Threshold: {gateThreshold} dB</span>
                      <span>Signal: {inputLevel} dB</span>
                    </div>

                    {/* Level meter bar */}
                    <div className="h-2.5 w-full bg-black/40 rounded border border-white/5 relative overflow-hidden flex">
                      {/* Active green signal color if open, blue if muted */}
                      <div
                        style={{ width: `${Math.max(0, (inputLevel + 70) * 1.4)}%` }}
                        className={`transition-all duration-300 ${
                          gateOpen ? "bg-brand-blue" : "bg-zinc-600"
                        }`}
                      ></div>

                      {/* Threshold point marker */}
                      <div
                        style={{ left: `${Math.max(0, (gateThreshold + 70) * 1.4)}%` }}
                        className="absolute top-0 bottom-0 w-[1.5px] bg-white shadow-md cursor-pointer"
                      >
                        <div className="w-2 h-2 bg-white rounded-full absolute -top-0.5 -left-[3px]"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1 uppercase font-mono text-[9px] text-text-muted">
                    <span className="text-[10px] text-white">Manual override:</span>
                    <input
                      type="range"
                      min="-50"
                      max="-15"
                      value={gateThreshold}
                      onChange={(e) => setGateThreshold(Number(e.target.value))}
                      className="flex-1 accent-brand-blue h-1 cursor-pointer rounded"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right text column (Takes right spot on desktop) */}
        <div className="space-y-6 text-left order-1 lg:order-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0EA5E9] font-mono">
            NATURAL FLOW
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-white tracking-tight">
            Intelligent Noise Gate
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed font-body font-light">
            Adjustable sensitivity ensures you keep the natural breath of a conversation while stripping away the unwanted gaps. Maintain the human element of your storytelling.
          </p>

          <div className="space-y-4 pt-2">
            {[
              "Customizable decibel thresholds",
              "Breath-retention AI processing",
              "Smooth fade-out/in transitions"
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-brand-blue" />
                </div>
                <span className="text-sm font-body text-[#E8DFEE]">{text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 3. HIGH VELOCITY: Batch Clip Processing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-18 items-center">
        
        {/* Left text column */}
        <div className="space-y-6 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow font-mono">
            HIGH VELOCITY
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-white tracking-tight">
            Batch Clip Processing
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed font-body font-light">
            Process hours of footage in one click. Drop your clips on the timeline and let FlowCut handle the heavy lifting while you grab a coffee.
          </p>

          <div className="space-y-4 pt-2">
            {[
              "Multi-clip timeline processing",
              "Background rendering integration",
              "Standardized cutting presets"
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-brand-yellow" />
                </div>
                <span className="text-sm font-body text-[#E8DFEE]">{text}</span>
              </div>
            ))}
          </div>

          {/* Interactive Batch processing actions */}
          <div className="pt-4 flex gap-3">
            <button
              onClick={startBatchProcess}
              disabled={isProcessingBatch}
              className={`cursor-pointer px-4 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                isProcessingBatch
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5"
                  : "bg-brand-yellow text-black hover:scale-[1.02] shadow-lg shadow-brand-yellow/15"
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isProcessingBatch ? "animate-spin" : ""}`} />
              {isProcessingBatch ? "Processing Queue..." : "Start Batch Demo"}
            </button>
            <button
              onClick={resetBatch}
              className="cursor-pointer bg-white/5 border border-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-bold px-4 py-2.5 transition"
            >
              Reset Queue
            </button>
          </div>
        </div>

        {/* Right side graphics & Interactive Batch Queue */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-yellow/10 to-transparent rounded-2xl filter blur-xl opacity-60 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative glass-card rounded-2xl p-4 overflow-hidden border border-white/10 shadow-2xl bg-black/40">
            <div className="aspect-square w-full rounded-xl overflow-hidden relative flex flex-col justify-between">
              
              {/* Core generated background graphic */}
              <img
                src={wireframeMeshSrc}
                alt="Wireframe squares mesh"
                referrerPolicy="no-referrer"
                className="absolute inset-0 object-cover w-full h-full opacity-40 mix-blend-screen pointer-events-none"
              />

              {/* Real Interactive Batch Progression Lists */}
              <div className="relative z-10 p-4 bg-brand-surface-dim/95 border border-white/10 rounded-xl m-2 h-[calc(100%-16px)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-brand-yellow" /> Batch Rendering Panel
                    </span>
                    <span className="text-[9px] font-mono text-text-muted">4 Files Detected</span>
                  </div>

                  {/* Active Lists */}
                  <div className="space-y-3">
                    {batchQueue.map((item, id) => (
                      <div key={id} className="bg-white/5 border border-white/5 rounded p-2 text-left space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-white font-mono truncate max-w-[160px] sm:max-w-xs block">
                            {item.name}
                          </span>
                          <span className={`text-[9px] font-mono font-bold ${
                            item.status === "Completed" ? "text-emerald-400" : item.status === "Processing" ? "text-brand-yellow animate-pulse" : "text-text-muted"
                          }`}>
                            {item.status}
                          </span>
                        </div>

                        {/* Custom progress sliders bar */}
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-black/40 rounded overflow-hidden">
                            <div
                              style={{ width: `${item.progress}%` }}
                              className={`h-full transition-all duration-300 ${
                                item.status === "Completed" ? "bg-emerald-500" : "bg-brand-yellow"
                              }`}
                            ></div>
                          </div>
                          <span className="text-[9px] font-mono text-white leading-none w-6 text-right">
                            {item.progress}%
                          </span>
                        </div>

                        {/* Metric stats line if finished */}
                        {item.status === "Completed" && (
                          <div className="flex justify-between items-center text-[9px] font-mono text-emerald-400/80 bg-emerald-500/5 px-1.5 py-0.5 rounded">
                            <span>Saves:</span>
                            <span className="font-bold">-{item.saved}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[10px] text-text-muted text-center pt-2.5 border-t border-white/5 font-mono">
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
