import ManageDataRefresh from "./components/ManageDataRefresh";
import ManageReportExport from "./components/ManageReportExport";

const ManageSchedulers = () => {
    return (
      <>
        <ManageReportExport />
        <ManageDataRefresh />
      </>
    );
  };

export default ManageSchedulers