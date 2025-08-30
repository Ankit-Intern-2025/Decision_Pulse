import React, { useState } from 'react'
import CertainDashboard from './Reusable/CertainDashboard'
import CardedChart from './Reusable/CardedChart'

const ConsumerInsight = () => {
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
            plotOptions: {
                bar: { horizontal: true }
            },
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
            "Rising demand for eco-friendly products.",
            "Mobile shopping accounts for 65% of all purchases.",
            "Subscription models increase retention by 25%.",
            "AI-powered recommendations boost conversions by 18%.",
            "Social commerce contributes to 12% of total revenue."
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

    
    return (
        <div>
            <CertainDashboard title="Consumer Insight & Demand Forecasting">
            <CardedChart chartHeading="Cutomer Sentiment Analysis" chartCustomization={barChartCustomization} />
            <CardedChart chartHeading="Buying Behavior Trends" chartCustomization={scatterPlotChartCustomization} />
            <CardedChart chartHeading="Loyalty & Retention Metrics" chartCustomization={horizontalChartCustomization} />
            <CardedChart chartHeading="Market Basket Analysis" chartCustomization={textListData} />
            <CardedChart chartHeading="Predictive Demand Forecasting" chartCustomization={lineChartCustomization} />
            </CertainDashboard>
        </div>
    )    
}

export default ConsumerInsight
