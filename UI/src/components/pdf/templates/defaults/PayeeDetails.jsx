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

const PdfPayeeDetails = ({ payeeDetails = null }) => {
  return (
    <View style={styles.table}>
      <View style={[styles.table]}>
        {/* row */}
        <View style={[styles.tableRow]}>
          <View style={[styles.tableLabelCell]}>
            <Text style={{ fontSize: 9, fontWeight: "bold" }}>
              Payee Details
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
            <Text style={styles.label}>{payeeDetails?.payeeName}</Text>
          </View>
          <View style={[styles.tableHeaderCell]}>
            <Text style={styles.label}>Payment Type</Text>
          </View>
          <View style={[styles.tableValueCell]}>
            <Text style={styles.label}>{payeeDetails?.paymentType}</Text>
          </View>
        </View>
        {/* row ends */}

        {/* row */}
        <View style={[styles.tableRow]}>
          <View style={[styles.tableHeaderCell]}>
            <Text style={styles.label}>Payment Date</Text>
          </View>
          <View style={[styles.tableValueCell]}>
            <Text style={styles.label}>{payeeDetails?.paymentDate}</Text>
          </View>
          <View style={[styles.tableHeaderCell]}>
            <Text style={styles.label}>Transaction ID</Text>
          </View>
          <View style={[styles.tableValueCell]}>
            <Text style={styles.label}>{payeeDetails?.transactionId}</Text>
          </View>
        </View>
        {/* row ends */}
      </View>
    </View>
  );
};

export default PdfPayeeDetails;
