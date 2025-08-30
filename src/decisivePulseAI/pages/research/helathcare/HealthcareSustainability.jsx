import React, { useState } from "react";
import Chart from "react-apexcharts";
import logoSrc from "../../../components/images/totalsales.png";
const HealthcareSustainability = () => {
 
  // Filters (States)
  const [selectedYearRange, setSelectedYearRange] = useState("2019-2024");
  const [selectedRegion, setSelectedRegion] = useState("Global");
  const [selectedCompliance, setSelectedCompliance] = useState("All");

  // 🟢 Carbon Footprint & Sustainability Score
  const allYears = ["2019", "2020", "2021", "2022", "2023", "2024"];
  const filteredYears = selectedYearRange === "2021-2024" ? allYears.slice(2) : allYears;

  const sustainabilityOptions = { chart: { type: "area" }, xaxis: { categories: filteredYears }, colors: ["#006064", "#00ACC1"] };
  const sustainabilitySeries = [
    { name: "Carbon Footprint (in tons)", data: selectedYearRange === "2021-2024" ? [120, 110, 105, 100] : [150, 140, 130, 120, 110, 100] },
    { name: "Sustainability Score", data: selectedYearRange === "2021-2024" ? [60, 65, 70, 75] : [50, 55, 60, 65, 70, 75] }
  ];

  // 🔵 Adoption of Green Healthcare Practices
  const greenPracticesData = [
    { x: "Recycling", y: 70 },
    { x: "Energy Efficiency", y: 85 },
    { x: "Waste Reduction", y: 60 },
    { x: "Eco-Friendly Equipment", y: 50 }
  ];

  const greenPracticesOptions = { chart: { type: "bar" }, colors: ["#087F8C"] };
  const greenPracticesSeries = [{ name: "Adoption Rate (%)", data: greenPracticesData }];

  // 🟠 Regulatory Compliance Dashboard
  const complianceOptions = { chart: { type: "line" }, xaxis: { categories: ["2018", "2020", "2022", "2024"] }, colors: ["#087F8C", "#FFB400"] };
  const complianceSeries = selectedCompliance === "Emissions" ? [{ name: "Emissions Compliance", data: [30, 50, 70, 85] }] :
                            selectedCompliance === "Waste" ? [{ name: "Waste Management Compliance", data: [40, 55, 65, 80] }] :
                            [{ name: "Emissions Compliance", data: [30, 50, 70, 85] }, { name: "Waste Management Compliance", data: [40, 55, 65, 80] }];

  // 🔴 Global Health Initiatives & Funding
  const fundingData = { Global: [20, 35, 50, 65], USA: [30, 45, 60, 80], Europe: [25, 40, 55, 70] };
  const fundingOptions = { chart: { type: "heatmap" }, xaxis: { categories: ["2019", "2020", "2021", "2022"] }, colors: ["#16262E"] };
  const fundingSeries = [{ name: "Funding (in billion $)", data: fundingData[selectedRegion] }];


  const [fundingYear, setFundingYear] = useState("2027");

  // 📊 Modified Global Health Initiatives Funding Data for 2027 and 2028
  const fundingData2 = {
    "2027": {
      mentalHealth: 22, // Percentage funding for Mental Health
      diseasePrevention: 30, // Percentage funding for Disease Prevention
      healthcareInfrastructure: 25, // Percentage funding for Healthcare Infrastructure
      cleanWaterProjects: 15, // Percentage funding for Clean Water Projects
      other: 8, // Percentage funding for Other
    },
    "2028": {
      mentalHealth: 25,
      diseasePrevention: 28,
      healthcareInfrastructure: 26,
      cleanWaterProjects: 12,
      other: 9,
    },
  };

  // 🧑‍⚕️ Pie Chart Options for Funding Distribution
  const fundingOptions2 = {
    chart: {
      type: "pie",
      height: 350,
    },
    labels: [
      "Mental Health",
      "Disease Prevention",
      "Healthcare Infrastructure",
      "Clean Water Projects",
      "Other",
    ],

   colors: [
      "#006064", // Mental Health
      "#087F8C", // Disease Prevention
      "#00ACC1", // Healthcare Infrastructure
      "#FFB400", // Clean Water Projects
      "#16262E", // Other
      "#4A4A4A", // Optional additional color if needed
    ],

    title: {
      text: "Global Health Initiatives Funding Distribution",
      align: "center",
      style: {
        color: "#006064",
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
        },
      },
    ],
  };

  // 🏥 Pie Chart Data based on selected year
  const fundingSeries2 = fundingYear in fundingData2 ? Object.values(fundingData2[fundingYear]) : [];



  
  return (
    <div className="bg-[#006064] w-[99%] p-16 rounded-md border-[#FFB400]">
      <h2 className="text-2xl font-bold mb-4 text-white">Healthcare Sustainability Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 🟢 Carbon Footprint & Sustainability Score */}
        <div className="p-4 shadow-md rounded-lg bg-white">
        <div className="flex justify-between items-center mb-2">
        <img src={logoSrc} alt="Logo" className="w-8 h-8" />
        <h3 className="text-lg font-semibold text-[#006064]">Carbon Footprint of Hospitals & Pharma Companies</h3>
            <select className="border p-2 rounded" onChange={(e) => setSelectedYearRange(e.target.value)}>
              <option value="2019-2024">2019-2024</option>
              <option value="2021-2024">2021-2024</option>
            </select>
          </div>
          <Chart options={sustainabilityOptions} series={sustainabilitySeries} type="area" height={350} />
        </div>

        {/* 🔵 Adoption of Green Healthcare Practices */}
        <div className="p-4 shadow-md rounded-lg bg-white">
        <div className="flex justify-between items-center mb-2">
        <img src={logoSrc} alt="Logo" className="w-8 h-8" />
        <h3 className="text-lg font-semibold text-[#006064]">Adoption of Green Healthcare Practices</h3>
         </div>
          <Chart options={greenPracticesOptions} series={greenPracticesSeries} type="bar" height={350} />
        </div>

        {/* 🟠 Regulatory Compliance Dashboard */}
        <div className="p-4 shadow-md rounded-lg bg-white">
        <div className="flex justify-between items-center mb-2">
        <img src={logoSrc} alt="Logo" className="w-8 h-8" />
        <h3 className="text-lg font-semibold text-[#006064]">Regulatory Compliance Dashboard</h3>
            <select className="border p-2 rounded" onChange={(e) => setSelectedCompliance(e.target.value)}>
              <option value="All">All</option>
              <option value="Emissions">Emissions Compliance</option>
              <option value="Waste">Waste Management</option>
            </select>
          </div>
          <Chart options={complianceOptions} series={complianceSeries} type="line" height={350} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <img src={logoSrc} alt="Logo" className="w-8 h-8" />
        <h3 className="text-lg font-semibold text-[#006064]">Global Health Initiatives & Funding</h3>
        <select
          value={fundingYear}
          onChange={(e) => setFundingYear(e.target.value)} // Update year on selection
          className="border p-2"
        >
          <option value="2027">2027</option>
          <option value="2028">2028</option>
        </select>
      </div>
      <Chart
        options={fundingOptions2}
        series={fundingSeries2}
        type="pie"
        height={350}
      />
    </div>

       

      </div>
    </div>
  );
};

export default HealthcareSustainability;
