import { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle, XCircle, Terminal } from "lucide-react";

const rules = [
  { type: "success", text: "Maximum 2 members per team" },
  { type: "success", text: "All challenges must be solved independently" },
  { type: "success", text: "Flag sharing between teams is strictly prohibited" },
  { type: "warning", text: "Attacking the CTF infrastructure will result in disqualification" },
  { type: "success", text: "Use of automated tools is allowed unless stated otherwise" },
  { type: "warning", text: "Brute-forcing the flag submission portal is prohibited" },
  { type: "success", text: "Hints may be released periodically - stay tuned!" },
  { type: "success", text: "All decisions by organizers are final" },
  { type: "error", text: "Any form of cheating = PERMANENT BAN" },
  { type: "success", text: "Have fun and learn something new!" },
];

export default function RulesSection() {
  const [visibleRules, setVisibleRules] = useState([]);

  useEffect(() => {
    const section = document.getElementById("rules");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          rules.forEach((_, i) => {
            setTimeout(() => {
              setVisibleRules((prev) => [...prev, i]);
            }, i * 200);
          });
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const iconByType = (type) => {
    if (type === "success") return <CheckCircle className="w-5 h-5 text-cyan-400" />;
    if (type === "warning") return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
    if (type === "error") return <XCircle className="w-5 h-5 text-red-500" />;
    return null;
  };

  return (
    <section id="rules" className="relative pt-10 pb-32">
      {/* Matrix overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-black/30 to-black/60" />

      <div className="relative z-10 max-w-3xl mx-auto px-4">
        {/* TITLE */}
        <div className="text-center mb-16">
          <p className="font-mono text-red-500 mb-2">[ SYSTEM PROTOCOLS ]</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-widest text-cyan-400 mb-4">
            RULES & REGULATIONS
          </h2>
          <div className="mx-auto w-32 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        </div>

        {/* TERMINAL WINDOW */}
        <div className="relative rounded-tr-2xl rounded-bl-2xl rounded-tl-none rounded-br-none border border-cyan-400/40 bg-black/60 backdrop-blur-sm shadow-[0_0_60px_rgba(0,255,255,0.25)] overflow-hidden">
          
          {/* TERMINAL HEADER */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-cyan-400/20">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex items-center gap-2 ml-4 text-gray-400 font-mono text-sm">
              <Terminal className="w-4 h-4 text-cyan-400" />
              rules.protocol
            </div>
          </div>

          {/* TERMINAL CONTENT */}
          <div className="p-6 space-y-3 font-mono text-sm">
            <p className="text-cyan-400 mb-4">{">"}_ Loading security protocols...</p>

            {rules.map((rule, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 transition-all duration-500 ${
                  visibleRules.includes(i)
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
              >
                {iconByType(rule.type)}
                <span
                  className={
                    rule.type === "error"
                      ? "text-red-500"
                      : rule.type === "warning"
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                >
                  [{String(i + 1).padStart(2, "0")}] {rule.text}
                </span>
              </div>
            ))}

            <div className="pt-4 mt-6 border-t border-cyan-400/20">
              <p className="text-green-400 animate-pulse">
                {">"}_ Protocol loaded successfully. Proceed with caution._
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
