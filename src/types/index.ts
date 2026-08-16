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
