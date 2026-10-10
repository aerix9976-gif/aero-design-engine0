---
name: discord-dashboard-foundation
description: A server-specific Discord bot dashboard with multiple guilds, configuration modules, roles, commands, or analytics.
version: 1.0.0
---

# Discord Dashboard Foundation

## Use this skill when

A server-specific Discord bot dashboard with multiple guilds, configuration modules, roles, commands, or analytics.

## Prerequisites
- Separate user login, Discord OAuth scopes, guild membership, bot installation and bot permissions.
- Identify server-side authorization contract and secret storage strategy.

## Workflow
1. Design a persistent active-guild context and a setup flow that checks bot installation and required permissions.
2. Group navigation by user tasks, not by backend implementation details. Keep global account/billing separate from guild settings.
3. Each setting needs an explicit owner, default, schema, server-side permission gate and persisted-save contract.
4. Prepare disconnected, no-guild, missing-bot, missing-permission, stale-config, rate-limited and save-failed states.
5. Use visible draft/saved/unsaved states; only show a live preview when it reflects the same normalized schema that is persisted.
6. Test guild switching during fetch/save, revoked access, retry/idempotency, and mobile navigation.

## Hard rules
- Never ship bot tokens to the browser.
- Never trust a guild ID or role ID without checking access server-side.
- Never invent statistics or claim config was saved without an API confirmation.
- Never request broad permissions without mapping them to product features.

## Acceptance criteria
- [ ] Active guild is obvious on every guild-scoped route.
- [ ] The backend rechecks actor and bot permissions for every write.
- [ ] All important settings have loading, success, failure and no-access states.
- [ ] Rate limits and partial API failures are handled explicitly.

## Source basis
- Frontend Design Premium interaction patterns
- Discord official API docs to be checked through Context7/primary docs before code
