---
name: superpowers-engineering-loop
description: Multi-step code changes, tricky bugs, new integrations, security-sensitive work, or reusable feature systems.
version: 1.0.0
---

# Superpowers Engineering Loop

## Use this skill when

Multi-step code changes, tricky bugs, new integrations, security-sensitive work, or reusable feature systems.

## Prerequisites
- An outcome and acceptance criteria are known.
- A shell/test environment or an honest limitation statement is available.

## Workflow
1. Brainstorm enough to settle user goals, constraints and meaningful design alternatives.
2. Write a stepwise plan with exact paths, interfaces, and commands/tests.
3. For behavior, follow red → green → refactor: demonstrate the failing test before the fix.
4. Implement the smallest coherent slice; split tasks by independent interfaces when parallelism actually helps.
5. Review specification compliance first, then code quality and maintainability.
6. Run verification commands and record observed output; do not infer success from intent.

## Hard rules
- Do not write a large speculative diff before settling the design.
- Do not skip a red test step and still call the work TDD.
- Do not claim commands ran unless their results were observed.

## Acceptance criteria
- [ ] Plan tasks are executable and testable.
- [ ] Regression behavior is covered by evidence.
- [ ] Code matches the plan and is reviewed.
- [ ] Final status separates completed, unverified and blocked items.

## Source basis
- Superpowers repository and methodology: https://github.com/obra/superpowers
