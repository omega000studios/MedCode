import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import DoctorDashboard from "./components/DoctorDashboard";
import DocumentVault from "./components/DocumentVault";
import IndoorMapModal from "./components/IndoorMapModal";
import SharedDocumentPreviewModal from "./components/SharedDocumentPreviewModal";
import CaregiverShareModal from "./components/CaregiverShareModal";
import SOSModal from "./components/SOSModal";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Separator } from "./components/ui/separator";
import { GoogleIcon } from "./GoogleIcons";
import {
  loadStoredPatients,
  getActivePatientId,
  setActivePatientId,
  getStoredLanguage,
  setStoredLanguage,
  subscribeToStore,
  setFastingAnswer
} from "./services/sharedPatientStore";
import "./patient-home.css";

const copyByLanguage = {
  en: {
    greeting: (name) => `Good morning, ${name}`,
    tabs: { next: "What's next", journey: "Journey", documents: "Documents" },
    next: "Your next step",
    goTo: "Go to",
    directions: "How to get there",
    listen: "Listen",
    stop: "Stop audio",
    arrived: "I've arrived",
    arrivalShared: "Arrival shared",
    token: "Your token",
    wait: "Estimated wait",
    prep: "Ready for this step",
    readyInfo: "Already prepared",
    fastingQuestion: "Have you had anything except water in the past 8 hours?",
    fasted: "No, I have fasted",
    ate: "Yes, I ate or drank",
    fastingReady: "You can continue to the blood test.",
    fastingStop: "Do not go to Diagnostics yet. Ask a staff member what to do next.",
    answerFirst: "Answer the fasting question below before continuing.",
    askStaff: "Ask staff for help",
    progress: "Your visit",
    step: (done, total) => `${done} of ${total} stages complete`,
    journey: "Full visit timeline",
    orders: "Tests and medicines",
    insurance: "Insurance and payment",
    files: "Documents",
    careDetails: "Care details",
    doneStatus: "Done",
    currentStatus: "Now",
    nextStatus: "Next",
    checked: "Completed",
    demo: "Demo controls"
  },
  hi: {
    greeting: (name) => `नमस्ते, ${name}`,
    tabs: { next: "अगला कदम", journey: "यात्रा", documents: "दस्तावेज़" },
    next: "आपका अगला कदम",
    goTo: "जाएँ",
    directions: "वहाँ कैसे पहुँचें",
    listen: "सुनें",
    stop: "ऑडियो बंद करें",
    arrived: "मैं पहुँच गया/गई",
    arrivalShared: "पहुँचने की सूचना भेजी",
    token: "आपका टोकन",
    wait: "अनुमानित प्रतीक्षा",
    prep: "इस चरण के लिए तैयारी",
    readyInfo: "पहले से तैयार",
    fastingQuestion: "क्या आपने पिछले 8 घंटों में पानी के अलावा कुछ खाया या पिया है?",
    fasted: "नहीं, मैं खाली पेट हूँ",
    ate: "हाँ, मैंने खाया या पिया है",
    fastingReady: "आप रक्त जाँच के लिए जा सकते हैं।",
    fastingStop: "अभी डायग्नोस्टिक्स न जाएँ। आगे क्या करना है, इसके लिए स्टाफ से पूछें।",
    answerFirst: "आगे जाने से पहले उपवास वाले प्रश्न का उत्तर दें।",
    askStaff: "स्टाफ से मदद लें",
    progress: "आपकी अब तक की यात्रा",
    step: (done, total) => `${total} में से ${done} चरण पूरे`,
    journey: "पूरी यात्रा",
    orders: "जाँच और दवाइयाँ",
    insurance: "बीमा और भुगतान",
    files: "दस्तावेज़",
    careDetails: "देखभाल की जानकारी",
    doneStatus: "पूरा",
    currentStatus: "अभी",
    nextStatus: "आगे",
    checked: "पूरा हुआ",
    demo: "डेमो नियंत्रण"
  },
  mr: {
    greeting: (name) => `नमस्कार, ${name}`,
    tabs: { next: "पुढील टप्पा", journey: "प्रवास", documents: "कागदपत्रे" },
    next: "तुमचा पुढील टप्पा",
    goTo: "येथे जा",
    directions: "तिथे कसे जायचे",
    listen: "ऐका",
    stop: "ऑडिओ थांबवा",
    arrived: "मी पोहोचलो/पोहोचले",
    arrivalShared: "पोहोचल्याचे कळवले",
    token: "तुमचा टोकन",
    wait: "अंदाजे प्रतीक्षा",
    prep: "या टप्प्यासाठी तयारी",
    readyInfo: "आधीच तयार",
    fastingQuestion: "गेल्या 8 तासांत तुम्ही पाण्याव्यतिरिक्त काही खाल्ले किंवा प्यायले आहे का?",
    fasted: "नाही, मी उपाशी आहे",
    ate: "हो, मी खाल्ले किंवा प्यायले",
    fastingReady: "तुम्ही रक्त तपासणीसाठी जाऊ शकता.",
    fastingStop: "आत्ता डायग्नोस्टिक्सला जाऊ नका. पुढे काय करायचे ते कर्मचाऱ्यांना विचारा.",
    answerFirst: "पुढे जाण्यापूर्वी उपवासाच्या प्रश्नाचे उत्तर द्या.",
    askStaff: "कर्मचाऱ्यांची मदत घ्या",
    progress: "आतापर्यंतचा प्रवास",
    step: (done, total) => `${total} पैकी ${done} टप्पे पूर्ण`,
    journey: "संपूर्ण प्रवास",
    orders: "चाचण्या आणि औषधे",
    insurance: "विमा आणि देयक",
    files: "कागदपत्रे",
    careDetails: "उपचाराची माहिती",
    doneStatus: "पूर्ण",
    currentStatus: "आत्ता",
    nextStatus: "पुढे",
    checked: "पूर्ण झाले",
    demo: "डेमो नियंत्रणे"
  }
};

