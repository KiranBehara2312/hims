import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import PdfLogoDetails from "./defaults/LogoDetails";
import PdfFooter from "./defaults/Footer";

const styles = StyleSheet.create({
  page: {
    padding: "16px",
    height: "100%",
    backgroundColor: "#f3f3f3",
  },
  mb5: {
    marginBottom: 5,
  },
  details: {
    fontSize: 12,
  },
});

const DoctorLetterhead = ({
  fullName = "Dr.Sample",
  designation = "sample",
  qualification = "",
}) => {
  return (
    <Document>
      <Page style={styles.page}>
        <PdfLogoDetails />
        <View style={styles.border}>
          <Text
            style={[styles.details, styles.mb5]}
          >{`${fullName}, ${qualification}`}</Text>
          <Text style={[styles.details]}>{designation}</Text>
        </View>
        <PdfFooter />
      </Page>
    </Document>
  );
};

export default DoctorLetterhead;
