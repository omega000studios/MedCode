export const initialPatients = [
  {
    patientId: "PT-84920",
    name: "Aarav Sharma",
    age: 48,
    gender: "Male",
    phone: "+91 98201 44821",
    abhaId: "91-4820-1928-3012",
    carePathway: "Diabetes Care",
    tokenNumber: "B-14",
    currentStageId: "stage-4",
    stages: [
      {
        id: "stage-1",
        name: "Check-in & ABHA Verification",
        department: "Central Reception Desk",
        room: "Counter 4, Ground Floor",
        status: "completed",
        timestamp: "09:15 AM",
        notes: "ABHA Card validated. Token B-14 issued. Co-pay: ₹0."
      },
      {
        id: "stage-2",
        name: "Vitals & Triage Assessment",
        department: "Triage Station A",
        room: "Room 102, Ground Floor",
        status: "completed",
        timestamp: "09:35 AM",
        notes: "BP: 130/84 mmHg, Pulse: 74 bpm, Random Sugar: 182 mg/dL. Referred to Endocrinology."
      },
      {
        id: "stage-3",
        name: "Endocrinologist Consultation",
        department: "Department of Endocrinology",
        room: "OPD Room 218, 1st Floor",
        status: "completed",
        timestamp: "10:10 AM",
        notes: "Dr. Rohini Sen reviewing HbA1c history and microvascular risks. Orders issued for Fasting Lipid & Retinal screening."
      },
      {
        id: "stage-4",
        name: "Diagnostic Blood Draw & Urine Microalbumin",
        department: "Central Diagnostic Pathology",
        room: "Lab 204, 2nd Floor (Yellow Zone)",
        status: "in-progress",
        timestamp: "Est. 10:45 AM",
        notes: "Fasting blood sample collection for HbA1c, Serum Creatinine, and Lipid Profile."
      },
      {
        id: "stage-5",
        name: "Dietitian & Lifestyle Counseling",
        department: "Clinical Nutrition Wing",
        room: "Cabin 312, 3rd Floor",
        status: "upcoming",
        timestamp: "Est. 11:30 AM",
        notes: "Diabetic meal plan scheduling and CGM sensor orientation."
      },
      {
        id: "stage-6",
        name: "Pharmacy Dispensation & Check-out",
        department: "Outpatient Pharmacy",
        room: "Counter 2, Ground Floor Atrium",
        status: "upcoming",
        timestamp: "Est. 12:15 PM",
        notes: "Collect prescribed Metformin Extended-Release and test strips."
      }
    ],
    nextStepCard: {
      headline: "Proceed to Diagnostic Pathology for Fasting Blood Tests",
      headlineHi: "उपवास रक्त परीक्षण हेतु सेंट्रल पैथोलॉजी लैब में जाएं",
      headlineMr: "उपाशीपोटी रक्त तपासणीसाठी सेंट्रल पॅथॉलॉजी लॅबमध्ये जा",
      department: "Diagnostic Pathology & Biochemistry",
      location: "Floor 2, Wing B, Room 204 (Follow Yellow Floor Tape)",
      estWait: "12-15 mins",
      summary: "Dr. Rohini Sen has ordered HbA1c, Fasting Glucose, and Renal Panels. Please proceed directly to Room 204. Your sample collection token is already linked.",
      summaryHi: "डॉ. रोहिणी सेन ने एचबीए1सी, फास्टिंग ग्लूकोज और किडनी फंक्शन टेस्ट का आदेश दिया है। कृपया सीधे कमरा नंबर 204 में जाएं।",
      summaryMr: "डॉ. रोहिणी सेन यांनी एचबीए१सी आणि उपवास रक्ताच्या तपासणीचा सल्ला दिला आहे. कृपया थेट खोली क्रमांक २०४ मध्ये जा.",
      bring: [
        "Digital Token B-14 (shown on this screen)",
        "Doctor's Electronic Requisition Slip",
        "Confirm you have had no food for at least 8 hours"
      ],
      bringHi: [
        "डिजिटल टोकन B-14 (इस स्क्रीन पर दिखाएं)",
        "डॉक्टर की ई-पर्ची (Requisition Slip)",
        "जांचें कि आप पिछले 8 घंटे से भूखे पेट (फास्टिंग) हैं"
      ],
      bringMr: [
        "डिजिटल टोकन B-14 (या स्क्रीनवर दाखवा)",
        "डॉक्टरांची ई-पर्ची (Requisition Slip)",
        "मागील ८ तास उपाशीपोटी असल्याची खात्री करा"
      ],
      audioNarration: "Aarav ji, please proceed to Diagnostic Pathology on Floor 2, Room 204. Your token B-14 has been queued. Please ensure you are fasting for the HbA1c and lipid blood draw.",
      audioNarrationHi: "आरव जी, कृपया दूसरी मंजिल पर पैथोलॉजी लैब, कमरा 204 में जाएं। आपका टोकन B-14 कतार में है। रक्त जांच के लिए खाली पेट रहना अनिवार्य है।",
      audioNarrationMr: "आरव जी, कृपया दुसऱ्या मजल्यावरील पॅथॉलॉजी लॅब, खोली २०४ मध्ये जा. आपले टोकन B-14 रांगेत आहे. रक्त तपासणीसाठी उपाशीपोटी असणे आवश्यक आहे."
    },
    ordersPending: [
      {
        id: "ord-101",
        title: "Comprehensive Diabetic Panel (HbA1c, Lipid, Creatinine)",
        type: "Diagnostic Lab",
        department: "Pathology Lab 204",
        status: "Sample Awaited",
        code: "LAB-GLU-99",
        cost: "₹1,450",
        covered: true,
        urgency: "Routine - Morning"
      },
      {
        id: "ord-102",
        title: "Digital Fundus Retinal Photography",
        type: "Screening",
        department: "Ophthalmology Clinic 110",
        status: "Scheduled at 11:15 AM",
        code: "RAD-RET-21",
        cost: "₹800",
        covered: true,
        urgency: "Preventative"
      },
      {
        id: "ord-103",
        title: "Metformin XR 500mg (60 Tabs) + Glimepiride 1mg",
        type: "Pharmacy",
        department: "Pharmacy Counter 2",
        status: "Prescription Transmitted",
        code: "RX-MET-500",
        cost: "₹340",
        covered: true,
        urgency: "Post-Consult"
      }
    ],
    insurance: {
      provider: "Ayushman Bharat (AB-PMJAY) / Star Health",
      policyNumber: "AB-8829-DEL-2026",
      claimId: "CLM-99214-DEL",
      coverageTotal: "₹5,00,000",
      preAuthApproved: "₹18,500",
      copay: "₹0",
      status: "Pre-Authorized",
      stage: 3,
      timeline: [
        { title: "OPD Pre-Registration Intimated", time: "09:18 AM", done: true },
        { title: "TPA Eligibility & ABHA Verified", time: "09:40 AM", done: true },
        { title: "Diagnostic Pre-Authorization Approved", time: "10:05 AM", done: true },
        { title: "Pharmacy & Final Settlement", time: "Pending Dispense", done: false }
      ]
    },
    documents: [
      {
        id: "doc-1",
        name: "Doctor Consultation Summary & Rx",
        date: "24 Sep 2026, 10:12 AM",
        doctor: "Dr. Rohini Sen, MD (Endocrinology)",
        category: "Consultation",
        fileType: "PDF",
        size: "1.4 MB",
        badge: "Verified"
      },
      {
        id: "doc-2",
        name: "Lab Requisition & Test Order Sheet",
        date: "24 Sep 2026, 10:14 AM",
        doctor: "Dr. Rohini Sen",
        category: "Lab Orders",
        fileType: "PDF",
        size: "820 KB",
        badge: "Active"
      },
      {
        id: "doc-3",
        name: "Ayushman Bharat ABHA Health Card",
        date: "Verified Today",
        doctor: "National Health Authority",
        category: "Insurance & ID",
        fileType: "PDF",
        size: "450 KB",
        badge: "Linked"
      }
    ]
  },
  {
    patientId: "PT-39104",
    name: "Sunita Deshmukh",
    age: 52,
    gender: "Female",
    phone: "+91 97182 30192",
    abhaId: "27-9914-8821-4402",
    carePathway: "Cancer Care",
    tokenNumber: "ONC-08",
    currentStageId: "stage-3",
    stages: [
      {
        id: "stage-1",
        name: "Oncology Day-Care Registration & Port Flush",
        department: "Medical Oncology Day Care",
        room: "Bed 14, 4th Floor Wing C",
        status: "completed",
        timestamp: "08:30 AM",
        notes: "Port site clean, blood counts CBC confirmed safe (ANC 2,400/uL)."
      },
      {
        id: "stage-2",
        name: "Medical Oncologist Pre-Chemo Review",
        department: "Department of Medical Oncology",
        room: "Consult Room 402, 4th Floor",
        status: "completed",
        timestamp: "09:45 AM",
        notes: "Dr. Vikram Seth cleared Cycle 4 Paclitaxel + Carboplatin infusion."
      },
      {
        id: "stage-3",
        name: "Pre-Medication & Anti-Emetic Infusion",
        department: "Infusion Suite 4B",
        room: "Recliner 08, 4th Floor",
        status: "in-progress",
        timestamp: "Est. 10:30 AM",
        notes: "IV Dexamethasone and Ondansetron administration 30 mins prior."
      },
      {
        id: "stage-4",
        name: "Targeted Chemotherapy Infusion (Cycle 4)",
        department: "Specialized Infusion Centre",
        room: "Infusion Bay 4, 4th Floor",
        status: "upcoming",
        timestamp: "Est. 11:15 AM",
        notes: "Expected infusion duration: 2 hours 45 mins with continuous monitoring."
      },
      {
        id: "stage-5",
        name: "Post-Infusion Observation & Vitals Stability",
        department: "Day Care Recovery",
        room: "Observation Lounge, 4th Floor",
        status: "upcoming",
        timestamp: "Est. 02:30 PM",
        notes: "Vitals discharge protocol and emergency helpline orientation."
      },
      {
        id: "stage-6",
        name: "Discharge & Take-Home Supportive Medication",
        department: "Oncology Satellite Pharmacy",
        room: "Counter 4C, 4th Floor",
        status: "upcoming",
        timestamp: "Est. 03:15 PM",
        notes: "G-CSF injection and oral anti-nausea medication kit handover."
      }
    ],
    nextStepCard: {
      headline: "Consult Completed: Move to Infusion Suite 4B for Pre-Medication",
      headlineHi: "परामर्श पूरा हुआ: प्री-मेडिकेशन हेतु इन्फ्यूजन सुइट 4B में जाएं",
      headlineMr: "सल्ला पूर्ण झाला: प्री-मेडिकेशनसाठी इन्फ्युजन सूट 4B मध्ये जा",
      department: "Medical Oncology Infusion Suite",
      location: "Floor 4, Wing C, Infusion Suite 4B (Recliner 08)",
      estWait: "8-10 mins",
      summary: "Dr. Vikram Seth has cleared Cycle 4. Nurse Priya has reserved Infusion Recliner 08. Hydration and anti-emetics will start shortly.",
      summaryHi: "डॉ. विक्रम सेठ ने साइकिल 4 की अनुमति दे दी है। नर्स प्रिया ने रिक्लाइनर 08 तैयार कर लिया है। कृपया वहां रिपोर्ट करें।",
      summaryMr: "डॉ. विक्रम सेठ यांनी सायकल ४ ची मान्यता दिली आहे. नर्स प्रिया यांनी रिक्लायनर ०८ राखीव ठेवला आहे.",
      bring: [
        "Patient ID Wristband ONC-08",
        "Chemotherapy Protocol Booklet",
        "Warm blanket & water bottle (available on request)"
      ],
      bringHi: [
        "मरीज़ आईडी रिस्टबैंड ONC-08",
        "कीमोथेरेपी प्रोटोकॉल बुकलेट",
        "गर्म शॉल या पानी की बोतल"
      ],
      bringMr: [
        "रुग्ण आयडी रिस्टबँड ONC-08",
        "किमोथेरपी प्रोटोकॉल पुस्तिका",
        "उबदार शाल किंवा पाण्याची बाटली"
      ],
      audioNarration: "Sunita ji, your pre-chemotherapy review is cleared. Please proceed to Infusion Suite 4B on the 4th floor. Nurse Priya is ready at Recliner 08.",
      audioNarrationHi: "सुनीता जी, आपका प्री-कीमो रिव्यू पूरा हो चुका है। कृपया चौथी मंजिल पर इन्फ्यूजन सुइट 4B में जाएं। रिक्लाइनर 08 आपके लिए तैयार है।",
      audioNarrationMr: "सुनीता जी, आपला प्री-किमो रिव्ह्यू मंजूर झाला आहे. कृपया चौथ्या मजल्यावरील इन्फ्युजन सूट 4B मध्ये जा. रिक्लायनर ०८ सज्ज आहे."
    },
    ordersPending: [
      {
        id: "ord-201",
        title: "Paclitaxel (175mg/m2) + Carboplatin AUC 5 Chemotherapy",
        type: "Oncology Infusion",
        department: "Chemotherapy Pharmacy",
        status: "Compounding in Cleanroom",
        code: "CHEMO-PAC-CARB",
        cost: "₹38,500",
        covered: true,
        urgency: "Stat - Cleared"
      },
      {
        id: "ord-202",
        title: "Inj. Pegfilgrastim 6mg (Post-Chemo WBC Support)",
        type: "Supportive Care",
        department: "Floor 4 Pharmacy",
        status: "Dispensed for Day 2",
        code: "BIO-PEG-6",
        cost: "₹6,800",
        covered: true,
        urgency: "Routine"
      }
    ],
    insurance: {
      provider: "HDFC ERGO Health Suraksha / PMJAY TPA",
      policyNumber: "HDF-CAN-99104-MUM",
      claimId: "CLM-CAN-2026-081",
      coverageTotal: "₹15,00,000",
      preAuthApproved: "₹45,300",
      copay: "₹0",
      status: "Pre-Authorized",
      stage: 3,
      timeline: [
        { title: "Day-Care Admission Request Submitted", time: "08:15 AM", done: true },
        { title: "Protocol & Drug Regimen Verified", time: "08:45 AM", done: true },
        { title: "Cashless Pre-Auth Letter Approved", time: "09:10 AM", done: true },
        { title: "Final Day-Care Settlement", time: "Est. 03:30 PM", done: false }
      ]
    },
    documents: [
      {
        id: "doc-201",
        name: "Cycle 4 Chemo Clinical Clearance & Protocol",
        date: "24 Sep 2026, 09:40 AM",
        doctor: "Dr. Vikram Seth, DM (Medical Oncology)",
        category: "Consultation",
        fileType: "PDF",
        size: "2.1 MB",
        badge: "Signed"
      },
      {
        id: "doc-202",
        name: "Complete Blood Count (CBC) with Differential",
        date: "24 Sep 2026, 08:50 AM",
        doctor: "Central Hematology Lab",
        category: "Lab Orders",
        fileType: "PDF",
        size: "620 KB",
        badge: "Normal"
      },
      {
        id: "doc-203",
        name: "HDFC ERGO Cashless Guarantee Authorization",
        date: "24 Sep 2026, 09:12 AM",
        doctor: "Hospital TPA Desk",
        category: "Insurance & ID",
        fileType: "PDF",
        size: "980 KB",
        badge: "Approved"
      }
    ]
  },
  {
    patientId: "PT-61923",
    name: "Priya Patel",
    age: 28,
    gender: "Female",
    phone: "+91 99302 77102",
    abhaId: "19-3382-7721-9923",
    carePathway: "Maternal & Child Health",
    tokenNumber: "ANC-03",
    currentStageId: "stage-3",
    stages: [
      {
        id: "stage-1",
        name: "Antenatal Check-in & Maternal Health Passport",
        department: "Women's Health Reception",
        room: "Desk 2, 3rd Floor",
        status: "completed",
        timestamp: "09:00 AM",
        notes: "Gestational Age: 24 Weeks 3 Days. MCP Card linked to ABHA."
      },
      {
        id: "stage-2",
        name: "Obstetrician Assessment & Fetal Doppler",
        department: "Department of Obstetrics & Gynecology",
        room: "OPD 308, 3rd Floor",
        status: "completed",
        timestamp: "09:30 AM",
        notes: "Dr. Ananya Roy confirmed reassuring fetal heart rate (142 bpm). Maternal BP 118/74."
      },
      {
        id: "stage-3",
        name: "Targeted Level-II Fetal Anatomy Ultrasound Scan",
        department: "Fetal Medicine & Ultrasound Wing",
        room: "Ultrasound Suite 315, 3rd Floor",
        status: "in-progress",
        timestamp: "Est. 10:15 AM",
        notes: "Anatomy scan to evaluate fetal growth, amniotic fluid index, and placental location."
      },
      {
        id: "stage-4",
        name: "Oral Glucose Tolerance Test (OGTT 75g)",
        department: "Maternal Pathology Bay",
        room: "Room 320, 3rd Floor",
        status: "upcoming",
        timestamp: "Est. 11:30 AM",
        notes: "Gestational diabetes screening protocol (Fasting, 1-hr, 2-hr samples)."
      },
      {
        id: "stage-5",
        name: "Prenatal Nutrition & Breastfeeding Guidance",
        department: "Lactation & Maternal Education",
        room: "Education Room 325, 3rd Floor",
        status: "upcoming",
        timestamp: "Est. 12:45 PM",
        notes: "Iron-folic acid compliance and third-trimester birth plan discussion."
      },
      {
        id: "stage-6",
        name: "Supplements Handover & Next ANC Booking",
        department: "Mother & Baby Pharmacy",
        room: "Counter 3A, 3rd Floor",
        status: "upcoming",
        timestamp: "Est. 01:30 PM",
        notes: "Calcium + Vit D3 and Ferrous Ascorbate 60-day pack dispense."
      }
    ],
    nextStepCard: {
      headline: "Proceed to Ultrasound Suite 315 for Fetal Anatomy Scan",
      headlineHi: "भ्रूण एनाटॉमी स्कैन के लिए अल्ट्रासाउंड सुइट 315 में जाएं",
      headlineMr: "गर्भाच्या ॲनाटॉमी स्कॅनसाठी अल्ट्रासाउंड सूट ३१५ मध्ये जा",
      department: "Fetal Medicine & Radiology Wing",
      location: "Floor 3, Room 315 (Follow Pink Footprints on Floor)",
      estWait: "10-15 mins",
      summary: "Dr. Ananya Roy has ordered your Level-II targeted ultrasound scan. Please drink 2 glasses of water now to maintain a moderately full bladder for clear imaging.",
      summaryHi: "डॉ. अनन्या रॉय ने आपके लेवल-II अल्ट्रासाउंड स्कैन का निर्देश दिया है। स्पष्ट इमेजिंग के लिए कृपया 2 गिलास पानी पिएं।",
      summaryMr: "डॉ. अनन्या रॉय यांनी आपल्या लेव्हल-२ अल्ट्रासाउंड स्कॅनचा सल्ला दिला आहे. स्पष्ट इमेजिंगसाठी कृपया २ ग्लास पाणी प्या.",
      bring: [
        "Token ANC-03",
        "Maternal & Child Protection (MCP) Green Card",
        "Ultrasonography requisition form signed by Dr. Roy"
      ],
      bringHi: [
        "टोकन ANC-03",
        "मातृ एवं शिशु सुरक्षा (MCP) कार्ड",
        "डॉ. रॉय द्वारा हस्ताक्षरित अल्ट्रासाउंड फॉर्म"
      ],
      bringMr: [
        "टोकन ANC-03",
        "माता व बाल संरक्षण (MCP) कार्ड",
        "डॉ. रॉय यांनी स्वाक्षरी केलेला अल्ट्रासाउंड फॉर्म"
      ],
      audioNarration: "Priya ji, your consult with Dr. Roy is complete. Please drink two glasses of water and proceed to Ultrasound Suite 315 on the 3rd floor. Your token ANC-03 is queued.",
      audioNarrationHi: "प्रिया जी, आपका डॉक्टर परामर्श पूरा हुआ। कृपया दो गिलास पानी पिएं और तीसरी मंजिल पर अल्ट्रासाउंड सुइट 315 में जाएं। टोकन ANC-03 कतार में है।",
      audioNarrationMr: "प्रिया जी, आपला डॉक्टरांचा सल्ला पूर्ण झाला आहे. कृपया २ ग्लास पाणी प्या आणि तिसऱ्या मजल्यावरील अल्ट्रासाउंड सूट ३१५ मध्ये जा. आपले टोकन ANC-03 रांगेत आहे."
    },
    ordersPending: [
      {
        id: "ord-301",
        title: "Targeted Fetal Anomaly Ultrasound (Level-II Scan)",
        type: "Radiology / Ultrasound",
        department: "Fetal Medicine Suite 315",
        status: "Ready for Patient",
        code: "USG-OBS-L2",
        cost: "₹2,600",
        covered: true,
        urgency: "Routine Scheduled"
      },
      {
        id: "ord-302",
        title: "75g Oral Glucose Tolerance Test (OGTT)",
        type: "Diagnostic Lab",
        department: "Lab 320",
        status: "Solution Prepared",
        code: "LAB-OGTT-75",
        cost: "₹450",
        covered: true,
        urgency: "Timed Fasting"
      },
      {
        id: "ord-303",
        title: "Ferrous Ascorbate + Folic Acid + Calcium Vit D3 (60 Days)",
        type: "Pharmacy",
        department: "Maternal Pharmacy 3A",
        status: "Packed & Ready",
        code: "RX-MAT-SUPP",
        cost: "₹520",
        covered: true,
        urgency: "Take-Home"
      }
    ],
    insurance: {
      provider: "PM Matru Vandana Yojana / Star Maternity Health",
      policyNumber: "PMMVY-2026-99120",
      claimId: "CLM-ANC-8812-DEL",
      coverageTotal: "₹3,50,000",
      preAuthApproved: "₹8,200",
      copay: "₹0",
      status: "Pre-Authorized",
      stage: 3,
      timeline: [
        { title: "ANC Check-in Verified", time: "09:05 AM", done: true },
        { title: "Maternal Benefit Scheme Linked", time: "09:15 AM", done: true },
        { title: "Diagnostics Pre-Approved", time: "09:35 AM", done: true },
        { title: "Pharmacy Handover Confirmation", time: "Pending", done: false }
      ]
    },
    documents: [
      {
        id: "doc-301",
        name: "Antenatal 24-Week Clinical Visit Note",
        date: "24 Sep 2026, 09:32 AM",
        doctor: "Dr. Ananya Roy, MS (Obstetrics & Gynae)",
        category: "Consultation",
        fileType: "PDF",
        size: "1.6 MB",
        badge: "Verified"
      },
      {
        id: "doc-302",
        name: "Level-II Ultrasound Requisition & History",
        date: "24 Sep 2026, 09:35 AM",
        doctor: "Dr. Ananya Roy",
        category: "Imaging Orders",
        fileType: "PDF",
        size: "890 KB",
        badge: "Urgent"
      },
      {
        id: "doc-303",
        name: "National MCP Health Record Card",
        date: "Government of India / ABDM",
        doctor: "Maternal Registry",
        category: "Insurance & ID",
        fileType: "PDF",
        size: "1.1 MB",
        badge: "Digital ABHA"
      }
    ]
  }
];
