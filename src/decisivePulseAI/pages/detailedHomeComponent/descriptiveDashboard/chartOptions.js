import dayjs from "dayjs";
import { chartDataFormatter } from "../../../../utils/static_func";
const generateData = (count, range) => {
    let data = [];
    for (let i = 0; i < count; i++) {
      data.push(Math.floor(Math.random() * (range.max - range.min + 1)) + range.min);
    }
    return data;
  };

export const getChartOptions = (data, xKey, yKey, chartType, options, title, handleClick) => {
  const detectAxisType = (data, key) => {
    return data.every((item) => isNumeric(item[key])) ? "value" : "category";
  };
  const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);
  const isDate = (value) =>
    dayjs(
      value,
      ["YYYY-MM-DD", "MM/DD/YYYY", "DD-MM-YYYY", "YYYY/MM/DD", "MMM D, YYYY"],
      true
    ).isValid();

  if (!data || data.length === 0) return {};
  const xAxisType = detectAxisType(data, xKey);

  let chartsData = sortChartData(data);
  const series = yKey.map((key, ind)=>{
    const tempSeries = {}
    tempSeries['name'] = key.name
    if(chartType==="bubble"){
      tempSeries['data'] = chartsData?.[ind]?.map((item, i) => {
       return { x:item.x, y:item.y, z:item.z||10}
      })
      return tempSeries
    }else{
      tempSeries['data'] = chartsData?.[ind]?.map((item) => item.y)
      if(key.type) tempSeries['type'] = key.type
      return tempSeries
    }
  })
  const minYValue = undefined

  // Define gradient colors
  const gradientColors = [
    "#006064",
    "#087F8C",
    "#00ACC1",
    "#FFB400",
    "#16262E",
    "#4A4A4A",
    "#878787",
    "#EFEFEF",
    "#FFFFFF",
    "#BAB0AC",
  ];

  // Common chart configurations
  const commonOptions = {
    // grid: { left: "15%", right: "5%", top: "5%", bottom: "0%" },
    ...options,
    tooltip: {
      shared: false,
      intersect: false,
      ...options?.tooltip,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y
            // return y.toFixed(0)
          }
          return y;
    
        }
      }
    },
    labels:chartsData?.[0]?.map((item) => item.x),
    chart: { 
      height: "100%", // Fixed height
      width: "100%", // Fixed or responsive width
        animations: {
            enabled: false,
          },
          background: "#fff",
          dropShadow: {
            enabled: true,
            top: 0,
            left: 2,
            blur: 1,
            color: "#000000",
          },
          toolbar: {
            show: true,
            tools: {
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true,
            },
          },
          zoom: {
            allowMouseWheelZoom: false,
          },
          ...options?.chart,
          events: {
            dataPointSelection:(e,chart, option)=> handleClick(option,chartsData?.[0]?.map((item) => item.x), xKey),
          },
    }, 
    responsive: [],
    // title:{
    //   text:title,
    //   ...options?.title
    // }
   
  };
  switch (chartType) {
    case "bar":
      return {
        series: series,
        options: {
          stroke: {
            width: 1,
          },
          dataLabels:{
            enabled:true
          },
          legend: {
            show: false,
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            shared: true,
            intersect: false,
          },
          ...commonOptions,
          chart: {
            ...commonOptions.chart,
            type: 'bar',
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: { position: "top" },
              horizontal: true,
              borderRadiusApplication: 'end', // 'around', 'end'
              borderRadiusWhenStacked: 'last', // 'all', 'last'
              dataLabels: {
                total: {
                  enabled: false,
                  offsetX: 0,
                  style: {
                    fontSize: '13px',
                    fontWeight: 900
                  }
                }
              },
              distributed: true,
              ...commonOptions?.plotOptions?.bar,
            },
          },
          
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                show: false,
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          labels:commonOptions.labels,
          
          

        },
        type:"bar"
      };
    case "grouped-bar":
      return {
        series: series,
        options: {
          stroke: {
            width: 1,
          },
          dataLabels:{
            enabled:true
          },
          legend: {
            show: false,
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            shared: true,
            intersect: false,
          },
          ...commonOptions,
          chart: {
            ...commonOptions.chart,
            type: 'bar',
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: { position: "top" },
              horizontal: true,
              borderRadiusApplication: 'end', // 'around', 'end'
              borderRadiusWhenStacked: 'last', // 'all', 'last'
              dataLabels: {
                total: {
                  enabled: false,
                  offsetX: 0,
                  style: {
                    fontSize: '13px',
                    fontWeight: 900
                  }
                }
              },
              distributed: true,
              ...commonOptions?.plotOptions?.bar,
            },
          },
          
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                show: false,
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          labels:commonOptions.labels,
          
          

        },
        type:"bar"
      };
    case "stacked-bar":
      return {
        series: series,
        options: {
          stroke: {
            width: 1,
          },
          legend: {
            show:false,
          },
          fill: {
            opacity: 1
          },
          ...commonOptions,
          tooltip: {
            y: {
              formatter: function (val) {
                return val
              }
            },
            ...commonOptions.tooltip,
          },
          chart: {
            ...commonOptions.chart,
            type: 'bar',
            stacked: true,
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: { position: "top" },
              horizontal: true,
              borderRadiusApplication: 'end', // 'around', 'end'
              borderRadiusWhenStacked: 'last', // 'all', 'last'
              dataLabels: {
                total: {
                  enabled: false,
                  offsetX: 0,
                  style: {
                    fontSize: '13px',
                    fontWeight: 900
                  }
                }
              },
              distributed: true,
              ...commonOptions?.plotOptions?.bar,
            },
          },
         
          xaxis: {
            categories: commonOptions.labels,
            labels: {
              formatter: function (val) {
                return val
              }
            }
          },
          yaxis: {
            title: {
              text: undefined
            },
          },
          
         
          
        },
          type:"bar"
      };
    
    case "stacked-bar-100":
      return {
        series: series,
        options: {
          legend: {
            show:false,
          },
          stroke: {
            width: 1,
          },
          fill: {
            opacity: 1
          },
         
          ...commonOptions,
          tooltip: {
            y: {
              formatter: function (val) {
                return val
              }
            },
            ...commonOptions.tooltip,
          },
          chart: {
            ...commonOptions.chart,
            type: 'bar',
            height: 350,
            stacked: true,
            stackType:'100%'
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: { position: "top" },
              horizontal: true,
              borderRadiusApplication: 'end', // 'around', 'end'
              borderRadiusWhenStacked: 'last', // 'all', 'last'
              dataLabels: {
                total: {
                  enabled: false,
                  offsetX: 0,
                  style: {
                    fontSize: '13px',
                    fontWeight: 900
                  }
                }
              },
              distributed: true,
              ...commonOptions?.plotOptions?.bar,
            },
          },
         
          xaxis: {
            categories: commonOptions.labels,
            labels: {
              formatter: function (val) {
                return val
              }
            }
          },
          yaxis: {
            title: {
              text: undefined
            },
          },
         
         
        },
          type:"bar"
      };

      
    case "column":
      return {
        series: series,
        options: {
          stroke: {
            width: 1,
            colors: ['#fff']
          },
          dataLabels:{
            enabled:true
          },
          legend: {
            show: false,
          },
          fill: {
            opacity: 1
          },
          ...commonOptions,
          tooltip: {
            shared: true,
            intersect: false,
            ...commonOptions.tooltip,
          },
          chart: {
            ...commonOptions.chart,
            type: 'bar',
            height: 350,
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              horizontal: false,
              borderRadiusApplication: 'end', // 'around', 'end'
              borderRadiusWhenStacked: 'last', // 'all', 'last'
              distributed: true,
              ...commonOptions?.plotOptions?.bar,
              dataLabels: {
                position:"center",
                total: {
                  enabled: true,
                  offsetX: 0,
                  style: {
                    fontSize: '13px',
                    fontWeight: 900
                  }
                },
                ...commonOptions?.plotOptions?.bar?.dataLabels,
              }

            },
          },
         
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                show: false,
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
         
          labels:commonOptions.labels,
          
          

        },
        type:"bar"
      };    
    case "column-stacked":
      return {
        series: series,
        options: {
          legend: {
            show:false,
          },
          stroke: {
            width: 1,
            colors: ['#fff']
          },
          fill: {
            opacity: 1
          },
          ...commonOptions,
          chart: {
            ...commonOptions.chart,
            type: 'bar',
            height: 350,
            stacked: true,
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: { position: "top" },
              horizontal: false,
              borderRadiusApplication: 'end', // 'around', 'end'
              borderRadiusWhenStacked: 'last', // 'all', 'last'
              dataLabels: {
                total: {
                  enabled: false,
                  offsetX: 0,
                  style: {
                    fontSize: '13px',
                    fontWeight: 900
                  }
                }
              },
              distributed: true,
              ...commonOptions?.plotOptions?.bar,
            },
          },
         
          xaxis: {
            categories: commonOptions.labels,
            labels: {
              formatter: function (val) {
                return val
              }
            }
          },
          yaxis: {
            title: {
              text: undefined
            },
          },
         
          
          
        },
          type:"bar"
      };
    case "column-stacked-100":
      return {
        series: series,
        options: {
          legend: {
            show:false,
          },
          stroke: {
            width: 1,
            colors: ['#fff']
          },
          fill: {
            opacity: 1
          },
          ...commonOptions,
          chart: {
            ...commonOptions.chart,
            type: 'bar',
            height: 350,
            stacked: true,
            stackType:'100%'
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: { position: "top" },
              horizontal: false,
              borderRadiusApplication: 'end', // 'around', 'end'
              borderRadiusWhenStacked: 'last', // 'all', 'last'
              dataLabels: {
                total: {
                  enabled: false,
                  offsetX: 0,
                  style: {
                    fontSize: '13px',
                    fontWeight: 900
                  }
                }
              },
              distributed: true,
              ...commonOptions?.plotOptions?.bar,
            },
          },

          xaxis: {
            categories: commonOptions.labels,
            labels: {
              formatter: function (val) {
                return val
              }
            }
          },
          yaxis: {
            title: {
              text: undefined
            },
          },
          
         
         
        },
          type:"bar"
      };
    

    case "line":
      return {
        series: series,
        
        options: {
          markers: {
            size: 2
          },
          stroke: {
            curve: 'straight'
          },
          legend:{
            show: false,
          },
          ...commonOptions,
          chart: {
            ...commonOptions.chart,
            type: "line",
        },
          yaxis: {
            min: minYValue,
        },
       
       
          colors: chartsData.map(
            (item, index) => gradientColors[index % gradientColors.length]
          ), // Color based on index
        },
        type: "line",
      };
    case "smooth-line":
      return {
        series: series,
        options: {
          markers: {
            size: 1
          },
          stroke: {
            curve: 'smooth'
          },
          legend:{
            show: false,
          },
          dataLabels: {
            enabled: true,
          },
          ...commonOptions,
          chart: {
            ...commonOptions.chart,
            type: "line",
            dropShadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.5
            },
        },
        
       
       
          yaxis: {
            min: minYValue,
        },
          colors: chartsData.map(
            (item, index) => gradientColors[index % gradientColors.length]
          ), // Color based on index
        },
        type: "line",
      };  
    case "area":
      return {
        series: series,
          type: "area",
        options: {
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          legend:{
            show: false,
          },
          ...commonOptions,
          chart: {
            type: "area",
            ...commonOptions.chart,
          },
          yaxis: {
            min: minYValue,
            labels: {
                //   formatter: chartDataFormatter,
                style: {
                  whiteSpace: "normal", // Allow text to wrap in the label
                  wordBreak: "break-word", // Break long words and wrap them
                  fontSize: 11,
                  fontWeight: 300,
                },
                trim: true,
                rotate: 0,
                rotateAlways: false,
              },
          },
         
          
          fill: {
            type: "gradient",
            ...commonOptions?.fill,
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.5,
              ...commonOptions?.fill?.gradient
            },
          },
         
        },
      };
    
    case "funnel":
      return {
        series: series,
        options: {
          colors: gradientColors,
          legend: {
            show: false,
          },
          ...commonOptions,
          chart: {
            ...commonOptions.chart,
            type: 'bar',
            height: 350,
            dropShadow: {
              enabled: true,
            },
          },
          plotOptions: {
            bar: {
              borderRadius: 2,
              distributed: true,
              barHeight: '80%',
              ...commonOptions?.plotOptions?.bar,
              horizontal: true,
              isFunnel: true,
            },
          },
         
          dataLabels: {
            enabled: true,
            formatter: function (val, opt) {
              return opt.w.globals.labels[opt.dataPointIndex] 
            },
            dropShadow: {
              enabled: true,
            },
            ...commonOptions?.dataLabels
          },
          xaxis: {
            categories: commonOptions.labels,
          },
         
        },
          type:"bar"
      };
    


    case "pie":
      return {
        type: "pie",
        series: chartsData[0].map((item) => item.y),
        options: {
          fill: {
            type: 'gradient',
          },
          ...commonOptions,
          chart: {
            ...commonOptions.chart,
            width: 380,
            type: 'pie',
          },
          labels: chartsData[0].map((item) => item.x),
        },
      };
    case "donut":
      return {
        type: "donut",
        series: chartsData[0].map((item) => item.y),
        options: {
          chart: {
            ...commonOptions.chart,
            width: 380,
            type: 'donut',
          },
          labels: chartsData[0].map((item) => item.x),
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }],
          fill: {
            type: 'gradient',
          },
          ...commonOptions,
        },
      };


    case "polar-area":
      return {
        series: chartsData[0].map((item) => item.y),
        options: {
          chart: {
            ...commonOptions.chart,
            type: 'polarArea',
          },
          stroke: {
            colors: ['#fff']
          },
          fill: {
            type: 'gradient',
            opacity: 0.8
          },
          ...commonOptions,
          
          labels: chartsData[0].map((item) => item.x),
        },
          type:"polarArea"
      };
    case "radialBar":
      return {
        series: chartsData[0].map((item) => item.y),
            options: {
              chart: {
                ...commonOptions.chart,
                height: 350,
                type: 'radialBar',
              },
              ...commonOptions,
              plotOptions: {
                radialBar: {
                  offsetY: 0,
                  startAngle: 0,
                  endAngle: 270,
                  ...commonOptions?.plotOptions?.radialBar,
                  hollow: {
                    margin: 5,
                    size: '30%',
                    background: 'transparent',
                    image: undefined,
                  },
                  dataLabels: {
                    name: {
                      show: false,
                    },
                    value: {
                      show: false,
                    }
                  },
                  barLabels: {
                    enabled: true,
                    useSeriesColors: true,
                    offsetX: -8,
                    fontSize: '16px',
                    formatter: function(seriesName, opts) {
                      return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                    },
                  },
                },
                colors: gradientColors,
              },
              labels: chartsData[0].map((item) => item.x),
            },
          type:"radialBar"
      };
    case "radar":
      return {
        series: series,
        options: {
          stroke: {
            width: 2
          },
          fill: {
            opacity: 0.1
          },
          markers: {
            size: 0
          },
          ...commonOptions,
          chart: {
            ...commonOptions.chart,
            height: 350,
            type: 'radar',
            dropShadow: {
              enabled: true,
              blur: 1,
              left: 1,
              top: 1
            }
          },

          yaxis: {
            stepSize: 20
          },
          xaxis: {
            categories: commonOptions.labels
          }
        },
          type:"radar"
      };

    case "scatter":
      return {
        series: series,
        type: "scatter",
        options: {
          markers: {
            size: 6,
          },
          ...commonOptions,
          chart: {
            ...commonOptions.chart,
            type: "scatter",
          },
          yaxis: {
            min: minYValue,
          },
         
        },
      };
    case "bubble":
      return {
        series:series,
        options: {
          dataLabels: {
            enabled: false
          },
           fill: {
            type: 'gradient',
          },
          ...commonOptions,
          chart: {
            ...commonOptions.chart,
              type: 'bubble',
          },
          
         
          xaxis: {
              type: 'category',
          },
           labels:commonOptions.labels,
          theme: {
            palette: 'palette2'
          },
         
          markers: {
            size: 6,
          },
          ...commonOptions,
          chart: {
            ...commonOptions.chart,
            type: "bubble",
          },
          yaxis: {
            min: minYValue,
          },
        },
        type: "bubble",
      };
    
   
    case "heatmap":
      return {
        series: [{
            name: 'Metric1',
            data: generateData(18, {
              min: 0,
              max: 90
            })
          },
          {
            name: 'Metric2',
            data: generateData(18, {
              min: 0,
              max: 90
            })
          },
          {
            name: 'Metric3',
            data: generateData(18, {
              min: 0,
              max: 90
            })
          },
          {
            name: 'Metric4',
            data: generateData(18, {
              min: 0,
              max: 90
            })
          },
          {
            name: 'Metric5',
            data: generateData(18, {
              min: 0,
              max: 90
            })
          },
          {
            name: 'Metric6',
            data: generateData(18, {
              min: 0,
              max: 90
            })
          },
          {
            name: 'Metric7',
            data: generateData(18, {
              min: 0,
              max: 90
            })
          },
          {
            name: 'Metric8',
            data: generateData(18, {
              min: 0,
              max: 90
            })
          },
          {
            name: 'Metric9',
            data: generateData(18, {
              min: 0,
              max: 90
            })
          }
          ],
          options: {
            chart: {
              ...commonOptions.chart,
              height: 350,
              type: 'heatmap',
            },
            dataLabels: {
              enabled: true
            },
            colors: ["#008FFB"],
           ...commonOptions
          },
          type:"heatmap"
      };
    case "treemap":
      return {
        series: [
            {
              data: [
                {
                  x: 'INTC',
                  y: 1.2
                },
                {
                  x: 'GS',
                  y: 0.4
                },
                {
                  x: 'CVX',
                  y: -1.4
                },
                {
                  x: 'GE',
                  y: 2.7
                },
                {
                  x: 'CAT',
                  y: -0.3
                },
                {
                  x: 'RTX',
                  y: 5.1
                },
                {
                  x: 'CSCO',
                  y: -2.3
                },
                {
                  x: 'JNJ',
                  y: 2.1
                },
                {
                  x: 'PG',
                  y: 0.3
                },
                {
                  x: 'TRV',
                  y: 0.12
                },
                {
                  x: 'MMM',
                  y: -2.31
                },
                {
                  x: 'NKE',
                  y: 3.98
                },
                {
                  x: 'IYT',
                  y: 1.67
                }
              ]
            }
          ],
          options: {
            legend: {
              show: false
            },
            chart: {
              ...commonOptions?.chart,
              type: 'treemap'
            },
            ...commonOptions,
            dataLabels: {
              enabled: true,
              style: {
                fontSize: '12px',
              },
              offsetY: -4,
              ...commonOptions?.dataLabels,
              formatter: function(text, op) {
                return [text, op.value]
              },
            },
            plotOptions: {
              treemap: {
                enableShades: true,
                shadeIntensity: 0.5,
                reverseNegativeShade: true,
                colorScale: {
                  ranges: [
                    {
                      from: -6,
                      to: 0,
                      color: '#CD363A'
                    },
                    {
                      from: 0.001,
                      to: 6,
                      color: '#52B12C'
                    }
                  ]
                }
              }
            }
          },
          type:"treemap"
      };
    
 
    case "slope":
      return {
          series: [
              {
                name: 'Blue',
                data: [
                  {
                    x: 'Category 1',
                    y: 503,
                  },
                  {
                    x: 'Category 2',
                    y: 580,
                  },
                  {
                    x: 'Category 3',
                    y: 135,
                  },
                ],
              },
              {
                name: 'Green',
                data: [
                  {
                    x: 'Category 1',
                    y: 733,
                  },
                  {
                    x: 'Category 2',
                    y: 385,
                  },
                  {
                    x: 'Category 3',
                    y: 715,
                  },
                ],
              },
              {
                name: 'Orange',
                data: [
                  {
                    x: 'Category 1',
                    y: 255,
                  },
                  {
                    x: 'Category 2',
                    y: 211,
                  },
                  {
                    x: 'Category 3',
                    y: 441,
                  },
                ],
              },
              {
                name: 'Red',
                data: [
                  {
                    x: 'Category 1',
                    y: 428,
                  },
                  {
                    x: 'Category 2',
                    y: 749,
                  },
                  {
                    x: 'Category 3',
                    y: 559,
                  },
                ],
              },
            ],
            options: {
              chart: {
                ...commonOptions.chart,
                height: 350,
                width: 600,
                type: 'line',
              },
              plotOptions: {
                line: {
                  isSlopeChart: true,
                },
              },
              tooltip: {
                followCursor: true,
                intersect: false,
                shared: true,
              },
              dataLabels: {
                background: {
                  enabled: true,
                },
                formatter(val, opts) {
                  const seriesName = opts.w.config.series[opts.seriesIndex].name
                  return val !== null ? seriesName : ''
                },
              },
              yaxis: {
                show: true,
                labels: {
                  show: true,
                },
              },
              xaxis: {
                position: 'bottom',
              },
              legend: {
                show: false,
                position: 'bottom',
                horizontalAlign: 'center',
              },
              stroke: {
                width: [2, 3, 4, 2],
                dashArray: [0, 0, 5, 2],
                curve: 'smooth',
              }
            },
          type:"line"
      };
    
    case "lineBar":
      return {
        series: series,
        options: {
          dataLabels: {
            enabled: false,
          },
          ...commonOptions,
          chart: {
            ...commonOptions.chart,
            height: 350,
            type: 'line',
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: { position: "top" },
              borderRadiusApplication: 'end',
              borderRadiusWhenStacked: 'last',
              ...commonOptions?.plotOptions?.bar,
              horizontal: false,
            },
          },
          stroke: {
            width: [0, 4], // Specify 0 for bar and 4 for line
            colors: ['#000', '#00f'] // Black for bar, blue for line
          },
         
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                show: false,
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          tooltip: {
            shared: false,
            intersect: false,
          },
          labels: commonOptions.labels,
          fill: {
            opacity: 1
          },
          colors: ['#888', '#00f'], // Color for bar and line respectively
        },
        type:"line"
      };
    default:
      return {
        series: series,
        options: {
          ...commonOptions,
          chart: {
            ...commonOptions.chart,
            type: chartType,
          },
          yaxis: {
            min: minYValue,
          },
          colors: chartsData.map(
            (item, index) => gradientColors[index % gradientColors.length]
          ), // Color based on index
        },
      };
  }
};
function sortChartData(data) {
  return data.map(dataset => {
      // Check if all x values are numbers
      const isNumeric = dataset.every(item => typeof +item.x === 'number');

      // If numeric, sort by x in ascending order; otherwise, return as is
      return isNumeric ? dataset.slice().sort((a, b) => a.x - b.x ) : dataset;
  });
}

