import React from 'react'
import './loader.css'
const DashboardList = () => {
  return (
    <main className='grid grid-cols-2 justify-center md:grid-cols-4 gap-4 w-full mx-4'>
        {[...Array(8).keys()].map((data, index)=>{

          return(
              <div key={index} className="h-56 border-0 skeleton-box shadow-lg rounded-[24px]">
                <div className="relative bg-[#095458]">
                    <span 
                        className="w-full h-43 rounded-t-[24px] skeleton-box h-44" 
                    />
                </div>
                <span className='skeleton-box w-full h-10 border-t border-gray-500' style={{ paddingLeft: 2, padding: "10px",}} />
              </div>
          ) 
        })}
    </main>

  )
}

export default DashboardList