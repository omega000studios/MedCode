# medcode: patient mobile app
Expo + React Native + TypeScript, Expo Router, NativeWind, Reanimated/Moti,
gesture-handler, @gorhom/bottom-sheet, lucide-react-native, react-native-svg,
TanStack Query + Zustand. Specs are in /docs (read only what the task names).

Rules:
- P0 scope only. No maps, insurance APIs, or items under "Out of scope" in docs/01.
- All data goes through `src/data/repository.ts` (interface). Use the mock
  implementation for now; Supabase comes later. No data in components.
- Colours/type/spacing only from `src/theme/tokens.ts` (docs/05).
- One primary action per card. Min tap target 48dp. Body text ≥16px.
- Every screen: Listen button placeholder, offline-safe, empty state.
- Status UI = icon + colour + text. Never colour only.
- Illustrations are png placeholders in `assets/illustrations/` (named per slot).
- Never store or request Aadhaar/PAN numbers. Label mocked data "Demo".
- After each milestone: run typecheck, summarise what's done and what's next in
  `docs/PROGRESS.md` (max 15 lines).