import ReactPDF from '@react-pdf/renderer';
import { DynamicNoSSR } from './utils';

export const {
  G,
  Svg,
  View,
  Font,
  Text,
  Link,
  Page,
  Note,
  Path,
  Rect,
  Line,
  Stop,
  Defs,
  Image,
  Tspan,
  Canvas,
  Circle,
  Ellipse,
  Polygon,
  Document,
  Polyline,
  ClipPath,
  LinearGradient,
  RadialGradient,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer
} = ReactPDF;

export type Style = ReactPDF.Styles[string];

export const PdfViewer = DynamicNoSSR(() => import('./_components/PdfViewer'));
export const PdfDownloader = DynamicNoSSR(() => import('./_components/PdfDownloader'));
