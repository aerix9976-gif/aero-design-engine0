---
name: context7-grounded-build
description: Any project using current libraries/frameworks, especially Next.js, React, Tailwind, Motion, Supabase, MCP, or Discord API integrations.
version: 1.0.0
---

# Context7-Grounded Implementation

## Use this skill when

Any project using current libraries/frameworks, especially Next.js, React, Tailwind, Motion, Supabase, MCP, or Discord API integrations.

## Prerequisites
- Know the installed package name/version or be explicit that it is not yet known.
- A reliable Context7 tool connection is available in the agent environment.

## Workflow
1. Resolve the exact library with Context7; choose the official/high-reputation library ID when several matches exist.
2. Break the question into narrow independent concepts (e.g. App Router handler and auth) rather than one broad query.
3. Read docs snippets and note source URL, applicable version, server/client requirements and deprecations.
4. Write code in the project's established conventions; do not copy unrelated examples verbatim.
5. Run typecheck/build/tests; compare actual compiler errors with the API docs before iterating.

## Hard rules
- Never use a retrieved snippet as proof that the full project compiles.
- Never claim package behavior when the relevant result did not cover it.
- If Context7 is unavailable, say so and use official primary documentation instead.

## Acceptance criteria
- [ ] Library ID/version fit package.json.
- [ ] Important API assumptions have cited documentation.
- [ ] The code is verified in the intended environment or labeled untested.

## Source basis
- Context7 official docs: https://context7.com/docs/api-guide
- Context7 Search API: https://context7.com/docs/search-api
