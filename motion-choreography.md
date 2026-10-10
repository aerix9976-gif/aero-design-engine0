---
name: motion-choreography
description: Landing page entrances, dashboard transitions, scroll reveals, shared elements, progressive disclosure, and delightful micro-interactions.
version: 1.0.0
---

# Intentional Motion Choreography

## Use this skill when

Landing page entrances, dashboard transitions, scroll reveals, shared elements, progressive disclosure, and delightful micro-interactions.

## Prerequisites
- Identify installed animation library and version; use Context7 for current API details.
- Decide what motion communicates before writing an animation.

## Workflow
1. Choose one motion purpose per interaction: orientation, hierarchy, cause-and-effect, progress, or delight.
2. Design a timing hierarchy: one lead movement, a short child stagger, then stillness. Define trigger, duration, easing and interruption rules.
3. Prefer opacity/transform; use layout animation only when the geometry change helps the user track continuity.
4. Keep content readable and the primary action available while motion runs. Do not gate route access behind decorative animation.
5. Implement reduced-motion alternatives at a shared configuration/token layer where the library supports it.
6. Test rapid state changes, interrupted navigation, slow devices, scrolling, resizing and keyboard focus.

## Hard rules
- No fake progress bars.
- No scroll hijacking.
- No perpetual movement without a meaningful reason.
- Do not remove useful state feedback for reduced-motion users.

## Acceptance criteria
- [ ] Motion expresses a user-understandable transition.
- [ ] The page does not shift unpredictably or block interaction.
- [ ] Reduced-motion and no-hover behavior are usable.
- [ ] The actual implementation uses current APIs for the installed version.

## Source basis
- Context7 Motion documentation
- Tailwind CSS reduced-motion docs
- Frontend Design Premium accessibility guidance
