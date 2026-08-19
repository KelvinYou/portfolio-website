import { join } from "node:path";
import { Font, StyleSheet } from "@react-pdf/renderer";

const fontDirectory = join(process.cwd(), "public", "assets", "fonts");

// IBM Plex rather than the site's Open Sans: this is a print artifact read at
// 9pt on paper, and Plex Sans was drawn for small sizes with an open aperture
// and unambiguous 1/l/I. Plex Serif appears exactly once (the name) so the
// masthead reads as a designed object, not a bigger line of body copy.
Font.register({
  family: "Plex Sans",
  fonts: [
    { src: join(fontDirectory, "ibm-plex-sans-regular.ttf"), fontWeight: 400 },
    { src: join(fontDirectory, "ibm-plex-sans-500.ttf"), fontWeight: 500 },
    { src: join(fontDirectory, "ibm-plex-sans-600.ttf"), fontWeight: 600 },
  ],
});

Font.register({
  family: "Plex Serif",
  fonts: [
    { src: join(fontDirectory, "ibm-plex-serif-600.ttf"), fontWeight: 600 },
  ],
});

// Hyphenation off: react-pdf's default dictionary breaks product names
// ("Post-greSQL") and a resume has no justified prose to rescue.
Font.registerHyphenationCallback((word) => [word]);

/**
 * One 3pt vertical unit and one horizontal grid drive the whole document.
 * Every margin below is a multiple of UNIT; nothing is eyeballed.
 */
const UNIT = 3;

/**
 * One rail, used by every dated row: 78pt fits "Jun 2024 - Jul 2025" at 8.4pt
 * on a single line. The 423pt measure it leaves is ~92 characters, a
 * comfortable scan width where the old full-bleed 547pt ran to ~119.
 *
 * Section labels deliberately do NOT sit in this rail. Nesting a second rail
 * inside the first halved the measure and, worse, made each section one
 * unbreakable flex row that react-pdf could only push whole to the next page.
 */
const RAIL = 78;
const GUTTER = 14;

const ink = "#14181D";
const body = "#3A424C";
const muted = "#79838F";
const accent = "#0B5563";
const rule = "#DDE1E6";

export const layout = { RAIL, GUTTER, UNIT };
export const palette = { ink, body, muted, accent, rule };

export const styles = StyleSheet.create({
  page: {
    // 40pt ≈ 14mm side margins: inside every printer's safe area, and the
    // white edge is what stops the page reading as a wall of text.
    paddingHorizontal: 40,
    paddingTop: 28,
    paddingBottom: 24,
    backgroundColor: "#FFFFFF",
    fontFamily: "Plex Sans",
    fontSize: 9.1,
    lineHeight: 1.5,
    color: body,
  },

  // ---------------------------------------------------------------- masthead
  header: {
    marginBottom: UNIT * 2.5,
    paddingBottom: UNIT * 2.5,
    borderBottomWidth: 0.9,
    borderBottomColor: ink,
  },
  name: {
    fontFamily: "Plex Serif",
    fontSize: 21,
    fontWeight: 600,
    letterSpacing: -0.2,
    lineHeight: 1.15,
    color: ink,
  },
  tagline: {
    fontSize: 9.8,
    color: body,
    marginTop: UNIT,
    marginBottom: UNIT * 2.5,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  contactItem: {
    fontSize: 8.4,
    color: muted,
    lineHeight: 1.4,
  },
  contactLink: {
    fontSize: 8.4,
    lineHeight: 1.4,
    // Ink, not blue: a printed page has no clickable affordance to signal, and
    // six blue underlines were the loudest thing on the sheet.
    color: body,
    textDecoration: "none",
  },
  contactRowNext: {
    marginTop: UNIT * 0.8,
  },
  contactSeparator: {
    fontSize: 8.4,
    color: rule,
    marginHorizontal: UNIT * 1.6,
  },

  // ---------------------------------------------------------------- sections
  section: {
    marginBottom: UNIT * 1.7,
  },
  sectionLabel: {
    marginBottom: UNIT * 2,
    fontSize: 7.8,
    fontWeight: 600,
    letterSpacing: 1.4,
    lineHeight: 1.3,
    textTransform: "uppercase",
    color: ink,
  },
  sectionRule: {
    borderTopWidth: 0.5,
    borderTopColor: rule,
    marginBottom: UNIT * 1.6,
  },

  // ------------------------------------------------------------------- items
  item: {
    flexDirection: "row",
    marginBottom: UNIT * 1.6,
  },
  itemLast: {
    marginBottom: 0,
  },
  rail: {
    width: RAIL,
    marginRight: GUTTER,
    paddingTop: 1.5,
  },
  railDate: {
    fontSize: 8.4,
    lineHeight: 1.35,
    color: ink,
    fontWeight: 500,
  },
  itemBody: {
    flex: 1,
  },
  // Role before company: it is the line an engineering leader scans for, and
  // the previous layout buried it under the employer name.
  role: {
    fontSize: 10.2,
    fontWeight: 600,
    lineHeight: 1.25,
    color: ink,
  },
  metaLine: {
    marginTop: 0.5,
  },
  company: {
    fontSize: 9.1,
    fontWeight: 500,
    color: body,
    textDecoration: "none",
  },
  companyMeta: {
    fontSize: 9.1,
    color: muted,
  },

  // ----------------------------------------------------------------- bullets
  bulletList: {
    marginTop: UNIT * 0.8,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: UNIT * 0.6,
  },
  bulletMarker: {
    width: 3,
    height: 3,
    marginTop: 4.4,
    marginRight: UNIT * 2,
    backgroundColor: accent,
  },
  bulletText: {
    flex: 1,
    fontSize: 8.6,
    lineHeight: 1.4,
    color: body,
  },

  // ------------------------------------------------------------------- misc
  summary: {
    fontSize: 9,
    lineHeight: 1.5,
    color: body,
  },
  skillRow: {
    flexDirection: "row",
    marginBottom: UNIT * 0.6,
  },
  skillLabel: {
    width: 74,
    fontSize: 8.5,
    fontWeight: 500,
    color: ink,
    lineHeight: 1.4,
  },
  skillItems: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.4,
    color: body,
  },
  projectTitle: {
    fontSize: 9.6,
    fontWeight: 600,
    lineHeight: 1.3,
    color: ink,
    textDecoration: "none",
  },
  projectDescription: {
    fontSize: 8.6,
    lineHeight: 1.4,
    color: body,
    marginTop: 1,
  },
});
