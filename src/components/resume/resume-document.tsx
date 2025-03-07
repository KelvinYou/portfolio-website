'use client'

import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
} from '@react-pdf/renderer';
import { styles } from './style';

// Create Resume Document
const ResumeDocument = () => (
  <Document title="Resume">
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>test</Text>
      </View>
    </Page>
  </Document>
);

export default ResumeDocument;