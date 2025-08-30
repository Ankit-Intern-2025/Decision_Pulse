import React, { useState } from 'react'
import CertainDashboard from './Reusable/CertainDashboard'
import CardedChart from './Reusable/CardedChart'

const DrugDevelopment = () => {
    const colors = ["#FFB400", "#00ACC1", "#087F8C", "#006064"];

    const barChartCustomization = {
        chartType: "bar",
        chartOption: {
            chart: { type: "bar", height: 350 },
            xaxis: { categories: ["Phase 1", "Phase 2", "Phase 3", "Approval"] },
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 },
            colors: colors
        },
        chartSeries: [
            { name: "2023 Trials", data: [120, 200, 150, 90] },
            { name: "2024 Trials", data: [130, 210, 160, 100] }
        ],
    };

    const funnelChartCustomization = {
        chartType: "bar",
        chartOption: {
            chart: {
                type: "bar",
                height: 350,
                dropShadow: { enabled: true }, // Adds a shadow effect
            },
            plotOptions: {
                bar: {
                    borderRadius: 0, // No rounded edges
                    horizontal: true, // Required for funnel effect
                    distributed: true, // Different color for each step
                    barHeight: "80%", // Adjust for better funnel shape
                    isFunnel: true // Enables funnel visualization
                }
            },
            colors: colors,
            dataLabels: {
                enabled: true,
                formatter: function (val, opt) {
                    return opt.w.globals.labels[opt.dataPointIndex]; // Show stage name
                },
                dropShadow: { enabled: true },
            },
            title: { text: "Drug Development Funnel", align: "center" },
            xaxis: {
                categories: [
                    "Discovery", "Preclinical", "Phase 1", 
                    "Phase 2", "Phase 3", "Approval"
                ]
            },
            legend: { show: false } // Hide legend for cleaner look
        },
        chartSeries: [
            {
                name: "Drug Candidates",
                data: [5000, 3000, 1500, 700, 300, 100] // Decreasing values create funnel effect
            }
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
                name: "Oncology",
                data: [30, 50, 70, 90]
            },
            {
                name: "Neurology",
                data: [20, 40, 60, 80]
            },
            {
                name: "Cardiology",
                data: [10, 30, 50, 70]
            }
        ]
    };
    
    const scatterPlotChartCustomization = {
        chartType: "scatter",
        chartOption: {
            chart: { type: "scatter", height: 350, zoom: { enabled: true, type: "xy" } },
            xaxis: { title: { text: "R&D Spending ($B)" }, tickAmount: 10 },
            yaxis: { title: { text: "Market Success Rate (%)" }, tickAmount: 7 },
            colors: colors,
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "2023", data: [[5, 30], [10, 50], [15, 70], [20, 85]] },
            { name: "2024", data: [[6, 32], [11, 52], [16, 73], [21, 87]] }
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
            { name: "FDA Approval Time (Months)", data: [12, 14, 16, 13, 15, 17, 18] },
            { name: "EMA Approval Time (Months)", data: [14, 15, 18, 16, 17, 19, 20] }
        ]
    };
    
    return (
        <div>
            <CertainDashboard title="Drug Development & R&D Analytics">
            <CardedChart chartHeading="Clinical Trials Dashboard" chartCustomization={barChartCustomization} />
            <CardedChart chartHeading="Drug Pipeline Analysis" chartCustomization={funnelChartCustomization} />
            <CardedChart chartHeading="AI-Driven Drug Discovery Trends" chartCustomization={heatMapChartCustomization} />
            <CardedChart chartHeading="R&D Spend vs. Market Success" chartCustomization={scatterPlotChartCustomization} />
            <CardedChart chartHeading="Regulatory Approval Timelines & Bottlenecks" chartCustomization={lineChartCustomization} />
            </CertainDashboard>
        </div>
    )    
}

export default DrugDevelopment
