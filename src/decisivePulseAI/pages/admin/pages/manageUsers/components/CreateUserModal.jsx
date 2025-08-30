import React, { memo, useState } from "react";
import { postCreateNewUser } from "../../../../../../http/admin_api";
import { CircularProgress, Modal } from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";

const CreateUserModal = memo(({showCreateUserModal, setShowCreateUserModal}) => {
      const [createUser, setCreateUser] = useState({
        email:"",
        name:"",
        loading:false,
        error:"",
        successMessage:"",
      });
      const toggleModalCreateUser = ()=>{
        setCreateUser(prev=>(
            {
              ...prev, 
              email:"",
              name:"",
              loading:false,
              error:"",
              successMessage:"",
            }
          ))
          setShowCreateUserModal(prev=>!prev)
        }
        const handleCreateMore = ()=>{
          setCreateUser(prev=>(
            {
              ...prev, 
              email:"",
              name:"",
              loading:false,
              error:"",
              successMessage:"",
            }
          ))
          setShowCreateUserModal(true)
        }
      const handleCreateUserInputChange = (e)=>{
        const {value, name} = e.target
        setCreateUser(prev=>({...prev, [name]:value}))
      }
      const handleCreateNewUser = async (e)=>{
        e.preventDefault()
        setCreateUser(prev=>({...prev, loading:true, error:"", successMessage:""}))
        try{
          const response = await postCreateNewUser({email:createUser.email, name:createUser.name})
          if(response.message.toLowerCase()==="user created successfully"){
            setCreateUser(prev=>({...prev, error:"", successMessage:"User Onboard success, activation link sent to email."}))
          }else{
            setCreateUser(prev=>({...prev, error:"Unable to create user. please try again", successMessage:""}))
          }
        }catch(err){
          setCreateUser(prev=>({...prev, error:"Unable to create user.", successMessage:""}))
        }finally{
          setCreateUser(prev=>({...prev, loading:false}))
    
        }
      }

  return (
    <Modal keepMounted open={showCreateUserModal}>
      <div
        style={{
          transform: "translate(-50%, -50%)",
          outline: "none",
        }}
        className="mx-auto rounded-2xl bg-[#D9D9D9] flex justify-start flex-col px-12 py-6 pt-8 min-h-[30vh] min-w-[80%] md:min-w-[40%] absolute top-[50%] left-[50%]"
      >
        <div className="text-md font-bold text-center border-b-2 border-gray-100 pb-3 mb-3">
          User Details
        </div>
        <form
          className="flex flex-col w-full gap-2 text-sm"
          onSubmit={handleCreateNewUser}
        >
          {createUser.error && (
            <span className="text-center text-red-950">{createUser.error}</span>
          )}
          {createUser.successMessage ? (
            <div className="flex flex-col gap-3 items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-4">
                <FaCheckCircle size={35} />
                <span>{createUser.successMessage}</span>
              </div>
              <div className="mt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCreateMore}
                  className="btn-primary"
                >
                  <span>Create More</span>
                </button>
                <button
                  onClick={toggleModalCreateUser}
                  type="button"
                  className="btn-primary"
                >
                  <span>Close</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center">
                <div className="w-[35%] text-md">Name</div>
                <input
                  required
                  value={createUser.name}
                  onChange={handleCreateUserInputChange}
                  placeholder="Enter Name"
                  name="name"
                  type="text"
                  className="w-[65%]  outline-none px-3 py-2 border rounded-sm text-sm font-normal"
                />
              </div>

              <div className="flex">
                <div className="w-[35%] text-md">Email ID</div>
                <input
                  required
                  value={createUser.email}
                  onChange={handleCreateUserInputChange}
                  placeholder="Enter Email"
                  name="email"
                  type="email"
                  className="w-[65%]  outline-none px-3 py-2 border rounded-sm text-sm font-normal"
                />
              </div>

              <div className="mt-3 flex justify-end gap-3">
                <button
                  disabled={createUser.loading}
                  onClick={toggleModalCreateUser}
                  type="button"
                  className="btn-primary"
                >
                  <span>Cancel</span>
                </button>
                <button
                  disabled={createUser.loading}
                  type="submit"
                  className="btn-primary"
                >
                  {createUser.loading && (
                    <CircularProgress style={{ color: "white" }} size={20} />
                  )}
                  <span>Submit</span>
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </Modal>
  );
});

export default CreateUserModal;
