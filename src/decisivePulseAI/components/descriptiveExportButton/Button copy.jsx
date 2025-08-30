import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { FaFileExcel } from "react-icons/fa";

const ExportToExcel = () => {
  const fetchAndExportData = async () => {
    try {
      // Fetch data from the API
      const response = await fetch("http://localhost:8000/api/descriptive");
      const json = await response.json();
      const data = json.data; // Extract the data array

      if (!data || data.length === 0) {
        console.warn("No data to export");
        return;
      }

      // Create a new workbook and worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Descriptive Data");

      // Add headers and style them
      const headers = Object.keys(data[0]);
      worksheet.columns = headers.map((header) => ({
        header,
        key: header,
        width: header.length + 5, // Dynamic width based on header length
      }));

      // Apply styling to the header row
      worksheet.getRow(1).eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "90EE90" }, // Light green
        };
        cell.font = {
          bold: true,
          color: { argb: "000000" }, // Black text
        };
        cell.alignment = { horizontal: "center", vertical: "middle" };
      });

      // Add data to the worksheet
      data.forEach((row) => {
        worksheet.addRow(row);
      });

      // Write workbook to a buffer
      const buffer = await workbook.xlsx.writeBuffer();

      // Save the buffer as an Excel file
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      saveAs(blob, "Descriptive_Data.xlsx");
    } catch (error) {
      console.error("Error fetching or exporting data:", error);
    }
  };

  return (
    <div className="w-full flex justify-end">
      <button
        onClick={fetchAndExportData}
        style={{
          width: "13%",
          padding: "10px",
          marginBottom: "10px",
          background: "#006064",
          color: "#fff",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          border: "1px solid #ffffff",
        }}
      >
        <FaFileExcel className="text-white h-5 w-5" /> Export to Excel
      </button>
    </div>
  );
};

export default ExportToExcel;
