import React from "react";
import Chart from "react-apexcharts";

const MarketTrendsForecasting = () => {
  // 1. Consumer Demand Trends (EVs, ride-sharing, etc.) - Area Chart
  const consumerDemandOptions = {
    chart: { type: "area" },
    xaxis: { categories: ["2018", "2019", "2020", "2021", "2022", "2023"] },
    colors: ["#00E396"],
    fill: { opacity: 0.3 },
    stroke: { curve: "smooth" },
  };
  const consumerDemandSeries = [
    {
      name: "EVs & Ride-sharing",
      data: [5000, 12000, 18000, 22000, 30000, 38000],
    },
  ];

  // 2. Technology Adoption (Electrification, ADAS, etc.) - Bar Chart (Vertical)
  const techAdoptionOptions = {
    chart: { type: "bar" },
    xaxis: {
      categories: [
        "Electrification",
        "ADAS",
        "Connected Vehicles",
        "Autonomous Driving",
      ],
    },
    colors: ["#FF4560"],
  };
  const techAdoptionSeries = [
    {
      name: "Adoption %",
      data: [40, 55, 60, 70],
    },
  ];

  // 3. R&D and Innovation Strategy Focus Areas - Treemap Chart
  const innovationStrategyOptions = {
    chart: { type: "treemap" },
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
        shadeIntensity: 0.5,
      },
    },
    colors: ["#008FFB", "#FEB019", "#00E396", "#775DD0", "#FF4560"],
  };
  const innovationStrategySeries = [
    {
      name: "Electric Vehicle Development",
      data: [
        { x: "Battery Technology", y: 35 },
        { x: "Charging Infrastructure", y: 30 },
        { x: "Battery Recycling", y: 20 },
        { x: "EV Materials", y: 15 },
      ],
    },
    {
      name: "ADAS Development",
      data: [
        { x: "Sensor Fusion", y: 25 },
        { x: "Machine Learning", y: 30 },
        { x: "Driver Assistance", y: 20 },
        { x: "Safety Features", y: 25 },
      ],
    },
  ];

  // 4. Regulatory Compliance / Emission Standards Readiness - Heatmap Chart
  const complianceOptions = {
    chart: { type: "heatmap" },
    dataLabels: { enabled: true },
    colors: ["#00E396", "#FF4560", "#FEB019", "#775DD0"],
  };
  const complianceSeries = [
    { name: "EU", data: [8, 6, 7, 9, 10] },
    { name: "US", data: [7, 6, 8, 8, 9] },
    { name: "China", data: [6, 7, 8, 8, 9] },
  ];

  // 5. Market Growth Forecast - Forecast Line Chart (Line + Predictive Trend Line)
  const marketGrowthOptions = {
    chart: { id: "market-growth", type: "line" },
    xaxis: { categories: ["2023", "2024", "2025", "2026", "2027", "2028"] },
    stroke: { width: 2, curve: "smooth" },
    colors: ["#008FFB"],
    forecastDataPoints: { count: 3 },
    annotations: {
      yaxis: [
        {
          y: 50000,
          borderColor: "#FF4560",
          label: {
            borderColor: "#FF4560",
            style: { color: "#fff", background: "#FF4560" },
            text: "Forecasted Value",
          },
        },
      ],
    },
  };
  const marketGrowthSeries = [
    {
      name: "Market Size ($ Billion)",
      data: [38000, 42000, 48000, 53000, 60000, 70000],
    },
  ];

  // Churn Rate Over Time (Line Chart)
  const churnRateOptions = {
    chart: { type: "line", height: 300 },
    colors: ["#FF5733"],
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    yaxis: { title: { text: "Churn Rate (%)" } },
    stroke: { curve: "smooth" },
  };

  const churnRateSeries = [
    {
      name: "Churn Rate",
      data: [15, 20, 18, 22, 25, 23, 27],
    },
  ];

  // Feature Adoption Per Model (Radar Chart)
  const featureAdoptionOptions = {
    chart: { height: 300, type: "radar" },
    colors: ["#1E90FF", "#32CD32", "#FF8C00", "#FF6347", "#D2691E"],
    xaxis: {
      categories: ["Model A", "Model B", "Model C", "Model D", "Model E"],
    },
    legend: { show: true, position: "right" },

    yaxis: { min: 0, max: 100, labels: { formatter: (value) => `${value}%` } },
  };

  const featureAdoptionSeries = [
    {
      name: "Feature 1",
      data: [75, 90, 85, 65, 80],
    },
    {
      name: "Feature 2",
      data: [50, 80, 60, 75, 70],
    },
    {
      name: "Feature 3",
      data: [80, 70, 85, 90, 95],
    },
    {
      name: "Feature 4",
      data: [65, 50, 70, 80, 60],
    },
    {
      name: "Feature 5",
      data: [60, 65, 80, 85, 75],
    },
  ];

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Market Trends & Forecasting
      </h2>
      <div className="p-6 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
        {/* 1. Consumer Demand Trends */}
        <div className="bg-white rounded-xl p-4 shadow lg:col-span-2">
          <h3 className="text-xl font-semibold mb-2">
            Consumer Demand Trends (EVs, Ride-sharing)
          </h3>
          <Chart
            options={consumerDemandOptions}
            series={consumerDemandSeries}
            type="area"
            height={300}
          />
        </div>

        {/* 2. Technology Adoption */}
        <div className="bg-white rounded-xl p-4 shadow lg:col-span-2">
          <h3 className="text-xl font-semibold mb-2">
            Technology Adoption (Electrification, ADAS, etc.)
          </h3>
          <Chart
            options={techAdoptionOptions}
            series={techAdoptionSeries}
            type="bar"
            height={300}
          />
        </div>

        {/* 6. Churn Rate Over Time */}
        <div className="bg-white rounded-xl p-4 shadow self-center lg:col-span-2">
          <h3 className="text-xl font-semibold mb-2">Churn Rate Over Time</h3>
          <Chart
            options={churnRateOptions}
            series={churnRateSeries}
            type="line"
            height={300}
          />
        </div>

        {/* 3. R&D and Innovation Strategy Focus Areas */}
        <div className="bg-white rounded-xl p-4 shadow lg:col-span-3">
          <h3 className="text-xl font-semibold mb-2">
            R&D and Innovation Strategy Focus Areas
          </h3>
          <Chart
            options={innovationStrategyOptions}
            series={innovationStrategySeries}
            type="treemap"
            height={350}
          />
        </div>

        {/* 4. Regulatory Compliance / Emission Standards Readiness */}
        <div className="bg-white rounded-xl p-4 shadow lg:col-span-3">
          <h3 className="text-xl font-semibold mb-2">
            Regulatory Compliance / Emission Standards Readiness
          </h3>
          <Chart
            options={complianceOptions}
            series={complianceSeries}
            type="heatmap"
            height={300}
          />
        </div>

        {/* 5. Market Growth Forecast */}
        <div className="bg-white rounded-xl p-4 shadow lg:col-span-4">
          <h3 className="text-xl font-semibold mb-2">Market Growth Forecast</h3>
          <Chart
            options={marketGrowthOptions}
            series={marketGrowthSeries}
            type="line"
            height={300}
          />
        </div>

        {/* 7. Feature Adoption Per Model */}
        <div className="bg-white rounded-xl p-4 shadow self-center lg:col-span-2">
          <h3 className="text-xl font-semibold mb-2">
            Feature Adoption Per Model
          </h3>
          <Chart
            options={featureAdoptionOptions}
            series={featureAdoptionSeries}
            type="radar"
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default MarketTrendsForecasting;
