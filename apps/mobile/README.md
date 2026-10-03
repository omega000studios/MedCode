# MedCode patient app — Milestone 1

From this folder, run `npm ci`, then `npm run android` with an Android emulator or Expo Go device connected.
For a physical device, run `npm start` and scan the QR code in Expo Go (SDK 57).

Checks: `npm run typecheck`, `npm run lint`, `npm run check:data`, `npx expo-doctor`.
Offline bundle check: `npx expo export --platform android`.

Routes live in `src/app`; the four tabs are placeholders only. Shared components live in `src/components`.
All colours, typography, spacing and radii come from `src/theme/tokens.ts` (also consumed by NativeWind).
`IllustrationSlot` statically maps four named PNG placeholders; replace those assets in place.
`ListenButton` shows a labelled Demo alert; speech is not connected.
`BottomSheet` requires the providers already mounted in the root layout.

Data access uses `PatientRepository` and `mockRepository`, with detached, read-only snapshots.
Fixtures use the rows in `../../docs/06-backend.md`. Sunita is at breast treatment cycle 4 with a
2026-10-03 visit; Kavita has a missing-consent hold. All patient data is synthetic and marked Demo.
No login, onboarding, clinical clearance, live backend, queue, or integration is implemented.

Device QA (2026-10-03): Android 15 emulator / Expo Go 57.0.9; all tabs, Listen alert and 130% font scale passed. NativeWind requires static style arrays on these shared Pressables; pressed feedback uses its active utility.
The repository check uses Node 24+ native TypeScript support. npm audit still reports 34 upstream advisories (24 high, 10 moderate); resolving them requires incompatible dependency changes.
