# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run Biome linter
pnpm email        # Preview email templates (React Email dev server)
```

## Architecture

Next.js 16 App Router project using TypeScript, Tailwind CSS v4, and Supabase. Path alias `~/` maps to `./src/`.

**Data flow:**
- `app/page.tsx` (Server Component) fetches waitlist count from Supabase via `getWaitlistCount()`, passes to `app/page.client.tsx` (Client Component) which renders the landing page sections.
- `components/form.tsx` handles multi-step signup: POSTs to `/api/mail` (Resend welcome email), then `/api/waitlist` (Supabase insert + referral code generation). Supports `?ref=CODE` URL param for referral tracking.

**API routes:**
- `POST /api/waitlist` — validates email, checks duplicates, stores in Supabase `waitlist` table, returns `{ success, code, id }`
- `POST /api/mail` — sends welcome email via Resend using React Email template at `src/emails/index.tsx`

**Key files:**
- `src/lib/supabase.ts` — Supabase client singleton
- `src/lib/utils.ts` — `cn()` (tailwind-merge), `getWaitlistCount()`, `generateCode()`
- `src/lib/email-check.ts` — email validation
- `src/providers/theme-provider.tsx` — next-themes (forced dark mode)

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY       # Server-side only (API routes)
RESEND_API_KEY
RESEND_FROM_EMAIL
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
```

## Tooling Notes

- **Linting/formatting:** Biome (not ESLint/Prettier for most files)
- **UI components:** shadcn/ui (New York style) in `src/components/ui/`; Radix UI primitives
- **Animations:** Motion library (`motion/react`), canvas-confetti for signup celebration
- **Toasts:** Sonner
- `next.config.ts` has `ignoreBuildErrors: true` — TypeScript errors won't fail CI builds
