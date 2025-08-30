import React, { useRef } from 'react'
import CustomAccordian from '../CustomAccordian'
import { FaCross, FaDeleteLeft, FaPlus } from 'react-icons/fa6'
import { Switch } from '@mui/material'
import { alpha, styled } from '@mui/material'
import { pink } from '@mui/material/colors'
import { UseDescriptiveContext } from '../../../../../../context/DescriptiveProvider'

import Select, { components } from 'react-select';
import { IoIosClose } from 'react-icons/io'


const numberDataTypes = ["offsetX", "offsetY", "borderRadius", "top", "left", "padding", "fontWeight", "fontSize"]
const markerSupportKinds = ["line", "area", "smooth-line"]
const barChartTypes = ["bar", "stacked-bar", "stacked-bar-100","column","column-stacked","column-stacked-100", "funnel"]
const pieChartTypes = ["pie","donut", "polar-area", "radialBar"]

const ChartVisualsTools = () => {

      const {plotRecommendation, setPlotRecommendation, selectedPlot} = UseDescriptiveContext()
       const handleToggleMarkers = (e)=>{
        if(plotRecommendation[selectedPlot]){
          setPlotRecommendation(prev=>{
            let tempData = [...prev]
            if(tempData[selectedPlot]?.options?.markers){
              tempData[selectedPlot].options.markers.size = tempData[selectedPlot].options.markers.size>0?0:10
            }else{
              if (!tempData[selectedPlot].options) {
                tempData[selectedPlot].options = {};
              }
              if (!tempData[selectedPlot].options.markers) {
                tempData[selectedPlot].options.markers = {};
              }
              tempData[selectedPlot].options.markers["size"] = 10
            }
            return tempData
        })
        }
       }
       const handleOptionsChange = (e, optionName, isBoolean)=>{
        if(plotRecommendation[selectedPlot]){
          let {name, value, checked} = e.target
          if(isBoolean) value= checked
          if(numberDataTypes.includes(name)) value= +value
          setPlotRecommendation(prev=>{
            let tempData = [...prev]
            if(tempData[selectedPlot]?.options?.[optionName]){
              tempData[selectedPlot].options[optionName][name] = value
            }else{
              if (!tempData[selectedPlot].options) {
                tempData[selectedPlot].options = {[optionName]:{}};
              }
              if(!tempData[selectedPlot].options[optionName]){
                tempData[selectedPlot].options[optionName] = {};
              }
              tempData[selectedPlot].options[optionName][name] = value
            }
            return tempData
        })
        }
       }
       const handleNestOptionsChange = (e, optionName, optionName2, isBoolean)=>{
        if(plotRecommendation[selectedPlot]){
          let {name, value, checked} = e.target
          if(isBoolean) value= checked
          if(numberDataTypes.includes(name)) value= +value
          setPlotRecommendation(prev=>{
            let tempData = [...prev]
            if(tempData[selectedPlot]?.options?.[optionName]?.[optionName2]?.[name]){
              tempData[selectedPlot].options[optionName][optionName2][name] = value
            }else{
              
              if (!tempData[selectedPlot]?.options) {
                tempData[selectedPlot].options = {};
              }
              if(!tempData[selectedPlot]?.options?.[optionName]){
                tempData[selectedPlot].options[optionName] = {};
              }
              if(!tempData[selectedPlot]?.options?.[optionName]?.[optionName2]){
                tempData[selectedPlot].options[optionName][optionName2] = {};
              }
              tempData[selectedPlot].options[optionName][optionName2][name] = value
            }
            return tempData
        })
        }
       }
       const handleAddColor = (isRemove)=>{
        if(plotRecommendation[selectedPlot]){
            setPlotRecommendation(prev=>{
              let tempData = [...prev]
              if(isRemove){
                tempData[selectedPlot].options.dataLabels.style.colors=[]
              }else{
                  if(tempData[selectedPlot]?.options?.dataLabels?.style?.colors){
                    tempData[selectedPlot].options.dataLabels.style.colors.push("#000000")
                  }else{
                    if (!tempData[selectedPlot].options) {
                      tempData[selectedPlot].options = {};
                    }
                    if (!tempData[selectedPlot].options.dataLabels) {
                      tempData[selectedPlot].options["dataLabels"] = {};
                    }
                    if (!tempData[selectedPlot].options.dataLabels.style) {
                      tempData[selectedPlot].options.dataLabels["style"] = {};
                    }
                    if (!tempData[selectedPlot].options.dataLabels.style.colors) {
                      tempData[selectedPlot].options.dataLabels.style["colors"] = [];
                    }
                    tempData[selectedPlot].options.dataLabels.style.colors.push("#000000")
                  }
              }
              console.log(tempData)
              return tempData
          })
          }
        // plotRecommendation?.[selectedPlot]?.options?.dataLabels?.style?.colors
       }
       const handleColorChange = (e, index)=>{
        if(plotRecommendation[selectedPlot]){
          let {value} = e.target
          setPlotRecommendation(prev=>{
            let tempData = [...prev]
            tempData[selectedPlot].options.dataLabels.style.colors[index] = value
            return tempData
        })
        }
       }
      const handleAddMarkerColor = (isRemove)=>{
        if(plotRecommendation[selectedPlot]){
            setPlotRecommendation(prev=>{
              let tempData = [...prev]
              if(isRemove){
                tempData[selectedPlot].options.markers.colors=[]
              }else{
                  if(tempData[selectedPlot]?.options?.markers?.colors){
                    tempData[selectedPlot].options.markers.colors.push("#000000")
                  }else{
                    if (!tempData[selectedPlot].options) {
                      tempData[selectedPlot].options = {};
                    }
                    if (!tempData[selectedPlot].options.markers) {
                      tempData[selectedPlot].options["markers"] = {};
                    }
                    if (!tempData[selectedPlot].options.markers.colors) {
                      tempData[selectedPlot].options.markers["colors"] = [];
                    }
                    tempData[selectedPlot].options.markers.colors.push("#000000")
                  }
              }
              return tempData
          })
          }
       }
       const handleMarkerColorChange = (e, index)=>{
        if(plotRecommendation[selectedPlot]){
          let {value} = e.target
          setPlotRecommendation(prev=>{
            let tempData = [...prev]
            tempData[selectedPlot].options.markers.colors[index] = value
            return tempData
        })
        }
       }
      const handleAddChartColor = (isRemove)=>{
        if(plotRecommendation[selectedPlot]){
            setPlotRecommendation(prev=>{
              let tempData = [...prev]
              if(isRemove){
                tempData[selectedPlot].options.colors=[]
              }else{
                  if(tempData[selectedPlot]?.options?.colors){
                    tempData[selectedPlot].options.colors.push("#000000")
                  }else{
                    if (!tempData[selectedPlot].options) {
                      tempData[selectedPlot].options = {};
                    }
                    if (!tempData[selectedPlot].options.colors) {
                      tempData[selectedPlot].options["colors"] = [];
                    }
                    tempData[selectedPlot].options.colors.push("#000000")
                  }
              }
              return tempData
          })
          }
       }
       const handleChartColorChange = (e, index)=>{
        if(plotRecommendation[selectedPlot]){
          let {value} = e.target
          setPlotRecommendation(prev=>{
            let tempData = [...prev]
            tempData[selectedPlot].options.colors[index] = value
            return tempData
        })
        }
       }

      const handleAddLineColor = (isRemove)=>{
        if(plotRecommendation[selectedPlot]){
            setPlotRecommendation(prev=>{
              let tempData = [...prev]
              if(isRemove){
                tempData[selectedPlot].options.stroke.colors=[]
              }else{
                  if(tempData[selectedPlot]?.options?.stroke?.colors){
                    tempData[selectedPlot].options.stroke.colors.push("#000000")
                  }else{
                    if (!tempData[selectedPlot].options) {
                      tempData[selectedPlot].options = {};
                    }
                    if (!tempData[selectedPlot].options.stroke) {
                      tempData[selectedPlot].options.stroke = {};
                    }
                    if (!tempData[selectedPlot].options.stroke.colors) {
                      tempData[selectedPlot].options.stroke["colors"] = [];
                    }
                    tempData[selectedPlot].options.stroke.colors.push("#000000")
                  }
              }
              return tempData
          })
          }
       }
       const handleLineColorChange = (e, index)=>{
        if(plotRecommendation[selectedPlot]){
          let {value} = e.target
          setPlotRecommendation(prev=>{
            let tempData = [...prev]
            tempData[selectedPlot].options.stroke.colors[index] = value
            return tempData
        })
        }
       }

       const handlePlotOptionsChange = (e, plotName, isBoolean)=>{
        if(plotRecommendation[selectedPlot]){
          let {name, value, checked} = e.target
          if(isBoolean) value = checked
          if(numberDataTypes.includes(name)) value= +value
          setPlotRecommendation(prev=>{
            let tempData = [...prev]
            if(tempData?.[selectedPlot]?.options?.plotOptions?.[plotName]?.[name]){
              tempData[selectedPlot].options.plotOptions[plotName][name] = value
            }else{
              if (!tempData[selectedPlot].options) {
                tempData[selectedPlot].options = {};
              }
              if (!tempData[selectedPlot].options?.plotOptions) {
                tempData[selectedPlot].options["plotOptions"] = {};
              }
              if(!tempData[selectedPlot].options?.plotOptions?.[plotName]){
                tempData[selectedPlot].options.plotOptions[plotName] = {};
              }
              tempData[selectedPlot].options.plotOptions[plotName][name] = value
            }
            return tempData
        })
        }
       }
       const handleNestPlotOptionsChange = (e, plotName, option1)=>{
        if(plotRecommendation[selectedPlot]){
          let {name, value} = e.target
          if(numberDataTypes.includes(name)) value= +value
          setPlotRecommendation(prev=>{
            let tempData = [...prev]
            if(tempData?.[selectedPlot]?.options?.plotOptions?.[plotName]?.[option1]?.[name]){
              tempData[selectedPlot].options.plotOptions[plotName][option1][name] = value
            }else{
              if (!tempData[selectedPlot].options) {
                tempData[selectedPlot].options = {};
              }
              if (!tempData[selectedPlot].options?.plotOptions) {
                tempData[selectedPlot].options["plotOptions"] = {};
              }
              if(!tempData[selectedPlot].options?.plotOptions?.[plotName]){
                tempData[selectedPlot].options.plotOptions[plotName] = {};
              }
              if(!tempData[selectedPlot].options?.plotOptions?.[plotName]?.[option1]){
                tempData[selectedPlot].options.plotOptions[plotName][option1] = {};
              }
              tempData[selectedPlot].options.plotOptions[plotName][option1][name] = value
            }
            return tempData
        })
        }
       }


       const handleToggleAxisGridLine = (e, axis)=>{
        if(plotRecommendation[selectedPlot]){
          setPlotRecommendation(prev=>{
            let tempData = [...prev]
            if(typeof tempData[selectedPlot]?.options?.grid?.[axis]?.lines?.show === "boolean"){
              tempData[selectedPlot].options.grid[axis].lines.show = !tempData[selectedPlot].options.grid[axis].lines.show
            }else{
              if (!tempData[selectedPlot].options) {
                tempData[selectedPlot].options = {};
              }
              if (!tempData[selectedPlot]?.options?.grid) {
                tempData[selectedPlot].options['grid'] = {};
              }
              if (!tempData[selectedPlot]?.options?.grid?.[axis]) {
                tempData[selectedPlot].options.grid[axis] = {lines:{show:false}};
              }
              tempData[selectedPlot].options.grid[axis]["lines"]["show"] = axis==="yaxis"
            }
            return tempData
        })
        }
      }
      const handleAddGridColor = (isRemove, gridType)=>{
        if(plotRecommendation[selectedPlot]){
            setPlotRecommendation(prev=>{
              let tempData = [...prev]
              if(isRemove){
                tempData[selectedPlot].options.grid[gridType].colors=[]
              }else{
                  if(tempData[selectedPlot]?.options?.grid?.[gridType]?.colors){
                    tempData[selectedPlot].options.grid[gridType].colors.push("#000000")
                  }else{
                    if (!tempData[selectedPlot].options) {
                      tempData[selectedPlot].options = {};
                    }
                    if (!tempData[selectedPlot].options.grid) {
                      tempData[selectedPlot].options.grid = {};
                    }
                    if (!tempData[selectedPlot].options?.grid?.[gridType]) {
                      tempData[selectedPlot].options.grid[gridType] = {};
                    }
                    if (!tempData[selectedPlot].options?.grid?.[gridType]?.colors) {
                      tempData[selectedPlot].options.grid[gridType]["colors"] = [];
                    }
                    tempData[selectedPlot].options.grid[gridType].colors.push("#000000")
                  }
              }
              return tempData
          })
          }
       }
       const handleGridColorChange = (e, index, gridType)=>{
        if(plotRecommendation[selectedPlot]){
          let {value} = e.target
          setPlotRecommendation(prev=>{
            let tempData = [...prev]
            tempData[selectedPlot].options.grid[gridType].colors[index] = value
            return tempData
        })
        }
       }

       const handleAddSeriesToGradient = (isRemove, index)=>{
        if(plotRecommendation[selectedPlot]){
            setPlotRecommendation(prev=>{
              let tempData = [...prev]
              if(isRemove){
                tempData[selectedPlot].options.fill.gradient.colorStops.splice(index, 1)
              }else{
                  const initialGradients = [{offset:35, color: 'blue',opacity: 0.5},{offset: 25,color: 'green',opacity: 0.5}]
                  if(tempData[selectedPlot]?.options?.fill?.gradient?.colorStops){
                    tempData[selectedPlot].options.fill.gradient.colorStops.push(initialGradients)
                  }else{
                    if (!tempData[selectedPlot].options) {
                      tempData[selectedPlot].options = {};
                    }
                    if (!tempData[selectedPlot]?.options?.fill) {
                      tempData[selectedPlot].options["fill"] = {};
                    }
                    if (!tempData[selectedPlot]?.options?.fill?.gradient) {
                      tempData[selectedPlot].options.fill["gradient"] = {};
                    }
                    if (!tempData[selectedPlot]?.options?.fill?.gradient?.colorStops) {
                      tempData[selectedPlot].options.fill.gradient["colorStops"] = [];
                    }
                    tempData[selectedPlot].options.fill.gradient.colorStops.push(initialGradients)
                  }
              }
              return tempData
          })
          }
       }
       const handleAddRemoveGradient =(isRemove, seriesIndex, gradientIndex)=>{
        if(plotRecommendation[selectedPlot]){
          setPlotRecommendation(prev=>{
            let tempData = [...prev]
            
            if(isRemove){
              tempData[selectedPlot].options.fill.gradient.colorStops[seriesIndex].splice(gradientIndex, 1)
            }else{
                const initialGradients = {offset: 15,color: 'green',opacity: 0.5}
                if(tempData[selectedPlot]?.options?.fill?.gradient?.colorStops?.[seriesIndex]){
                  tempData[selectedPlot].options.fill.gradient.colorStops[seriesIndex].push(initialGradients)
                }else{
                  if (!tempData[selectedPlot].options) {
                    tempData[selectedPlot].options = {};
                  }
                  if (!tempData[selectedPlot]?.options?.fill) {
                    tempData[selectedPlot].options["fill"] = {};
                  }
                  if (!tempData[selectedPlot]?.options?.fill?.gradient) {
                    tempData[selectedPlot].options.fill["gradient"] = {};
                  }
                  if (!tempData[selectedPlot]?.options?.fill?.gradient?.colorStops) {
                    tempData[selectedPlot].options.fill.gradient["colorStops"] = [];
                  }
                  if (!tempData[selectedPlot]?.options?.fill?.gradient?.colorStops?.[seriesIndex]) {
                    tempData[selectedPlot].options.fill.gradient.colorStops[seriesIndex] = [];
                  }
                  tempData[selectedPlot].options.fill.gradient.colorStops[seriesIndex].push(initialGradients)
                }
            }
            return tempData
        })
        }

       }
       const handleGradientOptionsChange =(e, seriesIndex, gradientIndex)=>{
        if(plotRecommendation[selectedPlot]){
          let {name, value} = e.target
          if(numberDataTypes.includes(name)) value= +value
          setPlotRecommendation(prev=>{
            let tempData = [...prev]
            if(tempData[selectedPlot]?.options?.fill?.gradient?.colorStops?.[seriesIndex]?.[gradientIndex]?.[name]){
              tempData[selectedPlot].options.fill.gradient.colorStops[seriesIndex][gradientIndex][name] = value
            }
            return tempData
        })
        }

       }



      //  plotRecommendation?.[selectedPlot]?.options?.plotOptions?.radar?.polygons?.fill?.colors
      const handleAddRadarPolygonColor = (isRemove)=>{
        if(plotRecommendation[selectedPlot]){
            setPlotRecommendation(prev=>{
              let tempData = [...prev]
              if(isRemove){
                tempData[selectedPlot].options.plotOptions.radar.polygons.fill.colors=[]
              }else{
                  if(tempData[selectedPlot]?.options?.plotOptions?.radar?.polygons?.fill?.colors){
                    tempData[selectedPlot].options.plotOptions.radar.polygons.fill.colors.push("#000000")
                  }else{
                    if (!tempData[selectedPlot].options) {
                      tempData[selectedPlot].options = {};
                    }
                    if (!tempData[selectedPlot]?.options?.plotOptions) {
                      tempData[selectedPlot].options["plotOptions"] = {};
                    }
                    if (!tempData[selectedPlot]?.options?.plotOptions?.radar) {
                      tempData[selectedPlot].options.plotOptions["radar"] = {};
                    }
                    if (!tempData[selectedPlot]?.options?.plotOptions?.radar?.polygons) {
                      tempData[selectedPlot].options.plotOptions.radar["polygons"] = {};
                    }
                    if (!tempData[selectedPlot]?.options?.plotOptions?.radar?.polygons?.fill) {
                      tempData[selectedPlot].options.plotOptions.radar.polygons["fill"] = {colors:[]};
                    }
                    tempData[selectedPlot].options.plotOptions.radar.polygons.fill.colors.push("#000000")
                  }
              }
              return tempData
          })
          }
       }
       const handleRadarPolygonColorChange = (e, index)=>{
        if(plotRecommendation[selectedPlot]){
          let {value} = e.target
          setPlotRecommendation(prev=>{
            let tempData = [...prev]
            tempData[selectedPlot].options.plotOptions.radar.polygons.fill.colors[index] = value
            return tempData
        })
        }
       }


      //  pattern multiple change 
       const selectPatternRef = useRef(null)
      const handlePatternTypeChange = (e)=>{
        // if(plotRecommendation[selectedPlot]){
        //   const value = e.target.value
        //     setPlotRecommendation(prev=>{
        //     let tempData = [...prev]
        //     if(tempData[selectedPlot]?.options?.["fill"]?.["pattern"]?.["style"]){
        //       tempData[selectedPlot].options["fill"]["pattern"]["style"].push(value)
        //     }else{
              
        //       if (!tempData[selectedPlot]?.options) {
        //         tempData[selectedPlot].options = {};
        //       }
        //       if(!tempData[selectedPlot]?.options?.["fill"]){
        //         tempData[selectedPlot].options["fill"] = {};
        //       }
        //       if(!tempData[selectedPlot]?.options?.["fill"]?.["pattern"]){
        //         tempData[selectedPlot].options["fill"]["pattern"] = {};
        //       }
        //       tempData[selectedPlot].options["fill"]["pattern"]["style"] = value
        //     }
        //     return tempData
        // })
        // }
        selectPatternRef.current.value = ""
        // if(plotRecommendation[selectedPlot]){
        //   let {name, value} = e.target
        //   setPlotRecommendation(prev=>{
        //     let tempData = [...prev]
        //     if(tempData[selectedPlot]?.options?.[optionName]?.[optionName2]?.[name]){
        //       tempData[selectedPlot].options[optionName][optionName2][name] = value
        //     }else{
              
        //       if (!tempData[selectedPlot]?.options) {
        //         tempData[selectedPlot].options = {};
        //       }
        //       if(!tempData[selectedPlot]?.options?.[optionName]){
        //         tempData[selectedPlot].options[optionName] = {};
        //       }
        //       if(!tempData[selectedPlot]?.options?.[optionName]?.[optionName2]){
        //         tempData[selectedPlot].options[optionName][optionName2] = {};
        //       }
        //       tempData[selectedPlot].options[optionName][optionName2][name] = value
        //     }
        //     return tempData
        // })
        // }
       }
      const colorPalettes = [
        { value: "palette1", label: "Palette 1", colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"] },
        { value: "palette2", label: "Palette 2", colors: ["#3f51b5", "#03a9f4", "#4caf50", "#f9ce1d", "#FF9800"] },
        { value: "palette3", label: "Palette 3", colors: ["#33b2df", "#546E7A", "#d4526e", "#13d8aa", "#A5978B"] },
        { value: "palette4", label: "Palette 4", colors: ["#4ecdc4", "#c7f464", "#81D4FA", "#546E7A", "#fd6a6a"] },
        { value: "palette5", label: "Palette 5", colors: ["#2b908f", "#f9a3a4", "#90ee7e", "#fa4443", "#69d2e7"] },
        { value: "palette6", label: "Palette 6", colors: ["#449DD1", "#F86624", "#EA3546", "#662E9B", "#C5D86D"] },
        { value: "palette7", label: "Palette 7", colors: ["#D7263D", "#1B998B", "#2E294E", "#F46036", "#E2C044"] },
        { value: "palette8", label: "Palette 8", colors: ["#662E9B", "#F86624", "#F9C80E", "#EA3546", "#43BCCD"] },
        { value: "palette9", label: "Palette 9", colors: ["#5C4742", "#A5978B", "#8D5B4C", "#5A2A27", "#C4BBAF"] },
        { value: "palette10",label: "Palette 10", colors: ["#A300D6", "#7D02EB", "#5653FE", "#2983FF", "#00B1F2"] },
      ];
      
      const handleColorPaletteChange = (selectedOption)=>{
        if(plotRecommendation[selectedPlot]){
          setPlotRecommendation(prev=>{
            let tempData = [...prev]
            if(tempData[selectedPlot]?.options?.["theme"]){
              tempData[selectedPlot].options["theme"]["palette"] = selectedOption.value
            }else{
              if (!tempData[selectedPlot].options) {
                tempData[selectedPlot].options = {["theme"]:{palette:""}};
              }
              if(!tempData[selectedPlot].options["theme"]){
                tempData[selectedPlot].options["theme"] = {};
              }
              tempData[selectedPlot].options["theme"]["palette"] = selectedOption.value
            }
            return tempData
        })
        }
       }
       const fillOptions = [
        { value: "solid", label: "Solid" },
        { value: "pattern", label: "Pattern" },
        { value: "gradient", label: "Gradient" }
      ];
      const handleColorFillTypeChange = (selectedOption) => {
        console.log(selectedOption);
      
        if (plotRecommendation[selectedPlot]) {
          setPlotRecommendation((prev) => {
            const tempData = [...prev];
      
            // Ensure nested structure exists
            if (!tempData[selectedPlot].options) {
              tempData[selectedPlot].options = {};
            }
            if (!tempData[selectedPlot].options["fill"]) {
              tempData[selectedPlot].options["fill"] = {};
            }
      
            if (selectedOption.length > 1) {
              // Store only array of values
              tempData[selectedPlot].options["fill"]["type"] = selectedOption.map((data) => data.value);
            } else if (selectedOption.length === 1) {
              // Store single value as string
              tempData[selectedPlot].options["fill"]["type"] = selectedOption[0].value;
            } else {
              // Clear the field if no selection
              tempData[selectedPlot].options["fill"]["type"] = "";
            }
      
            return tempData;
          });
        }
      };
  return (
    <>
        <CustomAccordian 
            header={"Colors"}
            className="flex flex-col gap-2 px-3 py-2 bg-gray-200"
            containerClass="w-52"
        >
           <div className='flex flex-col text-sm'>
              <span>Color Palette</span>
              <Select
                    options={colorPalettes}
                    className="w-[100%]"
                    styles={customStyles}
                    placeholder="Theme"
                    onChange={handleColorPaletteChange}
                    value={colorPalettes.find(data=>data.value===plotRecommendation?.[selectedPlot]?.options?.theme?.palette)||null}
                    components={{ DropdownIndicator: CustomDropdownIndicator, Option:CustomOption }}
                />

            </div>
            <div className="flex flex-col">
                <span>Fill Type</span>
                <div className='flex gap-2 items-center justify-start'>
                  <select 
                      value={plotRecommendation?.[selectedPlot]?.options?.fill?.type}
                      name='type'
                      onChange={(e)=>handleOptionsChange(e, "fill")}
                      className='w-full'
                  >
                      <option value="solid">Solid</option>
                      <option value="pattern">Pattern</option>
                      <option value="gradient">Gradient</option>
                  </select>
                  {/* <FaPlus className='h-6 w-6 cursor-pointer rounded-md p-1 hover:bg-gray-50' title='Click to add Multiple fill' /> */}
                </div>
            </div>

            {/* <div className='flex flex-col text-sm'>
              <span>Fill type</span>
              <div className='w-full bg-white rounded-md py-1 px-1 flex flex-wrap gap-1 text-sm relative'>
                {(Array.isArray(plotRecommendation?.[selectedPlot]?.options?.fill?.type)
                          ? plotRecommendation?.[selectedPlot]?.options?.fill?.type
                          : [plotRecommendation?.[selectedPlot]?.options?.fill?.type]).map((fillType, index)=>{
                            return(
                              <div className='flex justify-between items-center bg-gray-300'>
                                <span>{fillType}</span>
                                <IoIosClose />
                               
                              </div>
                            )
                          })
                }
                <div title='Click to add Fill Type'>
                  <FaPlus className='bg-gray-100 text-black rounded-md p-2 h-8 w-8 cursor-pointer hover:bg-slate-200' />
                </div>
                <div className='absolute bg-gray-50 rounded-md p-2 h-[100px] w-full flex flex-col gap-2'>
                  {fillOptions.map((fill, index)=>{
                    return(
                      <div className='cursor-pointer hover:bg-gray-200 rounded-md p-1' key={index}>{fill.label}</div>
                    )
                  })}
                </div>
              </div>
              <Select
                    options={fillOptions}
                    className="w-[100%]"
                    styles={customStyles}
                    placeholder="Fill Type"
                    isMulti
                    onChange={handleColorFillTypeChange}
                    value={
                      Array.isArray(plotRecommendation?.[selectedPlot]?.options?.fill?.type)
                        ? plotRecommendation[selectedPlot].options.fill.type.map(val =>
                            fillOptions.find(opt => opt.value === val)
                          )
                        : fillOptions.find(opt =>
                            opt.value === plotRecommendation?.[selectedPlot]?.options?.fill?.type
                          )
                    }
                    components={{ DropdownIndicator: CustomDropdownIndicator}}
                />

            </div> */}
            {plotRecommendation?.[selectedPlot]?.options?.fill?.type==="pattern" && 
               <CustomAccordian
                  header="Pattern"
                  className="flex flex-col px-3 py-2 "
                  containerClass="bg-gray-300 w-[100%]"
                >
                  <div className="flex flex-col">
                    <span>Type</span>
                    <select 
                        value={plotRecommendation?.[selectedPlot]?.options?.fill?.pattern?.style}
                        name='style'
                        onChange={(e)=>handleNestOptionsChange(e, "fill", "pattern")}
                    >
                        <option value="verticalLines">||</option>
                        <option value="horizontalLines">=</option>
                        <option value="slantedLines">\\</option>
                        <option value="circles">o</option>
                        <option value="squares">+</option>
                    </select>
                    {/* <select 
                        value={plotRecommendation?.[selectedPlot]?.options?.fill?.pattern?.style}
                        name='style'
                        onChange={(e)=>handlePatternTypeChange(e, "fill", "pattern")}
                    >
                        <option value="verticalLines">||</option>
                        <option value="horizontalLines">=</option>
                        <option value="slantedLines">\\</option>
                        <option value="circles">o</option>
                        <option value="squares">+</option>
                    </select> */}
                    
                  </div>
                  <div className="flex flex-col">
                    <span>Pattern Width</span>
                    <input 
                        type='range'
                        className='accent-[#008085]' 
                        value={plotRecommendation?.[selectedPlot]?.options?.fill?.pattern?.width} 
                        min={0}
                        max={50}
                        name='width'
                        onChange={(e)=>handleNestOptionsChange(e, "fill", "pattern")}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span>Height</span>
                    <input 
                        type='range'
                        className='accent-[#008085]' 
                        value={plotRecommendation?.[selectedPlot]?.options?.fill?.pattern?.height} 
                        min={0}
                        max={50}
                        name='height'
                        onChange={(e)=>handleNestOptionsChange(e, "fill", "pattern")}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span>Border Width</span>
                    <input 
                        type='range'
                        className='accent-[#008085]' 
                        value={plotRecommendation?.[selectedPlot]?.options?.fill?.pattern?.strokeWidth} 
                        min={1}
                        max={10}
                        name='strokeWidth'
                        onChange={(e)=>handleNestOptionsChange(e, "fill", "pattern")}
                    />
                  </div>
                   
                </CustomAccordian>
            }
            {plotRecommendation?.[selectedPlot]?.options?.fill?.type==="gradient" && 
               <CustomAccordian
                  header="Gradient"
                  className="flex flex-col px-3 py-2 "
                  containerClass="bg-gray-300 w-[100%]"
                >
                 
                  <div className="flex flex-col">
                    <span>Type</span>
                    <select 
                        value={plotRecommendation?.[selectedPlot]?.options?.fill?.gradient?.type}
                        name='type'
                        onChange={(e)=>handleNestOptionsChange(e, "fill", "gradient")}
                    >
                        <option value="horizontal">🡢</option>
                        <option value="vertical">🡣</option>
                        <option value="diagonal">🡦</option>
                        <option value="diagonal2">🡧</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <span>Inverse Direction</span>
                    <Switch 
                      checked={!!plotRecommendation?.[selectedPlot]?.options?.fill?.gradient?.inverseColors}
                      name='inverseColors'
                      onChange={(e)=>handleNestOptionsChange(e, "fill", "gradient", true)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span>From Opacity</span>
                    <input 
                      type='range'
                      className='accent-[#008085]' 
                      value={plotRecommendation?.[selectedPlot]?.options?.fill?.gradient?.opacityFrom||0} 
                      min={0}
                      max={1}
                      step="0.1"
                      name='opacityFrom'
                      onChange={(e)=>handleNestOptionsChange(e, "fill", "gradient")}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span>To Opacity</span>
                    <input 
                      type='range'
                      className='accent-[#008085]' 
                      value={plotRecommendation?.[selectedPlot]?.options?.fill?.gradient?.opacityTo||0} 
                      min={0}
                      max={1}
                      step="0.1"
                      name='opacityTo'
                      onChange={(e)=>handleNestOptionsChange(e, "fill", "gradient")}
                    />
                  </div>
                  
                </CustomAccordian>
            }
            {plotRecommendation?.[selectedPlot]?.options?.fill?.type==="gradient" && 
               <CustomAccordian
                  header="Gradient Colors"
                  className="flex flex-col gap-2 px-3 py-2 "
                  containerClass="bg-gray-300 w-[100%]"
                >
                 {plotRecommendation?.[selectedPlot]?.options?.fill?.gradient?.colorStops?.map((series, index)=>{
                  return (
                    <CustomAccordian
                      key={index}
                      header={`Series-${index+1}`}
                      className="flex flex-col px-3 py-2 "
                      containerClass="bg-gray-200 w-[100%]"
                      switchButton={<div>
                        <FaDeleteLeft className='cursor-pointer' onClick={()=>handleAddSeriesToGradient(true, index)} />
                      </div>}
                    >
                    {series?.map((gradient, i)=>{
                      return (
                        <div className={`border-b border-gray-600 pb-2 mb-2`} key={i}>
                          <div className='flex items-center gap-3'>
                            <span>Color</span>
                            <input 
                                type='color'
                                className='h-8 w-8 rounded-md border-none p-0' 
                                name='color'
                                value={gradient?.color} 
                                onChange={(e)=>handleGradientOptionsChange(e, index, i)}
                            />
                            <FaDeleteLeft className='cursor-pointer' onClick={()=>handleAddRemoveGradient(true, index, i)} />
                          </div>
                          <div className="flex flex-col">
                            <span>Offset</span>
                            <input 
                                type='range'
                                className='accent-[#008085]' 
                                value={gradient?.offset} 
                                min={0}
                                max={100}
                                name='offset'
                                onChange={(e)=>handleGradientOptionsChange(e, index, i)}
                            />
                          </div>
                          <div className="flex flex-col">
                            <span>Opacity</span>
                            <input 
                                type='range'
                                className='accent-[#008085]' 
                                value={gradient?.opacity} 
                                min={0}
                                step="0.1"
                                max={1}
                                name='opacity'
                                onChange={(e)=>handleGradientOptionsChange(e, index, i)}
                            />
                          </div>
                        </div>
                      )
                    })}

                    <div title='Click to add Gradient Color' onClick={()=>handleAddRemoveGradient(false,index)}>
                      <FaPlus />
                    </div>

                    </CustomAccordian>
                  )
                 })}
                 <div title='Click to add Series' onClick={()=>handleAddSeriesToGradient()}>
                  <FaPlus />
                 </div>
                 

                </CustomAccordian>
            }
            <div className='flex flex-col'>
                <span>Chart Colors</span>
                <div className='flex flex-wrap gap-1'>
                    {plotRecommendation?.[selectedPlot]?.options?.colors?.map((color, i)=>{
                        return(
                            <input 
                                key={i}
                                type='color'
                                className='h-8 w-8 rounded-md border-none p-0' 
                                value={color} 
                                onChange={(e)=>handleChartColorChange(e, i)}
                            />
                        )
                    })}

                    <FaPlus 
                        className='bg-gray-100 text-black rounded-md p-2 h-8 w-8 cursor-pointer hover:bg-slate-200'
                        onClick={()=>handleAddChartColor()}
                    />
                    {plotRecommendation?.[selectedPlot]?.options?.colors?.length>0 && 
                        <FaDeleteLeft 
                            className='bg-gray-100 text-black rounded-md p-2 h-8 w-8 cursor-pointer hover:bg-slate-200'
                            onClick={()=>handleAddChartColor(true)}
                        />
                    }
                </div>
            </div>
            <div className='flex flex-col'>
                <span>Chart Background</span>
                <input 
                    type='color'
                    className='h-8 w-8 rounded-md border-none p-0' 
                    name='background'
                    value={plotRecommendation?.[selectedPlot]?.options?.chart?.background} 
                    onChange={(e)=>handleOptionsChange(e, "chart")}
                />
            </div>
            <div className='flex flex-col'>
                <span>Chart Text</span>
                <input 
                    type='color'
                    className='h-8 w-8 rounded-md border-none p-0' 
                    name='foreColor'
                    value={plotRecommendation?.[selectedPlot]?.options?.chart?.foreColor} 
                    onChange={(e)=>handleOptionsChange(e, "chart")}
                />
            </div>

        </CustomAccordian>
        <CustomAccordian 
            header={"Axes/Grid"}
            className="flex flex-col gap-2 px-3 py-2 bg-gray-200"
            containerClass="w-52"
        >
             <CustomAccordian
                header="Grid Lines"
                className="flex flex-col gap-1 px-3 py-2 "
                containerClass="bg-gray-300 w-[100%]"
            >
                <div className="flex justify-between items-center">
                  <span>Show</span>
                  <CustomSwitch 
                    checked={!!plotRecommendation?.[selectedPlot]?.options?.grid?.show}
                    name='show'
                    onChange={(e)=>handleOptionsChange(e, "grid", true)}
                  />
                </div>
                <div className="flex flex-col">
                    <span>Grid Placement</span>
                    <select 
                        value={plotRecommendation?.[selectedPlot]?.options?.grid?.position}
                        name='position'
                        onChange={(e)=>handleOptionsChange(e, "grid")}
                    >
                        <option value="back">Back</option>
                        <option value="front">Front</option>
                    </select>
                </div>
                <div className='flex justify-between items-center'>
                    <span>Border Color</span>
                    <input 
                        type='color'
                        className='h-8 w-8 rounded-md border-none p-0' 
                        name='borderColor'
                        value={plotRecommendation?.[selectedPlot]?.options?.grid?.borderColor} 
                        onChange={(e)=>handleOptionsChange(e, "grid")}
                    />
                </div>
                <div className="flex flex-col">
                    <span>Dash Array</span>
                    <input 
                        type='range'
                        className='accent-[#008085]' 
                        value={plotRecommendation?.[selectedPlot]?.options?.grid?.strokeDashArray||0} 
                        min={0}
                        max={30}
                        name='strokeDashArray'
                        onChange={(e)=>handleOptionsChange(e, "grid")}
                    />
                </div>
                <div className="flex justify-between items-center">
                  <span>X-Lines</span>
                  <CustomSwitch 
                    checked={!!plotRecommendation?.[selectedPlot]?.options?.grid?.xaxis?.lines?.show}
                    name='show'
                    onChange={(e)=>handleToggleAxisGridLine(e, 'xaxis')}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span>Y-Lines</span>
                  <CustomSwitch 
                      checked={!!plotRecommendation?.[selectedPlot]?.options?.grid?.yaxis?.lines?.show}
                      name='show'
                      onChange={(e)=>handleToggleAxisGridLine(e, 'yaxis')}
                  />
                </div>
                <div className='flex flex-col'>
                  <span>Row Colors</span>
                  <div className='flex flex-wrap gap-1'>
                      {plotRecommendation?.[selectedPlot]?.options?.grid?.row?.colors?.map((color, i)=>{
                          return(
                              <input 
                                  key={i}
                                  type='color'
                                  className='h-8 w-8 rounded-md border-none p-0' 
                                  value={color} 
                                  onChange={(e)=>handleGridColorChange(e, i, "row")}
                              />
                          )
                      })}

                      <FaPlus 
                          className='bg-gray-100 text-black rounded-md p-2 h-8 w-8 cursor-pointer hover:bg-slate-200'
                          onClick={()=>handleAddGridColor(false, 'row')}
                      />
                      {plotRecommendation?.[selectedPlot]?.options?.grid?.row?.colors?.length>0 && 
                          <FaDeleteLeft 
                              className='bg-gray-100 text-black rounded-md p-2 h-8 w-8 cursor-pointer hover:bg-slate-200'
                              onClick={()=>handleAddGridColor(true, "row")}
                          />
                      }
                  </div>
              </div>
              <div className="flex flex-col">
                  <span>Row Opacity</span>
                  <input 
                      type='range'
                      className='accent-[#008085]' 
                      value={plotRecommendation?.[selectedPlot]?.options?.grid?.row?.opacity} 
                      min={0}
                      max={1}
                      step="0.1"
                      name='opacity'
                      onChange={(e)=>handleNestOptionsChange(e, "grid", "row")}
                  />
              </div>
                <div className='flex flex-col'>
                  <span>Column Colors</span>
                  <div className='flex flex-wrap gap-1'>
                      {plotRecommendation?.[selectedPlot]?.options?.grid?.column?.colors?.map((color, i)=>{
                          return(
                              <input 
                                  key={i}
                                  type='color'
                                  className='h-8 w-8 rounded-md border-none p-0' 
                                  value={color} 
                                  onChange={(e)=>handleGridColorChange(e, i, "column")}
                              />
                          )
                      })}

                      <FaPlus 
                          className='bg-gray-100 text-black rounded-md p-2 h-8 w-8 cursor-pointer hover:bg-slate-200'
                          onClick={()=>handleAddGridColor(false,"column")}
                      />
                      {plotRecommendation?.[selectedPlot]?.options?.grid?.column?.colors?.length>0 && 
                          <FaDeleteLeft 
                              className='bg-gray-100 text-black rounded-md p-2 h-8 w-8 cursor-pointer hover:bg-slate-200'
                              onClick={()=>handleAddGridColor(true, 'column')}
                          />
                      }
                  </div>
              </div>
              <div className="flex flex-col">
                  <span>Column Opacity</span>
                  <input 
                      type='range'
                      className='accent-[#008085]' 
                      value={plotRecommendation?.[selectedPlot]?.options?.grid?.column?.opacity} 
                      min={0}
                      max={1}
                      step="0.1"
                      name='opacity'
                      onChange={(e)=>handleNestOptionsChange(e, "grid", "column")}
                  />
              </div>
            </CustomAccordian>
             <CustomAccordian
                header="Grid Padding"
                className="flex flex-col px-3 py-2 "
                containerClass="bg-gray-300 w-[100%]"
            >
                <div className="flex flex-col">
                    <span>Top</span>
                    <input 
                        type='range'
                        className='accent-[#008085]' 
                        value={plotRecommendation?.[selectedPlot]?.options?.grid?.padding?.top||0} 
                        min={-50}
                        max={150}
                        name='top'
                        onChange={(e)=>handleNestOptionsChange(e, "grid", "padding")}
                    />
                </div>
                <div className="flex flex-col">
                    <span>Right</span>
                    <input 
                        type='range'
                        className='accent-[#008085]' 
                        value={plotRecommendation?.[selectedPlot]?.options?.grid?.padding?.right||0} 
                        min={-50}
                        max={150}
                        name='right'
                        onChange={(e)=>handleNestOptionsChange(e, "grid", "padding")}
                    />
                </div>
                <div className="flex flex-col">
                    <span>Bottom</span>
                    <input 
                        type='range'
                        className='accent-[#008085]' 
                        value={plotRecommendation?.[selectedPlot]?.options?.grid?.padding?.bottom||0} 
                        min={-50}
                        max={150}
                        name='bottom'
                        onChange={(e)=>handleNestOptionsChange(e, "grid", "padding")}
                    />
                </div>
                <div className="flex flex-col">
                    <span>Left</span>
                    <input 
                        type='range'
                        className='accent-[#008085]' 
                        value={plotRecommendation?.[selectedPlot]?.options?.grid?.padding?.left||0} 
                        min={-50}
                        max={150}
                        name='left'
                        onChange={(e)=>handleNestOptionsChange(e, "grid", "padding")}
                    />
                </div>
            </CustomAccordian>

            
        </CustomAccordian>
        <CustomAccordian 
            header={"Title"}
            className="flex flex-col gap-2 px-3 py-2 bg-gray-200"
            containerClass="w-52"
        >
             <div className="flex justify-between items-center">
                  <span>Floating</span>
                  <CustomSwitch 
                    checked={!!plotRecommendation?.[selectedPlot]?.options?.title?.floating}
                    name='floating'
                    onChange={(e)=>handleOptionsChange(e, "title", true)}
                  />
                </div>
                <div className="flex flex-col">
                    <span>Align Placement</span>
                    <select 
                        value={plotRecommendation?.[selectedPlot]?.options?.title?.align}
                        name='align'
                        onChange={(e)=>handleOptionsChange(e, "title")}
                    >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                    </select>
                </div>
                
                <div className="flex flex-col">
                    <span>Offset X</span>
                    <input 
                        type='range'
                        className='accent-[#008085]' 
                        value={plotRecommendation?.[selectedPlot]?.options?.title?.offsetX||0} 
                        min={-50}
                        max={50}
                        name='offsetX'
                        onChange={(e)=>handleOptionsChange(e, "title")}
                    />
                </div>
                <div className="flex flex-col">
                    <span>Offset Y</span>
                    <input 
                        type='range'
                        className='accent-[#008085]' 
                        value={plotRecommendation?.[selectedPlot]?.options?.title?.offsetY||0} 
                        min={-50}
                        max={50}
                        name='offsetY'
                        onChange={(e)=>handleOptionsChange(e, "title")}
                    />
                </div>
             <CustomAccordian
                header="Styling"
                className="flex flex-col px-3 py-2 "
                containerClass="bg-gray-300 w-[100%]"
            >
                <div className='flex justify-between items-center'>
                    <span>Color</span>
                    <input 
                        type='color'
                        className='h-8 w-8 rounded-md border-none p-0' 
                        name='color'
                        value={plotRecommendation?.[selectedPlot]?.options?.title?.style?.color} 
                        onChange={(e)=>handleNestOptionsChange(e, "title", "style")}
                    />
                </div>
                <div className="flex flex-col">
                    <span>Font Weight</span>
                    <input 
                        type='range'
                        className='accent-[#008085]' 
                        value={plotRecommendation?.[selectedPlot]?.options?.title?.style?.fontWeight} 
                        min={100}
                        max={900}
                        step={100}
                        name='fontWeight'
                        onChange={(e)=>handleNestOptionsChange(e, "title", "style")}
                    />
                </div>
                
            </CustomAccordian>
        </CustomAccordian>

        <CustomAccordian 
            header={"Legend"}
            switchButton={
            <>
                <CustomSwitch 
                  checked={!!plotRecommendation?.[selectedPlot]?.options?.legend?.show}
                  name='show'
                  onChange={(e)=>handleOptionsChange(e, "legend", true)}
                />
            </>}
            className="flex flex-col gap-2 px-3 py-2 bg-gray-200"
            containerClass="w-52"
        >
            <div className="flex flex-col">
                <span>Position</span>
                <select 
                value={plotRecommendation?.[selectedPlot]?.options?.legend?.position}
                name='position'
                onChange={(e)=>handleOptionsChange(e, "legend")}
                >
                <option value="">Select Position</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="right">Right</option>
                <option value="left">Left</option>
                </select>
            </div>
            <div className="flex flex-col">
              <span>Show For Single</span>
              <CustomSwitch 
                checked={!!plotRecommendation?.[selectedPlot]?.options?.legend?.showForSingleSeries}
                name='showForSingleSeries'
                onChange={(e)=>handleOptionsChange(e, "legend", true)}
              />
            </div>
            <div className="flex flex-col">
                <span>OffsetY</span>
                <input 
                type='number' 
                value={plotRecommendation?.[selectedPlot]?.options?.legend?.offsetY||""} 
                name='offsetY'
                onChange={(e)=>handleOptionsChange(e, "legend")}
                />
            </div>
            <div className="flex flex-col">
                <span>OffsetX</span>
                <input 
                type='number' 
                value={plotRecommendation?.[selectedPlot]?.options?.legend?.offsetX||""} 
                name='offsetX'
                onChange={(e)=>handleOptionsChange(e, "legend")}
                />
            </div>
            <div className="flex flex-col">
                <span>Height</span>
                <input 
                type='text' 
                value={plotRecommendation?.[selectedPlot]?.options?.legend?.height} 
                name='height'
                onChange={(e)=>handleOptionsChange(e, "legend")}
                />
            </div>
            <div className="flex flex-col">
                <span>Width</span>
                <input 
                type='text' 
                value={plotRecommendation?.[selectedPlot]?.options?.legend?.width} 
                name='width'
                onChange={(e)=>handleOptionsChange(e, "legend")}
                />
            </div>
            <div className="flex flex-col">
                <span>Position</span>
                <select 
                value={plotRecommendation?.[selectedPlot]?.options?.legend?.horizontalAlign}
                name='horizontalAlign'
                onChange={(e)=>handleOptionsChange(e, "legend")}
                >
                <option value="">Horizontal Align</option>
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
                </select>
            </div>
        </CustomAccordian>
        <CustomAccordian 
            header={"Data Labels"}
            switchButton={
                <>
                  <CustomSwitch 
                    checked={!!plotRecommendation?.[selectedPlot]?.options?.dataLabels?.enabled}
                    name='enabled'
                    onChange={(e)=>handleOptionsChange(e, "dataLabels", true)}
                  />
                </>
            }
            className="flex flex-col gap-2 px-3 py-2 bg-gray-200"
            containerClass="w-52"
            
        >
            <div className="flex flex-col">
                <span>OffsetY</span>
                <input 
                type='range'
                className='accent-[#008085]' 
                value={plotRecommendation?.[selectedPlot]?.options?.dataLabels?.offsetY||0} 
                min={-20}
                max={20}
                name='offsetY'
                onChange={(e)=>handleOptionsChange(e, "dataLabels")}
                />
            </div>
            <div className="flex flex-col">
                <span>OffsetX</span>
                <input 
                type='range'
                className='accent-[#008085]' 
                value={plotRecommendation?.[selectedPlot]?.options?.dataLabels?.offsetX||0} 
                min={-20}
                max={20}
                name='offsetX'
                onChange={(e)=>handleOptionsChange(e, "dataLabels")}
                />
            </div>
            <div className='flex flex-wrap gap-1'>
                {plotRecommendation?.[selectedPlot]?.options?.dataLabels?.style?.colors?.map((color, i)=>{
                    return(
                        <input 
                            key={i}
                            type='color'
                            className='h-8 w-8 rounded-md border-none p-0' 
                            value={color} 
                            onChange={(e)=>handleColorChange(e, i)}
                        />
                    )
                })}

                <FaPlus 
                    className='bg-gray-100 text-black rounded-md p-2 h-8 w-8 cursor-pointer hover:bg-slate-200'
                    onClick={()=>handleAddColor()}
                />
                {plotRecommendation?.[selectedPlot]?.options?.dataLabels?.style?.colors?.length>0 && 
                    <FaDeleteLeft 
                        className='bg-gray-100 text-black rounded-md p-2 h-8 w-8 cursor-pointer hover:bg-slate-200'
                        onClick={()=>handleAddColor(true)}
                    />
                }
            </div>

            <CustomAccordian
                header="Style"
                className="flex flex-col px-3 py-2 "
                containerClass="bg-gray-300 w-[100%]"
            >
                <div className="flex flex-col">
                <span>Font Size</span>
                <input 
                    type='range'
                    className='accent-[#008085]' 
                    value={plotRecommendation?.[selectedPlot]?.options?.dataLabels?.style?.fontSize||""} 
                    min={2}
                    max={80}
                    name='fontSize'
                    onChange={(e)=>handleNestOptionsChange(e, "dataLabels", "style")}
                />
                </div>
                <div className="flex flex-col">
                <span>Font Weight</span>
                <input 
                    type='range'
                    className='accent-[#008085]' 
                    value={plotRecommendation?.[selectedPlot]?.options?.dataLabels?.style?.fontWeight||""} 
                    min={100}
                    max={900}
                    step="100"
                    name='fontWeight'
                    onChange={(e)=>handleNestOptionsChange(e, "dataLabels", "style")}
                />
                </div>
                
                
            </CustomAccordian>

            <CustomAccordian
                header="B-Ground"
                className="flex flex-col px-3 py-2 "
                containerClass="bg-gray-300 w-[100%]"
                switchButton={
                    <>
                        <CustomSwitch 
                          checked={!!plotRecommendation?.[selectedPlot]?.options?.dataLabels?.background?.enabled}
                          name='enabled'
                          onChange={(e)=>handleNestOptionsChange(e, "dataLabels","background", true)}
                        />
                    </>}
            >
                <div className="flex flex-col">
                <span>Border Radius</span>
                <input 
                    type='range'
                    className='accent-[#008085]' 
                    value={plotRecommendation?.[selectedPlot]?.options?.dataLabels?.background?.borderRadius||""} 
                    min={0}
                    max={20}
                    name='borderRadius'
                    onChange={(e)=>handleNestOptionsChange(e, "dataLabels", "background")}
                />
                </div>
                <div className="flex flex-col">
                <span>Padding</span>
                <input 
                    type='range'
                    className='accent-[#008085]' 
                    value={plotRecommendation?.[selectedPlot]?.options?.dataLabels?.background?.padding||""} 
                    min={0}
                    max={20}
                    name='padding'
                    onChange={(e)=>handleNestOptionsChange(e, "dataLabels", "background")}
                />
                </div>
                <div className="flex flex-col">
                <span>Fore Color</span>
                <input 
                    type='color'
                    className='h-8 w-8 rounded-md border-none p-0' 
                    value={plotRecommendation?.[selectedPlot]?.options?.dataLabels?.background?.foreColor||""} 
                    min={0}
                    max={20}
                    name='foreColor'
                    onChange={(e)=>handleNestOptionsChange(e, "dataLabels", "background")}
                />
                </div>
                <div className="flex flex-col">
                <span>Border Color</span>
                <input 
                    type='color'
                    className='h-8 w-8 rounded-md border-none p-0' 
                    value={plotRecommendation?.[selectedPlot]?.options?.dataLabels?.background?.borderColor||""} 
                    min={0}
                    max={20}
                    name='borderColor'
                    onChange={(e)=>handleNestOptionsChange(e, "dataLabels", "background")}
                />
                </div>
                
            </CustomAccordian>

        </CustomAccordian>
        <CustomAccordian 
            header={"Line Style"}
            className="flex flex-col gap-2 px-3 py-2 bg-gray-200"
            containerClass="w-52"
            
        >
            <div className="flex flex-col">
                <span>Line Style</span>
                <select 
                    value={plotRecommendation?.[selectedPlot]?.options?.stroke?.curve}
                    name='curve'
                    onChange={(e)=>handleOptionsChange(e, "stroke")}
                >
                    <option value="">Line Style</option>
                    <option value="smooth">Smooth</option>
                    <option value="straight">Straight</option>
                    <option value="stepline">Stepline</option>
                </select>
            </div>
            <div className='flex flex-col'>
                <span>Line Colors</span>
                <div className='flex flex-wrap gap-1'>
                    {plotRecommendation?.[selectedPlot]?.options?.stroke?.colors?.map((color, i)=>{
                        return(
                            <input 
                                key={i}
                                type='color'
                                className='h-8 w-8 rounded-md border-none p-0' 
                                value={color} 
                                onChange={(e)=>handleLineColorChange(e, i)}
                            />
                        )
                    })}

                    <FaPlus 
                        className='bg-gray-100 text-black rounded-md p-2 h-8 w-8 cursor-pointer hover:bg-slate-200'
                        onClick={()=>handleAddLineColor()}
                    />
                    {plotRecommendation?.[selectedPlot]?.options?.stroke?.colors?.length>0 && 
                        <FaDeleteLeft 
                            className='bg-gray-100 text-black rounded-md p-2 h-8 w-8 cursor-pointer hover:bg-slate-200'
                            onClick={()=>handleAddLineColor(true)}
                        />
                    }
                </div>
            </div>
            <div className="flex flex-col">
                <span>Line Width</span>
                <input 
                    type='range'
                    className='accent-[#008085]' 
                    value={plotRecommendation?.[selectedPlot]?.options?.stroke?.width||0} 
                    min={0}
                    max={30}
                    name='width'
                    onChange={(e)=>handleOptionsChange(e, "stroke")}
                />
            </div>
            <div className="flex flex-col">
                <span>Dash Array</span>
                <input 
                    type='range'
                    className='accent-[#008085]' 
                    value={plotRecommendation?.[selectedPlot]?.options?.stroke?.dashArray||0} 
                    min={0}
                    max={30}
                    name='dashArray'
                    onChange={(e)=>handleOptionsChange(e, "stroke")}
                />
            </div>
            <div className="flex flex-col">
                <span>Line Cap</span>
                <select 
                    value={plotRecommendation?.[selectedPlot]?.options?.stroke?.lineCap}
                    name='lineCap'
                    onChange={(e)=>handleOptionsChange(e, "stroke")}
                >
                    <option value="">Line Cap</option>
                    <option value="round">Round</option>
                    <option value="butt">Butt</option>
                    <option value="square">Square</option>
                </select>
            </div>
            

        </CustomAccordian>
        <CustomAccordian 
            header={"Tooltip"}
            className="flex flex-col gap-2 px-4 py-2 bg-gray-200"
            containerClass="w-52"
            switchButton={
              <CustomSwitch 
                checked={!!plotRecommendation?.[selectedPlot]?.options?.tooltip?.enabled}
                name='enabled'
                onChange={(e)=>handleOptionsChange(e, "tooltip", true)}
              />
            }
        >
          {plotRecommendation?.[selectedPlot]?.options?.tooltip?.enabled ?
            <>
              {!plotRecommendation?.[selectedPlot]?.options?.tooltip?.fixed?.enabled && 
                <div className="flex justify-between items-center">
                  <span>Fixed</span>
                  <CustomSwitch 
                    checked={plotRecommendation?.[selectedPlot]?.options?.tooltip?.fixed?.enabled}
                    name='enabled'
                    onChange={(e)=>handleNestOptionsChange(e, "tooltip","fixed", true)}
                  />
                </div>
              }
              {plotRecommendation?.[selectedPlot]?.options?.tooltip?.fixed?.enabled && 
                <CustomAccordian
                  header="Fixed"
                  className="flex flex-col px-3 py-2 "
                  containerClass="bg-gray-300 w-[100%]"
                  switchButton={
                    <CustomSwitch 
                      checked={plotRecommendation?.[selectedPlot]?.options?.tooltip?.fixed?.enabled}
                      name='enabled'
                      onChange={(e)=>handleNestOptionsChange(e, "tooltip","fixed", true)}
                    />
                  }
                >
                  <div className="flex flex-col">
                    <span>Type</span>
                    <select 
                        value={plotRecommendation?.[selectedPlot]?.options?.tooltip?.fixed?.position}
                        name='position'
                        onChange={(e)=>handleNestOptionsChange(e, "tooltip", "fixed")}
                    >
                        <option value="topRight">Top Right</option>
                        <option value="topLeft">Top Left</option>
                        <option value="bottomLeft">Bottom Left</option>
                        <option value="bottomRight">Bottom Right</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <span>Offset X</span>
                    <input 
                        type='range'
                        className='accent-[#008085]' 
                        value={plotRecommendation?.[selectedPlot]?.options?.tooltip?.fixed?.offsetX||0} 
                        min={-200}
                        max={200}
                        name='offsetX'
                        onChange={(e)=>handleNestOptionsChange(e, "tooltip", "fixed")}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span>Offset Y</span>
                    <input 
                        type='range'
                        className='accent-[#008085]' 
                        value={plotRecommendation?.[selectedPlot]?.options?.tooltip?.fixed?.offsetY||0} 
                        min={-200}
                        max={200}
                        name='offsetY'
                        onChange={(e)=>handleNestOptionsChange(e, "tooltip", "fixed")}
                    />
                  </div>
                </CustomAccordian>
              }
              {!plotRecommendation?.[selectedPlot]?.options?.tooltip?.intersect && 
                <div className="flex justify-between items-center">
                    <span>Shared</span>
                    <CustomSwitch 
                      checked={plotRecommendation?.[selectedPlot]?.options?.tooltip?.shared}
                      name='shared'
                      onChange={(e)=>handleOptionsChange(e, "tooltip", true)}
                    />
                </div>
              }
                <div className="flex justify-between items-center">
                    <span>Follow Cursor</span>
                    <CustomSwitch 
                      checked={plotRecommendation?.[selectedPlot]?.options?.tooltip?.followCursor}
                      name='followCursor'
                      onChange={(e)=>handleOptionsChange(e, "tooltip", true)}
                    />
                </div>
                {!plotRecommendation?.[selectedPlot]?.options?.tooltip?.shared && 
                  <div className="flex justify-between items-center">
                      <span>Intersect</span>
                      <CustomSwitch 
                        checked={plotRecommendation?.[selectedPlot]?.options?.tooltip?.intersect}
                        name='intersect'
                        onChange={(e)=>handleOptionsChange(e, "tooltip", true)}
                      />
                  </div>
                }
                <div className="flex justify-between items-center">
                    <span>Inverse Order</span>
                    <CustomSwitch 
                      checked={plotRecommendation?.[selectedPlot]?.options?.tooltip?.inverseOrder}
                      name='inverseOrder'
                      onChange={(e)=>handleOptionsChange(e, "tooltip", true)}
                    />
                </div>
                <div className="flex justify-between items-center">
                    <span>Inverse Order</span>
                    <CustomSwitch 
                      checked={plotRecommendation?.[selectedPlot]?.options?.tooltip?.fillSeriesColor}
                      name='fillSeriesColor'
                      onChange={(e)=>handleOptionsChange(e, "tooltip", true)}
                    />
                </div>
                <div className="flex justify-between items-center">
                    <span>Marker</span>
                    <CustomSwitch 
                      checked={plotRecommendation?.[selectedPlot]?.options?.tooltip?.marker?.show}
                      name='show'
                      onChange={(e)=>handleNestOptionsChange(e, "tooltip","marker", true)}
                    />
                </div>
            </>
            :
            <div className="flex justify-between items-center">
              <span>Show</span>
              <CustomSwitch 
                checked={!!plotRecommendation?.[selectedPlot]?.options?.tooltip?.enabled}
                name='enabled'
                onChange={(e)=>handleOptionsChange(e, "tooltip", true)}
              />
            </div>
          }
        </CustomAccordian>
        {markerSupportKinds.includes(plotRecommendation[selectedPlot]?.kind[0]) && 
          <CustomAccordian 
              header={"Markers"}
              switchButton={
              <>
                  <CustomSwitch 
                    checked={plotRecommendation?.[selectedPlot]?.options?.markers?.size>0}
                    name='enabled'
                    onChange={handleToggleMarkers}
                  />
              </>}
              className="flex flex-col gap-2 px-3 py-2 bg-gray-200"
              containerClass="w-52"
              
          >
              <div className="flex flex-col">
                  <span>Size</span>
                  <input 
                  type='range'
                  className='accent-[#008085]' 
                  value={plotRecommendation?.[selectedPlot]?.options?.markers?.size||""} 
                  min={0}
                  max={25}
                  name='size'
                  onChange={(e)=>handleOptionsChange(e, "markers")}
                  />
              </div>
              
              <div className="flex flex-col">
                  <span>Opacity</span>
                  <input 
                  type='range'
                  className='accent-[#008085]' 
                  value={plotRecommendation?.[selectedPlot]?.options?.markers?.fillOpacity||""} 
                  min={0}
                  max={1}
                  step="0.1"
                  name='fillOpacity'
                  onChange={(e)=>handleOptionsChange(e, "markers")}
                  />
              </div>
              <div className='flex flex-col'>
                  <span>Colors</span>
                  <div className='flex flex-wrap gap-1'>
                      {plotRecommendation?.[selectedPlot]?.options?.markers?.colors?.map((color, i)=>{
                          return(
                              <input 
                                  key={i}
                                  type='color'
                                  className='h-8 w-8 rounded-md border-none p-0' 
                                  value={color} 
                                  onChange={(e)=>handleMarkerColorChange(e, i)}
                              />
                          )
                      })}

                      <FaPlus 
                          className='bg-gray-100 text-black rounded-md p-2 h-8 w-8 cursor-pointer hover:bg-slate-200'
                          onClick={()=>handleAddMarkerColor()}
                      />
                      {plotRecommendation?.[selectedPlot]?.options?.markers?.colors?.length>0 && 
                          <FaDeleteLeft 
                              className='bg-gray-100 text-black rounded-md p-2 h-8 w-8 cursor-pointer hover:bg-slate-200'
                              onClick={()=>handleAddMarkerColor(true)}
                          />
                      }
                  </div>
              </div>
              <div className="flex flex-col">
                  <span>Border Color</span>
                  <input 
                  type='color'
                  className='h-8 w-8 rounded-md border-none p-0' 
                  value={plotRecommendation?.[selectedPlot]?.options?.markers?.strokeColors||""} 
                  name='strokeColors'
                  onChange={(e)=>handleOptionsChange(e, "markers")}
                  />
              </div>
              <div className="flex flex-col">
                  <span>Border Width</span>
                  <input 
                  type='range'
                  className='accent-[#008085]' 
                  value={plotRecommendation?.[selectedPlot]?.options?.markers?.strokeWidth||""} 
                  min={0}
                  max={10}
                  name='strokeWidth'
                  onChange={(e)=>handleOptionsChange(e, "markers")}
                  />
              </div>
              <div className="flex flex-col">
                  <span>Border Dash</span>
                  <input 
                  type='range'
                  className='accent-[#008085]' 
                  value={plotRecommendation?.[selectedPlot]?.options?.markers?.strokeDashArray||""} 
                  min={0}
                  max={28}
                  name='strokeDashArray'
                  onChange={(e)=>handleOptionsChange(e, "markers")}
                  />
              </div>
              <div className="flex flex-col">
                  <span>Border Opacity</span>
                  <input 
                  type='range'
                  className='accent-[#008085]' 
                  value={plotRecommendation?.[selectedPlot]?.options?.markers?.strokeOpacity||""} 
                  min={0}
                  max={1}
                  step="0.1"
                  name='strokeOpacity'
                  onChange={(e)=>handleOptionsChange(e, "markers")}
                  />
              </div>
              <div className="flex flex-col">
                  <span>Shape</span>
                  <select 
                  value={plotRecommendation?.[selectedPlot]?.options?.markers?.shape}
                  name='shape'
                  onChange={(e)=>handleOptionsChange(e, "markers")}
                  >
                  <option value="circle">Circle</option>
                  <option value="square">Square</option>
                  </select>
              </div>
              <CustomAccordian
                  header="Hover"
                  className="flex flex-col px-3 py-2 "
                  containerClass="bg-gray-300 w-[100%]"
              >
                  <div className="flex flex-col">
                  <span>Size</span>
                  <input 
                      type='range'
                      className='accent-[#008085]' 
                      value={plotRecommendation?.[selectedPlot]?.options?.markers?.hover?.size||""} 
                      min={0}
                      max={25}
                      name='size'
                      onChange={(e)=>handleNestOptionsChange(e, "markers", "hover")}
                  />
                  </div>
                  <div className="flex flex-col">
                  <span>Size Offset</span>
                  <input 
                      type='range'
                      className='accent-[#008085]' 
                      value={plotRecommendation?.[selectedPlot]?.options?.markers?.hover?.sizeOffset||""} 
                      min={0}
                      max={25}
                      name='sizeOffset'
                      onChange={(e)=>handleNestOptionsChange(e, "markers", "hover")}
                  />
                  </div>
              </CustomAccordian>

          </CustomAccordian>
        }
        {barChartTypes.includes(plotRecommendation[selectedPlot]?.kind[0]) &&
          <CustomAccordian 
              header={plotRecommendation[selectedPlot].kind[0].split("-")[0].toUpperCase()}
              className="flex flex-col gap-2 px-3 py-2 bg-gray-200"
              containerClass="w-52"
          >
            <div className="flex justify-between items-center">
              <span>Distributed</span>
              <CustomSwitch 
                checked={plotRecommendation?.[selectedPlot]?.options?.plotOptions?.bar?.distributed}
                name='distributed'
                onChange={(e)=>handlePlotOptionsChange(e, "bar", true)}
              />
            </div>
            <div className="flex flex-col">
                <span>Border Radius</span>
                <input 
                  type='range'
                  className='accent-[#008085]' 
                  value={plotRecommendation?.[selectedPlot]?.options?.plotOptions?.bar?.borderRadius||0} 
                  min={0}
                  max={50}
                  name='borderRadius'
                  onChange={(e)=>handlePlotOptionsChange(e, "bar")}
                />
            </div>
            <div className="flex flex-col">
                <span>Column Width</span>
                <input 
                  type='range'
                  className='accent-[#008085]' 
                  value={plotRecommendation?.[selectedPlot]?.options?.plotOptions?.bar?.columnWidth||""} 
                  min={0}
                  max={150}
                  name='columnWidth'
                  onChange={(e)=>handlePlotOptionsChange(e, "bar")}
                />
            </div>
            <div className="flex flex-col">
                <span>Bar Height</span>
                <input 
                  type='range'
                  className='accent-[#008085]' 
                  value={plotRecommendation?.[selectedPlot]?.options?.plotOptions?.bar?.barHeight||""} 
                  min={0}
                  max={150}
                  name='barHeight'
                  onChange={(e)=>handlePlotOptionsChange(e, "bar")}
                />
            </div>
            <div className="flex flex-col">
              <span>Data Labels Position</span>
              <select 
                  value={plotRecommendation?.[selectedPlot]?.options?.plotOptions?.bar?.dataLabels?.position||""} 
                  name='position'
                  onChange={(e)=>handleNestPlotOptionsChange(e, "bar", "dataLabels")}
              >
                  <option value="">Position</option>
                  <option value="top">Top</option>
                  <option value="center">Center</option>
                  <option value="bottom">Bottom</option>
              </select>
            </div>
            <div className="flex flex-col">
              <span>Orientation</span>
              <select 
                  value={plotRecommendation?.[selectedPlot]?.options?.plotOptions?.bar?.dataLabels?.orientation||""} 
                  name='orientation'
                  onChange={(e)=>handleNestPlotOptionsChange(e, "bar", "dataLabels")}
              >
                  <option value="horizontal">Horizontal</option>
                  <option value="vertical">Vertical</option>
              </select>
            </div>
            <div className="flex flex-col">
              <span>B-Radius Application</span>
              <select 
                  value={plotRecommendation?.[selectedPlot]?.options?.plotOptions?.bar?.borderRadiusApplication||0} 
                  name='borderRadiusApplication'
                  onChange={(e)=>handlePlotOptionsChange(e, "bar")}
              >
                  <option value="">Radius Application</option>
                  <option value="around">Around</option>
                  <option value="end">End</option>
              </select>
            </div>
          </CustomAccordian>
        } 
        {pieChartTypes.includes(plotRecommendation[selectedPlot]?.kind[0]) &&
          <CustomAccordian 
              header={plotRecommendation[selectedPlot].kind[0].split("-")[0].toUpperCase()}
              className="flex flex-col gap-2 px-3 py-2 bg-gray-200"
              containerClass="w-52"
          >
            <div className="flex flex-col">
                <span>Offset X</span>
                <input 
                  type='range'
                  className='accent-[#008085]' 
                  value={plotRecommendation?.[selectedPlot]?.options?.plotOptions?.pie?.offsetX||0} 
                  min={-50}
                  max={50}
                  name='offsetX'
                  onChange={(e)=>handlePlotOptionsChange(e, "pie")}
                />
            </div>
            <div className="flex flex-col">
                <span>Offset Y</span>
                <input 
                  type='range'
                  className='accent-[#008085]' 
                  value={plotRecommendation?.[selectedPlot]?.options?.plotOptions?.pie?.offsetY||0} 
                  min={-50}
                  max={50}
                  name='offsetY'
                  onChange={(e)=>handlePlotOptionsChange(e, "pie")}
                />
            </div>
            <div className="flex flex-col">
                <span>Start Angle</span>
                <input 
                  type='range'
                  className='accent-[#008085]' 
                  value={plotRecommendation?.[selectedPlot]?.options?.plotOptions?.pie?.startAngle||0} 
                  min={-360}
                  max={360}
                  name='startAngle'
                  onChange={(e)=>handlePlotOptionsChange(e, "pie")}
                />
            </div>
            <div className="flex flex-col">
                <span>End Angle</span>
                <input 
                  type='range'
                  className='accent-[#008085]' 
                  value={plotRecommendation?.[selectedPlot]?.options?.plotOptions?.pie?.endAngle||0} 
                  min={0}
                  max={360}
                  name='endAngle'
                  onChange={(e)=>handlePlotOptionsChange(e, "pie")}
                />
            </div>
            <div className="flex flex-col">
                <span>Custom Scale</span>
                <input 
                  type='range'
                  className='accent-[#008085]' 
                  value={plotRecommendation?.[selectedPlot]?.options?.plotOptions?.pie?.customScale||0} 
                  min={0}
                  max={1.5}
                  step={0.1}
                  name='customScale'
                  onChange={(e)=>handlePlotOptionsChange(e, "pie")}
                />
            </div>
          </CustomAccordian>
        } 
        {plotRecommendation[selectedPlot]?.kind[0]==="radar" &&
          <CustomAccordian 
              header={plotRecommendation[selectedPlot].kind[0].split("-")[0].toUpperCase()}
              className="flex flex-col gap-2 px-3 py-2 bg-gray-200"
              containerClass="w-52"
          >
            <div className="flex flex-col">
                <span>Offset X</span>
                <input 
                  type='range'
                  className='accent-[#008085]' 
                  value={plotRecommendation?.[selectedPlot]?.options?.plotOptions?.radar?.offsetX||0} 
                  min={-50}
                  max={50}
                  name='offsetX'
                  onChange={(e)=>handlePlotOptionsChange(e, "radar")}
                />
            </div>
            <div className="flex flex-col">
                <span>Offset Y</span>
                <input 
                  type='range'
                  className='accent-[#008085]' 
                  value={plotRecommendation?.[selectedPlot]?.options?.plotOptions?.radar?.offsetY||0} 
                  min={-50}
                  max={50}
                  name='offsetY'
                  onChange={(e)=>handlePlotOptionsChange(e, "radar")}
                />
            </div>
            <div className="flex flex-col">
                <span>Size</span>
                <input 
                  type='range'
                  className='accent-[#008085]' 
                  value={plotRecommendation?.[selectedPlot]?.options?.plotOptions?.radar?.size||0} 
                  min={20}
                  max={200}
                  name='size'
                  onChange={(e)=>handlePlotOptionsChange(e, "radar")}
                />
            </div>
            <CustomAccordian
              header="Polygon"
              className="flex flex-col px-3 py-2 "
              containerClass="bg-gray-300 w-[100%]"
            >

              <div className="flex flex-col">
                <span>Stroke Width</span>
                <input 
                  type='range'
                  className='accent-[#008085]' 
                  value={plotRecommendation?.[selectedPlot]?.options?.plotOptions?.radar?.polygons?.strokeWidth||0} 
                  min={0}
                  max={10}
                  name='strokeWidth'
                  onChange={(e)=>handleNestPlotOptionsChange(e, "radar", "polygons")}
                />
              </div>
              <div className="flex flex-col">
                <span>Stroke Color</span>
                <input 
                  type='color'
                  className='h-8 w-8 rounded-md border-none p-0' 
                  name='strokeColors'
                  value={plotRecommendation?.[selectedPlot]?.options?.plotOptions?.radar?.polygons?.strokeColors} 
                  onChange={(e)=>handleNestPlotOptionsChange(e, "radar", "polygons")}
                />
              </div>
              <div className="flex flex-col">
                <span>Stroke Color</span>
                <input 
                  type='color'
                  className='h-8 w-8 rounded-md border-none p-0' 
                  name='connectorColors'
                  value={plotRecommendation?.[selectedPlot]?.options?.plotOptions?.radar?.polygons?.connectorColors} 
                  onChange={(e)=>handleNestPlotOptionsChange(e, "radar", "polygons")}
                />
              </div>
              <div className='flex flex-col'>
                <span>Fill Colors</span>
                <div className='flex flex-wrap gap-1'>
                    {plotRecommendation?.[selectedPlot]?.options?.plotOptions?.radar?.polygons?.fill?.colors?.map((color, i)=>{
                        return(
                            <input 
                                key={i}
                                type='color'
                                className='h-8 w-8 rounded-md border-none p-0' 
                                value={color} 
                                onChange={(e)=>handleRadarPolygonColorChange(e, i)}
                            />
                        )
                    })}

                    <FaPlus 
                        className='bg-gray-100 text-black rounded-md p-2 h-8 w-8 cursor-pointer hover:bg-slate-200'
                        onClick={()=>handleAddRadarPolygonColor()}
                    />
                    {plotRecommendation?.[selectedPlot]?.options?.colors?.length>0 && 
                        <FaDeleteLeft 
                            className='bg-gray-100 text-black rounded-md p-2 h-8 w-8 cursor-pointer hover:bg-slate-200'
                            onClick={()=>handleAddRadarPolygonColor(true)}
                        />
                    }
                </div>
              </div>
            </CustomAccordian>
          </CustomAccordian>
        } 
    </>
  )
}

export default ChartVisualsTools

const CustomSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: "#095458",
    '&:hover': {
      backgroundColor: alpha("#095458", theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: "#095458",
  },
}));

