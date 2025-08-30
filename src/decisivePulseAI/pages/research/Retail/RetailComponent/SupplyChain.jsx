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
            xaxis: { title: { text: "Supplier Order Fulfillment Rate (%)" }, tickAmount: 10 },
            yaxis: { title: { text: "Average Delay (Days)" }, tickAmount: 7 },
            colors: colors,
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "2023", data: [[98, 1], [92, 3], [85, 7], [78, 12], [70, 20]] },
            { name: "2024", data: [[97, 1], [93, 2], [87, 5], [80, 9], [72, 15]] }
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
        chartSeries: [40, 30, 20, 10] // Inventory distribution
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
            xaxis: { categories: ["AI Predictions", "Manual Forecasting", "Historical Trends"] },
            colors: colors,
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "Inventory Replenishment Accuracy (%)", data: [92, 80, 85] },
            { name: "Stockout Risk Reduction (%)", data: [30, 15, 20] }
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
            { name: "Order Accuracy (%)", data: [92, 94, 96, 95, 97, 98, 99] },
            { name: "Fulfillment Speed (Days)", data: [5, 4.8, 4.5, 4.2, 4.0, 3.8, 3.5] }
        ]
    };
    
     
    
    
    
    
    
    return (
        <div>
            <CertainDashboard title="Inventory & Supply Chain Optimization">
            <CardedChart chartHeading="Stock Levels & Inventory Health" chartCustomization={pieChartCustomization} />
            <CardedChart chartHeading="Supplier Performance Analysis" chartCustomization={scatterChartCustomization} />
            <CardedChart chartHeading="Logistics & Distribution Efficiency" chartCustomization={heatMapChartCustomization} />
            <CardedChart chartHeading="Fulfillment & Order Accuracy" chartCustomization={lineChartCustomization} />
            <CardedChart chartHeading="AI-Driven Inventory Replenishment Recommendations" chartCustomization={horizontalDoubleBarChartCustomization} />
            </CertainDashboard>
        </div>
    )  
}

export default SupplyChain
