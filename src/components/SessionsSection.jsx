import { Globe, Lock, Binary, FileSearch, Search, Puzzle } from "lucide-react";
import { useState } from "react";

const sessions = [
  {
    icon: Globe,
    name: "Web Exploitation",
    code: "WEB_XPL",
    description: "SQL injection, XSS, CSRF, and modern web vulnerabilities",
    difficulty: "MEDIUM-HARD",
  },
  {
    icon: Lock,
    name: "Cryptography",
    code: "CRYPTO",
    description: "Classical ciphers, modern encryption, and hash cracking",
    difficulty: "HARD",
  },
  {
    icon: Binary,
    name: "Reverse Engineering",
    code: "REV_ENG",
    description: "Binary analysis, disassembly, and malware reversing",
    difficulty: "EXPERT",
  },
  {
    icon: FileSearch,
    name: "Forensics",
    code: "FORENSICS",
    description: "Disk analysis, memory dumps, and evidence recovery",
    difficulty: "MEDIUM",
  },
  {
    icon: Search,
    name: "OSINT",
    code: "OSINT",
    description: "Open source intelligence and information gathering",
    difficulty: "EASY-MEDIUM",
  },
  {
    icon: Puzzle,
    name: "Miscellaneous",
    code: "MISC",
    description: "Programming, logic puzzles, and creative challenges",
    difficulty: "VARIABLE",
  },
];

export default function SessionsSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="sessions" className="relative pt-10 pb-32">
      {/* Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-black/30 to-black/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* TITLE */}
        <div className="text-center mb-16">
          <p className="font-mono text-cyan-400 mb-2">{">"}_ SELECT MISSION</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-widest text-purple-400 mb-4">
            CTF DOMAINS
          </h2>
          <div className="mx-auto w-32 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session, index) => {
            const Icon = session.icon;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  relative p-6
                  rounded-tr-2xl rounded-bl-2xl rounded-tl-none rounded-br-none
                  border border-cyan-400/40
                  bg-black/60 backdrop-blur-sm
                  transition-all duration-300
                  cursor-pointer
                  ${isHovered
                    ? "scale-105 shadow-[0_0_50px_rgba(168,85,247,0.6)]"
                    : "shadow-[0_0_30px_rgba(0,255,255,0.25)]"}
                `}
              >
                {/* HEADER */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-cyan-400/20">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 font-mono text-xs text-gray-400">
                    {session.code}.exe
                  </span>
                </div>

                {/* ICON */}
                <div className="w-14 h-14 mb-4 rounded-xl flex items-center justify-center bg-cyan-400/20">
                  <Icon className="w-7 h-7 text-cyan-400" />
                </div>

                {/* TEXT */}
                <h3 className="text-lg font-bold text-cyan-400 mb-2 tracking-wider">
                  {session.name}
                </h3>

                <p className="font-mono text-sm text-gray-400 mb-4">
                  {isHovered
                    ? `${">"}_ ${session.description}`
                    : `${">"}_ Hover to decrypt...`}
                </p>

                {/* DIFFICULTY */}
                <div className="inline-block px-3 py-1 text-xs font-mono border border-purple-400/40 text-purple-400">
                  [{session.difficulty}]
                </div>

                {/* ACCESS */}
                {isHovered && (
                  <div className="absolute top-4 right-4 text-xs font-mono text-cyan-400 animate-pulse">
                    ACCESS GRANTED
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
