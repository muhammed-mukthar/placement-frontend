import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { Link, useLocation } from "react-router-dom";

//i18n
import { useCallback } from "react";

const SidebarContent = (props) => {
  const ref = useRef();
  const path = useLocation();

  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
    activeMenu();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">Menu </li>
            <li>
              <Link to="/pending" className="">
                <i className="bx bx-chat"></i>
                <span>Pending User</span>
              </Link>
            </li>
            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-home-circle"></i>
                <span>Dashboards</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/dashboard">Default</Link>
                </li>
                <li>
                  <Link to="/dashboard-saas">Saas</Link>
                </li>
                <li>
                  <Link to="/dashboard-crypto">Crypto</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/dashboard-job">
                    <span
                      className="badge rounded-pill text-bg-success float-end"
                      key="t-new"
                    >
                      New
                    </span>
                    Job
                  </Link>
                </li>
              </ul>
            </li>

            <li className="menu-title">Apps</li>

            <li>
              <Link to="/calendar" className=" ">
                <i className="bx bx-calendar"></i>
                <span>Calendar</span>
              </Link>
            </li>

            <li>
              <Link to="/chat" className="">
                <i className="bx bx-chat"></i>
                <span>Chat</span>
              </Link>
            </li>
            <li>
              <Link to="/apps-filemanager">
                <i className="bx bx-file"></i>
                <span>File Manager</span>
              </Link>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-store"></i>
                <span>Ecommerce</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/ecommerce-products">Products</Link>
                </li>
                <li>
                  <Link to="/ecommerce-product-detail/1">Product Detail</Link>
                </li>
                <li>
                  <Link to="/ecommerce-orders">Orders</Link>
                </li>
                <li>
                  <Link to="/ecommerce-customers">Customers</Link>
                </li>
                <li>
                  <Link to="/ecommerce-cart">Cart</Link>
                </li>
                <li>
                  <Link to="/ecommerce-checkout">Checkout</Link>
                </li>
                <li>
                  <Link to="/ecommerce-shops">Shops</Link>
                </li>
                <li>
                  <Link to="/ecommerce-add-product">Add Product</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-bitcoin"></i>
                <span>Crypto</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/crypto-wallet">Wallet</Link>
                </li>
                <li>
                  <Link to="/crypto-buy-sell">Buy/Sell</Link>
                </li>
                <li>
                  <Link to="/crypto-exchange">Exchange</Link>
                </li>
                <li>
                  <Link to="/crypto-lending">Lending</Link>
                </li>
                <li>
                  <Link to="/crypto-orders">Orders</Link>
                </li>
                <li>
                  <Link to="/crypto-kyc-application">KYC Application</Link>
                </li>
                <li>
                  <Link to="/crypto-ico-landing">ICO Landing</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-envelope"></i>
                <span>Email</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/email-inbox">Inbox</Link>
                </li>
                <li>
                  <Link to="/email-read">Read Email </Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    <span key="t-email-templates">Templates</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/email-template-basic">Basic Action</Link>
                    </li>
                    <li>
                      <Link to="/email-template-alert">Alert Email </Link>
                    </li>
                    <li>
                      <Link to="/email-template-billing">Billing Email </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-receipt"></i>
                <span>Invoices</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/invoices-list">Invoice List</Link>
                </li>
                <li>
                  <Link to="/invoices-detail">Invoice Detail</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-briefcase-alt-2"></i>
                <span>Projects</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/projects-grid">Projects Grid</Link>
                </li>
                <li>
                  <Link to="/projects-list">Projects List</Link>
                </li>
                <li>
                  <Link to="/projects-overview">Project Overview</Link>
                </li>
                <li>
                  <Link to="/projects-create">Create New</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-task"></i>
                <span>Tasks</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/tasks-list">Task List</Link>
                </li>
                <li>
                  <Link to="/tasks-create">Create Task</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bxs-user-detail"></i>
                <span>Contacts</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/contacts-grid">User Grid</Link>
                </li>
                <li>
                  <Link to="/contacts-list">User List</Link>
                </li>
                <li>
                  <Link to="/contacts-profile">Profile</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bxs-detail" />

                <span>Blog</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/blog-list">Blog List</Link>
                </li>
                <li>
                  <Link to="/blog-grid">Blog Grid</Link>
                </li>
                <li>
                  <Link to="/blog-details">Blog Details</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#">
                <span
                  className="badge rounded-pill bg-success float-end"
                  key="t-new"
                >
                  New
                </span>
                <i className="bx bx-briefcase-alt"></i>
                <span key="t-jobs">Jobs</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/job-list">Job List</Link>
                </li>
                <li>
                  <Link to="/job-grid">Job Grid</Link>
                </li>
                <li>
                  <Link to="/job-apply">Apply Job</Link>
                </li>
                <li>
                  <Link to="/job-details">Job Details</Link>
                </li>
                <li>
                  <Link to="/job-categories">Jobs Categories</Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    Candidate
                  </Link>
                  <ul className="sub-menu" aria-expanded="true">
                    <li>
                      <Link to="/candidate-list">List</Link>
                    </li>
                    <li>
                      <Link to="/candidate-overview">Overview</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li className="menu-title">Pages</li>
            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-user-circle"></i>
                <span>Authentication</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/pages-login">Login</Link>
                </li>
                <li>
                  <Link to="/pages-login-2">Login 2</Link>
                </li>
                <li>
                  <Link to="/pages-register">Register</Link>
                </li>
                <li>
                  <Link to="/pages-register-2">Register 2</Link>
                </li>
                <li>
                  <Link to="/page-recoverpw">Recover Password</Link>
                </li>
                <li>
                  <Link to="/page-recoverpw-2">Recover Password 2</Link>
                </li>
                <li>
                  <Link to="/auth-lock-screen">Lock Screen</Link>
                </li>
                <li>
                  <Link to="/auth-lock-screen-2">Lock Screen 2</Link>
                </li>
                <li>
                  <Link to="/page-confirm-mail">Confirm Mail</Link>
                </li>
                <li>
                  <Link to="/page-confirm-mail-2">Confirm Mail 2</Link>
                </li>
                <li>
                  <Link to="/auth-email-verification">Email Verification</Link>
                </li>
                <li>
                  <Link to="/auth-email-verification-2">
                    Email Verification 2
                  </Link>
                </li>
                <li>
                  <Link to="/auth-two-step-verification">
                    Two Step Verification
                  </Link>
                </li>
                <li>
                  <Link to="/auth-two-step-verification-2">
                    Two Step Verification 2
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-file"></i>
                <span>Utility</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/pages-starter">Starter Page</Link>
                </li>
                <li>
                  <Link to="/pages-maintenance">Maintenance</Link>
                </li>
                <li>
                  <Link to="/pages-comingsoon">Coming Soon</Link>
                </li>
                <li>
                  <Link to="/pages-timeline">Timeline</Link>
                </li>
                <li>
                  <Link to="/pages-faqs">FAQs</Link>
                </li>
                <li>
                  <Link to="/pages-pricing">Pricing</Link>
                </li>
                <li>
                  <Link to="/pages-404">Error 404</Link>
                </li>
                <li>
                  <Link to="/pages-500">Error 500</Link>
                </li>
              </ul>
            </li>

            <li className="menu-title">Components</li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-tone"></i>
                <span>UI Elements</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/ui-alerts">Alerts</Link>
                </li>
                <li>
                  <Link to="/ui-buttons">Buttons</Link>
                </li>
                <li>
                  <Link to="/ui-cards">Cards</Link>
                </li>
                <li>
                  <Link to="/ui-carousel">Carousel</Link>
                </li>
                <li>
                  <Link to="/ui-dropdowns">Dropdowns</Link>
                </li>
                <li>
                  <Link to="/ui-grid">Grid</Link>
                </li>
                <li>
                  <Link to="/ui-images">Images</Link>
                </li>
                <li>
                  <Link to="/ui-lightbox">Lightbox</Link>
                </li>
                <li>
                  <Link to="/ui-modals">Modals</Link>
                </li>
                <li>
                  <Link to="/ui-offcanvas">OffCanvas</Link>
                </li>
                <li>
                  <Link to="/ui-rangeslider">Range Slider</Link>
                </li>
                <li>
                  <Link to="/ui-session-timeout">Session Timeout</Link>
                </li>
                <li>
                  <Link to="/ui-progressbars">Progress Bars</Link>
                </li>
                <li>
                  <Link to="/ui-placeholders">Placeholders</Link>
                </li>
                <li>
                  <Link to="/ui-tabs-accordions">Tabs & Accordions</Link>
                </li>
                <li>
                  <Link to="/ui-typography">Typography</Link>
                </li>
                <li>
                  <Link to="/ui-toasts">Toasts</Link>
                </li>
                <li>
                  <Link to="/ui-video">Video</Link>
                </li>
                <li>
                  <Link to="/ui-general">General</Link>
                </li>
                <li>
                  <Link to="/ui-colors">Colors</Link>
                </li>
                <li>
                  <Link to="/ui-rating">Rating</Link>
                </li>
                <li>
                  <Link to="/ui-notifications">Notifications</Link>
                </li>
                <li>
                  <Link to="/ui-utilities">
                    <span className="badge rounded-pill bg-success float-end">
                      New
                    </span>
                    Utilities
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="">
                <i className="bx bxs-eraser"></i>
                <span className="badge rounded-pill bg-danger float-end">
                  10
                </span>
                <span>Forms</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/form-elements">Form Elements</Link>
                </li>
                <li>
                  <Link to="/form-layouts">Form Layouts</Link>
                </li>
                <li>
                  <Link to="/form-validation">Form Validation</Link>
                </li>
                <li>
                  <Link to="/form-advanced">Form Advanced</Link>
                </li>
                <li>
                  <Link to="/form-editors">Form Editors</Link>
                </li>
                <li>
                  <Link to="/form-uploads">Form File Upload </Link>
                </li>
                <li>
                  <Link to="/form-repeater">Form Repeater</Link>
                </li>
                <li>
                  <Link to="/form-wizard">Form Wizard</Link>
                </li>
                <li>
                  <Link to="/form-mask">Form Mask</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-list-ul"></i>
                <span>Tables</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/tables-basic">Basic Tables</Link>
                </li>
                <li>
                  <Link to="/tables-datatable">Data Tables</Link>
                </li>
                <li>
                  <Link to="/tables-responsive">Responsive Table</Link>
                </li>
                <li>
                  <Link to="/tables-dragndrop">Drag & Drop Table</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bxs-bar-chart-alt-2"></i>
                <span>Charts</span>
              </Link>

              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/apex-charts">Apex charts</Link>
                </li>
                <li>
                  <Link to="/e-charts">E Chart</Link>
                </li>
                <li>
                  <Link to="/chartjs-charts">Chartjs Chart</Link>
                </li>
                <li>
                  <Link to="/chartist-charts">Chartist Chart</Link>
                </li>
                <li>
                  <Link to="/charts-knob">Knob Charts</Link>
                </li>
                <li>
                  <Link to="/sparkline-charts">Sparkline Chart</Link>
                </li>
                <li>
                  <Link to="/re-charts">Re Chart</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-aperture"></i>
                <span>Icons</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/icons-boxicons">Boxicons</Link>
                </li>
                <li>
                  <Link to="/icons-materialdesign">Material Design</Link>
                </li>
                <li>
                  <Link to="/icons-dripicons">Dripicons</Link>
                </li>
                <li>
                  <Link to="/icons-fontawesome">Font awesome</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-map"></i>
                <span>Maps</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/maps-google">Google Maps</Link>
                </li>
                <li>
                  <Link to="/maps-vector">Vector Maps</Link>
                </li>
                <li>
                  <Link to="/maps-leaflet">Leaflet Maps</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-share-alt"></i>
                <span>Multi Level</span>
              </Link>
              <ul className="sub-menu" aria-expanded="true">
                <li>
                  <Link to="/#">Level 1.1</Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    Level 1.2
                  </Link>
                  <ul className="sub-menu" aria-expanded="true">
                    <li>
                      <Link to="/#">Level 2.1</Link>
                    </li>
                    <li>
                      <Link to="/#">Level 2.2</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default SidebarContent;
