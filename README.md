# TX-24 Runoff Backend Suite

This monorepo implements five parallel, AI-driven backend strategies for the Texas May 26, 2026 primary runoff: paid conversion + landing page factory, consent-to-turnout OS, governed multi-site publishing, creator/validator distribution, and volunteer & relational organizing. It hard-codes election timing gates, disclosure controls, altered-media review rules, consent-proof-before-send, STOP suppression, and audit logging. It ships as a multi-tenant suite with an admin portal, public site renderer, REST API, worker queue layer, and shared compliance spine. External CRM, voter file, ad platform, and email integrations remain explicitly UNSPECIFIED behind adapter interfaces.

## Apps

- `apps/admin`: Next.js admin widget suite
- `apps/public`: Next.js multi-tenant public site renderer
- `apps/api`: Express REST API
- `apps/worker`: BullMQ worker processes
- `packages/shared`: shared types, RBAC, validators, compliance services

## Local development

1. Copy `.env.example` to `.env.local` or export env vars in your shell.
2. Start infrastructure with `docker-compose up -d`.
3. Install dependencies with `pnpm install`.
4. Run the app surfaces:
   - `pnpm dev:admin`
   - `pnpm dev:public`
   - `pnpm dev:api`
   - `pnpm dev:worker`

## Compliance QA Gates

- Disclosure lock: `tests/jest/disclosure-footer.test.ts`
- Consent-proof-before-send: `tests/jest/consent-guard.test.ts`
- STOP suppression: `tests/jest/stop-handling.test.ts`
- Publishing similarity/value gate: `tests/jest/publishing-governance.test.ts`

