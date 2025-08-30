import React, { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit, FaRegWindowClose } from "react-icons/fa";
import * as XLSX from "xlsx";
import dayjs from "dayjs";
import excelSvg from "../../../../../resources/home/excel.svg";
import { getChartOptions, getSeries } from "../../chartOptions";
import { UseContext } from "../../../../../../context/ContextProvider";
import { IoMove } from "react-icons/io5";
import { UseDescriptiveContext } from "../../../../../../context/DescriptiveProvider";
import { useParams } from "react-router-dom";
import { getAppliedFilters } from "../../../../../../http/dashboard_api";



const applyFilter = async ({setIsLoadingFilter, module_id, selectedFilter, version_id, owner_id, handleSetFilteredData}) => {
  setIsLoadingFilter(true);
  try{
    const result = await getAppliedFilters(module_id, selectedFilter, version_id, owner_id);
    if (result.data) {
      handleSetFilteredData(result.data)

    } else {

    }

  }catch(err){
    console.log(err)
    handleSetFilteredData(null)
  }finally{
    setIsLoadingFilter(false);

  }


};

const ChartPlot = 
  ({
    title,
    xKey,
    yKey,
    chartTypes,
    data,
    index,
    removePlot,
    options
  }) => {
    const {filteredData, dashboardData, handleSetFilteredData} =  UseContext()
    const {isDraggable, plotRecommendation,  selectedPlot, setSelectedPlot, chartData, filter, pages, selectedPage, isLoadingFilter, setIsLoadingFilter} =  UseDescriptiveContext()
    const [chartOptions, setChartOptions] = useState({});
    const [series, setSeries] = useState([])
    const [type, setType] = useState("bar")
    const [loading, setLoading] = useState(true);
    const [isMenu, setIsMenu] = useState(false);
    const { module_id } = useParams();
    const [isDataAndKeys, setIsDataAndKeys] = useState(false)

    const dropdownRef = useRef(null);
    const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);
    const isDate = (value) =>
      dayjs(
        value,
        ["YYYY-MM-DD", "MM/DD/YYYY", "DD-MM-YYYY", "YYYY/MM/DD", "MMM D, YYYY"],
        true
      ).isValid();


    const handleSetMenu = () => {
      setIsMenu((prev) => !prev);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenu(false);
      }
    };

    const exportToExcel = () => {
      if (!data || data.length === 0) return;

      handleSetMenu()
      let chartData = [];
      const isDateKey = isDate(data[0][xKey]);

      if (isDateKey) {
        const sortedData = data
          .map((item) => ({
            x: item[xKey],
            y: isNumeric(item[yKey]) ? item[yKey] : 0,
          }))
          .sort((a, b) => new Date(b.x) - new Date(a.x));

        const partSize = Math.ceil(sortedData.length / 5);
        for (let i = 0; i < sortedData.length; i += partSize) {
          chartData.push(sortedData[i]);
          if (chartData.length >= 5) break;
        }
      } else {
        chartData = Object.values(
          data.reduce((acc, item) => {
            const xVal = item[xKey];
            const yVal = isNumeric(item[yKey]) ? item[yKey] : 0;

            if (!acc[xVal]) {
              acc[xVal] = { x: xVal, y: yVal };
            } else if (yVal > acc[xVal].y) {
              acc[xVal] = { x: xVal, y: yVal };
            }

            return acc;
          }, {})
        )
          .sort((a, b) => b.y - a.y)
          .slice(0, 5);
      }

      const formattedData = chartData.map((item) => ({
        [xKey]: item.x,
        [yKey]: item.y,
      }));

      const ws = XLSX.utils.json_to_sheet(formattedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Chart Data");
      XLSX.writeFile(wb, `${title}_data.xlsx`);
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);



    const handleClick = (config,categories,xKey)=>{
      if(!filteredData){
        //filter request
        const selectedFilter = {[xKey]:{type:filter[xKey].type.toLowerCase() }}
        if(selectedFilter[xKey].type ==="date" || selectedFilter[xKey].type ==="number"){
          selectedFilter[xKey]["values"] = [categories[config.dataPointIndex],  categories[config.dataPointIndex]]
        }else{
          selectedFilter[xKey]["values"] = [categories[config.dataPointIndex]]
        }
        
          const appliedFilters = Object.keys(selectedFilter).map((field) => ({
            field: field,
            ...selectedFilter[field],
            values: selectedFilter[field].values.map((data) =>
              selectedFilter[field].type === "date"
                ? dayjs(data).startOf("day").format("YYYY-MM-DDTHH:mm:ss")
                : data + ""
            ),
          }));
          const plot_recommendation = [pages[0].recommendation.map((data)=>({type:{xAxis:[data.xKey], yAxis:data.yKeys}, kind:data.kind}))]
          const dashboardDetail = JSON.parse(sessionStorage.getItem("selectedDashboard"))
        const request = {
          module_id:module_id, 
          selectedFilter:{filters:appliedFilters, plot_recommendation:plot_recommendation}, 
          version_id:dashboardDetail.version_id, 
          owner_id:dashboardDetail.owner_id,
          setIsLoadingFilter:setIsLoadingFilter,
          handleSetFilteredData:handleSetFilteredData
  
        }
        applyFilter(request)
        
      }else{
        handleSetFilteredData(null)
      }
    }





    const chartTypeChange = ()=>{
      if(data?.length>0 && yKey){
        setLoading(true);
        setTimeout(() => {
          const chartOptions = getChartOptions(data, xKey, yKey, chartTypes?.[0], options, title, handleClick);
          setType(chartOptions.type)
          setLoading(false);
        }, 10);
      }else{
        setIsDataAndKeys(false)
        setLoading(false);
      }
    }
    const optionChange = ()=>{
      if(data?.length>0 && yKey){
        setTimeout(() => {
          const chartOptions = getChartOptions(data, xKey, yKey, chartTypes?.[0], options, title, handleClick);
          setChartOptions(chartOptions.options);
        }, 10);
      }else{
        setIsDataAndKeys(false)
        setLoading(false);
      }
    }
    const handleSeriesChange = ()=>{
      if(data?.length>0 && yKey){
        setTimeout(() => {
          const series = getSeries(yKey, chartTypes?.[0], data)
          setSeries(series)
          setIsDataAndKeys(true)
        }, 10);
      }else{
        setIsDataAndKeys(false)
        setLoading(false);
      }
    }
    useEffect(() => {
      if(selectedPlot===index){
        optionChange()
      }
    }, [data, xKey, yKey, plotRecommendation]);

    useEffect(()=>{
      // optionChange()
      handleSeriesChange()

    },[filteredData])

    useEffect(() => {
      optionChange()
      handleSeriesChange()
      chartTypeChange()
    }, [plotRecommendation.length, chartTypes?.[0], dashboardData[index]]);
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
          className={`h-[100%] w-[100%] bg-white border-2 border-gray-300 px-0 py-3 rounded shadow-sm relative`}
          onMouseEnter={()=>setIsHovered(true)}
          onMouseLeave={()=>setIsHovered(false)}
        >
          <div className="flex items-center text-center justify-center min-h-[12%] px-4">
            <h3 title={title} className="text-center font-semibold text-md text-[#016064]">
              {title.length>60?title.slice(0,60)+"..":title}
            </h3>
          </div> 
          {!loading && (
            <>
            {isDataAndKeys ? 
              <Chart
                options={chartOptions}
                series={series}
                type={type||"line"}
                height={"88%"}
                width={"100%"}
                style={{
                  backgroundColor: "white",
                }}
              />
              :
              <>
                <Chart 
                  series={[{
                    name: "",
                    data: [0]
                }]}
                height={"100%"}
                width={"100%"}
                options={{
                  chart: {
                    type: 'line',
                    height:"100%",
                    zoom: {
                      enabled: false
                    }
                  },
                  markers:{
                    size:0
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'straight'
                  },
                  tooltip:{
                    enabled:false
                  },
                  
                  grid: {
                    row: {
                      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                      opacity: 0.5
                    },
                  },
                  xaxis: {
                    categories: [''],
                    labels: {
                      show: false,
                    }
                  },
                  yaxis:{
                    labels:{
                      show:false
                    }
                  }
                }}
                type="bar"
                />
              </>
            
            }
            </>
          )}

          {/* <DrillDownChart /> */}
          <div ref={dropdownRef} className="absolute top-[-2px] right-0 z-[11]">
            {isHovered && 
              <>
                <div
                  onClick={handleSetMenu}
                  className={`cursor-pointer p-1 rounded-2xl ${
                    isMenu ? "bg-slate-200" : ""
                  }`}
                >
                  <BsThreeDots />
                </div>
                {isMenu && (
                  <div className="absolute top-4 right-1 bg-gray-300 py-3 flex flex-col gap-1">
                    <span
                      className="flex gap-2 items-center text-sm hover:bg-slate-400 px-3 cursor-pointer"
                      onClick={exportToExcel}
                    >
                      <img src={excelSvg} alt="excel" className="h-4 w-4" />
                      <span>Export</span>
                    </span>
                    <span
                      className="flex gap-2 items-center text-sm hover:bg-slate-400 px-3 cursor-pointer"
                      onClick={() => {
                        setSelectedPlot(index)
                        handleSetMenu()
                      }}
                    >
                      <FaEdit />
                      Modify
                    </span>
                    <span
                      className="flex gap-2 items-center text-sm hover:bg-slate-400 px-3 cursor-pointer"
                      onClick={() => {
                        removePlot(index)
                        handleSetMenu()
                      }}
                    >
                      <FaRegWindowClose />
                      <span>Remove</span>
                    </span>
                  </div>
                )}
              </>
            }
          </div>
          {isHovered && isDraggable && selectedPlot===index && 
            <div className="absolute top-2 left-2 react-grid-drag-handle">
              <IoMove className="cursor-grab h-7 w-7" />
            </div>
          }
        </div>
    );
  }
