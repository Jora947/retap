import Chart from 'chart.js/auto';
import React, { useEffect, useRef, useState } from 'react';

const Graph = ({ device }) => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    if (chart) {
      chart.destroy();
    }

    const temperatureData = [];
    const pressureData = [];
    const rotationSpeedData = [];

    for (let i = 0; i < 6; i++) {
      const temperatureRandomNumber =
        Math.floor(Math.random() * (5 - -5 + 1)) + -5;
      const pressureRandomNumber =
        Math.floor(Math.random() * (5 - -5 + 1)) + -5;
      const rotationSpeedRandomNumber =
        Math.floor(Math.random() * (5 - -5 + 1)) + -5;

      temperatureData.push(device.temperature + temperatureRandomNumber);
      pressureData.push(device.pressure + pressureRandomNumber);
      rotationSpeedData.push(device.rotation_speed + rotationSpeedRandomNumber);
    }

    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['9:00', '11:00', '13:00', '15:00', '17:00', '19:00'],
        datasets: [
          {
            label: 'Температура',
            data: temperatureData,
            backgroundColor: (context) => {
              const value = context.dataset.data[context.dataIndex];
              return value > 90 ? 'rgba(255, 0, 0, 0.2)' : 'rgba(75, 192, 192, 0.2)';
            },
            borderColor: (context) => {
              const value = context.dataset.data[context.dataIndex];
              return value > 90 ? 'rgba(255, 0, 0, 1)' : 'rgba(75, 192, 192, 1)';
            },
            borderWidth: 1,
          },
          {
            label: 'Давление',
            data: pressureData,
            backgroundColor: (context) => {
              const value = context.dataset.data[context.dataIndex];
              return value > 90 ? 'rgba(255, 0, 0, 0.2)' : 'rgba(192, 75, 192, 0.2)';
            },
            borderColor: (context) => {
              const value = context.dataset.data[context.dataIndex];
              return value > 90 ? 'rgba(255, 0, 0, 1)' : 'rgba(192, 75, 192, 1)';
            },
            borderWidth: 1,
          },
          {
            label: 'Скорость вращения',
            data: rotationSpeedData,
            backgroundColor: 'rgba(192, 192, 75, 0.2)',
            borderColor: 'rgba(192, 192, 75, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        aspectRatio: 1,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    setChart(newChart);
  }, [device]);

  return <canvas ref={chartRef} />;
};

export default Graph;