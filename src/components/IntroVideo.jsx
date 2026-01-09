import { useRef } from "react";

export default function IntroVideo({ onFinish }) {
  const finishedRef = useRef(false);

  const safeFinish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onFinish();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black overflow-hidden"
      role="dialog"
      aria-label="Intro Video"
    >
      {/* FULLSCREEN VIDEO */}
      <video
        autoPlay
        muted
        playsInline
        disablePictureInPicture
        preload="auto"
        onEnded={safeFinish}
        className="
          absolute inset-0
          w-full h-full
          object-cover
          scale-[1.15]
        "
      >
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      {/* HACKING SCANLINES OVERLAY */}
      <div className="absolute inset-0 pointer-events-none opacity-40 motion-reduce:hidden">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.03)_2px,rgba(0,255,255,0.03)_4px)]" />
      </div>

      {/* GLITCH FLICKER OVERLAY */}
      <div className="absolute inset-0 pointer-events-none animate-flicker opacity-20 motion-reduce:hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,255,255,0.1)_50%,transparent_100%)]" />
      </div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* SKIP BUTTON */}
      <button
        type="button"
        onClick={safeFinish}
        aria-label="Skip intro video"
        className="
          absolute top-6 right-6 z-10
          flex items-center gap-2
          px-6 py-2
          bg-black/50 backdrop-blur-sm
          text-cyan-400 text-xs tracking-widest font-mono
          transition-all duration-300 ease-out
          hover:bg-cyan-400/20
          hover:text-cyan-300
          hover:scale-105
          shadow-[0_0_20px_rgba(0,255,255,0.3)]
          hover:shadow-[0_0_40px_rgba(0,255,255,0.6)]
          border-none outline-none
        "
      >
        SKIP ▸▸
      </button>

      {/* CORNER HUD ELEMENTS */}
      <div className="absolute top-4 left-4 text-cyan-500/40 font-mono text-[10px] tracking-wider animate-pulse">
        SYS://BOOT_SEQUENCE
      </div>
      <div className="absolute bottom-4 right-4 text-cyan-500/40 font-mono text-[10px] tracking-wider animate-pulse">
        CYBERTRON.INIT
      </div>
    </div>
  );
}
