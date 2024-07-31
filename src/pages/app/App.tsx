import { useAdminInfo } from "../../store/adminInfo";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import { Calendar, Notification } from "iconsax-react";
import { formatDate, getMonthAndYear, monthNames } from "../../utils";
import { AreaChart } from "@tremor/react";
import TableComponent, {
  HeadersPropsWithRef,
} from "../../components/shared/table/TableComponent";
import { useQuery } from "react-query";
import { recentTxns } from "../../api/queries/txns";
import { useEffect, useState } from "react";
import RecentComponents from "../../components/home/RecentComponents";
import { getStats } from "../../api/queries/info";
import _ from "lodash";
import { useMeterReadingsGroupedByDay } from "../../hooks/useConsumption";

interface IStats {
  consumption: number | string;
  revenue: number | string;
  meters: number;
  users: number;
}
const App = () => {
  const [cd, setCd] = useState([]);
  const { setDetails, details } = useAdminInfo((s) => s);
  const { groupedData, loading } = useMeterReadingsGroupedByDay();

useEffect(()=>{
  if (!loading) {
    const toBeDisplayed = groupedData?.filter((e) => {
      return new Date(e.date)?.getTime() == 1722384000000;
    });

    const chartdata = Object.values(toBeDisplayed?.[0]?.hourlyData);
    const cleanChartData = chartdata.map((e) => {
      return {
        time: e.hour,
        consumption: e.totalConsumption,
      };
    });

    setCd(cleanChartData);
  }
},[loading])

  const [data, setData] = useState();
  const [statsData, setStatsData] = useState<IStats>({
    consumption: 0,
    revenue: 0,
    meters: 0,
    users: 0,
  });

  const { isFetching: fetchingStats } = useQuery({
    queryFn: getStats,
    queryKey: "get-stats",
    onSuccess: (data) => {
      setStatsData({
        consumption: Number(
          parseFloat(data.data.data.totalConsumption).toFixed(2)
        ),
        revenue: Number(parseFloat(data.data.data.all_txns).toFixed(2)).toFixed(
          2
        ),
        meters: parseInt(data.data.data.all_meters),
        users: parseInt(data.data.data.all_users),
      });
    },
  });

  const stats = [
    {
      h1: "Water Consumption",
      value: statsData.consumption,
      unit: "LITERS",
    },
    {
      h1: "Revenue",
      value: statsData.revenue,
      unit: "Gh¢",
    },
    {
      h1: "Meters",
      value: statsData.meters,
      unit: "Units",
    },
    {
      h1: "Users",
      value: statsData.users,
      unit: "MUA",
    },
  ];

  const { isFetching, refetch } = useQuery({
    queryFn: recentTxns,
    queryKey: "recent-txns",
    onError: (err) => {
      console.error(err);
    },
    onSuccess(data) {
      setData(data.data.data);
    },
  });
  const tableHeaders: HeadersPropsWithRef[] = [
    {
      ref: "txnData.transactionRef.trxref",
      span: "col-span-2",
      title: "Reference",
      type: "text",
    },
    {
      ref: "userId.name",
      span: "col-span-3",
      title: "Name",
      type: "text",
    },
    {
      ref: "billId.billingPeriodStart",
      span: "col-span-3",
      title: "Description",
      type: "element",
      component(value) {
        return (
          <p className="text-[0.86rem] text-mountain-mist-500">
            Bill payment for {monthNames[getMonthAndYear(value).month - 1]} -{" "}
            {getMonthAndYear(value).year}
          </p>
        );
      },
    },
    {
      ref: "createdAt",
      span: "col-span-2",
      title: "Date",
      type: "element",
      component: (value) => {
        return (
          <p className="text-[0.86rem] text-mountain-mist-500">
            {value && formatDate(new Date(value))}
          </p>
        );
      },
    },
    {
      ref: "billId.totalAmountDue",
      span: "col-span-2",
      title: "Amount",
      type: "element",
      component: (value) => {
        return (
          <p className="text-[0.86rem] text-mountain-mist-500">
            GHS {value && parseFloat(value).toFixed(2)}
          </p>
        );
      },
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
          {fetchingStats
            ? [1, 2, 3, 4].map((e, i) => {
                return (
                  <div
                    key={e + Date.now()}
                    className="bg-mountain-mist-100 rounded-md h-[8rem]"
                  >
                    {" "}
                  </div>
                );
              })
            : stats?.map((e, i) => {
                return (
                  <div className="bg-white-50 p-6 rounded-md cursor-pointer duration-700 hover:scale-[1.05] flex flex-col justify-between">
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

        <div className="col-span-8 bg-white-50 rounded-md  p-4">
          <div className="flex justify-between items-center">
            <p className="text-mantis-950">Consumption Data</p>
          </div>
          <div className="overflow-scroll">
            <AreaChart
              data={cd}
              index="time"
              categories={["consumption"]}
              colors={["indigo"]}
              // valueFormatter={dataFormatter}
              yAxisWidth={60}
            />
          </div>
        </div>
        <div className="col-span-4 bg-white-50 rounded-md  p-4 ">
          <div className="flex justify-between items-center">
            <p className="text-mantis-950">Recent Reports</p>
            <ArrowUpRightIcon className="h-[0.9rem] text-mantis-950 cursor-pointer" />
          </div>
          <div>
            <RecentComponents />
          </div>
        </div>
        <div className="col-span-12 bg-white-50 rounded-md  p-4">
          <div className="flex justify-between items-center">
            <p className="text-mantis-950">Recent Transactions</p>
            <ArrowUpRightIcon className="h-[0.9rem] text-mantis-950 cursor-pointer" />
          </div>
          <div>
            <TableComponent
              headers={tableHeaders}
              data={data}
              actions={[]}
              loading={isFetching}
              showPagination={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
