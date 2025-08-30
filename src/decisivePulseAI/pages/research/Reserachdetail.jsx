

import React, { useState, useEffect } from "react";
import Footer from "../../components/footer";
import Nav from "../../components/nav";
import { FaShare } from "react-icons/fa";

// Component for each page
import  ExecutiveComponent  from "./researchComponent/ExecutiveComponent";
import  MarketTrendseComponent  from "./researchComponent/MarketTrendseComponent";
import  SalesRevenueComponent  from "./researchComponent/SalesRevenueComponent";
import  CompetitiveIntelligenceComponent from "./researchComponent/CompetitiveIntelligenceComponent";
import  SupplyChainComponent  from "./researchComponent/SupplyChainComponent";
import  EVSustainabilityComponent  from "./researchComponent/EVSustainabilityComponent";

const Reserachdetail = () => {
  // Initialize selectedPage with sessionStorage value if available
  const [selectedPage, setSelectedPage] = useState(
    sessionStorage.getItem("s_tab") || "Executive Summary (Auto Market Overview)"
  );

  // Define pages list
  const pages = [
    "Competitive Intelligence",
     
    "Supply Chain & Production Analytics",
    "Executive Summary (Auto Market Overview)",
    "Market Trends & Forecasting",
    "Sales & Revenue Dashboard",
    "EV & Sustainability Insights",
  ];

  // Function to change the selected page
  const handleSelectPage = (page) => {
    setSelectedPage(page);
    sessionStorage.setItem("s_tab", page); // Save selected page to sessionStorage
  };

  // Render the appropriate component based on the selected page
  const renderPageComponent = () => {
    switch (selectedPage) {
      case "Executive Summary (Auto Market Overview)":
        return <ExecutiveComponent />;
      case "Market Trends & Forecasting":
        return <MarketTrendseComponent />;
      case "Sales & Revenue Dashboard":
        return <SalesRevenueComponent />;
      case "Competitive Intelligence":
        return <CompetitiveIntelligenceComponent />;
      case "Supply Chain & Production Analytics":
        return <SupplyChainComponent/>;
      case "EV & Sustainability Insights":
        return <EVSustainabilityComponent />;
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

export default Reserachdetail;
