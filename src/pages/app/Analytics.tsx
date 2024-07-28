import { AreaChart } from "@tremor/react";
import { useEffect } from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { dataFromFirebase } from "../../utils/firebase";
import { returnGroupedAndTotal } from "../../utils";
const Settings = () => {
  const data01 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 278 },
    { name: "Group F", value: 189 },
  ];
  useEffect(() => {
    // returnGroupedAndTotal()
  });
  const datahero = [
    {
      name: "Noche Holding AG",
      value: 9800,
    },
    {
      name: "Rain Drop AG",
      value: 4567,
    },
    {
      name: "Push Rail AG",
      value: 3908,
    },
    {
      name: "Flow Steal AG",
      value: 2400,
    },
    {
      name: "Tiny Loop Inc.",
      value: 2174,
    },
    {
      name: "Anton Resorts Holding",
      value: 1398,
    },
  ];
  const chartdata = [
    {
      date: "Jan 22",
      SolarPanels: 2890,
      Inverters: 2338,
    },
    {
      date: "Feb 22",
      SolarPanels: 2756,
      Inverters: 2103,
    },
    {
      date: "Mar 22",
      SolarPanels: 3322,
      Inverters: 2194,
    },
    {
      date: "Apr 22",
      SolarPanels: 3470,
      Inverters: 2108,
    },
    {
      date: "May 22",
      SolarPanels: 3475,
      Inverters: 1812,
    },
    {
      date: "Jun 22",
      SolarPanels: 3129,
      Inverters: 1726,
    },
    {
      date: "Jul 22",
      SolarPanels: 3490,
      Inverters: 1982,
    },
    {
      date: "Aug 22",
      SolarPanels: 2903,
      Inverters: 2012,
    },
    {
      date: "Sep 22",
      SolarPanels: 2643,
      Inverters: 2342,
    },
    {
      date: "Oct 22",
      SolarPanels: 2837,
      Inverters: 2473,
    },
    {
      date: "Nov 22",
      SolarPanels: 2954,
      Inverters: 3848,
    },
    {
      date: "Dec 22",
      SolarPanels: 3239,
      Inverters: 3736,
    },
  ];
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  const dataFormatter = (number) =>
    `$${Intl.NumberFormat("us").format(number).toString()}`;

  return (
    <div className="grid grid-cols-12 min-h-[90svh] gap-4">
      <div className="flex items-center justify-between col-span-12">
        <h4 className="font-bold text-mantis-950 text-[2.3rem]">Reports</h4>
      </div>
      {/* <ResponsiveContainer width="100%" height="100%"> */}
      <div className="col-span-6">
        <p>Consumtion Data btwn 2 dates</p>
      </div>
      <div className="col-span-6 grid place-content-center">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data01}
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#76d5ff"
            label
          />
          <Tooltip />
        </PieChart>
      </div>

      <AreaChart
        className="col-span-12 "
        data={chartdata}
        index="date"
        categories={["SolarPanels", "Inverters"]}
        colors={["indigo", "rose"]}
        valueFormatter={dataFormatter}
        yAxisWidth={60}
        onValueChange={(v) => console.log(v)}
      />
      {/* </ResponsiveContainer> */}
    </div>
  );
};

export default Settings;
