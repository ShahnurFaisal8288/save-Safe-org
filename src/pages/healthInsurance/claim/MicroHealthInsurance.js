import React, { useEffect, useState } from "react";
// import "../../MicroHealthInsurance.css";
import "../../../MicroHealthInsurance.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../components/axiosInstance";

const MicroHealthInsurance = () => {
  const navigate = useNavigate();

  // const [project, setProject] = useState();
  const [project, setProject] = useState([]);
  const [memberNo, setMemberNo] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [treatmentType, setTreatmentType] = useState([]);
  const [selectedTreatment, setSelectedTreatment] = useState([]);
  const [selectedPolicyNumber, setSelectedPolicyNumber] = useState("");
  const [remainingSum, setRemainingSum] = useState("");
  const [remainingSumLast, setRemainingSumLast] = useState("");
  const [mappedHealthInsuranceId, setMappedHealthInsuranceId] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [treatmentTypeId, setTreatmentTypeId] = useState("");
  const [selectedInsuranceId, setSelectedInsuranceId] = useState(null);
  const [frontImagePreview, setFrontImagePreview] = useState(null);
  const [backImagePreview, setBackImagePreview] = useState(null);
  const [claimAmount, setClaimAmount] = useState();

  

  useEffect(() => {
    const fetchProjectNo = async () => {
      const projectResponse = await axiosInstance.get(
        "projects"
      );
      setProject(projectResponse.data);
      console.log("memberNoResponse :", projectResponse);
    };
    fetchProjectNo();
  }, []);
  useEffect(() => {
    const fetchMemberNo = async () => {
      const memberNoResponse = await axiosInstance.get(
        "client"
      );
      setMemberNo(memberNoResponse.data);
      console.log("memberNoResponse :", memberNoResponse);
    };
    fetchMemberNo();
  }, []);
  useEffect(() => {
    const fetchTreatmentType = async () => {
      const treatmentResponse = await axiosInstance.get(
        "treatmenttypes"
      );
      setTreatmentType(treatmentResponse.data);
      console.log("treatmentResponse :", treatmentResponse);
    };
    fetchTreatmentType();
  }, []);
  const getDocumentTypeOptions = () => {
    return [
      { value: "doctor_advise", label: "Doctor Advise" },
      { value: "discharge_certificate", label: "Discharge Certificate" },
      { value: "hospital_bill", label: "Hospital Bill" },
      { value: "investigation_report", label: "Investigation Report" },
      { value: "other_documents", label: "Other Documents" },
    ];
  };

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
        const productResponse = await axiosInstance.get(
          `health_insurances/account_number?account_number=${accountNumber}`
        );

        // Set the response data to the product state
        setProduct(productResponse.data);

        console.log("Product Product Response:", productResponse.data);
      } catch (error) {
        console.error("Error Fetching Products:", error);
      }
    }
  };
  console.log("product", product);

  const handleProductChange = (e) => {
    const policyName = e.target.value;

    const selectedPolicy = product.find(
      (item) => item.policy_name === policyName
    );
    if (selectedPolicy) {
      setSelectedProduct(selectedPolicy);
      console.log("policyName:", selectedProduct);
    }
  };

  const policy_number_options = selectedProduct?.insurance_details
    ?.map((item) => item.insurance_policy_no)
    .filter((item) => item);

  console.log("policy_number_options", selectedProduct.insurance_details);
  const handlePolicyNoChange = (e) => {
    const policyNumber = e.target.value;
    setSelectedPolicyNumber(policyNumber);
    const selectedPolicy = selectedProduct.insurance_details.find(
      (detail) => detail.insurance_policy_no === policyNumber
    );
    if (selectedPolicy) {
      setSelectedCategoryId(selectedPolicy.category_id); // Set the category_id
      setSelectedInsuranceId(selectedPolicy.id); // Set the insurance ID
      console.log("Category ID:", selectedPolicy.category_id);
      console.log("Insurance ID:", selectedPolicy.id);
    } else {
      setSelectedCategoryId(null); // Reset if no match found
      setSelectedInsuranceId(null); // Reset insurance ID if no match found
      console.log("Policy number not found.");
    }

    //   // Check if a match is found
    //   if (selectedPolicy) {
    //     // setSelectedCategoryId(selectedPolicy.category_id); // Set the category_id
    //     // console.log("Category ID:", selectedPolicy.category_id);
    // } else {
    //     setSelectedCategoryId(null); // Reset if no match found
    //     console.log("Policy number not found.");
    // }
  };

  const handleTreatmentChange = async (e) => {
    const selectedValue = JSON.parse(e.target.value); // Parse JSON string
    const id = selectedValue.id; // Extract id
    setTreatmentTypeId(id); // Parse the JSON string
    const treatmentType = selectedValue.column_name; // Extract `column_name` (e.g., 'opd')

    const insurancePolicyNo = selectedPolicyNumber; // Assuming this is already defined

    console.log("Selected Treatment Type:", treatmentType);
    console.log("Treatment Type ID:", treatmentTypeId);
    console.log("Insurance Policy No:", insurancePolicyNo);
    // console.log("selectedPolicyNumber:", selectedPolicyNumber);

    if (treatmentType && insurancePolicyNo) {
      setSelectedTreatment(treatmentTypeId); // Store only `id` in state
      const url = `searchTreatment/typename?type_name=${treatmentType}&insurance_policy_id=${selectedCategoryId}&insurance_policy_no=${insurancePolicyNo}`;
      console.log("Request URL:", url);

      try {
        const response = await axiosInstance.get(url);

        if (response.status === 200) {
          const remainingSumInsured = response.data;
          setRemainingSum(remainingSumInsured);
          setRemainingSumLast(remainingSumInsured); // Update last remaining sum insured
          console.log("Remaining Sum Insured Response:", remainingSumInsured);
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error(
          "Error Fetching Treatment Data:",
          error.response ? error.response.data : error.message
        );
      }
    } else {
      console.error("Required fields are missing.");
    }
  };
  const handleClaimAmountChange = (e) => {
    const newClaimAmount = e.target.value;

    // Prevent negative sign or invalid numbers
    if (newClaimAmount.includes("-") || isNaN(newClaimAmount)) {
      return; // Don't allow invalid input
    }

    // Update the claim amount
    setClaimAmount(newClaimAmount);

    // Calculate the new remaining sum insured (ensure it doesn't go below zero)
    const newRemainingSum =
      remainingSumLast.treatmentAmount - parseFloat(newClaimAmount || 0);
    setRemainingSumLast((prev) => ({
      ...prev,
      remainingAmount: newRemainingSum >= 0 ? newRemainingSum : 0, // Ensure non-negative value
    }));
  };

  // method to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("health_insurance_id", e.target.health_insurance_id.value);
    formData.append("enrollment_id", e.target.enrollment_id.value);
    formData.append("insurance_policy_id", e.target.insurance_policy_id.value);
    formData.append("insurance_policy_no", e.target.insurance_policy_no.value);
    formData.append("treatment_type_id", e.target.treatment_type_id.value);
    formData.append("date_of_incident", e.target.date_of_incident.value);
    formData.append("claim_amount", e.target.claim_amount.value);
    // formData.append("frontImage", e.target.frontImage.value);
    // formData.append("backImage", e.target.backImage.value);
    formData.append("document_type", e.target.document_type.value);
    console.log("documentPath...... :", e.target.documentPath.value);
    // formData.append("documentPath", e.target.documentPath.value);

    formData.append("frontImage", e.target.frontImage.files[0]);
    formData.append("backImage", e.target.backImage.files[0]);
    // formData.append("documentPath", e.target.documentPath.files[0]);
    // Handle multiple files for documentPath
    const documentFiles = e.target.documentPath.files;
    for (let i = 0; i < documentFiles.length; i++) {
      formData.append("documentPath", documentFiles[i]);
    }

    try {
      const response = await axiosInstance.post(
        "claim/store",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Data Submission Successful",
          text: `Data has been stored successfully!`,
          showConfirmButton: true,
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/claimList");
            window.location.href = "/claimList"; // Replace with your target URL
          }
        });
      }
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();

  // console.log("remainingSum :", remainingSum);
  // console.log("selectedTreatment :", treatmentType);
  // console.log("selectedProduct :", selectedProduct);

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
          <h2 className="title">Micro Health Insurance Claim Benefit Setup</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              {/* <label>Mapped Health Insurance ID</label> */}
              <input
                type="hidden"
                name="health_insurance_id"
                value={selectedInsuranceId}
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
                value={selectedCategoryId}
                readOnly
              />
            </div>

            {/* Project Section */}
            <div className="col-4">
              <div className="section">
                <div className="form-group">
                  <label>Project *</label>
                  <select className="form-select">
                    <option>Choose</option>
                    {project.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.projectTitle}
                      </option>
                    ))}
                  </select>
                </div>
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
                    value={
                      selectedMemberId ? selectedMemberId.contact_number : ""
                    }
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
                  <select onChange={handleProductChange}>
                    <option>Select Product</option>
                    {product.map((item, index) => (
                      <option key={index} value={item.policy_name}>
                        {item.policy_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Select Policy No *</label>
                  <select
                    onChange={handlePolicyNoChange}
                    name="insurance_policy_no"
                  >
                    <option>Select Policy Number</option>
                    {policy_number_options?.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Treatment Type *</label>
                  <select onChange={handleTreatmentChange}>
                    <option>Select Policy No</option>
                    {treatmentType.map((item, index) => (
                      <option
                        key={index}
                        value={JSON.stringify({
                          id: item.id,
                          column_name: item.column_name,
                        })}
                      >
                        {item.column_name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <div className="form-group"> */}
                <input
                  type="hidden"
                  name="treatment_type_id"
                  value={treatmentTypeId}
                  readOnly
                />
                {/* </div> */}
                <div className="form-group">
                  <label>Date of Incident *</label>
                  <div className="date-box">
                    <input type="date" name="date_of_incident" />
                    <button className="calendar-button">📅</button>
                  </div>
                </div>
                <div className="form-group">
                  <label>Claim Amount *</label>
                  <input
                    type="number"
                    name="claim_amount"
                    value={claimAmount}
                    onChange={handleClaimAmountChange}
                  />
                </div>
                <div className="form-group">
                  <label>Remaining Sum Insured</label>
                  <input
                    type="number"
                    value={
                      remainingSumLast.remainingAmount ||
                      remainingSumLast.treatmentAmount
                    }
                  />
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
                      name="frontImage"
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
                      type="file"
                      id="backSide"
                      className="file-input"
                      accept=".jpg,.jpeg,.png,.pdf"
                      name="backImage"
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
                {/* <small className="error-text">This field is required.</small> */}
              </div>

              {/* <div className="form-group">
          <label>Document Type *</label>
          <select >
            <option>Select a Document Type</option>
          </select>
        </div> */}
              <div className="form-group">
                <label>Document Type *</label>
                <select
                  value={documentType}
                  name="document_type"
                  onChange={(e) => setDocumentType(e.target.value)}
                >
                  <option value="">Select a Document Type</option>
                  {getDocumentTypeOptions().map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dynamic Document Upload Section */}
              {documentType && (
                <div className="form-group">
                  <label>
                    {
                      getDocumentTypeOptions().find(
                        (opt) => opt.value === documentType
                      )?.label
                    }{" "}
                    *
                  </label>
                  <div className="upload-box">
                    <input
                      type="file"
                      className="file-input"
                      accept=".jpg,.jpeg,.png,.pdf"
                      id={documentType}
                      name="documentPath"
                      multiple
                    />
                    <label className="upload-label" htmlFor={documentType}>
                      Choose a file
                    </label>
                  </div>
                </div>
              )}
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
                Claim 🗂
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MicroHealthInsurance;
