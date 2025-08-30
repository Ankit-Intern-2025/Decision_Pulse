import React, { useState } from 'react'
import CertainDashboard from './Reusable/CertainDashboard'
import CardedChart from './Reusable/CardedChart'

const Trends  = () => {
    const colors = ["#FFB400", "#00ACC1", "#087F8C", "#006064"];

    const scatterChartCustomization = {
        chartType: "scatter",
        chartOption: {
            chart: { type: "scatter", height: 350, zoom: { enabled: true, type: "xy" } },
            xaxis: { title: { text: "Investment in Genomics ($B)" }, tickAmount: 10 },
            yaxis: { title: { text: "Approved Gene Therapies" }, tickAmount: 7 },
            colors: colors,
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "2023", data: [[5, 2], [8, 4], [12, 6], [15, 8], [18, 10]] },
            { name: "2024", data: [[6, 3], [9, 5], [13, 7], [17, 9], [20, 12]] }
        ]
    };
    
    
    

    const radarChartCustomization = {
        chartType: "radar",
        chartOption: {
            chart: { type: "radar", height: 350 },
            colors: colors,
            xaxis: {
                categories: ["Target Identification", "Preclinical Research", "Clinical Trials", "Regulatory Approval", "Post-Market Surveillance"]
            }
        },
        chartSeries: [
            { name: "Traditional Process", data: [40, 50, 30, 20, 25] },
            { name: "AI-Optimized Process", data: [60, 70, 55, 45, 50] }
        ]
    };
    
    
    
    const lineChartCustomization = {
        chartType: "line",
        chartOption: {
            chart: { type: "line", height: 350 },
            xaxis: { categories: ["2019", "2020", "2021", "2022", "2023", "2024"] },
            colors: colors,
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "Telemedicine Users (M)", data: [5, 15, 30, 50, 65, 80] },
            { name: "E-Pharmacy Orders (M)", data: [2, 8, 20, 35, 50, 70] }
        ]
    };
    
    
    
    const stackedBarChartCustomization = {
        chartType: "bar",
        chartOption: {
            chart: { type: "bar", height: 350, stacked: true },
            xaxis: { categories: ["Raw Materials", "Manufacturing", "Distribution", "Retail", "Regulatory Compliance"] },
            colors: colors,
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "Adoption in 2023 (%)", data: [20, 30, 40, 25, 35] },
            { name: "Adoption in 2024 (%)", data: [35, 50, 55, 40, 50] }
        ]
    };
    
    
    
    
    const barChartCustomization = {
        chartType: "bar",
        chartOption: {
            chart: { type: "bar", height: 350 },
            xaxis: { categories: ["Pfizer", "Novartis", "Roche", "Merck", "GSK"] },
            colors: colors,
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "CO2 Reduction (%)", data: [10, 15, 20, 18, 12] },
            { name: "Green Energy Use (%)", data: [30, 40, 50, 45, 35] }
        ]
    };
    
    
    
    return (
        <div>
            <CertainDashboard title="Emerging Trends & AI Insights">
            <CardedChart chartHeading="Personalized Medicine & Genomics" chartCustomization={scatterChartCustomization} />
            <CardedChart chartHeading="AI & ML in Drug Development" chartCustomization={radarChartCustomization} />
            <CardedChart chartHeading="Telemedicine & E-Pharmacy Growth" chartCustomization={lineChartCustomization} />
            <CardedChart chartHeading="Blockchain in Pharma Supply Chain" chartCustomization={stackedBarChartCustomization} />
            <CardedChart chartHeading="Sustainability in Pharma Manufacturing" chartCustomization={barChartCustomization} />
            </CertainDashboard>
        </div>
    )
}

export default Trends 
