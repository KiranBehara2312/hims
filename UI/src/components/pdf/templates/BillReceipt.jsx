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

// Add a custom font if needed (optional)
Font.register({
  family: "Roboto",
  src: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
});

import HospitalLogo from "../../../assets/hospital/logo.jpg";

const styles = StyleSheet.create({
  page: {
    padding: 30,
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
        {/* Header Section */}
        <View style={styles.header}>
          <Image style={styles.logo} src={HospitalLogo} />

          <Text style={styles.boldText}>Hospital Bill Receipt</Text>
          <Text style={styles.text}>
            Receipt Date: {new Date().toLocaleDateString()}
          </Text>
        </View>

        {/* Patient Info Section */}
        <View style={styles.section}>
          <Text style={styles.boldText}>Patient Information</Text>
          <Text style={styles.details}>Name: {patientName}</Text>
          <Text style={styles.details}>Patient ID: 123456789</Text>
          <Text style={styles.details}>
            Date of Visit: {new Date().toLocaleDateString()}
          </Text>
        </View>

        {/* Bill Details Table */}
        <View style={styles.section}>
          <Text style={styles.boldText}>Bill Details</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.tableCellHeader]}>
                Item
              </Text>
              <Text style={[styles.tableCell, styles.tableCellHeader]}>
                Quantity
              </Text>
              <Text style={[styles.tableCell, styles.tableCellHeader]}>
                Unit Price
              </Text>
              <Text style={[styles.tableCell, styles.tableCellHeader]}>
                Amount
              </Text>
            </View>

            {/* Table Data */}
            {/* {billDetails.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableCell}>{item.name}</Text>
                <Text style={styles.tableCell}>{item.quantity}</Text>
                <Text style={styles.tableCell}>{item.unitPrice}</Text>
                <Text style={styles.tableCell}>{item.amount}</Text>
              </View>
            ))} */}
          </View>
        </View>

        {/* Total Section */}
        <View style={styles.section}>
          <Text style={styles.boldText}>Total Amount</Text>
          {/* <Text style={styles.details}>
            Total: ${billDetails.reduce((acc, item) => acc + item.amount, 0)}
          </Text> */}
        </View>
      </Page>
    </Document>
  );
};

export default BillReceiptTemplate;
