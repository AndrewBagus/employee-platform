# Memory

> **Read [.commandcode/memory.md](./.commandcode/memory.md) first** — it contains the full architecture, schema details, patterns, and workflows for this project.
> **Update [.commandcode/memory.md](./.commandcode/memory.md)** as the codebase grows or whenever discover something worth documenting.
> **Use MCP Context7** to fetch latest documentation for Drizzle ORM, Hono, Bun, and PostgreSQL when working with unfamiliar APIs or resolving issues.

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

This project uses a multi-agent setup where different AI models handle planning, implementation, and review. Configuration is in `.commandcode/settings.local.json`.

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

### Code Reviewer (`code-reviewer`)
- **Model**: DeepSeek V4 Flash
- **Activates**: When reviewing implemented code against the plan (`/review` or manual)
- **Handles**: Code review against plan, pattern enforcement, migration verification, style checks
- **Config**: `.commandcode/agents/code-reviewer/AGENT.md`
- Flags deviations, bugs, style violations, and pattern breaks with location/problem/fix format

### Workflow

1. Developer enters plan mode → senior engineer creates plan
2. Plan gets reviewed and approved
3. Junior engineer implements the plan

Both agents share the same project context from `.commandcode/memory.md`.

<!-- ### Manual Model Switching -->

<!-- - `Alt+P` for quick model switch -->
<!-- - `/agents` to browse and select agents -->
<!-- - `/model` to switch models directly -->

**How to tell which agent is active:** There's no direct agent indicator — the current mode tells you: plan mode means `senior-engineer`, auto-accept/default mode means `junior-engineer`. Check the mode label displayed in the UI.

## Plan Mode

- If something goes sideways, STOP and re-plan immediately. Don't keep pushing.
- Use plan mode for verification steps, not just building.
- Always ask questions to get more clarity.
- Write detailed specs upfront to reduce ambiguity.
- Always break down tasks with their dependencies.
- Always create plan task files in `./<worktree-directory>/.commandcode/tasks/<context>/<running-number>.<task-title>.md`

## Git Workflow

- When creating a git worktree, always branch from `develop` (or `dev`)
- Always create git worktrees inside `./.commandcode/worktree/<worktree-name>`
- When a git worktree is created, always create a new branch with the same name as `<worktree-name>`
- Don't commit anything before being instructed to
- Always verify new/updated files exist inside the current git worktree directory before making changes

## Working Guidelines

- Always use plan mode when the prompt includes "create plan" or involves multiple steps.
