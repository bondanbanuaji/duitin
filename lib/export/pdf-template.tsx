import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { Transaction } from '@/types/transaction';
import { formatCurrency } from '@/lib/utils/currency';
import { formatDate } from '@/lib/utils/date';

// Register fonts if needed, but for now use defaults
// Font.register({ family: 'SpaceGrotesk', src: '...' });

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#080B10',
  },
  subtitle: {
    fontSize: 12,
    color: '#8B949E',
    marginTop: 4,
  },
  summaryContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  summaryCard: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  summaryLabel: {
    fontSize: 10,
    color: '#8B949E',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#080B10',
  },
  table: {
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#F8F9FA',
    padding: 8,
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 8,
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#080B10',
  },
  tableCell: {
    fontSize: 9,
    color: '#484F58',
  },
  amountPositive: {
    color: '#00E5A0',
  },
  amountNegative: {
    color: '#FF3B5C',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
    color: '#8B949E',
  }
});

interface DuitinReportProps {
  userName: string;
  period: string;
  transactions: any[];
  summary: {
    income: number;
    expense: number;
    balance: number;
  };
}

export const DuitinReport = ({ userName, period, transactions, summary }: DuitinReportProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Laporan Keuangan Duitin</Text>
          <Text style={styles.subtitle}>Periode: {period}</Text>
        </View>
        <View style={{ textAlign: 'right' }}>
          <Text style={{ fontSize: 10, color: '#080B10', fontWeight: 'bold' }}>{userName}</Text>
          <Text style={{ fontSize: 8, color: '#8B949E' }}>Generated on {formatDate(new Date())}</Text>
        </View>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Pemasukan</Text>
          <Text style={[styles.summaryValue, { color: '#00E5A0' }]}>{formatCurrency(summary.income)}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Pengeluaran</Text>
          <Text style={[styles.summaryValue, { color: '#FF3B5C' }]}>{formatCurrency(summary.expense)}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Saldo Akhir</Text>
          <Text style={styles.summaryValue}>{formatCurrency(summary.balance)}</Text>
        </View>
      </View>

      {/* Transactions Table */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Tanggal</Text></View>
          <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Kategori</Text></View>
          <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Keterangan</Text></View>
          <View style={[styles.tableColHeader, { textAlign: 'right' }]}><Text style={styles.tableCellHeader}>Nominal</Text></View>
        </View>
        {transactions.map((tx, idx) => (
          <View style={styles.tableRow} key={idx}>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{formatDate(tx.date)}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{tx.category?.name}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{tx.description}</Text></View>
            <View style={[styles.tableCol, { textAlign: 'right' }]}>
              <Text style={[styles.tableCell, tx.type === 'income' ? styles.amountPositive : styles.amountNegative]}>
                {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer} fixed>
        <Text>Duitin — AI-Powered Financial Tracking System</Text>
        <Text render={({ pageNumber, totalPages }) => `Halaman ${pageNumber} / ${totalPages}`} />
      </View>
    </Page>
  </Document>
);
