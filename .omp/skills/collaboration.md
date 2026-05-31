---
name: collaboration
description: Describes peer-to-peer agent communication patterns — when and how agents can talk directly without routing through the Orchestrator.
---

# Collaboration — Peer-to-Peer Agent Communication

The default chain of command is strict top-down: Orchestrator → Lead → Worker. However, agents may communicate **directly peer-to-peer** in specific scenarios to avoid unnecessary overhead.

## When to Use Direct IRC

| Scenario | Do This | Don't Do This |
|----------|---------|---------------|
| Quick clarification between workers | `irc(target: "QA Engineer", message: "does this endpoint handle null?")` | Route through Orchestrator for a yes/no question |
| Cross-team dependency question | `irc(target: "Backend Developer", message: "what's the shape of this DTO?")` | Wait for Planning Lead to relay |
| Status check mid-task | `irc(target: "Strategist", message: "found any migration issues?")` | Stop work and wait for formal report |
| Sharing a useful finding | `irc(target: "Engineering Lead", message: "schema has an index on employee_id")` | Hoard information |

## When NOT to Use Direct IRC (route through hierarchy)

- **Assigning work** — only leads delegate tasks
- **Reporting completion** — always report up to your lead
- **Cross-team decisions** — orchestration decisions go through Orchestrator
- **Conflict resolution** — escalating disagreements goes up the chain

## IRC Etiquette

- Use `irc` tool with `target` set to the agent's exact name from multi-team.yaml
- Keep messages concise — one question, one answer
- Always CC your lead on important technical decisions that affect scope
- If a conversation goes beyond 3 exchanges, summarize to your lead
- Never use IRC to bypass the domain-lock permissions system
