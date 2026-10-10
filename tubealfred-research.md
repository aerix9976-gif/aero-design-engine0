---
name: tubealfred-research
description: When a video tutorial, walkthrough, creator comparison, or real-world build explanation can add useful context.
version: 1.0.0
---

# TubeAlfred Video Research to Engineering Notes

## Use this skill when

When a video tutorial, walkthrough, creator comparison, or real-world build explanation can add useful context.

## Prerequisites
- A specific question that a video can answer.
- A way to verify technical details against primary documentation.

## Workflow
1. Search YouTube with specific product + concept + intended outcome terms.
2. Screen publication date, author/channel, topic fit, and whether the video appears educational versus promotional.
3. Fetch metadata or transcript for only the most relevant few results.
4. Extract original, concise steps, design tradeoffs, and failure modes; mark transcript uncertainty for exact identifiers or code.
5. Check package syntax, API limits, security and versioned behavior against official docs such as Context7 results.
6. Store the original video URL plus summary and a confidence label in the research note.

## Hard rules
- Don't copy transcript passages or present the creator's words as yours.
- Views and likes are not technical proof.
- Don't use a video as the only source for security-sensitive or version-sensitive implementation.

## Acceptance criteria
- [ ] The note answers the specific research question.
- [ ] Technical claims are cross-checked.
- [ ] Links, dates and unresolved uncertainty are preserved.

## Source basis
- TubeAlfred YouTube search/transcript tools
- Example research method source: https://www.youtube.com/watch?v=jT5YdajTg6I
