import React, { useState } from 'react'
import { BsFillCaretDownFill, BsFillCaretRightFill } from 'react-icons/bs'

const CustomAccordian = ({header, containerClass, children, switchButton, className}) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleAccordian = ()=>{
        setIsOpen(prev=>!prev)
    }
  return (
     <div 
            className={`${containerClass} flex flex-col`}
        >
                <div className='flex justify-between items-center h-10 px-4'>
                    <span className='text-sm font-bold cursor-pointer flex gap-2 items-center' onClick={toggleAccordian}>{header}</span>
                    <div className='flex items-center '>
                        {switchButton && switchButton}
                        <span onClick={toggleAccordian}>
                            {isOpen?
                                <BsFillCaretDownFill className='cursor-pointer h-4 w-4' />
                            :
                                <BsFillCaretRightFill className='cursor-pointer h-4 w-4' />
                            }
                        </span>
                    </div>
                </div>
                <div className={`${isOpen?"block border-t border-b border-[#A9A9A9]":"hidden"} ${className}`}>
                    {children}
                </div>
            
        </div>
  )
}

export default CustomAccordian