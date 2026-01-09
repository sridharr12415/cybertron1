export default function CyberBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#05090c]">
      
      {/* Matrix characters */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.08),transparent_60%)]" />

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0.35) 4px)",
        }}
      />

      {/* Dark vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Cyber frame */}
      <div className="absolute inset-6 border border-cyan-400/30" />
    </div>
  );
}
