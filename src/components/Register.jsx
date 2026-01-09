import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { postJSON } from "../api";
import MatrixRain from "./MatrixRain";
import { postForm } from "../api";


export default function Register() {
  const DEV_SHOW_PAYMENT = false; // 🔥 false in production
  const navigate = useNavigate();
  

  // ---------------- TEAM ----------------
  const [teamName, setTeamName] = useState("");
  const [teamUnique, setTeamUnique] = useState(null);
  const [teamMsg, setTeamMsg] = useState("");
  const [checkingTeam, setCheckingTeam] = useState(false);

  // ---------------- MEMBERS ----------------
  const [member1, setMember1] = useState({
    name: "",
    college: "",
    email: "",
    phone: "",
  });

  const [member2, setMember2] = useState({
    name: "",
    college: "",
    email: "",
    phone: "",
  });

  // ---------------- REG / PAYMENT ----------------

const [registrationNumber, setRegistrationNumber] = useState("");

  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  // ---------------- DEBOUNCE ----------------
  const teamDebounceRef = useRef(null);

  // ---------------- TEAM UNIQUE CHECK ----------------
  const checkTeamUnique = async (team) => {
    if (!team || team.length < 3) return;

    setCheckingTeam(true);
    try {
      const data = await postJSON("/check-team-unique", {
        teamName: team,
      });

      setTeamUnique(data.unique);
      setTeamMsg(data.message);
    } catch {
      setTeamUnique(false);
      setTeamMsg("Server error while checking team");
    }
    setCheckingTeam(false);
  };

  const checkTeamUniqueDebounced = (value) => {
    clearTimeout(teamDebounceRef.current);
    teamDebounceRef.current = setTimeout(() => {
      checkTeamUnique(value);
    }, 500);
  };

  // ---------------- REGISTER SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (teamUnique === false) {
      alert("Duplicate team name");
      return;
    }

    try {
      const res = await postJSON("/register", {
        teamName,
        member1,
        member2,
      });

      if (!res.success) {
        alert(res.error || "Registration failed");
        return;
      }

      setRegistrationNumber(res.registrationId);
      sessionStorage.setItem("registrationNumber", res.registrationId);
      setShowPayment(true);

    } catch {
      alert("Server not reachable");
    }
  };

  // ---------------- INPUT STYLE ----------------
  const inputClass =
    "w-full p-3 bg-black/70 border border-cyan-400/30 rounded-lg text-white " +
    "placeholder-gray-400 focus:outline-none focus:border-cyan-400 " +
    "focus:shadow-[0_0_15px_rgba(0,255,255,0.6)] transition";

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <MatrixRain />

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full bg-black/60 backdrop-blur-xl
        border border-cyan-400/30 rounded-2xl p-10
        shadow-[0_0_40px_rgba(0,255,255,0.4)] relative z-10"
      >
        <h1 className="text-3xl text-cyan-400 font-bold tracking-widest text-center mb-6">
          TEAM REGISTRATION
        </h1>

        {/* TEAM NAME */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => {
              const value = e.target.value;
              setTeamName(value);
              setTeamUnique(null);
              setTeamMsg("");
              checkTeamUniqueDebounced(value);
            }}
            className={`w-full bg-black text-white border ${
              teamUnique === false
                ? "border-red-500"
                : teamUnique === true
                ? "border-green-400"
                : "border-cyan-400/60"
            } rounded px-4 py-3`}
          />

          {checkingTeam && (
            <p className="text-yellow-400 text-xs mt-1">
              Checking team name…
            </p>
          )}
          {teamUnique === false && (
            <p className="text-red-500 text-xs mt-1">❌ {teamMsg}</p>
          )}
          {teamUnique === true && (
            <p className="text-green-400 text-xs mt-1">✅ {teamMsg}</p>
          )}
        </div>

        {/* MEMBER 1 */}
        <h2 className="text-cyan-400 tracking-widest mb-3">MEMBER 1</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input className={inputClass} placeholder="Name"
            value={member1.name}
            onChange={(e) => setMember1({ ...member1, name: e.target.value })}
          />
          <input className={inputClass} placeholder="College"
            value={member1.college}
            onChange={(e) => setMember1({ ...member1, college: e.target.value })}
          />
          <input className={inputClass} placeholder="Email"
            value={member1.email}
            onChange={(e) => setMember1({ ...member1, email: e.target.value })}
          />
          <input className={inputClass} placeholder="Phone"
            value={member1.phone}
            onChange={(e) => setMember1({ ...member1, phone: e.target.value })}
          />
        </div>

        {/* MEMBER 2 */}
        <h2 className="text-cyan-400 tracking-widest mb-3">MEMBER 2</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <input className={inputClass} placeholder="Name"
            value={member2.name}
            onChange={(e) => setMember2({ ...member2, name: e.target.value })}
          />
          <input className={inputClass} placeholder="College"
            value={member2.college}
            onChange={(e) => setMember2({ ...member2, college: e.target.value })}
          />
          <input className={inputClass} placeholder="Email"
            value={member2.email}
            onChange={(e) => setMember2({ ...member2, email: e.target.value })}
          />
          <input className={inputClass} placeholder="Phone"
            value={member2.phone}
            onChange={(e) => setMember2({ ...member2, phone: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={teamUnique === false || registrationNumber}
          className="w-full py-3 border border-cyan-400 text-cyan-400
          hover:bg-cyan-400 hover:text-black transition"
        >
          {registrationNumber ? "REGISTERED" : "PROCEED TO PAYMENT"}
        </button>

        {/* PAYMENT SECTION */}
        {(DEV_SHOW_PAYMENT || showPayment) && registrationNumber && (
          <div className="mt-10 border-t border-cyan-400/30 pt-6">
            <p className="text-center text-cyan-400 font-mono">
              REG NO: {registrationNumber} Please note register Number
            </p>
{/* PAYMENT QR / IMAGE */}
{/* PAYMENT IMAGE (Google Drive Embed) */}
{/* PAYMENT IMAGE */}
<div className="mt-6 mb-4 flex justify-center">
  <img
    src="https://lh3.googleusercontent.com/d/1-UAGgIYk2oi69CKPmydi18Y1HM6G4zye"
    alt="Payment QR"
    className="w-48 h-48 md:w-56 md:h-56 object-contain
               border border-cyan-400/40 rounded-xl
               shadow-[0_0_30px_rgba(0,255,255,0.4)]"
    loading="lazy"
    referrerPolicy="no-referrer"
  />
</div>



            <input
              className={inputClass + " mt-4"}
              placeholder="Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />

            <input
              type="file"
              className="mt-4 text-gray-300"
              accept="image/*"
              onChange={(e) => setScreenshot(e.target.files[0])}
            />

            <button
              type="button"
              disabled={isPaying}
              onClick={async () => {
                if (!transactionId || !screenshot) {
                  alert("TXN and screenshot required");
                  return;
                }

                setIsPaying(true);
                const formData = new FormData();
                formData.append("registrationId", registrationNumber);
                formData.append("transactionId", transactionId);
                formData.append("screenshot", screenshot);

               try {
  await postForm("/submit-payment", formData);
  navigate("/success");
} catch (err) {
  alert(err.message || "Payment failed");
} finally {
  setIsPaying(false);
}

              }}
              className="w-full mt-4 py-3 border border-cyan-400 text-cyan-400"
            >
              {isPaying ? "PROCESSING…" : "SUBMIT PAYMENT"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
