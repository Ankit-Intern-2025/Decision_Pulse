import React, { useState, useMemo } from "react";
import Chart from "react-apexcharts";
import logoSrc from "../../../../components/images/totalsales.png";

// New Data for Production & Revenue Dashboard
const productionCategories = ["Crude Oil", "Natural Gas", "LNG"];
const revenueCategories = ["Upstream", "Midstream", "Downstream"];
const operationalMetrics = ["Production Cost per Barrel", "Refining Efficiency"];
const explorationSites = [
  { name: "Site A", latitude: 30.0, longitude: -90.0 },
  { name: "Site B", latitude: 35.0, longitude: -85.0 },
  { name: "Site C", latitude: 40.0, longitude: -80.0 },
];

// Chart Colors
const chartColors = [
  "#006064", // Dark Teal
  "#087F8C", // Medium Teal
  "#00ACC1", // Light Teal
  "#FFB400", // Yellow
  "#16262E", // Dark Grayish Blue
  "#4A4A4A", // Gray
  "#878787", // Light Gray
  "#EFEFEF", // Very Light Gray
  "#FFFFFF", // White
];

const ProductionRevenueDashboard = () => {
  // State for filtering/selecting categories

  const [selectedProductionCategory, setSelectedProductionCategory] = useState("All");

  // Total Production & Refining Output (Stacked Bar Chart)
  const productionData = useMemo(() => {
    let data = productionCategories.map(() => ({
      name: Math.random() > 0.5 ? "Refining Output" : "Production Output", // Random for variety
      data: productionCategories.map(() => Math.floor(Math.random() * 1000) + 100),
    }));

    if (selectedProductionCategory !== "All") {
      data = data.filter((item) => item.name === selectedProductionCategory);
    }

    return {
      series: data,
      options: {
        chart: { type: "bar", stacked: true },
        colors: chartColors.slice(0, productionCategories.length),
        xaxis: { categories: productionCategories, title: { text: "Production Categories" } },
        yaxis: { title: { text: "Output (Units)" } },
        dataLabels: { enabled: true },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 5,
          },
        },
      },
    };
  }, [selectedProductionCategory]);

  // Revenue Contribution (Donut Chart)
  const revenueData = useMemo(() => {
    return {
      series: revenueCategories.map(() => Math.floor(Math.random() * 100) + 10),
      options: {
        chart: { type: "donut" },
        labels: revenueCategories,
        colors: chartColors.slice(productionCategories.length, productionCategories.length + revenueCategories.length),
        dataLabels: { enabled: true },
        legend: { position: "bottom" },
        plotOptions: {
          pie: {
            donut: {
              size: '60%',
            },
          },
        },
      },
    };
  }, []);

 

    // Define the chart options for horizontal bar chart
    const options = {
      chart: {
        id: 'horizontal-bar-chart',
        toolbar: {
          show: false, // Hides the toolbar
        },
      },
      xaxis: {
        categories: [
          'Efficiency - Initial Phase',
          'Efficiency - Mid-Year Review',
          'Efficiency - Optimization Phase',
          'Cost - Initial Planning',
          'Cost - Peak Performance',
          'Cost - Year-End Analysis',
        ], // Full labels for X-axis categories
      },
      plotOptions: {
        bar: {
          horizontal: true, // This ensures it's a horizontal bar chart
          dataLabels: {
            position: 'top', // Position data labels on top of bars
          },
        },
      },
      yaxis: {
        title: {
          text: 'Efficiency / Cost',
        },
      },
      colors: [
        '#006064', // Color for first bar
        '#087F8C', // Color for second bar
        '#00ACC1', // Color for third bar
        '#FFB400', // Color for fourth bar
        '#16262E', // Color for fifth bar
        '#4A4A4A', // Color for sixth bar
        '#878787', // Color for next bar (if any)
        '#EFEFEF', // Color for next bar (if any)
        '#FFFFFF', // Color for next bar (if any)
      ]
     
    };
  
    // Define the series data for the chart (efficiency and cost)
    const efficiencyMetricsData = {
      series: [
        {
          name: 'Efficiency (%)',
          data: [80, 85, 92, 0, 0, 0], // Efficiency percentage at different phases
        },
        {
          name: 'Cost ($)',
          data: [0, 0, 0, 300, 250, 230], // Cost data in dollars for each phase
        },
      ],
    };



  // Inventory & Storage Levels (Interactive Chart)

  // Inventory & Storage Levels (Interactive Chart)
