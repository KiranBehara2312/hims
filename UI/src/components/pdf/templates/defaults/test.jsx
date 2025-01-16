<span>
  {/* Bill Details Table */}
  <View style={styles.section}>
    <Text style={styles.boldText}>Bill Details</Text>
    <View style={styles.table}>
      {/* Table Header */}
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, styles.tableCellHeader]}>Item</Text>
        <Text style={[styles.tableCell, styles.tableCellHeader]}>Quantity</Text>
        <Text style={[styles.tableCell, styles.tableCellHeader]}>
          Unit Price
        </Text>
        <Text style={[styles.tableCell, styles.tableCellHeader]}>Amount</Text>
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
</span>;
