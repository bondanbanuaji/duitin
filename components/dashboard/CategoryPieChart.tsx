"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useMemo } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['F&B', 'Transport', 'Shopping', 'Bills'],
  datasets: [
    {
      label: 'Volume',
      data: [1200000, 450000, 800000, 750000],
      backgroundColor: [
        '#00E5C3',
        '#0090FF',
        '#FFB800',
        '#FF3B5C',
      ],
      borderColor: '#0D1117',
      borderWidth: 4,
      hoverOffset: 2,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '75%',
  plugins: {
    legend: {
      position: 'right' as const,
      labels: {
        color: '#A0A0A0',
        padding: 15,
        usePointStyle: true,
        pointStyle: 'rectRounded',
        font: {
          family: 'var(--font-mono)',
          size: 11
        }
      }
    },
    tooltip: {
      backgroundColor: '#111111',
      titleColor: '#A0A0A0',
      bodyColor: '#EDEDED',
      borderColor: '#222222',
      borderWidth: 1,
      padding: 12,
      bodyFont: { family: 'var(--font-mono)' },
    }
  },
};

export function CategoryPieChart({ initialTransactions = [] }: { initialTransactions?: any[] }) {
  const chartData = useMemo(() => {
    if (initialTransactions.length === 0) return data;

    const expenseTransactions = initialTransactions.filter(tx => tx.type === 'expense');
    const categoryTotals: Record<string, number> = {};
    
    expenseTransactions.forEach(tx => {
      const catName = tx.category?.name || 'Other';
      categoryTotals[catName] = (categoryTotals[catName] || 0) + Number(tx.amount);
    });

    const labels = Object.keys(categoryTotals);
    const volumes = Object.values(categoryTotals);
    const total = volumes.reduce((a, b) => a + b, 0);

    return {
      labels,
      datasets: [{
        ...data.datasets[0],
        data: volumes,
      }],
      total
    };
  }, [initialTransactions]);

  const displayData = {
    labels: chartData.labels,
    datasets: chartData.datasets
  };

  const totalLabel = (chartData as any).total 
    ? (Number((chartData as any).total) / 1000000).toFixed(1) + 'M'
    : '3.2M';

  return (
    <div className="flex flex-col gap-4 h-full bg-[#0A0A0A] border border-[#222] rounded-lg p-5">
      <h3 className="font-mono font-medium text-[13px] tracking-wider text-[#A0A0A0] uppercase">Outflow Distribution</h3>
      <div className="flex-1 w-full relative flex items-center justify-center">
        <Doughnut data={displayData} options={options} />
        {/* Center overlay for cinematic depth */}
        <div className="absolute inset-0 m-auto h-[120px] w-[120px] rounded-full border border-[#1a1a1a] flex items-center justify-center shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-mono text-[#666]">TOTAL</span>
            <span className="text-sm font-mono font-bold text-[#EDEDED]">{totalLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
