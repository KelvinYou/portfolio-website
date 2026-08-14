import { join } from "node:path";
import { Font, StyleSheet } from "@react-pdf/renderer";

const fontDirectory = join(process.cwd(), "public", "assets", "fonts");

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: join(fontDirectory, "open-sans-v17-latin-regular.ttf"),
      fontWeight: 400,
    },
    {
      src: join(fontDirectory, "open-sans-v17-latin-600.ttf"),
      fontWeight: 600,
    },
    {
      src: join(fontDirectory, "open-sans-v17-latin-700.ttf"),
      fontWeight: 700,
    },
  ],
});

export const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontFamily: "Open Sans",
    fontSize: 9.5,
    lineHeight: 1.35,
    color: "#2d3748",
  },
  section: {
    marginBottom: 5,
  },
  header: {
    marginBottom: 6,
    borderBottom: "2px solid #4a5568",
    paddingBottom: 7,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  name: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 3,
    color: "#1a202c",
  },
  title: {
    fontSize: 11.5,
    color: "#4a5568",
    marginBottom: 6,
    fontWeight: 600,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  contactItem: {
    marginRight: 14,
    marginBottom: 2,
    fontSize: 8.5,
  },
  contactLabel: {
    fontWeight: 600,
    color: "#2d3748",
  },
  contactText: {
    color: "#4a5568",
  },
  contactLink: {
    color: "#2b6cb0",
    textDecoration: "none",
  },
  sectionTitle: {
    fontSize: 10.5,
    fontWeight: 700,
    marginBottom: 5,
    color: "#1a202c",
    borderBottom: "1px solid #cbd5e0",
    paddingBottom: 3,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  summaryText: {
    fontSize: 9.2,
    color: "#4a5568",
  },
  itemContainer: {
    marginBottom: 5,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  itemTitle: {
    fontWeight: 700,
    fontSize: 9.5,
    color: "#2d3748",
  },
  itemCompany: {
    flex: 1,
    fontSize: 9.5,
    fontWeight: 700,
    color: "#2d3748",
  },
  itemDate: {
    marginLeft: 8,
    fontSize: 8.5,
    color: "#4a5568",
    fontWeight: 400,
  },
  itemLocation: {
    fontSize: 8.5,
    color: "#4a5568",
    marginBottom: 3,
  },
  bulletList: {
    marginTop: 3,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bulletPoint: {
    width: 8,
    fontSize: 8.5,
    color: "#2b6cb0",
  },
  bulletText: {
    flex: 1,
    fontSize: 8.7,
    lineHeight: 1.3,
    paddingLeft: 2,
  },
  projectDescription: {
    fontSize: 8.7,
    lineHeight: 1.3,
  },
  skillContainer: {
    flexDirection: "row",
    marginBottom: 2,
  },
  skillTitle: {
    width: 92,
    fontWeight: 700,
    fontSize: 8.7,
    color: "#2d3748",
  },
  skillItem: {
    flex: 1,
    fontSize: 8.7,
    color: "#4a5568",
  },
});
