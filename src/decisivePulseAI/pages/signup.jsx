import Logo from "../resources/login/Logo.png";
import SideImage from "../resources/login/4402947_182992.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import config from '../../utils/config'
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
const Signup = () => {
  const navigate = useNavigate(); // Hook for redirection
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    hashed_password: "",
    confirm_password: "",
    user_type: "normal"
  });


  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on component load
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    setFormData({ ...formData, [name]: value });
  };
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (
      formData?.hashed_password && 
      formData?.confirm_password && 
      formData?.confirm_password.length >= 4 && 
      formData?.hashed_password.length >= 4 &&
      formData?.hashed_password === formData?.confirm_password 
    ) {
      formData.password = formData.confirm_password

      // API request
      try {
        const response = await fetch(`${config.BASE_URL}/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data); // Debug: log the API response
          dispatch(login({
            user_id: data.user_id,
            email: formData.email,
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            user_type: data.user_type,
          }))
          alert("Signup successful!");
          // localStorage.setItem("isLoggedIn", true)
          navigate("/home"); // Redirect to the /user page
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Signup failed.");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      }
    } 
    
  };

  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = ()=>{
    setShowPassword(prev=>{
      if(prev===false){
        setTimeout(() => {
          setShowPassword(false)
        }, 4000);
      }
      return !prev
    })
  }
  return (
    <>
      <div className="flex h-screen">
        {/* Left Section - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="max-w-md w-full max-md:-mt-16">
            <div className="flex flex-col items-center w-full">
              <div className="w-full">
                <img src={Logo} alt="Logo" className="mb-6 w-32 h-24" />
                <h1 className="text-2xl mb-4">
                  <div>Welcome Back to </div>
                  <div>Decision Pulse AI</div>
                </h1>
                <form onSubmit={handleSubmit} className="w-full mt-10">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Name
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="name"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="email"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <h3 className="block text-gray-700 text-sm font-bold mb-2">Select your role:</h3>
                    <label className="text-gray-700 text-sm font-bold mb-2">
                        <input
                          name="user_type"
                            type="radio"
                            value="normal"
                            checked={formData.user_type === "normal"}
                            onChange={handleChange}
                        />
                        Normal User
                    </label>

                    <label className="text-gray-700 text-sm font-bold mb-2">
                        <input
                          name="user_type"
                            type="radio"
                            value="admin"
                            checked={formData.user_type === "admin"}
                            onChange={handleChange}
                        />
                        Admin
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Password
                    </label>
                    <div className="flex items-center border rounded relative">
                      <input
                        name="hashed_password"
                        value={formData.hashed_password}
                        onChange={handleChange}
                        className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type={showPassword?"text":"password"}
                        placeholder="********"
                        required
                      />
                      {formData.hashed_password && <span onClick={handleShowPassword} className="w-7 cursor-pointer absolute right-0 bg-transparent">{showPassword? <FaEyeSlash /> :<FaEye />}</span>}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Confirm Password
                    </label>
                    <input
                      name="confirm_password"
                      value={formData.confirm_password}
                      onChange={handleChange}
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type={showPassword?"text":"password"}
                      placeholder="********"
                      required
                    />

                  </div>
                  {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                  <div className="mb-6">
                    <button
                      type="submit"
                      className="w-full bg-[#33A9C8] hover:bg-[#1f8696] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Signup
                    </button>
                  </div>
                  <div className="flex justify-between text-sm">
                    <a href="#" className="hover:underline">
                      Forgot password?
                    </a>
                    <div className="flex items-center">
                      Already have an account?{" "}
                      <Link to="/">
                        <span className="font-semibold text-[#33A9C8] hover:underline flex items-center ml-1">
                          Login
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
    </>
  );
};

export default Signup;




















// import Logo from "../resources/login/Logo.png";
// import SideImage from "../resources/login/4402947_182992.png";
// import { Link } from "react-router-dom";
// import { useEffect } from "react";
// const Signup = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0); // Scrolls to the top-left corner of the page
//   }, []);
//   return (
//     <>
//       <div className="flex h-screen">
//         {/* Left Section - Form */}
//         <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
//           <div className="max-w-md w-full max-md:-mt-16">
//             <div className="flex flex-col items-center w-full">
//               <div className="w-full">
//                 <img src={Logo} alt="Logo" className="mb-6 w-32 h-24" />
//                 <h1 className="text-2xl mb-4">
//                   <div>Welcome Back to </div>
//                   <div>Decision Pulse AI</div>
//                 </h1>
//                 <form className="w-full mt-10">
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2">
//                       Email
//                     </label>
//                     <input
//                       className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       type="email"
//                       placeholder="your@email.com"
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2">
//                       Password
//                     </label>
//                     <input
//                       className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       type="password"
//                       placeholder="********"
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2">
//                       Confirm Password
//                     </label>
//                     <input
//                       className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       type="password"
//                       placeholder="********"
//                     />
//                   </div>
//                   <div className="mb-6">
//                     {/* <Link to="/"> */}
//                     <button
//                       type="submit"
//                       className="w-full bg-[#33A9C8] hover:bg-[#1f8696] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     >
//                       Signup
//                     </button>
//                     {/* </Link> */}
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <a href="#" className="hover:underline">
//                       Forgot password?
//                     </a>
//                     <div className="flex items-center">
//                       Already have an account?{" "}
//                       <Link to="/">
//                         <span className="font-semibold text-[#33A9C8] hover:underline flex items-center ml-1">
//                           Login
//                         </span>
//                       </Link>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Section - Image */}
//         <div className="hidden lg:block w-1/2 h-full">
//           <img
//             src={SideImage}
//             alt="Side Image"
//             className="h-full w-full object-cover"
//           />
//         </div>
//       </div>
//     </>
//   );
// };
// export default Signup;
