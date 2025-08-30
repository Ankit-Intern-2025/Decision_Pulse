import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import axios from "axios";
import NextPage from "./NextPage";

// Popup Component
const Popup = ({ title, onClose }) => {
  const [plotRecommendation, setPlotRecommendation] = useState([]);
  const [finalCleanCard, setFinalCleanCard] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/data"); 
        const { plot_recommendation, final_clean_card, data } = response.data;
        setPlotRecommendation(plot_recommendation.plot);
        setFinalCleanCard(final_clean_card);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (title === "Descriptive") {
      fetchData();
    }
  }, [title]);

  useEffect(() => {
    // Function to generate charts dynamically based on plot recommendations
    const generateCharts = () => {
      plotRecommendation.forEach((recommendation, index) => {
        const chartDom = document.getElementById(`descriptiveChart${index + 1}`);
        if (!chartDom) return;

        let chartInstance = echarts.getInstanceByDom(chartDom);
        if (chartInstance) chartInstance.dispose();
        chartInstance = echarts.init(chartDom);

        const { type, kind } = recommendation;

        const chartOptions = getChartOptions(type, kind);

        chartInstance.setOption(chartOptions);

        window.addEventListener("resize", () => {
          chartInstance.resize();
        });
      });
    };

    if (plotRecommendation.length) {
      generateCharts();
    }
  }, [plotRecommendation]);

  // Function to generate chart options based on recommendation

