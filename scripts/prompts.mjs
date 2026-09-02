// prompts.mjs — prompt templates for the LLM content generator (ESM)

const SCHEMA = `
Return ONLY a valid JSON object (no markdown, no code fences) with this exact shape:
{
  "title": "English module title",
  "title_hi": "हिन्दी module शीर्षक",
  "concept": {
    "title": "concept title",
    "title_hi": "हिन्दी concept title",
    "simple": "one-line plain-language summary in simple English a class 6 student understands",
    "simple_hi": "एक-पंक्ति का आसान हिन्दी सारांश जो कक्षा 6 का बच्चा समझ सके",
    "points": ["point 1 (bilingual Hindi+English)", "point 2 (bilingual)"],
    "example": "bilingual worked example",
    "trick": "bilingual memory trick",
    "deep": "bilingual deep-dive paragraph for advanced context"
  },
  "questions": [
    {
      "q": "English question",
      "q_hi": "हिन्दी question",
      "o": ["opt A", "opt B", "opt C", "opt D"],
      "o_hi": ["विकल्प A", "विकल्प B", "विकल्प C", "विकल्प D"],
      "a": 0,
      "exp": "Why the correct answer is right (English)",
      "exp_hi": "सही उत्तर क्यों सही है (हिन्दी)",
      "why": ["why option B is wrong (Hindi)", "why option C is wrong (Hindi)", "why option D is wrong (Hindi)"],
      "topic": "short topic label",
      "level": 1,
      "mode": "standard",
      "steps": ["step 1 reasoning", "step 2 reasoning"]  // ONLY for deepseek mode
    }
  ]
}
Rules:
- "a" is the 0-based index of the single correct option.
- "why" must contain EXACTLY 3 entries explaining the 3 WRONG options, in the same order as the options excluding the correct one.
- "o" and "o_hi" must each have exactly 4 distinct, non-identical entries.
- "level": 1 (foundation), 2 (intermediate) or 3 (advanced/application).
- "mode": "standard" for normal questions. Use "deepseek" ONLY for reasoning-type questions (analogy, assertion-reason, binary logic, coded inequalities, coding-decoding, classification, clocks/calendars) and then include a non-empty "steps" array (3-5 steps).
- "concept" is required: provide a plain-language "simple"/"simple_hi" one-line summary, 3-6 short "points", one worked "example", one "trick" and one "deep" paragraph (all bilingual Hindi+English).
- Every string MUST be bilingual: provide both the English field and the matching "_hi" field.
- Questions must be exam-standard for the UP Higher Primary Assistant Teacher (Class 6-8) 2026 exam, with ONE correct answer and 3 plausible distractors.
`;

export const PROMPTS = {
  system: `You are an expert, patient question-bank author for the Uttar Pradesh Higher Primary School Assistant Teacher (Classes 6-8) recruitment exam 2026. You teach the way a kind classroom teacher would: explain every idea in plain, simple language first, then give the exam-standard detail. Always write bilingually in Hindi + English.

Teaching rules:
- Write for a Class 6-8 student who reads Hindi as their first language. Start with the simplest possible explanation, then build up.
- The "simple" / "simple_hi" fields must be ONE short sentence a child can repeat back (e.g. "A noun is a naming word." / "संज्ञा नाम बताने वाला शब्द है।").
- "points" must be 3-6 short, self-contained facts — one idea each, no jargon without an explanation.
- "example" must be a fully worked, everyday example (for Math: show the calculation step by step; for History/GK: give names, dates and why they matter).
- "trick" must be a genuine memory aid (a mnemonic, a comparison, or a rhyme) — not a restatement of the topic.
- "deep" must add real exam value: a trap to avoid, a common misconception, or a comparison to a related topic.
- Facts (dates, names, formulas, articles) must be accurate; when unsure, prefer well-established textbook facts.

${SCHEMA}`,

  user: (subject, topic, branch, n) => {
    const branchLine = branch ? `\nLanguage branch: ${branch}.` : "";
    const guide = subjectGuide[subject] || "General exam content.";
    return `Generate ${n} exam-standard MCQs for the topic below. Explain the concept in simple, plain language first (as a patient teacher would), then write the questions.\n\nSubject: ${subject} — ${guide}${branchLine}\nTopic: ${topic}\n\nReturn the JSON object exactly as specified in the system instructions.`;
  },

  moreQuestions: (subject, topic, n) => {
    const guide = subjectGuide[subject] || "General exam content.";
    return `Generate ${n} NEW, additional practice MCQs for the topic below. Return ONLY a valid JSON object (no markdown) of shape {"questions":[...]} using the exact question schema from the system instructions — each question with q, q_hi, o (4 options), o_hi, a, exp, exp_hi, why (exactly 3 wrong-option explanations), topic, level and mode (steps[] only for deepseek-mode reasoning questions).\n\nRules:\n- Do NOT include any "concept" or "title" fields — questions only.\n- Cover DIFFERENT angles and sub-areas of the topic than typical questions would, so the set grows into a broad practice bank.\n- Same difficulty standard as before (UP Assistant Teacher Class 6-8 exam) and fully bilingual.\n\nSubject: ${subject} — ${guide}\nTopic: ${topic}`;
  },
};

const subjectGuide = {
  gk: "General Knowledge (current affairs, Indian history, geography, polity, economy, environment, general science).",
  reason: "Reasoning (analogy, classification, coding-decoding, coded inequalities, assertion-reason, binary logic, clocks & calendars). Use mode 'deepseek' with steps for these.",
  ss: "Social Studies (Indian & world history, geography, polity, economy, environment, Uttar Pradesh).",
  sms: "Mathematics and Science for classes 6-8 (numbers, algebra, geometry, arithmetic, statistics, probability, mensuration, trigonometry, biology, physics, chemistry). Explain every math step plainly.",
  "lang-hi": "Hindi language & literature (history, grammar, unseen prose/poetry, prominent authors and poets).",
  "lang-en": "English language & literature (history, grammar, unseen passage, prominent writers and poets).",
  "lang-sa": "Sanskrit language & literature (history, grammar, unseen prose/poetry, prominent authors and poets).",
};
