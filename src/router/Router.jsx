import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import { authRoutes, commonRoutes, loginRoutes } from "./allRoutes";
import ProtectedRouteTwo from "./ProtectedRouteTwo";
import { Spinner } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Layout from "../components/VerticalLayout";

const Router = () => {
  const userData = useSelector((store) => store.userData.userData);
  console.log(userData, "userda");
  const FallbackLoadingComponent = () => {
    return (
      <div>
        <div className="text-center p-3">
          <Spinner animation="border" variant="primary" />
        </div>
      </div>
    );
  };

  return (
    <>
      <Suspense fallback={<FallbackLoadingComponent />}>
        <Routes>
          {authRoutes.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={
                <ProtectedRoute role={userData?.role}>
                  <Layout>
                    {" "}
                    <item.component />
                  </Layout>
                </ProtectedRoute>
              }
            />
          ))}
          {loginRoutes.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={
                <ProtectedRouteTwo role={userData?.role}>
                  <item.component />
                </ProtectedRouteTwo>
              }
            />
          ))}

          {commonRoutes.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<item.component />}
            />
          ))}
        </Routes>
      </Suspense>
      <Toaster
        position="top-center"
        gutter={22}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
        }}
      />
    </>
  );
};

export default Router;
