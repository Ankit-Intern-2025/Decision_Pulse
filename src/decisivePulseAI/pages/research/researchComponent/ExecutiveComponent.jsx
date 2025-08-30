import React from "react";
import Chart from "react-apexcharts";

const AutoMarketOverview = () => {
  // 1. Market Size (Domestic vs Global) - Pie Chart
  const marketSizeOptions = {
    labels: ["Domestic", "Global"],
    colors: ["#008FFB", "#00E396"],
    legend: { position: "bottom" },
  };
  const marketSizeSeries = [500, 1500]; // in $ billions

  // 2. Growth Rate (Over Years) - Line Chart
  const growthRateOptions = {
    chart: { id: "growth-rate-line" },
    xaxis: { categories: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    colors: ["#FEB019"],
  };
  const growthRateSeries = [
    {
      name: "Market Size ($B)",
      data: [1800, 1600, 1700, 1900, 2000, 2200],
    },
  ];

  // 3. Competitive Landscape (Top 5 Players) - Donut Chart
  const competitiveLandscapeOptions = {
    labels: ["Toyota", "Volkswagen", "Ford", "Honda", "Tesla"],
    colors: ["#FF4560", "#775DD0", "#00E396", "#FEB019", "#008FFB"],
    legend: { position: "bottom" },
  };
  const competitiveLandscapeSeries = [25, 20, 15, 10, 30]; // Market share %

  // 4. Revenue Streams (per Vehicle Type) - Stacked Bar Chart
  const revenueStreamsOptions = {
    chart: { stacked: true },
    xaxis: { categories: ["SUV", "Sedan", "Truck", "Electric Vehicle (EV)", "Hybrid"] },
    colors: ["#00E396", "#775DD0", "#FF4560", "#FEB019", "#008FFB"],
    legend: { position: "bottom" },
  };
  const revenueStreamsSeries = [
    {
      name: "Domestic",
      data: [400, 300, 200, 150, 100],
    },
    {
      name: "Export",
      data: [250, 200, 150, 300, 120],
    },
  ];

  // 5. Geographic Sales Performance (Domestic vs Export) - 100% Stacked Bar Chart
  const geoSalesOptions = {
    chart: { stacked: true, stackType: "100%" },
    xaxis: { categories: ["2020", "2021", "2022", "2023", "2024"] },
    colors: ["#008FFB", "#FF4560"],
    legend: { position: "bottom" },
  };
  const geoSalesSeries = [
    {
      name: "Domestic",
      data: [70, 65, 60, 62, 58],
    },
    {
      name: "Export",
      data: [30, 35, 40, 38, 42],
    },
  ];

  // Options and Series for Monthly Sales Trend (Line Chart)
const monthlySalesTrendOptions = {
  chart: { type: "line" },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
  yaxis: [
    {
      title: { text: "Units Sold" },
    },
    {
      opposite: true,
      title: { text: "Revenue (USD)" },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
  },
  markers: {
    size: 5,
    colors: "#00ACC1",
    strokeColor: "#fff",
    strokeWidth: 2,
  },
};

const monthlySalesTrendSeries = [
  {
    name: "Units Sold",
    data: [500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050],
  },
  {
    name: "Revenue (USD)",
    data: [50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 105000],
  },
];

// Options and Series for Pre vs Post Promotion Sales Impact (Waterfall Chart)
const salesImpactWaterfallOptions = {
  chart: { type: "bar" },
  xaxis: {
    categories: ["Pre-Promotion", "Promotion", "Post-Promotion"],
  },
  yaxis: {
    title: { text: "Sales Impact (USD)" },
  },
  tooltip: {
    y: {
      formatter: (value) => `$${value.toFixed(2)}`,
    },
  },
};

const salesImpactWaterfallSeries = [
  {
    name: "Sales Impact",
    data: [
      { x: "Pre-Promotion", y: 20000 },
      { x: "Promotion", y: 15000 },
      { x: "Post-Promotion", y: 25000 },
    ],
  },
];

  return (
  <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-white">Executive Summary (Auto Market Overview)</h2>
      <div className="p-6 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-6">

      {/* 1. Market Size */}
      <div className="bg-white rounded-xl p-4 shadow lg:col-span-2">
        <h3 className="text-xl font-semibold mb-2">Market Size (Domestic vs Global)</h3>
        <Chart options={marketSizeOptions} series={marketSizeSeries} type="pie" height={300} />
      </div>

      {/* 2. Growth Rate */}
      <div className="bg-white rounded-xl p-4 shadow lg:col-span-2">
        <h3 className="text-xl font-semibold mb-2">Growth Rate (Over Years)</h3>
        <Chart options={growthRateOptions} series={growthRateSeries} type="line" height={300} />
      </div>

      {/* 3. Competitive Landscape */}
      <div className="bg-white rounded-xl p-4 shadow lg:col-span-2">
        <h3 className="text-xl font-semibold mb-2">Competitive Landscape (Top 5 Players)</h3>
        <Chart options={competitiveLandscapeOptions} series={competitiveLandscapeSeries} type="donut" height={300} />
      </div>

      {/* 4. Revenue Streams */}
      <div className="bg-white rounded-xl p-4 shadow lg:col-span-2">
        <h3 className="text-xl font-semibold mb-2">Revenue Streams (per Vehicle Type)</h3>
        <Chart options={revenueStreamsOptions} series={revenueStreamsSeries} type="bar" height={300} />
      </div>

      {/* 5. Geographic Sales Performance */}
      <div className="bg-white rounded-xl p-4 shadow lg:col-span-4">
        <h3 className="text-xl font-semibold mb-2">Geographic Sales Performance (Domestic vs Export)</h3>
        <Chart options={geoSalesOptions} series={geoSalesSeries} type="bar" height={300} />
      </div>
       {/* 6. Monthly Sales Trend (Units & Revenue) - Line Chart */}
       <div className="bg-white rounded-xl p-4 shadow lg:col-span-3">
        <h3 className="text-xl font-semibold mb-2">Monthly Sales Trend (Units & Revenue)</h3>
        <Chart options={monthlySalesTrendOptions} series={monthlySalesTrendSeries} type="line" height={350} />
      </div>

      {/* 7. Pre vs Post Promotion Sales Impact - Waterfall Chart */}
      <div className="bg-white rounded-xl p-4 shadow lg:col-span-3">
        <h3 className="text-xl font-semibold mb-2">Pre vs Post Promotion Sales Impact</h3>
        <Chart options={salesImpactWaterfallOptions} series={salesImpactWaterfallSeries} type="bar" height={350} />
      </div>
    </div>
  </div>
  );
};

export default AutoMarketOverview;
