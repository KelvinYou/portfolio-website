import * as ReactPDF from '@/components/PdfRenderer';

const {
  Font,
  StyleSheet,
} = ReactPDF;

Font.register({
  family: 'Quicksand',
  fonts: [
    { src: '/assets/fonts/quicksand-v20-latin-regular.ttf' },
    { src: '/assets/fonts/quicksand-v20-latin-300.ttf', fontWeight: 300 },
    { src: '/assets/fonts/quicksand-v20-latin-600.ttf', fontWeight: 600 },
  ],
})

export const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    height: "100%",
    display: "flex",
    flexDirection: 'row',
  },
  text: {
    fontSize: 36,
    fontFamily: 'Quicksand',
  },
  row: {
    flexDirection: 'row',
  },
  leftColumn: {
    flexGrow: 1,
    marginRight: 16,
    paddingLeft: 20,
    paddingRight: 20,
    width: '35%',
    height: '100%',
    backgroundColor: "#323b4c",
    paddingTop: 32,
  },
  rightColumn: {
    flexGrow: 1,
    width: '60%',
    height: '100%',
    paddingTop: 48,
    paddingRight: 20,
  },
  fullName: {
    textTransform: 'uppercase',
    fontSize: 24,
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
  },
  role: {
    textTransform: 'uppercase',
    fontSize: 18,
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
    color: '#323b4c',
    marginBottom: 10,
  },
  profileImg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  pic: {
    width: 120,
    height: 120,
    borderRadius: "100%",
  },
  
  title: {
    fontSize: 9,
    textTransform: 'uppercase',
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
    marginTop: 8,
  },
  separator: {
    height: 2,
    marginTop: 2,
    marginBottom: 8,
    backgroundColor: "grey"
  },
  workCompanyName: {
    fontSize: 10,
    marginRight: 5,
    textDecoration: "none",
    color: "#323b4c",
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
  },
  workRole: {
    fontSize: 12,
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
    marginBottom: 3,
  },
  workSecondRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  workDuration: {
    fontSize: 10,
    color: "#323b4c",
    fontFamily: 'Quicksand',
  },
  pointsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 9,
    fontFamily: 'Quicksand',
    marginTop: 4,
  },
  pointsDot: {
    width: 10,
  },
  workDescription: {
    textAlign: "left",
    width: 'calc(100%-10px)',
  },
  contactContainer: {
    height: 20,
    display: 'flex',
    flexDirection: 'row',
    width: "100%",
  },
  contactCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contactText: {
    color: "white",
    fontSize: 10,
    fontFamily: 'Quicksand',
  },
  icon: {
    width: 10,
    height: 10,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 3,
    paddingBottom: 3,
  },
  scoreName: {
    color: "white",
    fontSize: 10,
    fontFamily: 'Quicksand',
  },
  scoreView: {
    marginLeft: "auto",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  scoreItem: {
    marginLeft: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  strengthTitle: {
    color: "white",
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
    fontFamily: 'Quicksand',
  },
  strengthDescription: {
    color: "white",
    fontSize: 8,
    marginBottom: 5,
    fontFamily: 'Quicksand',
  },
  markdown: {
    paddingTop: 25,
  },
  markdownText: {
    fontSize: 10,
    color: 'white',
    fontFamily: 'Quicksand',
    textAlign: 'center',
    textDecoration: 'none'
  },
  scoreNameContainer: {
    width: 120,
  },
  skillsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  skills: {
    fontSize: 10,
    color: 'lightgrey',
    padding: '1px 5px',
    backgroundColor: '#212a3b'
  },

});