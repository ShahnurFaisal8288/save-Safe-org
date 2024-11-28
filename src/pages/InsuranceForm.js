
import React, { useEffect, useState } from "react";
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



function InsuranceForm() {
    const [frontPreview, setFrontPreview] = useState(null);
    const [backPreview, setBackPreview] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [isEligible, setIsEligible] = useState(true);
    const [validated, setValidated] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState([]);
    const [name, setName] = useState([]);
    const [policyName, setPolicyName] = useState([]);
    const [idType, setidType] = useState([]);
    const [category, setCategory] = useState([]);
    const [relation, setRelation] = useState([]);
    const [nomineeIDType, setNomineeIDType] = useState("");
    const [showIssueDate, setShowIssueDate] = useState(false);
    const [showExpDate, setShowExpDate] = useState(false);
    const [premiumAmount, setPremiumAmount] = useState("");
    // const [premiumAmount, setPremiumAmount] = useState("");
    const [policy_tenure, setPolicyTenure] = useState("");
    // const [idType, setPremiumAmount] = useState("");

    const handleNomineeIDTypeChange = (e) => {
        const selectedValue = e.target.value;
        setNomineeIDType(selectedValue);
        setShowIssueDate(selectedValue === "specificIDType");
        setShowExpDate(selectedValue === "specificIDType");
    };

    const handleSubmitForm = (event) => {
        event.preventDefault();

        try {

            const formData = new FormData();
            formData.append("ApiKey", "api-key");
            formData.append("BranchCode", "orangeBD600");
            formData.append("Member_name", event.target.Member_name.value);
            formData.append(
                "HealthInsuranceJson",
                JSON.stringify([
                    {
                        CoNo: event.target.CoNo.value,
                        OrgNo: event.target.OrgNo.value,
                        OrgMemNo: event.target.OrgMemNo.value,
                        EnrollId: event.target.EnrollId.value,
                        ErpMemId: event.target.ErpMemId.value,
                        ProjectCode: event.target.ProjectCode.value,

                        // Form fields
                        AnyDisese: event.target.AnyDisese.value,
                        PolicyName: event.target.PolicyName.value,
                        InsuranceType: event.target.InsuranceType.value,
                        Category: event.target.Category.value,
                        PremiumAmount: event.target.PremiumAmount.value,
                        policy_tenure: event.target.policy_tenure.value,

                        Phone: event.target.Phone.value,
                        NomineeName: event.target.NomineeName.value,
                        NomineePhone: event.target.NomineePhone.value,
                        NomineeDOB: event.target.NomineeDOB.value,
                        NomineeIDType: event.target.NomineeIDType.value,
                        NomineeIDIssueDate: event.target.NomineeIDIssueDate.value,
                        NomineeIDExpiryDate: event.target.NomineeIDExpiryDate.value,
                        NomineeIDPlaceOfIssue: event.target.NomineeIDPlaceOfIssue.value,
                        NomineeIDNumber: event.target.NomineeIDNumber.value,
                        NomineeRelation: event.target.NomineeRelation.value,

                    },
                ])
            );

            console.log('test1 form data', event.target.PremiumAmount.value);
            console.log('test12 form data', event.target.policy_tenure.value);


            formData.append("nomineeImageFront", event.target.nomineeImageFront.files[0]);
            formData.append("nomineeImageBack", event.target.nomineeImageBack.files[0]);

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

                    console.log('inserttt data', response.data);
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



    // Create the base structure of the request body





    useEffect(() => {
        const fetchPostData = async () => {
            const response = await axios.get("http://localhost:3000/api/member");
            setName(response.data);
        };
        fetchPostData();
    }, []);

    useEffect(() => {
        const fetchPostData = async () => {
            const response = await axios.get("http://localhost:3000/api/policy");
            setPolicyName(response.data);
        };
        fetchPostData();
    }, []);

    useEffect(() => {
        const fetchPostData = async () => {
            const response = await axios.get("http://localhost:3000/api/idtype");
            setidType(response.data);
            console.log('checking idType', response.data);
        };
        fetchPostData();
    }, []);
    useEffect(() => {
        const fetchPostData = async () => {
            const response = await axios.get("http://localhost:3000/api/category");
            setCategory(response.data);
            console.log('checking category', response.data);
        };
        fetchPostData();
    }, []);

    useEffect(() => {
        const fetchPostData = async () => {
            const response = await axios.get("http://localhost:3000/api/relationdata");
            setRelation(response.data);
        };
        fetchPostData();
    }, []);

    // const handleCategoryChange = (e) => {
    //   const categoryId = parseInt(e.target.value);
    //   const selectedCat = category.find((cat) => cat.id === categoryId);

    //   if (selectedCat) {
    //     setSelectedCategory(categoryId);
    //     setPremiumAmount(selectedCat.premium_ammount_total || "");
    //   } else {
    //     setSelectedCategory("");
    //     setPremiumAmount("");
    //   }
    // };

    const handleCategoryChange = (e) => {
        const categoryId = parseInt(e.target.value);
        const selectedCat = category.find((cat) => cat.id === categoryId);

        if (selectedCat) {
            setSelectedCategory(categoryId);
            setPolicyTenure(selectedCat.policy_tenure || "");
            setPremiumAmount(selectedCat.premium_ammount_total || "");

        } else {
            setSelectedCategory("");
            setPremiumAmount("");
            setPolicyTenure("");

        }
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
        setValidated(false);
        if (status === "1") {
            setShowForm(true);
            setIsEligible(true);
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

    return (
        <Container className="py-5">
            <Card className="shadow-lg">
                <Card.Header className="bg-primary text-white">
                    <h2 className="mb-0">Insurance Application Form</h2>
                </Card.Header>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmitForm}>
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
                        <Col md={6}>
                            <Form.Group>
                                <Form.Control
                                    type="hidden"
                                    name="CoNo"
                                    value="CO12000"
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Control
                                    type="hidden"
                                    name="OrgNo"
                                    value="ORG123456"
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Control
                                    type="hidden"
                                    name="OrgMemNo"
                                    value="ORG_MEM123"
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
                                    <Form.Label>Member Name</Form.Label>
                                    <Form.Control
                                        list="user_name_options"
                                        name="Member_name"
                                        placeholder="Select or type user name"
                                    />
                                    <datalist id="user_name_options">
                                        {name.map((item, index) => (
                                            <option key={index} value={item.member_name} />
                                        ))}
                                    </datalist>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>
                                        Are you suffering from serious health complications?
                                    </Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="No"
                                            name="AnyDisese"
                                            id="inline-radio-1"
                                            onChange={() => handleHealthStatusChange("1")}
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Yes"
                                            name="AnyDisese"
                                            id="inline-radio-2"
                                            onChange={() => handleHealthStatusChange("2")}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
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
                                            <Form.Control as="select" name="PolicyName">
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
                                                as="select"
                                                name="Category"
                                                value={selectedCategory}
                                                onChange={handleCategoryChange}
                                            >
                                                <option value="">Select Category</option>
                                                {category.map((item) => (
                                                    <option key={item.id} value={item.id}>
                                                        {item.title}
                                                    </option>
                                                ))}
                                            </Form.Control>
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
                                            <Form.Control type="text" name="policy_tenure" value={policy_tenure} readOnly />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Phone Number</Form.Label>

                                            <Form.Control
                                                type="tel"
                                                name="Phone"
                                                pattern="[0-9]{10}"
                                            // required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please enter a valid 10-digit phone number
                                            </Form.Control.Feedback>
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
                                                    // required
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label>Phone Number</Form.Label>

                                                    <Form.Control
                                                        type="tel"
                                                        name="NomineePhone"
                                                        pattern="[0-9]{10}"
                                                    // required
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please enter a valid 10-digit phone number
                                                    </Form.Control.Feedback>
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
                                                    // required
                                                    >
                                                        {/* <option value="">Select ID Type</option>
                            <option value="specificIDType">
                              Specific ID Type
                            </option>
                            <option value="anotherIDType">
                              Another ID Type
                            </option> */}
                                                        {idType.map((item, index) => (
                                                            <option key={index} value="specificIDType">
                                                                {item.data_name}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        {showIssueDate && (
                                            <Row className="mb-4">
                                                <Col md={6}>
                                                    <Form.Group>
                                                        <Form.Label>Issue Date</Form.Label>
                                                        <Form.Control
                                                            type="date"
                                                            name="NomineeIDIssueDate"
                                                        // required
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group>
                                                        <Form.Label>Expiry Date</Form.Label>
                                                        <Form.Control
                                                            type="date"
                                                            name="NomineeIDExpiryDate"
                                                        // required
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
                                                            // required
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
                                                            <option key={index} value={item.data_type}>
                                                                {item.data_type}
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
                                                                className="img-fluid rounded"
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
                                                                className="img-fluid rounded"
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
