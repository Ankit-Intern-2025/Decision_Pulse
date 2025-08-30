import React, { useState } from "react";
import Chart from "react-apexcharts";
import logoSrc from "../../../../components/images/totalsales.png";

const PropertyListingsSalesPerformanceDashboard = () => {
  const [yearListingsSales, setYearListingsSales] = useState("2028");
  const [yearRevenue, setYearRevenue] = useState("2028");
  const [yearRentalTrends, setYearRentalTrends] = useState("2028");
  const [loanCategory, setLoanCategory] = useState("Fixed Rate");

  // 📊 Total Listings & Sales Performance (Horizontal Bar Chart)
  const listingsSalesData = {
    "2028": { newListings: [180, 200, 170, 210, 220], soldProperties: [130, 150, 140, 160, 170] },
    "2029": { newListings: [200, 220, 190, 230, 240], soldProperties: [150, 170, 160, 180, 190] },
  };

  const listingsSalesOptions = {
    chart: { type: "bar", horizontal: true, height: 350 },
    xaxis: { categories: ["Q1", "Q2", "Q3", "Q4", "Annual"] },
    colors: ["#006064", "#087F8C"],
    title: { text: "" },
  };

  const listingsSalesSeries = [
    { name: "New Listings", data: listingsSalesData[yearListingsSales].newListings },
    { name: "Sold Properties", data: listingsSalesData[yearListingsSales].soldProperties },
  ];

  // 💰 Revenue Contribution by Property Type (Pie Chart)
  const revenueData = {
    "2028": [40, 30, 20, 5, 5],
    "2029": [35, 32, 22, 6, 5],
  };

  const revenueOptions = {
    chart: { type: "pie" },
    labels: ["Residential", "Commercial", "Industrial", "Mixed-use", "Others"],
    colors: ["#00ACC1", "#FFB400", "#16262E", "#4A4A4A", "#878787"],
    title: { text: "" },
  };

  const revenueSeries = revenueData[yearRevenue];

  // 📈 Short-Term vs. Long-Term Rental Trends (Connected Scatter + Line Chart)
  const rentalTrendsData = {
    "2028": { airbnb: [80, 90, 100, 95, 110], traditional: [60, 70, 80, 75, 85] },
    "2029": { airbnb: [85, 95, 105, 100, 115], traditional: [65, 75, 85, 80, 90] },
  };

  const rentalTrendsOptions = {
    chart: { type: "scatter", height: 350 },
    xaxis: { categories: ["Q1", "Q2", "Q3", "Q4", "Annual"] },
    stroke: { curve: "smooth", width: 3 },
    colors: ["#FF5733", "#3498DB"],
    title: { text: "" },
  };

  const rentalTrendsSeries = [
    { name: "Airbnb", data: rentalTrendsData[yearRentalTrends].airbnb },
    { name: "Traditional Leasing", data: rentalTrendsData[yearRentalTrends].traditional },
  ];

 // 📊 Mortgage & Loan Trends (Bar Chart with Dropdown for Categories)
 const mortgageLoanData = {
  "Fixed Rate": [3.5, 3.7, 3.9, 4.0, 4.2], // Interest rates over Q1, Q2, Q3, Q4, Annual
  "Variable Rate": [2.9, 3.1, 3.4, 3.6, 3.8], // Interest rates over Q1, Q2, Q3, Q4, Annual
  "Approved Loans": [300, 350, 400, 450, 500], // Number of approved loans over time
};

const mortgageLoanOptions = {
  chart: {
    type: "bar",
  },
  plotOptions: {
    bar: {
      horizontal: true, // Enables horizontal bars
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      colors: ['#fff'], // White text color for the labels
    },
    formatter: (value) => `${value}`, // Display the actual value as a label
  },
  xaxis: {
    categories: ["Q1", "Q2", "Q3", "Q4", "Annual"], // Quarterly data categories
    title: {
      text: "Time Period", // Label for the x-axis
    },
  },
  yaxis: {
    title: {
      text: loanCategory === "Approved Loans" ? "Number of Loans" : "Interest Rate (%)", // Dynamic y-axis label based on selected category
    },
  },
  colors: ["#006064", "#087F8C", "#00ACC1"], // Color palette for the bars
  title: {
    text: `Mortgage & Loan Trends: ${loanCategory}`, // Dynamic title based on the selected loan category
    align: "center",
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#333',
    },
  },
  tooltip: {
    y: {
      formatter: (value) => loanCategory === "Approved Loans" ? `${value} loans` : `${value}%`, // Tooltip format
    },
  },
};

const mortgageLoanSeries = [
  { name: loanCategory, data: mortgageLoanData[loanCategory] },
];


console.log("PropertyListings&SalesPerformanceDashboard")

  return (
    <div className="bg-[#006064] w-[99%] p-8 border-5 rounded-md border-[#FFB400]">

      
      <h2 className="text-2xl font-semibold mb-4 text-[white]">🏠 Property Listings & Sales Performance Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 📊 Total Listings & Sales Performance */}
        <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Total Listings & Sales Performance</h3>
          <div className="flex justify-end mb-4">
            <select
              value={yearListingsSales}
              onChange={(e) => setYearListingsSales(e.target.value)}
              className="border p-2"
            >
              <option value="2028">2028</option>
              <option value="2029">2029</option>
            </select>
          </div>
          </div>
          
          <Chart options={listingsSalesOptions} series={listingsSalesSeries} type="bar" height={350} />
        </div>

        {/* 💰 Revenue Contribution by Property Type */}
        <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Revenue Contribution by Property Type</h3>
          <div className="flex justify-end mb-4">
            <select
              value={yearRevenue}
              onChange={(e) => setYearRevenue(e.target.value)}
              className="border p-2"
            >
              <option value="2028">2028</option>
              <option value="2029">2029</option>
            </select>
          </div>
          </div>
          <Chart options={revenueOptions} series={revenueSeries} type="pie" height={350} />
        </div>

        {/* 📈 Short-Term vs. Long-Term Rental Trends */}
        <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-2 ">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Short-Term vs. Long-Term Rental Trends</h3>
          <div className="flex justify-end mb-4">
            <select
              value={yearRentalTrends}
              onChange={(e) => setYearRentalTrends(e.target.value)}
              className="border p-2"
            >
              <option value="2028">2028</option>
              <option value="2029">2029</option>
            </select>
          </div>
          </div>
          <Chart options={rentalTrendsOptions} series={rentalTrendsSeries} type="scatter" height={350} />
        </div>

        {/* 📊 Mortgage & Loan Trends */}
        <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-2 ">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">   Mortgage & Loan Trends</h3>
          <div className="flex justify-end mb-4">
            <select
              value={loanCategory}
              onChange={(e) => setLoanCategory(e.target.value)}
              className="border p-2"
            >
              <option value="Fixed Rate">Fixed Rate</option>
              <option value="Variable Rate">Variable Rate</option>
              <option value="Approved Loans">Approved Loans</option>
            </select>
          </div>
          </div>
          <Chart options={mortgageLoanOptions} series={mortgageLoanSeries} type="bar" height={350} />
        </div>
      </div>
    </div>
  );
};

export default PropertyListingsSalesPerformanceDashboard;
