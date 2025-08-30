import React, { useState, useEffect } from "react";
import Footer from "../../../components/footer";
import Nav from "../../../components/nav"; 
import ExecutiveSummary from "./AgricultureComponent/ExecutiveSummary";
import Revenue from "./AgricultureComponent/Crop";
import ConsumerInsight from "./AgricultureComponent/Farmer";
import Asset from "./AgricultureComponent/Food";
import Payments from "./AgricultureComponent/Sustainability";
import ESG from "./AgricultureComponent/ESG";
import Crop from "./AgricultureComponent/Crop";
import Farmer from "./AgricultureComponent/Farmer";
import Food from "./AgricultureComponent/Food";
import Sustainability from "./AgricultureComponent/Sustainability";
import AIDriven from "./AgricultureComponent/AIDriven";

const Agriculture = () => {
  const [selectedPage, setSelectedPage] = useState(
    sessionStorage.getItem("s_tab") || "Executive Summary (Market Overview)"
  );

  // Define pages list
  const pages = [
    "Executive Summary (Industry Overview)",
    "Crop Yield, Pricing & Supply Chain Dashboard",
    "Farmer Engagement & Financial Inclusion",
    "Food Processing & Export Dashboard",
    "Sustainability & ESG Performance",
    "AI-Driven Actionable Insights & Recommendations",
    // "Drug Development & R&D Analytics",
    // "Sales & Market Performance Dashboard",
    // "Supply Chain & Distribution Analytics",
    // "Pharmacovigilance & Patient Safety",
    // "Emerging Trends & AI Insight",
    // "AI_Driven Actionable Insight & Recommendations"
  ];

  // Function to change the selected page
  const handleSelectPage = (page) => {
    setSelectedPage(page);
    sessionStorage.setItem("s_tab", page); // Save selected page to sessionStorage
  };

  // Render the appropriate component based on the selected page
  const renderPageComponent = () => {
    switch (selectedPage) {
      case pages[0]:
        return <ExecutiveSummary />;
      case pages[1]:
        return <Crop/>;
      case pages[2]:
        return <Farmer />;
      case pages[3]:
        return <Food />;
      case pages[4]:
        return <Sustainability />;
      case pages[5]:
        return <AIDriven />;
      // case pages[6]:
      //   return <AIDriven />;
      default:
        return <ExecutiveSummary />;
    }
  };

  return (
    <div className="flex justify-center" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="w-full max-w-screen-2xl" style={{ fontFamily: "Poppins, sans-serif" }}>
        <Nav />
        <div className="bg-cover bg-center min-h-screen bg-[#095458]">
          <div className="text-sm flex items-center justify-center text-center mt-0 pt-8 ">
            <div className="w-full " style={{ fontFamily: "Poppins, text-center sans-serif" }}>
              <div className="flex items-center justify-center gap-10 text-white mt-6 p-5">
                {pages.map((page) => (
                  <div
                    key={page}
                    className={` py-3 px-1 rounded-md cursor-pointer  ${
                      selectedPage === page ? "bg-[#19746b]" : "bg-[#00acc1]"
                    }`}
                    onClick={() => handleSelectPage(page)}
                  >
                    {page}
                  </div>
                ))}
              </div>
              {/* Render the selected page component here */}
              <div className=" p-6">
                {renderPageComponent()}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Agriculture