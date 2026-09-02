// topics.mjs — full UP Assistant Teacher (Class 6–8) 2026 syllabus topic manifest
//
// Every syllabus topic is listed once as {subject, topic, topic_hi, day, covered}.
//   covered:true  → hand-authored module already exists in exam-tutor.html
//   covered:false → still to be produced by scripts/generate.mjs --manifest
//
// `day` ties a topic to its 90-day roadmap slot (days 27–62 are LLM-generated).
// Supplementary topics (deeper GK/GS/History notes, Current Affairs) use day:0 so
// they land in the subject pool without locking to a specific roadmap day.

const T = (subject, topic, topic_hi, day, covered, extra = {}) => ({ subject, topic, topic_hi, day, covered, ...extra });

export const TOPICS = [
  /* ---------- Days 1–10 · Reasoning + GK (hand-authored) ---------- */
  T("reason", "Analogy", "सादृश्यता", 1, true),
  T("reason", "Classification", "वर्गीकरण", 1, true),
  T("reason", "Coding-Decoding", "कोडिंग-डिकोडिंग", 2, true),
  T("reason", "Coded Inequalities", "कोड असमानताएँ", 2, true),
  T("reason", "Assertion & Reason", "कथन और कारण", 3, true),
  T("reason", "Binary Logic", "बाइनरी लॉजिक", 3, true),
  T("reason", "Clocks & Calendars", "घड़ियाँ व कैलेंडर", 4, true),
  T("gk", "Indian History & National Movement", "भारतीय इतिहास व राष्ट्रीय आन्दोलन", 5, true),
  T("gk", "Indian Geography", "भारत का भूगोल", 6, true),
  T("gk", "Polity & Governance", "राजनीति व शासन", 7, true),
  T("gk", "Economy & Social Development", "अर्थव्यवस्था व सामाजिक विकास", 8, true),
  T("gk", "Environment, Ecology & Climate", "पर्यावरण, पारिस्थितिकी व जलवायु", 9, true),
  T("gk", "General Science & Current Affairs", "सामान्य विज्ञान व समसामयिक", 10, true),

  /* ---------- Days 11–26 · Social Studies (hand-authored) ---------- */
  T("ss", "Sources & Ancient Cultures", "इतिहास के स्रोत व प्राचीन संस्कृतियाँ", 11, true),
  T("ss", "Early States & Mauryan Empire", "प्रारम्भिक राज्य व मौर्य साम्राज्य", 12, true),
  T("ss", "Post-Mauryan to Rajputs", "मौर्योत्तर से राजपूत काल", 13, true),
  T("ss", "Islam Arrival & Delhi Sultanate", "इस्लाम का आगमन व दिल्ली सल्तनत", 14, true),
  T("ss", "Mughal Empire", "मुगल साम्राज्य", 15, true),
  T("ss", "British Rule & Company Expansion", "अंग्रेज़ी राज्य व कम्पनी विस्तार", 16, true),
  T("ss", "Nationalism & Freedom Movement", "राष्ट्रवाद व स्वाधीनता आन्दोलन", 17, true),
  T("ss", "Independent India & Society", "स्वतंत्र भारत व समाज", 18, true),
  T("ss", "Constitution & Governance", "संविधान व शासन व्यवस्था", 19, true),
  T("ss", "Security, Policy & Civic Safety", "सुरक्षा, नीति व नागरिक सुरक्षा", 20, true),
  T("ss", "Earth & Landforms", "पृथ्वी व स्थलरूप", 21, true),
  T("ss", "India — Physical & Economic", "भारत — भौतिक व आर्थिक", 22, true),
  T("ss", "Uttar Pradesh", "उत्तर प्रदेश", 23, true),
  T("ss", "Atmosphere, Hydrosphere & Industry", "वायुमण्डल, जलमण्डल व उद्योग", 24, true),
  T("ss", "Indian Economy & Challenges", "भारतीय अर्थव्यवस्था व चुनौतियाँ", 25, true),
  T("ss", "Environment & Resources", "पर्यावरण व संसाधन", 26, true),

  /* ---------- Days 27–44 · Science & Math (LLM-generated) ---------- */
  T("sms", "Number Systems (Natural/Whole/Rational/Integers) & LCM-HCF", "संख्या पद्धति (प्राकृतिक/पूर्ण/परिमेय/पूर्णांक) व LCM-HCF", 27, false),
  T("sms", "Square Root, Cube Root & Identities", "वर्गमूल, घनमूल व सर्वसमिकाएँ", 28, false),
  T("sms", "Algebra — Variables, Expressions & Polynomials", "बीजगणित — चर, व्यंजक व बहुपद", 29, false),
  T("sms", "Linear, Quadratic & Simultaneous Equations", "रेखीय, वर्ग व युगपत समीकरण", 30, false),
  T("sms", "Geometry — Parallel Lines, Triangles, Quadrilaterals", "ज्यामिति — समान्तर रेखाएँ, त्रिभुज, चतुर्भुज", 31, false),
  T("sms", "Circles, Cyclic Quadrilaterals & Tangents", "वृत्त, चक्रीय चतुर्भुज व स्पर्श रेखाएँ", 32, false),
  T("sms", "Ratio, Proportion, Percentage, Profit-Loss", "अनुपात, समानुपात, प्रतिशत, लाभ-हानि", 33, false),
  T("sms", "Simple & Compound Interest", "साधारण व चक्रवृद्धि ब्याज", 34, false),
  T("sms", "Statistics — Mean, Median, Mode & Charts", "सांख्यिकी — माध्य, माध्यिका, बहुलक व चार्ट", 35, false),
  T("sms", "Probability & Graphs", "प्रायिकता व ग्राफ़", 36, false),
  T("sms", "Cartesian Plane & Mensuration", "कार्तीय तल व क्षेत्रमिति", 37, false),
  T("sms", "Exponents/Powers & Trigonometry", "घातांक व त्रिकोणमिति", 38, false),
  T("sms", "Science: Daily-life Science, Inventions & Technology", "विज्ञान: दैनिक जीवन, आविष्कार व प्रौद्योगिकी", 39, false),
  T("sms", "Science: Living World — Classification & Adaptation", "विज्ञान: जीव जगत — वर्गीकरण व अनुकूलन", 40, false),
  T("sms", "Science: Cell to Organ Systems; Microorganisms; Health & Disease", "विज्ञान: कोशिका से अंगतंत्र; सूक्ष्मजीव; स्वास्थ्य व रोग", 41, false),
  T("sms", "Science: Nutrition, Reproduction, Respiration & Excretion", "विज्ञान: पोषण, जनन, श्वसन व उत्सर्जन", 42, false),
  T("sms", "Science: Measurement, Electricity, Magnetism, Motion & Force", "विज्ञान: मापन, विद्युत, चुम्बकत्व, गति व बल", 43, false),
  T("sms", "Science: Energy, Sound, Light, Matter, Acids-Bases, Periodic Table & Blood", "विज्ञान: ऊर्जा, ध्वनि, प्रकाश, पदार्थ, अम्ल-क्षार, आवर्त सारिणी व रक्त", 44, false),

  /* ---------- Days 45–62 · Language (LLM-generated) ---------- */
  T("lang-hi", "Hindi — History, Grammar, Unseen, Authors & Poets", "हिन्दी — इतिहास, व्याकरण, अपठित, लेखक-कवि", 45, false),
  T("lang-hi", "Hindi — Grammar Practice", "हिन्दी — व्याकरण अभ्यास", 46, false),
  T("lang-hi", "Hindi — Unseen Prose / Poetry", "हिन्दी — अपठित गद्यांश / पद्यांश", 47, false),
  T("lang-hi", "Hindi — Prominent Authors, Poets & Works", "हिन्दी — प्रमुख लेखक-कवि व रचनाएँ", 48, false),
  T("lang-hi", "Hindi — Revision + Practice", "हिन्दी — पुनरावृत्ति + अभ्यास", 49, false),
  T("lang-hi", "Hindi — Sectional Test", "हिन्दी — Sectional Test", 50, false),
  T("lang-en", "English — History of Literature & Language", "अंग्रेज़ी — साहित्य व भाषा का इतिहास", 51, false),
  T("lang-en", "English — Grammar", "अंग्रेज़ी — व्याकरण", 52, false),
  T("lang-en", "English — Unseen Passage", "अंग्रेज़ी — Unseen Passage", 53, false),
  T("lang-en", "English — Writers/Poets & Their Works", "अंग्रेज़ी — लेखक/कवि व उनकी कृतियाँ", 54, false),
  T("lang-en", "English — Revision + Practice", "अंग्रेज़ी — पुनरावृत्ति + अभ्यास", 55, false),
  T("lang-en", "English — Sectional Test", "अंग्रेज़ी — Sectional Test", 56, false),
  T("lang-sa", "Sanskrit — History of Language & Literature", "संस्कृत — भाषा व साहित्य का इतिहास", 57, false),
  T("lang-sa", "Sanskrit — Grammar", "संस्कृत — व्याकरण", 58, false),
  T("lang-sa", "Sanskrit — Unseen Prose / Poetry", "संस्कृत — अपठित गद्य / पद्य", 59, false),
  T("lang-sa", "Sanskrit — Prominent Poets, Writers & Works", "संस्कृत — प्रमुख कवि-लेखक व कृतियाँ", 60, false),
  T("lang-sa", "Sanskrit — Revision + Practice", "संस्कृत — पुनरावृत्ति + अभ्यास", 61, false),
  T("lang-sa", "Sanskrit — Sectional Test", "संस्कृत — Sectional Test", 62, false),

  /* ---------- Supplementary: deeper GK/GS/History notes (day 0 = subject pool) ---------- */
  T("gk", "Indian Constitution — Articles & Amendments", "भारतीय संविधान — अनुच्छेद व संशोधन", 0, false),
  T("gk", "World Geography & Continents", "विश्व भूगोल व महाद्वीप", 0, false),
  T("gk", "Indian Economy — Budget, RBI & Banking", "भारतीय अर्थव्यवस्था — बजट, RBI व बैंकिंग", 0, false),
  T("gk", "General Science — Physics, Chemistry, Biology", "सामान्य विज्ञान — भौतिक, रसायन, जीव विज्ञान", 0, false),
  T("gk", "Sports, Awards & Honours", "खेल, पुरस्कार व सम्मान", 0, false),
  T("gk", "Books & Authors", "पुस्तकें व लेखक", 0, false),
  T("gk", "Science & Technology — Space, Defence, IT", "विज्ञान व प्रौद्योगिकी — अंतरिक्ष, रक्षा, IT", 0, false),
  T("ss", "Ancient India — Indus Valley Civilisation", "प्राचीन भारत — सिंधु घाटी सभ्यता", 0, false),
  T("ss", "Medieval India — Bhakti & Sufi Movements", "मध्यकालीन भारत — भक्ति व सूफी आंदोलन", 0, false),
  T("ss", "Modern India — Governor-Generals & Viceroys", "आधुनिक भारत — गवर्नर-जनरल व वायसराय", 0, false),

  /* ---------- Time-sensitive ---------- */
  T("gk", "Current Affairs — National & International", "समसामयिक — राष्ट्रीय व अंतर्राष्ट्रीय", 0, false, { refresh: true }),
];
