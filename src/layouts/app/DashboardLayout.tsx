import { Outlet } from "react-router-dom";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
const DashboardLayout = () => {
  return (
    <div className="grid grid-cols-5 w-screen h-screen">
     <div className="col-span-1">
     <DashboardNavbar />
     </div>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
