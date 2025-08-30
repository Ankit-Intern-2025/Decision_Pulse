import React, { useState } from 'react'
import CertainDashboard from './Reusable/CertainDashboard'
import CardedChart from './Reusable/CardedChart'

const ESG  = () => {
    const colors = ["#FFB400", "#00ACC1", "#087F8C", "#006064"];

    const scatterChartCustomization = {
        chartType: "scatter",
        chartOption: {
            chart: { type: "scatter", height: 350, zoom: { enabled: true, type: "xy" } },
            xaxis: { title: { text: "Sustainable Sourcing Investment ($K)" }, tickAmount: 10 },
            yaxis: { title: { text: "Increase in Ethical Product Sales (%)" }, tickAmount: 7 },
            colors: colors,
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "Q1 2024", data: [[50, 5], [75, 10], [100, 18], [125, 25], [150, 35]] },
            { name: "Q2 2024", data: [[55, 8], [80, 12], [110, 22], [140, 30], [160, 40]] }
        ]
    };

    // 2. Carbon Footprint & Energy Efficiency (Bar Chart)
    const barChartCustomization = {
        chartType: "bar",
        chartOption: {
            chart: { type: "bar", height: 350 },
            xaxis: { categories: ["Amazon", "Walmart", "eBay", "Target", "Shopify"] },
            colors: [colors[0], colors[1]],
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "Carbon Footprint Reduction (%)", data: [8, 12, 10, 15, 9] },
            { name: "Renewable Energy Usage (%)", data: [30, 45, 35, 50, 40] }
        ]
    };

    // 3. Waste Reduction & Recycling Metrics (Pie Chart)
    const pieChartCustomization = {
        chartType: "pie",
        chartOption: {
            chart: { type: "pie", height: 350 },
            labels: ["Minimal Packaging Adoption", "Recyclable Materials Usage", "Zero Waste Initiatives", "Landfill Waste Reduction"],
            colors: colors,
            legend: { position: "bottom" }
        },
        chartSeries: [30, 40, 20, 10] 
    };

    const textListCustomization = {
        chartType: "textList",
        textItems: [
            "Eco-friendly product sales surged by 25% in 2023.",
            "Over 60% of Gen Z consumers prefer brands with strong sustainability practices.",
            "Retailers implementing circular economy models see a 15% increase in customer retention.",
            "Luxury fashion brands introducing second-hand marketplaces to reduce waste.",
            "Government regulations pushing retailers to report on sustainability KPIs.",
            "Retailers investing in carbon-neutral delivery services to reduce emissions.",
            "Plastic-free packaging policies growing across e-commerce platforms.",
            "Demand for ethically sourced clothing materials increased by 35%."
        ]
    };

    // 5. Fair Trade & Social Impact Metrics (Horizontal Bar Chart)
    const horizontalDoubleBarChartCustomization = {
        chartType: "bar",
        chartOption: {
            chart: { type: "bar", height: 350 },
            plotOptions: { bar: { horizontal: true } },
            xaxis: { categories: ["Fair Trade", "B Corp", "Sustainable Apparel", "Green Business"] },
            colors: colors,
            grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
            { name: "Compliance Costs ($M)", data: [2.5, 3.0, 2.2, 1.8] },
            { name: "Social Impact Fund Allocation ($M)", data: [5.0, 6.0, 4.5, 3.8] }
        ]
    };
    
    
    
    
    return (
        <div>
            <CertainDashboard title="Sustainability ESG Metrics">
            <CardedChart chartHeading="Sustainable SOurcing & Ethical Retailing" chartCustomization={scatterChartCustomization} />
            <CardedChart chartHeading="Carbon Footprint & Energy Efficiency" chartCustomization={barChartCustomization} />
            <CardedChart chartHeading="Waste Reduction & Recycling Metrics" chartCustomization={pieChartCustomization} />
            <CardedChart chartHeading="Consumer Preferences for Sustainable Products" chartCustomization={textListCustomization} />
            <CardedChart chartHeading="Fair Trade & Social Impact Metrics" chartCustomization={horizontalDoubleBarChartCustomization} />
            </CertainDashboard>
        </div>
    )
}

export default ESG 
