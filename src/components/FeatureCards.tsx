import { Zap, Activity, Layers } from "lucide-react";

export function FeatureCards() {
  const cards = [
    {
      title: "Instant Jump-Cuts",
      description: "FlowCut scans your audio and removes every silence with millisecond precision, creating a perfect rough cut instantly.",
      icon: Zap,
      iconBg: "bg-brand-purple/15 text-brand-purple-light border-brand-purple/30",
    },
    {
      title: "Intelligent Noise Gate",
      description: "Adjustable sensitivity ensures you keep the natural breath of a conversation while stripping away the unwanted gaps.",
      icon: Activity,
      iconBg: "bg-brand-blue/15 text-brand-blue border-brand-blue/30",
    },
    {
      title: "Batch Clip Processing",
      description: "Process hours of footage in one click. Drop your clips on the timeline and let FlowCut handle the heavy lifting.",
      icon: Layers,
      iconBg: "bg-brand-yellow/15 text-brand-yellow border-brand-yellow/30",
    },
  ];

  return (
    <section id="features-overview" className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => {
          const IconComp = card.icon;
          return (
            <div
              key={idx}
              className="glass-card hover:glass-card-active rounded-xl p-6.5 border border-white/5 transition-all duration-300 flex flex-col items-start text-left hover:scale-[1.015] transform relative overflow-hidden group"
            >
              {/* Subtle top edge border shine */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
              
              {/* Icon Container */}
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center border ${card.iconBg} mb-5 shadow-sm`}>
                <IconComp className="w-5 h-5" />
              </div>

              {/* Title & Description */}
              <h3 className="font-sans font-bold text-white text-lg tracking-tight mb-2.5">
                {card.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed font-body font-light">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
