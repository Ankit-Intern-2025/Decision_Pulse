import React, { useState } from 'react'
import CertainDashboard from './Reusable/CertainDashboard'
import CardedChart from './Reusable/CardedChart'

const Farmer = () => {
    const colors = ["#FFB400", "#00ACC1", "#087F8C", "#006064"];

    const barChartCustomization = {
        chartType: "bar",
        chartOption: {
            chart: { type: "bar", height: 350 },
            xaxis: { categories: ["New Customers", "Repeat Customers", "High Spenders", "Churned Customers"] },
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 },
            colors: colors
        },
        chartSeries: [
            { name: "2023", data: [5000, 7000, 3500, 1200] },
            { name: "2024", data: [5200, 7400, 3700, 1100] }
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
        chartSeries: [28, 12, 8, 18, 34] // Reflects actual climate influence in 2023
    };
    

    const scatterPlotChartCustomization = {
        chartType: "scatter",
        chartOption: {
            chart: { type: "scatter", height: 350, zoom: { enabled: true, type: "xy" } },
            xaxis: { title: { text: "Avg Monthly Spend ($)" }, tickAmount: 10 },
            yaxis: { title: { text: "Purchase Frequency" }, tickAmount: 7 },
            colors: colors,
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "2023", data: [[50, 5], [80, 7], [120, 10], [200, 15]] },
            { name: "2024", data: [[55, 6], [85, 8], [125, 12], [210, 18]] }
        ]
    };
    
    

    const horizontalChartCustomization = {
        chartType: "bar",
        chartOption: {
            chart: { type: "bar", height: 350 },
            plotOptions: { bar: { horizontal: true } },
            xaxis: { categories: ["Subscription Renewals", "Discount Effectiveness", "Customer Support Impact"] },
            colors: ["#FFB400", "#00ACC1"],
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "2023", data: [70, 50, 30] },
            { name: "2024", data: [75, 55, 40] }
        ]
    };
    

    const textListData = {
        chartType: "textList",
        textItems: [
            "89% of farmers report better yield after digital advisory.",
            "Mobile penetration reached 78% in rural agri-zones.",
            "Financial inclusion increased by 34% through microloans.",
            "AI alerts reduced crop loss by 12% annually.",
            "Farmer co-operatives report 25% higher income stability."
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
            { name: "Monthly Revenue Growth (%)", data: [5, 7, 12, 10, 15, 18, 20] },
            { name: "Demand Forecast Accuracy (%)", data: [60, 65, 70, 75, 80, 85, 90] }
        ]
    };
    
    

    const stackedBarChartCustomization = {
        chartType: "bar",
        chartOption: {
            chart: { type: "bar", height: 350, stacked: true },
            xaxis: { categories: ["Adoption", "Accuracy", "Alert Frequency", "Yield Improvement"] },
            colors: ["#FFB400", "#00ACC1", "#087F8C", "#006064"],
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 },
            legend: { position: "bottom" }
        },
        chartSeries: [
            { name: "AI-Based Crop Advisory", data: [65, 90, 40, 18] },
            { name: "Traditional Advisory", data: [45, 60, 20, 10] }
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
    

    
    return (
        <div>
            <CertainDashboard title="Farmer Engagement & Financial Inclusion">
            <CardedChart chartHeading="Farmer Segmentation Dashboard" chartCustomization={pieChartCustomization} />
            <CardedChart chartHeading="Credit & Loan Disbursement Trends" chartCustomization={scatterPlotChartCustomization} />
            <CardedChart chartHeading="Digital & Mobile Penetration in Agriculture" chartCustomization={barChartCustomization} />
            <CardedChart chartHeading="AI-Powered Advisory Alerts" chartCustomization={stackedBarChartCustomization} />
            <CardedChart chartHeading="Farmer Satisfaction & Sentiment Analysis" chartCustomization={textListData} />
            </CertainDashboard>
        </div>
    )    
}

export default Farmer
