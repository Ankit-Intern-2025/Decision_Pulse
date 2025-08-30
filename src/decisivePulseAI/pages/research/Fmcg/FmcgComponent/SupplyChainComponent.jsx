import React, { useState } from "react";
import Chart from "react-apexcharts";
import logoSrc from "../../../../components/images/totalsales.png";

const SupplyChainInventoryOptimization = () => {

  // 📊 Stock Levels & Inventory Health (Bar Chart)
  const inventoryHealthOptions = {
    chart: { type: "bar" },
    xaxis: {
      categories: ["Days of Inventory", "SKU-Level Stockouts", "Overstock Alerts"],
    },
    colors: ["#FFB400", "#006064", "#00ACC1"], // Updated colors
    plotOptions: {
      bar: { horizontal: false, columnWidth: "50%" },
    },
    tooltip: { theme: "dark" },
  };

  const inventoryHealthSeries = [
    { name: "Stock Levels", data: [50, 30, 20] },
  ];

  // 📊 Supplier Performance (Radar Chart)
  const supplierPerformanceOptions = {
    chart: { type: "radar" },
    xaxis: {
      categories: ["Delivery Time", "Quality", "Cost", "Flexibility", "Communication"],
    },
    colors: ["#16262E"], // Updated color
    tooltip: { theme: "dark" },
  };

  const supplierPerformanceSeries = [
    { name: "Supplier A", data: [90, 80, 70, 85, 95] },
  ];

  // 📈 Logistics & Distribution Efficiency (Line Chart)


  const logisticsEfficiencySeries = [
    {
      name: 'Product A',    // First product line
      data: [10, 20, 30, 40, 50],  // Corresponding data for Product A
    },
    {
      name: 'Product B',    // Second product line
      data: [15, 25, 35, 45, 55],  // Corresponding data for Product B
    },
    {
      name: 'Product C',    // Third product line
      data: [5, 15, 25, 35, 45],  // Corresponding data for Product C
    },
    {
      name: 'Product D',    // Fourth product line
      data: [20, 30, 40, 50, 60],  // Corresponding data for Product D
    }
  ];

  
  const logisticsEfficiencyOptions = {
    chart: {
      id: 'logistics-efficiency-chart',
      type: 'line',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],  // Categories (e.g., months)
    },
    stroke: {
      width: 2,   // Set the stroke width for the lines
    },
    title: {
      text: 'Logistics & Distribution Efficiency',  // Title of the chart
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#006064',
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
    },
    grid: {
      show: true,
    },
    markers: {
      size: 4,
      hover: {
        sizeOffset: 6,
      },
    },
  };
  

  // 📈 Production vs. Demand Alignment (Stacked Bar Chart)
  const productionVsDemandOptions = {
    chart: { type: "bar" },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "50%", stacking: "normal" },
    },
    xaxis: {
      categories: ["January", "February", "March", "April"],
    },
    colors: ["#006064", "#087F8C", "#00ACC1"], // Updated colors
    tooltip: { theme: "dark" },
  };

  const productionVsDemandSeries = [
    { name: "Production", data: [50, 70, 90, 110] },
    { name: "Demand", data: [40, 60, 80, 100] },
  ];

  return (
    <div className="bg-[#006064] w-[99%] p-8 border-5 rounded-md border-[#FFB400]">
      <h2 className="text-2xl font-bold mb-6 text-white">Supply Chain & Inventory Optimization</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 📊 Stock Levels & Inventory Health */}
        <div className="p-4 shadow-md rounded-lg bg-white">
          <div className="flex justify-between items-center mb-2 w-[80%]">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#006064]">Stock Levels & Inventory Health</h3>
          </div>
          <Chart options={inventoryHealthOptions} series={inventoryHealthSeries} type="bar" height={350} />
        </div>

        {/* 📊 Supplier Performance Analysis */}
        <div className="p-4 shadow-md rounded-lg bg-white">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#006064]">Supplier Performance Analysis</h3>
          </div>
          <Chart options={supplierPerformanceOptions} series={supplierPerformanceSeries} type="radar" height={350} />
        </div>

        <div className="p-4 shadow-md rounded-lg bg-white">
  <div className="flex justify-between items-center mb-2">
    <img src={logoSrc} alt="Logo" className="w-8 h-8" />
    <h3 className="text-lg font-semibold text-[#006064]">Logistics & Distribution Efficiency</h3>
  </div>
  <Chart
    options={logisticsEfficiencyOptions}
    series={logisticsEfficiencySeries}
    type="line"
    height={350}
  />
</div>


        {/* 📈 Production vs. Demand Alignment */}
        <div className="p-4 shadow-md rounded-lg bg-white">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#006064]">Production vs. Demand Alignment</h3>
          </div>
          <Chart options={productionVsDemandOptions} series={productionVsDemandSeries} type="bar" height={350} />
        </div>

      </div>
    </div>
  );
};

export default SupplyChainInventoryOptimization;
