import React from 'react'
import { UseDescriptiveContext } from '../../../../../../context/DescriptiveProvider'
import CustomAccordian from '../CustomAccordian'


const CardVisualTools = () => {
    const {plotRecommendation, setPlotRecommendation, selectedPlot} = UseDescriptiveContext()
    const handleOptionsChange = (e, styleType, unit) => {
        if (plotRecommendation[selectedPlot]) {
            let { name, value } = e.target;
            setPlotRecommendation(prev => {
                const tempData = [...prev]; 
                tempData[selectedPlot] = { 
                    ...tempData[selectedPlot],
                    [styleType]: { 
                        ...tempData[selectedPlot][styleType], 
                        [name]:unit?value+unit:value
                    }
                };
                return tempData;
            });
        }
    };
    const handleBackgroundFitChange = (e, styleType) => {
        const backgroundOptions={
            normal:{backgroundRepeat:"no-repeat", backgroundSize:"auto", backgroundPosition:"center"},
            fit:{backgroundRepeat:"round", backgroundSize:"cover", backgroundPosition:"unset"},
            fill:{backgroundRepeat:"no-repeat", backgroundSize:"contain", backgroundPosition:"center"},
        }
        if (plotRecommendation[selectedPlot]) {
            let { name, value } = e.target;
            setPlotRecommendation(prev => {
                const tempData = [...prev]; 
                tempData[selectedPlot] = { 
                    ...tempData[selectedPlot],
                    [styleType]: {
                        ...tempData[selectedPlot][styleType], 
                        ...backgroundOptions[value],
                        [name]:value
                    }
                };
                return tempData;
            });
        }
    };
    console.log(plotRecommendation[selectedPlot])
    const handleImageUpload = (e, styleType) => {
        if (plotRecommendation[selectedPlot]) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    setPlotRecommendation(prev => {
                        const tempData = [...prev];
                        tempData[selectedPlot] = { 
                            ...tempData[selectedPlot], 
                            [styleType]: { 
                                ...tempData[selectedPlot]?.[styleType], 
                                backgroundImage: `url(${reader.result})` 
                            } 
                        };
                        return tempData;
                    });
                };
                reader.readAsDataURL(file);
            }
        }
    };
  return (
    <>
        <CustomAccordian
            header="Card"
            className="flex flex-col gap-1 px-3 ps-4 py-2 bg-gray-200 "
            containerClass="w-[100%]"
        >
            <CustomAccordian
                header="Background"
                className="flex flex-col px-3 py-2 gap-2 "
                containerClass="bg-gray-300 w-[100%]"
            >
                <div className='flex justify-between items-center'>
                    <span className='text-sm'>Background Color</span>
                    <input 
                        type='color'
                        className='h-8 w-8 rounded-md border-none p-0' 
                        name='backgroundColor'
                        value={plotRecommendation?.[selectedPlot]?.card?.backgroundColor} 
                        onChange={(e)=>handleOptionsChange(e, "card")}
                    />
                </div>
                
                <div className='flex flex-col'>
                    <span className='text-sm'>Background Image</span>
                    <input 
                        type='file'
                        className='rounded-md border-none p-0' 
                        name='backgroundImage'
                        // value={plotRecommendation?.[selectedPlot]?.card?.backgroundImage} 
                        onChange={(e)=>handleImageUpload(e, "card")}
                    />
                </div>
                <div className='flex justify-between items-center'>
                    <span className='text-sm'>Image Fit</span>
                    <select 
                        value={plotRecommendation?.[selectedPlot]?.card?.backgroundType}
                        name='backgroundType'
                        onChange={(e)=>handleBackgroundFitChange(e, "card")}
                    >
                        <option value="normal">Normal</option>
                        <option value="fit">Fit</option>
                        <option value="fill">Fill</option>
                    </select>
                </div>

            </CustomAccordian>
            <CustomAccordian
                header="Padding"
                className="flex flex-col px-3 py-2 gap-2 "
                containerClass="bg-gray-300 w-[100%]"
            >
                <div className='flex flex-col'>
                    <span className='text-sm flex items-center justify-between'>
                        <span>Padding Top</span>
                        <span className='text-blue-800'>{plotRecommendation?.[selectedPlot]?.card?.paddingTop}</span>
                    </span>
                    <input 
                        type='range'
                        className='accent-[#008085]' 
                        value={parseInt(plotRecommendation?.[selectedPlot]?.card?.paddingTop)}
                        min={0}
                        max={50}
                        name='paddingTop'
                        onChange={(e)=>handleOptionsChange(e, "card", "px")}
                    />
                </div>
                <div className='flex flex-col'>
                    <span className='text-sm flex items-center justify-between'>
                        <span>Padding Bottom</span>
                        <span className='text-blue-800'>{plotRecommendation?.[selectedPlot]?.card?.paddingBottom}</span>
                    </span>
                    <input 
                        type='range'
                        className='accent-[#008085]' 
                        value={parseInt(plotRecommendation?.[selectedPlot]?.card?.paddingBottom)}
                        min={0}
                        max={50}
                        name='paddingBottom'
                        onChange={(e)=>handleOptionsChange(e, "card", "px")}
                    />
                </div>
                <div className='flex flex-col'>
                    <span className='text-sm flex items-center justify-between'>
                        <span>Padding Left</span>
                        <span className='text-blue-800'>{plotRecommendation?.[selectedPlot]?.card?.paddingLeft}</span>
                    </span>
                    <input 
                        type='range'
                        className='accent-[#008085]' 
                        value={parseInt(plotRecommendation?.[selectedPlot]?.card?.paddingLeft)}
                        min={0}
                        max={50}
                        name='paddingLeft'
                        onChange={(e)=>handleOptionsChange(e, "card", "px")}
                    />
                </div>
                <div className='flex flex-col'>
                    <span className='text-sm flex items-center justify-between'>
                        <span>Padding Right</span>
                        <span className='text-blue-800'>{plotRecommendation?.[selectedPlot]?.card?.paddingRight}</span>
                    </span>
                    <input 
                        type='range'
                        className='accent-[#008085]' 
                        value={parseInt(plotRecommendation?.[selectedPlot]?.card?.paddingRight)}
                        min={0}
                        max={50}
                        name='paddingRight'
                        onChange={(e)=>handleOptionsChange(e, "card", "px")}
                    />
                </div>
            </CustomAccordian>
        </CustomAccordian>
    </>
  )
}

export default CardVisualTools





const inputTypes = [
    {
        "heading":"Layout",
        "value":"layout",
        "type":"dropdown",
        "children":[
            {
                "heading":"Background Color",
                "value":"backgroundColor",
                "type":"color",
            },
            {
                "heading":"Padding",
                "value":"padding",
                "type":"color",
            },
            {
                "heading":"Border Color",
                "value":"borderColor",
                "type":"color",
            },

        ]
    }
]