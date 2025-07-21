// import {
//   createBrowserRouter,
// } from "react-router";
// import RootLayout from "../Layout/RootLayout";
// import HomePage from "../Pages/HomePage";
// import Login from "../Pages/Login";
// import Register from "../Pages/Register";
// import Apartment from "../Component/Apartment";
// import ApplyAgreement from "../Pages/ApplyAgreement";
// import PrivateRoute from "../Routes/PrivateRoute";
// import ErrorPage from "../Pages/ErrorPage";



// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout></RootLayout>,
//     children: [
//         {
//             index: true,
//             element: <HomePage></HomePage>,
//         },
//         {
//           path: '/apartment',
//           element: <Apartment></Apartment>
//         },
//        {
//        path: '/apply-agreement/:id',
//         element: (
//           <PrivateRoute>
//             <ApplyAgreement />
//           </PrivateRoute>
//         ),
//       },
//     ],
//   },
//   {
//     path:"/login",
//     element: <Login></Login>,
//   },
//   {
//     path: "/register",
//     element: <Register></Register>,
//   },
//   {
//     path: "*",
//     element: <ErrorPage></ErrorPage>,
//   }
// ]);




// src/router/router.jsx
import { createBrowserRouter } from "react-router"; // react-router-dom থেকে
import RootLayout from "../Layout/RootLayout";
import HomePage from "../Pages/HomePage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Apartment from "../Component/Apartment";
import ApplyAgreement from "../Pages/ApplyAgreement";
import PrivateRoute from "../Routes/PrivateRoute";
import ErrorPage from "../Pages/ErrorPage";
// নতুন ড্যাশবোর্ড লেআউট
 // এই পেজগুলো পরে তৈরি করতে হবে


// import ManageMembers from "../Pages/Dashboard/ManageMembers";
// import MakeAnnouncement from "../Pages/Dashboard/MakeAnnouncement";
// import AgreementRequests from "../Pages/Dashboard/AgreementRequests";
// import ManageCoupons from "../Pages/Dashboard/ManageCoupons";
// import AdminProfile from "../Pages/Dashboard/AdminProfile"; // চ্যালেঞ্জ টাস্ক
 // নতুন রোল-ভিত্তিক রাউট
// import AdminRoute from "../Routes/AdminRoute"; // নতুন রোল-ভিত্তিক রাউট
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
                path: '/apartment',
                element: <Apartment />
            },
            {
                path: '/apply-agreement/:id',
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
            <PrivateRoute> {/* ড্যাশবোর্ড অ্যাক্সেস করতে লগইন প্রয়োজন */}
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            // User Dashboard Routes
            {
                path: "my-profile",
                element: <MyProfile />,
            },
            {
                path: "announcements",
                element: <Announcements />,
            },
            // Member Dashboard Routes (only accessible to members)
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
            // Admin Dashboard Routes (only accessible to admins)
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
            // Default dashboard route for authenticated users
            {
                index: true, // This will be the default route for /dashboard
                element: <MyProfile />, // Or redirect based on role if preferred
            },
        ],
    },
    {
        path: "*",
        element: <ErrorPage />,
    }
]);