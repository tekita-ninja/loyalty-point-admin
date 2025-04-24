'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      intersect: false
    },
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
      display: false,
    },
    y: {
      display: false,
    }
  }
};
export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export default function SamplePolarAreaChart() {
  return (
    <Card>
      <CardHeader>
        <h2 className='font-semibold uppercase text-slate-600 dark:text-slate-100'>Polar Area Chart</h2>
      </CardHeader>
      <CardContent>
        <PolarArea height={'320px'} options={options} data={data} />
      </CardContent>
    </Card>
  )
}
