export const transactionTools = [
  {
    name: "add_transaction",
    description: "Tambah transaksi baru ke sistem. Pastikan untuk menanyakan detail yang kurang seperti kategori atau keterangan jika tidak disebutkan.",
    parameters: {
      type: {
        type: "string",
        description: "Tipe transaksi: 'income' (pemasukan) atau 'expense' (pengeluaran)",
        enum: ["income", "expense"]
      },
      amount: {
        type: "number",
        description: "Nominal uang dalam Rupiah"
      },
      category: {
        type: "string",
        description: "Kategori transaksi (contoh: Makan, Transport, Belanja)"
      },
      description: {
        type: "string",
        description: "Keterangan singkat transaksi"
      },
      date: {
        type: "string",
        description: "Tanggal transaksi format YYYY-MM-DD (opsional, default hari ini)"
      }
    },
    required: ["type", "amount", "category", "description"]
  },
  {
    name: "get_transactions",
    description: "Ambil daftar transaksi berdasarkan filter tertentu.",
    parameters: {
      type: {
        type: "string",
        enum: ["income", "expense", "transfer"]
      },
      category: {
        type: "string"
      },
      start_date: {
        type: "string"
      },
      end_date: {
        type: "string"
      }
    }
  }
];
