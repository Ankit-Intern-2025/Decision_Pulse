import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  memo,
  useRef,
} from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Modal, Switch, Tooltip } from "@mui/material";
import { Edit, Event } from "@mui/icons-material";
import { Box } from "@mui/material";
import { CustomContainer } from "../../../developer/component/detailsPage";
import {
  fetchUsers,
  postDeleteUsers,
  postModifyUser,
} from "../../../../../http/admin_api";
import {
  FireAlertWithCallbackAndCancel,
  isDate,
} from "../../../../../utils/static_func";
import { MaterialReactTable } from "material-react-table";
import { useMaterialReactTable } from "material-react-table";
import CreateUserModal from "./components/CreateUserModal";
import { RiRefreshLine } from "react-icons/ri";
import { BiCommentError } from "react-icons/bi";

const renderTruncate = (text, length) => {
  return (
    <Tooltip arrow title={text}>
      <span className="flex items-start justify-start">
        {text?.length > length ? text.slice(0, length) + ".." : text}{" "}
      </span>
    </Tooltip>
  );
};

const ManageUsers = memo(() => {
  const [modifyUser, setModifyUser] = useState({
    showModal: false,
    selectedUser: {},
  });
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [rowSelection, setRowSelection] = useState([]);
  const [rowCount, setRowCount] = useState(100);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isReFetching, setIsReFetching] = useState(false);
  const handleRowSelection = (row, data) => {
    setRowSelection(row);
  };
  const toggleModalCreateUser = useCallback(() => {
    setShowCreateUserModal(true);
  }, []);

  const handleDeleteUsers = useCallback(async () => {
    try {
      const selectedUsersIndex = Object.keys(rowSelection);
      const selectedUsersForDelete = users
        .filter((user, index) => selectedUsersIndex.includes(index.toString()))
        .map((data) => data.id);
      console.log(selectedUsersForDelete, selectedUsersIndex);
      const response = await postDeleteUsers({
        user_ids: selectedUsersForDelete,
      });
      if (response.message.toLowerCase() === "user deleted successfully") {
        setUsers((prev) => {
          const tempUsers = [...prev];
          return tempUsers.filter(
            (user, index) => !selectedUsersIndex.includes(index.toString())
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

  const removeUsers = useCallback(() => {
    FireAlertWithCallbackAndCancel(
      "Warning",
      "This action will remove the users permanently. Do you want to remove?",
      "warning",
      "",
      async () => await handleDeleteUsers(),
      "Users removed.",
      "Unable to remove, please try again"
    );
  }, [rowSelection]);

  const toggleModal = useCallback(() => {
    setModifyUser((prev) => ({ selectedUser: {}, showModal: !prev.showModal }));
  }, []);

  const handleEditClick = useCallback((row) => {
    setModifyUser({ showModal: true, selectedUser: row });
  }, []);
  const handleModifyUser = useCallback(async (e) => {
    const { checked } = e.target;
    setLoading(true);
    try {
      const response = await postModifyUser(
        { is_active: checked.toString() },
        modifyUser.selectedUser.id
      );
      if (response.message === "User updated successfully") {
        setModifyUser((prev) => {
          const tempValues = { ...prev };
          tempValues.selectedUser.is_active = checked;
          return tempValues;
        });
        setUsers((prev) => {
          const tempUsers = [...prev];
          const index = tempUsers.findIndex(
            (item) => item.id === modifyUser.selectedUser.id
          );
          tempUsers[index].is_active = checked;
          return tempUsers;
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  });
  const columns2 = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "User Name",
        Cell: ({ cell }) => renderTruncate(cell.getValue(), 12),
      },
      {
        accessorKey: "email",
        header: "Email ID",
        Cell: ({ cell }) => renderTruncate(cell.getValue(), 12),
      },
      {
        accessorKey: "user_type",
        header: "User Type",
        Cell: ({ cell }) => renderTruncate(cell.getValue(), 12),
      },
      {
        accessorKey: "created_by",
        header: "Created By",
        Cell: ({ cell }) => renderTruncate(cell.getValue(), 12),
      },
      {
        accessorKey: "creator_name",
        header: "Creator Name",
        Cell: ({ cell }) => renderTruncate(cell.getValue(), 12),
      },
      {
        accessorKey: "creator_email",
        header: "Creator Email",
        Cell: ({ cell }) => renderTruncate(cell.getValue(), 12),
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        Cell: ({ cell }) => (
          <span className="flex gap-1">
            <Event sx={{ marginRight: "5px", color: "gray" }} />
            {isDate(cell.getValue())
              ? new Date(cell.getValue()).toLocaleDateString()
              : "N/A"}
          </span>
        ),
      },
      { accessorKey: "updator_name", header: "Updated By" },
      {
        accessorKey: "updated_at",
        header: "Updated Date",
        Cell: ({ cell }) => (
          <span className="flex gap-1">
            <Event sx={{ marginRight: "5px", color: "gray" }} />
            {isDate(cell.getValue())
              ? new Date(cell.getValue()).toLocaleDateString()
              : "N/A"}
          </span>
        ),
      },
      {
        accessorKey: "updatedBy",
        header: "Updated By",
        Cell: ({ cell }) => renderTruncate(cell.getValue(), 12),
      },
      {
        accessorKey: "is_active",
        header: "Is Active",
        Cell: ({ cell }) => (
          <div
            className={`btn-primary rounded-lg w-[80px] justify-center ${
              cell.getValue() ? "" : "bg-gray-500"
            }`}
          >
            {cell.getValue() ? "Active" : "Inactive"}
          </div>
        ),
      },
      {
        accessorKey: "userConfig",
        header: "User Config",
        enableColumnActions: false,
        Cell: ({ row }) => (
          <Button
            onClick={() => handleEditClick(row.original)}
            title="Edit User Config"
          >
            <EditIcon sx={{ marginRight: "5px", color: "gray" }} />
          </Button>
        ),
      },
    ],
    []
  ); // Dependencies for useMemo

  const getAllUsers = useCallback(
    async (page = 1, rowsPerPage = 10, filters = {}) => {
      if (users.length === 0) {
        setLoading(true);
      } else {
        setIsReFetching(true);
      }
      try {
        const response = await fetchUsers(page, rowsPerPage, filters);
        if (response.data.length > 0) {
          setUsers(response.data);
          setRowCount(response.total_count || 100);
          setError("");
        } else {
          setError("Users Not available.");
        }
      } catch (err) {
        setError("Users Not available.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    getAllUsers(pagination.pageIndex + 1, pagination.pageSize, {
      search: globalFilter,
    });
  }, [pagination]);

  const debounceTimer = useRef(null);

  const handleGlobalFilterChange = (searchedText) => {
    setGlobalFilter(searchedText);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      getAllUsers(1, 10, { search: searchedText });
    }, 500);
  };

  const table = useMaterialReactTable({
    columns: columns2,
    data: users,
    state: {
      isLoading: loading,
      pagination: pagination,
      rowSelection: rowSelection,
      globalFilter: globalFilter,
      showProgressBars: isReFetching,
    },
    initialState: {
      isLoading: true,
      density: "compact",
      columnPinning: { left: ["mrt-row-select"], right: ["userConfig"] },
    },
    muiSkeletonProps: {
      animation: "pulse",
      height: 28,
    },
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    rowCount: rowCount,
    onPaginationChange: setPagination,
    onRowSelectionChange: handleRowSelection, //connect internal row selection state to your own,
    onGlobalFilterChange: handleGlobalFilterChange,
    manualPagination: true,
    enableRowSelection: (row) =>
      row.original.id !== JSON.parse(localStorage.getItem("user"))?.userId,
    enableSelectAll: false,
    enableFullScreenToggle: true,
    enableColumnPinning: true,
    enableGlobalFilter: true,
    renderTopToolbarCustomActions: () => (
      <Box className="px-2 pt-3 flex items-center gap-2">
        <RiRefreshLine
          className={`text-2xl cursor-pointer transition-transform ${
            loading
              ? "animate-spin text-gray-400 cursor-not-allowed"
              : "hover:text-blue-500"
          }`}
          onClick={() => {
            if (!loading) {
              getAllUsers(pagination.pageIndex + 1, pagination.pageSize);
            }
          }}
        />
        <Tooltip arrow title="Create New User">
          <button className="btn-primary" onClick={toggleModalCreateUser}>
            Create New User
          </button>
        </Tooltip>
        {Object.keys(rowSelection).length > 0 && (
          <button className="btn-primary" onClick={removeUsers}>
            Delete Selected
          </button>
        )}
      </Box>
    ),
    muiTableContainerProps: {
      sx: {
        minHeight: "60vh",
        padding: "15px",
      },
    },
    renderEmptyRowsFallback: () => (
      <div className="flex flex-col items-center justify-center min-h-[380px]">
        <BiCommentError className="h-20 w-20" />
        <span>No Records available.</span>
      </div>
    ),
    memoMode: "cells" | "cells" | "rows" | "table-body",
  });

  return (
    <CustomContainer ClassNamesWidth={"100%"}>
      <Box
        sx={{
          display: "block", // Prevent unnecessary centering
        }}
      >
        {/* CustomTable inside a styled Box */}
        {/* Our Custom External Top Toolbar */}
        <MaterialReactTable table={table} />
        {modifyUser.showModal && (
          <Modal keepMounted open={modifyUser.showModal} onClose={toggleModal}>
            <div
              style={{
                transform: "translate(-50%, -50%)",
                outline: "none",
              }}
              className="mx-auto rounded-2xl bg-[#D9D9D9] flex justify-start flex-col px-12 py-6 pt-8 min-h-[30vh] min-w-[80%] md:min-w-[40%] absolute top-[50%] left-[50%]"
            >
              <div className="text-md font-bold text-center border-b-2 border-gray-100 pb-3 mb-3">
                User Config
              </div>
              <div className="flex flex-col w-full gap-2 text-sm">
                <div className="flex">
                  <div className="w-[35%] text-md">Name</div>
                  <div className="w-[65%]  text-md">
                    {modifyUser?.selectedUser.name}
                  </div>
                </div>

                <div className="flex">
                  <div className="w-[35%] text-md">Email ID</div>
                  <div className="w-[65%]  text-md">
                    {modifyUser?.selectedUser.email}
                  </div>
                </div>

                <div className="flex">
                  <div className="w-[35%] text-md">User Type</div>
                  <div className="w-[65%]  text-md">
                    {modifyUser?.selectedUser.user_type}
                  </div>
                </div>

                <div className="flex">
                  <div className="w-[35%] text-md">Active</div>
                  <div className="w-[65%]  text-md">
                    <Switch
                      disabled={loading}
                      onChange={handleModifyUser}
                      checked={modifyUser?.selectedUser?.is_active}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="ps-8 mt-3 text-end">
                <button className="px-3 py-2 text-sm bg-[#095458] text-white flex gap-2 items-center hover:bg-[#153d3f]">
                  <span>Submit</span>
                </button>
              </div> */}
            </div>
          </Modal>
        )}
        {showCreateUserModal && (
          <CreateUserModal
            showCreateUserModal={showCreateUserModal}
            setShowCreateUserModal={setShowCreateUserModal}
          />
        )}
      </Box>
    </CustomContainer>
  );
});

export default ManageUsers;
