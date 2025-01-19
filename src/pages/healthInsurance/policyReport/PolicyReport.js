import axios from "axios";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "react-bootstrap";
import ExcelExportButton from "./ExcelExportButton";
// import { Button } from '@/components/ui/button';
// import ExcelExportButton from '@/components/ExcelExportButton';

const PolicyReport = () => {
  const [project, setProject] = useState([]);
  const [policy, setPolicy] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedPolicy, setSelectedPolicy] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [policyWiseData, setPolicyWiseData] = useState([]);
  const [branch, setBranch] = useState([]);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/projects`);
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching account number:", error.message);
      }
    };
    fetchPostData();
  }, []);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/insurance/category`
        );
        setPolicy(response.data);
      } catch (error) {
        console.error("Error fetching account number:", error.message);
      }
    };
    fetchPostData();
  }, []);
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/branch`);
        setBranch(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching account number:", error.message);
      }
    };
    fetchPostData();
  }, []);
  const handleChange = (event) => {
    setSelectedProject(event.target.value);
  };
  const selectedCategories =
    policy.find((policy) => policy.policy_name === selectedPolicy)?.category ||
    [];

  // Handle category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  useEffect(() => {
    setSelectedCategory("");
  }, [selectedPolicy]);
// console.log(selectedPolicy);
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/policy/information/health_insurance/report?branch_name=${selectedBranch}&projectCode=${selectedProject}&created_from=${fromDate}&created_to=${toDate}`
      );
      setPolicyWiseData(response.data.data || []);
      console.log("Search results:", response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setPolicyWiseData([]);
    }
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(policyWiseData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Policy Data");
    XLSX.writeFile(workbook, "policy_report.xlsx");
  };
  //excel export

  return (
    <>
      <style>
        {`
     /* Global styles */
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
  background-color: #ffffff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  color: #fff;
  background-color: #f72b8b;
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
  gap: 15px;
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
.table-container {
  width: 100%;
  overflow-x: auto;
}

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

/* Improved Responsive Styles */
@media (max-width: 1024px) {
  .table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
  }
}

@media (max-width: 768px) {
  .container {
    margin: 5px;
    padding: 10px;
    font-size: 14px;
  }

  .row {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .col-6 {
    width: 100%;
  }

  .section-title {
    font-size: 1rem;
    padding: 8px 12px;
  }

  .input {
    font-size: 14px;
    padding: 8px;
  }

  .checkbox-group {
    gap: 10px;
  }

  .buttons {
    flex-direction: column;
    gap: 10px;
  }

  .reset-btn,
  .search-btn {
    width: 100%;
    padding: 8px 15px;
    font-size: 14px;
  }

  .table th,
  .table td {
    padding: 8px;
    font-size: 14px;
  }

  .download-btn,
  .view-btn {
    padding: 4px 8px;
    font-size: 12px;
  }

  .pagination {
    gap: 5px;
    flex-wrap: wrap;
  }

  .pagination button {
    padding: 4px 8px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .container {
    margin: 0;
    border-radius: 0;
  }

  .section {
    padding: 8px;
  }

  .checkbox-group {
    flex-direction: column;
    align-items: flex-start;
  }

  .checkbox-group div {
    width: 100%;
  }

  .table th,
  .table td {
    padding: 6px;
    font-size: 12px;
  }
}

      `}
      </style>
      <div className="content-wrapper">
        <div className="container mt-3">
          <h2 className="title">Policy Information Report</h2>

          {/* Others Info Section */}
          <div className="section card">
            <div className="section-title mb-3">Others Info</div>
            <div className="form-group">
              <div className="row">
                <div className="col-6 mt-3">
                  <label>Project</label>
                  <input
                    className="input"
                    list="poList"
                    value={selectedProject}
                    onChange={handleChange}
                  />
                  <datalist id="poList">
                    {project.map((item, index) => (
                      <option key={index} value={item.projectCode}>
                        {item.projectTitle}
                      </option>
                    ))}
                  </datalist>
                </div>
                {/* Member Number Input */}
                <div className="col-6 mt-3">
                  <label>Branch</label>
                  <input
                    className="input"
                    list="memberList"
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                  />
                  <datalist id="memberList">
                    {branch.map((item, index) => (
                      <option key={index} value={item.branch_name} />
                    ))}
                  </datalist>
                </div>
                <div className="col-6 mt-3">
                  <label>Policy Type</label>
                  <input
                    className="input"
                    list="policyList" // Changed ID to avoid duplicate
                    value={selectedPolicy}
                    onChange={(e) => setSelectedPolicy(e.target.value)}
                  />
                  <datalist id="policyList">
                    {/* Changed ID to avoid duplicate */}
                    {policy.map((item) => (
                      <option
                        key={item.insurance_product_id}
                        value={item.policy_name}
                      >
                        {item.policy_name}
                      </option>
                    ))}
                  </datalist>
                </div>
                <div className="col-6 mt-3">
                  <label>Category Type</label>
                  <input
                    className="input"
                    list="categoryList"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  />
                  <datalist id="categoryList">
                    {selectedCategories.map((category) => (
                      <option key={category.id} value={category.title}>
                        {category.title}
                      </option>
                    ))}
                  </datalist>
                </div>
                <div className="col-6 mt-3">
                  <label>From Date</label>
                  <input
                    type="date"
                    name="date"
                    className="input"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div className="col-6 mt-3">
                  <label>To Date</label>
                  <input
                    type="date"
                    name="date"
                    className="input"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="buttons">
              <button
                className="reset-btn"
                //   onClick={handleReset}
              >
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
            <div className="d-flex justify-content-end mb-3">
              <ExcelExportButton
                onClick={handleExport}
                policyWiseData={policyWiseData}
                selectedProject={selectedProject}
                selectedBranch={selectedBranch}
                selectedPolicy={selectedPolicy}
                selectedCategory={selectedCategory}
                fromDate={fromDate}
                toDate={toDate}
              />
            </div>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Policy ID</th>
                    <th>Member No</th>
                    {/* <th>Member Name</th> */}
                    <th>ERP Member ID</th>
                    <th>Policy Type</th>
                    <th>Category Type</th>
                    <th>Nominee Name</th>
                    <th>Status</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {policyWiseData.map((item, index) => (
                    <tr key={index}>
                      <td>{item?.insurance_policy_no}</td>
                      <td>{item?.orgmemno}</td>
                      {/* <td>{item?.client.name}</td> */}
                      <td>{item?.enrolment_id}</td>
                      <td>{item?.health_configurations?.policy_name}</td>
                      <td>{item?.health_configurations?.title}</td>
                      <td>{item?.nominee_name}</td>
                      <td>{item?.statuses?.status_name}</td>
                      {/* <td>
                      <button
                        className="download-btn"
                        // onClick={() =>
                        //   navigate(`/insuranceFormPdf/${item.id}`, {
                        //     state: { item },
                        //   })
                        // }
                      >
                        Download
                      </button>
                    </td> */}
                      {/* <td>
                        <button
                          className="view-btn"
                          // onClick={() =>
                          //   navigate(`/approve-insurance-enrollment/${item.id}`, {
                          //     state: { item },
                          //   })
                          // }
                        >
                          View
                        </button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
           
          </div>
        </div>
      </div>
    </>
  );
};

export default PolicyReport;
