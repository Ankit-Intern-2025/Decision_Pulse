// import Nav from "../components/detailedNav";
// import Dropdown from "../components/admin/dropdown";
// import Dropdown2 from "../components/admin/dropdown";
// import "../style/admin.css";
// import Calendar from "../resources/admin/Vector.png";
// import Clock from "../resources/admin/Vector2.png";
// import Circle from "../resources/admin/Polygon2.png";
// import image1 from "../resources/admin/image41.png";
// import image2 from "../resources/admin/image35.png";
// import image3 from "../resources/admin/Group.png";
// import image4 from "../resources/admin/image42.png";
// import image5 from "../resources/admin/image41(1).png";
// import image6 from "../resources/admin/excel_img.png";
// import image7 from "../resources/admin/csv_img.png";
// import image8 from "../resources/admin/image41_2.png";
// import image9 from "../resources/admin/Group1905.png";
// import Footer from "../components/detailedFooter";
// import TimeZoneDropdown from "../components/admin/timeZoneDropdown";
// import { useState, useRef } from "react";
// import { useEffect } from "react";
// import axios from "axios";
// import moment from "moment-timezone";

// const Main = () => {
//   const [selectedOption, setSelectedOption] = useState("none");
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const handleRadioChange = (event) => {
//     setDataRefresh((prevDataRefresh) =>
//       prevDataRefresh.map((item) =>
//         item.section ? { ...item, selectedOption: event.target.value } : item
//       )
//     );
//   };

//   //below for tab above dataRefresh radio selection box
//   const [dataRefresh, setDataRefresh] = useState([
//     {
//       sectionName: "your data",
//       section: true,
//       selectedOption: "none",
//     },
//     {
//       sectionName: "competitor data",
//       section: false,
//       selectedOption: "none",
//     },
//   ]);

//   const handleTabYourDataCompData = (index) => {
//     setSelectedIndex(index);
//     const updatedDataRefresh = dataRefresh.map((data, i) => ({
//       ...data,
//       section: i === index, // Make only the clicked section true
//     }));

//     setDataRefresh(updatedDataRefresh);
//   };
//   //above for tab above dataRefresh radio selection box

//   const [selectedDropdownValue, setSelectedDropdownValue] = useState("");
//   const [selectedDropdownValue1, setSelectedDropdownValue1] = useState("");

//   const handleDropdownChange = (value) => {
//     setSelectedDropdownValue(value);
//   };
//   const handleDropdownChange1 = (value) => {
//     setSelectedDropdownValue1(value);
//   };
//   const handleDropdownChange2 = (value) => {};
//   const handleDropdownChange3 = (value) => {};

//   const handleDropdownChange4 = (value) => {};

//   //   below data
//   const dropdownData = [
//     "Production/ Manufacturing",
//     "Supply Chain Management",
//     "Research & Development",
//     "Marketing & Brand Management",
//     "Human Resources",
//     "Sales",
//     "Procurement",
//     "Information Technology",
//     "Legal & Compilance",
//     "Finance",
//   ];
//   const dropdownData2 = ["Once a day", "Once a weekly", "Once a monthly"];
//   const dropdownData3 = ["Export as PPT", "Export as PDF"];
//   const timeDropdown = [
//     "(GMT-8:00) Pacific Time (US & Canada)",
//     "(GMT-5:00) Eastern Time (US & Canada)",
//     "(GMT+1:00) Central European Time",
//     "(GMT+5:30) Chennai, Kolkata, Mumbai, New Delhi",
//     "(GMT+8:00) Beijing, Hong Kong, Singapore",
//   ];

//   const radioData = [image1, image2, image3, image4, image5, image8];
//   const [labelVisible, setLabelVisible] = useState(true);
//   const [labelVisible2, setLabelVisible2] = useState(true);
//   const [labelVisible3, setLabelVisible3] = useState(true);
//   const [labelVisible4, setLabelVisible4] = useState(true);

//   useEffect(() => {
//     window.scrollTo(0, 0); // Scrolls to the top-left corner of the page
//   }, []);

//   const chartRef = useRef(null);

//   const [selectedFormat, setSelectedFormat] = useState("PDF");
//   const dropDownData4 = ["PDF", "PPT"];
//   const dropDownHandle = (format) => {
//     setSelectedFormat(format);
//   };

//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [time, setTime] = useState("");
//   const [timeZone, setTimeZone] = useState("");
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [frequency, setFrequency] = useState("once_daily");
//   const [onceEvery, setOnceEvery] = useState(1);
//   const [reportType, setReportType] = useState("our_data");
//   const [moduleName, setModuleName] = useState("");
//   const [selectedFileName, setSelectedFileName] = useState("");

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFileName(file.name);
//     } else {
//       setSelectedFileName("");
//     }
//   };

//   const handleTimezoneChange = (timezone) => {
//     setTimeZone(timezone);
//     console.log("Selected Timezone:", timezone);
//   };

//   const convertToUTC = (date, timeZone) => {
//     return moment.tz(date, timeZone).utc().format();
//   };

//   const handleSubmit = async () => {
//     setLoading(true);

//     if (!file) {
//       alert("Please select a file before submitting.");
//       return;
//     }
//     // Convert dates and time to UTC
  
//     const utcStartDate = moment.tz(startDate, timeZone).utc().format();
//     const utcEndDate = moment.tz(endDate, timeZone).utc().format();
//     const utcTime = time ? moment.tz(time, timeZone).utc().format() : null;

//     const formData = new FormData();
//     formData.append("start_date", utcStartDate);
//     formData.append("end_date", utcEndDate);
//     formData.append("time", utcTime);
//     formData.append("time_zone", timeZone);
//     formData.append("username", "admin");
//     formData.append("once_daily", frequency === "once_daily");
//     formData.append("once_weekly", frequency === "once_weekly");
//     formData.append("once_monthly", frequency === "once_monthly");
//     formData.append("once", frequency === "once");
//     formData.append("once_every", onceEvery);
//     formData.append("reportType", reportType);
//     formData.append("moduleName", moduleName);
//     if (file) formData.append("file", file);

//     console.log("FormData contents:");
//     for (const [key, value] of formData.entries()) {
//       console.log(`${key}:`, value);
//     }
//     console.log("Total fields:", [...formData.entries()].length);

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/insert-data-schedule",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       console.log(response.data);
//       alert(response.data.message);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to schedule data refresh. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="">
//         <Nav prop="Admin" />

//         <div className="bg-[#095458]">
//           <div className="max-w-[1400px] mx-auto">
//             <div className=" pt-10">
//               <h1 className="text-center text-2xl font-bold text-white">
//                 Schedule Report Export
//               </h1>
//               <h5 className="text-center text-sm text-white">
//                 Select from below options.
//               </h5>
//             </div>
//             <div className="py-10 w-[95%] sm:w-[87%] mx-auto lg:flex justify-between">
//               <div className="md:w-2/3 lg:w-1/2 max-lg:mx-auto">
//                 <div className="">
//                   <h4 className="text-lg text-white mb-3  font-bold">
//                     Select Report
//                   </h4>
//                   <div className="max-sm:pr-1 flex">
//                     <div className="min-w-[50%] max-w-[100%]">
//                       {/* <Dropdown
//                         data={dropdownData}
//                         dropdownHandle1={handleDropdownChange2}
//                       /> */}
//                       <Dropdown
//                         data={dropdownData}
//                         dropdownHandle1={(value) => setReportType(value)}
//                       />
//                     </div>
//                     <div className=""></div>
//                   </div>
//                 </div>
//                 <div className="flex max-sm:justify-between">
//                   <div className=" max-sm:w-1/2">
//                     <h4 className="text-lg text-white my-3  font-bold">
//                       Frequency
//                     </h4>
//                     <div className="max-sm:mr-1">
//                       {/* <Dropdown
//                         data={dropdownData2}
//                         dropdownHandle1={handleDropdownChange}
//                       /> */}
//                       <Dropdown
//                         data={dropdownData2}
//                         dropdownHandle1={(value) => setFrequency(value)}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex items-end sm:px-4 py-3 sm:ml-5">
//                     <span className="text-white  max-sm:text-[10px]">
//                       Once every
//                     </span>
//                     <input
//                       type="number"
//                       disabled={selectedDropdownValue === "Once a day"}
//                       className=" w-14 h-12 -mb-3 mx-3 p-2 rounded-md border border-black"
//                     ></input>
//                     <span className="text-white  max-sm:text-[10px]">
//                       Day(s)
//                     </span>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="text-white my-3 text-lg font-bold">
//                     Start Date-End Date
//                   </div>
//                   <div className="flex">
//                     <div className="relative max-sm:w-1/2 max-sm:mr-2">
//                       {labelVisible && (
//                         <label
//                           htmlFor="startDate"
//                           className="absolute left-3 top-0.5 h-[90%] flex items-center text-xs sm:text-sm font-medium text-gray-700 w-[60%] bg-white"
//                         >
//                           Start Date
//                         </label>
//                       )}
//                       <input
//                         id="startDate"
//                         type="date"
//                         // value={startDate}
//                         // onChange={(e) => setStartDate(e.target.value)}
//                         className="w-full sm:w-[200px] text-sm rounded-md max-sm:text-[12px] mr-5 border border-black shadow-sm px-4 py-3 pr-6 bg-white font-medium text-gray-700 hover:bg-gray-50 custom-date-input"
//                         style={{
//                           backgroundImage: `url(${Calendar})`,
//                           backgroundPosition: "right 15px center",
//                           backgroundRepeat: "no-repeat",
//                         }}
//                         onFocus={() => setLabelVisible(false)} // Hides label on focus
//                       />
//                     </div>

//                     <div className="relative max-sm:w-1/2">
//                       {labelVisible2 && (
//                         <label
//                           htmlFor="endDate"
//                           className="absolute left-3 top-0.5 h-[90%] flex items-center text-xs sm:text-sm font-medium text-gray-700 w-[60%] bg-white"
//                         >
//                           End Date
//                         </label>
//                       )}
//                       <input
//                         id="endDate"
//                         type="date"
//                         //       value={endDate}
//                         // onChange={(e) => setEndDate(e.target.value)}
//                         className="w-full sm:w-[200px] text-sm rounded-md max-sm:text-[12px]  border border-black shadow-sm px-4 py-3 pr-6 bg-white font-medium text-gray-700 hover:bg-gray-50 custom-date-input"
//                         style={{
//                           backgroundImage: `url(${Calendar})`,
//                           backgroundPosition: "right 15px center",
//                           backgroundRepeat: "no-repeat",
//                         }}
//                         onFocus={() => setLabelVisible2(false)} // Hides label on focus
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="text-white my-3 text-lg font-bold">
//                     Schedule Time
//                   </div>
//                   <div className="flex">
//                     <div className="sm:flex max-sm:w-1/2 max-sm:mr-2">
//                       <input
//                         id=""
//                         type="time"
//                         // value={time}
//                         // onChange={(e) => setTime(e.target.value)}
//                         className="w-full  sm:w-[200px] text-sm rounded-md max-sm:text-xs border mr-5 border-black shadow-sm px-4 py-3 pr-6 bg-white font-medium text-gray-700 hover:bg-gray-50"
//                         style={{
//                           backgroundImage: `url(${Clock})`,
//                           backgroundPosition: "right 15px center",
//                           backgroundRepeat: "no-repeat",
//                         }}
//                       />
//                     </div>
//                     <div className="w-full sm:flex max-sm:w-1/2  ">
//                       <TimeZoneDropdown data={timeDropdown} />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div
//                 className="py-10 px-8 bg-[#008085] rounded-2xl  md:w-2/3 lg:w-1/3 mb-10 max-lg:mx-auto max-lg:mt-10"
//                 style={{ boxShadow: "0px 2px 3px black" }}
//               >
//                 <div>
//                   <h2 className="text-lg text-white mb-3  font-bold">
//                     Export Format
//                   </h2>

//                   <Dropdown2
//                     data={dropDownData4}
//                     dropdownHandle1={dropDownHandle}
//                   />
//                 </div>
//                 <div id="Main">{/* <div>{renderSelectedPage()}</div> */}</div>
//                 <div>
//                   <h3 className="text-sm text-white my-3  font-bold">Email</h3>
//                   <input
//                     type="email"
//                     name=""
//                     id=""
//                     className="w-full p-3 text-xs  rounded-md"
//                     placeholder="Enter Email"
//                   />
//                 </div>
//                 <div>
//                   <h3 className="text-sm text-white my-3  font-bold">
//                     Message
//                   </h3>
//                   <textarea
//                     className="w-full text-xs rounded-md h-[100px] p-2 placeholder-top-left"
//                     placeholder="Message"
//                   />
//                 </div>
//                 <button
//                   // onClick={handleExport}
//                   className="bg-[#00acc1] w-full mt-4 py-2 text-white font-bold flex justify-center rounded-md"
//                   style={{ boxShadow: "2px 2px 3px #00000040" }}
//                 >
//                   <svg
//                     width="9"
//                     height="12"
//                     viewBox="0 0 9 12"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="my-auto"
//                   >
//                     <path
//                       d="M7.36875 4.625H6.375V1.5C6.375 1.15625 6.09375 0.875 5.75 0.875H3.25C2.90625 0.875 2.625 1.15625 2.625 1.5V4.625H1.63125C1.075 4.625 0.79375 5.3 1.1875 5.69375L4.05625 8.5625C4.3 8.80625 4.69375 8.80625 4.9375 8.5625L7.80625 5.69375C8.2 5.3 7.925 4.625 7.36875 4.625ZM0.125 10.875C0.125 11.2188 0.40625 11.5 0.75 11.5H8.25C8.59375 11.5 8.875 11.2188 8.875 10.875C8.875 10.5312 8.59375 10.25 8.25 10.25H0.75C0.40625 10.25 0.125 10.5312 0.125 10.875Z"
//                       fill="white"
//                     />
//                   </svg>
//                   <span className="ml-3">Download</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white">
//           <div className="max-w-[1400px] mx-auto">
//             <div className=" pt-10">
//               <h1 className="text-center text-2xl font-bold text-[#095458]">
//                 Schedule Data Refresh
//               </h1>
//               <h5 className="text-center text-sm text-black">
//                 Select from below options.
//               </h5>
//             </div>
//             <div className="py-10 w-[95%] sm:w-[87%] mx-auto lg:flex justify-between">
//               <div className="md:w-2/3 lg:w-1/2 max-lg:mx-auto">
//                 <div className="">
//                   <h4 className="text-lg  mb-3  font-bold">Select Report</h4>
//                   <div className="max-sm:pr-1 flex">
//                     <div className="min-w-[50%] max-w-[100%]">
//                       <Dropdown
//                         data={dropdownData}
//                         // dropdownHandle1={handleDropdownChange2}
//                         dropdownHandle1={(value) => setReportType(value)}
//                       />
//                     </div>
//                     <div className=""></div>
//                   </div>
//                 </div>
//                 <div className="flex max-sm:justify-between">
//                   <div className="max-sm:w-1/2">
//                     <h4 className="text-lg text-black my-3 font-bold">
//                       Frequency
//                     </h4>
//                     <div className="max-sm:mr-1">
//                       <Dropdown
//                         data={dropdownData2}
//                         dropdownHandle1={handleDropdownChange1}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex items-end sm:px-4 py-3 sm:ml-5">
//                     <span className="text-black max-sm:text-[10px]">
//                       Once every
//                     </span>
//                     <input
//                       type="number"
//                       value={onceEvery}
//                       onChange={(e) => setOnceEvery(e.target.value)}
//                       disabled={selectedDropdownValue === "Once a day"}
//                       className="w-14 h-12 -mb-3 mx-3 p-2 rounded-md border border-black"
//                     />
//                     <span className="text-black max-sm:text-[10px]">
//                       Day(s)
//                     </span>
//                   </div>
//                 </div>

//                 <div>
//                   <div className=" my-3 text-lg font-bold">
//                     Start Date-End Date
//                   </div>
//                   <div className="flex">
//                     <div className="relative max-sm:w-1/2 max-sm:mr-2">
//                       {labelVisible2 && (
//                         <label
//                           htmlFor="startDate1"
//                           className="absolute left-3 top-0.5 h-[90%] flex items-center text-xs sm:text-sm font-medium text-gray-700 w-[60%] bg-white"
//                         >
//                           Start Date
//                         </label>
//                       )}
//                       <input
//                         id="startDate1"
//                         type="date"
//                         value={startDate}
//                         onChange={(e) => setStartDate(e.target.value)}
//                         className="w-full sm:w-[200px] text-sm rounded-md max-sm:text-[12px] mr-5 border border-black shadow-sm px-4 py-3 pr-6 bg-white font-medium text-gray-700 hover:bg-gray-50 custom-date-input"
//                         style={{
//                           backgroundImage: `url(${Calendar})`,
//                           backgroundPosition: "right 15px center",
//                           backgroundRepeat: "no-repeat",
//                         }}
//                         onFocus={() => setLabelVisible2(false)}
//                       />
//                     </div>

//                     <div className="relative max-sm:w-1/2">
//                       {labelVisible4 && (
//                         <label
//                           htmlFor="endDate2"
//                           className="absolute left-3 top-0.5 h-[90%] flex items-center text-xs sm:text-sm font-medium text-gray-700 w-[60%] bg-white"
//                         >
//                           End Date
//                         </label>
//                       )}
//                       <input
//                         id="endDate2"
//                         type="date"
//                         value={endDate}
//                         onChange={(e) => setEndDate(e.target.value)}
//                         className="w-full sm:w-[200px] text-sm rounded-md max-sm:text-[12px]  border border-black shadow-sm px-4 py-3 pr-6 bg-white font-medium text-gray-700 hover:bg-gray-50 custom-date-input"
//                         style={{
//                           backgroundImage: `url(${Calendar})`,
//                           backgroundPosition: "right 15px center",
//                           backgroundRepeat: "no-repeat",
//                         }}
//                         onFocus={() => setLabelVisible4(false)}
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <div className=" my-3 text-lg font-bold">Schedule Time</div>
//                   <div className="flex">
//                     <div className="sm:flex max-sm:w-1/2  ">
//                       <input
//                         id=""
//                         type="time"
//                         value={time}
//                         onChange={(e) => setTime(e.target.value)}
//                         className="w-full sm:w-[200px] text-sm rounded-md max-sm:text-xs border mr-5 border-black shadow-sm px-4 py-3  bg-white font-medium text-gray-700 hover:bg-gray-50"
//                         style={{
//                           backgroundImage: `url(${Clock})`,
//                           backgroundPosition: "right 15px center",
//                           backgroundRepeat: "no-repeat",
//                         }}
//                       />
//                     </div>
//                     <div className="w-full sm:flex max-sm:w-1/2 max-sm:ml-2 ">
//                       {/* <TimeZoneDropdown data={timeDropdown} 
//                       dropdownHandle1={(value) => setTimeZone(value)}/> */}

//                       <TimeZoneDropdown
//                         onTimezoneChange={handleTimezoneChange}
//                       />
//                       {/* <p> {timeZone}</p> */}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {/* data source box below */}
//               <div className="md:w-2/3 lg:w-1/3 max-lg:mx-auto  max-lg:mt-10">
//                 <div className="flex">
//                   <button
//                     className={`px-6 py-2 rounded-tl-md ${
//                       dataRefresh[0].section ? "text-white" : "text-[#121212]"
//                     } text-sm ${
//                       dataRefresh[0].section ? "bg-[#095458]" : "bg-white"
//                     } w-[40%] ml-auto font-semibold border ${
//                       dataRefresh[0].section
//                         ? "border-black"
//                         : "border-gray-300"
//                     } border-b-0`}
//                     style={{
//                       boxShadow: dataRefresh[0].section
//                         ? "0px 0px 5px black"
//                         : "none",
//                     }}
//                     onClick={() => handleTabYourDataCompData(0)}
//                   >
//                     Your Data
//                   </button>
//                   <button
//                     className={`px-2 py-2 rounded-tr-md ${
//                       dataRefresh[1].section ? "text-white" : "text-[#121212]"
//                     } text-sm  ${
//                       dataRefresh[1].section ? "bg-[#095458]" : "bg-white"
//                     } font-semibold border ${
//                       dataRefresh[1].section
//                         ? "border-black"
//                         : "border-gray-300"
//                     } w-[40%] mr-auto ${
//                       dataRefresh[1].section ? "border-b-0" : ""
//                     }`}
//                     style={{
//                       boxShadow: dataRefresh[1].section
//                         ? "0px 0px 5px black"
//                         : "none",
//                     }}
//                     onClick={() => handleTabYourDataCompData(1)}
//                   >
//                     Competitor Data
//                   </button>
//                 </div>

//                 {/* below box */}
//                 <div
//                   className="py-10 px-8 bg-[#008085] rounded-2xl   mb-10 "
//                   style={{ boxShadow: "0px 2px 3px black" }}
//                 >
//                   <div>
//                     <h2 className="text-xl text-white mb-3 font-bold">
//                       Data Source
//                     </h2>
//                     <div className="grid grid-cols-2 gap-2">
//                       {radioData.map((data, ind) => {
//                         return (
//                           <div key={ind} className="flex items-center mb-2">
//                             <input
//                               type="radio"
//                               id={`option${ind}`}
//                               name="data-source"
//                               className="mr-2 custom-radio"
//                               value={`option${ind}`}
//                               onChange={handleRadioChange}
//                               checked={
//                                 dataRefresh[selectedIndex]?.selectedOption ==
//                                 `option${ind}`
//                               }
//                             />

//                             <label htmlFor={`option${ind}`} className="w-full">
//                               <div className="h-[44px] w-full bg-gray-100 rounded-lg flex justify-center items-center">
//                                 <img
//                                   src={data}
//                                   alt=""
//                                   draggable="false"
//                                   className="h-[44px] w-[154px] bg-gray-100 rounded-lg object-contain px-3 py-1 cursor-pointer"
//                                 />
//                               </div>
//                             </label>
//                           </div>
//                         );
//                       })}

//                       {/* Below: PDF & CSV */}
//                       <div className="flex items-center mb-2">
//                         <input
//                           type="radio"
//                           id="option6"
//                           name="data-source"
//                           className="mr-2 custom-radio"
//                           value="option6"
//                           key={6}
//                           // onChange={(e) => setFile(e.target.files[0])}
//                           onChange={handleRadioChange}
//                           checked={
//                             dataRefresh[selectedIndex]?.selectedOption ==
//                             `option6`
//                           }
//                         />
//                         <label htmlFor="option6" className="w-full">
//                           <div className="h-[44px] w-full bg-gray-100 rounded-lg flex justify-center items-center ">
//                             <img
//                               src={image6}
//                               alt=""
//                               draggable="false"
//                               className="h-[24px] w-[64px] object-contain cursor-pointer"
//                             />
//                           </div>
//                         </label>
//                       </div>

//                       <div className="flex items-center mb-2">
//                         <input
//                           type="radio"
//                           id="option7"
//                           name="data-source"
//                           className="mr-2 custom-radio"
//                           value="option7"
//                           key={7}
//                           onChange={handleRadioChange}
//                           checked={
//                             dataRefresh[selectedIndex]?.selectedOption ==
//                             `option7`
//                           }
//                         />
//                         <label htmlFor="option7" className="w-full">
//                           <div className="h-[44px]  bg-gray-100 rounded-lg flex justify-center items-center">
//                             <img
//                               src={image7}
//                               alt=""
//                               draggable="false"
//                               className="h-[24px] w-[64px] object-contain cursor-pointer"
//                             />
//                           </div>
//                         </label>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Conditionally rendering the API box */}
//                   {dataRefresh[selectedIndex].selectedOption != "none" &&
//                     dataRefresh[selectedIndex].selectedOption !== "option6" &&
//                     dataRefresh[selectedIndex].selectedOption !== "option7" && (
//                       <div>
//                         <h3 className="text-sm text-white my-3 font-bold">
//                           API
//                         </h3>
//                         <input
//                           type="text"
//                           className="w-full p-3 text-xs rounded-md"
//                           placeholder="Enter API key"
//                         />
//                       </div>
//                     )}
//                   {/* upload box */}
//                   {dataRefresh[selectedIndex].selectedOption != "none" &&
//                     (dataRefresh[selectedIndex].selectedOption === "option6" ||
//                       dataRefresh[selectedIndex].selectedOption ===
//                         "option7") && (
//                       <div className="mt-3">
//                         <div>
//                           <input
//                             type="file"
//                             id="fileUploader"
//                             // onChange={(e) => setFile(e.target.files[0])}
//                             onChange={(e) => {
//                               setFile(e.target.files[0]);
//                               setFileName(e.target.files[0]?.name || "");
//                             }}
//                             name="file"
//                             className="hidden"
//                             accept={
//                               dataRefresh[selectedIndex].selectedOption ===
//                               "option6"
//                                 ? ".xlsx, .xls" // Allow Excel files
//                                 : dataRefresh[selectedIndex].selectedOption ===
//                                   "option7"
//                                 ? ".csv" // Allow CSV files
//                                 : ""
//                             }
//                           />
//                           <label htmlFor="fileUploader">
//                             <img
//                               src={image9}
//                               alt="Upload file"
//                               draggable="false"
//                             />
//                           </label>
//                         </div>
//                         {fileName && (
//                           <p className="mt-2 text-sm text-white">
//                             Selected file: {fileName}
//                           </p>
//                         )}
//                       </div>
//                     )}

//                   <button
//                     disabled={loading}
//                     onClick={handleSubmit}
//                     className="bg-[#00acc1] w-full mt-4 py-2 text-white font-bold flex justify-center rounded-md"
//                     style={{ boxShadow: "2px 2px 3px #00000040" }}
//                   >
//                     {loading ? "Uploading..." : "SUBMIT"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     </>
//   );
// };
// export default Main;
