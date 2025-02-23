import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  //logout

  const navigate = useNavigate();
  const location = useLocation(); // Detect current page
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set login state based on token existence // Set login state based on token existence
  }, [location]); // Trigger re-check on page change

  useEffect(() => {
    const storedSetName = localStorage.getItem("name");

    setName(storedSetName);
  }, []);
  useEffect(() => {
    const storedSetEmail = localStorage.getItem("email");

    setEmail(storedSetEmail);
  }, []);

  const handleLogout = () => {
    // Swal.fire({
    //     icon: "success",
    //     title: "Logout Successfully",
    //     // text: `Welcome back`,
    //     showConfirmButton: false,
    //     timer: 2000,
    //     timerProgressBar: true,
    // });
    localStorage.removeItem("token");
    localStorage.removeItem("branch_id");
    localStorage.removeItem("collector_number");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("permissions");
    localStorage.removeItem("branch_code");
    localStorage.removeItem("sidebar"); // Remove token from storage
    localStorage.removeItem("user_id"); // Remove token from storage
    localStorage.removeItem("project_id"); // Remove token from storage
    localStorage.removeItem("acting_domain"); // Remove token from storage
    localStorage.removeItem("primary_domain"); // Remove token from storage
    setIsLoggedIn(false); // Update state
    navigate("/"); // Redirect to login page
  };

  return (
    <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a className="navbar-brand brand-logo" href="index-2.html">
          <h5 className="logo-dark" style={{ color: "white" }}>
            SafeSave
          </h5>
          {/* <h5 className="logo-light">Save Safe</h5> */}
        </a>
        <a className="navbar-brand brand-logo-mini" href="index-2.html">
          <img src="https://images.app.goo.gl/Y331S72X99K5Maqi8" alt="logo" />
        </a>
        <button
          className="navbar-toggler navbar-toggler align-self-center"
          type="button"
          data-toggle="minimize"
        >
          <span className="icon-menu"></span>
        </button>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center">
        {/* <h5 className="mb-0 font-weight-medium d-none d-lg-flex">Welcome Safe Save dashboard!</h5> */}
        <ul className="navbar-nav navbar-nav-right">
          {/* <form className="search-form d-none d-md-block" action="#">
                        <i className="icon-magnifier"></i>
                        <input type="search" className="form-control" placeholder="Search Here" title="Search here"/>
                    </form> */}
          {/* <li className="nav-item"><a href="#" className="nav-link"><i className="icon-basket-loaded"></i></a></li>
                    <li className="nav-item"><a href="#" className="nav-link"><i className="icon-chart"></i></a></li> */}
          {/* <li className="nav-item dropdown">
                        <a className="nav-link count-indicator message-dropdown" id="messageDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="icon-speech"></i>
                            <span className="count">7</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0" aria-labelledby="messageDropdown">
                            <a className="dropdown-item py-3">
                                <p className="mb-0 font-weight-medium float-start me-2">You have 7 unread mails </p>
                                <span className="badge badge-pill badge-primary float-end">View all</span>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                    <img src="../assets/images/faces/face10.jpg" alt="image" className="img-sm profile-pic"/>
                                </div>
                                <div className="preview-item-content flex-grow py-2">
                                    <p className="preview-subject ellipsis font-weight-medium text-dark">Marian Garner </p>
                                    <p className="font-weight-light small-text"> The meeting is cancelled </p>
                                </div>
                            </a>
                            <a className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                    <img src="../assets/images/faces/face12.jpg" alt="image" className="img-sm profile-pic"/>
                                </div>
                                <div className="preview-item-content flex-grow py-2">
                                    <p className="preview-subject ellipsis font-weight-medium text-dark">David Grey </p>
                                    <p className="font-weight-light small-text"> The meeting is cancelled </p>
                                </div>
                            </a>
                            <a className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                    <img src="../assets/images/faces/face1.jpg" alt="image" className="img-sm profile-pic"/>
                                </div>
                                <div className="preview-item-content flex-grow py-2">
                                    <p className="preview-subject ellipsis font-weight-medium text-dark">Travis Jenkins </p>
                                    <p className="font-weight-light small-text"> The meeting is cancelled </p>
                                </div>
                            </a>
                        </div>
                    </li>
                    <li className="nav-item dropdown language-dropdown d-none d-sm-flex align-items-center">
                        <a className="nav-link d-flex align-items-center dropdown-toggle" id="LanguageDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className="d-inline-flex">
                                <i className="flag-icon flag-icon-us"></i>
                            </div>
                            <span className="profile-text font-weight-normal">English</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-left navbar-dropdown py-2" aria-labelledby="LanguageDropdown">
                            <a className="dropdown-item">
                                <i className="flag-icon flag-icon-us"></i> English </a>
                            <a className="dropdown-item">
                                <i className="flag-icon flag-icon-fr"></i> French </a>
                            <a className="dropdown-item">
                                <i className="flag-icon flag-icon-ae"></i> Arabic </a>
                            <a className="dropdown-item">
                                <i className="flag-icon flag-icon-ru"></i> Russian </a>
                        </div>
                    </li> */}
          <li className="nav-item dropdown d-none d-xl-inline-flex user-dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="UserDropdown"
              href="#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                className="img-xs rounded-circle ms-2"
                src="https://images.pexels.com/photos/102155/pexels-photo-102155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1g"
                alt="Profile image"
              />{" "}
              <span className="font-weight-normal"> {name} </span>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown"
              aria-labelledby="UserDropdown"
            >
              <div className="dropdown-header text-center">
                <img
                  className="img-md rounded-circle"
                  height="100px"
                  width="100px"
                  src="https://images.pexels.com/photos/102155/pexels-photo-102155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Profile image"
                />
                <p className="mb-1 mt-3">{name}</p>
                <p className="font-weight-light text-muted mb-0">{email}</p>
              </div>
              {/* <button className="dropdown-item"><i className="dropdown-item-icon icon-user text-primary"></i> My Profile <span className="badge badge-pill badge-danger">1</span></button> */}
              {/* <button className="dropdown-item"><i className="dropdown-item-icon icon-speech text-primary"></i> Messages</button> */}
              {/* <button className="dropdown-item"><i className="dropdown-item-icon icon-energy text-primary"></i> Activity</button> */}
              {/* <button className="dropdown-item"><i className="dropdown-item-icon icon-question text-primary"></i> FAQ</button> */}
              <button onClick={handleLogout} className="dropdown-item">
                <i className="dropdown-item-icon icon-power text-primary"></i>
                Sign Out
              </button>
            </div>
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
        >
          <span className="icon-menu"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
