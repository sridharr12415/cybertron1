import React, { Component } from "react";
import { postJSON, postForm } from "../api";
import {
  ArrowLeft,
  Upload,
  Shield,
  CheckCircle,
  Loader2,
} from "lucide-react";
import MatrixRain from "./MatrixRain";

class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registrationId: null,
      transactionId: "",
      screenshot: null,
      previewUrl: null,
      isSubmitting: false,
      errors: {},

      // TXN uniqueness
      txnUnique: null,
      txnMsg: "",
      checkingTxn: false,
    };

    this.fileInputRef = React.createRef();
    this.txnDebounceTimer = null;
  }

  componentDidMount() {
    const regId = sessionStorage.getItem("registrationNumber");

    if (!regId) {
      window.location.replace("/register");
      return;
    }

    this.setState({ registrationId: regId });
  }

  // ================= FILE =================
  handleFileChange = (e) => {
    const file = e.target.files[0];
    const errors = { ...this.state.errors };

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      errors.screenshot = "Only image files allowed";
      this.setState({ errors });
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      errors.screenshot = "File must be under 4MB";
      this.setState({ errors });
      return;
    }

    this.setState({
      screenshot: file,
      previewUrl: URL.createObjectURL(file),
      errors: { ...errors, screenshot: "" },
    });
  };

  // ================= TXN UNIQUE CHECK =================
  checkTxnUnique = async (txn) => {
    if (!txn || txn.length < 6) return;

    this.setState({ checkingTxn: true });

    try {
      const data = await postJSON("/check-txn-unique", {
        transactionId: txn,
      });

      this.setState({
        txnUnique: data.unique,
        txnMsg: data.message,
        checkingTxn: false,
      });
    } catch {
      this.setState({
        txnUnique: false,
        txnMsg: "Server error while checking transaction",
        checkingTxn: false,
      });
    }
  };

  // ================= DEBOUNCE =================
  checkTxnUniqueDebounced = (value) => {
    clearTimeout(this.txnDebounceTimer);
    this.txnDebounceTimer = setTimeout(() => {
      this.checkTxnUnique(value);
    }, 500);
  };

  // ================= VALIDATION =================
  validateForm = () => {
    const errors = {};
    const { transactionId, screenshot, txnUnique } = this.state;

    if (!transactionId.trim()) {
      errors.transactionId = "Transaction ID required";
    } else if (txnUnique === false) {
      errors.transactionId = "Transaction ID already used";
    }

    if (!screenshot) {
      errors.screenshot = "Screenshot required";
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  // ================= SUBMIT =================
  handleSubmit = async (e) => {
    e.preventDefault();

    if (!this.validateForm()) return;

    this.setState({ isSubmitting: true });

    const { registrationId, transactionId, screenshot } = this.state;

    const formData = new FormData();
    formData.append("registrationId", registrationId);
    formData.append("transactionId", transactionId.trim());
    formData.append("screenshot", screenshot);

    try {
      const res = await postForm("/submit-payment", formData);

      if (!res.success) {
        alert(res.error || "Payment failed");
        this.setState({ isSubmitting: false });
        return;
      }

      sessionStorage.removeItem("registrationNumber");
      localStorage.setItem("paymentDone", "true");
      window.location.href = "/success";
    } catch {
      alert("Server not reachable");
      this.setState({ isSubmitting: false });
    }
  };

  // ================= UI =================
  render() {
    const {
      registrationId,
      transactionId,
      previewUrl,
      isSubmitting,
      errors,
      txnUnique,
      txnMsg,
      checkingTxn,
    } = this.state;

    if (!registrationId) return null;

    return (
      <div className="min-h-screen relative">
        <MatrixRain />

        <div className="relative z-10 flex justify-center items-center min-h-screen px-4">
          <div className="w-full max-w-lg">
            <button
              onClick={() => window.location.replace("/register")}
              className="flex items-center gap-2 text-gray-400 mb-6"
            >
              <ArrowLeft size={16} /> Back
            </button>

            <div className="glass-card p-8 rounded-lg border border-cyan-400/30">
              <div className="text-center mb-6">
                <Shield className="mx-auto text-cyan-400" />
                <h1 className="text-2xl text-cyan-400 tracking-widest">
                  PAYMENT VERIFICATION
                </h1>
              </div>

              <form onSubmit={this.handleSubmit} className="space-y-6">
                {/* TRANSACTION ID */}
                <div>
                  <input
                    type="text"
                    placeholder="Transaction ID"
                    value={transactionId}
                    onChange={(e) => {
                      const value = e.target.value;
                      this.setState({
                        transactionId: value,
                        errors: { ...errors, transactionId: "" },
                        txnUnique: null,
                      });
                      this.checkTxnUniqueDebounced(value);
                    }}
                    className={`w-full bg-black text-white border ${
                      errors.transactionId || txnUnique === false
                        ? "border-red-500"
                        : txnUnique === true
                        ? "border-green-400"
                        : "border-cyan-400/60"
                    } rounded px-4 py-3 font-mono`}
                  />

                  {checkingTxn && (
                    <p className="text-yellow-400 text-xs mt-1">
                      Checking transaction ID…
                    </p>
                  )}
                  {txnUnique === false && (
                    <p className="text-red-500 text-xs mt-1">❌ {txnMsg}</p>
                  )}
                  {txnUnique === true && (
                    <p className="text-green-400 text-xs mt-1">✅ {txnMsg}</p>
                  )}
                </div>

                {/* SCREENSHOT */}
                <div
                  className="border-2 border-dashed border-cyan-400/40 p-6 text-center cursor-pointer"
                  onClick={() => this.fileInputRef.current.click()}
                >
                  <input
                    ref={this.fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={this.handleFileChange}
                  />

                  {previewUrl ? (
                    <>
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-h-40 mx-auto rounded"
                      />
                      <CheckCircle className="text-green-400 mx-auto mt-2" />
                    </>
                  ) : (
                    <>
                      <Upload className="mx-auto text-gray-400" />
                      <p className="text-sm text-gray-400">
                        Upload payment screenshot
                      </p>
                    </>
                  )}
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={isSubmitting || txnUnique === false}
                  className="w-full py-4 flex justify-center gap-3 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Verifying…
                    </>
                  ) : (
                    <>
                      Submit Payment <Shield />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
