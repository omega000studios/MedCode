import React from "react";
import { GoogleIcon } from "../GoogleIcons";
import { Button } from "./ui/button";

export default function Header({
  activePatient,
  allPatients,
  onSelectPatient,
  lang,
  onSelectLang,
  labels,
  onOpenShare,
  onOpenSOS
}) {
  return (
    <header className="simple-header">
      <a className="simple-brand" href="#visit" aria-label="MedCode home">
        <span className="brand-mark"><GoogleIcon name="HeartPulse" size={22} /></span>
        <span>medcode</span>
      </a>
      <span className="header-page-label">{labels.progress}</span>
      <div className="simple-header-actions">
        <label className="visually-hidden" htmlFor="patient-selector">Select patient</label>
        <select
          id="patient-selector"
          className="simple-select patient-select"
          value={activePatient.patientId}
          onChange={(event) => onSelectPatient(event.target.value)}
        >
          {allPatients.map((patient) => (
            <option key={patient.patientId} value={patient.patientId}>
              {patient.name}
            </option>
          ))}
        </select>
        <label className="visually-hidden" htmlFor="language-selector">Language</label>
        <select
          id="language-selector"
          className="simple-select language-select"
          value={lang}
          onChange={(event) => onSelectLang(event.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="mr">मराठी</option>
        </select>
        <Button variant="ghost" className="header-action" onClick={onOpenShare}>
          <GoogleIcon name="Share2" size={20} /><span>{lang === "hi" ? "शेयर" : lang === "mr" ? "शेअर" : "Share"}</span>
        </Button>
        <Button variant="ghost" className="header-action" onClick={onOpenSOS}>
          <GoogleIcon name="LifeBuoy" size={21} /><span>{lang === "hi" ? "मदद" : lang === "mr" ? "मदत" : "Help"}</span>
        </Button>
      </div>
    </header>
  );
}
