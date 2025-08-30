import React, { useState } from "react";
import Chart from "react-apexcharts";
import logoSrc from "../../../components/images/totalsales.png";
import readingicon from "../../../../../src/decisivePulseAI/resources/home/our.png";

const ExecutiveComponent = () => {
  const colors = ["#006064", "#087F8C", "#00ACC1", "#FFB400", "#16262E"];

  // State for individual chart filters
  const [lineChartRegion, setLineChartRegion] = useState("Both");
  const [barChartDataType, setBarChartDataType] = useState("Both");
  const [scatterChartRegion, setScatterChartRegion] = useState("Both");

  // 1️⃣ Line Chart (Healthcare Spending Growth YoY - Smoother Data)
  const lineChartOptions = {
    chart: { type: "line", height: 350 },
    xaxis: { categories: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"] }, // 7-year trend
    colors: [colors[0], colors[1]],
    stroke: { curve: "smooth", width: 3 },
    
  };
  const lineChartData = [
    { name: "Global", data: [3.5, 4.0, 6.5, 5.8, 6.2, 6.9, 7.1] },
    { name: "Regional", data: [2.8, 3.5, 5.2, 4.9, 5.4, 6.1, 6.5] }
  ].filter((dataset) => lineChartRegion === "Both" || dataset.name === lineChartRegion);

  // 2️⃣ Bar Chart (Top Healthcare Companies: Revenue & Growth)
  const barChartOptions = {
    chart: { type: "bar", height: 350 },
    xaxis: { categories: ["UnitedHealth", "Pfizer", "CVS Health", "J&J", "Roche", "Moderna", "GSK"] }, // 7 companies
    colors: [colors[3], colors[4]],
    
  };
  const barChartData = [
    { name: "Revenue (Billion $)", data: [324, 100, 268, 95, 92, 45, 38] },
    { name: "Growth Rate (%)", data: [6.5, 8.3, 5.2, 7.1, 6.8, 9.5, 7.8] }
  ].filter((dataset) => barChartDataType === "Both" || dataset.name.includes(barChartDataType));

  // 3️⃣ Pie Chart (Public vs. Private Healthcare Market Share)
  const pieChartOptions = {
    chart: { type: "pie" },
    labels: ["Public Healthcare", "Private Healthcare"],
    colors: [colors[0], colors[3]],
   
  };
  const pieChartData = [68, 32]; // Adjusted to realistic distribution

  // 4️⃣ Scatter Plot (Healthcare Spending vs. Life Expectancy with 5-10 Points per Country)
  const scatterChartOptions = {
    chart: { type: "scatter", height: 350 },
    xaxis: { title: { text: "Healthcare Spending (% of GDP)" } },
    yaxis: { title: { text: "Life Expectancy (Years)" } },
    colors: [colors[1], colors[2], colors[4]],
    markers: { size: 6 },
    stroke: { width: 2, curve: "smooth" }, // Adds a smooth connection between points
   
  };
  const scatterChartData = [
    { name: "USA", data: [[16.8, 78], [17.2, 78.5], [17.6, 78.8], [18.0, 79], [18.3, 79.2], [18.7, 79.4]] },
    { name: "Germany", data: [[10.5, 81], [10.8, 81.3], [11.1, 81.6], [11.5, 81.8], [11.9, 82], [12.2, 82.2]] },
    { name: "Japan", data: [[9.8, 83.5], [10.1, 83.8], [10.4, 84], [10.7, 84.3], [11.0, 84.6], [11.3, 84.9]] }
  ].filter((dataset) => scatterChartRegion === "Both" || dataset.name === scatterChartRegion);

  return (
    <div className="bg-[#006064] w-[99%] p-8 border-5 rounded-md border-[#FFB400]">
      <h2 className="text-white text-2xl font-bold mb-4">Executive Healthcare Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Line Chart with Multi-Dataset Filter */}
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#006064]">Global & Regional Healthcare Performance</h3>
            <select className="p-2 rounded bg-white text-black" onChange={(e) => setLineChartRegion(e.target.value)}>
              <option value="Both">Global & Regional</option>
              <option value="Global">Global</option>
              <option value="Regional">Regional</option>
            </select>
          </div>
          <Chart options={lineChartOptions} series={lineChartData} type="line" height={350} />
        </div>

        {/* Bar Chart with Multi-Dataset Filter */}
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#006064]">Top Healthcare Providers & Pharmaceuticals</h3>
            <select className="p-2 rounded bg-white text-black" onChange={(e) => setBarChartDataType(e.target.value)}>
              <option value="Both">Revenue & Growth</option>
              <option value="Revenue">Revenue</option>
              <option value="Growth Rate">Growth Rate</option>
            </select>
          </div>
          <Chart options={barChartOptions} series={barChartData} type="bar" height={350} />
        </div>

        {/* Pie Chart (Static) */}
        <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <img src={logoSrc} alt="Logo" className="w-8 h-8" />
          <h3 className="text-lg font-semibold text-[#006064]">Public vs. Private Healthcare Market Share</h3>
         </div>
          <Chart options={pieChartOptions} series={pieChartData} type="pie" height={350} />
        </div>

        <div className="p-4 shadow-md rounded-lg bg-[#095458] ">
          <div className="flex justify-center items-center mb-2">
            {/* <img src={logoSrc} alt="Logo" className="w-8 h-8" /> */}
            <h3 className="text-lg font-semibold text-[white]">Key Industry Trends & Sentiment</h3>
          </div>
       
         
          <ul>
    <li className="flex items-start mb-3">
      <img src={readingicon} alt="Icon" className="w-5 h-5 mr-3 mt-1" />
      <span className="text-white text-sm inline-block">
        The high percentage of 'Cancelled' orders, making up around 25.6% of the data, may suggest customer dissatisfaction or issues with order processing.
      </span>
    </li>
    <li className="flex items-start mb-3">
      <img src={readingicon} alt="Icon" className="w-5 h-5 mr-3 mt-1" />
      <span className="text-white text-sm">
      'Pending' status also accounts for 25.0% of orders, indicating possible delays in order fulfillment or supply chain inefficiencies.
      </span>
    </li>
    <li className="flex items-start mb-3">
      <img src={readingicon} alt="Icon" className="w-5 h-5 mr-3 mt-1" />
      <span className="text-white text-sm">
        Price distributions are negatively skewed, with a mean very close to the median, suggesting occasional promotions could have been employed.
      </span>
    </li>
    <li className="flex items-start mb-3">
      <img src={readingicon} alt="Icon" className="w-5 h-5 mr-3 mt-1" />
      <span className="text-white text-sm">
      Despite having a range of product categories, 'Electronics' dominate our sales, reflecting a lack of diversification in revenue streams.
      </span>
    </li>
    <li className="flex items-start mb-3">
      <img src={readingicon} alt="Icon" className="w-5 h-5 mr-3 mt-1" />
      <span className="text-white text-sm">
       There is an unexpectedly high occurrence of identical 'CustomerNames', despite the unique values count of 994, possibly indicating duplicate entries or insufficient customer data capture.
      </span>
    </li>
  
  

  </ul>


        </div>
        


       

      </div>
      <div className="flex justify-center items-center mt-6 ">
        <div className="bg-white p-4 rounded-lg w-[60%]">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#006064]">Competitor Benchmarking</h3>
            <select className="p-2 rounded bg-white text-black" onChange={(e) => setScatterChartRegion(e.target.value)}>
              <option value="Both">All Countries</option>
              <option value="USA">USA</option>
              <option value="Germany">Germany</option>
              <option value="Japan">Japan</option>
            </select>
          </div>
          <Chart options={scatterChartOptions} series={scatterChartData} type="scatter" height={350} />
        </div>
        </div>
    </div>
  );
};

export default ExecutiveComponent;
