import { useEffect, useState } from "react";

export default function BootSequence({ onComplete = () => {} }) {
  const messages = [
    "> INITIALIZING CYBERTRON PROTOCOL...",
    "> DECRYPTING NEURAL PATHWAYS...",
    "> ESTABLISHING SECURE CONNECTION...",
    "> ACCESS GRANTED",
  ];

  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < messages.length) {
      const timer = setTimeout(() => {
        setStep((s) => s + 1);
      }, 700);
      return () => clearTimeout(timer);
    }

    // FINISH BOOT
    const doneTimer = setTimeout(onComplete, 600);
    return () => clearTimeout(doneTimer);
  }, [step, messages.length, onComplete]);

  return (
    <div className="font-mono text-sm md:text-base text-gray-400 space-y-2 text-center">
      {messages.slice(0, step).map((msg, i) => (
        <p
          key={i}
          className={i === step - 1 ? "text-cyan-400 animate-pulse" : ""}
        >
          {msg}
        </p>
      ))}
    </div>
  );
}
