import React, { useEffect, useRef, useState } from 'react'
import CustomTab from './components/CustomTab'
import { FaChartBar, FaFilter, FaLock, FaRegBookmark, FaUnlock } from 'react-icons/fa'
import { BsBarChartFill, BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs'
import { LuSquareMousePointer } from 'react-icons/lu'
import { useDrag, useDrop } from 'react-dnd'
import { buttonTypesArray, chartTypesArray,shapesData } from '../../../../utils/constants'
import CustomAccordian from './components/CustomAccordian'
import { FaXmark } from 'react-icons/fa6'
import ChartVisualsTools from './components/chart/ChartVisualsTools'
import Bookmarks from './Bookmarks'
import Selection from './components/Selection'
import { UseDescriptiveContext } from '../../../../context/DescriptiveProvider'
import CardVisualTools from './components/card/CardVisualTools'
import ShapeVisualizationTool from './components/shapes/ShapesVisualization'
import { getDataByXyKey } from '../../../../http/dashboard_api'
import { useParams } from 'react-router-dom'
import { UseContext } from '../../../../context/ContextProvider'
import { CircularProgress } from '@mui/material'
import GeneralVisualTools from './components/generalVisuals/generalVisualTools'
import ButtonVisualizationTools from './components/button/ButtonVisualizationTools'
// import {ClipPath} from "../../../style/clipPath"
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoIosArrowDown } from 'react-icons/io'

