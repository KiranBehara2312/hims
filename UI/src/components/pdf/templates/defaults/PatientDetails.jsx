import React from "react";
import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  gridContainer: {
    display: "grid",
    columnGap: 1,
    gridTemplateColumns: "auto auto auto",
  },
  label: {
    fontSize: 9,
  },
  value: {
    fontSize: 10,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderColor: "#ccc",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    border: "1px solid #ccc",
  },
  tableLabelCell: {
    width: "100%",
    padding: 5,
    borderRight: "1px solid #ccc",
    textAlign: "left",
    fontWeight: "bold",
    backgroundColor: "#8080801c",
  },
  tableHeaderCell: {
    width: "15%",
    padding: 5,
    borderRight: "1px solid #ccc",
    textAlign: "left",
    backgroundColor: "#8080801c",
  },
  tableValueCell: {
    width: "35%",
    padding: 5,
    borderRight: "1px solid #ccc",
    textAlign: "left",
  },
});

const PdfPatientDetails = () => {
  return (
    <View style={styles.table}>
      <View style={[styles.table]}>
        {/* row */}
        <View style={[styles.tableRow]}>
          <View style={[styles.tableLabelCell]}>
            <Text style={{ fontSize: 9, fontWeight: "bold" }}>
              Patient Details
            </Text>
          </View>
        </View>
        {/* row ends */}

        {/* row */}
        <View style={[styles.tableRow]}>
          <View style={[styles.tableHeaderCell]}>
            <Text style={styles.label}>Name</Text>
          </View>
          <View style={[styles.tableValueCell]}>
            <Text style={styles.label}>Behara Sayi Venkata Radha Kiran</Text>
          </View>
          <View style={[styles.tableHeaderCell]}>
            <Text style={styles.label}>Gender (Age)</Text>
          </View>
          <View style={[styles.tableValueCell]}>
            <Text style={styles.label}>Male (27y 10m 2d)</Text>
          </View>
        </View>
        {/* row ends */}

        {/* row */}
        <View style={[styles.tableRow]}>
          <View style={[styles.tableHeaderCell]}>
            <Text style={styles.label}>UHID</Text>
          </View>
          <View style={[styles.tableValueCell]}>
            <Text style={styles.label}>Behara Sayi Venkata Radha Kiran</Text>
          </View>
          <View style={[styles.tableHeaderCell]}>
            <Text style={styles.label}>Patient No</Text>
          </View>
          <View style={[styles.tableValueCell]}>
            <Text style={styles.label}>Male (27y 10m 2d)</Text>
          </View>
        </View>
        {/* row ends */}

        {/* row */}
        <View style={[styles.tableRow]}>
          <View style={[styles.tableHeaderCell]}>
            <Text style={styles.label}>Phone No</Text>
          </View>
          <View style={[styles.tableValueCell]}>
            <Text style={styles.label}>Behara Sayi Venkata Radha Kiran</Text>
          </View>
          <View style={[styles.tableHeaderCell]}>
            <Text style={styles.label}>Registration Date</Text>
          </View>
          <View style={[styles.tableValueCell]}>
            <Text style={styles.label}>Male (27y 10m 2d)</Text>
          </View>
        </View>
        {/* row ends */}
      </View>
    </View>
  );
};

export default PdfPatientDetails;
