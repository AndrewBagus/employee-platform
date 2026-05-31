# Import type paths aren't validated at runtime in Bun

**Date:** 2026-06-01
**Context:** Project restructure — moving files from modules/ to new layout
**Symptoms:** A broken import path (`../../repositories` vs `../repositories`) in a service file was never caught:

```ts
// WRONG — resolves to src/services/repositories/ (doesn't exist)
import type { X } from "../repositories/company/X";

// RIGHT — resolves to src/repositories/
import type { X } from "../../repositories/company/X";
```

The server ran fine, the endpoint returned correct data, and no error was thrown.

## Root Cause

`import type` is **erased at compile time** by both TypeScript and Bun. Since the imported symbol is only used as a type, Bun never resolves the file path at runtime. A wrong path is only a compile-time error, not a runtime one.

`tsc --noEmit` didn't catch it either because Bun's bundled tsc may skip type-only import resolution in certain cases.

## Fix

Always verify import paths by checking the resolved location:
```
From src/services/company/:
  ../repositories/  → src/services/repositories/  ❌
  ../../repositories/ → src/repositories/          ✅
```

## Prevention

1. **Triple-check import paths** after any file move/restructure — especially `import type` paths since they won't fail at runtime
2. Use a simple mental check: count `../` levels from the file's location to the target
3. Run `bun build --target=bun src/index.ts` after moves — it catches some path errors
