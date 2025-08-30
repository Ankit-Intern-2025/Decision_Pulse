import Nav from "../components/detailedNav";
import Dropdown from "../components/admin/dropdown";
import Dropdown2 from "../components/admin/dropdown";
import "../style/admin.css";
import Calendar from "../resources/admin/Vector.png";
import Clock from "../resources/admin/Vector2.png";
import image1 from "../resources/admin/image41.png";
import image2 from "../resources/admin/image35.png";
import image3 from "../resources/admin/Group.png";
import image4 from "../resources/admin/image42.png";
import image5 from "../resources/admin/image41(1).png";
import image8 from "../resources/admin/image41_2.png";
import Footer from "../components/detailedFooter";
import TimeZoneDropdown from "../components/admin/timeZoneDropdown";
import { useState, useRef } from "react";
import { useEffect } from "react";
import moment from "moment-timezone";
import DataRefresh from "../components/adminPartt";
import { CircularProgress } from "@mui/material";
import { FireAlert } from "../../utils/static_func";
import AdminTabs, { AdminSchedulerTabs } from "./admin/components/adminTabs";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ManageDashboards from "./admin/pages/manageDashboards/manageDashboards";
import ReusableTable from "./admin/components/ReusableTable";
import UserActivity from "./admin/pages/userActivity/userActivity";
import ManageUsers from "./admin/pages/manageUsers/manageUsers";
import LineageView from "./admin/components/lineageView";
import {
  Delete,
  DeleteOutline,
  Edit,
  EditNotifications,
} from "@mui/icons-material";
import WriteBack from "./admin/components/writeBack";
import { portReportSchedule } from "../../http/admin_api";
import Select, { components } from "react-select";
import { modules_data } from "../../utils/modules";
import { fetchDashboards } from "../../http/dashboard_api";
import { MdScheduleSend } from "react-icons/md";
const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the tab value from the URL path
  const getTabFromPath = (path) => {
    // if (path.includes('/')) return '1';
    if (path.includes("manage-dashboards")) return "2";
    if (path.includes("user-activity")) return "3";
    if (path.includes("manage-users")) return "4";
    if (path.includes("write-back")) return "5";
    if (path.includes("lineage-view")) return "6";
    return "1"; // Default to '1' (Admin Section)
  };
  const getSubTabFromPath = (path) => {
    if (path.includes("scheduler/create")) return "1";
    if (path.includes("scheduler/manage")) return "2";
    return "1";
  };

  const [selectedTab, setSelectedTab] = useState(
    getTabFromPath(location.pathname)
  ); // Set initial tab from URL
  const [selectedSubTab, setSelectedSubTab] = useState(
    getSubTabFromPath(location.pathname)
  );

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    if (newValue === "1") navigate("/admin"); // Update the URL for Admin Section
    if (newValue === "2") navigate("/admin/manage-dashboards"); // Update the URL for Page Two
    if (newValue === "3") navigate("/admin/user-activity"); // Update the URL for Page Three
    if (newValue === "4") navigate("/admin/manage-users"); // Update the URL for Page Two
    if (newValue === "5") navigate("/admin/write-back"); // Update the URL for Page Three
    if (newValue === "6") navigate("/admin/lineage-view"); // Update the URL for Page Two
  };

  const handleSubTabChange = (event, newValue) => {
    setSelectedSubTab(newValue);
    if (newValue === "1") navigate("/admin");
    if (newValue === "2") navigate("/admin/scheduler/manage");
  };

  useEffect(() => {
    // Update selectedTab when the location changes (e.g., after a refresh or a manual URL change)
    setSelectedTab(getTabFromPath(location.pathname));
    setSelectedSubTab(getSubTabFromPath(location.pathname));
  }, [location.pathname]); // Re-run when the location (URL) changes

  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Nav prop="Admin" />

        {/* AdminTabs is responsible for displaying and switching between the tabs */}
        {/* Render AdminTabs */}
        <AdminTabs selectedTab={selectedTab} onChange={handleTabChange} />

        {/* Render AdminSchedulerTabs only if the selected tab is "1" */}
        {selectedTab === "1" && (
          <AdminSchedulerTabs
            selectedTab={selectedSubTab}
            onChange={handleSubTabChange}
          />
        )}

        {/* Nested Routes for different tab content */}
        <Routes>
          {/* <Route path="/" element={<SchedulerSection />} /> */}
          <Route index element={<SchedulerSection />} />
          <Route path="/scheduler/manage" element={<AdminSchedulerManage />} />
          <Route path="manage-dashboards" element={<ManageDashboards />} />
          <Route path="user-activity" element={<UserActivity />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="write-back" element={<WriteBack />} />
          <Route path="lineage-view" element={<LineageView />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
};

export const SchedulerSection = () => {
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

  //above for tab above dataRefresh radio selection box

  const [selectedDropdownValue, setSelectedDropdownValue] = useState("");
  const [selectedDropdownValue1, setSelectedDropdownValue1] = useState("");

  const handleDropdownChange = (value) => {
    setSelectedDropdownValue(value);
  };
  const handleDropdownChange1 = (value) => {
    console.log(value)
    setFrequency(value)
    setSelectedDropdownValue1(value);
  };
  const handleDropdownChange2 = (value) => {};
  const handleDropdownChange3 = (value) => {};

  const handleDropdownChange4 = (value) => {};

  const [moduleList, setModuleList] = useState([]);

  const dropdownData2 = ["Once a day", "Once a weekly", "Once a monthly"];
  const [labelVisible, setLabelVisible] = useState(true);
  const [labelVisible2, setLabelVisible2] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const modulesList = JSON.parse(localStorage.getItem("modules_list"));
    setModuleList(
      modulesList.map((data) => ({
        label: modules_data[data.name].heading,
        value: data,
      }))
    );
  }, []);

  const dropDownData4 = ["PDF", "PPT"];

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [time, setTime] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [reportFormat, setReportFormat] = useState("");
  const [toEmailId, setToEmailId] = useState("");
  const [emailSubject, setEmailSubject] = useState("Scheduled Report");
  const [emailBody, setEmailBody] = useState("");
  const [username, setUsername] = useState("admin_user");
  const [loading, setLoading] = useState(false);
  const [frequency, setFrequency] = useState({"label":"Once a day", value:"once_daily"});
  const [onceEvery, setOnceEvery] = useState(1);
  const [moduleName, setModuleName] = useState(null);

  const [dashboards, setDashboards] = useState([]);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState(null);

  const handleReset = ()=>{
    setStartDate("")
    setEndDate("")
    setTime("")
    setTimeZone("")
    setReportFormat("")
    setToEmailId("")
    setEmailBody("")
    setFrequency({"label":"Once a day", value:"once_daily"})
    setOnceEvery(1)
    setModuleName(null)
    setDashboards([])
    setSelectedDashboard(null)
  }
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
  const handleTimezoneChange = (timezone) => {
    setTimeZone(timezone);
    console.log("Selected Timezone:", timezone);
  };

  const handleSubmit = async () => {
    if (!moduleName || !selectedDashboard) {
      FireAlert("Information", "Please select dashboard", "info", "");
      return;
    }

    /**
     * Converts a given time and timezone to UTC in "HH:mm" format.
     * @param {string} time - The time string in "hh:mm A" format (e.g., "03:34 PM").
     * @param {string} timeZone - The timezone string (e.g., "Asia/Kolkata").
     * @returns {string} - The time in UTC "HH:mm" format.
     */
    const convertToUtcTime = (time, timeZone) => {
      const currentDate = moment().format("YYYY-MM-DD");
      const dateTimeString = `${currentDate} ${time}`;

      // Convert to UTC and format as "HH:mm:ss"
      return moment
        .tz(dateTimeString, "YYYY-MM-DD hh:mm", timeZone)
        .utc()
        .format("HH:mm");
    };

    const today = moment().startOf("day");
    const selectedStartDate = moment(startDate).startOf("day");
    const selectedEndDate = moment(endDate).startOf("day");

    if (selectedStartDate.isBefore(today)) {
      alert("Start date cannot be earlier than today.");
      setLoading(false);
      return;
    }

    if (selectedEndDate.isBefore(selectedStartDate)) {
      alert("End date cannot be earlier than start date.");
      setLoading(false);
      return;
    }

    // const backendStartDate = selectedStartDate.isSame(today)
    //   ? selectedStartDate.subtract(1, "day")
    //   : selectedStartDate;

    // Convert to formatted strings for backend
    const formattedStartDate = selectedStartDate.format("YYYY-MM-DD");
    const formattedEndDate = selectedEndDate.format("YYYY-MM-DD");

    const utcTime = convertToUtcTime(time, timeZone);

    const formData = new FormData();
    formData.append("start_date", formattedStartDate);
    formData.append("end_date", formattedEndDate);
    formData.append("time", time); // utcTime
    formData.append("username", username);
    formData.append("once_daily", frequency.value === "once_daily");
    formData.append("once_weekly", frequency.value === "once_weekly");
    formData.append("once_monthly", frequency.value === "once_monthly");
    formData.append("once", frequency.value === "once");
    formData.append("once_every", onceEvery);
    formData.append("time_zone", timeZone);
    formData.append("reportType", "our_data");
    formData.append("moduleName", moduleName.value.name);
    formData.append("report_format", reportFormat);
    formData.append("ToEmailId", toEmailId);
    formData.append("email_subject", emailSubject);
    formData.append("email_body", emailBody);
    formData.append("versionId", selectedDashboard.value.version_id);
    formData.append("dashboard_id", selectedDashboard.value.id);

    console.log("FormData contents:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    console.log("Total fields:", [...formData.entries()].length);

    try {
      setLoading(true);
      const response = await portReportSchedule(formData);
      if (response.status.includes("Scheduled successfully")) {
        FireAlert("Success", response.status, "success", "");
        handleReset()
      } else {
        FireAlert("Info", "Failed to schedule report export", "info");
      }
    } catch (error) {
      FireAlert("Info", "Failed to schedule report export", "info");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* first section of scheduler whihc is schedule eport export */}
      <div className="bg-[#095458]">
        <div className="max-w-[1400px] mx-auto">
          {/*heading*/}
          <div className=" pt-10">
            <h1 className="text-center text-2xl font-bold text-white">
              Schedule Report Export
            </h1>
            <h5 className="text-center text-sm text-white">
              Select from below options.
            </h5>
          </div>
          <div className="py-10 w-[95%] sm:w-[87%] mx-auto lg:flex justify-between">
            <div className="md:w-2/3 lg:w-1/2 max-lg:mx-auto">
              <div className=" flex gap-4">
                <div>
                  <h4 className="text-lg text-white mb-3  font-bold">
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
                  <h4 className="text-lg text-white mb-3  font-bold">
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
                  <h4 className="text-lg text-white my-3 font-bold">
                    Frequency
                  </h4>
                  <div className="max-sm:mr-1">
                    <Select
                        options={[
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
                    {/* <Dropdown
                      data={dropdownData2}
                      dropdownHandle1={handleDropdownChange1}
                    /> */}
                  </div>
                </div>
                {selectedDropdownValue !== "once" && (
                  <div className="flex items-end sm:px-4 py-3 sm:ml-5">
                    <span className="text-white max-sm:text-[10px]">
                      Once every
                    </span>
                    <input
                      type="number"
                      value={onceEvery}
                      onChange={(e) => setOnceEvery(e.target.value)}
                      disabled={selectedDropdownValue === "once"}
                      className="w-14 h-12 -mb-3 mx-3 p-2 rounded-md border "
                    />
                    <span className="text-white max-sm:text-[10px]">
                      Day(s)
                    </span>
                  </div>
                )}
              </div>
              <div>
                <div className="text-white my-3 text-lg font-bold">
                  Start Date-End Date
                </div>
                <div className="flex">
                  <div className="relative max-sm:w-1/2 max-sm:mr-2">
                    {labelVisible && (
                      <label
                        htmlFor="startDate"
                        className="absolute left-3 top-0.5 h-[90%] flex items-center text-xs sm:text-sm font-medium text-gray-700 w-[60%] bg-white"
                      >
                        Start Date
                      </label>
                    )}
                    <input
                      id="startDate"
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
                      onFocus={() => setLabelVisible(false)}
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
                    <input
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
                      onFocus={() => setLabelVisible2(false)}
                      min={startDate}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="text-white my-3 text-lg font-bold">
                  Schedule Time
                </div>
                <div className="flex">
                  {/* <div className="sm:flex max-sm:w-1/2 max-sm:mr-2">
                      <input
                        id=""
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full  sm:w-[200px] text-sm rounded-md max-sm:text-xs border mr-5 border-black shadow-sm px-4 py-3 pr-6 bg-white font-medium text-gray-700 hover:bg-gray-50"
                        style={{
                          backgroundImage: `url(${Clock})`,
                          backgroundPosition: "right 15px center",
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                    </div> */}
                  <div className="sm:flex max-sm:w-1/2  ">
                    <input
                      id=""
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full sm:w-[200px] text-sm rounded-md max-sm:text-xs border mr-5 border-black shadow-sm px-4 py-3  bg-white font-medium text-gray-700 hover:bg-gray-50"
                      style={{
                        backgroundImage: `url(${Clock})`,
                        backgroundPosition: "right 15px center",
                        backgroundRepeat: "no-repeat",
                      }}
                    />
                  </div>
                  <div className="w-full sm:flex max-sm:w-1/2  ">
                    <TimeZoneDropdown onTimezoneChange={handleTimezoneChange} />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="py-10 px-8 bg-[#008085] rounded-2xl  md:w-2/3 lg:w-1/3 mb-10 max-lg:mx-auto max-lg:mt-10"
              style={{ boxShadow: "0px 2px 3px black" }}
            >
              <div>
                <h2 className="text-lg text-white mb-3  font-bold">
                  Export Format
                </h2>

                <Dropdown2
                  data={dropDownData4}
                  dropdownHandle1={(value) => setReportFormat(value)}
                />
              </div>
              <div>{/* <div>{renderSelectedPage()}</div> */}</div>
              <div>
                <h3 className="text-sm text-white my-3  font-bold">Email</h3>
                <input
                  type="email"
                  name=""
                  id=""
                  value={toEmailId}
                  onChange={(e) => setToEmailId(e.target.value)}
                  className="w-full p-3 text-xs  rounded-md"
                  placeholder="Enter Email"
                />
              </div>
              <div>
                <h3 className="text-sm text-white my-3  font-bold">Message</h3>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full text-xs rounded-md h-[100px] p-2 placeholder-top-left"
                  placeholder="Message"
                />
              </div>
              <button
                // onClick={handleExport}

                disabled={loading}
                onClick={handleSubmit}
                className="bg-[#00acc1] w-full mt-4 py-2 text-white font-bold flex justify-center items-center rounded-md"
                style={{ boxShadow: "2px 2px 3px #00000040" }}
              >
                {loading ? (
                  <CircularProgress size={20} color="" thickness={6} />
                ) : (
                  <MdScheduleSend className="h-6 w-6" />
                )}
                <span className="ml-3">
                  {" "}
                  {loading ? "Submitting..." : "SUBMIT"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <DataRefresh />
      <SchedulerTable />
      {/* <DateModeling /> */}
    </>
  );
};

export const SchedulerTable = () => {
  const [selectedDropdownValue, setSelectedDropdownValue] = useState("");
  const [onceEvery, setOnceEvery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [time, setTime] = useState("");
  const [toNumDays, setToNumDays] = useState("");
  const [loading, setLoading] = useState(false);
  const [labelVisible, setLabelVisible] = useState(true);
  const [labelVisible2, setLabelVisible2] = useState(true);
  const [selectedOption, setSelectedOption] = useState("report"); // Added state for radio buttons

  const handleDropdownChange1 = (value) => setSelectedDropdownValue(value);
  const handleSubmit = () => {
    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      alert("Form submitted successfully!");
      setLoading(false);
    }, 2000);
  };

  const handleSave = () => {
    alert("Changes saved successfully!");
  };

  return (
    <div className="bg-[#095458]">
      <div className="max-w-[1400px] mx-auto">
        {/* Heading */}
        <div className="pt-10">
          <h1 className="text-center text-2xl font-bold text-white">
            Scheduler Table
          </h1>
          <h5 className="text-center text-sm text-white">
            Select from below options.
          </h5>
        </div>
        <div className="py-10 w-[95%] sm:w-[87%] mx-auto lg:flex justify-between">
          {/* Left Section */}
          <div className="md:w-2/3 lg:w-1/2 max-lg:mx-auto">
            {/* Frequency */}
            <div className="flex max-sm:justify-between">
              <div className="max-sm:w-1/2">
                <h4 className="text-lg text-white my-3 font-bold">Frequency</h4>

                <div className="max-sm:pr-1 flex">
                  <div className="min-w-[50%] max-w-[100%]">
                    <Dropdown
                      data={[
                        { value: "once", label: "Once" },
                        { value: "daily", label: "Daily" },
                      ]}
                      dropdownHandle1={handleDropdownChange1}
                    />
                  </div>
                  <div className=""></div>
                </div>
              </div>
              {selectedDropdownValue !== "once" && (
                <div className="flex items-end sm:px-4 py-3 sm:ml-5">
                  <span className="text-white max-sm:text-[10px]">
                    Once every
                  </span>
                  <input
                    type="number"
                    value={onceEvery}
                    onChange={(e) => setOnceEvery(e.target.value)}
                    disabled={selectedDropdownValue === "once"}
                    className="w-14 h-12 -mb-3 mx-3 p-2 rounded-md border"
                  />
                  <span className="text-white max-sm:text-[10px]">Day(s)</span>
                </div>
              )}
            </div>

            {/* Start Date - End Date */}
            <div>
              <div className="text-white my-3 text-lg font-bold">
                Start Date-End Date
              </div>
              <div className="flex">
                <div className="relative max-sm:w-1/2 mr-4">
                  {labelVisible && (
                    <label
                      htmlFor="startDate"
                      className="absolute left-3 top-0.5 h-[90%] flex items-center text-xs sm:text-sm font-medium text-gray-700 w-[60%] bg-white"
                    >
                      Start Date
                    </label>
                  )}
                  <input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full sm:w-[200px] text-sm rounded-md max-sm:text-[12px] border border-black px-4 py-3 bg-white"
                    min={moment().format("YYYY-MM-DD")}
                    onFocus={() => setLabelVisible(false)}
                    style={{
                      backgroundImage: `url(${Calendar})`,
                      backgroundPosition: "right 15px center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                </div>
                <div className="relative max-sm:w-1/2 mr-4">
                  {labelVisible2 && (
                    <label
                      htmlFor="endDate"
                      className="absolute left-3 top-0.5 h-[90%] flex items-center text-xs sm:text-sm font-medium text-gray-700 w-[60%] bg-white"
                    >
                      End Date
                    </label>
                  )}
                  <input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full sm:w-[200px] text-sm rounded-md max-sm:text-[12px] border border-black px-4 py-3 bg-white"
                    min={startDate}
                    onFocus={() => setLabelVisible2(false)}
                    style={{
                      backgroundImage: `url(${Calendar})`,
                      backgroundPosition: "right 15px center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Schedule Time */}
            <div>
              <div className="text-white my-3 text-lg font-bold">
                Schedule Time
              </div>
              <div className="flex">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full sm:w-[200px] text-sm rounded-md max-sm:text-xs border mr-5 border-black shadow-sm px-4 py-3  bg-white font-medium text-gray-700 hover:bg-gray-50"
                  style={{
                    backgroundImage: `url(${Clock})`,
                    backgroundPosition: "right 15px center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
                <TimeZoneDropdown onTimezoneChange={() => {}} />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div
            className="py-10 px-8 bg-[#008085] rounded-2xl md:w-2/3 lg:w-1/3 mb-10 max-lg:mx-auto max-lg:mt-10"
            style={{ boxShadow: "0px 2px 3px black" }}
          >
            {/* Radio Buttons */}
            <div>
              <h3 className="text-sm text-white mb-4 font-bold">
                Select Option
              </h3>
              <div className="flex items-center space-x-8">
                <label className="text-white">
                  <input
                    type="radio"
                    name="option"
                    value="report"
                    checked={selectedOption === "report"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="mr-2"
                  />
                  Report
                </label>
                <label className="text-white">
                  <input
                    type="radio"
                    name="option"
                    value="data-set"
                    checked={selectedOption === "data-set"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="mr-2"
                  />
                  Data-set
                </label>
              </div>
            </div>

            {/* Email Input */}
            <div>
              <h3 className="text-sm text-white my-6 font-bold">Num of Days</h3>
              <input
                type="text"
                value={toNumDays}
                onChange={(e) => setToNumDays(e.target.value)}
                className="w-full p-3 text-xs rounded-md"
                placeholder="Enter Num of Days"
              />
            </div>

            {/* Buttons */}
            <button
              className="bg-[#00acc1] w-full mt-4 py-2 text-white font-bold flex justify-center items-center rounded-md"
              style={{ boxShadow: "2px 2px 3px #00000040" }}
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-[#00acc1] w-full mt-4 py-2 text-white font-bold flex justify-center items-center rounded-md"
              style={{ boxShadow: "2px 2px 3px #00000040" }}
              onClick={handleSubmit}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" thickness={6} />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

//react component- admin manage
const AdminSchedulerManage = () => {
  const renderActionButtons = () => (
    <div className="flex gap-2 justify-center">
      <button className="text-blue-500">Edit</button>
      <button className="text-red-500">Delete</button>
    </div>
  );
  const tableData = [
    {
      id: 1,
      createdBy: "User A",
      report: "Sales Report",
      frequency: "Weekly",
      dateTime: "2024-12-20 14:00",
      mail: "usera@example.com",
      format: "PDF",
      message: "Success",
    },
    {
      id: 2,
      createdBy: "User B",
      report: "Inventory Report",
      frequency: "Monthly",
      dateTime: "2024-12-21 09:00",
      mail: "userb@example.com",
      format: "Excel",
      message: "Pending",
    },
    // Add more data as needed
  ];

  const tableColumns = [
    { field: "createdBy", headerName: "Created By" },
    { field: "report", headerName: "Report" },
    { field: "frequency", headerName: "Frequency" },
    { field: "dateTime", headerName: "Date Time" },
    { field: "mail", headerName: "Mail" },
    { field: "format", headerName: "Format" },
    { field: "message", headerName: "Message" },
  ];

  const handleDeleteRow = (ids) => {
    console.log("Deleted row IDs:", ids);
    // Add your delete logic here
  };

  const actionButtons = [
    {
      icon: EditNotifications,
      onClick: (row) => console.log("Edit clicked for:", row),
      tooltip: "Edit",
    },
    {
      icon: Delete,
      onClick: (row) => console.log("Delete clicked for:", row),
      tooltip: "Delete",
    },
  ];

  //second table
  const tableData2 = [
    {
      id: 1,
      createdBy: "John Doe",
      report: "Sales Report",
      frequency: "Daily",
      dateTime: "2024-12-20 10:00 AM",
      mail: "johndoe@example.com",
      format: "PDF",
      message: "Completed",
      yourDataSource: "SQL Server",
      yourApi: "api/v1/sales",
      competitorDataSource: "PostgreSQL",
      competitorApi: "api/v1/comp-sales",
    },
    {
      id: 2,
      createdBy: "Jane Smith",
      report: "Inventory Report",
      frequency: "Weekly",
      dateTime: "2024-12-21 2:00 PM",
      mail: "janesmith@example.com",
      format: "CSV",
      message: "Pending",
      yourDataSource: "MySQL",
      yourApi: "api/v1/inventory",
      competitorDataSource: "Oracle",
      competitorApi: "api/v1/comp-inv",
    },
    // Add more rows as needed
  ];

  // Columns for the table
  const tableColumns2 = [
    {
      field: "createdBy",
      headerName: "Created By",
    },
    {
      field: "report",
      headerName: "Report",
    },
    {
      field: "frequency",
      headerName: "Frequency",
    },
    {
      field: "dateTime",
      headerName: "Date Time",
      renderCell: (value) => (
        <>
          {/* <AccessTime style={{ marginRight: '0px' }} /> */}
          {value}
        </>
      ),
    },
    {
      field: "mail",
      headerName: "Mail",
      renderCell: (value) => (
        <>
          {/* <Email style={{ marginRight: '5px' }} /> */}
          {value}
        </>
      ),
    },
    { field: "format", headerName: "Format" },
    { field: "message", headerName: "Message" },
    {
      field: "yourDataSource",
      headerName: "Your Data Source",
      renderCell: (value) => (
        <>
          {/* <Source style={{ marginRight: '5px' }} /> */}
          {value}
        </>
      ),
    },
    {
      field: "yourApi",
      headerName: "Your API",
      renderCell: (value) => (
        <>
          {/* <Api style={{ marginRight: '5px' }} /> */}
          {value}
        </>
      ),
    },
    {
      field: "competitorDataSource",
      headerName: "Competitor Data Source",
      renderCell: (value) => (
        <>
          {/* <Source style={{ marginRight: '5px' }} /> */}
          {value}
        </>
      ),
    },
    {
      field: "competitorApi",
      headerName: "Competitor API",
      renderCell: (value) => (
        <>
          {/* <Api style={{ marginRight: '5px' }} /> */}
          {value}
        </>
      ),
    },
  ];

  // Action buttons for each row
  const actionButtons2 = [
    {
      icon: Edit,
      tooltip: "Edit Row",
      onClick: (row) => alert(`Edit row with ID: ${row.id}`),
    },
    {
      icon: DeleteOutline,
      tooltip: "Delete Row",
      onClick: (row) => alert(`Delete row with ID: ${row.id}`),
    },
  ];

  return (
    <>
      <div
        className="w-full mx-auto px-4"
        style={{ margin: "0 0", backgroundColor: "#095458" }}
      >
        <div className="pt-10">
          <h1 className="text-center text-2xl font-bold text-white">
            Scheduler Table
          </h1>
          <h5 className="text-center text-sm text-white">
            Select from below options.
          </h5>
        </div>
        <ReusableTable
          data={tableData}
          columns={tableColumns}
          onDeleteRow={handleDeleteRow}
          selectable={true}
          // actionButtons={actionButtons}
          cellStyles={{}}
          globalCellStyle={{ padding: "10px" }}
        />
        <br />
      </div>
      <div className="w-full mx-auto px-4" style={{}}>
        <div className="pt-10">
          <h1 className="text-center text-2xl font-bold  text-[#095458]">
            Scheduler Refersh Table
          </h1>
          <h5 className="text-center text-sm  text-[#095458]">
            Select from below options.
          </h5>
        </div>
        <ReusableTable
          data={tableData2}
          columns={tableColumns2}
          selectable={true}
          onDeleteRow={(ids) =>
            alert(`Deleted rows with IDs: ${ids.join(", ")}`)
          }
          // actionButtons={actionButtons2}
        />
        <br />
      </div>
      <div
        className="w-full mx-auto px-4"
        style={{ margin: "0 0", backgroundColor: "#095458" }}
      >
        <div className="pt-10">
          <h1 className="text-center text-2xl font-bold text-white">
            Data Refresh Table
          </h1>
          <h5 className="text-center text-sm text-white">
            Select from below options.
          </h5>
        </div>
        <ReusableTable
          data={tableData}
          columns={tableColumns}
          onDeleteRow={handleDeleteRow}
          selectable={true}
          // actionButtons={actionButtons}
          cellStyles={{}}
          globalCellStyle={{ padding: "10px" }}
        />
      </div>
    </>
  );
};

export default Main;

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
