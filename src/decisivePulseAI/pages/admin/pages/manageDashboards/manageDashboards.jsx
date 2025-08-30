import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Typography, Box, Chip, Tooltip } from "@mui/material";

import { CustomContainer } from "../../../developer/component/detailsPage";
import { Event as EventIcon } from "@mui/icons-material";
import LlmModelIndustry from "./components/LlmModelIndustry";
import ReusableTable from "../../components/ReusableTable";
import { MaterialReactTable } from "material-react-table";
import {
  fetchDashboards,
  postDeleteDashboards,
} from "../../../../../http/admin_api";
import { FireAlertWithCallbackAndCancel } from "../../../../../utils/static_func";
import { BiCommentError } from "react-icons/bi";
import { RiRefreshLine } from "react-icons/ri";
import { modules_data } from "../../../../../utils/modules";

const dashboardColumns = [
  { accessorKey: "dashboard_name", header: "Dashboard Name" },
  { accessorKey: "id", header: "Dashboard ID" },
  { accessorKey: "description", header: "Description" },
  {
    accessorKey: "department_name",
    header: "Function Name",
    Cell: ({ cell }) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {modules_data[cell.getValue()]?.heading || "--"}
      </Box>
    ),
  },
  { accessorKey: "dataset_name", header: "Dataset Name" },
  { accessorKey: "owner_name", header: "Created By" },
  { accessorKey: "owner_email", header: "Creator Email" },
  {
    accessorKey: "created_at",
    header: "Created Date",
    Cell: ({ cell }) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <EventIcon sx={{ marginRight: "5px", color: "gray" }} />
        {cell.getValue()
          ? new Date(cell.getValue()).toLocaleDateString()
          : "N/A"}
      </Box>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    Cell: ({ cell }) => (
      <Chip
        label={cell.getValue()}
        sx={{
          backgroundColor: cell.getValue() === "active" ? "#095458" : "#FF9F92",
          color: cell.getValue() === "active" ? "white" : "black",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "80px",
          textTransform: "capitalize",
        }}
      />
    ),
  },
];

