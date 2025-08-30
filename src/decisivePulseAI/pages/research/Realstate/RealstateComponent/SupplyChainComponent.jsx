import React, { useState } from "react";
import Chart from "react-apexcharts";

import logoSrc from "../../../../components/images/totalsales.png";
const SustainabilityESGInsights = () => {
  const [selectedEnergyType, setSelectedEnergyType] = useState("All");

  // 📈 Green Building Certifications & Energy Efficiency (Line Chart)
  const energyEfficiencyOptions = {
    chart: { type: "line" },
    xaxis: {
      categories: ["Q1", "Q2", "Q3", "Q4"],
    },
    colors: ["#2E7D32", "#FFB400"],
    stroke: { curve: "smooth", width: 2 },
  };

  const energyEfficiencySeries = [
    { name: "Certified Buildings", data: [10, 20, 30, 40] },
    { name: "Energy Savings (%)", data: [5, 15, 25, 35] },
  ];

  // 📊 Renewable Energy Adoption (Pie Chart)
  const energyTypes = {
    All: [40, 30, 20, 10],
    Solar: [50, 25, 15, 10],
    Wind: [30, 35, 25, 10],
    Hydro: [25, 30, 35, 10],
  };
  const pieChartSeries = energyTypes[selectedEnergyType];

  // 📊 Regulatory Compliance Comparison (Bar Graph)
  const complianceOptions = {
    chart: { type: "bar" },
    xaxis: {
      categories: ["LEED Certification", "Carbon Emission Standards", "Water Usage Regulations", "Waste Management Compliance", "Energy Efficiency Standards"],
    },
    colors: ["#00ACC1", "#FF5733"],
    plotOptions: {
      bar: { horizontal: false, columnWidth: "50%" },
    },
  };

  const complianceSeries = [
    { name: "Compliant", data: [80, 50, 70, 60, 90] },
    { name: "Non-Compliant", data: [20, 50, 30, 40, 10] },
  ];

  return (
    <div className="bg-[#006064] w-[99%] p-8 border-5 rounded-md border-[#FFB400]">
      <h2 className="text-2xl font-bold mb-6 text-white">Sustainability & ESG Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 📈 Green Building Certifications & Energy Efficiency */}
        <div className="p-4 shadow-md rounded-lg bg-white">
        <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold">Green Building Certifications & Energy Efficiency</h3>
          </div>
          <Chart options={energyEfficiencyOptions} series={energyEfficiencySeries} type="line" height={350} />
        </div>

        {/* 📊 Adoption of Smart Infrastructure & Renewable Energy */}
        <div className="p-4 shadow-md rounded-lg bg-white">
        <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold">
              
              Renewable Energy Adoption</h3>
          <select
            className="border p-2 rounded text-[#4A4A4A] bg-[#2E7D32] text-white"
            onChange={(e) => setSelectedEnergyType(e.target.value)}
          >
            <option value="All">All Sources</option>
            <option value="Solar">Solar</option>
            <option value="Wind">Wind</option>
            <option value="Hydro">Hydro</option>
          </select>
          </div>
          <Chart
            options={{ chart: { type: "pie" }, colors: ["#FFB400", "#087F8C", "#00ACC1", "#16262E"] }}
            series={pieChartSeries}
            type="pie"
            height={350}
          />
        </div>

        {/* 📊 Regulatory Compliance Dashboard (Bar Graph) */}
        <div className="p-4 shadow-md rounded-lg bg-white">
        <div className="flex justify-between items-center mb-2 w-[80%]">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold">Regulatory Compliance Comparison</h3>
            </div>
          <Chart options={complianceOptions} series={complianceSeries} type="bar" height={350} />
        </div>

        {/* 📦 Affordable Housing & Social Impact Initiatives */}
        <div className="p-4 shadow-md rounded-lg bg-white">
        <div className="flex justify-between items-center mb-2 w-[80%]">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold">Affordable Housing & Social Impact</h3>
            </div>
          <ul className="list-none pl-2 text-[#4A4A4A]">
            <li className="flex items-center mb-2">
              <span className="bg-[#16262E] text-white w-7 h-7 flex items-center justify-center rounded-full mr-2 text-sm">✔</span> Increased affordable housing developments by 15%.
            </li>
            <li className="flex items-center mb-2">
              <span className="bg-[#16262E] text-white w-7 h-7 flex items-center justify-center rounded-full mr-2 text-sm">✔</span> Community-driven sustainability programs initiated.
            </li>
            <li className="flex items-center">
              <span className="bg-[#16262E] text-white w-7 h-7 flex items-center justify-center rounded-full mr-2 text-sm">✔</span> Partnerships with NGOs for green housing projects.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityESGInsights;