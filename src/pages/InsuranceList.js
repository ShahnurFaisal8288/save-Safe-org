import axios from "axios";
import React, { useEffect, useState } from "react";

const InsuranceList = () => {
  // All useState start
  const [project, setProject] = useState([]);
  const [poNo, setPoNo] = useState([]);
  const [memberName, setMemberName] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [statusFilters, setStatusFilters] = useState({
    allDate: false,
    Pending: false,
    Approved: false,
    Rejected: false,
    Disbursed: false,
  });
  const [filteredData, setFilteredData] = useState([]);

  // Fetch project, PO, and member data
  const fetchData = async () => {
    try {
      const projectResponse = await axios.get(
        "http://localhost:5001/api/projects"
      );
      if (projectResponse.data && Array.isArray(projectResponse.data)) {
        setProject(projectResponse.data);
      }

      const poResponse = await axios.get(
        "http://localhost:5001/api/collectors"
      );
      if (poResponse.data) {
        setPoNo(poResponse.data);
      }

      const memberResponse = await axios.get(
        "http://localhost:5001/api/client"
      );
      if (memberResponse.data) {
        setMemberName(memberResponse.data);
      }

      // Set initial data for display (could be fetched from a separate API for insurance list)
      const initialData = await axios.get("YOUR_INITIAL_DATA_API_URL");
      setFilteredData(initialData.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle checkbox change for status filters
  const handleStatusChange = (e) => {
    setStatusFilters({
      ...statusFilters,
      [e.target.name]: e.target.checked,
    });
  };

  // Handle search form submission
  const handleSearch = async () => {
    const filterParams = {
      date: searchDate,
      status: Object.keys(statusFilters).filter((key) => statusFilters[key]),
    };

    try {
      const response = await axios.get("YOUR_SEARCH_API_URL", {
        params: filterParams,
      });
      if (response.data) {
        setFilteredData(response.data);
      }
    } catch (error) {
      console.error("Error fetching filtered data:", error.message);
    }
  };
  // console.log("poNo", poNo);
  return (
    <div className="container">
      {/* Project Selection */}
      <div className="section mt-5">
        <label className="label">
          Project <span className="required">*</span>
        </label>
        <select className="input">
          <option>Choose Project</option>
          {project.map((item, index) => (
            <option key={index} value={item.id}>
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
              <input className="input" list="poList" />
              <datalist id="poList">
                {poNo.map((item, index) => (
                  <option key={index} value={item.collector_number} />
                ))}
              </datalist>
            </div>
            <div className="col-6">
              <label>Member Number</label>
              <input className="input" list="memberList" />
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
                    name="2"
                    checked={statusFilters.Pending}
                    onChange={handleStatusChange}
                  />
                  <label>Pending</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="1"
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
          <button className="reset-btn" onClick={() => setSearchDate("")}>
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
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.buffer_id}</td>
                <td>{item.date}</td>
                <td>{item.member_name}</td>
                <td>{item.insurance_product}</td>
                <td>{item.status}</td>
                <td>
                  <button className="download-btn">Download</button>
                </td>
                <td>
                  <button className="view-btn">View</button>
                </td>
              </tr>
            ))}
          </tbody>
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
  );
};

export default InsuranceList;
