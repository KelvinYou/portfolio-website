# Portfolio Content Guide

Paths in this document are relative to the repository root. Examples illustrate writing patterns; verify every metric against evidence before publishing.

Bracketed values such as `[N]%` or `[N]-row` are placeholders, never facts. Fill one only with a number the owner has measured or can count, or drop that clause. Earlier versions of these examples used concrete numbers, and they were copied verbatim into the live resume as if they were the owner's results.

### Data Management
- **All portfolio data** lives in `src/constants/data.ts`. This is the single source of truth.
- **Structure:** `personalInfo`, `experiences[]`, `educations[]`, `projects[]`, `skills{}`.
- **Adding a project:** Add to the `projects` array in `data.ts`. The homepage shows `projects.slice(0, 3)`.
- **Adding an experience:** Add to the `experiences` array (newest first).
- **Project statuses:** `"Focusing"` | `"In Progress"` | `"Maintaining"` | `"Completed"`

### Experience Data Best Practices (Senior Engineer Focus)

**Philosophy:** Every word must answer "Why should we hire you?" If it doesn't, cut it.

#### Content Guidelines

**1. Descriptions (One-line impact statements)**
```typescript
// GOOD: Scale + specificity
"Building enterprise property management SaaS. [N]+ properties, [N]+ maintenance tickets monthly."
"Analytics platform for [named client studios]. [N] events/day."

// BAD: Generic, no scale
"Leading frontend architecture for a property management platform."
"Worked on analytics features for game companies."
```

