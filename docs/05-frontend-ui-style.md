# 05 · Frontend UI Style Guide

## Design intent
Calm, warm, trustworthy. Hand-drawn illustrations carry personality; UI chrome stays quiet and highly legible. Patients are anxious: no flashy motion, no dense screens.

## Illustration system
Follow the "Editorial Botanical Character Illustration" skill: flat fills, thick black hand-drawn outlines, simple faces, decorative pattern fills, plants + pots, white/warm off-white background, almost no shading.
- Illustrations are exported as **SVG** and used as: full scenes (onboarding), 100–140px spot illustrations (cards), empty/error states.
- Keep a modular kit (character poses, plants, pots) in `/assets/illustrations/`.
- Plant growth sequence (sprout → bloom) is reused for cycle progress and "all done".
- Never show illness, beds, IV drips, or wilting plants (except offline/error states).

## Colour tokens
| Token | Hex | Use |
|---|---|---|
| `ink` | #101010 | Outlines, primary text |
| `bg` | #FBF8F3 | App background (warm off-white) |
| `surface` | #FFFFFF | Cards |
| `primary` | #3D55A5 | Primary buttons, links, active tab (indigo) |
| `accent` | #F43659 | Attention dot, key highlights (use sparingly) |
| `success` | #76994F | Done, verified |
| `success-soft` | #A0AA4B | Success backgrounds/secondary |
| `warn` | #D6A73E | On hold (amber), always with icon + text |
| `danger` | #9C292A | Red-flag, errors |
| `muted` | #99968E | Secondary text, disabled |
Dark mode: out of MVP.
Contrast: body text must meet WCAG AA.

## Typography
- **Plus Jakarta Sans** (Latin) with **Noto Sans** family fallbacks for Devanagari, Tamil, Bengali etc. (verify the exact Noto script families when adding languages).
- Scale (mobile): Display 28/34 · Title 22/28 · Heading 18/24 · Body 16/24 · Caption 13/18.
- Minimum body 16px; user-adjustable text size in Me → Language & voice.

## Layout & components
- 8pt spacing grid; screen padding 16–20; card radius 20–24; button radius 14–16.
- Tap targets ≥ 48dp. One primary button per card/screen.
- Bottom tab bar (4 items, icon + label), floating "Contact staff" button.
- Cards: white surface, 1px soft border, subtle shadow (very light), thin black-outline illustration spot top-right.
- Chips for medical history/filters. Bottom sheets for details (not new screens).
- Status always = icon + colour + text.

## Motion (calm, purposeful)
- Card stack swipe: spring physics; right = done/got it, left = snooze/ask staff; tap-undo toast.
- Screen transitions: simple slide/fade, ≤ 250ms.
- Live-update highlight: soft pulse on the changed row ("Updated just now").
- Plant-growth micro-animation on step completion (once, short).
- Respect "reduce motion" OS setting; no autoplaying loops.

## Libraries — mobile (patient app)
shadcn, Aceternity and motion.dev are **web** libraries; use their mobile equivalents/ideas:
| Need | Use |
|---|---|
| Styling | **NativeWind** (Tailwind for RN) |
| shadcn-style components | **React Native Reusables** (shadcn-inspired RN components) — verify current maintenance before adopting |
| Animation | **React Native Reanimated** (+ **Moti** for declarative, Motion-like API) |
| Gestures / swipe stack | **react-native-gesture-handler** + Reanimated |
| Bottom sheets | **@gorhom/bottom-sheet** |
| Icons | **lucide-react-native** |
| SVG illustrations | **react-native-svg** (+ svgr transformer) |
| Haptics | **expo-haptics** (light, on swipe/complete) |

## Libraries — staff console & caregiver page (web)
| Need | Use |
|---|---|
| Components | **shadcn/ui** (Radix + Tailwind) as the base — tables, dialogs, sheets, command palette, toasts |
| Data table | shadcn Table + **TanStack Table** |
| Animation | **motion.dev** (Motion for React): list reorder, presence, subtle transitions |
| Fancy effects | **Aceternity UI** — **sparingly** (e.g. login/marketing/landing hero only). Do NOT use heavy effects inside the data-dense console. |
| Charts | Recharts (via shadcn charts) |
| Forms | react-hook-form + zod |
| Icons | lucide-react |

## Staff console style
Data-first and quiet: neutral surfaces, same tokens, compact density, sticky table headers, keyboard shortcuts (/, j/k, r = resolve), inline edit, optimistic updates, "Demo data" tags where mocked.

## Accessibility checklist
- Voice read-aloud button on every card/screen (Bhashini TTS; fall back to device TTS).
- Dynamic type support; layouts must not break at 130% text.
- Screen reader labels on all icons and illustrations (decorative illustrations hidden).
- No colour-only meaning; focus states on web.

## Do / Don't
- Do: one idea per card, short sentences (≤ 12 words), verbs first ("Go to Infusion Suite").
- Don't: show medical jargon without a plain-language line, use red for non-urgent states, stack more than 4 cards, or hide the "Contact staff" action.
