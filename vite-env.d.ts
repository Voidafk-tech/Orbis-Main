/// <reference types="vite/client" />

/*
 * The ambient types Vite provides for things the bundler resolves but the
 * compiler otherwise knows nothing about: `import './index.css'`, asset
 * imports, `import.meta.env`, the HMR API.
 *
 * This is the file `npm create vite` scaffolds and this project never had. It
 * went unnoticed because TypeScript 5 quietly tolerated a side-effect import
 * of a module it could not resolve. TypeScript 7 does not — it reports
 *
 *   index.tsx(6,8): error TS2882: Cannot find module or type declarations
 *   for side-effect import of './index.css'.
 *
 * which is fair: nothing in the program said what './index.css' is, and the
 * one line that imports it is load-bearing — it is how the entire stylesheet
 * reaches the bundle.
 *
 * `tsconfig.json` sets `types: ["node"]`, which stops @types packages being
 * picked up automatically. That is why this is a reference directive in a file
 * rather than another entry in that array: it stays explicit, and it does not
 * widen what else gets pulled into every compilation.
 */
