import React from "react";
import { 
  Check, 
  Clock, 
  MapPin, 
  Milestone, 
  AlertCircle,
  Calendar,
  Building
} from "lucide-react";
import { translations } from "../data/translations";

export default function JourneyTracker({ patient, lang }) {
  const t = translations[lang] || translations.en;
  const stages = patient.stages || [];

  // Compute progress percentage
  const completedCount = stages.filter((s) => s.status === "completed").length;
  const progressPercent = Math.round((completedCount / stages.length) * 100);

  return (
    <div className="glass-panel" style={{ padding: "1.5rem" }}>
      {/* Header & Pathway progress */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Milestone size={18} color="#2dd4bf" />
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>{t.journeyTimeline}</h3>
          </div>
          <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: "0.15rem" }}>
            {patient.carePathway} • {stages.length} Milestones
          </p>
        </div>

        {/* Progress pill */}
        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#34d399" }}>
            {progressPercent}% Complete
          </span>
          <div style={{ width: "120px", height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "4px", overflow: "hidden", marginTop: "0.3rem" }}>
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                background: "linear-gradient(90deg, #10b981, #06b6d4)",
                borderRadius: "4px",
                transition: "width 0.5s ease"
              }}
            />
          </div>
        </div>
      </div>

      {/* Stepper Timeline */}
      <div className="stepper-container">
        {stages.map((stage, idx) => {
          const isCompleted = stage.status === "completed";
          const isInProgress = stage.status === "in-progress";
          const isUpcoming = stage.status === "upcoming";

          return (
            <div 
              key={stage.id} 
              className={`step-node ${stage.status}`}
              id={`step-${stage.id}`}
            >
              {/* Stepper Node Indicator */}
              <div className="step-indicator">
                {isCompleted ? (
                  <Check size={16} strokeWidth={3} />
                ) : isInProgress ? (
                  <span>{idx + 1}</span>
                ) : (
                  <span style={{ fontSize: "0.8rem" }}>{idx + 1}</span>
                )}
              </div>

              {/* Step Content */}
              <div className="step-content">
                <div className="step-header">
                  <span 
                    className="step-name"
                    style={{ 
                      color: isInProgress ? "#2dd4bf" : isCompleted ? "#f1f5f9" : "#64748b"
                    }}
                  >
                    {stage.name}
                  </span>
                  <span className="step-time">
                    {stage.timestamp}
                  </span>
                </div>

                {/* Location */}
                <div className="step-dept" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <Building size={13} color="#64748b" />
                  <span>{stage.department} • <strong>{stage.room}</strong></span>
                </div>

                {/* Clinical Notes & Feedback */}
                {stage.notes && (
                  <div 
                    className="step-notes-bubble"
                    style={{
                      borderLeft: isInProgress ? "3px solid #2dd4bf" : isCompleted ? "3px solid #10b981" : "3px solid rgba(255,255,255,0.1)"
                    }}
                  >
                    {stage.notes}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
