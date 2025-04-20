'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { faker } from '@faker-js/faker';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
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
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July',"Augustus","September","October","Vovember","December"];

export const data = {
  labels,
  datasets: [
    {
      label: 'Customer',
      data: labels.map(() => faker.finance.amount({ min: 1000, max: 10000 })),
      borderColor: 'rgb(255, 99, 132)',
      borderRadius: 10,
      backgroundColor: '#0B99FF',
      tension: 0.4
    }
  ],
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default function ChartCustomer() {
  return (
    <Card>
      <CardHeader>
        <h2 className='font-semibold uppercase text-slate-600 dark:text-slate-100'>Customers</h2>
      </CardHeader>
      <CardContent>
        <Bar height={'320px'} options={options} data={data} />
      </CardContent>
    </Card>
  )
}
