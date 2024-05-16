import * as Icon from "iconsax-react";
import whitelogo from "../../assets/logo-white.svg";
import DashboardIcon from "./DashboardIcon";
import { useLocation } from "react-router-dom";

const DashboardNavbar = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  const nav_links = [
    {
      title: "Home",
      link: "/dashboard",
      icon: "Activity",
    },
    {
      title: "Transactions",
      link: "/transactions",
      icon: "TransactionMinus",
    },
    {
      title: "Tariffs",
      link: "/tariffs",
      icon: "WalletMoney",
      children: [
        {
          title: "Set Tariffs",
          path: "/tarrifs/set-tarrifs",
        },
        {
          title: "Change Log",
          path: "/tarrifs/change-log",
        },
      ],
    },
    {
      title: "Billing",
      link: "/billing",
      icon: "TableDocument",
    },
    {
      title: "Reports",
      link: "/reports",
      icon: "DocumentUpload",
    },
    {
      title: "Messages",
      link: "/messages",
      icon: "Message2",
      children: [
        {
          title: "Send Messages",
          path: "/messages/send",
        },
        {
          title: "All Messages",
          path: "/messages/all",
        },
      ],
    },
    {
      title: "Customer Data",
      link: "/customers",
      icon: "UserSquare",
    },
    {
      title: "Meter Data",
      link: "/meters",
      icon: "MainComponent",
    },
  ];
  return (
    <div className="w-full h-full bg-ebony-950 bg- px-4 py-6 flex flex-col justify-between">
      <section className="">
        <div className="flex gap-4 items-center mb-8">
          <img src={whitelogo} className="w-[30px]" />
          <h1 className="text-[#fff] font-medium text-[1.5rem]">Aquatrack</h1>
        </div>

        {/* nav */}
        <nav className=" flex flex-col gap-4">
          {nav_links.map((e, k) => {
            return (
              <div
                key={k}
                className={` cursor-pointer hover:bg-[white]/30 group px-2 py-3 rounded-lg duration-500 flex items-center gap-6 ${
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
        <div className="flex gap-4 items-center  hover:bg-[white]/10 duration-300 p-2 rounded-lg cursor-pointer">
          <span className="grid place-items-center bg-[#fc2d06] h-[45px] w-[45px] text-[0.75rem] font-semibold text-white-50 rounded-[27.5px]">
            AF
          </span>
          <div>
            <h4 className="text-white-50 text-[0.9rem] font-medium">Akwasi Frimpong</h4>
            <p className="text-[0.8rem] font-extralight text-white-200">Adminstrator</p>
          </div>
        </div>
        <div className="text-white-50 flex gap-6 cursor-pointer bg-[white]/5 group px-2 py-3 rounded-lg  duration-500 items-center mt-6">
          <Icon.LogoutCurve size={20} />
          <p>Logout</p>
        </div>
      </section>
    </div>
  );
};

export default DashboardNavbar;
