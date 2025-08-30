import React from 'react'
import { UseDescriptiveContext } from '../../../../../../context/DescriptiveProvider'
import CustomAccordian from '../CustomAccordian'
import { CustomSwitch } from '../common/inputComponents'


// const ButtonVisualizationTools = () => {
//     const {plotRecommendation, setPlotRecommendation, selectedPlot, bookmarks} = UseDescriptiveContext()
//     const handleOptionsChange = (e, optionName, isBoolean)=>{
//       if(plotRecommendation[selectedPlot]){
//         let {name, value, checked} = e.target
//         if(isBoolean) value= checked
//         setPlotRecommendation(prev=>{
//           let tempData = [...prev]
//           if(tempData[selectedPlot]?.options?.[optionName]){
//             tempData[selectedPlot].options[optionName][name] = value
//           }else{
//             if (!tempData[selectedPlot].options) {
//               tempData[selectedPlot].options = {[optionName]:{}};
//             }
//             if(!tempData[selectedPlot].options[optionName]){
//               tempData[selectedPlot].options[optionName] = {};
//             }
//             tempData[selectedPlot].options[optionName][name] = value
//           }
//           return tempData
//         })
//       }
//     }
//        const handleNestOptionsChange = (e, optionName, optionName2, isBoolean)=>{
//         if(plotRecommendation[selectedPlot]){
//           let {name, value, checked} = e.target
//           if(isBoolean) value= checked
//           setPlotRecommendation(prev=>{
//             let tempData = [...prev]
//             if(tempData[selectedPlot]?.options?.[optionName]?.[optionName2]?.[name]){
//               tempData[selectedPlot].options[optionName][optionName2][name] = value
//             }else{
              
//               if (!tempData[selectedPlot]?.options) {
//                 tempData[selectedPlot].options = {};
//               }
//               if(!tempData[selectedPlot]?.options?.[optionName]){
//                 tempData[selectedPlot].options[optionName] = {};
//               }
//               if(!tempData[selectedPlot]?.options?.[optionName]?.[optionName2]){
//                 tempData[selectedPlot].options[optionName][optionName2] = {};
//               }
//               tempData[selectedPlot].options[optionName][optionName2][name] = value
//             }
//             return tempData
//         })
//         }
//        }

//        console.log(plotRecommendation,selectedPlot)
//   return (
//     <>
//         <CustomAccordian
//             header="Action"
//             className="flex flex-col gap-1 px-3 ps-4 py-2 bg-gray-200 "
//             containerClass="w-[100%]"
//             switchButton={
//                 <CustomSwitch
//                     checked={!!plotRecommendation?.[selectedPlot].options?.action?.enabled}
//                     name='enabled'
//                     onChange={(e)=>handleOptionsChange(e, "action", true)}
//                 />
//             }
//         >
//             <div className="flex flex-col">
//                 <span>Action Type</span>
//                 <select 
//                     value={plotRecommendation?.[selectedPlot]?.options?.action?.type}
//                     name='type'
//                     onChange={(e)=>handleOptionsChange(e, "action")}
//                 >
//                     <option value="back">Back</option>
//                     <option value="bookmark">Bookmark</option>
//                     <option value="page-navigation">Page Navigation</option>
//                 </select>
//             </div>
//             {plotRecommendation?.[selectedPlot]?.options?.action?.type==="bookmark" && 
//                 <div className="flex flex-col">
//                     <span>Bookmark</span>
//                     <select 
//                         value={plotRecommendation?.[selectedPlot]?.options?.action?.bookmark}
//                         name='bookmark'
//                         onChange={(e)=>handleOptionsChange(e, "action")}
//                     >
//                         <option value="none">None</option>
//                         {bookmarks.map((bookmark, index)=>{
//                             return(
//                                 <option key={index} value={bookmark.id}>{bookmark.name}</option>
//                             )
//                         })}
//                     </select>
//                 </div>
//             }
//         </CustomAccordian>
//             {/* 🎨 Styling Configuration */}
//             <CustomAccordian
//                 header="Style"
//                 className="flex flex-col gap-1 px-3 ps-4 py-2 bg-gray-200 "
//                 containerClass="w-[100%]"
//             >
//                 {/* Background Color */}
//                 <div className="flex flex-col">
//                     <span>Background Color</span>
//                     <input
//                         type="color"
//                         name="backgroundColor"
//                         value={plotRecommendation?.[selectedPlot]?.options?.style?.backgroundColor || "#ffffff"}
//                         onChange={(e) => handleOptionsChange(e, "style")}
//                     />
//                 </div>

