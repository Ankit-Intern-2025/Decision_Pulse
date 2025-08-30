import ReusableTable from "../../../components/ReusableTable";
const ManageDataRefresh = () => {
    const tableData = [
      {
        id: 1,
        createdBy: "User A",
        report: "Sales Report",
        frequency: "Weekly",
        dateTime: "2024-12-20 14:00",
        mail: "usera@example.com",
        format: "PDF",
        message: "Success",
      },
      {
        id: 2,
        createdBy: "User B",
        report: "Inventory Report",
        frequency: "Monthly",
        dateTime: "2024-12-21 09:00",
        mail: "userb@example.com",
        format: "Excel",
        message: "Pending",
      },
      // Add more data as needed
    ];
  
    const tableColumns = [
      { field: "createdBy", headerName: "Created By" },
      { field: "report", headerName: "Report" },
      { field: "frequency", headerName: "Frequency" },
      { field: "dateTime", headerName: "Date Time" },
      { field: "mail", headerName: "Mail" },
      { field: "format", headerName: "Format" },
      { field: "message", headerName: "Message" },
    ];
  
    const handleDeleteRow = (ids) => {
      console.log("Deleted row IDs:", ids);
      // Add your delete logic here
    };
    return (
        <div
          className="w-full mx-auto px-4 pb-6"
          style={{ margin: "0 0", backgroundColor: "#095458" }}
        >
          <div className="pt-10">
            <h1 className="text-center text-2xl font-bold text-white">
              Scheduled Data Refresh
            </h1>
            <h5 className="text-center text-sm text-white">
              Select from below options.
            </h5>
          </div>
          <ReusableTable
            data={tableData}
            columns={tableColumns}
            onDeleteRow={handleDeleteRow}
            selectable={true}
            cellStyles={{}}
            globalCellStyle={{ padding: "10px" }}
          />
        </div>
    );
  };

export default ManageDataRefresh