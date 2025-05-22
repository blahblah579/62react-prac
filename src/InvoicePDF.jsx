// src/components/InvoicePDF.jsx
import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
} from "@react-pdf/renderer"; // React-PDF core primitives :contentReference[oaicite:1]{index=1}
const basePath = import.meta.env.BASE_URL || "/";
// 1️⃣ Register Roboto (normal + bold)
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: `${basePath}fonts/Roboto-Regular.ttf`,
      fontWeight: "normal",
    },
    {
      src: `${basePath}fonts/Roboto-Regular.ttf`,
      fontWeight: "bold",
    },
  ],
});

// 1. Define styles via StyleSheet.create()
const styles = StyleSheet.create({
  page: {
    padding: 24,
    backgroundColor: "#ffffff",
    fontFamily: "Roboto",
  },
  header: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 16,
  },
  twoColumn: {
    flexDirection: "row", // side-by-side columns :contentReference[oaicite:2]{index=2}
    justifyContent: "space-between",
    marginBottom: 16,
  },
  partyContainer: {
    width: "48%", // two columns at ~50% each :contentReference[oaicite:3]{index=3}
  },
  partyTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  partyLine: {
    fontSize: 10,
    marginBottom: 2,
  },
  section: {
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 2,
  },
  sectionText: {
    fontSize: 10,
    marginBottom: 4,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1pt solid #e5e7eb", // Tailwind gray-200 hex :contentReference[oaicite:4]{index=4}
    paddingBottom: 4,
    marginBottom: 4,
  },
  cell: {
    flex: 1,
    fontSize: 10,
    padding: 4,
  },
  total: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 8,
  },
});

// 2. Build and export the PDF component
export function InvoicePDF({ invoice }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Invoice Header */}
        <View>
          <Text style={styles.header}>Invoice #{invoice.id}</Text>
        </View>

        {/* Two-column Bill From / Bill To */}
        <View style={styles.twoColumn}>
          {/* Bill From Column */}
          <View style={styles.partyContainer}>
            <Text style={styles.partyTitle}>Bill From</Text>
            <Text style={styles.partyLine}>{invoice.billFrom.name}</Text>
            <Text style={styles.partyLine}>
              {invoice.billFrom.streetAddress}
            </Text>
            <Text style={styles.partyLine}>
              {invoice.billFrom.city}, {invoice.billFrom.postCode}
            </Text>
            <Text style={styles.partyLine}>{invoice.billFrom.country}</Text>
          </View>

          {/* Bill To Column */}
          <View style={styles.partyContainer}>
            <Text style={styles.partyTitle}>Bill To</Text>
            <Text style={styles.partyLine}>{invoice.billTo.name}</Text>
            <Text style={styles.partyLine}>{invoice.billTo.streetAddress}</Text>
            <Text style={styles.partyLine}>
              {invoice.billTo.city}, {invoice.billTo.postCode}
            </Text>
            <Text style={styles.partyLine}>{invoice.billTo.country}</Text>
          </View>
        </View>

        {/* Invoice Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Invoice Date</Text>
          <Text style={styles.sectionText}>{invoice.invoiceDate}</Text>
          <Text style={styles.sectionLabel}>Payment Due</Text>
          <Text style={styles.sectionText}>{invoice.paymentDueBy}</Text>
          <Text style={styles.sectionLabel}>Project Description</Text>
          <Text style={styles.sectionText}>{invoice.projectDesc}</Text>
        </View>

        {/* Items Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.cell}>Item Name</Text>
          <Text style={styles.cell}>Qty.</Text>
          <Text style={styles.cell}>Price ({invoice.currencySymbol})</Text>
          <Text style={styles.cell}>Total ({invoice.currencySymbol})</Text>
        </View>

        {/* Items Rows */}
        {invoice.itemList.map((item) => (
          <View style={styles.tableHeader} key={item.id}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>
              {Number(item.quantity).toLocaleString("en-US")}
            </Text>
            <Text style={styles.cell}>
              {invoice.currencySymbol}
              {Number(item.price).toLocaleString("en-US")}
            </Text>
            <Text style={styles.cell}>
              {invoice.currencySymbol}
              {item.itemTotal.toLocaleString("en-US")}
            </Text>
          </View>
        ))}

        {/* Grand Total */}
        <View style={styles.total}>
          <Text>
            Grand Total: {invoice.currencySymbol}
            {invoice.totalAmount.toLocaleString("en-US")}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
