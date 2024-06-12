import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.tsx";
function App() {
  return (
    <>
      <div className="grid items-center justify-center h-screen w-screen lg:hidden px-6 text-center">
        <p>Trust me the experience is worth it on a larger screen</p>
      </div>
      <div className="sm:hidden md:hidden lg:block">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
