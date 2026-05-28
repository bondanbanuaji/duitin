export interface ReportSummary {
  total_income: number;
  total_expense: number;
  net_balance: number;
  period_start: string;
  period_end: string;
}

export interface CategoryDistribution {
  category_name: string;
  category_color: string;
  amount: number;
  percentage: number;
}

export interface DailyCashflow {
  date: string;
  income: number;
  expense: number;
}

export interface FullReport extends ReportSummary {
  distributions: CategoryDistribution[];
  cashflow: DailyCashflow[];
  transaction_count: number;
}
