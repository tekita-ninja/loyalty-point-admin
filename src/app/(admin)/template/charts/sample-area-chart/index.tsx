'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { faker } from '@faker-js/faker';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      intersect: false
    },
    legend: {
      display: false,
      position: 'top' as const,
    },
    title: {
      display: false
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      }
    },
    y: {
      grid: {
        display: false,
      }
    }
  }
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', "Augustus", "September", "October", "November", "December"];

export const data = {
  labels,
  datasets: [
    {
      fill:true,
      label: 'Dataset 1',
      data: labels.map(() => faker.finance.amount({ min: 10000, max: 1000000 })),
      borderColor: '#0B99FF',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      tension: 0.4,
      pointRadius: 0, // Hilangkan dot
      pointHoverRadius: 5,
    }
  ],
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);
export default function SampleAreaChart() {
  return (
    <Card>
      <CardHeader>
        <h2 className='font-semibold uppercase text-slate-600 dark:text-slate-100'>Area Chart</h2>
      </CardHeader>
      <CardContent>
        <Line height={'320px'} options={options} data={data} />
      </CardContent>
    </Card>
  )
}
