const highlights = [
  {
    icon: "📅",
    title: "23 & 24 FEBRUARY",
    subtitle: "Battle Dates",
    color: "cyan",
  },
  {
    icon: "⏱️",
    title: "30 HOURS",
    subtitle: "Continuous Battle",
    color: "purple",
  },
  {
    icon: "🧠",
    title: "CAPTURE THE FLAG",
    subtitle: "Team-Based CTF",
    color: "cyan",
  },
  {
    icon: "👥",
    title: "2 MEMBERS",
    subtitle: "Per Team",
    color: "purple",
  },
];

export default function EventHighlights() {
  return (
    <section className="relative pt-10 pb-24">

      {/* Matrix visibility overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-black/30 to-black/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">

        {/* SECTION TITLE */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-widest text-cyan-400 mb-4">
            {"<"} MISSION BRIEFING {"/>"}
          </h2>
          <div className="mx-auto w-40 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        </div>

        {/* HIGHLIGHTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {highlights.map((item, index) => {
            const isCyan = item.color === "cyan";

            return (
             <div
  className={`
    relative p-8
    rounded-tr-2xl rounded-bl-2xl rounded-tl-none rounded-br-none
    border
    ${isCyan
      ? "border-cyan-400/60 shadow-[0_0_40px_rgba(0,255,255,0.35)]"
      : "border-purple-500/60 shadow-[0_0_40px_rgba(168,85,247,0.35)]"}
    bg-black/60
    backdrop-blur-sm
    overflow-hidden
    transition-all duration-300
    hover:scale-[1.03]
  `}
              >
                {/* SCANLINES */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:100%_4px] opacity-20" />

                {/* HUD CORNERS */}
                <span className={`absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 ${isCyan ? "border-cyan-400" : "border-purple-500"}`} />
                
                <span className={`absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 ${isCyan ? "border-cyan-400" : "border-purple-500"}`} />

                {/* ICON TILE */}
                <div
                  className={`
                    relative z-10
                    w-16 h-16 mx-auto mb-6 rounded-xl
                    flex items-center justify-center text-3xl
                    ${isCyan
                      ? "bg-cyan-400/20 text-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.6)]"
                      : "bg-purple-500/20 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.6)]"}
                  `}
                >
                  {item.icon}
                </div>

                {/* TITLE */}
                <h3
                  className={`
                    relative z-10 text-lg font-bold text-center mb-2 tracking-wider
                    ${isCyan ? "text-cyan-400" : "text-purple-400"}
                  `}
                >
                  {item.title}
                </h3>

                {/* SUBTITLE */}
                <p className="relative z-10 text-center text-sm text-gray-400 font-mono">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        {/* PRIZE POOL */}
        <div className="mt-28 text-center">
          <div className="relative  p-12 border border-yellow-400/40 bg-black/60 backdrop-blur-sm shadow-[0_0_80px_rgba(255,215,0,0.35)]">

            {/* TROPHY */}
            <div className="text-6xl mb-6">🏆</div>

            <p className="font-mono text-gray-400 mb-4 tracking-widest">
              TOTAL PRIZE POOL
            </p>

            <h3 className="text-5xl md:text-7xl font-extrabold text-yellow-400 mb-4">
              ₹30,000
            </h3>

            <p className="tracking-widest text-purple-400">
              + CERTIFICATES + SWAG
            </p>

            {/* GLOW BORDER */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none shadow-[0_0_60px_rgba(255,215,0,0.4)]" />
          </div>
        </div>

      </div>
    </section>
  );
}
