import React, { useState, useEffect, useCallback } from "react";
import ourIcon from '../../../resources/home/our.png';
import ReactEcharts from "echarts-for-react";
import { useParams } from "react-router-dom";
import totalSalesIcon from "../../../resources/home/totalsales.png";
import { fetchDataForAnomaly, fetchDataForModule } from '../../../../http/dashboard_api'

import Chart from "react-apexcharts";

import dayjs from "dayjs";
import { getChartOptions, getChartOptionsAnomaly, getSeries } from "../descriptiveDashboard/chartOptions";
import { CircularProgress } from "@mui/material";
import DashboardLoading from "../../../components/loader/DashboardLoading";
import ExecutiveSummaryLoading from "../../../components/common/dummyLoading/Dashboards/ExecutiveSummaryLoading";
function AnomalyPage() {
  const { module_id, id } = useParams();
  const [anomaliesData, setAnomaliesData] = useState([]);
  const [plotsData, setPlotsData] = useState([])
  const [data, setData] = useState([])
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const fetchAnomalies = async (dashboardDetail) => {
    try {
      // Dynamically fetch anomaly data
      const {module_id, owner_id, version_id} = dashboardDetail
      const result = await fetchDataForAnomaly(module_id, version_id, owner_id);
      const chatBotFileId = result?.data?.chat_response||""
      sessionStorage.setItem("chatbotId", chatBotFileId)
      console.log(result);
      // Assuming your API response has these fields, adapt based on actual structure
      if (result && result?.plot?.[0]?.anomalies_insights && result?.plot?.[0]?.anomalies_insights.length>0 &&  result?.plot?.[0]?.plot_recommendation?.plot.length>0) {
        setAnomaliesData(result?.plot?.[0]?.anomalies_insights);

        const configs = result?.plot?.[0]?.plot_recommendation?.plot.map((plot) => ({
          title: `${plot.type[1]} by ${plot.type[0]}`,
          xKey: plot.type[0],
          yKey: plot.type[1],
          chartTypes: plot.kind,
        }));
        setPlotsData(result?.data?.processed_data?.recommendation||[]);
        setData(result?.data?.processed_data?.data || []);
      } else {
        // throw new Error("No anomaly data available.");
        setError("No anomaly data available.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const dashboardDetail = JSON.parse(sessionStorage.getItem("selectedDashboard"))
    if(dashboardDetail){
      fetchAnomalies(dashboardDetail); // Fetch anomalies data on component mount
    }else{
      setIsLoading(false);
      setError(true);
    }
  }, [module_id]); // Dependency on params change




  if (isLoading) {
    return <ExecutiveSummaryLoading />
  }

  if (error || anomaliesData?.length === 0) {
    return (
      <div className="prescriptive-container text-white p-6 rounded-lg">
        <h1 className="w-full text-center pb-6 text-2xl font-semibold">Anomaly Insights</h1>
        <div className="text-center text-lg text-white">
          Anomaly Insights not available.
        </div>
      </div>
    );
  }

  return (
    <div className=" prescriptive-container p-6 rounded-lg">
      <h1 className="w-full text-center pb-6 text-2xl font-semibold text-white">Alert Points</h1>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-[65%] bg-[#006064] rounded-lg p-6 md:pe-3">
          <div className=" mx-auto ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:pe-3 md:max-h-[746px] md:overflow-y-auto md:overflow-x-hidden custom-scrollbar">
              {plotsData.map((plot, index) => {
                 const title = `${plot?.yKeys?.map((axis) => axis?.name)?.join(", ")} by ${plot?.xKey}`;
                return (
                <SinglePlot
                  key={index}
                  title={
                    title.includes("_")
                      ? title.split("_").join(" ")
                      : title
                  }
                  xKey={plot.xKey}
                  yKey={plot.yKeys}
                  chartTypes={plot.kind}
                  data={data[index]}
                />
              )})}
            </div>
          </div>
        </div>
        <ul className="md:w-[35%] mx-auto p-6 bg-[#006064] rounded-lg shadow-md">
          <h2 className="w-full text-center pb-4 text-xl font-semibold text-white">Insights To Focus On</h2>
          {anomaliesData?.map((item, index) => (
            <li key={index} className="mb-6">

              <div className="flex items-start">
                <img src={ourIcon} alt="Insight Icon" className="w-5 h-5 mr-3 mt-1" />
                <span className="text-white text-sm text-justify ">{item}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AnomalyPage;



function SinglePlot({ title, xKey, yKey, chartTypes, data }) {
  const [chartType, setChartType] = useState(chartTypes[0]?.toLowerCase());
  useEffect(() => {
    setChartType(chartTypes[0]?.toLowerCase());
  }, [chartTypes]);
  const [loading, setLoading] = useState(true)
  const [chartOptions, setChartOptions] = useState({series:[], options:{}, type:chartType})
  useEffect(()=>{
    setLoading(true)
      const chartOptions = getChartOptionsAnomaly(data, xKey, yKey, chartType);
      setChartOptions(prev=>({...prev, series:chartOptions.series, options:chartOptions.options}))
    setLoading(false)
    // console.log(chartOptions)
  },[chartType])

  return (
    <div className="border bg-white border-gray-300 p-4 rounded-2xl shadow-sm min-h-[300px]">
      <div className="flex justify-start items-center p-[5px] min-h-14">
        <div className="w-[15%]">
          <img className="h-7 w-7 rounded-full" src={totalSalesIcon} alt="" />  
        </div>
        <div className="text-center w-[85%]">
          <h3 className=" text-center font-semibold text-md text-[#016064]">
            {title}
          </h3>
        </div>
      </div>
      {/* <ReactEcharts
        // option={getChartOptions()}
        option={chartOptions}
        style={{ height: "250px", width: "100%", backgroundColor: "white" }}
        notMerge={true}
      /> */}
      {loading ?(
        <CircularProgress />
      ):(
        <Chart  
            options={chartOptions.options}
            series={chartOptions.series}
            type={chartOptions.type}
            style={{ height:"80%", width: "100%"}}
        />
      )}
    </div>
  );
};
