import React from "react";
const PrescriptiveLoading = () => {
  return (
    <div className=" prescriptive-container p-6 rounded-lg">
      <h1 className="w-full text-center pb-6 text-2xl font-semibold text-white">Prescriptive Insights</h1>
    <div className="flex justify-center w-full gap-10">
      <ul className="md:w-[60%] mx-auto p-6 bg-[#006064] rounded-lg shadow-md">
        <h2 className="w-full text-center pb-4 text-xl font-semibold text-white">
        Your Prescriptive Insights
        </h2>
        {[...Array(6)].map((_, index) => (
          <li key={index} className="mb-6 animate-pulse">
            <div className="flex items-start">
              <div className="w-5 h-5 mr-3 mt-1 bg-gray-300 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-300 rounded w-11/12"></div>
                <div className="h-3 bg-gray-300 rounded w-8/12"></div>
                <div className="h-3 bg-gray-300 rounded w-10/12"></div>
                <div className="h-3 bg-gray-300 rounded w-11/12"></div>
                <div className="h-3 bg-gray-300 rounded w-9/12"></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default PrescriptiveLoading;
