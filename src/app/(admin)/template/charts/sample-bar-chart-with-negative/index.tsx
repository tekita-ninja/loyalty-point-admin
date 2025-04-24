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
      display: true,
      position: 'bottom' as const,
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
const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
const values = labels.map(() => faker.finance.amount({ min: -1000, max: 1000 }))
const values2 = labels.map(() => faker.finance.amount({ min: -1009, max: 1000 }))
export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: values,
      borderColor: 'rgb(255, 99, 132)',
      borderRadius: 2,
      backgroundColor: values.map((value) =>
        +value < 0 ? '#FF0B99' : '#0B99FF'
      ),
    },
    {
      label: 'Dataset 2',
      data: values2,
      borderColor: 'rgb(255, 99, 132)',
      borderRadius: 2,
      backgroundColor: values2.map((value) =>
        +value < 0 ? '#FF0B99' : '#99FF0B'
      ),
    },
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
export default function SampleBarChartWithNegative() {
  return (
    <Card>
      <CardHeader>
        <h2 className='font-semibold uppercase text-slate-600 dark:text-slate-100'>Bar Chart With Negative</h2>
      </CardHeader>
      <CardContent>
        <Bar height={'320px'} options={options} data={data} />
      </CardContent>
    </Card>
  )
}
