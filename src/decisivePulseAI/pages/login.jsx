import React, { useEffect, useState } from "react";
import Logo from "../resources/login/Logo.png";
import SideImage from "../resources/login/4402947_182992.png";
import { Link, useNavigate } from "react-router-dom";
import config from '../../utils/config'
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { CircularProgress } from "@mui/material";
import { API } from "../../http/dashboard_api";
import { useMutation } from "@tanstack/react-query";
const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [loading, setLoading] = useState(false)
  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const response = await API.post("/auth/login", data);
      // console.log(response)
      return response.data; // ✅ Return only the response data
    },
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true)
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (result) => {
          // console.log("API Login Response:", result);
  
          // 🔥 Ensure correct API response structure
          const { access_token, refresh_token, user_id, user_type } = result; 
  
          // Store token correctly
          localStorage.setItem("accessToken", access_token); 
          localStorage.removeItem("modules_list")
  
          dispatch(
            login({
              user_id,
              email,
              access_token,
              refresh_token,
              user_type,
            })
          );
  
          // API.defaults.headers.common["Authorization"] = `Bearer ${access_token}`; // Update global token
  
          navigate("/home", { replace: true });
        },
        onError: (error) => {
          console.error("Login Failed:", error);
          setError("Invalid credentials or server error.");
        },
        onSettled: () => setLoading(false),
      }
    );
    // try {
    //   const response = await API.post("/auth/login", JSON.stringify({"email":email,"password": password }))
    //   // fetch(`${config.BASE_URL}/auth/login`, {
    //   //   method: "POST",
    //   //   headers: {
    //   //     "Content-Type": "application/json",
    //   //   },
    //   //   body: JSON.stringify({"email":email,"password": password }),
    //   // });

    //   console.log("Response status:", response.status, response);

    //   if (!response.statusText/*ok*/) {
    //     const errorResult = await response.data//.json();
    //     console.error("Error response:", errorResult);
    //     setError(errorResult.detail || "Login failed.");
    //     return;
    //   }

    //   const result = await response.data//.json();
    //   console.log("API Response:", result); // Add this line to log the response
    //   dispatch(login({
    //     user_id: result.user_id,
    //     email: email,
    //     access_token: result.access_token,
    //     refresh_token: result.refresh_token,
    //     user_type: result.user_type,
    //   }))

    //   console.log("User stored in localStorage:", JSON.parse(localStorage.getItem("user")));
    //   console.log("Access token stored:", localStorage.getItem("accessToken"));
    //   if (response.status === 200) {
    //     navigate("/home", { replace: true });
    //   }

    // } catch (err) {
    //   console.error("Error connecting to the server:", err);
    //   setError("Unable to connect to the server. Please try again.");
    // }finally{
    //   setLoading(false)
    // }
  };
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = ()=>{
    setShowPassword(prev=>{
      if(prev===false){
        setTimeout(() => {
          setShowPassword(false)
        }, 2000);
      }
      return !prev
    })
  }
  return (
    <div className="flex h-screen">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full max-md:-mt-24">
          <div className="flex flex-col items-center w-full">
            <div className="w-full">
              <img src={Logo} alt="Logo" className="mb-6 w-32 h-24" />
              <h1 className="text-2xl mb-4">
                <div>Welcome Back to</div>
                <div>Decision Pulse AI</div>
              </h1>
              <form className="w-full mt-10" onSubmit={handleLogin}>
                <p className="text-red-500 mb-4 h-6">{error}</p>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <div className="flex items-center border rounded relative">
                    <input
                      className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type={showPassword?"text":"password"}
                      placeholder="********"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {password && <span onClick={handleShowPassword} className="w-7 cursor-pointer absolute right-0 bg-transparent">{showPassword? <FaEyeSlash /> :<FaEye />}</span>}
                  </div>
                </div>
                <div className="mb-6">
                  <button
                    type="submit"
                    className="w-full bg-[#33A9C8] hover:bg-[#1f8696] text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-3 focus:outline-none focus:shadow-outline"
                  >
                   {loading && <CircularProgress size={20} color="" thickness={6} />} Log In
                  </button>
                </div>
                <div className="flex justify-between text-sm">
                  <a href="#" className="hover:underline">
                    Forgot password?
                  </a>
                  <div className="flex items-center">
                    No Account?{" "}
                    <Link to="/signup">
                      <span className="font-semibold text-[#33A9C8] hover:underline flex items-center ml-1">
                        Sign Up
                      </span>
                    </Link>
                  </div>
                </div>
              </form>
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

export default Login;
