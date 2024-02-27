import { Routes, Route } from "react-router-dom";
import Router from "./router/Router";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setUser } from "./Redux/slices/userSlice";
import { useEffect } from "react";
import { verifyUser } from "./API/Auth/verifyUser";

// Import scss
import "./assets/scss/theme.scss";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Router />} />
      </Routes>
    </>
  );
};

export default App;
