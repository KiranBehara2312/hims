import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  BlobProvider,
  Font,
} from "@react-pdf/renderer";

import PdfLogoDetails from "./defaults/LogoDetails";
import PdfPatientDetails from "./defaults/PatientDetails";
import PdfHeader from "./defaults/Header";
import PdfPayeeDetails from "./defaults/PayeeDetails";

const styles = StyleSheet.create({
  page: {
    padding: "16px",
    backgroundColor: "#f3f3f3",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    objectFit: "contain",
    margin: "0 auto",
  },
  section: {
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    textAlign: "center",
  },
  boldText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  details: {
    fontSize: 12,
    margin: "5px 0",
  },
  table: {
    marginTop: 20,
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
  },
  tableCell: {
    width: "25%",
    padding: 8,
    borderRight: "1px solid #ccc",
    textAlign: "center",
  },
  tableCellHeader: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
});

const BillReceiptTemplate = ({ patientName = "Sample Kira ", billDetails }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <PdfLogoDetails />
        <PdfHeader />
        <PdfPatientDetails />

        <View style={{ margin: "10px 0" }}>
          <PdfPayeeDetails />
        </View>

        
      </Page>
    </Document>
  );
};

export default BillReceiptTemplate;
