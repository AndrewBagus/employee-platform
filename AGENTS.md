# Memory

> **Read [.commandcode/memory.md](./.commandcode/memory.md) first** — it contains the full architecture, schema details, patterns, and workflows for this project.

## Project Overview
See @README.md for project overview and @package.json for available bun/bunx commands for this project.

## Code Style Guidelines
- Use descriptive variable names
- Follow existing patterns in the codebase
- Extract complex conditions into meaningful boolean variables

## Architecture Notes
See [.commandcode/memory.md](./.commandcode/memory.md) for all architectural decisions and patterns.

## Common Workflows
See [.commandcode/memory.md](./.commandcode/memory.md) for documented workflows and commands.

## Agent System

This project uses a dual-agent setup where different AI models handle planning vs. implementation phases. Configuration is in `.commandcode/settings.local.json`.

### Senior Engineer (`senior-engineer`)
- **Model**: DeepSeek V4 Pro
- **Activates**: Automatically in plan mode (`Shift+Tab` or `/plan`)
- **Handles**: Architecture reviews, schema design, route planning, database decisions, migration planning
- **Config**: `.commandcode/agents/senior-engineer/AGENT.md`
- Has full knowledge of the project schema, patterns (UUIDv7, soft-delete, audit columns), and tech stack

### Junior Engineer (`junior-engineer`)
- **Model**: Kimi K2.6
- **Activates**: Automatically during implementation (after plan approval)
- **Handles**: Writing code, creating schema files, generating migrations, adding routes, testing
- **Config**: `.commandcode/agents/junior-engineer/AGENT.md`
- Follows the plan exactly as designed by the senior engineer — no deviation

### Workflow
1. Developer enters plan mode → senior engineer creates plan
2. Plan gets reviewed and approved
3. Junior engineer implements the plan

Both agents share the same project context from `.commandcode/memory.md`.

### Manual Model Switching
- `Alt+P` for quick model switch
- `/agents` to browse and select agents
- `/model` to switch models directly

## Working Guidelines
- Always use plan mode when the prompt includes "create plan" or involves multiple steps.
