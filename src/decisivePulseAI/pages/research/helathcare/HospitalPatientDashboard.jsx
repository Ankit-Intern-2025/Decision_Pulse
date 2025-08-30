import React, { useState } from "react";
import Chart from "react-apexcharts";
import logoSrc from "../../../components/images/totalsales.png";

const HospitalDashboard = () => {
  // 🏥 Independent Filters for Each Section
  const [bedYear, setBedYear] = useState("2023");
  const [revenueYear, setRevenueYear] = useState("2023");
  const [ehrYear, setEhrYear] = useState("2023");
  const [teleYear, setTeleYear] = useState("2023");
  const [treatmentYear, setTreatmentYear] = useState("2023");

  // 📊 Multi-Dataset Data
  const telemedicineData = {
    "2023": {
      consultations: [10, 20, 30, 50, 70, 90, 85, 95, 100, 110, 120, 130],
      remoteMonitoring: [5, 15, 25, 40, 60, 75, 80, 90, 95, 105, 115, 125],
      digitalPrescriptions: [8, 18, 28, 45, 65, 85, 82, 90, 98, 108, 118, 130],
    },
    "2024": {
      consultations: [15, 25, 35, 55, 75, 95, 90, 105, 120, 130, 145, 160],
      remoteMonitoring: [10, 20, 30, 50, 70, 90, 100, 110, 120, 130, 140, 150],
      digitalPrescriptions: [12, 22, 32, 50, 72, 92, 95, 105, 115, 125, 135, 145],
    },
  };

  // 📈 Telemedicine Growth Chart Options
  const telemedicineOptions = {
    chart: { type: "line", height: 350 },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      title: { text: "Month", style: { color: "#16262E" } },
    },
    yaxis: { title: { text: "Adoption Rate (%)", style: { color: "#16262E" } } },
    stroke: { curve: "smooth", width: 3 },
    colors: ["#FFB400", "#087F8C", "#00ACC1"], // Unique colors for datasets
    title: { text: "", align: "left", style: { color: "#006064" } },
  };

  // 🟢 Telemedicine Series Selection Based on Year
  const telemedicineSeries = teleYear in telemedicineData
    ? [
        { name: "Virtual Consultations (%)", data: telemedicineData[teleYear].consultations },
        { name: "Remote Monitoring (%)", data: telemedicineData[teleYear].remoteMonitoring },
        { name: "Digital Prescriptions (%)", data: telemedicineData[teleYear].digitalPrescriptions },
      ]
    : [];

  // 🏥 Hospital Bed Utilization (Stacked Bar)
  const bedUtilizationData = {
    "2023": [60, 75, 50],
    "2024": [70, 80, 55],
  };

  const bedUtilizationOptions = {
    chart: { type: "bar", stacked: true, height: 350 },
    xaxis: { categories: ["ICU", "General Wards", "Emergency"] },
    colors: ["#006064", "#087F8C", "#00ACC1"],
    
  };

  const bedUtilizationSeries = [{ name: "Utilization (%)", data: bedUtilizationData[bedYear] }];

  // 💰 Revenue Contribution (Donut Chart)
  const revenueData = {
    "2023": [30, 20, 15, 25, 10],
    "2024": [32, 18, 20, 22, 8],
  };

  const revenueOptions = {
    chart: { type: "donut" },
    labels: ["Cardiology", "Oncology", "Orthopedics", "Neurology", "Other"],
    colors: ["#006064", "#087F8C", "#00ACC1", "#FFB400", "#16262E"],
   
  };

  const revenueSeries = revenueData[revenueYear];

  // 📑 EHR Analysis (Heatmap)
  const ehrData = {
    "2023": [{ name: "Outcomes", data: [80, 70, 60, 90, 75] }],
    "2024": [{ name: "Outcomes", data: [85, 72, 65, 88, 78] }],
  };

  const ehrOptions = {
    chart: { type: "heatmap", height: 350 },
    xaxis: { categories: ["Heart Disease", "Cancer", "Diabetes", "Stroke", "Others"] },
    colors: ["#00ACC1"],
   
  };

  const treatmentEfficiencyDataRadar = {
    "2023": {
      cardiology: 80,
      oncology: 70,
      orthopedics: 85,
      neurology: 76,
    },
    "2024": {
      cardiology: 82,
      oncology: 73,
      orthopedics: 86,
      neurology: 78,
    },
  };
  
  const treatmentEfficiencyOptionsRadar = {
    chart: {
      type: "radar",
      height: 350,
    },
    xaxis: {
      categories: ["Cardiology", "Oncology", "Orthopedics", "Neurology"],
    },
    colors: ["#006064", "#087F8C", "#00ACC1", "#FFB400"],
   
  };
  
  const treatmentEfficiencySeriesRadar = treatmentYear in treatmentEfficiencyDataRadar
    ? [
        {
          name: treatmentYear,
          data: Object.values(treatmentEfficiencyDataRadar[treatmentYear]),
        },
      ]
    : [];

  return (
    <div className="bg-[#006064] w-[99%] p-8 border-5 rounded-md border-[#4A4A4A]">
      <h2 className="text-xl font-semibold mb-4 text-white">🏥 Hospital & Patient Care Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 🏥 Hospital Bed Utilization */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#006064]">Hospital Bed Utilization Rate</h3>
            <select value={bedYear} onChange={(e) => setBedYear(e.target.value)} className="border p-2">
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
          <Chart options={bedUtilizationOptions} series={bedUtilizationSeries} type="bar" height={350} />
        </div>

        {/* 💰 Revenue Contribution */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#006064]">Revenue Contribution by Department</h3>
            <select value={revenueYear} onChange={(e) => setRevenueYear(e.target.value)} className="border p-2">
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
          <Chart options={revenueOptions} series={revenueSeries} type="donut" height={350} />
        </div>

        {/* 📑 EHR Analysis */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#006064]">Electronic Health Record (EHR) Analysis</h3>
            <select value={ehrYear} onChange={(e) => setEhrYear(e.target.value)} className="border p-2">
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
          <Chart options={ehrOptions} series={ehrData[ehrYear]} type="heatmap" height={350} />
        </div>

        {/* 📡 Telemedicine Growth */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <img src={logoSrc} alt="Logo" className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-[#006064]">Telemedicine & Digital Health Adoption</h3>
            <select value={teleYear} onChange={(e) => setTeleYear(e.target.value)} className="border p-2">
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
          <Chart options={telemedicineOptions} series={telemedicineSeries} type="line" height={350} />
        </div>


      </div>
      
      <div className="flex justify-center items-center mt-6 ">
      <div className="bg-white p-4 rounded-lg shadow-md w-[50%]">
  <div className="flex justify-between items-center mb-2">
    <img src={logoSrc} alt="Logo" className="w-8 h-8" />
    <h3 className="text-lg font-semibold text-[#006064]">Patient Treatment Efficiency (Radar)</h3>
    <select
      value={treatmentYear}
      onChange={(e) => setTreatmentYear(e.target.value)}
      className="border p-2"
    >
      <option value="2023">2023</option>
      <option value="2024">2024</option>
    </select>
  </div>
  <Chart
    options={treatmentEfficiencyOptionsRadar}
    series={treatmentEfficiencySeriesRadar}
    type="radar"
    height={350}
  />
</div>
    </div>
    </div>
  );
};

export default HospitalDashboard;
