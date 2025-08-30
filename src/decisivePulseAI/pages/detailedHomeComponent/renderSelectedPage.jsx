import React from "react";
import NextPage from "./descriptiveDashboard/NextPage";
import AnomalyPage from "./executiveSummary/AnomalyPage";
import DiagnosticPage from "./diagnostic/DiagnosticPage";
import PrescriptivePage from "./prescriptive/PrescriptivePage";
import PredictivePage from "./predictive/PredictivePage";
import DescriptiveProvider from "../../../context/DescriptiveProvider";
import '../../style/NextPage.css'

const RenderSelectedPage = ({ selectedPage }) => {
    const renderPage = () => {
        switch (selectedPage) {
            case "Executive Summary":
                return <AnomalyPage />;
            case "Descriptive":
                return <NextPage />;
            case "Diagnostic":
                return <DiagnosticPage />;
            case "Prescriptive":
                return <PrescriptivePage />;
            case "Predictive":
                return <PredictivePage />;
            default:
                return <></>;
        }
    };

    return <>{renderPage()}</>;
};

export default RenderSelectedPage;
