import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';
import { categoriesList, findGuide, findSkill, guides, rankSkills, skills } from '@/lib/skills';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const categoryValues = categoriesList.map((category) => category.name) as [string, ...string[]];
const categorySchema = z.enum(categoryValues).or(z.literal('all')).default('all');
const projectTypes = ['landing_page', 'saas_app', 'discord_dashboard', 'full_stack_app', 'portfolio', 'design_system', 'mcp_server'] as const;

const handler = createMcpHandler((server) => {
  server.registerTool(
    'list_design_skills',
    {
      title: 'Search the design and engineering skill library',
      description: 'Search 365 concise, topic-targeted skill recipes across 10 categories. Returns stable IDs; call get_design_skill for the full workflow, guardrails and acceptance criteria. The catalogue is guidance, not an execution engine.',
      inputSchema: z.object({
        category: categorySchema,
        search: z.string().max(160).default(''),
        difficulty: z.enum(['all', 'beginner', 'intermediate', 'advanced']).default('all'),
        limit: z.number().int().min(1).max(100).default(40),
        offset: z.number().int().min(0).max(2000).default(0),
      }),
    },
    async ({ category, search, difficulty, limit, offset }) => {
      const query = search.toLowerCase().trim();
      const filtered = skills.filter((skill) =>
        (category === 'all' || skill.category === category)
        && (difficulty === 'all' || skill.difficulty === difficulty)
        && (!query || `${skill.id} ${skill.title} ${skill.description} ${skill.category} ${skill.tags.join(' ')}`.toLowerCase().includes(query)),
      );
      return {
        content: [{ type: 'text', text: JSON.stringify({
          totalInCatalogue: skills.length,
          matching: filtered.length,
          returned: Math.min(limit, Math.max(filtered.length - offset, 0)),
          offset,
          categories: categoriesList,
          skills: filtered.slice(offset, offset + limit).map(({ id, title, category, description, tags, difficulty }) => ({ id, title, category, description, tags, difficulty })),
          usage: 'Call get_design_skill with an ID to load the complete topic recipe. Use recommend_design_skills to rank relevant recipes from a full brief.',
        }, null, 2) }],
      };
    },
  );

  server.registerTool(
    'get_design_skill',
    {
      title: 'Load one complete skill recipe',
      description: 'Retrieve purpose, activation criteria, ordered workflow, topic-specific constraints, anti-patterns, acceptance criteria, deliverable format and research rules for a single skill ID.',
      inputSchema: z.object({ id: z.string().min(1).max(160) }),
    },
    async ({ id }) => {
      const skill = findSkill(id);
      if (!skill) return { isError: true, content: [{ type: 'text', text: `Unknown skill ID: ${id}. Search with list_design_skills first.` }] };
      return { content: [{ type: 'text', text: JSON.stringify(skill, null, 2) }] };
    },
  );

  server.registerTool(
    'list_skill_guides',
    {
      title: 'List deep implementation playbooks',
      description: 'List the 15 deeper, installable playbooks covering art direction, dashboard UX contracts, React Motion, Discord dashboards, Context7 research, TubeAlfred, Superdesign, Superpowers-style engineering and MCP safety.',
      inputSchema: z.object({ search: z.string().max(160).default(''), category: z.string().max(100).default('') }),
    },
    async ({ search, category }) => {
      const q = search.toLowerCase().trim();
      const c = category.toLowerCase().trim();
      const filtered = guides.filter((guide) => (!c || guide.category.toLowerCase().includes(c)) && (!q || `${guide.id} ${guide.title} ${guide.category} ${guide.whenToUse}`.toLowerCase().includes(q)));
      return { content: [{ type: 'text', text: JSON.stringify({ total: guides.length, matching: filtered.length, guides: filtered.map(({ id, title, category, whenToUse, prerequisites }) => ({ id, title, category, whenToUse, prerequisites })) }, null, 2) }] };
    },
  );

  server.registerTool(
    'get_skill_guide',
    {
      title: 'Load a deep implementation playbook',
      description: 'Retrieve a longer, step-by-step playbook with prerequisites, workflow, hard rules, acceptance criteria and source basis.',
      inputSchema: z.object({ id: z.string().min(1).max(120) }),
    },
    async ({ id }) => {
      const guide = findGuide(id);
      if (!guide) return { isError: true, content: [{ type: 'text', text: `Unknown guide ID: ${id}. Call list_skill_guides to find valid IDs.` }] };
      return { content: [{ type: 'text', text: JSON.stringify(guide, null, 2) }] };
    },
  );

  server.registerTool(
    'recommend_design_skills',
    {
      title: 'Recommend skills from a real project brief',
      description: 'Rank skill recipes using a project brief, project type, stack and explicit priorities. Recommendations are relevance estimates, not proof the listed work has been performed.',
      inputSchema: z.object({
        project_type: z.enum(projectTypes),
        brief: z.string().min(20).max(5000),
        stack: z.string().max(500).default('Unknown; inspect the repository before implementation'),
        priorities: z.array(z.string().min(1).max(80)).max(12).default([]),
        limit: z.number().int().min(1).max(25).default(12),
      }),
    },
    async ({ project_type, brief, stack, priorities, limit }) => {
      const ranked = rankSkills({ brief, projectType: project_type, stack, priorities }).slice(0, limit);
      const relatedGuides = guides.filter((guide) => {
        if (project_type === 'discord_dashboard') return ['Discord Dashboards', 'Product UX & Design Systems', 'Motion & Interaction', 'Quality & Optimization'].includes(guide.category);
        if (project_type === 'landing_page' || project_type === 'portfolio') return ['Frontend Design', 'Motion & Interaction', 'Research & Design References', 'Quality & Optimization'].includes(guide.category);
        if (project_type === 'design_system') return ['Frontend Design', 'Product UX & Design Systems', 'Engineering Workflow'].includes(guide.category);
        return ['Full-Stack Engineering', 'Framework Documentation', 'Vercel & Delivery', 'Engineering Workflow', 'Quality & Optimization'].includes(guide.category);
      }).map(({ id, title, category, whenToUse }) => ({ id, title, category, whenToUse })).slice(0, 8);
      return { content: [{ type: 'text', text: JSON.stringify({ project_type, stack, recommendations: ranked.map(({ id, title, category, description, difficulty, relevanceScore, whyRecommended }) => ({ id, title, category, description, difficulty, relevanceScore, whyRecommended })), relevantPlaybooks: relatedGuides, usageNote: 'Load the top few relevant skills rather than dumping every skill into one prompt. Verify current library APIs with Context7 and run the actual tests before claiming implementation success.' }, null, 2) }] };
    },
  );

  server.registerTool(
    'create_build_plan',
    {
      title: 'Create an implementation plan with quality gates',
      description: 'Build a staged plan for a website, full-stack app, Discord dashboard or MCP server using the brief and the library. Returns tasks, recommended skills, decision gates and verifications; does not create repository files or deploy code.',
      inputSchema: z.object({
        project_type: z.enum(projectTypes),
        description: z.string().min(20).max(5000),
        stack: z.string().max(500).default('Inspect the repository; do not assume a stack'),
        animation_level: z.enum(['subtle', 'balanced', 'expressive']).default('balanced'),
        backend: z.string().max(500).default('Not decided'),
        constraints: z.array(z.string().max(240)).max(20).default([]),
      }),
    },
    async ({ project_type, description, stack, animation_level, backend, constraints }) => {
      const ranked = rankSkills({ brief: description, projectType: project_type, stack, priorities: constraints }).slice(0, 18);
      const phases = [
        { phase: '1. Brief and evidence', tasks: [
          'Write the primary user job, audience, routes, success condition and non-goals.',
          'Inventory existing code, tokens, shared components, API contracts, permissions and test commands before deciding architecture.',
          'For visual work, draft distinct composition directions and pick one grounded in the product; for product/admin UI, resolve shared behavior owners before coding.',
          'For version-sensitive APIs, resolve the exact library in Context7 and retrieve current docs. Use TubeAlfred for targeted tutorial context only when useful.',
        ] },
        { phase: '2. Contracts and system design', tasks: [
          'Define the data/API contract, trust boundaries, server-side permissions and failure taxonomy.',
          'Create/update DESIGN.md for durable visual decisions and UX-CONTRACT.md for substantial multi-screen behavior when justified.',
          'Define loading, empty, no-results, error, stale/conflict, disabled, busy and success states before polishing the happy path.',
          'Define a small set of reusable design, spacing, type and motion tokens; document the signature visual element and its purpose.',
        ] },
        { phase: '3. Thin vertical implementation', tasks: [
          'Split work into small tasks with exact files, interfaces, tests and acceptance criteria.',
          'For behavior changes, demonstrate a failing regression test before implementing the smallest correct fix; refactor only while tests stay green.',
          'Build one end-to-end primary journey through UI, server validation, authorization and persistence before expanding to secondary features.',
          `Apply the requested motion level (${animation_level}) without blocking actions; preserve a reduced-motion alternative.`,
        ] },
        { phase: '4. Verification and release', tasks: [
          'Run the project’s actual typecheck, lint, unit/integration tests and production build; capture observed results.',
          'Exercise keyboard-only operation, narrow mobile, focus visibility, errors, denied access, retry, stale requests and duplicate submit paths.',
          'For MCP/Vercel, test initialization, tool discovery and a real tool invocation; a browser GET is only a reachability check.',
          'Review spec compliance separately from code quality. Inspect preview/production logs and state exactly what was or was not deployed.',
        ] },
      ];
      return { content: [{ type: 'text', text: JSON.stringify({ project_type, description, stack, backend, animation_level, constraints, phases, recommended_skill_ids: ranked.map(({ id, title, category, relevanceScore, whyRecommended }) => ({ id, title, category, relevanceScore, whyRecommended })), relevant_playbooks: guides.filter((guide) => project_type === 'discord_dashboard' ? ['Discord Dashboards', 'Product UX & Design Systems'].includes(guide.category) : project_type === 'landing_page' || project_type === 'portfolio' ? ['Frontend Design', 'Motion & Interaction'].includes(guide.category) : ['Engineering Workflow', 'Quality & Optimization', 'Vercel & Delivery', 'Framework Documentation'].includes(guide.category)).map(({ id, title }) => ({ id, title })).slice(0, 8), status: 'Plan generated only; no repository was edited, tests were run, or deployment performed.' }, null, 2) }] };
    },
  );

  server.registerTool(
    'create_design_contract',
    {
      title: 'Draft durable design and UX contracts',
      description: 'Produce starter DESIGN.md and UX-CONTRACT.md content for an application. The output intentionally leaves visual values and domain rules to be grounded in the real brief/repository.',
      inputSchema: z.object({ project_type: z.enum(projectTypes), brief: z.string().min(20).max(5000), existing_system: z.string().max(3000).default('Not inspected yet') }),
    },
    async ({ project_type, brief, existing_system }) => {
      const design = `# DESIGN.md — project visual contract\n\n## Product and audience\n${brief}\n\n## Existing system evidence\n${existing_system}\n\n## Visual thesis\n- Product-specific visual idea: derive from the product's subject, audience and content; do not select a default aesthetic without rationale.\n- Signature element: choose one memorable element and keep surrounding UI disciplined.\n\n## Canonical tokens\n- Color: define semantic canvas/surface/text/border/brand/focus/status tokens with accessible contrast.\n- Typography: define display, body, utility/data roles, weights and type scale.\n- Spacing/layout: define spacing rhythm, content width, grid, breakpoint behavior and overflow ownership.\n- Shape/elevation: define semantic radii, border, shadow and layering tokens.\n- Motion: define duration/easing, intended use and reduced-motion behavior.\n\n## Shared components and owners\n- Record the canonical owner and allowed business variants for buttons, fields, dialogs, alerts/toasts, navigation, tables and menus.\n\n## Anti-references\n- List patterns rejected for this product and why; do not ban a style globally without context.\n\n## Verification\n- Compare desktop and mobile screenshots to the brief.\n- Check semantic controls, keyboard focus, contrast and reduced motion.\n- Record exact commands/results for automated checks.\n`;
      const ux = `# UX-CONTRACT.md — product behavior contract\n\n## Product scope\n- Project type: ${project_type}\n- Brief: ${brief}\n\n## Route and state ownership\n- List route owners, navigation, active context, URL state and return behavior.\n- Name canonical shared owners for forms, validation, toasts/status regions, dialogs, tables, filters and scroll surfaces.\n\n## Operation contract\nFor each create/edit/delete/search/invite/publish/configure operation define: trigger label, pending state, duplicate-submit policy, success destination, feedback, failure recovery and focus outcome.\n\n## State matrix\nDefine applicable default, hover, focus, pressed, selected, disabled, busy, success, warning, field/form error, empty, no-results, stale data, offline, conflict, session-expired and permission-changed states.\n\n## Security and data handling\n- Document server-side authorization, data scope, secret boundaries, rate limits, idempotency and audit requirements.\n\n## Accessibility and responsive behavior\n- Keyboard/touch equivalence, accessible names, focus restoration, zoom/reflow, virtual keyboard and reduced-motion behavior.\n\n## Verification evidence\n- List actual test/lint/build commands and browser state checks. Keep planned checks separate from executed checks.\n`;
      return { content: [{ type: 'text', text: JSON.stringify({ project_type, design_md: design, ux_contract_md: ux, notice: 'Templates only. Inspect the repository and authoritative domain/API rules, replace placeholders, update runtime tokens/components in the same change, and do not treat template presence as verification.' }, null, 2) }] };
    },
  );

  server.registerTool(
    'research_playbook',
    {
      title: 'Plan research across Context7, Superdesign, TubeAlfred and Superpowers',
      description: 'Return a safe, source-aware research workflow for design or engineering questions. It never claims that tools ran unless they actually ran in the agent environment.',
      inputSchema: z.object({ question: z.string().min(10).max(3000), stack: z.string().max(500).default('Not known'), need_visual_variants: z.boolean().default(false), need_video_research: z.boolean().default(false), code_change_risk: z.enum(['low', 'medium', 'high']).default('medium') }),
    },
    async ({ question, stack, need_visual_variants, need_video_research, code_change_risk }) => {
      const workflow = [
        { tool: 'Context7', use: 'Resolve the exact library ID and installed version first, then query one narrow API concept per request. Prefer high-reputation official docs; keep the version and relevant URL with the implementation decision.' },
        { tool: 'Frontend Design + Frontend Design Premium', use: 'Ground the visual direction in the real product and audience. For product/admin UI, inspect canonical components, DESIGN.md/UX-CONTRACT.md, async states and verification contract; do not force those contracts onto a static marketing page.' },
        { tool: 'Superdesign', use: need_visual_variants ? 'Run CLI preflight and inspect auth first. Classify existing/new target and initialize real codebases before draft generation. Compare structural variants, read canvas URLs from actual output, and get user approval before implementation unless explicitly waived.' : 'Use only if a canvas/visual iteration adds value. Do not generate a canvas for a question that only needs source research.' },
        { tool: 'TubeAlfred', use: need_video_research ? 'Search narrowly, screen videos by date/channel/relevance, inspect transcript only when useful, then transform the pattern into original notes and verify API/security claims against primary docs.' : 'Skip video research unless a tutorial or creator explanation materially fills a gap.' },
        { tool: 'Superpowers workflow', use: code_change_risk === 'high' ? 'Use explicit spec/plan, red-green-refactor tests, root-cause debugging, separate spec-compliance and code-quality reviews, and evidence-based final verification.' : 'Use a proportionate brief, bite-sized implementation plan, relevant tests and explicit verification.' },
      ];
      return { content: [{ type: 'text', text: JSON.stringify({ question, stack, code_change_risk, workflow, sourceOrder: ['Product brief/repository contracts', 'Official library or API documentation', 'Context7 version-matched snippets', 'Superdesign visual exploration', 'TubeAlfred tutorial context'], reportingRules: ['Record sources and versions for current technical claims.', 'Do not copy tutorial/design work verbatim; synthesize original recipes.', 'Do not report CLI/tool actions as completed unless tool output confirms them.', 'Separate verified evidence, inference and remaining checks.'] }, null, 2) }] };
    },
  );

  server.registerTool(
    'audit_web_project',
    {
      title: 'Create a production-quality audit checklist',
      description: 'Return scoped checks for design, behavior, accessibility, engineering and release readiness. This is an audit plan—not a claim that the code has been inspected or tested.',
      inputSchema: z.object({ project_type: z.enum(['general', 'discord_dashboard', 'landing_page', 'full_stack_app', 'mcp_server']), has_auth: z.boolean().default(false), has_database: z.boolean().default(false), uses_motion: z.boolean().default(true), has_forms: z.boolean().default(true), has_tables: z.boolean().default(false), target_mobile: z.boolean().default(true) }),
    },
    async ({ project_type, has_auth, has_database, uses_motion, has_forms, has_tables, target_mobile }) => {
      const sections: Record<string, string[]> = {
        design: ['Visual direction follows the product and audience rather than a generic template.', 'Type, color, spacing and shape use canonical tokens; durable choices are documented.', 'No false affordances, fabricated data, or decorative complexity that obscures the primary task.'],
        interaction: ['Every action has a real button/link and truthful label.', 'Loading, empty, no-results, success, error, stale and recovery states exist where applicable.', 'Async mutations prevent duplicate submits and do not show success before confirmation.'],
        accessibility: ['Semantic HTML, accessible names, focus-visible, keyboard order, contrast and non-color status cues are checked.', 'Dialog focus/escape/restoration, errors and disabled/busy states are checked.'],
        verification: ['Run actual typecheck, lint, unit/integration tests and production build; record commands and results.', 'Review source and rendered UI; do not treat static scans as proof of runtime behavior.', 'Separate completed checks from unrun checks and deployment claims.'],
      };
      if (uses_motion) sections.motion = ['Animation has an explicit communication purpose and does not block actions.', 'prefers-reduced-motion and interrupted/rapid transitions are tested.', 'Transforms/opacity and bounded layout work are preferred; no false progress.'];
      if (has_auth) sections.security = ['Every protected operation checks authorization on the server, not only in UI.', 'Session expiry, revocation, 401/403 and safe draft recovery have defined behavior.', 'OAuth state, redirects, scopes and tokens are reviewed.'];
      if (has_database) sections.data = ['Constraints, indexes, migrations, access policies and transaction boundaries are reviewed.', 'Secrets remain server-only; tenant boundaries are tested with denied cases.', 'Stale updates, retries and conflicts cannot silently overwrite newer data.'];
      if (has_forms) sections.forms = ['Fields have visible labels and associated help/errors.', 'Server/client validation agree; invalid submits preserve safe values and focus the first error.', 'Duplicate submits, unsaved changes, API failures and retry are covered.'];
      if (has_tables) sections.tables = ['Pagination or cursor behavior matches the real API.', 'Selection scope, filter/sort restoration, empty/error states and boundary pages are checked.', 'Narrow-screen representation and scroll ownership preserve access to every action.'];
      if (target_mobile) sections.mobile = ['Check narrow viewport, touch targets, virtual keyboard, safe areas, horizontal overflow and sticky focus obstruction.', 'Hover-dependent behavior has a touch/keyboard alternative.'];
      if (project_type === 'discord_dashboard') sections.discord = ['Active guild context is unmistakable and stale requests from a prior guild cannot overwrite current state.', 'User identity, guild membership, bot installation, bot permissions and OAuth scopes are distinct checks.', 'Rate limits, missing permissions, bot-offline state, config failure and role hierarchy are handled.'];
      if (project_type === 'landing_page') sections.marketing = ['The value proposition and primary action are clear without scrolling.', 'Metadata, social previews, image dimensions, content truthfulness and page weight are checked.'];
      if (project_type === 'mcp_server') sections.mcp = ['Test protocol initialization, tools/list, schema rejection, representative tool invocation and upstream errors.', 'Public unauthenticated endpoints expose only safe read-only capabilities.', 'Tool descriptions make capability limits clear and never overclaim external actions.'];
      return { content: [{ type: 'text', text: JSON.stringify({ project_type, sections, status: 'Checklist generated only. Items have not been independently audited or tested.' }, null, 2) }] };
    },
  );
}, { serverInfo: { name: 'aero-design-engine', version: '2.0.0' } });

export { handler as GET, handler as POST };
