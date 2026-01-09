import { useState } from "react";
import { ShieldCheck, Loader2, XCircle, CheckCircle } from "lucide-react";
import MatrixRain from "./MatrixRain";
import { postJSON } from "../api";

export default function Verify() {
  const [registrationId, setRegistrationId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
const handleVerify = async () => {
  if (!registrationId.trim()) {
    setError("Please enter a Registration Number");
    return;
  }

  setLoading(true);
  setError("");
  setResult(null);

  try {
    const data = await postJSON("/verify-registration", {
      registrationId: registrationId.trim(),
    });

    if (!data || data.success === false) {
      setError("Invalid Registration Number");
      return;
    }

    // ✅ ONLY backend values here
    setResult({
      teamName: String(data.teamName), // force string
      status: String(data.status),
    });
  } catch (err) {
    console.error(err);
    setError("Server not reachable");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <MatrixRain />
      <div className="scan-lines pointer-events-none" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="text-center mb-8">
            <ShieldCheck className="w-14 h-14 mx-auto text-cyan-400 animate-pulse" />
            <h1 className="text-3xl font-bold text-cyan-400 tracking-widest mt-4">
              VERIFY REGISTRATION
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Enter your registration number to verify
            </p>
          </div>

          {/* Card */}
          <div className="bg-black/60 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-8 shadow-[0_0_40px_rgba(0,255,255,0.4)] space-y-6">

            {/* Input */}
            <input
              type="text"
              placeholder="Registration Number"
              value={registrationId}
              inputMode="numeric"
  pattern="[0-9]*"
  maxLength={10}
              onChange={(e) => setRegistrationId(e.target.value)}
              className="
                w-full px-4 py-3
                bg-black/80 text-white
                border border-cyan-400/40
                rounded-lg
                focus:outline-none focus:border-cyan-400
                focus:shadow-[0_0_15px_rgba(0,255,255,0.6)]
                font-mono
              "
            />

            {/* Button */}
            <button
              onClick={handleVerify}
             disabled={loading || !registrationId.trim()}

              className="
                w-full py-3 tracking-widest
                border border-cyan-400
                text-cyan-400
                hover:bg-cyan-400 hover:text-black
                transition-all duration-300
                shadow-[0_0_25px_rgba(0,255,255,0.6)]
                hover:shadow-[0_0_50px_rgba(0,255,255,0.9)]
                disabled:opacity-50
              "
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" />
                  VERIFYING...
                </span>
              ) : (
                "VERIFY REGISTRATION"
              )}
            </button>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-3 text-red-400 text-sm">
                <XCircle />
                {error}
              </div>
            )}

            {/* Result */}
            {result && (
              <div className="border border-cyan-400/40 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400">
                  <CheckCircle />
                  <span className="tracking-widest text-sm">
                    REGISTRATION VERIFIED
                  </span>
                </div>

                <p className="text-gray-300 text-sm">
                  Team Name:
                </p>
                <p className="text-cyan-400 font-mono text-lg">
                  {result.teamName}
                </p>

                <p className="text-gray-300 text-sm">
                  Payment Status:
                </p>
                <p
                  className={`font-bold ${
                    result.status === "COMPLETED"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {result.status}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
