import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ data = [] }) {
  const [sidebars, setSidebars] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const storedSidebars = localStorage.getItem("sidebar");
    if (storedSidebars) {
      setSidebars(JSON.parse(storedSidebars));
    }
  }, []);

  const getClassName = (item) => {
    return `nav-link ${location.pathname === item.element_url ? "active" : ""}`;
  };

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        {(data.length > 0 ? data : sidebars).map((item) => (
          <React.Fragment key={item.id}>
            {item.children && item.children.length === 0 ? (
              <li className="nav-item nav-category">
                <span className={getClassName(item)}>
                  {item.sidebar_element_name} - {item.element_url}
                </span>
              </li>
            ) : (
              <li className="nav-item">
                <Link to={item.element_url} className={getClassName(item)}>
                  <span className="menu-title">
                    {item.sidebar_element_name} - {item.element_url}
                  </span>
                  <i className="icon-size-actual menu-icon"></i>
                </Link>
              </li>
            )}
          </React.Fragment>
        ))}
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
