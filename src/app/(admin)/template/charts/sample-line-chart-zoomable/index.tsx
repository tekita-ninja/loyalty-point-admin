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
  Tooltip
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useRef } from 'react';
import { Line } from 'react-chartjs-2';
export const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: {
      display: true,
      position: 'bottom' as const,
    },
    zoom: {
      zoom: {
        drag: {
          enabled: true,
          borderColor: 'rgba(0, 123, 255, 0.5)',
          borderWidth: 1,
          backgroundColor: 'rgba(0, 123, 255, 0.15)',
        },
        mode: 'x' as const,
      },
      pan: {
        enabled: true,
        mode: 'x' as const,
      },
    },
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: false,
      }
    },
    y: {
      display: true,
      grid: {
        display: false,
      }
    },
  },
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', "Augustus", "September", "October", "November", "December"];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.finance.amount({ min: 10000, max: 1000000 })),
      borderColor: '#0B99FF',
      backgroundColor: '#0B99FF',
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 5,
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.finance.amount({ min: 10000, max: 1000000 })),
      borderColor: '#E60186',
      backgroundColor: '#E60186',
      tension: 0.4,
      pointRadius: 0,
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
  zoomPlugin
);

export default function SampleLineChartZoomable() {
  const chartRef = useRef<any | null>(null);
  const handleDoubleClick = () => {
    chartRef.current?.resetZoom();
  };
  return (
    <Card>
      <CardHeader>
        <h2 className='font-semibold uppercase text-slate-600 dark:text-slate-100'>Line Chart Zoomable</h2>
      </CardHeader>
      <CardContent onDoubleClick={handleDoubleClick}>
        <Line ref={chartRef} height={'320px'} options={options} data={data} />
      </CardContent>
    </Card>
  )
}
