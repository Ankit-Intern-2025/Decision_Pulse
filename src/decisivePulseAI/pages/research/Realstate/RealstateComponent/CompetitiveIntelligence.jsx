

import React, { useState, useMemo } from "react";
import Chart from "react-apexcharts";

import logoSrc from "../../../../components/images/totalsales.png";

const companies = ["Zillow", "CBRE", "RE/MAX", "Jones Lang LaSalle", "Coldwell Banker"];
const locations = ["Urban", "Suburban", "Rural", "Coastal", "Mountain"];
const technologies = ["PropTech", "AI Valuation", "Blockchain in Real Estate", "Smart Homes", "Green Buildings"];
const newsCategories = ["Real Estate Policies", "Market News", "Developer Trends", "Interest Rates", "Housing Demand"];

const chartColors = ["#006064", "#087F8C", "#00ACC1", "#FFB400", "#16262E", "#4A4A4A"];

const CompetitiveIntelligence = () => {
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedTechnology, setSelectedTechnology] = useState("All");
  const [selectedNewsCategory, setSelectedNewsCategory] = useState("All");

  // Market Share Data
  const marketShareData = useMemo(() => {
    let data = [30, 25, 20, 15, 10];
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

  // Property Price Comparison
  const propertyPriceData = useMemo(() => {
    let data = locations.map((loc, index) => ({
      name: loc,
      data: [[index + 1, Math.floor(Math.random() * 500000) + 150000]],
    }));

    if (selectedLocation !== "All") {
      data = data.filter((d) => d.name === selectedLocation);
    }

    return {
      series: data,
      options: {
        chart: { type: "scatter" },
        colors: chartColors,
        xaxis: { categories: locations, title: { text: "Location Type" } },
        yaxis: { title: { text: "Average Price ($)" } },
        legend: { show: true, position: "bottom" },
      },
    };
  }, [selectedLocation]);

  // Technology & Innovation Comparison
  const innovationData = useMemo(() => {
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

  // Social Media & News Trends
  const newsTrendsData = useMemo(() => {
    let data = newsCategories.map(() => Math.floor(Math.random() * 300) + 50);
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

  return (
    <div className="bg-[#006064] w-[99%] p-8 border-5 rounded-md border-[#FFB400]">
      <div className="grid grid-cols-2 gap-6">
        {/* Market Share Analysis */}
        <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-2">
        <img src={logoSrc} alt="Logo" className="w-8 h-8" />
        <h3 className="text-lg font-semibold text-[#087F8C]">Market Share Analysis</h3>
          <select onChange={(e) => setSelectedCompany(e.target.value)} className="p-2 rounded bg-white text-black">
            <option value="All">All</option>
            {companies.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          </div>
          <Chart options={marketShareData.options} series={marketShareData.series} type="bar" height={350} />
        </div>

        {/* Property Price Comparison */}
        <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-2">
        <img src={logoSrc} alt="Logo" className="w-8 h-8" />
        <h3 className="text-lg font-semibold text-[#087F8C]">Average Property Price Comparison</h3>
          <select onChange={(e) => setSelectedLocation(e.target.value)} className="p-2 rounded bg-white text-black">
            <option value="All">All</option>
            {locations.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          </div>
          <Chart options={propertyPriceData.options} series={propertyPriceData.series} type="scatter" height={350} />
        </div>

        {/* Technology & Innovation Comparison */}
        <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-2">
        <img src={logoSrc} alt="Logo" className="w-8 h-8" />
        <h3 className="text-lg font-semibold text-[#087F8C]">Technology & Innovation Comparison</h3>
          <select onChange={(e) => setSelectedTechnology(e.target.value)} className="p-2 rounded bg-white text-black">
            <option value="All">All</option>
            {technologies.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          </div>
          <Chart options={innovationData.options} series={innovationData.series} type="radar" height={350} />
        </div>

        {/* Social Media & News Trends */}
        <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-2">
        <img src={logoSrc} alt="Logo" className="w-8 h-8" />
        <h3 className="text-lg font-semibold text-[#087F8C]">Social Media & News Trends</h3>
          <select onChange={(e) => setSelectedNewsCategory(e.target.value)} className="p-2 rounded bg-white text-black">
            <option value="All">All</option>
            {newsCategories.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          </div>
          <Chart options={newsTrendsData.options} series={newsTrendsData.series} type="line" height={350} />
        </div>
      </div>
    </div>
  );
};

export default CompetitiveIntelligence;
