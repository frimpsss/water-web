import { Outlet } from "react-router-dom";
import Logo from "../../assets/logo.svg";
const AuthLayout = () => {
  return (
    <div className="grid h-screen w-full place-items-center">
      <main>
        <div className=" col-span-4 flex items-center gap-6 mb-6">
          <img src={Logo} className="h-[70px]" />
          <div>
            <h4 className="text-2xl text-mantis-950">
              {" "}
              Aquatrack
              <br />
              Admin Dashboard
            </h4>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
