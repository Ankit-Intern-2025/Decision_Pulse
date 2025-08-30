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
 
    const barChartCustomization = {
        chartType: "bar",
        chartOption: {
          chart: { type: "bar", height: 350 },
          xaxis: { categories: ["Amazon", "Walmart", "eBay", "Target", "Shopify"] },
          colors: ["#FFB400", "#00ACC1"],
          grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
          { name: "Carbon Footprint Reduction (%)", data: [15, 20, 18, 22, 17] },
          { name: "Renewable Energy Usage (%)", data: [55, 60, 50, 65, 58] }
        ]
      };
      
 
      const pieChartCustomization = {
        chartType: "pie",
        chartOption: {
          chart: { type: "pie", height: 350 },
          labels: ["Minimal Packaging Adoption", "Recyclable Materials Usage", "Zero Waste Initiatives", "Landfill Waste Reduction"],
          colors: ["#FFB400", "#00ACC1", "#087F8C", "#006064"],
          legend: { position: "bottom" }
        },
        chartSeries: [25, 40, 20, 15] 
      };
      

    const textListCustomization = {
        chartType: "textList",
        textItems: [
          "Over $150M invested in sustainable sourcing across retail chains.",
          "Ethical product sales rose by 30% in North America in Q1 2024.",
          "Retailers partnering with verified ethical suppliers increased by 45%.",
          "Supply chain audits reveal 20% drop in labor law violations.",
          "Major brands commit to 100% traceable supply chains by 2026."
        ]
      };
      

      const textList1Customization = {
        chartType: "textList",
        textItems: [
          "72% of Gen Z consumers prioritize eco-friendly products.",
          "Sales of cruelty-free beauty products increased by 40% in Q4 2023.",
          "Eco-conscious branding led to 18% higher repeat purchases.",
          "60% of online shoppers prefer retailers with sustainability labels.",
          "Loyalty programs offering green rewards report 25% higher usage."
        ]
      };
      
 
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
    
    const heatMapChartCustomization = {
        chartType: "heatmap",
        chartOption: {
          chart: { type: "heatmap", height: 350 },
          colors: ["#FFB400", "#00ACC1", "#087F8C", "#006064"],
          grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
          {
            name: "Fair Trade Product Reach",
            data: [1200, 1350, 1500, 1650, 1800]  // Locations or branches
          },
          {
            name: "Social Impact Projects Funded",
            data: [10, 12, 14, 15, 18]  // Project count per region or quarter
          }
        ]
      };
       
    
    
    return (
        <div>
            <CertainDashboard title="Regulatory Compliance & ESG Reporting">
                <CardedChart chartHeading="Sustainable SOurcing & Ethical Retailing" chartCustomization={textListCustomization} />
                <CardedChart chartHeading="Carbon Footprint & Energy Efficiency" chartCustomization={barChartCustomization} />
                <CardedChart chartHeading="Waste Reduction & Recycling Metrics" chartCustomization={pieChartCustomization} />
                <CardedChart chartHeading="Consumer Preferences for Sustainable Products" chartCustomization={textList1Customization} />
                <CardedChart chartHeading="Fair Trade & Social Impact Metrics" chartCustomization={heatMapChartCustomization} />
            </CertainDashboard>
        </div>
    )
}

export default ESG 
