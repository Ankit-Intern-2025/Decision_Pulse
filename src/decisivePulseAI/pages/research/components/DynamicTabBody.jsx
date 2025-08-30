import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import {
  filterChartData,
  prePareChartsData,
} from "../researchComponent/staticFunc";
import totalSales from "../../../resources/home/totalsales.png";
import LoadingChartsSkeleton from "./LoadingChartsSkeleton";

const DynamicTabBody = ({ data, loading, setLoading }) => {
  const [chartsData, setChartsData] = useState([]);
  useEffect(() => {
    const initialChartsData = prePareChartsData(data);
    setChartsData(initialChartsData);
  }, [data]);

  const handleFilterChange = (chartId, value) => {
    filterChartData(chartId, value, chartsData, setChartsData);
  };
  return (
    <>
      {loading ? (
        <LoadingChartsSkeleton />
      ) : (
        <div className="p-6 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
          {chartsData.map((chart, index) => (
            <div key={index} className={`h-[400px] ${chart.className}`}>
              <div className="flex justify-between items-center mb-2">
                <div className="flex gap-4 items-center">
                  <img
                    src={totalSales}
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
                    onChange={(e) =>
                      handleFilterChange(chart.id, e.target.value)
                    }
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
      )}
      {/* <div className="bg-white">
        <Chart
          options={{
            chart: {
              type: "line",
            },
            colors: ["#2196F3"],
            fill: {
              type: "gradient",
              gradient: {
                shade: "light",
                type: "horizontal",
                shadeIntensity: 0.25,
                gradientToColors: ["#FFB6C1"],
                inverseColors: true,
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100],
              },
            },
            xaxis: {
              categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
            },
          }}
          series={[
            {
              name: "Recycling Rate",
              data: [50, 55, 60, 58],
            },
          ]}
          type="line"
          height={300}
        />
      </div> */}
    </>
  );
};

export default DynamicTabBody;
