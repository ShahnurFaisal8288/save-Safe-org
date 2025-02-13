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

        <li className="nav-item nav-category">
          <span className="nav-link">Dashboard</span>
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