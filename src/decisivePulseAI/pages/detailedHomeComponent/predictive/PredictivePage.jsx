

import React from "react";
import Dashboard from "./predictive";
import ExportToExcel from '../../../components/predictiveExportButton/Button';
import PredictiveDashboard from "./predictive";


function PredictivePage() {

  return (
    <div className="app-container ">
      <ExportToExcel />
      <PredictiveDashboard />
    </div>
  );
}

export default PredictivePage;