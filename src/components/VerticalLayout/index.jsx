import PropTypes from "prop-types";
import React, { useEffect } from "react";

// Layout Related Components
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

//redux
import { useSelector, useDispatch } from "react-redux";

const Layout = (props) => {
  const dispatch = useDispatch();

  // const {
  //   isPreloader,
  //   leftSideBarThemeImage,
  //   layoutWidth,
  //   leftSideBarType,
  //   topbarTheme,
  //   showRightSidebar,
  //   leftSideBarTheme,
  //   layoutModeType,
  // } = useSelector((state) => ({
  //   isPreloader: state.Layout.isPreloader,
  //   layoutModeType: state.Layout.layoutModeType,
  //   leftSideBarThemeImage: state.Layout.leftSideBarThemeImage,
  //   leftSideBarType: state.Layout.leftSideBarType,
  //   layoutWidth: state.Layout.layoutWidth,
  //   topbarTheme: state.Layout.topbarTheme,
  //   showRightSidebar: state.Layout.showRightSidebar,
  //   leftSideBarTheme: state.Layout.leftSideBarTheme,
  // }));

  // const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // //hides right sidebar on body click
  // const hideRightbar = (event) => {
  //   var rightbar = document.getElementById("right-bar");
  //   //if clicked in inside right bar, then do nothing
  //   if (rightbar && rightbar.contains(event.target)) {
  //     return;
  //   } else {
  //     //if clicked in outside of rightbar then fire action for hide rightbar
  //     dispatch(showRightSidebarAction(false));
  //   }
  // };

  /*
  layout  settings
  */
  useEffect(() => {
    //init body click event fot toggle rightbar

    document.getElementById("preloader").style.display = "none";
    document.getElementById("status").style.display = "none";
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <div id="preloader">
        <div id="status">
          <div className="spinner-chase">
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
          </div>
        </div>
      </div>

      <div id="layout-wrapper">
        <Header />
        <Sidebar />
        <div className="main-content">{props.children}</div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Layout;
