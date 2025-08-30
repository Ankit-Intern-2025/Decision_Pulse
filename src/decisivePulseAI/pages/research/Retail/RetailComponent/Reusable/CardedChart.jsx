import React from 'react'
import Chart from "react-apexcharts";
import { FaArrowRight } from "react-icons/fa";
// import ourIcon from "../../../../resources/home/our.png";

const CardedChart = ({chartHeading, chartCustomization}) => {
    return (
        <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
        {/* <img src={logoSrc} alt="Logo" className="w-8 h-8" /> */}
            <h3 className="text-lg font-semibold text-center w-full">{chartHeading}</h3>
            
            {/* <select className="p-2 rounded bg-white text-black" onChange={(e) => setLineChartRegion(e.target.value)}>
            <option value="Both">Global & Regional</option>
            <option value="Global">Global</option>
            <option value="Regional">Regional</option>
            </select> */}
        </div>
        {chartCustomization.chartType === "textList" ? (
            <ul className="w-[100%] m-auto p-6  ">
                {chartCustomization.textItems.map((item, index) => (
                <li key={index} className="flex items-start mb-3">
                     <FaArrowRight className="w-5 h-5 mr-3 mt-1"/>
                    <span className="text-black text-sm">{item}</span>
                </li>
                ))}
            </ul>
            ) : (
                <Chart 
                    options={chartCustomization?.chartOption} 
                    series={chartCustomization?.chartSeries} 
                    type={chartCustomization?.chartType} 
                    height={350} 
                />
            )}
        {/* <Chart options={chartCustomization?.chartOption} series={chartCustomization?.chartSeries} type={chartCustomization?.chartType} height={350} /> */}
        </div>
    )
}

export default CardedChart;