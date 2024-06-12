import * as Icon from "iconsax-react";
import whitelogo from "../../assets/logo-white.svg";
import DashboardIcon from "./DashboardIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useAdminInfo } from "../../store/adminInfo";
import { getAdminInfo } from "../../api/queries/info";

const DashboardNavbar = () => {
  const { setDetails, details } = useAdminInfo((s) => s);
  const { pathname } = useLocation();
  const r = useNavigate();
  const nav_links = [
    {
      title: "Home",
      link: "/dashboard",
      icon: "Activity",
    },
    {
      title: "Transactions",
      link: "/dashboard/transactions",
      icon: "TransactionMinus",
    },
    {
      title: "Tariffs",
      link: "/dashboard/tariffs",
      icon: "WalletMoney",
      children: [
        {
          title: "Set Tariffs",
          path: "/dashboard/tarrifs/set-tarrifs",
        },
        {
          title: "Change Log",
          path: "/tarrifs/change-log",
        },
      ],
    },
    {
      title: "Billing",
      link: "/dashboard/billing",
      icon: "TableDocument",
    },
    {
      title: "Reports",
      link: "/dashboard/reports",
      icon: "DocumentUpload",
    },
    {
      title: "Messages",
      link: "/dashboard/messages",
      icon: "Message2",
      children: [
        {
          title: "Send Messages",
          path: "/dashboard/messages/send",
        },
        {
          title: "All Messages",
          path: "/dashboard/messages/all",
        },
      ],
    },
    {
      title: "Customer Data",
      link: "/dashboard/customers",
      icon: "UserSquare",
    },
    {
      title: "Meter Data",
      link: "/dashboard/meters",
      icon: "MainComponent",
    },
    {
      title: "Settings",
      link: "/dashboard/settings",
      icon: "Setting2",
    },
  ];

  const { data, isLoading } = useQuery("admin-info", {
    queryFn: getAdminInfo,
    onSuccess(data) {
      setDetails({
        email: data?.data?.data?.email,
        name: data?.data?.data?.name,
        role: data?.data?.data?.role,
      });
    },
  });
  return (
    <div className="w-full h-[100vh] bg-ebony-950 bg- px-4 py-6 flex flex-col justify-between  ">
      <section className="">
        <div className="flex gap-4 items-center mb-8">
          <img src={whitelogo} className="w-[30px]" />
          <h1 className="text-[#fff] font-medium text-[1.5rem]">Aquatrack</h1>
        </div>

        {/* nav */}
        <nav className=" flex flex-col gap-2">
          {nav_links.map((e, k) => {
            return (
              <div
                onClick={() => {
                  r(e.link);
                }}
                key={k}
                className={` cursor-pointer hover:bg-[white]/30 group px-2 py-[0.6rem] rounded-lg duration-500 flex items-center gap-6 ${
                  pathname == e.link && "bg-white-100/30"
                }`}
              >
                <DashboardIcon
                  title={e.icon as keyof typeof Icon}
                  active={pathname == e.link}
                />
                <p
                  className={`${
                    pathname == e.link ? "text-[#ffffff]" : "text-white-400"
                  } group-hover:text-[#fff] duration-500`}
                >
                  {e.title}
                </p>
              </div>
            );
          })}
        </nav>
      </section>
      <section>
        {/* <div
          onClick={() => {
            r("/dashboard/settings");
          }}
          className={` cursor-pointer hover:bg-[white]/30 group px-2 py-3 rounded-lg duration-500 flex items-center gap-6 ${
            pathname == "/dashboard/settings" && "bg-white-100/30"
          }`}
        >
          <DashboardIcon
            title={"Setting"}
            active={pathname == "/dashboard/settings"}
          />
          <p
            className={`${
              pathname == "/dashboard/settings"
                ? "text-[#ffffff]"
                : "text-white-400"
            } group-hover:text-[#fff] duration-500`}
          >
            Settings
          </p>
        </div> */}
        {!isLoading && (
          <div className="flex gap-4 items-center  hover:bg-[white]/10 duration-300 p-2 rounded-lg cursor-pointer mt-3">
            <span className="grid place-items-center bg-[#fc2d06] h-[45px] w-[45px] text-[0.75rem] font-semibold text-white-50 rounded-[27.5px]">
              {details?.name
                ?.split(" ")
                ?.map((e: string, i: number, arr: string[]) => {
                  if (i == 0 || i == arr.length - 1) {
                    return e.charAt(0);
                  }
                  return "";
                })
                ?.join(" ")}
            </span>
            <div>
              <h4 className="text-white-50 text-[0.9rem] font-medium">
                {details?.name}
              </h4>
              <p className="text-[0.8rem] font-extralight text-white-200">
                {details?.role.split("_")?.join("  ")}
              </p>
            </div>
          </div>
        )}
        <div
          className="text-white-50 flex gap-6 cursor-pointer bg-[white]/5 group px-2 py-3 rounded-lg  duration-500 items-center mt-3"
          onClick={() => {
            r("/");
            localStorage.removeItem("auth");
          }}
        >
          <Icon.LogoutCurve size={20} />
          <p>Logout</p>
        </div>
      </section>
    </div>
  );
};

export default DashboardNavbar;
