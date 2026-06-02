# Inversify requires `import type` for interfaces in Bun

**Date:** 2026-05-31
**Context:** Building GET /companies endpoint with Inversify DI in Bun
**Symptoms:** `SyntaxError: Export named 'ICompanyRepository' not found in module` at runtime

```
SyntaxError: Export named 'ICompanyRepository' not found in module
'.../interfaces/ICompanyRepository.ts'.
```

This happened even though `ICompanyRepository` was correctly exported as an interface from the file.

## Root Cause

TypeScript interfaces are **compile-time only** — they produce zero JavaScript output. When Bun (v1.3.14) encounters:

```ts
import { ICompanyRepository } from "./interfaces/ICompanyRepository";
```

it tries to resolve `ICompanyRepository` as a **runtime value export**. Since interfaces don't emit JS, the export doesn't exist at runtime, and Bun throws.

Additionally, `import type { ICompanyRepository }` also failed in Bun 1.3.14 when the importing file ALSO used `ICompanyRepository` in a value position indirectly (e.g., `container.bind<ICompanyRepository>(...)` — the generic type parameter is fine, but Bun's parser was confused).

## Fix

**Pattern to always use:**

```ts
// ❌ WRONG — Bun will throw at runtime
import { ICompanyRepository } from "./somewhere";

// ✅ CORRECT — use import type everywhere for interfaces
import type { ICompanyRepository } from "./somewhere";
```

For container bindings, drop the generic type parameter:

```ts
// ❌ container.bind<ICompanyRepository>(TYPES.X).to(Impl);
// ✅ container.bind(TYPES.X).to(Impl);
```

The type safety comes from the interface file next to the implementation.

## Prevention

1. **Always use `import type` for TypeScript interfaces** in every file — not just files that only use them as types. Bun is stricter than `tsc` here.
2. **Don't use generic type parameters on `container.bind()`** — it's erased anyway and can confuse Bun.
3. Put this as the first thing to check when seeing "Export named 'X' not found in module" errors.
