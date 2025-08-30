import Logo from "../resources/home/Group121.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, rehydrate } from "../../store/authSlice"; // Rehydrate action

const Navbar = (prop) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const { isLoggedIn, user } = authState;

  // console.log("Auth State:", authState);

  useEffect(() => {
    // On page load, rehydrate the auth state from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedAccessToken = localStorage.getItem("accessToken");

    if (storedUser && storedAccessToken) {
      dispatch(
        rehydrate({
          user: storedUser,
          accessToken: storedAccessToken,
        })
      );
    } else {
      navigate("/", { replace: true }); // Redirect if not authenticated
    }
  }, [dispatch, navigate]);

  const handleLogout = () => {
    // Dispatch logout action to clear Redux state
    dispatch(logout());
    // Redirect to login page
    navigate("/", { replace: true });
  };


  const isAdmin = prop.prop !== "About Decision Pulse AI"; // Check if the prop is "admin"

  return (
    <>
      <div className="flex items-center justify-between bg-[#006064] py-4 px-6">
        <div className="flex items-center">
          <Link to="/home">
            <img src={Logo} alt="Logo" className="w-20 mr-2" />
          </Link>
        </div>


        <div
          className={`flex justify-center w-full ${isAdmin ? "" : "max-md:hidden"
            }`}
        >
          <div className="w-1/2 flex items-center justify-center text-white text-xl space-x-2">
            <h3>{prop.prop}</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
            >
              {/*<path
                d="M7.29289 13.7071C7.68342 14.0976 8.31658 14.0976 8.70711 13.7071L15.0711 7.34315C15.4616 6.95262 15.4616 6.31946 15.0711 5.92893C14.6805 5.53841 14.0474 5.53841 13.6569 5.92893L8 11.5858L2.34315 5.92893C1.95262 5.53841 1.31946 5.53841 0.928932 5.92893C0.538408 6.31946 0.538407 6.95262 0.928932 7.34315L7.29289 13.7071ZM7 -4.37114e-08L7 13L9 13L9 4.37114e-08L7 -4.37114e-08Z"
                fill="white"
              />*/}
            </svg>
          </div>
        </div>

        {isAdmin ? (
          <>
            <div className="gap-6  flex items-center">
              {
                isLoggedIn && user.userType === "admin" ? (<Link to="/admin">
                  <button className="text-white bg-[#00ACC1] p-3 rounded-[50%]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 21 22"
                      fill="none"
                      className="mx-auto -mb-1.5"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.83333 4.88889C5.83333 3.59227 6.325 2.34877 7.20017 1.43192C8.07534 0.515078 9.26232 0 10.5 0C11.7377 0 12.9247 0.515078 13.7998 1.43192C14.675 2.34877 15.1667 3.59227 15.1667 4.88889C15.1667 6.1855 14.675 7.42901 13.7998 8.34586C12.9247 9.2627 11.7377 9.77778 10.5 9.77778C9.26232 9.77778 8.07534 9.2627 7.20017 8.34586C6.325 7.42901 5.83333 6.1855 5.83333 4.88889ZM5.83333 12.2222C4.28624 12.2222 2.80251 12.8661 1.70854 14.0121C0.614582 15.1582 0 16.7126 0 18.3333C0 19.3058 0.368749 20.2384 1.02513 20.9261C1.6815 21.6137 2.57174 22 3.5 22H17.5C18.4283 22 19.3185 21.6137 19.9749 20.9261C20.6313 20.2384 21 19.3058 21 18.3333C21 16.7126 20.3854 15.1582 19.2915 14.0121C18.1975 12.8661 16.7138 12.2222 15.1667 12.2222H5.83333Z"
                        fill="white"
                      />
                    </svg>
                    <span className="text-[10px] hover:underline">Admin</span>
                  </button>

                </Link>) : ""
              }
              {isLoggedIn && <button
                onClick={handleLogout}
                className="text-white bg-[#00acc1] p-2 self-center rounded-2xl"
              >
                Logout
              </button>}
            </div>
          </>

        ) : (
          <>
            <div className="gap-6  flex items-center">
              <Link to="/home">
                <button className="text-white bg-[#00ACC1] p-3 rounded-[50%]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="21"
                    viewBox="0 0 23 21"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.5954 0.341588C10.8353 0.122869 11.1607 0 11.5 0C11.8393 0 12.1647 0.122869 12.4046 0.341588L20.0818 7.34167L22.6408 9.67503C22.8739 9.89507 23.0029 10.1898 23 10.4957C22.997 10.8016 22.8625 11.0942 22.6252 11.3105C22.388 11.5268 22.0671 11.6495 21.7316 11.6522C21.3961 11.6548 21.0729 11.5372 20.8316 11.3247L20.4567 10.9829V18.6666C20.4567 19.2855 20.1871 19.879 19.7071 20.3166C19.2272 20.7542 18.5763 21 17.8976 21H14.059C13.7197 21 13.3942 20.8771 13.1543 20.6583C12.9143 20.4395 12.7795 20.1427 12.7795 19.8333V16.3333H10.2205V19.8333C10.2205 20.1427 10.0857 20.4395 9.84571 20.6583C9.60575 20.8771 9.2803 21 8.94095 21H5.10238C4.42367 21 3.77277 20.7542 3.29285 20.3166C2.81294 19.879 2.54333 19.2855 2.54333 18.6666V10.9829L2.16843 11.3247C1.9271 11.5372 1.60389 11.6548 1.26841 11.6522C0.932919 11.6495 0.611998 11.5268 0.374764 11.3105C0.13753 11.0942 0.00296366 10.8016 4.83694e-05 10.4957C-0.00286692 10.1898 0.126102 9.89507 0.359178 9.67503L2.91823 7.34167L10.5954 0.341588Z"
                      fill="white"
                    />
                  </svg>
                  {/* <span className="text-[10px] hover:underline">Admin</span> */}
                </button>
              </Link>
              {isLoggedIn && <button
                onClick={handleLogout}
                className="text-white bg-[#00acc1] p-2 self-center rounded-2xl hover:bg-red-600"
              >
                Logout
              </button>}
            </div>
          </>
        )}
      </div>


      <div
        className={`flex justify-center w-full md:hidden bg-[#006064] py-10 ${isAdmin ? "hidden" : ""
          }`}
      >
        <div className="w-1/2 max-sm:w-full flex items-center justify-center text-white text-xl space-x-2">
          <span>{prop.prop}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
          >
            <path
              d="M7.29289 13.7071C7.68342 14.0976 8.31658 14.0976 8.70711 13.7071L15.0711 7.34315C15.4616 6.95262 15.4616 6.31946 15.0711 5.92893C14.6805 5.53841 14.0474 5.53841 13.6569 5.92893L8 11.5858L2.34315 5.92893C1.95262 5.53841 1.31946 5.53841 0.928932 5.92893C0.538408 6.31946 0.538407 6.95262 0.928932 7.34315L7.29289 13.7071ZM7 -4.37114e-08L7 13L9 13L9 4.37114e-08L7 -4.37114e-08Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Navbar;
