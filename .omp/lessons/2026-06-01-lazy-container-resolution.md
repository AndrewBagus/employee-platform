# Lazy container resolution for testable controllers

**Date:** 2026-06-01
**Context:** Writing controller tests with mocked Inversify services
**Symptoms:** Controller tests failed on subsequent runs because the container.get() ran once at module scope:

```
Test 1: GET /:id → 200 (PASS)
Test 2: POST validation → 400 (FAIL — got 201)
```

The first test passed because `container.rebind()` ran before `await import()`. But the second test still used the OLD module cache where `service` was already resolved.

## Root Cause

This pattern is brittle:

```ts
// ❌ Service resolved ONCE at module load time
const service = container.get<CompanyServiceInterface>(TYPES.CompanyServiceInterface);
```

Bun caches `import()` results. `container.rebind()` before `import()` only works the FIRST time. All subsequent imports return the cached module with the original service reference.

## Fix

Use a lazy getter:

```ts
// ✅ Service resolved on every handler call
const getService = () => container.get<CompanyServiceInterface>(TYPES.CompanyServiceInterface);

companyController.get("/:id", async (c) => {
  const company = await getService().findById(id);
  // ...
});
```

This way `container.rebind()` in tests takes effect immediately because the service is resolved at call time, not module load time.

## Prevention

1. **Never resolve DI dependencies at module scope** in controllers or any module that gets tested with mocked dependencies
2. Use a getter function pattern: `const getX = () => container.get<T>(...)` 
3. It adds ~0.001ms per request — negligible cost for testability
