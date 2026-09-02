// validate.mjs — schema validator for exam-tutor modules/questions (ESM)

export function validateQuestion(q, ctx = "") {
  const err = [];
  if (!q || typeof q !== "object") return ["question is not an object: " + ctx];
  if (typeof q.q !== "string" || !q.q.trim()) err.push(ctx + "missing q");
  if (typeof q.q_hi !== "string" || !q.q_hi.trim()) err.push(ctx + "missing q_hi");
  if (!Array.isArray(q.o) || q.o.length !== 4) err.push(ctx + "options (o) must be exactly 4");
  if (!Array.isArray(q.o_hi) || q.o_hi.length !== (q.o ? q.o.length : 0)) err.push(ctx + "o_hi length must match o");
  if (typeof q.a !== "number" || q.a < 0 || q.a > 3) err.push(ctx + "answer index (a) must be 0..3");
  if (q.o && new Set(q.o).size !== 4) err.push(ctx + "duplicate options");
  if (typeof q.exp !== "string" || !q.exp.trim()) err.push(ctx + "missing exp");
  if (typeof q.exp_hi !== "string" || !q.exp_hi.trim()) err.push(ctx + "missing exp_hi");
  if (!Array.isArray(q.why) || q.why.length !== 3) err.push(ctx + "why must have exactly 3 entries");
  if (typeof q.topic !== "string" || !q.topic.trim()) err.push(ctx + "missing topic");
  if (q.mode === "deepseek" && (!Array.isArray(q.steps) || !q.steps.length)) err.push(ctx + "deepseek question needs steps[]");
  return err;
}

export function validateModule(m, ctx = "") {
  const err = [];
  if (!m || typeof m !== "object") return ["module is not an object: " + ctx];
  if (typeof m.id !== "string" || !m.id.trim()) err.push(ctx + "missing id");
  if (typeof m.subject !== "string" || !m.subject.trim()) err.push(ctx + "missing subject");
  if (typeof m.title !== "string" || !m.title.trim()) err.push(ctx + "missing title");
  if (typeof m.hi !== "string" || !m.hi.trim()) err.push(ctx + "missing hi");
  if (!Array.isArray(m.questions) || !m.questions.length) err.push(ctx + "questions must be a non-empty array");
  (m.questions || []).forEach((q, i) => err.push(...validateQuestion(q, ctx + " q" + i + ": ")));
  return err;
}

// Stable content hash for dedupe (question text + hindi question text).
export function qHash(q) {
  return (q.q + "||" + q.q_hi).trim().toLowerCase();
}
