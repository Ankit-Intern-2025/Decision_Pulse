import React, { useState } from "react";
import Chart from "react-apexcharts";
import logoSrc from "../../../components/images/totalsales.png";
import readingicon from "../../../../../src/decisivePulseAI/resources/home/our.png";


const SupplyChainAnalytics = () => {

  // State for filters
  const [selectedCostType, setSelectedCostType] = useState("All");

  // 📈 Medical Equipment & Drug Supply Performance (Line Graph)
  const medicalSupplyOptions = {
    chart: { type: "line" },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    colors: ["#00ACC1", "#FFB400"], // Adjusted colors
    stroke: { curve: "smooth", width: 2 },
  };

  const medicalSupplySeries = [
    { name: "Stock Levels", data: [100, 120, 110, 140, 150, 130, 160, 170, 180, 190, 200, 210] },
    { name: "Import vs. Local Production", data: [50, 70, 60, 90, 100, 80, 110, 120, 130, 140, 150, 160] },
  ];

  // 📊 Cost Optimization (Pie Chart)
  const costTypes = {
    All: [40, 25, 20, 15],
    Materials: [50, 20, 20, 10],
    Logistics: [30, 35, 25, 10],
    Labor: [35, 30, 25, 10],
  };
  const pieChartSeries = costTypes[selectedCostType];

  return (
    <div className="bg-[#006064] w-[99%] p-10 rounded-md ">
      <h2 className="text-2xl font-bold mb-6 text-white">Supply Chain & Logistics Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 📈 Medical Equipment & Drug Supply Performance */}
        <div className="p-4 shadow-md rounded-lg bg-white">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Medical Equipment & Drug Supply Performance   </h3>
          </div>
          <Chart options={medicalSupplyOptions} series={medicalSupplySeries} type="line" height={350} />
        </div>

        {/* 📊 Cost Optimization */}
        <div className="p-4 shadow-md rounded-lg bg-white">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Cost Optimization</h3>
            <select
              className="border p-2 rounded text-[#4A4A4A] bg-[#00ACC1] text-white"
              onChange={(e) => setSelectedCostType(e.target.value)}
            >
              <option value="All">All Costs</option>
              <option value="Materials">Materials</option>
              <option value="Logistics">Logistics</option>
              <option value="Labor">Labor</option>
            </select>
          </div>
          <Chart
            options={{ chart: { type: "pie" }, colors: ["#FFB400", "#087F8C", "#00ACC1", "#16262E"] }}
            series={pieChartSeries}
            type="pie"
            height={350}
          />
        </div>

        {/* 📋 Supplier Performance & Risk Assessment */}
        <div className="p-4 shadow-md rounded-lg bg-white">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Supplier Performance & Risk Assessment</h3>
          </div>
          <table className="w-full border-collapse border border-gray-300 h-[350px]">
            <thead>
              <tr className="bg-[#16262E] text-white">
                <th className="border border-gray-300 p-2">Supplier</th>
                <th className="border border-gray-300 p-2">Logistics Bottlenecks</th>
                <th className="border border-gray-300 p-2">FDA Approvals</th>
                <th className="border border-gray-300 p-2">Compliance</th>
              </tr>
            </thead>
            <tbody>
  <tr>
    <td className="border border-gray-300 p-2 text-[#4A4A4A]">Supplier A</td>
    <td className="border border-gray-300 p-2 text-[#FFB400]">Delayed</td>
    <td className="border border-gray-300 p-2">Approved</td>
    <td className="border border-gray-300 p-2 text-[#00ACC1]">Compliant</td>
  </tr>
  <tr>
    <td className="border border-gray-300 p-2 text-[#4A4A4A]">Supplier B</td>
    <td className="border border-gray-300 p-2 text-[#00ACC1]">On Time</td>
    <td className="border border-gray-300 p-2">Pending</td>
    <td className="border border-gray-300 p-2 text-[#FF5733]">Non-Compliant</td>
  </tr>
  <tr>
    <td className="border border-gray-300 p-2 text-[#4A4A4A]">Supplier C</td>
    <td className="border border-gray-300 p-2 text-[#FFB400]">Delayed</td>
    <td className="border border-gray-300 p-2">Rejected</td>
    <td className="border border-gray-300 p-2 text-[#00ACC1]">Compliant</td>
  </tr>
  <tr>
    <td className="border border-gray-300 p-2 text-[#4A4A4A]">Supplier D</td>
    <td className="border border-gray-300 p-2 text-[#00ACC1]">On Time</td>
    <td className="border border-gray-300 p-2">Approved</td>
    <td className="border border-gray-300 p-2 text-[#FFB400]">Partially Compliant</td>
  </tr>
</tbody>
 
          </table>
        </div>

        {/* 📦 Cost Optimization Strategies */}
        <div className="p-4 shadow-md rounded-lg bg-[#095458] ">
          <div className="flex justify-center items-center mb-2 ">
            {/* <img src={logoSrc} alt="Logo" className="w-8 h-8" /> */}
            <h3 className="text-lg font-semibold text-[white] ">AI-Driven Cost Optimization Strategies</h3>
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
    </div>
  );
};

export default SupplyChainAnalytics;
