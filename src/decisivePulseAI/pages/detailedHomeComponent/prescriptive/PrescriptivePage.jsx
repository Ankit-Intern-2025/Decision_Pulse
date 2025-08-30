import React, { useState, useEffect } from "react";
import ourIcon from '../../../resources/home/our.png'; // Replace with an appropriate icon
import * as XLSX from "xlsx"; // Import the xlsx library
import excelSvg from "../../../resources/home/excel.svg";
import { useParams } from "react-router-dom";
import { fetchDataForModule } from '../../../../http/dashboard_api';
import DashboardLoading from "../../../components/loader/DashboardLoading";
import CustomAccordian from "../descriptiveDashboard/components/CustomAccordian";
import { BsFillCaretDownFill, BsFillCaretRightFill } from 'react-icons/bs'
import PrescriptiveLoading from "../../../components/common/dummyLoading/Dashboards/PrescriptiveLoading";
function PrescriptivePage() {
  const [prescriptiveData, setPrescriptiveData] = useState([]);
  const [frameworkAnalysis, setFrameworkAnalysis] = useState({})
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { module_id, id } = useParams();

  const [sources, setSources] = useState({})
  const fetchPrescriptiveData = async (dashboardDetail) => {
    try {
      const {version_id} = dashboardDetail
      // Dynamically fetch prescriptive data using the module_id and 'prescriptive'
      const result = await fetchDataForModule(version_id, 'prescriptive');
      console.log(result); // Log the result to check the structure of the response
      const prescriptive = result[0]
      if (prescriptive.prescriptive_data && prescriptive.prescriptive_data.length > 0) {
        setPrescriptiveData(prescriptive.prescriptive_data);
        setFrameworkAnalysis(prescriptive.framework_analysis||{})
        if(result?.[1]?.[0]){
          const sourcesArray = Object.keys(result?.[1]?.[0])||[]
          setSources(sourcesArray)
        }
      } else {
        throw new Error("No prescriptive data available.");
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
          fetchPrescriptiveData(dashboardDetail); // Fetch anomalies data on component mount
        }else{
          setIsLoading(false);
          setError(true);
        }
      }, [module_id]); // Dependency on params change


  const exportToExcel = () => {
    if (prescriptiveData.length === 0) return;

    const chartData = prescriptiveData.map((item) => ({
      "Prescriptive Insight": item,
    }));

    const ws = XLSX.utils.json_to_sheet(chartData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Prescriptive Insights");

    XLSX.writeFile(wb, "Prescriptive_Insights.xlsx");
  };

   const [isOpen, setIsOpen] = useState(false)
      const toggleAccordian = ()=>{
          setIsOpen(prev=>!prev)
      }
  if (isLoading) {
    return <PrescriptiveLoading />
  }

  if (error || prescriptiveData.length === 0) {
    return (
      <div className="prescriptive-container text-white p-6 rounded-lg">
        <h1 className="w-full text-center pb-6 text-2xl font-semibold">Prescriptive Insights</h1>
        <div className="text-center text-lg text-white">
          Prescriptive Insights not available.
        </div>
      </div>
    );
  }

  return (
    <div className="prescriptive-container text-white p-6 rounded-lg">

      <div className="w-[90%] m-auto flex justify-center items-center">
        <h1 className=" w-full ml-[80px] text-center pb-6 text-2xl   font-semibold">Prescriptive Insights</h1>
        <div
        >
          <button
            onClick={exportToExcel}
            style={{
              width: "130%",
              padding: "10px",
              marginBottom: "18px",

              background: "#006064",
              color: "#fff",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              border: "1px solid #ffffff",
            }}
          >
            <img src={excelSvg} alt="excel" className="h-6 w-6" /> Export to Excel
          </button>
        </div>
      </div>
      <ul className="w-[60%] mx-auto p-6 bg-[#006064] rounded-lg shadow-md">
        <h2 className="w-full text-center pb-4 text-xl font-semibold">Your Prescriptive Insights</h2>
        {prescriptiveData.map((item, index) => (
          <li key={index} className="mb-6 ">
            {/* Insight Section */}
            <div className="flex items-start">
              <img src={ourIcon} alt="Insight Icon" className="w-5 h-5 mr-3 mt-1" />
              <span className="text-white text-sm">{item}</span>
            </div>
          </li>
        ))}
        {Object.keys(frameworkAnalysis)?.map((item, index)=>{
          return(
            <li key={index} className="mb-6 ">
              {/* Insight Section */}
              <div className="flex items-start">
                <img src={ourIcon} alt="Insight Icon" className="w-5 h-5 mr-3 mt-1" />
                {Array.isArray(frameworkAnalysis[item]) ?
                     <div className="text-white text-sm flex flex-col gap-1">
                      <span>{item}:</span>
                      <span className="flex flex-col gap-1">{frameworkAnalysis[item].map((data, ind)=>{
                        return(
                          <span key={ind} className="flex gap-1 ps-2">
                            <span className="w-[2%]">{ind+1}.</span>
                            <span className="w-[98%]">{data}</span>
                          </span>
                        )
                      })}</span>
                      </div>
                  :
                  <span className="text-white text-sm">{item}: {frameworkAnalysis[item]}</span>

                }
              </div>
            </li>
          )
        })}
      </ul>

{sources.length>0 && 
      <div className="">
         <div 
                    className={`w-full flex flex-col`}
                >
                        <div className='flex justify-start gap-4 items-center h-10 px-4'  onClick={toggleAccordian}>
                            <span className='text-sm font-bold cursor-pointer flex gap-2 items-center'>Sources</span>
                            <div className='flex items-center '>
                                <span>
                                    {isOpen?
                                        <BsFillCaretDownFill className='cursor-pointer h-4 w-4' />
                                    :
                                        <BsFillCaretRightFill className='cursor-pointer h-4 w-4' />
                                    }
                                </span>
                            </div>
                        </div>
                        <div className={`${isOpen?"block border-t border-b border-[#A9A9A9]":"hidden"} grid grid-cols-3 gap-2 px-3 py-2`}>
                        {sources.map((source, index)=>{
                          return(
                            <a key={index} href={source} target="_blank" title={source} className="hover:text-blue-300">{source.length>=35?source.slice(0,35):source}</a>
                          )
                        })}
                        </div>
                </div>
      </div>
}

    </div>
  );
}

export default PrescriptivePage;
