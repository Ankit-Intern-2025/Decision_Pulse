import React, { useEffect, useState } from 'react'; 
import {
  Typography,
  Modal,
  Box,
} from '@mui/material';

import { addNewIndustry, deleteIndustry, fetchIndustries, fetchIndustry, getApi, updateIndustry, updateIndustryName } from '../../../../../../http/dashboard_api';
import { FireAlert } from '../../../../../../utils/static_func';
import { IoMdClose, IoMdRefresh } from "react-icons/io";
import { FaCheck, FaEdit, FaPlus, FaRegEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { FaDeleteLeft } from 'react-icons/fa6';
import { FiSearch } from "react-icons/fi";
import { BiCommentError } from 'react-icons/bi';

const LlmModelIndustry = () => {
    const [industryList, setIndustryList] = useState([])

    const country = [
      "United States",
      "India",
      "China",
      "United Kingdom",
      "Germany",
      "France",
      "Japan",
      "Canada",
      "Australia",
      "Brazil",
      "Russia",
      "South Korea",
      "Italy",
      "Spain",
      "Mexico",
      "Indonesia",
      "Netherlands",
      "Saudi Arabia",
      "United Arab Emirates (UAE)",
      "South Africa"
    ]
    const [data, setData] = useState({
      selectedModel:"Our Model", 
      apiKey:"", 
      selectedIndustry:"", 
      newIndustryName:"", 
      countryName:"", 
      companyUrl:"", 
      selectedCompanyUrl:"",
      addNewIndustryName:""
    })
    const handleInputChange = (e)=>{
      const {name, value} = e.target
      setData(prev=>({...prev, [name]:value}))
    }
    const [isLoading, setIsLoading] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const getIndustry = async ()=>{
      setIsLoading(true)
      try{
        const userInfo = JSON.parse(localStorage.getItem("user"))
        const response = await fetchIndustry(userInfo.userId)
        if(response.domain){
          const companyDetails = response.domain.split("**")
          setData(prev=>({
            ...prev, 
            selectedIndustry:companyDetails[0]?.trim()||"", 
            newIndustryName:companyDetails[0]?.trim()||"", 
            countryName:companyDetails[1]?.trim()||"", 
            companyUrl:companyDetails[2]?.trim()||"",
            selectedCompanyUrl:companyDetails[2]?.trim()||""
          }))
        }
      }catch(err){
  
      }finally{
        setIsLoading(false)
      }
    }
    const getIndustryList = async ()=>{
      try{
        const response = await fetchIndustries()
        if(Array.isArray(response)){
          setIndustryList(response)
        }else{
          setIndustryList([])
        }
      }catch(err){
  
      }
    }
    useEffect(() => {
      getIndustry()
      getIndustryList()
    }, []);
    const [showAddIndustryModal, setShowAddIndustryModal] = useState(false)
    const toggleNewIndustryModal = ()=>{
      setShowAddIndustryModal(prev=>!prev)
      modifyIndustry(null)
      setNewIndustryName("")
      setShowAddNewIndustry(false)
      clearSearch()
    }
    const [selectedIndustryForModify, setSelectedIndustryForModify] = useState(null)
    const handleChangeNewIndustryName = (e)=>{
      setSelectedIndustryForModify(prev=>({...prev, name:e.target.value}))
    }
    const modifyIndustry = (industry)=>{
      setSelectedIndustryForModify(industry)
    }
    const handleSaveModifiedIndustry = async ()=>{
      const response = await updateIndustryName(selectedIndustryForModify.id, {name:selectedIndustryForModify.name})
      if(response.name === selectedIndustryForModify.name){
        setIndustryList(prev=>prev.map(industry=>industry.id===selectedIndustryForModify.id?response:industry))
        setSelectedIndustryForModify(null)
      }
      console.log(response)
    }
    const [showAddNewIndustry, setShowAddNewIndustry] = useState(false)
    const [newIndustryName, setNewIndustryName] = useState("")
    const toggleAddNewIndustry = ()=>{
      setShowAddNewIndustry(prev=>!prev)
    }
    const handleAddNewIndustry = async ()=>{
      const response = await addNewIndustry({name:newIndustryName})
      if(response.name===newIndustryName){
        setIndustryList(prev=>([...prev, response]))
        setNewIndustryName("")
        setShowAddNewIndustry(false)
      }
    }
    const removeIndustry = async (industry)=>{
      const response = await deleteIndustry(industry.id)
      if(response?.data?.message && response?.status===200){
        setIndustryList(prev=>prev.filter(data=>data.id!==industry.id))
      }
  
    }
    const changeIndustry = async ()=>{
      if(data.newIndustryName.trim()===""){
        FireAlert("Information", "Select Industry Name", "info")
        return
      }
      if(data.countryName.trim()===""){
        FireAlert("Information", "Select Country Name", "info")
        return
      }
      if(data.companyUrl.trim()===""){
        FireAlert("Information", "Enter Company URL", "info")
        return
      }
  
      try{
        setIsLoading(true)
        const userInfo = JSON.parse(localStorage.getItem("user")) 
        const response = await updateIndustry(userInfo.userId, {domain:data.newIndustryName+" ** "+data.countryName+" ** "+data.companyUrl})
        if(response.domain){
          FireAlert("Success", response.message, "success")
          setIsEdit(false)
          const companyDetails = response.domain.split("**")
          setData(prev=>({
            ...prev, 
            selectedIndustry:companyDetails[0]?.trim()||"", 
            newIndustryName:companyDetails[0]?.trim()||"", 
            countryName:companyDetails[1]?.trim()||"", 
            companyUrl:companyDetails[2]?.trim()||"",
            selectedCompanyUrl:companyDetails[2]?.trim()||""
          }))
        }else{
          FireAlert("Information", "Unable to update domain, please try again", "info")
        }
      }catch(err){
        FireAlert("Information", "Unable to update domain, please try again", "info")
      }finally{
        setIsLoading(false)
      }
    }
    const [industrySearchInput, setIndustrySearchInput] = useState("")
    const [searchedResult, setSearchedResult] = useState([])
    const handleSearch = (e)=>{
      const {value} = e.target
      setIndustrySearchInput(value)
      setSearchedResult(industryList.filter(industry=>industry?.name?.toLowerCase()?.includes(value?.toLowerCase())))
    }
    const clearSearch = ()=>{
      setIndustrySearchInput("")
      setSearchedResult([])
    }
    const handleSelectIndustry = (selectedIndustry)=>{
      setData(prev=>({...prev, newIndustryName:selectedIndustry}))
      toggleNewIndustryModal()
    }
  return (
    <>
      <div style={{ margin: "20px 0" }} />
      <Typography
        variant="h5"
        style={{
          marginLeft: "32px",
          marginBottom: "14px",
          fontFamily: "Poppins",
          fontWeight: "bold",
        }}
      >
        LLM Model
      </Typography>
      <Box className="flex flex-col gap-3 px-20 min-h-52">
        <Box className="flex gap-3 items-center">
          <span className="w-40">Selected Model :</span>
          <select
            name="selectedModel"
            value={data.selectedModel}
            onChange={handleInputChange}
            className="outline-none px-2 py-2 border rounded-md w-56"
          >
            <option value="Open Ai">Open Ai</option>
            <option value="Our Model">Our Model</option>
          </select>
        </Box>
        {data.selectedModel === "Open Ai" && (
          <Box className="flex gap-3 items-center">
            <span className="w-40">API Key :</span>
            <input
              name="apiKey"
              type="text"
              placeholder="API key"
              value={data.apiKey}
              onChange={handleInputChange}
              className="outline-none px-2 py-2 border rounded-md w-56"
            />
          </Box>
        )}
        <div>
          <button className="px-4 py-2 bg-[#004d4d] text-white rounded-lg">
            Submit
          </button>
        </div>
      </Box>

      <Typography
        variant="h5"
        style={{
          marginLeft: "32px",
          marginBottom: "14px",
          fontFamily: "Poppins",
          fontWeight: "bold",
        }}
      >
        Industry
      </Typography>

      <Box className="flex flex-col gap-3 px-20 min-h-52">
        {!isEdit && (
          <Box className="flex gap-3 items-center">
            <div className="flex gap-5 items-center flex-col justify-start">
              <div className="flex items-center">
                <h2 className="w-44">Industry :</h2>
                <span
                  className={`outline-none px-2 py-2 border rounded-md w-56 h-10 ${
                    data.selectedIndustry ? "" : "text-gray-400"
                  }`}
                  title={data.selectedIndustry}
                >
                  {(data.selectedIndustry.length > 20
                    ? data?.selectedIndustry?.slice(0, 20) + ".."
                    : data.selectedIndustry) || "Industry not available"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-44">Country :</span>
                <span
                  className={`outline-none px-2 py-2 border rounded-md w-56 h-10 ${
                    data.countryName ? "" : "text-gray-400"
                  }`}
                  title={data.countryName}
                >
                  {(data.countryName.length > 20
                    ? data?.countryName?.slice(0, 20) + ".."
                    : data.countryName) || "Country not available"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-44">Company URL :</span>
                <span
                  className={`outline-none px-2 py-2 border rounded-md w-56 h-10 ${
                    data.selectedCompanyUrl ? "" : "text-gray-400"
                  }`}
                  title={data.selectedCompanyUrl}
                >
                  {(data.selectedCompanyUrl.length > 20
                    ? data?.selectedCompanyUrl?.slice(0, 20) + ".."
                    : data.selectedCompanyUrl) || "Country not available"}
                </span>
              </div>
            </div>

            <span className="flex gap-3">
              <IoMdRefresh
                className={`cursor-pointer transition-transform ${
                  isLoading ? "animate-spin" : ""
                }`}
                onClick={getIndustry}
              />
              <FaEdit
                className="cursor-pointer"
                onClick={() => setIsEdit((prev) => !prev)}
              />
            </span>
          </Box>
        )}
        {isEdit && (
          <>
            <Box className="flex gap-5 items-center">
              <div className="flex gap-3 items-center">
                <span className="w-40">Industry :</span>
                <select
                  name="newIndustryName"
                  value={data.newIndustryName}
                  onChange={handleInputChange}
                  className="outline-none px-2 py-2 border rounded-md w-56"
                >
                  <option value="">Select Industry</option>
                  {industryList.map((data, ind) => {
                    return (
                      <option key={ind} value={data.name}>
                        {data.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <span>
                <FaPlus
                  className="p-1 h-6 w-6 cursor-pointer hover:bg-gray-100 active:bg-gray-300 rounded-xl"
                  onClick={toggleNewIndustryModal}
                />
              </span>
            </Box>
            <Box className="flex gap-3 items-center">
              <span className="w-40">Country :</span>
              <select
                name="countryName"
                value={data.countryName}
                onChange={handleInputChange}
                className="outline-none px-2 py-2 border rounded-md w-56"
              >
                <option value="">Select Country</option>
                {country.map((data, ind) => {
                  return (
                    <option key={ind} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
            </Box>
            <Box className="flex gap-3 items-center">
              <span className="w-40">Company URL :</span>
              <input
                name="companyUrl"
                type="text"
                disabled={isLoading}
                placeholder="Enter Industry Name"
                value={data.companyUrl}
                onChange={handleInputChange}
                className="outline-none px-2 py-2 border rounded-md w-56"
              />
            </Box>
            <div className="flex gap-3">
              <button
                className="px-4 py-2 bg-[#004d4d] text-white rounded-lg"
                disabled={isLoading}
                onClick={changeIndustry}
              >
                Submit
              </button>
              <button
                className="px-4 py-2 bg-[#004d4d] text-white rounded-lg"
                disabled={isLoading}
                onClick={() => setIsEdit(false)}
              >
                Cancel
              </button>
            </div>
          </>
        )}
        <Modal keepMounted open={showAddIndustryModal}>
          <div
            style={{
              transform: "translate(-50%, -50%)",
              outline: "none",
            }}
            className="mx-auto w-full rounded-2xl flex justify-center flex-col items-center px-12 py-6 pt-8 absolute top-[50%] left-[50%]"
          >
            <div className="md:w-[60%] xl:w-[50%] w-[70%] p-8 bg-white rounded-lg flex flex-col items-center justify-center gap-4">
              <div className=" flex w-full">
                <div className="font-extrabold text-md mb-2 pe-12 border-b-2 pb-2 ps-4 border-r-2 w-[75%]">
                  Industries
                </div>
                <div className="font-extrabold text-md mb-2 pe-12 border-b-2 pb-2 ps-8 w-[25%]">
                  Action
                </div>
              </div>
              <div className="self-start flex items-center gap-2 border rounded-sm px-2 w-full">
                <FiSearch className="h-4 w-4" />
                <input
                  name="search"
                  type="text"
                  placeholder="Search Industry"
                  className="outline-none pe-2 py-1 text-sm w-full"
                  value={industrySearchInput}
                  onChange={handleSearch}
                />
                {industrySearchInput?.trim() !== "" && (
                  <IoMdClose
                    className="h-6 w-6 cursor-pointer hover:bg-gray-200 rounded-xl p-1"
                    onClick={clearSearch}
                  />
                )}
              </div>
              <div className="max-h-40 min-h-40 overflow-y-auto overflow-x-hidden custom-scrollbar w-full">
                {(industrySearchInput?.trim() !== ""
                  ? searchedResult
                  : industryList
                ).map((industry, index) => {
                  return (
                    <div className="flex w-full" key={index}>
                        {selectedIndustryForModify?.id === industry?.id ? (
                          <div className="text-sm pe-12 py-1 ps-4 border-r-2 w-[76%]">
                              <div className="flex items-center justify-start gap-4">
                                <input
                                  name="companyUrl"
                                  type="text"
                                  placeholder="Enter Industry Name"
                                  value={selectedIndustryForModify?.name}
                                  onChange={handleChangeNewIndustryName}
                                  className="outline-none px-2 py-2 border rounded-md w-56"
                                />
                                <div className=" flex gap-3 items-center justify-center">
                                  <FaCheck
                                    onClick={handleSaveModifiedIndustry}
                                    className="cursor-pointer h-5 w-5"
                                  />
                                  <FaDeleteLeft
                                    onClick={() => modifyIndustry(null)}
                                    className="cursor-pointer h-5 w-5"
                                  />
                                </div>
                              </div>
                          </div>
                        ) : (
                          <div onClick={()=>handleSelectIndustry(industry.name)} className="text-sm pe-12 py-1 ps-4 border-r-2 w-[76%] hover:bg-gray-100 cursor-pointer">
                            <div>{industry.name}</div>
                          </div>
                        )}
                      <div className=" pe-12 py-1 flex gap-3 items-center justify-center w-[24%]">
                        <FaRegEdit
                          className="cursor-pointer h-5 w-5"
                          onClick={() => modifyIndustry(industry)}
                        />
                        <MdDeleteForever
                          className="cursor-pointer h-5 w-5"
                          onClick={() => removeIndustry(industry)}
                        />
                      </div>
                    </div>
                  );
                })}
                {industrySearchInput?.trim() !== "" &&
                  searchedResult.length === 0 && (
                    <div className="flex flex-col items-center justify-center">
                      <BiCommentError className="h-20 w-20" />
                      <span>Does not match any result!!</span>
                      <span
                        onClick={clearSearch}
                        className="cursor-pointer text-sm mt-3 hover:text-slate-700"
                      >
                        Clear Search
                      </span>
                    </div>
                  )}
                {industrySearchInput?.trim() === "" &&
                  searchedResult.length === 0 &&
                  industryList.length === 0 && (
                    <div className="flex flex-col items-center justify-center">
                      <BiCommentError className="h-20 w-20" />
                      <span>There is no industries available!</span>
                      <span
                        onClick={toggleAddNewIndustry}
                        className="cursor-pointer text-sm mt-3 hover:text-slate-700"
                      >
                        Add Industry
                      </span>
                    </div>
                  )}
              </div>
              {showAddNewIndustry && (
                <div className="flex items-center justify-start gap-4">
                  <input
                    name="companyUrl"
                    type="text"
                    placeholder="Enter Industry Name"
                    value={newIndustryName}
                    onChange={(e) => setNewIndustryName(e.target.value)}
                    className="outline-none px-2 py-2 border rounded-md w-56"
                  />
                  <div className=" flex gap-3 items-center justify-center">
                    <FaCheck
                      onClick={handleAddNewIndustry}
                      className="cursor-pointer h-5 w-5"
                    />
                    <FaDeleteLeft
                      onClick={toggleAddNewIndustry}
                      className="cursor-pointer h-5 w-5"
                    />
                  </div>
                </div>
              )}
              <div></div>
              <div className="w-full flex gap-4">
                <button
                  onClick={toggleNewIndustryModal}
                  className="px-3 py-2 text-sm bg-[#095458] text-white flex gap-2 items-center hover:bg-[#153d3f]"
                >
                  Cancel
                </button>
                <button
                  onClick={toggleAddNewIndustry}
                  className="px-3 py-2 text-sm bg-[#095458] text-white flex gap-2 items-center hover:bg-[#153d3f]"
                >
                  Add New
                </button>
              </div>
            </div>
          </div>
        </Modal>
        {/* <Modal>

                <Box className="flex gap-3 items-center">
                  <div>
                    <span className='w-40'>New Industry Name</span>
                    <input 
                      name="addNewIndustryName" 
                      type='text' 
                      disabled={isLoading} 
                      placeholder='Enter Industry Name' 
                      value={data.addNewIndustryName} 
                      onChange={handleInputChange} 
                      className='outline-none px-2 py-2 border rounded-md w-56' 
                    />
                  </div>
                  <div>

                  </div>
               </Box>

        </Modal> */}
      </Box>
    </>
  );
};

export default LlmModelIndustry;
