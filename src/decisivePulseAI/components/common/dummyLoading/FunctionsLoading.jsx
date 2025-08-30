import React from 'react'

const FunctionsLoading = () => {
  return (
    <div className="flex justify-center w-full">
        <div className="flex flex-wrap justify-center min-h-[80vh]">
        {[...Array(8).keys()].map((data, index)=>{
          return(
            <div 
              className='w-full max-w-[350px] sm:max-w-[378px] md:max-w-[536px] xl:min-w-[536px] h-[256px] max-md:h-[165px] flex p-4 m-5 border rounded-[44px] bg-white
                transition-transform duration-200 ease-in-out hover:scale-105' 
              key={index}
              style={{ boxShadow: "0 5px 1px #191A23" }}
            >
              <div className='flex justify-between w-full gap-10 h-full'>
                <div className=' h-full w-1/2 flex flex-col justify-between'>
                  <div className='skeleton-box light-style w-full rounded-md h-16 mt-7' ></div>
                  <div className='skeleton-box light-style w-full rounded-md h-4' >

                  </div>
                </div>
                <div className=' h-full w-1/2 flex flex-col justify-start'>
                  <div className='skeleton-box light-style w-10 rounded-full h-10 self-end mt-4' ></div>
                  <div className='p-3 px-10'>
                    <div className='skeleton-box light-style w-full rounded-md h-28 ' > </div>
                  </div>
                </div>
               
              </div>
            </div>
          )
        })}
        </div>
    </div>
  )
}

export default FunctionsLoading