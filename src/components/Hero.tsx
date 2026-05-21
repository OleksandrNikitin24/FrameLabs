import { Download, Film, ChevronDown, PlayCircle } from "lucide-react";
import { WaveformSimulator } from "./WaveformSimulator";

interface HeroProps {
  onLearnMoreClick: () => void;
}

export function Hero({ onLearnMoreClick }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 px-6 sm:px-8 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden">
      {/* Absolute ambient lights background */}
      <div className="absolute top-20 right-[15%] w-[450px] h-[450px] bg-brand-purple/10 rounded-full filter blur-[80px] pointer-events-none animation-pulse duration-5000"></div>
      <div className="absolute top-40 left-[15%] w-[350px] h-[350px] bg-brand-blue/10 rounded-full filter blur-[60px] pointer-events-none"></div>

      {/* Product Tag Badge */}
      <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300">
        <span className="w-2 h-2 rounded-full bg-brand-purple shadow-sm animate-pulse"></span>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E8DFEE] font-mono">
          FLOWCUT 3.0 NOW AVAILABLE
        </span>
      </div>

      {/* Main Large Display Headings */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black text-white leading-[1.1] tracking-tight max-w-4xl mx-auto">
        Remove Silence from Your{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-purple-light to-brand-blue">
          Edits in Seconds
        </span>
      </h1>

      {/* Subtitle Body Description */}
      <p className="mt-6 text-sm sm:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed font-body font-light">
        FlowCut identifies and cuts out dead air automatically, so you can focus on the story. The fastest way to clean up interviews, podcasts, and vlogs in Final Cut Pro.
      </p>

      {/* Calls-to-Action Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4.5 w-full">
        <button
          onClick={() => {
            const el = document.getElementById("pricing-tier");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="cursor-pointer w-full sm:w-auto px-7 py-3.5 text-xs font-bold rounded-lg bg-brand-purple text-white hover:bg-brand-purple-hover hover:scale-[1.02] transform transition-all duration-200 shadow-xl shadow-brand-purple/20 flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" /> Download Free Trial
        </button>

        <button
          onClick={onLearnMoreClick}
          className="cursor-pointer w-full sm:w-auto px-7 py-3.5 text-xs font-bold rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white transition-all duration-250 flex items-center justify-center gap-2"
        >
          <PlayCircle className="w-4 h-4 text-brand-blue" /> See FlowCut in Action
        </button>
      </div>

      {/* Floating features quick highlight - scroll driver */}
      <div className="mt-8">
        <button
          onClick={onLearnMoreClick}
          className="cursor-pointer inline-flex flex-col items-center gap-1.5 text-[11px] font-semibold text-text-muted/60 hover:text-white transition duration-200 mt-2"
        >
          <span>Scroll to explore parameters</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>

      {/* Embedded Dynamic Workspace simulator */}
      <div className="mt-16 w-full relative z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
        <WaveformSimulator />
      </div>
    </section>
  );
}
