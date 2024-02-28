import React, { Suspense, useEffect } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashBoard from "../pages/DashBoard";
import JobList from "../pages/JobPages/JobList";
import userManagement from "../pages/Admin/userManagement";
import jobListing from "../pages/Employee/jobListing";
import StudentJobListing from "../pages/Student/StudentJobListing";

export const authRoutes = [
  {
    path: "/dashboard",
    component: DashBoard,
  },
  {
    path: "/job-list",
    component: JobList,
  },
  { path: "/user-list", component: userManagement },
  { path: "/job-management", component: jobListing },
  { path: "/job-listing", component: StudentJobListing },
];

export const loginRoutes = [
  {
    path: "/login",
    component: Login,
  },

  {
    path: "/register",
    component: Register,
  },
];

export const commonRoutes = [];
