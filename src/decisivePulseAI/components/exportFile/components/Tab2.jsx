import { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import * as XLSX from "xlsx";
import { FaFileExcel } from "react-icons/fa";
import totalSalesIcon from "../../../resources/home/totalsales.png";

const Tab2  = ({data, plotConfigs, cardData}) => {
  return (
    <div className="app-container">
      <div className="flex gap-4 ">
        {Object.entries(cardData).map(([key, value]) => {
          return (
            <div
              key={key}
              className="flex bg-[#f0f0f0] w-[24%] rounded-md p-3 pr-6 justify-between mb-4 "
            >
              <div className=" w-full">
                <h3 className="font-semibold text-center text-lg text-[#006064]">
                  {/* {key.replace(/_/g, " ")} */}
                  {key
                    .replace(/\b\w/g, (char) => char.toUpperCase())
                    .replace(/_/g, " ")}
                </h3>
                <p className="font-medium text-center text-[#006064]">
                  {value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className=" mx-auto mt-4 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plotConfigs.map((plot, index) => (
            <SinglePlot
              key={index}
              title={plot.title}
              xKey={plot.xKey}
              yKey={plot.yKey}
              chartTypes={plot.chartTypes}
              data={data}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Tab2;

function SinglePlot({ title, xKey, yKey, chartTypes, data }) {
  const [chartType, setChartType] = useState(chartTypes[0]);

  // Utility to check if a value is numeric
  const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);

  // Determine if x and y values are categorical or numeric
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

      // console.log("xValue:", xVal, "yValue:", yVal);
      acc[xVal] = (acc[xVal] || 0) + (isNumeric(yVal) ? yVal : 0);
      return acc;
    }, {});
    // Prepare chart data with sorting and limit to top 5
    let chartData = Object.keys(groupedData)
      .map((key) => ({ x: key, y: groupedData[key] }))
      .sort((a, b) => b.y - a.y)
      .slice(0, 5);

    // Define gradient colors
    const gradientColors = [
      "#006064",
      "#087F8C",
      "#00ACC1",
      "#FFB400",
      "#16262E",
      "#4A4A4A",
      "#878787",
      "#EFEFEF",
      "#FFFFFF",
      "#BAB0AC",
    ];

    // Common chart configurations
    const commonOptions = {
      //   title: { text: title },
      grid: { left: "27%", right: "5%", top: "5%", bottom: "27%" },
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    };

    switch (chartType) {
      case "bar":
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

      case "scatter":
        return {
          ...commonOptions,
          xAxis: {
            type: xAxisType,
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
              type: "scatter",
              data: chartData.map((item, index) => ({
                value: [item.x, item.y],
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
              areaStyle: {},
              itemStyle: {
                color: gradientColors[0],
              },
            },
          ],
        };

      default:
        return {
          // commonOptions
          ...commonOptions,
          xAxis: {
            type: "category",
            data: chartData.map((item) => item.x),
            axisLabel: {
              show: true,
              interval: 0,
              rotate: 45,
              formatter: (value) => value,
            },
          },
          yAxis: { type: "value" },
          series: [
            {
              type: chartType,
              data: chartData.map((item, index) => ({
                value: item.y,
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color:
                          gradientColors[index % gradientColors.length].start,
                      },
                      {
                        offset: 1,
                        color:
                          gradientColors[index % gradientColors.length].end,
                      },
                    ],
                  },
                },
              })),
              emphasis: {
                focus: "series",
                itemStyle: { color: "#FFD700" },
              },
            },
          ],
        };
    }
  };

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  useEffect(() => {
    setChartType(chartTypes[0]);
  }, [chartTypes]);
  // useEffect(() => {
  //   setChartType(chartTypes?.[0] || "bar");
  // }, [chartTypes]);

  const chartOptions = getChartOptions();

  const exportToExcel = () => {
    if (!data || data.length === 0) return;

    const seenValues = new Set(); // Track added values
    const groupedData = data.reduce((acc, item) => {
      const xVal = item[xKey];
      const yVal = item[yKey];

      // Check for duplicates
      if (!seenValues.has(xVal)) {
        seenValues.add(xVal);
        acc[xVal] = (acc[xVal] || 0) + (isNumeric(yVal) ? yVal : 0);
      }
      return acc;
    }, {});

    const chartData = Object.keys(groupedData).map((key) => ({
      x: key,
      y: groupedData[key],
    }));

    const formattedData = chartData.map((item) => ({
      [xKey]: item.x,
      [yKey]: item.y,
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Chart Data");
    XLSX.writeFile(wb, `${title}_data.xlsx`);
  };

  return (
    <div>
      <div className="border bg-white border-gray-300 p-4 rounded shadow-sm">
        <div className="flex justify-between items-center p-[5px]">
          <img className="h-12 w-12 rounded-full" src={totalSalesIcon} alt="" />
          <h3 className=" text-center font-semibold text-lg text-[#016064]">
            {title}
          </h3>
          <button
            onClick={exportToExcel}
            style={{
              width: "10%",
              padding: "4px",
              // marginTop: "8px",
              // background: "#006064",
              color: "#fff",
              borderRadius: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "1px solid #ffffff",
              fontSize: "1px",
              margin: "4px ",
            }}
          >
            <FaFileExcel className="text-[#006064] h-8 w-8 items-center justify-center" />
          </button>
        </div>

        <select
          value={chartType}
          onChange={handleChartTypeChange}
          className="mb-4 p-2 border rounded bg-white"
        >
       {chartTypes.map((type, index) => (
            <option key={index} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))} 
        </select>
        <ReactEcharts
          // option={getChartOptions()}
          option={chartOptions}
          style={{ height: "300px", width: "100%", backgroundColor: "white" }}
          notMerge={true}
        />
      </div>
    </div>
  );
};