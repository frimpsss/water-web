const stats = ({
  totalAmountPaidOverall,
  totalAmountPaidThisMonth,
  totalAmountPaidThisWeek,
  totalAmountPaidToday,
  loading,
}: {
  totalAmountPaidToday: number;
  totalAmountPaidThisWeek: number;
  totalAmountPaidThisMonth: number;
  totalAmountPaidOverall: number;
  loading: boolean;
}) => {
  const stats = [
    {
      h1: "Today",
      value: totalAmountPaidToday.toFixed(2),
      unit: `Gh¢`,
    },
    {
      h1: "This Week",
      value: totalAmountPaidThisWeek.toFixed(2),
      unit: `Gh¢`,
    },
    {
      h1: "This Month",
      value: totalAmountPaidThisMonth.toFixed(2),
      unit: `Gh¢`,
    },
    {
      h1: "Total",
      value: totalAmountPaidOverall.toFixed(2),
      unit: `Gh¢`,
    },
  ];
  return (
    <div className="col-span-12 row-span-2 flex flex-col gap-6">
      <div className="flex items-center justify-between col-span-12 ">
        <h4 className="font-bold text-mantis-950 text-[2.3rem]">
          Transactions
        </h4>
      </div>
      <div
        className={`col-span-12 grid grid-cols-4 gap-6 ${
          loading && "animate-pulse"
        }`}
      >
        {loading
          ? [1, 2, 3, 4].map((e, i) => {
              return (
                <div
                  key={i}
                  className="bg-mountain-mist-100 rounded-md h-[8rem]"
                >
                  {" "}
                </div>
              );
            })
          : stats.map((e, i) => {
              return (
                <div
                  className="bg-white-50 p-6 rounded-md cursor-pointer duration-700 hover:scale-[1.05] flex flex-col justify-between"
                  key={i}
                >
                  <div className=" flex items-center justify-between text-mantis-950 ">
                    <h2 className="text-[0.9rem] font-semibold text-mantis-950">
                      {e.h1}
                    </h2>
                    {/* <ArrowUpRightIcon className="h-[1rem] text-mantis-950" /> */}
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
    </div>
  );
};

export default stats;
