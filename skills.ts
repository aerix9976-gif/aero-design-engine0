import catalog from './skill-catalog.json';
import guideCatalog from './skill-guides.json';

export type SkillInstructions = {
  purpose: string;
  useWhen: string;
  workflow: string[];
  topicSpecificRule: string;
  guardrails: string[];
  acceptanceCriteria: string[];
  deliverable: string;
  researchRules: string[];
  sourceBasis: string[];
};

export type Skill = {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructions: SkillInstructions;
};

export type SkillGuide = {
  id: string;
  title: string;
  category: string;
  whenToUse: string;
  prerequisites?: string[];
  workflow: string[];
  hardRules: string[];
  acceptance: string[];
  sources?: string[];
};

export const skills = catalog as Skill[];
export const guides = guideCatalog as SkillGuide[];
export const categoriesList = Array.from(
  skills.reduce((map, skill) => {
    map.set(skill.category, (map.get(skill.category) ?? 0) + 1);
    return map;
  }, new Map<string, number>()),
  ([name, count]) => ({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), name, count }),
);

export function findSkill(id: string): Skill | undefined {
  return skills.find((skill) => skill.id === id);
}

export function findGuide(id: string): SkillGuide | undefined {
  return guides.find((guide) => guide.id === id);
}

export function rankSkills(options: {
  brief: string;
  projectType?: string;
  stack?: string;
  priorities?: string[];
}): Array<Skill & { relevanceScore: number; whyRecommended: string }> {
  const query = `${options.brief} ${options.projectType ?? ''} ${options.stack ?? ''} ${(options.priorities ?? []).join(' ')}`
    .toLowerCase()
    .replace(/[^a-z0-9.+#-]+/g, ' ')
    .trim();
  const stopWords = new Set(['the', 'and', 'for', 'with', 'that', 'this', 'from', 'into', 'your', 'when', 'where', 'what', 'which', 'using', 'use', 'make', 'build', 'create', 'project', 'need', 'want', 'help', 'how', 'more', 'better', 'current', 'should', 'could', 'would', 'about', 'after', 'before', 'have', 'has', 'their', 'there', 'does', 'only', 'not', 'all']);
  const words = new Set(query.split(/\s+/).filter((word) => word.length > 2 && !stopWords.has(word)));
  const preferredCategories = new Set<string>();
  const p = (options.projectType ?? '').toLowerCase();
  if (p.includes('discord')) ['Discord Dashboards', 'Frontend Design', 'Product UX & Design Systems', 'Full-Stack Engineering'].forEach((x) => preferredCategories.add(x));
  if (p.includes('landing') || p.includes('portfolio')) ['Frontend Design', 'Motion & Interaction', 'Quality & Optimization'].forEach((x) => preferredCategories.add(x));
  if (p.includes('system') || p.includes('dashboard') || p.includes('saas')) ['Product UX & Design Systems', 'Frontend Design', 'Quality & Optimization'].forEach((x) => preferredCategories.add(x));
  if (p.includes('full') || p.includes('app') || p.includes('mcp')) ['Full-Stack Engineering', 'Framework Documentation', 'Vercel & Delivery', 'Engineering Workflow'].forEach((x) => preferredCategories.add(x));

  return skills.map((skill) => {
    const haystack = `${skill.title} ${skill.description} ${skill.category} ${skill.tags.join(' ')} ${skill.instructions.purpose} ${skill.instructions.topicSpecificRule}`
      .toLowerCase()
      .replace(/[^a-z0-9.+#-]+/g, ' ');
    let score = 0;
    for (const word of words) {
      if (skill.title.toLowerCase().includes(word)) score += 5;
      else if (skill.tags.some((tag) => tag.includes(word))) score += 3;
      else if (haystack.includes(word)) score += 1;
    }
    if (preferredCategories.has(skill.category)) score += 4;
    if (options.priorities?.some((priority) => `${skill.title} ${skill.tags.join(' ')}`.toLowerCase().includes(priority.toLowerCase()))) score += 5;
    return {
      ...skill,
      relevanceScore: score,
      whyRecommended: score > 10 ? `Strong overlap with the brief and its technical/design terms.` : preferredCategories.has(skill.category) ? `Relevant to the ${options.projectType ?? 'selected'} project workflow.` : `Potential supporting skill for a related implementation or verification task.`,
    };
  }).sort((a, b) => b.relevanceScore - a.relevanceScore || a.title.localeCompare(b.title));
}
