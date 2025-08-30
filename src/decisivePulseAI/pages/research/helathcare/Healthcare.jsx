

// const Healthcare = () => {


// }

// export default Healthcare



import React, { useState, useEffect } from "react";
import Footer from "../../../components/footer";
import Nav from "../../../components/nav";


// Component for each page
import  ExecutiveComponent  from "./ExecutiveComponent";
import  MarketTrendseComponent  from "./MarketTrendseComponent";
import  CompetitiveIntelligence   from "./CompetitiveIntelligence";
import  HospitalPatientDashboard from "./HospitalPatientDashboard";
import  SupplyChainComponent  from "./SupplyChainComponent";
import  HealthcareSustainability  from "./HealthcareSustainability";

const Healthcare = () => {
  // Initialize selectedPage with sessionStorage value if available
  const [selectedPage, setSelectedPage] = useState(
    sessionStorage.getItem("s_tab") || "Hospital & Patient Care Dashboard"
  );

  // Define pages list
  const pages = [
    "Hospital & Patient Care Dashboard",
    "Supply Chain & Production Analytics",
    "Executive Summary (Healthcare Market Overview)",
    "Market Trends & Forecasting",
    "Competitive Intelligence ",
  
    "Healthcare Sustainability & ESG Insights",
  ];

  // Function to change the selected page
  const handleSelectPage = (page) => {
    setSelectedPage(page);
    sessionStorage.setItem("s_tab", page); // Save selected page to sessionStorage
  };

  // Render the appropriate component based on the selected page
  const renderPageComponent = () => {
    switch (selectedPage) {
      case "Executive Summary (Healthcare Market Overview)":
        return <ExecutiveComponent />;
      case "Market Trends & Forecasting":
        return <MarketTrendseComponent />;
      case "Competitive Intelligence ":
        return <CompetitiveIntelligence />;
      case "Hospital & Patient Care Dashboard":
        return <HospitalPatientDashboard />;
      case "Supply Chain & Production Analytics":
        return <SupplyChainComponent/>;
      case "Healthcare Sustainability & ESG Insights":
        return <HealthcareSustainability />;
      default:
        return null;
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
  );
};

export default Healthcare;
