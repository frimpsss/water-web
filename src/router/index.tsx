import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/auth/Auth.layout";
import Signin from "../pages/auth/Signin";
import { default as MainApp } from "../pages/app/App";
import ForgotPassword from "../pages/auth/ForgotPassword";
import DashboardLayout from "../layouts/app/DashboardLayout";
export const router = createBrowserRouter([
  {
    path: "/auth/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Signin />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Signin />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <MainApp />,
      },
    ],
  },
]);
