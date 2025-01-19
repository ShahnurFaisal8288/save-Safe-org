import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ data = [] }) {
  const [name, setName] = useState(null);
  const [sidebars, setSidebars] = useState([]);
  const [openItems, setOpenItems] = useState({});
  const location = useLocation();
  useEffect(() => {
          const storedSetName = localStorage.getItem("name");
      
          setName(storedSetName);
        }, []);

  useEffect(() => {
    const storedSidebars = localStorage.getItem("sidebar");
    if (storedSidebars) {
      setSidebars(JSON.parse(storedSidebars));
    }
  }, []);

  // Toggle open/close state for a given item
  const toggleItem = (id) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the open state
    }));
  };

  const renderSidebarItems = (items) => {
    return items.map((item) => (
      <li key={item.id} className="nav-item">
        {item.children && item.children.length > 0 ? (
          <>
            {/* Parent Item */}
            <a
              onClick={() => toggleItem(item.id)}
              className={`nav-link ${openItems[item.id] ? "collapsed" : ""}`}
              data-bs-toggle="collapse"
              href={`#${item.id}`}
              aria-expanded={openItems[item.id] ? "true" : "false"}
              aria-controls={item.id}
            >
              <span className="menu-title">{item.sidebar_element_name}</span>
              <i className={`icon-size-actual menu-icon ${openItems[item.id] ? "icon-arrow-up" : "icon-arrow-down"}`} />
            </a>

            {/* Child Items */}
            <div className={`collapse ${openItems[item.id] ? "show" : ""}`} id={item.id}>
              <ul className="nav flex-column sub-menu">
                {renderSidebarItems(item.children)}
              </ul>
            </div>
          </>
        ) : (
          // Single Item (No Children)
          <Link
            className={`nav-link ${location.pathname === item.element_url ? "active" : ""}`}
            to={item.element_url}
          >
            <span className="menu-title">{item.sidebar_element_name}</span>
            <i className={`icon-size-actual menu-icon ${openItems[item.id] ? "icon-arrow-up" : "icon-arrow-down"}`} />
          </Link>
        )}
      </li>
    ));
  };

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        {/* Layouts Category */}
        <li className="nav-item navbar-brand-mini-wrapper">
          {/* <a className="nav-link navbar-brand brand-logo-mini" href="../../index-2.html">
            <img src="https://demo.bootstrapdash.com/stellar-admin-new/themes/assets/images/logo-mini.svg" alt="logo" />
          </a> */}
        </li>

        {/* <li className="nav-item nav-profile">
          <a href="#" className="nav-link">
            <div className="profile-image">
              <img className="img-xs rounded-circle" src="../../../assets/images/faces/face8.jpg" alt="profile image" />
              <div className="dot-indicator bg-success" />
            </div>
            <div className="text-wrapper">
              <p className="profile-name">{name}</p>
              <p className="designation">Administrator</p>
            </div>
            <div className="icon-container">
              <i className="icon-bubbles" />
              <div className="dot-indicator bg-danger" />
            </div>
          </a>
        </li> */}

        <li className="nav-item nav-category">
          <span className="nav-link">Dashboard</span>
        </li>

        {/* <li className="nav-item">
          <a className="nav-link" href="../../index-2.html">
            <span className="menu-title">Dashboard</span>
            <i className="icon-screen-desktop menu-icon" />
          </a>
        </li> */}

        {/* Dynamic Sidebar Items */}
        {renderSidebarItems(data.length > 0 ? data : sidebars)}

        {/* No Items Fallback */}
        {data.length === 0 && sidebars.length === 0 && (
          <li className="nav-item nav-category">
            <span className="nav-link">No Sidebar Items</span>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Sidebar;