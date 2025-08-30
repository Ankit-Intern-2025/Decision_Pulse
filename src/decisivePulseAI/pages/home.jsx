import Nav from "../components/nav";
import Card from "../components/card";
import image1 from "../resources/home/Group134.png";
import Footer from "../components/footer";

import operations from "../resources/home/operations.png";
import { modules_data } from '../../utils/modules'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UseContext } from "../../context/ContextProvider";
import { CircularProgress } from "@mui/material";
import { BiCommentError } from "react-icons/bi";
import FunctionsLoading from "../components/common/dummyLoading/FunctionsLoading";
const Main = () => {
  const modulesList = useSelector(state=>state.auth.modules)
  const {loadingModules, moduleErrMsg} = UseContext()
  const timelineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    values: [10, 20, 15, 30, 25, 35, 45, 40, 30, 20, 10, 15],
  };

  return (
    <>
      <div
        className="flex justify-center "
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <div className="bg-[#006064] max-w-screen-2xl">
          <Nav />
          {/* Select some info portion */}
          <div className="flex justify-center items-center my-10 mx-14 max-md:my-5 max-md:mx-7">
            <div className="px-4 py-2 text-2xl text-[#006064] bg-white rounded-sm">
              Select
            </div>
            <div className="text-white text-lg ml-5 max-md:text-sm max-sm:text-xs">
              Customize Your Data View: Select the 10 Key Preferences to Tailor
              Insights to Your Needs and Business Goals.
            </div>
          </div>
          {loadingModules && 
            <FunctionsLoading />
          }
          {!loadingModules && 
            // {/* Cards portion */}
            <div className="flex justify-center w-full">
              <div className="flex flex-wrap justify-center min-h-[50vh]">
                {moduleErrMsg?
                <div className="text-white flex flex-col items-center justify-center gap-3">
                  <BiCommentError className="h-20 w-20" />
                  <span>
                    {moduleErrMsg}
                  </span>
                </div>  
                :
                <>
                  {modulesList?.map((data, index) => (
                    <Card
                      key={index}
                      module_id={/*data.module_id*/`${data?.name||data.department_name}`}
                      heading={modules_data[data.name||data.department_name]?.heading}
                      image={modules_data[data.name||data.department_name]?.img}
                      imageClass={
                        modules_data[data.name]?.img === operations // Check if the image matches the imported operations path
                          ? "h-[400px] w-[400px]" // Larger size for the operations image
                          : "h-[200px] w-[200px]" // Default size for other images
                      }
                      showTimelineChart={true} // Conditionally show the timeline chart
                      showPlusIcon={true} // Conditionally show the plus icon
                      timelineData={timelineData} // Pass data to the timeline chart
                    />
                  ))}
                </>
              }
              </div>
            </div>
          }
          {/* cards below part, to navigate about us */}
          <div className="flex justify-center my-10 ">
            <div className="bg-white rounded-3xl flex py-5 justify-around px-14 max-sm:px-7 w-[95%] max-[1150px]:w-[80%] max-sm:w-[90%] items-center flex-row lg:flex-row-reverse max-lg:flex-col">
              {/* div2below */}
              <div className="w-[35%] max-lg:w-full max-xl:w-1/2 h-full">
                <img
                  src={image1}
                  alt=""
                  className="w-full  object-cover rounded-lg"
                />
              </div>
              {/* div1below */}
              <div className="w-[45%] max-lg:w-full max-xl:w-1/2 mt-5">
                <div>
                  <h1 className="text-2xl font-semibold">
                    Let’s make things happen
                  </h1>
                  <div
                    className=" mt-5 xl:text-lg"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Decision Pulse AI delivers fast, precise insights using
                    advanced GEN AI technology. Designed for business leaders,
                    it simplifies data analysis and drives smarter decisions
                    quickly and efficiently.
                  </div>
                  <Link to="/about-decision-pulse-ai">
                    <button className="bg-[#006064] hover:bg-[#0c4749] text-white p-3 rounded-lg mt-5">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};
export default Main;
