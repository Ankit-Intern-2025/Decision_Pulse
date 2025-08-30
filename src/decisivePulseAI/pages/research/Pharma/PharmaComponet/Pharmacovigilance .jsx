import React, { useState } from 'react'
import CertainDashboard from './Reusable/CertainDashboard'
import CardedChart from './Reusable/CardedChart'

const Pharmacovigilance  = () => {
    const colors = ["#FFB400", "#00ACC1", "#087F8C", "#006064"];

    const radarChartCustomization = {
        chartType: "radar",
        chartOption: {
            chart: { type: "radar", height: 350 },
            colors: colors,
            xaxis: {
                categories: ["Pain Relievers", "Antibiotics", "Diabetes", "Cancer", "Cardiovascular"]
            }
        },
        chartSeries: [
            { name: "2023 Claims ($M)", data: [15, 18, 22, 30, 25] },
            { name: "2024 Claims ($M)", data: [17, 20, 25, 35, 28] }
        ]
    };
    
    
    

    const scatterChartCustomization = {
        chartType: "scatter",
        chartOption: {
            chart: { type: "scatter", height: 350, zoom: { enabled: true, type: "xy" } },
            xaxis: { title: { text: "Number of Drug Recalls" }, tickAmount: 10 },
            yaxis: { title: { text: "Severity Score (1-10)" }, tickAmount: 7 },
            colors: colors,
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "2023", data: [[10, 3], [15, 5], [20, 7], [25, 8], [30, 9]] },
            { name: "2024", data: [[12, 2], [18, 4], [22, 6], [28, 7], [35, 9]] }
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
            <CertainDashboard title="Pharmacovigilance & Patient Safety">
            <CardedChart chartHeading="Adverse Drug Reaction (ADR) Monitoring" chartCustomization={textListCustomization} />
            <CardedChart chartHeading="Drug Recalls & Safety Alerts" chartCustomization={scatterChartCustomization} />
            <CardedChart chartHeading="Patient Reported Outcomes & Feedback" chartCustomization={pieChartCustomization} />
            <CardedChart chartHeading="Medical Claims & Insurance Analytics" chartCustomization={radarChartCustomization} />
            <CardedChart chartHeading="AI-Based Risk Prediction" chartCustomization={horizontalDoubleBarChartCustomization} />
            </CertainDashboard>
        </div>
    ) 
}

export default Pharmacovigilance 
