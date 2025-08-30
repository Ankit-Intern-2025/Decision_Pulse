import "../../style/admin.css";
import { useState } from "react";
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import CreateSchedulers from "./pages/manageSchedulers/CreateSchedulers";
import ManageSchedulers from "./pages/manageSchedulers/ManageScheduler";
import ManageDashboards from "./pages/manageDashboards/manageDashboards";
import UserActivity from "./pages/userActivity/userActivity";
import ManageUsers from "./pages/manageUsers/manageUsers";
import WriteBack from "./components/writeBack";
import LineageView from "./components/lineageView";
import AdminTabs, { AdminSchedulerTabs } from "./components/adminTabs";
import Nav from '../../components/detailedNav'
import Footer from '../../components/footer'
const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the tab value from the URL path
  const getTabFromPath = (path) => {
    // if (path.includes('/')) return '1';
    if (path.includes("manage-dashboards")) return "2";
    if (path.includes("user-activity")) return "3";
    if (path.includes("manage-users")) return "4";
    if (path.includes("write-back")) return "5";
    if (path.includes("lineage-view")) return "6";
    return "1"; // Default to '1' (Admin Section)
  };
  const getSubTabFromPath = (path) => {
    if (path.includes("scheduler/create")) return "1";
    if (path.includes("scheduler/manage")) return "2";
    return "1";
  };

  const [selectedTab, setSelectedTab] = useState(
    getTabFromPath(location.pathname)
  ); // Set initial tab from URL
  const [selectedSubTab, setSelectedSubTab] = useState(
    getSubTabFromPath(location.pathname)
  );

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    if (newValue === "1") navigate("/admin"); // Update the URL for Admin Section
    if (newValue === "2") navigate("/admin/manage-dashboards"); // Update the URL for Page Two
    if (newValue === "3") navigate("/admin/user-activity"); // Update the URL for Page Three
    if (newValue === "4") navigate("/admin/manage-users"); // Update the URL for Page Two
    if (newValue === "5") navigate("/admin/write-back"); // Update the URL for Page Three
    if (newValue === "6") navigate("/admin/lineage-view"); // Update the URL for Page Two
  };

  const handleSubTabChange = (event, newValue) => {
    setSelectedSubTab(newValue);
    if (newValue === "1") navigate("/admin");
    if (newValue === "2") navigate("/admin/scheduler/manage");
  };

  useEffect(() => {
    // Update selectedTab when the location changes (e.g., after a refresh or a manual URL change)
    setSelectedTab(getTabFromPath(location.pathname));
    setSelectedSubTab(getSubTabFromPath(location.pathname));
  }, [location.pathname]); // Re-run when the location (URL) changes

  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Nav prop="Admin" />

        {/* AdminTabs is responsible for displaying and switching between the tabs */}
        {/* Render AdminTabs */}
        <AdminTabs selectedTab={selectedTab} onChange={handleTabChange} />

        {/* Render AdminSchedulerTabs only if the selected tab is "1" */}
        {selectedTab === "1" && (
          <AdminSchedulerTabs
            selectedTab={selectedSubTab}
            onChange={handleSubTabChange}
          />
        )}

        {/* Nested Routes for different tab content */}
        <Routes>
          {/* <Route path="/" element={<SchedulerSection />} /> */}
          <Route index element={<CreateSchedulers />} />
          <Route path="/scheduler/manage" element={<ManageSchedulers />} />
          <Route path="manage-dashboards" element={<ManageDashboards />} />
          <Route path="user-activity" element={<UserActivity />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="write-back" element={<WriteBack />} />
          <Route path="lineage-view" element={<LineageView />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
};
export default Admin