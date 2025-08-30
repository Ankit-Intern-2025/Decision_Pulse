import React, { useState } from 'react'
import CertainDashboard from './Reusable/CertainDashboard'
import CardedChart from './Reusable/CardedChart'

const Food = () => {
    const colors = ["#FFB400", "#00ACC1", "#087F8C", "#006064"];

    const heatMapChartCustomization = {
        chartType: "heatmap",
        chartOption: {
            chart: { type: "heatmap", height: 350 },
            colors: ["#FFB400", "#00ACC1", "#087F8C", "#006064"],
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "North America", data: [90, 92, 88, 85] },
            { name: "Europe", data: [93, 91, 89, 86] },
            { name: "Asia", data: [75, 78, 80, 83] },
            { name: "South America", data: [70, 72, 74, 76] }
        ]
    };
    

    const scatterChartCustomization = {
        chartType: "scatter",
        chartOption: {
            chart: { type: "scatter", height: 350, zoom: { enabled: true, type: "xy" } },
            xaxis: { title: { text: "Logistics Efficiency (%)" }, tickAmount: 10 },
            yaxis: { title: { text: "Cold Chain Cost ($/Ton)" }, tickAmount: 7 },
            colors: ["#FFB400", "#00ACC1"],
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "India", data: [[60, 30], [62, 28], [65, 27]] },
            { name: "Germany", data: [[80, 25], [82, 24], [85, 23]] }
        ]
    };
    
    

    const pieChartCustomization = {
        chartType: "pie",
        chartOption: {
            chart: { type: "pie", height: 350 },
            labels: ["Warehouses", "Retail Stores", "E-commerce", "Direct-to-Consumer"],
            colors: ["#FFB400", "#00ACC1", "#087F8C", "#006064"],
            legend: { position: "bottom" }
        },
        chartSeries: [40, 25, 20, 15] // Updated with more realistic global distribution loss estimates
    };
    
    

    const textListCustomization = {
        chartType: "textList",
        textItems: [
            "Global food export expected to grow by 6.8% in 2024.",
            "Cold chain failures account for 25% of food spoilage worldwide.",
            "Blockchain tracking adoption increased by 40% in the last 2 years.",
            "AI in supply chain reduced overstock by 18% in processed food units.",
            "Export certifications reduced rejection rates by 22% in 2023."
        ]
    };
    

    const horizontalDoubleBarChartCustomization = {
        chartType: "bar",
        chartOption: {
            chart: { type: "bar", height: 350 },
            plotOptions: { bar: { horizontal: true } },
            xaxis: { categories: ["HACCP", "ISO 22000", "FSSC 22000", "BRCGS"] },
            colors: ["#FFB400", "#00ACC1"],
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "Certification Coverage (%)", data: [78, 65, 60, 50] },
            { name: "Audit Pass Rate (%)", data: [85, 75, 70, 65] }
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
            xaxis: { categories: ["Nestlé", "Cargill", "Unilever", "Tyson Foods", "Danone"] },
            colors: ["#FFB400", "#00ACC1"],
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "Production Volume (Million Tons)", data: [42, 38, 35, 30, 28] },
            { name: "Growth Rate (%)", data: [5, 4.5, 4, 3.5, 3] }
        ]
    };
    
    

    const lineBarChartCustomization = {
        chartType: "lineBar",
        lineChart: {
            chartType: "line",
            chartOption: {
                chart: { type: "line", height: 300 },
                xaxis: { categories: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"] },
                stroke: { curve: "smooth", width: 3 },
                colors: ["#00ACC1", "#006064"],
                grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
            },
            chartSeries: [
                { name: "Export Volume (in Million Tons)", data: [4.5, 5.0, 4.8, 5.5, 6.0, 6.3, 6.7] },
                { name: "Import Volume (in Million Tons)", data: [2.0, 2.5, 2.3, 2.7, 3.0, 3.1, 3.3] }
            ]
        },
        barChart: {
            chartType: "bar",
            chartOption: {
                chart: { type: "bar", height: 300 },
                xaxis: { categories: ["Wheat", "Rice", "Spices", "Dairy", "Canned Foods"] },
                colors: ["#FFB400", "#087F8C"],
                grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
            },
            chartSeries: [
                { name: "Export Value ($M)", data: [1500, 1800, 1200, 1100, 950] },
                { name: "Import Value ($M)", data: [800, 600, 400, 300, 200] }
            ]
        }
    };
    const mapChartCustomization = {
        chartType: "map",
        chartOption: {
            mapType: "world",
            colors: ["#A5D6A7", "#FFB400", "#006064"],
            legend: { position: "bottom" }
        },
        mapData: [
            { country: "India", coldStorageCapacity: 35, logisticsEfficiency: 65 }, // %
            { country: "USA", coldStorageCapacity: 80, logisticsEfficiency: 85 },
            { country: "Germany", coldStorageCapacity: 75, logisticsEfficiency: 90 },
            { country: "Brazil", coldStorageCapacity: 50, logisticsEfficiency: 70 },
            { country: "China", coldStorageCapacity: 70, logisticsEfficiency: 78 }
        ]
    };
        
    
    return (
        <div>
            <CertainDashboard title="Food Processing & Export Dashboard">
            <CardedChart chartHeading="Processed Product Volumes" chartCustomization={barChartCustomization} />
            {/* <CardedChart chartHeading="Export & Import Analysis" chartCustomization={lineBarChartCustomization} /> */}
            <CardedChart chartHeading="Waste & Loss Tracking" chartCustomization={pieChartCustomization} />
            <CardedChart chartHeading="Certification & Food Safety Compliance" chartCustomization={horizontalDoubleBarChartCustomization} />
            {/* <CardedChart chartHeading="Cold Chain & Logistics Efficiency" chartCustomization={mapChartCustomization} /> */}
            </CertainDashboard>
        </div>
    )  
}

export default Food
