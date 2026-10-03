# 07 · UI/UX Flows

Legend: [P] patient app · [S] staff console · [C] caregiver link

## F1 · First launch → onboarding [P]
Welcome → Language → Phone+OTP → About you → Medical history (chips/voice) → Scheme/insurance → Caregiver (skip) → Reminders → Link ABHA/DigiLocker (skip) → All set → Today.
- Autosave each screen; resume where left off.
- Errors inline, friendly; OTP resend after 30s.
- First Today load shows a short 3-card coach mark (swipe right = done, left = ask staff, tap = details).

## F2 · Daily use: Today [P]
Open app → status banner ("On track"/"On hold") → top card.
- **Swipe right:** mark done/got it → next card; plant micro-animation on last card.
- **Swipe left:** menu: "Remind me later" / "Ask staff".
- **Tap:** opens bottom sheet with detail + Listen + directions.
- Stack cleared → "All done for today" + next upcoming step.

## F3 · Visit day [P]
Next-step card (destination + directions + token) → "How to get there" opens staff-written steps + photo → "I've arrived" → staff sees arrival → card advances. If staff changes destination, card updates live with "Updated just now".

## F4 · On hold [P] ↔ [S]
1. Staff (or rule) creates hold with reason/owner/expected time.
2. Patient: banner turns amber; Journey "Now" card shows reason, owner, last confirmed; "Contact staff".
3. Patient + caregiver get WhatsApp message.
4. Staff resolves hold (2 clicks) → patient's next step updates live; WhatsApp "Update: next step ready".
5. Audit entry written.

## F5 · Document needed → upload [P] ↔ [S]
1. Staff requests doc (or engine does) → "Document needed" card + banner in Documents.
2. Patient taps Scan → camera → auto-crop → upload.
3. OCR suggests type/date/lab → patient confirms in one tap.
4. Doc attaches to step; if OCR confidence low → staff review queue.
5. Staff verifies → status "Verified"; step progresses.
Alt: Fetch from DigiLocker/ABHA → consent screen → import → same confirm step.

## F6 · Stalled patient → nudge [S] → [P]
Stalled list (sorted by days overdue) → open patient → see why (e.g. pathology pending) → actions: assign owner, create hold, nudge patient/lab, message → patient gets update.

## F7 · Daily check-in [P] → [S]
Check-in card → 3–5 icon questions → normal: "Thanks, see you at next visit" → red flag: "Contact the hospital now" screen with helpline + staff queue item created → staff acknowledges. UI clearly states this is not emergency service; shows emergency number.

## F8 · Caregiver [P] → [C]
Me → Caregivers → add name/WhatsApp → consent screen (what they'll see) → WhatsApp welcome message with link. Caregiver opens link: status, hold, next appointment, last updated. Patient can revoke anytime; link expires.

## F9 · Language & voice [P]
Any screen → Listen button reads current card in selected language (Bhashini TTS; device TTS fallback). Language switch re-renders instantly with cached translations.

## F10 · Offline / reconnect [P]
Offline: show cached Today + banner "Offline — last updated 10:42". Actions queue locally (e.g. mark done). Reconnect: sync, refetch, highlight changes. Demo this explicitly.

## F11 · Staff day [S]
Login → Stalled (default landing) → open patient → edit step/status/destination → resolve holds → review OCR queue → send template messages. Keyboard shortcuts for speed.

## Edge cases to design
- Language not supported by TTS → text only + notice.
- Phone number change / re-login → restore from account.
- Patient revokes caregiver mid-hold → link dies immediately.
- Conflicting edits (two staff) → last-write-wins with audit + toast "Updated by X".
- Stale data (> threshold) → "not recently confirmed" label.
- Empty states always have an illustration + one next action.

## UX principles
Max 4 cards · one primary action · ≤ 12 words per line · always show what happens next · never dead-end · every hold has an owner and a contact.
