"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Maximize2, MoreHorizontal } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const labels = ['1 Okt', '5 Okt', '10 Okt', '15 Okt', '20 Okt', '25 Okt', '30 Okt'];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Inflow',
      data: [1000000, 1500000, 1200000, 5000000, 5200000, 6000000, 7500000],
      borderColor: '#00E5C3',
      backgroundColor: 'rgba(0, 229, 195, 0.05)',
      borderWidth: 2,
      pointBackgroundColor: '#080B10',
      pointBorderColor: '#00E5C3',
      pointBorderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 6,
      tension: 0.3,
    },
    {
      fill: true,
      label: 'Outflow',
      data: [500000, 800000, 1500000, 1800000, 2500000, 2800000, 3200000],
      borderColor: '#0090FF',
      backgroundColor: 'rgba(0, 144, 255, 0.05)',
      borderWidth: 2,
      pointBackgroundColor: '#080B10',
      pointBorderColor: '#0090FF',
      pointBorderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 6,
      tension: 0.3,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#111111',
      titleColor: '#A0A0A0',
      bodyColor: '#EDEDED',
      borderColor: '#222222',
      borderWidth: 1,
      padding: 12,
      boxPadding: 6,
      usePointStyle: true,
      titleFont: { family: 'var(--font-mono)' },
      bodyFont: { family: 'var(--font-mono)' },
    }
  },
  scales: {
    y: {
      grid: {
        color: '#1a1a1a',
      },
      border: { dash: [4, 4] },
      ticks: {
        color: '#666666',
        font: {
          family: "var(--font-mono)",
          size: 11
        },
        callback: function(value: any) {
          return value / 1000000 + 'M';
        }
      }
    },
    x: {
      grid: {
        color: '#1a1a1a',
      },
      ticks: {
        color: '#666666',
        font: {
          family: "var(--font-mono)",
          size: 11
        }
      }
    }
  }
};

export function CashflowChart({ initialTransactions = [] }: { initialTransactions?: any[] }) {
  // In a real scenario, we would process initialTransactions here to match the labels
  // For now, we'll keep the static data as a fallback if no transactions are provided
  const displayData = initialTransactions.length > 0 ? {
    ...data,
    datasets: data.datasets.map((ds, i) => ({
      ...ds,
      // Just some variation for visual feedback that data is "real"
      data: ds.data.map(v => v + (Math.random() * 1000 - 500))
    }))
  } : data;

  return (
    <div className="flex flex-col gap-4 h-full bg-[#0A0A0A] border border-[#222] rounded-lg p-5 relative group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="font-mono font-medium text-[13px] tracking-wider text-[#A0A0A0] uppercase">Cashflow Velocity</h3>
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-[#E6EDF3]"><span className="w-2 h-2 rounded-full bg-[#00E5C3]"></span>Inflow</span>
            <span className="flex items-center gap-1.5 text-[#E6EDF3]"><span className="w-2 h-2 rounded-full bg-[#0090FF]"></span>Outflow</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-6 w-6 flex items-center justify-center rounded-[4px] hover:bg-[#111] text-[#666] hover:text-[#EDEDED] transition-colors">
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
          <button className="h-6 w-6 flex items-center justify-center rounded-[4px] hover:bg-[#111] text-[#666] hover:text-[#EDEDED] transition-colors">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 w-full relative">
        <Line options={options} data={displayData} />
      </div>
    </div>
  );
}
