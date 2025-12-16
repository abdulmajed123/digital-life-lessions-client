import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import DashboardLayout from "../Layout/DashboardLayout";
import AddLesson from "../Pages/Dashboard/AddLesson/AddLesson";
import MyLessons from "../Pages/Dashboard/MyLessons/MyLessons";
import PremiumPage from "../Pages/PremiumPage/PremiumPage";
import Profile from "../Pages/Dashboard/Profile/Profile";
import MyFavorite from "../Pages/Dashboard/MyFavorite/MyFavorite";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess/PaymentSuccess";
import PublicLessons from "../Pages/PuplicLessons/PublicLessons";
import LessonDetails from "../Component/LessonDetails/LessonDetails";
import LessonUpdate from "../Component/LessonUpdate/LessonUpdate";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import ManageLessons from "../Pages/Dashboard/ManageLessons/ManageLessons";
import ReportedLessons from "../Pages/Dashboard/ReportedLessons/ReportedLessons";
import ErrorPage from "../Component/ErrorPage/ErrorPage";
import PaymentCancel from "../Pages/Dashboard/Payment/PaymentCancel/PaymentCancel";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import AdminProfile from "../Pages/Dashboard/Profile/AdminProfile";
import AdminRoute from "./AdminRoute";
import Forbidden from "../Component/Forbidden/Forbidden";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/premium",
        element: <PremiumPage></PremiumPage>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/public-lessons",
        element: <PublicLessons></PublicLessons>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "/lesson/:id",
        element: (
          <PrivateRoutes>
            <LessonDetails></LessonDetails>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "admin-profile",
        element: (
          <AdminRoute>
            <AdminProfile></AdminProfile>
          </AdminRoute>
        ),
      },
      {
        path: "payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "payment-cancel",
        element: <PaymentCancel></PaymentCancel>,
      },
      {
        path: "add-lesson",
        element: <AddLesson></AddLesson>,
      },
      {
        path: "lesson-update/:id",
        element: <LessonUpdate></LessonUpdate>,
      },
      {
        path: "my-lessons",
        element: <MyLessons></MyLessons>,
      },
      {
        path: "my-favorite",
        element: <MyFavorite></MyFavorite>,
      },
      {
        path: "manage-user",
        element: (
          <AdminRoute>
            {" "}
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manage-lesson",
        element: (
          <AdminRoute>
            <ManageLessons></ManageLessons>
          </AdminRoute>
        ),
      },
      {
        path: "reported-lessons",
        element: (
          <AdminRoute>
            <ReportedLessons></ReportedLessons>
          </AdminRoute>
        ),
      },
      {
        path: "forbidden",
        element: <Forbidden></Forbidden>,
      },
    ],
  },
]);

export default router;
