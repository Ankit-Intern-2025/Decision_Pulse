import React, { useEffect, useRef } from 'react'
import { UseDescriptiveContext } from '../../../../../../context/DescriptiveProvider';
import { buttonTypesArray } from '../../../../../../utils/constants';
import { useState } from "react";
import { FiMoreHorizontal  } from "react-icons/fi";

// Function to get the corresponding icon component
const getIconComponent = (iconName) => {
    const matchedButton = buttonTypesArray.find(button => button.iconName === iconName);
    return matchedButton ? matchedButton.icon : null;
};

const ButtonVisual = ({ data}) => { 
    const { isDraggable, bookmarks, handleSetSelectedBookmark, plotRecommendation, setPlotRecommendation } = UseDescriptiveContext();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);
    const getStyleValue = (styleName, defaultValue) => {
        return data?.options?.style?.[styleName] ?? defaultValue;
    };
    
    const handleOnClick = () => {
        console.log("Button clicked");
        if (data?.options?.action?.enabled && !isDraggable) {
            if (data?.options?.action.type === "bookmark") {
                const selectedBookmark = bookmarks.find(bookmark => bookmark.id === data?.options?.action.bookmark);
                console.log(selectedBookmark, data);
                if (selectedBookmark !== undefined) handleSetSelectedBookmark(selectedBookmark);
            }
            console.log("Action Enabled");
        } else {
            console.log("Action Disabled");
        }
    };

    const onRemove = (data) => {
        console.log(data, plotRecommendation, "in on remove");
    
        // Filter out the item that needs to be removed
        const updatedRecommendations = plotRecommendation.filter((obj) => obj.id !== data.id);
    
        // Update the state
        setPlotRecommendation(updatedRecommendations);
    };
    

    const IconComponent = getIconComponent(data?.iconName);
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

    // return (
    //     <div className="relative">
    //         {/* Top part: Three-dot menu */}
    //         <div 
    //             className="absolute top-2 right-1 p-1 cursor-pointer"
    //             onClick={(e) => {
    //                 e.stopPropagation();
    //                 setShowMenu(!showMenu);
    //             }}
    //         >
    //             <FiMoreHorizontal size={24} className="text-gray-600 hover:text-gray-800" />
    //         </div>

    //         {/* Popup Menu */}
    //         {showMenu && (
    //             <div
    //                 ref={menuRef}
    //                 className="absolute top-6 right-0 w-40 bg-white shadow-md rounded-md border border-gray-300 z-10"
    //                 onClick={(e) => e.stopPropagation()} // Prevent menu clicks from closing it
    //             >
    //                 <ul className="text-sm">
    //                     <li
    //                         className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
    //                         onClick={() => alert("Edit Text Clicked")}
    //                     >
    //                         Edit Text
    //                     </li>
    //                     <li
    //                         className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
    //                         onClick={() => onRemove(data)}
    //                     >
    //                         Remove Component
    //                     </li>
    //                 </ul>
    //             </div>
    //         )}

    //         {/* Bottom part: Main button content (Only this triggers handleOnClick) */}
    //         <div
    //             className={`group ${isDraggable ? "react-grid-drag-handle" : ""} cursor-pointer flex items-center justify-center p-4 rounded-md`}
    //             onClick={handleOnClick}
    //             style={{ backgroundColor: getStyleValue("backgroundColor", "#ffffff") }}
    //         >
    //             <span>{data?.text}</span>

    //             {IconComponent && (
    //                 <IconComponent 
    //                     className="p-1 w-[100%] h-[100%] object-contain rounded-md"
    //                     style={{
    //                         color: getStyleValue("textColor", "#000000"),
    //                         transform: `rotate(${getStyleValue("rotation", 0)}deg)`
    //                     }}
    //                 />
    //             )}

    //             {data.img && (
    //                 <img
    //                     className="w-[100%] h-[100%] object-contain bg-gray-200 p-1 rounded-md"
    //                     src={data.img}
    //                     title={data.title}
    //                     alt={data.title}
    //                 />
    //             )}
    //         </div>
    //     </div>
    // );
    return (
        <div className="relative">
            {/* Three-dot menu */}
            <div 
                className="absolute top-0 right-1 p-1 cursor-pointer z-10"
                onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(!showMenu);
                }}
            >
                <FiMoreHorizontal size={24} className="text-gray-600 hover:text-gray-800" />
            </div>

            {/* Popup Menu */}
            {showMenu && (
                <div
                    ref={menuRef}
                    className="absolute top-6 right-0 w-40 bg-white shadow-md rounded-md border border-gray-300 z-10"
                    onClick={(e) => e.stopPropagation()} 
                >
                    <ul className="text-sm">
                        <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => alert("Edit Text Clicked")}
                        >
                            Edit Text
                        </li>
                        <li
                            className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
                            onClick={() => onRemove(data)}
                        >
                            Remove Component
                        </li>
                    </ul>
                </div>
            )}

            {/* Main button */}
            <div
                className={`group ${isDraggable ? "react-grid-drag-handle" : ""} cursor-pointer items-center justify-center`}
                onClick={handleOnClick}
                style={{
                    backgroundColor: getStyleValue("backgroundColor", "#ffffff"),
                    // color: getStyleValue("textColor", "#000000"),
                    paddingTop: `${getStyleValue("paddingTop", 10)}px`,
                    paddingRight: `${getStyleValue("paddingRight", 10)}px`,
                    paddingBottom: `${getStyleValue("paddingBottom", 10)}px`,
                    paddingLeft: `${getStyleValue("paddingLeft", 10)}px`,
                    borderWidth: `${getStyleValue("borderWidth", 1)}px`,
                    borderRadius: `${getStyleValue("borderRadius", 5)}px`,
                    borderColor: getStyleValue("borderColor", "#000000"),
                    borderStyle: getStyleValue("borderStyle", "solid"),
                    // transform: `rotate(${getStyleValue("rotation", 0)}deg)`,
                    // letterSpacing: `${getStyleValue("letterSpacing", 0)}px`,
                    // lineHeight: `${getStyleValue("lineHeight", 1.5)}`,
                    // fontSize: `${getStyleValue("fontSize", 14)}px`
                }}
            >
                <span style={{
                    color: getStyleValue("textColor", "#000000"),
                    letterSpacing: `${getStyleValue("letterSpacing", 0)}px`,
                    lineHeight: `${getStyleValue("lineHeight", 1.5)}`,
                    fontSize: `${getStyleValue("fontSize", 14)}px`,
                }}>{data?.options?.style?.text || ""}</span>

                {IconComponent && (
                    <IconComponent 
                        className="p-1 w-[100%] h-[100%] object-contain"
                        style={{
                            // backgroundColor: getStyleValue("backgroundColor", "#ffffff"),
                            color: getStyleValue("extraColor", "#000000"),
                            // paddingTop: `${getStyleValue("paddingTop", 10)}px`,
                            // paddingRight: `${getStyleValue("paddingRight", 10)}px`,
                            // paddingBottom: `${getStyleValue("paddingBottom", 10)}px`,
                            // paddingLeft: `${getStyleValue("paddingLeft", 10)}px`,
                            transform: `rotate(${getStyleValue("rotation", 0)}deg)`,
                        }}
                    />
                )}

                {data.img && (
                    <img
                        className="w-[100%] h-[100%] object-contain"
                        src={data.img}
                        title={data.title}
                        alt={data.title}
                    />
                )}
            </div>
        </div>
    );
};


export default ButtonVisual