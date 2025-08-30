import React, { useState, useMemo } from "react";
import Chart from "react-apexcharts";
import logoSrc from "../../../../components/images/totalsales.png";

const regions = ["North America", "Europe", "Asia", "Middle East", "Australia"];
const costCategories = ["Materials", "Labor", "Permits", "Taxes"];
const delayFactors = ["Regulations", "Weather", "Supply Chain", "Labor Shortages"];
const optimizationStrategies = [
  "Automated Scheduling", "Sustainable Materials", "AI Risk Prediction", "Prefabrication Techniques"
];

const chartColors = ["#006064", "#087F8C", "#00ACC1", "#FFB400", "#16262E", "#4A4A4A"];

const ConstructionAnalytics = () => {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedCostCategory, setSelectedCostCategory] = useState("All");

  // New Construction Projects by Region (Bar Chart)
  const constructionProjectsData = useMemo(() => {
    let data = [{
      name: "Projects",
      data: regions.map(() => Math.floor(Math.random() * 500) + 50),
    }];

    return {
      series: data,
      options: {
        chart: { type: "bar" },
        colors: chartColors,
        xaxis: { categories: regions, title: { text: "Regions" }, labels: { rotate: -45 } },
        yaxis: { title: { text: "Number of Projects" } },
        dataLabels: { enabled: true }
      },
    };
  }, []);

  // Construction Cost Analysis (Line Graph)
  const costAnalysisData = useMemo(() => {
    let data = costCategories.map((category) => ({
      name: category,
      data: [Math.floor(Math.random() * 5000) + 1000, Math.floor(Math.random() * 5000) + 1000],
    }));

    if (selectedCostCategory !== "All") {
      data = data.filter((d) => d.name === selectedCostCategory);
    }

    return {
      series: data,
      options: {
        chart: { type: "line" },
        colors: chartColors,
        xaxis: { categories: ["2023", "2024"], title: { text: "Year" } },
        yaxis: { title: { text: "Cost ($ in thousands)" } },
        dataLabels: { enabled: true }
      },
    };
  }, [selectedCostCategory]);

  // Medical Equipment & Drug Supply Performance (Connected Scatter Plot)
  const supplyPerformanceData = useMemo(() => {
    let data = [
      { x: "Q1", y: 200 }, { x: "Q2", y: 350 },
      { x: "Q3", y: 500 }, { x: "Q4", y: 400 }
    ];
    return {
      series: [{ name: "Supply Performance", data }],
      options: {
        chart: { type: "scatter" },
        stroke: { curve: "smooth" },
        colors: [chartColors[1]],
        xaxis: { title: { text: "Quarters" } },
        yaxis: { title: { text: "Performance Score" } },
        dataLabels: { enabled: true }
      },
    };
  }, []);

  // Optimization Strategies Impact (Radar Chart)
  const optimizationImpactData = useMemo(() => {
    return {
      series: [{
        name: "Impact Score",
        data: optimizationStrategies.map(() => Math.floor(Math.random() * 100) + 10),
      }],
      options: {
        chart: { type: "radar" },
        colors: [chartColors[3]],
        xaxis: { categories: optimizationStrategies, title: { text: "Strategies" } },
        yaxis: { title: { text: "Impact Score" } },
      },
    };
  }, []);

  return (
    <div className="bg-[#006064] w-[99%] p-8 border-5 rounded-md border-[#FFB400]">
      <div className="grid grid-cols-2 gap-6">
        {/* New Construction Projects by Region */}
        <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold">New Construction Projects</h3>
          <select onChange={(e) => setSelectedRegion(e.target.value)} className="p-2 rounded bg-white text-black">
            <option value="All">All</option>
            {regions.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          </div>
          <Chart options={constructionProjectsData.options} series={constructionProjectsData.series} type="bar" height={350} />
        </div>

        {/* Construction Cost Analysis */}
        <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold">Construction Cost Analysis</h3>
          <select onChange={(e) => setSelectedCostCategory(e.target.value)} className="p-2 rounded bg-white text-black">
            <option value="All">All</option>
            {costCategories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          </div>
          <Chart options={costAnalysisData.options} series={costAnalysisData.series} type="line" height={350} />
        </div>

        {/* Project Delays & Risk Assessment */}
        <div className="bg-white p-4 rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold">Project Delays & Risk Assessment</h3>
            </div>
          <table className="w-full border-collapse border border-gray-300 mt-2">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Factor</th>
                <th className="border border-gray-300 p-2">Impact (%)</th>
              </tr>
            </thead>
            <tbody>
              {delayFactors.map((factor) => (
                <tr key={factor}>
                  <td className="border border-gray-300 p-2">{factor}</td>
                  <td className="border border-gray-300 p-2">{Math.floor(Math.random() * 50) + 10}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Optimization Strategies Impact (Radar Chart) */}
        <div className="bg-white p-4 rounded-lg shadow-md mt-6">
           <div className="flex justify-between items-center mb-2">
                    <img src={logoSrc} alt="Logo" className="w-8 h-8" />
                    <h3 className="text-lg font-semibold">Optimization Strategies Impact</h3>
                    </div>
          <Chart options={optimizationImpactData.options} series={optimizationImpactData.series} type="radar" height={350} />
        </div>
      </div>
    </div>
  );
};

export default ConstructionAnalytics;
