import React, { useState } from 'react';
import ApexCharts from 'react-apexcharts';
import logoSrc from "../../../../components/images/totalsales.png"; // Assuming you are using this logo somewhere else in your component.

const ConsumerInsightsComponent = () => {
  // Chart Options and Series...

  const [syncedData, setSyncedData] = useState({});

  // Customer Sentiment Analysis Options
  const sentimentOptions = {
    chart: {
      type: 'line',
      id: 'sentimentChart',
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const selectedPoint = config.dataPointIndex;
          setSyncedData({ ...syncedData, sentimentChart: selectedPoint });
        },
      },
    },
    colors: ['#006064', '#00ACC1', '#FFB400'],
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May'],
    },
    title: {
      
      align: 'center',
      style: {
        fontSize: '16px',
        color: '#087F8C',
      },
    },
    legend: {
      position: 'top',
    },
  };

  const sentimentSeries = [
    {
      name: 'Positive Sentiment',
      data: [75, 80, 85, 90, 88],
    },
    {
      name: 'Neutral Sentiment',
      data: [15, 12, 10, 5, 7],
    },
    {
      name: 'Negative Sentiment',
      data: [10, 8, 5, 5, 5],
    },
  ];

  // Buying Behavior Trends Options
  const buyingBehaviorOptions = {
    chart: {
      type: 'bar',
    },
    colors: ['#00ACC1', '#FFB400', '#006064'],
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      categories: ['Spring', 'Summer', 'Fall', 'Winter'],
    },
    title: {
    
      align: 'center',
      style: {
        fontSize: '16px',
        color: '#087F8C',
      },
    },
  };

  const buyingBehaviorSeries = [
    {
      name: 'Frequency of Purchase',
      data: [120, 150, 100, 180],
    },
    {
      name: 'Preferred Channels',
      data: [60, 85, 50, 95],
    },
  ];

  // Loyalty & Retention Metrics Options
  const loyaltyMetricsOptions = {
    chart: {
      type: 'radialBar',
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const selectedPoint = config.seriesIndex;
          setSyncedData({ ...syncedData, loyaltyChart: selectedPoint });
        },
      },
    },
    colors: ['#006064', '#FFB400', '#00ACC1'],
    plotOptions: {
      radialBar: {
        hollow: {
          size: '30%',
        },
        dataLabels: {
          name: {
            fontSize: '16px',
            color: '#087F8C',
          },
          value: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#16262E',
          },
        },
      },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
    },
    title: {
 
      align: 'center',
      style: {
        fontSize: '16px',
        color: '#087F8C',
      },
    },
  };

  const loyaltyMetricsSeries = [65, 45, 30]; // Repeat Purchase Rate, AOV, CLV

  // Market Basket Analysis Options
  const basketAnalysisOptions = {
    chart: {
      type: 'pie',
    },
    colors: ['#006064', '#00ACC1', '#FFB400'],
    title: {

      align: 'center',
      style: {
        fontSize: '16px',
        color: '#087F8C',
      },
    },
  };

  const basketAnalysisSeries = [40, 30, 20, 10]; // Product categories or combinations

  // Predictive Demand Forecasting Options
  const demandForecastingOptions = {
    chart: {
      type: 'line',
      id: 'demandChart',
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const selectedPoint = config.dataPointIndex;
          setSyncedData({ ...syncedData, demandChart: selectedPoint });
        },
      },
    },
    colors: ['#006064', '#FFB400'],
    xaxis: {
      categories: ['2024 Q1', '2024 Q2', '2024 Q3', '2024 Q4'],
    },
    title: {
   
      align: 'center',
      style: {
        fontSize: '16px',
        color: '#087F8C',
      },
    },
  };

  const demandForecastingSeries = [
    {
      name: 'Seasonal Demand',
      data: [500, 600, 800, 900],
    },
    {
      name: 'Competitor Impact',
      data: [200, 250, 300, 350],
    },
  ];

  return (
    <div className="bg-[#006064] w-[99%] p-8 border-5 rounded-md border-[#FFB400]">
      <h2 className="text-2xl font-semibold mb-4 text-white">Consumer Insights & Demand Forecasting</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Sentiment Analysis Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Customer Sentiment Analysis</h3>
          </div>
          <ApexCharts options={sentimentOptions} series={sentimentSeries} type="line" height={350} />
        </div>

        {/* Buying Behavior Trends Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Buying Behavior Trends</h3>
          </div>
          <ApexCharts options={buyingBehaviorOptions} series={buyingBehaviorSeries} type="bar" height={350} />
        </div>

        {/* Loyalty & Retention Metrics Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Loyalty & Retention Metrics</h3>
          </div>
          <ApexCharts options={loyaltyMetricsOptions} series={loyaltyMetricsSeries} type="radialBar" height={350} />
        </div>

        {/* Market Basket Analysis Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Market Basket Analysis</h3>
          </div>
          <ApexCharts options={basketAnalysisOptions} series={basketAnalysisSeries} type="pie" height={350} />
        </div>

        {/* Predictive Demand Forecasting Chart */}
       
      </div>
      <div className="flex justify-center items-center mt-6 ">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#087F8C]">Predictive Demand Forecasting</h3>
          </div>
          <ApexCharts options={demandForecastingOptions} series={demandForecastingSeries} type="line" height={350} />
        </div>
        </div>
    </div>
  );
};

export default ConsumerInsightsComponent;
