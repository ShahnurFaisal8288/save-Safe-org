import axios from "axios";
import React, { useEffect, useState } from "react";
const RenewInsuranceForm = () => {
  const [project,setProject] = useState([]);
  const [member,setMember] = useState([]);
  const [selectedMember,setSelectedMember] = useState("");
  const [selectedMemberDetails,setSelectedMemberDetails] = useState("");
  const [policy,setPolicy] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  


  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/projects")
        setProject(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProject();
  }, []);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/client")
        setMember(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMember();
  },[]);

  useEffect(() => {
    const selected = member.find((item) => item.account_number === selectedMember);
    setSelectedMemberDetails(selected);
  },[selectedMember,member]);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/insurance/category")
        setPolicy(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMember();
  },[]);

  useEffect(() => {
    // Add console.log to debug the values
    console.log('selectedPolicy:', selectedPolicy);
    console.log('policy:', policy);
  
    // Ensure policy is an array and selectedPolicy is a number
    if (Array.isArray(policy) && selectedPolicy) {
      const selected = policy.find((p) => p.insurance_product_id === Number(selectedPolicy));
      console.log('selected:', selected);
      setSelectedCategories(selected ? selected.category : []);
    }
  }, [selectedPolicy, policy]);

  // console.log(selectedPolicy);
  return (
    <div>
      return (
    <>
      <style>
        {`
      /* General Styles */
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

.label {
  font-weight: bold;
  margin-bottom: 5px;
}

.required {
  color: red;
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

/* Form Styles */
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

/* Search Box */
.search-box {
  display: flex;
}

.search-box input {
  flex: 1;
  padding: 10px;
}

.search-button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

/* Date Box */
.date-box {
  display: flex;
}

.date-box input {
  flex: 1;
  padding: 10px;
}

.calendar-button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

/* Form Grid */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.full-width {
  grid-column: span 2;
}

/* Upload Section */
.upload-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.upload-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}

.upload-label {
  display: block;
  cursor: pointer;
}

.file-placeholder {
  color: #777;
  font-size: 14px;
}

.file-input {
  display: none;
}

.error-text {
  color: #f44336;
  font-size: 12px;
  margin-top: 5px;
}

/* Note */
.note {
  margin-top: 15px;
  font-size: 14px;
  color: #666;
}

/* Button Group */
.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.reset-button,
.claim-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.reset-button {
  background-color: #f44336;
  color: #fff;
}

.claim-button {
  background-color: #4caf50;
  color: #fff;
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .full-width {
    grid-column: span 1;
  }

  .button-group {
    flex-direction: column;
    align-items: stretch;
  }

  .reset-button,
  .claim-button {
    width: 100%;
  }

  .upload-grid {
    grid-template-columns: 1fr;
  }

  .preview-image {
            max-width: 100%;
            max-height: 150px;
            margin-top: 10px;
            border-radius: 4px;
            object-fit: contain;
          }

          .upload-box {
            min-height: 120px;
          }

          .file-placeholder {
            margin-bottom: 10px;
          }

          .preview-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
          }
}

      `}
      </style>
      <div className="content-wrapper">
      <div className="container mt-3">
        <h2 className="title">Micro Health Insurance Renew Setup</h2>
        <form>
          <div className="form-group">
            {/* <label>Mapped Health Insurance ID</label> */}
            <input
              type="hidden"
              name="health_insurance_id"
            //   value={selectedInsuranceId}
              // value="3"
              readOnly
            />
          </div>
          <div className="form-group">
            {/* <label>Enrollment ID</label> */}
            <input
              type="hidden"
              name="enrollment_id"
              value="123e4567-e89b-12d3-a456-426614174000"
              readOnly
            />
          </div>
          <div className="form-group">
            {/* <label>Insurance Policy id</label> */}
            <input
              type="hidden"
              name="insurance_policy_id"
            //   value={selectedCategoryId}
              readOnly
            />
          </div>

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
                    name="orgmemno"
                    list="memberNumbers"
                    placeholder="Member Number"
                    onChange={(e) => setSelectedMember(e.target.value)}
                  />
                  <datalist id="memberNumbers">
                   {member.map((item, index) => {
                    return (
                      <option key={index} value={item?.account_number}>
                        {item?.account_number}
                      </option>
                    );
                     })}
                    </datalist>
                  </div>
                  </div>
                  <div className="form-group">
                  <label>ERP Member Number *</label>
                  <div className="search-box">
                    <input
                    type="text"
                    list="memberNumbers"
                    placeholder="Member Number"
                    />
                    <datalist id="memberNumbers">
                     
                    </datalist>
                  </div>
                  </div>
                  <div className="form-group">
                  <label>Member Category</label>
                  <div className="search-box">
                    <input
                    type="text"
                    list="memberNumbers"
                    placeholder="Member Number"
                    />
                    <datalist id="memberNumbers">
                     
                    </datalist>
                  </div>
                  </div>
                  <div className="form-group">
                  <label>Member Mobile Number</label>
                  <input
                    name="contact_number"
                    type="text"
                    value={selectedMemberDetails?.contact_number}
                  />
                  </div>
                  <div className="form-group">
                  <label>Member Name</label>
                  <input
                    type="text"
                    name="name"
                    value={selectedMemberDetails?.name}
                  />
                  </div>

                  <div className="form-group">
                  <label>Age</label>
                  <input 
                    name="date_of_birth"
                    type="text"
                    value={selectedMemberDetails?.date_of_birth ? Math.floor((new Date() - new Date(selectedMemberDetails.date_of_birth).getTime()) / 3.15576e+10) : ""}
                    readOnly
                  />
                  </div>
                  <div className="form-group">
                  <label>National ID</label>
                  <input
                    type="text"
                    readOnly
                  />
                  </div>
                </div>
                </div>

                {/* Incident Information Section */}
          <div className="section">
            <div className="section-header">Insurance Information</div>
            <div className="form-grid">
              <div className="form-group">
                <label>Policy ID</label>
                <select onChange={(e) => setSelectedPolicy(e.target.value)}>
                  <option>Select Policy ID</option>
                 {policy.map((item, index) => {
                    return (
                      <option key={index} value={item?.insurance_product_id}>
                        {item?.policy_name}
                      </option>
                    );
                  }
                  )
                 }
                </select>
              </div>
              <div className="form-group">
                <label>Select Policy Category *</label>
                <select>
                {selectedCategories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.title}
    </option>
  ))}
         
        </select>
              </div>
             
              <div className="form-group">
                <label>Insurance Policy ID</label>
                <div className="date-box">
                  <input type="text" name="date_of_incident" readOnly/>
                </div>
              </div>
              <div className="form-group">
                <label>Total Premium Amount</label>
                <input
                  type="number"
                  name="claim_amount"
                  readOnly
                />
              </div>
              
            </div>
          </div>

          {/* Document Upload Section */}
          {/* Document Upload Section */}
          <div className="section">
            <div className="section-header">Nominee Information</div>
            <div className="form-grid">
            <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="claim_amount"
                />
            </div>
          <div className="form-group">
                <label>Date Of Birth</label>
                <input
                  type="text"
                  name="claim_amount"
                />
            </div>
            <div className="form-group">
                <label>Relationship</label>
                <select >
                  <option>Select Policy ID</option>
                 
                </select>
              </div>
              <div className="form-group">
                <label>Nominee MObile Number</label>
                <input
                  type="text"
                  name="claim_amount"
                />
            </div>
              <div className="form-group">
                <label>National ID</label>
                <input
                  type="text"
                  name="claim_amount"
                />
            </div>
              <div className="form-group">
                <label>Birth Certificate Number</label>
                <input
                  type="text"
                  name="claim_amount"
                />
            </div>
              <div className="form-group">
                <label>Passport Number</label>
                <input
                  type="text"
                  name="claim_amount"
                />
            </div>
              <div className="form-group">
                <label>Smart Card  ID</label>
                <input
                  type="text"
                  name="claim_amount"
                />
            </div>
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
                    name="frontImage"
                    
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
                    name="backImage"
                   
                  />
                </div>
              </div>
              <small className="error-text">This field is required.</small>
            </div>
            </div>
           

           
            

            {/* Dynamic Document Upload Section */}
           
            <p className="note">
              <strong>N.B:</strong> If multiple document upload needed, please
              attach all the documents in a single PDF. Then select{" "}
              <strong>"Other documents"</strong> and upload the PDF.
            </p>
          </div>

          {/* Buttons */}
          <div className="button-group">
            <button className="reset-button">Reset ❌</button>
            <button type="submit" className="claim-button">
              Renew 🗂
            </button>
          </div>
        </form>
      </div>
      </div>
      
    </>
  );
    </div>
  )
}

export default RenewInsuranceForm
