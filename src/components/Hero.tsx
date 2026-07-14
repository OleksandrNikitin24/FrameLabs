import { Download, PlayCircle } from "lucide-react";
import { WaveformSimulator } from "./WaveformSimulator";
import { startFrameLabsHubDownload } from "../lib/downloads";

interface HeroProps {
  onLearnMoreClick: () => void;
}

export function Hero({ onLearnMoreClick }: HeroProps) {
  return (
    <section className="relative mx-auto flex max-w-[980px] flex-col items-center px-6 pb-20 pt-36 text-center sm:px-8">
      {/* Eyebrow */}
      <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-parchment px-3.5 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-action"></span>
        <span className="text-[12px] font-semibold tracking-[-0.12px] text-ink-80">
          FlowCut 3.0 now available
        </span>
      </div>

      {/* Hero headline */}
      <h1 className="mx-auto max-w-4xl font-sans text-[40px] font-semibold leading-[1.07] tracking-[-0.28px] text-ink sm:text-[56px]">
        Remove silence from your edits in seconds.
      </h1>

      {/* Subhead */}
      <p className="mx-auto mt-5 max-w-2xl text-[21px] font-[400] leading-[1.3] tracking-[0.011em] text-ink-48 sm:text-[24px]">
        FlowCut identifies and cuts out dead air automatically, so you can focus on the story. The fastest way to clean up interviews, podcasts, and vlogs in Final Cut Pro.
      </p>

      {/* CTAs */}
      <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <button
          onClick={startFrameLabsHubDownload}
          className="btn-pill w-full sm:w-auto"
        >
          <Download className="h-4 w-4" /> Download free trial
        </button>

        <button onClick={onLearnMoreClick} className="btn-pill-ghost w-full sm:w-auto">
          <PlayCircle className="h-4 w-4" /> See FlowCut in action
        </button>
      </div>

      {/* Product panel resting on the canvas */}
      <div className="relative z-10 mt-16 w-full">
        <div className="product-shadow overflow-hidden rounded-[18px] bg-black">
          <WaveformSimulator />
        </div>
      </div>
    </section>
  );
}