const stageLabels = {
  "PT-84920": {
    en: ["Check-in", "Vitals", "Doctor visit", "Blood tests", "Dietitian", "Pharmacy"],
    hi: ["चेक-इन", "जाँच", "डॉक्टर", "रक्त जाँच", "आहार सलाह", "फार्मेसी"],
    mr: ["चेक-इन", "तपासणी", "डॉक्टर", "रक्त तपासणी", "आहार सल्ला", "फार्मसी"]
  },
  "PT-39104": {
    en: ["Registration", "Doctor review", "Pre-medication", "Treatment", "Observation", "Discharge"],
    hi: ["पंजीकरण", "डॉक्टर समीक्षा", "पूर्व-दवा", "उपचार", "निगरानी", "डिस्चार्ज"],
    mr: ["नोंदणी", "डॉक्टर तपासणी", "पूर्व-औषध", "उपचार", "निरीक्षण", "डिस्चार्ज"]
  },
  "PT-61923": {
    en: ["Check-in", "Doctor visit", "Ultrasound", "Glucose test", "Guidance", "Medicines"],
    hi: ["चेक-इन", "डॉक्टर", "अल्ट्रासाउंड", "ग्लूकोज़ जाँच", "सलाह", "दवाइयाँ"],
    mr: ["चेक-इन", "डॉक्टर", "अल्ट्रासाऊंड", "ग्लुकोज तपासणी", "मार्गदर्शन", "औषधे"]
  }
};

