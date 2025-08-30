import React from 'react';
import Chart from 'react-apexcharts';

const TimelineChart = ({ data }) => {
  // Chart options
  const chartOptions = {
    chart: {
      id: 'timeline-chart',
      toolbar: {
        show: false, // Hide the toolbar
      },
      zoom: {
        enabled: false, // Disable zoom
      },
    },
    xaxis: {
      categories: data.labels, // Example: ['Jan', 'Feb', 'Mar', ...]
      labels: {
        show: true, // Ensure x-axis labels are visible
        style: {
          colors: '#333', // Label color
          fontSize: '12px',
        },
      },
      axisBorder: {
        show: false, // Hide the x-axis border
      },
      axisTicks: {
        show: false, // Hide the x-axis ticks
      },
    },
    yaxis: {
      show: false, // Hide the y-axis
    },
    stroke: {
      curve: 'smooth', // Smooth curve
      width: 2,
    },
    colors: ['#E6C100'], // Line color (yellow)
    markers: {
      size: 4,
      colors: ['#BCBCBC'], // Dot color (gray)
      strokeColors: '#fff',
      strokeWidth: 2,
    },
    grid: {
      borderColor: 'rgba(0, 0, 0, 0.1)', // Grid line color
      strokeDashArray: 4,
    },
    tooltip: {
      enabled: true,
    },
  };

  // Chart series
  const chartSeries = [
    {
      name: 'Activity Trend',
      data: data.values, // Example: [10, 20, 15, ...]
    },
  ];

  return (
    <div>
      <Chart options={chartOptions} series={chartSeries} type="line" height={150} />
    </div>
  );
};

export default TimelineChart;
