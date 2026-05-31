/**
 * Multi-Team Orchestration Engine -- Employee Service
 *
 * Reads .omp/multi-team.yaml, loads agent prompts, expertise, skills,
 * validates delegation chains, and produces task tool payloads.
 *
 * Usage:
 *   bun run .omp/orchestrate.ts list
 *   bun run .omp/orchestrate.ts show <agent>
 *   bun run .omp/orchestrate.ts delegate <agent> <task>
 *   bun run .omp/orchestrate.ts validate <from> <to>
 */

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { execSync } from "child_process";

const PI_DIR = resolve(import.meta.dir);
const ROOT = resolve(PI_DIR, "..");

// == Types ============================================================

interface AgentConfig {
  name: string;
  systemPrompt: string;
  model?: string;
  role: "orchestrator" | "lead" | "worker";
  team?: string;
}

interface TeamConfig {
  name: string;
  color: string;
  lead: AgentConfig;
  members: AgentConfig[];
}

interface DelegationPayload {
  agent: string;
  context: string;
  tasks: { id: string; assignment: string }[];
  chain: string;
}

// == YAML via yq ======================================================

function yq(query: string): unknown {
  const cmd = `yq '${query}' "${PI_DIR}/multi-team.yaml"`;
  const out = execSync(cmd, { encoding: "utf8" }).trim();
  if (out === "" || out === "null" || out === "~") return undefined;
  if (out.startsWith("{") || out.startsWith("[")) {
    try { return JSON.parse(out); } catch { return out; }
  }
  if (out.startsWith('"') && out.endsWith('"')) return out.slice(1, -1);
  if (/^-?\d+$/.test(out)) return parseInt(out, 10);
  if (/^-?\d+\.\d+$/.test(out)) return parseFloat(out);
  if (out === "true") return true;
  if (out === "false") return false;
  return out;
}

function yqStr(query: string): string | undefined {
  const v = yq(query);
  return typeof v === "string" ? v : undefined;
}

function yqStrs(query: string): string[] {
  const v = yq(query);
  return Array.isArray(v) ? v.map(String) : [];
}

// == Config loader ====================================================

function loadConfig() {
  const yamlPath = resolve(PI_DIR, "multi-team.yaml");
  if (!existsSync(yamlPath)) throw new Error("multi-team.yaml not found");

  const orch: AgentConfig = {
    name: yqStr(".orchestrator.name") || "Orchestrator",
    systemPrompt: yqStr(".orchestrator.system_prompt") || ".omp/agents/orchestrator.md",
    model: yqStr(".orchestrator.model"),
    role: "orchestrator",
  };

  const teamKeys = yqStrs(".teams | keys");
  const teams: Record<string, TeamConfig> = {};

  for (const key of teamKeys) {
    const esc = `["${key}"]`;
    const tName = yqStr(`.teams${esc}.name`) || key;
    const tColor = yqStr(`.teams${esc}.color`) || "gray";
    const llm = yqStr(`.teams${esc}.lead.model`);

    const lName = yqStr(`.teams${esc}.lead.name`) || `${key[0].toUpperCase() + key.slice(1)} Lead`;
    const lPrompt = yqStr(`.teams${esc}.lead.system_prompt`) || `.omp/agents/${key}-lead.md`;

    const mNames = yqStrs(`.teams${esc}.members | map(.name)`);
    const mPrompts = yqStrs(`.teams${esc}.members | map(.system_prompt)`);
    const mModels = yqStrs(`.teams${esc}.members | map(.model)`);

    const members: AgentConfig[] = [];
    for (let i = 0; i < mNames.length; i++) {
      members.push({
        name: mNames[i],
        systemPrompt: mPrompts[i] || "",
        model: mModels[i],
        role: "worker",
        team: key,
      });
    }

    teams[key] = {
      name: tName,
      color: tColor,
      lead: { name: lName, systemPrompt: lPrompt, model: llm, role: "lead", team: key },
      members,
    };
  }

  return { orchestrator: orch, teams };
}

// == Frontmatter parser ===============================================

