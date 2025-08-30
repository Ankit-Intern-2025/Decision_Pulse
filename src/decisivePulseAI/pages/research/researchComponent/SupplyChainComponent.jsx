import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { supplyChain } from "./ChartsData";
import { filterChartData, prePareChartsData } from "./staticFunc";

const SupplyChainProductionAnalytics = () => {
  const [chartsData, setChartsData] = useState([]);

  useEffect(() => {
    const initialChartsData = prePareChartsData(supplyChain);
    setChartsData(initialChartsData);
  }, []);

  const handleFilterChange = (chartId, value) => {
    filterChartData(chartId, value, chartsData, setChartsData);
  };
  return (
    <div className="p-6 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
      {chartsData.map((chart, index) => (
        <div key={index} className={chart.className}>
          <div className="flex justify-between items-center mb-2">
            <div className="flex gap-4 items-center">
              <img
                src="/src/decisivePulseAI/components/images/totalsales.png"
                alt="Logo"
                className="w-8 h-8"
              />
              <h3 className="text-lg font-semibold text-[#006064]">
                {chart.title}
              </h3>
            </div>
            {chart.filters && (
              <select
                className="border border-gray-300 text-sm rounded px-2 py-1"
                value={chart.selectedFilter}
                onChange={(e) => handleFilterChange(chart.id, e.target.value)}
              >
                {chart.filters.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}
          </div>

          <Chart
            options={chart.options}
            series={chart.series}
            type={chart.type}
            height={chart.height || 300}
          />
        </div>
      ))}
    </div>
  );
};

export default SupplyChainProductionAnalytics;
