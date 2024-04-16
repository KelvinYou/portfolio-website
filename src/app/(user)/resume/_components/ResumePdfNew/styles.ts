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

const colorMap = {
  primary: '#33bbcf',
  common: 'black',
  secondary: '#323b4c',
}

export const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    height: "100%",
    display: "flex",
    flexDirection: 'row',
  },
  headerWrapper: {
    padding: '30px 30px 10px 30px'
  },
  contactListWrapper: { 
    display: 'flex', 
    flexDirection: 'row', 
    flexWrap: 'wrap',
    width: '100%', 
    gap: '0 10px' 
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
    marginTop: 2,
    marginBottom: 6,
    color: colorMap.primary,
  },
  text: {
    fontSize: 36,
    fontFamily: 'Quicksand',
  },
  row: {
    flexDirection: 'row',
    padding: '0 30px',
  },
  leftColumn: {
    flexGrow: 1,
    height: '100%',
  },
  summary: {
    fontSize: 10,
    fontFamily: 'Quicksand',
  },
  rightColumn: {
    flexGrow: 1,
    padding: '10px 20px',
    borderRadius: '10px',
    width: '30%',
    height: '100%',
    backgroundColor: colorMap.secondary,
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
    color: colorMap.secondary,
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
  },
  educationCgpa: {
    fontSize: 10,
    marginRight: 5,
    textDecoration: "none",
    color: colorMap.secondary,
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
  },
  workRole: {
    fontSize: 12,
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
    marginBottom: 3,
    color: colorMap.primary,
  },
  workSecondRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  workDuration: {
    fontSize: 10,
    color: colorMap.secondary,
    fontWeight: 'bold',
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
  },
  contactCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contactText: {
    color: "black",
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
    color: colorMap.common,
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
  },
  skillsWrapper: {
    fontSize: 10,
    color: colorMap.common,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 2,
    fontFamily: 'Quicksand',
  },
  skillTitle: {
    fontWeight: 'bold',
    width: 70,
  },
  skillItem: {
    color: colorMap.secondary,
  },
  certificationWrapper: {
    fontSize: 10,
    color: colorMap.common,
    marginBottom: 10,
    fontFamily: 'Quicksand',
    width: '100%',
  },
  certificationTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colorMap.secondary,
  },
  moreInfoText: {
    fontSize: 10,
    color: colorMap.common,
    marginBottom: 5
  },
  moreInfoQr: {
    padding: '4px 10px',
    height: 100,
    width: 100
  },
  tagWrapper: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
  },
  tag: {
    backgroundColor: '#ebebeb',
    color: colorMap.common,
    fontSize: 8,
    fontFamily: 'Quicksand',
    padding: '1px 3px',
    borderRadius: 2,
  },
  projectIcon: {
    width: 12,
    height: 12,
    marginBottom: 3,
  },
});