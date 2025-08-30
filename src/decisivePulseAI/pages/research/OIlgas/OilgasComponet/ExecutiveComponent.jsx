import React, { useState } from "react";
import Chart from "react-apexcharts";
import logoSrc from "../../../../components/images/totalsales.png";

const ExecutiveComponent = () => {
  const colors = ["#006064", "#087F8C", "#00ACC1", "#FFB400", "#16262E"];

  // State for individual chart filters
  const [lineChartRegion, setLineChartRegion] = useState("Both");
  const [barChartDataType, setBarChartDataType] = useState("Both");
  const [pieChartRegion, setPieChartRegion] = useState("Both");
  
  // 1️⃣ Line Chart (Global & Regional Production Performance: YoY Growth)
  const lineChartOptions = {
    chart: { type: "line", height: 350 },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] },
    colors: [colors[0], colors[1]],
    stroke: { curve: "smooth", width: 3 },

    grid: {
      show: true,
      borderColor: "#000000",
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } }
    }
  };
  const lineChartData = [
    { name: "Global", data: [3.5, 4.0, 6.5, 5.8, 6.2, 6.9, 7.1, 7.5, 7.8, 8.0, 8.2, 8.5] },
    { name: "Regional", data: [2.8, 3.5, 5.2, 4.9, 5.4, 6.1, 6.5, 6.8, 7.0, 7.3, 7.6, 7.9] }
  ].filter((dataset) => lineChartRegion === "Both" || dataset.name === lineChartRegion);
  
  // 2️⃣ Bar Chart (Top Oil & Gas Producers: Production Volume, Revenue, Growth Rate)
  const barChartOptions = {
    chart: { type: "bar", height: 350 },
    xaxis: { categories: ["ExxonMobil", "Shell", "BP", "Chevron", "TotalEnergies"] },
    colors: [colors[3], colors[4]],
 
    grid: {
      show: true,
      borderColor: "#000000",
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } }
    }
  };
  const barChartData = [
    { name: "Production Volume (Million Barrels)", data: [800, 750, 670, 700, 680] },
    { name: "Revenue (Billion $)", data: [350, 320, 270, 280, 240] },
    { name: "Growth Rate (%)", data: [5.0, 4.5, 3.8, 4.1, 4.0] }
  ].filter((dataset) => barChartDataType === "Both" || dataset.name.includes(barChartDataType));
  
  // 3️⃣ Pie Chart (Crude Oil vs. Natural Gas Market Share)
  const pieChartOptions = {
    chart: { type: "pie" },
    labels: ["Crude Oil", "Natural Gas"],
    colors: [colors[0], colors[2]],
  
    grid: {
      show: true,
      borderColor: "#000000",
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } }
    }
  };
  const pieChartData = [60, 40];
  
  // 4️⃣ Competitor Benchmarking (Table comparing Top Producers)
  const competitorData = [
    { Company: "ExxonMobil", ProductionVolume: "800M", Revenue: "$350B", GrowthRate: "5.0%" },
    { Company: "Shell", ProductionVolume: "750M", Revenue: "$320B", GrowthRate: "4.5%" },
    { Company: "BP", ProductionVolume: "670M", Revenue: "$270B", GrowthRate: "3.8%" },
    { Company: "Chevron", ProductionVolume: "700M", Revenue: "$280B", GrowthRate: "4.1%" },
    { Company: "TotalEnergies", ProductionVolume: "680M", Revenue: "$240B", GrowthRate: "4.0%" }
  ];
  

  return (
    <div className="bg-[#006064] w-[99%] p-8 border-5 rounded-md border-[#FFB400]">
      <h2 className="text-white text-2xl font-bold mb-4">Executive Oil & Gas Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Line Chart: Production Performance YoY Growth */}
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Global & Regional Production Performance</h3>
            <select className="p-2 rounded bg-white text-black" onChange={(e) => setLineChartRegion(e.target.value)}>
              <option value="Both">Global & Regional</option>
              <option value="Global">Global</option>
              <option value="Regional">Regional</option>
            </select>
          </div>
          <Chart options={lineChartOptions} series={lineChartData} type="line" height={350} />
        </div>

        {/* Bar Chart: Top Oil & Gas Producers */}
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Top Oil & Gas Producers</h3>
            <select className="p-2 rounded bg-white text-black" onChange={(e) => setBarChartDataType(e.target.value)}>
              <option value="Both">Production, Revenue & Growth</option>
              <option value="Production Volume">Production Volume</option>
              <option value="Revenue">Revenue</option>
              <option value="Growth Rate">Growth Rate</option>
            </select>
          </div>
          <Chart options={barChartOptions} series={barChartData} type="bar" height={350} />
        </div>

        {/* Pie Chart: Crude Oil vs. Natural Gas Market Share */}
        <div className="bg-white p-4 rounded-lg">
          
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Crude Oil vs. Natural Gas Market Share</h3>
          </div>
          <Chart options={pieChartOptions} series={pieChartData} type="pie" height={350} />
        </div>

        {/* Competitor Benchmarking: Table */}
        <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Competitor Benchmarking</h3>
            </div>
  <table className="min-w-full mt-2 border border-black">
    <thead>
      <tr className="border border-black">
        <th className="px-4 py-2 border border-black">Company</th>
        <th className="px-4 py-2 border border-black">Production Volume</th>
        <th className="px-4 py-2 border border-black">Revenue</th>
        <th className="px-4 py-2 border border-black">Growth Rate</th>
      </tr>
    </thead>
    <tbody>
      {competitorData.map((data, index) => (
        <tr key={index} className="border border-black">
          <td className="px-4 py-2 border border-black">{data.Company}</td>
          <td className="px-4 py-2 border border-black">{data.ProductionVolume}</td>
          <td className="px-4 py-2 border border-black">{data.Revenue}</td>
          <td className="px-4 py-2 border border-black">{data.GrowthRate}</td>
        </tr>
      ))}
    </tbody>
  </table>
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

export default ExecutiveComponent;
