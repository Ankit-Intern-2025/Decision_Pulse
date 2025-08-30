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
    className="md:col-span-2 w-full h-[400px] max-md:h-[165px] flex p-4 border rounded-xl bg-white transition-transform duration-200 ease-in-out hover:scale-105"
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
    className="w-full md:col-span-2 h-[400px] max-md:h-[165px] flex p-4 border rounded-xl bg-white transition-transform duration-200 ease-in-out hover:scale-105"
  >
    <div className="w-full h-full flex flex-col gap-4">
      {chartHeader}
      <div className="flex items-center justify-center h-full">
        <div className="w-[70%] h-[100%] rounded-full bg-gray-200 animate-pulse" />
      </div>
    </div>
  </div>,

  // Bar Chart
  <div
    key="3"
    className="md:col-span-2 w-full h-[400px] max-md:h-[165px] flex p-4 border rounded-xl bg-white transition-transform duration-200 ease-in-out hover:scale-105"
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
            {Array.from({ length: 11 }).map((_, i) => (
              <div
                key={i}
                style={{ height: `${15 + Math.random() * 80}%` }}
                className="w-full bg-gray-200 rounded-md animate-pulse"
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


  // Horizontal Bar Chart
  <div
    key="4"
    className="md:col-span-4 w-full h-[400px] max-md:h-[165px] flex p-4 border rounded-xl bg-white transition-transform duration-200 ease-in-out hover:scale-105"
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
    className="md:col-span-2 w-full h-[400px] max-md:h-[165px] flex p-4 border rounded-xl bg-white transition-transform duration-200 ease-in-out hover:scale-105"
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
          <div className="relative w-full h-full bg-gradient-to-b from-gray-300 via-gray-200 to-white rounded-md animate-pulse" />

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
  // Bar Chart
  <div
    key="6"
    className="md:col-span-3 w-full h-[400px] max-md:h-[165px] flex p-4 border rounded-xl bg-white transition-transform duration-200 ease-in-out hover:scale-105"
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
            {Array.from({ length: 11 }).map((_, i) => (
              <div
                key={i}
                style={{ height: `${15 + Math.random() * 80}%` }}
                className="w-full bg-gray-200 rounded-md animate-pulse"
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

  // Pie Chart
  <div
    key="7"
    className="w-full md:col-span-3 h-[400px] max-md:h-[165px] flex p-4 border rounded-xl bg-white transition-transform duration-200 ease-in-out hover:scale-105"
  >
    <div className="w-full h-full flex flex-col gap-4">
      {chartHeader}
      <div className="flex items-center justify-center h-full">
        <div className="w-[50%] h-[100%] rounded-full bg-gray-200 animate-pulse" />
      </div>
    </div>
  </div>,


];

const LoadingChartsSkeleton = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="p-6 grid gap-8 grid-cols-1 md:grid-cols-6 justify-items-center items-center w-full">
        {chartSkeletons}
      </div>
    </div>
  );
};

export default LoadingChartsSkeleton;
