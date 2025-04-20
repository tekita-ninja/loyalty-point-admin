'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { faker } from '@faker-js/faker';
import {
  CategoryScale,
  Chart as ChartJS,
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
    legend: {
      display:false,
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
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', "Augustus", "September", "October", "Vovember", "December"];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.finance.amount({ min: 10000, max: 1000000 })),
      borderColor: '#0B99FF',
      backgroundColor: '#0B99FF',
      tension: 0.4
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
  Legend
);
export default function ChartRevenue() {
  return (
    <Card>
      <CardHeader>
        <h2 className='font-semibold uppercase text-slate-600 dark:text-slate-100'>Revenue</h2>
      </CardHeader>
      <CardContent>
        <Line height={'320px'} options={options} data={data} />
      </CardContent>
    </Card>
  )
}