function parseFrontmatter(relPath: string): { frontmatter: Record<string, unknown>; body: string } | null {
  const abspath = resolve(ROOT, relPath);
  if (!existsSync(abspath)) return null;
  const raw = readFileSync(abspath, "utf8");
  if (!raw.startsWith("---")) return { frontmatter: {}, body: raw };
  const end = raw.indexOf("---", 3);
  if (end === -1) return { frontmatter: {}, body: raw };
  const fm = raw.slice(3, end).trim();
  const body = raw.slice(end + 3).trim();
  const out: Record<string, unknown> = {};
  const lines = fm.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const m = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (!m) continue;
    const key = m[1];
    let val = m[2].trim();
    if (val === "") {
      // Multi-line value: collect indented lines
      const items: string[] = [];
      for (let j = i + 1; j < lines.length && lines[j].startsWith("  "); j++) {
        const item = lines[j].match(/^\s+[-]\s+(.+)$/);
        if (item) items.push(item[1].trim().replace(/^["']|["']$/g, ""));
        i = j; // skip consumed lines
      }
      if (items.length > 0) { out[key] = items; continue; }
      val = "true";
    }
    if (val === "true") out[key] = true;
    else if (val === "false") out[key] = false;
    else if (/^\d+$/.test(val)) out[key] = parseInt(val, 10);
    else if (val.startsWith("[")) {
      out[key] = val.slice(1, -1).split(",").map((s) => s.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
    } else if (val.startsWith('"') && val.endsWith('"')) {
      out[key] = val.slice(1, -1);
    } else {
      out[key] = val;
    }
  }
  return { frontmatter: out, body };
}

// == Agent context ====================================================

function loadAgentContext(agentName: string): { prompt: string; expertise: string; skills: string } | null {
  const cfg = loadConfig();
  let ac: AgentConfig | undefined;
  if (cfg.orchestrator.name === agentName) ac = cfg.orchestrator;
  if (!ac) {
    for (const [, t] of Object.entries(cfg.teams)) {
      if (t.lead.name === agentName) { ac = t.lead; break; }
      ac = t.members.find((m) => m.name === agentName);
      if (ac) break;
    }
  }
  if (!ac) return null;

  const parsed = parseFrontmatter(ac.systemPrompt);
  if (!parsed) return null;

  let expertise = "";
  const expPaths = (parsed.frontmatter.expertise as string[]) || [];
  for (const ep of expPaths) {
    const epPath = resolve(ROOT, ep);
    if (existsSync(epPath)) expertise += readFileSync(epPath, "utf8") + "\n\n";
  }

  let skills = "";
  const skillNames = (parsed.frontmatter.skills as string[]) || [];
  for (const sn of skillNames) {
    const skillPath = resolve(PI_DIR, "skills", `${sn}.md`);
    if (existsSync(skillPath)) {
      const sp = parseFrontmatter(`.omp/skills/${sn}.md`);
      if (sp) skills += sp.body + "\n\n";
    }
  }

  return { prompt: parsed.body, expertise: expertise.trim(), skills: skills.trim() };
}

// == Delegation payload ===============================================

function buildDelegationPayload(agentName: string, task: string): DelegationPayload | string {
  const cfg = loadConfig();
  const ctx = loadAgentContext(agentName);
  if (!ctx) return `Agent "${agentName}" not found. Available: ${listAll(cfg).join(", ")}`;

  const fullCtx = [
    `# System Prompt -- ${agentName}`,
    ctx.prompt,
    ctx.expertise ? `\n## Expertise\n${ctx.expertise}` : "",
    ctx.skills ? `\n## Skills\n${ctx.skills}` : "",
    `\n## Project Context`,
    `- Service: Employee Service (backend)`,
    `- Tech: Bun + Hono v4 + PostgreSQL + Drizzle ORM`,
    `- Structure: src/, src/db/schema/, src/db/migrations/`,
  ].filter(Boolean).join("\n\n");

  let chain = agentName === "Orchestrator" ? "User -> Orchestrator" : "";
  if (!chain) {
    for (const [, t] of Object.entries(cfg.teams)) {
      if (t.lead.name === agentName) chain = `Orchestrator -> ${agentName} -> Worker`;
      else if (t.members.some((m) => m.name === agentName)) chain = `Orchestrator -> ${t.lead.name} -> ${agentName}`;
    }
  }

  return {
    agent: agentName,
    context: fullCtx,
    tasks: [{ id: agentName.toLowerCase().replace(/\s+/g, "-"), assignment: task }],
    chain,
  };
}

function listAll(cfg: ReturnType<typeof loadConfig>): string[] {
  const a = [cfg.orchestrator.name];
  for (const [, t] of Object.entries(cfg.teams)) {
    a.push(t.lead.name);
    for (const m of t.members) a.push(m.name);
  }
  return a;
}

// == Validation =======================================================

function validateDelegation(from: string, to: string): { valid: boolean; message: string } {
  const cfg = loadConfig();
  const map: Record<string, { role: string; team?: string }> = {};
  map[cfg.orchestrator.name] = { role: "orchestrator" };
  for (const [, t] of Object.entries(cfg.teams)) {
    map[t.lead.name] = { role: "lead", team: t.name };
    for (const m of t.members) map[m.name] = { role: "worker", team: t.name };
  }

  const dst = map[to];
  if (!dst) return { valid: false, message: `Unknown agent: "${to}"` };

  if (from === "Orchestrator") {
    if (dst.role === "lead") return { valid: true, message: `OK: ${from} -> ${to}` };
    if (dst.role === "worker") {
      const lead = Object.values(cfg.teams).find((t) => t.members.some((m) => m.name === to))?.lead.name;
      return { valid: false, message: `BLOCKED: Orchestrator -> ${to}. Use -> ${lead} instead.` };
    }
  }

  const src = map[from];
  if (!src) return { valid: false, message: `Unknown source: "${from}"` };
  if (src.role === "lead" && dst.role === "worker") {
    if (src.team === dst.team) return { valid: true, message: `OK: ${from} -> ${to} (within-team)` };
    return { valid: false, message: `BLOCKED: ${from} -> ${to}. Cross-team not allowed.` };
  }

  return { valid: false, message: `BLOCKED: ${from} -> ${to}. Valid: Orchestrator -> Lead -> Worker.` };
}

// == Classifier =======================================================

type TaskClass = "simple" | "medium" | "complex";

interface Classification {
  taskClass: TaskClass;
  reason: string;
  suggestedRoute: string;
  suggestedLead: string;
  suggestedAgents: string[];
}

const COMPLEXITY_KEYWORDS: Record<string, { weight: number; team: string }> = {
  // Architecture & planning keywords → Planning
  "architecture": { weight: 8, team: "planning" },
  "migration": { weight: 6, team: "planning" },
  "schema": { weight: 5, team: "engineering" },
  "redesign": { weight: 8, team: "planning" },
  "strategy": { weight: 7, team: "planning" },
  "design doc": { weight: 7, team: "planning" },
  "trade-off": { weight: 6, team: "planning" },
  "design": { weight: 5, team: "planning" },
  "plan": { weight: 5, team: "planning" },
  "proposal": { weight: 4, team: "planning" },
  "research": { weight: 5, team: "planning" },

  // Engineering keywords → Engineering
  "endpoint": { weight: 3, team: "engineering" },
  "api": { weight: 4, team: "engineering" },
  "route": { weight: 3, team: "engineering" },
  "query": { weight: 3, team: "engineering" },
  "service": { weight: 3, team: "engineering" },
  "controller": { weight: 3, team: "engineering" },
  "schema": { weight: 4, team: "engineering" },
  "type": { weight: 2, team: "engineering" },
  "function": { weight: 2, team: "engineering" },
  "implement": { weight: 3, team: "engineering" },
  "drizzle": { weight: 3, team: "engineering" },
  "sql": { weight: 3, team: "engineering" },
  "hono": { weight: 3, team: "engineering" },
  "database": { weight: 4, team: "engineering" },
  "table": { weight: 3, team: "engineering" },
  "model": { weight: 3, team: "engineering" },
  "validation": { weight: 3, team: "engineering" },
  "handler": { weight: 2, team: "engineering" },
  "middleware": { weight: 3, team: "engineering" },

  // Validation keywords → Validation
  "test": { weight: 4, team: "validation" },
  "bug": { weight: 6, team: "validation" },
  "security": { weight: 7, team: "validation" },
  "vulnerability": { weight: 7, team: "validation" },
  "qa": { weight: 5, team: "validation" },
  "quality": { weight: 4, team: "validation" },
  "coverage": { weight: 3, team: "validation" },
  "audit": { weight: 5, team: "validation" },
  "pii": { weight: 6, team: "validation" },
  "auth": { weight: 4, team: "validation" },
  "error": { weight: 3, team: "validation" },

  // Scope indicators
  "simple": { weight: -2, team: "engineering" },
  "quick": { weight: -2, team: "engineering" },
  "small": { weight: -2, team: "engineering" },
  "minor": { weight: -3, team: "engineering" },
  "complex": { weight: 5, team: "planning" },
  "large": { weight: 6, team: "planning" },
  "multi-step": { weight: 6, team: "planning" },
};

function classifyTask(task: string): Classification {
  const lower = task.toLowerCase();
  let planningScore = 0;
  let engineeringScore = 0;
  let validationScore = 0;

  for (const [keyword, cfg] of Object.entries(COMPLEXITY_KEYWORDS)) {
    if (lower.includes(keyword)) {
      switch (cfg.team) {
        case "planning": planningScore += cfg.weight; break;
        case "engineering": engineeringScore += cfg.weight; break;
        case "validation": validationScore += cfg.weight; break;
      }
    }
  }

  // Word count heuristic: longer tasks are more complex
  const wordCount = lower.split(/\s+/).length;
  if (wordCount > 30) planningScore += 3;
  if (wordCount < 8) engineeringScore += 1;

  // Determine class
  const totalScore = planningScore + engineeringScore + validationScore;
  const taskClass: TaskClass = totalScore > 12 ? "complex" : totalScore > 6 ? "medium" : "simple";

  // Determine route
  let suggestedRoute: string;
  let suggestedLead: string;
  const suggestedAgents: string[] = [];

  if (validationScore >= planningScore && validationScore >= engineeringScore && validationScore > 0) {
    suggestedRoute = "QA Lead";
    suggestedLead = "QA Lead";
    suggestedAgents.push("QA Engineer");
    if (planningScore > 0) { suggestedAgents.unshift("Strategist"); suggestedRoute = "Planning + QA"; }
  } else if (planningScore >= engineeringScore && planningScore > 0) {
    suggestedRoute = "Planning Lead";
    suggestedLead = "Planning Lead";
    suggestedAgents.push("Strategist");
    if (engineeringScore > 0) { suggestedAgents.push("Backend Developer"); suggestedRoute = "Planning + Engineering"; }
    if (validationScore > 0) { suggestedAgents.push("QA Engineer"); suggestedRoute = "Planning + Engineering + QA"; }
  } else {
    suggestedRoute = "Engineering Lead";
    suggestedLead = "Engineering Lead";
    suggestedAgents.push("Backend Developer");
    if (validationScore > 0) { suggestedAgents.push("QA Engineer"); suggestedRoute = "Engineering + QA"; }
  }

  return {
    taskClass,
    reason: [
      `planning=${planningScore}`,
      `engineering=${engineeringScore}`,
      `validation=${validationScore}`,
      `total=${totalScore}`,
      `${wordCount} words`,
    ].join(", "),
    suggestedRoute,
    suggestedLead,
    suggestedAgents: [...new Set(suggestedAgents)],
  };
}

// == CLI ==============================================================

function help() {
  console.log(`
Multi-Team Orchestration Engine
--------------------------------
Commands:
  list                          List teams and agents
  show <agent>                  Show agent full context
  delegate <agent> <task>       Build delegation payload
  validate <from> <to>          Check delegation chain
  classify <task>               Classify task complexity and route
`);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) { help(); return; }

  switch (args[0]) {
    case "list": {
      const c = loadConfig();
      console.log(`\nAgent Tree`);
      console.log(`-`.repeat(20));
      console.log(`${c.orchestrator.name} (${c.orchestrator.model || "-"})`);
      for (const [, t] of Object.entries(c.teams)) {
        console.log(`\n  ${t.name} [${t.color}]`);
        console.log(`    ${t.lead.name} (lead) -- ${t.lead.model || "-"}`);
        for (const m of t.members) console.log(`      ${m.name} -- ${m.model || "-"}`);
      }
      console.log();
      break;
    }

    case "show": {
      if (!args[1]) { console.log("Usage: show <agent>"); return; }
      const ctx = loadAgentContext(args[1]);
      if (!ctx) { console.log(`Not found: "${args[1]}"`); return; }
      console.log(`\n=== ${args[1]} -- Full Context ===\n`);
      console.log("-- Prompt --\n" + ctx.prompt);
      if (ctx.expertise) console.log("\n-- Expertise --\n" + ctx.expertise);
      if (ctx.skills) console.log("\n-- Skills --\n" + ctx.skills);
      break;
    }

    case "delegate": {
      if (!args[1] || !args[2]) { console.log("Usage: delegate <agent> <task>"); return; }
      const task = args.slice(2).join(" ");
      const p = buildDelegationPayload(args[1], task);
      if (typeof p === "string") { console.log(p); return; }
      console.log(`\n=== Delegation Payload ===`);
      console.log(`Chain: ${p.chain}\n`);
      console.log("-- context --\n" + p.context);
      console.log("\n-- task --");
      console.log(JSON.stringify({ id: p.tasks[0].id, assignment: p.tasks[0].assignment }, null, 2));
      break;
    }

    case "validate": {
      if (!args[1] || !args[2]) { console.log("Usage: validate <from> <to>"); return; }
      console.log(validateDelegation(args[1], args[2]).message);
      break;
    }

    case "classify": {
      if (!args[1]) { console.log("Usage: classify <task-description>"); return; }
      const task = args.slice(1).join(" ");
      const result = classifyTask(task);
      console.log(`\n=== Task Classification ===`);
      console.log(`Class: ${result.taskClass.toUpperCase()}`);
      console.log(`Route: ${result.suggestedRoute}`);
      console.log(`Lead:  ${result.suggestedLead}`);
      console.log(`Team:  ${result.suggestedAgents.join(", ")}`);
      console.log(`Score: ${result.reason}`);
      break;
    }

    default: help();
  }
}

main().catch(console.error);