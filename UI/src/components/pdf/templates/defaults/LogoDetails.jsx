import { Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import HospitalLogo from "../../../../assets/hospital/logo.jpg";
import { META } from "../../../../constants/projects";
import React from "react";

const styles = StyleSheet.create({
  mb: {
    marginBottom: 10,
  },
  logo: {
    width: 70,
    height: 45,
    objectFit: "contain",
  },
  label: {
    fontSize: 9,
  },
  value: {
    fontSize: 10,
  },
  text: {
    fontSize: 12,
    textAlign: "center",
  },
  boldText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "2px",
  },
  details: {
    fontSize: 8,
    margin: "2px 0",
    textAlign: "center",
  },
  table: {
    display: "table",
    width: "100%",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
  },
  tableHeaderCell: {
    width: "15%",
    padding: 5,
    textAlign: "left",
  },
  tableValueCell: {
    width: "85%",
    padding: 5,
    textAlign: "left",
    paddingRight: "100px",
  },
});

const PdfLogoDetails = () => {
  return (
    <View style={[styles.table, styles.mb]}>
      <View style={[styles.table]}>
        {/* row */}
        <View style={[styles.tableRow]}>
          <View style={[styles.tableHeaderCell]}>
            <Text style={styles.label}>
              <Image style={styles.logo} src={HospitalLogo} />
            </Text>
          </View>
          <View style={[styles.tableValueCell]}>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Text style={styles.boldText}>{META.HOSPITAL_DETAILS.NAME}</Text>
              <Text style={styles.details}>
                {META.HOSPITAL_DETAILS.ADDRESS_LINE_1}
              </Text>
              <Text style={styles.details}>
                {META.HOSPITAL_DETAILS.ADDRESS_LINE_2}
              </Text>
              <Text style={styles.details}>
                Phone: {META.HOSPITAL_DETAILS.PHONE}
              </Text>
            </View>
          </View>
        </View>
        {/* row ends */}
      </View>
    </View>
  );
};

export default PdfLogoDetails;
