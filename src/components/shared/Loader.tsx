import { ThreeCircles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">
      <ThreeCircles
        visible={true}
        height="50"
        width="50"
        color="#062865"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
