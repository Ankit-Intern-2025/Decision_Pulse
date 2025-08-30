import Nav from "../components/nav";
import Card from "../components/card";
import image1 from "../resources/home/Group134.png";
import Footer from "../components/footer";
import image23 from "../resources/home/image23.png";
import image24 from "../resources/home/image24.png";
import image25 from "../resources/home/image25.png";
import image26 from "../resources/home/image26.png";
import image27 from "../resources/home/image27.png";
import image28 from "../resources/home/image28.png";
import image29 from "../resources/home/image29.png";
import image30 from "../resources/home/image30.png";
import image31 from "../resources/home/image31.png";
import image32 from "../resources/home/image32.png";
import { useEffect } from "react";

import { Link } from "react-router-dom";
const Main = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 8];
  //below data in redux
  const dummyData = [
    {
      image: image23,
      heading: "Production/ Manufacturing",
    },
    {
      image: image24,
      heading: "Supply Chain Management",
    },
    {
      image: image25,
      heading: "Research and Development",
    },
    {
      image: image26,
      heading: "Marketing and Brand Management",
    },
    {
      image: image27,
      heading: "Sales",
    },
    {
      image: image28,
      heading: "Human Resources (HR)",
    },
    {
      image: image29,
      heading: "Procurement",
    },
    {
      image: image30,
      heading: "Information Technology (IT)",
    },
    {
      image: image31,
      heading: "Legal and Compliance",
    },
    {
      image: image32,
      heading: "Finance",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top-left corner of the page
  }, []);
  return (
    <>
      <div
        className="flex justify-center "
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <div className="bg-[#006064] max-w-screen-2xl">
          <Nav />
          <div className="flex justify-center items-center my-10 mx-14 max-md:my-5 max-md:mx-7">
            <div className="px-4 py-2 text-2xl text-[#006064] bg-white rounded-sm">
              Select
            </div>
            <div className="text-white text-lg ml-5 max-md:text-sm max-sm:text-xs">
              Customize Your Data View: Select the 10 Key Preferences to Tailor
              Insights to Your Needs and Business Goals.
            </div>
          </div>
          <div className="flex justify-center w-full">
            <div className="flex flex-wrap justify-center">
              {dummyData.map((data) => {
                return <Card heading={data.heading} image={data.image} />;
              })}
            </div>
          </div>
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
