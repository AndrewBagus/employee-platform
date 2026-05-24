---
name: contextual-commit
description: >
  Stage and commit all tracked changes grouped by logical context (agent configs, docs,
  schema, routes, infra, deps, etc.). Reads git status, groups files by directory prefix
  and intent, then creates separate commits per group with Conventional Commits messages.
  Handles staged, unstaged, and untracked files.
trigger: /commit-context
---

# /commit-context — Commit All Changes Grouped by Context

Stage and commit every dirty file in the working tree, but separate by logical grouping instead of one giant commit.

## What it does

1. Reads `git status --short` and `git diff --name-status` (including untracked)
2. Groups files by directory prefix + file type into logical context buckets
3. For each group: stages, diffs, crafts an appropriate Conventional Commits message, commits
4. Skips groups already clean or gitignored

## Context grouping logic

Files are assigned to groups by matching directory prefix (first match wins, ordered below):

| Prefix pattern | Group label | Commit type |
|---|---|---|
| `.commandcode/agents/` | agents | `fix` (config cleanup) or `chore` |
| `.commandcode/taste/` | taste | `chore` |
| `.commandcode/skills/` | skills | `feat` (new skill) or `refactor` |
| `.commandcode/tasks/` | tasks | `docs` |
| `.commandcode/review-code/` | review | `docs` |
| `src/schema/` | schema | `feat` or `refactor` |
| `src/routes/` | routes | `feat` or `fix` |
| `src/services/` | services | `feat` or `refactor` |
| `src/controllers/` | controllers | `feat` or `refactor` |
| `src/repositories/` | repositories | `feat` or `refactor` |
| `src/middleware/` | middleware | `feat` or `fix` |
| `src/` (catch-all) | core | `feat` |
| `drizzle/` | migrations | `feat` or `refactor` |
| `.opencode/` | plugins | `chore` |
| `http/` | http | `docs` |
| `package.json` or `bun.lock` | deps | `build` |
| `tsconfig*.json` or `.gitignore` | config | `chore` |
| `Dockerfile` or `docker-compose*` | docker | `build` |
| `*.md` at root | docs | `docs` |
| `docker/` | docker | `build` |
| `scripts/` | scripts | `chore` |
| `tests/` or `__tests__/` or `*.test.*` | tests | `test` |
| Generated dirs (`graphify-out/`, `dist/`, `build/`, `node_modules/`) | skip | — |

Files that don't match any prefix get their own `misc` group.

## Commit message format

```
<type>(<scope>): <imperative summary, ≤50 chars>

<body if why isn't obvious — wrap at 72 chars>

Co-authored-by: CommandCodeBot <noreply@commandcode.ai>
```

- `<type>` from the table above, overridable
- `<scope>` is the group label (short, lowercase)
- Imperative mood: "add", "fix", "remove", "refactor", "extract" — not "added", "adds"
- Body only for non-obvious *why*, breaking changes, migration notes
- Always append the `Co-authored-by` trailer
- Use heredoc: `git commit -F - <<'EOF'`

## Execution steps

### Step 1 — Show the plan

```
git status --short
```

Parse output and assign each file to a group. Print the grouping plan:

```
Contextual Commit Plan
══════════════════════
  1. 📦 agents (3 files)
       .commandcode/agents/senior-engineer/AGENT.md
       .commandcode/agents/junior-engineer/AGENT.md
       .commandcode/agents/code-reviewer/AGENT.md
  2. 📄 docs (1 file)
       AGENTS.md
  3. ⚙️  plugins (2 files)
       .opencode/opencode.json
       .opencode/plugins/graphify.js
```

Ask the user: "Proceed with this plan? [Y/n]"

If user says no, ask which groups to include/exclude (interactive refine).

### Step 2 — Commit each group

For each group (in order shown above):

```bash
# Stage the group
git add <file1> <file2> ...

# Show diff for message crafting
git diff --cached --stat

# Determine if it's add/modify/delete to pick type
# Use git diff --cached --name-status to see operation type

# Commit with heredoc
git commit -F - <<'EOF'
<type>(<scope>): <summary>

<body if needed>

Co-authored-by: CommandCodeBot <noreply@commandcode.ai>
EOF
```

**Type heuristics per operation:**
- All additions → `feat`
- All deletions → `chore` (remove) or `refactor` (delete + other changes)
- Mix of changes → `fix`, `refactor`, or `chore` based on what dominates
- Pure config/tooling → `chore`
- Documentation → `docs`

**Body heuristics:**
- One file, obvious change → no body
- Multiple files → list what changed as bullet points
- Breaking change → include `BREAKING CHANGE:` footer

### Step 3 — Verify

After all groups committed, run:

```
git log --oneline -<N>
git status --short
```

Print final summary:

```
All changes committed across <N> groups.
Working tree clean.
```

## Edge cases

- **No changes**: Print "Working tree clean. Nothing to commit." and exit.
- **Untracked generated dirs** (`graphify-out/`, `dist/`): Suggest adding to `.gitignore` instead of committing. Ask user before proceeding.
- **Mixed staged/unstaged**: Stage everything together per group (don't preserve partial staging — user can `git commit` individual files if they want granularity before running this).
- **Single group**: Still run the full flow (one commit). Print "Only one group detected — single commit."
- **Group with 0 files**: Skip silently.

## Examples

```
/commit-context
```

Plan output:
```
Contextual Commit Plan
══════════════════════
  1. 📦 agents (2 files)
       .commandcode/agents/senior-engineer/AGENT.md
       .commandcode/agents/code-reviewer/AGENT.md
  2. ⚙️  config (1 file)
       .gitignore

Proceed? [Y/n]
```
