# Memory

> **Read [.commandcode/MEMORY.md](./.commandcode/MEMORY.md) first** — it contains the full architecture, schema details, patterns, and workflows for this project.
> **Update [.commandcode/MEMORY.md](./.commandcode/MEMORY.md)** as the codebase grows or whenever discover something worth documenting.
> **Use MCP Context7** to fetch latest documentation for Drizzle ORM, Hono, Bun, and PostgreSQL when working with unfamiliar APIs or resolving issues.

## Project Overview

See @README.md for project overview and @package.json for available bun/bunx commands for this project.

## Code Style Guidelines

- Use descriptive variable names
- Follow existing patterns in the codebase
- Extract complex conditions into meaningful boolean variables

## Architecture Notes

See [.commandcode/MEMORY.md](./.commandcode/MEMORY.md) for all architectural decisions and patterns.

## Common Workflows

See [.commandcode/MEMORY.md](./.commandcode/MEMORY.md) for documented workflows and commands.

## Graphify Workflow

Use Graphify before implementation, refactoring, or architectural decisions to inspect the existing codebase structure and patterns.

### Before Coding

Always use Graphify to:

- inspect related modules and dependencies
- inspect schema structure patterns
- inspect repository/service/controller patterns
- inspect foreign key declaration patterns
- inspect defaultColumn usage
- inspect index declaration patterns
- inspect pagination/filter/query conventions
- inspect naming conventions (singular/plural, DTOs, services, routes)
- identify reusable utilities before creating new abstractions
- identify affected modules before refactor

### Graphify Goals

Graphify should help to:

- reduce unnecessary context loading
- reuse existing project patterns
- avoid duplicate abstractions
- maintain architectural consistency
- understand module relationships before implementation
- minimize hallucinated implementations

### Implementation Rules

Before creating new patterns:

1. inspect existing implementation with Graphify
2. reuse existing conventions whenever possible
3. only introduce new abstractions if no suitable pattern exists
4. follow current architecture and naming consistency

### Refactor Rules

Before refactoring:

- inspect all related dependencies
- identify affected services/routes/schema
- inspect shared utilities usage
- verify downstream impact before modification

### Query Investigation

When implementing new queries:

- inspect similar existing queries first
- inspect pagination/filter patterns
- inspect response DTO patterns
- inspect repository query structure
- inspect indexing and relation patterns

### Notes

Graphify provides structural understanding of the codebase.

Use:

- MEMORY.md for business rules and architecture decisions
- Graphify for code relationships and implementation patterns
- taste-1 for coding style consistency

## Plan Mode

- Always use plan mode when the prompt includes "create plan" or involves multiple steps.
- If something goes sideways, STOP and re-plan immediately. Don't keep pushing.
- Use plan mode for verification steps, not just building.
- Always ask questions to get more clarity.
- Make high level instruction, just create the step by step, dont put the code
- Write detailed specs upfront to reduce ambiguity.
- Always break down tasks with their dependencies.
- Always create plan task files in `./<worktree-directory>/.commandcode/tasks/<context>/<running-number>.<task-title>.md`

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

- **Model**: null (inherits active model)
- **Activates**: When reviewing implemented code against the plan (`/review` or manual)
- **Handles**: Code review against plan, pattern enforcement, migration verification, style checks
- **Config**: `.commandcode/agents/code-reviewer/AGENT.md`
- Flags deviations, bugs, style violations, and pattern breaks with location/problem/fix format

### Workflow

1. Developer enters plan mode → senior engineer creates plan
2. Plan gets reviewed and approved
3. Junior engineer implements the plan

Both agents share the same project context from `.commandcode/MEMORY.md`.
**Agents read MEMORY.md first** before starting any work to get full project context.

### Review & Re-plan Loop

1. **Senior Engineer** creates plan in `./<worktree-directory>/.commandcode/tasks/<context>/<running-number>.<task-title>.md`
2. **Junior Engineer** implements the tasks from the plan file
3. **Code Reviewer** reviews the implemented code against the plan — if issues found, writes review to `./<worktree-directory>/.commandcode/review-code/<context>/<running-number>.<review-code-title>.md`
4. **Senior Engineer** reads the review file, loops back to step 1 (re-plan based on feedback)
5. Maximum **3 loops** — if still unresolved after 3 cycles, stop and ask for instruction

**How to tell which agent is active:** There's no direct agent indicator — the current mode tells you: plan mode means `senior-engineer`, auto-accept/default mode means `junior-engineer`. Check the mode label displayed in the UI.

## Git Workflow

- When creating a git worktree, always branch from `develop` (or `dev`)
- Always create git worktrees inside `./.commandcode/worktree/<worktree-name>`
- When a git worktree is created, always create a new branch with the same name as `<worktree-name>`
- Don't commit anything before being instructed to
- Always verify new/updated files exist inside the current git worktree directory before making changes
- Always commit changes to the `.commandcode/taste/` folder alongside related work


## Plan & Review File Convention

All plans and reviews must be stored under the `.omp/` directory in the worktree root:

- **Plans**: `.omp/plans/<context>/<running-number>.<plan-name>.md`
- **Reviews**: `.omp/reviews/<context>/<running-number>.<review-name>.md`

Context should be a short kebab-case name representing the feature or domain (e.g. `companies-endpoint`, `seed-architecture`).
Running numbers are zero-padded (e.g. `01`, `02`).
Plan and review filenames use kebab-case (e.g. `01.companies-di-plan.md`, `01.companies-di-review.md`).

Example:
```
.omp/plans/companies-endpoint/01.companies-di-plan.md
.omp/reviews/companies-endpoint/01.companies-di-review.md
```

All agents (Planning Lead, Engineering Lead, Validation Lead, and their workers) MUST follow this convention when producing plan or review documents.
<!-- AGENTS.md = operational content (agents, workflow, git, rules). MEMORY.md = reference content (project context, schema, patterns, knowledge). -->
