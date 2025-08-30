import React, { useState } from "react";
import Chart from "react-apexcharts";

const EVSustainabilityComponent = () => {
  const logoSrc = "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg";

  // Filters (States)
  const [selectedYearRange, setSelectedYearRange] = useState("2019-2024");
  const [selectedCostRange, setSelectedCostRange] = useState("All");
  const [selectedPolicy, setSelectedPolicy] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("USA");

  // 🟢 Battery Efficiency Trends (Filter Logic)
  const allYears = ["2019", "2020", "2021", "2022", "2023", "2024"];
  const filteredYears = selectedYearRange === "2021-2024" ? allYears.slice(2) : allYears;

  const rangeAreaOptions = { chart: { type: "area" }, xaxis: { categories: filteredYears }, colors: ["#006064", "#00ACC1"] };
  const rangeAreaSeries = [
    { name: "Min Efficiency", data: selectedYearRange === "2021-2024" ? [85, 87, 89, 90] : [80, 82, 85, 87, 89, 90] },
    { name: "Max Efficiency", data: selectedYearRange === "2021-2024" ? [92, 93, 95, 97] : [88, 90, 92, 93, 95, 97] }
  ];

  // 🔵 Battery Cost vs Efficiency vs Range (Filter Logic)
  const allCostData = [{ x: 100, y: 300, z: 40 }, { x: 120, y: 320, z: 50 }, { x: 150, y: 350, z: 60 }];
  const filteredCostData = selectedCostRange === "Low" ? allCostData.filter(d => d.x <= 120) :
                           selectedCostRange === "High" ? allCostData.filter(d => d.x >= 120) :
                           allCostData;

  const bubbleChartOptions = { chart: { type: "bubble" }, colors: ["#FFB400"] };
  const bubbleChartSeries = [{ name: "EV Models", data: filteredCostData }];

  // 🟠 Regulatory & Policy Impact (Filter Logic)
  const slopeChartOptions = { chart: { type: "line" }, xaxis: { categories: ["2018", "2020", "2022", "2024"] }, colors: ["#087F8C", "#FFB400"] };
  const slopeChartSeries = selectedPolicy === "Emission" ? [{ name: "Emission Standards", data: [30, 45, 55, 70] }] :
                           selectedPolicy === "Subsidies" ? [{ name: "EV Subsidies", data: [10, 30, 50, 80] }] :
                           [{ name: "Emission Standards", data: [30, 45, 55, 70] }, { name: "EV Subsidies", data: [10, 30, 50, 80] }];

  // 🔴 EV Market Comparison (Filter Logic)
  const allBrands = [
    { name: "Tesla", data: [5000, 6000, 7000, 8000] },
    { name: "Mercedes", data: [4000, 5000, 6000, 7000] },
    { name: "BMW", data: [4500, 5500, 6500, 7500] },
    { name: "Audi", data: [4200, 5200, 6200, 7200] }
  ];
  const filteredBrands = selectedBrand === "All" ? allBrands : allBrands.filter(brand => brand.name === selectedBrand);

  const stackedBarOptions = { chart: { type: "bar", stacked: true }, xaxis: { categories: ["Q1", "Q2", "Q3", "Q4"] }, colors: ["#006064", "#FFB400", "#00ACC1", "#16262E"] };
  const stackedBarSeries = filteredBrands;

  // 🗺️ Charging Infrastructure Expansion (Filtered by Region)
  const chargingData = { USA: [30, 40, 50, 70, 80], Europe: [20, 35, 55, 60, 75], Asia: [40, 50, 60, 80, 90] };
  const heatmapOptions = { chart: { type: "heatmap" }, xaxis: { categories: ["West", "East", "South", "North", "Central"] }, colors: ["#FFB400"] };
  const heatmapSeries = [{ name: "Charging Stations", data: chargingData[selectedRegion] }];

  return (
    <div className="bg-[#006064] w-[99%] p-16 rounded-md border-[#FFB400]">
      <h2 className="text-2xl font-bold mb-4 text-white">EV Sustainability Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 🟢 Battery Efficiency Trends */}
        <div className="p-4 shadow-md rounded-lg bg-white">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-[#006064]">Charging Infrastructure Expansion</h3>
            <select className="border p-2 rounded" onChange={(e) => setSelectedYearRange(e.target.value)}>
              <option value="2019-2024">2019-2024</option>
              <option value="2021-2024">2021-2024</option>
            </select>
          </div>
          <Chart options={rangeAreaOptions} series={rangeAreaSeries} type="area" height={350} />
        </div>

        {/* 🔵 Battery Cost vs Efficiency vs Range */}
        <div className="p-4 shadow-md rounded-lg bg-white">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-[#006064]">Battery Cost Distribution</h3>
            <select className="border p-2 rounded" onChange={(e) => setSelectedCostRange(e.target.value)}>
              <option value="All">All</option>
              <option value="Low">Low</option>
              <option value="High">High</option>
            </select>
          </div>
          <Chart options={bubbleChartOptions} series={bubbleChartSeries} type="bubble" height={350} />
        </div>

        {/* 🟠 Regulatory & Policy Impact */}
        <div className="p-4 shadow-md rounded-lg bg-white">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-[#006064]">Regulatory & Policy Impact:</h3>
            <select className="border p-2 rounded" onChange={(e) => setSelectedPolicy(e.target.value)}>
              <option value="All">All</option>
              <option value="Emission">Emission Standards</option>
              <option value="Subsidies">EV Subsidies</option>
            </select>
          </div>
          <Chart options={slopeChartOptions} series={slopeChartSeries} type="line" height={350} />
        </div>

        {/* 🔴 EV Market Comparison */}
        <div className="p-4 shadow-md rounded-lg bg-white">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-[#006064]">EV Sales & Growth Rate</h3>
            <select className="border p-2 rounded" onChange={(e) => setSelectedBrand(e.target.value)}>
              <option value="All">All</option>
              <option value="Tesla">Tesla</option>
              <option value="Mercedes">Mercedes</option>
            </select>
          </div>
          <Chart options={stackedBarOptions} series={stackedBarSeries} type="bar" height={350} />
        </div>

      </div>
    </div>
  );
};

export default EVSustainabilityComponent;
