export default function GlitchTitle({ text }) {
  return (
    <h1 className="relative text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-widest text-center select-none">

      {/* Main gradient text */}
      <span className="
        relative z-10
        bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500
        bg-[length:200%_200%]
        animate-gradient
        bg-clip-text text-transparent
      ">
        {text}
      </span>

      {/* Cyan glitch */}
      <span className="
        absolute inset-0
        text-cyan-400
        opacity-70
        translate-x-[2px]
        animate-glitch-1
        pointer-events-none
      ">
        {text}
      </span>

      {/* Purple glitch */}
      <span className="
        absolute inset-0
        text-purple-500
        opacity-70
        -translate-x-[2px]
        animate-glitch-2
        pointer-events-none
      ">
        {text}
      </span>

    </h1>
  );
}
