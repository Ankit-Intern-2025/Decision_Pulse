import React, { useState } from 'react';
import { FaCaretDown, FaCaretUp, FaEyeSlash } from 'react-icons/fa';
import { Handle } from '@xyflow/react'; // Import Handle
import icon1 from '../resources/Mask group.png';
import { BsThreeDotsVertical } from 'react-icons/bs';

const TableBox = ({ data }) => {
  const [isExpend, setIsExpend] = useState(true);

  const menuItems = [
    "Add Measure",
    "New Column",
    "Select Column",
    "Delete From Model",
    "Refresh Data",
    "Edit Query",
  ]
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <div
      className="bg-white min-h-72 w-60 p-3 relative pr-10 cursor-default "
      style={{ border: "1px solid #007A7F" }}
    >
      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-3">
            <img src={icon1} alt="" className="object-contain" />
            <span className="font-bold" title={data.name}>
              {data?.name?.length>10?data?.name?.slice(0,10)+"...":data?.name}
            </span>
          </div>
          <FaEyeSlash />
        </div>
        {isExpend && (
          <div className="flex flex-col gap-1">
            {data.columns.map((column, index) => (
              <div className='relative' key={index}>
                <div key={index} className="flex justify-between items-center">
                  <span>{column}</span>
                  <FaEyeSlash />
                </div>
                {/* Add a target handle for each column */}
                <Handle
                  key={`${index}-target`}
                  type="target"
                  position="left"
                  id={`${column}`}
                  style={{ background: "#555", height:"12px", width:'12px', left:"-12px"}}
                />
                {/* Add a source handle for each column */}
                <Handle
                  key={`${index}-source`}
                  type="source"
                  position="right"
                  id={`${column}`}
                  style={{ background: "#555", height:"12px", width:'12px', right:"-40px"}}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="cursor-pointer mt-4">
        <div
          className="flex gap-2 font-bold items-center justify-start"
          onClick={() => setIsExpend((prev) => !prev)}
        >
          {isExpend ? "Collapse" : "Expand"}
          {isExpend ? <FaCaretUp /> : <FaCaretDown />}
        </div>
      </div>
      <div className='absolute right-3 top-3'>
        <div 
            className='cursor-pointer hover:bg-slate-300 rounded-3xl p-1'
            onClick={()=>setIsMenuOpen(prev=>!prev)}
        >
            <BsThreeDotsVertical className='' />
        </div>
        {isMenuOpen && 
            <div 
              className='absolute  w-[180px] min-h[300px] border bg-[#F3F2F1] border-[#A9A9A9] right-4 top-6 py-3 flex flex-col gap-2 '
            >
                {menuItems.map((data, index)=>{
                    return(
                        <div 
                            key={index} 
                            className='cursor-pointer hover:bg-gray-200 py-[3px] px-3'
                            onClick={()=>setIsMenuOpen(false)}
                          >
                            {data}
                        </div>
                    )
                })}
            </div>
        }
      </div>
    </div>
  );
};

export default TableBox;