function PatientApp() {
  const [patients, setPatients] = useState(() => loadStoredPatients());
  const [activePatientId, setPatientId] = useState(() => getActivePatientId());
  const [lang, setLang] = useState(() => getStoredLanguage());
  const [activeTab, setActiveTab] = useState("next");
  const [arrivalConfirmed, setArrivalConfirmed] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToStore(() => {
      setPatients(loadStoredPatients());
      setPatientId(getActivePatientId());
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }, []);

  const handleSelectPatient = (id) => {
    setPatientId(id);
    setActivePatientId(id);
    setArrivalConfirmed(false);
    setActiveTab("next");
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleSelectLang = (value) => {
    setLang(value);
    setStoredLanguage(value);
  };

  const patient = patients.find((item) => item.patientId === activePatientId) || patients[0];
  const card = patient.nextStep || {};
  const copy = copyByLanguage[lang] || copyByLanguage.en;
  const firstName = patient.name.split(" ")[0];
  const stages = patient.stages || [];
  const completedCount = stages.filter((stage) => stage.status === "done").length;
  const readyItems = patient.prepChecklist || [];
  const fastingItem = patient.fastingQuestion?.asked;
  const fastingResponse = patient.fastingQuestion?.answer;
  const canProceed = !fastingItem || fastingResponse === "fasted";
  const visibleStageLabels = stageLabels[patient.patientId]?.[lang] || stageLabels[patient.patientId]?.en || stages.map((stage) => stage.name);
  const summary = `${card.title}. ${card.location}. Follow ${card.floorTape} floor markings.`;

  const toggleSpeech = () => {
    if (!("speechSynthesis" in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(summary || card.title);
    utterance.lang = lang === "hi" ? "hi-IN" : lang === "mr" ? "mr-IN" : "en-IN";
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleArrivalConfirmed = () => {
    setArrivalConfirmed(true);
  };

  const handleFastingAnswer = (answer) => {
    setFastingAnswer(patient.patientId, answer);
    setPatients(loadStoredPatients());
  };

  return (
    <div className="patient-app" id="visit">
      <Header
        activePatient={patient}
        allPatients={patients}
        onSelectPatient={handleSelectPatient}
        lang={lang}
        onSelectLang={handleSelectLang}
        labels={copy}
        onOpenShare={() => setIsShareOpen(true)}
        onOpenSOS={() => setIsSOSOpen(true)}
      />

      <main className="simple-main">
        <div className="intro-block"><h1>{copy.greeting(firstName)}</h1></div>

        <nav className="visit-tabs" aria-label="Visit sections">
          {Object.entries(copy.tabs).map(([key, label]) => (
            <button key={key} className={activeTab === key ? "active" : ""} onClick={() => setActiveTab(key)} aria-current={activeTab === key ? "page" : undefined}>{label}</button>
          ))}
        </nav>

        {activeTab === "next" && <section className="tab-panel" aria-label={copy.tabs.next}>
          <div className="primary-grid">
            <Card className="next-step-card">
              <CardContent className="next-step-content">
                <p className="next-step-label">{copy.next}</p>
                <h2>{copy.goTo} {card.title}</h2>
                <p className="destination"><GoogleIcon name="MapPin" size={21} />{card.location} · {card.floorTape}</p>
                <div className="main-actions">
                  <Button className="primary-button" onClick={() => setIsMapOpen(true)} disabled={!canProceed} aria-describedby={!canProceed ? "fasting-gate-note" : undefined}>
                    <GoogleIcon name="Navigation" size={20} /> {copy.directions}
                  </Button>
                  <Button variant="secondary" className="quiet-button" onClick={toggleSpeech}>
                    <GoogleIcon name={isSpeaking ? "VolumeX" : "Volume2"} size={20} /> {isSpeaking ? copy.stop : copy.listen}
                  </Button>
                  <Button variant="ghost" className="arrival-inline" onClick={handleArrivalConfirmed} disabled={!canProceed || arrivalConfirmed}>
                    <GoogleIcon name="CheckCircle2" size={20} /> {arrivalConfirmed ? copy.arrivalShared : copy.arrived}
                  </Button>
                </div>
                {!canProceed && fastingResponse !== "ate" && <p className="action-note" id="fasting-gate-note">{copy.answerFirst}</p>}
              </CardContent>
            </Card>

            <Card className="token-card"><CardContent className="token-content">
              <div><span className="card-kicker">{copy.token}</span><strong>{patient.token}</strong></div>
              <Separator className="token-separator" />
              <div><span className="card-kicker">{copy.wait}</span><b>{patient.estimatedWait} min</b></div>
            </CardContent></Card>
          </div>

          <Card className="readiness-card"><CardContent>
            <h3>{copy.prep}</h3>
            {readyItems.length > 0 && <div className="ready-facts">
              <p className="facts-label">{copy.readyInfo}</p>
              <ul>{readyItems.map((item) => <li key={item.label}><GoogleIcon name={item.done ? "CheckCircle2" : "Circle"} size={20} /><span>{item.label}</span></li>)}</ul>
            </div>}
            {fastingItem && <fieldset className="fasting-check">
              <legend>{copy.fastingQuestion}</legend>
              <div className="choice-row">
                <button className={fastingResponse === "fasted" ? "selected" : ""} onClick={() => handleFastingAnswer("fasted")} aria-pressed={fastingResponse === "fasted"}>{copy.fasted}</button>
                <button className={fastingResponse === "ate" ? "selected warning-choice" : ""} onClick={() => handleFastingAnswer("ate")} aria-pressed={fastingResponse === "ate"}>{copy.ate}</button>
              </div>
              {fastingResponse === "fasted" && <p className="fasting-message success"><GoogleIcon name="CheckCircle2" size={20} />{copy.fastingReady}</p>}
              {fastingResponse === "ate" && <div className="fasting-message warning" role="alert"><p><GoogleIcon name="AlertTriangle" size={20} />{copy.fastingStop}</p><Button variant="outline" onClick={() => setIsSOSOpen(true)}>{copy.askStaff}</Button></div>}
            </fieldset>}
          </CardContent></Card>
        </section>}

        {activeTab === "journey" && <section className="tab-panel journey-panel" aria-label={copy.tabs.journey}>
          <div className="journey-heading"><div><h2>{copy.progress}</h2><p>{copy.step(completedCount, stages.length)}</p></div><span>{patient.careType}</span></div>
          <ol className="stage-list">
            {stages.map((stage, index) => {
              const displayStatus = stage.status === "done" ? "completed" : stage.status === "current" ? "in-progress" : "upcoming";
              const statusLabel = displayStatus === "completed" ? copy.doneStatus : displayStatus === "in-progress" ? copy.currentStatus : copy.nextStatus;
              return <li key={`${stage.name}-${index}`} className={displayStatus}>
                <span className="stage-marker">{displayStatus === "completed" ? <GoogleIcon name="Check" size={17} /> : index + 1}</span>
                <div><strong>{visibleStageLabels[index]}</strong><span>{statusLabel}{stage.time ? ` · ${stage.time}` : ""}</span></div>
              </li>;
            })}
          </ol>
          <h3 className="care-details-title">{copy.careDetails}</h3>
          <div className="patient-care-grid">
            <section><h4>{copy.orders}</h4>{patient.orders.length ? <ul>{patient.orders.map((order) => <li key={order.ref}><strong>{order.name}</strong><span>{order.status} · {order.location}</span></li>)}</ul> : <p>{lang === "hi" ? "कोई सक्रिय आदेश नहीं" : lang === "mr" ? "सक्रिय आदेश नाहीत" : "No active orders"}</p>}</section>
            <section><h4>{copy.insurance}</h4><dl><div><dt>{patient.insurance.provider}</dt><dd>{patient.insurance.status}</dd></div><div><dt>{patient.insurance.claimId}</dt><dd>{patient.insurance.patientCoPay}</dd></div></dl></section>
          </div>
        </section>}

        {activeTab === "documents" && <section className="tab-panel documents-panel" aria-label={copy.tabs.documents}>
          <DocumentVault patient={patient} lang={lang} onPreviewDocument={setPreviewDoc} />
        </section>}
      </main>

      {isMapOpen && <IndoorMapModal patient={patient} lang={lang} onClose={() => setIsMapOpen(false)} />}
      {isShareOpen && <CaregiverShareModal patient={patient} lang={lang} onClose={() => setIsShareOpen(false)} />}
      {isSOSOpen && <SOSModal patient={patient} lang={lang} onClose={() => setIsSOSOpen(false)} />}
      {previewDoc && <SharedDocumentPreviewModal doc={previewDoc} patient={patient} onClose={() => setPreviewDoc(null)} />}
    </div>
  );
}

export default function App() {
  return window.location.hash.startsWith("#doctor") ? <DoctorDashboard /> : <PatientApp />;
}
