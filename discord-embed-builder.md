---
name: discord-embed-builder
description: A builder for Discord embeds, buttons, select menus, welcome announcements, or interactive messages.
version: 1.0.0
---

# Discord Embed Builder With Truthful Preview

## Use this skill when

A builder for Discord embeds, buttons, select menus, welcome announcements, or interactive messages.

## Prerequisites
- Confirm the current Discord payload schema and limits through primary documentation.
- Define whether preview renders a normalized local payload or a fetched Discord message.

## Workflow
1. Model content fields and interactive components with typed schemas.
2. Validate required fields, string lengths, aggregate limits, URLs, colors and component constraints before enabling save/send.
3. Keep errors next to the affected control and provide a helpful counter for length-limited fields.
4. Render a preview from the same normalized payload used by the send API; sanitize rich text and never inject raw HTML.
5. Prevent duplicate sends and show server-confirmed status, message/link IDs only when actually returned.
6. Test empty content, limit edges, malformed URLs, permission denial, API rate limit and send failure.

## Hard rules
- Local preview is not proof that Discord accepted the message.
- No raw HTML injection.
- Do not silently truncate content without showing what changed.

## Acceptance criteria
- [ ] Preview maps to payload semantics.
- [ ] Boundary errors are clear and actionable.
- [ ] The user can distinguish draft, validated, sending, sent and failed states.

## Source basis
- Discord API documentation (verify exact current limits before implementation)