//                 {/* Text Color */}
//                 <div className="flex flex-col">
//                     <span>Color</span>
//                     <input
//                         type="color"
//                         name="textColor"
//                         value={plotRecommendation?.[selectedPlot]?.options?.style?.textColor || "#000000"}
//                         onChange={(e) => handleOptionsChange(e, "style")}
//                     />
//                 </div>

//                 {/* Rotation */}
//                 <div className="flex flex-col">
//                     <span>Rotation (°)</span>
//                     <input
//                         type="range"
//                         name="rotation"
//                         min="0"
//                         max="360"
//                         value={plotRecommendation?.[selectedPlot]?.options?.style?.rotation || 0}
//                         onChange={(e) => handleOptionsChange(e, "style")}
//                     />
//                 </div>
//             </CustomAccordian>
//     </>
//   )
// }
const ButtonVisualizationTools = () => {
  const { plotRecommendation, setPlotRecommendation, selectedPlot, bookmarks, pages } = UseDescriptiveContext();

  const handleOptionsChange = (e, optionName, isBoolean) => {
      if (plotRecommendation[selectedPlot]) {
          let { name, value, checked } = e.target;
          if (isBoolean) value = checked;

          setPlotRecommendation(prev => {
              let tempData = [...prev];
              if (!tempData[selectedPlot].options) {
                  tempData[selectedPlot].options = {};
              }
              if (!tempData[selectedPlot].options[optionName]) {
                  tempData[selectedPlot].options[optionName] = {};
              }
              tempData[selectedPlot].options[optionName][name] = value;
              return tempData;
          });
      }
  };

  return (
      <>
          {/* 🎯 Action Configuration */}
          <CustomAccordian header="Action" className="flex flex-col gap-1 px-3 ps-4 py-2 bg-gray-200 " containerClass="w-[100%]"
              switchButton={
                  <CustomSwitch
                      checked={!!plotRecommendation?.[selectedPlot].options?.action?.enabled}
                      name="enabled"
                      onChange={(e) => handleOptionsChange(e, "action", true)}
                  />
              }
          >
              <div className="flex flex-col">
                  <span>Action Type</span>
                  <select
                      value={plotRecommendation?.[selectedPlot]?.options?.action?.type}
                      name="type"
                      onChange={(e) => handleOptionsChange(e, "action")}
                  >
                      <option value="back">Back</option>
                      <option value="bookmark">Bookmark</option>
                      <option value="page-navigation">Page Navigation</option>
                  </select>
              </div>
              {plotRecommendation?.[selectedPlot]?.options?.action?.type === "bookmark" && (
                  <div className="flex flex-col">
                      <span>Bookmark</span>
                      <select
                          value={plotRecommendation?.[selectedPlot]?.options?.action?.bookmark}
                          name="bookmark"
                          onChange={(e) => handleOptionsChange(e, "action")}
                      >
                          <option value="none">None</option>
                          {bookmarks.map((bookmark, index) => (
                              <option key={index} value={bookmark.id}>{bookmark.name}</option>
                          ))}
                      </select>
                  </div>
              )}
              {/* {plotRecommendation?.[selectedPlot]?.options?.action?.type === "page-navigation" && (
                  <div className="flex flex-col">
                      <span>Pages</span>
                      <select
                          value={plotRecommendation?.[selectedPlot]?.options?.action?.["page-navigation"]}
                          name="page-navigation"
                          onChange={(e) => handleOptionsChange(e, "action")}
                      >
                          <option value="none">None</option>
                          {pages.map((p, index) => (
                              <option key={index} value={p.id}>{p.name}</option>
                          ))}
                      </select>
                  </div>
              )} */}
          </CustomAccordian>

          {/* 🎨 Styling Configuration */}
          <CustomAccordian header="Style" className="flex flex-col gap-1 px-3 ps-4 py-2 bg-gray-200 " containerClass="w-[100%]">
              
              {/* 📝 Text Customization */}
              <div className="border-b pb-2 mb-2">
                  <h3 className="font-semibold">Title</h3>

                  {/* Text Input */}
                  <div className="flex flex-col">
                      <span>Text</span>
                      <input type="text" name="text"
                          value={plotRecommendation?.[selectedPlot]?.options?.style?.text || ""}
                          onChange={(e) => handleOptionsChange(e, "style")}
                          placeholder="Enter your text"
                          className="border px-2 py-1 rounded"
                      />
                  </div>

                  {/* Text Color */}
                  <div className="flex flex-col">
                      <span>Text Color</span>
                      <input type="color" name="textColor"
                          value={plotRecommendation?.[selectedPlot]?.options?.style?.textColor || "#000000"}
                          onChange={(e) => handleOptionsChange(e, "style")}
                      />
                  </div>

                  {/* Text Size */}
                  <div className="flex flex-col">
                      <span>Text Size (px)</span>
                      <input type="number" name="fontSize"
                          value={plotRecommendation?.[selectedPlot]?.options?.style?.fontSize || 14}
                          onChange={(e) => handleOptionsChange(e, "style")}
                      />
                  </div>

                  {/* Letter Spacing */}
                  <div className="flex flex-col">
                      <span>Letter Spacing (px)</span>
                      <input type="number" name="letterSpacing"
                          value={plotRecommendation?.[selectedPlot]?.options?.style?.letterSpacing || 0}
                          onChange={(e) => handleOptionsChange(e, "style")}
                      />
                  </div>

                  {/* Line Height */}
                  <div className="flex flex-col">
                      <span>Text Spacing (line-height)</span>
                      <input type="number" name="lineHeight"
                          value={plotRecommendation?.[selectedPlot]?.options?.style?.lineHeight || 1.5}
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
                          value={plotRecommendation?.[selectedPlot]?.options?.style?.backgroundColor || "#ffffff"}
                          onChange={(e) => handleOptionsChange(e, "style")}
                      />
                  </div>

                  {/* Extra Color (For other styling needs) */}
                  <div className="flex flex-col">
                      <span>Icon Color</span>
                      <input type="color" name="extraColor"
                          value={plotRecommendation?.[selectedPlot]?.options?.style?.extraColor || "#000000"}
                          onChange={(e) => handleOptionsChange(e, "style")}
                      />
                  </div>
              </div>

              {/* 📏 Padding & Spacing */}
              <div className="border-b pb-2 mb-2">
                  <h3 className="font-semibold">Padding</h3>

                  <div className="grid grid-cols-2 gap-2">
                      <input type="number" name="paddingTop" placeholder="Padding Top"
                          value={plotRecommendation?.[selectedPlot]?.options?.style?.paddingTop || 0}
                          onChange={(e) => handleOptionsChange(e, "style")}
                      />
                      <input type="number" name="paddingRight" placeholder="Padding Right"
                          value={plotRecommendation?.[selectedPlot]?.options?.style?.paddingRight || 0}
                          onChange={(e) => handleOptionsChange(e, "style")}
                      />
                      <input type="number" name="paddingBottom" placeholder="Padding Bottom"
                          value={plotRecommendation?.[selectedPlot]?.options?.style?.paddingBottom || 0}
                          onChange={(e) => handleOptionsChange(e, "style")}
                      />
                      <input type="number" name="paddingLeft" placeholder="Padding Left"
                          value={plotRecommendation?.[selectedPlot]?.options?.style?.paddingLeft || 0}
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
                          value={plotRecommendation?.[selectedPlot]?.options?.style?.borderWidth || 0}
                          onChange={(e) => handleOptionsChange(e, "style")}
                      />
                  </div>

                  <div className="flex flex-col">
                      <span>Border Radius (px)</span>
                      <input type="number" name="borderRadius"
                          value={plotRecommendation?.[selectedPlot]?.options?.style?.borderRadius || 0}
                          onChange={(e) => handleOptionsChange(e, "style")}
                      />
                  </div>

                  <div className="flex flex-col">
                      <span>Border Color</span>
                      <input type="color" name="borderColor"
                          value={plotRecommendation?.[selectedPlot]?.options?.style?.borderColor || "#000000"}
                          onChange={(e) => handleOptionsChange(e, "style")}
                      />
                  </div>

                  <div className="flex flex-col">
                      <span>Border Style</span>
                      <select name="borderStyle"
                          value={plotRecommendation?.[selectedPlot]?.options?.style?.borderStyle || "solid"}
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
                      value={plotRecommendation?.[selectedPlot]?.options?.style?.rotation || 0}
                      onChange={(e) => handleOptionsChange(e, "style")}
                  />
              </div>
          </CustomAccordian>
      </>
  );
};



export default ButtonVisualizationTools