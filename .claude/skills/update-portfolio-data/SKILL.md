---
name: update-portfolio-data
description: >
  Add or modify portfolio data: projects, experiences, education, skills, or personal info.
  Use when the user says "add a new project", "update my experience", "I just started a new job",
  "add a skill", "change my title", or wants to modify any portfolio content displayed on the site.
  All data lives in a single source of truth file.
user-invocable: true
argument-hint: "[what to update]"
allowed-tools: Read, Edit, Write, Grep, Bash
version: "1.0.0"
---

# Update Portfolio Data

**Single source of truth:** `src/constants/data.ts`
**Type definitions:** `src/types/index.ts`

ALL portfolio content lives in `data.ts`. Never create separate data files.

## Data Schemas

### Add a Project
Insert into the `projects` array — **newest first** (homepage shows `projects.slice(0, 3)`).

```ts
{
  title: "Project Name",
  description: "One-liner description of the project",
  image: "/images/projects/project-name.jpg",    // optional
  github: "https://github.com/user/repo",         // optional
  demo: "https://demo-url.com",                    // optional
  status: "In Progress",                           // "Focusing" | "In Progress" | "Maintaining" | "Completed"
  techStacks: ["Next.js", "TypeScript", "Tailwind CSS"],
  date: "2024-01",                                 // optional, YYYY-MM format
  blogSlugs: ["related-post-slug"],                // optional
}
```

If the project has an image, remind user to add it to `public/images/projects/`.

### Add an Experience
Insert into the `experiences` array — **newest first**.

```ts
{
  title: "Job Title",
  company: "Company Name",
  companyUrl: "https://company.com",              // optional
  location: "City, Country",
  type: "Full-time",                               // "Full-time" | "Internship" | "Part-time" | "Contract"
  startDate: "2024-01",
  endDate: undefined,                              // undefined = renders as "Present"
  description: "What the company does and your role",
  responsibilities: ["Built X using Y", "Led Z initiative"],
  skills: ["React", "TypeScript", "GraphQL"],
  logo: "/images/companies/company-logo.png",
  blogSlugs: [],                                   // optional
}
```

If `endDate` is `undefined`, it displays as "Present". Add company logo to `public/images/companies/`.

### Update Skills
Modify the `skills` object:

```ts
skills: {
  languages: ["TypeScript", "JavaScript", "Java", "Go"],
  frameworks: ["Next.js", "React", "Express", "Node.js", "Flutter"],
  databases: ["PostgreSQL", "MySQL"],
  tools: ["Git", "Docker", "Postman", "Supabase"],
}
```

### Update Personal Info
Modify the `personalInfo` object at the top of `data.ts`:
- Key fields: `name`, `title`, `summary`, `contact.*`
- Profile picture: `profilePicture`, memoji: `memoji`

### Add an Education
Insert into the `educations` array:
- Fields: `degree`, `institution`, `location`, `startDate`, `endDate`, `gpa`, `logo`, `achievements`

## Verification
After any data change:
1. Run `npm run build` — TypeScript catches schema violations
2. Verify the updated data renders correctly on the relevant page

## Reference Files
- Data: `src/constants/data.ts`
- Types: `src/types/index.ts`
- Nav items: `src/constants/navItems.ts`
- Sections consuming data: `src/components/sections/*.tsx`
- Project card: `src/components/project-card.tsx`
- Experience card: `src/components/experience/experience-card.tsx`
