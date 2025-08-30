import React from "react";
const chartHeader = (
  <div className="flex justify-between items-center">
    <div className="flex items-center gap-3 w-[80%] ">
      <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
      <div className="skeleton-box light-style w-[50%] h-7 rounded-md" />
    </div>
    <div className="skeleton-box light-style h-10 rounded-md w-[20%]" />
  </div>
);
const chartSkeletons = [
  // Line Chart
  <div
    key="1"
    className="w-full h-[400px] max-md:h-[165px] flex p-4 border rounded-xl bg-white transition-transform duration-200 ease-in-out hover:scale-105"
  >
    <div className="w-full h-full flex flex-col gap-4">
      {chartHeader}
      <div className="flex gap-2 h-full w-full">
        <div className="flex flex-col justify-between items-end gap-2">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="w-2  bg-gray-200 rounded-md animate-pulse h-3"
            />
          ))}
        </div>
        <div className="w-full h-full flex flex-col gap-4">
          {/* Chart */}
          <div className="w-full h-full flex items-end gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                style={{ height: `${15 + Math.random() * 80}%` }}
                className="w-full bg-gray-200 rounded-md animate-pulse"
              />
            ))}
          </div>
          <div className="w-full flex items-end gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="w-full bg-gray-200 rounded-md animate-pulse h-3"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>,

  // Pie Chart
<div
  key="2"
  className="w-full h-[400px] max-md:h-[165px] flex p-4 border rounded-xl bg-white transition-transform duration-200 ease-in-out hover:scale-105"
>
  <div className="w-full h-full flex flex-col gap-4">
    {chartHeader}
    <div className="flex items-center justify-center h-full">
      <svg viewBox="0 0 200 200" className="w-[70%] h-[85%]">
        <circle cx="100" cy="100" r="100" fill="#f0f0f0" />

        {/* Segmented slices */}
        <path d="M100,100 L100,0 A100,100 0 0,1 195,68 Z" fill="#e0e0e0" className="animate-pulse" />
        <path d="M100,102 L195,69 A100,100 0 0,1 145,190 Z" fill="#d6d6d6" className="animate-pulse" />
        <path d="M99,102 L142,190 A100,110 0 0,1 40,180 Z" fill="#e0e0e0" className="animate-pulse" />
        {/* <path d="M100,100 L40,180 A100,100 0 0,1 10,100 Z" fill="#d6d6d6" className="animate-pulse" />
        <path d="M100,100 L10,100 A100,100 0 0,1 100,0 Z" fill="#e0e0e0" className="animate-pulse" /> */}
      </svg>
    </div>
  </div>
</div>,

  // Horizontal Bar Chart
  <div
    key="4"
    className="w-full h-[400px] max-md:h-[165px] flex p-4 border rounded-xl bg-white transition-transform duration-200 ease-in-out hover:scale-105"
  >
    <div className="w-full h-full flex flex-col gap-4">
      {chartHeader}
      <div className="flex gap-2 h-full w-full">
        <div className="flex flex-col justify-between items-end gap-2">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="w-2  bg-gray-200 rounded-md animate-pulse h-3"
            />
          ))}
        </div>
        <div className="w-full h-full flex flex-col gap-4">
          {/* Chart */}
          <div className="flex flex-col justify-center gap-3 h-full w-full">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 h-full rounded animate-pulse"
                style={{ width: `${40 + Math.random() * 40}%` }}
              />
            ))}
          </div>
          <div className="w-full flex items-end gap-2">
            {Array.from({ length: 11 }).map((_, i) => (
              <div
                key={i}
                className="w-full bg-gray-200 rounded-md animate-pulse h-3"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>,

  // Area Chart
  <div
    key="5"
    className="w-full h-[400px] max-md:h-[165px] flex p-4 border rounded-xl bg-white transition-transform duration-200 ease-in-out hover:scale-105"
  >
    <div className="w-full h-full flex flex-col gap-4">
      {chartHeader}
      <div className="flex gap-2 h-full w-full">
        <div className="flex flex-col justify-between items-end gap-2">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="w-2  bg-gray-200 rounded-md animate-pulse h-3"
            />
          ))}
        </div>
        <div className="w-full h-full flex flex-col gap-4">
          <div className="w-full h-full relative flex items-center justify-center">
            <svg
              viewBox="0 0 400 200"
              preserveAspectRatio="none"
              className="w-full h-full animate-pulse"
            >
              {/* Area fill */}
              <path
                d="M 0 180 
             L 40 120 
             L 80 140 
             L 120 80 
             L 160 110 
             L 200 60 
             L 240 100 
             L 280 40 
             L 320 70 
             L 360 30 
             L 400 60 
             L 400 200 
             L 0 200 
             Z"
                fill="url(#areaGradient)"
              />

              {/* Gradient definition */}
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e0e0e0" />
                  <stop offset="100%" stopColor="#f5f5f5" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="w-full flex items-end gap-2">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className="w-full bg-gray-200 rounded-md animate-pulse h-3"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>,
];

const ExecutiveSummaryLoading = () => {
  return (
    <div className=" prescriptive-container p-6 rounded-lg">
      <h1 className="w-full text-center pb-6 text-2xl font-semibold text-white">
        Alert Points
      </h1>
      <div className="flex justify-center w-full gap-10">
        <div className="p-6 md:pe-8 grid gap-4 grid-cols-1 md:grid-cols-2 justify-items-center items-center w-[65%] bg-[#006064] rounded-lg">
          {chartSkeletons}
        </div>
        <ul className="md:w-[35%] mx-auto p-6 bg-[#006064] rounded-lg shadow-md">
          <h2 className="w-full text-center pb-4 text-xl font-semibold text-white">
            Insights To Focus On
          </h2>
          {[...Array(4)].map((_, index) => (
            <li key={index} className="mb-6 animate-pulse">
              <div className="flex items-start">
                <div className="w-5 h-5 mr-3 mt-1 bg-gray-300 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-300 rounded w-11/12"></div>
                  <div className="h-3 bg-gray-300 rounded w-11/12"></div>
                  <div className="h-3 bg-gray-300 rounded w-10/12"></div>
                  <div className="h-3 bg-gray-300 rounded w-11/12"></div>
                  <div className="h-3 bg-gray-300 rounded w-10/12"></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExecutiveSummaryLoading;
