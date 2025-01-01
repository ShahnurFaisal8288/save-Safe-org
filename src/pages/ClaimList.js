import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ClaimList = () => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [fromDate, setFromDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
  const [claimData, setClaimData] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/projectCode/claim?projectCode=${selectedProject}&created_at=${fromDate}&create_at=${toDate}`
      );
      // Handle the nested data structure
      setClaimData(response.data.data || []);
      console.log("Search results:", response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setClaimData([]);
    }
  };

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

  return (
    <div className="p-6 mt-5">
      <h1 className="text-2xl font-bold text-pink-600 mb-4">
        Micro Health Insurance Claim List
      </h1>
      <div className="bg-pink-100 p-4 rounded-md mb-6">
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
      <div className="bg-pink-100 p-4 rounded-md mb-6">
        <h2 className="text-lg font-semibold text-pink-700">Others Info</h2>
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
          >
            Search
          </button>
        </div>
      </div>
      <div className="bg-pink-100 p-4 rounded-md">
        <h2 className="text-lg font-semibold text-pink-700">Claim List</h2>
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
              {Array.isArray(claimData) && claimData.length > 0 ? (
                claimData.map((row, index) => (
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
                      {row.status.status_name}
                      <span className="bg-pink-500 text-white px-2 py-1 rounded-md ml-2">
                        Pending
                      </span>
                    </td>
                    <td>
                      <button
                        className="download-btn"
                        onClick={() =>
                          navigate(`/claimFormPdf/${row.id}`, {
                            state: { row },
                          })
                        }
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="border border-pink-500 p-2 text-center"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClaimList;
