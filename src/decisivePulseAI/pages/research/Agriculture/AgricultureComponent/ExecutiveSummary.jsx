import React, { useState } from 'react'
import CertainDashboard from './Reusable/CertainDashboard'
import CardedChart from './Reusable/CardedChart'

const ExecutiveSummary = () => {

    const colors = ["#FFB400", "#00ACC1", "#087F8C", "#006064"];
    const lineChartCustomizations = {
        chartType: "line",
        chartOption: {
          chart: { type: "line", height: 350 },
          xaxis: { categories: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"] },
          colors: [colors[0], colors[3]],
          stroke: { curve: "straight", width: 3 },
          grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
          { name: "Global Agri Market Growth (%)", data: [2.5, 2.8, 1.9, 3.2, 3.5, 3.9, 4.1] },
          { name: "Food Processing Industry Growth (%)", data: [4.2, 4.6, 3.8, 5.0, 5.3, 5.9, 6.2] }
        ]
      };
      
      const lineChart1Customizations = {
        chartType: "line",
        chartOption: {
          chart: { type: "line", height: 350 },
          xaxis: { categories: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"] },
          colors: [colors[0], colors[3]],
          stroke: { curve: "straight", width: 3 },
          grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
          { name: "Wheat Price (USD/ton)", data: [210, 215, 220, 260, 280, 270, 265] },
          { name: "Soybean Price (USD/ton)", data: [390, 400, 410, 450, 480, 495, 500] }
        ]
      };
      

    const barChartData = {
        chartType: "bar",
        chartOption: {
          chart: { type: "bar", height: 350 },
          xaxis: { categories: ["India (Wheat)", "Brazil (Soybean)", "USA (Corn)", "China (Rice)", "Argentina (Sunflower)"] },
          grid: { show: true, borderColor: "#000000", strokeDashArray: 0 },
          colors: colors
        },
        chartSeries: [
          { name: "2023 Yield (MT)", data: [105, 130, 365, 210, 70] },
          { name: "2024 Estimated Yield (MT)", data: [112, 138, 375, 220, 75] }
        ]
      };
      

    const pieChartData = {
        chartType: "pie",
        chartOption: {
            labels: ["Electronics", "Apparel", "Groceries", "Home & Kitchen", "Beauty"],
            colors: colors,
            legend: { position: "bottom" }
        },
        chartSeries: [35, 25, 20, 12, 8]
    };

    const stackedBarChartData = {
        chartType: "bar",
        chartOption: {
            chart: { type: "bar", height: 350, stacked: true },
            xaxis: { categories: ["Amazon", "Walmart", "Alibaba", "eBay"] },
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 },
            legend: { position: "top" },
            colors: colors
        },
        chartSeries: [
            { name: "Q1 Sales ($B)", data: [120, 110, 90, 70] },
            { name: "Q2 Sales ($B)", data: [130, 115, 95, 75] },
            { name: "Q3 Sales ($B)", data: [140, 120, 100, 80] },
            { name: "Q4 Sales ($B)", data: [150, 130, 110, 85] }
        ]
    };

    const textListData1 = {
        chartType: "textList",
        textItems: [
          "Demand for ready-to-eat meals up 25% post-2023.",
          "India sees 15% rise in cold storage investments.",
          "Organic food exports from Brazil increase by 18%.",
          "Technology adoption (IoT/AI) up 30% in food plants.",
          "Sustainable packaging use jumps 40% in 2024."
        ]
      };
      

      const textListData2 = {
        chartType: "textList",
        textItems: [
          "India’s PM-Kisan scheme reaches 11 crore farmers.",
          "EU Green Deal mandates 25% organic farming by 2030.",
          "US Farm Bill 2024 boosts subsidies for climate-smart crops.",
          "New labeling laws for processed food in ASEAN nations.",
          "WTO debates on agri export subsidies continue in 2024."
        ]
      };
      
     
    
  return (
    <div>
      <CertainDashboard title="Executive Summary (BFSI Market Overview)">
        <CardedChart chartHeading="Global & Regional Market Trends" chartCustomization={lineChartCustomizations} />
        <CardedChart chartHeading="Top Performing Countries & Crops" chartCustomization={barChartData} />
        <CardedChart chartHeading="Agri-Commodity Price Trends" chartCustomization={lineChart1Customizations} />
        <CardedChart chartHeading="Food Processing Industry Trends" chartCustomization={textListData1} />
        <CardedChart chartHeading="Regulatory Policies & Subsidies" chartCustomization={textListData2} />
      </CertainDashboard>
    </div>
  )
}

export default ExecutiveSummary
