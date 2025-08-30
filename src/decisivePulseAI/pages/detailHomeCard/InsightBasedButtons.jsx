import { useParams } from "react-router-dom";
import { PiNotepad } from "react-icons/pi";
import { useState, useEffect, useRef, useCallback } from "react";
import Dropdown2 from "../../components/admin/dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import { Modal, Tooltip } from "@mui/material";
import { alpha, styled, Switch } from "@mui/material";
import Select, { components } from 'react-select';
import { IoIosClose, IoMdAdd, IoMdClose } from "react-icons/io";
import { UseContext } from "../../../context/ContextProvider";
import { FireAlert, FireAlertWithCallback } from "../../../utils/static_func";
import { RiRefreshLine } from "react-icons/ri";
import { fetchUsers, postGrantDashboard, postShareDashboard } from "../../../http/admin_api";
import { useSelector } from "react-redux";
import ShareDashboard from "./ShareDashboard";
import { dashboardTabs } from "../../../utils/modules";

const InsightBasedButtons = ({ selectedPage, setSelectedPage }) => {
  
  const authState = useSelector((state) => state.auth);
  const { isLoggedIn, user } = authState;
  const [tabs, setTabs] = useState([]);

  useEffect(()=>{
    const userType = JSON.parse(localStorage.getItem("user")).userType
    if(userType==="admin"){
      setTabs(Object.values(dashboardTabs))
      window.scrollTo(0, 0);
      const selectedpage = sessionStorage.getItem("s_tab")
      if(selectedpage){
        setSelectedPage(selectedpage)
      }else{
        setSelectedPage("Executive Summary")
      }
    }else{
      const tabsAccess = JSON.parse(sessionStorage.getItem("selectedDashboard")).tabs_access
      const allowedTabs = []
      Object.keys(dashboardTabs).forEach(data=>{
        if(tabsAccess[data]){
          allowedTabs.push(dashboardTabs[data])
        }
      })
      setTabs(allowedTabs)
      handleSelectPage(allowedTabs[0])
    }
    return ()=> sessionStorage.removeItem("s_tab")

  },[])

  const handleSelectPage = (page)=>{
    setSelectedPage(page)
    sessionStorage.setItem("s_tab", page)
  } 
  return (
    <div className="flex items-center justify-center gap-10 text-white mt-6">
      {tabs.map((page) => (
        <div
          key={page}
          className={`px-3 py-1 rounded-md cursor-pointer ${selectedPage === page ? "bg-[#19746b]" : "bg-[#00acc1]"}`}
          onClick={() => handleSelectPage(page)}
        >
          {page}
        </div>
      ))}
      {user?.userType==="admin" && <ShareDashboard />}
    </div>
  );
};

export default InsightBasedButtons