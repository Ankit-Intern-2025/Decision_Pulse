import React from 'react'
 import Card from  "./card";
import image1 from "../../resources/home/Group134.png";
 import Footer from "../../components/footer";
 import Nav from "../../components/nav";
import operations from "../../resources/home/operations.png";
import { modules_data } from '../../../utils/modules'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const Dataa = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    values: [10, 20, 15, 30, 25, 35, 45, 40, 30, 20, 10, 15],
  };


  const modulesList = [
    {
        name: "Automobile Sector",
        module_id: "operations_module",
        heading: "Automotive & Transportation",
        image: "http://localhost:5173/src/decisivePulseAI/resources/home/image23.png",
        timelineData: Dataa,
        reflink:"/auto-mobile"
    },
  
    {
        name: "Banking & Financial Services",
        module_id: "banking_module",
        heading: "Banking & Financial Services",
        image: "http://localhost:5173/src/decisivePulseAI/resources/home/image26.png",
        timelineData: Dataa,
          reflink:"/"
    },
    {
        name: "Healthcare & Pharmaceuticals",
        module_id: "healthcare_module",
        heading: "Healthcare & Pharmaceuticals",
        image: "http://localhost:5173/src/decisivePulseAI/resources/home/image27.png",
        timelineData: Dataa,
         reflink:"/healhcare-industry"
    },
    {
        name: "Technology & Software",
        module_id: "technology_module",
        heading: "Technology & Software",
        image: "http://localhost:5173/src/decisivePulseAI/resources/home/image28.png",
        timelineData: Dataa,
          reflink:"/"
    },
    {
        name: "Construction & Real Estate",
        module_id: "construction_module",
        heading: "Construction & Real Estate",
        image: "http://localhost:5173/src/decisivePulseAI/resources/home/image29.png",
        timelineData: Dataa,
          reflink:"/real-estate"
    },
    {
        name: "Insurance",
        module_id: "insurance_module",
        heading: "Insurance",
        image: "http://localhost:5173/src/decisivePulseAI/resources/home/image30.png",
        timelineData: Dataa,
          reflink:"/"
    },
    {
      name: "Oil and Gas",
      module_id: "sales_module",
      heading: "Oil and Gas",
      image: "http://localhost:5173/src/decisivePulseAI/resources/home/image24.png",
      timelineData: Dataa,
        reflink:"/oilandgas"
  },
  {
      name: "E-commerce & Retail",
      module_id: "ecommerce_module",
      heading: "E-commerce & Retail",
      image: "http://localhost:5173/src/decisivePulseAI/resources/home/image25.png",
      timelineData: Dataa,
        reflink:"/"
  },
    {
        name: "Telecommunications",
        module_id: "telecom_module",
        heading: "Telecommunications",
        image: "http://localhost:5173/src/decisivePulseAI/resources/home/image31.png",
        timelineData: Dataa,
          reflink:"/"
    },
    {
        name: "Food & Beverage",
        module_id: "food_beverage_module",
        heading: "Food & Beverage",
        image: "http://localhost:5173/src/decisivePulseAI/resources/home/image32.png",
        timelineData: Dataa,
          reflink:"/"
    },

    {
      name: "Pharma",
      module_id: "Pharma",
      heading: "Pharma",
      image: "http://localhost:5173/src/decisivePulseAI/resources/home/image32.png",
      timelineData: Dataa,
      reflink:"/pharma"
  },
  {
    name: "FMCG",
    module_id: "Fmcg",
    heading: "FMCG",
    image: "http://localhost:5173/src/decisivePulseAI/resources/home/image32.png",
    timelineData: Dataa,
    reflink:"/fmcg"
},{
  name: "Retail",
  module_id: "Retail",
  heading: "Retail & E-Commerce Industry",
  image: "http://localhost:5173/src/decisivePulseAI/resources/home/image32.png",
  timelineData: Dataa,
  reflink:"/retail-ecommerce"
},
{
  name: "Agriculter",
  module_id: "Agriculter",
  heading: "Agriculter and food processing",
  image: "http://localhost:5173/src/decisivePulseAI/resources/home/image32.png",
  timelineData: Dataa,
  reflink:"/agriculter-and-food-processing"
},
{
  name: "Bfsi",
  module_id: "Bfsi",
  heading: "Bfsi",
  image: "http://localhost:5173/src/decisivePulseAI/resources/home/image32.png",
  timelineData: Dataa,
  reflink:"/bfsi"
}

];


const Research = () => {



  return (

    <div
    className="flex justify-center w-full "
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
            {modulesList.map((data) => {
  // Log the data for each module
  console.log('Module Data:', data);

  return (
    <Card
    key={data.name}
    module_id={/*data.module_id*/`${data.name}`}
    heading={`${data.heading}`}
    image={`${data.image}`}
  
    showTimelineChart={true} // Conditionally show the timeline chart
    showPlusIcon={true} // Conditionally show the plus icon
    timelineData={data.timelineData} 
    reflink={data.reflink}
    
    // Pass data to the timeline chart
                />
  );
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
  )
}

export default Research