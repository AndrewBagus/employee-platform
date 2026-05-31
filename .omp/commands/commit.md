---
name: commit
description: Commit all changes grouped by logical context, separate commits per group.
---

Use the `commit-context` skill to commit all staged and unstaged changes.

1. Run `git status --short` to see all changes
2. Group them by logical context: schema, api, config, docs, agent, chore, etc.
3. For each group, create a separate commit using conventional commits format: `type(scope): message`
4. Do NOT commit anything that wasn't explicitly changed — verify each file before adding
5. If the user specified a scope or message, use that instead

Follow the commit-context skill rules:
- Never commit without instruction (but user invoked /commit, so proceed)
- Tightly coupled changes get one commit
- Each commit must be a coherent logical unit
