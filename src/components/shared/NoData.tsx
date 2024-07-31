import emptysvg from "../../assets/icons/empty.svg";

const NoData = () => {
  return (
    <div className="flex items-center justify-center flex-col py-6">
      <img src={emptysvg} className="h-[90px]" />
      <p className="font-normal mt-3">No data available</p>
    </div>
  );
};

export default NoData;
