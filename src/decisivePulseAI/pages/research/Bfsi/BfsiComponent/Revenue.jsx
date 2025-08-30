import React, { useState } from 'react'
import CertainDashboard from './Reusable/CertainDashboard'
import CardedChart from './Reusable/CardedChart'


const Revenue = () => {
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
            { name: "Electronics", data: [350, 420, 390, 340] },
            { name: "Fashion", data: [270, 330, 280, 220] },
            { name: "Home & Kitchen", data: [190, 270, 240, 180] }
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
        chartSeries: [55, 30, 8, 4, 3] // Sales channel distribution
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
            { name: "Price Elasticity Impact", data: [55, 62, 68, 73, 77, 84, 90] },
            { name: "Promotion Conversion Rate", data: [26, 30, 35, 39, 42, 45, 50] }
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
            { name: "Competitor Pricing ($)", data: [16.5, 15.2, 17.0, 16.3, 15.5] },
            { name: "Market Share (%)", data: [28, 22, 19, 24, 17] }
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
                data: [92, 85, 78, 71]
            },
            {
                name: "Underperforming Products",
                data: [45, 40, 36, 28]
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
            { name: "2023 Sales ($M)", data: [125, 155, 105, 85] },
            { name: "2024 Sales ($M)", data: [135, 165, 115, 90] }
        ]
    };
     
    
    
    return (
        <div>
            <CertainDashboard title="Revenue & Profitability Performance Dashboard">
                <CardedChart chartHeading="Total Revenue & Profitability Trends " chartCustomization={stackedBarChartCustomization} />
                <CardedChart chartHeading="Loan Portfolio Analysis" chartCustomization={heatMapChartCustomization } />
                <CardedChart chartHeading="Retail vs. Corporate Banking Performance" chartCustomization={pieChartCustomization} />
                <CardedChart chartHeading="Wealth Management & Investment Banking Metrics" chartCustomization={barChartCustomization } />
                <CardedChart chartHeading="Fintech & Digital Banking Revenue Impact" chartCustomization={lineChartCustomization} />
            </CertainDashboard>
        </div>
    )  
}

export default Revenue