const getChartOptions = (type, kind ) => {
  const [xAxisField, yAxisField] = type;
  const xAxisData = data.map((item) => item[xAxisField] || "Unknown"); // Handle missing data
  const yAxisData = data.map((item) => item[yAxisField] || 0); // Handle missing values

  switch (kind) {
    // Bar Chart with gradient colors, top labels, and tooltips
    case "bar":
      return {
        xAxis: { type: "category", data: xAxisData },
        yAxis: { type: "value" },
        series: [{
          data: yAxisData,
          type: "bar",
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#83bff6" },
              { offset: 0.5, color: "#188df0" },
              { offset: 1, color: "#188df0" }
            ])
          },
          label: {
            show: true,
            position: 'top',
            color: "#000"
          }
        }],
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        title: {
          text: `${xAxisField} vs ${yAxisField} (Bar Chart)`,
          left: 'center',
          textStyle: { color: '#333', fontSize: 18 }
        },
        grid: { top: '15%', bottom: '15%' }
      };

    // Line Chart with smooth lines, custom color, labels, and tooltips
    case "line":
      return {
        xAxis: { type: "category", data: xAxisData },
        yAxis: { type: "value" },
        series: [{
          data: yAxisData,
          type: "line",
          smooth: true,
          lineStyle: { width: 3, color: "#5470C6" },
          itemStyle: { color: "#5470C6" },
          label: { show: true, position: 'top', color: "#000" }
        }],
        tooltip: { trigger: 'axis' },
        title: {
          text: `${xAxisField} vs ${yAxisField} (Line Chart)`,
          left: 'center',
          textStyle: { color: '#333', fontSize: 18 }
        },
        grid: { top: '15%', bottom: '15%' }
      };

    // Pie Chart with percentage labels, shadow, and tooltips
    case "pie":
      const pieData = xAxisData.map((x, i) => ({
        name: x || "Unknown", // Handle missing categories
        value: yAxisData[i] || 0, // Handle missing values
      }));
      return {
        series: [{
          type: 'pie',
          radius: '50%',
          data: pieData,
          label: {
            formatter: '{b}: {d}%', // Show percentage
            color: '#000'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)' // Shadow effect
          }
        }],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        title: {
          text: `${xAxisField} (Pie Chart)`,
          left: 'center',
          textStyle: { color: '#333', fontSize: 18 }
        }
      };

    // Scatter Plot with symbol size, color, and grid layout
    case "scatter":
      const scatterData = xAxisData.map((x, i) => [x, yAxisData[i]]);
      return {
        xAxis: { type: "value" },
        yAxis: { type: "value" },
        series: [{
          data: scatterData,
          type: 'scatter',
          symbolSize: 10, // Custom symbol size
          itemStyle: { color: '#ff7f50' } // Custom color
        }],
        tooltip: { trigger: 'item', formatter: '({c})' },
        title: {
          text: `${xAxisField} vs ${yAxisField} (Scatter Plot)`,
          left: 'center',
          textStyle: { color: '#333', fontSize: 18 }
        },
        grid: { top: '15%', bottom: '15%' }
      };

    default:
      return {};
  }
};
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor:" darkcyan",
          padding: "20px",
          borderRadius: "10px",
          width: "90%",
          height:"90%",
          position: "relative", 
        }}
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          Close
        </button>

        {finalCleanCard && (
          <>
           {/* Display dynamic title based on clicked section */}
        <h3 style={{ color: "white", textAlign: "center" }}>{title} Popup</h3>
        {/* <h4 className="text-center py-3">Final Clean Card</h4> */}
         
      {/* <div className="bg-[#407f8e] text-white  p-4 grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-3 gap-5 w-full ">
      
        <div className="bg-white text-gray-900 rounded-md h-20 text-center py-3 px-2 w-full">
          <h1 className="font-bold text-xl justify-end">Total Sales</h1>
          <span className="font-bold text-sm justify-end">
            {" "}
            {finalCleanCard.Total_sales}
          </span>
        </div>
        <div className="bg-white text-gray-900 rounded-md h-20 text-center py-3 px-2 w-full">
          <h1 className="font-bold text-xl justify-end"> Average Sales</h1>
          <span className="font-bold text-sm justify-end">
            {" "}
            {finalCleanCard.Average_sales}
          </span>
        </div>
        <div className="bg-white text-gray-900 rounded-md h-20 text-center py-3 px-2 w-full">
          <h1 className="font-bold text-xl justify-end">Highest Sales Year</h1>
          <span className="font-bold text-sm justify-end">
            {" "}
            {finalCleanCard.Highest_sales_year}
          </span>
        </div>
        <div className="bg-white text-gray-900 rounded-md h-20 text-center py-3 px-2 w-full">
          <h1 className="font-bold text-xl justify-end">Country with Highest Sales</h1>
          <span className="font-bold text-sm justify-end">
            {" "}
            {finalCleanCard.Country_with_Highest_sales}
          </span>
        </div>
       
        
    </div> */}
          </>
            
        )}


       

        {/* {title === "Descriptive" && (
          <>
            <div className="w-full grid grid-cols-2 gap-4">
              <div
                id="descriptiveChart1"
                style={{ width: "100%", height: "280px" }}
              ></div>
              <div
                id="descriptiveChart2"
                style={{ width: "100%", height: "280px" }}
              ></div>
              <div
                id="descriptiveChart3"
                style={{ width: "100%", height: "280px" }}
              ></div>
              <div
                id="descriptiveChart4"
                style={{ width: "100%", height: "280px" }}
              ></div>
            </div>
          </>
        )} */}

         {title === "Descriptive" && (
          
          // <div className="w-full grid grid-cols-2 gap-2">
          //   {/* {plotRecommendation.map((_, index) => (
          //     <div
          //       key={index}
          //       id={`descriptiveChart${index + 1}`}
          //       style={{ width: "100%", height: "250px" }}
          //     ></div>
          //   ))} */}
            
          // </div>
          <div >
          
          <NextPage/>
          </div>
        )}
         

        {/* <div className="grid grid-cols-3 gap-4">
          {[...Array(9)].map((_, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'lightgray',
                height: '175px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '5px', 
              }}
            >
              Box {idx + 1}
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};














const ChartComponent = ({ title, yourData = [], competitorData = [] }) => {
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // Helper function to generate charts
  const generateCharts = () => {
    const lineChartDom = document.getElementById("lineChart");
    const pieChartDom = document.getElementById("pieChart");
    const scatterChartDom = document.getElementById("scatterChart");
    const barChartDom = document.getElementById("barChart");

    if (!lineChartDom || !pieChartDom || !scatterChartDom || !barChartDom)
      return;

    const getValidData = (data, key) =>
      data.map((item) => (item ? item[key] : 0));

    // Initialize Line Chart
    let lineChart = echarts.getInstanceByDom(lineChartDom);
    if (lineChart) lineChart.dispose();
    lineChart = echarts.init(lineChartDom);
    lineChart.setOption({
      title: {
        text: title || "Sales Data Comparison (Line Chart)",
        padding: [20, 0, 0, 15],
      },
      tooltip: { trigger: "axis" },
      legend: {
        data: ["Your Sales", "Competitor Sales"],
        right: "4%",
        top: "5%",
      },
      xAxis: {
        type: "category",
        data: yourData.map((item) => item?.year || ""),
      },
      yAxis: { type: "value" },
      series: [
        {
          name: "Your Sales",
          type: "line",
          data: getValidData(yourData, "sales"),
        },
        {
          name: "Competitor Sales",
          type: "line",
          data: getValidData(competitorData, "total_sales"),
        },
      ],
    });

    // Initialize Pie Chart
    let pieChart = echarts.getInstanceByDom(pieChartDom);
    if (pieChart) pieChart.dispose();
    pieChart = echarts.init(pieChartDom);
    pieChart.setOption({
      title: { text: "Sales Distribution (Pie Chart)", left: "center" },
      tooltip: { trigger: "item" },
      legend: { bottom: "10%", left: "center" },
      series: [
        {
          name: "Sales Distribution",
          type: "pie",
          radius: "50%",
          data: [
            {
              value: yourData.reduce(
                (acc, item) => acc + (item?.sales || 0),
                0
              ),
              name: "Your Sales",
            },
            {
              value: competitorData.reduce(
                (acc, item) => acc + (item?.total_sales || 0),
                0
              ),
              name: "Competitor Sales",
            },
          ],
        },
      ],
    });

    // Initialize Scatter Chart
    let scatterChart = echarts.getInstanceByDom(scatterChartDom);
    if (scatterChart) scatterChart.dispose();
    scatterChart = echarts.init(scatterChartDom);
    scatterChart.setOption({
      title: {
        text: "Sales Comparison (Scatter Plot)",
        padding: [14, 0, 0, 15],
      },
      xAxis: { type: "value", name: "Your Sales" },
      yAxis: { type: "value", name: "Competitor Sales" },
      tooltip: {
        trigger: "item",
        formatter: (params) =>
          `Year: ${yourData[params.dataIndex]?.year || "N/A"}<br/>Your Sales: ${
            params.value[0]
          }<br/>Competitor Sales: ${params.value[1]}`,
      },
      series: [
        {
          name: "Sales Comparison",
          type: "scatter",
          data: yourData.map((item, idx) => [
            item?.sales || 0,
            competitorData[idx]?.total_sales || 0,
          ]),
          itemStyle: {
            color: (params) => (params.dataIndex % 2 === 0 ? "yellow" : "blue"),
          },
        },
      ],
    });

    // Initialize Bar Chart
    let barChart = echarts.getInstanceByDom(barChartDom);
    if (barChart) barChart.dispose();
    barChart = echarts.init(barChartDom);
    barChart.setOption({
      title: {
        text: "Yearly Sales Comparison (Bar Chart)",
        padding: [10, 0, 0, 10],
      },
      tooltip: { trigger: "axis" },
      legend: {
        data: ["Your Sales", "Competitor Sales"],
        right: "4%",
        top: "7%",
      },
      xAxis: {
        type: "category",
        data: yourData.map((item) => item?.year || ""),
      },
      yAxis: { type: "value" },
      series: [
        {
          name: "Your Sales",
          type: "bar",
          data: getValidData(yourData, "sales"),
          itemStyle: { color: "yellow" },
        },
        {
          name: "Competitor Sales",
          type: "bar",
          data: getValidData(competitorData, "total_sales"),
          itemStyle: { color: "blue" },
        },
      ],
    });

    // Attach click events to chart containers to open the popup
    lineChartDom.addEventListener("click", openPopup);
    pieChartDom.addEventListener("click", openPopup);
    scatterChartDom.addEventListener("click", openPopup);
    barChartDom.addEventListener("click", openPopup);

    // Resize event listener...
    window.addEventListener("resize", () => {
      lineChart.resize();
      pieChart.resize();
      scatterChart.resize();
      barChart.resize();
    });

    return () => {
      lineChartDom.removeEventListener("click", openPopup);
      pieChartDom.removeEventListener("click", openPopup);
      scatterChartDom.removeEventListener("click", openPopup);
      barChartDom.removeEventListener("click", openPopup);

      window.removeEventListener("resize", lineChart.resize);
      window.removeEventListener("resize", pieChart.resize);
      window.removeEventListener("resize", scatterChart.resize);
      window.removeEventListener("resize", barChart.resize);

      lineChart.dispose();
      pieChart.dispose();
      scatterChart.dispose();
      barChart.dispose();
    };
  };

  useEffect(() => {
    if (yourData && competitorData) {
      generateCharts();
    }
  }, [yourData, competitorData]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");

  const handleBoxClick = (title) => {
    setPopupTitle(title);
    setIsPopupOpen(true);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[80%] m-auto">
        {/* <div id="lineChart" style={{ width: '100%', height: '400px', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden' }}></div>
        <div id="pieChart" style={{ width: '100%', height: '400px', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden' }}></div>
        <div id="scatterChart" style={{ width: '100%', height: '400px', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden' }}></div>
        <div id="barChart" style={{ width: '100%', height: '400px', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden' }}></div> */}

        <div
          onClick={() => handleBoxClick("Descriptive")}
          style={{
            width: "100%",
            height: "400px",
            backgroundColor: "white",
            borderRadius: "10px",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          Descriptive
        </div>
        <div
          onClick={() => handleBoxClick("Diagnostic")}
          style={{
            width: "100%",
            height: "400px",
            backgroundColor: "white",
            borderRadius: "10px",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          Diagnostic
        </div>
        <div
          onClick={() => handleBoxClick("Prescriptive")}
          style={{
            width: "100%",
            height: "400px",
            backgroundColor: "white",
            borderRadius: "10px",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          Prescriptive
        </div>
        <div
          onClick={() => handleBoxClick("Predictive")}
          style={{
            width: "100%",
            height: "400px",
            backgroundColor: "white",
            borderRadius: "10px",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          Predictive
        </div>

        {/* Show Popup only when isPopupOpen is true */}
        {isPopupOpen && (
          <Popup title={popupTitle} onClose={() => setIsPopupOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default ChartComponent;
