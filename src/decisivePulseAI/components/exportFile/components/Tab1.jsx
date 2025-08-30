import React, { useState, useEffect } from "react";
import ourIcon from '../../../resources/home/our.png';

function Tab1({anomaliesData}) {
  return (
    <div className="prescriptive-container text-white p-6 bg-[#008085] w-[95%] h-full pb-5 px-5  border-5 rounded-md border-red-500">
      <h1 className="w-full text-center pb-6 text-2xl font-semibold">Alert Points</h1>
      <ul className="w-[60%] mx-auto p-6 bg-[#006064] rounded-lg shadow-md">
        <h2 className="w-full text-center pb-4 text-xl font-semibold">Insights To Focus On</h2>
        {anomaliesData.map((item, index) => (
          <li key={index} className="mb-6">
            <div className="flex items-start">
              <img src={ourIcon} alt="Insight Icon" className="w-5 h-5 mr-3 mt-1" />
              <span className="text-white text-sm">{item}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tab1;
