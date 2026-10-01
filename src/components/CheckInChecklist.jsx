import React from "react";
import { Card, CardContent } from "./ui/card";
import { updatePatientCheckIn } from "../services/sharedPatientStore";

const labels = {
  en: {
    title: "Check-in checklist",
    intro: "A few details help the care team prepare before your next step.",
    identity: "Identity documents",
    aadhaar: "Aadhaar ready to show staff",
    pan: "PAN ready, if your insurer or scheme asks",
    identityNote: "This marks documents as ready to show. Clinic staff completes verification. Do not enter ID numbers here.",
    history: "Medical history",
    historyHint: "Share conditions, allergies, current medicines, or previous procedures.",
    historyPlaceholder: "Add a short note for the care team",
    vitals: "Before your vitals",
    vitalsHint: "These details can help staff interpret a reading.",
    fasting: "Fasted before this reading?",
    exertion: "Exercise or heavy activity in the last 30 minutes?",
    yes: "Yes",
    no: "No",
    unsure: "Not sure",
    priorTests: "Any lab test before vitals?",
    priorTestsPlaceholder: "Urine, stool, or another test (if any)",
    rest: "Rest at the OPD before vitals (minutes)",
    restHint: "Follow staff instructions. If asked to wait 30 minutes, tell staff when you started.",
    coverage: "Insurance or scheme at this centre",
    plan: "Your plan",
    acceptance: "Centre eligibility",
    unconfirmed: "Needs confirmation",
    cashless: "Cashless",
    reimbursement: "Reimbursement",
    coverHint: "Acceptance varies by centre. Ask the insurance desk whether this plan supports cashless care or reimbursement here.",
    saved: "Your answers are saved for clinic staff to review.",
    lab: "Lab tests"
  },
  hi: {
    title: "चेक-इन सूची",
    intro: "अगले चरण से पहले ये जानकारी देखभाल टीम की मदद करेगी।",
    identity: "पहचान दस्तावेज़",
    aadhaar: "स्टाफ को दिखाने के लिए आधार तैयार है",
    pan: "बीमा या योजना माँगे तो पैन तैयार है",
    identityNote: "यह केवल दस्तावेज़ तैयार होने की सूचना है। सत्यापन क्लिनिक स्टाफ करेगा। यहाँ आईडी नंबर न डालें।",
    history: "चिकित्सा इतिहास",
    historyHint: "बीमारियाँ, एलर्जी, चल रही दवाइयाँ या पिछली प्रक्रियाएँ बताएँ।",
    historyPlaceholder: "देखभाल टीम के लिए छोटा नोट लिखें",
    vitals: "वाइटल्स से पहले",
    vitalsHint: "यह जानकारी रीडिंग समझने में स्टाफ की मदद कर सकती है।",
    fasting: "इस रीडिंग से पहले उपवास किया था?",
    exertion: "पिछले 30 मिनट में व्यायाम या भारी गतिविधि की?",
    yes: "हाँ",
    no: "नहीं",
    unsure: "पता नहीं",
    priorTests: "वाइटल्स से पहले कोई लैब जाँच?",
    priorTestsPlaceholder: "पेशाब, मल या कोई अन्य जाँच (यदि हो)",
    rest: "वाइटल्स से पहले OPD में आराम (मिनट)",
    restHint: "स्टाफ के निर्देश मानें। 30 मिनट रुकने को कहा हो तो शुरू करने का समय बताएँ।",
    coverage: "इस केंद्र पर बीमा या योजना",
    plan: "आपकी योजना",
    acceptance: "केंद्र की पात्रता",
    unconfirmed: "पुष्टि आवश्यक",
    cashless: "कैशलेस",
    reimbursement: "रीइम्बर्समेंट",
    coverHint: "स्वीकृति केंद्र के अनुसार बदलती है। बीमा डेस्क से कैशलेस या रीइम्बर्समेंट की पुष्टि करें।",
    saved: "आपके उत्तर क्लिनिक स्टाफ के लिए सहेजे गए हैं।",
    lab: "लैब जाँच"
  },
  mr: {
    title: "चेक-इन यादी",
    intro: "पुढील टप्प्यापूर्वीची ही माहिती उपचार पथकाला मदत करेल.",
    identity: "ओळखपत्रे",
    aadhaar: "कर्मचाऱ्यांना दाखवण्यासाठी आधार तयार आहे",
    pan: "विमा किंवा योजना मागत असल्यास पॅन तयार आहे",
    identityNote: "यातून फक्त कागदपत्र तयार असल्याचे कळते. पडताळणी क्लिनिक कर्मचारी करतील. येथे आयडी क्रमांक टाकू नका.",
    history: "वैद्यकीय इतिहास",
    historyHint: "आजार, ॲलर्जी, सध्या सुरू असलेली औषधे किंवा पूर्वीच्या प्रक्रिया सांगा.",
    historyPlaceholder: "उपचार पथकासाठी छोटी नोंद लिहा",
    vitals: "वाइटल्स घेण्यापूर्वी",
    vitalsHint: "ही माहिती वाचनाचा अर्थ समजून घेण्यास कर्मचाऱ्यांना मदत करेल.",
    fasting: "या वाचनापूर्वी उपवास केला होता?",
    exertion: "मागील 30 मिनिटांत व्यायाम किंवा जड हालचाल केली?",
    yes: "होय",
    no: "नाही",
    unsure: "निश्चित नाही",
    priorTests: "वाइटल्सपूर्वी कोणतीही लॅब तपासणी?",
    priorTestsPlaceholder: "लघवी, विष्ठा किंवा अन्य तपासणी (असल्यास)",
    rest: "वाइटल्सपूर्वी OPD मध्ये विश्रांती (मिनिटे)",
    restHint: "कर्मचाऱ्यांच्या सूचना पाळा. 30 मिनिटे थांबण्यास सांगितल्यास कधी सुरू केले ते सांगा.",
    coverage: "या केंद्रातील विमा किंवा योजना",
    plan: "तुमची योजना",
    acceptance: "केंद्राची पात्रता",
    unconfirmed: "पुष्टी आवश्यक",
    cashless: "कॅशलेस",
    reimbursement: "रीइम्बर्समेंट",
    coverHint: "स्वीकृती केंद्रानुसार बदलते. विमा डेस्ककडून कॅशलेस किंवा रीइम्बर्समेंटची खात्री करा.",
    saved: "तुमची उत्तरे क्लिनिक कर्मचाऱ्यांसाठी जतन केली आहेत.",
    lab: "लॅब तपासण्या"
  }
};

