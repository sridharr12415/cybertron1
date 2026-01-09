import { useRef, useEffect } from "react";

export default function LogoReveal({ onDone }) {
  const doneRef = useRef(false);

  // ✅ SAFELY END LOGO AFTER FIXED TIME
  useEffect(() => {
    const timer = setTimeout(() => {
      if (doneRef.current) return;
      doneRef.current = true;
      onDone();
    }, 2200); // logo visible for ~2.2s

    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      className="
        fixed inset-0 z-[9998]
        flex items-center justify-center
        bg-black
        overflow-hidden
      "
    >
      {/* 🔹 Glitch scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 motion-reduce:hidden">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.03)_2px,rgba(0,255,255,0.03)_4px)]" />
      </div>

      {/* 🔹 Flickering grid */}
      <div className="absolute inset-0 opacity-10 motion-reduce:hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,rgba(0,255,255,0.1)_50%,transparent_51%)] bg-[length:50px_100%]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_49%,rgba(0,255,255,0.1)_50%,transparent_51%)] bg-[length:100%_50px]" />
      </div>

      {/* 🔥 CYBER FRAME */}
      <div
        className="
          relative
          p-10
          rounded-2xl
          border border-cyan-400/60
          shadow-[0_0_40px_rgba(0,255,255,0.6)]
        "
      >
        {/* ⚡ Logo + Glitch */}
        <div className="relative">
          {/* Glitch layer 1 */}
          <img
            src="/logo.png"
            alt=""
            className="
              absolute inset-0
              w-40 md:w-56 lg:w-64
              opacity-30
              animate-[glitch-1_0.25s_infinite]
              [filter:hue-rotate(90deg)]
            "
          />

          {/* Glitch layer 2 */}
          <img
            src="/logo.png"
            alt=""
            className="
              absolute inset-0
              w-40 md:w-56 lg:w-64
              opacity-30
              animate-[glitch-2_0.25s_infinite]
              [filter:hue-rotate(-90deg)]
            "
          />

          {/* ✅ MAIN LOGO (ALWAYS VISIBLE) */}
          <img
            src="/logo.png"
            alt="Cybertron Logo"
            className="
              relative
              w-40 md:w-56 lg:w-64
              drop-shadow-[0_0_40px_rgba(0,255,255,0.85)]
            "
            style={{
              animation: "logoReveal 1.1s ease-out forwards",
              opacity: 0,
            }}
          />
        </div>
      </div>

      {/* 🔻 Status text */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-xs text-cyan-500/60 animate-pulse">
        INITIALIZING SYSTEM...
      </div>
    </div>
  );
}
