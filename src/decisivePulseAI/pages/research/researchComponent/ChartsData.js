export const supplyChain = [
  {
    id: "manufacturing-lead-time",
    title: "Manufacturing Lead Time (Days)",
    type: "bar",
    height: "300",
    className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
    filters: {
      type: "country",
      options: ["All", "USA", "Germany", "India", "China", "Brazil"],
      default: "All",
    },
    allSeries: {
      All: {
        series: [
          {
            name: "Manufacturing Lead Time",
            data: [15, 18, 12, 14, 20],
          },
        ],
        options: {
          xaxis: { categories: ["USA", "Germany", "India", "China", "Brazil"] },
          colors: ["#00E396"],
        },
      },
      USA: {
        series: [{ name: "Manufacturing Lead Time", data: [15] }],
        options: { xaxis: { categories: ["USA"] }, colors: ["#00E396"] },
      },
      Germany: {
        series: [{ name: "Manufacturing Lead Time", data: [18] }],
        options: { xaxis: { categories: ["Germany"] }, colors: ["#00E396"] },
      },
      India: {
        series: [{ name: "Manufacturing Lead Time", data: [12] }],
        options: { xaxis: { categories: ["India"] }, colors: ["#00E396"] },
      },
      China: {
        series: [{ name: "Manufacturing Lead Time", data: [14] }],
        options: { xaxis: { categories: ["China"] }, colors: ["#00E396"] },
      },
      Brazil: {
        series: [{ name: "Manufacturing Lead Time", data: [20] }],
        options: { xaxis: { categories: ["Brazil"] }, colors: ["#00E396"] },
      },
    },
    options: {
      xaxis: { categories: ["USA", "Germany", "India", "China", "Brazil"] },
      colors: ["#00E396"],
    },
    series: [
      {
        name: "Manufacturing Lead Time",
        data: [15, 18, 12, 14, 20],
      },
    ],
  },
  {
    id: "delivery-time",
    title: "Average Delivery Time (Days) by Country/Region",
    type: "bar",
    height: "300",
    className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
    filters: {
      type: "region",
      options: ["All", "North America", "Europe", "Asia", "South America"],
      default: "All",
    },
    allSeries: {
      All: {
        series: [
          {
            name: "Delivery Time",
            data: [7, 10, 8, 12],
          },
        ],
        options: {
          xaxis: {
            categories: ["North America", "Europe", "Asia", "South America"],
          },
          colors: ["#FF4560"],
        },
      },
      "North America": {
        series: [{ name: "Delivery Time", data: [7] }],
        options: {
          xaxis: { categories: ["North America"] },
          colors: ["#FF4560"],
        },
      },
      Europe: {
        series: [{ name: "Delivery Time", data: [10] }],
        options: { xaxis: { categories: ["Europe"] }, colors: ["#FF4560"] },
      },
      Asia: {
        series: [{ name: "Delivery Time", data: [8] }],
        options: { xaxis: { categories: ["Asia"] }, colors: ["#FF4560"] },
      },
      "South America": {
        series: [{ name: "Delivery Time", data: [15] }],
        options: {
          xaxis: { categories: ["South America"] },
          colors: ["#FF4560"],
        },
      },
    },
    options: {
      xaxis: {
        categories: ["North America", "Europe", "Asia", "South America"],
      },
      colors: ["#FF4560"],
    },
    series: [
      {
        name: "Delivery Time",
        data: [7, 10, 8, 12, 15],
      },
    ],
  },
  {
    "id": "inventory-turnover",
    "title": "Inventory Turnover Ratio",
    "type": "bar",
    "height": "300",
    "className": "bg-white rounded-xl p-4 shadow lg:col-span-3",
    "filters": {
      "type": "region",
      "options": ["All", "North America", "Europe", "Asia", "Africa"],
      "default": "All"
    },
    "allSeries": {
      "All": {
        "series": [
          {
            "name": "Inventory Turnover",
            "data": [5.2, 4.8, 5.5, 4.9]
          }
        ],
        "options": {
          "xaxis": {
            "categories": ["North America", "Europe", "Asia", "Africa"]
          },
          "colors": ["#775DD0"],
          "dataLabels": {
            "enabled": true
          },
          "stroke": {
            "curve": "smooth",
            "width": 3
          },
          "markers": {
            "size": 5
          }
        }
      },
      "North America": {
        "series": [
          {
            "name": "Inventory Turnover",
            "data": [5.2]
          }
        ],
        "options": {
          "xaxis": {
            "categories": ["North America"]
          },
          "colors": ["#775DD0"],
          "stroke": {
            "curve": "smooth",
            "width": 3
          }
        }
      },
      "Europe": {
        "series": [
          {
            "name": "Inventory Turnover",
            "data": [4.8]
          }
        ],
        "options": {
          "xaxis": {
            "categories": ["Europe"]
          },
          "colors": ["#775DD0"],
          "stroke": {
            "curve": "smooth",
            "width": 3
          }
        }
      },
      "Asia": {
        "series": [
          {
            "name": "Inventory Turnover",
            "data": [5.5]
          }
        ],
        "options": {
          "xaxis": {
            "categories": ["Asia"]
          },
          "colors": ["#775DD0"],
          "stroke": {
            "curve": "smooth",
            "width": 3
          }
        }
      },
      "Africa": {
        "series": [
          {
            "name": "Inventory Turnover",
            "data": [4.9]
          }
        ],
        "options": {
          "xaxis": {
            "categories": ["Africa"]
          },
          "colors": ["#775DD0"],
          "stroke": {
            "curve": "smooth",
            "width": 3
          }
        }
      }
    },
    "options": {
      "xaxis": {
        "categories": ["North America", "Europe", "Asia", "Africa"]
      },
      "colors": ["#775DD0"],
      "dataLabels": {
        "enabled": true
      },
      "stroke": {
        "curve": "smooth",
        "width": 3
      },
      "markers": {
        "size": 5
      },
      "tooltip": {
        "y": {
          "formatter": function(val) {
            return val + " turns/year";
          }
        }
      }
    },
    "series": [
      {
        "name": "Inventory Turnover",
        "data": [5.2, 4.8, 5.5, 4.9]
      }
    ]
  },
  
  {
    id: "order-fulfillment",
    title: "Order Fulfillment Rate (%)",
    type: "bar",
    height: "300",
    className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
    filters: {
      type: "country",
      options: ["All", "USA", "Germany", "China", "Brazil"],
      default: "All",
    },
    allSeries: {
      All: {
        series: [
          {
            name: "Fulfillment Rate",
            data: [95, 92, 93, 90],
          },
        ],
        options: {
          xaxis: { categories: ["USA", "Germany", "China", "Brazil"] },
          colors: ["#00E396"],
        },
      },
      USA: {
        series: [{ name: "Fulfillment Rate", data: [95] }],
        options: { xaxis: { categories: ["USA"] }, colors: ["#00E396"] },
      },
      Germany: {
        series: [{ name: "Fulfillment Rate", data: [92] }],
        options: { xaxis: { categories: ["Germany"] }, colors: ["#00E396"] },
      },
      China: {
        series: [{ name: "Fulfillment Rate", data: [93] }],
        options: { xaxis: { categories: ["China"] }, colors: ["#00E396"] },
      },
      Brazil: {
        series: [{ name: "Fulfillment Rate", data: [91] }],
        options: { xaxis: { categories: ["Brazil"] }, colors: ["#00E396"] },
      },
    },
    options: {
      xaxis: { categories: ["USA", "Germany", "China", "Brazil"] },
      colors: ["#00E396"],
      plotOptions:{
        bar:{
            horizontal:true
        }
      }
    },
    series: [
      {
        name: "Fulfillment Rate",
        data: [95, 92, 93, 90, 91],
      },
    ],
  },
  {
    id: "sourcing-reliability",
    title: "Raw Material Sourcing Reliability",
    type: "pie",
    height: "300",
    className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
    filters: {
      type: "supplier",
      options: ["All", "Supplier A", "Supplier B", "Supplier C"],
      default: "All",
    },
    allSeries: {
      All: {
        series: [75, 80, 85],
        options: {
          labels: ["Supplier A", "Supplier B", "Supplier C"],
          colors: ["#FF4560", "#008FFB", "#00E396"],
        },
      },
      "Supplier A": {
        series: [75],
        options: { labels: ["Supplier A"], colors: ["#FF4560"] },
      },
      "Supplier B": {
        series: [80],
        options: { labels: ["Supplier B"], colors: ["#008FFB"] },
      },
      "Supplier C": {
        series: [85],
        options: { labels: ["Supplier C"], colors: ["#00E396"] },
      },
    },
    options: {
      labels: ["Supplier A", "Supplier B", "Supplier C"],
      colors: ["#FF4560", "#008FFB", "#00E396"],
    },
    series: [75, 80, 85],
  },
  {
    id: "cost-per-vehicle",
    title: "Cost per Vehicle Delivered (USD)",
    type: "bar",
    height: "300",
    className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
    filters: {
      type: "country",
      options: ["All", "USA", "Germany", "China", "Brazil"],
      default: "All",
    },
    allSeries: {
      All: {
        series: [
          {
            name: "Cost per Vehicle",
            data: [45000, 47000, 42000, 39000],
          },
        ],
        options: {
          xaxis: { categories: ["USA", "Germany", "China", "Brazil"] },
          colors: ["#FF4560"],
        },
      },
      USA: {
        series: [{ name: "Cost per Vehicle", data: [45000] }],
        options: { xaxis: { categories: ["USA"] }, colors: ["#FF4560"] },
      },
      Germany: {
        series: [{ name: "Cost per Vehicle", data: [47000] }],
        options: { xaxis: { categories: ["Germany"] }, colors: ["#FF4560"] },
      },
      China: {
        series: [{ name: "Cost per Vehicle", data: [42000] }],
        options: { xaxis: { categories: ["China"] }, colors: ["#FF4560"] },
      },
      Brazil: {
        series: [{ name: "Cost per Vehicle", data: [46000] }],
        options: { xaxis: { categories: ["Brazil"] }, colors: ["#FF4560"] },
      },
    },
    options: {
      xaxis: { categories: ["USA", "Germany", "China", "Brazil"] },
      colors: ["#FF4560"],
    },
    series: [
      {
        name: "Cost per Vehicle",
        data: [45000, 47000, 42000, 39000, 46000],
      },
    ],
  },
];

