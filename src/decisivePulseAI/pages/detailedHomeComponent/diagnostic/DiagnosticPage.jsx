


import React, { useState, useEffect } from "react";
import ourIcon from "../../../resources/home/our.png";
import * as XLSX from "xlsx"; // Import the xlsx library
import excelSvg from "../../../resources/home/excel.svg";
import { fetchDataForModule } from '../../../../http/dashboard_api'; // Assuming this utility exists
import { useParams } from "react-router-dom";
import DashboardLoading from "../../../components/loader/DashboardLoading";
import DiagnosticLoading from "../../../components/common/dummyLoading/Dashboards/DiagnosticLoading";
function DiagnosticPage() {
  const [diagnosticData, setDiagnosticData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { module_id, id } = useParams();
  
  const fetchDiagnosticData = async (dashboardDetail) => {
    try {
      const {version_id} = dashboardDetail
      // Dynamically fetch diagnostic data using the module_id and 'diagnostic'
      const result = await fetchDataForModule(version_id, 'diagnostic');
      console.log(result); // Log the result to check the structure of the response
      const diagnostics = result[0]
      if (diagnostics.our_data && diagnostics.our_data.length > 0) {
        setDiagnosticData(diagnostics.our_data);
        setError(null)
      } else {
        throw new Error("No diagnostic data available.");
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
        fetchDiagnosticData(dashboardDetail); // Fetch anomalies data on component mount
      }else{
        setIsLoading(false);
        setError(true);
      }
    }, [module_id]); // Dependency on params change


  const exportToExcel = () => {
    if (!diagnosticData || diagnosticData.length === 0) {
      return;
    }

    const chartData = diagnosticData.map((item) => ({
      "Your Data Insight": item,
    }));

    const ws = XLSX.utils.json_to_sheet(chartData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Diagnostic Insights");

    XLSX.writeFile(wb, "Diagnostic_Insights.xlsx");
  };


  if (isLoading) {
    return <DiagnosticLoading />
  }

  if (error || !diagnosticData) {
    return (
      <div className="diagnostic-container text-white p-6 rounded-lg">
        <h1 className="w-full text-center pb-6 text-2xl font-semibold">Diagnostic Insights</h1>
        <div className="text-center text-lg text-white">
          Diagnostic Insights not available.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="diagnostic-container text-white p-6 rounded-lg">
        <div className="w-[90%] m-auto flex justify-center items-center ">
          <h1 className=" w-full ml-[80px]  text-center pb-6 text-2xl   font-semibold">Diagnostic Insights</h1>

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
        {/* Our Data Insights Section */}
        <ul className="w-[60%] m-auto p-6 bg-[#006064] rounded-lg shadow-md">
          <h2 className="w-full text-center pb-4 text-xl font-semibold">Your Data Insights</h2>
          {diagnosticData.map((item, index) => (
            <li key={index} className="flex items-start mb-3">
              <img src={ourIcon} alt="Our Icon" className="w-5 h-5 mr-3 mt-1" />
              <span className="text-white text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>

    </>
  );
}

export default DiagnosticPage;
