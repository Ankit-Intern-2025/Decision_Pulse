import React, { useState } from 'react'
import CertainDashboard from './Reusable/CertainDashboard'
import CardedChart from './Reusable/CardedChart'

const Payments  = () => {
    const colors = ["#FFB400", "#00ACC1", "#087F8C", "#006064"];
    const radarChartCustomization = {
        chartType: "radar",
        chartOption: {
            chart: { type: "radar", height: 350 },
            colors: colors,
            xaxis: {
                categories: ["Google Ads", "Facebook Ads", "Instagram Ads", "YouTube Ads", "Affiliate Marketing"]
            }
        },
        chartSeries: [
            { name: "2023 ROI (%)", data: [110, 100, 125, 90, 80] },
            { name: "2024 ROI (%)", data: [125, 115, 135, 95, 90] }
        ]
    };

    const scatterChartCustomization = {
        chartType: "scatter",
        chartOption: {
            chart: { type: "scatter", height: 350, zoom: { enabled: true, type: "xy" } },
            xaxis: { title: { text: "Marketing Spend ($K)" }, tickAmount: 10 },
            yaxis: { title: { text: "Sales Growth (%)" }, tickAmount: 7 },
            colors: colors,
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "Q1", data: [[30, 10], [50, 15], [70, 20], [90, 28], [110, 33]] },
            { name: "Q2", data: [[35, 12], [60, 18], [85, 25], [100, 30], [120, 38]] }
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
            { name: "Loyalty Program Members (M)", data: [4, 6, 10, 14, 19, 24, 28] },
            { name: "Repeat Purchase Rate (%)", data: [38, 41, 45, 47, 52, 56, 59] }
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
            { name: "Trade Promotions Impact (%)", data: [12, 10, 9, 14, 11] },
            { name: "Discount Sales Growth (%)", data: [18, 22, 20, 25, 19] }
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
                name: "Retail Footfall",
                data: [1000, 1300, 1600, 1800, 2000]
            },
            {
                name: "E-commerce Traffic",
                data: [9000, 11000, 13000, 15000, 17500]
            }
        ]
    };
    const pieChartCustomization = {
        chartType: "pie",
        chartOption: {
            chart: { type: "pie", height: 350 },
            labels: ["No Effect", "Mild Side Effects", "Moderate Side Effects", "Severe Side Effects"],
            colors: colors,
            legend: { position: "bottom" }
        },
        chartSeries: [40, 35, 20, 5] // Percentage of feedback categories
    };
    
    const textListCustomization = {
        chartType: "textList",
        textItems: [
            "FDA warns about severe liver damage risk for Drug X.",
            "EMA investigates increased heart attack cases linked to Drug Y.",
            "WHO flags potential contamination in generic blood pressure medications.",
            "US recalls over 50,000 units of pain relievers due to mislabeling.",
            "TGA issues new guidelines for opioid prescription safety.",
            "Health Canada reviews neurological side effects of antidepressants.",
            "MHRA updates safety labeling for asthma inhalers.",
            "Pharmaceutical company fined $5M for failing to report side effects.",
        ],
    };
    
    const horizontalDoubleBarChartCustomization = {
        chartType: "bar",
        chartOption: {
            chart: { type: "bar", height: 350 },
            plotOptions: { bar: { horizontal: true } },
            xaxis: { categories: ["FDA", "EMA", "PMDA", "TGA"] },
            colors: colors,
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "Compliance Delay (Days)", data: [30, 40, 35, 25] },
            { name: "Regulatory Fines ($M)", data: [1.5, 2.0, 1.2, 0.8] }
        ]
    };
    
    return (
        <div>
            <CertainDashboard title="Payments & Digital Banking Performance">
                <CardedChart chartHeading="Online & Mobile Banking Adoption Trends" chartCustomization={scatterChartCustomization} />
                <CardedChart chartHeading="Payment Processing & Transaction Volume" chartCustomization={radarChartCustomization} />
                <CardedChart chartHeading="Merchant Acquiring & POS Trends" chartCustomization={heatMapChartCustomization} />
                <CardedChart chartHeading="Remittance & Cross-Border Payment Trends" chartCustomization={barChartCustomization} />
                <CardedChart chartHeading="AI-Driven Fraud Monitoring & Prevention" chartCustomization={lineChartCustomization } />
            </CertainDashboard>
        </div>
    ) 
}

export default Payments 
