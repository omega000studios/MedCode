import React from "react";
import { X, Navigation, MapPin, Compass, ArrowRight, CornerDownRight } from "lucide-react";
import { translations } from "../data/translations";

export default function IndoorMapModal({ patient, lang, onClose }) {
  const t = translations[lang] || translations.en;
  const card = patient.nextStepCard || {};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "720px" }}
      >
        {/* Modal Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "0.85rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(20, 184, 166, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Navigation size={18} color="#2dd4bf" />
            </div>
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>{t.directionsTitle}</h3>
              <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                Target: <strong style={{ color: "#2dd4bf" }}>{card.department}</strong> ({card.location})
              </p>
            </div>
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

        {/* Visual Indoor Hospital Blueprint SVG */}
        <div
          style={{
            background: "#080e1b",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(20, 184, 166, 0.25)",
            padding: "1rem",
            marginBottom: "1.25rem",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#64748b", marginBottom: "0.5rem" }}>
            <span>HOSPITAL INDOOR WAYFINDER • LEVEL 2 BLUEPRINT</span>
            <span style={{ color: "#2dd4bf", fontWeight: 600 }}>LIVE ROUTE ACTIVE</span>
          </div>

          <svg viewBox="0 0 600 240" style={{ width: "100%", height: "auto", display: "block" }}>
            {/* Grid & Background Corridors */}
            <rect x="10" y="10" width="580" height="220" rx="12" fill="#0b1325" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
            
            {/* Rooms / Departments */}
            {/* Start Zone: OPD Consultations */}
            <rect x="30" y="30" width="130" height="80" rx="8" fill="#132238" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="95" y="70" fill="#93c5fd" fontSize="12" fontWeight="bold" textAnchor="middle">You Are Here</text>
            <text x="95" y="88" fill="#64748b" fontSize="10" textAnchor="middle">OPD Wing Room 218</text>

            {/* Central Corridor */}
            <path d="M 160 70 L 270 70 L 270 170 L 420 170" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />

            {/* Elevator B Hub */}
            <rect x="230" y="45" width="80" height="50" rx="6" fill="#1a2744" stroke="#a855f7" strokeWidth="1.5" />
            <text x="270" y="72" fill="#d8b4fe" fontSize="11" fontWeight="bold" textAnchor="middle">Elevator B</text>
            <text x="270" y="86" fill="#94a3b8" fontSize="9" textAnchor="middle">Floor 1 ➔ 2</text>

            {/* Destination: Diagnostic Pathology 204 */}
            <rect x="420" y="125" width="150" height="90" rx="8" fill="#0d2825" stroke="#10b981" strokeWidth="2" />
            <text x="495" y="165" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">Destination</text>
            <text x="495" y="182" fill="#cbd5e1" fontSize="10" textAnchor="middle">Room 204 • Pathology</text>
            <text x="495" y="198" fill="#2dd4bf" fontSize="9" fontWeight="600" textAnchor="middle">Token {patient.tokenNumber} Queued</text>

            {/* Animated Route Line */}
            <path 
              d="M 160 70 L 270 70 L 270 170 L 420 170" 
              fill="none" 
              stroke="#2dd4bf" 
              strokeWidth="4" 
              strokeDasharray="8 6" 
              strokeLinecap="round"
            >
              <animate attributeName="stroke-dashoffset" values="40;0" dur="1.2s" repeatCount="indefinite" />
            </path>

            {/* Pulse Indicator at Destination */}
            <circle cx="420" cy="170" r="7" fill="#10b981">
              <animate attributeName="r" values="5;10;5" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* Turn-by-Turn Navigation Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", background: "rgba(15, 23, 42, 0.6)", padding: "0.75rem", borderRadius: "8px" }}>
            <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(20, 184, 166, 0.2)", color: "#2dd4bf", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700 }}>1</span>
            <span style={{ fontSize: "0.88rem", color: "#e2e8f0" }}>{t.directionsStep1}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", background: "rgba(15, 23, 42, 0.6)", padding: "0.75rem", borderRadius: "8px" }}>
            <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(20, 184, 166, 0.2)", color: "#2dd4bf", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700 }}>2</span>
            <span style={{ fontSize: "0.88rem", color: "#e2e8f0" }}>{t.directionsStep2}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", background: "rgba(15, 23, 42, 0.6)", padding: "0.75rem", borderRadius: "8px" }}>
            <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(20, 184, 166, 0.2)", color: "#2dd4bf", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700 }}>3</span>
            <span style={{ fontSize: "0.88rem", color: "#e2e8f0" }}>{t.directionsStep3} <strong>{patient.tokenNumber}</strong></span>
          </div>
        </div>

        <button
          className="btn-primary"
          onClick={onClose}
          style={{ width: "100%", justifyContent: "center" }}
        >
          Got It, Start Walking
        </button>
      </div>
    </div>
  );
}
