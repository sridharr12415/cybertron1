import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


import IntroVideo from "./IntroVideo";
import LogoReveal from "./LogoReveal";
import BootSequence from "./BootSequence";
import GlitchTitle from "./GlitchTitle";
import EventHighlights from "./EventHighlights";
import SessionsSection from "./SessionsSection";
import RulesSection from "./RulesSection";
import ContactSection from "./ContactSection";
import PerksSection from "./PerksSection";
import Footer from "./Footer";


export default function Hero() {
  const navigate = useNavigate();
  

  // 🔥 FLOW STATES
// 🔥 FLOW STATES
const [showIntro, setShowIntro] = useState(false); // disabled
const [showLogo, setShowLogo] = useState(false);   // start with logo
const [bootDone, setBootDone] = useState(false);
const [active, setActive] = useState(null);

useEffect(() => {
  // 🚫 Intro temporarily disabled
  setShowLogo(true);
}, []);



 if (showIntro) {
    return (
      <IntroVideo
        onFinish={() => {
          setShowIntro(false);
          setShowLogo(true);
        }}
      />
    );
  }

  // 2️⃣ LOGO
  if (showLogo) {
    return (
      <LogoReveal
        onDone={() => {
           // 🔥 SAVE FLAG
          setShowLogo(false);
          setBootDone(true);
        }}
      />
    );
  }

  return (
    <section className="relative">

      {/* 3️⃣ BOOT SEQUENCE */}
      {!bootDone && (
        <div className="flex flex-col items-center justify-center pt-32 pb-20">
          <BootSequence onComplete={() => setBootDone(true)} />
        </div>
      )}

      {/* 4️⃣ HERO CONTENT */}
      {bootDone && (
        <>
          <div className="flex flex-col items-center text-center pt-32 pb-20">
            <GlitchTitle text="CYBERTRON CTF 2026" />

            <p className="mt-6 text-gray-400 tracking-[0.3em] text-sm md:text-lg">
              UNLEASH THE MACHINE WITHIN
            </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0">

  {/* REGISTER BUTTON */}
 <button
  onClick={() => {
    setActive("init");
    navigate("/register");
  }}
  className={`
    relative overflow-hidden
    w-full sm:w-auto
    px-6 py-3 sm:px-10 sm:py-4

    border border-cyan-400
    text-cyan-400
    tracking-[0.15em] sm:tracking-widest
    text-sm sm:text-base

    transition-all duration-300 ease-out
    active:scale-95 sm:hover:scale-110
    sm:hover:text-black sm:hover:bg-cyan-400/80

    shadow-[0_0_20px_rgba(0,255,255,0.5)]
    sm:shadow-[0_0_30px_rgba(0,255,255,0.5)]
  `}
>
  <span className="absolute inset-0 bg-cyan-400/40 opacity-0 sm:hover:opacity-100 transition" />

  {active === "init" && (
    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-sweep" />
  )}

  <span className="relative z-10">
    INITIALIZE REGISTRATION
  </span>
</button>


  {/* VERIFY BUTTON */}
 <button
  onClick={() => {
    setActive("verify");
    navigate("/verify");
  }}
  className={`
    relative overflow-hidden
    w-full sm:w-auto
    px-6 py-3 sm:px-10 sm:py-4

    border border-cyan-400
    text-cyan-400
    tracking-[0.15em] sm:tracking-widest
    text-sm sm:text-base

    transition-all duration-300 ease-out
    active:scale-95 sm:hover:scale-110
    sm:hover:text-black sm:hover:bg-cyan-400/80

    shadow-[0_0_20px_rgba(0,255,255,0.5)]
    sm:shadow-[0_0_30px_rgba(0,255,255,0.5)]
  `}
>
  <span className="absolute inset-0 bg-cyan-400/40 opacity-0 sm:hover:opacity-100 transition" />

  {active === "verify" && (
    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-sweep" />
  )}

  <span className="relative z-10">
    VERIFY REGISTRATION
  </span>
</button>

</div>

          </div>

          <EventHighlights />
          <SessionsSection />
          <RulesSection />
          <PerksSection />
          <ContactSection />
          <Footer />
        </>
      )}
    </section>
  );
}
