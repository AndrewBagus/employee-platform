---
name: commit-context
description: Commit workflow — group changes by logical context, create separate conventional commits per group.
---

# Commit Context — Grouped Commits by Logical Scope

When instructed to commit all changes, do NOT create one giant commit. Group by logical context.

## How to Group

Scan the diff and identify independent change sets:

| Context | What goes in it | Example scope |
|---------|----------------|---------------|
| Schema | Drizzle schema files, enums, migrations | `schema` |
| API | Routes, handlers, controllers, validation | `api` |
| Service | Business logic, services, repositories | `service` |
| Config | Dependencies, tooling, scripts, CI | `config` |
| HTTP specs | API specs, OpenAPI, .http files | `spec` |
| Docs | README, AGENTS.md, documentation | `docs` |
| Agent config | `.omp/` prompts, expertise, skills | `agent` |
| Graph | Graphify outputs, graph changes | `graph` |
| Tests | Test files, test fixtures | `test` |
| Dependencies | package.json, bun.lock | `deps` |

## Commit Style

Each commit uses Conventional Commits format:

```
<type>(<scope>): <subject>

<body (optional)>
```

| Type | When |
|------|------|
| `feat` | New feature, endpoint, capability |
| `fix` | Bug fix |
| `refactor` | Code change with no behavior change |
| `perf` | Performance improvement |
| `test` | Adding or fixing tests |
| `docs` | Documentation changes |
| `chore` | Tooling, config, CI, deps |
| `schema` | Database schema or migration changes |

## Examples

Good — three separate commits for three unrelated changes:

```
feat(api): add employee list endpoint with pagination

schema(employees): add employee_status enum and index

chore(deps): add luxon date library
```

Bad — one commit mixing everything:

```
feat: add employee list and update schema and add luxon
```

## Edge Cases

- **Tightly coupled changes** (schema change + its migration): single commit
- **Single file with multiple concerns**: put it in the dominant context
- **One file changed across contexts**: split into separate commits only if changes are truly independent; otherwise one commit
- **Dotfiles and config**: `chore(config)` unless they're part of a feature

## Workflow

1. `git diff --cached` or `git status` to see what's staged
2. Identify logical groups
3. For each group: `git add <files>` → `git commit -m "type(scope): message"`
4. If nothing staged yet: `git add -p` for interactive staging per group
