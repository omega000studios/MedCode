import React, { useState } from "react";
import { X, PhoneCall, AlertTriangle, UserCheck, CheckCircle2 } from "lucide-react";
import { translations } from "../data/translations";

export default function SOSModal({ patient, lang, onClose }) {
  const t = translations[lang] || translations.en;
  const [requested, setRequested] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState("Wheelchair Assistance");

  const needs = [
    "Wheelchair Assistance",
    "Language Interpreter",
    "Wayfinding Escort",
    "Immediate Medical Distress"
  ];

  const handleRequest = () => {
    setRequested(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "480px" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "0.85rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <PhoneCall size={18} color="#fb7185" />
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fda4af" }}>{t.sosHelp}</h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "none",
              color: "#94a3b8",
              borderRadius: "8px",
              padding: "0.4rem",
              cursor: "pointer"
            }}
          >
            <X size={18} />
          </button>
        </div>

        {requested ? (
          <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
            <div style={{ width: "54px", height: "54px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
              <CheckCircle2 size={32} color="#10b981" />
            </div>
            <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>
              Navigator Dispatched!
            </h4>
            <p style={{ fontSize: "0.85rem", color: "#cbd5e1", lineHeight: 1.5, marginBottom: "1.5rem" }}>
              {t.assistanceAlert}
            </p>
            <div style={{ background: "rgba(15, 23, 42, 0.8)", padding: "0.85rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", fontSize: "0.8rem", color: "#94a3b8", marginBottom: "1.25rem" }}>
              Location pinpointed to: <strong>OPD Room 218 / 1st Floor Corridor</strong> • Token: <strong>{patient.tokenNumber}</strong>
            </div>
            <button
              className="btn-primary"
              onClick={onClose}
              style={{ width: "100%", justifyContent: "center" }}
            >
              {t.close}
            </button>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: "0.85rem", color: "#cbd5e1", lineHeight: 1.5, marginBottom: "1rem" }}>
              Need urgent help navigating the hospital? Select your immediate requirement and our floor navigator team will be alerted immediately.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
              {needs.map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedNeed(item)}
                  style={{
                    background: selectedNeed === item ? "rgba(244, 63, 94, 0.15)" : "rgba(255, 255, 255, 0.04)",
                    border: selectedNeed === item ? "1px solid rgba(244, 63, 94, 0.5)" : "1px solid rgba(255, 255, 255, 0.08)",
                    color: selectedNeed === item ? "#fda4af" : "#cbd5e1",
                    borderRadius: "8px",
                    padding: "0.65rem 0.85rem",
                    textAlign: "left",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              className="btn-primary"
              onClick={handleRequest}
              style={{
                width: "100%",
                justifyContent: "center",
                background: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)",
                boxShadow: "0 4px 15px rgba(244, 63, 94, 0.4)"
              }}
            >
              <PhoneCall size={16} />
              <span>Call Navigator to My Location</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
