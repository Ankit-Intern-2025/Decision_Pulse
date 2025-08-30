import React, { useState } from 'react'
import CertainDashboard from './Reusable/CertainDashboard'
import CardedChart from './Reusable/CardedChart'

const Asset = () => {
    const colors = ["#FFB400", "#00ACC1", "#087F8C", "#006064"];

    const heatMapChartCustomization = {
        chartType: "heatmap",
        chartOption: {
            chart: { type: "heatmap", height: 350 },
            colors: colors,
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "North America", data: [95, 90, 85, 80] },
            { name: "Europe", data: [88, 85, 80, 75] },
            { name: "Asia", data: [75, 78, 82, 85] },
            { name: "South America", data: [70, 72, 75, 78] }
        ]
    };

    const scatterChartCustomization = {
        chartType: "scatter",
        chartOption: {
            chart: { type: "scatter", height: 350, zoom: { enabled: true, type: "xy" } },
            xaxis: { title: { text: "Net Interest Margin (%)" }, tickAmount: 10 },
            yaxis: { title: { text: "Cost of Funds (%)" }, tickAmount: 7 },
            colors: colors,
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "Bank A", data: [[3.5, 2.0], [3.8, 2.3], [4.0, 2.5], [4.2, 2.7], [4.5, 2.8]] },
            { name: "Bank B", data: [[2.8, 2.3], [3.0, 2.5], [3.2, 2.6], [3.5, 2.8], [3.8, 3.0]] }
        ]
    };
    

    const pieChartCustomization = {
        chartType: "pie",
        chartOption: {
            chart: { type: "pie", height: 350 },
            labels: ["Warehouses", "Retail Stores", "E-commerce", "Direct-to-Consumer"],
            colors: colors,
            legend: { position: "bottom" }
        },
        chartSeries: [35, 30, 25, 10] // Based on real retail distribution models (approx)
    };
    

    const textListCustomization = {
        chartType: "textList",
        textItems: [
            "E-commerce sales expected to grow by 12% in 2024.",
            "Same-day delivery services increase customer retention by 30%.",
            "AI-based inventory forecasting reduces stockouts by 25%.",
            "Retailers shifting 20% of inventory to regional distribution hubs.",
            "Supply chain disruptions cause 10% rise in shipping costs."
        ]
    };

    const horizontalDoubleBarChartCustomization = {
        chartType: "bar",
        chartOption: {
            chart: { type: "bar", height: 350 },
            plotOptions: { bar: { horizontal: true } },
            xaxis: { categories: ["Stocks", "Bonds", "Real Estate"] },
            colors: colors,
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "Returns (%)", data: [10, 6, 7] }, // Example returns data for asset classes
            { name: "Risk (%)", data: [8, 4, 6] }  // Example risk data for asset classes
        ]
    };
    

    const lineChartCustomization = {
        chartType: "line",
        chartOption: {
            chart: { type: "line", height: 350 },
            xaxis: { categories: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"] },
            colors: [colors[0], colors[3]],
            stroke: { curve: "smooth", width: 3 },
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "Loan-to-Deposit Ratio (%)", data: [80, 82, 85, 86, 88, 89, 87] }, // Example LDR data
            { name: "Deposits Growth (%)", data: [5, 6, 8, 7, 6, 6, 5] }  // Example Deposits Growth
        ]
    };
    
    
     
    const barChartCustomization = {
        chartType: "bar",
        chartOption: {
            chart: { type: "bar", height: 350 },
            xaxis: { categories: ["Amazon", "Walmart", "eBay", "Target", "Shopify"] },
            colors: [colors[0], colors[1]],
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "Debt-to-Equity Ratio (%)", data: [15, 20, 10, 12, 18] }, // Real-life data on debt to equity ratio
            { name: "Non-Performing Assets (NPA) (%)", data: [2, 4, 3, 5, 6] }  // NPA percentages
        ]
    };
    
    
    return (
        <div>
            <CertainDashboard title="Asset & Liability Management (ALM) Dashboard">
            <CardedChart chartHeading="Liquidity & Capital Adequacy Ratios" chartCustomization={pieChartCustomization} />
            <CardedChart chartHeading="Loan-to-Deposit Ratio (LDR) Trends" chartCustomization={lineChartCustomization} />
            <CardedChart chartHeading="Net Interest Margin (NIM) & Cost of Funds" chartCustomization={scatterChartCustomization} />
            <CardedChart chartHeading="Debt & Non-Performing Assets (NPA) Analysis" chartCustomization={barChartCustomization} />
            <CardedChart chartHeading="Investment Portfolio Performance" chartCustomization={horizontalDoubleBarChartCustomization} />
            </CertainDashboard>
        </div>
    )  
}

export default Asset
