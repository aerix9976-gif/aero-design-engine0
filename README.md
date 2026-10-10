# Aero Design Engine — Claude remote MCP v2

A Vercel-hosted remote MCP server for specialized front-end design, motion, Discord bot dashboards, full-stack implementation, research and quality workflows.

## What's improved in v2

- **365 searchable skill recipes across 10 categories.** Recipes include activation conditions, a workflow, topic-specific constraints, guardrails, acceptance criteria, deliverable expectations, research rules and a source-method note. These are concise targeted recipes, not 365 separate long manuals.
- **15 deep, installable Markdown playbooks** in `skills/guides/`. These are the longer playbooks for the highest-value recurring workflows.
- **9 MCP tools** for search, detailed recipe retrieval, deep-guide retrieval, recommendations, staged build plans, design/UX contract drafts, research workflow planning and audit checklists.
- **A validation script** that checks catalogue uniqueness and quality structure without installing dependencies.
- **Source-aware workflow:** Frontend Design sets product-specific art direction; Frontend Design Premium informs behavior, state handling, canonical UI ownership and verification; Superdesign guides visual exploration and iteration; Context7 grounds current APIs; Superpowers informs planning/TDD/review; TubeAlfred supports targeted tutorial research with primary-source cross-checking.

## Important boundaries

- The MCP tools supply guidance, recommendations, templates and checklists. They **do not** edit a Git repository, inspect a live website, query user accounts, generate a Superdesign canvas, run browser tests, or deploy code on their own.
- Context7 and TubeAlfred are used by the agent only when those connectors/tools are available in its environment. `research_playbook` describes how to use them; this server does not proxy their APIs or store their credentials.
- The Superdesign CLI must pass its own preflight and authentication checks before project commands. Never claim a canvas or design draft was generated without real tool output.
- Connect Vercel's official MCP separately at `https://mcp.vercel.com` for account/project/deployment operations. A separate code-capable connector is needed for actual repository edits.
- The skill endpoint is unauthenticated because it only returns public guidance. Do not add private-data reads, deployment mutations or privileged operations without strong authentication and server-side authorization.

## Project structure

```text
app/api/mcp/route.ts            MCP route and tools
lib/skill-catalog.json          365 searchable skill recipes
lib/skill-guides.json           15 deeper playbooks for MCP retrieval
lib/skills.ts                   Types, category list, stable lookup and ranking
skills/guides/*.md              Installable standalone Markdown playbooks
docs/SOURCE_MAP.md              Research inputs and limits
docs/QUALITY_METHODOLOGY.md     Skill design/evaluation methodology
scripts/validate-skills.mjs     Dependency-free catalogue validation
```

## Deploy from Android

1. Download and extract the project ZIP, then create a GitHub repository such as `aero-design-engine`.
2. Upload the **extracted files** while preserving folders. Do not upload only the ZIP as the repository content.
3. In Vercel, choose **Add New → Project**, import the GitHub repo and keep Next.js as the detected framework.
4. Deploy. Your endpoint will be `https://YOUR-PROJECT.vercel.app/api/mcp`.
5. Add the custom connector in Claude's web settings: **Settings → Connectors → Add custom connector**. Name it `Aero Design Engine`, enter the endpoint and connect. Once configured, the connector can be used in Claude mobile.
6. Add the official Vercel connector separately at `https://mcp.vercel.com` and authorize it.

## Local development

Requires Node.js 20 or later.

```bash
npm install
npm run dev
npm run validate:skills
```

MCP endpoint: `http://localhost:3000/api/mcp`.

The validation script uses Node's built-in modules, so it can run without the project dependencies installed. For a protocol-level check, use MCP Inspector and verify initialization, tool discovery and a real tool call. Opening the endpoint in a browser is only a reachability check.

## MCP tools

| Tool | What it does |
|---|---|
| `list_design_skills` | Search recipe catalogue by keyword, category or difficulty; supports paging. |
| `get_design_skill` | Load the full structured instructions for one recipe. |
| `list_skill_guides` | Find deeper playbooks. |
| `get_skill_guide` | Load a full playbook. |
| `recommend_design_skills` | Rank useful skills from the project's real brief and stack. |
| `create_build_plan` | Return staged tasks and verification gates; does not edit files. |
| `create_design_contract` | Draft starting `DESIGN.md` and `UX-CONTRACT.md` content. |
| `research_playbook` | Route a research question across Context7, Superdesign, TubeAlfred and a Superpowers-style workflow. |
| `audit_web_project` | Return a scoped checklist; does not itself audit the code. |

## Quality and release truthfulness

The package can validate the catalogue structure locally, but its Next.js/MCP build and deployed handshake still need to be run in an environment with the project dependencies available. Do not call it production-verified until those checks pass.
