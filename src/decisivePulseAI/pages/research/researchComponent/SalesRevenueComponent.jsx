import React, { useState } from "react";
import Chart from "react-apexcharts";
import logoSrc from "../../../components/images/totalsales.png";

const SalesRevenueComponent = () => {
  // Colors for charts
  const colors = ["#FFB400", "#16262E", "#00ACC1", "#087F8C", "#4A4A4A"];

  // Filters State
  const [region, setRegion] = useState("All");
  const [carType, setCarType] = useState("All");

  // **Enhanced DATASETS**

  // Sales by Region (with more granular data)
  const expandedRegions = {
    USA: [800, 500, 300],
    Canada: [600, 400, 200],
    Mexico: [500, 350, 150],
    Europe: [900, 600, 400],
    UK: [300, 200, 100],
    Germany: [500, 300, 150],
    Asia: [750, 550, 350],
    China: [400, 300, 200],
    India: [350, 250, 150],
    Other: [600, 400, 200],
    Africa: [200, 150, 100], // New region
    All: [800, 900, 750, 600], // Default (all combined)
  };

  // Car Types (Enhanced Categories)
  const allRevenue = {
    Luxury: [40, 0, 0, 0, 0],        // Show only Luxury
    "Entry-Level": [0, 35, 0, 0, 0], // Show only Entry-Level
    EVs: [0, 0, 25, 0, 0],          // Show only EVs
    Hybrid: [0, 0, 0, 30, 0],       // Show only Hybrid
    Sports: [0, 0, 0, 0, 40],       // Show only Sports
    SUVs: [0, 0, 0, 0, 30],         // Show only SUVs
    All: [40, 35, 25, 30, 40],      // Default (all combined)
  };

  // Channel-Wise Performance (with more sales channels)
  const expandedChannelPerformanceData = {
    USA: [50, 30, 10, 10],  // Online, Dealership, Third-Party, Direct Sales
    Europe: [40, 40, 10, 10],
    Asia: [60, 20, 10, 10],
    Other: [70, 15, 10, 5],
    Africa: [60, 25, 10, 5],
    All: [55, 30, 10, 5],    // Default (combined)
  };

  // ROI Analysis (Discount & Promotion Impact)
  const campaignROIAnalysisData = {
    Campaign1: [20, 25, 30, 10],   // ROI for Campaign1
    Campaign2: [40, 30, 15, 25],   // ROI for Campaign2
    Campaign3: [50, 20, 25, 15],   // ROI for Campaign3
    Campaign4: [30, 25, 20, 35],   // ROI for Campaign4
    All: [35, 25, 25, 25],        // Default (combined)
  };

  // Customer Retention by Region
  const retentionByRegion = {
    USA: [80, 60, 90, 75],
    Europe: [70, 55, 85, 80],
    Asia: [60, 50, 70, 65],
    Other: [75, 65, 80, 70],
    Africa: [65, 60, 75, 60],  // New region
    All: [75, 65, 80, 70],     // Default (combined)
  };

  // **Filtered Data Based on Selection**

  // Filtered Data for Stacked Bar Series
  const stackedBarSeries = [
    { name: "Global", data: expandedRegions[region] || expandedRegions["All"] },
    { name: "Regional", data: expandedRegions[region] || expandedRegions["All"] },
    { name: "Country", data: expandedRegions[region] || expandedRegions["All"] },
  ];

  // Filtered Data for Donut Chart (Revenue by Car Type)
  const donutSeries = allRevenue[carType] || allRevenue["All"];

  // Filtered Data for Channel-Wise Performance
  const selectedChannelData = expandedChannelPerformanceData[region] || expandedChannelPerformanceData["All"];

  // Filtered Data for ROI Analysis (Campaigns)
  const roiSeries = campaignROIAnalysisData[region] || campaignROIAnalysisData["All"];

  // Filtered Data for Retention & Churn
  const retentionSeries = retentionByRegion[region] || retentionByRegion["All"];

  // **Yearly Sales Data**
  const yearlySales = {
    USA: [100, 130, 110, 160, 140, 190, 170],
    Europe: [90, 120, 100, 150, 130, 180, 160],
    Asia: [80, 110, 90, 140, 120, 170, 150],
    Other: [70, 100, 80, 130, 110, 160, 140],
    Africa: [60, 80, 100, 120, 110, 140, 160],  // New region
    All: [100, 130, 110, 160, 140, 190, 170],  // Default (combined)
  };

  // **Line Chart Data for Yearly Sales Trends**
  const selectedRegions = region === "All" ? ["USA", "Europe", "Asia", "Other", "Africa"] : [region, "USA", "Europe"];
  const lineChartSeries = selectedRegions.map((r) => ({
    name: r,
    data: yearlySales[r],
  }));

  // **Chart Options for Channel-Wise Performance**
  const channelPerformanceOptions = {
    chart: { type: "bar", horizontal: true },
    plotOptions: {
      bar: { horizontal: true, dataLabels: { position: "top" } },
    },
    colors: colors,
    xaxis: { categories: ["USA", "Europe", "Asia", "Other", "Africa"] },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val}%`, // Add percentage labels
    },
  };

  // **Chart Options for ROI Analysis**
  const roiAnalysisOptions = {
    chart: { type: "scatter" },
    colors: colors,
    xaxis: { categories: ["Q1", "Q2", "Q3", "Q4"] },
    markers: { size: 8, colors: ["#FFB400", "#16262E", "#00ACC1", "#087F8C"] },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val} %`, // Add percentage labels
    },
  };

  // **Chart Options for Retention & Churn**
  const retentionChurnOptions = {
    chart: { type: "bar", horizontal: true, height: 350 },
    colors: ["#00ACC1", "#FF5733"],
    xaxis: { categories: ["January", "February", "March", "April"] },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: { position: "top" },
      },
    },
    legend: { position: "top", horizontalAlign: "center" },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val}%`, // Add percentage labels
    },
  };

  return (
    <div className="bg-[#006064] w-[99%] p-16 border-5 rounded-md border-red-500">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Sales & Revenue Performance
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {/* 1. Stacked Bar Chart for Total Sales Performance */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <div className="flex items-center gap-10 mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#006064]">Total Sales Performance</h3>
          </div>
          <div className="flex items-end justify-end">
            <select className="border p-2 mb-2" onChange={(e) => setRegion(e.target.value)}>
              <option value="All">All Regions</option>
              <option value="USA">USA</option>
              <option value="Europe">Europe</option>
              <option value="Asia">Asia</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <Chart
            options={{ chart: { type: "bar", stacked: true }, colors: colors }}
            series={stackedBarSeries}
            type="bar"
            height={300}
          />
        </div>

        {/* 2. Donut Chart for Revenue Contribution */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <div className="flex items-center gap-10 mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#006064]">Revenue Contribution</h3>
          </div>
          <div className="flex items-end justify-end">
            <select className="border p-2 mb-2" onChange={(e) => setCarType(e.target.value)}>
              <option value="All">All Types</option>
              <option value="Luxury">Luxury</option>
              <option value="Entry-Level">Entry-Level</option>
              <option value="EVs">EVs</option>
            </select>
          </div>
          <Chart
            options={{ labels: ["Luxury", "Entry-Level", "EVs"], colors: colors }}
            series={donutSeries}
            type="donut"
            height={300}
          />
        </div>

        {/* 3. Channel-Wise Performance */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <div className="flex items-center gap-10 mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#006064]">Channel-Wise Performance</h3>
          </div>
          <Chart
            options={channelPerformanceOptions}
            series={[
              { name: "Online", data: selectedChannelData },
              { name: "Dealership", data: selectedChannelData },
            ]}
            type="bar"
            height={300}
          />
        </div>

        {/* 4. Discount & Promotion Impact */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <div className="flex items-center gap-10 mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#006064]">Discount & Promotion Impact</h3>
          </div>
          <Chart
            options={roiAnalysisOptions}
            series={[
              { name: "Campaign1", data: campaignROIAnalysisData.Campaign1 },
              { name: "Campaign2", data: campaignROIAnalysisData.Campaign2 },
              { name: "Campaign3", data: campaignROIAnalysisData.Campaign3 },
              { name: "Campaign4", data: campaignROIAnalysisData.Campaign4 },
            ]}
            type="scatter"
            height={300}
          />
        </div>

        {/* 5. Customer Retention & Churn Rate */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <div className="flex items-center gap-10 mb-2">
              <img src={logoSrc} alt="Logo" className="w-8 h-8" />
              <h3 className="text-lg font-semibold text-[#006064]">Customer Retention & Churn Rate</h3>
            </div>
            <Chart
              options={retentionChurnOptions}
              series={[
                { name: "Retained", data: retentionSeries },
                { name: "Churned", data: retentionSeries },
              ]}
              type="bar"
              height={300}
            />
          </div>
      </div>
    </div>
  );
};

export default SalesRevenueComponent;
