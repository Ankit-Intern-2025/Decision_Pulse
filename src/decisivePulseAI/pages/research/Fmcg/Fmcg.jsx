
import React, { useState, useEffect } from "react";
import Footer from "../../../components/footer";
import Nav from "../../../components/nav";

// Component for each page
import  ExecutiveComponent  from "./FmcgComponent/ExecutiveComponent";
import  MarketTrendseComponent  from "./FmcgComponent/MarketTrendseComponent";
import  CompetitiveIntelligence   from "./FmcgComponent/CompetitiveIntelligence";
import  ESGSustainabilityInsights from "./FmcgComponent/ESGSustainabilityInsights";
import  SupplyChainComponent  from "./FmcgComponent/SupplyChainComponent";
import  SalesRevenue from "./FmcgComponent/SalesRevenue";

const Oilgas = () => {
  // Initialize selectedPage with sessionStorage value if available
  const [selectedPage, setSelectedPage] = useState(
    sessionStorage.getItem("s_tab") || "Sales & Revenue Performance Dashboard"
  );

  // Define pages list
  const pages = [
    "ESG & Sustainability Insights",
    "Supply Chain & Inventory Optimization",
    "Executive Summary (FMCG Market Overview)",
    "Marketing & Promotion Effectiveness",
    "Consumer Insights & Demand Forecasting",
    "Sales & Revenue Performance Dashboard",
  ];

  // Function to change the selected page
  const handleSelectPage = (page) => {
    setSelectedPage(page);
    sessionStorage.setItem("s_tab", page); // Save selected page to sessionStorage
  };

  // Render the appropriate component based on the selected page
  const renderPageComponent = () => {
    switch (selectedPage) {
      case "Executive Summary (FMCG Market Overview)":
        return <ExecutiveComponent />;
      case "Marketing & Promotion Effectiveness":
        return <MarketTrendseComponent />;
      case "Consumer Insights & Demand Forecasting":
        return <CompetitiveIntelligence />;

      case "ESG & Sustainability Insights":
        return <ESGSustainabilityInsights />;
      case "Supply Chain & Inventory Optimization":
        return <SupplyChainComponent/>;
      case "Sales & Revenue Performance Dashboard":
        return <SalesRevenue />;
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

export default Oilgas;
