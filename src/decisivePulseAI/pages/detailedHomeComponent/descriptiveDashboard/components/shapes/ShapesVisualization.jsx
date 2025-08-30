import React from "react";
import { UseDescriptiveContext } from '../../../../../../context/DescriptiveProvider'
import CustomAccordian from '../CustomAccordian'

const ShapeVisualizationTool = () => {
    const { plotRecommendation, setPlotRecommendation, selectedPlot } = UseDescriptiveContext();
    
    const handleOptionsChange = (e, styleType, unit) => {
        if (plotRecommendation[selectedPlot]) {
            let { name, value } = e.target;
            setPlotRecommendation(prev => {
                const tempData = [...prev]; 
                tempData[selectedPlot] = { 
                    ...tempData[selectedPlot],
                    [styleType]: { 
                        ...tempData[selectedPlot][styleType], 
                        [name]: unit ? value + unit : value
                    }
                };
                return tempData;
            });
        }
    };

    const handleBackgroundFitChange = (e, styleType) => {
        const backgroundOptions = {
            normal: { backgroundRepeat: "no-repeat", backgroundSize: "auto", backgroundPosition: "center" },
            fit: { backgroundRepeat: "round", backgroundSize: "cover", backgroundPosition: "unset" },
            fill: { backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center" },
        };
        if (plotRecommendation[selectedPlot]) {
            let { name, value } = e.target;
            setPlotRecommendation(prev => {
                const tempData = [...prev]; 
                tempData[selectedPlot] = { 
                    ...tempData[selectedPlot],
                    [styleType]: {
                        ...tempData[selectedPlot][styleType], 
                        ...backgroundOptions[value],
                        [name]: value
                    }
                };
                return tempData;
            });
        }
    };

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
            <CustomAccordian header="Shape" className="flex flex-col gap-1 px-3 py-2 bg-gray-200" containerClass="w-[100%]">
                <CustomAccordian header="Background" className="flex flex-col px-3 py-2 gap-2" containerClass="bg-gray-300 w-[100%]">
                    {/* <div className='flex justify-between items-center'>
                        <span className='text-[13px]'>Shape Color</span>
                        <input 
                            type='color'
                            className='h-6 w-6 rounded-md border p-0' 
                            name='backgroundColor'
                            value={plotRecommendation?.[selectedPlot]?.shape?.backgroundColor} 
                            onChange={(e) => handleOptionsChange(e, "shape")}
                        />
                    </div> */}
                    
                    <div className='flex flex-col gap-1'>
                        <span className='text-[13px]'>Background Image</span>
                        <input 
                            type='file'
                            className='h-8 w-[full] rounded-md border p-1 text-xs' 
                            name='backgroundImage'
                            onChange={(e) => handleImageUpload(e, "shape")}
                        />
                    </div>
                    
                    <div className='flex justify-between items-center gap-x-4'>
                        <span className='text-[13px]'>Image Fit</span>
                        <select 
                            className='text-[13px] border rounded h-6 w-20'
                            value={plotRecommendation?.[selectedPlot]?.shape?.backgroundType}
                            name='backgroundType'
                            onChange={(e) => handleBackgroundFitChange(e, "shape")}
                        >
                            <option value="normal">Normal</option>
                            <option value="fit">Fit</option>
                            <option value="fill">Fill</option>
                        </select>
                    </div>

                </CustomAccordian>
                
                {/* <CustomAccordian header="Padding" className="flex flex-col px-3 py-2 gap-2" containerClass="bg-gray-300 w-[100%]">
                {['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'].map((padding) => (
                    <div className="flex items-center justify-between w-42" key={padding}>
                        <span className="text-[13px]">{padding.replace(/([A-Z])/g, ' $1')}</span>
                        <input
                            type="number"
                            className="w-12 border border-gray-300 rounded p-1 text-black-800 text-center"
                            value={parseInt(plotRecommendation?.[selectedPlot]?.shape?.[padding]) || 0}
                            min={0}
                            max={50}
                            name={padding}
                            onChange={(e) => handleOptionsChange(e, "shape", "px")}
                        />
                    </div>
                ))}

                </CustomAccordian> */}
            </CustomAccordian>

            <CustomAccordian header="Style" className="flex flex-col gap-1 px-3 ps-4 py-2 bg-gray-200 " containerClass="w-[100%]">   
              {/* 📝 Text Customization */}
              <div className="border-b pb-2 mb-2">
                  <h3 className="font-semibold">Title</h3>

                  {/* Text Input */}
                  <div className="flex flex-col">
                      <span>Text</span>
                      <input type="text" name="text"
                          value={plotRecommendation?.[selectedPlot]?.style?.text || ""}
                          onChange={(e) => handleOptionsChange(e, "style")}
                          placeholder="Enter your text"
                          className="border px-2 py-1 rounded"
                      />
                  </div>

                  {/* Text Color */}
                  <div className="flex flex-col">
                      <span>Text Color</span>
                      <input type="color" name="textColor"
                          value={plotRecommendation?.[selectedPlot]?.style?.textColor || "#000000"}
                          onChange={(e) => handleOptionsChange(e, "style")}
                      />
                  </div>

                  {/* Text Size */}
                  <div className="flex flex-col">
                      <span>Text Size (px)</span>
                      <input type="number" name="fontSize"
                          value={plotRecommendation?.[selectedPlot]?.style?.fontSize || 14}
                          onChange={(e) => handleOptionsChange(e, "style")}
                      />
                  </div>

                  {/* Letter Spacing */}
                  <div className="flex flex-col">
                      <span>Letter Spacing (px)</span>
                      <input type="number" name="letterSpacing"
                          value={plotRecommendation?.[selectedPlot]?.style?.letterSpacing || 0}
                          onChange={(e) => handleOptionsChange(e, "style")}
                      />
                  </div>

                  {/* Line Height */}
                  <div className="flex flex-col">
                      <span>Text Spacing (line-height)</span>
                      <input type="number" name="lineHeight"
                          value={plotRecommendation?.[selectedPlot]?.style?.lineHeight || 1.5}
                          onChange={(e) => handleOptionsChange(e, "style")}
                      />
                  </div>
              </div>
              
              {/* 🎨 Background & Extra Color */}
              <div className="border-b pb-2 mb-2">
                  <h3 className="font-semibold">Colors</h3>

                  {/* Background Color */}
                  <div className="flex flex-col">
                      <span>Background Color</span>
                      <input type="color" name="backgroundColor"
                          value={plotRecommendation?.[selectedPlot]?.style?.backgroundColor || "#ffffff"}
                          onChange={(e) => handleOptionsChange(e, "style")}
                      />
                  </div>

                  {/* Extra Color (For other styling needs) */}
                  <div className="flex flex-col">
                      <span>Shape Color</span>
                      <input type="color" name="extraColor"
                          value={plotRecommendation?.[selectedPlot]?.style?.extraColor || "#000000"}
                          onChange={(e) => handleOptionsChange(e, "style")}
                      />
                  </div>
              </div>

              {/* 📏 Padding & Spacing */}
              <div className="border-b pb-2 mb-2">
                  <h3 className="font-semibold">Padding</h3>

                  <div className="grid grid-cols-2 gap-2">
                      <input type="number" name="paddingTop" placeholder="Padding Top"
                          value={plotRecommendation?.[selectedPlot]?.style?.paddingTop || 0}
                          onChange={(e) => handleOptionsChange(e, "style")}
                      />
                      <input type="number" name="paddingRight" placeholder="Padding Right"
                          value={plotRecommendation?.[selectedPlot]?.style?.paddingRight || 0}
                          onChange={(e) => handleOptionsChange(e, "style")}
                      />
                      <input type="number" name="paddingBottom" placeholder="Padding Bottom"
                          value={plotRecommendation?.[selectedPlot]?.style?.paddingBottom || 0}
                          onChange={(e) => handleOptionsChange(e, "style")}
                      />
                      <input type="number" name="paddingLeft" placeholder="Padding Left"
                          value={plotRecommendation?.[selectedPlot]?.style?.paddingLeft || 0}
                          onChange={(e) => handleOptionsChange(e, "style")}
                      />
                  </div>
              </div>

              {/* 🎭 Border Customization */}
              <div className="border-b pb-2 mb-2">
                  <h3 className="font-semibold">Border</h3>

                  <div className="flex flex-col">
                      <span>Border Width (px)</span>
                      <input type="number" name="borderWidth"
                          value={plotRecommendation?.[selectedPlot]?.style?.borderWidth || 0}
                          onChange={(e) => handleOptionsChange(e, "style")}
                      />
                  </div>

                  <div className="flex flex-col">
                      <span>Border Radius (px)</span>
                      <input type="number" name="borderRadius"
                          value={plotRecommendation?.[selectedPlot]?.style?.borderRadius || 0}
                          onChange={(e) => handleOptionsChange(e, "style")}
                      />
                  </div>

                  <div className="flex flex-col">
                      <span>Border Color</span>
                      <input type="color" name="borderColor"
                          value={plotRecommendation?.[selectedPlot]?.style?.borderColor || "#000000"}
                          onChange={(e) => handleOptionsChange(e, "style")}
                      />
                  </div>

                  <div className="flex flex-col">
                      <span>Border Style</span>
                      <select name="borderStyle"
                          value={plotRecommendation?.[selectedPlot]?.style?.borderStyle || "solid"}
                          onChange={(e) => handleOptionsChange(e, "style")}
                      >
                          <option value="solid">Solid</option>
                          <option value="dotted">Dotted</option>
                          <option value="dashed">Dashed</option>
                          <option value="double">Double</option>
                          <option value="groove">Groove</option>
                          <option value="ridge">Ridge</option>
                      </select>
                  </div>
              </div>

              {/* 🔄 Rotation */}
              <div>
                  <h3 className="font-semibold">Rotation</h3>
                  <input type="range" name="rotation" min="0" max="360"
                      value={plotRecommendation?.[selectedPlot]?.style?.rotation || 0}
                      onChange={(e) => handleOptionsChange(e, "style")}
                  />
              </div>
          </CustomAccordian>
        </>
    );
}

export default ShapeVisualizationTool;