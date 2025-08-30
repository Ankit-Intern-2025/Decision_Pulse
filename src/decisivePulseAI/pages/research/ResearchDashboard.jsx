import React, { useState, useEffect } from "react";
import Footer from "../../components/footer";
import Nav from "../../components/nav";

import { useParams } from "react-router-dom";
import DynamicTabBody from "./components/DynamicTabBody";
import { staticData } from "./dummyChartsData";

const ResearchDashboard = () => {
  const { domain } = useParams();
  const [selected, setSelected] = useState({
    domain: "",
    selectedPage: "",
    pages:[],
    pageData: [],
  });
  const [error, setError] = useState({
    wrongDomain: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!staticData[domain]) {
      setError((prev) => ({ ...prev, wrongDomain: true }));
    } else {
      setLoading(true)
      setSelected(prev=>{
        const selectedDomain = staticData[domain]
        const pages = Object.keys(selectedDomain)
        return {
            ...prev,
            domain: domain,
            selectedPage: pages[0],
            pages:pages,
            pageData: selectedDomain[pages[0]],
          }
      })
    }
    setTimeout(() => {
      setLoading(false)
    }, 1000);
    window.scrollTo(0, 0); // Scrolls to the top-left corner of the page
    
  }, []);
  const handleSelectPage = (page) => {
    setLoading(true)
    setSelected(prev=>({...prev, selectedPage:page, pageData:staticData[domain][page]}))
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  };
  return (
    <div
      className="flex justify-center scroll-smooth"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div
        className="w-full max-w-screen-2xl"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <Nav />
        <div className="bg-cover bg-center min-h-screen bg-[#095458]">
          <div className="text-sm flex items-center justify-center text-center mt-0 pt-8 ">
            <div
              className="w-full "
              style={{ fontFamily: "Poppins, text-center sans-serif" }}
            >
              <div className="flex items-center justify-center gap-10 text-white mt-6 p-5 overflow-x-auto overflow-y-hidden custom-scrollbar">
                {selected.pages?.map((page) => (
                  <div
                    key={page}
                    className={` py-3 px-3 rounded-md cursor-pointer min-w-[150px]  ${
                      selected.selectedPage === page ? "bg-[#19746b]" : "bg-[#00acc1]"
                    }`}
                    onClick={() => handleSelectPage(page)}
                  >
                    {page}
                  </div>
                ))}
              </div>
              {/* Render the selected page component here */}
              <div className=" p-6">
                <DynamicTabBody data={selected.pageData} loading={loading} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ResearchDashboard;
