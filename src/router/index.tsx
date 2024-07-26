import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "../components/shared/Loader";
const AuthLayout = lazy(() => import("../layouts/auth/Auth.layout"));
const Signin = lazy(() => import("../pages/auth/Signin"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const MainApp = lazy(() => import("../pages/app/App"));
const DashboardLayout = lazy(() => import("../layouts/app/DashboardLayout"));
const Billing = lazy(() => import("../pages/app/Billing"));
const Customers = lazy(() => import("../pages/app/Customers"));
const Messages = lazy(() => import("../pages/app/Messages"));
const Meters = lazy(() => import("../pages/app/Meters"));
const Transactions = lazy(() => import("../pages/app/Transactions"));
const Tarrifs = lazy(() => import("../pages/app/Tarrifs"));
const Reports = lazy(() => import("../pages/app/Reports"));
const Settings = lazy(() => import("../pages/app/Analytics"));

const LazyWrapper = ({ children }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);
export const router = createBrowserRouter([
  {
    path: "/auth/",
    element: (
      <LazyWrapper>
        <AuthLayout />
      </LazyWrapper>
    ),
    children: [
      {
        path: "login",
        element: (
          <LazyWrapper>
            <Signin />
          </LazyWrapper>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <LazyWrapper>
            <ForgotPassword />
          </LazyWrapper>
        ),
      },
    ],
  },
  {
    element: (
      <LazyWrapper>
        <AuthLayout />
      </LazyWrapper>
    ),
    children: [
      {
        path: "/",
        element: (
          <LazyWrapper>
            <Signin />
          </LazyWrapper>
        ),
      },
    ],
  },
  {
    path: "/dashboard/",
    element: (
      <LazyWrapper>
        <DashboardLayout />
      </LazyWrapper>
    ),
    children: [
      {
        path: "",
        element: (
          <LazyWrapper>
            <MainApp />
          </LazyWrapper>
        ),
      },
      {
        path: "transactions",
        element: (
          <LazyWrapper>
            <Transactions />
          </LazyWrapper>
        ),
      },
      {
        path: "billing",
        element: (
          <LazyWrapper>
            <Billing />
          </LazyWrapper>
        ),
      },
      {
        path: "reports",
        element: (
          <LazyWrapper>
            <Reports />
          </LazyWrapper>
        ),
      },
      {
        path: "messages",
        element: (
          <LazyWrapper>
            <Messages />
          </LazyWrapper>
        ),
      },
      {
        path: "tariffs",
        element: (
          <LazyWrapper>
            <Tarrifs />
          </LazyWrapper>
        ),
      },
      {
        path: "meters",
        element: (
          <LazyWrapper>
            <Meters />
          </LazyWrapper>
        ),
      },
      {
        path: "customers",
        element: (
          <LazyWrapper>
            <Customers />
          </LazyWrapper>
        ),
      },
      {
        path: "analytics",
        element: (
          <LazyWrapper>
            <Settings />
          </LazyWrapper>
        ),
      },
    ],
  },
]);
