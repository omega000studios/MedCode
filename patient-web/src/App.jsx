import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import WhatsNextCard from "./components/WhatsNextCard";
import JourneyTracker from "./components/JourneyTracker";
import OrdersPending from "./components/OrdersPending";
import InsuranceClaimTracker from "./components/InsuranceClaimTracker";
import DocumentVault from "./components/DocumentVault";
import IndoorMapModal from "./components/IndoorMapModal";
import DocumentPreviewModal from "./components/DocumentPreviewModal";
import CaregiverShareModal from "./components/CaregiverShareModal";
import SOSModal from "./components/SOSModal";
import SimulationBar from "./components/SimulationBar";

import { 
  loadStoredPatients, 
  getActivePatientId, 
  setActivePatientId, 
  getStoredLanguage, 
  setStoredLanguage,
  subscribeToStore,
  advancePatientStage 
} from "./services/journeyStore";
import { translations } from "./data/translations";
import { User, Activity, Shield, Sparkles } from "lucide-react";

export default function App() {
  const [patients, setPatients] = useState(() => loadStoredPatients());
  const [activePatientId, setPatientId] = useState(() => getActivePatientId());
  const [lang, setLang] = useState(() => getStoredLanguage());

  // Modals state
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);

  // Sync state across tabs & local triggers
  useEffect(() => {
    const unsubscribe = subscribeToStore((message) => {
      const refreshedPatients = loadStoredPatients();
      setPatients(refreshedPatients);
      const activeId = getActivePatientId();
      setPatientId(activeId);
    });

    return () => unsubscribe();
  }, []);

  const handleSelectPatient = (id) => {
    setPatientId(id);
    setActivePatientId(id);
  };

  const handleSelectLang = (newLang) => {
    setLang(newLang);
    setStoredLanguage(newLang);
  };

  const activePatient = patients.find((p) => p.patientId === activePatientId) || patients[0];
  const t = translations[lang] || translations.en;

  const handleRefresh = () => {
    setPatients(loadStoredPatients());
  };

  const handleArrivalConfirmed = () => {
    advancePatientStage(activePatient.patientId);
    handleRefresh();
  };

  return (
    <div className="min-h-screen">
      {/* Top Navigation Bar */}
      <Header
        activePatient={activePatient}
        allPatients={patients}
        onSelectPatient={handleSelectPatient}
        lang={lang}
        onSelectLang={handleSelectLang}
        onOpenShare={() => setIsShareOpen(true)}
        onOpenSOS={() => setIsSOSOpen(true)}
      />

      {/* Main Content Area */}
      <main className="main-wrapper">
        {/* Patient Profile Bar */}
        <section 
          className="glass-panel" 
          style={{ 
            padding: "1rem 1.5rem", 
            marginBottom: "1.5rem",
            background: "linear-gradient(90deg, rgba(16, 24, 40, 0.8) 0%, rgba(13, 20, 36, 0.9) 100%)",
            borderLeft: "4px solid #14b8a6"
          }}
          aria-label="Patient Profile Information"
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div 
                style={{ 
                  width: "48px", 
                  height: "48px", 
                  borderRadius: "50%", 
                  background: "linear-gradient(135deg, #14b8a6, #3b82f6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "1.1rem"
                }}
              >
                {activePatient.name.charAt(0)}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <h1 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#ffffff" }}>
                    {activePatient.name}
                  </h1>
                  <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                    ({activePatient.age} y/o • {activePatient.gender})
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.8rem", color: "#94a3b8", marginTop: "0.15rem", flexWrap: "wrap" }}>
                  <span>ABHA: <strong style={{ color: "#2dd4bf" }}>{activePatient.abhaId}</strong></span>
                  <span>•</span>
                  <span>UHID: <strong style={{ color: "#e2e8f0" }}>{activePatient.patientId}</strong></span>
                  <span>•</span>
                  <span>OPD Token: <strong style={{ color: "#38bdf8" }}>{activePatient.tokenNumber}</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Pathway Tabs */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {patients.map((p) => {
                const isSelected = p.patientId === activePatient.patientId;
                return (
                  <button
                    key={p.patientId}
                    onClick={() => handleSelectPatient(p.patientId)}
                    style={{
                      background: isSelected ? "rgba(20, 184, 166, 0.2)" : "rgba(255, 255, 255, 0.04)",
                      border: isSelected ? "1px solid rgba(20, 184, 166, 0.5)" : "1px solid rgba(255, 255, 255, 0.08)",
                      color: isSelected ? "#2dd4bf" : "#94a3b8",
                      padding: "0.4rem 0.8rem",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <span>{p.carePathway}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Two-Column Responsive Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Left Column: What's Next Card & Full Journey Stepper */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* The What's Next Plain-Language Card */}
            <WhatsNextCard
              patient={activePatient}
              lang={lang}
              onOpenMap={() => setIsMapOpen(true)}
              onArrivalConfirmed={handleArrivalConfirmed}
            />

            {/* Journey Tracker Stepper */}
            <JourneyTracker
              patient={activePatient}
              lang={lang}
            />
          </div>

          {/* Right Column: Claims, Orders, and Documents */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Insurance & Pre-Auth Claim Tracker */}
            <InsuranceClaimTracker
              patient={activePatient}
              lang={lang}
              onDownloadPreAuth={() => {
                const insDoc = activePatient.documents?.find(d => d.category.includes("Insurance")) || activePatient.documents?.[0];
                setPreviewDoc(insDoc);
              }}
            />

            {/* Active Orders, Diagnostics & Prescriptions */}
            <OrdersPending
              patient={activePatient}
              lang={lang}
            />

            {/* Digital Documents Vault */}
            <DocumentVault
              patient={activePatient}
              lang={lang}
              onPreviewDocument={(doc) => setPreviewDoc(doc)}
            />
          </div>
        </div>
      </main>

      {/* Floating Demo Simulator Bar */}
      <SimulationBar
        patient={activePatient}
        lang={lang}
        onRefresh={handleRefresh}
      />

      {/* Modals */}
      {isMapOpen && (
        <IndoorMapModal
          patient={activePatient}
          lang={lang}
          onClose={() => setIsMapOpen(false)}
        />
      )}

      {isShareOpen && (
        <CaregiverShareModal
          patient={activePatient}
          lang={lang}
          onClose={() => setIsShareOpen(false)}
        />
      )}

      {isSOSOpen && (
        <SOSModal
          patient={activePatient}
          lang={lang}
          onClose={() => setIsSOSOpen(false)}
        />
      )}

      {previewDoc && (
        <DocumentPreviewModal
          doc={previewDoc}
          patient={activePatient}
          lang={lang}
          onClose={() => setPreviewDoc(null)}
        />
      )}
    </div>
  );
}
