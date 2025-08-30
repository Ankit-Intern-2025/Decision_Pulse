import React, { useState } from "react";
import Chart from "react-apexcharts";
import logoSrc from "../../../../components/images/totalsales.png";

const ExecutiveComponent = () => {
  const colors = ["#006064", "#087F8C", "#00ACC1", "#FFB400", "#16262E"];

  // State for individual chart filters
  const [lineChartRegion, setLineChartRegion] = useState("Both");
  const [barChartDataType, setBarChartDataType] = useState("Both");


  // 1️⃣ Line Chart (Global & Regional FMCG Market Trends: YoY Revenue Growth)
  const lineChartOptions = {
    chart: { type: "line", height: 350 },
    xaxis: { categories: ["Q1", "Q2", "Q3", "Q4"] },
    colors: [colors[0], colors[1]],
    stroke: { curve: "smooth", width: 3 },
    grid: {
      show: true,
      borderColor: "#000000",
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
  };
  const lineChartData = [
    { name: "Global", data: [5.5, 6.0, 7.5, 8.0] },
    { name: "Regional", data: [4.0, 4.8, 6.0, 6.5] },
  ].filter((dataset) => lineChartRegion === "Both" || dataset.name === lineChartRegion);

  // 2️⃣ Bar Chart (Top Performing Brands & Products: Market Share, Revenue, Growth Rate)
  const barChartOptions = {
    chart: { type: "bar", height: 350 },
    xaxis: { categories: ["Brand A", "Brand B", "Brand C", "Brand D", "Brand E"] },
    colors: [colors[3], colors[4]],
    grid: {
      show: true,
      borderColor: "#000000",
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
  };
  const barChartData = [
    { name: "Market Share (%)", data: [15, 25, 20, 10, 30] },
    { name: "Revenue (Billion $)", data: [12, 20, 18, 10, 25] },
    { name: "Growth Rate (%)", data: [4.2, 5.5, 4.8, 3.9, 6.1] },
  ].filter((dataset) => barChartDataType === "Both" || dataset.name.includes(barChartDataType));

  // 3️⃣ Pie Chart (Consumer Buying Behavior Insights: Category-wise Market Share)
  const pieChartOptions = {
    chart: { type: "pie" },
    labels: ["Category A", "Category B", "Category C", "Category D"],
    colors: [colors[0], colors[2], colors[1], colors[3]],
    grid: {
      show: true,
      borderColor: "#000000",
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
  };
  const pieChartData = [40, 25, 20, 15];

  // 4️⃣ Competitive Benchmarking (Table comparing Top FMCG Companies)
  const competitorData = [
    { Company: "Brand A", Sales: "$12B", MarketPenetration: "80%", SKUPerformance: "90%" },
    { Company: "Brand B", Sales: "$20B", MarketPenetration: "75%", SKUPerformance: "85%" },
    { Company: "Brand C", Sales: "$18B", MarketPenetration: "70%", SKUPerformance: "88%" },
    { Company: "Brand D", Sales: "$10B", MarketPenetration: "65%", SKUPerformance: "80%" },
    { Company: "Brand E", Sales: "$25B", MarketPenetration: "85%", SKUPerformance: "92%" },
  ];



  return (
    <div className="bg-[#006064] w-[99%] p-8 border-5 rounded-md border-[#FFB400]">
      <h2 className="text-white text-2xl font-bold mb-4">Executive FMCG Market Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Line Chart: FMCG Market Trends */}
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">FMCG Market Trends (YoY Revenue Growth)</h3>
            <select
              className="p-2 rounded bg-white text-black"
              onChange={(e) => setLineChartRegion(e.target.value)}
            >
              <option value="Both">Global & Regional</option>
              <option value="Global">Global</option>
              <option value="Regional">Regional</option>
            </select>
          </div>
          <Chart options={lineChartOptions} series={lineChartData} type="line" height={350} />
        </div>

        {/* Bar Chart: Top Performing Brands */}
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Top Performing Brands & Products</h3>
            <select
              className="p-2 rounded bg-white text-black"
              onChange={(e) => setBarChartDataType(e.target.value)}
            >
              <option value="Both">Market Share, Revenue & Growth</option>
              <option value="Market Share">Market Share</option>
              <option value="Revenue">Revenue</option>
              <option value="Growth Rate">Growth Rate</option>
            </select>
          </div>
          <Chart options={barChartOptions} series={barChartData} type="bar" height={350} />
        </div>

        {/* Pie Chart: Consumer Buying Behavior Insights */}
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Consumer Buying Behavior Insights</h3>
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
                <th className="px-4 py-2 border border-black">Sales</th>
                <th className="px-4 py-2 border border-black">Market Penetration</th>
                <th className="px-4 py-2 border border-black">SKU Performance</th>
              </tr>
            </thead>
            <tbody>
              {competitorData.map((data, index) => (
                <tr key={index} className="border border-black">
                  <td className="px-4 py-2 border border-black">{data.Company}</td>
                  <td className="px-4 py-2 border border-black">{data.Sales}</td>
                  <td className="px-4 py-2 border border-black">{data.MarketPenetration}</td>
                  <td className="px-4 py-2 border border-black">{data.SKUPerformance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       
      </div>
    </div>
  );
};

export default ExecutiveComponent;
