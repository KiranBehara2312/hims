import React, { useEffect, useState } from "react";
import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { convertAmountIntoWords } from "../../../../helpers";

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
    padding: 5,
    borderRight: "1px solid #ccc",
    textAlign: "left",
    backgroundColor: "#8080801c",
  },
  tableValueCell: {
    padding: 5,
    borderRight: "1px solid #ccc",
    textAlign: "left",
  },
});

const PdfPaymentServiceDetails = ({ billsArray = [] }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    const calculateTotalAmount = () => {
      const total = billsArray?.reduce(
        (acc, cur) => acc + cur.serviceAmount,
        0
      );
      setTotalAmount(total);
    };
    calculateTotalAmount();
  }, []);
  return (
    <View style={styles.table}>
      <View style={[styles.table]}>
        {/* row */}
        <View style={[styles.tableRow]}>
          <View style={[styles.tableLabelCell]}>
            <Text style={{ fontSize: 9, fontWeight: "bold" }}>
              Service Details
            </Text>
          </View>
        </View>
        {/* row ends */}

        {/* row */}
        <View style={[styles.tableRow]}>
          <View style={[styles.tableHeaderCell, { width: "5%" }]}>
            <Text style={styles.label}>S.No</Text>
          </View>
          <View style={[styles.tableHeaderCell, { width: "15%" }]}>
            <Text style={styles.label}>Bill No</Text>
          </View>
          <View style={[styles.tableHeaderCell, { width: "35%" }]}>
            <Text style={styles.label}>Name</Text>
          </View>
          <View style={[styles.tableHeaderCell, { width: "15%" }]}>
            <Text style={styles.label}>Code</Text>
          </View>
          <View style={[styles.tableHeaderCell, { width: "20%" }]}>
            <Text style={styles.label}>Location</Text>
          </View>
          <View
            style={[
              styles.tableHeaderCell,
              { width: "10%", textAlign: "right" },
            ]}
          >
            <Text style={styles.label}>Amount</Text>
          </View>
        </View>
        {/* row ends */}

        {/* row */}
        {billsArray?.map((obj, i) => {
          return (
            <View style={[styles.tableRow]}>
              <View style={[styles.tableValueCell, { width: "5%" }]}>
                <Text style={styles.label}>{i + 1}</Text>
              </View>
              <View style={[styles.tableValueCell, { width: "15%" }]}>
                <Text style={styles.label}>{obj?.billNo}</Text>
              </View>
              <View style={[styles.tableValueCell, { width: "35%" }]}>
                <Text style={styles.label}>{obj?.serviceName}</Text>
              </View>
              <View style={[styles.tableValueCell, { width: "15%" }]}>
                <Text style={styles.label}>{obj?.serviceCode}</Text>
              </View>
              <View style={[styles.tableValueCell, { width: "20%" }]}>
                <Text style={styles.label}>{obj?.serviceLocation}</Text>
              </View>
              <View
                style={[
                  styles.tableValueCell,
                  { width: "10%", textAlign: "right" },
                ]}
              >
                <Text style={styles.label}>{obj?.serviceAmount}</Text>
              </View>
            </View>
          );
        })}
        {/* row ends */}

        {/* row */}
        <View style={[styles.tableRow]}>
          <View style={[styles.tableValueCell, { width: "90%" }]}>
            <Text style={styles.label}>
              {convertAmountIntoWords(totalAmount)}
            </Text>
          </View>
          <View
            style={[
              styles.tableValueCell,
              { width: "10%", textAlign: "right" },
            ]}
          >
            <Text style={styles.label}>{totalAmount}</Text>
          </View>
        </View>
        {/* row ends */}
      </View>
    </View>
  );
};

export default PdfPaymentServiceDetails;
