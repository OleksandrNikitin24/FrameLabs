import { useState, useEffect, useRef, MouseEvent } from "react";
import { Play, Pause, RotateCcw, Sliders, Check, Clock, Zap, Film } from "lucide-react";
import { AudioSegment } from "../types";

export function WaveformSimulator() {
  // Configurable controls
  const [threshold, setThreshold] = useState<number>(-29); // dB threshold
  const [minDuration, setMinDuration] = useState<number>(2); // frames
  const [padding, setPadding] = useState<number>(0); // frame padding
  const [isProcessed, setIsProcessed] = useState<boolean>(true); // default processed
  
  // Real-time playback representation
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const playRef = useRef<number | null>(null);

  // Hardcoded audio segments representing a mock podcast clip
  const segments: AudioSegment[] = [
    { id: "1", start: 0.0, end: 4.2, isSilence: false, text: "Hey video editors! Today I'm going to show you massive workflow tips..." },
    { id: "2", start: 4.2, end: 7.0, isSilence: true, text: "[... Long heavy breathing and throat clearing ...]" },
    { id: "3", start: 7.0, end: 11.8, isSilence: false, text: "We will use automatic cut structures to completely slice out dead air..." },
    { id: "4", start: 11.8, end: 15.2, isSilence: true, text: "[... Dead silence / looking at screen script ...]" },
    { id: "5", start: 15.2, end: 20.0, isSilence: false, text: "No more scrolling through waveforms manually. One click saves you ours." },
    { id: "6", start: 20.0, end: 21.0, isSilence: true, text: "[... Pause ...]" },
    { id: "7", start: 21.0, end: 25.0, isSilence: false, text: "Make sure you grab the free trial now to see FlowCut in action!" }
  ];

  // Dynamic evaluation of silence based on threshold:
  // Decibel levels of segments:
  // 1: -12dB (talking) -> speaking
  // 2: -45dB (breathing) -> silent if threshold is > -45dB
  // 3: -15dB (talking) -> speaking
  // 4: -55dB (dead air) -> silent if threshold is > -55dB
  // 5: -14dB (talking) -> speaking
  // 6: -38dB (sigh) -> silent if threshold is > -38dB
  // 7: -11dB (talking) -> speaking
  const evaluateSegments = (): AudioSegment[] => {
    return segments.map(seg => {
      if (seg.id === "2") {
        return { ...seg, isSilence: threshold > -45 };
      }
      if (seg.id === "4") {
        return { ...seg, isSilence: threshold > -55 };
      }
      if (seg.id === "6") {
        return { ...seg, isSilence: threshold > -38 };
      }
      return seg;
    });
  };

  const dynamicSegments = evaluateSegments();

  // Calculate timelines
  const totalOriginalDuration = 25; // seconds
  
  // Custom processed timeline chunks for fast jumping
  const activeSegments = dynamicSegments.filter(s => !isProcessed || !s.isSilence);
  const totalProcessedDuration = activeSegments.reduce((sum, s) => sum + (s.end - s.start), 0);
  const savedTime = totalOriginalDuration - totalProcessedDuration;
  const savedPercentage = Math.round((savedTime / totalOriginalDuration) * 100);

  // Handle playback loop
  useEffect(() => {
    if (isPlaying) {
      const step = () => {
        setCurrentTime((prev) => {
          let next = prev + 0.1;

          if (next >= totalOriginalDuration) {
            setIsPlaying(false);
            return 0;
          }

          // If processed is enabled, jump over silent segments
          if (isProcessed) {
            // Find current segment
            const currentSeg = dynamicSegments.find(s => next >= s.start && next < s.end);
            if (currentSeg && currentSeg.isSilence) {
              // Jump immediately to the end of the silent segment plus some tiny adjustment
              next = currentSeg.end;
            }
          }

          return next;
        });
        playRef.current = requestAnimationFrame(step);
      };
      playRef.current = requestAnimationFrame(step);
    } else {
      if (playRef.current) {
        cancelAnimationFrame(playRef.current);
      }
    }

    return () => {
      if (playRef.current) cancelAnimationFrame(playRef.current);
    };
  }, [isPlaying, isProcessed, threshold]);

  const handleProgressClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickedPercentage = x / rect.width;
    const destinationTime = clickedPercentage * totalOriginalDuration;
    setCurrentTime(destinationTime);
  };

  // Find the text of active segment being played
  const currentActiveSegment = dynamicSegments.find(
    (s) => currentTime >= s.start && currentTime < s.end
  );

  return (
    <div id="interactive-editor" className="w-full glass-card rounded-xl p-6 sm:p-8 max-w-5xl mx-auto my-6 border border-white/10 relative overflow-hidden">
      {/* Background glow flares */}
      <div className="glow-bg-purple right-0 top-0"></div>
      <div className="glow-bg-blue left-0 bottom-0"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-brand-purple/15 text-brand-purple-light border border-brand-purple/20 mb-2">
            <Film className="w-3.5 h-3.5" /> Interactive Precision Simulator
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-sans text-white">
            FlowCut 3.0 Real-time Workspace
          </h3>
          <p className="text-sm text-text-muted mt-1 max-w-xl">
            Test our cutting engine below. Adjust the decibel threshold to automatically label breaths versus talking, and click play to watch silence disappear under the cut-head.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsProcessed(!isProcessed)}
            className={`cursor-pointer px-4 py-2 text-xs font-semibold rounded-md transition-all duration-200 border flex items-center gap-2 ${
              isProcessed
                ? "bg-brand-purple text-white border-brand-purple shadow-lg shadow-brand-purple/25"
                : "bg-white/5 text-text-muted border-white/10 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            {isProcessed ? "FlowCut Enabled" : "Original (Uncut)"}
          </button>
        </div>
      </div>

      {/* Main interactive interface grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Visual Waveform Viewport */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Waveform and Playhead Track Group */}
          <div className="relative bg-black/60 rounded-lg p-4 border border-white/5">
            <div className="flex justify-between text-[11px] font-mono text-text-muted/60 mb-2">
              <span>0:00s</span>
              <span>0:05s</span>
              <span>0:10s</span>
              <span>0:15s</span>
              <span>0:20s</span>
              <span>0:25s</span>
            </div>

            {/* Clickable progress track overlay */}
            <div 
              onClick={handleProgressClick}
              className="relative h-24 w-full bg-black/30 rounded-md cursor-pointer overflow-hidden flex items-end gap-[1.5px] px-1 select-none"
            >
              {/* Virtual waveform bar items */}
              {Array.from({ length: 90 }).map((_, i) => {
                const fraction = i / 90;
                const timeSec = fraction * totalOriginalDuration;
                // Associate timeSec with corresponding segment
                const segment = dynamicSegments.find(s => timeSec >= s.start && timeSec <= s.end);
                const isSilentSegment = segment?.isSilence ?? false;
                
                // Height calculation based on speak/silence
                let height = "12%";
                if (segment) {
                  if (segment.isSilence) {
                    // low rumble noise wave height
                    height = `${5 + Math.sin(i * 0.9) * 8}%`;
                  } else {
                    // conversational vocal amplitudes
                    height = `${40 + Math.abs(Math.sin(i * 0.4)) * 55}%`;
                  }
                }

                // Wave color highlights
                let barColor = "bg-white/30";
                if (segment) {
                  if (segment.isSilence) {
                    barColor = isProcessed ? "bg-red-500/15 stripe-bg" : "bg-zinc-700/40";
                  } else {
                    barColor = "bg-brand-purple-light/80";
                  }
                }

                // If playhead has passed it
                const isPassed = currentTime >= timeSec;
                if (isPassed && segment && !segment.isSilence) {
                  barColor = "bg-brand-blue";
                }

                return (
                  <div
                    key={i}
                    style={{ height }}
                    className={`flex-1 min-w-[3px] rounded-t-sm transition-all duration-300 ${barColor}`}
                  ></div>
                );
              })}

              {/* Red vertical playhead */}
              <div
                style={{ left: `${(currentTime / totalOriginalDuration) * 100}%` }}
                className="absolute top-0 bottom-0 w-[2px] bg-red-500 shadow-md shadow-red-500/50 pointer-events-none transition-all duration-100 ease-linear"
              >
                <div className="absolute top-0 -left-1.5 w-4 h-2 bg-red-500 rounded-b-md"></div>
              </div>
            </div>

            {/* Simulated subtitle text overlay */}
            <div className="mt-4 min-h-[50px] bg-white/5 rounded p-3 text-center flex items-center justify-center border border-white/5">
              <p className={`text-sm tracking-wide ${
                currentActiveSegment?.isSilence 
                  ? "text-red-400/80 font-mono italic" 
                  : "text-white font-body font-medium"
              }`}>
                {currentActiveSegment ? currentActiveSegment.text : "Click Play to begin demo transcript analysis..."}
              </p>
            </div>
          </div>

          {/* Timeline and control bars */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-brand-surface-dim/40 p-4 rounded-lg border border-white/5">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="cursor-pointer w-10 h-10 flex items-center justify-center bg-brand-purple hover:bg-brand-purple-hover text-white rounded-full transition-all duration-150 transform hover:scale-105 active:scale-95 shadow-md shadow-brand-purple/20"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translation-x-[1px]" />}
              </button>

              <button
                onClick={() => { setCurrentTime(0); setIsPlaying(false); }}
                className="cursor-pointer w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white rounded-full transition-all duration-150"
                title="Reset Clip"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="h-4 w-[1px] bg-white/10"></div>

              <div className="text-xs font-mono tracking-wider flex items-center gap-2 bg-black/40 px-2.5 py-1.5 rounded text-white">
                <Clock className="w-3.5 h-3.5 text-brand-blue" />
                <span>{currentTime.toFixed(1)}s</span>
                <span className="text-white/30">/</span>
                <span>{totalOriginalDuration.toFixed(1)}s</span>
              </div>
            </div>

            {/* Quick analytics stats */}
            <div className="flex gap-4">
              <div className="text-right">
                <span className="block text-[10px] text-text-muted uppercase tracking-wider font-mono">Original Duration</span>
                <span className="text-sm font-semibold text-white font-mono">{totalOriginalDuration.toFixed(1)}s</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] text-brand-blue uppercase tracking-wider font-mono">FlowCut Duration</span>
                <span className="text-sm font-semibold text-brand-blue font-mono">{totalProcessedDuration.toFixed(1)}s</span>
              </div>
              <div className="text-right bg-brand-purple/10 px-2 py-0.5 rounded border border-brand-purple/15">
                <span className="block text-[10px] text-brand-purple-light uppercase tracking-wider font-mono">Saved Duration</span>
                <span className="text-sm font-bold text-brand-purple-light font-mono">-{savedTime.toFixed(1)}s ({savedPercentage}%)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Audio Tuning Controls */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white/5 rounded-lg p-5 border border-white/5 space-y-5">
            <h4 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-white border-b border-white/10 pb-2.5">
              <Sliders className="w-4 h-4 text-brand-purple-light" /> Real-time Parameters
            </h4>

            {/* Slider 1: Silence Threshold DB */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-text-muted font-medium">Silence Threshold</span>
                <span className="font-mono text-brand-purple-light font-semibold">{threshold} dB</span>
              </div>
              <input
                type="range"
                min="-60"
                max="-10"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full accent-brand-purple cursor-pointer bg-neutral-800 rounded-lg appearance-none h-1.5"
              />
              <div className="flex justify-between text-[10px] text-text-muted/60 font-mono">
                <span>-60 dB (Very Silent)</span>
                <span>-10 dB (Loud Cut)</span>
              </div>
            </div>

            {/* Slider 2: Min Silence Duration */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-text-muted font-medium">Min Duration</span>
                <span className="font-mono text-brand-blue font-semibold">{minDuration} frames</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={minDuration}
                onChange={(e) => setMinDuration(Number(e.target.value))}
                className="w-full accent-brand-blue cursor-pointer bg-neutral-800 rounded-lg appearance-none h-1.5"
              />
              <p className="text-[10px] text-text-muted/70 leading-relaxed">
                Ignores natural pauses shorter than this limit to ensure conversational dialogue flow.
              </p>
            </div>

            {/* Slider 3: Padding Margin */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-text-muted font-medium">Tail & Head Padding</span>
                <span className="font-mono text-brand-yellow font-semibold">+{padding} frames</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={padding}
                onChange={(e) => setPadding(Number(e.target.value))}
                className="w-full accent-brand-yellow cursor-pointer bg-neutral-800 rounded-lg appearance-none h-1.5"
              />
              <p className="text-[10px] text-text-muted/70 leading-relaxed font-body">
                Keeps a brief breath padding before and after speaking, preventing unnatural syllable cuts.
              </p>
            </div>

            {/* Built-in Presets */}
            <div className="space-y-3 pt-3 border-t border-white/5">
              <span className="text-xs text-text-muted font-bold block uppercase tracking-wide">Flow Presets</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "Natural Podcast", db: -29, min: 2, pad: 0 },
                  { name: "Super tight", db: -42, min: 10, pad: 0 },
                  { name: "Sigh Killer", db: -25, min: 4, pad: 0 },
                  { name: "Conservative", db: -50, min: 14, pad: 0 },
                ].map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setThreshold(p.db);
                      setMinDuration(p.min);
                      setPadding(p.pad);
                    }}
                    className={`cursor-pointer bg-white/5 hover:bg-white/10 text-[11px] font-sans text-white border rounded-md py-1.5 px-2.5 transition text-left ${
                      threshold === p.db && minDuration === p.min
                        ? "border-brand-blue bg-brand-blue/10"
                        : "border-white/10 hover:border-white/25"
                    }`}
                  >
                    <span className="block font-medium truncate">{p.name}</span>
                    <span className="text-[9px] text-text-muted/80 block font-mono">
                      {p.db}dB / {p.min} frames
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-brand-purple/10 border border-brand-purple/20 rounded-lg p-4 space-y-2">
            <span className="text-xs text-white uppercase tracking-wider font-bold block flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow/30" /> Real-world Performance
            </span>
            <p className="text-[11px] text-text-muted leading-relaxed">
              Based on the current settings, FlowCut will detect <strong className="text-white">
                3 silent pauses
              </strong>. This reduces render size and export load speeds by ~50%. Export format directly exports sequence XML to Final Cut Pro!
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
