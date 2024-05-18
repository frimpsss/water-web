import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/auth/Auth.layout";
import Signin from "../pages/auth/Signin";
import { default as MainApp } from "../pages/app/App";
import ForgotPassword from "../pages/auth/ForgotPassword";
import DashboardLayout from "../layouts/app/DashboardLayout";
import Billing from "../pages/app/Billing";
import Customers from "../pages/app/Customers";
import Messages from "../pages/app/Messages";
import Meters from "../pages/app/Meters";
import Transactions from "../pages/app/Transactions";
import Tarrifs from "../pages/app/Tarrifs";
import Reports from "../pages/app/Reports";

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
    path: "/dashboard/",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <MainApp />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "billing",
        element: <Billing />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "tariffs",
        element: <Tarrifs />,
      },
      {
        path: "meters",
        element: <Meters />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
    ],
  },
]);
