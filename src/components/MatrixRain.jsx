import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const chars = "CYBERTRON01アイウエオカキクケコサシスセソ";
    const charArray = chars.split("");
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    const drops = Array(columns).fill(0);

    const draw = () => {
      ctx.fillStyle = "rgba(5, 9, 12, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text =
          charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Cyan default
        ctx.fillStyle = "rgba(0, 255, 255, 0.8)";

        // Purple flash
        if (Math.random() > 0.985) {
          ctx.fillStyle = "rgba(168, 85, 247, 0.9)";
        }

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-30 pointer-events-none"
    />
  );
}
