#!/usr/bin/env node
// coverage.mjs — report which syllabus topics still have no generated module.
//
// Compares scripts/topics.mjs (the full syllabus manifest) against the modules
// that exist in content/generated/*.js. Hand-authored topics are marked
// covered:true in the manifest; everything else must be produced by the generator.
//
// Usage:
//   node scripts/coverage.mjs

import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { TOPICS } from "./topics.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.resolve(__dirname, "..", "content", "generated");
const SUBJECTS = ["gk", "reason", "ss", "sms", "lang-hi", "lang-en", "lang-sa"];

const DATA_START = "/*__DATA_START__*/";
const DATA_END = "/*__DATA_END__*/";

function readGenerated(subject) {
  const file = path.join(CONTENT_DIR, subject + ".js");
  if (!existsSync(file)) return [];
  const txt = readFileSync(file, "utf8");
  const s = txt.indexOf(DATA_START);
  const e = txt.indexOf(DATA_END);
  if (s === -1 || e === -1) return [];
  const raw = txt.slice(s + DATA_START.length, e).trim();
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}

const norm = (s) => String(s || "").toLowerCase().replace(/\s+/g, " ").trim();

function main() {
  const generated = [];
  for (const s of SUBJECTS) {
    generated.push(...readGenerated(s).map((m) => ({ ...m, subject: s })));
  }

  const bySubjectDay = new Set(generated.map((m) => m.subject + "|" + m.day));
  const titles = generated.map((m) => norm(m.title));
  const his = generated.map((m) => norm(m.hi));

  const gaps = [];
  for (const t of TOPICS) {
    if (t.covered) continue;
    const hasDay = t.day > 0 && bySubjectDay.has(t.subject + "|" + t.day);
    const hasTitle = titles.some((x) => x && (x.includes(norm(t.topic)) || norm(t.topic).includes(x)));
    const hasHi = his.some((x) => x && (x.includes(norm(t.topic_hi)) || norm(t.topic_hi).includes(x)));
    if (!(hasDay || hasTitle || hasHi)) gaps.push(t);
  }

  const covered = TOPICS.filter((t) => t.covered).length;
  const uncovered = TOPICS.length - covered;

  console.log(`Syllabus manifest: ${TOPICS.length} topics (${covered} hand-authored, ${uncovered} to generate).`);
  console.log(`Generated modules found: ${generated.length}.`);
  console.log(`Gaps (0 modules): ${gaps.length}`);
  for (const g of gaps) {
    console.log(`  - [${g.subject}] ${g.topic}${g.day ? ` (day ${g.day})` : ""}`);
  }
  if (gaps.length === 0) {
    console.log("✅ Every manifest topic is covered.");
  } else {
    console.log(`\nRun: node scripts/generate.mjs --manifest`);
  }
}

main();