function CheckInField({ label, value, onChange, copy }) {
  return (
    <label className="checkin-field">
      <span>{label}</span>
      <select value={value || ""} onChange={(event) => onChange(event.target.value)}>
        <option value="">—</option>
        <option value="yes">{copy.yes}</option>
        <option value="no">{copy.no}</option>
        <option value="unsure">{copy.unsure}</option>
      </select>
    </label>
  );
}

export default function CheckInChecklist({ patient, lang = "en" }) {
  const copy = labels[lang] || labels.en;
  const checkIn = patient.checkIn || {};
  const save = (key, value) => updatePatientCheckIn(patient.patientId, key, value);
  const insurance = patient.insurance || {};

  return (
    <Card className="checkin-card">
      <CardContent>
        <div className="checkin-heading">
          <div><h3>{copy.title}</h3><p>{copy.intro}</p></div>
          <span className="checkin-save-state">{copy.saved}</span>
        </div>

        <section className="checkin-section" aria-labelledby="checkin-identity-title">
          <h4 id="checkin-identity-title">{copy.identity}</h4>
          <div className="checkin-identity-list">
            <label className="checkin-toggle"><input type="checkbox" checked={Boolean(checkIn.aadhaarReady)} onChange={(event) => save("aadhaarReady", event.target.checked)} /><span>{copy.aadhaar}</span></label>
            <label className="checkin-toggle"><input type="checkbox" checked={Boolean(checkIn.panReady)} onChange={(event) => save("panReady", event.target.checked)} /><span>{copy.pan}</span></label>
          </div>
          <p className="checkin-help">{copy.identityNote}</p>
        </section>

        <section className="checkin-section" aria-labelledby="checkin-history-title">
          <h4 id="checkin-history-title">{copy.history}</h4>
          <label className="checkin-field"><span>{copy.historyHint}</span><textarea rows="2" value={checkIn.medicalHistory || ""} placeholder={copy.historyPlaceholder} onChange={(event) => save("medicalHistory", event.target.value)} /></label>
        </section>

        <section className="checkin-section" aria-labelledby="checkin-vitals-title">
          <div className="checkin-section-heading"><div><h4 id="checkin-vitals-title">{copy.vitals}</h4><p>{copy.vitalsHint}</p></div></div>
          <div className="checkin-vitals-grid">
            <CheckInField label={copy.fasting} value={checkIn.fastingBeforeVitals} onChange={(value) => save("fastingBeforeVitals", value)} copy={copy} />
            <CheckInField label={copy.exertion} value={checkIn.recentExertion} onChange={(value) => save("recentExertion", value)} copy={copy} />
            <label className="checkin-field"><span>{copy.priorTests}</span><input type="text" value={checkIn.priorTests || ""} placeholder={copy.priorTestsPlaceholder} onChange={(event) => save("priorTests", event.target.value)} /></label>
            <label className="checkin-field"><span>{copy.rest}</span><input type="number" min="0" max="240" value={checkIn.opdRestMinutes || ""} onChange={(event) => save("opdRestMinutes", event.target.value)} /></label>
          </div>
          <p className="checkin-help">{copy.restHint}</p>
        </section>

        <section className="checkin-section coverage-section" aria-labelledby="checkin-coverage-title">
          <div className="checkin-section-heading"><div><h4 id="checkin-coverage-title">{copy.coverage}</h4><p>{copy.plan}: <strong>{insurance.provider || "—"}</strong>{insurance.policy ? ` · ${insurance.policy}` : ""}</p></div><span className="coverage-status">{copy.unconfirmed}</span></div>
          <div className="coverage-methods"><span>{copy.cashless}: {copy.unconfirmed}</span><span>{copy.reimbursement}: {copy.unconfirmed}</span></div>
          <p className="checkin-help">{copy.coverHint}</p>
        </section>
      </CardContent>
    </Card>
  );
}
