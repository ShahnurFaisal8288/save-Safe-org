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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      sidebar_element_name: sidebarElementName,
      sidebar_id: selectedSidebarId,
      element_url: elementUrl,
    };

    try {
      axios
        .post("http://localhost:8000/api/sidebar/store", formData, {
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

  <style>
    {`
      .container {
  max-width: 600px;
}

.card-header {
  font-size: 1.25rem;
  font-weight: bold;
}

form .form-label {
  font-weight: 500;
}

form input,
form select {
  border-radius: 0.25rem;
}

.btn-primary {
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.25rem;
}

      `}
  </style>;
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
                onChange={(e) => setSidebarElementName(e.target.value)}
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
                onChange={(e) => setElementUrl(e.target.value)}
                placeholder="Enter element URL"
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
