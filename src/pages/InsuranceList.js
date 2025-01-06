import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import "../InsuranceList.css";
import { useNavigate } from "react-router-dom";

const InsuranceList = () => {
  // All useState start
  const navigate = useNavigate();
  const [project, setProject] = useState([]);
  const [poNo, setPoNo] = useState([]);
  const [memberName, setMemberName] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [statusFilters, setStatusFilters] = useState({
    allDate: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const [filteredData, setFilteredData] = useState([]);
  const [selectedAccountNumber, setSelectedAccountNumber] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedPo, setSelectedPo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch project, PO, and member data
  // const fetchData = async () => {
  //   try {
  //     const projectResponse = await axios.get(
  //       "http://localhost:8000/api/projects"
  //     );
  //     if (projectResponse.data && Array.isArray(projectResponse.data)) {
  //       setProject(projectResponse.data);
  //     }

  //     const poResponse = await axios.get(
  //       "http://localhost:8000/api/collectors"
  //     );
  //     if (poResponse.data) {
  //       setPoNo(poResponse.data);
  //     }

  //     // const memberResponse = await axios.get(
  //     //   `http://localhost:8000/api/collector/${selectedPo}/client/information`
  //     // );
  //     // if (memberResponse.data) {
  //     //   setMemberName(memberResponse.data);
  //     // }

  //     // Set initial data for display (could be fetched from a separate API for insurance list)
  //     const initialData = await axios.get(
  //       "http://localhost:8000/api/health_insurance/list"
  //     );
  //     setFilteredData(initialData.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error.message);
  //   }
  // };
  const fetchData = async () => {
    try {
      // Fetch projects
      const projectResponse = await axios.get(
        "http://localhost:8000/api/projects"
      );
      if (projectResponse.data && Array.isArray(projectResponse.data)) {
        setProject(projectResponse.data);
      } else if (projectResponse.data?.error) {
        console.warn("Project Error:", projectResponse.data.error);
      }

      // Fetch collectors
      const poResponse = await axios.get(
        "http://localhost:8000/api/collectors"
      );
      if (poResponse.data) {
        setPoNo(poResponse.data);
      } else if (poResponse.data?.error) {
        console.warn("Collector Error:", poResponse.data.error);
      }

      // Fetch health insurance list
      const initialData = await axios.get(
        "http://localhost:8000/api/health_insurance/list"
      );
      if (initialData.data) {
        setFilteredData(initialData.data);
      } else if (initialData.data?.error) {
        console.warn("Health Insurance Error:", initialData.data.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch Members based on PO
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        if (selectedPo) {
          const response = await axios.get(
            `http://localhost:8000/api/collector/${selectedPo}/client/information`
          );
          setMemberName(response.data || []);
        }
      } catch (error) {
        console.error("Error fetching members:", error.message);
      }
    };

    fetchMembers();
  }, [selectedPo]);

  const handleReset = () => {
    setSearchDate("");
    setSelectedAccountNumber("");
    setSelectedProject("");
    setStatusFilters({
      allDate: false,
      1: false,
      2: false,
      3: false,
      4: false,
    });
  };

  // Handle checkbox change for status filters
  const handleStatusChange = (e) => {
    setStatusFilters({
      ...statusFilters,
      [e.target.name]: e.target.checked,
    });
  };
  const handlePoChange = (event) => {
    const selectedCollectorNumber = event.target.value;
    const selectedItem = poNo.find(
      (item) => item.collector_number === selectedCollectorNumber
    );
    if (selectedItem) {
      setSelectedPo(selectedItem.id); // Set ID as the selected value
    } else {
      setSelectedPo(""); // Reset if no match
    }
  };

  const handleSearch = async () => {
    const formattedDate = searchDate
      ? format(new Date(searchDate), "yyyy-MM-dd")
      : "";

    const filterParams = {
      date: formattedDate,
      status: Object.keys(statusFilters)
        .filter((key) => statusFilters[key])
        .join(","),
      account_number: selectedAccountNumber,
      projectCode: selectedProject,
    };

    try {
      const response = await axios.get(
        "http://localhost:8000/api/health_insurance/list/search",
        {
          params: filterParams,
        }
      );

      if (response.data) {
        setFilteredData(response.data); // Success data
        setErrorMessage(null); // Clear any previous errors
      }
    } catch (error) {
      console.error("Error fetching filtered data:", error.message);
      setErrorMessage(error.response?.data?.error || "An error occurred."); // Store the error message
      setFilteredData([]); // Clear data on error
    }
  };
  // console.log("selectedPo: ", selectedPo);
  return (
    <>
      <style>
        {`
      Global styles
body {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
}

.container {
  width: 100%;
  margin: 10px auto;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Section styling */
.section {
  margin-bottom: 20px;
  background-color: #ffffff; /* Ensure white background */
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for better focus */
}

.section-title {
  background-color: #f72b8b;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 15px;
}
  .section-header {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  padding: 10px;
  color: #fff; /* White text */
  background-color: #f72b8b; /* Pink background */
  border-radius: 5px;
}

.label {
  font-weight: bold;
  margin-bottom: 5px;
}

.required {
  color: red;
}

/* Input fields */
.input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

/* Checkbox group */
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px; /* Space between items */
}

.checkbox-group div {
  display: flex;
  align-items: center;
}

.checkbox-group input {
  margin-right: 8px;
}

/* Buttons */
.buttons {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.reset-btn,
.search-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.reset-btn {
  background-color: #f44336;
  color: white;
}

.search-btn {
  background-color: #4caf50;
  color: white;
}

.reset-btn:hover {
  background-color: #d32f2f;
}

.search-btn:hover {
  background-color: #388e3c;
}

/* Table styling */
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.table th,
.table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
}

.table th {
  background-color: #f72b8b;
  color: white;
}

.table tr:nth-child(even) {
  background-color: #f9f9f9;
}

/* Buttons in table */
.download-btn,
.view-btn {
  background-color: #f72b8b;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.download-btn:hover,
.view-btn:hover {
  background-color: #d02770;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
}

.pagination button {
  padding: 5px 10px;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;
}

.pagination button.active {
  background-color: #f72b8b;
  color: white;
}

.pagination select {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

/* Adjustments for responsiveness */
@media (max-width: 768px) {
  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }

  .col-6 {
    flex: 1 1 100%;
  }

  .buttons {
    flex-direction: column;
    gap: 10px;
  }

  .reset-btn,
  .search-btn {
    width: 100%;
  }
    .container {
  font-size: 0.7rem;
  transform: scale(0.2);
}

.container * {
  font-size: inherit;
}
}

      `}
      </style>
      <div className="content-wrapper">
        <div className="container mt-3">
        <h2 className="title">Health Insurance List</h2>

          {/* Project Selection */}
          <div className="section" style={{marginTop:"50px"}}>
            <label className="label">
              Project <span className="required">*</span>
            </label>
            <select
              className="input"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option>Choose Project</option>
              {project.map((item, index) => (
                <option key={index} value={item.projectCode}>
                  {item.projectCode}-{item.projectTitle}
                </option>
              ))}
            </select>
          </div>

          {/* Others Info Section */}
          <div className="section card">
            <div className="section-title mb-3">Others Info</div>
            <div className="form-group">
              <div className="row">
                <div className="col-6">
                  <label>PO</label>
                  <input
                    className="input"
                    list="poList"
                    onChange={handlePoChange}
                  />
                  <datalist id="poList">
                    {poNo.map((item, index) => (
                      <option key={index} value={item.collector_number}>
                        {item.collector_number}
                      </option>
                    ))}
                  </datalist>
                </div>
                {/* Member Number Input */}
                <div className="col-6">
                  <label>Member Number</label>
                  <input
                    className="input"
                    list="memberList"
                    value={selectedAccountNumber}
                    onChange={(e) => setSelectedAccountNumber(e.target.value)}
                  />
                  <datalist id="memberList">
                    {memberName.map((item, index) => (
                      <option key={index} value={item.account_number} />
                    ))}
                  </datalist>
                </div>
                <div className="col-6 mt-3">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    className="input"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                  />
                </div>
                <div className="col-6 mt-5">
                  <div className="checkbox-group">
                    <div>
                      <input
                        type="checkbox"
                        name="allDate"
                        checked={statusFilters.allDate}
                        onChange={handleStatusChange}
                      />
                      <label>All Date</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="1"
                        checked={statusFilters.Pending}
                        onChange={handleStatusChange}
                      />
                      <label>Pending</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="2"
                        checked={statusFilters.Approved}
                        onChange={handleStatusChange}
                      />
                      <label>Approved</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="3"
                        checked={statusFilters.Rejected}
                        onChange={handleStatusChange}
                      />
                      <label>Reject</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="4"
                        checked={statusFilters.Disbursed}
                        onChange={handleStatusChange}
                      />
                      <label>Disbursed</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="buttons">
              <button className="reset-btn" onClick={handleReset}>
                Reset
              </button>
              <button className="search-btn" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>

          {/* Enrollment List */}
          <div className="section card">
            <div className="section-title">Enrollment List</div>
            <table className="table">
              <thead>
                <tr>
                  <th>Buffer Id</th>
                  <th>Date</th>
                  <th>Member Name</th>
                  <th>Insurance Product</th>
                  <th>Status</th>
                  <th>Enrollment Form</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {errorMessage && (
                  <tr>
                    <td
                      colSpan="7"
                      style={{ color: "red", textAlign: "center" }}
                    >
                      {errorMessage}
                    </td>
                  </tr>
                )}
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.enrolment_id}</td>
                    <td>{item?.created_at}</td>
                    <td>{item?.client.name}</td>
                    <td>{item?.policy_names}</td>
                    <td>{item?.statuses}</td>
                    <td>
                      <button
                        className="download-btn"
                        onClick={() =>
                          navigate(`/insuranceFormPdf/${item.id}`, {
                            state: { item },
                          })
                        }
                      >
                        Download
                      </button>
                    </td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() =>
                          navigate(`/approve-insurance-enrollment/${item.id}`, {
                            state: { item },
                          })
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              ;
            </table>

            {/* Pagination */}
            <div className="pagination">
              <button>&lt;&lt;</button>
              <button>&lt;</button>
              <button className="active">1</button>
              <button>&gt;</button>
              <button>&gt;&gt;</button>
              <select>
                <option>10</option>
                <option>20</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InsuranceList;
