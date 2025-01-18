import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import AuthLayout from "../layouts/auth";
import Login from "../pages/auth/Login";
import PagesLayout from "../layouts/pages";
import Home from "../pages/Home";
import Registration from "../pages/registration";
import SignUp from "../pages/auth/Signup";
import Masters from "../pages/Masters";
import Doctor from "../pages/Doctor";
import PaymentLedger from "../pages/PaymentLedger";
import ApptMainScreen from "../pages/Appointment/Main";
import Pnf from "../components/shared/PageNotFound";
import Patients from "../pages/Tracking/Patients";
import AllAppointments from "../pages/Tracking/AllAppointments";
import WorkInProgress from "../components/shared/WorkInProgress";
import ServiceBilling from "../pages/ServiceBilling";

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Navigate to={"/auth/login"} replace />,
    },
    {
      path: "auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        { path: "signup", element: <SignUp /> },
      ],
    },
    {
      path: "pages",
      element: <PagesLayout />,
      children: [
        {
          path: "home",
          index: true,
          element: <Home />,
        },
        {
          path: "registration",
          element: <Registration />,
        },
        {
          path: "appointment",
          element: <ApptMainScreen />,
        },
        {
          path: "serviceBilling",
          element: <ServiceBilling />,
        },
        {
          path: "doctor",
          element: <Doctor />,
        },
        {
          path: "paymentLedger",
          element: <PaymentLedger />,
        },
        {
          path: "masters",
          element: <Masters />,
        },
        {
          path: "tracking",
          children: [
            {
              path: "allAppointments",
              element: <AllAppointments />,
            },
            {
              path: "patients",
              element: <Patients />,
            },
          ],
        },
        {
          path: "*",
          element: <Pnf />,
        },
      ],
    },
  ]);
  return routes;
};

export default AppRoutes;
