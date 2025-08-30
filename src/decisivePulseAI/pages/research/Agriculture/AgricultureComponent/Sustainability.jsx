import React, { useState } from 'react'
import CertainDashboard from './Reusable/CertainDashboard'
import CardedChart from './Reusable/CardedChart'

const Sustainability  = () => {
    const colors = ["#FFB400", "#00ACC1", "#087F8C", "#006064"];
    const radarChartCustomization = {
        chartType: "radar",
        chartOption: {
          chart: { type: "radar", height: 350 },
          colors: ["#FFB400", "#00ACC1", "#087F8C", "#006064"],
          xaxis: {
            categories: [
              "Conservation Tillage",
              "Cover Cropping",
              "Agroforestry",
              "Organic Farming",
              "Precision Agriculture"
            ]
          }
        },
        chartSeries: [
          {
            name: "2023 Emission Reduction (kg CO₂/ha)",
            data: [180, 160, 140, 190, 150]
          },
          {
            name: "2024 Emission Reduction (kg CO₂/ha)",
            data: [210, 185, 170, 220, 180]
          }
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
          colors: ["#FFB400", "#006064"],
          stroke: { curve: "smooth", width: 3 },
          grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
          {
            name: "Water Usage (liters/ha)",
            data: [5600, 5450, 5300, 5100, 4950, 4750, 4600]
          },
          {
            name: "Soil Health Index (0-100)",
            data: [58, 60, 62, 65, 67, 70, 73]
          }
        ]
      };
      
      


    const barChartCustomization = {
        chartType: "bar",
        chartOption: {
          chart: { type: "bar", height: 350 },
          xaxis: { categories: ["Amul", "Nestlé India", "Britannia", "ITC", "Parle"] },
          colors: ["#FFB400", "#00ACC1"],
          grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
          { name: "Production Volume (in million tonnes)", data: [7.5, 6.2, 5.8, 5.0, 4.5] }
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
          labels: ["Post-Harvest Losses", "Processing Losses", "Distribution Losses", "Consumer Waste"],
          colors: ["#FFB400", "#00ACC1", "#087F8C", "#006064"],
          legend: { position: "bottom" }
        },
        chartSeries: [40, 25, 20, 15]
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
          xaxis: { categories: ["Maharashtra", "Gujarat", "Punjab", "Tamil Nadu", "Uttar Pradesh"] },
          colors: ["#FFB400", "#00ACC1"],
          grid: { show: true, borderColor: "#000000", strokeDashArray: 0 }
        },
        chartSeries: [
          { name: "Certified Units", data: [1200, 950, 800, 750, 700] },
          { name: "Compliance Rate (%)", data: [95, 92, 90, 88, 85] }
        ]
      };
      const mapChartCustomization = {
        chartType: "map",
        chartOption: {
          chart: { map: "india", height: 350 },
          colorAxis: { min: 80, max: 100, stops: [[0, "#FFB400"], [1, "#006064"]] }
        },
        chartSeries: [
          {
            name: "Cold Chain Efficiency (%)",
            data: [
              { code: "MH", value: 95 },
              { code: "GJ", value: 93 },
              { code: "PB", value: 90 },
              { code: "TN", value: 88 },
              { code: "UP", value: 85 }
            ]
          }
        ]
      };
            
    
    return (
        <div>
            <CertainDashboard title="Sustainability & ESG Performance">
                <CardedChart chartHeading="Water Usage & Soil Health Index" chartCustomization={lineChartCustomization} />
                <CardedChart chartHeading="Carbon Emission Trends" chartCustomization={radarChartCustomization} />
                <CardedChart chartHeading="Organic & Sustainable Farming Adoption" chartCustomization={barChartCustomization} />
                {/* <CardedChart chartHeading="Agroforestry & Climate Resilience Practices" chartCustomization={mapChartCustomization} /> */}
                <CardedChart chartHeading="AI-based ESG Monitoring Alerts" chartCustomization={textListCustomization } />
            </CertainDashboard>
        </div>
    ) 
}

export default Sustainability