import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Nav from "../components/detailedNav";
import Bg2 from "../resources/detailedHome/Bg2.png";
import Footer from "../components/detailedFooter";
import 'react-data-grid/lib/styles.css';
import { modules_data } from '../../utils/modules'
import RenderSelectedPage from './detailedHomeComponent/renderSelectedPage'

//further components
import DownloadResults from "./detailHomeCard/DownloadResults"
import InsightBasedButtons from "./detailHomeCard/InsightBasedButtons"
import { apiCaller, getPdf} from "../../http/dashboard_api";
import {FireAlert} from "../../utils/static_func.js";
import { UseContext } from "../../context/ContextProvider.jsx";
import { UseDescriptiveContext } from "../../context/DescriptiveProvider.jsx";

const DetailedHomeCard = () => {
  const {handleLoader} = UseContext()
  const {setFilter} = UseDescriptiveContext()
  const [headerData, setHeaderData] = useState("Default");
  const { module_id } = useParams();

  useEffect(() => {
    const heading = modules_data?.[module_id]?.heading
    if (heading) {
      setHeaderData(heading);
    }
    return()=>{
      sessionStorage.removeItem("selectedDashboard")
      setFilter({})
    }
  }, [module_id]);

  const [selectedPage, setSelectedPage] = useState();
  const [selectedFormat, setSelectedFormat] = useState("");
  const dropDownData2 = ["PDF", "PPT"];
  const dropDownHandle = (format) => {
    setSelectedFormat(format);
  };



  const handleExport = async () => {
    handleLoader(true, `Generating your ${selectedFormat}, please wait...`)
    const dashboardDetail = JSON.parse(sessionStorage.getItem("selectedDashboard")) 
    const endPoint = `/get-pdf`
    const params = {
      reportFormat:selectedFormat,
      moduleName:module_id,
      versionId:dashboardDetail.version_id,
      dashboardId:dashboardDetail.id

    }
    try{
      const response = await getPdf(endPoint, params)
      if(response.download_url){
        const link = document.createElement("a");
        link.href = response.download_url;
        link.click();
        FireAlert("Success", `${selectedFormat} report generated for ${headerData}`, "success")
      }else{
        FireAlert("Info", "Unable to process your request, please try again later..", "info", response.status)
      }
    }catch(err){
      FireAlert("Network Error", "Unable to process your request, please try again later..", "info", response.status)
    }finally{
      handleLoader(false, "")
    }

  }

  return (
    <>
      <div className="flex justify-center" style={{ fontFamily: "Poppins, sans-serif" }} >
        <div
          className="w-full max-w-screen-2xl"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <Nav prop={headerData} />
          <div
            className="bg-cover bg-center  min-h-screen bg-[#095458]"
          >
            <div className="text-sm flex items-center justify-center text-white mt-0 pt-8 ">
              <div
                className="w-2/3 max-sm:w-full max-sm:px-2 text-center max-sm:text-xs"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
              </div>
            </div>
            <InsightBasedButtons selectedPage={selectedPage} setSelectedPage={setSelectedPage} />

            <div
              className="flex justify-center mt-10"
              style={{
                backgroundImage: `url(${Bg2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div
                id="Main"
                className="bg-[#008085] w-[95%] min-h-[700px] h-full pb-5 px-5  border-5 rounded-md border-red-500"
              >
                <div className="w-full mt-5">
                  <RenderSelectedPage selectedPage={selectedPage} />
                </div>
              </div>
            </div>
            <DownloadResults dropDownData2={dropDownData2} dropDownHandle={dropDownHandle} handleExport={handleExport} selectedFormat={selectedFormat} />
         
          </div>

          <Footer />

        </div>
      </div>
    </>
  );
};


export default DetailedHomeCard;
