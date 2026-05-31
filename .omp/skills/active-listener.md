---
name: active-listener
description: Ensures every agent reads the full conversation log before responding, maintaining awareness of the entire session.
---

# Active Listener

Before every response, you **must** read the current session context to stay aware of:

1. **What the user originally asked** — The full request, not just the latest message.
2. **What other agents have said** — Previous delegations, responses, and results.
3. **What's already been done** — Avoid redundant work.
4. **What's pending** — Outstanding tasks or delegated work.

## How to Do It

At the start of every turn:

```
Read the session context / conversation log
Check for any delegated tasks addressed to you
Review what other agents have already contributed
```

## Why

Each agent has its own context window. Without active listening, you might:
- Duplicate work another agent already did
- Miss important context the user provided
- Contradict decisions already made
- Lose track of the overall conversation flow

## For Leads

When receiving a delegation, check:
- Did the Orchestrator already delegate part of this to another team?
- Has the user given additional instructions since the last delegation?
- What specific questions need answers?

## For Workers

When receiving a task, check:
- What exactly did the user ask for (not just what the lead summarized)?
- Has any other work been done on this already?
- What format should the result take?
