import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../../index.css";
import axiosInstance from "../../../components/axiosInstance";

const buttonStyle = {
  color: "white",
  backgroundColor: "#007bff",
  borderColor: "#007bff",
};

const MemberList = () => {
  const navigate = useNavigate();
  const [data1, setData1] = useState([]); // Store fetched data
  const [filteredData, setFilteredData] = useState([]); // Store filtered data
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Fetch data from the API
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axiosInstance.get("domain/clients", {
          headers: {
            area_id: "1" // Or get this from your app's state/storage
          }
        });
        
        if (response.data?.clients) {
          setData1(response.data.clients);
        }
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
      }
    };
  
    fetchPostData();
  }, []);

  // Search functionality
  useEffect(() => {
    if (Array.isArray(data1)) {
      const filtered = data1.filter((item) =>
        Object.values(item).some((val) =>
          val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(filtered);
      setCurrentPage(1); // Reset to first page on search
    }
  }, [searchTerm, data1]);

  // Sort functionality
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    if (sortConfig.key && Array.isArray(filteredData)) {
      const sortedData = [...filteredData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      setFilteredData(sortedData);
    }
  }, [sortConfig, filteredData]);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };


  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);




  return (
    <div className="content-wrapper">
<div className="container mt-5">
      <div className="d-flex justify-content-between my-4">
        <h3>Member List</h3>
      </div>

      {/* Search Input */}
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th onClick={() => requestSort("name")} style={{ cursor: "pointer" }}>
                Member Name{" "}
                {sortConfig.key === "name" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th onClick={() => requestSort("sex")} style={{ cursor: "pointer" }}>
                Nomine Gender{" "}
                {sortConfig.key === "nomine_gender" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th onClick={() => requestSort("date_birthday")} style={{ cursor: "pointer" }}>
                Birthday Date{" "}
                {sortConfig.key === "date_birthday" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th onClick={() => requestSort("project_code")} style={{ cursor: "pointer" }}>
                Project Code{" "}
                {sortConfig.key === "date_birthday" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th onClick={() => requestSort("action")} style={{ cursor: "pointer" }}>
                Action{" "}
                {sortConfig.key === "action" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.sex}</td>
                  <td>{formatDate(item.date_of_birth)}</td>
                  <td>{item.project_code}</td>
                  <button
                    style={buttonStyle}
                    className="btn btn-primary"
                    onClick={() =>
                      navigate(
                        `/insurance-form/${item.id}/${item.name}/${item.account_number}/${item.sex}/${item.date_of_birth}/${item.project_code}/${item.date_of_birth}/${item.occupation}/${item.present_address}/${item.village_address}/${item.date_in}/${item.date_out}/${item.nominee}/${item.relationship}`
                      )
                    }
                  >
                    Apply
                  </button>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => paginate(1)} disabled={currentPage === 1}>
              First
            </button>
          </li>
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => paginate(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </button>
          </li>
        </ul>
      </nav>

      {/* Page Info */}
      <div className="text-center mt-2">
        <p>
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of{" "}
          {filteredData.length} entries
        </p>
      </div>
    </div>
    </div>
    
  );
};

export default MemberList;