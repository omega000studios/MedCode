# Design QA

## Direction

The supplied health dashboard reference informed the soft blue accent and calm patient treatment. The patient home centers one next step, its location, and the two details needed on arrival: token and wait time. The doctor dashboard uses plain operational tables and forms because staff need scan speed and direct state changes. The Pinterest page was unavailable, so the attached screenshot was the usable visual reference.

The deslop review removed decorative card shadows, the pill label, repeated section icon tiles, and the oversized generic greeting. Spacing and plain text now carry the hierarchy.

## Checks

- Reviewed the page at 390 × 844 and 1440 × 900. The mobile page has no horizontal overflow; cards, controls, and text stay within the viewport.
- Confirmed the next-step card, directions, token, preparation, progress, and detail sections render in the intended order.
- Tested checklist toggles, expandable details, directions, English/Hindi switching, and patient switching in the browser. Directions reflect the selected patient's current destination.
- Replaced the mixed checklist with read-only preparation facts and a separate fasting attestation. Choosing “ate or drank” blocks onward actions and exposes staff help; confirming fasting enables indoor wayfinding.
- Restored the planned What's next, Journey, and Documents sections. The Journey view labels every stage and its status.
- Share and Help now have visible text labels. The language selector shows full language names and the navigation, journey labels, fasting flow, and actions change in Hindi and Marathi.
- Google Material Symbols load from a local font. The patient surfaces use shadcn components and the doctor screens keep motion and decorative effects out of the workflow.
- The doctor route at `#doctor` was checked at desktop. Queue rows open the consult form; catalog selections submit to the shared store; order and insurance controls advance in order.
- The doctor dashboard now shares the patient UI's MedCode header, blue accent, gray canvas, border-led surfaces, tab underline, spacing, and type scale while keeping its operational tables plain.
- The shared patient shape is defined in `src/data/sharedPatients.js`, with updates persisted through `src/services/sharedPatientStore.js`. A clean patient tab reflected the doctor-submitted order, new documents, stage advance, and insurance status.
- `docs/patient-journeys-shared-schema.sql` documents the additive database migration for the shared object.
- The Paper layout sketch uses generic labels and no patient details.
- Production build succeeds. Lint reports warnings from unused legacy code and generated component exports, with no errors.

## Limits

- The doctor dashboard is available at `http://127.0.0.1:5173/#doctor`.
- Wait time and stage progress are driven by the local shared mock store until a backend replaces it.
- Listen uses the browser's speech synthesis support.
