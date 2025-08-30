import React, { useState, useMemo } from "react";
import Chart from "react-apexcharts";
import logoSrc from "../../../../components/images/totalsales.png";

// New Data for Sales & Revenue Performance Dashboard
const categories = ["Electronics", "Home Appliances", "Fashion", "Beauty", "Groceries"];
const regions = ["North America", "Europe", "Asia", "Middle East", "Africa"];
const salesChannels = ["E-commerce", "Retail", "Modern Trade", "Traditional Trade"];

// Chart Colors
const chartColors = [
  "#006064", // Dark Teal
  "#087F8C", // Medium Teal
  "#00ACC1", // Light Teal
  "#FFB400", // Yellow
  "#16262E", // Dark Grayish Blue
  "#4A4A4A", // Gray
  "#878787", // Light Gray
  "#EFEFEF", // Very Light Gray
  "#FFFFFF", // White
];

const SalesRevenue = () => {
  // Total Sales Performance (Stacked Bar Chart)
  const totalSalesData = useMemo(() => {
    const data = regions.map((region) => ({
      name: region,
      data: categories.map(() => Math.floor(Math.random() * 1000) + 100),
    }));

    return {
      series: data,
      options: {
        chart: { type: "bar", stacked: true },
        colors: chartColors.slice(0, regions.length),
        xaxis: { categories: categories, title: { text: "Product Categories" } },
        yaxis: { title: { text: "Revenue ($)" } },
        dataLabels: { enabled: true },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 5,
          },
        },
       
      },
    };
  }, []);

  // Channel Performance (Pie Chart)
  const channelPerformanceData = useMemo(() => {
    return {
      series: [45, 25, 15, 15], // Percentage share for E-commerce, Retail, Modern Trade, Traditional Trade
      options: {
        chart: { type: "pie" },
        labels: salesChannels,
        colors: chartColors.slice(0, salesChannels.length),
        dataLabels: { enabled: true },
        legend: { position: "bottom" },
        plotOptions: {
          pie: {
            donut: {
              size: '60%',
            },
          },
        },
        
      },
    };
  }, []);

  // Top-Selling SKUs & Low-Performing Products (Heatmap Chart)
  const heatmapData = useMemo(() => {
    return {
      series: [
        {
          name: "Sales Volume",
          data: [1000, 2000, 1500, 3000, 2500],
        },
        {
          name: "Growth %",
          data: [10, 20, -5, 15, 30],
        },
      ],
      options: {
        chart: { type: "heatmap" },
        colors: ["#00ACC1", "#FFB400"],
   
        dataLabels: { enabled: true },
        xaxis: { categories: categories },
        yaxis: { title: { text: "Metrics" } },
      },
    };
  }, []);

  // Price Elasticity & Promotions Analysis (Line Chart)
  const promotionsData = useMemo(() => {
    return {
      series: [
        {
          name: "Revenue ($)",
          data: [5000, 5500, 6000, 6500, 7000],
        },
        {
          name: "Margins (%)",
          data: [20, 25, 30, 35, 40],
        },
      ],
      options: {
        chart: { type: "line" },
        colors: [chartColors[2], chartColors[3]],
        xaxis: { categories: ["Q1", "Q2", "Q3", "Q4", "Q5"], title: { text: "Quarters" } },
        yaxis: [
          { title: { text: "Revenue ($)" }, opposite: true },
          { title: { text: "Margins (%)" } },
        ],
        dataLabels: { enabled: true },
    
        stroke: { width: 3 },
      },
    };
  }, []);

  // Competitor Pricing & Market Positioning (Bar Chart)
  const competitorPricingData = useMemo(() => {
    return {
      series: [
        {
          name: "Our Price",
          data: [120, 150, 100, 90, 80],
        },
        {
          name: "Competitor Price",
          data: [110, 145, 95, 85, 75],
        },
      ],
      options: {
        chart: { type: "bar" },
        colors: [chartColors[0], chartColors[1]],
        xaxis: { categories: categories, title: { text: "Product Categories" } },
        yaxis: { title: { text: "Price ($)" } },
        dataLabels: { enabled: true },
  
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 5,
          },
        },
      },
    };
  }, []);

  return (
    <div className="bg-[#006064] w-[99%] p-8 border-5 rounded-md border-[#FFB400]">
      <h2 className="text-2xl font-semibold mb-4 text-white">Sales & Revenue Performance Dashboard</h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Total Sales Performance */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Total Sales Performance</h3>
          </div>
          <Chart options={totalSalesData.options} series={totalSalesData.series} type="bar" height={350} />
        </div>

        {/* Channel Performance */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Channel Performance</h3>
          </div>
          <Chart options={channelPerformanceData.options} series={channelPerformanceData.series} type="pie" height={350} />
        </div>

        {/* Top-Selling SKUs & Low-Performing Products */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Top-Selling SKUs & Low-Performing Products</h3>
          </div>
          <Chart options={heatmapData.options} series={heatmapData.series} type="heatmap" height={350} />
        </div>

        {/* Price Elasticity & Promotions Analysis */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Price Elasticity & Promotions Analysis</h3>
          </div>
          <Chart options={promotionsData.options} series={promotionsData.series} type="line" height={350} />
        </div>

        {/* Competitor Pricing & Market Positioning */}
      
      </div>
      <div className="flex justify-center items-center mt-6 ">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Competitor Pricing & Market Positioning</h3>
          </div>
          <Chart options={competitorPricingData.options} series={competitorPricingData.series} type="bar" height={350} />
        </div>
        </div>
    </div>
  );
};

export default SalesRevenue;
