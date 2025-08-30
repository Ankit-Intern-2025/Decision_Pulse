import React, { useState } from "react";
import Chart from "react-apexcharts";
import logoSrc from "../../../../components/images/totalsales.png";

const SupplyChainAnalytics = () => {
  const [selectedPipelineType, setSelectedPipelineType] = useState("All");

  // 📈 Pipeline & Shipping Performance (Line Chart)
  const pipelineShippingOptions = {
    chart: { type: "line" },
    xaxis: {
      categories: ["Q1", "Q2", "Q3", "Q4"],
    },
    colors: ["#FF5733", "#2E7D32"],
    stroke: { curve: "smooth", width: 2 },
    tooltip: { theme: "dark" },
  };

  const pipelineShippingSeries = [
    { name: "Pipeline Throughput", data: [200, 400, 600, 800] },
    { name: "Shipping Volume", data: [150, 350, 550, 700] },
  ];

  // 📊 Refinery & Processing Capacity Utilization (Pie Chart)
  const processingUtilization = {
    All: [40, 30, 20, 10],
    High: [60, 20, 15, 5],
    Medium: [30, 40, 25, 5],
    Low: [20, 30, 40, 10],
  };
  const pieChartSeries = processingUtilization[selectedPipelineType];

  const refineryOptions = {
    chart: { type: "pie" },
    labels: ["High", "Medium", "Low", "All"],
    colors: ["#006064",
      "#087F8C",
      "#00ACC1",
      
      ,"#FFB400"],
    tooltip: { theme: "dark" },
  };

  // 📊 Cost Optimization Strategies (Bar Graph)
  const costOptimizationOptions = {
    chart: { type: "bar" },
    xaxis: {
      categories: ["Logistics", "Warehousing", "Supplier Management", "Transportation"],
    },
    colors: ["#FFB400", "#087F8C"],
    plotOptions: {
      bar: { horizontal: false, columnWidth: "50%" },
    },
    tooltip: { theme: "dark" },
  };

  const costOptimizationSeries = [
    { name: "Optimized Costs", data: [300, 500, 700, 900] },
    { name: "Non-Optimized Costs", data: [100, 200, 300, 400] },
  ];

  // 📊 Shipment Distribution (Donut Chart)
  const shipmentDistributionOptions = {
    chart: {
      type: "donut",
    },
    labels: ["North America", "Europe", "Asia", "Rest of World"],
    colors: ["#006064", "#2E7D32", "#00ACC1", "#FFB400"],
    tooltip: { theme: "dark" },
  };

  const shipmentDistributionSeries = [40, 30, 20, 10];

  // 📊 Monthly Sales Comparison (Stacked Bar Chart)
  const salesComparisonOptions = {
    chart: { type: "bar" },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "50%", stacking: "normal" },
    },
    xaxis: {
      categories: ["January", "February", "March", "April"],
    },
    colors: ["#006064",
      "#087F8C",
      "#00ACC1"],
    tooltip: { theme: "dark" },
  };

  const salesComparisonSeries = [
    { name: "Product A", data: [50, 60, 80, 100] },
    { name: "Product B", data: [30, 40, 70, 90] },
    { name: "Product C", data: [20, 30, 60, 80] },
  ];

  // 📈 Demand Forecasting (Area Chart)
  const demandForecastingOptions = {
    chart: {
      type: "area",
      zoom: { enabled: false },
    },
    xaxis: {
      categories: ["Q1", "Q2", "Q3", "Q4"],
    },
    colors: ["#00ACC1"],
    stroke: { curve: "smooth", width: 2 },
    tooltip: { theme: "dark" },
  };

  const demandForecastingSeries = [
    { name: "Demand", data: [400, 500, 700, 800] },
  ];

  // 📊 Supplier Performance (Radar Chart)
  // const supplierPerformanceOptions = {
  //   chart: { type: "radar" },
  //   xaxis: {
  //     categories: ["Delivery Time", "Quality", "Cost", "Flexibility", "Communication"],
  //   },
  //   colors: ["#16262E"],
  //   tooltip: { theme: "dark" },
  // };

  // const supplierPerformanceSeries = [
  //   { name: "Supplier A", data: [90, 80, 70, 85, 95] },
  // ];

  return (
    <div className="bg-[#006064] w-[99%] p-8 border-5 rounded-md border-[#FFB400]">
      <h2 className="text-2xl font-bold mb-6 text-white">Supply Chain & Logistics Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 📈 Pipeline & Shipping Performance */}
        <div className="p-4 shadow-md rounded-lg bg-white">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#006064]">Pipeline & Shipping Performance</h3>
          </div>
          <Chart options={pipelineShippingOptions} series={pipelineShippingSeries} type="line" height={350} />
        </div>

        {/* 📊 Refinery & Processing Capacity Utilization */}
        <div className="p-4 shadow-md rounded-lg bg-white">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#006064]">Refinery & Processing Capacity Utilization</h3>
          </div>
          <Chart
            options={refineryOptions}
            series={pieChartSeries}
            type="pie"
            height={350}
          />
        </div>

        {/* 📊 Cost Optimization Strategies */}
        <div className="p-4 shadow-md rounded-lg bg-white">
          <div className="flex justify-between items-center mb-2 w-[80%]">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#006064]">Cost Optimization Strategies</h3>
          </div>
          <Chart options={costOptimizationOptions} series={costOptimizationSeries} type="bar" height={350} />
        </div>

        {/* 📊 Shipment Distribution (Donut Chart) */}
        <div className="p-4 shadow-md rounded-lg bg-white">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#006064]">Shipment Distribution</h3>
          </div>
          <Chart
            options={shipmentDistributionOptions}
            series={shipmentDistributionSeries}
            type="donut"
            height={350}
          />
        </div>

        {/* 📊 Monthly Sales Comparison (Stacked Bar Chart) */}
        <div className="p-4 shadow-md rounded-lg bg-white">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#006064]">Monthly Sales Comparison</h3>
          </div>
          <Chart
            options={salesComparisonOptions}
            series={salesComparisonSeries}
            type="bar"
            height={350}
          />
        </div>

        {/* 📈 Demand Forecasting (Area Chart) */}
        <div className="p-4 shadow-md rounded-lg bg-white">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#16262E]">Demand Forecasting</h3>
          </div>
          <Chart
            options={demandForecastingOptions}
            series={demandForecastingSeries}
            type="area"
            height={350}
          />
        </div>

        {/* 📊 Supplier Performance (Radar Chart) */}
        {/* <div className="p-4 shadow-md rounded-lg bg-white">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#006064]">Supplier Performance</h3>
          </div>
          <Chart
            options={supplierPerformanceOptions}
            series={supplierPerformanceSeries}
            type="radar"
            height={350}
          />
        </div> */}
      </div>
    </div>
  );
};

export default SupplyChainAnalytics;
