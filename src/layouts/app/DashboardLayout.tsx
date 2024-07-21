import { Outlet } from "react-router-dom";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const DashboardLayout = () => {
  const r = useNavigate();
  const token = localStorage.getItem("auth");

  useEffect(() => {
    if (!token) {
      r("/");
    }
  }, []);
  return (
    <div className="grid grid-cols-5 w-screen h-screen">
      <div className="col-span-1">
        <DashboardNavbar />
      </div>
      <div className="col-span-4 p-6 bg-white-100/40 h-[100vh] overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
