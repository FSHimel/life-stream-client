import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Auth from "../Pages/Auth/Auth";
import PrivetRoute from "./PrivetRoute";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import Profile from "../Pages/DashBoard/Profile/Profile";
import DonationReqForm from "../Pages/DashBoard/DonationReqForm/DonationReqForm";
import DashboardHome from "../Pages/DashBoard/DashboardHome/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/auth",
        Component: Auth,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivetRoute>
    ),
    children: [
      {
        path: "/dashboard",
        Component: DashboardHome,
      },
      {
        path: "/dashboard/profile",
        Component: Profile,
      },
      {
        path: "/dashboard/create-donation-request",
        Component: DonationReqForm,
      },
    ],
  },
]);
