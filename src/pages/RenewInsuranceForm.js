import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
const RenewInsuranceForm = () => {
  const navigate = useNavigate();

  const [project, setProject] = useState([]);
  const [member, setMember] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedMemberDetails, setSelectedMemberDetails] = useState("");
  const [policy, setPolicy] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [premiumAmountTotal, setPremiumAmountTotal] = useState("");
  const [policyTenure, setPolicyTenure] = useState("");
  const [policyId, setPolicyId] = useState("");

  const [collectorId, setCollectorId] = useState("");
  const [branchCode, setBranchCode] = useState("");
  //uuid
  const [insuranceId, setInsuranceId] = useState("");
  const [nomineeIDType, setNomineeIDType] = useState("");
  const [nomineeIDNumber, setNomineeIDNumber] = useState("");
  const [filterData, setFilterData] = useState([]);

  const [nomineeName, setNomineeName] = useState("");
  const [nomineeDOB, setNomineeDOB] = useState("");
  const [nomineeRelation, setNomineeRelation] = useState("");
  const [nomineeRelationId, setNomineeRelationId] = useState("");
  const [nomineePhone, setNomineePhone] = useState("");
  const [premiumAmount, setPremiumAmount] = useState("");
  const [frontImagePreview, setFrontImagePreview] = useState(null);
  const [backImagePreview, setBackImagePreview] = useState(null);

  console.log(selectedCategory);
  console.log(selectedPolicy);
  console.log(selectedMember);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/projects");
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
        const response = await axios.get("http://localhost:8000/api/client");
        setMember(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMember();
  }, []);

  useEffect(() => {
    const selected = member.find(
      (item) => item.account_number === selectedMember
    );
    setSelectedMemberDetails(selected);
  }, [selectedMember, member]);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/insurance/category"
        );
        setPolicy(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMember();
  }, []);

  useEffect(() => {
    // Add console.log to debug the values
    console.log("selectedPolicy:", selectedPolicy);
    console.log("policy:", policy);

    // Ensure policy is an array and selectedPolicy is a number
    if (Array.isArray(policy) && selectedPolicy) {
      const selected = policy.find(
        (p) => p.insurance_product_id === Number(selectedPolicy)
      );
      console.log("selected:", selected);
      setSelectedCategories(selected ? selected.category : []);
    }
  }, [selectedPolicy, policy]);

  useEffect(() => {
    if (selectedCategory) {
      // Generate a unique policy ID based on the selected category
      const generatedPolicyId = generatePolicyId(selectedCategory);
      setPolicyId(generatedPolicyId);
    }
  }, [selectedCategory]);

  const generatePolicyId = (categoryId) => {
    // Generate a unique number based on the category ID
    const uniqueNumber = Date.now().toString() + categoryId;
    return uniqueNumber;
  };

  useEffect(() => {
    const storedSetCollectorId = localStorage.getItem("id");

    setCollectorId(storedSetCollectorId);
  }, []);

  useEffect(() => {
    const branch_code = localStorage.getItem("branch_id");

    // Add null/empty checks
    if (branch_code && branch_code !== "null") {
      setBranchCode(branch_code);
    } else {
      // Optional: set to empty string or a default value
      setBranchCode("");
    }
  }, []);

  //SetInsuranceId
  const handleSetInsuranceId = () => {
    const id = crypto.randomUUID();
    setInsuranceId(id);
  };

  useEffect(() => {
    if (selectedCategory) {
      const category = selectedCategories.find(
        (cat) => cat.insurance_policy_id === parseInt(selectedCategory)
      );

      if (category) {
        setPremiumAmountTotal(category.premium_amount_total);
        setPolicyTenure(category.policy_tenure);
      }
    }
  }, [selectedCategory, selectedCategories]);
  console.log("selectedCategory:", selectedCategory);

  useEffect(() => {
    if (filterData?.[0]?.nominee_card_id) {
      setNomineeIDNumber(filterData[0].nominee_card_id);
      setNomineeIDType(filterData[0].nominee_typeof_card_id);
    }
  }, [filterData]);
  const handleInputChange = (e, type) => {
    const value = e.target.value;
    setNomineeIDNumber(value);

    switch (type) {
      case "nationalID":
        setNomineeIDType(value ? 2 : "");
        break;
      case "birthCertificate":
        setNomineeIDType(value ? 1 : "");
        break;
      case "passport":
        setNomineeIDType(value ? 3 : "");
        break;
      case "smartCard":
        setNomineeIDType(value ? 5 : "");
        break;
      default:
        setNomineeIDType("");
    }
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    let valid = true;
    let newErrors = {};

    try {
      const formData = new FormData();
      formData.append(
        "ApiKey",
        "a_secret_key_of_mission_twentty_twentty_foure_generate_by_kamrul"
      );

      // formData.append("BranchCode", "orangeBD600");

      // if (!event.target.Member_name || !event.target.Member_name.value) {
      //   throw new Error("Member_name is required");
      // }

      // console.log("Event target:", event.target);

      formData.append("Member_name", event.target.Member_name.value);
      formData.append("BranchCode", event.target.BranchCode.value);

      formData.append(
        "HealthInsuranceJson",
        JSON.stringify([{
          CoNo: event.target.CoNo ? event.target.CoNo.value : "",
          OrgNo: event.target.OrgNo ? event.target.OrgNo.value : "",
          OrgMemNo: event.target.OrgMemNo ? event.target.OrgMemNo.value : "",
          EnrollId: event.target.EnrollId ? event.target.EnrollId.value : "",
          ProjectCode: event.target.ProjectCode ? event.target.ProjectCode.value : "",
          AnyDisease: event.target.AnyDisease ? event.target.AnyDisease.value : "",
          PolicyName: event.target.PolicyName ? event.target.PolicyName.value : "",
          InsuranceType: event.target.InsuranceType ? event.target.InsuranceType.value : "",
          Category: event.target.Category ? event.target.Category.value : "",
          PremiumAmount: event.target.PremiumAmount ? event.target.PremiumAmount.value : "",
          Duration: event.target.Duration ? event.target.Duration.value : "",
          Phone: nomineePhone,
          NomineeName: nomineeName,
          NomineePhone: nomineePhone,
          NomineeDOB: nomineeDOB,
          NomineeIDType: nomineeIDType,
          NomineeIDIssueDate: event.target.NomineeIDIssueDate ? event.target.NomineeIDIssueDate.value : "",
          NomineeIDExpiryDate: event.target.NomineeIDExpiryDate ? event.target.NomineeIDExpiryDate.value : "",
          NomineeIDPlaceOfIssue: event.target.NomineeIDPlaceOfIssue ? event.target.NomineeIDPlaceOfIssue.value : "",
          NomineeIDNumber: nomineeIDNumber,
          NomineeRelation: nomineeRelationId,
        }])
      );
      formData.append("CollectorId", event.target.CollectorId.value);

      // console.log("BranchCode:", event.target.BranchCode.value);
      // console.log("Member_name:", event.target.Member_name.value);
      console.log("HealthInsuranceJson:", formData.get("HealthInsuranceJson"));

      // Ensure file inputs exist and have files
      if (!event.target.Duration) {
        throw new Error("policy_tenure is required");
      }

      if (
        !event.target.nomineeImageBack ||
        !event.target.nomineeImageBack.files[0]
      ) {
        throw new Error("Nominee Image Back is required");
      }

      formData.append(
        "nomineeImageFront",
        event.target.nomineeImageFront.files[0]
      );
      formData.append(
        "nomineeImageBack",
        event.target.nomineeImageBack.files[0]
      );

      console.log("FormData before Axios request:");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      axios
        .post("http://localhost:8000/api/health_insurance/store", formData, {
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
                navigate("/insurance-list");
                window.location.href = "/insurance-list"; // Replace with your target URL
              }
            });
          }

          // console.log("inserttt data", response.data);
        })
        .catch((error) => {
          console.error("Error creating data:", error.message);
        });
    } catch (error) {
      console.error("Error creating data:", error.message);
      alert("Failed to create data");
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/health_insurance/renew?category_id=${selectedCategory}&insurance_policy_id=${selectedPolicy}&orgmemno=${selectedMember}`
      );
      const data = response.data;
      console.log("API Response Data:", data); // Log the API response data
      if (data.length > 0) {
        setFilterData(data[0]);
        setNomineeName(data[0].nominee_name || "");
        setNomineeDOB(data[0].nominee_birthdate || "");
        setNomineeRelation(data[0].relationships[0]?.data_name || "");
        setNomineeRelationId(data[0].relationships[0]?.id || "");
        setNomineePhone(data[0].nominee_phone_no || "");
        setNomineeIDNumber(data[0].nominee_card_id || "");
        setNomineeIDType(data[0].nominee_typeof_card_id || "");
        setPremiumAmount(data[0].premium_amnt || "");
      } else {
        setFilterData(null);
      }
      console.log("Filter Data:", data); // Log the first item in the response
    } catch (error) {
      console.error("Error fetching search results:", error);
      setFilterData(null);
    }
  };

  useEffect(() => {
    if (selectedCategory && selectedPolicy && selectedMember) {
      handleSearch();
    }
  }, [selectedCategory, selectedPolicy, selectedMember]);



  const handleFrontImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFrontImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFrontImagePreview(null);
    }
  };
  
  const handleBackImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setBackImagePreview(null);
    }
  };

  // console.log(filterData);

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
            <form onSubmit={handleSubmitForm}>
              <div>
                {/* <label>Mapped Health Insurance ID</label> */}
                <input type="hidden" name="OrgNo" value="null" readOnly />
              </div>
              <div>
                {/* <label>Mapped Health Insurance ID</label> */}
                <input
                  type="hidden"
                  name="CollectorId"
                  value={collectorId}
                  readOnly
                />
              </div>
              <div>
                {/* <label>Mapped Health Insurance ID</label> */}
                <input
                  type="hidden"
                  name="BranchCode"
                  value={branchCode}
                  readOnly
                />
              </div>
              <div>
                {/* <label>Enrollment ID</label> */}
                <input
                  type="hidden"
                  name="EnrollId"
                  onChange={handleSetInsuranceId}
                  value={insuranceId}
                  readOnly
                />
              </div>
              <div>
                {/* <label>Enrollment ID</label> */}
                <input type="hidden" name="AnyDisease" value="1" readOnly />
              </div>
              <div>
                {/* <label>Enrollment ID</label> */}
                <input type="hidden" name="InsuranceType" value="2" readOnly />
              </div>
              <div className="form-group">
                <input
                  name="PremiumAmount"
                  type="hidden"
                  value={premiumAmountTotal}
                  readOnly
                />
              </div>

              <div className="form-group">
              
                <input
                  name="Duration"
                  type="hidden"
                  value={policyTenure}
                  readOnly
                />
              </div>
              {/* Display the NomineeIDType */}
              <div className="form-group">
                <input
                  type="hidden"
                  name="NomineeIDType"
                  value={nomineeIDType}
                  readOnly
                />
              </div>

              {/* Project Section */}
              <div className="section">
                {/* <div className="section-header">Project</div> */}
                <div className="form-group">
                  <label>Project *</label>
                  <select
                    name="ProjectCode"
                    onChange={() => {
                      handleSetInsuranceId(); // Generate the UUID when the button is clicked
                    }}
                  >
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
                        name="OrgMemNo"
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
                      <datalist id="memberNumbers"></datalist>
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
                      <datalist id="memberNumbers"></datalist>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Member Mobile Number</label>
                    <input
                      name="Phone"
                      type="text"
                      value={selectedMemberDetails?.contact_number}
                    />
                  </div>
                  <div className="form-group">
                    <label>Member Name</label>
                    <input
                      type="text"
                      name="Member_name"
                      value={selectedMemberDetails?.name}
                    />
                  </div>

                  <div className="form-group">
                    <label>Age</label>
                    <input
                      name="date_of_birth"
                      type="text"
                      value={
                        selectedMemberDetails?.date_of_birth
                          ? Math.floor(
                              (new Date() -
                                new Date(
                                  selectedMemberDetails.date_of_birth
                                ).getTime()) /
                                3.15576e10
                            )
                          : ""
                      }
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>National ID</label>
                    <input type="text" readOnly />
                  </div>
                </div>
              </div>

              {/* Incident Information Section */}
              <div className="section">
                <div className="section-header">Insurance Information</div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Policy ID</label>
                    <select
                      name="PolicyName"
                      onChange={(e) => setSelectedPolicy(e.target.value)}
                    >
                      <option>Select Policy ID</option>
                      {policy.map((item, index) => {
                        return (
                          <option
                            key={index}
                            value={item?.insurance_product_id}
                          >
                            {item?.policy_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Select Policy Category *</label>
                    <select
                      name="Category"
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      onClick={handleSearch}
                    >
                      Category
                      <option>Choose</option>
                      {selectedCategories.map((category) => (
                        <option
                          key={category.id}
                          value={category.insurance_policy_id}
                        >
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Insurance Policy ID</label>
                    <div className="date-box">
                      <input
                        type="text"
                        name="policy_id"
                        value={policyId}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Total Premium Amount</label>
                    <input
                      type="text"
                      value={premiumAmount}
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
    value={nomineeName}
    name="NomineeName"
    onChange={(e) => setNomineeName(e.target.value)}
  />
</div>
<div className="form-group">
  <label>Date Of Birth</label>
  <input
    type="date"
    value={nomineeDOB}
    name="NomineeDOB"
    onChange={(e) => setNomineeDOB(e.target.value)}
  />
</div>

                  <div className="form-group">
                    <label>Relationship</label>
                    {/* Hidden input that stores the ID as value */}
                    <input
                      type="hidden"
                      name="NomineeRelation"
                      value={nomineeRelationId}
                    />
                    {/* Display input that shows the name */}
                    <input type="text" value={nomineeRelation} readOnly />
                  </div>
                  <div className="form-group">
  <label>National ID</label>
  <input
    type="text"
    name="NomineeIDNumber"
    value={nomineeIDType === 2 ? nomineeIDNumber : ""}
    onChange={(e) => handleInputChange(e, "nationalID")}
  />
</div>
<div className="form-group">
  <label>Birth Certificate Number</label>
  <input
    type="text"
    name="NomineeIDNumber"
    value={nomineeIDType === 1 ? nomineeIDNumber : ""}
    onChange={(e) => handleInputChange(e, "birthCertificate")}
  />
</div>
<div className="form-group">
  <label>Passport Number</label>
  <input
    type="text"
    name="NomineeIDNumber"
    value={nomineeIDType === 3 ? nomineeIDNumber : ""}
    onChange={(e) => handleInputChange(e, "passport")}
  />
</div>
<div className="form-group">
  <label>Smart Card ID</label>
  <input
    type="text"
    name="NomineeIDNumber"
    value={nomineeIDType === 5 ? nomineeIDNumber : ""}
    onChange={(e) => handleInputChange(e, "smartCard")}
  />
</div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="NomineePhone"
                      value={nomineePhone}
                      onChange={(e) => setNomineePhone(e.target.value)}
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
        name="nomineeImageFront"
        type="file"
        id="frontSide"
        className="file-input"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={handleFrontImageChange}
      />
      {frontImagePreview && (
        <div className="preview-container">
          <img
            src={frontImagePreview}
            alt="Front ID Preview"
            className="preview-image"
            height="100px"
            width="100px"
          />
        </div>
      )}
    </div>
    <div className="upload-box">
      <label className="upload-label" htmlFor="backSide">
        <div className="file-placeholder">Back Side</div>
      </label>
      <input
        name="nomineeImageBack"
        type="file"
        id="backSide"
        className="file-input"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={handleBackImageChange}
      />
      {backImagePreview && (
        <div className="preview-container">
          <img
            src={backImagePreview}
            alt="Back ID Preview"
            className="preview-image"
            height="100px"
            width="100px"
          />
        </div>
      )}
    </div>
  </div>
  <small className="error-text">
    This field is required.
  </small>
</div>
                </div>

                {/* Dynamic Document Upload Section */}

                <p className="note">
                  <strong>N.B:</strong> If multiple document upload needed,
                  please attach all the documents in a single PDF. Then select{" "}
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
  );
};

export default RenewInsuranceForm;