const inventoryData = useMemo(() => {
  return {
    series: [
      { name: "Supply", data: [Math.floor(Math.random() * 1000) + 500, Math.floor(Math.random() * 1000) + 600, Math.floor(Math.random() * 1000) + 700] }, // Added more data points to Supply
      { name: "Demand", data: [Math.floor(Math.random() * 1000) + 200, Math.floor(Math.random() * 1000) + 250, Math.floor(Math.random() * 1000) + 300] }, // Added more data points to Demand
    ],
    options: {
      chart: { type: "line" },
      colors: [chartColors[2], chartColors[3]],
      xaxis: { categories: ["2023", "2024", "2025"], title: { text: "Year" } }, // Added more categories
      yaxis: { title: { text: "Volume (Units)" } },
      dataLabels: { enabled: true },
 
      stroke: { width: 3 },
    },
  };
}, []);



const explorationData = {
  "2023": [75, 80, 65, 70, 85], // Example data for 2023
  "2024": [80, 85, 75, 80, 90]  // Example data for 2024
};

const categories = ["Space", "Ocean", "Medical Research", "Energy", "Technology"];

const newoptions = {
  chart: {
    type: "radar",
    height: 350
  },
  title: {

    align: "center",
    style: {
      color: "#006064"
    }
  },
  colors: ["#006064", "#087F8C", "#00ACC1", "#FFB400", "#16262E"], // Colors for each category
  xaxis: {
    categories: categories,
    labels: {
      style: {
        colors: "#16262E"
      }
    }
  },
  yaxis: {
    show: true,
    min: 0,
    max: 100,
    labels: {
      style: {
        colors: "#16262E"
      }
    }
  },
  stroke: {
    width: 2
  },
  fill: {
    opacity: 0.3
  },
  legend: {
    position: "bottom",
    horizontalAlign: "center"
  }
};

const series = [
  {
    name: "2023",
    data: explorationData["2023"]
  },
  {
    name: "2024",
    data: explorationData["2024"]
  }
];



  return (
   
    <div className="bg-[#006064] w-[99%] p-8 border-5 rounded-md border-[#FFB400]">
  <h2 className="text-2xl font-semibold mb-4 text-white">Production & Revenue Dashboard</h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Total Production & Refining Output */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Total Production & Refining Output</h3>
          </div>
          <Chart options={productionData.options} series={productionData.series} type="bar" height={350} />
        </div>

        {/* Revenue Contribution */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Revenue Contribution</h3>
          </div>
          <Chart options={revenueData.options} series={revenueData.series} type="donut" height={350} />
        </div>


        {/* Inventory & Storage Levels */}
        <div className="bg-white p-4 rounded-lg shadow-md mt-6">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Inventory & Storage Levels</h3>
          </div>
          <Chart options={inventoryData.options} series={inventoryData.series} type="line" height={350} />
        </div>


        <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <div className="flex justify-between items-center mb-2">
        <img src={logoSrc} alt="Logo" className="w-8 h-8" />
        <h3 className="text-lg font-semibold text-[#087F8C]">Operational Efficiency Metrics</h3>
      </div>
      <Chart
        options={options}
        series={efficiencyMetricsData.series}
        type="bar"
        height={350}
      />
    </div>


  
      </div>
      <div className="flex justify-center items-center mt-6 ">
    <div className="bg-white p-4 rounded-lg shadow-md">
    <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Exploration & New Discoveries</h3>
          </div>
      <Chart options={newoptions} series={series} type="radar" height={350} />
    </div>

</div>
    </div>
  );
};

export default ProductionRevenueDashboard;
