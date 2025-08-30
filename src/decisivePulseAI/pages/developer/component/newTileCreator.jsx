import React, { useEffect, useRef, useState } from "react";
import Nav from "../../../components/nav";
import Footer from "../../../components/footer";
import {
  Button,
  Card,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
  Typography,
  CardMedia,
  Modal,
} from "@mui/material";
import databg from "../assets/databg.png";
import { Link, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import ExistingDataSet from "./existingDataSet";
// import ETLPage from "../../etl/Pages/ETL/ETL";
import DateModeling from "../../../components/admin/DataModeling/DateModeling";

//images

import image1 from "../../../resources/admin/image41.png";
import image2 from "../../../resources/admin/image35.png";
import image3 from "../../../resources/admin/Group.png";
import image4 from "../../../resources/admin/image42.png";
import image5 from "../../../resources/admin/image41(1).png";
import image6 from "../../../resources/admin/excel_img.png";
import image7 from "../../../resources/admin/csv_img.png";
import image8 from "../../../resources/admin/image41_2.png";
import image9 from "../../../resources/admin/Group1905.png";
import image10 from "../../../resources/admin/image56.png";
import DetailedHomeCard from "../../detailedHomeCard";
import config from "../../../../utils/config";
import { FireAlert, FireAlertWithCallback } from "../../../../utils/static_func";
import { useDispatch, useSelector } from "react-redux";
import { UseContext } from "../../../../context/ContextProvider";
import { IoCloseSharp } from "react-icons/io5";
import { createDashboard, postApplyModeling } from "../../../../http/dashboard_api";
import { selectDashboard } from "../../../../store/dashboardSlice";


const NewTileCreator = () => {
  // const {setIframeData} = UseContext()
  const navigate = useNavigate()
  const location = useLocation()
  const {module_id} = useParams()
  const [selectedOption, setSelectedOption] = useState("existing");
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getTitleByPath = (path) => {
    return "Data Collection";
  };

  const iframeRef = useRef(null);

  const handleMessage = (event) => {
    // Optionally check event.origin for security
    if (event.data.type === "DATA_FROM_IFRAME") {
      setIframeData(event.data.data);
      sessionStorage.setItem("etlData", JSON.stringify(event.data.data))
      console.log("Data received from iframe:", event.data.data); //one more thing comes here
      // navigate(
      //   `/home/${module_id}/new-tile-create/new/modelling`
      // );
      toggleModal()
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  //for dashboard name detail pop up
  const {handleLoader, iframeData, setIframeData} = UseContext()
  const authState = useSelector((state) => state.auth);
  const { user } = authState;
  const dispatch = useDispatch()
  const modulesList = useSelector(state=>state.auth.modules)
  const [postData, setPostData] = useState(null);
  const [userInput, setUserInput] = useState({
      title:"",
      description:""
    })
  const [showModal, setShowModal] = useState(false)
  const toggleModal = ()=>setShowModal(prev=>!prev)
  const handleInputChange = (e)=>{
    const {name, value} = e.target
    setUserInput(prev=>({...prev, [name]:value}))
  }
  const handleSubmitModeling = async (e)=>{
      e.preventDefault()
      toggleModal()
      handleLoader(true, "Generating your Dashboard, Please wait..")
      try{
        // const requestApplyModeling = {
        //   "version": iframeData.version_id,
        //   "connections":postData||[]
        // }
        // console.log("Ifra result pot modelling: ", iframeRef.)
        // const response1 = await postApplyModeling()
        // console.log("apply modeling response", response1)
        const request = {
          "title": userInput.title,
          "description": userInput.description,
          "owner_id": user.userId,
          "department_id": modulesList.find(module=>module.name===module_id).id,
          "version_id": iframeData.version_id,
          "datasource_id": iframeData.datasourceId,
          "connected_nodes": postData||[],
          "db_name": module_id
        }
        const response = await createDashboard(request)
        if(response.id){
          dispatch(selectDashboard(response))
          sessionStorage.setItem("selectedDashboard", JSON.stringify({...response, module_id:module_id}))
          navigate(`/overview/${module_id}/${response.id}`)
        }else{
          FireAlertWithCallback("Information", "Unable to create dashboard, please try again", "info", "", toggleModal)
        }
        console.log(response)
      }catch(err){
        console.log(err)
      }finally{
        handleLoader(false,"")
      }
      console.log(postData)
    }

  return (
    <>
      {/* Navigation */}
      {(!location.pathname.includes("detail")) ? (<Nav title={getTitleByPath(location.pathname)} />) : <></>}

      {/* Content Section */}
      <div style={{ flexGrow: 1 }}>
        <Routes>
          <Route index element={<FirstPage selectedOption={selectedOption} handleRadioChange={handleRadioChange} iframeRef={iframeRef} />} />
          <Route path="/existing" element={<ExistingDataSet />} />
          <Route path="/new" element={<ETLPage iframeRef={iframeRef} />} />
          <Route path={`/existing/modelling`} element={<DateModeling />} />
          {/* <Route path={`/new/modelling`} element={<DateModeling />} />
          <Route path={`/existing/detail`} element={<DetailedHomeCard />} /> */}
          <Route path={`/new/detail`} element={<DetailedHomeCard />} />
        </Routes>
      </div>

      {/*Pop up for dashboard name and detail */}
      <Modal keepMounted open={showModal}/* onClose={toggleModal}*/>
        <div
          style={{
            transform: "translate(-50%, -50%)",
            outline: "none",
          }}
          className="mx-auto rounded-md gap-3 w-[600px] bg-[#D9D9D9] flex justify-start flex-col items-start p-4 absolute top-[50%] left-[50%]"
        >
          <div className='border-b-2 w-full pb-2 font-bold text-center mb-4'>Dashboard Details</div>
          <form 
            className="flex flex-col items-start gap-3 w-full"
            onSubmit={handleSubmitModeling}
          >
            <div className='flex flex-col gap-1 w-full'>
              <label className='font-bold text-sm text-black'>Dashboard Title</label>
              <input placeholder='Enter Dashboard Name' className='w-full rounded-md px-2 py-2 bg-white outline-none' type='text' name='title' value={userInput.title} required onChange={handleInputChange}/>
            </div>
            <div className='flex flex-col gap-1 w-full'>
              <label className='font-bold text-sm text-black'>Description</label>
              <textarea placeholder='Enter Description' className='w-full rounded-md px-2 py-2 outline-none placeholder-' type='text' name='description' rows={3} value={userInput.description} required onChange={handleInputChange}/>
            </div>
            <div className='flex justify-center w-full mt-3'>
              <button className='px-5 py-2 text-sm bg-[#095458] text-white flex gap-2 items-center hover:bg-[#153d3f]' type='submit'>Submit</button>
            </div>
          </form>
          {/* <span className='absolute top-3 right-3 cursor-pointer' onClick={toggleModal}>
            <IoCloseSharp className='text-gray-600 hover:text-black h-5 w-5 ' />
          </span> */}
        </div>
      </Modal>

      {/* Footer */}
      {(!location.pathname.includes("detail")) ? (<Footer className="bg-[#016064] text-white" />) : <></>}
    </>

  );
};

const ETLPage = ({ iframeRef }) => {
  const {iframeMessage, handleLoader} =  UseContext()
  const handleOnloadIframe = ()=>{
    setTimeout(() => {
      const messageInSession = JSON.parse(sessionStorage.getItem("imsg"))
      if(iframeMessage){
        iframeRef.current.contentWindow.postMessage(iframeMessage, config.ETL_URL);
        
      }else if(messageInSession){
        iframeRef.current.contentWindow.postMessage(messageInSession, config.ETL_URL);
      }else{
      }
      handleLoader(false, "")
    }, 1000);
  }
  useEffect(()=>{
    handleLoader(true, "Loading ETL, Please Wait...")
    return()=>sessionStorage.removeItem("imsg")
  },[])
  return (
    <iframe
      ref={iframeRef}
      src={config.ETL_URL}
      title="Iframe App"
      style={{ width: '100%', height: '932px', border: 'none' }}
      onLoad={handleOnloadIframe}
    />
  )
}

const DataSourceComponent = ({ files, setFiles, inputValues, setInputValues, selectedTab, setSelectedTab, selectedRadio, setSelectedRadio }) => {
  const [loading, setLoading] = useState(false);
  const [yourFileName, setYourFileName] = useState({ your_data: "", competitor_data: "" }); // Track the uploaded file for your data
  const radioData = [
    { img: image1, name: "databricks" },
    { img: image2, name: "sqlserver" },
    { img: image3, name: "snowflake" },
    { img: image4, name: "saphana" },
    { img: image5, name: "msfabric" },
    { img: image8, name: "teradata" },
    { img: image10, name: "sharepoint" },
    { img: image6, name: "excel" },
    { img: image7, name: "csv" },
  ];

  const handleTabChange = (tabName) => {
    setSelectedTab(tabName); // Change tab
  };

  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value); // Set the selected radio value
  };

  const handleYourDataUpload = (e) => {
    const { name, files } = e.target
    if (files[0]) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        setFiles(prev => ({ ...prev, [name]: base64 }));
        console.log('Base64 String:', base64);
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };

      reader.readAsDataURL(files[0]); // Read the file as Data URL (Base64 encoded)
    }
    setYourFileName(prev => ({ ...prev, [name]: files[0]?.name })); // Store the name of the uploaded file for your data

    // Store the name of the uploaded file for your data
  };


  const handleUpload = () => {
    // Your upload logic
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInputValues(prev => {
      return {
        ...prev,
        [selectedTab?.value]: {
          ...prev[selectedTab?.value],
          [selectedRadio]: {
            ...prev[selectedTab?.value][selectedRadio],
            [name]: value
          }
        }
      }
    })
  }
  const tabNames = [{ name: "Your Data", value: "your_data" }, { name: "Competitor Data", value: "competitor_data" }]
  return (
    <div className="flex justify-center pt-5">
      <div className="w-[94%] sm:w-2/3 lg:w-2/3 max-lg:mx-auto max-lg:mt-10">
        {/* Tab Buttons */}
        <div className="flex items-center justify-center">
          {tabNames?.map((dataType, index) => {
            return (
              <button
                key={index}
                className={`px-6 py-2 rounded-${index === 0 ? "tl" : "tr"}-md text-sm w-1/2  ${selectedTab?.value === dataType.value ? "bg-white text-black" : "bg-[#095458] text-white"} md:w-[20%] font-semibold border border-black border-b-0`}
                style={{ boxShadow: "0px 0px 5px black" }}
                onClick={() => handleTabChange(dataType)} // Change tab to Your Data
              >
                {dataType.name}
              </button>
            )
          })}
        </div>

        {/* Data Source Section */}
        <div className="py-10 px-8 bg-[#008085] rounded-2xl mb-4" style={{ boxShadow: "0px 2px 3px black" }}>
          <div>
            <div className="flex mb-6 justify-between">
              <h2 className="text-xl text-white mb-3 font-bold">Data Source</h2>
              {/* <button className="bg-[#00acc1] mt-8 py-2 text-white font-bold flex justify-center rounded-md px-8" style={{ boxShadow: "2px 2px 3px #00000040" }}>
                {loading ? "Uploading..." : "PUBLISH"}
              </button> */}
            </div>

            {/* Radio Button Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {radioData.map((data, ind) => (
                <div key={ind} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={`option${ind}`}
                    name="data-source"
                    className="mr-2 custom-radio"
                    value={data.name} // Set radio value as the name of the data source
                    onChange={handleRadioChange} // Update selected radio on change
                    checked={selectedRadio === data.name} // Check if this radio is selected
                  />
                  <label htmlFor={`option${ind}`} className="w-full">
                    <div className="h-[44px] w-full bg-gray-100 rounded-lg flex justify-center items-center">
                      <img
                        src={data.img}
                        alt={data.name}
                        draggable="false"
                        className="h-[44px] w-[154px] bg-gray-100 rounded-lg object-contain px-3 py-1 cursor-pointer"
                      />
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Conditional File Upload for the selected radio data */}
          {selectedRadio === "excel" || selectedRadio === "csv" ? (
            // File upload for "excel" or "csv" radio options
            <div className="mt-5 lg:w-1/3 mx-auto">
              <div>
                <div>
                  <label htmlFor="dataUploader">
                    <img
                      src={image9} // Assuming image9 is your upload icon
                      alt="Upload Your Data"
                      draggable="true"
                      className="cursor-pointer"
                    />
                  </label>
                  <input
                    type="file"
                    id="dataUploader"
                    className="hidden"
                    accept=".xlsx, .xls, .csv"
                    name={selectedTab?.value}
                    onChange={handleYourDataUpload}
                  />
                  {yourFileName?.[selectedTab?.value] && (
                    <span className="block text-white text-sm mt-2">
                      {yourFileName?.[selectedTab?.value]}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : selectedRadio !== null ? (
            // Text input for other radio options
            <div className="mt-5 lg:w-1/3 mx-auto flex flex-col gap-3">
              <input
                type="text"
                className="w-full py-2 px-4 rounded-md border border-gray-300"
                placeholder="Enter API"
                value={inputValues?.[selectedTab?.value]?.[selectedRadio]?.api || ""}
                name="api"
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="w-full py-2 px-4 rounded-md border border-gray-300"
                placeholder="Enter Link"
                value={inputValues?.[selectedTab?.value]?.[selectedRadio]?.link || ""}
                name="link"
                onChange={handleInputChange}
              />
            </div>
          ) : (
            <></>
          )
          }

          {/* Submit Button */}
          {/* <div className="flex gap-3 justify-center">
            <button
              className="bg-[#00acc1] mt-8 py-2 text-white font-bold flex justify-center rounded-md px-8"
              style={{ boxShadow: "2px 2px 3px #00000040" }}
              onClick={() => handleUpload()}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-4">
                  Uploading...
                </span>
              ) : (
                "SUBMIT"
              )}
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

const FirstPage = ({ selectedOption, handleRadioChange, iframeRef }) => {
  const {handleLoader, setIframeMessage} = UseContext()
  const [files, setFiles] = useState({ your_data: "", competitor_data: "" })
  const [inputValues, setInputValues] = useState({ your_data: {}, competitor_data: {} })
  const [selectedTab, setSelectedTab] = useState({ name: "Your Data", value: "your_data" });
  const [selectedRadio, setSelectedRadio] = useState(null);
  const radioData = [{ label: "Existing Data", value: "existing" }, { label: "New Data Set", value: "new" }];
  const { module_id } = useParams();
  const navigate = useNavigate()
  const authState = useSelector((state) => state.auth);
  const { isLoggedIn, user } = authState;

  const postMessageToEtl = (message) => {
    navigate(`/home/${module_id}/new-tile-create/${selectedOption}`);
    setIframeMessage(message)
    sessionStorage.setItem("imsg", JSON.stringify(message))
    // setTimeout(() => {
    //   iframeRef.current.contentWindow.postMessage(message, config.ETL_URL);
    // }, 1000);
  }
  const handleUpload = async () => {
    handleLoader(true, "Uploading Your Data, Please Wait")
    try {
      // Create FormData
      const formData = new FormData();
      if (files.your_data) formData.append("our_data", files.your_data);
      if (files.competitor_data) formData.append("competitor_data", files.competitor_data);
      if (module_id) formData.append('module_type', module_id)
      // POST request to API
      const response = await fetch(`${config.BASE_URL}/upload/`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (response.ok && result.message) {
        navigate(`/home/${module_id}/new-tile-create/${selectedOption}`);
        FireAlert("Success", "Analytics Generated Successfully.", "success")

      } else {
        FireAlert("Info", "Upload failed. Please check the data or try again.", "info")
        console.error("API Response Error:", result);
      }
    } catch (error) {
      FireAlert("Info", "Failed to upload data. Please try again.", "error")
      console.error("Error:", error);
    } finally {
      handleLoader(false, "")
    }
  };
  const handleButtonClick = () => {
    if (selectedOption === "new") {
      let message = {
        "process_name": module_id,
        "data_name": "our_data",
        "data_source": selectedRadio,
        "user_id": user.userId,
        "email_id": user.email,
        "from_decison_ai": true
      }
      // postMessageToEtl(message)



      if (selectedRadio === "excel" || selectedRadio === "csv") {

        message["data"] = {
          "file": files.your_data
        }
        postMessageToEtl(message)
      } else if (selectedRadio !== null) {
        message["data"] = inputValues["your_data"][selectedRadio]
        postMessageToEtl(message)
      } else {
        FireAlert("Information", "Please Select Data", "info")
      }
    } else {
      navigate(`/home/${module_id}/new-tile-create/${selectedOption}`);
    }
  };

  return (
    <div
      className={`flex flex-col min-h-[86.2vh] ${selectedOption === radioData[0].value ? "justify-center" : ""
        }`}
      style={{
        fontFamily: "Poppins, sans-serif",
        background: `linear-gradient(to bottom, #095458 ${selectedOption === radioData[0].value ? "100%" : "50%"
          }, white 50%)`,
      }}
    >
      {selectedOption !== radioData[0].value &&
        <DataSourceComponent
          files={files}
          setFiles={setFiles}
          inputValues={inputValues}
          setInputValues={setInputValues}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          selectedRadio={selectedRadio}
          setSelectedRadio={setSelectedRadio}
        />
      }

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        <Card
          sx={{
            display: "flex",
            borderRadius: "24px",
            backgroundColor: "#ffffff",
            border: "2px solid #095357",
          }}
        >
          {/* Left Image Section */}
          <Box className="flex" sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              sx={{ width: "344px", margin: "8px", padding: "4px" }}
              image={databg}
              alt="Data collection background"
            />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "0",
                transform: "translate(10%, -50%)",
                color: "white",
                textAlign: "start",
                padding: "8px",
                borderRadius: "8px",
                maxWidth: "90%",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Data Collection
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Select from side options
              </Typography>
            </Box>
          </Box>

          {/* Right Content Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flex: 1,
              gap: "16px",
              margin: "24px",
            }}
          >
            {/* Radio Buttons */}
            <FormControl component="fieldset">
              <RadioGroup
                value={selectedOption}
                onChange={handleRadioChange}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                {radioData.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option.value}
                    control={<Radio />}
                    label={
                      <Box
                        sx={{
                          height: "44px",
                          width: "144px",
                          backgroundColor:
                            selectedOption === option.value ? "#00ACC1" : "#F5F5F5",
                          borderRadius: "8px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: "bold",
                          cursor: "pointer",
                          border: "1px solid #ccc",
                          color: selectedOption === option.value ? "white" : "black",
                        }}
                      >
                        {option.label}
                      </Box>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>

            {/* Next Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#00ACC1",
                color: "white",
                borderRadius: "8px",
                padding: "4px 8px",
                width: "240px",
                height: "48px",
                marginTop: "8px",
                alignSelf: "center",
                fontFamily: "poppins",
              }}
              onClick={handleButtonClick}
            >
              Next
            </Button>
          </Box>
        </Card>
      </Box>
    </div>
  )
};

const response = {
  "status": "success",
  "datasourceId": "87170a66-52bc-42b7-8fd7-4a97e1f7d71d",
  "version_id": "489a3f4d-95bd-49f0-b9a0-155646951328_20250324071323",
  "response": {
    "data": {
      "id": "489a3f4d-95bd-49f0-b9a0-155646951328_489a3f4d-95bd-49f0-b9a0-155646951328_20250324071323",
      "user_id": "489a3f4d-95bd-49f0-b9a0-155646951328",
      "version": "489a3f4d-95bd-49f0-b9a0-155646951328_20250324071323",
      "data": {
        "results": {
          "anomaly_analysis": {
            "anomalies_insights": [
              "Countries labeled 'africa' and 'america' have higher recorded poverty levels, suggesting a focus area for market interventions.",
              "The 'india' entry indicates significantly lower poverty levels, presenting potential for revenue growth in lower poverty regions.",
              "The low variance in 'id' with few unique identifiers could suggest potential data entry or categorization improvements.",
              "The concentration of data points in the 'south' region indicates a regional bias that could affect market strategies."
            ],
            "plot_recommendation": {
              "plot": [
                {
                  "kind": [
                    "Bar",
                    "Pie"
                  ],
                  "type": {
                    "xAxis": [
                      "country"
                    ],
                    "yAxis": [
                      {
                        "name": "poverty"
                      }
                    ]
                  }
                },
                {
                  "kind": [
                    "Scatter",
                    "Bubble"
                  ],
                  "type": {
                    "xAxis": [
                      "id"
                    ],
                    "yAxis": [
                      {
                        "name": "poverty"
                      }
                    ]
                  }
                },
                {
                  "kind": [
                    "Bar",
                    "Line"
                  ],
                  "type": {
                    "xAxis": [
                      "country"
                    ],
                    "yAxis": [
                      {
                        "name": "id"
                      }
                    ]
                  }
                },
                {
                  "kind": [
                    "Bar",
                    "Pie"
                  ],
                  "type": {
                    "xAxis": [
                      "region"
                    ],
                    "yAxis": [
                      {
                        "name": "poverty"
                      }
                    ]
                  }
                }
              ]
            }
          },
          "diagnostic_analysis": {
            "our_data": [
              "- The sales data indicates significant market engagement in 'south' regions, as 80% of entries originate from there, potentially signaling a zone of concentrated market activity.",
              "- High poverty levels in certain regions are prominent, with a skewed distribution that may suggest a potential market challenge if poverty impacts purchasing power.",
              "- Despite differing regions, there are no detected strong correlations between 'poverty' and 'id', potentially indicating varied marketing and sales approaches' effects on regional sales.",
              "- The presence of duplicate 'id' entries hints at potential data entry errors or unique identifier assignment problems, potentially muddying customer tracking efforts.",
              "- Poverty scores clustering at the high end suggest market penetration in areas with consistent poverty challenges, possibly impacting product pricing strategies and promotions.",
              "- An observed anomaly in the 'id' column, indicated by isolation forest outliers, suggests inconsistencies in customer segmentation or data recording processes that need addressing.",
              "- The variance between regions ('south' vs. 'east') could indicate regional market dynamics or discrepancies in marketing strategy effectiveness, requiring tailored promotional plans.",
              "- The significant variance in poverty scores indicates variable economic conditions across regions, which may necessitate differentiated pricing or promotional offers.",
              "- The absence of missing values per column, including 'country' and 'region,' emphasizes data completeness, yet strategic insights are constrained by the small sample size.",
              "- Economic growth insights from market research align with technological advancement trends in accounting, but these transformations might not be reflected adequately in the sales data analyzed."
            ]
          },
          "predictive_analysis": {
            "error": "No datetime columns found in the dataset."
          },
          "descriptive_analysis": {
            "plot_recommendation": {
              "plot": [
                {
                  "kind": [
                    "bar",
                    "stacked-bar"
                  ],
                  "type": {
                    "xAxis": [
                      "country"
                    ],
                    "yAxis": [
                      {
                        "name": "poverty"
                      }
                    ]
                  }
                },
                {
                  "kind": [
                    "horizontal-bar"
                  ],
                  "type": {
                    "xAxis": [
                      "region"
                    ],
                    "yAxis": [
                      {
                        "name": "poverty"
                      }
                    ]
                  }
                },
                {
                  "kind": [
                    "grouped-bar"
                  ],
                  "type": {
                    "xAxis": [
                      "country",
                      "region"
                    ],
                    "yAxis": [
                      {
                        "name": "poverty"
                      }
                    ]
                  }
                },
                {
                  "kind": [
                    "treeMap"
                  ],
                  "type": {
                    "xAxis": [
                      "country"
                    ],
                    "yAxis": [
                      {
                        "name": "id"
                      }
                    ]
                  }
                },
                {
                  "kind": [
                    "column"
                  ],
                  "type": {
                    "xAxis": [
                      "region"
                    ],
                    "yAxis": [
                      {
                        "name": "id"
                      }
                    ]
                  }
                },
                {
                  "kind": [
                    "polar-area"
                  ],
                  "type": {
                    "xAxis": [
                      "country"
                    ],
                    "yAxis": [
                      {
                        "name": "id"
                      }
                    ]
                  }
                }
              ]
            }
          },
          "url_relevance_scores": {
            "https://app.billcloud.in/": 0.020390917822687447,
            "https://billaccounting.com/": 0.1818846163111547,
            "https://in.linkedin.com/company/bill-cloud": 0.10717303749065117,
            "https://www.cbinsights.com/company/bill-cloud": 0.05309503020343208,
            "https://ijsi.in/articles/cloud-based-accounting/": 0.13737773353276342,
            "https://www.raseedapp.com/in/cloud-accounting-software-india/": 0.12165848145831902,
            "https://www.invensis.net/blog/top-accounting-companies-in-india": 0.1845062318898113,
            "https://www.inventiva.co.in/trends/cloud-based-accounting-2024/": 0.17188887904132716,
            "https://ijsi.in/wp-content/uploads/2024/12/18.02.022.20230801.pdf": 0.0056371225748679905,
            "https://www.inventiva.co.in/trends/accounting-softwares-india-2024/": 0.1575906032636148,
            "https://billaccounting.com/why-outsource-bookkeeping-services-to-india/": 0.12040224407843747,
            "https://billaccounting.com/uk-accounting-outsourcing-companies-in-india/": 0.14600606732888255,
            "https://vjmglobal.com/blog/india-accounting-outsourcing-foreign-business/": 0.14715312663278518,
            "https://markwideresearch.com/india-accounting-professional-services-market/": 0.15652705568917594,
            "https://www.icaew.com/technical/by-country/south-asia/india/accounting-in-india": 0.033986627560655104,
            "https://insightconsultants.co/offshoring-accounting-india-a-comprehensive-guide/": 0.1789737804686629,
            "https://counts.ac/blog/9-emerging-trends-shaping-the-future-of-accounting-in-india/": 0.18061745600338897,
            "https://www.6wresearch.com/industry-report/india-accounting-software-market-outlook": 0.21394579002799965,
            "https://www.theceo.in/blogs/the-accounting-industry-in-india-a-comprehensive-overview": 0.25518449741396687,
            "https://www.thecompanycheck.com/company/bill-cloud-private-limited/U72900PN2013PTC148702": 0.024106606511185593,
            "https://www.mordorintelligence.com/industry-reports/india-accounting-professional-services-market": 0.2018243089314638,
            "https://www.linkedin.com/pulse/india-accounting-software-market-analysis-forecast-manasi-bandichode": 0.18232111184999752,
            "https://bcasonline.org/BCAJ%20Golden%20Content%202018-19/Articles/Jul%202018/23%20-%2036%20Accounting%20Past%20present.pdf": 0.013928084651354119,
            "https://www.caclubindia.com/articles/how-cloudbased-accounting-software-is-transforming-tax-audit-compliance-in-india-53235.asp": 0.12088090953714066,
            "https://www.globenewswire.com/news-release/2024/10/01/2955987/0/en/India-Accounting-Software-Research-Report-2024-5-75-Bn-Market-Trends-Regional-Insights-Competitive-Landscape-Forecasts-Opportunities-2020-2030.html": 0.2049735309423373
          },
          "prescriptive_analysis": {
            "prescriptive_data": [
              "Globally, the finance and accounting market is projected to grow with a CAGR of 8-10% by 2025, while our data shows a mean poverty index of 84 with specific regions underperforming. Competitors like Bill Cloud have shown significant growth with revenue increasing by 20.48%. Therefore, we should aim to improve our market presence by enhancing our product offerings and targeting high-growth regions to achieve a similar growth rate of at least 10% annually.",
              "Remote work adoption soared during COVID-19, rising from 40% to 83% globally. However, our regional data shows limited diversity with 'south' dominating at 80%. Competitors in the sector have leveraged remote work to tap into a broader talent pool. We should, therefore, enhance our recruitment strategy to include remote positions and aim for a more balanced regional workforce distribution.",
              "Technological adoption is key, with 36% of companies shifting to cloud-based solutions. Meanwhile, we noted no strong technological adoption signals in our EDA. Our competitors invest heavily in technology to improve services, as seen with US firms spending $1.1 billion on blockchain. We should invest a similar percentage of our revenue on technology to modernize our operations.",
              "Competitors like Bill Cloud show a profit growth of 125.15%, leveraging outsourcing strategies. Globally, outsourcing has led to up to 75% operational cost savings. We should explore strategic partnerships for outsourcing to reduce costs and aim for a profit growth increase of at least 100% over the next fiscal years.",
              "The demand for custom reports is high, with 80% of clients seeking tailor-made insights. Our current offerings do not emphasize bespoke solutions. Observing this market trend, we should develop customized consultancy services aiming to capture at least 30% of this growing demand market.",
              "Despite our lack of strong correlations in data, the market shows a promising outlook for cloud-based accounting solutions. Bill Cloud's financial success indicates a strategic shift. We should, therefore, plan to transition a significant portion, approximately 30%, of our services to cloud platforms in the next year to stay competitive.",
              "Perceptive transformation is evident with 90% of accountants anticipating industry change. However, our data shows a skewness implying resistance to change. We should launch awareness and training programs for our workforce to embrace industry shifts, with a target to increase our adaptive change score by 50%.",
              "Market valuation insights indicate substantial growth for technology-integrated services. Our histogram of 'poverty' suggests potential areas of development. Aligning with global trends, we should diversify our portfolio to include services like cloud telephony, aiming for a 15% market share in new tech-driven segments.",
              "Competitor analysis reveals Bill Cloud achieved an EBITDA growth of 316.28%. Our outlier management, particularly in the 'poverty' category, remains suboptimal. By focusing on outlier reduction strategies and enhancing efficiencies, we should target improvements in EBITDA by a minimum of 250% as achieved by competitors.",
              "Globally, accounting services markets especially in India are expanding, whereas our country data shows limited presence in high-growth areas like India. To capitalize on the 5-10% segment growth, we should increase our market penetration in India by 20% through targeted marketing and service localization strategies."
            ],
            "framework_analysis": {
              "MECE": "The MECE (Mutually Exclusive, Collectively Exhaustive) framework aids in segmenting business challenges in a non-overlapping and inclusive manner. In the context of the accounting industry's digital transformation, it helps distinctively categorize elements like technology adoption, market trends, and operational challenges without overlap, ensuring comprehensive coverage. For instance, cloud computing, AI integration, and blockchain usage can be assessed independently, while collectively capturing the digital shift, training needs, and security factors as whole categorical groups, offering a complete view of industry dynamics.",
              "PESTEL analysis": "The PESTEL analysis provides a structured evaluation of macro-environmental factors impacting the accounting industry's operation in India. Politically, government policies supporting digital initiatives foster growth, while economically, the projected sector growth at a CAGR of 8.5% speaks to strong financial prospects. Socioculturally, the shift towards remote and hybrid work influences operational models and workforce management. Technologically, rapid advancements in cloud accounting, AI, and blockchain are transformative, albeit entailing challenges related to staff training and security. Environmentally, the digital shift decreases carbon footprint by reducing paper usage. Legally, compliance with international data protection standards is necessary, driven by increased data dependency and cloud technologies in use. Such an extensive assessment enables strategic planning and informed decision-making.",
              "Porter's Five Forces": [
                "Threat of New Entrants: The accounting industry's adoption of cloud-based solutions and AI creates a moderate barrier as these technologies require significant investment, yet they also offer opportunities for new players with innovative solutions.",
                "Bargaining Power of Suppliers: As technological platforms proliferate, suppliers of cloud and AI systems hold a moderate power; yet, the competitive landscape tempers their strength due to multiple alternative options.",
                "Bargaining Power of Buyers: With a plethora of cloud accounting solutions, buyers have significant bargaining power, driving firms to innovate and enhance value offerings to retain clientele.",
                "Threat of Substitute Products or Services: The digital proliferation means high susceptibility to technological substitutes like AI-driven and blockchain-enabled solutions, necessitating continuous evolution and adoption.",
                "Industry Rivalry: The market is highly competitive, characterized by rapid technological advancements. Companies face intense rivalry, pushing them to enhance service quality and differentiation to capture market share."
              ]
            }
          }
        },
        "metadata": {
          "industry": "Accounting ** India ** http://www.billcloud.in/",
          "main_data_source": "DataFrame",
          "analysis_timestamp": "2025-03-24T07:13:24.509290",
          "competitor_data_source": "None"
        }
      }
    },
    "message": "Analysis saved successfully"
  },
  "message": "Data successfully loaded into container from transformed_data."
} 

export default NewTileCreator;