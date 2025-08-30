import logoSrc from "../../../../components/images/totalsales.png";
import React, { useState } from "react";
import Chart from "react-apexcharts";

const RealEstateTrendsDashboard = () => {
  console.log("Market Trends & Forecasting (AI-Powered)");

  // State for forecast periods for different charts
  const [lineForecastPeriod, setLineForecastPeriod] = useState("6 Months");
  const [heatmapForecastPeriod, setHeatmapForecastPeriod] = useState("6 Months");
  const [scatterForecastPeriod, setScatterForecastPeriod] = useState("6 Months");
  const [bubbleForecastPeriod, setBubbleForecastPeriod] = useState("6 Months");

  const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

  // Demand & Price Forecasting (Line Chart)
  const lineChartOptions = {
    chart: { type: "line", height: 350 },
    xaxis: { categories: months },
    stroke: { curve: "smooth", width: 3 },
    title: { text: `Price Forecast (${lineForecastPeriod})`, align: "left", style: { color: "#00ACC1" } },
    colors: ["#006064", "#087F8C", "#00ACC1", "#FFB400", "#16262E"],
    grid: {
      show: true,
      borderColor: "#000000",
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } }
    }
  };

  const lineChartData = [
    { name: "Brent Crude ($/Barrel)", data: [75, 80, 85, 90, 100, 95, 110, 115, 120, 125, 130, 135] },
    { name: "WTI ($/Barrel)", data: [60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115] },
    { name: "Natural Gas ($/MMBtu)", data: [3.5, 3.8, 4.0, 4.2, 4.5, 4.7, 5.0, 5.3, 5.5, 5.8, 6.0, 6.3] },
  ];

  // Regional Consumption Trends (Heatmap for Oil vs Gas demand)
  const regions = ["North", "South", "East", "West", "Central"];
  const heatmapData = regions.map(region => ({
    name: region,
    data: Array(2).fill().map(() => Math.floor(Math.random() * 100))
  }));

  const heatmapOptions = {
    chart: { type: "heatmap", height: 350 },
    xaxis: { categories: ["Oil Demand", "Gas Demand"] },
    colors: ["#006064", "#087F8C"],
  
    grid: {
      show: true,
      borderColor: "#000000",
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } }
    }
  };

  // Price Sensitivity Analysis (Bubble Chart for Crude Oil & Gas pricing trends)
  const bubbleChartData = [{
    name: "Crude Oil & Gas",
    data: [
      { x: 75, y: 95, z: 20 },  // Brent Crude vs WTI vs Gas
      { x: 80, y: 85, z: 30 },
      { x: 85, y: 90, z: 40 },
      { x: 90, y: 95, z: 50 },
      { x: 100, y: 105, z: 60 },
      { x: 95, y: 100, z: 50 },
      { x: 110, y: 115, z: 70 },
      { x: 120, y: 125, z: 80 },
    ]
  }];

  const bubbleChartOptions = {
    chart: { type: "bubble", height: 350 },
    xaxis: { title: { text: "Brent Crude Price ($)", style: { color: "#00ACC1" } } },
    yaxis: { title: { text: "WTI Price ($)", style: { color: "#00ACC1" } } },
    zaxis: { title: { text: "Natural Gas Price ($)", style: { color: "#00ACC1" } } },
    colors: ["#FFB400"],
  
    grid: {
      show: true,
      borderColor: "#000000",
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } }
    }
  };

  // Sustainability & Energy Transition Trends (Trendline for Renewables vs Fossil Fuel)
  const trendlineData = [{
    name: "Renewable Energy (% of total)",
    data: [20, 22, 25, 28, 30, 35, 40, 42, 45, 50, 55, 60],
  }, {
    name: "Fossil Fuel Energy (% of total)",
    data: [80, 78, 75, 72, 70, 65, 60, 58, 55, 50, 45, 40],
  }];

  const trendlineOptions = {
    chart: { type: "line", height: 350 },
    xaxis: { categories: months },
    stroke: { curve: "smooth", width: 3 },
  
    colors: ["#006064", "#FFB400"], grid: {
      show: true,
      borderColor: "#000000",
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } }
    }
  };

  return (
    <div className="bg-[#006064] w-[99%] p-8 border-5 rounded-md border-[#FFB400]">
      <h2 className="text-2xl font-bold mb-4 text-[white]">AI-Powered Market Trends & Forecasting</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Demand & Price Forecasting */}
        <div className="bg-gray-100 p-4 rounded-lg" style={{ backgroundColor: "#EFEFEF" }}>
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Demand & Price Forecasting</h3>
            <select value={lineForecastPeriod} onChange={(e) => setLineForecastPeriod(e.target.value)} className="mb-4 p-2 border border-gray-300 rounded" style={{ borderColor: "#4A4A4A" }}>
              <option>6 Months</option>
              <option>12 Months</option>
              <option>18 Months</option>
              <option>24 Months</option>
            </select>
          </div>
          <Chart options={lineChartOptions} series={lineChartData} type="line" height={350} />
        </div>

        {/* Regional Consumption Trends */}
        <div className="bg-gray-100 p-4 rounded-lg" style={{ backgroundColor: "#EFEFEF" }}>
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Regional Consumption Trends</h3>
            <select value={heatmapForecastPeriod} onChange={(e) => setHeatmapForecastPeriod(e.target.value)} className="mb-4 p-2 border border-gray-300 rounded" style={{ borderColor: "#4A4A4A" }}>
              <option>6 Months</option>
              <option>12 Months</option>
              <option>18 Months</option>
              <option>24 Months</option>
            </select>
          </div>
          <Chart options={heatmapOptions} series={heatmapData} type="heatmap" height={350} />
        </div>

        {/* Price Sensitivity Analysis */}
        <div className="bg-gray-100 p-4 rounded-lg" style={{ backgroundColor: "#EFEFEF" }}>
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Price Sensitivity Analysis</h3>
            <select value={bubbleForecastPeriod} onChange={(e) => setBubbleForecastPeriod(e.target.value)} className="mb-4 p-2 border border-gray-300 rounded" style={{ borderColor: "#4A4A4A" }}>
              <option>6 Months</option>
              <option>12 Months</option>
              <option>18 Months</option>
              <option>24 Months</option>
            </select>
          </div>
          <Chart options={bubbleChartOptions} series={bubbleChartData} type="bubble" height={350} />
        </div>

        {/* Sustainability & Energy Transition Trends */}
        <div className="bg-gray-100 p-4 rounded-lg" style={{ backgroundColor: "#EFEFEF" }}>
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Sustainability & Energy Transition</h3>
          </div>
          <Chart options={trendlineOptions} series={trendlineData} type="line" height={350} />
        </div>

      
        
      </div>
      <div className="flex justify-center items-center mt-6 ">
        <div className="p-4 shadow-md rounded-lg bg-white">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Key Industry Trends & Sentiment</h3>
          </div>
          <ul className="list-none pl-2 text-[#4A4A4A]">
            <li className="flex items-center mb-2">
              <span className="bg-[#16262E] text-white w-7 h-7 flex items-center justify-center rounded-full mr-2 text-sm">→</span> Implement AI-driven demand forecasting to reduce inventory costs.
            </li>
            <li className="flex items-center mb-2">
              <span className="bg-[#16262E] text-white w-7 h-7 flex items-center justify-center rounded-full mr-2 text-sm">→</span> Negotiate bulk discounts with suppliers for better material pricing.
            </li>
            <li className="flex items-center mb-2">
              <span className="bg-[#16262E] text-white w-7 h-7 flex items-center justify-center rounded-full mr-2 text-sm">→</span> Optimize warehouse layouts for faster order processing and lower logistics costs.
            </li>
            <li className="flex items-center">
              <span className="bg-[#16262E] text-white w-7 h-7 flex items-center justify-center rounded-full mr-2 text-sm">→</span> Invest in automation to reduce labor expenses and improve efficiency.
            </li>
            <li className="flex items-center mb-2">
              <span className="bg-[#16262E] text-white w-7 h-7 flex items-center justify-center rounded-full mr-2 text-sm">→</span> Negotiate bulk discounts with suppliers for better material pricing.
            </li>
            <li className="flex items-center mb-2">
              <span className="bg-[#16262E] text-white w-7 h-7 flex items-center justify-center rounded-full mr-2 text-sm">→</span> Optimize warehouse layouts for faster order processing and lower logistics costs.
            </li>
            <li className="flex items-center">
              <span className="bg-[#16262E] text-white w-7 h-7 flex items-center justify-center rounded-full mr-2 text-sm">→</span> Invest in automation to reduce labor expenses and improve efficiency.
            </li>
          </ul>
        </div>
        </div>
    </div>
  );
};

export default RealEstateTrendsDashboard;
