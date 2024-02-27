import PropTypes from "prop-types";
import React from "react";
import { connect, useSelector } from "react-redux";

//i18n
import SidebarContent from "./SidebarContent";

import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.svg";
import logoLightPng from "../../assets/images/logo-light.png";
import logoLightSvg from "../../assets/images/logo-light.svg";
import logoDark from "../../assets/images/logo-dark.png";
import SimpleBar from "simplebar-react";

const Sidebar = (props) => {
  const userData = useSelector((store) => store.userData.userData);

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logo} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoDark} alt="" height="17" />
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src={logoLightSvg} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoLightPng} alt="" height="19" />
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100">
          {userData.role == "student" && (
            <SimpleBar className="h-100">
              <div id="sidebar-menu">
                <ul className="metismenu list-unstyled" id="side-menu">
                  <li className="menu-title">Menu </li>
                  <li>
                    <Link to="/pending" className="">
                      <i className="bx bx-chat"></i>
                      <span>Pending User</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </SimpleBar>
          )}
          {userData.role == "employee" && (
            <SimpleBar className="h-100">
              <div id="sidebar-menu">
                <ul className="metismenu list-unstyled" id="side-menu">
                  <li className="menu-title">Menu </li>
                  <li>
                    <Link to="/pending" className="">
                      <i className="bx bx-chat"></i>
                      <span>Pending User</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </SimpleBar>
          )}
          {userData.role == "admin" && (
            <SimpleBar className="h-100">
              <div id="sidebar-menu">
                <ul className="metismenu list-unstyled" id="side-menu">
                  <li className="menu-title">Menu </li>
                  <li>
                    <Link to="/user-list" className="">
                      <i className="bx bx-chat"></i>
                      <span>User Management</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </SimpleBar>
          )}{" "}
        </div>

        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

export default Sidebar;
