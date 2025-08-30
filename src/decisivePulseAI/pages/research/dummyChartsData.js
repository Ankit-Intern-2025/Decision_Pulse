export const staticData = {
  "auto-mobile": {
    "Global & Regional Sales Performance": [
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
            options: {
              xaxis: { categories: ["Germany"] },
              colors: ["#008FFB"],
            },
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
    ],
    "Supply Chain Efficiency": [
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
              xaxis: {
                categories: ["USA", "Germany", "India", "China", "Brazil"],
              },
              colors: ["#00E396"],
            },
          },
          USA: {
            series: [{ name: "Manufacturing Lead Time", data: [15] }],
            options: { xaxis: { categories: ["USA"] }, colors: ["#00E396"] },
          },
          Germany: {
            series: [{ name: "Manufacturing Lead Time", data: [18] }],
            options: {
              xaxis: { categories: ["Germany"] },
              colors: ["#00E396"],
            },
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
                categories: [
                  "North America",
                  "Europe",
                  "Asia",
                  "South America",
                ],
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
        id: "inventory-turnover",
        title: "Inventory Turnover Ratio",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
        filters: {
          type: "region",
          options: ["All", "North America", "Europe", "Asia", "Africa"],
          default: "All",
        },
        allSeries: {
          All: {
            series: [
              {
                name: "Inventory Turnover",
                data: [5.2, 4.8, 5.5, 4.9],
              },
            ],
            options: {
              xaxis: {
                categories: ["North America", "Europe", "Asia", "Africa"],
              },
              colors: ["#775DD0"],
              dataLabels: {
                enabled: true,
              },
              stroke: {
                curve: "smooth",
                width: 3,
              },
              markers: {
                size: 5,
              },
            },
          },
          "North America": {
            series: [
              {
                name: "Inventory Turnover",
                data: [5.2],
              },
            ],
            options: {
              xaxis: {
                categories: ["North America"],
              },
              colors: ["#775DD0"],
              stroke: {
                curve: "smooth",
                width: 3,
              },
            },
          },
          Europe: {
            series: [
              {
                name: "Inventory Turnover",
                data: [4.8],
              },
            ],
            options: {
              xaxis: {
                categories: ["Europe"],
              },
              colors: ["#775DD0"],
              stroke: {
                curve: "smooth",
                width: 3,
              },
            },
          },
          Asia: {
            series: [
              {
                name: "Inventory Turnover",
                data: [5.5],
              },
            ],
            options: {
              xaxis: {
                categories: ["Asia"],
              },
              colors: ["#775DD0"],
              stroke: {
                curve: "smooth",
                width: 3,
              },
            },
          },
          Africa: {
            series: [
              {
                name: "Inventory Turnover",
                data: [4.9],
              },
            ],
            options: {
              xaxis: {
                categories: ["Africa"],
              },
              colors: ["#775DD0"],
              stroke: {
                curve: "smooth",
                width: 3,
              },
            },
          },
        },
        options: {
          xaxis: {
            categories: ["North America", "Europe", "Asia", "Africa"],
          },
          colors: ["#775DD0"],
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: "smooth",
            width: 3,
          },
          markers: {
            size: 5,
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + " turns/year";
              },
            },
          },
        },
        series: [
          {
            name: "Inventory Turnover",
            data: [5.2, 4.8, 5.5, 4.9],
          },
        ],
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
            options: {
              xaxis: { categories: ["Germany"] },
              colors: ["#00E396"],
            },
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
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
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
            options: {
              xaxis: { categories: ["Germany"] },
              colors: ["#FF4560"],
            },
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
    ],
    "Financial & Profitability Overview": [
      {
        id: "revenue-geography",
        title: "Revenue by Geography ($M)",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
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
        className: "bg-white rounded-xl p-4 shadow lg:col-span-4",
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
        className: "bg-white rounded-xl p-4 shadow lg:col-span-4",
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
        className: "bg-white rounded-xl p-4 shadow lg:col-span-4",
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
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
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
    ],
    "Customer & Market Insights": [
      {
        id: "nps-score",
        title: "Net Promoter Score (NPS)",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
        filters: {
          type: "location",
          options: ["All", "USA", "Germany", "India", "Japan", "UK"],
          default: "All",
        },
        allSeries: {
          All: {
            series: [
              {
                name: "NPS Score",
                data: [72, 68, 75, 64, 70],
              },
            ],
            options: {
              xaxis: {
                categories: ["USA", "Germany", "India", "Japan", "UK"],
              },
              colors: ["#00E396"],
            },
          },
          USA: {
            series: [{ name: "NPS Score", data: [72] }],
            options: { xaxis: { categories: ["USA"] }, colors: ["#00E396"] },
          },
          Germany: {
            series: [{ name: "NPS Score", data: [68] }],
            options: {
              xaxis: { categories: ["Germany"] },
              colors: ["#00E396"],
            },
          },
          India: {
            series: [{ name: "NPS Score", data: [75] }],
            options: { xaxis: { categories: ["India"] }, colors: ["#00E396"] },
          },
          Japan: {
            series: [{ name: "NPS Score", data: [64] }],
            options: { xaxis: { categories: ["Japan"] }, colors: ["#00E396"] },
          },
          UK: {
            series: [{ name: "NPS Score", data: [70] }],
            options: { xaxis: { categories: ["UK"] }, colors: ["#00E396"] },
          },
        },
        options: {
          xaxis: { categories: ["USA", "Germany", "India", "Japan", "UK"] },
          colors: ["#00E396"],
        },
        series: [
          {
            name: "NPS Score",
            data: [72, 68, 75, 64, 70],
          },
        ],
      },
      {
        id: "customer-retention",
        title: "Customer Retention Rate (%)",
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
            { name: "USA", data: [85, 86, 87, 89] },
            { name: "Germany", data: [80, 81, 83, 84] },
            { name: "India", data: [78, 80, 82, 85] },
            { name: "Japan", data: [76, 78, 80, 82] },
            { name: "UK", data: [82, 83, 85, 86] },
          ],
          2021: [
            { name: "USA", data: [85] },
            { name: "Germany", data: [80] },
            { name: "India", data: [78] },
            { name: "Japan", data: [76] },
            { name: "UK", data: [82] },
          ],
          2022: [
            { name: "USA", data: [86] },
            { name: "Germany", data: [81] },
            { name: "India", data: [80] },
            { name: "Japan", data: [78] },
            { name: "UK", data: [83] },
          ],
          2023: [
            { name: "USA", data: [87] },
            { name: "Germany", data: [83] },
            { name: "India", data: [82] },
            { name: "Japan", data: [80] },
            { name: "UK", data: [85] },
          ],
          2024: [
            { name: "USA", data: [89] },
            { name: "Germany", data: [84] },
            { name: "India", data: [85] },
            { name: "Japan", data: [82] },
            { name: "UK", data: [86] },
          ],
        },
        options: {
          chart: { id: "retention" },
          xaxis: { categories: ["2021", "2022", "2023", "2024"] },
          colors: ["#775DD0", "#00ACC1", "#FEB019", "#FF4560", "#4A4A4A"],
        },
      },
      {
        id: "brand-awareness",
        title: "Brand Awareness Index",
        type: "radar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        options: {
          xaxis: {
            categories: [
              "North America",
              "Europe",
              "Asia",
              "South America",
              "Africa",
            ],
          },
          colors: ["#FEB019", "#00E396", "#775DD0"],
        },
        series: [
          { name: "BMW", data: [88, 80, 72, 68, 50] },
          { name: "Mercedes", data: [85, 83, 70, 60, 45] },
          { name: "Tesla", data: [90, 78, 75, 65, 40] },
        ],
      },
      {
        id: "social-sentiment",
        title: "Social Media Sentiment (Country-wise)",
        type: "donut",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        options: {
          labels: ["Positive", "Neutral", "Negative"],
          colors: ["#00E396", "#FEB019", "#FF4560"],
          legend: { position: "bottom" },
        },
        series: [60, 25, 15],
      },
      {
        id: "complaint-resolution",
        title: "Complaint Resolution Rate (%)",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        options: {
          xaxis: {
            categories: ["USA", "Germany", "India", "Japan", "UK"],
          },
          colors: ["#FF4560"],
        },
        series: [
          {
            name: "Resolution Rate",
            data: [92, 89, 85, 88, 90],
          },
        ],
      },
      {
        id: "customer-ltv",
        title: "Avg. Customer Lifetime Value ($)",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-6",
        filters: {
          type: "segment",
          options: ["All", "Premium", "Mid-tier", "Budget"],
          default: "All",
        },
        allSeries: {
          All: [
            { name: "USA", data: [32000, 24000, 18000] },
            { name: "Germany", data: [30000, 22000, 17000] },
            { name: "India", data: [28000, 20000, 15000] },
          ],
          Premium: [{ name: "Premium", data: [32000, 30000, 28000] }],
          "Mid-tier": [{ name: "Mid-tier", data: [24000, 22000, 20000] }],
          Budget: [{ name: "Budget", data: [18000, 17000, 15000] }],
        },
        options: {
          xaxis: {
            categories: ["USA", "Germany", "India"],
          },
          colors: ["#546E7A", "#26A69A", "#FF7043"],
        },
      },
    ],
    "After-Sales & Service Operations": [
      {
        id: "avg-service-time",
        title: "Average Service Time (Hours)",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        filters: {
          type: "region",
          options: ["All", "North America", "Europe", "Asia", "Australia"],
          default: "All",
        },
        allSeries: {
          All: {
            series: [
              {
                name: "Service Time",
                data: [2.5, 2.8, 3.0, 2.2],
              },
            ],
            options: {
              xaxis: {
                categories: ["North America", "Europe", "Asia", "Australia"],
              },
              colors: ["#008FFB"],
            },
          },
          "North America": {
            series: [
              {
                name: "Service Time",
                data: [2.5],
              },
            ],
            options: {
              xaxis: {
                categories: ["North America"],
              },
              colors: ["#008FFB"],
            },
          },
          Europe: {
            series: [
              {
                name: "Service Time",
                data: [2.8],
              },
            ],
            options: {
              xaxis: {
                categories: ["Europe"],
              },
              colors: ["#008FFB"],
            },
          },
          Asia: {
            series: [
              {
                name: "Service Time",
                data: [3.0],
              },
            ],
            options: {
              xaxis: {
                categories: ["Asia"],
              },
              colors: ["#008FFB"],
            },
          },
          Australia: {
            series: [
              {
                name: "Service Time",
                data: [2.2],
              },
            ],
            options: {
              xaxis: {
                categories: ["Australia"],
              },
              colors: ["#008FFB"],
            },
          },
        },
        options: {
          xaxis: {
            categories: ["North America", "Europe", "Asia", "Australia"],
          },
          colors: ["#008FFB"],
        },
        series: [
          {
            name: "Service Time",
            data: [2.5, 2.8, 3.0, 2.2],
          },
        ],
      },
      {
        id: "first-time-fix-rate",
        title: "First Time Fix Rate (%)",
        type: "line",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-4",
        filters: {
          type: "year",
          options: ["All", "2021", "2022", "2023", "2024"],
          default: "All",
        },
        allSeries: {
          All: [
            {
              name: "North America",
              data: [85, 86, 87, 88],
            },
            {
              name: "Europe",
              data: [80, 82, 83, 85],
            },
            {
              name: "Asia",
              data: [78, 80, 82, 84],
            },
            {
              name: "Australia",
              data: [88, 89, 90, 91],
            },
          ],
          2021: [
            {
              name: "First Time Fix Rate",
              data: [85, 80, 78, 88],
            },
          ],
          2022: [
            {
              name: "First Time Fix Rate",
              data: [86, 82, 80, 89],
            },
          ],
          2023: [
            {
              name: "First Time Fix Rate",
              data: [87, 83, 82, 90],
            },
          ],
          2024: [
            {
              name: "First Time Fix Rate",
              data: [88, 85, 84, 91],
            },
          ],
        },
        options: {
          chart: {
            id: "first-time-fix-rate",
          },
          xaxis: {
            categories: ["2021", "2022", "2023", "2024"],
          },
          colors: ["#00E396", "#FF4560", "#775DD0", "#FEB019"],
        },
      },
      {
        id: "service-revenue-per-vehicle",
        title: "Service Revenue per Vehicle ($)",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-4",
        filters: {
          type: "region",
          options: ["All", "North America", "Europe", "Asia", "Australia"],
          default: "All",
        },
        allSeries: {
          All: {
            series: [
              {
                name: "Revenue",
                data: [500, 450, 400, 550],
              },
            ],
            options: {
              xaxis: {
                categories: ["North America", "Europe", "Asia", "Australia"],
              },
              colors: ["#FFB400"],
            },
          },
          "North America": {
            series: [
              {
                name: "Revenue",
                data: [500],
              },
            ],
            options: {
              xaxis: {
                categories: ["North America"],
              },
              colors: ["#FFB400"],
            },
          },
          Europe: {
            series: [
              {
                name: "Revenue",
                data: [450],
              },
            ],
            options: {
              xaxis: {
                categories: ["Europe"],
              },
              colors: ["#FFB400"],
            },
          },
          Asia: {
            series: [
              {
                name: "Revenue",
                data: [400],
              },
            ],
            options: {
              xaxis: {
                categories: ["Asia"],
              },
              colors: ["#FFB400"],
            },
          },
          Australia: {
            series: [
              {
                name: "Revenue",
                data: [550],
              },
            ],
            options: {
              xaxis: {
                categories: ["Australia"],
              },
              colors: ["#FFB400"],
            },
          },
        },
        options: {
          xaxis: {
            categories: ["North America", "Europe", "Asia", "Australia"],
          },
          colors: ["#FFB400"],
        },
        series: [
          {
            name: "Revenue",
            data: [500, 450, 400, 550],
          },
        ],
      },
      {
        id: "warranty-claims-ratio",
        title: "Warranty Claims Ratio by Region",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        filters: {
          type: "region",
          options: [
            "All",
            "North America",
            "Europe",
            "Asia",
            "South America",
            "Africa",
          ],
          default: "All",
        },
        allSeries: {
          All: {
            series: [
              {
                name: "Warranty Claims per 1,000 Vehicles",
                data: [12, 9, 15, 14, 18],
              },
            ],
            options: {
              xaxis: {
                categories: [
                  "North America",
                  "Europe",
                  "Asia",
                  "South America",
                  "Africa",
                ],
              },
              colors: ["#FF4560"],
            },
          },
          "North America": {
            series: [
              {
                name: "Warranty Claims per 1,000 Vehicles",
                data: [12],
              },
            ],
            options: {
              xaxis: {
                categories: ["North America"],
              },
              colors: ["#FF4560"],
            },
          },
          Europe: {
            series: [
              {
                name: "Warranty Claims per 1,000 Vehicles",
                data: [9],
              },
            ],
            options: {
              xaxis: {
                categories: ["Europe"],
              },
              colors: ["#FF4560"],
            },
          },
          Asia: {
            series: [
              {
                name: "Warranty Claims per 1,000 Vehicles",
                data: [15],
              },
            ],
            options: {
              xaxis: {
                categories: ["Asia"],
              },
              colors: ["#FF4560"],
            },
          },
          "South America": {
            series: [
              {
                name: "Warranty Claims per 1,000 Vehicles",
                data: [14],
              },
            ],
            options: {
              xaxis: {
                categories: ["South America"],
              },
              colors: ["#FF4560"],
            },
          },
          Africa: {
            series: [
              {
                name: "Warranty Claims per 1,000 Vehicles",
                data: [18],
              },
            ],
            options: {
              xaxis: {
                categories: ["Africa"],
              },
              colors: ["#FF4560"],
            },
          },
        },
        options: {
          xaxis: {
            categories: [
              "North America",
              "Europe",
              "Asia",
              "South America",
              "Africa",
            ],
          },
          colors: ["#FF4560"],
        },
        series: [
          {
            name: "Warranty Claims per 1,000 Vehicles",
            data: [12, 9, 15, 14, 18],
          },
        ],
      },
      {
        id: "parts-availability-index",
        title: "Parts Availability Index by Region",
        type: "line",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        filters: {
          type: "region",
          options: [
            "All",
            "North America",
            "Europe",
            "Asia",
            "South America",
            "Africa",
          ],
          default: "All",
        },
        allSeries: {
          All: [
            {
              name: "Parts Availability Index",
              data: [95, 92, 88, 85, 80],
            },
          ],
          "North America": [
            {
              name: "Parts Availability Index",
              data: [95],
            },
          ],
          Europe: [
            {
              name: "Parts Availability Index",
              data: [92],
            },
          ],
          Asia: [
            {
              name: "Parts Availability Index",
              data: [88],
            },
          ],
          "South America": [
            {
              name: "Parts Availability Index",
              data: [85],
            },
          ],
          Africa: [
            {
              name: "Parts Availability Index",
              data: [80],
            },
          ],
        },
        options: {
          xaxis: {
            categories: [
              "North America",
              "Europe",
              "Asia",
              "South America",
              "Africa",
            ],
          },
          colors: ["#00E396"],
        },
        series: [
          {
            name: "Parts Availability Index",
            data: [95, 92, 88, 85, 80],
          },
        ],
      },
      {
        id: "csat-post-service",
        title: "Customer Satisfaction Post-Service (CSAT) by Region",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-4",
        filters: {
          type: "region",
          options: [
            "All",
            "North America",
            "Europe",
            "Asia",
            "South America",
            "Africa",
          ],
          default: "All",
        },
        allSeries: {
          All: {
            series: [
              {
                name: "CSAT Score (%)",
                data: [85, 88, 82, 80, 78],
              },
            ],
            options: {
              xaxis: {
                categories: [
                  "North America",
                  "Europe",
                  "Asia",
                  "South America",
                  "Africa",
                ],
              },
              colors: ["#775DD0"],
            },
          },
          "North America": {
            series: [
              {
                name: "CSAT Score (%)",
                data: [85],
              },
            ],
            options: {
              xaxis: {
                categories: ["North America"],
              },
              colors: ["#775DD0"],
            },
          },
          Europe: {
            series: [
              {
                name: "CSAT Score (%)",
                data: [88],
              },
            ],
            options: {
              xaxis: {
                categories: ["Europe"],
              },
              colors: ["#775DD0"],
            },
          },
          Asia: {
            series: [
              {
                name: "CSAT Score (%)",
                data: [82],
              },
            ],
            options: {
              xaxis: {
                categories: ["Asia"],
              },
              colors: ["#775DD0"],
            },
          },
          "South America": {
            series: [
              {
                name: "CSAT Score (%)",
                data: [80],
              },
            ],
            options: {
              xaxis: {
                categories: ["South America"],
              },
              colors: ["#775DD0"],
            },
          },
          Africa: {
            series: [
              {
                name: "CSAT Score (%)",
                data: [78],
              },
            ],
            options: {
              xaxis: {
                categories: ["Africa"],
              },
              colors: ["#775DD0"],
            },
          },
        },
        options: {
          xaxis: {
            categories: [
              "North America",
              "Europe",
              "Asia",
              "South America",
              "Africa",
            ],
          },
          colors: ["#775DD0"],
        },
        series: [
          {
            name: "CSAT Score (%)",
            data: [85, 88, 82, 80, 78],
          },
        ],
      },
    ],
    "Sustainability & Regulatory Compliance": [
      {
        id: "co2-emissions",
        title: "CO₂ Emissions per Vehicle (Scope 1, 2, 3)",
        type: "line",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        filters: {
          type: "region",
          options: ["All", "USA", "Germany", "India", "Japan", "UK"],
          default: "All",
        },
        allSeries: {
          All: {
            series: [
              {
                name: "Scope 1 & 2",
                data: [4.6, 3.9, 2.5, 3.2, 3.8],
              },
              {
                name: "Scope 3",
                data: [110, 95, 80, 85, 90],
              },
            ],
            options: {
              xaxis: {
                categories: ["USA", "Germany", "India", "Japan", "UK"],
              },
              colors: ["#008FFB", "#FF4560"],
            },
          },
          USA: {
            series: [
              {
                name: "Scope 1 & 2",
                data: [4.6],
              },
              {
                name: "Scope 3",
                data: [110],
              },
            ],
            options: {
              xaxis: {
                categories: ["USA"],
              },
              colors: ["#008FFB", "#FF4560"],
            },
          },
          Germany: {
            series: [
              {
                name: "Scope 1 & 2",
                data: [3.9],
              },
              {
                name: "Scope 3",
                data: [95],
              },
            ],
            options: {
              xaxis: {
                categories: ["Germany"],
              },
              colors: ["#008FFB", "#FF4560"],
            },
          },
          India: {
            series: [
              {
                name: "Scope 1 & 2",
                data: [2.5],
              },
              {
                name: "Scope 3",
                data: [80],
              },
            ],
            options: {
              xaxis: {
                categories: ["India"],
              },
              colors: ["#008FFB", "#FF4560"],
            },
          },
          Japan: {
            series: [
              {
                name: "Scope 1 & 2",
                data: [3.2],
              },
              {
                name: "Scope 3",
                data: [85],
              },
            ],
            options: {
              xaxis: {
                categories: ["Japan"],
              },
              colors: ["#008FFB", "#FF4560"],
            },
          },
          UK: {
            series: [
              {
                name: "Scope 1 & 2",
                data: [3.8],
              },
              {
                name: "Scope 3",
                data: [90],
              },
            ],
            options: {
              xaxis: {
                categories: ["UK"],
              },
              colors: ["#008FFB", "#FF4560"],
            },
          },
        },
        options: {
          xaxis: {
            categories: ["USA", "Germany", "India", "Japan", "UK"],
          },
          colors: ["#008FFB", "#FF4560"],
        },
        series: [
          {
            name: "Scope 1 & 2",
            data: [4.6, 3.9, 2.5, 3.2, 3.8],
          },
          {
            name: "Scope 3",
            data: [110, 95, 80, 85, 90],
          },
        ],
      },

      {
        id: "recycled-material-usage",
        title: "Recycled Material Usage (%) by Country",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        filters: {
          type: "country",
          options: ["All", "USA", "Germany", "India", "Japan", "UK"],
          default: "All",
        },
        allSeries: {
          All: {
            series: [
              {
                name: "Recycled Material Usage (%)",
                data: [35, 40, 30, 45, 50],
              },
            ],
            options: {
              xaxis: {
                categories: ["USA", "Germany", "India", "Japan", "UK"],
              },
              colors: ["#FF4560"],
            },
          },
          USA: {
            series: [
              {
                name: "Recycled Material Usage (%)",
                data: [35],
              },
            ],
            options: {
              xaxis: {
                categories: ["USA"],
              },
              colors: ["#FF4560"],
            },
          },
          Germany: {
            series: [
              {
                name: "Recycled Material Usage (%)",
                data: [40],
              },
            ],
            options: {
              xaxis: {
                categories: ["Germany"],
              },
              colors: ["#FF4560"],
            },
          },
          India: {
            series: [
              {
                name: "Recycled Material Usage (%)",
                data: [30],
              },
            ],
            options: {
              xaxis: {
                categories: ["India"],
              },
              colors: ["#FF4560"],
            },
          },
          Japan: {
            series: [
              {
                name: "Recycled Material Usage (%)",
                data: [45],
              },
            ],
            options: {
              xaxis: {
                categories: ["Japan"],
              },
              colors: ["#FF4560"],
            },
          },
          UK: {
            series: [
              {
                name: "Recycled Material Usage (%)",
                data: [50],
              },
            ],
            options: {
              xaxis: {
                categories: ["UK"],
              },
              colors: ["#FF4560"],
            },
          },
        },
        options: {
          xaxis: {
            categories: ["USA", "Germany", "India", "Japan", "UK"],
          },
          colors: ["#FF4560"],
        },
        series: [
          {
            name: "Recycled Material Usage (%)",
            data: [35, 40, 30, 45, 50],
          },
        ],
      },
      {
        id: "ev-share",
        title: "Electric Vehicle Share % by Country",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        filters: {
          type: "country",
          options: ["All", "Norway", "China", "Germany", "USA", "India"],
          default: "All",
        },
        allSeries: {
          All: {
            series: [
              {
                name: "EV Share %",
                data: [93, 38, 24, 9, 2],
              },
            ],
            options: {
              xaxis: {
                categories: ["Norway", "China", "Germany", "USA", "India"],
              },
              colors: ["#775DD0"],
            },
          },
          Norway: {
            series: [
              {
                name: "EV Share %",
                data: [93],
              },
            ],
            options: {
              xaxis: {
                categories: ["Norway"],
              },
              colors: ["#775DD0"],
            },
          },
          China: {
            series: [
              {
                name: "EV Share %",
                data: [38],
              },
            ],
            options: {
              xaxis: {
                categories: ["China"],
              },
              colors: ["#775DD0"],
            },
          },
          Germany: {
            series: [
              {
                name: "EV Share %",
                data: [24],
              },
            ],
            options: {
              xaxis: {
                categories: ["Germany"],
              },
              colors: ["#775DD0"],
            },
          },
          USA: {
            series: [
              {
                name: "EV Share %",
                data: [9],
              },
            ],
            options: {
              xaxis: {
                categories: ["USA"],
              },
              colors: ["#775DD0"],
            },
          },
          India: {
            series: [
              {
                name: "EV Share %",
                data: [2],
              },
            ],
            options: {
              xaxis: {
                categories: ["India"],
              },
              colors: ["#775DD0"],
            },
          },
        },
        options: {
          xaxis: {
            categories: ["Norway", "China", "Germany", "USA", "India"],
          },
          colors: ["#775DD0"],
        },
        series: [
          {
            name: "EV Share %",
            data: [93, 38, 24, 9, 2],
          },
        ],
      },
      {
        id: "compliance-breach-count",
        title: "Compliance Breach Count by Country",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        filters: {
          type: "country",
          options: ["All", "USA", "Germany", "India", "Japan", "UK"],
          default: "All",
        },
        allSeries: {
          All: {
            series: [
              {
                name: "Compliance Breaches",
                data: [5, 3, 7, 2, 4],
              },
            ],
            options: {
              xaxis: {
                categories: ["USA", "Germany", "India", "Japan", "UK"],
              },
              colors: ["#FF4560"],
            },
          },
          USA: {
            series: [
              {
                name: "Compliance Breaches",
                data: [5],
              },
            ],
            options: {
              xaxis: {
                categories: ["USA"],
              },
              colors: ["#FF4560"],
            },
          },
          Germany: {
            series: [
              {
                name: "Compliance Breaches",
                data: [3],
              },
            ],
            options: {
              xaxis: {
                categories: ["Germany"],
              },
              colors: ["#FF4560"],
            },
          },
          India: {
            series: [
              {
                name: "Compliance Breaches",
                data: [7],
              },
            ],
            options: {
              xaxis: {
                categories: ["India"],
              },
              colors: ["#FF4560"],
            },
          },
          Japan: {
            series: [
              {
                name: "Compliance Breaches",
                data: [2],
              },
            ],
            options: {
              xaxis: {
                categories: ["Japan"],
              },
              colors: ["#FF4560"],
            },
          },
          UK: {
            series: [
              {
                name: "Compliance Breaches",
                data: [4],
              },
            ],
            options: {
              xaxis: {
                categories: ["UK"],
              },
              colors: ["#FF4560"],
            },
          },
        },
        options: {
          xaxis: {
            categories: ["USA", "Germany", "India", "Japan", "UK"],
          },
          colors: ["#FF4560"],
        },
        series: [
          {
            name: "Compliance Breaches",
            data: [5, 3, 7, 2, 4],
          },
        ],
      },
      {
        id: "sustainability-investment-roi",
        title: "Sustainability Investment ROI by Country",
        type: "area",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        filters: {
          type: "country",
          options: ["All", "USA", "Germany", "India", "Japan", "UK"],
          default: "All",
        },
        allSeries: {
          All: {
            series: [
              {
                name: "ROI (%)",
                data: [12, 15, 10, 14, 13],
              },
            ],
            options: {
              xaxis: {
                categories: ["USA", "Germany", "India", "Japan", "UK"],
              },
              colors: ["#00E396"],
            },
          },
          USA: {
            series: [
              {
                name: "ROI (%)",
                data: [12],
              },
            ],
            options: {
              xaxis: {
                categories: ["USA"],
              },
              colors: ["#00E396"],
            },
          },
          Germany: {
            series: [
              {
                name: "ROI (%)",
                data: [15],
              },
            ],
            options: {
              xaxis: {
                categories: ["Germany"],
              },
              colors: ["#00E396"],
            },
          },
          India: {
            series: [
              {
                name: "ROI (%)",
                data: [10],
              },
            ],
            options: {
              xaxis: {
                categories: ["India"],
              },
              colors: ["#00E396"],
            },
          },
          Japan: {
            series: [
              {
                name: "ROI (%)",
                data: [14],
              },
            ],
            options: {
              xaxis: {
                categories: ["Japan"],
              },
              colors: ["#00E396"],
            },
          },
          UK: {
            series: [
              {
                name: "ROI (%)",
                data: [13],
              },
            ],
            options: {
              xaxis: {
                categories: ["UK"],
              },
              colors: ["#00E396"],
            },
          },
        },
        options: {
          xaxis: {
            categories: ["USA", "Germany", "India", "Japan", "UK"],
          },
          colors: ["#00E396"],
        },
        series: [
          {
            name: "ROI (%)",
            data: [12, 15, 10, 14, 13],
          },
        ],
      },
      {
        id: "recycled-material-usage-donut",
        title: "Recycled Material Usage (%) by Country",
        type: "pie",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        filters: {
          type: "country",
          options: ["All", "USA", "Germany", "India", "Japan", "UK"],
          default: "All",
        },
        allSeries: {
          All: {
            series: [35, 40, 30, 45, 50],
            options: {
              labels: ["USA", "Germany", "India", "Japan", "UK"],
              colors: ["#FF4560", "#00E396", "#775DD0", "#F3A100", "#FF9800"],
            },
          },
          USA: {
            series: [35],
            options: {
              labels: ["USA"],
              colors: ["#FF4560"],
            },
          },
          Germany: {
            series: [40],
            options: {
              labels: ["Germany"],
              colors: ["#00E396"],
            },
          },
          India: {
            series: [30],
            options: {
              labels: ["India"],
              colors: ["#775DD0"],
            },
          },
          Japan: {
            series: [45],
            options: {
              labels: ["Japan"],
              colors: ["#F3A100"],
            },
          },
          UK: {
            series: [50],
            options: {
              labels: ["UK"],
              colors: ["#FF9800"],
            },
          },
        },
        options: {
          labels: ["USA", "Germany", "India", "Japan", "UK"],
          colors: ["#FF4560", "#00E396", "#775DD0", "#F3A100", "#FF9800"],
        },
        series: [
          {
            name: "Recycled Material Usage (%)",
            data: [35, 40, 30, 45, 50],
          },
        ],
      },
    ],
  },
  fmcg: {
    "Global & Regional Sales Performance": [
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
                data: [150000, 120000, 180000, 160000, 130000],
              },
            ],
            options: {
              xaxis: { categories: ["USA", "Germany", "India", "Japan", "UK"] },
              colors: ["#008FFB"],
            },
          },
          USA: {
            series: [{ name: "Units Sold", data: [150000] }],
            options: { xaxis: { categories: ["USA"] }, colors: ["#008FFB"] },
          },
          Germany: {
            series: [{ name: "Units Sold", data: [120000] }],
            options: {
              xaxis: { categories: ["Germany"] },
              colors: ["#008FFB"],
            },
          },
          India: {
            series: [{ name: "Units Sold", data: [180000] }],
            options: { xaxis: { categories: ["India"] }, colors: ["#008FFB"] },
          },
          Japan: {
            series: [{ name: "Units Sold", data: [160000] }],
            options: { xaxis: { categories: ["Japan"] }, colors: ["#008FFB"] },
          },
          UK: {
            series: [{ name: "Units Sold", data: [130000] }],
            options: { xaxis: { categories: ["UK"] }, colors: ["#008FFB"] },
          },
          "North America": {
            series: [{ name: "Units Sold", data: [150000] }],
            options: { xaxis: { categories: ["USA"] }, colors: ["#008FFB"] },
          },
          Europe: {
            series: [{ name: "Units Sold", data: [120000, 130000] }],
            options: {
              xaxis: { categories: ["Germany", "UK"] },
              colors: ["#008FFB"],
            },
          },
          Asia: {
            series: [{ name: "Units Sold", data: [180000, 160000] }],
            options: {
              xaxis: { categories: ["India", "Japan"] },
              colors: ["#008FFB"],
            },
          },
        },
        options: {
          xaxis: { categories: ["USA", "Germany", "India", "Japan", "UK"] },
          colors: ["#008FFB"],
        },
        series: [
          {
            name: "Units Sold",
            data: [150000, 120000, 180000, 160000, 130000],
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
            { name: "2021", data: [3.1, 3.5, 4.0, 4.2] },
            { name: "2022", data: [4.0, 4.3, 4.8, 5.0] },
            { name: "2023", data: [5.1, 5.3, 5.6, 5.9] },
            { name: "2024", data: [6.0, 6.3, 6.8, 7.1] },
          ],
          2021: [{ name: "2021", data: [3.1, 3.5, 4.0, 4.2] }],
          2022: [{ name: "2022", data: [4.0, 4.3, 4.8, 5.0] }],
          2023: [{ name: "2023", data: [5.1, 5.3, 5.6, 5.9] }],
          2024: [{ name: "2024", data: [6.0, 6.3, 6.8, 7.1] }],
        },
        options: {
          chart: { id: "yoy-growth" },
          xaxis: { categories: ["Q1", "Q2", "Q3", "Q4"] },
          colors: ["#00E396", "#FF4560"],
        },
      },
      {
        id: "market-share",
        title: "Market Share %",
        type: "pie",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        options: {
          labels: ["Nestlé", "PepsiCo", "Hindustan Unilever", "ITC", "Others"],
          colors: ["#775DD0", "#00ACC1", "#FEB019", "#FF4560", "#4A4A4A"],
          legend: { position: "bottom" },
        },
        series: [35, 25, 20, 10, 10],
      },
      {
        id: "asp",
        title: "Average Selling Price (USD)",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        options: {
          xaxis: {
            categories: ["Nestlé", "PepsiCo", "Hindustan Unilever", "ITC"],
          },
          colors: ["#FFB400"],
        },
        series: [
          {
            name: "ASP (USD)",
            data: [1.8, 1.5, 2.0, 1.3],
          },
        ],
      },
      {
        id: "competitor-region",
        title: "Competitor Comparison by Region",
        type: "radar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
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
          { name: "Nestlé", data: [85, 88, 92, 70, 60] },
          { name: "PepsiCo", data: [78, 80, 75, 65, 58] },
          { name: "Hindustan Unilever", data: [72, 74, 89, 62, 55] },
        ],
      },
      {
        id: "channel-sales",
        title: "Sales by Channel",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
        filters: {
          type: "category",
          options: ["All", "Retail", "Online", "Distributor", "Direct"],
          default: "All",
        },
        allSeries: {
          All: [
            { name: "Retail", data: [40000, 35000, 55000, 45000, 38000] },
            { name: "Online", data: [20000, 15000, 30000, 22000, 18000] },
            { name: "Distributor", data: [30000, 25000, 45000, 37000, 32000] },
            { name: "Direct", data: [10000, 8000, 12000, 9500, 8700] },
          ],
          Retail: [
            { name: "Retail", data: [40000, 35000, 55000, 45000, 38000] },
          ],
          Online: [
            { name: "Online", data: [20000, 15000, 30000, 22000, 18000] },
          ],
          Distributor: [
            { name: "Distributor", data: [30000, 25000, 45000, 37000, 32000] },
          ],
          Direct: [{ name: "Direct", data: [10000, 8000, 12000, 9500, 8700] }],
        },
        options: {
          chart: { stacked: true },
          xaxis: { categories: ["USA", "Germany", "India", "Japan", "UK"] },
          colors: ["#00E396", "#775DD0", "#FF4560", "#FEB019"],
          legend: { position: "bottom" },
        },
      },
      {
        id: "product-sales",
        title: "Product-wise Sales Performance",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
        options: {
          xaxis: {
            categories: ["Maggi", "Pepsi", "Surf Excel", "Kurkure", "Dove"],
          },
          colors: ["#546E7A"],
        },
        series: [
          {
            name: "Units Sold",
            data: [90000, 75000, 85000, 40000, 30000],
          },
        ],
      },
    ],
    "Supply Chain & Distribution Efficiency": [
      {
        id: "supply-chain-lead-time",
        title: "Supply Chain Lead Time (Days)",
        type: "area",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        filters: {
          type: "location",
          options: ["All", "USA", "Germany", "India", "Japan", "UK"],
          default: "All",
        },
        allSeries: {
          All: {
            series: [
              {
                name: "Lead Time",
                data: [12, 15, 10, 14, 13],
              },
            ],
            options: {
              xaxis: { categories: ["USA", "Germany", "India", "Japan", "UK"] },
              colors: ["#008FFB"],
            },
          },
          USA: {
            series: [{ name: "Lead Time", data: [12] }],
            options: { xaxis: { categories: ["USA"] }, colors: ["#008FFB"] },
          },
          Germany: {
            series: [{ name: "Lead Time", data: [15] }],
            options: {
              xaxis: { categories: ["Germany"] },
              colors: ["#008FFB"],
            },
          },
          India: {
            series: [{ name: "Lead Time", data: [10] }],
            options: { xaxis: { categories: ["India"] }, colors: ["#008FFB"] },
          },
          Japan: {
            series: [{ name: "Lead Time", data: [14] }],
            options: { xaxis: { categories: ["Japan"] }, colors: ["#008FFB"] },
          },
          UK: {
            series: [{ name: "Lead Time", data: [13] }],
            options: { xaxis: { categories: ["UK"] }, colors: ["#008FFB"] },
          },
        },
        options: {
          xaxis: { categories: ["USA", "Germany", "India", "Japan", "UK"] },
          colors: ["#008FFB"],
        },
        series: [
          {
            name: "Lead Time",
            data: [12, 15, 10, 14, 13],
          },
        ],
      },
      {
        id: "inventory-turnover-ratio",
        title: "Inventory Turnover Ratio",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-4",
        filters: {
          type: "category",
          options: ["All", "Retail", "Automotive", "Healthcare", "Technology"],
          default: "All",
        },
        allSeries: {
          All: {
            series: [
              {
                name: "Turnover Ratio",
                data: [10.5, 6.8, 4.2, 9.1],
              },
            ],
            options: {
              xaxis: {
                categories: [
                  "Retail",
                  "Automotive",
                  "Healthcare",
                  "Technology",
                ],
              },
              colors: ["#00E396"],
            },
          },
          Retail: {
            series: [{ name: "Turnover Ratio", data: [10.5] }],
            options: { xaxis: { categories: ["Retail"] }, colors: ["#00E396"] },
          },
          Automotive: {
            series: [{ name: "Turnover Ratio", data: [6.8] }],
            options: {
              xaxis: { categories: ["Automotive"] },
              colors: ["#00E396"],
            },
          },
          Healthcare: {
            series: [{ name: "Turnover Ratio", data: [4.2] }],
            options: {
              xaxis: { categories: ["Healthcare"] },
              colors: ["#00E396"],
            },
          },
          Technology: {
            series: [{ name: "Turnover Ratio", data: [9.1] }],
            options: {
              xaxis: { categories: ["Technology"] },
              colors: ["#00E396"],
            },
          },
        },
        options: {
          xaxis: {
            categories: ["Retail", "Automotive", "Healthcare", "Technology"],
          },
          colors: ["#00E396"],
        },
        series: [
          {
            name: "Turnover Ratio",
            data: [10.5, 6.8, 4.2, 9.1],
          },
        ],
      },
      {
        id: "warehouse-capacity-utilization",
        title: "Warehouse Capacity Utilization (%)",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        filters: {
          type: "location",
          options: ["All", "USA", "Germany", "India", "Japan", "UK"],
          default: "All",
        },
        allSeries: {
          All: {
            series: [
              {
                name: "Utilization",
                data: [85, 78, 92, 88, 80],
              },
            ],
            options: {
              xaxis: { categories: ["USA", "Germany", "India", "Japan", "UK"] },
              colors: ["#FEB019"],
            },
          },
          USA: {
            series: [{ name: "Utilization", data: [85] }],
            options: { xaxis: { categories: ["USA"] }, colors: ["#FEB019"] },
          },
          Germany: {
            series: [{ name: "Utilization", data: [78] }],
            options: {
              xaxis: { categories: ["Germany"] },
              colors: ["#FEB019"],
            },
          },
          India: {
            series: [{ name: "Utilization", data: [92] }],
            options: { xaxis: { categories: ["India"] }, colors: ["#FEB019"] },
          },
          Japan: {
            series: [{ name: "Utilization", data: [88] }],
            options: { xaxis: { categories: ["Japan"] }, colors: ["#FEB019"] },
          },
          UK: {
            series: [{ name: "Utilization", data: [80] }],
            options: { xaxis: { categories: ["UK"] }, colors: ["#FEB019"] },
          },
        },
        options: {
          xaxis: { categories: ["USA", "Germany", "India", "Japan", "UK"] },
          colors: ["#FEB019"],
        },
        series: [
          {
            name: "Utilization",
            data: [85, 78, 92, 88, 80],
          },
        ],
      },
      {
        id: "order-fulfillment-rate",
        title: "Order Fulfillment Rate (%)",
        type: "line",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        filters: {
          type: "region",
          options: ["All", "North America", "Europe", "Asia"],
          default: "All",
        },
        allSeries: {
          All: [
            { name: "North America", data: [95, 96, 94, 97] },
            { name: "Europe", data: [92, 93, 91, 94] },
            { name: "Asia", data: [89, 90, 88, 91] },
          ],
          "North America": [{ name: "North America", data: [95, 96, 94, 97] }],
          Europe: [{ name: "Europe", data: [92, 93, 91, 94] }],
          Asia: [{ name: "Asia", data: [89, 90, 88, 91] }],
        },
        options: {
          chart: { id: "order-fulfillment" },
          xaxis: { categories: ["Q1", "Q2", "Q3", "Q4"] },
          colors: ["#00E396", "#775DD0", "#FF4560"],
        },
      },
      {
        id: "distribution-cost-per-unit",
        title: "Distribution Cost per Unit ($)",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
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
                name: "Cost per Unit ($)",
                data: [1.25, 1.4, 1.1, 1.3, 1.35],
              },
            ],
            options: {
              xaxis: { categories: ["USA", "Germany", "India", "Japan", "UK"] },
              colors: ["#775DD0"],
            },
          },
          USA: {
            series: [{ name: "Cost per Unit ($)", data: [1.25] }],
            options: { xaxis: { categories: ["USA"] }, colors: ["#775DD0"] },
          },
          Germany: {
            series: [{ name: "Cost per Unit ($)", data: [1.4] }],
            options: {
              xaxis: { categories: ["Germany"] },
              colors: ["#775DD0"],
            },
          },
          India: {
            series: [{ name: "Cost per Unit ($)", data: [1.1] }],
            options: { xaxis: { categories: ["India"] }, colors: ["#775DD0"] },
          },
          Japan: {
            series: [{ name: "Cost per Unit ($)", data: [1.3] }],
            options: { xaxis: { categories: ["Japan"] }, colors: ["#775DD0"] },
          },
          UK: {
            series: [{ name: "Cost per Unit ($)", data: [1.35] }],
            options: { xaxis: { categories: ["UK"] }, colors: ["#775DD0"] },
          },
          "North America": {
            series: [{ name: "Cost per Unit ($)", data: [1.25] }],
            options: { xaxis: { categories: ["USA"] }, colors: ["#775DD0"] },
          },
          Europe: {
            series: [{ name: "Cost per Unit ($)", data: [1.4, 1.35] }],
            options: {
              xaxis: { categories: ["Germany", "UK"] },
              colors: ["#775DD0"],
            },
          },
          Asia: {
            series: [{ name: "Cost per Unit ($)", data: [1.1, 1.3] }],
            options: {
              xaxis: { categories: ["India", "Japan"] },
              colors: ["#775DD0"],
            },
          },
        },
        options: {
          xaxis: { categories: ["USA", "Germany", "India", "Japan", "UK"] },
          colors: ["#775DD0"],
        },
        series: [
          {
            name: "Cost per Unit ($)",
            data: [1.25, 1.4, 1.1, 1.3, 1.35],
          },
        ],
      },
      {
        id: "supplier-performance",
        title: "Supplier Performance (On-Time & Quality Delivery %)",
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
                name: "On-Time Delivery (%)",
                data: [95, 92, 90, 96, 91],
              },
              {
                name: "Quality Compliance (%)",
                data: [97, 94, 92, 98, 93],
              },
            ],
            options: {
              xaxis: { categories: ["USA", "Germany", "India", "Japan", "UK"] },
              colors: ["#546E7A", "#26A69A"],
            },
          },
          USA: {
            series: [
              { name: "On-Time Delivery (%)", data: [95] },
              { name: "Quality Compliance (%)", data: [97] },
            ],
            options: {
              xaxis: { categories: ["USA"] },
              colors: ["#546E7A", "#26A69A"],
            },
          },
          Germany: {
            series: [
              { name: "On-Time Delivery (%)", data: [92] },
              { name: "Quality Compliance (%)", data: [94] },
            ],
            options: {
              xaxis: { categories: ["Germany"] },
              colors: ["#546E7A", "#26A69A"],
            },
          },
          India: {
            series: [
              { name: "On-Time Delivery (%)", data: [90] },
              { name: "Quality Compliance (%)", data: [92] },
            ],
            options: {
              xaxis: { categories: ["India"] },
              colors: ["#546E7A", "#26A69A"],
            },
          },
          Japan: {
            series: [
              { name: "On-Time Delivery (%)", data: [96] },
              { name: "Quality Compliance (%)", data: [98] },
            ],
            options: {
              xaxis: { categories: ["Japan"] },
              colors: ["#546E7A", "#26A69A"],
            },
          },
          UK: {
            series: [
              { name: "On-Time Delivery (%)", data: [91] },
              { name: "Quality Compliance (%)", data: [93] },
            ],
            options: {
              xaxis: { categories: ["UK"] },
              colors: ["#546E7A", "#26A69A"],
            },
          },
        },
        options: {
          xaxis: { categories: ["USA", "Germany", "India", "Japan", "UK"] },
          colors: ["#546E7A", "#26A69A"],
        },
        series: [
          {
            name: "On-Time Delivery (%)",
            data: [95, 92, 90, 96, 91],
          },
          {
            name: "Quality Compliance (%)",
            data: [97, 94, 92, 98, 93],
          },
        ],
      },
      {
        id: "stockouts-percentage",
        title: "Stockouts / Out-of-Stock Percentage",
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
                name: "Stockout %",
                data: [3.5, 4.1, 2.8, 3.2, 4.0],
              },
            ],
            options: {
              xaxis: { categories: ["USA", "Germany", "India", "Japan", "UK"] },
              colors: ["#FF4560"],
            },
          },
          USA: {
            series: [{ name: "Stockout %", data: [3.5] }],
            options: { xaxis: { categories: ["USA"] }, colors: ["#FF4560"] },
          },
          Germany: {
            series: [{ name: "Stockout %", data: [4.1] }],
            options: {
              xaxis: { categories: ["Germany"] },
              colors: ["#FF4560"],
            },
          },
          India: {
            series: [{ name: "Stockout %", data: [2.8] }],
            options: { xaxis: { categories: ["India"] }, colors: ["#FF4560"] },
          },
          Japan: {
            series: [{ name: "Stockout %", data: [3.2] }],
            options: { xaxis: { categories: ["Japan"] }, colors: ["#FF4560"] },
          },
          UK: {
            series: [{ name: "Stockout %", data: [4.0] }],
            options: { xaxis: { categories: ["UK"] }, colors: ["#FF4560"] },
          },
        },
        options: {
          xaxis: { categories: ["USA", "Germany", "India", "Japan", "UK"] },
          colors: ["#FF4560"],
        },
        series: [
          {
            name: "Stockout %",
            data: [3.5, 4.1, 2.8, 3.2, 4.0],
          },
        ],
      },
    ],
    "Marketing & Brand Performance": [
      {
        id: "brand-awareness-index",
        title: "Brand Awareness Index",
        type: "area",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
        filters: {
          type: "region",
          options: [
            "All",
            "North America",
            "Europe",
            "Asia",
            "South America",
            "Africa",
          ],
          default: "All",
        },
        allSeries: {
          All: {
            series: [
              {
                name: "Brand Awareness",
                data: [68, 75, 70, 65, 60, 55],
              },
            ],
            options: {
              xaxis: {
                categories: [
                  "North America",
                  "Europe",
                  "Asia",
                  "South America",
                  "Africa",
                  "Oceania",
                ],
              },
              colors: ["#008FFB"],
              fill: { type: "gradient" },
            },
          },
          "North America": {
            series: [{ name: "Brand Awareness", data: [68] }],
            options: {
              xaxis: { categories: ["North America"] },
              colors: ["#008FFB"],
            },
          },
          Europe: {
            series: [{ name: "Brand Awareness", data: [75] }],
            options: {
              xaxis: { categories: ["Europe"] },
              colors: ["#008FFB"],
            },
          },
          Asia: {
            series: [{ name: "Brand Awareness", data: [70] }],
            options: {
              xaxis: { categories: ["Asia"] },
              colors: ["#008FFB"],
            },
          },
          "South America": {
            series: [{ name: "Brand Awareness", data: [65] }],
            options: {
              xaxis: { categories: ["South America"] },
              colors: ["#008FFB"],
            },
          },
          Africa: {
            series: [{ name: "Brand Awareness", data: [60] }],
            options: {
              xaxis: { categories: ["Africa"] },
              colors: ["#008FFB"],
            },
          },
        },
        options: {
          xaxis: {
            categories: [
              "North America",
              "Europe",
              "Asia",
              "South America",
              "Africa",
              "Oceania",
            ],
          },
          colors: ["#008FFB"],
          fill: { type: "gradient" },
        },
        series: [
          {
            name: "Brand Awareness",
            data: [68, 75, 70, 65, 60, 55],
          },
        ],
      },
      {
        id: "ad-spend-roas",
        title: "Advertising Spend ROI (ROAS)",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
        filters: {
          type: "channel",
          options: ["All", "TV", "Digital", "Print", "Outdoor"],
          default: "All",
        },
        allSeries: {
          All: [
            {
              name: "ROAS",
              data: [2.5, 4.2, 1.8, 1.2],
            },
          ],
          TV: [
            {
              name: "ROAS",
              data: [2.5],
            },
          ],
          Digital: [
            {
              name: "ROAS",
              data: [4.2],
            },
          ],
          Print: [
            {
              name: "ROAS",
              data: [1.8],
            },
          ],
          Outdoor: [
            {
              name: "ROAS",
              data: [1.2],
            },
          ],
        },
        options: {
          xaxis: {
            categories: ["TV", "Digital", "Print", "Outdoor"],
          },
          colors: ["#00E396"],
        },
        series: [
          {
            name: "ROAS",
            data: [2.5, 4.2, 1.8, 1.2],
          },
        ],
      },
      {
        id: "market-penetration",
        title: "Market Penetration Rate",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        filters: {
          type: "country",
          options: ["All", "USA", "Germany", "India", "Brazil", "South Africa"],
          default: "All",
        },
        allSeries: {
          All: {
            series: [
              {
                name: "Penetration Rate (%)",
                data: [60, 55, 70, 50, 45],
              },
            ],
            options: {
              xaxis: {
                categories: [
                  "USA",
                  "Germany",
                  "India",
                  "Brazil",
                  "South Africa",
                ],
              },
              colors: ["#FEB019"],
            },
          },
          USA: {
            series: [{ name: "Penetration Rate (%)", data: [60] }],
            options: {
              xaxis: { categories: ["USA"] },
              colors: ["#FEB019"],
            },
          },
          Germany: {
            series: [{ name: "Penetration Rate (%)", data: [55] }],
            options: {
              xaxis: { categories: ["Germany"] },
              colors: ["#FEB019"],
            },
          },
          India: {
            series: [{ name: "Penetration Rate (%)", data: [70] }],
            options: {
              xaxis: { categories: ["India"] },
              colors: ["#FEB019"],
            },
          },
          Brazil: {
            series: [{ name: "Penetration Rate (%)", data: [50] }],
            options: {
              xaxis: { categories: ["Brazil"] },
              colors: ["#FEB019"],
            },
          },
          "South Africa": {
            series: [{ name: "Penetration Rate (%)", data: [45] }],
            options: {
              xaxis: { categories: ["South Africa"] },
              colors: ["#FEB019"],
            },
          },
        },
        options: {
          chart: { type: "bar", toolbar: { show: false } },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          xaxis: {
            categories: ["USA", "Germany", "India", "Brazil", "South Africa"],
          },
          colors: ["#FEB019"],
        },
        series: [
          {
            name: "Penetration Rate (%)",
            data: [60, 55, 70, 50, 45],
          },
        ],
      },
      {
        id: "customer-engagement",
        title: "Customer Engagement",
        type: "pie",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-4",
        filters: {
          type: "channel",
          options: ["All", "Social Media", "Email", "TV", "In-Store"],
          default: "All",
        },
        allSeries: {
          All: {
            series: [40, 25, 20, 10, 5],
            options: {
              labels: ["Social Media", "Email", "TV", "In-Store", "Other"],
              colors: ["#00E396", "#FEB019", "#FF4560", "#775DD0", "#008FFB"],
            },
          },
          "Social Media": {
            series: [85, 15],
            options: {
              labels: ["Engaged", "Not Engaged"],
              colors: ["#00E396", "#FF4560"],
            },
          },
          Email: {
            series: [60, 40],
            options: {
              labels: ["Opened", "Ignored"],
              colors: ["#FEB019", "#775DD0"],
            },
          },
          TV: {
            series: [30, 70],
            options: {
              labels: ["Responded", "Ignored"],
              colors: ["#FF4560", "#00E396"],
            },
          },
          "In-Store": {
            series: [20, 80],
            options: {
              labels: ["Participated", "No Response"],
              colors: ["#775DD0", "#008FFB"],
            },
          },
        },
        series: [40, 25, 20, 10, 5],
        options: {
          labels: ["Social Media", "Email", "TV", "In-Store", "Other"],
          colors: ["#00E396", "#FEB019", "#FF4560", "#775DD0", "#008FFB"],
        },
      },
      {
        id: "promotional-campaign-performance",
        title: "Promotional Campaign Performance (Sales Lift & ROI)",
        type: "line",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
        filters: {
          type: "campaignType",
          options: ["All", "Holiday", "Flash Sale", "Clearance", "New Product"],
          default: "All",
        },
        allSeries: {
          All: {
            series: [
              {
                name: "Sales Lift (%)",
                data: [12, 18, 10, 7, 20],
              },
              {
                name: "ROI",
                data: [2.5, 3.8, 1.2, 0.9, 4.1],
              },
            ],
            options: {
              xaxis: {
                categories: [
                  "Holiday",
                  "Flash Sale",
                  "Clearance",
                  "New Product",
                  "Brand Campaign",
                ],
              },
              colors: ["#008FFB", "#FEB019"],
            },
          },
          Holiday: {
            series: [
              { name: "Sales Lift (%)", data: [12] },
              { name: "ROI", data: [2.5] },
            ],
            options: {
              xaxis: { categories: ["Holiday"] },
              colors: ["#008FFB", "#FEB019"],
            },
          },
          "Flash Sale": {
            series: [
              { name: "Sales Lift (%)", data: [18] },
              { name: "ROI", data: [3.8] },
            ],
            options: {
              xaxis: { categories: ["Flash Sale"] },
              colors: ["#008FFB", "#FEB019"],
            },
          },
          Clearance: {
            series: [
              { name: "Sales Lift (%)", data: [10] },
              { name: "ROI", data: [1.2] },
            ],
            options: {
              xaxis: { categories: ["Clearance"] },
              colors: ["#008FFB", "#FEB019"],
            },
          },
          "New Product": {
            series: [
              { name: "Sales Lift (%)", data: [7] },
              { name: "ROI", data: [0.9] },
            ],
            options: {
              xaxis: { categories: ["New Product"] },
              colors: ["#008FFB", "#FEB019"],
            },
          },
        },
        series: [
          {
            name: "Sales Lift (%)",
            data: [12, 18, 10, 7, 20],
          },
          {
            name: "ROI",
            data: [2.5, 3.8, 1.2, 0.9, 4.1],
          },
        ],
        options: {
          xaxis: {
            categories: [
              "Holiday",
              "Flash Sale",
              "Clearance",
              "New Product",
              "Brand Campaign",
            ],
          },
          colors: ["#008FFB", "#FEB019"],
        },
      },
      {
        id: "product-launch-success",
        title: "New Product Launch Success Rate",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
        filters: {
          type: "time",
          options: ["All", "Q1", "Q2", "Q3", "Q4"],
          default: "All",
        },
        allSeries: {
          All: {
            series: [
              {
                name: "Launch Success Rate (%)",
                data: [60, 75, 50, 80],
              },
            ],
            options: {
              xaxis: {
                categories: [
                  "Product A",
                  "Product B",
                  "Product C",
                  "Product D",
                ],
              },
              colors: ["#775DD0"],
            },
          },
          Q1: {
            series: [
              {
                name: "Launch Success Rate (%)",
                data: [60, 70],
              },
            ],
            options: {
              xaxis: { categories: ["Product A", "Product B"] },
              colors: ["#775DD0"],
            },
          },
          Q2: {
            series: [
              {
                name: "Launch Success Rate (%)",
                data: [65, 80],
              },
            ],
            options: {
              xaxis: { categories: ["Product C", "Product D"] },
              colors: ["#775DD0"],
            },
          },
        },
        series: [
          {
            name: "Launch Success Rate (%)",
            data: [60, 75, 50, 80],
          },
        ],
        options: {
          xaxis: {
            categories: ["Product A", "Product B", "Product C", "Product D"],
          },
          colors: ["#775DD0"],
        },
      },
    ],
    "Financial & Profitability Overview": [
      {
        id: "revenue-by-region-segment",
        title: "Revenue by Geography & Segment",
        type: "area",
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
                name: "Consumer Goods",
                data: [200, 300, 250, 400, 350],
              },
              {
                name: "Health & Wellness",
                data: [150, 200, 180, 220, 210],
              },
              {
                name: "Beverages",
                data: [180, 240, 210, 260, 230],
              },
            ],
            options: {
              xaxis: {
                categories: ["Q1", "Q2", "Q3", "Q4", "Q5"],
              },
              colors: ["#008FFB", "#00E396", "#FEB019"],
            },
          },
          "North America": {
            series: [
              { name: "Consumer Goods", data: [100, 120, 130] },
              { name: "Health & Wellness", data: [90, 95, 110] },
              { name: "Beverages", data: [85, 100, 105] },
            ],
            options: {
              xaxis: {
                categories: ["Q1", "Q2", "Q3"],
              },
              colors: ["#008FFB", "#00E396", "#FEB019"],
            },
          },
          Europe: {
            series: [
              { name: "Consumer Goods", data: [80, 100, 90] },
              { name: "Health & Wellness", data: [60, 80, 75] },
              { name: "Beverages", data: [70, 85, 90] },
            ],
            options: {
              xaxis: {
                categories: ["Q1", "Q2", "Q3"],
              },
              colors: ["#008FFB", "#00E396", "#FEB019"],
            },
          },
        },
        series: [
          {
            name: "Consumer Goods",
            data: [200, 300, 250, 400, 350],
          },
          {
            name: "Health & Wellness",
            data: [150, 200, 180, 220, 210],
          },
          {
            name: "Beverages",
            data: [180, 240, 210, 260, 230],
          },
        ],
        options: {
          xaxis: {
            categories: ["Q1", "Q2", "Q3", "Q4", "Q5"],
          },
          colors: ["#008FFB", "#00E396", "#FEB019"],
        },
      },
      {
        id: "gross-profit-margin",
        title: "Gross Profit Margin %",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
        filters: {
          type: "businessUnit",
          options: ["All", "Retail", "Wholesale", "E-commerce"],
          default: "All",
        },
        allSeries: {
          All: {
            series: [
              {
                name: "Gross Margin %",
                data: [42, 37, 45, 50, 38],
              },
            ],
            options: {
              xaxis: {
                categories: ["NA", "EU", "ASIA", "LATAM", "MEA"],
              },
              colors: ["#00E396"],
            },
          },
          Retail: {
            series: [
              {
                name: "Gross Margin %",
                data: [44, 39, 46, 52, 41],
              },
            ],
            options: {
              xaxis: {
                categories: ["NA", "EU", "ASIA", "LATAM", "MEA"],
              },
              colors: ["#00E396"],
            },
          },
          Wholesale: {
            series: [
              {
                name: "Gross Margin %",
                data: [35, 30, 33, 38, 31],
              },
            ],
            options: {
              xaxis: {
                categories: ["NA", "EU", "ASIA", "LATAM", "MEA"],
              },
              colors: ["#00E396"],
            },
          },
        },
        series: [
          {
            name: "Gross Margin %",
            data: [42, 37, 45, 50, 38],
          },
        ],
        options: {
          xaxis: {
            categories: ["NA", "EU", "ASIA", "LATAM", "MEA"],
          },
          colors: ["#00E396"],
        },
      },
      {
        id: "operating-expense-ratio",
        title: "Operating Expenses Ratio",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        filters: {
          type: "productCategory",
          options: ["All", "Snacks", "Beverages", "Supplements"],
          default: "All",
        },
        allSeries: {
          All: {
            series: [
              {
                name: "OPEX Ratio (%)",
                data: [22, 28, 18, 26, 31],
              },
            ],
            options: {
              xaxis: {
                categories: [
                  "Snacks",
                  "Beverages",
                  "Supplements",
                  "Personal Care",
                  "Household",
                ],
              },
              colors: ["#FF4560"],
            },
          },
          Snacks: {
            series: [{ name: "OPEX Ratio (%)", data: [22] }],
            options: {
              xaxis: {
                categories: ["Snacks"],
              },
              colors: ["#FF4560"],
            },
          },
          Beverages: {
            series: [{ name: "OPEX Ratio (%)", data: [28] }],
            options: {
              xaxis: {
                categories: ["Beverages"],
              },
              colors: ["#FF4560"],
            },
          },
          Supplements: {
            series: [{ name: "OPEX Ratio (%)", data: [18] }],
            options: {
              xaxis: {
                categories: ["Supplements"],
              },
              colors: ["#FF4560"],
            },
          },
        },
        series: [
          {
            name: "OPEX Ratio (%)",
            data: [22, 28, 18, 26, 31],
          },
        ],
        options: {
          xaxis: {
            categories: [
              "Snacks",
              "Beverages",
              "Supplements",
              "Personal Care",
              "Household",
            ],
          },
          colors: ["#FF4560"],
        },
      },
      {
        id: "net-profit-margin",
        title: "Net Profit Margin %",
        type: "line",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        filters: {
          type: "country",
          options: ["All", "USA", "Germany", "India", "Brazil"],
          default: "All",
        },
        allSeries: {
          All: {
            series: [
              {
                name: "Net Profit Margin %",
                data: [12.5, 14.2, 13.0, 15.5, 16.8],
              },
            ],
            options: {
              xaxis: {
                categories: ["Q1", "Q2", "Q3", "Q4", "Q1 (Y2)"],
              },
              colors: ["#775DD0"],
            },
          },
          USA: {
            series: [
              {
                name: "Net Profit Margin %",
                data: [14.0, 15.2, 13.8, 16.0, 17.5],
              },
            ],
            options: {
              xaxis: { categories: ["Q1", "Q2", "Q3", "Q4", "Q1 (Y2)"] },
              colors: ["#775DD0"],
            },
          },
          Germany: {
            series: [
              {
                name: "Net Profit Margin %",
                data: [10.5, 11.8, 12.0, 13.0, 14.0],
              },
            ],
            options: {
              xaxis: { categories: ["Q1", "Q2", "Q3", "Q4", "Q1 (Y2)"] },
              colors: ["#775DD0"],
            },
          },
        },
        series: [
          {
            name: "Net Profit Margin %",
            data: [12.5, 14.2, 13.0, 15.5, 16.8],
          },
        ],
        options: {
          xaxis: {
            categories: ["Q1", "Q2", "Q3", "Q4", "Q1 (Y2)"],
          },
          colors: ["#775DD0"],
        },
      },
      {
        id: "cogs-breakdown",
        title: "Cost of Goods Sold (COGS) Breakdown",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        filters: {
          type: "businessUnit",
          options: ["All", "Consumer Products", "Health Products", "Beverages"],
          default: "All",
        },
        allSeries: {
          All: {
            series: [
              {
                name: "Raw Materials",
                data: [120, 140, 135, 150, 160],
              },
              {
                name: "Packaging",
                data: [30, 35, 33, 40, 38],
              },
              {
                name: "Labor",
                data: [50, 55, 52, 60, 58],
              },
              {
                name: "Distribution",
                data: [20, 25, 22, 28, 30],
              },
            ],
            options: {
              xaxis: {
                categories: ["Q1", "Q2", "Q3", "Q4", "Q1 (Y2)"],
              },
              colors: ["#008FFB", "#FEB019", "#00E396", "#FF4560"],
              stacked: true,
            },
          },
          "Consumer Products": {
            series: [
              { name: "Raw Materials", data: [60, 70, 72, 75, 80] },
              { name: "Packaging", data: [15, 18, 17, 20, 22] },
              { name: "Labor", data: [25, 28, 27, 30, 32] },
              { name: "Distribution", data: [10, 12, 11, 13, 15] },
            ],
            options: {
              xaxis: {
                categories: ["Q1", "Q2", "Q3", "Q4", "Q1 (Y2)"],
              },
              colors: ["#008FFB", "#FEB019", "#00E396", "#FF4560"],
              stacked: true,
            },
          },
        },
        series: [
          {
            name: "Raw Materials",
            data: [120, 140, 135, 150, 160],
          },
          {
            name: "Packaging",
            data: [30, 35, 33, 40, 38],
          },
          {
            name: "Labor",
            data: [50, 55, 52, 60, 58],
          },
          {
            name: "Distribution",
            data: [20, 25, 22, 28, 30],
          },
        ],
        options: {
          xaxis: {
            categories: ["Q1", "Q2", "Q3", "Q4", "Q1 (Y2)"],
          },
          colors: ["#008FFB", "#FEB019", "#00E396", "#FF4560"],
          stacked: true,
        },
      },
      {
        id: "contribution-margin",
        title: "Contribution Margin by Brand/Product Line",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
        filters: {
          type: "productLine",
          options: ["All", "Brand A", "Brand B", "Brand C", "Brand D"],
          default: "All",
        },
        allSeries: {
          All: {
            series: [
              {
                name: "Contribution Margin %",
                data: [25, 30, 22, 35],
              },
            ],
            options: {
              xaxis: {
                categories: ["Brand A", "Brand B", "Brand C", "Brand D"],
              },
              colors: ["#008FFB"],
            },
          },
          "Brand A": {
            series: [{ name: "Contribution Margin %", data: [30] }],
            options: {
              xaxis: { categories: ["Brand A"] },
              colors: ["#008FFB"],
            },
          },
          "Brand B": {
            series: [{ name: "Contribution Margin %", data: [20] }],
            options: {
              xaxis: { categories: ["Brand B"] },
              colors: ["#008FFB"],
            },
          },
        },
        series: [
          {
            name: "Contribution Margin %",
            data: [25, 30, 22, 35],
          },
        ],
        options: {
          xaxis: {
            categories: ["Brand A", "Brand B", "Brand C", "Brand D"],
          },
          colors: ["#008FFB"],
        },
      },
      {
        id: "ebitda",
        title:
          "EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization)",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
        filters: {
          type: "businessUnit",
          options: ["All", "Consumer Products", "Health Products", "Beverages"],
          default: "All",
        },
        allSeries: {
          All: {
            series: [
              {
                name: "EBITDA (in $ Million)",
                data: [120, 150, 140, 180],
              },
            ],
            options: {
              yaxis: {
                categories: [
                  "Consumer Products",
                  "Health Products",
                  "Beverages",
                  "Total",
                ],
              },
              colors: ["#00E396"],
            },
          },
          "Consumer Products": {
            series: [{ name: "EBITDA (in $ Million)", data: [50] }],
            options: {
              yaxis: { categories: ["Consumer Products"] },
              colors: ["#00E396"],
            },
          },
          "Health Products": {
            series: [{ name: "EBITDA (in $ Million)", data: [40] }],
            options: {
              yaxis: { categories: ["Health Products"] },
              colors: ["#00E396"],
            },
          },
        },
        series: [
          {
            name: "EBITDA (in $ Million)",
            data: [120, 150, 140, 180],
          },
        ],
        options: {
          yaxis: {
            categories: [
              "Consumer Products",
              "Health Products",
              "Beverages",
              "Total",
            ],
          },
          colors: ["#00E396"],
        },
      },
    ],
    "Consumer & Market Insights": [
      {
        id: "nps-region",
        title: "Net Promoter Score (NPS) by Region",
        type: "pie",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        filters: {
          type: "region",
          options: [
            "North America",
            "Europe",
            "Asia",
            "Africa",
            "South America",
          ],
          default: "North America",
        },
        allSeries: {
          "North America": {
            series: [30, 50, 20],
            options: {
              labels: ["Promoters", "Passives", "Detractors"],
              colors: ["#28A745", "#FFC107", "#DC3545"],
            },
          },
          Europe: {
            series: [40, 40, 20],
            options: {
              labels: ["Promoters", "Passives", "Detractors"],
              colors: ["#28A745", "#FFC107", "#DC3545"],
            },
          },
        },
        series: [30, 50, 20],
        options: {
          labels: ["Promoters", "Passives", "Detractors"],
          colors: ["#28A745", "#FFC107", "#DC3545"],
        },
      },
      {
        id: "customer-retention",
        title: "Customer Retention Rate",
        type: "line",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        filters: {
          type: "time",
          options: ["Q1", "Q2", "Q3", "Q4"],
          default: "Q1",
        },
        allSeries: {
          Q1: {
            series: [
              {
                name: "Retention Rate",
                data: [85, 88, 84, 87],
              },
            ],
            options: {
              xaxis: {
                categories: ["January", "February", "March", "April"],
              },
              colors: ["#007BFF"],
            },
          },
          Q2: {
            series: [
              {
                name: "Retention Rate",
                data: [80, 82, 79, 85],
              },
            ],
            options: {
              xaxis: {
                categories: ["May", "June", "July", "August"],
              },
              colors: ["#007BFF"],
            },
          },
        },
        series: [
          {
            name: "Retention Rate",
            data: [85, 88, 84, 87],
          },
        ],
        options: {
          xaxis: {
            categories: ["January", "February", "March", "April"],
          },
          colors: ["#007BFF"],
        },
      },
      {
        id: "consumer-sentiment",
        title: "Consumer Sentiment (Social Media Analysis)",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        filters: {
          type: "channel",
          options: ["Social Media", "Surveys", "Customer Feedback"],
          default: "Social Media",
        },
        allSeries: {
          "Social Media": {
            series: [
              {
                name: "Sentiment Score",
                data: [60, 30, 10],
              },
            ],
            options: {
              xaxis: {
                categories: ["Positive", "Neutral", "Negative"],
              },
              colors: ["#28A745", "#FFC107", "#DC3545"],
            },
          },
          Surveys: {
            series: [
              {
                name: "Sentiment Score",
                data: [70, 20, 10],
              },
            ],
            options: {
              xaxis: {
                categories: ["Positive", "Neutral", "Negative"],
              },
              colors: ["#28A745", "#FFC107", "#DC3545"],
            },
          },
        },
        series: [
          {
            name: "Sentiment Score",
            data: [60, 30, 10],
          },
        ],
        options: {
          xaxis: {
            categories: ["Positive", "Neutral", "Negative"],
          },
          colors: ["#28A745", "#FFC107", "#DC3545"],
        },
      },
      {
        id: "complaint-resolution-rate",
        title: "Complaint Resolution Rate",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
        filters: {
          type: "region",
          options: [
            "North America",
            "Europe",
            "Asia",
            "Africa",
            "South America",
          ],
          default: "North America",
        },
        allSeries: {
          "North America": {
            series: [
              {
                name: "Resolution Rate",
                data: [90, 85, 92, 88],
              },
            ],
            options: {
              xaxis: {
                categories: ["Q1", "Q2", "Q3", "Q4"],
              },
              colors: ["#28A745"],
            },
          },
          Europe: {
            series: [
              {
                name: "Resolution Rate",
                data: [85, 80, 82, 90],
              },
            ],
            options: {
              xaxis: {
                categories: ["Q1", "Q2", "Q3", "Q4"],
              },
              colors: ["#28A745"],
            },
          },
        },
        series: [
          {
            name: "Resolution Rate",
            data: [90, 85, 92, 88],
          },
        ],
        options: {
          xaxis: {
            categories: ["Q1", "Q2", "Q3", "Q4"],
          },
          colors: ["#28A745"],
        },
      },
      {
        id: "cltv",
        title: "Average Customer Lifetime Value (CLTV)",
        type: "line",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
        filters: {
          type: "customer-segment",
          options: ["High Value", "Medium Value", "Low Value"],
          default: "High Value",
        },
        allSeries: {
          "High Value": {
            series: [
              {
                name: "CLTV",
                data: [5000, 5200, 5300, 5500],
              },
            ],
            options: {
              xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr"],
              },
              colors: ["#007BFF"],
            },
          },
          "Medium Value": {
            series: [
              {
                name: "CLTV",
                data: [2000, 2100, 2200, 2300],
              },
            ],
            options: {
              xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr"],
              },
              colors: ["#007BFF"],
            },
          },
        },
        series: [
          {
            name: "CLTV",
            data: [5000, 5200, 5300, 5500],
          },
        ],
        options: {
          xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr"],
          },
          colors: ["#007BFF"],
        },
      },
      {
        id: "demographic-behavioral-segmentation",
        title: "Demographic and Behavioral Segmentation (by Country)",
        type: "pie",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
        filters: {
          type: "country",
          options: ["USA", "Germany", "India", "Brazil", "China"],
          default: "USA",
        },
        allSeries: {
          USA: {
            series: [20, 35, 25, 20],
            options: {
              colors: ["#FF6347", "#4CAF50", "#FFD700", "#00BFFF"],
            },
          },
          Germany: {
            series: [18, 40, 20, 12],
            options: {
              colors: ["#FF6347", "#4CAF50", "#FFD700", "#00BFFF"],
            },
          },
          India: {
            series: [55, 69, 5, 13],
            options: {
              colors: ["#FF6347", "#4CAF50", "#FFD700", "#00BFFF"],
            },
          },
          Brazil: {
            series: [11, 16, 8, 55],
            options: {
              colors: ["#FF6347", "#4CAF50", "#FFD700", "#00BFFF"],
            },
          },
          China: {
            series: [4, 17, 20, 57],
            options: {
              colors: ["#FF6347", "#4CAF50", "#FFD700", "#00BFFF"],
            },
          },
        },
        series: [20, 35, 25, 20],
        options: {
          labels: [
            "Age Group 18-25",
            "Age Group 26-40",
            "Age Group 41-60",
            "Age Group 60+",
          ],
          colors: ["#FF6347", "#4CAF50", "#FFD700", "#00BFFF"],
        },
      },
      {
        id: "customer-satisfaction-index",
        title: "Customer Satisfaction Index (Post-purchase experience)",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
        filters: {
          type: "time",
          options: ["Q1", "Q2", "Q3", "Q4"],
          default: "Q1",
        },
        allSeries: {
          Q1: {
            series: [
              {
                name: "Satisfaction Index",
                data: [80, 85, 90, 87],
              },
            ],
            options: {
              colors: ["#FF9800"],
              fill: "gradient",
            },
          },
          Q2: {
            series: [
              {
                name: "Satisfaction Index",
                data: [78, 83, 88, 85],
              },
            ],
            options: {
              colors: ["#FF9800"],
              fill: "gradient",
            },
          },
          Q3: {
            series: [
              {
                name: "Satisfaction Index",
                data: [55, 38, 78, 35],
              },
            ],
            options: {
              colors: ["#FF9800"],
              fill: "gradient",
            },
          },
          Q4: {
            series: [
              {
                name: "Satisfaction Index",
                data: [68, 53, 28, 75],
              },
            ],
            options: {
              colors: ["#FF9800"],
              fill: "gradient",
            },
          },
        },
        series: [
          {
            name: "Satisfaction Index",
            data: [80, 85, 90, 87],
          },
        ],
        options: {
          colors: ["#FF9800"],
          fill: "gradient",
          xaxis: {
            categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
          },
        },
      },
    ],
    "Sustainability & Regulatory Compliance": [
      {
        id: "co2-emissions-per-unit",
        title: "CO2 Emissions per Unit Produced (Carbon Footprint)",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        filters: {
          type: "time",
          options: ["Q1", "Q2", "Q3", "Q4"],
          default: "Q1",
        },
        allSeries: {
          Q1: {
            series: [
              {
                name: "CO2 Emissions per Unit",
                data: [120, 115, 118, 110],
              },
            ],
          },
          Q2: {
            series: [
              {
                name: "CO2 Emissions per Unit",
                data: [122, 117, 120, 112],
              },
            ],
          },
        },
        series: [
          {
            name: "CO2 Emissions per Unit",
            data: [120, 115, 118, 110],
          },
        ],
        options: {
          colors: ["#4CAF50"],
          fill: "gradient",
          xaxis: {
            categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
          },
        },
      },
      {
        id: "sustainable-sourcing-percentage",
        title: "Sustainable Sourcing Percentage",
        type: "pie",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        filters: {
          type: "country",
          options: ["USA", "Germany", "India", "China"],
          default: "USA",
        },
        allSeries: {
          USA: {
            series: [70, 30],
            options: {
              colors: ["#4CAF50", "#FF6347"],
            },
          },
          Germany: {
            series: [80, 20],
            options: {
              colors: ["#4CAF50", "#FF6347"],
            },
          },
          India: {
            series: [66, 34],
            options: {
              colors: ["#4CAF50", "#FF6347"],
            },
          },
          China: {
            series: [55, 45],
            options: {
              colors: ["#4CAF50", "#FF6347"],
            },
          },
        },
        series: [
          {
            name: "Sustainable Sourcing",
            data: [70],
          },
          {
            name: "Non-Sustainable Sourcing",
            data: [30],
          },
        ],
        options: {
          legend:{
            position:"bottom",
          },
          colors: ["#4CAF50", "#FF6347"],
          labels: ["Sustainable Sourcing", "Non-Sustainable Sourcing"],
        },
      },
      {
        id: "recycling-rate-of-packaging",
        title: "Recycling Rate of Packaging Materials",
        type: "area",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        filters: {
          type: "time",
          options: ["Q1", "Q2", "Q3", "Q4"],
          default: "Q1",
        },
        allSeries: {
          Q1: {
            series: [
              {
                name: "Recycling Rate",
                data: [50, 55, 60, 58],
              },
            ],
          },
          Q2: {
            series: [
              {
                name: "Recycling Rate",
                data: [52, 57, 63, 61],
              },
            ],
          },
          Q3: {
            series: [
              {
                name: "Recycling Rate",
                data: [65, 22, 18, 36],
              },
            ],
          },
          Q4: {
            series: [
              {
                name: "Recycling Rate",
                data: [57, 55, 15, 35],
              },
            ],
          },
        },
        series: [
          {
            name: "Recycling Rate",
            data: [50, 55, 60, 58],
          },
        ],
        options: {
          chart: {
            type: "area",
          },
          colors: ["#2196F3"],
          xaxis: {
            categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
          },
        },
      },

      {
        id: "water-usage-efficiency",
        title: "Water Usage Efficiency (per product produced)",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
        filters: {
          type: "country",
          options: ["USA", "Germany", "India", "China"],
          default: "USA",
        },
        allSeries: {
          USA: {
            series: [
              {
                name: "Water Usage per Unit",
                data: [12, 14, 13, 15],
              },
            ],
            options: {
              colors: ["#4CAF50"],
            },
          },
          Germany: {
            series: [
              {
                name: "Water Usage per Unit",
                data: [10, 12, 11, 13],
              },
            ],
            options: {
              colors: ["#4CAF50"],
            },
          },
        },
        series: [
          {
            name: "Water Usage per Unit",
            data: [12, 14, 13, 15],
          },
        ],
        options: {
          colors: ["#4CAF50"],
          xaxis: {
            categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
          },
        },
      },
      {
        id: "regulatory-compliance-score",
        title: "Regulatory Compliance Score (by country and region)",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-3",
        filters: {
          type: "region",
          options: ["Region", "Country"],
          default: "Region",
        },
        allSeries: {
          "Region": {
            series: [
              {
                name: "Compliance Score",
                data: [95, 55, 87, 54],
              },
            ],
            options: {
              colors: ["#FF9800"],
              xaxis: {
                categories: ["North America", "Europe", "Asia", "Africa"],
              },
            },
          },
          Country: {
            series: [
              {
                name: "Compliance Score",
                data: [88, 87, 56, 51, 77, 58, 68, 12, 54],
              },
            ],
            options: {
              colors: ["#FF9800"],
              xaxis: {
                categories:  ["USA", "Germany", "India", "China", "United States",

                  
                  "Brazil",
                  
                  
                  "Japan",
                  
                  "South Africa",
                  
                  "Australia"],
              },
             
            },
          },
        },
        series: [
          {
            name: "Compliance Score",
            data: [95],
          },
        ],
        options: {
          colors: ["#FF9800"],
          xaxis: {
            categories: ["North America", "Europe", "Asia", "Africa"],
          },
          horizontal: true,
        },
      },
      {
        id: "sustainability-investments-roi",
        title: "Sustainability Investments ROI",
        type: "line",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-2",
        filters: {
          type: "time",
          options: ["Q1", "Q2", "Q3", "Q4"],
          default: "Q1",
        },
        allSeries: {
          Q1: {
            series: [
              {
                name: "ROI",
                data: [10, 12, 15, 18],
              },
            ],
          },
          Q2: {
            series: [
              {
                name: "ROI",
                data: [11, 14, 16, 20],
              },
            ],
          },
          Q3: {
            series: [
              {
                name: "ROI",
                data: [ 16, 20, 11, 14,],
              },
            ],
          },
          Q4: {
            series: [
              {
                name: "ROI",
                data: [14, 16,11, 20],
              },
            ],
          },
        },
        series: [
          {
            name: "ROI",
            data: [10, 12, 15, 18],
          },
        ],
        options: {
          chart: {
            type: "line",
          },
          markers:{
            size:5
          },
          colors: ["#2196F3"],
          xaxis: {
            categories: ["Q1", "Q2", "Q3", "Q4"],
          },
        },
      },
      {
        id: "compliance-breaches",
        title: "Compliance Breaches (e.g., environmental, labor)",
        type: "bar",
        height: "300",
        className: "bg-white rounded-xl p-4 shadow lg:col-span-4",
        filters: {
          type: "country",
          options: ["All", "Environmental", "Labor"],
          default: "All",
        },
        allSeries: {
          All: {
            series: [
              {
                name: "Environmental Breaches",
                data: [3, 8, 4, 7],
              },
              {
                name: "Labor Breaches",
                data: [1, 5, 2, 7],
              },
            ],
            options: {
              colors: ["#FF9800", "#FF5722"],
            },
          },
          Environmental: {
            series: [
              {
                name: "Environmental Breaches",
                data: [2, 7, 3, 4],
              },
            ],
            options: {
              colors: ["#FF9800", "#FF5722"],
            },
          },
          Labor: {
            series: [
              {
                name: "Labor Breaches",
                data: [5, 2, 4, 6],
              },
            ],
            options: {
              colors: ["#FF9800", "#FF5722"],
            },
          },
        },
        series: [
          {
            name: "Environmental Breaches",
            data: [3, 8, 7, 2],
          },
          {
            name: "Labor Breaches",
            data: [1, 8, 7, 3],
          },
        ],
        options: {
          colors: ["#FF9800", "#FF5722"],
          xaxis: {
            categories: ["USA", "Germany", "India", "China"],
          },
        },
      },
    ],
  },
};
