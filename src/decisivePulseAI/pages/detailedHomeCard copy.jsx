import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Nav from "../components/detailedNav";

import Bg2 from "../resources/detailedHome/Bg2.png";
import Footer from "../components/detailedFooter";

import image1 from "../resources/admin/image41.png";
import image2 from "../resources/admin/image35.png";
import image3 from "../resources/admin/Group.png";
import image4 from "../resources/admin/image42.png";
import image5 from "../resources/admin/image41(1).png";
import image6 from "../resources/admin/excel_img.png";
import image7 from "../resources/admin/csv_img.png";
import image8 from "../resources/admin/image41_2.png";
import image9 from "../resources/admin/Group1905.png";
import Dropdown2 from "../components/admin/dropdown";


import { fetchData } from "../components/api";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PptxGenJS from "pptxgenjs";
import NextPage from "../components/NextPage";
import { modules } from '../../utils/modules'
const Main = () => {
  const [headerData, setHeaderData] = useState("Default");
  const bib = useParams();

  const cleanHeading = (heading) =>
    heading.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "-");

  console.log(bib.heading)
  useEffect(() => {
    modules.forEach((item) => {
      if (cleanHeading(item.heading) === bib.heading) {

        setHeaderData(item.heading); // Set the matching heading
      }
    });
  }, [bib.heading]);

  const fileInputRef = useRef(null);


  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleRadioChange = (event) => {
    setDataRefresh((prevDataRefresh) =>
      prevDataRefresh.map((item) =>
        item.section ? { ...item, selectedOption: event.target.value } : item
      )
    );
  };

  //below for tab above dataRefresh radio selection box
  const [dataRefresh, setDataRefresh] = useState([
    {
      sectionName: "your data",
      section: true,
      selectedOption: "none",
    },
    {
      sectionName: "competitor data",
      section: false,
      selectedOption: "none",
    },
  ]);



  const radioData = [image1, image2, image3, image4, image5, image8];

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top-left corner of the page
  }, []);

  const [yourFile, setYourFile] = useState(null);
  const [competitorFile, setCompetitorFile] = useState(null);
  const [yourData, setYourData] = useState(null);
  const [competitorData, setCompetitorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [yourFileName, setYourFileName] = useState(""); // State to hold the file name
  const [competitorFileName, setCompetitorFileName] = useState(""); // State to hold the competitor file name

  const chartRef = useRef(null); // Create a ref for the chart section

  const handleYourDataUpload = (file) => {
    setYourFile(file);
    setYourFileName(file.name);
  };

  const handleCompetitorDataUpload = (file) => {
    setCompetitorFile(file);
    setCompetitorFileName(file.name);
  };

  const handleUpload = async () => {
    if (!yourFile || !competitorFile) {
      alert("Please upload both files.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetchData(yourFile, competitorFile);
      setYourData(response.data.yourData);
      setCompetitorData(response.data.competitorData);
      chartRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      alert("Failed to upload data. Please try again.");
      console.error("Error uploading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const [yourDataRefresh, setYourDataRefresh] = useState({
    section: true,
    selectedOption: "none", // for radio button
    file: null, // for file upload
  });

  const [competitorDataRefresh, setCompetitorDataRefresh] = useState({
    section: false,
    selectedOption: "none",
    file: null,
  });

  const handleTabYourDataCompData = (index) => {
    if (index === 0) {
      setYourDataRefresh({ ...yourDataRefresh, section: true });
      setCompetitorDataRefresh({ ...competitorDataRefresh, section: false });
    } else {
      setYourDataRefresh({ ...yourDataRefresh, section: false });
      setCompetitorDataRefresh({ ...competitorDataRefresh, section: true });
    }
  };

  const [selectedFormat, setSelectedFormat] = useState("PDF"); // State to hold the selected format
  const dropDownData2 = ["PDF", "PPT"];
  const dropDownHandle = (format) => {
    setSelectedFormat(format);
  };

  const exportToPDF = async () => {
    const dashboardElement = document.getElementById("Main");

    const canvas = await html2canvas(dashboardElement);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 0, 0, 210, 297);

    pdf.save("Main.pdf");
  };

  const exportToPPT = async () => {
    const dashboardElement = document.getElementById("Main");

    const canvas = await html2canvas(dashboardElement);
    const imgData = canvas.toDataURL("image/png");

    const pptx = new PptxGenJS();
    const slide = pptx.addSlide();
    slide.addImage({ data: imgData, x: 0, y: 0, w: "100%", h: "100%" });

    // Save the PPT
    pptx.writeFile({ fileName: "Main.pptx" });
  };

  const handleExport = () => {
    if (selectedFormat === "PDF") {
      exportToPDF();
    } else if (selectedFormat === "PPT") {
      exportToPPT();
    }
  };
  console.log(bib)
  return (
    <>
      <div
        className="flex justify-center"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <div
          className="w-full max-w-screen-2xl"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <Nav prop={headerData} />
          <div
            className="bg-cover bg-center  min-h-screen bg-[#095458]"

          >
            <div className="flex justify-center pt-5">
              <div className="w-[94%] sm:w-2/3 lg:w-2/3 max-lg:mx-auto  max-lg:mt-10">

                <div className="flex lg:w-1/2 mx-auto">
                  <button
                    className={`px-6 py-2 rounded-tl-md ${yourDataRefresh.section ? "text-white" : "text-[#121212]"
                      } text-sm ${yourDataRefresh.section ? "bg-[#095458]" : "bg-white"
                      } w-[40%] ml-auto font-semibold border ${yourDataRefresh.section
                        ? "border-black"
                        : "border-gray-300"
                      } border-b-0`}
                    style={{
                      boxShadow: yourDataRefresh.section
                        ? "0px 0px 5px black"
                        : "none",
                    }}
                    onClick={() => handleTabYourDataCompData(0)}
                  >
                    Your Data
                  </button>
                  <button
                    className={`px-2 py-2 rounded-tr-md ${competitorDataRefresh.section
                      ? "text-white"
                      : "text-[#121212]"
                      } text-sm  ${competitorDataRefresh.section
                        ? "bg-[#095458]"
                        : "bg-white"
                      } font-semibold border ${competitorDataRefresh.section
                        ? "border-black"
                        : "border-gray-300"
                      } w-[40%] mr-auto ${competitorDataRefresh.section ? "border-b-0" : ""
                      }`}
                    style={{
                      boxShadow: competitorDataRefresh.section
                        ? "0px 0px 5px black"
                        : "none",
                    }}
                    onClick={() => handleTabYourDataCompData(1)}
                  >
                    Competitor Data
                  </button>
                </div>

                <div
                  className="py-10 px-8 bg-[#008085] rounded-2xl   mb-10 "
                  style={{ boxShadow: "0px 2px 3px black" }}
                >
                  <div>
                    <h2 className="text-xl text-white mb-3 font-bold">
                      Data Source
                    </h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                      {radioData.map((data, ind) => {
                        return (
                          <div key={ind} className="flex items-center mb-2">
                            <input
                              type="radio"
                              id={`option${ind}`}
                              name="data-source"
                              className="mr-2 custom-radio"
                              value={`option${ind}`}
                              onChange={handleRadioChange}
                              checked={
                                dataRefresh[selectedIndex]?.selectedOption ==
                                `option${ind}`
                              }
                            />

                            <label htmlFor={`option${ind}`} className="w-full">
                              <div className="h-[44px] w-full bg-gray-100 rounded-lg flex justify-center items-center">
                                <img
                                  src={data}
                                  alt=""
                                  draggable="false"
                                  className="h-[44px] w-[154px] bg-gray-100 rounded-lg object-contain px-3 py-1 cursor-pointer"
                                />
                              </div>
                            </label>
                          </div>
                        );
                      })}

                      <div className="flex items-center mb-2">
                        <input
                          type="radio"
                          id="option6"
                          name="data-source"
                          className="mr-2 custom-radio"
                          value="option6"
                          key={6}
                          onChange={handleRadioChange}
                          checked={
                            dataRefresh[selectedIndex]?.selectedOption ==
                            `option6`
                          }
                        />
                        <label htmlFor="option6" className="w-full">
                          <div className="h-[44px] w-full bg-gray-100 rounded-lg flex justify-center items-center">
                            <img
                              src={image6}
                              alt=""
                              draggable="false"
                              className="h-[24px] w-[64px] object-contain cursor-pointer"
                            />
                          </div>
                        </label>
                      </div>

                      <div className="flex items-center mb-2">
                        <input
                          type="radio"
                          id="option7"
                          name="data-source"
                          className="mr-2 custom-radio"
                          value="option7"
                          key={7}
                          onChange={handleRadioChange}
                          checked={
                            dataRefresh[selectedIndex]?.selectedOption ==
                            `option7`
                          }
                        />
                        <label htmlFor="option7" className="w-full">
                          <div className="h-[44px]  bg-gray-100 rounded-lg flex justify-center items-center cursor-pointer">
                            <img
                              src={image7}
                              alt=""
                              draggable="false"
                              className="h-[24px] w-[64px] object-contain"
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {dataRefresh[selectedIndex].selectedOption != "none" &&
                    dataRefresh[selectedIndex].selectedOption !== "option6" &&
                    dataRefresh[selectedIndex].selectedOption !== "option7" && (
                      <div className="lg:w-1/3 mx-auto mt-5">
                        <h3 className="text-sm text-white my-3 font-bold">
                          API
                        </h3>
                        <input
                          type="text"
                          className="w-full p-3 text-xs rounded-md"
                          placeholder="Enter API key"
                        />
                      </div>
                    )}

                  {dataRefresh[selectedIndex].selectedOption != "none" &&
                    (dataRefresh[selectedIndex].selectedOption === "option6" ||
                      dataRefresh[selectedIndex].selectedOption ===
                      "option7") && (
                      <div className="mt-5 lg:w-1/3 mx-auto">
                        <div>
                          <input
                            type="file"
                            id="fileUploader"
                            name="file"
                            className="hidden"
                            accept={
                              dataRefresh[selectedIndex].selectedOption ===
                                "option6"
                                ? ".xlsx, .xls" // Allow Excel files
                                : dataRefresh[selectedIndex].selectedOption ===
                                  "option7"
                                  ? ".csv" // Allow CSV files
                                  : ""
                            }
                          />

                          {yourDataRefresh.section && (
                            <div>
                              <label htmlFor="yourDataUploader">
                                <img
                                  src={image9}
                                  alt="Upload Your Data"
                                  draggable="true"
                                  className="cursor-pointer"
                                />
                              </label>
                              <input
                                type="file"
                                id="yourDataUploader"
                                className="hidden"
                                accept=".xlsx, .xls, .csv"
                                onChange={(e) =>
                                  handleYourDataUpload(e.target.files[0])
                                }
                              />
                              {yourFileName && (
                                <span className="block text-white text-sm mt-2">
                                  {yourFileName}
                                </span>
                              )}
                            </div>
                          )}
                          {competitorDataRefresh.section && (
                            <div>
                              <label htmlFor="competitorDataUploader">
                                <img
                                  src={image9}
                                  alt="Upload Competitor Data"
                                  draggable="true"
                                  className="cursor-pointer"
                                />
                              </label>
                              <input
                                type="file"
                                id="competitorDataUploader"
                                className="hidden"
                                accept=".xlsx, .xls, .csv"
                                onChange={(e) =>
                                  handleCompetitorDataUpload(e.target.files[0])
                                }
                              />
                              {competitorFileName && (
                                <span className="block text-white text-sm mt-2">
                                  {competitorFileName}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                  <button
                    className="bg-[#00acc1] w-full mt-8 py-2 text-white font-bold flex justify-center rounded-md lg:w-1/3 mx-auto"
                    style={{ boxShadow: "2px 2px 3px #00000040" }}
                    onClick={handleUpload}
                    disabled={loading}
                  >
                    {loading ? "Uploading..." : ""}
                    <span className="ml-3">SUBMIT</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="text-sm flex items-center justify-center text-white mt-6  ">
              <div
                className="w-2/3 max-sm:w-full max-sm:px-2 text-center max-sm:text-xs"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                As a user, you are responsible for harmonizing your dataset and
                the competitor dataset. This involves ensuring that both
                datasets have compatible structures, formats, and values. Proper
                harmonization is vital for generating accurate and insightful
                analyses.
              </div>
            </div>
            <div
              className="flex justify-center mt-14"
              style={{
                backgroundImage: `url(${Bg2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div
                ref={chartRef}
                id="Main"
                className="bg-[#008085] w-[95%] h-full pb-10 px-5 border-5 rounded-md border-red-500 border"
              >


                <div className="w-full mt-10">
                  <NextPage

                  />
                </div>

              </div>
            </div>

            <div className="flex justify-center py-20 bg-white">
              <div className="sm:flex  items-center">
                <div className="flex items-center justify-center">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 43 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.8125 30.9062H29.5625V33.5938H18.8125V30.9062ZM13.4375 30.9062H16.125V33.5938H13.4375V30.9062ZM18.8125 24.1875H29.5625V26.875H18.8125V24.1875ZM13.4375 24.1875H16.125V26.875H13.4375V24.1875ZM18.8125 17.4688H29.5625V20.1562H18.8125V17.4688ZM13.4375 17.4688H16.125V20.1562H13.4375V17.4688Z"
                      fill="#2D313D"
                    />
                    <path
                      d="M33.5938 6.71875H29.5625V5.375C29.5625 4.66223 29.2794 3.97865 28.7753 3.47465C28.2713 2.97065 27.5878 2.6875 26.875 2.6875H16.125C15.4122 2.6875 14.7287 2.97065 14.2247 3.47465C13.7206 3.97865 13.4375 4.66223 13.4375 5.375V6.71875H9.40625C8.69348 6.71875 8.0099 7.0019 7.5059 7.5059C7.0019 8.0099 6.71875 8.69348 6.71875 9.40625V37.625C6.71875 38.3378 7.0019 39.0213 7.5059 39.5253C8.0099 40.0294 8.69348 40.3125 9.40625 40.3125H33.5938C34.3065 40.3125 34.9901 40.0294 35.4941 39.5253C35.9981 39.0213 36.2812 38.3378 36.2812 37.625V9.40625C36.2812 8.69348 35.9981 8.0099 35.4941 7.5059C34.9901 7.0019 34.3065 6.71875 33.5938 6.71875ZM16.125 5.375H26.875V10.75H16.125V5.375ZM33.5938 37.625H9.40625V9.40625H13.4375V13.4375H29.5625V9.40625H33.5938V37.625Z"
                      fill="#2D313D"
                    />
                  </svg>

                  <div
                    className="font-bold mx-3"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Download Results
                  </div>
                </div>
                <div className="mx-3 max-sm:mt-5">
                  <div className="flex items-center borderborder">

                    <Dropdown2
                      data={dropDownData2}
                      dropdownHandle1={dropDownHandle}
                    />

                    <button
                      onClick={handleExport}
                      className="bg-[#00ACC1] hover:bg-[#0497a9] text-white py-1 px-4 rounded-2xl flex items-center mx-2 mt-1"
                      style={{ boxShadow: "2px 2px 2px  #191A23" }}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.79232 9.33325V3.56034L3.95065 5.402L2.95898 4.37492L6.50065 0.833252L10.0423 4.37492L9.05065 5.402L7.20898 3.56034V9.33325H5.79232ZM2.25065 12.1666C1.86107 12.1666 1.52768 12.028 1.25048 11.7508C0.97329 11.4736 0.834457 11.14 0.833984 10.7499V8.62492H2.25065V10.7499H10.7507V8.62492H12.1673V10.7499C12.1673 11.1395 12.0287 11.4731 11.7515 11.7508C11.4743 12.0285 11.1407 12.1671 10.7507 12.1666H2.25065Z"
                          fill="white"
                        />
                      </svg>
                      <span className="ml-2">Download</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Red overlay div */}
          </div>

          <Footer />

        </div>
      </div>
    </>
  );
};
export default Main;
