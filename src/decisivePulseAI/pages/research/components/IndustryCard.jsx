import React from "react";
import { Link } from "react-router-dom";
import TimelineChart from "../../../pages/developer/component/timelinechart";

const IndustryCard = ({
  heading,
  image,
  showTimelineChart,
  timelineData,
  reflink,
}) => {
  return (
    <>
      <div
        className="w-full max-w-[350px] sm:max-w-[378px] md:max-w-[536px] xl:max-w-[536px] h-[256px] max-md:h-[165px] flex p-4 m-5 border rounded-[44px] bg-white
          transition-transform duration-200 ease-in-out hover:scale-105
        "
        style={{ boxShadow: "0 5px 1px #191A23" }}
      >
        <div className="w-full flex">
          <Link
            to={`${reflink}`}
            className="w-1/2 flex flex-col justify-between h-full md:py-5"
          >
            <div className="inline-block text-white p-1 transition-transform duration-200 ease-in-out hover:scale-110">
              <p className="bg-[#006064] text-xl max-md:text-base rounded-md p-2 ml-2">
                {heading}
              </p>
            </div>

            <div className="flex-grow"></div>

            {/* Conditional rendering for the timeline chart */}
            {showTimelineChart && (
              <div className="mt-0 mb-4">
                <TimelineChart data={timelineData} />
              </div>
            )}
          </Link>

          <div className="mt-4 w-1/2 flex justify-center items-center relative">
            {/* Render the image */}
            <img
              src={image}
              alt=""
              className={`max-md:w-32 ${
                image.includes("operations") ? "w-48" : "w-36"
              }`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default IndustryCard;
