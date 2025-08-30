import React from "react";
import ourIcon from "../../../resources/home/our.png";

function Tab3({diagnosticData}) {
  return (
    <div className="diagnostic-container text-white p-6 rounded-lg">
      <h1 className="w-full text-center pb-6 text-2xl font-semibold">Diagnostic Insights</h1>
      <div className="flex justify-center">
        {/* Our Data Insights Section */}
        <ul className="w-[60%] m-auto p-6 bg-[#006064] rounded-lg shadow-md">
          <h2 className="w-full text-center pb-4 text-xl font-semibold">Your Data Insights</h2>
          {diagnosticData.map((item, index) => (
            <li key={index} className="flex items-start mb-3">
              <img src={ourIcon} alt="Our Icon" className="w-5 h-5 mr-3 mt-1" />
              <span className="text-white text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Tab3;
