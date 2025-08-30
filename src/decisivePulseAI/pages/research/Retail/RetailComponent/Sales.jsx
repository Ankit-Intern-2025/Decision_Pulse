import React, { useState } from 'react'
import CertainDashboard from './Reusable/CertainDashboard'
import CardedChart from './Reusable/CardedChart'


const Sales = () => {
    const colors = ["#FFB400", "#00ACC1", "#087F8C", "#006064"];

    const stackedBarChartCustomization = {
        chartType: "bar",
        chartOption: {
            chart: { type: "bar", height: 350, stacked: true },
            xaxis: { categories: ["Q1", "Q2", "Q3", "Q4"] },
            colors: colors,
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 },
            legend: { position: "bottom" }
        },
        chartSeries: [
            { name: "Electronics", data: [320, 400, 350, 290] },
            { name: "Fashion", data: [230, 310, 260, 200] },
            { name: "Home & Kitchen", data: [180, 250, 220, 150] }
        ]
    };
    
    const pieChartCustomization = {
        chartType: "pie",
        chartOption: {
            chart: { type: "pie", height: 350 },
            labels: ["Retail", "E-commerce", "Wholesale", "Direct Sales", "Others"],
            colors: colors,
            legend: { position: "bottom" }
        },
        chartSeries: [50, 35, 10, 3, 2] // Sales channel distribution
    };
    
    const lineChartCustomization = {
        chartType: "line",
        chartOption: {
            chart: { type: "line", height: 350 },
            xaxis: { categories: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"] },
            colors: [colors[0], colors[3]],
            stroke: { curve: 'smooth', width: 3 },
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "Price Elasticity Impact", data: [60, 65, 72, 78, 82, 87, 95] },
            { name: "Promotion Conversion Rate", data: [25, 28, 32, 36, 38, 42, 47] }
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
            { name: "Competitor Pricing ($)", data: [15.0, 14.5, 16.2, 15.8, 14.9] },
            { name: "Market Share (%)", data: [25, 20, 18, 22, 15] }
        ]
    };
    
    const heatMapChartCustomization = {
        chartType: "heatmap",
        chartOption: {
            chart: { type: "heatmap", height: 350 },
            colors: colors,
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            {
                name: "Best-Selling Products",
                data: [95, 88, 80, 75]
            },
            {
                name: "Underperforming Products",
                data: [40, 35, 30, 20]
            }
        ]
    };
    
    const horizontalDoubleBarChartCustomization = {
        chartType: "bar",
        chartOption: {
            chart: { type: "bar", height: 350 },
            plotOptions: {
                bar: { horizontal: true }
            },
            xaxis: { categories: ["Brand A", "Brand B", "Brand C", "Brand D"] },
            colors: ["#FFB400", "#00ACC1"],
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "2023 Sales ($M)", data: [120, 150, 100, 80] },
            { name: "2024 Sales ($M)", data: [130, 160, 110, 85] }
        ]
    };
    
    
    return (
        <div>
            <CertainDashboard title="Sales & Revenue Performance Dashboard">
            <CardedChart chartHeading="Total Sales Performance: " chartCustomization={stackedBarChartCustomization} />
            <CardedChart chartHeading="Online vs Offline Sales Comparison" chartCustomization={pieChartCustomization} />
            <CardedChart chartHeading="Top Selling SKUs & Low-Performing Products" chartCustomization={heatMapChartCustomization} />
            <CardedChart chartHeading="DYnamic Pricing Effectiveness" chartCustomization={lineChartCustomization} />
            <CardedChart chartHeading="Competitor Pricing & Market Positioning" chartCustomization={barChartCustomization} />
            </CertainDashboard>
        </div>
    )  
}

export default Sales