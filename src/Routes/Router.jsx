import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Auth from "../Pages/Auth/Auth";
import PrivetRoute from "./PrivetRoute";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import Profile from "../Pages/DashBoard/Profile/Profile";
import DonationReqForm from "../Pages/DashBoard/DonationReqForm/DonationReqForm";
import DashboardHome from "../Pages/DashBoard/DashboardHome/DashboardHome";
import MyDonationRequests from "../Pages/DashBoard/MyDonationRequests/MyDonationRequests";
import EditRequest from "../Pages/DashBoard/EditRequest/EditRequest";
import AllUsers from "../Pages/DashBoard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AdminVolunteerRoute from "./AdminVolunteerRoute";
import AllDonationRequests from "../Pages/DashBoard/AllDonationRequests/AllDonationRequests";

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
      {
        path: "/dashboard/my-donation-requests",
        Component: MyDonationRequests,
      },
      {
        path: "/dashboard/edit-request/:id",
        Component: EditRequest,
      },
      {
        path: "/dashboard/all-users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-blood-donation-requests",
        element: (
          <AdminVolunteerRoute>
            <AllDonationRequests></AllDonationRequests>
          </AdminVolunteerRoute>
        ),
      },
    ],
  },
]);
