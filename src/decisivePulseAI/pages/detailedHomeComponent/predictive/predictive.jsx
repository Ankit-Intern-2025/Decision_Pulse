

import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useParams } from "react-router-dom";
import { fetchDataForModule } from '../../../../http/dashboard_api'; // Assuming this utility exists

import excelSvg from "../../../resources/home/excel.svg";
import totalSalesIcon from "../../../resources/home/totalsales.png";

import Chart from "react-apexcharts";
import { CircularProgress } from "@mui/material";
import DashboardLoading from "../../../components/loader/DashboardLoading";

const SinglePlot = ({ title, xKey, yKey, chartType, data}) => {
  // const [chartType, setChartType] = useState(chartType);

  const getChartOptions = () => {
    if (!data || !xKey || !yKey) return {};
    let chartData;
    if(chartType==="heatmap"){
      chartData = Object.keys(data).map((category) => ({
        name: category,
        data: Object.keys(data[category]).map((key) => ({
          x: key,
          y: data[category][key],
        })),
      }));

    }else{
      chartData = data.map((item) => {
        return {
          x: isNaN(item[xKey]) ? item[xKey] : Math.floor(item[xKey]),  
          y: !Object.keys(item).includes(yKey)?isNaN(item[yKey.replace("Average ", "")]) ? item[yKey.replace("Average ", "")] : Math.floor(item[yKey.replace("Average ", "")]) : isNaN(item[yKey]) ? item[yKey] : Math.floor(item[yKey]), 
        }
      });
    }
    
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
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    chart: { 
        animations: {
            enabled: false,
          },
          background: "#fff",
          dropShadow: {
            enabled: true,
            top: 0,
            left: 2,
            blur: 1,
            color: "#000000",
          },
          height: 300,
          toolbar: {
            show: true,
            tools: {
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true,
            },
          },
          zoom: {
            allowMouseWheelZoom: false,
          },
    }, 
  };

    switch (chartType) {
      case "bar":
        return {
          series: [
            {
              name: yKey,
              data: chartData.map((item) => item.y),
            },
          ],
          type: "bar",
          options: {
            ...commonOptions,
            chart: {
              type: "bar",
              
            },
            plotOptions: {
              bar: {
                borderRadius: 10,
                dataLabels: { position: "top" },
                distributed: true,
              },
            },
            dataLabels: {
              enabled: true,
              formatter: (val) => val.toString(),
              offsetY: -20,
              style: {
                fontSize: "12px",
                colors: ["#304758"],
              },
            },
            xaxis: {
              categories: chartData.map((item) => item.x),
              labels: {
                //   formatter: chartDataFormatter,
                style: {
                  whiteSpace: "normal", // Allow text to wrap in the label
                  wordBreak: "break-word", // Break long words and wrap them
                  fontSize: 11,
                  fontWeight: 300,
                },
                trim: true,
                rotate: 0,
                rotateAlways: false,
              },
            },
            colors: gradientColors, // Color based on index
            legend: {
              show: false,
            },
          },
        };
  
      case "pie":
        return {
          series: chartData.map((item) => item.y),
          type: "pie",
          options: {
            ...commonOptions,
            chart: {
              ...commonOptions.chart,
              type: "pie",
            },
            labels: chartData.map((item) => item.x),
            colors: chartData.map(
              (item, index) => gradientColors[index % gradientColors.length]
            ), // Color based on index
            tooltip: {
              y: {
                formatter: (val) => `${val}`,
              },
            },
            dataLabels: {
              enabled: true,
              formatter: (val) => val.toString(),
              offsetY: -20,
              style: {
                fontSize: "12px",
                colors: ["#304758"],
              },
            },
          },
        };
  
      case "scatter":
        return {
          series: [
          {
              name: yKey,
              data: chartData.map((item) => item.y),
          },
          ],
          type: "scatter",
          options: {
            ...commonOptions,
            chart: {
              ...commonOptions.chart,
              type: "scatter",
            },
            xaxis: {
              categories: chartData.map((item) => item.x),
              labels: {
                  //   formatter: chartDataFormatter,
                  style: {
                    whiteSpace: "normal", // Allow text to wrap in the label
                    wordBreak: "break-word", // Break long words and wrap them
                    fontSize: 11,
                    fontWeight: 300,
                  },
                  trim: true,
                  rotate: 0,
                  rotateAlways: false,
                },
            },
            markers: {
              size: 6,
              colors: gradientColors, // Color based on index
            },
          },
        };
  
      case "area":
        return {
          series: [
              {
                name: yKey,
                data: chartData.map((item) => item.y),
              },
            ],
            type: "area",
          options: {
            ...commonOptions,
            chart: {
              ...commonOptions.chart,
              type: "area",
            },
            xaxis: {
              categories: chartData.map((item) => item.x),
              labels: {
                //   formatter: chartDataFormatter,
              },
            },
            yaxis: {
              labels: {
                  //   formatter: chartDataFormatter,
                  style: {
                    whiteSpace: "normal", // Allow text to wrap in the label
                    wordBreak: "break-word", // Break long words and wrap them
                    fontSize: 11,
                    fontWeight: 300,
                  },
                  trim: true,
                  rotate: 0,
                  rotateAlways: false,
                },
            },
            fill: {
              type: "gradient",
              gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.5,
              },
            },
            "colors": gradientColors,
          },
        };
  
      case "line":
        return {
          series: [
              {
                name: yKey,
                data: chartData.map((item) => item.y),
              },
            ],
          options: {
            ...commonOptions,
            chart: {
              ...commonOptions.chart,
              type: "line",
          },
          xaxis: {
              categories: chartData.map((item) => item.x),
              labels: {
                  //   formatter: chartDataFormatter,
                  style: {
                    whiteSpace: "normal", // Allow text to wrap in the label
                    wordBreak: "break-word", // Break long words and wrap them
                    fontSize: 11,
                    fontWeight: 300,
                  },
                  trim: true,
                  rotate: 0,
                  rotateAlways: false,
              },
            },
           
            markers:{
              size:10,
              colors:gradientColors,
              strokeColors:gradientColors,
            },
            annotations: {
              xaxis: [
                {
                  x: chartData.find((data, index)=>index === 5).x, // Midpoint between last two points
                  borderColor: "#000",
                  label: {
                    text: "Predicted Points",
                    style: {
                      background: "#00E396",
                      color: "#000",
                    },
                    position:"bottom",
                    orientation: 'horizontal',
                  },
                },
              ],
            },
            forecastDataPoints: {
              count: 1
            },
            colors: chartData.map(
              (item, index) => gradientColors[index % gradientColors.length]
            ), // Color based on index
          },
          type: "line",
        };

      case "heatmap":
        return {
          series: chartData,
          options: {
            ...commonOptions,
            chart: {
              ...commonOptions.chart,
              type: "heatmap",
          },
          xaxis: {
              labels: {
                  //   formatter: chartDataFormatter,
                  style: {
                    whiteSpace: "normal", // Allow text to wrap in the label
                    wordBreak: "break-word", // Break long words and wrap them
                    fontSize: 11,
                    fontWeight: 300,
                  },
                  trim: true,
                  rotate: 0,
                  rotateAlways: false,
              },
            },

            // colors: gradientColors, // Color based on index
          },
          type: "heatmap",
        };
      default:
        return {};
    }
  };

  // const handleChartTypeChange = (e) => setChartType(e.target.value);

  const exportToExcel = (dataPoints, title = 'Chart_Data') => {
    if (!dataPoints || dataPoints.length === 0) return;
    if (typeof dataPoints === 'object' && !Array.isArray(dataPoints)) {
      let headers = Object.keys(dataPoints);
      let chartData = headers.map(mainKey => {
          let row = { "Metric": mainKey };
          let subMetrics = dataPoints[mainKey];
          Object.keys(subMetrics).forEach(subKey => {
              row[subKey] = subMetrics[subKey];
          });
          return row;
      });

      // Create worksheet from the chart data
      const ws = XLSX.utils.json_to_sheet(chartData);

      // Add headers explicitly
      XLSX.utils.sheet_add_aoa(ws, [["Metric", ...headers]], { origin: "A1" });

      // Create a new workbook and append the worksheet
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Chart Data");

      // Write the file with the given title
      XLSX.writeFile(wb, `${title}_data.xlsx`);
  }else{

    const keys = Object.keys(dataPoints[0])
    const xLabel = keys[0]
    const yLabel = keys[1];

    let chartData = dataPoints
        .map(point => ({
            [xLabel]: point[xLabel],
            [yLabel]: point[yLabel]
        }))
        .sort((a, b) => new Date(a[xLabel]) - new Date(b[xLabel]));

    // Create worksheet from the chart data
    const ws = XLSX.utils.json_to_sheet(chartData);

    // Add headers for xLabel and yLabel at the top
    XLSX.utils.sheet_add_aoa(ws, [[xLabel, yLabel]], { origin: "A1" });

    // Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Chart Data");

    // Write the file with the given title
    XLSX.writeFile(wb, `${title}_data.xlsx`);
  }
};



  const [chartOptions, setChartOptions] = useState({series:[], options:{}, type:chartType})
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
      setLoading(true)
      const chartOptions = getChartOptions();
      setTimeout(() => {
        setChartOptions(chartOptions)
        setLoading(false)
      }, 0);
  },[chartType])
  return (
    <div>
      <div className="border bg-white border-gray-300 p-4 rounded shadow-sm">
        <div className="flex justify-between items-center gap-2 min-h-20">
          <div className="w-[15%]">
            <img className="h-12 w-12 rounded-full" src={totalSalesIcon} alt="" />
          </div>
          <h3 className="text-center font-semibold text-lg text-[#016064] w-[70%]">
            {title.split("Trend of")[1]}
          </h3>
          <button onClick={()=>exportToExcel(data, title)} style={{ cursor: "pointer" }} className="w-15%">
            <img src={excelSvg} alt="excel" className="h-8 w-8" />
          </button>
        </div>
        {/* <select
          value={chartType}
          onChange={handleChartTypeChange}
          style={{ margin: "10px", padding: "5px" }}
        >
          {chartTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select> */}

          {loading?<></>:
          <Chart  
                options={chartOptions?.options}
                series={chartOptions?.series}
                type={chartOptions?.type}
                height={300}
            />
          }
        {/* <ReactEcharts
          option={chartOptions}
          style={{ height: "300px", width: "100%", backgroundColor: "white" }}
          notMerge={true}
        /> */}
      </div>
    </div>
  );
};

