export const navigationTools = [
  {
    name: "navigate_to",
    description: "Pindah ke halaman tertentu di dalam aplikasi Duitin.",
    parameters: {
      page: {
        type: "string",
        enum: ["dashboard", "laporan", "transaksi", "kategori", "budget", "settings"],
        description: "Nama halaman tujuan"
      }
    },
    required: ["page"]
  }
];
