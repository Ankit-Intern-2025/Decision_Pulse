import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactEcharts from "echarts-for-react";
import "../../NextPage.css";
import * as XLSX from "xlsx";
import { FaFileExcel } from "react-icons/fa";
import totalSalesIcon from "../../../resources/home/totalsales.png";

const SinglePlot = ({ title, xKey, yKey, chartTypes, data }) => {
  const [chartType, setChartType] = useState(chartTypes[0]);

  const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);

  const detectAxisType = (data, key) => {
    return data.every((item) => isNumeric(item[key])) ? "value" : "category";
  };

  const getChartOptions = () => {
    if (!data || data.length === 0) return {};
    const xAxisType = detectAxisType(data, xKey);
    const yAxisType = detectAxisType(data, yKey);
    const groupedData = data.reduce((acc, item) => {
      const xVal = item[xKey];
      const yVal = item[yKey];
      acc[xVal] = (acc[xVal] || 0) + (isNumeric(yVal) ? yVal : 0);
      return acc;
    }, {});
    let chartData = Object.keys(groupedData)
      .map((key) => ({ x: key, y: groupedData[key] }))
      .sort((a, b) => b.y - a.y)
      .slice(0, 5);

    const gradientColors = [
      "#006064",
      "#087F8C",
      "#00ACC1",
      "#FFB400",
      "#16262E",
    ];

    const commonOptions = {
      grid: { left: "25%", right: "5%", top: "5%", bottom: "25%" },
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    };

    switch (chartType) {
      case "bar":
        return {
          ...commonOptions,
          xAxis: { type: xAxisType, data: chartData.map((item) => item.x),
            axisLabel: {
              show: true,
              interval: 0,
              rotate: 45,
              formatter: (value) => value,
            },
           },
          yAxis: { type: yAxisType },
          series: [
            {
              type: "bar",
              data: chartData.map((item, index) => ({
                value: item.y,
                itemStyle: {
                  color: gradientColors[index % gradientColors.length],
                },
              })),
            },
          ],
        };

      case "pie":
        return {
          ...commonOptions,
          tooltip: { trigger: "item" },
          series: [
            {
              type: "pie",
              radius: "50%",
              data: chartData.map((item, index) => ({
                value: item.y,
                name: `${item.x} : ${item.y}`,
                itemStyle: {
                  color: gradientColors[index % gradientColors.length],
                },
              })),
            },
          ],
        };

      case "line":
        return {
          ...commonOptions,
          xAxis: {
            type: xAxisType,
            data: chartData.map((item) => item.x),
            axisLabel: {
              show: true,
              interval: 0,
              rotate: 45,
              formatter: (value) => value,
            },
          },
          yAxis: { type: yAxisType },
          series: [
            {
              type: "line",
              data: chartData.map((item) => item.y),
              // areaStyle: {},
              itemStyle: { color: gradientColors[0] },
            },
          ],
        };

      default:
        return {};
    }
  };

  const handleChartTypeChange = (e) => setChartType(e.target.value);

  useEffect(() => {
    setChartType(chartTypes[0]);
  }, [chartTypes]);

  const exportToExcel = () => {
    if (!data || data.length === 0) return;

    const groupedData = data.reduce((acc, item) => {
      const xVal = item[xKey];
      const yVal = item[yKey];
      acc[xVal] = (acc[xVal] || 0) + (isNumeric(yVal) ? yVal : 0);
      return acc;
    }, {});

    const chartData = Object.keys(groupedData).map((key) => ({
      [xKey]: key,
      [yKey]: groupedData[key],
    }));

    const ws = XLSX.utils.json_to_sheet(chartData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Chart Data");
    XLSX.writeFile(wb, `${title}_data.xlsx`);
  };

  const chartOptions = getChartOptions();

  return (
    <div>
      <div className="border bg-white border-gray-300 p-4 rounded shadow-sm">
        <div className="flex justify-between items-center">
          <img className="h-12 w-12 rounded-full" src={totalSalesIcon} alt="" />
          <h3 className="text-center font-semibold text-lg text-[#016064]">
            {title}
          </h3>
          <button onClick={exportToExcel} style={{ cursor: "pointer" }}>
            <FaFileExcel className="text-[#006064] h-8 w-8" />
          </button>
        </div>
        <select
          value={chartType}
          onChange={handleChartTypeChange}
          style={{ margin: "10px", padding: "5px" }}
        >
          {chartTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <ReactEcharts
          option={chartOptions}
          style={{ height: "300px", width: "100%", backgroundColor: "white" }}
          notMerge={true}
        />
      </div>
    </div>
  );
};

const Tab5 = ({plots, data}) => {
  return (
    <div className=" mx-auto mt-4 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plots.map((plot, index) => (
          <SinglePlot
            key={index}
            title={`${plot.type[0]} vs ${plot.type[1]}`}
            xKey={plot.type[0]}
            yKey={plot.type[1]}
            chartTypes={plot.kind}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default Tab5;
