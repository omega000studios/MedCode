import React, { useState } from "react";
import { 
  Sliders, 
  ChevronUp, 
  ChevronDown, 
  FastForward, 
  Stethoscope, 
  FlaskConical, 
  ShieldCheck, 
  RotateCcw,
  Sparkles
} from "../GoogleIcons";
import { 
  advancePatientStage, 
  updatePatientConsult, 
  updateOrderStatus, 
  approveInsuranceClaim, 
  resetAllPatientData 
} from "../services/journeyStore";
import { translations } from "../data/translations";

export default function SimulationBar({ patient, lang, onRefresh }) {
  const t = translations[lang] || translations.en;
  const [isOpen, setIsOpen] = useState(false);

  const handleAdvance = () => {
    advancePatientStage(patient.patientId);
    onRefresh();
  };

  const handleDoctorUpdate = () => {
    updatePatientConsult(patient.patientId, {
      headline: "Urgent: Direct Referral to Ultrasound Suite 204",
      headlineHi: "अति आवश्यक: सीधे अल्ट्रासाउंड सुइट 204 में जाएं",
      headlineMr: "तातडीचे: थेट अल्ट्रासाउंड सूट २०४ मध्ये जा",
      department: "Diagnostic Ultrasound & Imaging",
      location: "Floor 2, Wing A, Room 204",
      summary: "Dr. Sen has reviewed initial vitals and updated orders for immediate doppler assessment. Priority token clearance applied.",
      summaryHi: "डॉ. सेन ने महत्वपूर्ण संकेतों की समीक्षा की है और तत्काल डॉपलर स्कैन का आदेश दिया है। प्राथमिकता टोकन लागू किया गया है।",
      summaryMr: "डॉ. सेन यांनी तात्काळ डॉपलर तपासणीचा आदेश दिला आहे. प्राधान्य टोकन लागू करण्यात आले आहे.",
      estWait: "5 mins (Priority)",
      audioNarration: "Attention: Dr. Sen has updated your consult orders. Please proceed with priority clearance to Ultrasound Suite 204."
    });
    onRefresh();
  };

  const handleLabUpdate = () => {
    if (patient.ordersPending && patient.ordersPending.length > 0) {
      updateOrderStatus(patient.patientId, patient.ordersPending[0].id, "Ready - Report Generated");
      onRefresh();
    }
  };

  const handleInsuranceApprove = () => {
    approveInsuranceClaim(patient.patientId, "₹32,000");
    onRefresh();
  };

  const handleReset = () => {
    if (confirm("Reset all patient journey data to default demo state?")) {
      resetAllPatientData();
      onRefresh();
    }
  };

  return (
    <div className="sim-toolbar">
      {isOpen && (
        <div className="sim-drawer">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#2dd4bf", fontSize: "0.85rem", fontWeight: 700 }}>
              <Sparkles size={16} />
              <span>Live Sync & Demo Simulator</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer" }}
            >
              <ChevronDown size={18} />
            </button>
          </div>

          <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: "0.85rem" }}>
            Simulate real-time hospital staff actions (doctor consults, lab status, insurance clearance). Broadcasts across tabs instantly!
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {/* Advance Stage */}
            <button
              onClick={handleAdvance}
              className="btn-secondary"
              style={{ padding: "0.45rem 0.75rem", fontSize: "0.78rem", justifyContent: "flex-start" }}
            >
              <FastForward size={14} color="#34d399" />
              <span>{t.simAdvanceStage}</span>
            </button>

            {/* Doctor Note */}
            <button
              onClick={handleDoctorUpdate}
              className="btn-secondary"
              style={{ padding: "0.45rem 0.75rem", fontSize: "0.78rem", justifyContent: "flex-start" }}
            >
              <Stethoscope size={14} color="#60a5fa" />
              <span>{t.simDoctorNote}</span>
            </button>

            {/* Lab Update */}
            <button
              onClick={handleLabUpdate}
              className="btn-secondary"
              style={{ padding: "0.45rem 0.75rem", fontSize: "0.78rem", justifyContent: "flex-start" }}
            >
              <FlaskConical size={14} color="#a78bfa" />
              <span>{t.simUpdateLab}</span>
            </button>

            {/* Insurance Pre-Auth */}
            <button
              onClick={handleInsuranceApprove}
              className="btn-secondary"
              style={{ padding: "0.45rem 0.75rem", fontSize: "0.78rem", justifyContent: "flex-start" }}
            >
              <ShieldCheck size={14} color="#10b981" />
              <span>{t.simApproveInsurance}</span>
            </button>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="btn-secondary"
              style={{ padding: "0.45rem 0.75rem", fontSize: "0.78rem", justifyContent: "flex-start", borderColor: "rgba(239, 68, 68, 0.3)", color: "#fca5a5", marginTop: "0.4rem" }}
            >
              <RotateCcw size={14} color="#f87171" />
              <span>Reset Demo State</span>
            </button>
          </div>
        </div>
      )}

      {/* Pill Toggle Button */}
      <button 
        className="sim-pill-btn"
        onClick={() => setIsOpen(!isOpen)}
        id="demo-simulator-btn"
        title="Open Live Sync Simulation Controller"
      >
        <Sliders size={15} />
        <span>Demo Simulator</span>
        {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>
    </div>
  );
}
