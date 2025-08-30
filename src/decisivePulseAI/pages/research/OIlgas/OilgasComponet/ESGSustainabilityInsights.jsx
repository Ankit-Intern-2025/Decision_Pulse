import React, { useState } from "react";
import Chart from "react-apexcharts";
import logoSrc from "../../../../components/images/totalsales.png";
const ESGSustainabilityInsights = () => {
  const [year, setYear] = useState("2028");

  // 🌱 Renewable Energy Transition (Stacked Bar Chart)
  const renewableEnergyData = {
    "2028": {
      solar: [20, 25, 30, 35, 40],
      wind: [15, 20, 25, 30, 35],
      hydrogen: [10, 15, 20, 25, 30],
      hydro: [12, 18, 22, 28, 33],
      geothermal: [8, 12, 18, 22, 27],
    },
    "2029": {
      solar: [25, 30, 35, 40, 45],
      wind: [20, 25, 30, 35, 40],
      hydrogen: [15, 20, 25, 30, 35],
      hydro: [14, 20, 25, 30, 36],
      geothermal: [10, 15, 20, 25, 30],
    },
  };

  const renewableEnergyOptions = {
    chart: { type: "bar", stacked: true, height: 350 },
    xaxis: { categories: ["Solar", "Wind", "Hydrogen", "Hydropower", "Geothermal"] }, // ✅ Logical categories
    colors: ["#00ACC1", "#087F8C", "#FFB400", "#16262E", "#4A4A4A"],
    grid: {
      show: true,
      borderColor: "#000000",
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } }
    }
  };
  

  const renewableEnergySeries = [
    { name: "Solar", data: renewableEnergyData[year].solar },
    { name: "Wind", data: renewableEnergyData[year].wind },
    { name: "Hydrogen", data: renewableEnergyData[year].hydrogen },
    { name: "Hydro", data: renewableEnergyData[year].hydro },
    { name: "Geothermal", data: renewableEnergyData[year].geothermal },
  ];

  // 📜 Regulatory Compliance Dashboard (Pie Chart)
  const regulatoryComplianceData = {
    "2028": [40, 25, 15, 10, 10],
    "2029": [45, 20, 15, 10, 10],
  };

  const regulatoryComplianceOptions = {
    chart: { type: "pie" },
    labels: ["Compliant", "Partially Compliant", "Under Review", "Non-Compliant", "Pending"],
    colors: ["#006064", "#00ACC1", "#087F8C", "#FFB400", "#4A4A4A"],
  };

  const regulatoryComplianceSeries = regulatoryComplianceData[year];

  // 🌍 Decarbonization & Net-Zero Targets (Bar Chart)
  const decarbonizationData = {
    "2028": [60, 55, 50, 45, 40],
    "2029": [55, 50, 45, 40, 35],
  };
  const decarbonizationOptions = {
    chart: { type: "bar", height: 350 },
    xaxis: { 
      categories: [
        "Renewable Energy Adoption", 
        "Carbon Capture & Storage", 
        "Energy Efficiency Improvements", 
        "Regulatory Compliance", 
        "Net-Zero Roadmap Progress"
      ] 
    },
    colors: ["#878787"],
    grid: {
      show: true, // ✅ Ensures grid is visible
      borderColor: "#000000", // ✅ Black grid lines
      strokeDashArray: 4, // ✅ Dashed lines for subtle effect
      xaxis: { lines: { show: true } }, // ✅ Ensure vertical grid lines show
      yaxis: { lines: { show: true } } // ✅ Ensure horizontal grid lines show
    }
  };
  

  const decarbonizationSeries = [
    { name: "Emission Reduction", data: decarbonizationData[year] },
  ];

  // 📈 Connected Scatter Plot Chart
  const scatterData = {
    "2028": [
      { x: "Jan", y: 10 },
      { x: "Apr", y: 20 },
      { x: "Jul", y: 30 },
      { x: "Oct", y: 40 },
      { x: "Dec", y: 50 },
    ],
    "2029": [
      { x: "Jan", y: 15 },
      { x: "Apr", y: 25 },
      { x: "Jul", y: 35 },
      { x: "Oct", y: 45 },
      { x: "Dec", y: 55 },
    ],
  };

  const scatterOptions = {
    chart: { type: "scatter", height: 350 },
    xaxis: { title: { text: "Months" }, categories: ["Jan", "Apr", "Jul", "Oct", "Dec"] },
    yaxis: { title: { text: "Carbon Emissions & Sustainability Score" } },
    stroke: { curve: "smooth" },
    grid: {
      show: true, // ✅ Ensures grid is visible
      borderColor: "#000000", // ✅ Light gray grid lines
      strokeDashArray: 4, // ✅ Dashed lines for subtle effect
      xaxis: { lines: { show: true } }, // ✅ Ensure vertical grid lines show
      yaxis: { lines: { show: true } } // ✅ Ensure horizontal grid lines show
  } 
  };

  return (
    <div className="bg-[#006064] w-[99%] p-8 border-5 rounded-md border-[#FFB400]">
      <h2 className="text-2xl font-semibold mb-4 text-white">ESG Sustainability Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 🌱 Renewable Energy Transition */}
        <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Renewable Energy Transition</h3>
          <select value={year} onChange={(e) => setYear(e.target.value)} className="border p-2">
            <option value="2028">2028</option>
            <option value="2029">2029</option>
          </select>
          </div>
          <Chart options={renewableEnergyOptions} series={renewableEnergySeries} type="bar" height={350} />
        </div>

        {/* 📜 Regulatory Compliance Dashboard */}
        <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Regulatory Compliance Dashboard</h3>
            </div>
          <Chart options={regulatoryComplianceOptions} series={regulatoryComplianceSeries} type="pie" height={350} />
        </div>

        {/* 🌍 Decarbonization & Net-Zero Targets */}
        <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Decarbonization & Net-Zero Targets</h3>
          </div>
          <Chart options={decarbonizationOptions} series={decarbonizationSeries} type="bar" height={350} />
        </div>

        {/* 📈 Connected Scatter Plot Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Carbon Emissions & Sustainability Score</h3>
            </div>
          <Chart options={scatterOptions} series={[{ name: "Trend", data: scatterData[year] }]} type="scatter" height={350} />
        </div>
      </div>
    </div>
  );
};

export default ESGSustainabilityInsights;
