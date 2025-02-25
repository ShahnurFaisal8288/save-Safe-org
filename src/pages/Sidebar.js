import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../components/axiosInstance";

function Sidebar() {
  const [parentSidebar, setParentSidebar] = useState([]);
  const [selectedSidebarId, setSelectedSidebarId] = useState([]);
  const [sidebarElementName, setSidebarElementName] = useState("");
  const [elementUrl, setElementUrl] = useState("");

  useEffect(() => {
    const fetchParentSidebars = async () => {
      const response = await axiosInstance.get("sidebar");
      setParentSidebar(response.data);
      console.log(response.data);
    };
    fetchParentSidebars();
  }, []);

  // Function to generate a slug from text
  const generateSlug = (text) => {
    return text
      ? '/' + text
          .toLowerCase()
          .replace(/\s+/g, '-')        // Replace spaces with hyphens
          .replace(/[^a-z0-9-]/g, '')  // Remove non-alphanumeric characters except hyphens
          .replace(/-+/g, '-')         // Replace multiple hyphens with single hyphen
      : '';
  };

  const handleSidebarChange = (e) => {
    const selectedName = e.target.value;
    const selectedSidebar = parentSidebar.find(
      (item) => item.sidebar_element_name === selectedName
    );
    if (selectedSidebar) {
      setSelectedSidebarId(selectedSidebar.id); // Store the ID
    } else {
      setSelectedSidebarId(""); // Clear if no match
    }
  };

  // Handle sidebar element name change and generate URL
  const handleSidebarElementNameChange = (e) => {
    const value = e.target.value;
    setSidebarElementName(value);
    
    // Generate slug and update elementUrl
    setElementUrl(generateSlug(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      sidebar_element_name: sidebarElementName,
      sidebar_id: selectedSidebarId,
      element_url: elementUrl,
    };

    try {
      axiosInstance.post("sidebar/store", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // console.log("form data 2:", formData);
          if (response.status === 201) {
            Swal.fire({
              icon: "success",
              title: "Data Submission Successful",
              text: `Data has been stored successfully!`,
              showConfirmButton: true,
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                // navigate("/insurance-list");
                // window.location.href = "/insurance-list"; // Replace with your target URL
              }
            });
          }

          // console.log("inserttt data", response.data);
        });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while saving sidebar data.");
    }
  };

  return (
    <div className="content-wrapper">
      <div className="container mt-5">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h2 className="title mb-0">Sidebar Setup</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Parent Sidebar Selection */}
              <div className="mb-4">
                <label className="form-label" htmlFor="parentSidebar">
                  Parent Sidebar
                </label>
                <input
                  list="parentSidebarList"
                  id="parentSidebar"
                  className="form-control"
                  placeholder="Select or type Parent Sidebar"
                  name="sidebar_id"
                  onChange={handleSidebarChange}
                />
                <datalist id="parentSidebarList">
                  {parentSidebar.map((item) => (
                    <option key={item.id} value={item.sidebar_element_name} />
                  ))}
                </datalist>
              </div>

              {/* Sidebar Element Name */}
              <div className="mb-4">
                <label className="form-label" htmlFor="sidebarElementName">
                  Sidebar Element Name
                </label>
                <input
                  type="text"
                  id="sidebarElementName"
                  className="form-control"
                  name="sidebar_element_name"
                  value={sidebarElementName}
                  onChange={handleSidebarElementNameChange}
                  placeholder="Enter sidebar element name"
                />
              </div>

              {/* Element URL */}
              <div className="mb-4">
                <label className="form-label" htmlFor="elementUrl">
                  Element URL
                </label>
                <input
                  type="text"
                  id="elementUrl"
                  className="form-control"
                  name="element_url"
                  value={elementUrl}
                  onChange={(e) => setElementUrl(e.target.value)}
                  placeholder="Enter element URL"
                  readOnly={sidebarElementName !== ""}
                />
              </div>

              {/* Save Button */}
              <div className="text-end">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;