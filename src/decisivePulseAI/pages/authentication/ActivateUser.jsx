import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { activateAccount, getValidateToken } from "../../../http/auth_api";
import { UseContext } from "../../../context/ContextProvider";
import { FireAlert, FireAlertWithCallback } from "../../../utils/static_func";
import Logo from "../../resources/login/Logo.png";
import SideImage from "../../resources/login/4402947_182992.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { CircularProgress, styled, Tooltip, tooltipClasses } from "@mui/material";

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const ActivateUser = () => {
  const { token } = useParams();
  const { handleLoader } = UseContext();
  const navigate = useNavigate()

  const [isTokenValid, setIsTokenValid] = useState(false);
  const validateToken = async (token) => {
    handleLoader(true, "Validating Token");
    try {
      const response = await getValidateToken(token);
      if (response.message.toLowerCase() === "token is valid") {
        setIsTokenValid(true);
      } else {
        setIsTokenValid(false);
      }
    } catch (err) {
      setIsTokenValid(false);
    } finally {
      handleLoader(false, "");
    }
  };
  useEffect(() => {
    validateToken(token);
  }, []);
  const [password, setPassword] = useState({old:"", new:"", confirm:""});
  const [error, setError] = useState({new:"", old:"", confirm:""});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({new:false, old:false, confirm:false});
  const handleShowPassword = (name) => {
    setShowPassword((prev) => {
      if (prev[name] === false) {
        setTimeout(() => {
          setShowPassword(prev=>({...prev, [name]:false}));
        }, 6000);
      }
      return {...prev, [name]:!prev[name]};
    });
  };
  const handleReset = ()=>{
    setPassword({old:"", new:"", confirm:""})
    setError({new:"", old:"", confirm:""})
    setShowPassword({new:false, old:false, confirm:false})
  }

  const validatePassword = (name, value)=>{
    if(name==="new"){
        if(!passwordRegex.test(value)){
            setError(prev=>({...prev, [name]:"Password must contain at least 8 characters, including uppercase, lowercase, number, and special character."}))
        }else{
            setError(prev=>({...prev, [name]:""}))
        }
    }
    if(name==="confirm"){
        if(value!==password.new){
            setError(prev=>({...prev, [name]:"Please make sure your password match."}))
        }else{
            setError(prev=>({...prev, [name]:""}))
        }
    }

  }
  const handleInputChange = (e)=>{
    const {name, value} =  e.target
    setPassword(prev=>({...prev, [name]:value}))
    validatePassword(name, value)
  }
  const submit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    try{
        const request = {
            "token":token,
            "generated_password":password.old,
            "new_password":password.new
        }
        const response = await activateAccount(request)
        console.log(response)
        if(response.message==="User activated successfully"){
            FireAlertWithCallback("Success", "User Activated Successfully", "success", "", ()=>navigate("/"))
            handleReset()
            navigate("/")
        }else{
            FireAlert("Information", "Unable to activate please try again", "info", "")
        }

    }catch(err){
        console.log(err)
        FireAlert("Information", "Unable to activate please try again", "info", "")
    }finally{
        setLoading(false)
    }
  }
  return (
    <div className="flex h-screen">
        {/* Left Section - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full max-md:-mt-24">
            <div className="flex flex-col items-center w-full">
            <div className="w-full">
                <img src={Logo} alt="Logo" className="mb-6 w-32 h-24" />
                {isTokenValid ? (
                <>
                <h1 className="text-2xl">
                    <div>Welcome to</div>
                    <div>Decision Pulse AI</div>
                    <div className="text-sm">
                    Create your password to activate your account.
                    </div>
                </h1>
                <form className="w-full" onSubmit={submit}>
                    <p className="text-red-500 mb-4 h-6"></p>

                    <div className="">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <div className={`flex items-center border ${error.old?"border-red-400":""} rounded-sm relative`}>
                        <input
                            className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type={showPassword.old ? "text" : "password"}
                            placeholder="********"
                            autoComplete="current-password"
                            value={password.old}
                            name="old"
                            onChange={handleInputChange}
                            required
                        />
                        {password.old && (
                        <span
                            onClick={()=>handleShowPassword("old")}
                            className="w-7 cursor-pointer absolute right-0 bg-transparent"
                        >
                            {showPassword.old ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        )}
                    </div>
                    <div className="text-sm text-red-800 mb-4">{error.old}</div>

                    </div>
                    <div className="">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        New password
                    </label>
                    <div className={`flex items-center border ${error.new?"border-red-400":""} rounded-sm relative`}>
                        <input
                            className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type={showPassword.new ? "text" : "password"}
                            placeholder="********"
                            autoComplete="current-password"
                            value={password.new}
                            name="new"
                            onChange={handleInputChange}
                            required
                        />
                        {password.new && (
                        <span
                            onClick={()=>handleShowPassword("new")}
                            className="w-7 cursor-pointer absolute right-0 bg-transparent"
                        >
                            {showPassword.new ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        )}
                    </div>
                    </div>
                    <div className="text-sm text-red-800 mb-4">
                        {error.new && 
                            <Tooltip arrow placement="bottom-start" title={
                                <span className="flex flex-col">
                                    <span>MUST contain at least 8 characters</span>
                                    <span>MUST contain at least one uppercase letter</span>
                                    <span>MUST contain at least one lowercase letter</span>
                                    <span>MUST contain at least one number</span>
                                    <span>MUST contain at least one special character(!#$%"&',+-/?=*)</span>
                                </span>
                            }
                            
                            >
                                <span className="flex items-center gap-2">
                                    <IoIosInformationCircle />
                                    <span className="text-sm">Invalid password</span>
                                </span>
                            </Tooltip>
                        }
                        
                    </div>

                    <div className="">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Confirm new password
                    </label>
                    <div className={`flex items-center border ${error.confirm?"border-red-400":""} rounded-sm relative`}>
                        <input
                        className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type={showPassword.confirm ? "text" : "password"}
                        placeholder="********"
                        autoComplete="current-password"
                        value={password.confirm}
                        name="confirm"
                        onChange={handleInputChange}
                        required
                        />
                        {password.confirm && (
                        <span
                            onClick={()=>handleShowPassword("confirm")}
                            className="w-7 cursor-pointer absolute right-0 bg-transparent"
                        >
                            {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        )}
                    </div>
                    </div>
                    <div className="text-sm text-red-800 mb-4">{error.confirm}</div>

                    <div className="mb-6">
                    <button
                        type="submit"
                        className="w-full bg-[#33A9C8] hover:bg-[#1f8696] text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-3 focus:outline-none focus:shadow-outline"
                    >
                        {loading && (
                        <>
                            <CircularProgress
                            size={20}
                            color=""
                            thickness={6}
                            />{" "}
                            Activating
                        </>
                        )}{" "}
                        {!loading && "Activate"}
                    </button>
                    </div>
                </form>
                </>
                )
                :(
                 <h1 className="text-2xl mb-4">
                    <div>Welcome to</div>
                    <div>Decision Pulse AI</div>
                    <div className="text-sm mt-10">
                        The page you are trying to access is either invalid or has expired. Please contact your administrator.
                    </div>
                </h1>
                )
                }
            </div>
            </div>
        </div>
        </div>

        {/* Right Section - Image */}
        <div className="hidden lg:block w-1/2 h-full">
        <img
            src={SideImage}
            alt="Side Image"
            className="h-full w-full object-cover"
        />
        </div>
    </div>
     
  );
};

export default ActivateUser;