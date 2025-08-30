import React from 'react'
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';
const CustomTab = ({toggleTab, children, className, header, icon, containerClass}) => {

  return (
    <div 
        className={`h-full border border-[#A9A9A9] bg-[#F3F2F1] ${containerClass}`}
    >
            <div className='flex flex-col w-52 h-[800px]'>
                <div className='flex justify-between items-center py-3 px-4 border-b border-[#A9A9A9] ' onClick={toggleTab}>
                    <span className='text-sm font-bold cursor-pointer flex gap-2 items-center'>{icon} {header}</span>
                    <BsFillCaretRightFill className='cursor-pointer h-4 w-4' />
                </div>
                <div className={`${className} overflow-y-auto overflow-x-hidden h-[100%] custom-scrollbar`}>
                    {children}
                </div>
            </div>
        
    </div>
  )
}

export default CustomTab