const ManageDashboards = () => {
  const [dashboardRows, setDashboardRows] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isReFetching, setIsReFetching] = useState(false);
  const [isReFreshing, setIsRefreshing] = useState(false);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [rowSelection, setRowSelection] = useState({});
  const [rowCount, setRowCount] = useState(0);

  const [error, setError] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [functionRows, setFunctionRows] = useState([
    { id: 1, functionId: "F001", functionName: "Create User", isActive: "Yes" },
    { id: 2, functionId: "F002", functionName: "Delete User", isActive: "No" },
  ]);

  const columns = [
    { field: "name", headerName: "Name" },
    {
      field: "status",
      headerName: "Status",
      renderCell: (value) =>
        value ? (
          <Chip
            label="Active"
            sx={{
              backgroundColor: "#095458",
              color: "white",
              borderRadius: "16px",
              display: "inline-flex",
              alignItems: "center",
              width: "auto",
              padding: "0 8px",
              whiteSpace: "nowrap",
            }}
          />
        ) : (
          <Chip
            label="Inactive"
            sx={{
              backgroundColor: "#FF9F92",
              color: "black",
              borderRadius: "16px",
              display: "inline-flex",
              alignItems: "center",
              width: "auto",
              padding: "0 8px",
              whiteSpace: "nowrap",
            }}
          />
        ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      renderCell: (value) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {new Date(value).toLocaleDateString()}
        </Box>
      ),
    },
  ];

  const getAllDashboards = useCallback(
    async (page = 1, rowsPerPage = 10, filters = {}, setLoader) => {
      setLoader(true);
      try {
        const response = await fetchDashboards({}, page, rowsPerPage, filters);
        if (response.data.length > 0) {
          setDashboardRows(response.data);
          setRowCount(response.total_count || 100);
          setError("");
        } else {
          setDashboardRows([]);
          setError("Dashboards not available.");
        }
      } catch (err) {
        setDashboardRows([]);
        setError("Dashboards not available.");
      } finally {
        setLoading(false);
        setIsReFetching(false);
        setIsRefreshing(false);
      }
    },
    [globalFilter]
  );

  useEffect(() => {
    getAllDashboards(
      pagination.pageIndex + 1,
      pagination.pageSize,
      { search: globalFilter },
      dashboardRows.length === 0 ? setLoading : setIsReFetching
    );
  }, [pagination]);

  const debounceTimer = useRef(null);

  const handleGlobalFilterChange = (searchedText) => {
    setGlobalFilter(searchedText);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      getAllDashboards(1, 10, { search: searchedText }, setIsReFetching);
    }, 500);
  };
  const handleDeleteDashboards = async () => {
    const selectedDashboardIndex = Object.keys(rowSelection);
    const selectedUsersForDelete = dashboardRows
      .filter((user, index) =>
        selectedDashboardIndex.includes(index.toString())
      )
      .map((data) => data.id);

    try {
      const response = await postDeleteDashboards({
        dashboard_ids: selectedUsersForDelete,
      });
      if (
        response.message.toLowerCase() === "dashboards deleted successfully"
      ) {
        setDashboardRows((prev) =>
          prev.filter(
            (user, index) => !selectedDashboardIndex.includes(index.toString())
          )
        );
        setRowSelection({});
        return { status: true };
      } else {
        return null;
      }
    } catch (err) {
      return null;
    }
  };

  const removeDashboard = () => {
    FireAlertWithCallbackAndCancel(
      "Warning",
      "This action will remove the dashboards permanently. Do you want to remove this dashboards?",
      "warning",
      "",
      async () => await handleDeleteDashboards(),
      "Dashboards removed.",
      "Unable to remove, please try again"
    );
  };

  return (
    <>
      <div className="bg-[#095458]">
        <Typography
          variant="h5"
          className="text-white"
          sx={{ py: 2.5, px: 2.5, fontFamily: "Poppins", fontWeight: "bold" }}
        >
          Dashboards
        </Typography>

        <Box sx={{ padding: "15px" }}>
          <MaterialReactTable
            data={dashboardRows}
            columns={dashboardColumns}
            state={{
              isLoading: loading,
              pagination,
              rowSelection,
              globalFilter,
              showProgressBars: isReFetching,
              showLoadingOverlay: isReFreshing,
            }}
            onPaginationChange={setPagination}
            onRowSelectionChange={setRowSelection}
            onGlobalFilterChange={handleGlobalFilterChange}
            manualPagination
            manualFiltering
            enableGlobalFilter
            enableRowSelection
            enableSelectAll={false}
            enableFullScreenToggle
            enableColumnResizing
            columnResizeMode="onChange"
            rowCount={rowCount}
            initialState={{ density: "comfortable", isLoading: true }}
            muiSkeletonProps={{ animation: "pulse", height: 28 }}
            renderTopToolbarCustomActions={() => (
              <Box className="px-2 pt-3 flex items-center gap-2">
                <RiRefreshLine
                  className={`text-2xl cursor-pointer transition-transform ${
                    loading
                      ? "animate-spin text-gray-400 cursor-not-allowed"
                      : "hover:text-blue-500"
                  }`}
                  onClick={() => {
                    if (!loading) {
                      getAllDashboards(
                        pagination.pageIndex + 1,
                        pagination.pageSize,
                        {},
                        setIsRefreshing
                      );
                    }
                  }}
                />
                {Object.keys(rowSelection).length > 0 && (
                  <button className="btn-primary" onClick={removeDashboard}>
                    Delete Selected
                  </button>
                )}
              </Box>
            )}
            muiTableContainerProps={{
              sx: { minHeight: "60vh", padding: "15px" },
            }}
            renderEmptyRowsFallback={() => (
              <div className="flex flex-col items-center justify-center min-h-[380px]">
                <BiCommentError className="h-20 w-20" />
                <span>No Records available.</span>
              </div>
            )}
          />
        </Box>
      </div>


      <div className="bg-[#095458] pb-8">
        <Typography
          variant="h5"
          className="text-white"
          sx={{ pt: 2.5, px: 2.5, fontFamily: "Poppins", fontWeight: "bold" }}
        >
          Functions
        </Typography>

        <Box sx={{ px: "15px" }}>
          <ReusableTable data={functionRows} columns={columns} selectable />
        </Box>
      </div>

      <LlmModelIndustry />
    </>
  );
};

export default ManageDashboards;
