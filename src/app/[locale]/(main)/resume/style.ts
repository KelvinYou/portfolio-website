import { Font, StyleSheet } from "@react-pdf/renderer";

// Register more professional fonts
Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf",
      fontWeight: 700,
    },
  ],
});

// Create styles for the modern resume — optimized for single A4 page
export const styles = StyleSheet.create({
  page: {
    padding: 15,
    fontFamily: "Open Sans",
    fontSize: 10,
    lineHeight: 1.4,
    color: "#2d3748",
  },
  section: {
    marginBottom: 6,
  },
  // Header section with subtle accent
  header: {
    marginBottom: 6,
    borderBottom: "2px solid #4a5568",
    paddingBottom: 6,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#1a202c",
  },
  title: {
    fontSize: 12,
    color: "#4a5568",
    marginBottom: 6,
    fontWeight: 600,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginRight: 18,
    fontSize: 9,
  },
  contactText: {
    color: "#4a5568",
  },
  contactLink: {
    color: "#3182ce",
    textDecoration: "none",
  },
  contactIcon: {
    width: 10,
    height: 10,
    marginBottom: 2,
  },

  // Modern section headers with subtle accent
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#1a202c",
    borderBottom: "1px solid #cbd5e0",
    paddingBottom: 3,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  summaryText: {
    fontSize: 9,
    color: "#4a5568",
    marginTop: 2,
  },

  // Experience & Education items with tight spacing
  itemContainer: {
    marginBottom: 6,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 10,
    color: "#2d3748",
  },
  itemCompany: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#2d3748",
  },
  itemDate: {
    fontSize: 9,
    color: "#4a5568",
    fontWeight: "normal",
  },
  itemLocation: {
    fontSize: 9,
    color: "#4a5568",
    marginBottom: 3,
  },
  companyLogo: {
    width: 24,
    height: 24,
  },

  // Cleaner bullets
  bulletList: {
    marginTop: 3,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bulletPoint: {
    width: 8,
    fontSize: 9,
    color: "#3182ce",
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    paddingLeft: 2,
  },

  // Skills section with better organization
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  skillCategory: {
    width: "25%",
    marginBottom: 6,
  },
  skillCategoryTitle: {
    fontWeight: "bold",
    fontSize: 10,
    marginBottom: 3,
    color: "#2d3748",
  },
  skillItem: {
    fontSize: 9,
    marginBottom: 2,
    color: "#4a5568",
  },
  skillContainer: {
    fontSize: 10,
    color: "#4a5568",
    display: "flex",
    flexDirection: "row",
    marginBottom: 1,
    fontFamily: "Open Sans",
  },
  skillTitle: {
    fontWeight: "bold",
    width: 70,
  },

  // Projects section styling
  projectTitle: {
    fontWeight: "bold",
    fontSize: 10,
    color: "#2d3748",
  },
  projectTech: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 3,
  },
  projectTechItem: {
    fontSize: 8,
    marginRight: 6,
    marginBottom: 2,
    backgroundColor: "#f7fafc",
    padding: "1 4",
    borderRadius: 2,
    color: "#4a5568",
  },
});
