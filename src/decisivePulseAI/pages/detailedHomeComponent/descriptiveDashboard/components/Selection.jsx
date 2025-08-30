import React, { useEffect, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { UseDescriptiveContext } from '../../../../../context/DescriptiveProvider'

const Selection = () => {
    const {selectedBookmark, tempBookmark, setTempBookmark, bookmarks, plotRecommendation} = UseDescriptiveContext()
    useEffect(()=>{
        const tempBookmark = {...selectedBookmark}
        setTempBookmark(tempBookmark)
    },[selectedBookmark])
    const handleShowHide = (value, index)=>{
        setTempBookmark((prev)=>{
            const tempData = {...prev}
            if(!tempData.data[index]){
                const selectedPlot = plotRecommendation[index]
                const title= `${selectedPlot?.yKeys?.map(axis=>axis?.name)?.join(", ")} by ${selectedPlot?.xKey}`
                tempData.data[index] = {id:selectedPlot.id,title:title, type:selectedPlot.type }
            }
            tempData.data[index]["isVisible"] = value
            return tempData
        })
    }
    console.log( plotRecommendation)
  return (
    <div className='flex flex-col gap-1 text-sm px-4 py-3'>
        {selectedBookmark.name && plotRecommendation?.map((data, index)=>{
            let title= `${data?.yKeys?.map(axis=>axis?.name)?.join(", ")} by ${data?.xKey}`
            if(data.buttonTitle) {
                title = data.buttonTitle + " Button"
            }
            return(
                <div key={index} className='flex justify-between items-center px-1 py-1 hover:bg-gray-200' title={data?.title}>
                    <span className='w-[80%]' title={title}>{title.length>=15?title?.slice(0, 15)+"..":title}</span>
                    <span className='w-[20%] cursor-pointer'>
                        {(tempBookmark?.data?.[index]?.isVisible || tempBookmark?.data?.[index]?.isVisible===undefined)? 
                            <FaRegEye onClick={()=>handleShowHide(false, index)} />
                            :
                            <FaRegEyeSlash onClick={()=>handleShowHide(true, index)} />
                        }
                        
                    </span>
                </div>
            )
        })}
    </div>
  )
}

export default Selection