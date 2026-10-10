---
name: dashboard-production-contract
description: SaaS/admin dashboards, CRUD screens, settings apps, and any product with repeated workflows or destructive actions.
version: 1.0.0
---

# Production Dashboard UX Contract

## Use this skill when

SaaS/admin dashboards, CRUD screens, settings apps, and any product with repeated workflows or destructive actions.

## Prerequisites
- Inspect DESIGN.md, UX-CONTRACT.md or equivalents; inspect current shared UI primitives and at least one sibling workflow.
- Confirm authoritative API, permission and business rules.

## Workflow
1. Classify this route as product/admin versus marketing/content; do not force application contracts onto static pages.
2. Resolve canonical owners for field validation, toast/live region, dialogs, navigation, tables, date/select controls and scroll surfaces.
3. For each operation, map trigger → pending state → success destination → feedback → failure recovery → focus outcome.
4. Define default, hover, focus-visible, pressed, selected, disabled, busy, success, warning, error, empty, stale, conflict and permission-changed states as applicable.
5. Document visual intent in DESIGN.md and behavior in UX-CONTRACT.md only when durable product scope justifies them.
6. Exercise keyboard, mobile, zoom, error, retry, stale response and permission-revocation behavior; fix shared root causes first.

## Hard rules
- UI hiding is not authorization.
- Never silently discard user input or stale filters/sort/page state.
- Do not duplicate established behavior in a screen-local component.
- Do not claim the static audit proves browser interaction or CRUD correctness.

## Acceptance criteria
- [ ] Repeated components have canonical owners.
- [ ] Form and destructive-action failure recovery is explicit.
- [ ] The user can always tell what was saved and where an action leads.
- [ ] Commands and runtime checks actually run, and results are reported exactly.

## Source basis
- Frontend Design Premium: interaction contract, async resilience, canonical UI resolution and verification checklist
