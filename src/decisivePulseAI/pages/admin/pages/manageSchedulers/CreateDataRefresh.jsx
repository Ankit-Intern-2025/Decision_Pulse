import Dropdown from "../../../../components/admin/dropdown";

import "../../../../style/admin.css";
import Calendar from "../../../../resources/admin/Vector.png";
import Clock from "../../../../resources/admin/Vector2.png";

import image1 from "../../../../resources/admin/image41.png";
import image2 from "../../../../resources/admin/image35.png";
import image3 from "../../../../resources/admin/Group.png";
import image4 from "../../../../resources/admin/image42.png";
import image5 from "../../../../resources/admin/image41(1).png";
import image6 from "../../../../resources/admin/excel_img.png";
import image7 from "../../../../resources/admin/csv_img.png";
import image8 from "../../../../resources/admin/image41_2.png";
import image9 from "../../../../resources/admin/Group1905.png";

import TimeZoneDropdown from "../../../../components/admin/timeZoneDropdown";
import { useState, useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment-timezone";
import { FireAlert } from "../../../../../utils/static_func";
import Select, { components } from "react-select";
import { fetchDashboards } from "../../../../../http/dashboard_api";
import { modules_data } from "../../../../../utils/modules";
import { postDataSchedule } from "../../../../../http/admin_api";
const CreateDataRefresh = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleRadioChange = (event) => {
    setDataRefresh((prevDataRefresh) =>
      prevDataRefresh.map((item) =>
        item.section ? { ...item, selectedOption: event.target.value } : item
      )
    );
  };

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

  const handleTabYourDataCompData = (index) => {
    setSelectedIndex(index);
    const updatedDataRefresh = dataRefresh.map((data, i) => ({
      ...data,
      section: i === index,
    }));

    setDataRefresh(updatedDataRefresh);
  };

  const [selectedDropdownValue, setSelectedDropdownValue] = useState("");

  const [moduleList, setModuleList] = useState([]);
  const [dashboards, setDashboards] = useState([]);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState(null);
  useEffect(() => {
     window.scrollTo(0, 0);
     const modulesList = JSON.parse(localStorage.getItem("modules_list"));
     setModuleList(
       modulesList?.map((data) => ({
         label: modules_data[data.name].heading,
         value: data,
       }))
     );
   }, []);
  
  const radioData = [image1, image2, image3, image4, image5, image8];
  const [labelVisible1, setLabelVisible1] = useState(true);
  const [labelVisible2, setLabelVisible2] = useState(true);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [time, setTime] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [loading, setLoading] = useState(false);
  const [frequency, setFrequency] = useState("once_daily");
  const [onceEvery, setOnceEvery] = useState(1);
  const [moduleName, setModuleName] = useState("");

  const [yourFile, setYourFile] = useState(null);
  const [competitorFile, setCompetitorFile] = useState(null);
  const [yourFileName, setYourFileName] = useState("");
  const [competitorFileName, setCompetitorFileName] = useState("");

    const handleModuleChange = async (selectedOption) => {
      setModuleName(selectedOption);
      setLoadingDashboard(true);
      try {
        const response = await fetchDashboards(selectedOption.value.id);
        if (Array.isArray(response) && response.length > 0) {
          setDashboards(
            response.map((data) => ({ label: data.title, value: data }))
          );
        } else {
          setDashboards([]);
        }
      } catch (err) {
        setDashboards([]);
      } finally {
        setLoadingDashboard(false);
        setSelectedDashboard(null);
      }
    };
  const handleYourDataUpload = (file) => {
    setYourFile(file);
    setYourFileName(file?.name || "");
  };

  const handleCompetitorDataUpload = (file) => {
    setCompetitorFile(file);
    setCompetitorFileName(file?.name || "");
  };

  const handleTimezoneChange = (timezone) => {
    setTimeZone(timezone);
    console.log("Selected Timezone:", timezone);
  };

  const handleReset = ()=>{
    setStartDate("")
    setEndDate("")
    setTime("")
    setTimeZone("")
    setFrequency({"label":"Once a day", value:"once_daily"})
    setOnceEvery(1)
    setModuleName(null)
    setDashboards([])
    setSelectedDashboard(null)
  }
  const handleSubmit = async () => {
    if (!moduleName || !selectedDashboard) {
      FireAlert("Information", "Please select dashboard", "info", "");
      return;
    }


    // if (!yourFile && !competitorFile) {
    //   // alert("Please upload at least one file before submitting.");
    //   FireAlert("Info", "Please upload at least one file before submitting.", "info")
    //   setLoading(false);
    //   return;
    // }

    const today = moment().startOf("day"); // Current date with time reset to midnight
    const selectedStartDate = moment(startDate).startOf("day"); // Selected start date with time reset
    const selectedEndDate = moment(endDate).startOf("day");

    // Check if start date is before today
    if (selectedStartDate.isBefore(today)) {
      alert("Start date cannot be earlier than today.");
      setLoading(false);
      return;
    }

    // Check if end date is before start date
    if (selectedEndDate.isBefore(selectedStartDate)) {
      alert("End date cannot be earlier than start date.");
      setLoading(false);
      return;
    }

    // Backend logic: Adjust start date to subtract one day if it's today
    const backendStartDate = selectedStartDate.isSame(today)
      ? selectedStartDate.subtract(1, "day")
      : selectedStartDate;

    // Convert to formatted strings for backend
    const formattedStartDate = backendStartDate.format("YYYY-MM-DD");
    const formattedEndDate = selectedEndDate.format("YYYY-MM-DD");

    const request = {
      "conf": {
        "pipeline_id": "353a2554-2ea8-4996-b964-6a935c993c7a",
        "schedular": "true",
        "version": selectedDashboard.value.version_id,
        "dashboard_id": selectedDashboard.value.id,
        "schedule_type": frequency.value,
        "scheduled_time": time,
        "timezone": timeZone,
        "start_date": formattedStartDate,
        "end_date": formattedEndDate,
        "once_every":onceEvery,
        "moduleName": moduleName.value.name
      }
    }
    try {
      setLoading(true);
      const response = await postDataSchedule(request)
      console.log(response.data);
      FireAlert("Success", "Data refresh scheduled successfully.", "success", "");
      // // Reset file states
      handleReset()
      // setYourFile(null);
      // setCompetitorFile(null);
      // setYourFileName("");
      // setCompetitorFileName("");
    } catch (error) {
      console.log(error);
      FireAlert("Information", "Failed to schedule data refresh. Please try again.", "info", "");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="">
        <div className="bg-white">
          <div className="max-w-[1400px] mx-auto">
            <div className=" pt-10">
              <h1 className="text-center text-2xl font-bold text-[#095458]">
                Schedule Data Refresh
              </h1>
              <h5 className="text-center text-sm text-black">
                Select from below options.
              </h5>
            </div>
            <div className="py-10 w-[95%] sm:w-[87%] mx-auto lg:flex justify-between">
              <div className="md:w-2/3 lg:w-1/2 max-lg:mx-auto">
              <div className=" flex gap-4">
                <div>
                  <h4 className="text-lg mb-3  font-bold">
                    Select Function
                  </h4>
                  <div className="max-sm:pr-1 flex">
                    <div className="min-w-[50%] max-w-[100%]">
                      <Select
                        options={moduleList}
                        onChange={handleModuleChange}
                        // isOptionDisabled={(option)=>selectedUsers.some(val=>val.label===option.label)}
                        value={moduleName}
                        className="w-[250px] border border-black shadow-sm rounded-md text-gray-700 text-sm"
                        styles={{
                          control: (base) => ({
                            ...base,
                            borderRadius: "0.40rem", // Matches Tailwind `rounded-md`
                            height: "45px", // Set your desired height
                            paddingRight: "10px",
                          }),
                        }}
                        noOptionsMessage={() => "Function Not available"}
                        isDisabled={loading}
                        placeholder="Select Option"
                        components={{
                          DropdownIndicator: CustomDropdownIndicator,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg mb-3  font-bold">
                    Select Dashboard
                  </h4>
                  <div className="max-sm:pr-1 flex">
                    <div className="min-w-[50%] max-w-[100%]">
                      <Select
                        options={dashboards}
                        onChange={(selectedOptions) =>
                          setSelectedDashboard(selectedOptions)
                        }
                        // isOptionDisabled={(option)=>selectedUsers.some(val=>val.label===option.label)}
                        value={selectedDashboard}
                        className="w-[250px] border border-black shadow-sm rounded-md text-gray-700 text-sm"
                        styles={{
                          control: (base) => ({
                            ...base,
                            borderRadius: "0.40rem", // Matches Tailwind `rounded-md`
                            height: "45px", // Set your desired height
                            paddingRight: "10px",
                          }),
                        }}
                        noOptionsMessage={() => "Dashboard Not available"}
                        isDisabled={loadingDashboard}
                        isLoading={loadingDashboard}
                        placeholder="Select Option"
                        components={{
                          DropdownIndicator: CustomDropdownIndicator,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex max-sm:justify-between">
                <div className="max-sm:w-1/2">
                  <h4 className="text-lg  my-3 font-bold">
                    Frequency
                  </h4>
                  <div className="max-sm:mr-1">
                    <Select
                        options={[
                          {"label":"Once", value:"once"},
                          {"label":"Once a day", value:"once_daily"},
                          {"label":"Once a weekly", value:"once_weekly"},
                          {"label":"Once a monthly", value:"once_monthly"},
                        ]}
                        onChange={(selected)=>setFrequency(selected)}
                        // isOptionDisabled={(option)=>selectedUsers.some(val=>val.label===option.label)}
                        value={frequency}
                        className="w-[250px] border border-black shadow-sm rounded-md text-gray-700 text-sm"
                        styles={{
                          control: (base) => ({
                            ...base,
                            borderRadius: "0.40rem", // Matches Tailwind `rounded-md`
                            height: "45px", // Set your desired height
                            paddingRight: "10px",
                          }),
                        }}
                        isDisabled={loading}
                        placeholder="Select Option"
                        components={{
                          DropdownIndicator: CustomDropdownIndicator,
                        }}
                      />
                    
                  </div>
                </div>
                {frequency.value !== "once" && (
                  <div className="flex items-end sm:px-4 py-3 sm:ml-5">
                    <span className=" max-sm:text-[10px]">
                      Once every
                    </span>
                    <input
                      type="number"
                      value={onceEvery}
                      onChange={(e) => setOnceEvery(e.target.value)}
                      disabled={loading}
                      className="w-14 h-12 -mb-3 mx-3 p-2 rounded-md border "
                    />
                    <span className=" max-sm:text-[10px]">
                      Day(s)
                    </span>
                  </div>
                )}
              </div>

                <div>
                  <div className=" my-3 text-lg font-bold">
                    Start Date-End Date
                  </div>
                  <div className="flex">
                    <div className="relative max-sm:w-1/2 max-sm:mr-2">
                      {labelVisible1 && (
                        <label
                          htmlFor="startDate1"
                          className="absolute left-3 top-0.5 h-[90%] flex items-center text-xs sm:text-sm font-medium text-gray-700 w-[60%] bg-white"
                        >
                          Start Date
                        </label>
                      )}
                      <input
                        id="startDate1"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full sm:w-[200px] text-sm rounded-md max-sm:text-[12px] mr-5 border border-black shadow-sm px-4 py-3 pr-6 bg-white font-medium text-gray-700 hover:bg-gray-50 custom-date-input"
                        min={moment().format("YYYY-MM-DD")} 
                        style={{
                          backgroundImage: `url(${Calendar})`,
                          backgroundPosition: "right 15px center",
                          backgroundRepeat: "no-repeat",
                        }}
                        disabled={loading}
                        onFocus={() => setLabelVisible1(false)}
                      />
                    </div>

                    <div className="relative max-sm:w-1/2">
                      {labelVisible2 && (
                        <label
                          htmlFor="endDate"
                          className="absolute left-3 top-0.5 h-[90%] flex items-center text-xs sm:text-sm font-medium text-gray-700 w-[60%] bg-white"
                        >
                          End Date
                        </label>
                      )}
                      {/* <input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full sm:w-[200px] text-sm rounded-md max-sm:text-[12px]  border border-black shadow-sm px-4 py-3 pr-6 bg-white font-medium text-gray-700 hover:bg-gray-50 custom-date-input"
                        style={{
                          backgroundImage: `url(${Calendar})`,
                          backgroundPosition: "right 15px center",
                          backgroundRepeat: "no-repeat",
                        }}
                        onFocus={() => setLabelVisible2(false)} // Hides label on focus
                      /> */}
                      <input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full sm:w-[200px] text-sm rounded-md max-sm:text-[12px] border border-black shadow-sm px-4 py-3 pr-6 bg-white font-medium text-gray-700 hover:bg-gray-50 custom-date-input"
                        style={{
                          backgroundImage: `url(${Calendar})`,
                          backgroundPosition: "right 15px center",
                          backgroundRepeat: "no-repeat",
                        }}
                        disabled={loading}
                        onFocus={() => setLabelVisible2(false)} 
                        min={startDate} 
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className=" my-3 text-lg font-bold">Schedule Time</div>
                  <div className="flex">
                    <div className="sm:flex max-sm:w-1/2  ">
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        disabled={loading}
                        className="w-full sm:w-[200px] text-sm rounded-md max-sm:text-xs border mr-5 border-black shadow-sm px-4 py-3  bg-white font-medium text-gray-700 hover:bg-gray-50"
                        style={{
                          backgroundImage: `url(${Clock})`,
                          backgroundPosition: "right 15px center",
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                    </div>
                    <div className="w-full sm:flex max-sm:w-1/2 max-sm:ml-2 ">
                      {/* <TimeZoneDropdown data={timeDropdown} 
                      dropdownHandle1={(value) => setTimeZone(value)}/> */}

                      <TimeZoneDropdown
                        onTimezoneChange={handleTimezoneChange}
                      />
                      {/* <p> {timeZone}</p> */}
                    </div>
                  </div>
                </div>
              </div>

              
              {/* data source box below */}
              <div className="md:w-2/3 lg:w-1/3 max-lg:mx-auto  max-lg:mt-10">
                <div className="flex">
                  <button
                    className={`px-6 py-2 rounded-tl-md ${
                      dataRefresh[0].section ? "text-white" : "text-[#121212]"
                    } text-sm ${
                      dataRefresh[0].section ? "bg-[#095458]" : "bg-white"
                    } w-[40%] ml-auto font-semibold border ${
                      dataRefresh[0].section
                        ? "border-black"
                        : "border-gray-300"
                    } border-b-0`}
                    style={{
                      boxShadow: dataRefresh[0].section
                        ? "0px 0px 5px black"
                        : "none",
                    }}
                    onClick={() => handleTabYourDataCompData(0)}
                  >
                    Your Data
                  </button>
                  <button
                    className={`px-2 py-2 rounded-tr-md ${
                      dataRefresh[1].section ? "text-white" : "text-[#121212]"
                    } text-sm  ${
                      dataRefresh[1].section ? "bg-[#095458]" : "bg-white"
                    } font-semibold border ${
                      dataRefresh[1].section
                        ? "border-black"
                        : "border-gray-300"
                    } w-[40%] mr-auto ${
                      dataRefresh[1].section ? "border-b-0" : ""
                    }`}
                    style={{
                      boxShadow: dataRefresh[1].section
                        ? "0px 0px 5px black"
                        : "none",
                    }}
                    onClick={() => handleTabYourDataCompData(1)}
                  >
                    Competitor Data
                  </button>
                </div>

                {/* below box */}
                <div
                  className="py-10 px-8 bg-[#008085] rounded-2xl   mb-10 "
                  style={{ boxShadow: "0px 2px 3px black" }}
                >
                  <div>
                    <h2 className="text-xl text-white mb-3 font-bold">
                      Data Source
                    </h2>
                    <div className="grid grid-cols-2 gap-2">
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

                      {/* Below: PDF & CSV */}
                      <div className="flex items-center mb-2">
                        <input
                          type="radio"
                          id="option6"
                          name="data-source"
                          className="mr-2 custom-radio"
                          value="option6"
                          key={6}
                          // onChange={(e) => setFile(e.target.files[0])}
                          onChange={handleRadioChange}
                          checked={
                            dataRefresh[selectedIndex]?.selectedOption ==
                            `option6`
                          }
                        />
                        <label htmlFor="option6" className="w-full">
                          <div className="h-[44px] w-full bg-gray-100 rounded-lg flex justify-center items-center ">
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
                          <div className="h-[44px]  bg-gray-100 rounded-lg flex justify-center items-center">
                            <img
                              src={image7}
                              alt=""
                              draggable="false"
                              className="h-[24px] w-[64px] object-contain cursor-pointer"
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* Conditionally rendering the API box */}
                  {dataRefresh[selectedIndex].selectedOption != "none" &&
                    dataRefresh[selectedIndex].selectedOption !== "option6" &&
                    dataRefresh[selectedIndex].selectedOption !== "option7" && (
                      <div>
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

                  {/* {dataRefresh[selectedIndex].selectedOption !== "none" &&
                    (dataRefresh[selectedIndex].selectedOption === "option6" ||
                      dataRefresh[selectedIndex].selectedOption ===
                        "option7") && (
                      <div className="mt-3">
                        <div>
                        
                          <input
                            type="file"
                            id="fileUploader"
                            name="file"
                            className="hidden"
                            accept={
                              dataRefresh[selectedIndex].selectedOption ===
                              "option6"
                                ? ".xlsx, .xls" // Excel files
                                : ".csv" // CSV files
                            }
                          />
                          <label htmlFor="fileUploader">
                            <img
                              src={image9}
                              alt="Upload File"
                              draggable="false"
                              className="cursor-pointer"
                            />
                          </label>

                          
                          {dataRefresh[0].section && (
                            <div>
                              <label htmlFor="yourDataUploader">
                                <img
                                  src={image9}
                                  alt="Upload Your Data"
                                  draggable="false"
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

                         
                          {dataRefresh[1].section && (
                            <div>
                              <label htmlFor="competitorDataUploader">
                                <img
                                  src={image9}
                                  alt="Upload Competitor Data"
                                  draggable="false"
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
                    )} */}

                  {dataRefresh[selectedIndex].selectedOption !== "none" &&
                    (dataRefresh[selectedIndex].selectedOption === "option6" ||
                      dataRefresh[selectedIndex].selectedOption ===
                        "option7") && (
                      <div className="mt-3">
                        <div>
                          {/* General File Uploader */}
                          <input
                            type="file"
                            id="fileUploader"
                            name="file"
                            className="hidden"
                            accept={
                              dataRefresh[selectedIndex].selectedOption ===
                              "option6"
                                ? ".xlsx, .xls" // Excel files
                                : ".csv" // CSV files
                            }
                          />
                          {/* Show "Your Data" Upload Section only if "Your Data" is selected */}
                          {dataRefresh[0].section && (
                            <div>
                              <label htmlFor="yourDataUploader">
                                <img
                                  src={image9}
                                  alt="Upload Your Data"
                                  draggable="false"
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

                          {/* Show "Competitor Data" Upload Section only if "Competitor Data" is selected */}
                          {dataRefresh[1].section && (
                            <div>
                              <label htmlFor="competitorDataUploader">
                                <img
                                  src={image9}
                                  alt="Upload Competitor Data"
                                  draggable="false"
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
                    disabled={loading}
                    onClick={handleSubmit}
                    className="bg-[#00acc1] w-full mt-4 py-2 text-white font-bold flex justify-center rounded-md"
                    style={{ boxShadow: "2px 2px 3px #00000040" }}
                  >
                    {loading ? "Uploading..." : "SUBMIT"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateDataRefresh;

const CustomDropdownIndicator = (props) => {
    const { selectProps } = props;
  
    return (
      <components.DropdownIndicator {...props}>
        {selectProps.menuIsOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="13"
            viewBox="0 0 17 15"
            fill="none"
            className="flex-shrink-0"
          >
            <path
              d="M9.36602 14.5C8.98112 15.1667 8.01888 15.1667 7.63397 14.5L0.272759 1.75C-0.112142 1.08333 0.368983 0.250002 1.13878 0.250002L15.8612 0.25C16.631 0.25 17.1121 1.08333 16.7272 1.75L9.36602 14.5Z"
              fill="#3C3C3C"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="13"
            viewBox="0 0 17 15"
            fill="none"
            className="flex-shrink-0"
          >
            <path
              d="M7.63398 0.5C8.01888 -0.166667 8.98112 -0.166667 9.36602 0.5L16.7272 13.25C17.1121 13.9167 16.631 14.75 15.8612 14.75H1.13878C0.368984 14.75 -0.112141 13.9167 0.272759 13.25L7.63398 0.5Z"
              fill="#016064"
            />
          </svg>
        )}
      </components.DropdownIndicator>
    );
  };
  