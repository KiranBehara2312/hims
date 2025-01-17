import React from "react";
import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  border: {
    border: "1px solid #ccc",
    textAlign: "center",
  },
  reportLabel: {
    fontSize: 14,
    padding: 3,
    fontWeight: "bold",
  },
});

const PdfHeader = ({ header = "Report Label" }) => {
  return (
    <View style={styles.border}>
      <Text style={[styles.reportLabel]}>{header}</Text>
    </View>
  );
};

export default PdfHeader;
