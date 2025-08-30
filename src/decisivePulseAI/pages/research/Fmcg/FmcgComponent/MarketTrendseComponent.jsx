import logoSrc from "../../../../components/images/totalsales.png";
import React, { useState } from "react";
import Chart from "react-apexcharts";

const MarketingTrendsDashboard = () => {
  console.log("Marketing Spend & Campaign Effectiveness");

  // State for different chart forecast periods
  const [lineForecastPeriod, setLineForecastPeriod] = useState("6 Months");

  const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

  // Marketing Spend vs Sales Impact (Line Chart for ROI across channels)
  const lineChartOptions = {
    chart: { type: "line", height: 350 },
    xaxis: { categories: months },
    stroke: { curve: "smooth", width: 3 },
    title: { text: `Marketing Spend ROI (${lineForecastPeriod})`, align: "left", style: { color: "#00ACC1" } },
    colors: ["#006064", "#087F8C", "#00ACC1", "#FFB400", "#16262E"],
    grid: {
      show: true,
      borderColor: "#000000",
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } }
    }
  };

  const lineChartData = [
    { name: "Digital Marketing", data: [120, 130, 125, 140, 150, 160, 170, 160, 180, 190, 200, 210] },
    { name: "TV Advertising", data: [80, 85, 90, 95, 100, 110, 120, 125, 130, 135, 140, 150] },
    { name: "Print Advertising", data: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90] },
    { name: "Retail Promotions", data: [100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210] },
  ];

  // Ad Campaign Performance (Heatmap for Engagement & Conversion)
  const campaigns = ["Digital", "TV", "Print", "Retail"];
  const heatmapData = campaigns.map(campaign => ({
    name: campaign,
    data: Array(2).fill().map(() => Math.floor(Math.random() * 100))
  }));

  const heatmapOptions = {
    chart: { type: "heatmap", height: 350 },
    xaxis: { categories: ["Engagement Rate", "Conversion Rate"] },
    colors: ["#006064", "#087F8C"],
    grid: {
      show: true,
      borderColor: "#000000",
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } }
    }
  };

  // Trade Promotions Effectiveness (Bubble Chart for Lift, Cannibalization, ROI)
  const bubbleChartData = [{
    name: "Promotions Effectiveness",
    data: [
      { x: 10, y: 80, z: 25 },  // Lift vs Cannibalization vs ROI
      { x: 20, y: 70, z: 35 },
      { x: 30, y: 60, z: 45 },
      { x: 40, y: 50, z: 55 },
      { x: 50, y: 40, z: 65 },
    ]
  }];

  const bubbleChartOptions = {
    chart: { type: "bubble", height: 350 },
    xaxis: { title: { text: "Lift in Sales (%)", style: { color: "#00ACC1" } } },
    yaxis: { title: { text: "Cannibalization Impact (%)", style: { color: "#00ACC1" } } },
    zaxis: { title: { text: "ROI (%)", style: { color: "#00ACC1" } } },
    colors: ["#FFB400"],
    grid: {
      show: true,
      borderColor: "#000000",
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } }
    }
  };

 
 

  console.log("Marketing Spend & Campaign Effectiveness");


  // E-commerce Sales vs Offline Retail Sales Trend (Multi-axis Line Chart)
  const ecommerceData = [90, 92, 95, 98, 100, 105, 110, 115, 120, 125, 130, 135];
  const offlineData = [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95];

  const ecommerceVsOfflineOptions = {
    chart: {
      type: "line",
      height: 350
    },
    xaxis: {
      categories: months
    },
    yaxis: [
      {
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: "#00ACC1"
        },
        labels: {
          style: {
            colors: "#00ACC1"
          }
        },
        title: {
          text: "E-commerce Sales",
          style: {
            color: "#00ACC1"
          }
        },
      },
      {
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: "#FFB400"
        },
        opposite: true,
        labels: {
          style: {
            colors: "#FFB400"
          }
        },
        title: {
          text: "Offline Retail Sales",
          style: {
            color: "#FFB400"
          }
        },
      }
    ],
    stroke: {
      curve: "smooth",
      width: 3
    },
    title: {
      text: "E-commerce vs Offline Retail Sales",
      align: "left",
      style: {
        color: "#00ACC1"
      }
    },
    colors: ["#006064", "#FFB400"],
    grid: {
      show: true,
      borderColor: "#000000",
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } }
    }
  };

  const ecommerceVsOfflineData = [
    {
      name: "E-commerce Sales",
      data: ecommerceData
    },
    {
      name: "Offline Retail Sales",
      data: offlineData
    }
  ];


  return (
    <div className="bg-[#006064] w-[99%] p-8 border-5 rounded-md border-[#FFB400]">
      <h2 className="text-2xl font-bold mb-4 text-[white]">AI-Powered Marketing Trends & Effectiveness</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Marketing Spend vs Sales Impact */}

        <div className="bg-gray-100 p-4 rounded-lg" style={{ backgroundColor: "#EFEFEF" }}>
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Marketing Spend vs Sales Impact</h3>
           
          </div>
          <Chart options={lineChartOptions} series={lineChartData} type="line" height={350} />
        </div>

        {/* Ad Campaign Performance */}
        <div className="bg-gray-100 p-4 rounded-lg" style={{ backgroundColor: "#EFEFEF" }}>
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Ad Campaign Performance</h3>
           
          </div>
          <Chart options={heatmapOptions} series={heatmapData} type="heatmap" height={350} />
        </div>

        {/* Trade Promotions Effectiveness */}
        <div className="bg-gray-100 p-4 rounded-lg" style={{ backgroundColor: "#EFEFEF" }}>
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Trade Promotions Effectiveness</h3>
         
          </div>
          <Chart options={bubbleChartOptions} series={bubbleChartData} type="bubble" height={350} />
        </div>

       

    
        {/* E-commerce vs Offline Retail Sales */}
        <div className="bg-gray-100 p-4 rounded-lg" style={{ backgroundColor: "#EFEFEF" }}>
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">E-commerce vs Offline Retail Sales</h3>
          </div>
          <Chart options={ecommerceVsOfflineOptions} series={ecommerceVsOfflineData} type="line" height={350} />
       
      
    </div>





      </div>
    </div>
  );
};

export default MarketingTrendsDashboard;
