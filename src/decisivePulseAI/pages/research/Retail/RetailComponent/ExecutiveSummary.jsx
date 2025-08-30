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
            { name: "Global Retail Market Growth (%)", data: [3.2, 4.5, 5.0, 4.2, 4.8, 5.5, 6.1] },
            { name: "E-commerce Growth (%)", data: [8.0, 9.2, 12.5, 15.0, 17.8, 20.4, 23.1] }
        ]
    };

    const barChartData = {
        chartType: "bar",
        chartOption: {
            chart: { type: "bar", height: 350 },
            xaxis: { categories: ["Amazon", "Walmart", "Alibaba", "eBay", "Target"] },
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 },
            colors: colors
        },
        chartSeries: [
            { name: "2023 Revenue ($B)", data: [500, 420, 310, 190, 150] },
            { name: "2024 Revenue ($B)", data: [550, 460, 340, 200, 170] }
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
            "Rise in mobile shopping surpasses desktop sales.",
            "Sustainable fashion brands see a 30% growth in demand.",
            "Retailers invest heavily in AI-driven personalization.",
            "E-commerce fraud cases increased by 20% in 2024.",
            "More brands adopt social commerce strategies."
        ]
    };

    const textListData2 = {
        chartType: "textList",
        textItems: [
            "New data privacy laws impact online retailers.",
            "Stricter regulations on cross-border e-commerce transactions.",
            "Revised tax policies for online marketplaces.",
            "Retailers required to disclose supply chain sustainability.",
            "AI-generated product recommendations face legal scrutiny."
        ]
    };
    
  return (
    <div>
      <CertainDashboard title="Executive Summary">
        <CardedChart chartHeading="Global & Regional Retail Trends" chartCustomization={lineChartCustomizations} />
        <CardedChart chartHeading="Top Performing Brands & Categories" chartCustomization={barChartData} />
        <CardedChart chartHeading="Conumer Buying Behavior Insight" chartCustomization={textListData1} />
        <CardedChart chartHeading="Competitive Benchmarking" chartCustomization={stackedBarChartData} />
        <CardedChart chartHeading="Regulatory & Compliance Updates" chartCustomization={textListData2} />
      </CertainDashboard>
    </div>
  )
}

export default ExecutiveSummary
