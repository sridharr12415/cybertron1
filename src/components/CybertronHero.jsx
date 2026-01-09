export default function CybertronHero() {
  return (
    <div className="relative min-h-screen bg-[#05090c] text-cyan-400 overflow-hidden">
      {/* Background grid + scanlines */}
      <div className="absolute inset-0 bg-[radial-gradient(#0ff1_1px,transparent_1px)] bg-[size:18px_18px] opacity-10" />
      <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(0,255,255,0.08)_100%)] bg-[length:100%_4px] opacity-30" />

      {/* NAVBAR */}
      {/* NAVBAR */}
<nav className="relative z-10 flex items-center justify-between px-10 py-6 border-b border-cyan-500/20">

  {/* LEFT NAV ITEMS */}
  <ul className="flex gap-8 text-sm text-gray-300 tracking-wider items-center">
    <li className="hover:text-cyan-400 cursor-pointer">HOME</li>
    <li className="hover:text-cyan-400 cursor-pointer">SESSIONS</li>
    <li className="hover:text-cyan-400 cursor-pointer">ABOUT</li>
    <li className="hover:text-cyan-400 cursor-pointer">RULES</li>
    <li className="hover:text-cyan-400 cursor-pointer">SPONSORS</li>
    <li className="hover:text-cyan-400 cursor-pointer">CONTACT</li>

    {/* REGISTER moved into nav */}
    <li
      onClick={() => navigate("/register")}
      className="
        ml-4 px-5 py-2
        border border-cyan-400
        text-cyan-400
        tracking-widest text-xs
        hover:bg-cyan-400 hover:text-black
        transition cursor-pointer
      "
    >
      REGISTER
    </li>
  </ul>

  {/* RIGHT LOGO */}
  <div className="flex items-center gap-2 text-xl font-bold tracking-widest">
    <span className="text-cyan-400">🛡</span>
    <span>CYBERTRON</span>
  </div>

</nav>


      {/* TERMINAL TEXT */}
      <div className="relative z-10 mt-14 text-center text-sm text-gray-400 space-y-2 font-mono">
        <p>&gt; INITIALIZING CYBERTRON PROTOCOL...</p>
        <p>&gt; DECRYPTING NEURAL PATHWAYS...</p>
        <p>&gt; ESTABLISHING SECURE CONNECTION...</p>
        <p className="text-cyan-400">&gt; ACCESS GRANTED</p>
      </div>

      {/* MAIN HERO */}
   {/* Main Title */}
{/* Main Title */}
{showTitle && (
  <div className="mb-6 animate-[fadeIn_0.8s_ease-out]">

    {/* Glitch + Gradient Title */}
    <h1 className="relative text-4xl md:text-6xl lg:text-8xl font-black tracking-wider text-center select-none">

      {/* Base gradient text */}
      <span
        className="
          relative z-10
          bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500
          bg-[length:200%_200%]
          animate-gradient
          bg-clip-text text-transparent
        "
      >
        CYBERTRON CTF 2026
      </span>

      {/* Cyan glitch */}
      <span
        className="
          absolute inset-0
          text-cyan-400
          opacity-60
          translate-x-[2px]
          animate-glitch-1
          pointer-events-none
        "
      >
        CYBERTRON CTF 2026
      </span>

      {/* Purple glitch */}
      <span
        className="
          absolute inset-0
          text-purple-500
          opacity-60
          -translate-x-[2px]
          animate-glitch-2
          pointer-events-none
        "
      >
        CYBERTRON CTF 2026
      </span>
    </h1>

    {/* Lightning row */}
    <div className="flex items-center justify-center gap-3 mt-4 text-purple-400 text-xl md:text-2xl animate-pulse">
      ⚡ ⚡ ⚡
    </div>
  </div>
)}



      {/* FRAME BORDER */}
      <div className="pointer-events-none absolute inset-6 border border-cyan-500/20" />
    </div>
  );
}
