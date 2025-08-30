import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import ReusableTable from "../../../components/ReusableTable";
import { Tooltip } from "chart.js";
import { RiRefreshLine } from "react-icons/ri";
import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import {
  fetchReportSchedulers,
  fetchUsers,
  postRemoveSchedulers,
} from "../../../../../../http/admin_api";
import { FireAlertWithCallbackAndCancel } from "../../../../../../utils/static_func";
import { BiCommentError } from "react-icons/bi";

const sampleData = [
  {
    report_format: "PDF",
    username: "admin_user",
    reportType: "our_data",
    ToEmailId: "mydummymailabc@gmail.com",
    once_daily: false,
    once_weekly: false,
    once_monthly: false,
    once: true,
    versionId:
      "489a3f4d-95bd-49f0-b9a0-155646951328_20250414151925#197f3b2b-ac4a-450b-bb91-6f307e431f68",
    email_subject: "Scheduled Report",
    ModuleName: "sales_data",
    start_date: "2025-04-13",
    email_body: "test scheduler",
    end_date: "2025-04-17",
    id: "deb9ae63-276b-4718-8c8c-bb16f3caa9fb",
    created_by: "489a3f4d-95bd-49f0-b9a0-155646951328",
    once_every: 7,
    time_zone: "Asia/Kolkata",
    time: "21:10:00",
    Link: "Random link",
  },
  {
    report_format: "PDF",
    username: "admin_user",
    reportType: "our_data",
    ToEmailId: "mydummymailabc@gmail.com",
    once_daily: false,
    versionId:
      "489a3f4d-95bd-49f0-b9a0-155646951328_20250414151925#197f3b2b-ac4a-450b-bb91-6f307e431f68",
    email_subject: "Scheduled Report",
    once_weekly: false,
    ModuleName: "sales_data",
    start_date: "2025-04-13",
    once_monthly: false,
    email_body: "test scheduler",
    once: true,
    end_date: "2025-04-17",
    id: "d95cce93-3d32-4720-9db8-0138268e58b2",
    created_by: "489a3f4d-95bd-49f0-b9a0-155646951328",
    once_every: 7,
    time_zone: "Asia/Kolkata",
    time: "21:15:00",
    Link: "Random link",
  },
  {
    report_format: "PDF",
    username: "admin_user",
    reportType: "our_data",
    ToEmailId: "mydummymailabc@gmail.com",
    once_daily: false,
    versionId:
      "489a3f4d-95bd-49f0-b9a0-155646951328_20250414151925#197f3b2b-ac4a-450b-bb91-6f307e431f68",
    email_subject: "Scheduled Report",
    once_weekly: false,
    ModuleName: "sales_data",
    start_date: "2025-04-13",
    once_monthly: false,
    email_body: "test scheduler",
    once: true,
    end_date: "2025-04-17",
    id: "1b19203a-0d5c-4e4b-af19-e6a14c4e2343",
    created_by: "489a3f4d-95bd-49f0-b9a0-155646951328",
    once_every: 7,
    time_zone: "Asia/Kolkata",
    time: "21:20:00",
    Link: "Random link",
  },
  {
    report_format: "PDF",
    username: "admin_user",
    reportType: "our_data",
    ToEmailId: "mydummymailabc@gmail.com",
    once_daily: false,
    versionId:
      "489a3f4d-95bd-49f0-b9a0-155646951328_20250414151925#197f3b2b-ac4a-450b-bb91-6f307e431f68",
    email_subject: "Scheduled Report",
    once_weekly: false,
    ModuleName: "sales_data",
    start_date: "2025-04-13",
    once_monthly: false,
    email_body: "test scheduler",
    once: true,
    end_date: "2025-04-17",
    id: "438bb811-b8a0-4a4a-a985-788cd83f758a",
    created_by: "489a3f4d-95bd-49f0-b9a0-155646951328",
    once_every: 7,
    time_zone: "Asia/Kolkata",
    time: "21:25:00",
    Link: "Random link",
  },
  {
    report_format: "PDF",
    username: "admin_user",
    reportType: "our_data",
    ToEmailId: "mydummymailabc@gmail.com",
    once_daily: false,
    versionId:
      "489a3f4d-95bd-49f0-b9a0-155646951328_20250414151925#197f3b2b-ac4a-450b-bb91-6f307e431f68",
    email_subject: "Scheduled Report",
    once_weekly: false,
    ModuleName: "sales_data",
    start_date: "2025-04-13",
    once_monthly: false,
    email_body: "test scheduler",
    once: true,
    end_date: "2025-04-17",
    id: "c1cde9f4-1f7b-46f8-aa8e-28d6928aa81c",
    created_by: "489a3f4d-95bd-49f0-b9a0-155646951328",
    once_every: 7,
    time_zone: "Asia/Kolkata",
    time: "21:35:00",
    Link: "Random link",
  },
  {
    report_format: "PDF",
    username: "admin_user",
    reportType: "our_data",
    ToEmailId: "mydummymailabc@gmail.com",
    once_daily: false,
    versionId:
      "489a3f4d-95bd-49f0-b9a0-155646951328_20250414151925#197f3b2b-ac4a-450b-bb91-6f307e431f68",
    email_subject: "Scheduled Report",
    once_weekly: false,
    ModuleName: "sales_data",
    start_date: "2025-04-13",
    once_monthly: false,
    email_body: "test scheduler",
    once: true,
    end_date: "2025-04-17",
    id: "6ea4270c-f7b5-4357-9d0a-29bd38d9f6ab",
    created_by: "489a3f4d-95bd-49f0-b9a0-155646951328",
    once_every: 7,
    time_zone: "Asia/Kolkata",
    time: "21:45:00",
    Link: "Random link",
  },
];