const getSeries = (yKey, chartType, chartsData)=>{
  const sortedChartData = sortChartData(chartsData)
  const pieChartType = ["pie", "radialBar", "donut", "polar-area"]
  if(pieChartType.includes(chartType?.toLowerCase())){
    return sortedChartData[0].map((item) => +item.y)
  }  
  else{
    const series = yKey.map((key, ind)=>{
      const tempSeries = {}
      tempSeries['name'] = key.name
      if(chartType==="bubble"){
        tempSeries['data'] = sortedChartData?.[ind]?.map((item, i) => {
         return { x:item.x, y:item.y, z:item.z||10}
        })
        return tempSeries
      }
      else if(chartType?.toLowerCase()==="treemap"){
        tempSeries['data'] = sortedChartData?.[ind]?.map((item, i) => {
          return {x:item.x, y:item.y}
         })
         return tempSeries
      }
      else{
        tempSeries['data'] = sortedChartData?.[ind]?.map((item) => item.y)
        if(key.type) tempSeries['type'] = key.type
        return tempSeries
      }
    })
    // console.log(series)
    return series
  }
}

const getSeriesAnomaly = (yKey, chartType, chartsData)=>{
  const pieChartType = ["pie", "radialBar", "donut", "polar-area"]
  if(pieChartType.includes(chartType)){
    return chartsData[0].map((item) => item.y)
  }else{
    const series = yKey.map((key, ind)=>{
      const tempSeries = {}
      tempSeries['name'] = key.name
      if(chartType==="bubble"){
        tempSeries['data'] = chartsData?.[ind]?.map((item, i) => {
         return { x:item.x, y:item.y, z:item.z||10}
        })
        return tempSeries
      }
      else{
        tempSeries['data'] = chartsData?.[ind]?.map((item) => item.y)
        if(key.type) tempSeries['type'] = key.type
        return tempSeries
      }
    })
    return series
  }
}