export const competitiveIntelligence = [
  {
    id: "units-sold",
    title: "Total Units Sold",
    type: "bar",
    height: "300",
    className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
    filters: {
      type: "location",
      options: [
        "All",
        "USA",
        "Germany",
        "India",
        "Japan",
        "UK",
        "North America",
        "Europe",
        "Asia",
      ],
      default: "All",
    },
    allSeries: {
      All: {
        series: [
          {
            name: "Units Sold",
            data: [50000, 42000, 38000, 45000, 39000],
          },
        ],
        options: {
          xaxis: { categories: ["USA", "Germany", "India", "Japan", "UK"] },
          colors: ["#008FFB"],
        },
      },
      USA: {
        series: [{ name: "Units Sold", data: [50000] }],
        options: { xaxis: { categories: ["USA"] }, colors: ["#008FFB"] },
      },
      Germany: {
        series: [{ name: "Units Sold", data: [42000] }],
        options: { xaxis: { categories: ["Germany"] }, colors: ["#008FFB"] },
      },
      India: {
        series: [{ name: "Units Sold", data: [38000] }],
        options: { xaxis: { categories: ["India"] }, colors: ["#008FFB"] },
      },
      Japan: {
        series: [{ name: "Units Sold", data: [45000] }],
        options: { xaxis: { categories: ["Japan"] }, colors: ["#008FFB"] },
      },
      UK: {
        series: [{ name: "Units Sold", data: [39000] }],
        options: { xaxis: { categories: ["UK"] }, colors: ["#008FFB"] },
      },
      "North America": {
        series: [{ name: "Units Sold", data: [50000] }],
        options: { xaxis: { categories: ["USA"] }, colors: ["#008FFB"] },
      },
      Europe: {
        series: [{ name: "Units Sold", data: [42000, 39000] }],
        options: {
          xaxis: { categories: ["Germany", "UK"] },
          colors: ["#008FFB"],
        },
      },
      Asia: {
        series: [{ name: "Units Sold", data: [38000, 45000] }],
        options: {
          xaxis: { categories: ["India", "Japan"] },
          colors: ["#008FFB"],
        },
      },
    },
    // Default to 'All' version on initial load
    options: {
      xaxis: { categories: ["USA", "Germany", "India", "Japan", "UK"] },
      colors: ["#008FFB"],
    },
    series: [
      {
        name: "Units Sold",
        data: [50000, 42000, 38000, 45000, 39000],
      },
    ],
  },

  {
    id: "yoy-sales",
    title: "YoY Sales Growth %",
    type: "line",
    height: "300",
    className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
    filters: {
      type: "year",
      options: ["All", "2021", "2022", "2023", "2024"],
      default: "All",
    },
    allSeries: {
      All: [
        { name: "2021", data: [2, 3, 4, 5] },
        { name: "2022", data: [3, 4, 5, 6] },
        { name: "2023", data: [4, 5, 6, 7] },
        { name: "2024", data: [5, 7, 6, 8] },
      ],
      2021: [{ name: "2021", data: [2, 3, 4, 5] }],
      2022: [{ name: "2022", data: [3, 4, 5, 6] }],
      2023: [{ name: "2023", data: [4, 5, 6, 7] }],
      2024: [{ name: "2024", data: [5, 7, 6, 8] }],
    },
    options: {
      chart: { id: "yoy-growth" },
      xaxis: { categories: ["Q1", "Q2", "Q3", "Q4"] },
      colors: ["#00E396", "#FF4560"],
    },
  },
  {
    id: "market-share",
    title: "Market Share by Region",
    type: "pie",
    height: "300",
    className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
    options: {
      labels: ["BMW", "Mercedes", "Audi", "Tesla", "Others"],
      colors: ["#775DD0", "#00ACC1", "#FEB019", "#FF4560", "#4A4A4A"],
      legend: { position: "bottom" },
    },
    series: [28, 25, 20, 15, 12],
  },
  {
    id: "asp",
    title: "Average Selling Price (ASP)",
    type: "bar",
    height: "300",
    className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
    options: {
      xaxis: { categories: ["BMW", "Mercedes", "Audi", "Tesla"] },
      colors: ["#FFB400"],
    },
    series: [
      {
        name: "ASP ($k)",
        data: [55, 58, 53, 60],
      },
    ],
  },
  {
    id: "customer-sales",
    title: "New vs Returning Customer Sales",
    type: "donut",
    height: "300",
    className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
    options: {
      labels: ["New Customers", "Returning Customers"],
      colors: ["#008FFB", "#FF4560"],
      legend: { position: "bottom" },
    },
    series: [65, 35],
  },
  {
    id: "channel-sales",
    title: "Channel-wise Sales",
    type: "bar",
    height: "300",
    className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
    filters: {
      type: "category",
      options: ["All", "Online", "Dealerships", "Fleets"],
      default: "All",
    },
    allSeries: {
      All: [
        { name: "Online", data: [12000, 10000, 9000, 9500, 8700] },
        { name: "Dealerships", data: [30000, 25000, 22000, 26000, 23000] },
        { name: "Fleets", data: [8000, 7000, 7000, 9500, 7300] },
      ],
      Online: [{ name: "Online", data: [12000, 10000, 9000, 9500, 8700] }],
      Dealerships: [
        { name: "Dealerships", data: [30000, 25000, 22000, 26000, 23000] },
      ],
      Fleets: [{ name: "Fleets", data: [8000, 7000, 7000, 9500, 7300] }],
    },
    options: {
      chart: { stacked: true },
      xaxis: { categories: ["USA", "Germany", "India", "Japan", "UK"] },
      colors: ["#00E396", "#775DD0", "#FF4560"],
      legend: { position: "bottom" },
    },
  },
  {
    id: "competitor-region",
    title: "Competitor Comparison by Region",
    type: "radar",
    height: "300",
    className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
    options: {
      xaxis: {
        categories: [
          "North America",
          "Europe",
          "Asia",
          "Middle East",
          "Australia",
        ],
      },
      colors: ["#775DD0", "#00E396", "#FF4560"],
    },
    series: [
      { name: "BMW", data: [80, 85, 70, 65, 75] },
      { name: "Mercedes", data: [78, 80, 68, 60, 72] },
      { name: "Others", data: [60, 65, 62, 58, 64] },
    ],
  },
];

