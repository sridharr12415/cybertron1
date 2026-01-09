import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { CheckCircle, ArrowLeft } from "lucide-react";

export default function Success() {
  const navigate = useNavigate();
  const verifiedRef = useRef(false);

  useEffect(() => {
    if (verifiedRef.current) return;

    const paymentDone = localStorage.getItem("paymentDone");

    if (paymentDone !== "true") {
      navigate("/", { replace: true });
      return;
    }

    verifiedRef.current = true;

    // ✅ DELAY removal (CRITICAL)
    setTimeout(() => {
      localStorage.removeItem("paymentDone");
    }, 0);

  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-black/60 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-10 text-center">
        <CheckCircle className="w-20 h-20 mx-auto text-cyan-400 mb-6" />
        <h1 className="text-3xl font-bold text-cyan-400 mb-4">
          REGISTRATION SUCCESSFUL
        </h1>
        <p className="text-gray-300 mb-6">
          Payment submitted successfully. Verification in progress.
        </p>

        <button
          onClick={() => navigate("/", { replace: true })}
          className="border border-cyan-400 px-6 py-3 text-cyan-400 hover:bg-cyan-400 hover:text-black transition"
        >
          <ArrowLeft className="inline mr-2" />
          GO HOME
        </button>
      </div>
    </div>
  );
}
