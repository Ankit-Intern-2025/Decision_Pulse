import React, { useState } from "react";
import Chart from "react-apexcharts";
import logoSrc from "../../../../components/images/totalsales.png";

const FMCGMarketInsights = () => {
  
   // Set the initial year (you can dynamically change this if needed)
   const [year, setYear] = useState("2028");

   const marketTrendsSeries = [25, 35, 20, 15]; // Replace with your actual data

   const marketTrendsOptions = {
     chart: {
       type: 'pie',
       id: 'market-trends-chart',
     },
     labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'], // Replace with your actual categories
     colors: ['#006064', '#087F8C', '#00ACC1', '#FFB400'], // Adjust the color scheme if needed
     title: {
       text: 'Global & Regional FMCG Market Trends',
       align: 'center',
       style: {
         fontSize: '18px',
         fontWeight: 'bold',
         color: '#087F8C',
       },
     },
     responsive: [
       {
         breakpoint: 480,
         options: {
           chart: {
             width: '100%',
           },
           legend: {
             position: 'bottom',
           },
         },
       },
     ],
   };

 


  // 📈 Consumer Buying Behavior Insights (Dot Plot)
  const buyingBehaviorData = {
    "2028": [
      { x: "Jan", y: 10 },
      { x: "Feb", y: 20 },
      { x: "Mar", y: 30 },
      { x: "Apr", y: 40 },
      { x: "May", y: 50 },
      { x: "Jun", y: 60 },
      { x: "Jul", y: 55 },
      { x: "Aug", y: 50 },
      { x: "Sep", y: 45 },
      { x: "Oct", y: 60 },
    ],
    "2029": [
      { x: "Jan", y: 12 },
      { x: "Feb", y: 22 },
      { x: "Mar", y: 32 },
      { x: "Apr", y: 42 },
      { x: "May", y: 52 },
      { x: "Jun", y: 62 },
      { x: "Jul", y: 57 },
      { x: "Aug", y: 52 },
      { x: "Sep", y: 47 },
      { x: "Oct", y: 62 },
    ]
  };

  const buyingBehaviorOptions = {
    chart: { type: "scatter", height: 350 },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"] },
    yaxis: { title: { text: "Consumer Sentiment Score" } },
    colors: ["#0B3D91"],
    grid: {
      show: true,
      borderColor: "#000000",
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } }
    },
    stroke: { width: 3, curve: "smooth" }
  };

  const buyingBehaviorSeries = [
    { name: "Consumer Sentiment", data: buyingBehaviorData[year] },
  ];



  // 📊 Top Performing Brands & Products (Bar Chart)
  const topBrandsData = {
    "2028": [
      { brand: "Brand A", marketShare: 25, revenue: 200, growth: 10 },
      { brand: "Brand B", marketShare: 20, revenue: 180, growth: 12 },
      { brand: "Brand C", marketShare: 15, revenue: 150, growth: 8 },
      { brand: "Brand D", marketShare: 10, revenue: 120, growth: 15 },
      { brand: "Brand E", marketShare: 10, revenue: 110, growth: 5 },
      { brand: "Brand F", marketShare: 5, revenue: 60, growth: 10 },
     

    ],
    "2029": [
      { brand: "Brand A", marketShare: 27, revenue: 210, growth: 11 },
      { brand: "Brand B", marketShare: 22, revenue: 190, growth: 14 },
      { brand: "Brand C", marketShare: 14, revenue: 160, growth: 9 },
      { brand: "Brand D", marketShare: 12, revenue: 130, growth: 16 },
      { brand: "Brand E", marketShare: 10, revenue: 115, growth: 6 },
      { brand: "Brand F", marketShare: 5, revenue: 70, growth: 12 },
 
     
    ],
  };

  const topBrandsOptions = {
    chart: { type: "bar", height: 350 },
    xaxis: { categories: topBrandsData[year].map((item) => item.brand) },
    colors: ["#FFB400", "#087F8C", "#16262E", "#00ACC1", "#4A4A4A"],
    grid: {
      show: true,
      borderColor: "#000000",
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } }
    }
  };

  const topBrandsSeries = [
    { name: "Market Share", data: topBrandsData[year].map((item) => item.marketShare) },
    { name: "Revenue", data: topBrandsData[year].map((item) => item.revenue) },
    { name: "Growth Rate", data: topBrandsData[year].map((item) => item.growth) },
  ];




  const complianceData = {
    "2028": [40, 30, 20, 10],
    "2029": [45, 35, 15, 5],
  };


  // Pie chart options
  const complianceOptions = {
    chart: {
      type: "pie",
    },
    labels: ["Compliant", "Partially Compliant", "Under Review", "Non-Compliant"],
    colors: ["#006064", "#00ACC1", "#087F8C", "#FFB400"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  // Get the compliance data for the selected year
  const complianceSeries = complianceData[year];


  // Define the competitive benchmarking data for years 2028 and 2029
  const benchmarkingData = {
    "2028": {
      categories: ["Q1", "Q2", "Q3", "Q4"],
      series: [
        {
          name: "Company A",
          data: [25, 40, 35, 50],
        },
        {
          name: "Company B",
          data: [30, 45, 40, 55],
        },
        {
          name: "Company C",
          data: [20, 30, 35, 45],
        },
      ],
    },
    "2029": {
      categories: ["Q1", "Q2", "Q3", "Q4"],
      series: [
        {
          name: "Company A",
          data: [35, 50, 45, 60],
        },
        {
          name: "Company B",
          data: [40, 55, 50, 65],
        },
        {
          name: "Company C",
          data: [30, 40, 45, 55],
        },
      ],
    },
  };


  // Benchmarking chart options
  const benchmarkingOptions = {
    chart: {
      type: "line",
    },
    xaxis: {
      categories: benchmarkingData[year].categories,
    },
    colors: ["#006064", "#00ACC1", "#087F8C"],
    title: {
   
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#087F8C",
      },
    },
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 5,
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
  };

  // Get the benchmarking data for the selected year
  const benchmarkingSeries = benchmarkingData[year].series;



  return (
    <div className="bg-[#006064] w-[99%] p-8 border-5 rounded-md border-[#FFB400]">
      <h2 className="text-2xl font-semibold mb-4 text-white">FMCG Market Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* YoY Revenue Growth */}
      
      

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Consumer Buying Behavior Insights</h3>
          </div>
          <Chart options={buyingBehaviorOptions} series={buyingBehaviorSeries} type="scatter" height={350} />
        </div>


        {/* Top Performing Brands & Products */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Top Performing Brands & Products</h3>
          </div>
          <Chart options={topBrandsOptions} series={topBrandsSeries} type="bar" height={350} />
        </div>

        


        <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        {/* Logo */}
        <img src={logoSrc} alt="Logo" className="w-8 h-8" />

        {/* Title */}
        <h3 className="text-lg font-semibold text-[#087F8C]">
          Global & Regional FMCG Market Trends
        </h3>

        {/* Year Dropdown (optional) */}
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2"
        >
          <option value="2028">2028</option>
          <option value="2029">2029</option>
        </select>
      </div>

      {/* Pie Chart */}
      <Chart
        options={marketTrendsOptions}
        series={marketTrendsSeries}
        type="pie"
        height={350}
      />
    </div>


         <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        {/* Logo */}
        <img src={logoSrc} alt="Logo" className="w-8 h-8" />
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-[#087F8C]">
          Competitive Benchmarking for {year}
        </h3>

        {/* Dropdown for Year Selection */}
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2"
        >
          <option value="2028">2028</option>
          <option value="2029">2029</option>
        </select>
      </div>

      {/* ApexCharts Line Chart */}
      <Chart
        options={benchmarkingOptions}
        series={benchmarkingSeries}
        type="line"
        height={350}
      />
    </div>



    
 

      </div>
      <div className="flex justify-center items-center mt-6 ">
    <div className="p-4 shadow-md rounded-lg bg-white">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Regulatory & Compliance Updates</h3>
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

export default FMCGMarketInsights;
