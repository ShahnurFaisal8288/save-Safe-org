import React, { useEffect, useState } from "react";
import "../MicroHealthInsurance.css";
import axios from "axios";

const MicroHealthInsurance = () => {
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
  const [mappedHealthInsuranceId, setMappedHealthInsuranceId] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [treatmentTypeId, setTreatmentTypeId] = useState("");

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
  useEffect(() => {
    const fetchTreatmentType = async () => {
      const treatmentResponse = await axios.get(
        "http://localhost:8000/api/treatmenttypes"
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

  // Check if a match is found
  if (selectedPolicy) {
    setSelectedCategoryId(selectedPolicy.category_id); // Set the category_id
    console.log("Category ID:", selectedPolicy.category_id);
} else {
    setSelectedCategoryId(null); // Reset if no match found
    console.log("Policy number not found.");
}
  };

  const handleTreatmentChange = async (e) => {
    const selectedValue = JSON.parse(e.target.value); // Parse JSON string
        const id = selectedValue.id; // Extract id
        setTreatmentTypeId(id); // Parse the JSON string
    const treatmentType = selectedValue.column_name; // Extract `column_name` (e.g., 'opd') // Extract `id` (e.g., '1')

    const insurancePolicyNo = selectedPolicyNumber; // Assuming this is already defined

    console.log("Selected Treatment Type:", treatmentType);
    console.log("Treatment Type ID:", treatmentTypeId);
    console.log("Insurance Policy No:", insurancePolicyNo);

    if (treatmentType && insurancePolicyNo) {
        setSelectedTreatment(treatmentTypeId); // Store only `id` in state
        const url = `http://localhost:8000/api/searchTreatment/typename?insurance_policy_id=${selectedCategoryId}&type_name=${treatmentType}`;
        console.log("Request URL:", url);

        try {
            const response = await axios.get(url);

            if (response.status === 200) {
                const remainingSumInsured = response.data;
                setRemainingSum(remainingSumInsured);
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
        console.error(
            "Required fields are missing. Ensure treatmentType, insurancePolicyId, and insurancePolicyNo are defined."
        );
    }
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
    formData.append("documentPath", e.target.documentPath.files[0]);
    alert("Form submitted successfully");

    try {
      alert("Form submitted successfully");
      const response = await axios.post(
        "http://localhost:8000/api/claim/store",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        console.log("Form submitted successfully:", response.data);
      } else {
        console.error("Unexpected response status:", response.status);
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
  console.log("selectedTreatment :", treatmentType);
  // console.log("selectedProduct :", selectedProduct);

  return (
    <div className="container mt-5">
      <h2 className="title">Micro Health Insurance Claim Benefit Setup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          {/* <label>Mapped Health Insurance ID</label> */}
          <input
            type="hidden"
            name="health_insurance_id"
            // value={selectedProduct.insurance_product_id}
            value="3"
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
                  <option key={index} value={JSON.stringify({ id: item.id, column_name: item.column_name })}>
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
              <input type="number" name="claim_amount" />
            </div>
            <div className="form-group">
              <label>Remaining Sum Insured</label>
              <input
                type="number"
                value={remainingSum}
                // value="100"
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
  );
};

export default MicroHealthInsurance;
