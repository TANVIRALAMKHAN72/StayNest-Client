import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import HomePage from "../Pages/HomePage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Apartment from "../Component/Apartment";
import ApplyAgreement from "../Pages/ApplyAgreement";
import PrivateRoute from "../Routes/PrivateRoute";
import ErrorPage from "../Pages/ErrorPage";


import DashboardLayout from "../DashboardLayout ";
import MyProfile from "../Dashboard/MyProfile";
import Announcements from "../Dashboard/Announcements";
import MemberRoute from "../MemberRoute";
import AdminRoute from "../AdminRoute";
import MakePayment from "../Pages/MakePayment";
import PaymentHistory from "../Pages/PaymentHistory";
import AdminProfile from "../Pages/AdminProfile";
import ManageMembers from "../Pages/ManageMembers";
import MakeAnnouncement from "../Pages/MakeAnnouncement";
import AgreementRequests from "../Pages/AgreementRequests";
import ManageCoupons from "../Pages/ManageCoupons";
import BlogPage from "../Component/BlogPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/apartment",
        element: <Apartment />,
      },
      {
        path: "/blog",
        element: <BlogPage></BlogPage>,
      },
      {
        path: "/apply-agreement/:id",
        element: (
          <PrivateRoute>
            <ApplyAgreement />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "announcements",
        element: <Announcements />,
      },

      {
        path: "make-payment",
        element: (
          <MemberRoute>
            <MakePayment />
          </MemberRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <MemberRoute>
            <PaymentHistory />
          </MemberRoute>
        ),
      },

      {
        path: "admin-profile",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
      {
        path: "manage-members",
        element: (
          <AdminRoute>
            <ManageMembers />
          </AdminRoute>
        ),
      },
      {
        path: "make-announcement",
        element: (
          <AdminRoute>
            <MakeAnnouncement />
          </AdminRoute>
        ),
      },
      {
        path: "agreement-requests",
        element: (
          <AdminRoute>
            <AgreementRequests />
          </AdminRoute>
        ),
      },
      {
        path: "manage-coupons",
        element: (
          <AdminRoute>
            <ManageCoupons />
          </AdminRoute>
        ),
      },

      {
        index: true,
        element: <MyProfile />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
