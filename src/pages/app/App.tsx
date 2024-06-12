import { useAdminInfo } from "../../store/adminInfo";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import { Calendar, Notification } from "iconsax-react";
import { formatDate } from "../../utils";
const App = () => {
  const { setDetails, details } = useAdminInfo((s) => s);

  const stats = [
    {
      h1: "Water Consumption",
      value: "1439",
      unit: "Gal",
    },
    {
      h1: "Revenue",
      value: "2,324.43",
      unit: "Gh¢",
    },
    {
      h1: "Non-Revenue",
      value: " 342.32",
      unit: "Gh¢",
    },
    {
      h1: "Users",
      value: "234",
      unit: "MUA",
    },
  ];
  return (
    <div>
      <div className=" flex justify-between border-b-[0.75px] pb-3 gap-4 ">
        <div className="border-r-2 border-white-100 w-full flex items-center justify-between pr-4">
          <h4 className="font-medium text-mantis-950 text-[1.6rem]">
            Welcome Back,{" "}
            <span className="font-normal text-white-600">
              {" "}
              {details.name?.split(" ")?.[0]}
            </span>
          </h4>
          <div className=" px-3 cursor-pointer hover:bg-white-100 bg-white-100/50 duration-700  border-white-500 py-2  rounded-[0.4rem] flex items-center gap-4">
            <Calendar size="18" color="#656565" />
            <p>{formatDate(new Date())}</p>
          </div>
        </div>

        <div className="grid items-center  px-3 cursor-pointer hover:bg-white-100 bg-white-100/50 duration-700  border-white-500 rounded-[0.4rem]">
          <Notification size="18" color="#656565" />
        </div>
      </div>

      <div className="grid  grid-cols-12 pt-4 gap-6">
        <div className="col-span-12 grid grid-cols-4 gap-6">
          {stats.map((e, i) => {
            return (
              <div className="bg-white-50 p-6 rounded-md cursor-pointer duration-700 hover:scale-[1.05]">
                <div className=" flex items-center justify-between text-mantis-950 ">
                  <h2 className="text-[0.9rem] font-semibold text-mantis-950">
                    {e.h1}
                  </h2>
                  <ArrowUpRightIcon className="h-[1rem] text-mantis-950" />
                </div>
                <h4 className="text-[2rem] font-bold text-mantis-950 flex items-baseline gap-2">
                  <span className="text-[0.8rem] font-normal uppercase">
                    {e.unit}
                  </span>
                  {e.value}
                </h4>
              </div>
            );
          })}
        </div>

        <div className="col-span-8 bg-white-50 rounded-md h-[40vh] p-4">
          <div className="flex justify-between items-center">
            <p className="text-mantis-950">Consumption Data</p>
          </div>
        </div>
        <div className="col-span-4 bg-white-50 rounded-md h-[40vh] p-4">
          <div className="flex justify-between items-center">
            <p className="text-mantis-950">Recent Reports</p>
            <ArrowUpRightIcon className="h-[0.9rem] text-mantis-950 cursor-pointer" />
          </div>
        </div>
        <div className="col-span-12 bg-white-50 rounded-md h-[40vh] p-4">
          <div className="flex justify-between items-center">
            <p className="text-mantis-950">Recent Transactions</p>
            <ArrowUpRightIcon className="h-[0.9rem] text-mantis-950 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