const tableColumns = [
  {
    accessorKey: "id",
    header: "Scheduler Id",
  },
  {
    accessorKey: "username",
    header: "Created By",
  },
  {
    accessorKey: "report_format",
    header: "Format",
  },
  {
    accessorKey: "reportType",
    header: "Report Type",
  },
  {
    accessorKey: "ModuleName",
    header: "Function Name",
  },
  {
    accessorKey: "ToEmailId",
    header: "Mail",
  },
  {
    accessorKey: "email_subject",
    header: "Mail Subject",
  },
  {
    accessorKey: "email_body",
    header: "Mail Body",
  },
  {
    header: 'Frequency', // Name of the column
    accessorKey: 'customStatus', // Can be anything; won't be used directly
    Cell: ({ row }) => {
      const { once, once_monthly, once_weekly, once_daily } = row.original;

      if (once) return 'Once';
      if (once_monthly) return 'Once Monthly';
      if (once_weekly) return 'Once Weekly';
      if (once_daily) return 'Once Daily';
      return 'None';
    },
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
    Cell: ({ cell }) => (
      <>
        {/* <AccessTime style={{ marginRight: '0px' }} /> */}
        {cell.getValue()}
      </>
    ),
  },
  {
    accessorKey: "end_date",
    header: "End Date",
    Cell: ({ cell }) => (
      <>
        {/* <AccessTime style={{ marginRight: '0px' }} /> */}
        {cell.getValue()}
      </>
    ),
  },
  {
    accessorKey: "time_zone",
    header: "Time Zone",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
];
const ManageReportExport = () => {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);
  const [isReFetching, setIsReFetching] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [rowSelection, setRowSelection] = useState([]);
  const [rowCount, setRowCount] = useState(100);
  const [globalFilter, setGlobalFilter] = useState("");

  const getAllSchedulers = useCallback(async (setLoader) => {
    setLoader(true);
    try {
      const response = await fetchReportSchedulers();
      if (response.data.length > 0) {
        setTableData(response.data);
        setRowCount(response.total_count || 100);
        setError("");
      } else {
        setError("Users Not available.");
      }
    } catch (err) {
      setError("Users Not available.");
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    getAllSchedulers(tableData.length===0?setLoading:setIsReFetching);
  }, [pagination]);

  const handleRemoveScheduler = useCallback(async () => {
    try {
      const selectedSchedulers = Object.keys(rowSelection);
      console.log(selectedSchedulers);
      const response = await postRemoveSchedulers({
        job_ids: selectedSchedulers,
      });
      if (response.status.toLowerCase() === "deleted successfully") {
        setTableData((prev) => {
          const tempUsers = [...prev];
          return tempUsers.filter(
            (scheduler) => !selectedSchedulers.includes(scheduler.id)
          );
        });
        setRowSelection({});
        return { status: true };
      } else {
        return { status: false };
        // FireAlert("Information", "Unable to remove users", "info", "")
      }
    } catch (err) {
      return { status: false };

      // FireAlert("Information", "Unable to remove users", "info", "")
    }
  }, [rowSelection]);

  const removeScheduler = useCallback(() => {
    FireAlertWithCallbackAndCancel(
      "Warning",
      "This action will remove the scheduled job permanently. Do you want to remove?",
      "warning",
      "",
      async () => await handleRemoveScheduler(),
      "Scheduler removed.",
      "Unable to remove, please try again"
    );
  }, [rowSelection]);
  const handleRowSelection = (row, data) => {
    setRowSelection(row);
  };
  const table = useMaterialReactTable({
    columns: tableColumns,
    data: tableData,
    getRowId: (originalRow) => originalRow.id,
    state: {
      isLoading: loading,
      pagination: pagination,
      rowSelection: rowSelection,
    //   globalFilter: globalFilter,
      showProgressBars: isReFetching,
      showLoadingOverlay: isRefreshing,
    },
    initialState: {
      isLoading: true,
      density: "comfortable",
      //   columnPinning: { left: [], right: ["userConfig"] },
    },
    muiSkeletonProps: {
      animation: "pulse",
      height: 28,
    },
    rowCount: rowCount,
    onPaginationChange: setPagination,
    onRowSelectionChange: handleRowSelection,
    manualPagination: true,
    enableRowSelection: true,
    enableSelectAll: false,
    enableFullScreenToggle: true,
    enableColumnPinning: true,
    enableGlobalFilter: true,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    renderTopToolbarCustomActions: () => (
      <Box className="px-2 pt-3 flex items-center gap-2">
        <RiRefreshLine
          className={`text-2xl cursor-pointer transition-transform ${
            loading
              ? "animate-spin text-gray-400 cursor-not-allowed"
              : "hover:text-blue-500"
          }`}
          onClick={() => getAllSchedulers(setIsRefreshing)}
        />
        {Object.keys(rowSelection).length > 0 && (
          <button className="btn-primary" onClick={removeScheduler}>
            Delete Selected
          </button>
        )}
      </Box>
    ),
    renderEmptyRowsFallback: () => (
      <div className="flex flex-col items-center justify-center min-h-[380px]">
        <BiCommentError className="h-20 w-20" />
        <span>No Records available.</span>
      </div>
    ),
    muiTableContainerProps: {
      sx: {
        minHeight: "400px",
        padding: "15px",
      },
    },
    memoMode: "cells" | "cells" | "rows" | "table-body",
  });
  return (
    <div
      className="w-full mx-auto px-4"
      style={{ margin: "0 0", backgroundColor: "#095458" }}
    >
      <div className="py-10 text-white">
        <h1 className="text-center text-2xl font-bold]">
          Scheduled Reports Export
        </h1>
        <h5 className="text-center text-sm]">Select from below options.</h5>
      </div>
      <MaterialReactTable table={table} />
      {/* <ReusableTable
        data={tableData}
        columns={tableColumns}
        selectable={true}
        onDeleteRow={(ids) => alert(`Deleted rows with IDs: ${ids.join(", ")}`)}
      /> */}
    </div>
  );
};

export default ManageReportExport;
