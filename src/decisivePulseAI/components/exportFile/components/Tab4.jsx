import React, { useState, useEffect } from "react";
// import actionIcon from "../resources/home/action.png"; // Replace with an appropriate icon
import ourIcon from '../../../resources/home/our.png'; // Replace with an appropriate icon

function Tab4({prescriptiveData}) {
  return (
    <div className="prescriptive-container text-white p-6 rounded-lg">
      <h1 className="w-full text-center pb-6 text-2xl font-semibold">Prescriptive Insights</h1>
      <ul className="w-[60%] mx-auto p-6 bg-[#006064] rounded-lg shadow-md">
        <h2 className="w-full text-center pb-4 text-xl font-semibold">Your Prescriptive Insights</h2>
        {prescriptiveData.map((item, index) => (
          <li key={index} className="mb-6 ">
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

export default Tab4;