;

export default ChartPlot;

const DrillDownChart = () => {
  const [chartData, setChartData] = useState(initialData);
  const [currentLevel, setCurrentLevel] = useState("Region");
  const [expandAll, setExpandAll] = useState(false);

  const handleDrillDown = (event, chartContext, config) => {
    if (expandAll) return;
    const selectedCategory = chartData.categories[config.dataPointIndex];
    if (currentLevel === "Region") {
      setCurrentLevel("Year");
      setChartData(getDataByLevel("Year", selectedCategory));
    } else if (currentLevel === "Year") {
      setCurrentLevel("Quarter");
      setChartData(getDataByLevel("Quarter", selectedCategory));
    } else if (currentLevel === "Quarter") {
      setCurrentLevel("Month");
      setChartData(getDataByLevel("Month", selectedCategory));
    } else if (currentLevel === "Month") {
      setCurrentLevel("Day");
      setChartData(getDataByLevel("Day", selectedCategory));
    }
  };

  const handleExpandAll = () => {
    setExpandAll(true);
    setChartData(getExpandedData());
  };

  const handleDrillUp = () => {
    setExpandAll(false);
    setCurrentLevel("Region");
    setChartData(initialData);
  };

  return (
    <div>
      <button onClick={handleDrillUp}>Back to Top</button>
      <button onClick={handleExpandAll}>Expand All</button>
      <Chart
        options={{
          chart: {
            type: "bar",
            events: { dataPointSelection: handleDrillDown },
          },
          xaxis: { categories: chartData.categories },
        }}
        series={[{ data: chartData.data }]}
        type="bar"
        height={400}
      />
    </div>
  );
};

const initialData = {
  categories: ["East", "West", "North", "South"],
  data: [100, 120, 80, 90],
};

const getDataByLevel = (level, parentCategory) => {
  const hierarchy = {
    Year: { categories: ["2023", "2024"], data: [200, 250] },
    Quarter: { categories: ["Q1", "Q2", "Q3", "Q4"], data: [50, 60, 70, 80] },
    Month: { categories: ["Jan", "Feb", "Mar"], data: [30, 40, 50] },
    Day: { categories: ["1", "2", "3", "4", "5"], data: [10, 20, 15, 25, 30] },
  };
  return hierarchy[level] || initialData;
};

const getExpandedData = () => {
  return {
    categories: [
      "East - 2023 - Q1 - Jan - 1",
      "East - 2023 - Q1 - Jan - 2",
      "West - 2023 - Q2 - Feb - 3",
      "North - 2024 - Q3 - Mar - 4",
    ],
    data: [30, 40, 50, 60],
  };
};

