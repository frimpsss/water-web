import { ThreeCircles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="absolute w-screen h-full grid items-center left-0 right-0 top-0 bottom-0 z-50">
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
