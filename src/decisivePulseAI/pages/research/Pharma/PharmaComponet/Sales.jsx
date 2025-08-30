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
            colors: ["#FFB400", "#00ACC1", "#087F8C", "#006064"],
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 },
            legend: { position: "bottom" }
        },
        chartSeries: [
            { name: "Brand A", data: [120, 200, 150, 90] },
            { name: "Brand B", data: [130, 210, 160, 100] },
            { name: "Brand C", data: [110, 180, 140, 80] }
        ]
    };
    

    const pieChartCustomization = {
        chartType: "pie",
        chartOption: {
            chart: { type: "pie", height: 350 },
            labels: ["Pain Relievers", "Antibiotics", "Antidepressants", "Vaccines", "Diabetes Medication"],
            colors: ["#FFB400", "#00ACC1", "#087F8C", "#006064", "#B57BED"],
            legend: { position: "bottom" }
        },
        chartSeries: [25, 20, 15, 30, 10] // Market share percentage
    };
    
    
    const lineChartCustomization = {
        chartType: "line",
        chartOption: {
            chart: { type: "line", height: 350 },
            xaxis: { categories: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"] },
            colors: ["#FFB400", "#006064"],
            stroke: { curve: 'stepline', width: 3 },
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "Prescription Drugs", data: [50, 55, 60, 70, 75, 80, 90] },
            { name: "Over-the-Counter (OTC)", data: [20, 22, 25, 30, 32, 35, 40] }
        ]
    };
    
    
    const barChartCustomization = {
        chartType: "bar",
        chartOption: {
            chart: { type: "bar", height: 350 },
            xaxis: { categories: ["Pain Relievers", "Antibiotics", "Antidepressants", "Vaccines", "Diabetes Medication"] },
            colors: ["#FFB400", "#00ACC1"],
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "Prescriptions Issued", data: [500, 300, 200, 400, 250] },
            { name: "Consumption Rate", data: [450, 280, 180, 390, 230] }
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
            <CertainDashboard title="Sales & Market Performance Dashboard">
            <CardedChart chartHeading="Total Pharma Sales Performance: " chartCustomization={stackedBarChartCustomization} />
            <CardedChart chartHeading="Market Share by Drug Category" chartCustomization={pieChartCustomization} />
            <CardedChart chartHeading="Pharmaceutical Pricing Trends" chartCustomization={lineChartCustomization} />
            <CardedChart chartHeading="Prescription & Consumption Trends" chartCustomization={barChartCustomization} />
            <CardedChart chartHeading="Competitor Sales Benchmarking" chartCustomization={horizontalDoubleBarChartCustomization} />
            </CertainDashboard>
        </div>
    )  
}

export default Sales