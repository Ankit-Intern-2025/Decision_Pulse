import React, { useState } from 'react'
import CertainDashboard from './Reusable/CertainDashboard'
import CardedChart from './Reusable/CardedChart'

const Marketing  = () => {
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
            { name: "2023 ROI (%)", data: [120, 105, 130, 90, 85] },
            { name: "2024 ROI (%)", data: [130, 110, 140, 95, 90] }
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
            { name: "Q1", data: [[50, 10], [75, 15], [100, 25], [125, 30], [150, 40]] },
            { name: "Q2", data: [[55, 12], [80, 18], [110, 28], [140, 35], [160, 45]] }
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
            { name: "Loyalty Program Members (M)", data: [5, 7, 12, 15, 20, 25, 30] },
            { name: "Repeat Purchase Rate (%)", data: [40, 42, 45, 48, 50, 55, 60] }
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
            { name: "Trade Promotions Impact (%)", data: [10, 12, 8, 15, 9] },
            { name: "Discount Sales Growth (%)", data: [20, 18, 22, 25, 17] }
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
                data: [1200, 1500, 1800, 2000, 2200]
            },
            {
                name: "E-commerce Traffic",
                data: [10000, 12000, 14000, 16000, 18000]
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
            <CertainDashboard title="Marketing & Promotion Effectiveness">
            <CardedChart chartHeading="Marketing Spend vs Sales Impact" chartCustomization={scatterChartCustomization} />
            <CardedChart chartHeading="AD Compaign Performance" chartCustomization={radarChartCustomization} />
            <CardedChart chartHeading="Loyalty Program Effectiveness" chartCustomization={lineChartCustomization} />
            <CardedChart chartHeading="Trade Promotions & Discounts Performance" chartCustomization={barChartCustomization} />
            <CardedChart chartHeading="Retail Footfall & E-commerce Traffic Analysis" chartCustomization={heatMapChartCustomization} />
            </CertainDashboard>
        </div>
    ) 
}

export default Marketing 