**Rules:**
- Use the description limit in [Character limits](#character-limits-strict).
- Lead with scale: user count, data volume, transaction volume
- Be specific: name technologies, name companies
- Use active voice: "Building", "Shipped", "Fixed"
- Drop filler: "Responsible for", "Helped with", "Worked on"

**2. Responsibilities (3 bullets max, metrics-driven)**
```typescript
// GOOD: Specific + metrics + outcome (metrics must come from evidence)
"Component library with compound patterns, TypeScript generics. [N]% faster feature delivery, [N]KB smaller bundle."
"Performance: [rendering technique], Web Workers for parsing. [N]s loads on [N]-row tables."
"Fixed connection pool bug causing peak-hour failures. HikariCP + JMX monitoring → [N]% uptime."

// GOOD without a metric: mechanism + consequence, defensible in an interview
"Apollo cache: cache.modify list writes instead of refetchQueries, so new tickets skip a full list refetch."

// BAD: Task lists without impact
"Built component library using React and TypeScript."
"Improved application performance through various optimizations."
"Fixed bugs and improved system stability."
```

**Rules:**
- Each bullet: **What you built + How you built it + Supported outcome**. Use a measurable outcome when evidence exists; otherwise describe a concrete qualitative result.
- Include percentages only when supported by evidence; do not invent them to match an example.
- Include scale when supported by evidence; a missing metric is not permission to guess.
- Name specific tools/patterns: "Apollo Client", "compound patterns", "HikariCP"
- Use the responsibility limit in [Character limits](#character-limits-strict).
- No generic verbs: Avoid "helped", "assisted", "contributed to"

**3. Company Names (Context over formality)**
```typescript
// GOOD: Adds context
"Beyondsoft (Tencent)"
"Finexus (Fintech)"
"Techtics (Web3)"

// BAD: Legal entity names
"Beyondsoft (Malaysia) Sdn. Bhd."
"Finexus International Sdn. Bhd."
"Techtics Blockchain PLT"
```

**4. Skills (7-8 max, most impactful first)**
```typescript
// GOOD: Specific, current, impactful
skills: ["React", "TypeScript", "GraphQL", "Apollo Client", "Zustand", "Material UI", "Storybook"]

// BAD: Too many, includes basics
skills: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "Git", "GitHub", "VS Code", "npm", "Webpack"]
```

**Rules:**
- Order by impact: frameworks first, then specialized tools
- Remove universal tools: Git, npm, VS Code
- Keep to technologies used in responsibilities
- Max 8 skills per role

**5. Projects (Concise, scale-focused)**
```typescript
// GOOD
{
  title: "LessenPro",
  description: "Scheduling engine, vendor coordination, maintenance tracking. [N]+ properties managed.",
  techStacks: ["React", "TypeScript", "GraphQL", "Material UI", "Apollo Client"]
}

// BAD: Verbose
{
  title: "LessenPro - Property Management SaaS Platform",
  description: "A comprehensive enterprise SaaS platform for property management that includes scheduling, vendor workflows, and dashboards.",
  techStacks: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "GraphQL", ...]
}
```

#### Character Limits (Strict)
- Role description: **100 characters maximum**, including spaces.
- Each responsibility bullet: **120 characters maximum**, including spaces.
- Skills array: **8 items maximum**.
- Project description: **100 characters maximum**, including spaces.
- Shorter wording is welcome; these are ceilings, not minimum lengths. This section owns the limits; examples illustrate structure and must be checked before reuse.

#### Language Style

**Active voice:**
```diff
- "Was responsible for building..."
+ "Built..."

- "Helped improve performance..."
+ "Performance: Virtual scrolling, Web Workers. [N]s loads."

- "Worked on component library..."
+ "Component library with compound patterns. [N]% faster delivery."
```

**Specificity:**
```diff
- "Improved performance"
+ "[N]% faster initial loads, [N]% smaller bundles"

- "Built dashboards"
+ "Analytics dashboards processing [N]-row datasets"

- "Used React hooks"
+ "Custom hooks ([hook names that exist in the codebase])"
```

**Conciseness:**
```diff
- "Implemented virtual scrolling using react-window library for rendering massive tables with more than [N] rows"
+ "Virtual scrolling ([N] rows), Web Workers for parsing"

- "Established comprehensive testing standards including Jest unit tests and integration tests for critical user paths"
+ "Jest standards, mandatory reviews. [N]% fewer bugs."
```

#### Role Prioritization

**Full-time roles:** Full detail (3 bullets, projects, all context)
**Internships:** Condensed (2-3 bullets, key learnings, metrics)
**Old roles (3+ years):** Consider removing if not adding value for senior-level hiring

#### What to Remove

**❌ Remove these:**
- Generic statements: "Worked with team", "Collaborated with stakeholders"
- Process descriptions: "Participated in daily standups", "Created tickets in Jira"
- Obvious tasks: "Fixed bugs", "Wrote unit tests" (unless with specific impact)
- Over-explanation: Don't explain what React is, what GraphQL does, etc.
- First jobs if 3+ years old and not relevant to senior roles

**✅ Keep these:**
- Specific metrics: percentages, user counts, performance numbers
- Architecture decisions: "Chose X over Y because Z"
- Scale indicators: data volume, user counts, transaction rates
- Technical depth: specific libraries, patterns, optimizations
- Business impact: cost savings, revenue generated, time saved

#### Personal Summary Guidelines

```typescript
// GOOD: Concise, metrics, differentiation
`Frontend Engineer who ships fast without breaking things. Built dashboards
serving [N] users for [named client]. [N]+ years specializing in performance
([N]% faster loads), architecture (GraphQL layers), and scale ([N]-row tables).

0→1 startups + enterprise experience. I know when to move fast and when to architect for growth.

Currently building SaaS with Next.js + Supabase. Exploring system design patterns.`

// BAD: Verbose, generic
`I am a passionate Frontend Engineer with extensive experience in building
modern web applications. I have worked with various technologies and frameworks
including React, TypeScript, and many others. I am always eager to learn new
things and improve my skills. I believe in writing clean code and creating
great user experiences.`
```

**Rules:**
- Paragraph 1: Hook + scale + years + expertise areas with metrics
- Paragraph 2: Unique positioning (startup + enterprise, niche expertise)
- Paragraph 3: Current work + learning direction
- Total: 300-400 characters
- Remove: "passionate", "extensive experience", "eager to learn", generic personality statements

#### Examples of Good vs. Bad

**Full-time Role:**
```typescript
// ✅ GOOD
{
  title: "Frontend Engineer",
  company: "Simpletruss",
  description: "Building enterprise property management SaaS. [N]+ properties, [N]+ maintenance tickets monthly.",
  responsibilities: [
    "Component library with compound patterns, TypeScript generics. [N]% faster feature delivery, [N]KB smaller bundle.",
    "GraphQL layer: Apollo Client, [N]% cache hit rate, custom hooks. Type-safe, zero prop-drilling.",
    "Performance: Code splitting, virtualization for [N]+ rows. [N]% faster initial loads."
  ],
  skills: ["React", "TypeScript", "GraphQL", "Apollo Client", "Zustand", "Material UI", "Storybook"]
}

// ❌ BAD
{
  title: "Frontend Engineer",
  company: "Simpletruss Sdn Bhd",
  description: "Responsible for leading the frontend architecture team and working on various features for our property management platform.",
  responsibilities: [
    "Built and maintained React component library using best practices and modern patterns.",
    "Worked with the team to implement GraphQL integration and improve data fetching strategies.",
    "Collaborated with designers and backend engineers to deliver features on time.",
    "Participated in code reviews and helped improve code quality across the team.",
    "Optimized application performance using various techniques and tools."
  ],
  skills: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "GraphQL", "REST API", "Git", "GitHub", "Jira", "Figma"]
}
```

**Internship:**
```typescript
// ✅ GOOD
{
  title: "Blockchain Engineer Intern",
  company: "Techtics (Web3)",
  description: "Ethereum dApp during 2020 DeFi boom. Smart contracts, gas optimization, MetaMask.",
  responsibilities: [
    "Solidity contracts: Reentrancy guards, gas estimation UI. Deployed to mainnet.",
    "Gas optimization: IPFS storage, batched transactions. [before] → [after] gas ([N]% savings).",
    "jQuery → React: [N] lines → [N] components, Redux state. [N]% fewer bugs."
  ],
  skills: ["React", "TypeScript", "Solidity", "MetaMask", "Node.js", "Express", "Redux"]
}

// ❌ BAD
{
  title: "Software Engineer (Intern)",
  company: "Techtics Blockchain PLT",
  description: "Internship position where I learned about blockchain technology and worked on various projects related to Ethereum and decentralized applications.",
  responsibilities: [
    "Learned Solidity programming language and wrote smart contracts for various use cases.",
    "Helped migrate the legacy codebase from jQuery to modern React framework.",
    "Assisted senior developers with implementing features and fixing bugs.",
    "Attended team meetings and participated in code reviews.",
    "Gained experience with Web3 technologies including MetaMask and Ethereum."
  ],
  skills: ["HTML", "CSS", "JavaScript", "React", "jQuery", "Solidity", "Blockchain", "Ethereum", "Web3", "Git"]
}
```
