import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MonthlyCart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart<'line', number[], string> | null>(null);

  useEffect(() => {
    const monthlyEarningsData = {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      datasets: [
        {
          label: 'Monthly Earnings',
          data: [
            1800, 2500, 2200, 2300, 2100, 2400, 2800, 3000, 4000, 5000, 6000,
            5000,
          ],
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1,
        },
      ],
    };

    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');

    if (!ctx) return; // Make sure ctx is not null

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: monthlyEarningsData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="col-md-5 mx-auto my-2">
      <div className="card p-2">
        <canvas
          className="w-100"
          style={{ minHeight: '162px', maxHeight: '250px', height: '250px' }}
          ref={chartRef}
        />
      </div>
    </div>
  );
};

export default MonthlyCart;
