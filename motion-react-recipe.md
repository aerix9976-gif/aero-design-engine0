---
name: motion-react-recipe
description: React apps using Motion/Framer Motion for layout transitions, viewport reveals, shared elements, and gestures.
version: 1.0.0
---

# React Motion Implementation Recipe

## Use this skill when

React apps using Motion/Framer Motion for layout transitions, viewport reveals, shared elements, and gestures.

## Prerequisites
- Check package.json to distinguish `motion/react` from older `framer-motion` imports.
- Resolve the installed library version in Context7.

## Workflow
1. Define variants at the nearest shared level instead of scattering per-node transition props.
2. Use `whileInView`/viewport detection only for content that benefits from reveal and make one-shot behavior explicit.
3. Use stable keys and stable layout identities; scope shared-element IDs to avoid collisions.
4. Prefer a small number of properties and use transform/opacity for smooth motion.
5. Set reduced-motion behavior with the API supported by the installed version and preserve non-motion state cues.
6. Verify SSR/client boundaries, route unmount, list reorder, and preference changes.

## Hard rules
- Never assume old Framer Motion import paths still match the installed package.
- Never key a persistent animated entity by array index when items can reorder.
- Do not animate every paragraph or card just because the library makes it easy.

## Acceptance criteria
- [ ] Imports compile under the installed package.
- [ ] Animations survive list reorder without identity jumps.
- [ ] Reduced motion is validated manually or in test.
- [ ] Interaction can finish or be interrupted without stale UI.

## Source basis
- Context7 Motion for React docs: https://motion.dev/docs/react-accessibility
