import React, { useState } from "react";
import { useQuery } from "react-query";
import { recentReports } from "../../api/queries/reports";
import NoData from "../shared/NoData";
import { Message } from "iconsax-react";

const RecentComponents = () => {
  const [data, setData] = useState([]);
  const { isFetching, refetch } = useQuery({
    queryFn: recentReports,
    queryKey: "recent-reports",
    onError: (err) => {
      console.error(err);
    },
    onSuccess(data) {
      setData(data.data.data);
    },
  });
  return (
    <div className="overflow-y-scroll scroll-hidden">
      {isFetching ? (
        <div className="grid grid-cols-1 gap-3 pt-4">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : data?.length == 0 ? (
        <div className="pt-6">
          <NoData />
        </div>
      ) : (
        <div>
          {data?.map((e, i) => {
            return (
              <div key={i} className="grid grid-cols-6 pt-4">
                <div className="col-span-1">
                  <div className="bg-mantis-950 h-[45px] rounded-[22.5px] grid place-content-center w-[45px]">
                    <Message size="20" color="#ffffff" />
                  </div>
                </div>
                <div className="col-span-5">
                  <h4 className="text-[0.9rem] font-semibold">{e.title}</h4>
                  <p className="text-mountain-mist-300 font-normal text-[0.8rem]">
                    By: {e?.userId?.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
function Skeleton() {
  return (
    <div className="animate-pulse grid grid-cols-6">
      <div>
        <div className="h-[50px] w-[50px] rounded-[25px] bg-mountain-mist-200"></div>
      </div>
      <div className="col-span-5 flex items-start justify-around flex-col">
        <div className="h-3 bg-mountain-mist-200 rounded-md w-full"></div>
        <div className="h-3 bg-mountain-mist-200 rounded-md w-[40%]"></div>
      </div>
    </div>
  );
}
export default RecentComponents;