const CustomVisuals = ({recreatePageContent, fetchBookmarks, handleAddbookmarks, handleBookmarkNameChange, handleRemoveBookmark, handleUpdateBookmark, navigateToPage}) => {
    const {plotRecommendation, selectedPlot, setPlotRecommendation, handleIsDraggable, isDraggable, filter, isLoadingFilter, pages} = UseDescriptiveContext()
    const {setDashboardData} = UseContext()
    const {module_id} = useParams()
    const [selectedShape, setSelectedShape] = useState(null);
    const handleShapeClick = (shape) => {
      setSelectedShape(shape);
  };

    const tabs = [
        {name:"filters", label:"Filters", isOpen:false, icon:FaFilter},
        {name:"visualization", label:"Visualization", isOpen:false, icon:BsBarChartFill},
        {name:"fields", label:"Fields", isOpen:false, icon:FaChartBar},
        {name:"selection", label:"Selection", isOpen:false, icon:LuSquareMousePointer },
        {name:"bookmarks", label:"Bookmarks", isOpen:false, icon:FaRegBookmark},
    ]
    
    const [selectedTab, setSelectedTab] = useState([])
      const handleToggleTab = (tab)=>{
        if(selectedTab.includes(tab.name)){
            setSelectedTab(prev=>{
                return prev.filter(item=>item!==tab.name)
            })
        }else{
            setSelectedTab(prev=>{
             return [tab.name, ...prev]
            })
        }
      }
      

      const changeChartType = (selectedChartType)=>{
        if(plotRecommendation?.[selectedPlot]){
          setPlotRecommendation((prev)=>{
            const tempData = [...prev]
            tempData[selectedPlot].kind = selectedChartType.kind
            return tempData
          })
        }
      }
      const [loadingAxises, setLoadingAxises] = useState(false)
      const handleGetData = async (xAxis, yAxis, aggregation)=>{
        try{
          setLoadingAxises(true)
          const plot_recommendation = [[{ kind :["grouped-bar"], type:{ "xAxis": [ xAxis ], "yAxis": yAxis }, "aggregation":aggregation}]]
          const dashboardDetail = JSON.parse(sessionStorage.getItem("selectedDashboard"))
          const tempRequest = {filters:[], plot_recommendation:plot_recommendation}
          const response = await getDataByXyKey(module_id, tempRequest, dashboardDetail.version_id, dashboardDetail.owner_id)
          if (response.data) {
            setDashboardData(prev=>{
              const tempData = [...prev]
              tempData[selectedPlot] = response.data[0]
              return tempData
            })
          } else {
    
          }
        }catch(err){
          console.log(err)
        }finally{
          setLoadingAxises(false)
        }
      }
      const handleSetXyKey = (dataKey, acceptName) => {
        // Update the plot recommendation with the new shape or data
        setPlotRecommendation((prev) => {
          const tempData = [...prev];
          if (acceptName === 'x-axis') {
            tempData[selectedPlot]['xKey'] = dataKey;
            if(tempData[selectedPlot]['yKeys'].length>0){
              handleGetData(dataKey, tempData[selectedPlot]['yKeys'])
            }
          } else if (acceptName === 'y-axis') {
            // tempData[selectedPlot]['yKeys'][0] = {name:dataKey};
            // if(tempData[selectedPlot]['xKey']){
            //   handleGetData(tempData[selectedPlot]['xKey'], dataKey)
            // }
            tempData[selectedPlot]['yKeys'].push({name:dataKey}) 
            if(tempData[selectedPlot]['xKey']){
              handleGetData(tempData[selectedPlot]['xKey'], tempData[selectedPlot]['yKeys'])
            }
          } else if (acceptName === 'shapes') {
            // Handle the case when a shape is dropped
            tempData[selectedPlot].shapes = tempData[selectedPlot].shapes || [];
            tempData[selectedPlot].shapes.push(dataKey);
          }
      
          return tempData;
        });
      };

      
      
      const ChartPaletteItem = ({ data }) => {
        const [, drag] = useDrag(() => ({
          type: data.type.toUpperCase(),
          item: {...data},
        }));
        return (
          <div
            ref={drag}
            className='w-8 h-8'
            style={{
              cursor: 'move',
            }}
            onClick={()=>changeChartType(data)}
          >
            {data.img?
              <img 
                className={`w-8 h-8 object-contain ${plotRecommendation?.[selectedPlot]?.kind?.[0]===data.kind[0]?"border-2 border-[#095458]":""} bg-gray-200 p-1 rounded-md`} 
                src={data.img} 
                title={data.title} 
                alt={data.title} 
              />
              :
              <data.icon title={data.title} className="w-8 h-8 bg-gray-200 p-1 rounded-md" />
            }
          </div>
        );
      };
      const ChartButtons = ({data}) => {
        const [, drag] = useDrag(() => ({
          type: 'BUTTON',
          item: data,
        }));
        return (
          <div
            ref={drag}
            className='w-8 h-8'
            style={{
              cursor: 'move',
            }}
          >
            {data.icon && 
              <data.icon title={data.title} className={`w-8 h-8 bg-gray-200 p-1 rounded-md ${plotRecommendation?.[selectedPlot]?.title===data.title?"border-2 border-[#095458]":""}`} />
            }
            {data.img &&
              <img 
                className={`w-8 h-8 object-contain bg-gray-200 p-1 rounded-md ${plotRecommendation?.[selectedPlot]?.title===data.title?"border-2 border-[#095458]":""}`} 
                src={data.img} 
                title={data.title} 
                alt={data.text} 
              />
            }
          </div>
        );
      };

      const ChartShapes = ({ data }) => {
        const [, drag] = useDrag(() => ({
          type: 'SHAPE',
          item: { type: 'shape', ...data },
        }));
      
        const clipPaths = {
      
          diamond: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        
        };
        return (

          <div ref={drag} className="w-8 h-8 relative">
          
              <div
                className="w-8 h-8  p-1"
                style={{ clipPath: clipPaths[data.shape] || clipPaths.square }}
              >
             <div
                         className="w-[100%] h-[100%] bg-blue-700 flex items-center justify-center"
                      
                         
                         style={{
                           clipPath: data.clipPath 
                         }}
                       >
              </div>
              </div>
        
          
          </div>
        );
      };

        const DropZone = ({children, accept, acceptName}) => {
          const [{ canDrop, isOver }, drop] = useDrop(() => ({
            accept: accept,
            drop: (item) => handleSetXyKey(item.dataKey, acceptName),
            collect: (monitor) => ({
              isOver: monitor.isOver(),
              canDrop: monitor.canDrop(),
            }),
          }));
          const isActive = canDrop && isOver
          let backgroundColor = 'bg-transparent'
          if (isActive) {
            backgroundColor = 'bg-gray-200'
          } else if (canDrop) {
            backgroundColor = 'bg-gray-300'
          }
          return (
            <div
              ref={drop}
              className={`w-full h-[100%] border ${backgroundColor}  border-dashed border-gray-500 p-1`}
            >
              {children}
            </div>
          );
        };
        
          const DragItems = ({ dataKey, type, children }) => {
            const [, drag] = useDrag(() => ({
              type: type,
              item: {dataKey:dataKey},
            }));
            return (
              <div
                ref={drag}
                style={{
                  border: '1px solid #ccc',
                  cursor: 'move',
                }}
              >
                {children}
              </div>
            );
          };
    
          const removeYAxisKey = (itemKey, axis)=>{
            setPlotRecommendation((prev)=>{
              const tempData = [...prev]
              const filteredData = tempData[selectedPlot][axis].filter(data=>data.name!==itemKey)
              tempData[selectedPlot][axis] = filteredData
              if(filteredData.length!==0){
                handleGetData(tempData[selectedPlot]['xKey'], tempData[selectedPlot]['yKeys'])
              }
              return tempData
            })
          }
          const removeXAxisKey = (itemKey, axis)=>{
            setPlotRecommendation((prev)=>{
              const tempData = [...prev]
              tempData[selectedPlot][axis] = ""
              return tempData
            })
          }
    const [selectedTabVisuals, setSelectedTabVisuals] = useState("Add Data")
    const handleSetTabVisuals = (tabName)=>{
        setSelectedTabVisuals(tabName)
    }
    const [isSelectedPlot, setIsSelectedPlot] = useState(false)
    useEffect(()=>{ 
      if(selectedPlot!==""){
        setIsSelectedPlot(true)
      }else{
        setIsSelectedPlot(false)
      }
    },[selectedPlot])

    useEffect(() => {
      if (selectedShape && selectedPlot) {
          setPlotRecommendation((prev) => {
              const tempData = [...prev];
              tempData[selectedPlot].shape = selectedShape;
              return tempData;
          });
      }
  }, [selectedShape, selectedPlot, setPlotRecommendation]);
  const yAxisRef = useRef(null)
  const [selectedCustType, setSelectedCustType] = useState("Visual")
  const [selectedYDrop, setSelectedYdrop] = useState({})
  const handleOpenDrop = (yAxis)=>{
    setSelectedYdrop(yAxis)
  }
  const applyCalculation = (calcName, item)=>{
    setSelectedYdrop({})
    if(plotRecommendation[selectedPlot]['xKey']){
      handleGetData(plotRecommendation[selectedPlot]['xKey'], plotRecommendation[selectedPlot]['yKeys'], calcName.value)
    }
  }
  const handleCloseDrop = (event)=>{
    setSelectedYdrop(prev=>{
      if (prev?.name && yAxisRef.current && !yAxisRef.current.contains(event.target)) {
        return{}
      }else{
        return prev
      }
    })
   
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleCloseDrop)
    return ()=> document.removeEventListener("mousedown", handleCloseDrop)
  }, []);
  const static_aggregation = [
    {value:"minimum",name:"Minimum"},
    {name:"Maximum"},
    {value:"sum",name:"Sum"},
    {value:"average",name:"Average"},
    {value:"median",name:"Median"},
  ]
  return (
    <div className='flex relative z-[11] text-sm '>
        
        <div className='flex h-full'>
        {selectedTab.includes("filters") &&
            <CustomTab
                toggleTab={()=>handleToggleTab(tabs[0])}
                className=""
                name="filters"
                header="Filters"
                icon={<FaFilter />}
                containerClass=""
            >
                <div>Filters Here</div>
            </CustomTab>
        }
         {selectedTab.includes("visualization") &&
            <CustomTab
                toggleTab={()=>handleToggleTab(tabs[1])}
                className=""
                name="visualization"
                header="Visualization"
                icon={<BsBarChartFill />}
                containerClass=""
            >
              
              <>
                <div className='flex justify-around items-center mb-4 py-3 border-b border-gray-400'>
                    <div onClick={()=>handleSetTabVisuals("Add Data")} className={`p-2 ${selectedTabVisuals==="Add Data"?"bg-gray-300":""}  rounded-md hover:bg-gray-200 cursor-pointer`}>
                        <BsBarChartFill className='h-6 w-6' />
                    </div>
                    <div onClick={()=>handleSetTabVisuals("Build Visuals")} className={`p-2 ${selectedTabVisuals!=="Add Data"?"bg-gray-300":""}  rounded-md hover:bg-gray-200 cursor-pointer`}>
                        <FaChartBar className='h-6 w-6' />
                    </div>
                </div>
                {selectedTabVisuals === "Add Data" ?
                    <>
                      <CustomAccordian
                          header={"Charts"}
                          className="flex flex-col gap-2 px-3 py-2 bg-gray-100"
                          containerClass="w-52"
                      >
                        <div style={{ flex: 1 }}>
                            <div className='flex flex-wrap gap-2 px-2'>
                                {chartTypesArray.map((data, i) => (
                                    <ChartPaletteItem key={i} data={data} />
                                ))}
                            </div>
                        </div>
                      </CustomAccordian>
                      <CustomAccordian
                          header={"Buttons"}
                          className="flex flex-col gap-2 px-3 py-2 bg-gray-100"
                          containerClass="w-52"
                      >
                        <div style={{ flex: 1 }}>
                            <div className='flex flex-wrap gap-2 px-2'>
                                {buttonTypesArray.map((data, i) => (
                                    <ChartButtons key={i} data={data} />
                                ))}
                            </div>
                        </div>
                      </CustomAccordian>
                      <CustomAccordian
                          header={"Shapes"}
                          className="flex flex-col gap-2 px-3 py-2 bg-gray-100"
                          containerClass="w-52"
                      >
                        <div style={{ flex: 1 }}>
                          <div className="flex flex-wrap gap-2 px-2">
                            {shapesData.map((data, i) => (
                              <ChartShapes
                                key={i}
                                data={data}
                                selectedPlot={selectedPlot}
                                setPlotRecommendation={setPlotRecommendation}
                              />
                            ))}
                          </div>
                        </div>
                      </CustomAccordian>
                        
                        
                        {plotRecommendation?.[selectedPlot]?.type==="chart" &&
                            <div className='flex flex-col gap-2 px-4 mt-4 text-sm'>
                                <div className='flex flex-col gap-2 '>
                                    <span className='font-bold'>X-Axis</span>
                                    <DropZone accept="axis-key" acceptName="x-axis">
                                        {   plotRecommendation?.[selectedPlot]?.xKey
                                            ?
                                            (
                                              <span className="px-2 rounded-sm border text-sm bg-gray-300 flex items-center justify-between">
                                                <span
                                                  title={plotRecommendation?.[selectedPlot]?.xKey}
                                                >
                                                    {plotRecommendation?.[selectedPlot]?.xKey.length>14?plotRecommendation?.[selectedPlot]?.xKey.slice(0,14)+"..":plotRecommendation?.[selectedPlot]?.xKey}
                                                </span>
                                                {loadingAxises? 
                                                  <CircularProgress size={15} thickness={10} />
                                                  :
                                                  <FaXmark 
                                                    className='cursor-pointer hover:bg-gray-400 rounded-xl' 
                                                    onClick={()=>removeXAxisKey(plotRecommendation?.[selectedPlot]?.xKey, "xKey")}
                                                  />

                                                }
                                              </span>
                                            
                                            )
                                            :(<span className='cursor-pointer' onClick={()=>handleToggleTab(tabs[2])}>Add Fields x-axis</span>)
                                        }
                                    </DropZone>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <span className='text-sm font-bold'>Y-Axis</span>
                                    <DropZone accept="axis-key" acceptName="y-axis">

                                        {   plotRecommendation?.[selectedPlot]?.yKeys?.length>0
                                            ?
                                            (
                                              <div ref={yAxisRef} className='flex flex-col'>
                                                {  plotRecommendation?.[selectedPlot]?.yKeys.map((item, i)=>{
                                                  return (
                                                    <span className="px-2 rounded-sm border text-sm bg-gray-300 flex items-center justify-between" key={i}>
                                                      <span title={item.name}>{item.name.length>14?item.name.slice(0,14)+"..":item.name}</span>
                                                      {loadingAxises? 
                                                        <CircularProgress size={15} thickness={10} />
                                                        :
                                                        <span className='flex gap-1 items-center justify-end relative'>
                                                          <IoIosArrowDown  className='cursor-pointer hover:bg-gray-400 rounded-xl' onClick={()=>handleOpenDrop(item)} />
                                                            {selectedYDrop?.name === item?.name && 
                                                              <span className='absolute bg-gray-300 text-sm flex flex-col gap-2 rounded-sm py-2 bottom-0 h-48 w-40'>
                                                                {static_aggregation.map((data)=>{
                                                                  return(
                                                                    <span onClick={()=>applyCalculation(data, item)} className='cursor-pointer hover:bg-gray-400 px-3 py-1' key={data.name}>{data.name}</span>
                                                                  )
                                                                })}
                                                              </span>
                                                            }
                                                          <FaXmark 
                                                            className='cursor-pointer hover:bg-gray-400 rounded-xl' 
                                                            onClick={()=>removeYAxisKey(item.name, "yKeys")}
                                                          />

                                                        </span>
                                                      }
                                                    </span>
                                                  )
                                                })}
                                              </div>
                                          )
                                            :(<span className='cursor-pointer' onClick={()=>handleToggleTab(tabs[2])}>Add Fields y-axis</span>)
                                        }
                                    </DropZone>
                                </div>
                            </div>
                        }
                    </>
                :
                <div>
                  {isSelectedPlot && 
                    <>
                      <div className='flex gap-4 mb-3 px-4'>
                          {["Visual", "General"].map((tab)=>{
                              return(
                                  <div 
                                      className={` ${selectedCustType===tab?"border-[#007A7F] ":""} cursor-pointer border-b-4 text-xs font-bold`} 
                                      key={tab}
                                      onClick={()=>setSelectedCustType(tab)}
                                  >
                                      {tab}
                                  </div>
                              )
                          })}
                      </div>

                      <div className='flex flex-col gap-2'>
                        {selectedCustType !== "General" && 
                          <>
                            {(plotRecommendation?.[selectedPlot]?.type==="chart" || plotRecommendation?.[selectedPlot]?.type===undefined) && 
                              <ChartVisualsTools />
                            }
                            {plotRecommendation?.[selectedPlot]?.type==="card" && 
                              <CardVisualTools />
                            }
                            {plotRecommendation?.[selectedPlot]?.type==="shape" && 
                              <ShapeVisualizationTool />
                            }
                            {plotRecommendation?.[selectedPlot]?.type==="button" && 
                              <ButtonVisualizationTools />
                            }
                          </>
                        }
                        {selectedCustType === "General" &&
                          <GeneralVisualTools />
                        }
                      
                      </div>
                    </>
                  }
                </div>
                }
              </>
            </CustomTab>
         }
        {selectedTab.includes("fields") &&
            <CustomTab
                toggleTab={()=>handleToggleTab(tabs[2])}
                className=""
                name="fields"
                header="Fields"
                icon={<FaChartBar />}
                containerClass=""
            >

                <div className='flex flex-col gap-1 px-4 pt-4'>
                    {Object.keys(filter).map((keyName, i)=>{
                        return(
                            <DragItems key={i} dataKey={keyName} type="axis-key">
                                <div  className='flex gap-[5%] items-center justify-start'>
                                    <input 
                                      type='checkbox' 
                                      className='w-[20%]' 
                                      readOnly 
                                      checked={plotRecommendation?.[selectedPlot]?.xKey?.includes(keyName)||plotRecommendation?.[selectedPlot]?.yKeys?.some(val=>val?.name===keyName)} 
                                    />
                                    <span  className='w-[75%] text-sm' title={keyName}>{keyName.length>12?keyName.slice(0,12)+"...":keyName}</span>
                                </div>
                            </DragItems>
                        )
                    })}
                </div>
            </CustomTab>
        }
         {selectedTab.includes("selection") &&
            <CustomTab
                toggleTab={()=>handleToggleTab(tabs[3])}
                className=""
                name="selection"
                header="Selection"
                icon={<LuSquareMousePointer />}
                containerClass=""
            >
              <Selection />
              {/* <Bookmarks /> */}
                
            </CustomTab>
        }
        {selectedTab.includes("bookmarks") &&
            <CustomTab
                toggleTab={()=>handleToggleTab(tabs[4])}
                className=""
                name="bookmarks"
                header="Bookmarks"
                icon={<FaRegBookmark />}
                containerClass=""
            >
              <Bookmarks 
                recreatePageContent={recreatePageContent}
                fetchBookmarks={fetchBookmarks} 
                handleAddbookmarks={handleAddbookmarks} 
                handleBookmarkNameChange={handleBookmarkNameChange} 
                handleRemoveBookmark={handleRemoveBookmark} 
                handleUpdateBookmark={handleUpdateBookmark} 
                navigateToPage={navigateToPage}
              />
                
            </CustomTab>
        }
       
        </div>
            <div className="h-full border border-[#A9A9A9] bg-[#F3F2F1] rounded-tr-lg rounded-br-lg pt-5" >
                <div className='flex flex-col w-10 items-center justify-center gap-3'>
                    {tabs.map((data, index)=>{
                        return(
                            <span key={index} className={`cursor-pointer p-2 rounded-2xl ${selectedTab.includes(data.name)?"bg-gray-300":""}`} onClick={()=>handleToggleTab(data)}>
                                <data.icon />
                            </span>

                        )
                    })}
                    <span className={`cursor-pointer p-2 rounded-2xl `} onClick={handleIsDraggable}>
                    {isDraggable?
                        <FaUnlock />
                        :
                        <FaLock />
                    }
                    </span>

                </div>
            </div>
    </div>
  )
}

export default CustomVisuals