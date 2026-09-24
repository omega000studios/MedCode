import React, { useState, useEffect } from "react";
import { 
  Compass, 
  MapPin, 
  Clock, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Circle, 
  Navigation, 
  AlertCircle,
  FileCheck2,
  Sparkles
} from "lucide-react";
import { translations } from "../data/translations";

export default function WhatsNextCard({
  patient,
  lang,
  onOpenMap,
  onArrivalConfirmed
}) {
  const t = translations[lang] || translations.en;
  const card = patient.nextStepCard || {};

  // Checkbox state for preparation items
  const [checkedItems, setCheckedItems] = useState({});
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Determine localized headline and summary
  const headline = lang === "hi" ? card.headlineHi || card.headline : lang === "mr" ? card.headlineMr || card.headline : card.headline;
  const summary = lang === "hi" ? card.summaryHi || card.summary : lang === "mr" ? card.summaryMr || card.summary : card.summary;
  const bringList = lang === "hi" ? card.bringHi || card.bring || [] : lang === "mr" ? card.bringMr || card.bring || [] : card.bring || [];
  const narrationText = lang === "hi" ? card.audioNarrationHi || summary : lang === "mr" ? card.audioNarrationMr || summary : card.audioNarration || summary;

  // Toggle checklist item
  const toggleItem = (idx) => {
    setCheckedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Text to Speech
  const toggleSpeech = () => {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported on this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(narrationText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Pick appropriate voice if available
    const voices = window.speechSynthesis.getVoices();
    if (lang === "hi") {
      const hiVoice = voices.find((v) => v.lang.includes("hi") || v.name.toLowerCase().includes("hindi"));
      if (hiVoice) utterance.voice = hiVoice;
      utterance.lang = "hi-IN";
    } else if (lang === "mr") {
      const mrVoice = voices.find((v) => v.lang.includes("mr") || v.name.toLowerCase().includes("marathi"));
      if (mrVoice) utterance.voice = mrVoice;
      utterance.lang = "mr-IN";
    } else {
      utterance.lang = "en-IN";
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <section className="whats-next-hero" aria-labelledby="whats-next-heading">
      {/* Top Tag & Live Sync Badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <div className="card-top-tag">
          <Compass size={14} color="#2dd4bf" />
          <span>{t.whatsNextTitle}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "#38bdf8" }}>
          <Clock size={13} />
          <span>{t.estimatedWait}: <strong>{card.estWait || "10-15 mins"}</strong></span>
        </div>
      </div>

      {/* Main Plain-Language Directive */}
      <h2 id="whats-next-heading" className="hero-headline">
        {headline}
      </h2>

      {/* Doctor consult summary */}
      <p className="hero-summary">
        {summary}
      </p>

      {/* Department & Specific Room Location Info */}
      <div className="info-cards-row">
        <div className="info-sub-box">
          <div className="info-sub-label">
            <MapPin size={13} color="#2dd4bf" />
            <span>{t.destination}</span>
          </div>
          <div className="info-sub-val" style={{ color: "#2dd4bf" }}>
            {card.department}
          </div>
          <div style={{ fontSize: "0.82rem", color: "#94a3b8", marginTop: "0.2rem" }}>
            {card.location}
          </div>
        </div>

        <div className="info-sub-box">
          <div className="info-sub-label">
            <Clock size={13} color="#fbbf24" />
            <span>Queue Status</span>
          </div>
          <div className="info-sub-val" style={{ color: "#fbbf24" }}>
            Token {patient.tokenNumber} Active
          </div>
          <div style={{ fontSize: "0.82rem", color: "#94a3b8", marginTop: "0.2rem" }}>
            Est. wait: {card.estWait || "15 mins"}
          </div>
        </div>
      </div>

      {/* What to bring / Preparation Checklist */}
      {bringList.length > 0 && (
        <div className="bring-checklist">
          <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#cbd5e1", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <FileCheck2 size={15} color="#34d399" />
            <span>{t.bringItems}</span>
          </div>
          <div>
            {bringList.map((item, idx) => {
              const isChecked = !!checkedItems[idx];
              return (
                <div
                  key={idx}
                  className={`check-item ${isChecked ? "done" : ""}`}
                  onClick={() => toggleItem(idx)}
                  style={{ cursor: "pointer", userSelect: "none" }}
                  role="checkbox"
                  aria-checked={isChecked}
                >
                  <div className={`custom-checkbox ${isChecked ? "checked" : ""}`}>
                    {isChecked ? <CheckCircle2 size={13} color="#070b14" strokeWidth={3} /> : null}
                  </div>
                  <span>{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="hero-btn-bar">
        {/* Indoor Navigation Map */}
        <button
          className="btn-primary"
          onClick={onOpenMap}
          id="open-indoor-map-btn"
        >
          <Navigation size={16} />
          <span>{t.openMap}</span>
        </button>

        {/* Read Out Loud (TTS) */}
        <button
          className="btn-secondary"
          onClick={toggleSpeech}
          id="tts-narration-btn"
          style={{ borderColor: isSpeaking ? "var(--teal-400)" : undefined }}
        >
          {isSpeaking ? (
            <>
              <VolumeX size={16} color="#fb7185" />
              <span>{t.stopAudio}</span>
            </>
          ) : (
            <>
              <Volume2 size={16} color="#2dd4bf" />
              <span>{t.listenAudio}</span>
            </>
          )}
        </button>

        {/* Mark Arrived */}
        <button
          className="btn-secondary"
          onClick={onArrivalConfirmed}
          style={{ marginLeft: "auto" }}
          title="Confirm arrival at room"
        >
          <CheckCircle2 size={15} color="#34d399" />
          <span>I Have Arrived</span>
        </button>
      </div>
    </section>
  );
}
