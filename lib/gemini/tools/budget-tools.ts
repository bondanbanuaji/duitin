export const budgetTools = [
  {
    name: "set_budget",
    description: "Atur batas anggaran (budget) untuk kategori tertentu.",
    parameters: {
      category: {
        type: "string",
        description: "Nama kategori"
      },
      amount: {
        type: "number",
        description: "Batas anggaran dalam Rupiah"
      },
      period: {
        type: "string",
        enum: ["weekly", "monthly", "yearly"],
        description: "Periode anggaran"
      }
    },
    required: ["category", "amount", "period"]
  },
  {
    name: "get_budget_status",
    description: "Cek status penggunaan budget saat ini.",
    parameters: {}
  }
];
