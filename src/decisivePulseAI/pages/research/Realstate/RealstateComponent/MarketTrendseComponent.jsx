

import logoSrc from "../../../../components/images/totalsales.png";
import React, { useState } from "react";
import Chart from "react-apexcharts";

const RealEstateTrendsDashboard = () => {
  console.log("Real Estate Market");

  // State for forecast periods for different charts
  const [lineForecastPeriod, setLineForecastPeriod] = useState("6 Months");
  const [heatmapForecastPeriod, setHeatmapForecastPeriod] = useState("6 Months");
  const [scatterForecastPeriod, setScatterForecastPeriod] = useState("6 Months");

  const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr2", "May2", "Jun2"];

  // Housing & Rental Price Forecasting (Line Chart)
  const lineChartOptions = {
    chart: { type: "line", height: 350 },
    xaxis: { categories: months },
    stroke: { curve: "smooth", width: 3 },
    title: { text: `Price Forecast (${lineForecastPeriod})`, align: "left", style: { color: "#00ACC1" } },
    colors: ["#006064", "#087F8C", "#00ACC1", "#FFB400", "#16262E"]
  };

  const lineChartData = [
    { name: "Housing Price ($K)", data: [500, 330, 200, 350, 360, 370, 375, 380, 390, 400, 410, 500, 100, 200, 700] },
    { name: "Rental Price ($K)", data: [420, 400, 400, 340, 145, 150, 155, 160, 165, 170, 175, 500, 330, 200, 350] },
    { name: "Commercial Property Price ($K)", data: [900, 210, 215, 225, 230, 240, 245, 250, 260, 270, 500, 330, 200, 350] },
    { name: "Luxury Property Price ($K)", data: [500, 510, 520, 530, 540, 550, 555, 560, 570, 580, 590, 600, 610, 620, 630] },
    { name: "Suburban Property Price ($K)", data: [150, 160, 165, 170, 175, 180, 185, 190, 195, 200, 530, 540, 550, 555] }
  ];

  // Regional Demand & Supply (Heatmap)
  const regions = ["North", "South", "East", "West", "Central", "Coastal", "Suburban"];
  const heatmapData = regions.map(region => ({
    name: region,
    data: Array(10).fill().map(() => Math.floor(Math.random() * 100))
  }));

  const heatmapOptions = {
    chart: { type: "heatmap", height: 350 },
    xaxis: { categories: ["Demand", "Supply", "Growth", "Vacancy", "Prices", "Inventory", "Affordability", "New Developments", "Luxury Market", "Commercial Space"] },
    colors: ["#006064", "#087F8C", "#00ACC1"]
  };

  // Sustainability vs Price (Connected Scatter Plot)
  const scatterChartData = [{
    name: "Green Buildings",
    data: [[400, 600], [400, 140], [360, 300], [500, 200], [500, 420], [600, 450], [700, 480], [800, 500], [900, 520], [1000, 550]]
  }];

  const scatterChartOptions = {
    chart: { type: "scatter", height: 350 },
    xaxis: { title: { text: "Sustainability Score", style: { color: "#00ACC1" } } },
    yaxis: { title: { text: "Property Price ($K)", style: { color: "#00ACC1" } } },
    colors: ["#FFB400"],
  };

  return (
    <div className="bg-[#006064] w-[99%] p-8 border-5 rounded-md border-[#FFB400]">


      <h2 className="text-2xl font-bold mb-4 text-[white]">AI-Powered Real Estate Trends</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Housing & Rental Price Forecast */}
        <div className="bg-gray-100 p-4 rounded-lg" style={{ backgroundColor: "#EFEFEF" }}>
        <div className="flex justify-between items-center mb-2">
        <img src={logoSrc} alt="Logo" className="w-8 h-8" />
         <h3 className="text-lg font-semibold text-[#087F8C]">Housing & Rental Price Forecast</h3>
          <select value={lineForecastPeriod} onChange={(e) => setLineForecastPeriod(e.target.value)} className="mb-4 p-2 border border-gray-300 rounded" style={{ borderColor: "#4A4A4A" }}>
            <option>6 Months</option>
            <option>12 Months</option>
            <option>18 Months</option>
            <option>24 Months</option>
          </select>
          </div>
          <Chart options={lineChartOptions} series={lineChartData} type="line" height={350} />
        </div>

        {/* Regional Demand & Supply */}
        <div className="bg-gray-100 p-4 rounded-lg" style={{ backgroundColor: "#EFEFEF" }}>
        <div className="flex justify-between items-center mb-2">
        <img src={logoSrc} alt="Logo" className="w-8 h-8" />
        <h3 className="text-lg font-semibold text-[#087F8C]">Regional Demand & Supply</h3>
          <select value={heatmapForecastPeriod} onChange={(e) => setHeatmapForecastPeriod(e.target.value)} className="mb-4 p-2 border border-gray-300 rounded" style={{ borderColor: "#4A4A4A" }}>
            <option>6 Months</option>
            <option>12 Months</option>
            <option>18 Months</option>
            <option>24 Months</option>
          </select>
          </div>
          <Chart options={heatmapOptions} series={heatmapData} type="heatmap" height={350} />
        </div>

        {/* Sustainability vs Price (Scatter Plot) */}
        <div className="bg-gray-100 p-4 rounded-lg" style={{ backgroundColor: "#EFEFEF" }}>
        <div className="flex justify-between items-center mb-2">
        <img src={logoSrc} alt="Logo" className="w-8 h-8" />
        <h3 className="text-lg font-semibold text-[#087F8C]">Sustainability & Smart Cities</h3>
          <select value={scatterForecastPeriod} onChange={(e) => setScatterForecastPeriod(e.target.value)} className="mb-4 p-2 border border-gray-300 rounded" style={{ borderColor: "#4A4A4A" }}>
            <option>6 Months</option>
            <option>12 Months</option>
            <option>18 Months</option>
            <option>24 Months</option>
          </select>
          </div>
          <Chart options={scatterChartOptions} series={scatterChartData} type="scatter" height={350} />
        </div>

        <div className="p-4 shadow-md rounded-lg bg-white">
          <div className="flex justify-between items-center mb-2 w-[70%]">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Geopolitical & Economic Impact</h3>
          </div>
          <ul className="list-none pl-2 pt-2 text-[#4A4A4A]">
            <li className="flex items-center justify-start gap-3 pt-2">
              <span className="bg-[#16262E] text-white w-7 h-7 flex items-start justify-center rounded-full  text-sm">→</span><p>  Implement AI-driven demand forecasting to reduce inventory costs.</p>
            </li>
            <li className="flex items-center justify-start gap-3 pt-2">
              <span className="bg-[#16262E] text-white w-7 h-7 flex items-start justify-center rounded-full  text-sm">→</span><p>  Implement AI-driven demand forecasting to reduce inventory costs.</p>
            </li>
            <li className="flex items-center justify-start gap-3 pt-2">
              <span className="bg-[#16262E] text-white w-7 h-7 flex items-start justify-center rounded-full  text-sm">→</span><p>  Implement AI-driven demand forecasting to reduce inventory costs.</p>
            </li>
            <li className="flex items-center justify-start gap-3 pt-2">
              <span className="bg-[#16262E] text-white w-7 h-7 flex items-start justify-center rounded-full  text-sm">→</span><p>  Implement AI-driven demand forecasting to reduce inventory costs.</p>
            </li>
            <li className="flex items-center justify-start gap-3 pt-2">
              <span className="bg-[#16262E] text-white w-7 h-7 flex items-start justify-center rounded-full  text-sm">→</span><p>  Implement AI-driven demand forecasting to reduce inventory costs.</p>
            </li>
            <li className="flex items-center justify-start gap-3 pt-2">
              <span className="bg-[#16262E] text-white w-7 h-7 flex items-start justify-center rounded-full  text-sm">→</span><p>  Implement AI-driven demand forecasting to reduce inventory costs.</p>
            </li>
            <li className="flex items-center justify-start gap-3 pt-2">
              <span className="bg-[#16262E] text-white w-7 h-7 flex items-start justify-center rounded-full  text-sm">→</span><p>  Implement AI-driven demand forecasting to reduce inventory costs.</p>
            </li>
            <li className="flex items-center justify-start gap-3 pt-2">
              <span className="bg-[#16262E] text-white w-7 h-7 flex items-start justify-center rounded-full  text-sm">→</span><p>  Implement AI-driven demand forecasting to reduce inventory costs.</p>
            </li>
            <li className="flex items-center justify-start gap-3 pt-2">
              <span className="bg-[#16262E] text-white w-7 h-7 flex items-start justify-center rounded-full  text-sm">→</span><p>  Implement AI-driven demand forecasting to reduce inventory costs.</p>
            </li>
            <li className="flex items-center justify-start gap-3 pt-2">
              <span className="bg-[#16262E] text-white w-7 h-7 flex items-start justify-center rounded-full  text-sm">→</span><p>  Implement AI-driven demand forecasting to reduce inventory costs.</p>
            </li>
           
           
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RealEstateTrendsDashboard;
