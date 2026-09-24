const insuranceMilestones = () => [
  { label: "OPD Pre-Registration Intimated", done: true, time: "09:08 AM" },
  { label: "TPA Eligibility & ABHA Verified", done: true, time: "09:18 AM" },
  { label: "Diagnostic Pre-Authorization Approved", done: false, time: null },
  { label: "Pharmacy & Final Settlement", done: false, time: null }
];

export const initialPatients = [
  {
    patientId: "PT-84920",
    name: "Aarav Sharma",
    token: "B-14",
    careType: "Diabetes Care",
    currentStageIndex: 2,
    stages: [
      { name: "Check-in", status: "done", time: "09:15 AM" },
      { name: "Vitals", status: "done", time: "09:35 AM" },
      { name: "Doctor consultation", status: "current", time: "10:10 AM" },
      { name: "Blood tests", status: "upcoming", time: null },
      { name: "Dietitian", status: "upcoming", time: null },
      { name: "Pharmacy", status: "upcoming", time: null }
    ],
    nextStep: {
      title: "Diagnostic Pathology & Biochemistry",
      location: "Floor 2, Wing B, Room 204",
      floorTape: "Yellow",
      actions: ["How to get there", "Listen", "I've arrived"]
    },
    estimatedWait: 12,
    prepChecklist: [
      { label: "Digital token B-14 is ready on this screen", done: true },
      { label: "Doctor's requisition was sent electronically", done: true }
    ],
    fastingQuestion: { asked: true, answer: null },
    orders: [],
    insurance: {
      provider: "Ayushman Bharat PM-JAY",
      claimId: "CLM-84920",
      preAuthApproved: false,
      patientCoPay: "₹0",
      policy: "AB-PMJAY Gold",
      status: "Eligibility verified"
    },
    milestones: insuranceMilestones(),
    documents: [
      { name: "Ayushman Bharat ABHA Health Card", meta: "Verified today · 450 KB" }
    ]
  },
  {
    patientId: "PT-39104",
    name: "Sunita Deshmukh",
    token: "ONC-08",
    careType: "Cancer Care",
    currentStageIndex: 1,
    stages: [
      { name: "Day-care registration", status: "done", time: "08:30 AM" },
      { name: "Doctor review", status: "current", time: "09:45 AM" },
      { name: "Pre-medication", status: "upcoming", time: null },
      { name: "Treatment", status: "upcoming", time: null },
      { name: "Observation", status: "upcoming", time: null },
      { name: "Discharge", status: "upcoming", time: null }
    ],
    nextStep: {
      title: "Medical Oncology Infusion Suite",
      location: "Floor 4, Wing C, Infusion Suite 4B",
      floorTape: "Purple",
      actions: ["How to get there", "Listen", "I've arrived"]
    },
    estimatedWait: 8,
    prepChecklist: [
      { label: "Infusion recliner 08 is reserved", done: true },
      { label: "Cycle 4 clearance is on file", done: true }
    ],
    fastingQuestion: { asked: false, answer: null },
    orders: [
      { name: "Paclitaxel + Carboplatin Cycle 4", location: "Infusion Suite 4B", ref: "ORD-ONC-4401", cost: "₹18,600", coverage: "Pre-authorized", status: "Ordered" }
    ],
    insurance: {
      provider: "HDFC ERGO",
      claimId: "CLM-39104",
      preAuthApproved: true,
      patientCoPay: "₹0",
      policy: "Optima Secure",
      status: "Pre-authorization approved"
    },
    milestones: insuranceMilestones().map((item, index) => index === 2 ? { ...item, done: true, time: "09:52 AM" } : item),
    documents: [
      { name: "Cycle 4 Clinical Clearance", meta: "Today · 1.1 MB" }
    ]
  },
  {
    patientId: "PT-61923",
    name: "Priya Patel",
    token: "ANC-03",
    careType: "Maternal & Child",
    currentStageIndex: 1,
    stages: [
      { name: "Antenatal check-in", status: "done", time: "09:00 AM" },
      { name: "Doctor assessment", status: "current", time: "09:30 AM" },
      { name: "Ultrasound", status: "upcoming", time: null },
      { name: "Glucose test", status: "upcoming", time: null },
      { name: "Nutrition guidance", status: "upcoming", time: null },
      { name: "Medicines", status: "upcoming", time: null }
    ],
    nextStep: {
      title: "Fetal Medicine & Radiology",
      location: "Floor 3, Room 315",
      floorTape: "Pink footprints",
      actions: ["How to get there", "Listen", "I've arrived"]
    },
    estimatedWait: 10,
    prepChecklist: [
      { label: "Drink two glasses of water before the scan", done: false },
      { label: "Ultrasound requisition was sent electronically", done: true }
    ],
    fastingQuestion: { asked: false, answer: null },
    orders: [],
    insurance: {
      provider: "Star Health",
      claimId: "CLM-61923",
      preAuthApproved: false,
      patientCoPay: "₹250",
      policy: "Family Health Optima",
      status: "Eligibility verified"
    },
    milestones: insuranceMilestones(),
    documents: [
      { name: "Antenatal 24-Week Visit Note", meta: "Today · 920 KB" }
    ]
  },
  {
    patientId: "PT-77218",
    name: "Imran Khan",
    token: "D-21",
    careType: "Diabetes Care",
    currentStageIndex: 0,
    stages: [
      { name: "Check-in", status: "current", time: "10:05 AM" },
      { name: "Vitals", status: "upcoming", time: null },
      { name: "Doctor consultation", status: "upcoming", time: null },
      { name: "Blood tests", status: "upcoming", time: null },
      { name: "Dietitian", status: "upcoming", time: null },
      { name: "Pharmacy", status: "upcoming", time: null }
    ],
    nextStep: {
      title: "Vitals & Triage",
      location: "Ground Floor, Room 102",
      floorTape: "Blue",
      actions: ["How to get there", "Listen", "I've arrived"]
    },
    estimatedWait: 18,
    prepChecklist: [
      { label: "Keep your ABHA card ready", done: false }
    ],
    fastingQuestion: { asked: false, answer: null },
    orders: [],
    insurance: {
      provider: "Ayushman Bharat PM-JAY",
      claimId: "CLM-77218",
      preAuthApproved: false,
      patientCoPay: "₹0",
      policy: "AB-PMJAY Gold",
      status: "Pre-registration intimated"
    },
    milestones: insuranceMilestones().map((item, index) => index === 1 ? { ...item, done: false, time: null } : index > 1 ? item : item),
    documents: []
  }
];
