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

function InsuranceForm() {
  const [frontPreview, setFrontPreview] = useState(null);
  const [backPreview, setBackPreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEligible, setIsEligible] = useState(true);
  const [validated, setValidated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const [policyName, setPolicyName] = useState([]);
  const [idType, setidType] = useState([]);
  const [category, setCategory] = useState([]);
  const [relation, setRelation] = useState([]);
  
  const [premiumAmount, setPremiumAmount] = useState('');
  const [policyTenture, setPolicyTenture] = useState('');
  const [coNo, setCollectorNumber] = useState(null);

  //insurance form params data start
  const { id, name, account_number } = useParams();
  //insurance form params data end

  //insurance form validation start
  const [phone, setPhone] = useState("");
  const [nomineePhone, setNomineePhone] = useState("");
  const [errors, setErrors] = useState({});
  //insurance form validation end

  //insurance form nominee iput hide show start
  const [nomineeIDType, setNomineeIDType] = useState('');
  //insurance form nominee iput hide show end

  //for branch input start
  const [branchCode, setBranchCode] = useState('null');
  //for branch input end

  //anydeases start
  const [anyDisease, setAnyDisease] = useState('');
  const [healthStatus, setHealthStatus] = useState('');
  //anydeases end
  //dynamic category start
  const [selectedPolicy, setSelectedPolicy] = useState('');
  const [filteredCategory, setFilteredCategory] = useState([]);
  //dynamic category end
  const handleNomineeIDTypeChange = (e) => {
    setNomineeIDType(e.target.value);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
   let valid = true;
  let newErrors = {};

  // Phone validation
  if (!/^\d{11}$/.test(phone)) {
    valid = false;
    newErrors.phone = "Please enter a valid 11-digit phone number.";
  }

  // Nominee phone validation
  if (!/^\d{11}$/.test(nomineePhone)) {
    valid = false;
    newErrors.nomineePhone =
      "Please enter a valid 11-digit nominee phone number.";
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
            Duration: event.target.Duration
              ? event.target.Duration.value
              : "",

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

      // Log the file objects directly
      // console.log(event.target.nomineeImageFront.files[0]);
      // console.log(event.target.nomineeImageBack.files[0]);

      axios
        .post("http://localhost:3000/api/health_insurance/store", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
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
  // console.log("userName",name);
  useEffect(() => {
    const storedSetCollectorNumber = localStorage.getItem("collector_number");

    setCollectorNumber(storedSetCollectorNumber);
  }, []);
  //branch no
  useEffect(() => {
    const branch_code = localStorage.getItem("branch_code");

    setBranchCode(branch_code);
  }, []);

  // useEffect(() => {
  //   const fetchPostData = async () => {
  //     const response = await axios.get("http://localhost:3000/api/client");
  //     setName(response.data);
  //   };
  //   fetchPostData();
  // }, []);

  //client working
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/collector/${id}/client/information`
        );
        console.log("member_name:", response.data); // Log the response

        // setMemberName(response.data[0].name);

        // Filter the data to get the specific account number
        // const account = response.data.find(
        //   (account) => account.id === parseInt(id)
        // );
        // if (account) {
        //   setAccountNumber(account.account_number);
        // } else {
        //   console.error("Account not found");
        // }
      } catch (error) {
        console.error("Error fetching account number:", error.message);
      }
    };
    fetchPostData();
  }, [id]);

  useEffect(() => {
    const fetchPostData = async () => {
      const response = await axios.get("http://localhost:3000/api/policy");
      setPolicyName(response.data);
      // console.log(response);
    };
    fetchPostData();
  }, []);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/idtype");
        setidType(response.data);
      } catch (error) {
        console.error("Error fetching ID types:", error);
      }
    };
    fetchPostData();
  }, []);

  useEffect(() => {
    const fetchPostData = async () => {
      const response = await axios.get("http://localhost:3000/api/category");
      setCategory(response.data);
      // console.log('checking category', response.data);
    };
    fetchPostData();
  }, []);

  useEffect(() => {
    const fetchPostData = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/relationdata"
      );
      setRelation(response.data);
    };
    fetchPostData();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
  };

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

    if (status === "1") {
      setShowForm(true);
      setIsEligible(true);
      setAnyDisease(''); // Clear any previous disease input when selecting "No"
    } else if (status === "2") {
      setShowForm(false);
      setIsEligible(false);
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  //dynamic policy to category start
  const handlePolicyChange = (e) => {
    const policy = e.target.value;
    setSelectedPolicy(policy);

    // Find the matching policy
    const selectedPolicyData = policyName.find(
      (item) => item.product_name === policy
    );

    if (selectedPolicyData) {
      // Update the category options
      setFilteredCategory([selectedPolicyData.category]);

      // Set premium amount and policy tenure
      setPremiumAmount(selectedPolicyData.category.premium_ammount_total);
      setPolicyTenture(selectedPolicyData.category.policy_tenure);

      // Reset selected category
      setSelectedCategory('');
    } else {
      // Reset all values if no policy is selected
      setFilteredCategory([]);
      setPremiumAmount('');
      setPolicyTenture('');
      setSelectedCategory('');
    }
  };

  //dynamic policy to category end
  // console.log('selected',selectedPolicy)
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
                    type="hidden"
                    name="BranchCode"
                    value={branchCode}
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
                  value="ENROL123456"
                  readOnly
                />
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
              <input type="hidden" name="AnyDisese" value={healthStatus} />

              {healthStatus !== "1" && (
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>
                      Are you suffering from serious health complications?
                    </Form.Label>
                    <div>
                      <Button
                        variant={healthStatus === "1" ? "success" : "primary"}
                        onClick={() => handleHealthStatusChange("1")}
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
                        onChange={handlePolicyChange}
                      >
                        <option value="">Select Insurance Policy Name</option>
                        {policyName.map((item, index) => (
                          <option key={index} value={item.product_name}>
                            {item.product_name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Insurance Type</Form.Label>
                      <Form.Control as="select" name="InsuranceType">
                        <option value="">Select Insurance Type</option>
                        <option value="1">Subscribe</option>
                        <option value="2">Re-New</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        type="text"
                        name="Category"
                        value={filteredCategory.length ? filteredCategory[0].title : ''}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Premium Amount</Form.Label>
                      <Form.Control
                        type="text"
                        name="PremiumAmount"
                        value={premiumAmount}
                        readOnly
                      />
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
                        value={policyTenture}
                        readOnly
                      />
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
                      {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
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
                            required
                          />
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
                          {errors.nomineePhone && <p style={{ color: "red" }}>{errors.phone}</p>}
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
                            // required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>ID Type</Form.Label>
                          <Form.Control
                            as="select"
                            name="NomineeIDType"
                            value={nomineeIDType}
                            onChange={handleNomineeIDTypeChange}
                            required
                          >
                            <option value="">Select ID Type</option>
                            {idType.map((item, index) => (
                              <option key={index} value={item.data_value}>
                                {item.data_name}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    {nomineeIDType && (
                      <Row className="mb-4">
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Issue Date</Form.Label>
                            <Form.Control
                              type="date"
                              name="NomineeIDIssueDate"
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control
                              type="date"
                              name="NomineeIDExpiryDate"
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Issue Place</Form.Label>
                            <Form.Control
                              type="text"
                              name="NomineeIDPlaceOfIssue"
                              value="Bangladesh"
                              required
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
                            // required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Relation</Form.Label>
                          <Form.Control
                            as="select"
                            name="NomineeRelation"
                            // required
                          >
                            <option value="">Select Relation</option>
                            {relation.map((item, index) => (
                              <option key={index} value={item.data_name}>
                                {item.data_name}
                              </option>
                            ))}
                          </Form.Control>
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
                              onChange={(e) =>
                                handleImageChange(e, setFrontPreview)
                              }
                              className="mt-2"
                              // required
                            />
                          </div>
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
                              onChange={(e) =>
                                handleImageChange(e, setBackPreview)
                              }
                              className="mt-2"
                              // required
                            />
                          </div>
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
