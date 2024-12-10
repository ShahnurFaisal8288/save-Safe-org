import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { Camera, CheckCircle } from "lucide-react";
import axios from "axios";
import reportWebVitals from "./../reportWebVitals";
import useGetCategory from "../hooks/useGetCategory";

function InsuranceForm() {
  const [frontPreview, setFrontPreview] = useState(null);
  const [backPreview, setBackPreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEligible, setIsEligible] = useState(true);
  const [validated, setValidated] = useState(false);
  // const [selectedCategory, setSelectedCategory] = useState('');
  //policy Name start
  const [policyName, setPolicyName] = useState([]);

  //policy Name end

  //policy <>ise Category start
  // const [categories, setCategories] = useState([]);
  //policy <>ise Category end

  const [idType, setidType] = useState([]);
  // const [category, setCategory] = useState([]);
  const [relation, setRelation] = useState([]);

  const [premiumAmount, setPremiumAmount] = useState("");
  const [policyTenture, setPolicyTenture] = useState("");
  const [coNo, setCollectorNumber] = useState(null);

  //insurance form params data start
  const { id, name, account_number } = useParams();
  //insurance form params data end

  //insurance form validation start
  const [phone, setPhone] = useState("");
  const [nomineePhone, setNomineePhone] = useState("");
  const [validatePolicyName, setValidatePolicyName] = useState("");
  const [validateInsuranceType, setValidateInsuranceType] = useState("");
  const [validateCategory, setValidateCategory] = useState("");
  // const [validatePremiumAmount, setValidatePremiumAmount] = useState("");
  // const [validateDuration, setValidateDuration] = useState("");
  const [validateNomineeName, setValidateNomineeName] = useState("");
  const [validateNomineeDOB, setValidateNomineeDOB] = useState("");
  const [validateIDType, setValidateIDType] = useState("");
  const [validateMainID, setValidateMainID] = useState("");
  const [validateRelation, setValidateRelation] = useState("");
  const [validateFrontImg, setValidateFrontImg] = useState("");
  const [validateBackImg, setValidateBacktImg] = useState("");
  const [errors, setErrors] = useState({});
  //insurance form validation end

  //insurance form nominee iput hide show start
  const [nomineeIDType, setNomineeIDType] = useState("");
  const [selectedPolicy, setSelectedPolicy] = useState("");
  //insurance form nominee iput hide show end

  //for branch input start
  const [branchCode, setBranchCode] = useState('');
  //for branch input end

  //anydeases start
  const [anyDisease, setAnyDisease] = useState("");
  const [healthStatus, setHealthStatus] = useState("");
  //anydeases end

  //uuid
  const [insuranceId, setInsuranceId] = useState("");

  //dynamic category start
  const [policyNameId, setpolicyNameId] = useState(null);
  const [mainIDPlaceholder, setMainIDPlaceholder] = useState("");

  const [category, refetch] = useGetCategory(policyNameId);
  const policyName1 = category?.map((item) => item?.policy_name) || [];
  const policySubCategoryName =
    category?.find((item) => item.policy_name === selectedPolicy)?.category ||
    [];

  let policyDuration;
  let policyAmount;
  if (policySubCategoryName && Array.isArray(policySubCategoryName)) {
    // Find category by comparing the category.id instead of category.title
    const policyDurationOne =
      policySubCategoryName.find(
        (item) => item?.insurance_policy_id === parseInt(validateCategory) // Now comparing by id
      ) || null;

    policyDuration = policyDurationOne?.policy_tenure; // Use policy_tenure from the found category
  }

  if (policySubCategoryName && Array.isArray(policySubCategoryName)) {
    // Find category by comparing the category.id instead of category.title
    const setPolicyAmount =
      policySubCategoryName.find(
        (item) => item?.insurance_policy_id === parseInt(validateCategory) // Now comparing by id
      ) || null;

    policyAmount = setPolicyAmount?.premium_amount_total; // Use premium_amount_total from the found category
  }

  console.log("policy Category", policySubCategoryName);
  // console.log(policyDuration);

  const [filteredCategory, setFilteredCategory] = useState([]);
  //dynamic category end
  //SetInsuranceId
  const handleSetInsuranceId = () => {
    const id = crypto.randomUUID();
    setInsuranceId(id);
  };
  console.log("uuid", insuranceId);
  const [formDatas, setFormDatas] = useState({
    NomineeIDIssueDate: null,
    NomineeIDExpiryDate: null,
    NomineeIDPlaceOfIssue: "Bangladesh", // Default value as read-only
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormDatas((prevState) => ({
      ...prevState,
      [name]: value === "" ? null : value, // Store null if value is empty
    }));
  };

  const handleNomineeIDTypeChange = (e) => {
    const selectedType = e.target.value;
    setNomineeIDType(selectedType);

    // Set Placeholder and Validation Rules Dynamically
    switch (selectedType) {
      case "Birth Certificate":
      case "National ID":
        setMainIDPlaceholder("Enter 17-digit ID");
        break;
      case "Passport":
        setMainIDPlaceholder("Enter 9-character alphanumeric ID");
        break;
      case "Driving License":
        setMainIDPlaceholder("Enter 15-character alphanumeric ID");
        break;
      case "Smart Card":
        setMainIDPlaceholder("Enter 10-digit ID");
        break;
      default:
        setMainIDPlaceholder("");
    }
  };
  // Validate Main ID
  const validateMainIDInput = () => {
    let error = "";

    switch (nomineeIDType) {
      case "Birth Certificate":
      case "National ID":
        if (!/^\d{17}$/.test(validateMainID)) {
          error = "Main ID must be exactly 17 digits.";
        }
        break;
      case "Passport":
        if (!/^[a-zA-Z0-9]{9}$/.test(validateMainID)) {
          error = "Passport ID must be exactly 9 alphanumeric characters.";
        }
        break;
      case "Driving License":
        if (!/^[a-zA-Z0-9]{15}$/.test(validateMainID)) {
          error = "Driving License must be exactly 15 alphanumeric characters.";
        }
        break;
      case "Smart Card":
        if (!/^\d{10}$/.test(validateMainID)) {
          error = "Smart Card ID must be exactly 10 digits.";
        }
        break;
      default:
        error = "Please select a valid ID Type.";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      validateMainID: error,
    }));

    return error === ""; // Return true if no errors
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    let valid = true;
    let newErrors = {};

    // Phone validation
    if (!phone || !/^\d{11}$/.test(phone)) {
      valid = false;
      newErrors.phone = "Please enter a valid 11-digit phone number.";
    }

    // Nominee phone validation
    if (!nomineePhone || !/^\d{11}$/.test(nomineePhone)) {
      valid = false;
      newErrors.nomineePhone =
        "Please enter a valid 11-digit nominee phone number.";
    }

    // Policy Name validation
    if (!validatePolicyName) {
      valid = false;
      newErrors.validatePolicyName = "Please Select Policy Name";
    }

    // Insurance Type validation
    if (!validateInsuranceType) {
      valid = false;
      newErrors.validateInsuranceType = "Please Select Insurance Type";
    }

    // Category validation
    if (!validateCategory) {
      valid = false;
      newErrors.validateCategory = "Please Select Category";
    }

    // // Premium Amount validation
    // if (!premiumAmount || parseFloat(premiumAmount) <= 0) {
    //   valid = false;
    //   newErrors.validatePremiumAmount = "Please Set Premium Amount";
    // }

    // // Duration validation
    // if (!policyTenture || parseFloat(policyTenture) <= 0) {
    //   valid = false;
    //   newErrors.validateDuration = "Please Set Duration";
    // }
    // Nominee Name validation
    if (!validateNomineeName || validateNomineeName.trim() === "") {
      valid = false;
      newErrors.validateNomineeName = "Please Enter Nominee Name";
    }

    // Nominee DOB validation
    if (!validateNomineeDOB) {
      valid = false;
      newErrors.validateNomineeDOB = "Please Enter Nominee DOB";
    }

    // ID Type validation
    if (!validateIDType) {
      valid = false;
      newErrors.validateIDType = "Please Select an ID Type";
    }

    // Main ID validation
    if (!validateMainID || validateMainID.trim() === "") {
      valid = false;
      newErrors.validateMainID = "Please Enter Main ID No";
    }

    // Relation validation
    if (!validateRelation) {
      valid = false;
      newErrors.validateRelation = "Please Select Exact Relation";
    }

    // Front Image validation
    if (!validateFrontImg) {
      valid = false;
      newErrors.validateFrontImg = "Please Upload Front Image";
    }

    // Back Image validation
    if (!validateBackImg) {
      valid = false;
      newErrors.validateBackImg = "Please Upload Back Image";
    }

    setErrors(newErrors);

    // Stop execution if the form is invalid
    if (!valid) {
      return; // Exit the function early if validation fails
    }

    // Proceed with form submission if valid
    alert("Form submitted successfully!");

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

      console.log("Event target:", event.target);


      formData.append("Member_name", event.target.Member_name.value);
      formData.append("BranchCode", event.target.BranchCode.value);
      

      
      
      formData.append(
        "HealthInsuranceJson",
        JSON.stringify([
          {
            CoNo: event.target.CoNo ? event.target.CoNo.value : "",
            OrgNo: event.target.OrgNo ? event.target.OrgNo.value : "",
            OrgMemNo: event.target.OrgMemNo ? event.target.OrgMemNo.value : "",
            EnrollId: event.target.EnrollId ? event.target.EnrollId.value : "",
            ErpMemId: event.target.ErpMemId ? event.target.ErpMemId.value : "",
            ProjectCode: event.target.ProjectCode
              ? event.target.ProjectCode.value
              : "",

            // Form fields
            AnyDisese: event.target.AnyDisese
              ? event.target.AnyDisese.value
              : "",
            PolicyName: event.target.PolicyName
              ? event.target.PolicyName.value
              : "",
            InsuranceType: event.target.InsuranceType
              ? event.target.InsuranceType.value
              : "",
            Category: event.target.Category ? event.target.Category.value : "",
            PremiumAmount: event.target.PremiumAmount
              ? event.target.PremiumAmount.value
              : "",
            Duration: event.target.Duration ? event.target.Duration.value : "",

            Phone: event.target.Phone ? event.target.Phone.value : "",
            NomineeName: event.target.NomineeName
              ? event.target.NomineeName.value
              : "",
            NomineePhone: event.target.NomineePhone
              ? event.target.NomineePhone.value
              : "",
            NomineeDOB: event.target.NomineeDOB
              ? event.target.NomineeDOB.value
              : "",
            NomineeIDType: event.target.NomineeIDType
              ? event.target.NomineeIDType.value
              : "",
            NomineeIDIssueDate: event.target.NomineeIDIssueDate
              ? event.target.NomineeIDIssueDate.value
              : "",
            NomineeIDExpiryDate: event.target.NomineeIDExpiryDate
              ? event.target.NomineeIDExpiryDate.value
              : "",
            NomineeIDPlaceOfIssue: event.target.NomineeIDPlaceOfIssue
              ? event.target.NomineeIDPlaceOfIssue.value
              : "",
            NomineeIDNumber: event.target.NomineeIDNumber
              ? event.target.NomineeIDNumber.value
              : "",
            NomineeRelation: event.target.NomineeRelation
              ? event.target.NomineeRelation.value
              : "",
          },
        ])
      );

      console.log("BranchCode:", event.target.BranchCode.value);
      console.log("Member_name:", event.target.Member_name.value);
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
        .post("http://localhost:5001/api/health_insurance/store", formData, {

        
          headers: {
            "Content-Type": "multipart/form-data",
          },

          
        })
        .then((response) => {

          console.log("form data 2:",formData);
          if (response.status === 201) {
            alert("Successfully Created");
          }

          console.log("inserttt data", response.data);
        })
        .catch((error) => {
          console.error("Error creating data:", error.message);
          alert("Failed to create data");
        });
    } catch (error) {
      console.error("Error creating data:", error.message);
      alert("Failed to create data");
    }
  };
  
  useEffect(() => {
    const storedSetCollectorNumber = localStorage.getItem("collector_number");

    setCollectorNumber(storedSetCollectorNumber);
  }, []);
  //branch no
  // useEffect(() => {
  //   const branch_code = localStorage.getItem("branch_code");

  //   setBranchCode(branch_code);
  // }, []);
  useEffect(() => {
    const branch_code = localStorage.getItem("branch_code");

    // Add null/empty checks
    if (branch_code && branch_code !== "null") {
      setBranchCode(branch_code);
    } else {
      // Optional: set to empty string or a default value
      setBranchCode("");
    }
  }, []);
  const handleSetBranchCode = (code) => {
    if (code) {
      localStorage.setItem("branch_code", code);
      setBranchCode(code);
    }
  };

  //client working
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/collector/${id}/client/information`
        );
        console.log("member_name:", response.data); // Log the response
      } catch (error) {
        console.error("Error fetching account number:", error.message);
      }
    };
    fetchPostData();
  }, [id]);

  // useEffect(() => {
  //   const fetchPostData = async () => {
  //     const response = await axios.get(
  //       "http://localhost:5000/api/product/name"
  //     );
  //     setPolicyName(response.data);
  //     // console.log(response);
  //   };
  //   fetchPostData();
  // }, []);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/cardtype");
        setidType(response.data);
        console.log("response_data", response.data);
      } catch (error) {
        console.error("Error fetching ID types:", error);
      }
    };
    fetchPostData();
  }, []);
  console.log("cardType", idType);

  useEffect(() => {
    const fetchPostData = async () => {
      const response = await axios.get(
        "http://localhost:5001/api/relationdata"
      );
      setRelation(response.data);
    };
    fetchPostData();
  }, []);

  const handleImageChange = (e, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHealthStatusChange = (status) => {
    setHealthStatus(status);
    setAnyDisease(status === "1");
  
    if (status === "1") {
      setShowForm(true);
      setIsEligible(true);
    } else if (status === "2") {
      setShowForm(false);
      setIsEligible(false);
    }
  };
  console.log('healthStatus',healthStatus);
  const handlePolicyNameChange = (item) => {
    console.log(item);
  };
  const handleCategoryChange = (category) => {
    setErrors({ ...errors, validateCategory: "" }); // Clear category errors
    console.log("Selected Category:", category);
  };

  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  //   setValidated(true);
  // };

  return (
    <Container className="py-5">
      <Card className="shadow-lg">
        <Card.Header className="bg-primary text-white">
          <h2 className="mb-0">Insurance Application Form</h2>
        </Card.Header>
        <Card.Body>
          <Form
            noValidate
            // validated={validated}
            onSubmit={handleSubmitForm}
          >
            {/* extra field Start */}
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Control
                    type="hidden"
                    name="ApiKey"
                    value="api-key"
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="BranchCode"
                    value={branchCode || ""} // Ensure it's never undefined
                    onChange={(e) => handleSetBranchCode(e.target.value)}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
            <Col md={6}>
              <Form.Group>
                <Form.Control type="hidden" name="CoNo" value={coNo} readOnly />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Control
                  type="hidden"
                  name="OrgNo"
                  value="null"
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Control
                  type="hidden"
                  name="OrgMemNo"
                  value={account_number}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Control
                  type="hidden"
                  name="EnrollId"
                  onChange={handleSetInsuranceId}
                  value={insuranceId}
                  readOnly
                />
                {/* <Button onClick={handleSetInsuranceId}>Generate Insurance ID</Button> */}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Control
                  type="hidden"
                  name="ErpMemId"
                  value="ERP123"
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Control
                  type="hidden"
                  name="ProjectCode"
                  value="PROJ001"
                  readOnly
                />
              </Form.Group>
            </Col>
            {/* end extra Data */}

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Control
                    list="user_name_options"
                    name="Member_name"
                    value={name}
                    type="hidden"
                    placeholder="Select or type user name"
                  />
                </Form.Group>
              </Col>
              <input type="text" name="AnyDisease" value={anyDisease} />

              {healthStatus !== "1" && (
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>
                      Are you suffering from serious health complications?
                    </Form.Label>
                    <div>
                      <Button
                        variant={healthStatus === "1" ? "success" : "primary"}
                        onClick={() => {
                          handleHealthStatusChange("1");
                          handleSetInsuranceId(); // Generate the UUID when the button is clicked
                        }}
                      >
                        No
                      </Button>
                      <Button
                        variant={healthStatus === "2" ? "success" : "danger"}
                        onClick={() => handleHealthStatusChange("2")}
                      >
                        Yes
                      </Button>
                    </div>
                  </Form.Group>
                </Col>
              )}
            </Row>

            {!isEligible && (
              <Alert variant="danger" className="text-center">
                You are not eligible for this insurance
              </Alert>
            )}

            {showForm && (
              <>
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Insurance Policy Name</Form.Label>
                      <Form.Control
                        as="select"
                        name="PolicyName"
                        value={selectedPolicy}
                        onChange={(e) => {
                          const selectedValue = e.target.value; // Get the selected value (ID)
                          setValidatePolicyName(selectedValue); // Call the provided function
                          setSelectedPolicy(selectedValue); // Update selected policy ID
                          setErrors({ ...errors, validatePolicyName: "" }); // Clear previous errors
                          handlePolicyNameChange(selectedValue);
                        }}
                        required
                      >
                        <option value="">Select Insurance Policy Name</option>
                        {category?.map(
                          (
                            item,
                            index // Use `category` directly
                          ) => (
                            <option 
                            key={index} 
                            value={item.id}
                            >
                              {" "}
                              {/* Store `id` in value */}
                              {item.policy_name} {/* Display `policy_name` */}
                            </option>
                          )
                        )}
                      </Form.Control>
                      {errors.validatePolicyName && (
                        <p style={{ color: "red" }}>
                          {errors.validatePolicyName}
                        </p>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Insurance Type</Form.Label>
                      <Form.Control
                        as="select"
                        name="InsuranceType"
                        onChange={(e) =>
                          setValidateInsuranceType(e.target.value)
                        }
                        required
                      >
                        <option value="">Select Insurance Type</option>
                        <option value="1">Subscribe</option>
                        <option value="2">Re-New</option>
                      </Form.Control>
                      {errors.validateInsuranceType && (
                        <p style={{ color: "red" }}>
                          {errors.validateInsuranceType}
                        </p>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        as="select"
                        name="Category"
                        onChange={(e) => {
                          setValidateCategory(e.target.value); // Call the provided function
                          setErrors({ ...errors, validateCategory: "" }); // Clear previous errors
                        }}
                        required
                      >
                        <option value="">
                          {filteredCategory.length
                            ? "Select Category"
                            : "No Categories Available"}
                        </option>
                        {policySubCategoryName.map((category, index) => (
                          <option
                            key={index}
                            value={category.insurance_policy_id}
                          >
                            {category.title}
                          </option>
                        ))}
                      </Form.Control>
                      {errors.validateCategory && (
                        <p style={{ color: "red" }}>
                          {errors.validateCategory}
                        </p>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Premium Amount</Form.Label>
                      <Form.Control
                        type="text"
                        name="PremiumAmount"
                        value={policyAmount}
                        // onChange={(e) => setValidatePremiumAmount(e.target.value)}
                        readOnly
                        required
                      />
                      {errors.validatePremiumAmount && (
                        <p style={{ color: "red" }}>
                          {errors.validatePremiumAmount}
                        </p>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Duration</Form.Label>
                      <Form.Control
                        type="text"
                        name="Duration"
                        value={policyDuration || null}
                        // onChange={(e) => setValidateDuration(e.target.value)}
                        readOnly
                        required
                      />
                      {errors.validateDuration && (
                        <p style={{ color: "red" }}>
                          {errors.validateDuration}
                        </p>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Phone Number</Form.Label>

                      <Form.Control
                        type="tel"
                        name="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid 11-digit phone number
                      </Form.Control.Feedback>
                      {errors.phone && (
                        <p style={{ color: "red" }}>{errors.phone}</p>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Card className="mb-4">
                  <Card.Header className="bg-light">
                    <h4>Nominee Information</h4>
                  </Card.Header>
                  <Card.Body>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="NomineeName"
                            onChange={(e) =>
                              setValidateNomineeName(e.target.value)
                            }
                            required
                          />
                          {errors.validateNomineeName && (
                            <p style={{ color: "red" }}>
                              {errors.validateNomineeName}
                            </p>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Phone Number</Form.Label>

                          <Form.Control
                            type="tel"
                            name="NomineePhone"
                            pattern="[0-9]{11}"
                            value={nomineePhone}
                            onChange={(e) => setNomineePhone(e.target.value)}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Please enter a valid 11-digit phone number
                          </Form.Control.Feedback>
                          {errors.nomineePhone && (
                            <p style={{ color: "red" }}>
                              {errors.nomineePhone}
                            </p>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Date Of Birth</Form.Label>
                          <Form.Control
                            type="date"
                            name="NomineeDOB"
                            onChange={(e) =>
                              setValidateNomineeDOB(e.target.value)
                            }
                            required
                          />
                          {errors.validateNomineeDOB && (
                            <p style={{ color: "red" }}>
                              {errors.validateNomineeDOB}
                            </p>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>ID Type</Form.Label>
                          <Form.Control
                            as="select"
                            name="NomineeIDType"
                            value={nomineeIDType}
                            onChange={(e) => {
                              handleNomineeIDTypeChange(e); // Call the first function
                              setValidateIDType(e.target.value); // Call the second function
                            }}
                            required
                          >
                            <option value="">Select ID Type</option>
                            {idType.map((item, index) => (
                              <option key={index} value={item.data_value}>
                                {item.data_name}
                              </option>
                            ))}
                          </Form.Control>
                          {errors.validateIDType && (
                            <p style={{ color: "red" }}>
                              {errors.validateIDType}
                            </p>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>

                    {["Passport", "Driving License"].includes(
                      nomineeIDType
                    ) && (
                      <Row className="mb-4">
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Issue Date</Form.Label>
                            <Form.Control
                              type="date"
                              name="NomineeIDIssueDate"
                              value={formDatas.NomineeIDIssueDate || ""} // Default to empty string for the input
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control
                              type="date"
                              name="NomineeIDExpiryDate"
                              value={formDatas.NomineeIDExpiryDate || ""} // Default to empty string for the input
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Issue Place</Form.Label>
                            <Form.Control
                              type="text"
                              name="NomineeIDPlaceOfIssue"
                              value={formDatas.NomineeIDPlaceOfIssue}
                              readOnly
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    )}
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Main ID Number</Form.Label>
                          <Form.Control
                            type="text"
                            name="NomineeIDNumber"
                            placeholder={mainIDPlaceholder}
                            value={validateMainID}
                            onChange={(e) => setValidateMainID(e.target.value)}
                            onBlur={validateMainIDInput}
                            required
                          />
                          {errors.validateMainID && (
                            <p style={{ color: "red" }}>
                              {errors.validateMainID}
                            </p>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Relation</Form.Label>
                          <Form.Control
                            as="select"
                            name="NomineeRelation"
                            onChange={(e) =>
                              setValidateRelation(e.target.value)
                            }
                            required
                          >
                            <option value="">Select Relation</option>
                            {relation.map((item, index) => (
                              <option key={index} value={item.data_name}>
                                {item.data_name}
                              </option>
                            ))}
                          </Form.Control>
                          {errors.validateRelation && (
                            <p style={{ color: "red" }}>
                              {errors.validateRelation}
                            </p>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Nominee ID Front Picture *</Form.Label>
                          <div className="border-dashed p-3 text-center">
                            {frontPreview ? (
                              <img
                                src={frontPreview}
                                alt="Front ID"
                                className="img-fluid rounded fixed-size"
                              />
                            ) : (
                              <div className="text-muted">
                                <Camera size={48} className="mx-auto mb-2" />
                                <p>Upload Front Side</p>
                              </div>
                            )}
                            <Form.Control
                              type="file"
                              name="nomineeImageFront"
                              accept="image/*"
                              onChange={(e) => {
                                handleImageChange(e, setFrontPreview); // Call the first function
                                setValidateFrontImg(e.target.value); // Call the second function
                              }}
                              className="mt-2"
                              required
                            />
                          </div>
                          {errors.validateFrontImg && (
                            <p style={{ color: "red" }}>
                              {errors.validateFrontImg}
                            </p>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Nominee ID Back Picture *</Form.Label>
                          <div className="border-dashed p-3 text-center">
                            {backPreview ? (
                              <img
                                src={backPreview}
                                alt="Back ID"
                                className="img-fluid rounded fixed-size"
                              />
                            ) : (
                              <div className="text-muted">
                                <Camera size={48} className="mx-auto mb-2" />
                                <p>Upload Back Side</p>
                              </div>
                            )}
                            <Form.Control
                              type="file"
                              name="nomineeImageBack"
                              accept="image/*"
                              onChange={(e) => {
                                handleImageChange(e, setBackPreview); // Call the first function
                                setValidateBacktImg(e.target.value); // Call the second function
                              }}
                              className="mt-2"
                              required
                            />
                          </div>
                          {errors.validateBackImg && (
                            <p style={{ color: "red" }}>
                              {errors.validateBackImg}
                            </p>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                <div className="text-center">
                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    className="px-5"
                  >
                    <CheckCircle className="me-2" /> Submit Application
                  </Button>
                </div>
              </>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default InsuranceForm;
