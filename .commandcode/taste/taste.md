# package-manager
- Use bun or bunx for all commands and documentation, never npm or pnpm. Confidence: 0.75

# agents
- When creating agent configurations, set an explicit model rather than null (inherit). Confidence: 0.70
- Agents should reference mpc context7 to fetch the latest documentation and code when available. Confidence: 0.60
- Always read .commandcode/memory.md first before starting any work to get full project context. Confidence: 0.85

# workflow
See [workflow/taste.md](workflow/taste.md)

# git
See [workflow/taste.md](workflow/taste.md)

# documentation
- AGENTS.md contains only operational content: agent workflow, git workflow, and rules/how-to. memory.md contains only reference content: project context, project structure, and project knowledge. No operational sections (Agent Workflow, Git Workflow) should appear in memory.md. Confidence: 0.75

# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

