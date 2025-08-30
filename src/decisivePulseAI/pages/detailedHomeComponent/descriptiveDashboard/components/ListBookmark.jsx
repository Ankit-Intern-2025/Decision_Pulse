import React, { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from 'react-icons/hi'
import { UseDescriptiveContext } from "../../../../../context/DescriptiveProvider";

const CustomDropdown = ({data,bookmarkRename, setBookmarkRename, handleRemoveBookmark, index, handleBookmarkNameChange, handleUpdate, navigateToPage}) => {  
  const {bookmarks, setBookmarks, selectedBookmark, setSelectedBookmark, setTempBookmark, handleSetSelectedBookmark} = UseDescriptiveContext()
    const [isMenu, setIsMenu] = useState(false);

    const dropdownRef = useRef(null);
    const handleSetMenu = () => {
        setIsMenu((prev) => !prev);
      };
  
    const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenu(false);
    }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleRename = ()=>{
        if(bookmarkRename?.id === data.id){
            setBookmarkRename({})
        }else{
            setBookmarkRename(data)
            setTimeout(() => {
              renameInputRef.current.focus()
            }, 100);
        }
        setIsMenu(false)
    }
    const renameInputRef = useRef(null)
  return (
    <div 
      className={`flex justify-between items-center ps-2 py-1  rounded-sm hover:bg-gray-300 ${selectedBookmark.id ===data.id?"bg-gray-400":"bg-gray-200" }`}
    >
          <input 
            ref={renameInputRef}
            type='text' 
            className={`w-[100%] px-2 py-1 text-sm outline-none ${bookmarkRename.id===data.id?"block":"hidden"}`} 
            placeholder='Bookmark Name'
            value={data?.name}
            onChange={(e)=>{
              const renamed = e.target.value
              data.name = renamed
              console.log(renamed, data)
              setBookmarks((prev) =>
                prev.map((bookmark) =>
                    bookmark.id === data.id ? { ...bookmark, name: renamed } : bookmark
                )
              )
              // handleBookmarkNameChange(e, index)
            }} 
            onBlur={() => {
              handleRename()
              handleBookmarkNameChange(data)
            }}
          />
          <span className={`w-[100%] cursor-pointer ${bookmarkRename.id===data.id?"hidden":"block"}`} onClick={()=>{
            handleSetSelectedBookmark(data)
            console.log("clicked bookmark",data)
            navigateToPage(data)
            // navigateToPage(data)
          }}
            onDoubleClick={handleRename}>{data.name}</span>
      <div ref={dropdownRef} className="relative z-[11]">
        <div
          onClick={handleSetMenu}
          className={`cursor-pointer p-1 rounded-2xl ${
            isMenu ? "bg-slate-200" : ""
          }`}
        >
          <HiDotsHorizontal />
        </div>
        {isMenu && (
          <div className="absolute top-4 right-1 bg-gray-300 flex flex-col gap-1 w-40">
          
            <span onClick={() => handleUpdate(data)} className="flex gap-2 items-center text-sm hover:bg-slate-400 px-3 py-[2px] cursor-pointer" >
              Update
            </span>
            <span onClick={handleRename} className="flex gap-2 items-center text-sm hover:bg-slate-400 px-3 py-[2px] cursor-pointer" >
              Rename
            </span>
            <span 
              onClick={()=>{
                handleSetMenu()
              }} 
              className="flex gap-2 items-center text-sm hover:bg-slate-400 px-3 py-[2px] cursor-pointer" 
            >
              Group
            </span>
            <span 
              onClick={()=>{
                handleRemoveBookmark(data)
                handleSetMenu()
              }} 
              className="flex gap-2 items-center text-sm hover:bg-slate-400 px-3 py-[2px] cursor-pointer" >
              Delete
            </span>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;