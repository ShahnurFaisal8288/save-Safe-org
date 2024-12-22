import React, { useEffect, useState } from "react";
import "../MicroHealthInsurance.css";
import axios from "axios";

const MicroHealthInsurance = () => {
  // const [project, setProject] = useState();
  const [project, setProject] = useState([]);
  const [memberNo, setMemberNo] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [product, setProduct] = useState([]);

  //  useEffect(() => {
  //   const fetchProjectName = async () => {
  //     const projectResponse = await axios.get(
  //       "http://localhost:8000/api/projects"
  //     );
  //     setProject(projectResponse.data);
  //     };
  //     fetchProjectName();
  //   }, []);

  useEffect(() => {
    const fetchProjectNo = async () => {
      const projectResponse = await axios.get(
        "http://localhost:8000/api/projects"
      );
      setProject(projectResponse.data);
      console.log("memberNoResponse :", projectResponse);
    };
    fetchProjectNo();
  }, []);
  useEffect(() => {
    const fetchMemberNo = async () => {
      const memberNoResponse = await axios.get(
        "http://localhost:8000/api/client"
      );
      setMemberNo(memberNoResponse.data);
      console.log("memberNoResponse :", memberNoResponse);
    };
    fetchMemberNo();
  }, []);

  //calculate Age
  const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    // Adjust age if the current date is before the birthday this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  };

  const handleMemberChange = async (e) => {
    const accountNumber = e.target.value;
  
    // Find the selected member based on the account number
    const selectedMember = memberNo.find(
      (item) => item.account_number === accountNumber
    );
  
    if (selectedMember) {
      setSelectedMemberId(selectedMember);
      console.log("Selected Member ID:", selectedMember);
  
      try {
        // Pass the account_number as a query parameter in the API request
        const productResponse = await axios.get(
          `http://localhost:8000/api/health_insurances/account_number?account_number=${accountNumber}`
        );
  
        // Set the response data to the product state
        setProduct(productResponse.data);

        console.log("Product Product Response:", productResponse.data);
      } catch (error) {
        console.error("Error Fetching Products:", error);
      }
    }
  };
  
  // console.log("selectedMemberId :",selectedMemberId);
  console.log("project :", project);
  return (
    <div className="container mt-5">
      <h2 className="title">Micro Health Insurance Claim Benefit Setup</h2>

      {/* Project Section */}
      <div className="section">
        {/* <div className="section-header">Project</div> */}
        <div className="form-group">
          <label>Project *</label>
          <select>
            <option>Choose</option>
            {project.map((item, index) => (
              <option key={index} value={item.id}>
                {item.projectTitle}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Member Information Section */}
      <div className="section">
        <div className="section-header">Member Information</div>
        <div className="form-grid">
          <div className="form-group">
            <label>Member Number *</label>
            <div className="search-box">
              <input
                type="text"
                list="memberNumbers"
                onChange={handleMemberChange}
                placeholder="Member Number"
              />
              <datalist id="memberNumbers">
                {memberNo.map((item, index) => (
                  <option key={index} value={item.account_number}>
                    {item.account_number}
                  </option>
                ))}
              </datalist>
            </div>
          </div>

          <div className="form-group">
            <label>Member Name</label>
            <input
              type="text"
              value={selectedMemberId ? selectedMemberId.name : ""}
            />
          </div>

          <div className="form-group">
            <label>Member Mobile Number</label>
            <input
              type="text"
              value={selectedMemberId ? selectedMemberId.contact_number : ""}
            />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="text"
              value={
                selectedMemberId && selectedMemberId.date_of_birth
                  ? calculateAge(selectedMemberId.date_of_birth)
                  : ""
              }
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Incident Information Section */}
      <div className="section">
        <div className="section-header">Incident Information</div>
        <div className="form-grid">
          <div className="form-group">
            <label>Product *</label>
            <select>
              <option>Select Product</option>
              {product.map((item,index) => (
              <option key={index} value={item.policy_name}>{item.policy_name}</option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label>Select Policy No *</label>
            <select>
              <option>Select Policy Number</option>
            </select>
          </div>
          <div className="form-group">
            <label>Treatment Type *</label>
            <select>
              <option>Select Treatment Type</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date of Incident *</label>
            <div className="date-box">
              <input type="date" />
              <button className="calendar-button">📅</button>
            </div>
          </div>
          <div className="form-group">
            <label>Claim Amount *</label>
            <input type="number" />
          </div>
          <div className="form-group">
            <label>Remaining Sum Insured</label>
            <input type="number" />
          </div>
        </div>
      </div>

      {/* Document Upload Section */}
      {/* Document Upload Section */}
      <div className="section">
        <div className="section-header">Document Upload</div>
        <div className="form-group">
          <label>Member's National ID *</label>
          <div className="upload-grid">
            <div className="upload-box">
              <label className="upload-label" htmlFor="frontSide">
                <div className="file-placeholder">Front Side</div>
              </label>
              <input
                type="file"
                id="frontSide"
                className="file-input"
                accept=".jpg,.jpeg,.png,.pdf"
              />
            </div>
            <div className="upload-box">
              <label className="upload-label" htmlFor="backSide">
                <div className="file-placeholder">Back Side</div>
              </label>
              <input
                type="file"
                id="backSide"
                className="file-input"
                accept=".jpg,.jpeg,.png,.pdf"
              />
            </div>
          </div>
          <small className="error-text">This field is required.</small>
        </div>

        <div className="form-group">
          <label>Document Type *</label>
          <select>
            <option>Select a Document Type</option>
          </select>
        </div>

        <p className="note">
          <strong>N.B:</strong> If multiple document upload needed, please
          attach all the documents in a single PDF. Then select{" "}
          <strong>"Other documents"</strong> and upload the PDF.
        </p>
      </div>

      {/* Buttons */}
      <div className="button-group">
        <button className="reset-button">Reset ❌</button>
        <button className="claim-button">Claim 🗂</button>
      </div>
    </div>
  );
};

export default MicroHealthInsurance;
