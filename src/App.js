import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MatrixRain from "./components/MatrixRain";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Register from "./components/Register";
import Success from "./components/Success";
import Verify from "./components/Verify";

export default function App() {

  // ✅ API CONNECTION CHECK (PLACE HERE)
  useEffect(() => {
    fetch(process.env.REACT_APP_API_BASE_URL + "/")
      .then((res) => res.json())
      .then((data) => console.log("API CONNECTED ✅", data))
      .catch((err) => console.error("API NOT CONNECTED ❌", err));
  }, []);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#05090c] text-white overflow-hidden">

        {/* 🌌 BACKGROUND */}
        <MatrixRain />

        {/* FOREGROUND */}
        <div className="relative z-10 pt-16">
          <Navbar />

          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/register" element={<Register />} />
            <Route path="/success" element={<Success />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

        </div>
      </div>
    </BrowserRouter>
  );
}
