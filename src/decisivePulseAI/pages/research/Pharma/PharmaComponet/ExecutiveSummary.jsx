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
            { name: "Global Pharma Market Growth (%)", data: [5.2, 6.0, 6.8, 5.5, 6.1, 6.7, 7.2] },
            { name: "Regional Pharma Market Growth (%)", data: [4.0, 4.5, 5.2, 4.8, 5.4, 6.0, 6.4] }
        ]
    };

    const barChartData = {
        chartType: "bar",
        chartOption: {
            chart: { type: "bar", height: 350 },
            xaxis: { categories: ["Humira", "Keytruda", "Eliquis", "Ozempic"] },
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 },
            colors: colors // Using predefined colors
        },
        chartSeries: [
            { name: "2023 Revenue ($B)", data: [21, 24, 16, 13] },
            { name: "2024 Revenue ($B)", data: [19, 27, 18, 15] }
        ],
    };
    
    const pieChartData = {
        chartType: "pie",
        chartOption: {
            labels: ["Brand Drugs", "Generics", "Biosimilars", "Others"],
            colors: colors, // Using predefined colors
            legend: { position: "bottom" }
        },
        chartSeries: [50, 30, 15, 5], // Market share in %
    };

    const stackedBarChartData = {
        chartType: "bar",
        chartOption: {
            chart: { type: "bar", height: 350, stacked: true },
            xaxis: { categories: ["Pfizer", "Roche", "Novartis", "Merck"] },
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 },
            legend: { position: "top" },
            colors: colors // Using predefined colors
        },
        chartSeries: [
            { name: "Q1 Revenue ($B)", data: [15, 14, 13, 12] },
            { name: "Q2 Revenue ($B)", data: [16, 15, 14, 13] },
            { name: "Q3 Revenue ($B)", data: [17, 16, 15, 14] },
            { name: "Q4 Revenue ($B)", data: [18, 17, 16, 15] }
        ],
    };
    

    const textListData = {
        chartType: "textList",
        textItems: [
            "FDA approves new Alzheimer's drug for early-stage patients.",
            "EU imposes stricter regulations on generic drug labeling.",
            "WHO announces new global strategy for pharmaceutical safety.",
            "China expands access to low-cost biosimilars.",
            "India revises price controls on essential medicines.",
        ],
    };
    
    
  return (
    <div>
      <CertainDashboard title="Executive Summary">
        <CardedChart chartHeading="Global & Regional Pharma Market Performance" chartCustomization={lineChartCustomizations} />
        <CardedChart chartHeading="Top Selling Drugs & Therapeutic Areas" chartCustomization={barChartData} />
        <CardedChart chartHeading="Patent Expiry & Generic Drug Impact" chartCustomization={pieChartData} />
        <CardedChart chartHeading="Regulatory & Compliance Updates" chartCustomization={textListData} />
        <CardedChart chartHeading="Competitor Benchmarking" chartCustomization={stackedBarChartData} />
      </CertainDashboard>
    </div>
  )
}

export default ExecutiveSummary
