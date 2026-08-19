import { Icons } from "@/components/icons";

/** A separate page. */
export interface NavItem {
  name: string;
  href: string;
  /** Key under the `nav` message namespace. */
  labelKey: string;
  icon?: keyof typeof Icons;
}

/** A position inside the homepage document. */
export interface SectionItem {
  /** Matches the `id` on the rendered `<section>`. */
  id: string;
  /** Key under the `nav` message namespace. */
  labelKey: string;
}

export interface Experience {
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  type: string;
  startDate: string;
  endDate?: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  logo: string;
  projects?: WorkProject[];
  blogSlugs?: string[];
}

/** Something delivered inside a role. Rendered nested in the experience cards. */
export interface WorkProject {
  title: string;
  description: string;
  demo?: string;
  github?: string;
  techStacks: string[];
}

/**
 * What kind of thing a project is. Drives the grouping on /projects — a shipped
 * product and a course assignment are not the same claim and shouldn't sit in
 * the same list.
 */
export type ProjectKind = "system" | "product" | "coursework";

/**
 * What a reader can actually do with the project right now. This replaced the
 * old `status` field ("In Progress" / "Focusing" / …), which answered a question
 * nobody asked and left 5 of 9 projects in one bucket.
 */
export type ProjectAccess =
  /** Has a demo or a repo. Requires at least one entry in `links`. */
  | "public"
  /** Deliberately closed, or the artifact is gone. Rendered as a visible gap. */
  | "private"
  /** Mid-flight; there is nothing to look at yet. */
  | "building";

/**
 * One measured result. `value` is typeset large in mono and aligns down a shared
 * column across the whole list, so keep it short — a number, a unit, a formula.
 */
export interface ProjectOutcome {
  value: string;
  label: string;
}

export interface ProjectLinks {
  repo?: string;
  demo?: string;
}

export interface Project {
  title: string;
  kind: ProjectKind;
  /** Lifted to the homepage. Exactly three: one lead and two supporting. */
  featured?: boolean;
  /** One line on the hard part — not a summary of what the thing is. */
  claim: string;
  /**
   * Measured results, at most two. Leaving this off is a real choice: the row
   * renders an explicit "no measured result" mark rather than hiding the gap.
   */
  outcome?: ProjectOutcome[];
  links?: ProjectLinks;
  access: ProjectAccess;
  year: number;
  techStacks: string[];
  blogSlugs?: string[];
}

/**
 * What area a skill belongs to. This is the axis the resume PDF groups by,
 * because a one-page scan wants "does he have the data layer" answered fast.
 */
export type SkillDomain = "core" | "ai" | "data" | "delivery" | "tools";

/**
 * How far a skill has actually gone. This is the axis the website groups by —
 * a reader already knows PostgreSQL is a database, and can't tell from a flat
 * list whether it ever carried a paying customer.
 *
 * The same honesty rule as `ProjectAccess`: the weak tiers are rendered, not
 * hidden, because that is what makes the top tier believable.
 */
export type SkillDepth =
  /** Ran in production with real users — a job, or a product people pay for. */
  | "shipped"
  /** Runs in something of mine with a public repo, but no paying users. */
  | "built"
  /** University capstone or assignment. No production hours. */
  | "coursework"
  /** Studied, never shipped. Rendered as a visible gap; kept off the resume. */
  | "gap";

export interface Skill {
  name: string;
  domain: SkillDomain;
  depth: SkillDepth;
}

/**
 * A credential, in the register a transcript uses. The old shape was a bag of
 * strings — a 200-word `description` that pasted the whole syllabus, and an
 * `achievements` array whose first entry restated the CGPA that was already
 * sitting unrendered in the `cgpa` field.
 *
 * `cgpa` is kept as a string on purpose: it carries the transcript's own
 * precision (`3.7439`, not `3.74`), and rounding it in the type would throw
 * away the detail that makes it read as transcribed rather than claimed.
 */
export interface Education {
  degree: string;
  /** Mono eyebrow, e.g. `Bachelor (Hons)`. The credential's level, not its subject. */
  level: string;
  institution: string;
  institutionUrl?: string;
  location: string;
  startDate: string;
  endDate: string;
  /** One line on what was actually studied. Not a syllabus. */
  focus: string;
  cgpa: string;
  /**
   * The one distinction worth setting beside the CGPA, e.g. `Dean's List`.
   * Leaving it off renders nothing — the same honest-blank rule the projects
   * ledger uses, and what keeps the entry that has one credible.
   */
  honor?: { label: string; detail: string };
  /** Claims about the work. The CGPA never appears here — it has its own column. */
  achievements: string[];
  coursework: { core: string[]; electives?: string[] };
  /** Documents on file. A credential nobody can check is a claim, not a record. */
  documents: { certificate?: string; transcript?: string };
  logo?: string;
  techStacks: string[];
}
