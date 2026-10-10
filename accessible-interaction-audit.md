---
name: accessible-interaction-audit
description: Before release or after changing buttons, navigation, dialog, forms, tables, responsive controls or animation.
version: 1.0.0
---

# Accessible Interaction Audit

## Use this skill when

Before release or after changing buttons, navigation, dialog, forms, tables, responsive controls or animation.

## Prerequisites
- Know target browsers and relevant accessibility requirements.
- Have access to the rendered page where possible.

## Workflow
1. Exercise every action with keyboard only; confirm visible focus and predictable order.
2. Check semantic button/link/control roles and accessible names; ensure invalid fields reference visible errors.
3. Inspect contrast, text zoom/reflow, touch target size and whether sticky UI obscures focus.
4. Test dialog open/close, focus trap/restoration, Escape behavior and nested interactions.
5. Enable reduced motion and check that state cues and functionality remain.
6. Separate static findings from runtime checks and report repro steps with severity.

## Hard rules
- No clickable div/span when a real button/link fits.
- No color-only status or icon-only unlabeled controls.
- No inaccessible drag-only interaction without an alternative.

## Acceptance criteria
- [ ] Keyboard-only path completes core task.
- [ ] Focus, names, errors and contrast are checked.
- [ ] Reduced-motion and narrow layouts remain functional.
- [ ] Findings map to observable evidence.

## Source basis
- Frontend Design Premium interaction contract and verification checklist
