import { AreaChart } from "@tremor/react";
import { useEffect, useState } from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { formatDate, returnGroupedAndTotal } from "../../utils";
import { useMeterReadingsGroupedByDay } from "../../hooks/useConsumption";
const Settings = () => {
  const [cd, setCd] = useState([]);
  const [pc, setPc] = useState([]);
  const [T, setT] = useState()
  const { groupedData, loading } = useMeterReadingsGroupedByDay();

  useEffect(() => {
    if (!loading && groupedData.length !=0 ) {
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
      let fy;
      const cleanPy = chartdata.map((e) => {
        return {
          name: e.hour,
          value: e.totalConsumption,
        };
      });
      setPc(cleanPy);
      setCd(cleanChartData);
    }
  }, [loading]);


  useEffect(() => {
    const t = returnGroupedAndTotal().then((d) => {
      const m = Object.keys(d).find((e) => {
        return new Date(e)?.getTime() == 1722384000000;
      });

    });
  }, []);

  return (
    <div className="grid grid-cols-12 min-h-[90svh] gap-4">
      <div className="flex items-center justify-between col-span-12">
        <h4 className="font-bold text-mantis-950 text-[2.3rem]">Reports</h4>
      </div>
      {/* <ResponsiveContainer width="100%" height="100%"> */}
      <div className="col-span-6">
        <h4 className=" text-[2rem] text-mantis-950">Date: {formatDate(new Date())}</h4>
        {/* <h4>Total Consumption: {T} </h4> */}
      </div>
      <div className="col-span-6 grid place-content-center">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={pc as any}
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#062865"
            label
          />
          <Tooltip />
        </PieChart>
        <h4 className="text-center">Pie Chart of each hour and thee consumption</h4>
      </div>

      <div className="col-span-12 ">
        <AreaChart
          data={cd}
          index="time"
          categories={["consumption"]}
          colors={["indigo"]}
          // valueFormatter={dataFormatter}
          yAxisWidth={60}
        />
      </div>
      {/* </ResponsiveContainer> */}
    </div>
  );
};

export default Settings;
