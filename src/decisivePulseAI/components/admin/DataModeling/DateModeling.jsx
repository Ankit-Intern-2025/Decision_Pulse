import React, { useEffect, useState } from 'react'
import FlowDashboard from './components/FlowDashboard'
import icon1 from './resources/Group.png'
import icon2 from './resources/icons8-sheet-80 1.png'
import icon3 from './resources/image 58.png'
import PropertiesTab from './components/PropertiesTab'
import DataTab from './components/DataTab'
import { getApi } from '../../../../lib/postApi'
import { useNavigate, useParams } from 'react-router-dom'
import { createDashboard, postApplyModeling } from '../../../../http/dashboard_api'
import { UseContext } from '../../../../context/ContextProvider'
import { Modal } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { FireAlert, FireAlertWithCallback } from '../../../../utils/static_func'
import { selectDashboard } from '../../../../store/dashboardSlice'
import { IoCloseSharp } from "react-icons/io5";

const DateModeling = ({ classNameStyle }) => {
  const {handleLoader, iframeData, setIframeData} = UseContext()
  const modulesList = useSelector(state=>state.auth.modules)
  const navigate = useNavigate()
  const { module_id } = useParams();
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const { user } = authState;
  const [flowData, setFlowData] = useState({ nodes: [], edges: [] });
  const [postData, setPostData] = useState(null);
  const [userInput, setUserInput] = useState({
    title:"",
    description:""
  })

  
  const [globalSchemaData, setGlobalSchemaData] = useState(null);
  const [loadingTables, setLoadingTables] = useState(true)

  const getSchema = async (data) => {
    handleLoader(true, "Getting Transformed data, please wait")
    // const datasourceId = '29a0b4a3-f32a-45d8-953c-647beb03c770';
    const datasourceId = data.datasourceId;
    const url = `/etl/get-schema/${datasourceId}`;
    setLoadingTables(true)
    try{
      const response = await getApi(url)
      console.log(response)

      setGlobalSchemaData(response);
      const transformedData = transformGlobalSchemaToFlowData(JSON.parse(response.schema));
      console.log("Transformed Flow Data:", transformedData);
      setFlowData(transformedData);
      FireAlert("Success","Data Extracted Successfully", "success")
    }catch(err){
      setGlobalSchemaData(null)
      console.log(err)
      FireAlert("Information", err?.response?.data?.detail||err.message, "info", )
    }finally{
      setLoadingTables(false)
      handleLoader(false, "")
    }
  }
  useEffect(() => {
    // const transformedData = transformGlobalSchemaToFlowData(schemaString);
    // console.log("Transformed Flow Data:", transformedData);
    // setFlowData(transformedData);
    // setLoadingTables(false)
    // console.log(iframeData)
    if(iframeData?.datasourceId){
      setTimeout(() => {
        getSchema(iframeData);
      }, 1000);
    }else{
      const dataFromEtl = JSON.parse(sessionStorage.getItem("etlData"))
      if(dataFromEtl){
        setIframeData(dataFromEtl)
        setTimeout(() => {
          getSchema(dataFromEtl)
        }, 1000);
      }else{
        setLoadingTables(false)

      }
    }
  }, []); 
  

  function transformGlobalSchemaToFlowData(globalSchemaData) {
    const nodes = [];
    const edges = [];
    let nodeIdCounter = 1;
  
    // Hash map to group tables by column names
    const columnMap = {};
  
    // Step 1: Create nodes and populate the columnMap
    Object.keys(globalSchemaData).forEach((tableName, index) => {
      const tableColumns = globalSchemaData[tableName];
      // const nodeId = `${nodeIdCounter++}`;
  
      // Add the table node with deterministic positions
      nodes.push({
        id: tableName,
        position: { x: 400 * index, y: 100 * index },
        data: {
          name: tableName,
          columns: tableColumns.map((col) => col.column_name),
        },
        type: "table",
      });
  
      // // Populate columnMap
      // tableColumns.forEach((column) => {
      //   const columnName = column.column_name;
      //   if (!columnMap[columnName]) {
      //     columnMap[columnName] = [];
      //   }
      //   columnMap[columnName].push({
      //     tableId: nodeId,
      //     tableName:tableName,
      //     columnName,
      //     handleId: `handle-${nodeId}-${columnName}`,
      //   });
      // });
    });
  
    // Step 2: Create edges based on columnMap
    // Object.keys(columnMap).forEach((columnName) => {
    //   const matches = columnMap[columnName];
    //   if (matches.length > 1) {
    //     // Connect all tables with the same column name
    //     for (let i = 0; i < matches.length; i++) {
    //       for (let j = i + 1; j < matches.length; j++) {
    //         edges.push({
    //           id: `e-${matches[i].tableName}-${columnName}-${matches[j].tableName}-${columnName}`,
    //           source: `${matches[i].tableName}`,
    //           target: `${matches[j].tableName}`,
    //           sourceHandle: `${matches[i].tableName}-${columnName}`,
    //           targetHandle: `${matches[j].tableName}-${columnName}`,
    //           style: { stroke: "#095458" }, // Optional: Edge styling
    //           type: 'step', 
    //         });
    //       }
    //     }
    //   }
    // });
    return { nodes, edges }; // Return nodes and edges
  }
  

  const tabs = [
    { icon: icon1, hoverText: "Dashboard" },
    { icon: icon2, hoverText: "Data Table" },
    { icon: icon3, hoverText: "Modeling" },
  ];
  const [selectedTab, setSelectedTab] = useState(tabs[2]);
  const [isOpenProperties, setIsOpenProperties] = useState(true);
  const [isOpenData, setIsOpenData] = useState(true);

  const toggleProperties = () => {
    setIsOpenProperties((prev) => !prev);
  };

  const toggleData = () => {
    setIsOpenData((prev) => !prev);
  };
  const handleSubmitModeling = async (e)=>{
    e.preventDefault()
    toggleModal()
    handleLoader(true, "Generating your Dashboard, Please wait..")
    try{
      const requestApplyModeling = {
        "version": iframeData.version_id,
        "connections":postData||[]
      }
      const response1 = await postApplyModeling(requestApplyModeling)
      console.log("apply modeling response", response1)
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

  const handleInputChange = (e)=>{
    const {name, value} = e.target
    setUserInput(prev=>({...prev, [name]:value}))
  }
  const [showModal, setShowModal] = useState(false)
  const toggleModal = ()=>setShowModal(prev=>!prev)
  return (
    <div className={`${classNameStyle ? classNameStyle : "bg-[#095458]"} `}>
      <div className="max-w-[1400px] mx-auto">
        <div className="pt-10">
          <h1
            className={`text-center text-2xl font-bold ${
              classNameStyle ? "text-[#006064]" : "text-white"
            }`}
          >
            Modeling
          </h1>
          <h5 className={`text-center text-sm ${
              classNameStyle ? "text-[#006064]" : "text-white"
            }`}>
            Select from below options.
          </h5>
        </div>
        <div className="py-10 pb-12 w-[95%] sm:w-[100%] min-h-[89vh] xl:min-h-[850px] mx-auto lg:flex justify-between">
          <div className="bg-[#007A7F] rounded-2xl p-4 w-full">
            <div className="bg-white rounded-2xl w-full h-full flex">
              <div
                className="h-full border w-14 bg-[#F3F2F1] rounded-tl-lg rounded-bl-lg px-1 py-8 flex flex-col items-start justify-start gap-4"
                style={{ border: "1px solid #A9A9A9" }}
              >
                {tabs.map((data, index) => (
                  <div
                    className="cursor-pointer px-1 h-5 flex items-center justify-center"
                    style={{
                      borderLeft: `${
                        selectedTab.hoverText === data.hoverText
                          ? "2px solid #007A7F"
                          : "2px solid transparent"
                      }`,
                    }}
                    key={index}
                    onClick={() => setSelectedTab(data)}
                  >
                    <img
                      src={data.icon}
                      alt={data.hoverText}
                      className="h-4 w-4 object-contain"
                    />
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-2xl w-full h-full flex">
              {!loadingTables ? (
                <FlowDashboard
                  initialNodes={flowData.nodes}
                  initialEdges={flowData.edges}
                  setPostData={setPostData}
                />
              ) : (
                <div>Loading...</div>
              )}
            </div>
              <PropertiesTab
                isOpen={isOpenProperties}
                toggleTab={toggleProperties}
              />
              <DataTab isOpen={isOpenData} toggleTab={toggleData} />
            </div>
          </div>
        </div>
        <div className="flex justify-end pb-16">
          <button
            className="py-2 px-6 bg-[#00ACC1] text-white rounded-md hover:bg-[#0097A7] transition-colors duration-300"
            onClick={toggleModal}
          >
            Submit
          </button>
        </div>
      </div>
      <Modal keepMounted open={showModal} onClose={toggleModal}>
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
          <span className='absolute top-3 right-3 cursor-pointer' onClick={toggleModal}>
            <IoCloseSharp className='text-gray-600 hover:text-black h-5 w-5 ' />
          </span>
        </div>
      </Modal>
    </div>
  );
};




export default DateModeling