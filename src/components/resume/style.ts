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

export const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Quicksand',
    fontSize: 12,
    lineHeight: 1.5,
    color: '#333',
  },
  section: {
    marginBottom: 10,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    color: '#555',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 3,
  },
  experienceItem: {
    marginBottom: 15,
  },
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  companyName: {
    fontWeight: 'bold',
  },
  jobTitle: {
    fontWeight: 'bold',
  },
  date: {
    fontSize: 10,
    color: '#555',
  },
  location: {
    fontSize: 10,
    color: '#555',
    marginBottom: 5,
  },
  bullet: {
    marginLeft: 10,
    marginBottom: 3,
  },
  bulletContent: {
    flexDirection: 'row',
  },
  bulletDot: {
    width: 10,
  },
  educationItem: {
    marginBottom: 10,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    padding: '3 8',
    margin: 3,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    fontSize: 10,
  },
});