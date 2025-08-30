import Logo from "../resources/home/Group121.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Usernav = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (!isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    navigate("/", { replace: true });
  };
  return (
    <>
      <div
        className="flex items-center justify-between bg-[#006064] py-4 px-6"
      >
        <div className="flex items-center">
          <Link to="/user">
            <img src={Logo} alt="Logo" className="w-20 mr-2" />
          </Link>
        </div>

        <div className="flex justify-center w-full max-md:hidden">
          <div className="relative w-1/2">
            {/* <input
              type="text"
              className="w-full p-2 pl-4 pr-10 rounded-sm border border-teal-600 focus:outline-none focus:border-teal-400"
              placeholder="Search your preferences"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-4 top-3"
              width="20"
              height="22"
              viewBox="0 0 20 22"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.49928 1.91687e-08C7.14387 0.000115492 5.80814 0.324364 4.60353 0.945694C3.39893 1.56702 2.36037 2.46742 1.57451 3.57175C0.788656 4.67609 0.278287 5.95235 0.0859852 7.29404C-0.106316 8.63574 0.0250263 10.004 0.469055 11.2846C0.913084 12.5652 1.65692 13.7211 2.63851 14.6557C3.6201 15.5904 4.81098 16.2768 6.11179 16.6576C7.4126 17.0384 8.78562 17.1026 10.1163 16.8449C11.447 16.5872 12.6967 16.015 13.7613 15.176L17.4133 18.828C17.6019 19.0102 17.8545 19.111 18.1167 19.1087C18.3789 19.1064 18.6297 19.0012 18.8151 18.8158C19.0005 18.6304 19.1057 18.3796 19.108 18.1174C19.1102 17.8552 19.0094 17.6026 18.8273 17.414L15.1753 13.762C16.1633 12.5086 16.7784 11.0024 16.9504 9.41573C17.1223 7.82905 16.8441 6.22602 16.1475 4.79009C15.4509 3.35417 14.3642 2.14336 13.0116 1.29623C11.659 0.449106 10.0952 -0.000107143 8.49928 1.91687e-08ZM1.99928 8.5C1.99928 6.77609 2.6841 5.12279 3.90308 3.90381C5.12207 2.68482 6.77537 2 8.49928 2C10.2232 2 11.8765 2.68482 13.0955 3.90381C14.3145 5.12279 14.9993 6.77609 14.9993 8.5C14.9993 10.2239 14.3145 11.8772 13.0955 13.0962C11.8765 14.3152 10.2232 15 8.49928 15C6.77537 15 5.12207 14.3152 3.90308 13.0962C2.6841 11.8772 1.99928 10.2239 1.99928 8.5Z"
                fill="#006064"
              />
            </svg> */}
          </div>
        </div>
        <div className="gap-4">
          {/* <Link to="/admin">
          <button 
          className="text-white bg-[#00ACC1] p-3 rounded-[50%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 21 22"
              fill="none"
              className="mx-auto -mb-1.5"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.83333 4.88889C5.83333 3.59227 6.325 2.34877 7.20017 1.43192C8.07534 0.515078 9.26232 0 10.5 0C11.7377 0 12.9247 0.515078 13.7998 1.43192C14.675 2.34877 15.1667 3.59227 15.1667 4.88889C15.1667 6.1855 14.675 7.42901 13.7998 8.34586C12.9247 9.2627 11.7377 9.77778 10.5 9.77778C9.26232 9.77778 8.07534 9.2627 7.20017 8.34586C6.325 7.42901 5.83333 6.1855 5.83333 4.88889ZM5.83333 12.2222C4.28624 12.2222 2.80251 12.8661 1.70854 14.0121C0.614582 15.1582 0 16.7126 0 18.3333C0 19.3058 0.368749 20.2384 1.02513 20.9261C1.6815 21.6137 2.57174 22 3.5 22H17.5C18.4283 22 19.3185 21.6137 19.9749 20.9261C20.6313 20.2384 21 19.3058 21 18.3333C21 16.7126 20.3854 15.1582 19.2915 14.0121C18.1975 12.8661 16.7138 12.2222 15.1667 12.2222H5.83333Z"
                fill="white"
              />
            </svg>
            <span className="text-[10px] hover:underline">Admin</span>
           
            </button>
          
        </Link> */}

          <button
            onClick={handleLogout}
            className="text-white bg-[#00acc1] p-2 self-center rounded-2xl hover:#19746b"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex justify-center w-full md:hidden my-5">
        <div className="relative w-[90%]">
          <input
            type="text"
            className="w-full p-2 pl-4 pr-10 rounded-sm border border-teal-600 focus:outline-none focus:border-teal-400"
            placeholder="Search your preferences"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-4 top-3"
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.49928 1.91687e-08C7.14387 0.000115492 5.80814 0.324364 4.60353 0.945694C3.39893 1.56702 2.36037 2.46742 1.57451 3.57175C0.788656 4.67609 0.278287 5.95235 0.0859852 7.29404C-0.106316 8.63574 0.0250263 10.004 0.469055 11.2846C0.913084 12.5652 1.65692 13.7211 2.63851 14.6557C3.6201 15.5904 4.81098 16.2768 6.11179 16.6576C7.4126 17.0384 8.78562 17.1026 10.1163 16.8449C11.447 16.5872 12.6967 16.015 13.7613 15.176L17.4133 18.828C17.6019 19.0102 17.8545 19.111 18.1167 19.1087C18.3789 19.1064 18.6297 19.0012 18.8151 18.8158C19.0005 18.6304 19.1057 18.3796 19.108 18.1174C19.1102 17.8552 19.0094 17.6026 18.8273 17.414L15.1753 13.762C16.1633 12.5086 16.7784 11.0024 16.9504 9.41573C17.1223 7.82905 16.8441 6.22602 16.1475 4.79009C15.4509 3.35417 14.3642 2.14336 13.0116 1.29623C11.659 0.449106 10.0952 -0.000107143 8.49928 1.91687e-08ZM1.99928 8.5C1.99928 6.77609 2.6841 5.12279 3.90308 3.90381C5.12207 2.68482 6.77537 2 8.49928 2C10.2232 2 11.8765 2.68482 13.0955 3.90381C14.3145 5.12279 14.9993 6.77609 14.9993 8.5C14.9993 10.2239 14.3145 11.8772 13.0955 13.0962C11.8765 14.3152 10.2232 15 8.49928 15C6.77537 15 5.12207 14.3152 3.90308 13.0962C2.6841 11.8772 1.99928 10.2239 1.99928 8.5Z"
              fill="#006064"
            />
          </svg>
        </div>
      </div>
    </>
  );
};
export default Usernav;
