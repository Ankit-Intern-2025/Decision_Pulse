import React from "react";
import ExcelPlotComponent from "./ExcelPlotComponent";
import ExportToExcel from "../../../components/descriptiveExportButton/Button";

function NextPage() {

  return (
    <div className="app-container">
      <ExportToExcel />
      <ExcelPlotComponent />
    </div>
  );
}

export default NextPage;
