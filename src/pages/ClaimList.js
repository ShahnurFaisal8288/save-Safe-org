import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
// import { Button } from "react-bootstrap";
import ExcelClaimButton from "./ExcelClaimButton";

const ClaimList = () => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [fromDate, setFromDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
  const [claimData, setClaimData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(claimData.length / itemsPerPage);
  const currentData = claimData.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/projectCode/claim?projectCode=${selectedProject}&created_from=${fromDate}&created_to=${toDate}`
      );
      setClaimData(response.data.data || []);
      console.log("Search results:", response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setClaimData([]);
    }
  };
  console.log("claimData:", selectedProject);
  const handleReset = () => {
    setSelectedProject("");
    setFromDate(new Date().toISOString().split("T")[0]);
    setToDate(new Date().toISOString().split("T")[0]);
    setClaimData([]);
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/projects");
        setProjectData(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjectData([]);
      }
    };
    fetchPostData();
  }, []);

  // Helper function to generate page numbers
  const getPageNumbers = () => {
    const delta = 1; // Show one number on each side of current page
    const range = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // First page
        i === totalPages || // Last page
        (i >= currentPage - delta && i <= currentPage + delta) // Pages around current
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }

    return range;
  };

  const handlePageChange = (pageNum) => {
    if (typeof pageNum === "number" && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };
  return (
    <>
      <style>
        {`
          .p-6 {
            padding: 1.5rem;
          }
          
          
          .text-2xl {
            font-size: 1.5rem;
            line-height: 2rem;
          }
          
          .font-bold {
            font-weight: 700;
          }
          
          .text-pink-600 {
            color: rgb(219, 39, 119);
          }
          
          .mb-4 {
            margin-bottom: 1rem;
          }

          
          .p-4 {
            padding: 1rem;
          }
          
          .rounded-md {
            border-radius: 0.375rem;
          }
          
          .mb-6 {
            margin-bottom: 1.5rem;
          }
          
          .text-lg {
            font-size: 1.125rem;
            line-height: 1.75rem;
          }
          
          .font-semibold {
            font-weight: 600;
          }
          
          
          .w-full {
            width: 100%;
          }
          
          .p-2 {
            padding: 0.5rem;
          }
          
          .mt-2 {
            margin-top: 0.5rem;
          }
          
          .border {
            border-width: 1px;
            border-style: solid;
            border-color: #e5e7eb;
          }
          
          .grid {
            display: grid;
          }
          
          .grid-cols-1 {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
          
          .gap-4 {
            gap: 1rem;
          }
          
          .mt-4 {
            margin-top: 1rem;
          }
          
          
          .space-x-4 > * + * {
            margin-left: 1rem;
          }
          
          .bg-gray-400 {
            background-color: rgb(156, 163, 175);
          }
          
          .text-white {
            color: white;
          }
          
          .px-4 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          .py-2 {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
          }
          
          .overflow-x-auto {
            overflow-x: auto;
          }
          
          .border-collapse {
            border-collapse: collapse;
          }
          
          
          .bg-pink-200 {
            background-color: #f72b8b;
          }
          
          .text-left {
            text-align: left;
          }
          
          .text-center {
            text-align: center;
          }
          
          /* Button styles */
          button {
            cursor: pointer;
            transition: background-color 0.2s;
          }
          
          button:hover {
            opacity: 0.9;
          }
          
          /* Table styles */
          table {
            width: 100%;
            border-spacing: 0;
          }
          
          th, td {
            padding: 0.75rem;
            border: 1px solid rgb(236, 72, 153);
          }
          
          /* Responsive styles */
          @media (min-width: 768px) {
            .md\\:grid-cols-2 {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }
          
          /* Select styles */
          select {
            background-color: white;
            border-radius: 0.375rem;
            appearance: none;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
            background-position: right 0.5rem center;
            background-repeat: no-repeat;
            background-size: 1.5em 1.5em</div>;
            padding-right: 2.5rem;
          }
          
          /* Input styles */
          input[type="date"] {
            background-color: white;
          }
          
          /* Status badge */
          .rounded-md {
            border-radius: 0.375rem;</div>
          }
          
          /* Download button */
          .download-btn {
            background-color: rgb(236, 72, 153);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 0.375rem;
            border: none;
          }
          
          .download-btn:hover {
            background-color: rgb(219, 39, 119);
          }
            
        `}
      </style>
      <div className="content-wrapper">
        <div className="container mt-3">
          <div className="p-6 mt-5">
            <h1 className="text-2xl font-bold mb-4">
              Micro Health Insurance Claim List
            </h1>

            {/* Project Section */}
            <div className="section card bg-pink-100 p-4 rounded-md mb-6">
              <h2 className="text-lg font-semibold text-pink-700">Project</h2>
              <select
                className="w-full p-2 mt-2 border rounded-md"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option value="">Select Project</option>
                {Array.isArray(projectData) &&
                  projectData.map((item) => (
                    <option key={item.id} value={item.projectCode}>
                      {item.projectCode} - {item.projectTitle}
                    </option>
                  ))}
              </select>
            </div>

            {/* Date Range Section */}
            <div className="section card bg-pink-100 p-4 rounded-md mb-6">
              <h2 className="text-lg font-semibold text-pink-700">
                Others Info
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={handleReset}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                >
                  Reset
                </button>
                <button
                  onClick={handleSearch}
                  className="bg-pink-500 text-white px-4 py-2 rounded-md"
                  style={{ background: "black" }}
                >
                  Search
                </button>
              </div>
            </div>

            {/* Claims Table Section */}
            <div className=" section card bg-pink-100 p-4 rounded-md">
              <h2 className="text-lg font-semibold text-pink-700">
                Claim List
              </h2>
              <div className="d-flex justify-content-end mb-3">
                <ExcelClaimButton claimData={claimData} />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full mt-4 border-collapse border border-pink-500">
                  <thead>
                    <tr>
                      {[
                        "Project",
                        "Member Number",
                        "Insurance Policy No.",
                        "Treatment Type",
                        "Date of Incident",
                        "Claim Amount",
                        "Status",
                        "Claim Form",
                        "Action",
                      ].map((header) => (
                        <th
                          key={header}
                          className="border border-pink-500 p-2 bg-pink-200 text-left"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(currentData) && currentData.length > 0 ? (
                      currentData.map((row, index) => (
                        <tr key={index}>
                          <td className="border border-pink-500 p-2">
                            {row.healthInsurance?.project_code}
                          </td>
                          <td className="border border-pink-500 p-2">
                            {row.healthInsurance?.orgmemno}
                          </td>
                          <td className="border border-pink-500 p-2">
                            {row.insurance_policy_no}
                          </td>
                          <td className="border border-pink-500 p-2">
                            {row.treatmentType?.type_name}
                          </td>
                          <td className="border border-pink-500 p-2">
                            {row.date_of_incident}
                          </td>
                          <td className="border border-pink-500 p-2">
                            {row.claim_amount}
                          </td>
                          <td className="border border-pink-500 p-2">
                            {row?.status?.status_name}
                          </td>
                          <td className="border border-pink-500 p-2">
                            {row.status_id !== 6 ? (
                              <button
                                className="download-btn text-white bg-blue-500 rounded-md py-1 px-4"
                                onClick={() =>
                                  navigate(`/claimFormPdf/${row.id}`, {
                                    state: { row },
                                  })
                                }
                              >
                                Download
                              </button>
                            ) : (
                              <button
                                className="download-btn text-white bg-blue-500 rounded-md py-1 px-4"
                                onClick={() =>
                                  navigate(`/settledPdf/${row.id}`, {
                                    state: { row },
                                  })
                                }
                              >
                                Download
                              </button>
                            )}
                          </td>
                          <td className="border border-pink-500 p-2">
                            <button
                              className="download-btn text-white bg-blue-500 rounded-md py-1 px-4 btn-sm"
                              onClick={() =>
                                navigate(`/settled-Claim-form/${row.id}`, {
                                  state: { row },
                                })
                              }
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="8"
                          className="border border-pink-500 p-2 text-center"
                        >
                          No data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {claimData.length > 0 && (
                  <div className="flex flex-col items-center space-y-4 my-6 p-4 bg-white rounded-xl shadow-lg">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-4 gap-1">
                        {/* Previous Button */}
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50"
                          aria-label="Previous page"
                        >
                          ◄
                        </button>

                        {/* Current Page */}
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded">
                          {currentPage}
                        </button>

                        {/* Next Page */}
                        <button
                          className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50"
                          onClick={() => handlePageChange(currentPage + 1)}
                        >
                          {currentPage + 1}
                        </button>

                        {/* Next Button */}
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50"
                          aria-label="Next page"
                        >
                          ►
                        </button>
                      </div>

                      {/* Page info */}
                      <div className="px-4 py-2 text-sm text-gray-600 bg-gray-50 rounded-full shadow-sm ml-4">
                        Showing page {currentPage} of {totalPages}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClaimList;