const CustomOption = (props) => {
  const { data, innerRef, innerProps } = props;
  return (
    <div ref={innerRef} {...innerProps} className="p-2 text-sm flex items-center flex-col gap-1 cursor-pointer hover:bg-gray-200">
      <span>{data.label}</span>
      <span className='flex gap-2 bg-gray-100'>
        {data.colors.map((color, index)=>{
        return(
          <span key={index} className={`h-5 w-5`} style={{background:color}}></span>
        )
      })}
      </span>
    </div>
  );
};
const CustomDropdownIndicator = (props) => {
  const { selectProps } = props;

  return (
    <components.DropdownIndicator {...props}>
      {selectProps.menuIsOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="8"
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
          width="8"
          height="8"
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
const customStyles = {
  control: (base, state) => ({
    ...base,
    padding: "0px", // Custom padding
    fontSize: "12px", // Custom font size
    borderRadius: "3px", // Rounded corners
    borderColor: state.isFocused ? "#007bff" : "#ccc", // Border color change on focus
    boxShadow: state.isFocused ? "0 0 5px rgba(0, 123, 255, 0.5)" : "none",
    minHeight:"auto",
    "&:hover": {
      borderColor: "#007bff",
    },
  }),
  menu: (base) => ({
    ...base,
    fontSize: "12px", // Custom font size for dropdown menu
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    padding: "10px 15px", // Custom padding for options
    fontSize: "14px",
    backgroundColor: isSelected ? "#007bff" : isFocused ? "#f1f1f1" : "white",
    color: isSelected ? "white" : "black",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#007bff",
      color: "white",
    },
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: "14px",
    color: "#777",
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: "14px",
    padding:"0px"
  }),
};