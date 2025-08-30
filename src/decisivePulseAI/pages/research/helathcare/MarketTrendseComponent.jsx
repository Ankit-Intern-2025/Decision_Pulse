

import React, { useState } from "react";
import Chart from "react-apexcharts";
import logoSrc from "../../../components/images/totalsales.png"
import readingicon from "../../../../../src/decisivePulseAI/resources/home/our.png";

const HealthcareTrendsDashboard = () => {
  const colors = {
    primary: "#006064",
    secondary: "#087F8C",
    accent: "#00ACC1",
    highlight: "#FFB400",
    dark: "#16262E",
    gray: "#4A4A4A",
    lightGray: "#878787",
    background: "#EFEFEF",
    white: "#FFFFFF",
  };

  // 📊 Line Chart (Forecasting)
  const [forecastPeriod, setForecastPeriod] = useState("6 Months");
  const demandCategories = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  const lineChartOptions = {
    chart: { type: "line", height: 350 },
    colors: ["#006064", "#087F8C", "#00ACC1", "#FFB400", "#16262E", "#4A4A4A"],

    xaxis: { categories: demandCategories },
    stroke: { curve: "smooth", width: 3 },
    title: { text: ` (${forecastPeriod})`, align: "left", style: { color: colors.primary } },
  };
  
  const lineChartData = [
    { name: "Hospital Visits (in 1000s)", data: [120, 140, 160, 180, 220, 250, 280, 300, 320, 350, 370, 390] },
    { name: "Treatment Cost ($M)", data: [50, 55, 60, 75, 85, 95, 105, 120, 130, 140, 150, 160] },
    { name: "ICU Admissions", data: [30, 35, 40, 50, 55, 60, 65, 70, 75, 80, 85, 90] },
    { name: "Emergency Cases", data: [80, 85, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180] },
    { name: "Recovered Patients", data: [100, 110, 120, 135, 145, 155, 165, 175, 185, 195, 205, 215] },
    { name: "New Infections", data: [60, 65, 70, 80, 85, 90, 95, 100, 110, 120, 130, 140] },
    { name: "Average Waiting Time (mins)", data: [20, 25, 30, 28, 27, 26, 25, 24, 23, 22, 21, 20] }
  ].slice(0, forecastPeriod === "6 Months" ? 6 : 12);


  // 🌍 Heatmap Chart (Disease Prevalence)
  const [selectedRegion, setSelectedRegion] = useState("North America");
  const heatmapData = {
    "North America": [{ name: "North America", data: [32, 40, 45, 35, 50, 38, 25, 30, 28, 35] }],
    "Europe": [{ name: "Europe", data: [20, 22, 30, 28, 42, 24, 18, 21, 19, 26] }],
    "Asia": [{ name: "Asia", data: [15, 18, 25, 23, 39, 21, 12, 16, 15, 22] }],
    "Africa": [{ name: "Africa", data: [40, 35, 50, 45, 55, 38, 30, 33, 31, 48] }]
  };
  const heatmapOptions = {
    chart: { type: "heatmap", height: 350 },
    colors: ["#00ACC1"],
    title: { text: "", align: "left", style: { color: "#006064" } },
    xaxis: {
      categories: ["Flu", "COVID-19", "Dengue", "Malaria", "Tuberculosis", "HIV", "Measles", "Ebola", "Zika", "Cholera"]
    }
  };

  // 👥 Bubble Chart (Patient Demographics & Insurance)
  const [insuranceFilter, setInsuranceFilter] = useState("Insured");
  const bubbleChartData = {
    Insured: [{ name: "Insured", data: [[0, 90, 40], [1, 85, 55], [2, 75, 70], [3, 65, 85], [4, 50, 100]] }],
    Uninsured: [{ name: "Uninsured", data: [[0, 20, 10], [1, 10, 5], [2, 30, 25], [3, 20, 15], [4, 30, 10]] }]
  };
  const bubbleChartOptions = {
    chart: { type: "bubble", height: 350 },
    title: { text: "", align: "left", style: { color: colors.primary } },
    xaxis: {
      categories: ["0-18", "19-30", "31-45", "46-60", "60+"], // Age groups instead of numbers
      title: { text: "Age Groups" }
    },
    yaxis: {
      title: { text: "Health Score" }
    }
  };
  

  // 🚀 Stacked Bar Chart (Medical Innovation)
  const [innovationFilter, setInnovationFilter] = useState("R&D Investment ($B)");
  const stackedBarChartData = {
    "R&D Investment ($B)": [{ name: "R&D Investment", data: [15, 22, 18, 12, 20] }],
    "New Drug Approvals": [{ name: "New Drug Approvals", data: [5, 8, 6, 4, 7] }]
  };
  const stackedBarChartOptions = {
    chart: { type: "bar", height: 350, stacked: true },
    colors: [colors.accent, colors.secondary],
    title: { text: "", align: "left", style: { color: colors.primary } },
    xaxis: {
      categories: ["2018", "2019", "2020", "2021", "2022"], // Replacing numbers with actual years
      title: { text: "Year" }
    },
    yaxis: {
      title: { text: "Investment & Approvals" }
    }
  };
  
 

  return (
    <div className="bg-[#006064] w-[99%] p-8 border-5 rounded-md border-[#FFB400]">
      <h2 className="text-white text-2xl font-bold mb-4">AI-Powered Healthcare Market Trends</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 📊 Line Chart (Forecasting) */}
        <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
        <img src={logoSrc} alt="Logo" className="w-8 h-8" />
          <h3 className="text-lg font-semibold text-[#006064]">Healthcare Demand & Cost Forecast</h3>
          <select value={forecastPeriod} onChange={(e) => setForecastPeriod(e.target.value)}>
            <option>6 Months</option>
            <option>12 Months</option>
          </select>
          </div>
          <Chart options={lineChartOptions} series={lineChartData} type="line" height={350} />
        </div>

        {/* 🌍 Heatmap (Disease Prevalence) */}
        <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
        <img src={logoSrc} alt="Logo" className="w-8 h-8" />
          <h3 className="text-lg font-semibold text-[#006064]">Disease Prevalence Trends</h3>
          <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
            {Object.keys(heatmapData).map((region) => (
              <option key={region}>{region}</option>
            ))}
          </select>
          </div>
          <Chart options={heatmapOptions} series={heatmapData[selectedRegion]} type="heatmap" height={350} />
        </div>

        {/* 👥 Bubble Chart (Patient Demographics) */}
        <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
        <img src={logoSrc} alt="Logo" className="w-8 h-8" />
          <h3 className="text-lg font-semibold text-[#006064]">Demographics & Insurance</h3>
          <select value={insuranceFilter} onChange={(e) => setInsuranceFilter(e.target.value)}>
            <option>Insured</option>
            <option>Uninsured</option>
          </select>
          </div>
          <Chart options={bubbleChartOptions} series={bubbleChartData[insuranceFilter]} type="bubble" height={350} />
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
        {/* 🚀 Stacked Bar Chart (Medical Innovation) */}
        <div className="bg-white p-4 rounded-lg w-[55%]">
        <div className="flex justify-between items-center mb-2">
        <img src={logoSrc} alt="Logo" className="w-8 h-8" />
          <h3 className="text-lg font-semibold text-[#006064]">Medical Innovation Trends</h3>
          <select value={innovationFilter} onChange={(e) => setInnovationFilter(e.target.value)}>
            <option>R&D Investment ($B)</option>
            <option>New Drug Approvals</option>
          </select>
          </div>
          <Chart options={stackedBarChartOptions} series={stackedBarChartData[innovationFilter]} type="bar" height={350} />
        </div>
</div>
    </div>
  );
};

export default HealthcareTrendsDashboard;
