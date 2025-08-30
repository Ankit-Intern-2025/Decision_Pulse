import React, { useState } from "react";
import Chart from "react-apexcharts";
import logoSrc from "../../../../components/images/totalsales.png"

const ExecutiveRealEstateComponent = () => {
  const colors = ["#006064", "#087F8C", "#00ACC1", "#FFB400", "#16262E"];

  // State for individual chart filters
  const [lineChartRegion, setLineChartRegion] = useState("Both");
  const [barChartMetric, setBarChartMetric] = useState("Both");
  const [pieChartType, setPieChartType] = useState("Global");

  // 1️⃣ Line Chart (Global & Regional Market Performance - YoY Price Trends)
  const lineChartOptions = {
    chart: { type: "line", height: 350 },
    xaxis: { categories: ["Apr 23", "May 23", "Jun 23", "Jul 23", "Aug 23", "Sep 23", "Oct 23", "Nov 23", "Dec 23", "Jan 24", "Feb 24", "Mar 24"] },
    colors: [colors[0], colors[1]],
    stroke: { curve: "smooth", width: 4 },
    markers: { size: 5 },
    title: { text: ``, align: "left" },
  };
  const lineChartData = [
    { name: "Global", data: [320, 100, 345, 200, 370, 300, 400, 420, 100, 200, 470, 490] },
    { name: "Regional", data: [100, 290, 500, 150, 330, 200, 365, 380, 395, 410, 425, 440] }
  ].filter((dataset) => lineChartRegion === "Both" || dataset.name === lineChartRegion);

  // 2️⃣ Bar Chart (Top Real Estate Markets)
  const barChartOptions = {
    chart: { type: "bar", height: 350 },
    xaxis: { categories: ["New York", "London", "Tokyo", "Dubai", "Singapore", "Sydney", "Toronto", "Los Angeles", "Paris", "Hong Kong"] },
    colors: [colors[1], colors[4]],
    title: { text: ` ${barChartMetric}`, align: "left" },
  };
  const barChartData = [
    { name: "Property Value ($B)", data: [950, 870, 890, 920, 850, 780, 760, 800, 830, 900] },
    { name: "Growth Rate (%)", data: [100, 500, 3.8, 6.1, 5.5, 4.2, 3.9, 4.8, 5.1, 450] }
  ];

  // 3️⃣ Pie Chart (Commercial vs. Residential Market Share)
  const pieChartOptions = {
    chart: { type: "pie" },
    labels: ["Commercial", "Residential", "Mixed-Use", "Industrial"],
    colors: [colors[0], colors[3], colors[1], colors[2]],
   
  };
  const pieChartData = pieChartType === "Global" ? [40, 35, 15, 10] : [45, 30, 15, 10];

  return (
    <div className="bg-[#006064] w-[99%] p-8 border-5 rounded-md border-[#FFB400]">
      <h2 className="text-white text-2xl font-bold mb-4">Executive Real Estate Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold">YoY Price Trends</h3>
            <select className="p-2 rounded bg-white text-black" onChange={(e) => setLineChartRegion(e.target.value)}>
              <option value="Both">Global & Regional</option>
              <option value="Global">Global</option>
              <option value="Regional">Regional</option>
            </select>
          </div>
          <Chart options={lineChartOptions} series={lineChartData} type="line" height={350} />
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold">Top Real Estate Markets</h3>
            <select className="p-2 rounded bg-white text-black" onChange={(e) => setBarChartMetric(e.target.value)}>
              <option value="Both">Property Value & Growth</option>
              <option value="Property Value">Property Value</option>
              <option value="Growth Rate">Growth Rate</option>
            </select>
          </div>
          <Chart options={barChartOptions} series={barChartData} type="bar" height={350} />
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2 w-[70%]">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold">Market Share</h3>
            <select className="p-2 rounded bg-white text-black" onChange={(e) => setPieChartType(e.target.value)}>
              <option value="Global">Global</option>
              <option value="Regional">Regional</option>
            </select>
          </div>
          <Chart options={pieChartOptions} series={pieChartData} type="pie" height={350} />
        </div>

        <div className="p-4 shadow-md rounded-lg bg-white ">
          <div className="flex justify-between items-center mb-2 w-[70%]">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Key Industry Trends & Sentiment</h3>
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

export default ExecutiveRealEstateComponent;