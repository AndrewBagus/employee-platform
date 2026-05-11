# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Employee service — a backend microservice built with **Hono** on **Bun**. Part of the `the-journey` monorepo (`backend/employee-service`).

## Commands

```sh
bun install          # Install dependencies
bun run dev          # Start dev server with hot reload (port 3000)
bun test             # Run tests (Bun's built-in test runner)
bun test src/foo.test.ts  # Run a single test file
```

## Tech Stack

- **Runtime**: Bun (with `@types/bun`)
- **Framework**: Hono v4
- **Language**: TypeScript (strict mode)
- **Package manager**: Bun (bun.lock, not npm/yarn)

## Architecture

Entry point is `src/index.ts` — exports a Hono `app` instance. Bun's `--hot` flag enables hot module replacement during development.

The Hono app uses JSX via `hono/jsx` (configured in tsconfig `jsxImportSource`).
