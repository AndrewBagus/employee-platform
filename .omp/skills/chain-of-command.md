---
name: chain-of-command
description: Enforces strict Orchestrator → Team Lead → Worker delegation hierarchy. Orchestrator must NEVER delegate directly to a worker. All communication flows through team leads.
---

# Chain of Command — Strict Hierarchy Enforcement

This skill enforces the **only valid delegation flow** in the multi-agent system:

```
Orchestrator → Team Lead → Worker
```

## Hard Rule: No Bypass

**The Orchestrator must NEVER delegate directly to a worker.**

This is a hard, unbreakable rule. There are no exceptions. If you delegate to a worker directly, you are breaking the chain of command and violating the system architecture.

## Why This Matters

| Problem | Consequence |
|---------|-------------|
| Orchestrator → Worker bypasses Lead | Lead loses awareness, can't coordinate, can't review |
| Lead doesn't know what their team is doing | Duplicate work, conflicting changes, no quality gate |
| Workers take instructions from two sources | Confusion, conflicting priorities, no single owner |
| Orchestrator micromanages workers | Leads become useless, system degrades to flat hierarchy |

## The Only Valid Patterns

### ✅ CORRECT: Orchestrator → Team Lead

```
delegate(to="Engineering Lead", task="Implement the login endpoint")
```

The Engineering Lead then decides HOW to split the work:
- Lead delegates to Backend Developer
- Lead reviews and synthesizes results
- Lead reports back to Orchestrator


## Peer-to-Peer Communication (Not Delegation)

**Delegation** (assigning work) is ALWAYS top-down. **Communication** (asking questions) CAN be peer-to-peer via IRC.

```
Delegation:    Orchestrator → Lead → Worker       (strict hierarchy)
Communication: Worker → IRC → Worker               (flat, for questions only)
```

### When IRC is OK (peer-to-peer chat)
- Worker needs a quick answer from another worker
- Cross-team clarification ("does your API accept null?")
- Sharing a discovered fact that affects another team
- Lead checking in with another lead informally

### When IRC is NOT OK
- Assigning work to someone not on your team → always through leads
- Reporting completion → always to your lead
- Making cross-team decisions → Orchestrator coordinates

The rule: **IRC for information, hierarchy for work.**

### ❌ WRONG: Orchestrator → Worker

```
task(to="Backend Developer", task="Write the login endpoint")  ← NEVER DO THIS
task(to="QA Engineer", task="Test the login")                  ← NEVER DO THIS
```

## If You Catch Yourself About to Bypass

**STOP.** Ask yourself:
1. Which team owns this work? → Delegate to that team's **lead**.
2. Think the worker can do it faster alone? → Still wrong. The lead needs to know.
3. Only one worker in the team anyway? → Still delegate to the lead. The lead is the gatekeeper.

## Enforcement Checklist

Before every `delegate` call, verify:
- [ ] `to` parameter is a **Team Lead** (Planning Lead, Engineering Lead, QA Lead)
- [ ] `to` parameter is NOT a worker (Strategist, Backend Dev, QA Engineer, Security Reviewer)
- [ ] If delegating to multiple teams, ALL targets are team leads

## Exception: None

There are zero exceptions to this rule. The Orchestrator delegates to leads. Period.