const PredictiveDashboard = () => {
  const { module_id} = useParams();

  const [plots, setPlots] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchPredictiveData = async (dashboardDetail) => {
    setIsLoading(true)
    try {
      const {version_id} = dashboardDetail
      // Dynamically fetch predictive data using the module_id and 'predictive'
      const result = await fetchDataForModule(version_id, 'predictive');

      const plotRecommendations = result[0];
      if (plotRecommendations.charts && plotRecommendations.charts.length > 0) {
        setPlots(plotRecommendations.charts);
        setError(null)
      } else {
        // throw new Error("No plot recommendations available.");
        setError("No Predictive Insights available ")
      }
    } catch (error) {
      console.log("Error:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

    useEffect(() => {
        const dashboardDetail = JSON.parse(sessionStorage.getItem("selectedDashboard"))
        if(dashboardDetail){
          fetchPredictiveData(dashboardDetail); // Fetch anomalies data on component mount
        }else{
          setIsLoading(false);
          setError(true);
        }
      }, [module_id]); // Dependency on params change
  
  const dynamicGridCols = () => {
    switch (plots.length) {
      case 1:
        return "1"; // Single column
      case 2:
        return "2"; // Two columns
      case 3:
        return "3"; // Three columns
      case 4:
        return "2"; // Two columns
      case 5:
        return "2"; // Two columns with last taking full width handled in CSS
      default:
        return "3"; // Default for length >= 6
    }
  };
 
  return (
    <div className="mx-auto mt-4 text-center">
      <>
        {isLoading? 
            <DashboardLoading/>
        :
        <>
          {error? 
          <span className="text-white">No Predictive Insights available </span>  
          :
          <div className={`grid grid-cols-1 md:grid-cols-${dynamicGridCols()} gap-4`}>
            {plots.map((plot, index) => {
              if(plot.title!=="Additional Insight"){
                return (
                  <SinglePlot
                    key={index}
                    title={plot.title}
                    xKey={plot.x_axis}
                    yKey={plot.y_axis}
                    chartType={plot.type}
                    data={plot.data_points}
                  />
                )
              }
            })}
          </div>
        }
        </>
        }
      </>
    </div>
  );
};

export default PredictiveDashboard;
