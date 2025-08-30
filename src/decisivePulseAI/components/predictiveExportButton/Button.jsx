import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import excelSvg from "../../resources/home/excel.svg";

const ExportToExcel = () => {
  const fetchAndExportData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/predictive");
      const data = await response.json();

      // Initialize the workbook
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Predictive Analysis");

      // Set up column headers
      worksheet.columns = [
        { header: "Plot Name", key: "name", width: 30 },
        { header: "X Label", key: "x_label", width: 20 },
        { header: "Y Label", key: "y_label", width: 20 },
        { header: "X Axis Values", key: "x_axis", width: 30 },
        { header: "Y Axis Values", key: "y_axis", width: 30 },
      ];

      // Loop through the plot data and add rows
      data.plot_recommendation.forEach((plot) => {
        worksheet.addRow({
          name: plot.name,
          x_label: plot.config.x_label,
          y_label: plot.config.y_label,
          x_axis: plot.data.x_axis.join(", "), // Join x-axis values as a string
          y_axis: plot.data.y_axis.join(", "), // Join y-axis values as a string
        });
      });

      // Write the Excel file
      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), "Predictive_Analysis.xlsx");
    } catch (error) {
      console.error("Error fetching and exporting data:", error);
    }
  };

  return (
    <div className="w-full flex justify-between relative py-2">
      <div className="w-[100%] flex items-center justify-center py-2">
        <h1 style={{ fontSize: "20px", color: "white"}}>
          Predictive Analysis Dashboard
        </h1>
      </div>
      <button
        onClick={fetchAndExportData}
        className="absolute right-0"
        style={{
          minWidth: "13%",
          padding: "10px",
          marginBottom: "18px",
          background: "#006064",
          color: "#fff",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          border: "1px solid #ffffff",
          textWrap:"nowrap"
        }}
      >
        <img src={excelSvg} alt="excel" className="h-8 w-8" /> Export to Excel
      </button>
    </div>
  );
};

export default ExportToExcel;
