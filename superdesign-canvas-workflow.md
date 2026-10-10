---
name: superdesign-canvas-workflow
description: When using Superdesign to explore a new UI, reproduce an existing page, compare directions, or iterate a design before coding.
version: 1.0.0
---

# Superdesign Canvas Workflow

## Use this skill when

When using Superdesign to explore a new UI, reproduce an existing page, compare directions, or iterate a design before coding.

## Prerequisites
- Superdesign CLI preflight must run successfully and authentication state must be known.
- For an existing codebase, required repo initialization and design-context artifacts must be complete before generation.

## Workflow
1. Run the documented CLI preflight and inspect its auth/project output.
2. Classify the target: existing rendered UI, new target in existing codebase, or brand-new project.
3. For a real codebase, initialize and inspect the current design context; do not generate before the init gate completes.
4. Create a design brief with subject, audience, primary task, existing constraints, reference scope, and one signature element.
5. Generate independent structural variants only when comparison is useful; use iteration mode to refine a chosen direction.
6. Read actual canvas/preview URLs from tool output and wait for user approval before implementation unless the user explicitly says to skip design.

## Hard rules
- Never fabricate project, draft, node or canvas identifiers.
- Do not run design-generation commands before required initialization.
- If CLI is not available, disclose it and do not claim a canvas was created.

## Acceptance criteria
- [ ] The correct target workflow was selected.
- [ ] The chosen visual direction has a clear rationale.
- [ ] The user receives a real canvas URL only if the command returned one.

## Source basis
- Installed Superdesign skill and its workflow references
