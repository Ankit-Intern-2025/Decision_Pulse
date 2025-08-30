import { useParams } from "react-router-dom";
import { PiNotepad } from "react-icons/pi";
import { LiaDownloadSolid } from "react-icons/lia"; 
import Dropdown2 from "../../components/admin/dropdown";
import { useState, useEffect, useRef } from "react";

const DownloadResults = ({ dropDownData2, dropDownHandle, handleExport, selectedFormat }) => {
  return (
    <div className="flex justify-center py-20 bg-white">
      <div className="flex flex-col sm:flex-row items-center sm:items-center">
        {/* Icon and Title */}
        <div className="flex items-center justify-center mb-4 sm:mb-0">
          <PiNotepad className="text-xl sm:text-3xl md:text-4xl" />
          <div className="font-bold mx-3 text-lg sm:text-xl" style={{ fontFamily: "Poppins, sans-serif" }}>Download Results</div>
        </div>

        {/* Dropdown and Download Button */}
        <div className="flex flex-col sm:flex-row items-center mt-5 sm:mt-0">
          <Dropdown2 data={dropDownData2} dropdownHandle1={dropDownHandle} selectedFormat={selectedFormat} />
          <button
            onClick={handleExport}
            style={{ boxShadow: "2px 2px 2px #191A23" }}
            className={`bg-[#00ACC1] hover:bg-[#0497a9] ${selectedFormat===""?"opacity-30":""} text-white py-2 px-4 rounded-2xl flex items-center mx-2 mt-3 sm:mt-0 sm:ml-3`}
            disabled={selectedFormat===""}
          >
            <LiaDownloadSolid className="text-base sm:text-xl" />
            <span className="ml-2">Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadResults