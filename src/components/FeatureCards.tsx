import { Zap, Activity, Layers } from "lucide-react";

export function FeatureCards() {
  const cards = [
    {
      title: "Instant Jump-Cuts",
      description: "FlowCut scans your audio and removes every silence with frame-accurate precision, creating a perfect rough cut instantly.",
      icon: Zap,
    },
    {
      title: "Intelligent Noise Gate",
      description: "Adjustable sensitivity ensures you keep the natural breath of a conversation while stripping away the unwanted gaps.",
      icon: Activity,
    },
    {
      title: "Batch Clip Processing",
      description: "Process hours of footage in one click. Drop your clips on the timeline and let FlowCut handle the heavy lifting.",
      icon: Layers,
    },
  ];

  return (
    <section id="features-overview" className="bg-parchment">
      <div className="mx-auto max-w-[980px] px-6 py-20 sm:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <div
                key={idx}
                className="store-card flex flex-col items-start p-6 text-left"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-action/10">
                  <IconComp className="h-5 w-5 text-action" />
                </div>

                <h3 className="mb-2 font-sans text-[21px] font-semibold tracking-[-0.374px] text-ink">
                  {card.title}
                </h3>
                <p className="text-[17px] leading-[1.47] tracking-[-0.374px] text-ink-48">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
