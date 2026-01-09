import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "SESSIONS", href: "#sessions" },
    { name: "RULES", href: "#rules" },
    { name: "CONTACT", href: "#contact" },
  ];

  const btnStyle = `
    px-5 py-2
    border border-cyan-400
    text-cyan-400 text-xs tracking-widest
    hover:bg-cyan-400 hover:text-black
    transition cursor-pointer
  `;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-cyan-400/20">
      <div className="flex items-center justify-between px-6 md:px-10 h-16">

        {/* LEFT NAV LINKS (DESKTOP) */}
        <ul className="hidden md:flex gap-6 text-sm text-gray-300 tracking-widest items-center">
          {navLinks.map((link) => (
            <li
              key={link.name}
              className="cursor-pointer hover:text-cyan-400 transition"
            >
              <a href={link.href}>{link.name}</a>
            </li>
          ))}

          {/* REGISTER */}
          <li onClick={() => navigate("/register")} className={btnStyle}>
            REGISTER
          </li>

          {/* VERIFY */}
          <li onClick={() => navigate("/verify")} className={btnStyle}>
            VERIFY
          </li>
        </ul>

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer text-xl font-bold tracking-widest text-cyan-400"
        >
          CYBERTRON
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-cyan-400"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-md border-t border-cyan-400/20">
          <div className="flex flex-col px-6 py-4 space-y-4 text-gray-300 tracking-widest">

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="hover:text-cyan-400 transition"
              >
                {">"} {link.name}
              </a>
            ))}

            {/* REGISTER (MOBILE) */}
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/register");
              }}
              className="
                mt-2 px-5 py-3
                border border-cyan-400
                text-cyan-400 tracking-widest text-sm
                hover:bg-cyan-400 hover:text-black
                transition
              "
            >
              REGISTER
            </button>

            {/* VERIFY (MOBILE) */}
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/verify");
              }}
              className="
                px-5 py-3
                border border-cyan-400
                text-cyan-400 tracking-widest text-sm
                hover:bg-cyan-400 hover:text-black
                transition
              "
            >
              VERIFY
            </button>
          </div>
        </div>
      )}

      {/* GLOW DIVIDER */}
      <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-cyan-400/60 shadow-[0_0_20px_rgba(0,255,255,0.6)]" />
      <div className="absolute left-0 right-0 bottom-[-14px] h-[24px] bg-gradient-to-b from-cyan-400/50 to-transparent blur-lg" />
    </nav>
  );
}
