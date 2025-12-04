'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: false,
            text: 'Sales Overview',
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: '#f3f4f6',
            },
        },
        x: {
            grid: {
                display: false,
            },
        },
    },
    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
};

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Revenue',
            data: [12000, 19000, 15000, 25000, 22000, 30000, 45000],
            borderColor: '#0f766e', // Deep Teal
            backgroundColor: 'rgba(15, 118, 110, 0.1)',
            fill: true,
            tension: 0.4,
        },
        {
            label: 'Orders',
            data: [80, 120, 105, 160, 140, 200, 250],
            borderColor: '#d4af37', // Gold
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            fill: true,
            tension: 0.4,
            yAxisID: 'y1',
        },
    ],
};

// Multi-axis options
export const multiAxisOptions = {
    ...options,
    scales: {
        y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
            grid: {
                color: '#f3f4f6',
            },
        },
        y1: {
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            grid: {
                drawOnChartArea: false,
            },
        },
        x: {
            grid: {
                display: false,
            },
        },
    },
};

export default function SalesChart() {
    return <Line options={multiAxisOptions} data={data} />;
}
