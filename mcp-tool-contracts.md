---
name: mcp-tool-contracts
description: Adding a tool to a remote MCP server, defining its input schema, exposing repository actions or integrating third-party APIs.
version: 1.0.0
---

# MCP Tool Contracts and Safety

## Use this skill when

Adding a tool to a remote MCP server, defining its input schema, exposing repository actions or integrating third-party APIs.

## Prerequisites
- Know the MCP transport and SDK version.
- Classify the tool as read-only, write, privileged or destructive.

## Workflow
1. Give each tool one focused capability with clear title, description, input schema and structured output.
2. Validate untrusted inputs server-side and enforce authorization where the action is performed.
3. Return actionable, bounded results; distinguish empty/not-found, validation errors and upstream failures.
4. Make write tools idempotent when possible and require explicit confirmation for irreversible operations.
5. Test initialize, list tools, invalid params, normal success, upstream error, timeout and authorization-denied scenarios.
6. Document which connected MCP/provider supplies external deployment or code-editing actions.

## Hard rules
- A public unauthenticated server must not expose private-data reads or privileged mutations.
- Do not imply that a plan-generating tool has edited code or deployed an app.
- Never pass secrets back in tool results or logs.

## Acceptance criteria
- [ ] Schema rejects malformed inputs.
- [ ] Tool behavior matches its description.
- [ ] Access controls exist at the action boundary.
- [ ] A real protocol handshake and representative tool call are tested.

## Source basis
- MCP and Vercel deployment guidance; verify exact SDK API through Context7
