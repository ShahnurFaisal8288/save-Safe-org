import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
// import Footer from "./components/Footer";

import './index.css';

function App() {
  return (
    <>
    <div className="container-scroller">
      <Navbar />
      <div
        className="container-fluid page-body-wrapper"
        style={{
          display: "flex",
          position: "relative", // Ensures proper positioning
          height: "100vh", // Full viewport height
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            flexGrow: 1,
            maxWidth: "250px", // Sets a maximum width for the sidebar
            backgroundColor: "#f8f9fa", // Optional: Sidebar background color
          }}
        >
          <Sidebar />
        </div>

        {/* Main Panel */}
        <div
          className="main-panel"
          style={{
            flexGrow: 4, // Makes the main panel take up more space than the sidebar
            overflowY: "auto", // Enables scrolling for the main panel content
            paddingBottom: "60px", // Ensures space for the fixed footer
          }}
        >
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
    </>
    
  );
}

export default App;
