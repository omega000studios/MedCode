# 08 · Tech Stack

## Patient app (mobile)
- **React Native + Expo (SDK current), TypeScript**, Expo Router
- **NativeWind** (styling), **React Native Reusables** (components; verify maintenance)
- **Reanimated + Moti**, **gesture-handler**, **@gorhom/bottom-sheet**
- **react-native-svg** (illustrations), **lucide-react-native**
- **Expo modules:** camera/image-picker, document-picker, haptics, notifications, secure-store, localization, calendar
- **State/data:** TanStack Query + Zustand; **supabase-js** (auth, realtime); MMKV/AsyncStorage for offline cache only
- **i18n:** i18next + translations from Bhashini (pre-translated pathway text cached)

## Staff console + caregiver page (web)
- **React + Vite + TypeScript** (or Next.js if SSR is wanted for caregiver links)
- **Tailwind + shadcn/ui**, **TanStack Table**, **motion.dev (Motion for React)**, **Aceternity UI** (sparingly), **Recharts**
- **react-hook-form + zod**, **supabase-js** realtime

## Backend
- **Supabase:** Postgres, Auth (phone OTP, email), Realtime, Storage, RLS, pg_cron
- **Integration service:** Node.js + TypeScript (Fastify) — or Supabase Edge Functions for small pieces
- **Queue/retries:** pg-boss or a simple jobs table (no extra infra for MVP)
- **Validation:** zod shared types between app, console, service (monorepo package)

## Integrations
WhatsApp Cloud API · Sarvam AI OCR (fallback Google Vision/Tesseract) · Bhashini (translate + TTS) · ABDM sandbox (ABHA) · DigiLocker · mocked PM-JAY + queue

## Tooling
- **Monorepo:** pnpm workspaces (`apps/mobile`, `apps/console`, `apps/service`, `packages/shared`)
- **Lint/format:** ESLint + Prettier; **tests:** Vitest (logic: next-step engine, stalled detection), Playwright (console smoke), manual device testing
- **CI:** GitHub Actions (typecheck + tests)
- **Builds:** Expo EAS (APK for demo), web on Vercel/Netlify, service on Railway/Render/Fly
- **Monitoring:** Sentry (app + service)

## Why these choices
- Expo = fastest path to a real Android APK, and the existing web UI logic/design carries over.
- Supabase = auth + realtime + storage + RLS in one place; avoids building sync from scratch (fixes the old localStorage problem).
- shadcn for the console = fast, consistent, accessible.

## Risks & mitigations
| Risk | Mitigation |
|---|---|
| WhatsApp template approval delay | Submit templates on day 1; keep in-app fallback; demo with sandbox/test number |
| SMS OTP DLT/provider setup in India | Use WhatsApp OTP or fixed demo OTP for the demo |
| ABHA/DigiLocker access approvals | Use sandbox; fall back to clearly-labelled mocks |
| Sarvam/Bhashini quotas or latency | Cache results; fallback OCR/TTS; pre-translate static text |
| Realtime flakiness | Refetch-on-reconnect, "updated X ago" labels |
| Scope creep | P0 list only until the core journey demos cleanly |
