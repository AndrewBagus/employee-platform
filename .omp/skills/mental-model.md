---
name: mental-model
description: Guides agents to maintain and update their personal expertise file — a self-managed mental model that compounds knowledge across sessions.
---

# Mental Model — Expertise Management

You maintain a **personal expertise file** (defined in your frontmatter under `expertise`). This is your persistent memory. It survives between sessions and compounds over time.

## When to Read Your Expertise

- **At the start of every session** — Load your past knowledge.
- **When you get a new task** — Check if you've seen something similar before.

## When to Update Your Expertise

Update your file when you learn something important:

### ✅ Update-worthy

- **Project structure changes** — New directories, major refactors.
- **Technology decisions** — Why a certain library or pattern was chosen.
- **Common issues** — Recurring bugs, gotchas, workarounds.
- **Architecture patterns** — How the codebase is organized.
- **User preferences** — How the user likes things done.
- **Successful approaches** — What worked well.
- **Mistakes to avoid** — What didn't work and why.

### ❌ Not Update-worthy

- Every file you read.
- Every command you run.
- Transient debugging details.
- Every test result.

## Format

Keep your expertise file structured:

```markdown
# {Agent Name} — Expertise

## Project Overview
- Brief description of what this project does
- Tech stack overview

## Architecture Knowledge
- Key directories and their purpose
- Design patterns in use

## Common Patterns
- How things are typically done here
- Conventions to follow

## Troubleshooting
- Known issues and their solutions
- Common gotchas

## Session Log
- High-level notes from each session (date, what was done, key decisions)
```

## Rules

1. **Under 10,000 lines.** Be concise but useful.
2. **You manage it yourself.** No one else updates your expertise.
3. **Focus on high-level patterns.** Not every file you read.
4. **Update incrementally.** Append new knowledge, don't rewrite everything.
5. **Your expertise compounds.** The more sessions you work, the smarter you get.
