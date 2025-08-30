import React, { useState } from 'react'
import CertainDashboard from './Reusable/CertainDashboard'
import CardedChart from './Reusable/CardedChart'


const Crop = () => {
    const colors = ["#FFB400", "#00ACC1", "#087F8C", "#006064"];
    const stackedBarChartCustomization = {
        chartType: "bar",
        chartOption: {
            chart: { type: "bar", height: 350, stacked: true },
            xaxis: { categories: ["Q1", "Q2", "Q3", "Q4"] },
            colors: ["#FFB400", "#00ACC1", "#087F8C"],
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 },
            legend: { position: "bottom" }
        },
        chartSeries: [
            { name: "Fertilizer Cost ($/acre)", data: [40, 45, 50, 47] },
            { name: "Labor Cost ($/acre)", data: [60, 65, 70, 68] },
            { name: "Output Pricing ($/ton)", data: [180, 190, 210, 205] }
        ]
    };
    
    const pieChartCustomization = {
        chartType: "pie",
        chartOption: {
            chart: { type: "pie", height: 350 },
            labels: ["Drought", "Flood", "Frost", "Heatwave", "Stable Climate"],
            colors: ["#FFB400", "#00ACC1", "#087F8C", "#006064", "#A5D6A7"],
            legend: { position: "bottom" }
        },
        chartSeries: [25, 15, 10, 20, 30] // % Impact on Crop Production
    };
    
    const worldMapChartCustomization = {
        chartType: "map",
        chartData: [
            { region: "India", avgDeliveryDays: 5, transportCost: 120 },
            { region: "Brazil", avgDeliveryDays: 8, transportCost: 150 },
            { region: "USA", avgDeliveryDays: 3, transportCost: 100 },
            { region: "Australia", avgDeliveryDays: 10, transportCost: 170 }
        ]
    };

    const shankeyChartCustomization = {
        chartType: "sankey",
        chartData: {
            nodes: [
                { name: "Farm" },
                { name: "Processing Unit" },
                { name: "Distributor" },
                { name: "Retail Store" }
            ],
            links: [
                { source: 0, target: 1, value: 100 },
                { source: 1, target: 2, value: 85 },
                { source: 2, target: 3, value: 80 }
            ]
        }
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
            colors: ["#FFB400", "#00ACC1", "#087F8C", "#006064"],
            xaxis: { categories: ["Wheat", "Corn", "Rice", "Soybean"] },
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "North America", data: [65, 90, 70, 88] },
            { name: "Europe", data: [70, 75, 72, 60] },
            { name: "Asia", data: [80, 60, 95, 55] },
            { name: "South America", data: [55, 85, 50, 90] }
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
            <CertainDashboard title="Crop Yield, Pricing & Supply Chain Dashboard">
                <CardedChart chartHeading="Crop Yield Analysis by Region & Crop" chartCustomization={heatMapChartCustomization} />
                <CardedChart chartHeading="Input Cost vs Output Pricing" chartCustomization={stackedBarChartCustomization  } />
                <CardedChart chartHeading="Seasonal Forecasts & Climatic Impact" chartCustomization={pieChartCustomization} />
                {/* <CardedChart chartHeading="Supply Chain & Logistics Monitoring" chartCustomization={worldMapChartCustomization } /> */}
                {/* <CardedChart chartHeading="Farm-to-Market Traceability" chartCustomization={shankeyChartCustomization} /> */}
            </CertainDashboard>
        </div>
    )  
}

export default Crop