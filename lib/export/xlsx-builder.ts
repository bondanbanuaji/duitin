import * as XLSX from 'xlsx';
import { Transaction } from '@/types/transaction';
import { formatCurrency } from '@/lib/utils/currency';
import { formatDate } from '@/lib/utils/date';

export function buildXLSX(transactions: any[], summary: any) {
  const wb = XLSX.utils.book_new();

  // 1. Ringkasan Sheet
  const summaryData: (string | number)[][] = [
    ['DUITIN — LAPORAN KEUANGAN'],
    [''],
    ['Ringkasan Eksekutif'],
    ['Total Pemasukan', summary.income],
    ['Total Pengeluaran', summary.expense],
    ['Saldo Akhir', summary.balance],
    ['Jumlah Transaksi', transactions.length],
    [''],
    ['Top 5 Kategori'],
    ['Kategori', 'Total Nominal']
  ];
  
  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Ringkasan');

  // 2. Transaksi Detail Sheet
  const detailData: (string | number)[][] = [
    ['No', 'Tanggal', 'Keterangan', 'Kategori', 'Tipe', 'Nominal']
  ];

  transactions.forEach((tx, i) => {
    detailData.push([
      i + 1,
      formatDate(tx.date),
      tx.description,
      tx.category?.name || '',
      tx.type === 'income' ? 'Pemasukan' : 'Pengeluaran',
      tx.amount
    ]);
  });

  const wsDetail = XLSX.utils.aoa_to_sheet(detailData);
  XLSX.utils.book_append_sheet(wb, wsDetail, 'Transaksi Detail');

  // 3. Per Kategori
  const categoryMap: Record<string, number> = {};
  transactions.forEach(tx => {
    const catName = tx.category?.name || 'Lainnya';
    categoryMap[catName] = (categoryMap[catName] || 0) + (tx.type === 'expense' ? tx.amount : 0);
  });

  const categoryData: (string | number)[][] = [['Kategori', 'Total Pengeluaran']];
  Object.entries(categoryMap).forEach(([name, amount]) => {
    categoryData.push([name, amount]);
  });

  const wsCategory = XLSX.utils.aoa_to_sheet(categoryData);
  XLSX.utils.book_append_sheet(wb, wsCategory, 'Per Kategori');

  return wb;
}
