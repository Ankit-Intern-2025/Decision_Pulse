import React, { useEffect, useRef, useState } from "react";
import { UseDescriptiveContext } from "../../../../../../context/DescriptiveProvider";
import { FiMoreHorizontal } from "react-icons/fi";

const CustomShape = ({ data }) => {
  console.log(data)
  const { layout, shapeStyles, clipPath, shape, ...rest } = data//?.options?.style;
  const { isDraggable, bookmarks, handleSetSelectedBookmark, plotRecommendation, setPlotRecommendation } = UseDescriptiveContext();
      const [showMenu, setShowMenu] = useState(false);
      const menuRef = useRef(null);
      const getStyleValue = (styleName, defaultValue) => {
          return data?.style?.[styleName] ?? defaultValue;
      };
      const onRemove = (data) => {
        console.log(data, plotRecommendation, "in on remove");
    
        // Filter out the item that needs to be removed
        const updatedRecommendations = plotRecommendation.filter((obj) => obj.id !== data.id);
    
        // Update the state
        setPlotRecommendation(updatedRecommendations);
    };
    useEffect(() => {
            const handleClickOutside = (event) => {
                if (menuRef.current && !menuRef.current.contains(event.target)) {
                    setShowMenu(false);
                }
            };
    
            if (showMenu) {
                document.addEventListener("mousedown", handleClickOutside);
            } else {
                document.removeEventListener("mousedown", handleClickOutside);
            }
    
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, [showMenu]);
  return (
    <div
  className={`relative ${isDraggable ? "react-grid-drag-handle" : ""} flex flex-col items-center justify-center w-full h-full overflow-hidden`}
  style={{
    backgroundColor: getStyleValue("backgroundColor", "#ffffff"),
    paddingTop: `${getStyleValue("paddingTop", 0)}px`,
    paddingRight: `${getStyleValue("paddingRight", 0)}px`,
    paddingBottom: `${getStyleValue("paddingBottom", 0)}px`,
    paddingLeft: `${getStyleValue("paddingLeft", 0)}px`,
    borderWidth: `${getStyleValue("borderWidth", 0)}px`,
    borderRadius: `${getStyleValue("borderRadius", 0)}px`,
    borderColor: getStyleValue("borderColor", "#000000"),
    borderStyle: getStyleValue("borderStyle", "solid"),
  }}
>
  {/* Centered Text at Top */}
  <span
    // className="absolute top-2 left-1/2 transform -translate-x-1/2 text-center"
    style={{
      color: getStyleValue("textColor", "#000000"),
      letterSpacing: `${getStyleValue("letterSpacing", 0)}px`,
      lineHeight: `${getStyleValue("lineHeight", 1.5)}`,
      fontSize: `${getStyleValue("fontSize", 14)}px`,
    }}
  >
    {data?.style?.text || ""}
  </span>

  {/* Remove Menu */}
  <div 
    className="absolute top-0 right-1 p-1 cursor-pointer z-10"
    onClick={(e) => {
      e.stopPropagation();
      setShowMenu(!showMenu);
    }}
  >
    <FiMoreHorizontal size={24} className="text-gray-600 hover:text-gray-800" />
  </div>

  {showMenu && (
    <div
      ref={menuRef}
      className="absolute top-6 right-0 w-40 bg-white shadow-md rounded-md border border-gray-300 z-10"
      onClick={(e) => e.stopPropagation()} 
    >
      <ul className="text-sm">
        <li
          className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
          onClick={() => { console.log("on remove called") }}
        >
          Remove
        </li>
      </ul>
    </div>
  )}

  {/* Shape Container (Centered and Properly Clipped) */}
  <div 
    className="w-full h-full flex items-center justify-center"
    style={{
      clipPath: clipPath,
      transform: `rotate(${getStyleValue("rotation", 0)}deg)`,
    }}
  >
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        ...layout,
        ...shapeStyles,
        ...shape,
        backgroundColor: getStyleValue("extraColor", "#000000"),
      }}
    ></div>
  </div>
</div>

  );
};

export default CustomShape;
