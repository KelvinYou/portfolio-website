import { 
  StyleSheet, 
  Font 
} from '@react-pdf/renderer';

Font.register({
  family: 'Quicksand',
  fonts: [
    { src: '/assets/fonts/quicksand-v20-latin-regular.ttf' }, // Regular
    { src: '/assets/fonts/quicksand-v20-latin-300.ttf', fontWeight: 300 }, // Light
    { src: '/assets/fonts/quicksand-v20-latin-600.ttf', fontWeight: 600 }, // Semi-bold
  ]
});
// Create styles for the modern resume
export const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Quicksand',
    fontSize: 10,
    lineHeight: 1.5,
    color: '#333',
  },
  section: {
    marginBottom: 15,
  },
  // Header section
  header: {
    marginBottom: 20,
    borderBottom: '1px solid #eaeaea',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    fontSize: 9,
  },
  contactText: {
    color: '#555',
  },
  contactLink: {
    color: '#2563eb',
    textDecoration: 'none',
  },
  
  // Section headers
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
    borderBottom: '1px solid #eaeaea',
    paddingBottom: 3,
  },
  
  // Experience & Education items
  itemContainer: {
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  itemCompany: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  itemDate: {
    fontSize: 9,
    color: '#555',
    fontWeight: 'normal',
  },
  itemLocation: {
    fontSize: 9,
    color: '#555',
    marginBottom: 4,
  },
  
  // Bullets
  bulletList: {
    marginTop: 4,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletPoint: {
    width: 10,
    fontSize: 9,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
  },
  
  // Skills section
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  skillCategory: {
    width: '25%',
    marginBottom: 8,
  },
  skillCategoryTitle: {
    fontWeight: 'bold',
    fontSize: 10,
    marginBottom: 4,
  },
  skillItem: {
    fontSize: 9,
    marginBottom: 2,
  },
  
  // Certifications
  certContainer: {
    marginBottom: 5,
  },
  certName: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  certDetails: {
    fontSize: 9,
    color: '#555',
  },
});