// for anomaly currently different func but need to create a single function for different tabs 
const getChartOptionsAnomaly = (data, xKey, yKey, chartType) => {
  const detectAxisType = (data, key) => {
    return data.every((item) => isNumeric(item[key])) ? "value" : "category";
  };
  const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);
  const isDate = (value) =>
    dayjs(
      value,
      ["YYYY-MM-DD", "MM/DD/YYYY", "DD-MM-YYYY", "YYYY/MM/DD", "MMM D, YYYY"],
      true
    ).isValid();


  let chartData = sortChartData(data);

  // const series = yKey.map((key, ind)=>{
  //   const tempSeries = {}
  //   tempSeries['name'] = key.name
  //   if(chartType==="bubble"){
  //     tempSeries['data'] = chartData?.[ind]?.map((item, i) => {
  //      return { x:item.x, y:item.y, z:item.z||10}
  //     })
  //     return tempSeries
  //   }else{
  //     tempSeries['data'] = chartData?.[ind]?.map((item) => item.y)
  //     if(key.type) tempSeries['type'] = key.type
  //     return tempSeries
  //   }
  // })
  const series = getSeries(yKey, chartType, data)
  // if (data.length > 0) {
  //   const isDateKey = isDate(data?.[0]?.[xKey]); // Check if xKey is a date

  //   if (isDateKey) {
  //     const sortedData = data
  //       .map((item) => ({
  //         x: item[xKey],
  //         y: isNumeric(item[yKey]) ? item[yKey] : 0,
  //       }))
  //       .sort((a, b) => new Date(b.x) - new Date(a.x)); // Sort by date descending

  //     const partSize = Math.ceil(sortedData.length / 5);

  //     for (let i = 0; i < sortedData.length; i += partSize) {
  //       chartData.push(sortedData[i]); // Take the first element from each part
  //       if (chartData.length >= 5) break; // Limit to top 5
  //     }
  //   } else {
  //     chartData = Object.values(
  //       data.reduce((acc, item) => {
  //         const xVal = item[xKey];
  //         const yVal = isNumeric(item[yKey]) ? item[yKey] : 0;

  //         // If the group doesn't exist, create it
  //         if (!acc[xVal]) {
  //           acc[xVal] = { x: xVal, y: yVal };
  //         } else if (yVal > acc[xVal].y) {
  //           // Update if current yVal is greater than existing one
  //           acc[xVal] = { x: xVal, y: yVal };
  //         }

  //         return acc;
  //       }, {})
  //     )
  //       .sort((a, b) => b.y - a.y) // Sort by y value descending
  //       .slice(0, 5); // Take top 5
  //   }
  // }
  const minYValue = Math.round(
    Math.floor(Math.min(...chartData.map((item) => item.y)) / 1.1)
  );

  // Define gradient colors
  const gradientColors = [
    "#006064",
    "#087F8C",
    "#00ACC1",
    "#FFB400",
    "#16262E",
    "#4A4A4A",
    "#878787",
    "#EFEFEF",
    "#FFFFFF",
    "#BAB0AC",
  ];

  // Common chart configurations
  const commonOptions = {
    chart: { 
        animations: {
            enabled: false,
          },
          background: "#fff",
          dropShadow: {
            enabled: true,
            top: 0,
            left: 2,
            blur: 1,
            color: "#000000",
          },
          toolbar: {
            show: true,
            tools: {
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true,
            },
          },
          zoom: {
            allowMouseWheelZoom: true,
          },
    }, 
  };
  switch (chartType) {
    case "bar":
      return {
        series: series,
        type: "bar",
        options: {
          ...commonOptions,
          chart: {
            type: "bar",
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: { position: "top" },
              distributed: true,
            },
          },
          dataLabels: {
            enabled: false,
            formatter: (val) => val.toString(),
            offsetY: -20,
            style: {
              fontSize: "12px",
              colors: ["#304758"],
            },
          },
          xaxis: {
            categories: chartData[0].map((item) => item.x),
            labels: {
              //   formatter: chartDataFormatter,
              style: {
                whiteSpace: "normal", // Allow text to wrap in the label
                wordBreak: "break-word", // Break long words and wrap them
                fontSize: 11,
                fontWeight: 300,
              },
              trim: true,
              rotate: 0,
              rotateAlways: false,
            },
          },
         
          colors: gradientColors, // Color based on index
          legend: {
            position: "bottom",
            formatter: function (seriesName, opts) {
              // Truncate to 15 characters, add ellipsis if longer
              const maxLen = 8;
              return seriesName.length > maxLen
                ? seriesName.substring(0, maxLen) + "..."
                : seriesName;
            }
          },
        },
      };

    case "pie":
      return {
        series: series,
        type: "pie",
        options: {
          // ...commonOptions,
          chart: {
            // ...commonOptions.chart,
            type: "pie",
          },
          legend: {
            position: "bottom",
            formatter: function (seriesName, opts) {
              // Truncate to 15 characters, add ellipsis if longer
              const maxLen = 8;
              return seriesName.length > maxLen
                ? seriesName.substring(0, maxLen) + "..."
                : seriesName;
            }
          },
          labels: chartData[0].map((item) => item.x),
          // colors: gradientColors, // Color based on index
         
         
        },
      };

    case "scatter":
      return {
        series: series,
        type: "scatter",
        options: {
          ...commonOptions,
          chart: {
            ...commonOptions.chart,
            type: "scatter",
          },
          xaxis: {
            type: "category",
            categories: chartData[0].map((item) => item.x),
            labels: {
                //   formatter: chartDataFormatter,
                style: {
                  whiteSpace: "normal", // Allow text to wrap in the label
                  wordBreak: "break-word", // Break long words and wrap them
                  fontSize: 11,
                  fontWeight: 300,
                },
                trim: true,
                rotate: 0,
                rotateAlways: false,
              },
          },
          legend: {
            position: "bottom",
            formatter: function (seriesName, opts) {
              // Truncate to 15 characters, add ellipsis if longer
              const maxLen = 8;
              return seriesName.length > maxLen
                ? seriesName.substring(0, maxLen) + "..."
                : seriesName;
            }
          },
          markers: {
            size: 6,
            colors: gradientColors, // Color based on index
          },
        },
      };

    case "area":
      return {
        series: series,
          type: "area",
        options: {
          ...commonOptions,
          chart: {
            ...commonOptions.chart,
            type: "area",
          },
          xaxis: {
            categories: chartData[0].map((item) => item.x),
            labels: {
              //   formatter: chartDataFormatter,
            },
          },
          legend: {
            position: "bottom",
            formatter: function (seriesName, opts) {
              // Truncate to 15 characters, add ellipsis if longer
              const maxLen = 8;
              return seriesName.length > maxLen
                ? seriesName.substring(0, maxLen) + "..."
                : seriesName;
            }
          },
          yaxis: {
            labels: {
                //   formatter: chartDataFormatter,
                style: {
                  whiteSpace: "normal", // Allow text to wrap in the label
                  wordBreak: "break-word", // Break long words and wrap them
                  fontSize: 11,
                  fontWeight: 300,
                },
                trim: true,
                rotate: 0,
                rotateAlways: false,
              },
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.5,
            },
          },
          "colors": gradientColors,
        },
      };

    case "bubble":
      return {
        series: series,
        options: {
          ...commonOptions,
          chart: {
            ...commonOptions.chart,
            type: "bubble",
        },
        xaxis: {
            categories: chartData[0].map((item) => item.x),
            labels: {
                //   formatter: chartDataFormatter,
                style: {
                    whiteSpace: "normal", // Allow text to wrap in the label
                  wordBreak: "break-word", // Break long words and wrap them
                  fontSize: 11,
                  fontWeight: 300,
                },
                trim: true,
                rotate: 0,
                rotateAlways: false,
              },
            },
          tooltip: {
            custom: ({ series, seriesIndex, dataPointIndex }) => {
              const { z } = series[seriesIndex][dataPointIndex];
              return `<div>Size: ${z}</div>`;
            },
          },
          colors: gradientColors, // Color based on index
        },
        type: "bubble",
      };

    case "line":
      return {
        series: series,
        options: {
          ...commonOptions,
          chart: {
            ...commonOptions.chart,
            type: "line",
        },
        xaxis: {
            categories: chartData[0].map((item) => item.x),
            labels: {
                //   formatter: chartDataFormatter,
                style: {
                  whiteSpace: "normal", // Allow text to wrap in the label
                  wordBreak: "break-word", // Break long words and wrap them
                  fontSize: 11,
                  fontWeight: 300,
                },
                trim: true,
                rotate: 0,
                rotateAlways: false,
            },
          },
          legend: {
            position: "bottom",
            formatter: function (seriesName, opts) {
              // Truncate to 15 characters, add ellipsis if longer
              const maxLen = 8;
              return seriesName.length > maxLen
                ? seriesName.substring(0, maxLen) + "..."
                : seriesName;
            }
          },
          colors:gradientColors, // Color based on index
        },
        type: "line",
      };
    case "column-stacked":
      return {
        series: [{
            name: 'PRODUCT A',
            data: [44, 55, 41, 67, 22, 43]
          }, {
            name: 'PRODUCT B',
            data: [13, 23, 20, 8, 13, 27]
          }, {
            name: 'PRODUCT C',
            data: [11, 17, 15, 15, 21, 14]
          }, {
            name: 'PRODUCT D',
            data: [21, 7, 25, 13, 22, 8]
          }],
          options: {
            chart: {
              type: 'bar',
              height: 350,
              stacked: true,
              toolbar: {
                show: true
              },
              zoom: {
                enabled: true
              }
            },
            responsive: [{
              breakpoint: 480,
              options: {
                legend: {
                    show: false,
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0
                }
              }
            }],
            plotOptions: {
              bar: {
                horizontal: false,
                borderRadius: 10,
                borderRadiusApplication: 'end', // 'around', 'end'
                borderRadiusWhenStacked: 'last', // 'all', 'last'
                dataLabels: {
                  total: {
                    enabled: true,
                    style: {
                      fontSize: '13px',
                      fontWeight: 900
                    }
                  }
                }
              },
            },
            xaxis: {
              type: 'datetime',
              categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
                '01/05/2011 GMT', '01/06/2011 GMT'
              ],
            },
            legend: {
                show: false,
              position: 'right',
              offsetY: 40
            },
            fill: {
              opacity: 1
            }
          },
          type:"bar"
      };
    case "column":
      return {
        series: [{
            name: 'Net Profit',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
          }, {
            name: 'Revenue',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
          }, {
            name: 'Free Cash Flow',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
          }],
          options: {
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 5,
                borderRadiusApplication: 'end'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            },
            yaxis: {
              title: {
                text: '$ (thousands)'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return "$ " + val + " thousands"
                }
              }
            }
          },
          type:"bar"
      };
    case "column-stacked100":
      return {
        series: [{
            name: 'PRODUCT A',
            data: [44, 55, 41, 67, 22, 43, 21, 49]
          }, {
            name: 'PRODUCT B',
            data: [13, 23, 20, 8, 13, 27, 33, 12]
          }, {
            name: 'PRODUCT C',
            data: [11, 17, 15, 15, 21, 14, 15, 13]
          }],
          options: {
            chart: {
              type: 'bar',
              height: 350,
              stacked: true,
              stackType: '100%'
            },
            responsive: [{
              breakpoint: 480,
              options: {
                legend: {
                    show: false,
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0
                }
              }
            }],
            xaxis: {
              categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2',
                '2012 Q3', '2012 Q4'
              ],
            },
            fill: {
              opacity: 1
            },
            legend: {
                show: false,
              position: 'right',
              offsetX: 0,
              offsetY: 50
            },
          },
          type:"bar"
      };
    case "stacked-bar":
      return {
        series: [{
            name: 'PRODUCT A',
            data: [44, 55, 41, 67, 22, 43, 21, 49]
          }, {
            name: 'PRODUCT B',
            data: [13, 23, 20, 8, 13, 27, 33, 12]
          }, {
            name: 'PRODUCT C',
            data: [11, 17, 15, 15, 21, 14, 15, 13]
          }],
          options: {
            chart: {
              type: 'bar',
              height: 350,
              stacked: true,
              stackType: '100%'
            },
            responsive: [{
              breakpoint: 480,
              options: {
                legend: {
                    show: false,
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0
                }
              }
            }],
            xaxis: {
              categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2',
                '2012 Q3', '2012 Q4'
              ],
            },
            fill: {
              opacity: 1
            },
            legend: {
                show: false,
              position: 'right',
              offsetX: 0,
              offsetY: 50
            },
          },
          type:"bar"
      };
    case "heatmap":
      return {
        series: [{
            name: 'Metric1',
            data: generateData(18, {
              min: 0,
              max: 90
            })
          },
          {
            name: 'Metric2',
            data: generateData(18, {
              min: 0,
              max: 90
            })
          },
          {
            name: 'Metric3',
            data: generateData(18, {
              min: 0,
              max: 90
            })
          },
          {
            name: 'Metric4',
            data: generateData(18, {
              min: 0,
              max: 90
            })
          },
          {
            name: 'Metric5',
            data: generateData(18, {
              min: 0,
              max: 90
            })
          },
          {
            name: 'Metric6',
            data: generateData(18, {
              min: 0,
              max: 90
            })
          },
          {
            name: 'Metric7',
            data: generateData(18, {
              min: 0,
              max: 90
            })
          },
          {
            name: 'Metric8',
            data: generateData(18, {
              min: 0,
              max: 90
            })
          },
          {
            name: 'Metric9',
            data: generateData(18, {
              min: 0,
              max: 90
            })
          }
          ],
          options: {
            chart: {
              height: 350,
              type: 'heatmap',
            },
            dataLabels: {
              enabled: false
            },
            colors: ["#008FFB"],
           
          },
          type:"heatmap"
      };
    case "polar-area":
      return {
        series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
        options: {
          chart: {
            type: 'polarArea',
          },
          labels: chartData[0].map((item) => item.x),
          stroke: {
            colors: ['#fff']
          },
          fill: {
            opacity: 0.8
          },
        },
          type:"polarArea"
      };
    case "radialbar":
      return {
        series: [44, 55, 67, 83],
            options: {
              chart: {
                height: 350,
                type: 'radialBar',
              },
              plotOptions: {
                radialBar: {
                  dataLabels: {
                    name: {
                      fontSize: '22px',
                    },
                    value: {
                      fontSize: '16px',
                    },
                    total: {
                      show: true,
                      label: 'Total',
                      formatter: function (w) {
                        // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                        return 249
                      }
                    }
                  }
                }
              },
              labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
            },
          type:"radialBar"
      };
      case "treemap":
        return {
          series: [
              {
                data: [
                  {
                    x: 'INTC',
                    y: 1.2
                  },
                  {
                    x: 'GS',
                    y: 0.4
                  },
                  {
                    x: 'CVX',
                    y: -1.4
                  },
                  {
                    x: 'GE',
                    y: 2.7
                  },
                  {
                    x: 'CAT',
                    y: -0.3
                  },
                  {
                    x: 'RTX',
                    y: 5.1
                  },
                  {
                    x: 'CSCO',
                    y: -2.3
                  },
                  {
                    x: 'JNJ',
                    y: 2.1
                  },
                  {
                    x: 'PG',
                    y: 0.3
                  },
                  {
                    x: 'TRV',
                    y: 0.12
                  },
                  {
                    x: 'MMM',
                    y: -2.31
                  },
                  {
                    x: 'NKE',
                    y: 3.98
                  },
                  {
                    x: 'IYT',
                    y: 1.67
                  }
                ]
              }
            ],
            options: {
              legend: {
                show: false
              },
              chart: {
                height: 350,
                type: 'treemap'
              },
             
              dataLabels: {
                enabled: true,
                style: {
                  fontSize: '12px',
                },
                formatter: function(text, op) {
                  return [text, op.value]
                },
                offsetY: -4
              },
              plotOptions: {
                treemap: {
                  enableShades: true,
                  shadeIntensity: 0.5,
                  reverseNegativeShade: true,
                  colorScale: {
                    ranges: [
                      {
                        from: -6,
                        to: 0,
                        color: '#CD363A'
                      },
                      {
                        from: 0.001,
                        to: 6,
                        color: '#52B12C'
                      }
                    ]
                  }
                }
              }
            },
            type:"treemap"
        };
      case "funnel":
        return {
            series: [
                {
                  name: "Funnel Series",
                  data: [1380, 1100, 990, 880, 740, 548, 330, 200],
                },
              ],
              options: {
                chart: {
                  type: 'bar',
                  height: 350,
                  dropShadow: {
                    enabled: true,
                  },
                },
                plotOptions: {
                  bar: {
                    borderRadius: 0,
                    horizontal: true,
                    barHeight: '80%',
                    isFunnel: true,
                  },
                },
                dataLabels: {
                  enabled: true,
                  formatter: function (val, opt) {
                    return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val
                  },
                  dropShadow: {
                    enabled: true,
                  },
                },
               
                xaxis: {
                  categories: [
                    'Sourced',
                    'Screened',
                    'Assessed',
                    'HR Interview',
                    'Technical',
                    'Verify',
                    'Offered',
                    'Hired',
                  ],
                },
                legend: {
                  show: false,
                },
              },
            type:"bar"
        };
      case "slope":
        return {
            series: [
                {
                  name: 'Blue',
                  data: [
                    {
                      x: 'Category 1',
                      y: 503,
                    },
                    {
                      x: 'Category 2',
                      y: 580,
                    },
                    {
                      x: 'Category 3',
                      y: 135,
                    },
                  ],
                },
                {
                  name: 'Green',
                  data: [
                    {
                      x: 'Category 1',
                      y: 733,
                    },
                    {
                      x: 'Category 2',
                      y: 385,
                    },
                    {
                      x: 'Category 3',
                      y: 715,
                    },
                  ],
                },
                {
                  name: 'Orange',
                  data: [
                    {
                      x: 'Category 1',
                      y: 255,
                    },
                    {
                      x: 'Category 2',
                      y: 211,
                    },
                    {
                      x: 'Category 3',
                      y: 441,
                    },
                  ],
                },
                {
                  name: 'Red',
                  data: [
                    {
                      x: 'Category 1',
                      y: 428,
                    },
                    {
                      x: 'Category 2',
                      y: 749,
                    },
                    {
                      x: 'Category 3',
                      y: 559,
                    },
                  ],
                },
              ],
              options: {
                chart: {
                  height: 350,
                  width: 600,
                  type: 'line',
                },
                plotOptions: {
                  line: {
                    isSlopeChart: true,
                  },
                },
                tooltip: {
                  followCursor: true,
                  intersect: false,
                  shared: true,
                },
                dataLabels: {
                  background: {
                    enabled: true,
                  },
                  formatter(val, opts) {
                    const seriesName = opts.w.config.series[opts.seriesIndex].name
                    return val !== null ? seriesName : ''
                  },
                },
                yaxis: {
                  show: true,
                  labels: {
                    show: true,
                  },
                },
                xaxis: {
                  position: 'bottom',
                },
                legend: {
                  show: false,
                  position: 'bottom',
                  horizontalAlign: 'center',
                },
                stroke: {
                  width: [2, 3, 4, 2],
                  dashArray: [0, 0, 5, 2],
                  curve: 'smooth',
                }
              },
            type:"line"
        };
      case "donut":
        return {
            series: [44, 55, 41, 17, 15],
            options: {
              chart: {
                type: 'donut',
              },
              dataLabels: {
                enabled: false
              },
              fill: {
                type: 'gradient',
              },
              legend: {
                show: false,
                formatter: function(val, opts) {
                  return val + " - " + opts.w.globals.series[opts.seriesIndex]
                }

              },
            },
            type:"donut"
        };

    default:
      return {
        series: series,
        options: {
          ...commonOptions,
          chart: {
            ...commonOptions.chart,
            type: chartType,
          },
          xaxis: {
            categories: chartData[0].map((item) => item.x),
            labels: {
              rotate: 45,
              // formatter: chartDataFormatter,
            },
          },
          yaxis: {
            min: minYValue,
          },
          colors: chartData.map(
            (item, index) => gradientColors[index % gradientColors.length]
          ), // Color based on index
        },
      };
  }
};

export { 
  getSeries,
  getChartOptionsAnomaly,
  getSeriesAnomaly,
}
