"use client";

import React from 'react'
import * as ReactPDF from '@/components/PdfRenderer';

const {
  G,
  Svg,
  View,
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
  PdfViewer,
  PdfDownloader
} = ReactPDF;

const styles = StyleSheet.create({
  text: {
    fontSize: 36
  }
});

const ResumePdf: React.FC = () => {
  return (
    <Document>
      <Page>
        <Text style={styles.text}>Kelvin You</Text>
      </Page>
    </Document>
  )
}

export default ResumePdf