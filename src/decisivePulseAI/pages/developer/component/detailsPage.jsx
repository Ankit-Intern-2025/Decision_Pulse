import { Box, Card, Typography } from "@mui/material"; // Make sure to import the necessary components
// import Nav from "../../../components/detailedNav"
import Footer from "../../../components/footer";
import ApexCharts from "react-apexcharts";
import { ClassNames } from "@emotion/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { modules_data } from "../../../../utils/modules";
import Nav from "../../../components/nav";

export const CustomContainer = ({ children, ClassNamesWidth }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        backgroundColor: "white",
        minHeight: "80vh", // Ensure the container fills the screen
        position: "relative",
        padding: "16px",
      }}
    >
      {/* Background Box (Half Cut Effect) */}
      <Box
        sx={{
          position: "absolute", // Positioned behind the Card
          width: "100%",
          height: "50%", // Half cut
          backgroundColor: "#095458", // Background color
          top: 0,
        }}
      />

      {/* Main Content Card */}
      <Card
        sx={{
          width: `${ClassNamesWidth ? ClassNamesWidth : "80%"}`, // Set width dynamically
          padding: "0px",
          borderRadius: "16px",
          backgroundColor: "#fff",
          position: "relative", // Ensure content is above the background
          zIndex: 1, // Ensure the card is above the background
        }}
      >
        {/* Main Content */}
        <Box
         
        >
          {children}
        </Box>
      </Card>
    </Box>
  );
};
const ChartCard = ({ title }) => {
  const options = {
    chart: {
      id: title,
      type: "line",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
    stroke: {
      curve: "smooth",
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: true,
    },
    tooltip: {
      theme: "dark",
    },
  };

  const series = [
    {
      name: "Data Series",
      data: [30, 40, 35, 50, 49, 60, 70],
    },
  ];

  return (
    <Card
      sx={{
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
        marginBottom: "16px",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: "16px" }}>
        {title}
      </Typography>
      <ApexCharts options={options} series={series} type="line" height={300} />
    </Card>
  );
};

const MyDetails = () => {
  const [headerData, setHeaderData] = useState("Default");
  const { module_id } = useParams();
  useEffect(() => {
    const heading = modules_data?.[module_id]?.heading;
    if (heading) {
      setHeaderData(heading);
    }
  }, [module_id]);

  return (
    <>
      {/* Place Nav outside the CustomContainer */}
      <Nav title={headerData} />

      {/* CustomContainer for main content */}
      <CustomContainer>
        {/* 4 Charts inside a single Card */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)", // 2 columns for 4 charts
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <ChartCard title="Chart 1" />
          <ChartCard title="Chart 2" />
          <ChartCard title="Chart 3" />
          <ChartCard title="Chart 4" />
        </Box>
      </CustomContainer>

      {/* Place Footer outside the CustomContainer */}
      <Footer className="bg-[#016064] text-white" />
    </>
  );
};
export default MyDetails;
