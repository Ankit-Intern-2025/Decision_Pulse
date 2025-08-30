import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";  
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import Nav from "../../../components/nav";
// import Nav from "../../../components/detailedNav"
import Footer from "../../../components/footer";
import { useNavigate, useParams } from "react-router-dom";
import { modules_data } from "../../../../utils/modules";
import d1 from "../assets/d1.png"
import { fetchDashboards } from "../../../../http/dashboard_api";

import { useSelector } from "react-redux";
import DashboardList from "../../../components/common/dummyLoading/DashboardList";


const DashboardCard = (prop) => { 
  const {module_id, id, title, version_id} = prop
  const navigate = useNavigate()
  const handleSetDashboard = ()=>{
    sessionStorage.setItem("selectedDashboard", JSON.stringify(prop))
    navigate(`/overview/${module_id}/${id}`)
  }
  return (
    <Card className="w-72 border-0 p-0 border-[#006064] m-4 bg-[#095458] shadow-lg rounded-[24px] cursor-pointer
      transition-transform duration-200 ease-in-out hover:scale-110
    ">
    <div onClick={handleSetDashboard}>
      <Box className="relative bg-[#095458]">
        {/* Add object-cover to ensure the image fills the container and clips properly */}
        <img 
          src={d1}
          alt="dashboards"
          className="w-full h-43 object-cover rounded-t-[24px]" // Adjust height of the image
        />
      </Box>
      {/* Add a background to the text container to make the white text visible */}
      <Typography
        variant="h5"
        sx={{
          paddingLeft: 2,
          color: "white",
          padding: "10px",
          backgroundColor: "#095458",
          textAlign: "center", // Center-align the text
          fontFamily: "poppins, sans-serif", // Set font family to body2's font
          fontSize: "18px", // Set font size to 18
        }}
      >
        {title}
      </Typography>
    </div>
  </Card>
  );
};


const Overview = () => {
  
  const [headerData, setHeaderData] = useState("Default");
  const [loader, setLoader] = useState(true)
  const [message, setMessage] = useState(null)
  const { module_id } = useParams();
  const modulesList = useSelector(state=>state.auth.modules)
  useEffect(() => {
    const heading = modules_data?.[module_id]?.heading;
    if (heading) {
      setHeaderData(heading);
    }
  }, [module_id]);
  
  const [dashboards, setDashboards] = useState([])
  const getDashboards = async ()=>{
    setLoader(true)
    const module_list = JSON.parse(localStorage.getItem("modules_list"))
    const module = module_list.find(module=>module.name===module_id || module.department_name===module_id)
    const response = await fetchDashboards(module?.id||module?.department_id)
    try{
      if(Array.isArray(response) && response.length>0){
          setDashboards(response)
          setMessage(null)
      }else{
        setMessage("No Dashboards Available")
      }
    }catch(err){
      setMessage("No Dashboards Available")
    }finally{
      setLoader(false)
    }
  }

  useEffect(()=>{
    getDashboards()
  },[])
  return (
<div className="max-w-screen-2xl mx-auto" style={{fontFamily: "Poppins, sans-serif"}}>
  <div
    className="flex flex-col min-h-screen"
    style={{ fontFamily: "Poppins, sans-serif" }}
  >
    {/* Top Section with Half-Cut Background */}
    <div
      style={{
        background: "linear-gradient(to bottom, #006064 50%, white 50%)",
        flexGrow: 1, // Ensure this section takes up remaining space
        position: "relative",
        zIndex: 0,
      }}
    >
      {/* Navigation */}
      <Nav prop={headerData} />

      {/* Main Content */}
      <Box className="bg-white min-h-[600px] mx-36 my-8 p-2 rounded-[24px] border-[#095357] border-2 relative z-10">
        <div className="flex flex-col justify-center items-center my-4 mx-14 max-md:my-5 max-md:mx-7">
          <Typography
            variant="h4"
            sx={{
              marginTop: 0,
              color: "#095458",
              fontFamily: "Poppins",
              fontWeight: "bold",
            }}
          >
            Dashboards
          </Typography>
          <br />
          <Typography
            variant="h6"
            sx={{ color: "#095458", fontFamily: "Poppins" }}
          >
            {loader ? "Loading Dashboards, Please wait...":"Select from below options" }
            
          </Typography>
        </div>
        <Box
          className="flex justify-center h-full w-auto mx-12 rounded-[24px]"
          bgcolor={"white"}
          margin={"4px"}
        >

            {loader && 
              <DashboardList />
            }
            {!loader && 
              <>
              {message? <div>{message}</div>:
                <div className="flex flex-wrap justify-center">
                  {dashboards?.map((dashboard, index) => (
                    <DashboardCard
                      key={index}
                      {...dashboard}
                      module_id={module_id}
                    />
                  ))}
                </div>
              }
              </>
            }
        </Box>
      </Box>
    </div>

    {/* Footer */}
    <Footer className="bg-[#016064] text-white" />
  </div>
</div>

);
};

export default Overview