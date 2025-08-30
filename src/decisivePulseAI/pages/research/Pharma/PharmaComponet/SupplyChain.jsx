import React, { useState } from 'react'
import CertainDashboard from './Reusable/CertainDashboard'
import CardedChart from './Reusable/CardedChart'

const SupplyChain = () => {
    const colors = ["#FFB400", "#00ACC1", "#087F8C", "#006064"];

    const heatMapChartCustomization = {
        chartType: "heatmap",
        chartOption: {
            chart: { type: "heatmap", height: 350 },
            colors: colors,
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "North America", data: [45, 50, 55, 60] },
            { name: "Europe", data: [40, 45, 50, 55] },
            { name: "Asia", data: [70, 75, 80, 85] },
            { name: "South America", data: [30, 35, 40, 45] }
        ]
    };
    
    

    const scatterChartCustomization = {
        chartType: "scatter",
        chartOption: {
            chart: { type: "scatter", height: 350, zoom: { enabled: true, type: "xy" } },
            xaxis: { title: { text: "Stock Levels (Units)" }, tickAmount: 10 },
            yaxis: { title: { text: "Shortage Risk (%)" }, tickAmount: 7 },
            colors: colors,
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "2023", data: [[5000, 10], [4500, 15], [3000, 25], [1500, 40], [800, 60]] },
            { name: "2024", data: [[5500, 8], [5000, 12], [3200, 22], [1700, 35], [1000, 55]] }
        ]
    };
    
    
    const pieChartCustomization = {
        chartType: "pie",
        chartOption: {
            chart: { type: "pie", height: 350 },
            labels: ["Air", "Sea", "Land", "Rail"],
            colors: colors,
            legend: { position: "bottom" }
        },
        chartSeries: [30, 25, 35, 10] // Distribution method percentage
    };
    
    
    const textListCustomization = {
        chartType: "textList",
        textItems: [
            "FDA approves new Alzheimer's drug for early-stage patients.",
            "EU imposes stricter regulations on generic drug labeling.",
            "WHO announces new global strategy for pharmaceutical safety.",
            "China expands access to low-cost biosimilars.",
            "India revises price controls on essential medicines.",
            "New GMP (Good Manufacturing Practices) guidelines issued by EMA.",
            "US tightens import regulations on pharmaceutical raw materials.",
            "Recalls issued for specific batches of hypertension drugs due to contamination.",
        ],
    };
    
    
    
    const horizontalDoubleBarChartCustomization = {
        chartType: "bar",
        chartOption: {
            chart: { type: "bar", height: 350 },
            plotOptions: { bar: { horizontal: true } },
            xaxis: { categories: ["FDA", "EMA", "PMDA", "TGA"] },
            colors: colors,
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "Compliance Delay (Days)", data: [30, 40, 35, 25] },
            { name: "Regulatory Fines ($M)", data: [1.5, 2.0, 1.2, 0.8] }
        ]
    };
    
    
    return (
        <div>
            <CertainDashboard title="Supply Chain & Distribution Analytics">
            <CardedChart chartHeading="API (Active Pharmaceutical Ingredient) Supply Trends" chartCustomization={heatMapChartCustomization} />
            <CardedChart chartHeading="Drug Shortage & Inventory Dashboard" chartCustomization={scatterChartCustomization} />
            <CardedChart chartHeading="Logistics & Distribution Optimization" chartCustomization={pieChartCustomization} />
            <CardedChart chartHeading="Supplier & Manufacturing Risk Assessment" chartCustomization={textListCustomization} />
            <CardedChart chartHeading="Regulatory & Compliance Impact on Supply Chain" chartCustomization={horizontalDoubleBarChartCustomization} />
            </CertainDashboard>
        </div>
    )  
}

export default SupplyChain
