import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ data = [] }) {
  const [sidebars, setSidebars] = useState([]);
  const [openItems, setOpenItems] = useState({});
  const location = useLocation();

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
            <div
              className="nav-link"
              onClick={() => toggleItem(item.id)}
              style={{ cursor: "pointer" }}
            >
              <span className="menu-title">{item.sidebar_element_name}</span>
              <i
                className={`menu-icon ${
                  openItems[item.id] ? "icon-arrow-up" : "icon-arrow-down"
                }`}
              ></i>
            </div>

            {/* Child Items */}
            {openItems[item.id] && (
              <ul className="nav flex-column sub-menu">
                {renderSidebarItems(item.children)}
              </ul>
            )}
          </>
        ) : (
          // Single Item (No Children)
          <Link
            className={`nav-link ${
              location.pathname === item.element_url ? "active" : ""
            }`}
            to={item.element_url}
          >
            {item.sidebar_element_name}
          </Link>
        )}
      </li>
    ));
  };

  return (
    <nav className="sidebar">
      <ul className="nav">
        {/* Layouts Category */}
        <li className="nav-item nav-category">
          <span className="nav-link"></span>
        </li>

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
