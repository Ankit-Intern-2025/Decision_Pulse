import React from 'react'
import { useState, useEffect, useRef, useCallback } from "react";
import { FaShare } from "react-icons/fa";
import { Modal, Tooltip } from "@mui/material";
import { alpha, styled, Switch } from "@mui/material";
import Select, { components } from 'react-select';
import { IoIosClose, IoMdAdd, IoMdClose } from "react-icons/io";
import { UseContext } from "../../../context/ContextProvider";
import { FireAlert, FireAlertWithCallback } from "../../../utils/static_func";
import { RiRefreshLine } from "react-icons/ri";
import { fetchUsers, postGrantDashboard, postShareDashboard } from "../../../http/admin_api";

const ShareDashboard = () => {
      const {handleLoader} = UseContext()
    
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [isMenu, setIsMenu] = useState(false);
    
    useEffect(() => {
      if(users.length===0){
        getAllUsers()
      }
    }, []);
   
  
  
    const [showModal, setShowModal] = useState(false)
    const toggleModal = () => setShowModal(prev => !prev)
    const handleUploadSubmit = () => {
      toggleModal()
    }
  
    const [checkBoxes, setCheckBoxes] = useState([
        {"label":"Executive Summary", "keyName":"anomaly", "isChecked":true},
        {"label":"Descriptive", "keyName":"descriptive", "isChecked":true},
        {"label":"Diagnostic", "keyName":"diagnostic", "isChecked":true},
        {"label":"Predictive", "keyName":"predictive", "isChecked":true},
        {"label":"Prescriptive", "keyName":"prescriptive", "isChecked":true},
    ])
    const handleOptionsChange = (e, index, isCheckAll)=>{
      if(isCheckAll){
        setCheckBoxes(prev=>{
            if(prev.every(data=>data.isChecked)){
              return prev.map(data=>({...data, isChecked:false}))
            }else{
              return prev.map(data=>({...data, isChecked:true}))
            }
        })
      }else{
        const {checked} = e.target
        setCheckBoxes(prev=>{
          const tempCheck = [...prev]
          tempCheck[index].isChecked = checked
          return tempCheck
        })
      }
    }
  
    const [selectedOptions, setSelectedOptions] = useState([])
    const handleOptionChange = (selectedOptions)=>{
      setSelectedOptions(selectedOptions)
    }
    const [addedUsers, setAddedUsers] = useState([])
    const handleAddUsers = ()=>{
      setAddedUsers(prev=>([...prev,...selectedOptions]))
      setSelectedOptions([])
    }
    const removeUsers = (user)=>{
      setAddedUsers(prev=>prev.filter(data=>data!=user))
    }
    const handleShareDashboard = async ()=>{
      toggleModal()
      handleLoader(true, "Sharing Dashboard to Selected users, Please wait...")
      try{
        const request= {
          user_ids:addedUsers.map(user=>user.value.id)
        }
        const selectedDashboard = JSON.parse(sessionStorage.getItem("selectedDashboard")).id
        checkBoxes.forEach(data=>{
          request[data.keyName]=data.isChecked
        })
        const response = await postShareDashboard(request, selectedDashboard)
        if(response.message.toLowerCase()==="tab permissions updated"){
          setSelectedOptions([])
          setAddedUsers([])
          setCheckBoxes(prev=>prev.map(data=>({...data, isChecked:false})))
          FireAlert("Success", "Dashboard Shared Successfully", 'success')
        }else{
          FireAlertWithCallback("Information", "Unable to share dashboard, please try again", 'info', "", toggleModal)
        }
      }catch(err){
        FireAlertWithCallback("Information", "Unable to share dashboard, please try again", 'info', "", toggleModal)
        console.log(err)
      }finally{
        handleLoader(false, "")
      }
    }
  
    const getAllUsers = useCallback( async(page = 1, rowsPerPage = 50, filters={}) => {
      setLoading(true);
      try {
        const response = await fetchUsers(page, rowsPerPage, filters);
        if (response.data.length > 0) {
          setUsers(response.data.filter(data=>data.user_type==="normal"))
        } else {
        }
      } catch (err) {
  
      } finally {
        setLoading(false);
      }
    },[]);
  return (
    <div className="relative ms-[-15px] z-[11]">
    <div
      onClick={handleUploadSubmit}
      className={`cursor-pointer px-3 py-2 bg-[#00acc1] rounded-md `}
    >
      <FaShare />
    </div>

    {showModal && 
      <Modal
        keepMounted
        open={showModal}
        onClose={toggleModal}
      >
        <div
          style={{
            transform: 'translate(-50%, -50%)',
            outline: "none"
          }}
          className='mx-auto rounded-2xl bg-[#D9D9D9] flex justify-start px-12 py-6 pt-8 min-h-[50vh] min-w-[55%] absolute top-[50%] left-[50%]'
        >
          <div className="flex w-full">
            <div className="border-r-2 w-[35%]">
              <div className="font-extrabold text-md mb-3 pe-12 border-b-2 pb-2 ps-4">Select Dashboards</div>
              <div className="flex flex-col gap-2 ps-4 pe-12">
                <div className="flex justify-between items-center">
                  <span className="text-sm">All Dashboards</span>
                  <CustomSwitch
                    checked={checkBoxes.every(data=>data.isChecked)}
                    name='enabled'
                    onChange={(e)=>handleOptionsChange(e, "", true)}
                  />
                </div>
                {checkBoxes.map((data,index)=>{
                  return(
                    <div key={index} className="flex justify-between items-center">
                      <span>{data.label}</span>
                      <CustomSwitch
                        checked={data.isChecked}
                        onChange={(e)=>handleOptionsChange(e, index)}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="w-[65%] relative">
              <div className="font-extrabold text-md mb-3 pe-12 border-b-2 pb-2 ps-8">Select Users</div>
                <div className="ps-8 flex items-center gap-2">
                  <span>
                    <RiRefreshLine
                      onClick={()=>!loading ? getAllUsers() : undefined}
                      className={`text-2xl cursor-pointer transition-transform ${
                        loading ? "animate-spin text-gray-400 cursor-not-allowed" : "hover:text-blue-500"
                      }`}
                    />
                  </span>
                  <FilterMultiSelect 
                      value={selectedOptions}
                      values={users}
                      handleOptionChange={handleOptionChange}
                      loading={loading}
                      selectedUsers={addedUsers}
                  />
                 
                </div>
                <div className="ps-8 mt-3 flex justify-end">
                  <button
                    className="px-3 py-2 text-sm bg-[#095458] text-white flex gap-2 items-center hover:bg-[#153d3f]"
                    onClick={handleAddUsers}
                  >
                    <span><IoMdAdd /></span>
                    <span>Add Users</span>
                  </button>
                </div>
                {addedUsers?.length>0 && 
                  <div className="flex flex-col gap-3">
                    <div className="font-extrabold text-md mb-2 ps-8">Selected Users</div>
                    <div className="flex flex-col gap-2 ps-8 w-[60%]">
                      {addedUsers.map((user, index)=>{
                        return(
                          <Tooltip arrow title={user?.value?.email} placement="bottom" key={index}>
                            <div className=" text-sm flex gap-3 items-center bg-gray-200 rounded-sm px-2 py-2 justify-between" >
                              <span>{user?.value?.email.length>35?user?.value?.email.slice(0,35):user?.value?.email}</span>
                              <span className="hover:bg-gray-400 p-1 rounded-sm cursor-pointer" onClick={()=>removeUsers(user)}><IoMdClose /></span>
                            </div>
                          </Tooltip>
                        )
                      })}
                    </div>
                  </div>
                }
                {addedUsers?.length>0 && 
                  <div className="ps-8 mt-3 text-end absolute right-0 bottom-6">
                  <button
                    className="px-3 py-2 text-sm bg-[#095458] text-white flex gap-2 items-center hover:bg-[#153d3f]"
                    onClick={handleShareDashboard}
                  >
                    <span><FaShare /></span>
                    <span>Share Dashboard</span>
                  </button>
                </div>
                }
            </div>
          </div>
          <IoIosClose className="absolute top-3 right-3 h-6 w-6 cursor-pointer rounded-xl hover:bg-gray-200" onClick={toggleModal} />
        </div>
      </Modal>
    }
  </div>
  )
}

export default ShareDashboard




const CustomSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: "#095458",
      '&:hover': {
        backgroundColor: alpha("#095458", theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: "#095458",
    },
  }));
  
  const FilterMultiSelect = ({values, handleOptionChange, value, loading, selectedUsers})=>{
   const options = values.map(val=>({label:val.email,value:val}))
    return(
      <Select
          isMulti
          options={options}
          onChange={(selectedOptions) =>
              handleOptionChange(
                selectedOptions.map((option) => option)
              )
          }
          isOptionDisabled={(option)=>selectedUsers.some(val=>val.label===option.label)}
          value={value}
          className="w-[100%]"
          styles={{
              control: (base) => ({
              ...base,
              // borderColor: "rgba(156, 163, 175)", // Matches Tailwind `border-slate-400`
              borderRadius: "0.15rem", // Matches Tailwind `rounded-md`
              // backgroundColor: "rgb(241, 245, 249)", // Matches Tailwind `bg-slate-100`
              }),
          }}
          noOptionsMessage={()=>"Users Not available"}
          isDisabled={loading}
          isLoading={loading}
          placeholder="Select Users"
          components={{ DropdownIndicator: CustomDropdownIndicator }}
      />
    )
  }
  const CustomDropdownIndicator = (props) => {
    const { selectProps } = props;
  
    return (
      <components.DropdownIndicator {...props}>
        {selectProps.menuIsOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="13"
            viewBox="0 0 17 15"
            fill="none"
            className="flex-shrink-0"
          >
            <path
              d="M9.36602 14.5C8.98112 15.1667 8.01888 15.1667 7.63397 14.5L0.272759 1.75C-0.112142 1.08333 0.368983 0.250002 1.13878 0.250002L15.8612 0.25C16.631 0.25 17.1121 1.08333 16.7272 1.75L9.36602 14.5Z"
              fill="#3C3C3C"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="13"
            viewBox="0 0 17 15"
            fill="none"
            className="flex-shrink-0"
          >
            <path
              d="M7.63398 0.5C8.01888 -0.166667 8.98112 -0.166667 9.36602 0.5L16.7272 13.25C17.1121 13.9167 16.631 14.75 15.8612 14.75H1.13878C0.368984 14.75 -0.112141 13.9167 0.272759 13.25L7.63398 0.5Z"
              fill="#016064"
            />
          </svg>
        )}
      </components.DropdownIndicator>
    );
  };