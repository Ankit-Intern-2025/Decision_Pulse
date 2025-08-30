import React, { useState } from 'react';
import ApexCharts from 'react-apexcharts';
import logoSrc from "../../../../components/images/totalsales.png"; // Assuming you are using this logo somewhere else in your component.

const SupplyChainComponent = () => {
  // Chart Options and Series...   
 

  const marketShareOptions = {
    chart: {
      type: 'bar',
    },
    colors: ['#006064', '#087F8C', '#00ACC1', '#FFB400'],
    xaxis: {
      categories: ['ExxonMobil', 'Shell', 'BP', 'TotalEnergies', 'Chevron'],
    },
  
  };
  
  const marketShareSeries = [
    {
      name: 'Market Share (%)',
      data: [20, 18, 17, 15, 12],
    },
  ];
  
  const sentimentOptions = {
    chart: {
      type: 'bar',
      stacked: true,
    },
    colors: ['#00ACC1', '#FFB400', '#16262E'],
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
  
    xaxis: {
      categories: ['Customer Sentiment', 'Investor Sentiment', 'Employee Sentiment', 'Media Sentiment', 'Public Sentiment'],
    },
  };
  
  const sentimentSeries = [
    {
      name: 'Positive',
      data: [80, 70, 65, 75, 60],
    },
    {
      name: 'Neutral',
      data: [15, 20, 25, 20, 30],
    },
    {
      name: 'Negative',
      data: [5, 10, 10, 5, 10],
    },
  ];
  


  const techInnovationOptions = {
    chart: {
      type: 'radar',
      height: 500,  // Increased height for a larger chart
      width: '100%',  // Make the chart take the full width of its container
    },
    colors: ['#006064', '#00ACC1', '#FFB400'],
    plotOptions: {
      radar: {
        size: 150,  // Increased size of the radar itself
      },
    },
    xaxis: {
      categories: [
        'Exploration & Production (E&P) Technologies',
        'AI & Data Analytics',
        'Digital Oilfields & Remote Monitoring',
        'Renewable Energy Integration',
        'Carbon Capture & Storage',
      ],
      labels: {
        style: {
          fontSize: '14px',  // Slightly larger font size for better readability
        },
        rotate: 45,  // Rotating labels to avoid overlap
      },
    },
    yaxis: {
      show: false,  // Hiding y-axis to give more space to categories
    },
  
  };
  
  const techInnovationSeries = [
    {
      name: 'Adoption Rate (%)',
      data: [40, 60, 50, 30, 25],
    },
  ];
  

  const candlestickOptions = {
    chart: {
      type: 'candlestick',
    },
  
    xaxis: {
      type: 'datetime',
    },
  
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#087F8C',  // Color for the up candles
          downward: '#00ACC1', // Color for the down candles
        }
      }
    }
  };

 
  
  const candlestickSeries = [
    {
      data: [
        {
          x: new Date(2025, 0, 1).getTime(),
          y: [70, 80, 60, 75],
        },
        {
          x: new Date(2025, 0, 2).getTime(),
          y: [75, 85, 65, 80],
        },
        {
          x: new Date(2025, 0, 3).getTime(),
          y: [80, 90, 70, 85],
        },
        {
          x: new Date(2025, 0, 4).getTime(),
          y: [85, 95, 75, 90],
        },
        {
          x: new Date(2025, 0, 5).getTime(),
          y: [90, 100, 80, 95],
        },
      ],
    },
  ];
  




  const aspData = {
    series: [
      {
        name: "ASP vs Units Sold",
        data: [
          [1, 50],   // [Month, ASP Value] format
          [2, 55],
          [3, 60],
          [4, 65],
          [5, 70],
          [6, 75],
          [7, 80],
          [8, 85],
          [9, 90],
          [10, 95],
          [11, 100],
          [12, 105], // Example of ASP vs Units Sold for each month
        ],
      },
    ],
    options: {
      chart: {
        type: "scatter",
        height: 350,
      },
      title: {
        text: "Average Selling Price (ASP) vs Units Sold",
        align: "center",
        style: {
          fontSize: "18px",
          fontWeight: "bold",
        },
      },
      xaxis: {
        title: {
          text: "Months",
        },
        min: 1,
        max: 12, // Representing 12 months of the year
      },
      yaxis: {
        title: {
          text: "ASP ($)",
        },
      },
      grid: {
        show: true, // Show grid lines for easier analysis
      },
      colors: [
        "#006064", "#087F8C", "#00ACC1", "#FFB400", "#16262E", "#4A4A4A", "#878787", "#EFEFEF", "#FFFFFF",
        "#FF5733", "#C70039", "#900C3F", "#581845"
      ], // Array of colors to assign to each point
      markers: {
        size: 8, // Marker size for the data points
        colors: (function() {
          // Array of different colors
          return [
            "#006064", "#087F8C", "#00ACC1", "#FFB400", "#16262E", "#4A4A4A", "#878787", "#EFEFEF", "#FFFFFF",
            "#FF5733", "#C70039", "#900C3F", "#581845"
          ];
        })(), // Dynamically assigning different colors to each point
        strokeColor: "#fff", // Color for the point borders
        strokeWidth: 2,
        shape: "circle", // Shape of the scatter points
        hover: {
          size: 10, // On hover, increase the size of the points
        },
      },
    },
  };



  const [selectedCompany, setSelectedCompany] = useState("All");
    
  const aspDataa = {
    All: [
      [1, 350],    // [Month, ASP Value]
      [2, 380],
      [3, 420],
      [4, 450],
      [5, 460],
      [6, 490],    // Increasing
      [7, 510],
      [8, 480],    // Decreasing
      [9, 500],
      [10, 530],   // Increasing
      [11, 600],   // Large jump
      [12, 550],   // Fluctuating
    ],
    Schlumberger: [
      [1, 400],
      [2, 420],
      [3, 460],
      [4, 500],
      [5, 530],
      [6, 570],    // Increasing
      [7, 600],
      [8, 630],    // Steady increase
      [9, 650],
      [10, 700],   // Jump
      [11, 750],
      [12, 720],   // Decrease after increase
    ],
    Halliburton: [
      [1, 350],
      [2, 370],
      [3, 390],
      [4, 450],
      [5, 470],
      [6, 490],    // Fluctuating
      [7, 460],
      [8, 480],    // Steady
      [9, 510],
      [10, 520],   // Small rise
      [11, 540],
      [12, 530],   // Small decrease
    ],
  };

  const aspComparisonOptionss = {
    chart: { 
      type: "scatter", 
      zoom: { enabled: true },
    },
    xaxis: {
      title: { 
        text: "Months", 
        style: { color: "#16262E" },
      },
      min: 1,
      max: 12,
    },
    yaxis: {
      title: { 
        text: "Average Selling Price ($)", 
        style: { color: "#16262E" },
      },
    },
    colors: ["#878787",
      "#4A4A4A",
      "#878787",
      "#EFEFEF",
      "#FFFFFF"], // Different colors for each company
    title: {
    
      align: "center",
      style: { 
        color: "#087F8C",
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
    markers: {
      size: 8,
      strokeColor: "#006064",
      strokeWidth: 2,
      shape: "circle",
      hover: {
        size: 10,
      },
    },
  };

  const aspComparisonSeriess = [
    {
      name: `${selectedCompany} ASP`,
      data: aspDataa[selectedCompany],
    },
  ];

  return (
    
    <div className="bg-[#006064] w-[99%] p-8 border-5 rounded-md border-[#FFB400]">
  <h2 className="text-2xl font-semibold mb-4 text-white">Competitive Intelligence</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


      {/* Market Share Chart */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Market Share Analysis: 
              </h3>
              </div>
        <ApexCharts
          options={marketShareOptions}
          series={marketShareSeries}
          type="bar"
          height={350}
        />
      </div>

      {/* Sentiment Analysis Chart */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Customer Reviews & Sentiment
              </h3>
              </div>
        <ApexCharts
          options={sentimentOptions}
          series={sentimentSeries}
          type="bar"
          height={350}
        />
      </div>

      {/* Features and Innovation Comparison*/}
      <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Features and Innovation Comparison
              </h3>
              </div>
        <ApexCharts
          options={techInnovationOptions}
          series={techInnovationSeries}
          type="radar"
          height={350}
        />
      </div>

      {/* Candlestick Chart */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Social Media & News Trends
              </h3>
              </div>
        <ApexCharts
          options={candlestickOptions}
          series={candlestickSeries}
          type="candlestick"
          height={350}
        />
      </div>

    



       


    </div>
    <div className="flex justify-center items-center mt-6 ">
      <div className="p-4 shadow-md rounded-lg bg-white">
        <div className="flex justify-between items-center mb-2">
        <img src={logoSrc} alt="Logo" className="w-8 h-8" />
        <h3 className="text-lg font-semibold text-[#006064]">
          Average Selling Price (ASP) Comparison in Oil & Gas
        </h3>
        <select 
          className="border p-2" 
          onChange={(e) => setSelectedCompany(e.target.value)} 
          value={selectedCompany}
        >
          <option value="All">All Companies</option>
          <option value="Schlumberger">Schlumberger</option>
          <option value="Halliburton">Halliburton</option>
          <option value="BakerHughes">Baker Hughes</option>
          <option value="Weatherford">Weatherford</option>
        </select>
      </div>
      <ApexCharts
        options={aspComparisonOptionss} 
        series={aspComparisonSeriess} 
        type="scatter" 
        height={300} 
      />
    </div>
    </div>
    </div>
  );
};

export default SupplyChainComponent;
