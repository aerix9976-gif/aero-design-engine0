---
name: skill-authoring-quality
description: Creating, expanding, or revising a reusable skill catalogue or agent instruction set.
version: 1.0.0
---

# Author High-Signal Agent Skills

## Use this skill when

Creating, expanding, or revising a reusable skill catalogue or agent instruction set.

## Prerequisites
- A clearly bounded skill trigger and user outcome.
- A plan for evaluating whether the skill changes output quality.

## Workflow
1. Choose a precise title, trigger condition, and outcome; avoid skills that restate 'do good work'.
2. Write a workflow with specific decisions, artifacts, ordering and failure paths.
3. Include anti-patterns and boundary cases, not just aspirational principles.
4. Define observable acceptance checks plus explicit conditions that should stop or escalate the task.
5. Separate stable principles from versioned API facts; direct agents to Context7/primary docs for current syntax.
6. Test on at least two representative prompts and one adversarial or edge-case prompt; revise when the skill produces generic or contradictory behavior.

## Hard rules
- Do not count thin topic labels as equivalent to high-quality skills.
- Do not clone third-party skill text; synthesize reusable original instructions and preserve source attribution.
- Do not claim evaluation passed without running examples.

## Acceptance criteria
- [ ] Skill contains trigger, workflow, guardrails, outputs and checks.
- [ ] Its guidance is specialized and not interchangeable with sibling skills.
- [ ] Its behavior can be evaluated with concrete test prompts.

## Source basis
- Superpowers writing-skills methodology concepts
- Frontend Design Premium structure and evidence-first verification
