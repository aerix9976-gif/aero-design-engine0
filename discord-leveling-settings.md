---
name: discord-leveling-settings
description: XP rules, level-up messages, rank cards, leaderboards, rewards and manual XP administration.
version: 1.0.0
---

# Discord Leveling Configuration System

## Use this skill when

XP rules, level-up messages, rank cards, leaderboards, rewards and manual XP administration.

## Prerequisites
- Define the authoritative XP formula, update cadence, persistence contract and ranking tie-breaker.
- Define guild-scoped permissions for manual XP operations and role rewards.

## Workflow
1. Use a settings overview with grouped modules rather than a wall of isolated commands.
2. Design XP curve/threshold controls with example values and explicit units; preview the progression at sample levels.
3. For role rewards, validate duplicate thresholds, missing roles and bot role hierarchy before save.
4. Make manual add/remove/reset actions explicit, permission-gated and auditable; confirm bulk/reset-all operations.
5. Render rank card and leaderboard previews from the same template/data schema used in production.
6. Test ties, zero/negative values, maximum values, missing avatars, removed users, stale rankings and failed role assignment.

## Hard rules
- Never expose a manual XP mutation without server-side permission checks.
- Never claim rank/leaderboard data is live if it is cached or mock data.
- Keep one source of truth for level, rank, total XP and progress calculations.

## Acceptance criteria
- [ ] XP thresholds are deterministic and tested at boundaries.
- [ ] Dangerous reset flows require deliberate confirmation.
- [ ] Preview and production templates agree.
- [ ] Failure does not leave stale rank/progress UI.

## Source basis
- Frontend Design Premium interaction and async resilience guidance
