import React, { useState, useMemo } from "react";
import Chart from "react-apexcharts";
import logoSrc from "../../../components/images/totalsales.png";

const companies = ["Mayo Clinic", "Apollo", "NHS", "Kaiser Permanente", "Cleveland Clinic", "Johns Hopkins", "Mount Sinai"];
const drugs = ["Drug A", "Drug B", "Drug C", "Drug D", "Drug E", "Drug F"];
const technologies = ["AI Diagnostics", "Robotics", "Wearable Tech", "Telemedicine", "Bioprinting"];
const newsCategories = ["Health Policy", "Medical Research", "Global Health", "Technology", "Pharmaceuticals", "Public Awareness"];

const chartColors = ["#006064", "#087F8C", "#00ACC1", "#FFB400", "#16262E", "#4A4A4A"];

const CompetitiveIntelligence = () => {
  // Filters
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [selectedDrug, setSelectedDrug] = useState("All");
  const [selectedTechnology, setSelectedTechnology] = useState("All");
  const [selectedNewsCategory, setSelectedNewsCategory] = useState("All");

  // Filtered Market Share Data
  const filteredMarketShareData = useMemo(() => {
    let data = [35, 25, 20, 20, 15, 10, 5];
    let categories = companies;

    if (selectedCompany !== "All") {
      const index = companies.indexOf(selectedCompany);
      data = index !== -1 ? [data[index]] : [];
      categories = index !== -1 ? [selectedCompany] : [];
    }

    return {
      series: [{ name: "Market Share %", data }],
      options: {
        chart: { type: "bar", horizontal: true },
        colors: chartColors,
        xaxis: { categories },
        legend: { show: true, position: "bottom" },
        plotOptions: { bar: { distributed: true } },
      },
    };
  }, [selectedCompany]);

  // Filtered Drug Pricing Data
  const filteredDrugPricingData = useMemo(() => {
    let data = drugs.map((drug, index) => ({
      name: drug,
      data: [[index + 1, Math.floor(Math.random() * 100) + 20]],
    }));

    if (selectedDrug !== "All") {
      data = data.filter((d) => d.name === selectedDrug);
    }

    return {
      series: data,
      options: {
        chart: { type: "scatter" },
        colors: chartColors,
        xaxis: { categories: drugs, title: { text: "Drugs" } },
        yaxis: { title: { text: "Investment (Millions)" } },
        legend: { show: true, position: "bottom" },
      },
    };
  }, [selectedDrug]);

  // Filtered Innovation Data
  const filteredInnovationData = useMemo(() => {
    let data = technologies.map(() => Math.floor(Math.random() * 100) + 10);
    let labels = technologies;

    if (selectedTechnology !== "All") {
      const index = technologies.indexOf(selectedTechnology);
      data = index !== -1 ? [data[index]] : [];
      labels = index !== -1 ? [selectedTechnology] : [];
    }

    return {
      series: [{ name: "Tech Score", data }],
      options: {
        chart: { type: "radar" },
        labels,
        colors: [chartColors[0]],
        legend: { show: true, position: "bottom" },
      },
    };
  }, [selectedTechnology]);

  // Filtered News Trends Data
  const filteredNewsTrendsData = useMemo(() => {
    let data = newsCategories.map(() => Math.floor(Math.random() * 250) + 50);
    let categories = newsCategories;

    if (selectedNewsCategory !== "All") {
      const index = newsCategories.indexOf(selectedNewsCategory);
      data = index !== -1 ? [data[index]] : [];
      categories = index !== -1 ? [selectedNewsCategory] : [];
    }

    return {
      series: [{ name: "Mentions", data }],
      options: {
        chart: { type: "line" },
        colors: [chartColors[1]],
        xaxis: { categories, title: { text: "News Categories" } },
        yaxis: { title: { text: "Mentions" } },
        legend: { show: true, position: "bottom" },
      },
    };
  }, [selectedNewsCategory]);


    // 🏥 State for year selection (2027 and 2028)
    const [sentimentYear, setSentimentYear] = useState("2027");

    // 📊 Sentiment Data for Patients and Physicians in 2027 and 2028
    const sentimentData = {
      "2027": {
        patients: {
          positive: 50,
          neutral: 30,
          negative: 20,
        },
        physicians: {
          positive: 60,
          neutral: 25,
          negative: 15,
        },
      },
      "2028": {
        patients: {
          positive: 55,
          neutral: 25,
          negative: 20,
        },
        physicians: {
          positive: 65,
          neutral: 20,
          negative: 15,
        },
      },
    };
  
    // 🧑‍⚕️ Bar Chart Options for Sentiment Analysis
    const sentimentOptions = {
      chart: {
        type: "bar",
        height: 350,
        stacked: true, // Stack the bars for better comparison
      },
      plotOptions: {
        bar: {
          horizontal: true, // Horizontal bars for better readability
          dataLabels: {
            position: "top",
          },
        },
      },
      colors: [
        "#006064", // Positive Sentiment
        "#087F8C", // Neutral Sentiment
        "#FFB400", // Negative Sentiment
      ],
      xaxis: {
        categories: ["Patients", "Physicians"],
        title: {
          text: "Sentiment Analysis",
          style: {
            color: "#16262E",
          },
        },
      },
      yaxis: {
        title: {
          text: "Sentiment Percentage",
          style: {
            color: "#16262E",
          },
        },
      },
      title: {
   
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
              width: "10%",
            },
          },
        },
      ],
    };
  
    // 🏥 Bar Chart Data for the selected year
    const sentimentSeries = sentimentYear in sentimentData ? [
      {
        name: "Positive Sentiment",
        data: [
          sentimentData[sentimentYear].patients.positive,
          sentimentData[sentimentYear].physicians.positive,
        ],
      },
      {
        name: "Neutral Sentiment",
        data: [
          sentimentData[sentimentYear].patients.neutral,
          sentimentData[sentimentYear].physicians.neutral,
        ],
      },
      {
        name: "Negative Sentiment",
        data: [
          sentimentData[sentimentYear].patients.negative,
          sentimentData[sentimentYear].physicians.negative,
        ],
      },
    ] : [];

  return (
    <div className="p-6 bg-[#006064]">
      <div className="grid grid-cols-2 gap-6">
        
        {/* Market Share Analysis */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#006064]">Market Share Analysis of Healthcare Providers</h3>
            {/* <select className="p-2 rounded bg-white text-black" onChange={(e) => setSelectedCompany(e.target.value)}>
              <option value="All">All</option>
              {companies.map((c) => <option key={c} value={c}>{c}</option>)}
            </select> */}
          </div>
          <Chart options={filteredMarketShareData.options} series={filteredMarketShareData.series} type="bar" height={350} />
        </div>

        {/* Drug Pricing & R&D Investment */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Pharmaceutical Drug Pricing & R&D Costs</h3>
            {/* <select className="p-2 rounded bg-white text-black" onChange={(e) => setSelectedDrug(e.target.value)}>
              <option value="All">All</option>
              {drugs.map((d) => <option key={d} value={d}>{d}</option>)}
            </select> */}
          </div>
          <Chart options={filteredDrugPricingData.options} series={filteredDrugPricingData.series} type="scatter" height={350} />
        </div>

        {/* Technology Innovation */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#00ACC1]">Technology & Equipment Innovation Comparison</h3>
            {/* <select className="p-2 rounded bg-white text-black" onChange={(e) => setSelectedTechnology(e.target.value)}>
              <option value="All">All</option>
              {technologies.map((t) => <option key={t} value={t}>{t}</option>)}
            </select> */}
          </div>
          <Chart options={filteredInnovationData.options} series={filteredInnovationData.series} type="radar" height={350} />
        </div>

        {/* Social Media & News Trends */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#FFB400]">Social Media & News Trends</h3>
            {/* <select className="p-2 rounded bg-white text-black" onChange={(e) => setSelectedNewsCategory(e.target.value)}>
              <option value="All">All</option>
              {newsCategories.map((n) => <option key={n} value={n}>{n}</option>)}
            </select> */}
          </div>
          <Chart options={filteredNewsTrendsData.options} series={filteredNewsTrendsData.series} type="line" height={350} />
        </div>


      </div>
      
      <div className="flex justify-center items-center mt-6 ">
        <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <img src={logoSrc} alt="Logo" className="w-8 h-8" />
        <h3 className="text-lg font-semibold text-[#006064]">Patient & Physician Sentiment Analysis</h3>
        <select
          value={sentimentYear}
          onChange={(e) => setSentimentYear(e.target.value)} // Update year on selection
          className="border p-2"
        >
          <option value="2027">2027</option>
          <option value="2028">2028</option>
        </select>
      </div>
      <Chart
        options={sentimentOptions}  // Chart configuration
        series={sentimentSeries}    // Data for the selected year
        type="bar"                  // Bar chart type
        height={350}                // Chart height
      />
    </div>
    </div>
    </div>
  );
};

export default CompetitiveIntelligence;