export const financialProfitabilityOverview = [
    {
      id: "revenue-geography",
      title: "Revenue by Geography ($M)",
      type: "bar",
      height: "300",
      className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
      filters: {
        type: "region",
        options: ["All", "North America", "Europe", "Asia", "Middle East"],
        default: "All",
      },
      allSeries: {
        All: [
          {
            name: "Revenue",
            data: [980, 870, 760, 420],
          },
        ],
        "North America": [
          {
            name: "Revenue",
            data: [980],
          },
        ],
        Europe: [
          {
            name: "Revenue",
            data: [870],
          },
        ],
        Asia: [
          {
            name: "Revenue",
            data: [760],
          },
        ],
        "Middle East": [
          {
            name: "Revenue",
            data: [420],
          },
        ],
      },
      options: {
        xaxis: {
          categories: ["North America", "Europe", "Asia", "Middle East"],
        },
        colors: ["#008FFB"],
      },
      series: [
        {
          name: "Revenue",
          data: [980, 870, 760, 420],
        },
      ],
    },
  
    {
      id: "gross-margin",
      title: "Gross Margin %",
      type: "line",
      height: "300",
      className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
      filters: {
        type: "year",
        options: ["All", "2021", "2022", "2023", "2024"],
        default: "All",
      },
      allSeries: {
        All: [
          { name: "2021", data: [27, 30, 28, 26] },
          { name: "2022", data: [29, 32, 31, 28] },
          { name: "2023", data: [31, 34, 33, 29] },
          { name: "2024", data: [33, 36, 35, 30] },
        ],
        2021: [{ name: "2021", data: [27, 30, 28, 26] }],
        2022: [{ name: "2022", data: [29, 32, 31, 28] }],
        2023: [{ name: "2023", data: [31, 34, 33, 29] }],
        2024: [{ name: "2024", data: [33, 36, 35, 30] }],
      },
      options: {
        xaxis: { categories: ["Q1", "Q2", "Q3", "Q4"] },
        colors: ["#00E396"],
      },
    },
  
    {
      id: "net-profit-margin",
      title: "Net Profit Margin %",
      type: "bar",
      height: "300",
      className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
      options: {
        xaxis: {
          categories: ["North America", "Europe", "Asia", "Middle East"],
        },
        colors: ["#FEB019"],
      },
      series: [
        {
          name: "Net Profit Margin",
          data: [12.5, 10.8, 9.4, 7.2],
        },
      ],
    },
  
    {
      id: "cogs-breakdown",
      title: "Cost of Goods Sold (COGS) Breakdown",
      type: "pie",
      height: "300",
      className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
      options: {
        labels: ["Raw Materials", "Labor", "Logistics", "Overhead"],
        colors: ["#775DD0", "#00ACC1", "#FF4560", "#4A4A4A"],
        legend: { position: "bottom" },
      },
      series: [45, 25, 20, 10],
    },
  
    {
      id: "contribution-margin-model",
      title: "Contribution Margin by Model",
      type: "bar",
      height: "300",
      className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
      options: {
        xaxis: { categories: ["Sedan", "SUV", "Hatchback", "EV", "Truck"] },
        colors: ["#FF4560"],
      },
      series: [
        {
          name: "Contribution Margin %",
          data: [18, 21, 15, 25, 20],
        },
      ],
    },
  
    {
      id: "roa-roe",
      title: "Return on Assets (ROA) & Equity (ROE)",
      type: "radar",
      height: "300",
      className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
      options: {
        xaxis: {
          categories: ["North America", "Europe", "Asia", "Middle East"],
        },
        colors: ["#00E396", "#775DD0"],
      },
      series: [
        {
          name: "ROA (%)",
          data: [8.5, 7.2, 6.5, 5.0],
        },
        {
          name: "ROE (%)",
          data: [15.4, 13.1, 12.0, 9.5],
        },
      ],
    },
  ];
  

