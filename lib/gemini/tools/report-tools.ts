export const reportTools = [
  {
    name: "generate_report",
    description: "Hasilkan ringkasan laporan keuangan untuk periode tertentu.",
    parameters: {
      period: {
        type: "string",
        enum: ["week", "month", "year"],
        description: "Periode laporan"
      },
      start_date: {
        type: "string"
      },
      end_date: {
        type: "string"
      }
    }
  },
  {
    name: "export_report",
    description: "Export laporan keuangan ke format file tertentu.",
    parameters: {
      format: {
        type: "string",
        enum: ["pdf", "xlsx"],
        description: "Format file export"
      }
    },
    required: ["format"]
  }
];
