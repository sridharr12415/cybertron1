import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactInfoOnly() {
  return (
    <section className="relative py-20">
      <div className="absolute inset-0 pointer-events-none bg-black/40" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 space-y-6">
        <InfoCard
          icon={<Mail className="w-6 h-6" />}
          title="CO-ORDINATOR "
          value="DR.R.KRISHNAMOORTHY"
          color="purple"
        />

        <InfoCard
          icon={<MapPin className="w-6 h-6" />}
          title="COLLEGE LOCATION"
          value="Vengaivasal Main Road, Valli Nagar, Gowriwakkam, Sembakkam"
          color="cyan"
        />

       <InfoCard
          icon={<Phone className="w-6 h-6" />}
          title="ORGANIZER"
          value="N.SRIRAM (3rd YEAR CSE(Cyber Security) )"
          color="green"
        />
            <InfoCard
          icon={<Phone className="w-6 h-6" />}
          title="CONTACT NUMBER"
          value="+91 8015916569"
          color="green"
        />

        {/* QUOTE */}
      
      </div>
    </section>
  );
}

/* ----------------------------- */

function InfoCard({ icon, title, value, color }) {
  const colors = {
    purple: {
      border: "border-purple-500/40",
      glow: "hover:shadow-[0_0_90px_rgba(168,85,247,0.8)]",
      text: "text-purple-400",
      bg: "bg-purple-500/20",
      sweep: "from-transparent via-purple-400/30 to-transparent",
    },
    cyan: {
      border: "border-cyan-400/40",
      glow: "hover:shadow-[0_0_90px_rgba(0,255,255,0.8)]",
      text: "text-cyan-400",
      bg: "bg-cyan-400/20",
      sweep: "from-transparent via-cyan-400/30 to-transparent",
    },
    green: {
      border: "border-green-400/40",
      glow: "hover:shadow-[0_0_90px_rgba(34,197,94,0.8)]",
      text: "text-green-400",
      bg: "bg-green-400/20",
      sweep: "from-transparent via-green-400/30 to-transparent",
    },
  };

  const c = colors[color];

  return (
    <div
      className={`
        relative overflow-hidden group
        rounded-xl border ${c.border}
        bg-black/60 backdrop-blur-sm
        p-5 flex items-center gap-4
        shadow-[0_0_50px_rgba(0,0,0,0.6)]
        transition-all duration-300
        hover:-translate-y-1
        ${c.glow}
      `}
    >
      {/* Sweep line */}
      <span
        className={`
          absolute inset-0 opacity-0 group-hover:opacity-100
          bg-gradient-to-r ${c.sweep}
          transition-opacity duration-300
        `}
      />

      {/* Icon */}
      <div
        className={`
          relative z-10 w-12 h-12
          flex items-center justify-center
          rounded-lg ${c.bg} ${c.text}
          transition-all duration-300
          group-hover:scale-110 group-hover:animate-pulse
        `}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="relative z-10">
        <h3 className={`font-bold tracking-widest text-sm ${c.text}`}>
          {title}
        </h3>
        <p className="text-gray-300 font-mono text-sm mt-1">
          {value}
        </p>
      </div>
    </div>
  );
}
