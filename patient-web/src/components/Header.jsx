import React from "react";
import { 
  HeartPulse, 
  Activity, 
  Share2, 
  PhoneCall, 
  ShieldCheck, 
  UserCheck, 
  ChevronDown,
  Sparkles
} from "lucide-react";
import { translations } from "../data/translations";

export default function Header({
  activePatient,
  allPatients,
  onSelectPatient,
  lang,
  onSelectLang,
  onOpenShare,
  onOpenSOS
}) {
  const t = translations[lang] || translations.en;

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Brand & Live Beacon */}
        <div className="brand-wrapper">
          <div className="brand-icon">
            <HeartPulse size={26} color="#070b14" strokeWidth={2.4} />
          </div>
          <div>
            <div className="brand-title">MedCode Navigation</div>
            <div className="brand-subtitle">
              <span className="beacon-dot"></span>
              <span>{t.liveConnected}</span>
            </div>
          </div>
        </div>

        {/* Patient Switcher & Pathway Badge */}
        <div className="header-actions">
          {/* Patient Selector */}
          <div style={{ position: "relative" }}>
            <select
              value={activePatient.patientId}
              onChange={(e) => onSelectPatient(e.target.value)}
              className="patient-pill"
              style={{
                appearance: "none",
                background: "rgba(15, 23, 42, 0.9)",
                color: "#f8fafc",
                paddingRight: "2rem",
                fontFamily: "var(--font-main)",
                fontWeight: 600,
                outline: "none"
              }}
              id="patient-selector"
              aria-label="Select Patient Profile"
            >
              {allPatients.map((p) => (
                <option key={p.patientId} value={p.patientId} style={{ background: "#0d1424", color: "#fff" }}>
                  {p.name} • {p.carePathway} ({p.tokenNumber})
                </option>
              ))}
            </select>
            <ChevronDown 
              size={14} 
              color="#94a3b8" 
              style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} 
            />
          </div>

          {/* Token & Pathway Pill */}
          <div className="patient-pill" title="Patient OPD Token">
            <span className="token-badge">{activePatient.tokenNumber}</span>
            <span style={{ fontSize: "0.82rem", color: "#cbd5e1", fontWeight: 600 }}>
              {activePatient.carePathway}
            </span>
          </div>

          {/* Language Switcher */}
          <div className="lang-selector" role="group" aria-label="Language Selector">
            <button
              id="lang-en"
              className={`lang-btn ${lang === "en" ? "active" : ""}`}
              onClick={() => onSelectLang("en")}
            >
              EN
            </button>
            <button
              id="lang-hi"
              className={`lang-btn ${lang === "hi" ? "active" : ""}`}
              onClick={() => onSelectLang("hi")}
            >
              हिंदी
            </button>
            <button
              id="lang-mr"
              className={`lang-btn ${lang === "mr" ? "active" : ""}`}
              onClick={() => onSelectLang("mr")}
            >
              मराठी
            </button>
          </div>

          {/* Share with Caregiver */}
          <button
            className="btn-secondary"
            onClick={onOpenShare}
            style={{ padding: "0.45rem 0.85rem", fontSize: "0.82rem" }}
            id="share-caregiver-btn"
            title="Share with Family"
          >
            <Share2 size={15} color="#2dd4bf" />
            <span style={{ display: "none", md: "inline" }}>{t.caregiverShare}</span>
          </button>

          {/* SOS / Assistance */}
          <button
            className="btn-secondary"
            onClick={onOpenSOS}
            style={{ 
              padding: "0.45rem 0.85rem", 
              fontSize: "0.82rem",
              borderColor: "rgba(244, 63, 94, 0.4)",
              background: "rgba(244, 63, 94, 0.12)",
              color: "#fda4af"
            }}
            id="sos-help-btn"
            title="Request Staff Assistance"
          >
            <PhoneCall size={15} color="#fb7185" />
            <span>SOS Help</span>
          </button>
        </div>
      </div>
    </header>
  );
}
